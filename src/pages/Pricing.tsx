import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Star, Loader2 } from "lucide-react";
import { STRIPE_PRODUCTS } from "@/config/stripeProducts";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function Pricing() {
  const { toast } = useToast();
  const [loading, setLoading] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get("status");

  useEffect(() => {
    if (status === "success") {
      toast({
        title: "Payment Successful!",
        description: "We'll start on your case immediately. Check your email for next steps.",
      });
      searchParams.delete("status");
      setSearchParams(searchParams);
    } else if (status === "cancelled") {
      toast({
        title: "Checkout Cancelled",
        description: "You haven't been charged.",
        variant: "destructive",
      });
      searchParams.delete("status");
      setSearchParams(searchParams);
    }
  }, [status]);

  const handleCheckout = async (priceId: string) => {
    console.log("🔥 SENDING PRICE ID TO EDGE FUNCTION:", priceId);

    setLoading(priceId);

    try {
      const { data, error } = await supabase.functions.invoke("create-checkout-session", {
        body: {
          priceId,
          successPath: "/pricing?status=success",
          cancelPath: "/pricing?status=cancelled",
        },
      });

      console.log("🔥 EDGE FUNCTION RESPONSE:", data, error);

      if (error) throw error;

      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned from function");
      }
    } catch (error: any) {
      console.error("❌ Checkout error:", error);
      toast({
        title: "Checkout Error",
        description: error.message || "Unable to start checkout.",
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-20 gradient-green">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-display font-bold text-primary-foreground mb-6">
                Transparent Pricing Plans
              </h1>
              <p className="text-lg text-primary-foreground/90">
                Start with BNPL. 4-Day Guarantee. Money-back on all plans.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20 bg-background">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {STRIPE_PRODUCTS.map((plan) => (
                <Card
                  key={plan.id}
                  className={`glass-card border-accent/20 hover:shadow-elegant transition-all duration-300 relative flex flex-col ${
                    plan.popular ? "ring-2 ring-accent shadow-gold" : ""
                  }`}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 shadow-gold">
                      <Star className="h-3 w-3 mr-1" />
                      Most Popular
                    </Badge>
                  )}

                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-display mb-2">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-foreground">{plan.displayPrice}</span>
                      <span className="text-muted-foreground"> one-time</span>
                    </div>
                  </CardHeader>

                  <CardContent className="flex-1 flex flex-col">
                    <ul className="space-y-3 mb-6 flex-1">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-foreground">
                          <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      onClick={() => handleCheckout(plan.stripePriceId)}
                      disabled={loading === plan.stripePriceId}
                      className={`w-full ${plan.popular ? "shadow-gold" : ""}`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      {loading === plan.stripePriceId ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing…
                        </>
                      ) : (
                        `Get ${plan.name.split(" ")[0]} Plan`
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Guarantee */}
            <div className="mt-16 max-w-3xl mx-auto">
              <Card className="glass-card border-accent/20">
                <CardHeader>
                  <CardTitle className="text-center text-2xl font-display">Our 4-Day Guaranteed Results</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-4">Verified results within 4 days or your money back.</p>
                  <Button variant="outline" onClick={() => (window.location.href = "/guarantee")}>
                    Read Full Guarantee Policy
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
