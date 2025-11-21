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

        if (customerEmail) {
          const { data: userData } = await supabase
            .from("profiles")
            .select("id")
            .eq("id", session.customer)
            .single();
          
          userId = userData?.id;
        }

        await supabase.from("payments").insert({
          user_id: userId,
          amount: (session.amount_total || 0) / 100,
          currency: session.currency?.toUpperCase() || "USD",
          payment_status: "completed",
          plan: session.metadata?.plan_type || "basic",
          paid_at: new Date().toISOString(),
          metadata: {
            session_id: session.id,
            service_name: session.metadata?.service_name,
            payment_intent: session.payment_intent,
          },
        });

        console.log("[STRIPE-WEBHOOK] Payment recorded for session:", session.id);
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
