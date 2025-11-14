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
      name: "Basic",
      price: 500,
      description: "Perfect for targeted credit repair",
      features: [
        "Up to 5 items removed",
        "48-hour guarantee",
        "Encrypted document storage",
        "Email support",
        "FCRA-compliant disputes",
        "Progress tracking"
      ],
      popular: false
    },
    {
      name: "Premium",
      price: 750,
      description: "Most popular comprehensive solution",
      features: [
        "Unlimited items removed",
        "48-hour guarantee",
        "Encrypted document storage",
        "Priority email & phone support",
        "FCRA-compliant disputes",
        "Real-time progress tracking",
        "Personalized strategy",
        "Credit score monitoring"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: 2250,
      description: "Complete credit restoration package",
      features: [
        "Unlimited items removed",
        "48-hour guarantee",
        "Encrypted document storage",
        "24/7 dedicated support",
        "FCRA-compliant disputes",
        "Real-time progress tracking",
        "Personalized strategy",
        "Credit score monitoring",
        "Legal consultation",
        "Credit builder program",
        "Identity theft protection"
      ],
      popular: false
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
                Simple, Transparent Pricing
              </h1>
              <p className="text-lg text-primary-foreground/90">
                One-time payment. No subscriptions. 48-hour guarantee on all plans.
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