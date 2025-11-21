import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle, CreditCard, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const SERVICE_PLANS = [
  {
    id: "starter",
    name: "4-Day Removal - Starter",
    price: 40,
    description: "Start for only $40 down",
    features: ["4-day guaranteed removal", "Up to 5 items", "Basic support"]
  },
  {
    id: "chexsystems",
    name: "ChexSystems 24-Hour",
    price: 400,
    description: "Complete ChexSystems removal in 24 hours",
    features: ["24-hour guaranteed removal", "Full report deletion", "Priority support"]
  },
  {
    id: "unlimited",
    name: "Unlimited Items",
    price: 999,
    description: "Remove unlimited negative items",
    features: ["Unlimited items", "4-day guarantee", "VIP support", "Dedicated agent"]
  }
];

export default function Payments() {
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handlePayment = async () => {
    if (!selectedPlan) {
      toast({
        title: "Selection Required",
        description: "Please select a service plan",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      const planDetails = SERVICE_PLANS.find(p => p.id === selectedPlan);
      if (!planDetails) {
        throw new Error("Invalid plan selected");
      }

      const { data, error } = await supabase.functions.invoke("create-checkout-session", {
        body: {
          priceAmount: planDetails.price,
          serviceName: planDetails.name,
          planType: planDetails.id,
        },
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
        toast({
          title: "Redirecting to Stripe Checkout",
          description: "Opening secure payment window...",
        });
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Payment Error",
        description: "Failed to initialize payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const selectedPlanDetails = SERVICE_PLANS.find(p => p.id === selectedPlan);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-display font-bold mb-2 text-center">Choose Your Plan</h1>
          <p className="text-muted-foreground text-center mb-12">
            Select a service and payment method to get started
          </p>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Service Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Select Service</CardTitle>
                <CardDescription>Choose the credit repair service you need</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan}>
                  <div className="space-y-4">
                    {SERVICE_PLANS.map((plan) => (
                      <Label
                        key={plan.id}
                        htmlFor={plan.id}
                        className={`flex items-start space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all hover:border-accent/50 ${
                          selectedPlan === plan.id ? "border-accent bg-accent/5" : "border-border"
                        }`}
                      >
                        <RadioGroupItem value={plan.id} id={plan.id} className="mt-1" />
                        <div className="flex-1">
                          <div className="font-semibold mb-1">{plan.name}</div>
                          <div className="text-2xl font-bold text-accent mb-2">${plan.price}</div>
                          <div className="text-sm text-muted-foreground mb-3">{plan.description}</div>
                          <ul className="space-y-1">
                            {plan.features.map((feature, idx) => (
                              <li key={idx} className="text-sm flex items-center gap-2">
                                <CheckCircle className="h-3 w-3 text-accent" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </Label>
                    ))}
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Payment Summary & Checkout */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Summary</CardTitle>
                <CardDescription>Review your selection and checkout securely</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {selectedPlanDetails && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-muted/50 border border-border">
                      <div className="text-sm text-muted-foreground mb-1">Selected Plan</div>
                      <div className="text-xl font-bold text-foreground">{selectedPlanDetails.name}</div>
                      <div className="text-3xl font-bold text-accent mt-2">${selectedPlanDetails.price}</div>
                    </div>

                    <div className="p-4 rounded-lg border border-accent/20 bg-accent/5">
                      <div className="flex items-start gap-3 mb-3">
                        <CreditCard className="h-5 w-5 text-accent mt-0.5" />
                        <div>
                          <p className="font-semibold text-foreground">Multiple Payment Options</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Pay with card or choose Buy Now, Pay Later options
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <span className="text-xs px-2 py-1 rounded bg-background border border-border">Credit Card</span>
                        <span className="text-xs px-2 py-1 rounded bg-background border border-border">Affirm</span>
                        <span className="text-xs px-2 py-1 rounded bg-background border border-border">Afterpay</span>
                        <span className="text-xs px-2 py-1 rounded bg-background border border-border">Klarna</span>
                      </div>
                    </div>
                  </div>
                )}

                <Button
                  onClick={handlePayment}
                  disabled={!selectedPlan || loading}
                  className="w-full shadow-gold"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Continue to Secure Checkout
                      <CreditCard className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  🔒 Secure payment processing powered by Stripe. Your information is encrypted and protected.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
