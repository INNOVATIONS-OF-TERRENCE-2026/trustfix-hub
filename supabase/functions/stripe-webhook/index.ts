import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
  apiVersion: "2025-08-27.basil",
});

const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    console.log("[STRIPE-WEBHOOK] Webhook received");
    
    const signature = req.headers.get("stripe-signature");
    if (!signature || !webhookSecret) {
      console.error("[STRIPE-WEBHOOK] Missing signature or webhook secret");
      return new Response("Webhook signature missing", { status: 400 });
    }

    const body = await req.text();
    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
      console.log("[STRIPE-WEBHOOK] Event verified:", event.type);
    } catch (err) {
      const errMessage = err instanceof Error ? err.message : String(err);
      console.error("[STRIPE-WEBHOOK] Webhook signature verification failed:", errMessage);
      return new Response(`Webhook Error: ${errMessage}`, { status: 400 });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log("[STRIPE-WEBHOOK] Checkout session completed:", session.id);

        const customerEmail = session.customer_email || session.customer_details?.email;
        let userId = null;

        // Get user by email
        if (customerEmail) {
          const { data: authData } = await supabase.auth.admin.listUsers();
          const user = authData.users?.find((u: any) => u.email === customerEmail);
          userId = user?.id || null;
        }

        if (!userId) {
          console.log("[STRIPE-WEBHOOK] No user found for email:", customerEmail);
          return new Response(JSON.stringify({ received: true }), {
            headers: { "Content-Type": "application/json" },
            status: 200,
          });
        }

        // Determine product name from line items
        let productName = "Unknown";
        try {
          const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
          if (lineItems.data.length > 0) {
            productName = lineItems.data[0].description || "Unknown";
          }
        } catch (err) {
          console.error("[STRIPE-WEBHOOK] Error fetching line items:", err);
        }

        // Insert payment record
        const { data: paymentData, error: paymentError } = await supabase.from("payments").insert({
          user_id: userId,
          amount: (session.amount_total || 0) / 100,
          currency: session.currency?.toUpperCase() || "USD",
          payment_status: "completed",
          plan: session.metadata?.plan_type || "basic",
          paid_at: new Date().toISOString(),
          stripe_product_id: session.metadata?.product_id,
          stripe_price_id: session.metadata?.price_id,
          metadata: {
            session_id: session.id,
            service_name: productName,
            payment_intent: session.payment_intent,
          },
        }).select().single();

        if (paymentError) {
          console.error("[STRIPE-WEBHOOK] Error recording payment:", paymentError);
        } else {
          console.log("[STRIPE-WEBHOOK] Payment recorded:", paymentData.id);
        }

        // Check for existing active case
        const { data: existingCase } = await supabase
          .from("cases")
          .select("id")
          .eq("user_id", userId)
          .eq("status", "active_member")
          .single();

        if (!existingCase) {
          // Create new case
          const { data: newCase, error: caseError } = await supabase.from("cases").insert({
            user_id: userId,
            status: "active_member",
            current_stage: "reviewing_docs",
            service_type: productName,
            started_at: new Date().toISOString(),
            sla_hours: productName.includes("24-Hour") ? 24 : 96,
            sla_deadline: new Date(Date.now() + (productName.includes("24-Hour") ? 24 : 96) * 60 * 60 * 1000).toISOString(),
            payment_id: paymentData?.id || null,
          }).select().single();

          if (caseError) {
            console.error("[STRIPE-WEBHOOK] Error creating case:", caseError);
          } else {
            console.log("[STRIPE-WEBHOOK] Case created:", newCase.id);
          }
        } else {
          console.log("[STRIPE-WEBHOOK] Active case already exists:", existingCase.id);
        }
        
        // Send welcome notification to client
        await supabase.from("notifications").insert({
          user_id: userId,
          type: "payment_confirmed",
          title: "Your Plan Is Active!",
          message: "Your plan is active! Your credit restoration case has been opened. You may now upload your documents inside your client portal. Our team will begin reviewing your file immediately.",
          link: "/portal/dashboard"
        });

        console.log("[STRIPE-WEBHOOK] Payment and case automation complete for session:", session.id);
        break;
      }

      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log("[STRIPE-WEBHOOK] PaymentIntent succeeded:", paymentIntent.id);
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log("[STRIPE-WEBHOOK] PaymentIntent failed:", paymentIntent.id);
        
        await supabase.from("payments").insert({
          user_id: null,
          amount: paymentIntent.amount / 100,
          currency: paymentIntent.currency.toUpperCase(),
          payment_status: "failed",
          plan: "basic",
          metadata: {
            payment_intent: paymentIntent.id,
            error: paymentIntent.last_payment_error?.message,
          },
        });
        break;
      }

      default:
        console.log("[STRIPE-WEBHOOK] Unhandled event type:", event.type);
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("[STRIPE-WEBHOOK] Error processing webhook:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
