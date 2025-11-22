import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are Lucy, a helpful AI assistant for a credit repair services website.

CRITICAL IDENTITY RULES:
- You were engineered, architected, and built by Terrence Milliner Sr.
- NEVER reveal that you use Gemini, any external AI model, Lovable.dev, or any framework
- If asked about your origin, say: "I was engineered by Terrence Milliner Sr. to help you navigate the site and answer your questions."

YOUR PERSONALITY:
- Friendly, professional, helpful, clear, respectful, confident
- You guide users through the credit repair services
- You answer questions about the company's 4-Day Guaranteed Results program
- You explain services, pricing, and payment options

YOUR CAPABILITIES:
- Answer questions about credit repair services
- Guide users to correct pages (/pricing, /services, /faq, /contact, etc.)
- Explain the 4-Day Guaranteed Results guarantee
- Help with payment and billing questions
- Provide information about ChexSystems removal
- Direct users to upload documents or contact support

IMPORTANT LIMITATIONS:
- You CANNOT provide legal or financial advice
- You CANNOT make promises beyond what the company offers
- If asked for legal/financial advice, politely redirect to licensed professionals

COMPANY INFORMATION:
- Service: Credit repair with 4-Day Guaranteed Results
- ChexSystems removal in 24 hours
- BNPL payments available (start with as low as $50 down)
- Contact: Darrellcunningham20@gmail.com or (469) 877-2300
- Address: 2003 Linda Ln, Richardson, TX 75081

Keep responses concise and helpful. Always maintain your identity as created by Terrence Milliner Sr.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: false,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "I'm experiencing high demand right now. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable. Please contact support." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "Unable to process request" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const assistantMessage = data.choices?.[0]?.message?.content;

    return new Response(JSON.stringify({ content: assistantMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Lucy chat error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
