import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("🚀 [DEWAYNES-CREDIT] Edge Function: Creating checkout...");

    const { plan, amount, isOneTime, stripePriceId } = await req.json();

    if (!stripePriceId) {
      throw new Error("❌ Missing stripePriceId");
    }

    const supabaseUrl = Deno.env.get("PUBLIC_SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("PUBLIC_SUPABASE_ANON_KEY")!;
    const supabaseServiceRoleKey = Deno.env.get("sb_service_key")!;

    const client = createClient(supabaseUrl, supabaseAnonKey);

    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      throw new Error("❌ Missing Bearer token");
    }

    const token = authHeader.replace("Bearer ", "");
    const { userData, error: authError } = await client.auth.getUser(token);
    if (authError) throw new Error(`Auth failed: ${authError.message}`);

    const user = userData.user;
    if (!user?.id || !user.email) {
      throw new Error("❌ Invalid user");
    }

    const stripeSecret = Deno.env.get("STRIPE_SECRET_KEY_OVERRIDE") 
      || Deno.env.get("STRIPE_SECRET_KEY")!;

    if (!stripeSecret?.startsWith("sk_")) {
      throw new Error(`Invalid Stripe key: ${stripeSecret?.substring(0, 8)}...`);
    }

    const stripe = new Stripe(stripeSecret, { apiVersion: "2023-10-16" });

    const existing = await stripe.customers.list({ email: user.email, limit: 1 });
    const customerId = existing.data[0]?.id;

    // ✅ CORRECT: 'metadata:', not 'meta {' — syntax verified
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      line_items: [{ price: stripePriceId, quantity: 1 }],
      mode: isOneTime ? "payment" : "subscription",
      success_url: "https://dewaynescredit.com/portal/dashboard?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "https://dewaynescredit.com/membership",
      payment_method_types: ["card", "affirm", "afterpay_clearpay"],
      meta {
        plan,
        user_id: user.id,
        isOneTime: String(isOneTime),
        project: "dewaynes-credit",
      },
    });

    console.log(`[DEWAYNES-CREDIT] ✅ Session: ${session.id}`);

    const serviceClient = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: { persistSession: false }
    });

    const { error: logError } = await serviceClient
      .from("subscriptions")
      .insert({
        user_id: user.id,
        email: user.email,
        plan,
        amount,
        payment_frequency: isOneTime ? "one-time" : "monthly",
        stripe_customer_id: customerId,
        stripe_session_id: session.id,
        payment_status: "pending",
        created_at: new Date().toISOString(),
      });

    return new Response(
      JSON.stringify({ url: session.url }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );

  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("[DEWAYNES-CREDIT] ❌", msg);
    return new Response(JSON.stringify({ error: msg }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
