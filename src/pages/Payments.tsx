import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SERVICE_PLANS = [
  {
    id: "basic",
    name: "Basic Credit Removal (Up to 5 Items)",
    price: 500,
    paymentLink: "https://buy.stripe.com/28E8wPaFK3yM9rq0Iu0Fi00",
    description: "Remove up to 5 negative items from your credit report",
    features: ["4-day guaranteed removal", "Up to 5 items", "Encrypted document storage", "Email support"]
  },
  {
    id: "premium",
    name: "Premium Credit Removal (Unlimited Items)",
    price: 750,
    paymentLink: "https://buy.stripe.com/aFa6oH4hmglyeLK4YK0Fi01",
    description: "Remove unlimited negative items",
    features: ["Unlimited items removed", "4-day guarantee per batch", "VIP 24/7 support", "Dedicated agent"]
  },
  {
    id: "chexsystems",
    name: "24-Hour ChexSystems Removal",
    price: 400,
    paymentLink: "https://buy.stripe.com/00wbJ129e5GUfPO0Iu0Fi02",
    description: "Complete ChexSystems removal in 24 hours",
    features: ["24-hour guaranteed removal", "Full ChexSystems report deletion", "Priority support"]
  },
  {
    id: "mentorship",
    name: "Credit Mentorship Add-On",
    price: 1200,
    paymentLink: "https://buy.stripe.com/9B67sL8xC1qEcDC76S0Fi03",
    description: "Expert credit mentorship and consultation",
    features: ["One-on-one mentorship", "Personalized credit building plan", "Monthly strategy sessions"]
  }
];

export default function Payments() {
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const { toast } = useToast();

  const handlePayment = () => {
    if (!selectedPlan) {
      toast({
        title: "Selection Required",
        description: "Please select a service plan",
        variant: "destructive"
      });
      return;
    }

    const planDetails = SERVICE_PLANS.find(p => p.id === selectedPlan);
    if (planDetails) {
      window.open(planDetails.paymentLink, '_blank');
      toast({
        title: "Opening Stripe Checkout",
        description: "Secure payment window opening...",
      });
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
                  disabled={!selectedPlan}
                  className="w-full shadow-gold"
                  size="lg"
                >
                  Continue to Secure Checkout
                  <CreditCard className="ml-2 h-4 w-4" />
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
