import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  const [selectedPayment, setSelectedPayment] = useState<string>("");
  const { toast } = useToast();

  const handlePayment = () => {
    if (!selectedPlan || !selectedPayment) {
      toast({
        title: "Selection Required",
        description: "Please select both a service plan and payment method",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Payment Processing",
      description: "Redirecting to payment provider..."
    });

    // TODO: Integrate with actual payment providers
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

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Choose how you'd like to pay</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment}>
                  <div className="space-y-4">
                    <Label
                      htmlFor="affirm"
                      className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all hover:border-accent/50 ${
                        selectedPayment === "affirm" ? "border-accent bg-accent/5" : "border-border"
                      }`}
                    >
                      <RadioGroupItem value="affirm" id="affirm" />
                      <div className="flex-1">
                        <div className="font-semibold">Affirm</div>
                        <div className="text-sm text-muted-foreground">
                          Pay over time with 0% APR financing
                        </div>
                      </div>
                    </Label>

                    <Label
                      htmlFor="afterpay"
                      className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all hover:border-accent/50 ${
                        selectedPayment === "afterpay" ? "border-accent bg-accent/5" : "border-border"
                      }`}
                    >
                      <RadioGroupItem value="afterpay" id="afterpay" />
                      <div className="flex-1">
                        <div className="font-semibold">Afterpay</div>
                        <div className="text-sm text-muted-foreground">
                          Split into 4 interest-free payments
                        </div>
                      </div>
                    </Label>

                    <Label
                      htmlFor="zip"
                      className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all hover:border-accent/50 ${
                        selectedPayment === "zip" ? "border-accent bg-accent/5" : "border-border"
                      }`}
                    >
                      <RadioGroupItem value="zip" id="zip" />
                      <div className="flex-1">
                        <div className="font-semibold">Zip</div>
                        <div className="text-sm text-muted-foreground">
                          Flexible payment plans available
                        </div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>

                {selectedPlanDetails && (
                  <div className="mt-6 p-4 rounded-lg bg-muted">
                    <div className="text-sm text-muted-foreground mb-2">Total Amount</div>
                    <div className="text-3xl font-bold text-accent">${selectedPlanDetails.price}</div>
                  </div>
                )}

                <Button
                  onClick={handlePayment}
                  disabled={!selectedPlan || !selectedPayment}
                  className="w-full shadow-gold"
                  size="lg"
                >
                  Continue to Payment
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Secure payment processing. Your information is encrypted and protected.
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
