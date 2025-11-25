import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const ALLOWED_PRICE_IDS = new Set([
  "price_1SVlu5DdYjAsmtGqhsQM4snp", // Basic Credit Removal
  "price_1SWmNQDdYjAsmtGqnBx3GgZs", // Premium Credit Removal
  "price_1SWmPvDdYjAsmtGqe4wUgKQE", // 24-Hour ChexSystems Removal
  "price_1SWmeqDdYjAsmtGqDKZPTdDf", // Credit Mentorship Add-On
]);

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed. Use POST." }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 405,
    });
  }

  try {
    console.log("[CREATE-CHECKOUT] Function started");

    const body = await req.json();
    const { priceId, successPath, cancelPath } = body;
    console.log("[CREATE-CHECKOUT] Request data:", { priceId, successPath, cancelPath });

    if (!priceId) {
      return new Response(JSON.stringify({ error: "priceId is required" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    if (!ALLOWED_PRICE_IDS.has(priceId)) {
      return new Response(JSON.stringify({ error: "Invalid priceId provided" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY_OVERRIDE") ?? Deno.env.get("STRIPE_SECRET_KEY");

    if (!stripeKey) {
      console.error("[CREATE-CHECKOUT] STRIPE_SECRET_KEY not configured");
      return new Response(JSON.stringify({ error: "Stripe configuration error" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    const stripe = new Stripe(stripeKey);

    const baseUrl = Deno.env.get("BASE_URL") || "https://dewaynescredit.com";
    const successUrl = `${baseUrl}${successPath || "/pricing?status=success"}&session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${baseUrl}${cancelPath || "/pricing?status=cancelled"}`;

    console.log("[CREATE-CHECKOUT] Creating session with URLs:", { successUrl, cancelUrl });

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      payment_method_types: ["card", "affirm", "afterpay_clearpay", "klarna"],
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    console.log("[CREATE-CHECKOUT] Session created successfully:", session.id);

    return new Response(JSON.stringify({ url: session.url, sessionId: session.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("[CREATE-CHECKOUT] Error:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
