import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { CheckCircle2, Star } from "lucide-react";

export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: 40,
      description: "Get started with just $40 down",
      features: [
        "4-day guaranteed removal",
        "Up to 5 negative items",
        "Encrypted document storage",
        "Email support",
        "FCRA-compliant disputes",
        "Progress tracking"
      ],
      popular: false,
      badge: "$40 Down"
    },
    {
      name: "ChexSystems",
      price: 400,
      description: "Complete ChexSystems removal in 24 hours",
      features: [
        "24-hour guaranteed removal",
        "Full ChexSystems report deletion",
        "Bank account access restored",
        "Priority support",
        "Expert case management",
        "Money-back guarantee"
      ],
      popular: false,
      badge: "24-Hour"
    },
    {
      name: "Unlimited",
      price: 999,
      description: "Remove unlimited negative items",
      features: [
        "Unlimited items removed",
        "4-day guarantee per batch",
        "Encrypted document storage",
        "VIP 24/7 support",
        "FCRA-compliant disputes",
        "Real-time tracking",
        "Dedicated agent",
        "Credit score monitoring",
        "Legal consultation",
        "Credit builder program"
      ],
      popular: true,
      badge: "Best Value"
    }
  ];

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
                Start for only $40. 4-Day Guarantee. Money-back promise on all plans.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-20 bg-background">
          <div className="container">
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan, index) => (
                <Card 
                  key={index} 
                  className={`glass-card border-accent/20 hover:shadow-elegant transition-all duration-300 relative ${
                    plan.popular ? 'ring-2 ring-accent shadow-gold' : ''
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
                      <span className="text-4xl font-bold text-foreground">${plan.price}</span>
                      <span className="text-muted-foreground"> one-time</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-foreground">
                          <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      asChild 
                      className={`w-full ${plan.popular ? 'shadow-gold' : ''}`}
                      variant={plan.popular ? 'default' : 'outline'}
                    >
                      <Link to="/auth">Start {plan.name} Plan</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Guarantee Notice */}
            <div className="mt-16 max-w-3xl mx-auto">
              <Card className="glass-card border-accent/20">
                <CardHeader>
                  <CardTitle className="text-center text-2xl font-display">
                    Our 48-Hour Guarantee
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-4">
                    We guarantee verified results within 48 hours of receiving your complete documentation, 
                    or you receive a full refund. No questions asked.
                  </p>
                  <Button variant="outline" asChild>
                    <Link to="/guarantee">Read Full Guarantee Policy</Link>
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