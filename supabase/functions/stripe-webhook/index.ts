import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
  apiVersion: "2025-08-27.basil",
});

const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");

// Product mapping with Stripe product IDs
const PRODUCT_MAP: Record<string, { name: string; slaHours: number; planType: string }> = {
  "prod_TShIlDnMvP5PDA": {
    name: "Basic Credit Removal (Up to 5 Items)",
    slaHours: 96,
    planType: "basic",
  },
  "prod_TTjrK08A2jyPCK": {
    name: "Premium Credit Removal (Unlimited Items)",
    slaHours: 96,
    planType: "premium",
  },
  "prod_TTjtA4Yuwg9nTV": {
    name: "24-Hour ChexSystems Removal",
    slaHours: 24,
    planType: "basic",
  },
  "prod_TTk9EbANUHa5jE": {
    name: "Credit Mentorship Add-On",
    slaHours: 96,
    planType: "enterprise",
  },
};

const logStep = (step: string, details?: any) => {
  const timestamp = new Date().toISOString();
  const detailsStr = details ? ` | ${JSON.stringify(details)}` : "";
  console.log(`[${timestamp}] [STRIPE-WEBHOOK] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method !== "POST") {
    logStep("Method not allowed", { method: req.method });
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    logStep("Webhook request received");
    
    const signature = req.headers.get("stripe-signature");
    if (!signature || !webhookSecret) {
      logStep("ERROR: Missing signature or webhook secret");
      return new Response("Webhook signature missing", { status: 400 });
    }

    const body = await req.text();
    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
      logStep("Event verified successfully", { type: event.type, id: event.id });
    } catch (err) {
      const errMessage = err instanceof Error ? err.message : String(err);
      logStep("ERROR: Signature verification failed", { error: errMessage });
      return new Response(`Webhook Error: ${errMessage}`, { status: 400 });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        logStep("Processing checkout.session.completed", { sessionId: session.id });

        const customerEmail = session.customer_email || session.customer_details?.email;
        let userId = null;

        // Get user by email
        if (customerEmail) {
          logStep("Looking up user by email", { email: customerEmail });
          const { data: authData } = await supabase.auth.admin.listUsers();
          const user = authData.users?.find((u: any) => u.email === customerEmail);
          userId = user?.id || null;
          
          if (userId) {
            logStep("User found", { userId });
          } else {
            logStep("WARNING: No user found for email", { email: customerEmail });
          }
        }

        if (!userId) {
          logStep("Skipping webhook - no user found");
          return new Response(JSON.stringify({ received: true, skipped: "no_user" }), {
            headers: { "Content-Type": "application/json" },
            status: 200,
          });
        }

        // Get product details from line items
        let productName = "Unknown";
        let productId = null;
        let slaHours = 96;
        let planType = "basic";

        try {
          logStep("Fetching line items from Stripe");
          const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 1 });
          
          if (lineItems.data.length > 0) {
            const item = lineItems.data[0];
            productName = item.description || "Unknown";
            
            // Get the price to extract product ID
            if (item.price?.product) {
              productId = typeof item.price.product === 'string' 
                ? item.price.product 
                : item.price.product.id;
              
              // Map product to service details
              const productInfo = PRODUCT_MAP[productId];
              if (productInfo) {
                productName = productInfo.name;
                slaHours = productInfo.slaHours;
                planType = productInfo.planType;
                logStep("Product mapped successfully", { productId, productName, slaHours, planType });
              } else {
                logStep("WARNING: Product ID not in map", { productId });
              }
            }
          }
        } catch (err) {
          logStep("ERROR: Failed to fetch line items", { error: String(err) });
        }

        // Insert payment record
        logStep("Creating payment record");
        const { data: paymentData, error: paymentError } = await supabase.from("payments").insert({
          user_id: userId,
          amount: (session.amount_total || 0) / 100,
          currency: session.currency?.toUpperCase() || "USD",
          payment_status: "completed",
          plan: planType as "basic" | "premium" | "enterprise",
          paid_at: new Date().toISOString(),
          stripe_product_id: productId,
          stripe_price_id: session.metadata?.price_id,
          metadata: {
            session_id: session.id,
            service_name: productName,
            payment_intent: session.payment_intent,
            customer_email: customerEmail,
          },
        }).select().single();

        if (paymentError) {
          logStep("ERROR: Failed to create payment record", { error: paymentError });
        } else {
          logStep("Payment record created successfully", { paymentId: paymentData.id });
        }

        // Check for existing active case
        logStep("Checking for existing active case");
        const { data: existingCase } = await supabase
          .from("cases")
          .select("id")
          .eq("user_id", userId)
          .in("status", ["active_member", "in_progress", "under_review"])
          .single();

        let caseId = existingCase?.id;

        if (!existingCase) {
          // Create new case
          logStep("Creating new case");
          const slaDeadline = new Date(Date.now() + slaHours * 60 * 60 * 1000);
          
          const { data: newCase, error: caseError } = await supabase.from("cases").insert({
            user_id: userId,
            status: "active_member",
            current_stage: "reviewing_docs",
            service_type: productName,
            started_at: new Date().toISOString(),
            sla_hours: slaHours,
            sla_deadline: slaDeadline.toISOString(),
            payment_id: paymentData?.id || null,
          }).select().single();

          if (caseError) {
            logStep("ERROR: Failed to create case", { error: caseError });
          } else {
            caseId = newCase.id;
            logStep("Case created successfully", { caseId, slaHours, slaDeadline: slaDeadline.toISOString() });
            
            // Create admin notification for new case
            const { error: adminNotifError } = await supabase.from("admin_notifications").insert({
              type: "new_payment",
              title: "New Payment Received",
              message: `New payment from ${customerEmail} for ${productName}. Case ${caseId} created.`,
              link: `/admin/client/${userId}`,
            });

            if (adminNotifError) {
              logStep("ERROR: Failed to create admin notification", { error: adminNotifError });
            } else {
              logStep("Admin notification created");
            }
          }
        } else {
          logStep("Active case already exists", { caseId: existingCase.id });
        }
        
        // Send welcome notification to client
        logStep("Creating client notification");
        const { error: notifError } = await supabase.from("notifications").insert({
          user_id: userId,
          type: "payment_confirmed",
          title: "Your Plan Is Active!",
          message: "Your plan is active! Your credit restoration case has been opened. You may now upload your documents inside your client portal. Our team will begin reviewing your file immediately.",
          link: "/portal/dashboard"
        });

        if (notifError) {
          logStep("ERROR: Failed to create client notification", { error: notifError });
        } else {
          logStep("Client notification created");
        }

        logStep("Checkout session processing complete", { 
          sessionId: session.id, 
          userId, 
          caseId,
          productName,
          amount: (session.amount_total || 0) / 100
        });
        break;
      }

      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        logStep("PaymentIntent succeeded", { paymentIntentId: paymentIntent.id, amount: paymentIntent.amount / 100 });
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        logStep("PaymentIntent failed", { paymentIntentId: paymentIntent.id, error: paymentIntent.last_payment_error?.message });
        
        await supabase.from("payments").insert({
          user_id: null,
          amount: paymentIntent.amount / 100,
          currency: paymentIntent.currency.toUpperCase(),
          payment_status: "failed",
          plan: "basic",
          metadata: {
            payment_intent: paymentIntent.id,
            error: paymentIntent.last_payment_error?.message,
            error_code: paymentIntent.last_payment_error?.code,
          },
        });
        
        logStep("Failed payment logged");
        break;
      }

      default:
        logStep("Unhandled event type", { type: event.type });
    }

    logStep("Webhook processed successfully");
    return new Response(JSON.stringify({ received: true, eventType: event.type }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;
    logStep("CRITICAL ERROR", { error: errorMessage, stack: errorStack });
    
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
