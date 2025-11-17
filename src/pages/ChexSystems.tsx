import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export default function ChexSystems() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-background via-background to-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30 mb-6 animate-fade-in">
                <Zap className="h-4 w-4 text-accent" />
                <span className="text-sm font-semibold text-accent">24-Hour Guaranteed Removal</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 animate-fade-in">
                ChexSystems <span className="text-accent">24-Hour</span> Removal
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 animate-fade-in">
                Locked out of banking? We remove ChexSystems reports in just 24 hours – guaranteed.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
                <Button asChild size="lg" className="shadow-gold text-lg">
                  <Link to="/auth">Start 24-Hour Removal - $400</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-display font-bold text-center mb-12">
              How It Works
            </h2>
            
            <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                {
                  step: "1",
                  title: "Sign Up",
                  description: "Create your account and upload required documents"
                },
                {
                  step: "2",
                  title: "Verification",
                  description: "We verify your identity and ChexSystems report"
                },
                {
                  step: "3",
                  title: "Removal Process",
                  description: "Our team initiates the 24-hour removal process"
                },
                {
                  step: "4",
                  title: "Confirmed",
                  description: "You're cleared and ready to open bank accounts"
                }
              ].map((item, index) => (
                <Card key={index} className="relative overflow-hidden border-2 hover:border-accent/50 transition-all hover-scale">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-accent/10 rounded-bl-full" />
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-accent text-primary-foreground flex items-center justify-center font-bold text-xl mb-4">
                      {item.step}
                    </div>
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-display font-bold text-center mb-12">
                Why Choose Our ChexSystems Removal?
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    icon: Clock,
                    title: "24-Hour Guarantee",
                    description: "Complete removal within 24 hours or your money back"
                  },
                  {
                    icon: Shield,
                    title: "100% Secure",
                    description: "Bank-level encryption for all your sensitive information"
                  },
                  {
                    icon: CheckCircle,
                    title: "Proven Success",
                    description: "Thousands of clients successfully cleared from ChexSystems"
                  },
                  {
                    icon: Zap,
                    title: "Fast Processing",
                    description: "Immediate action on your case – no waiting periods"
                  }
                ].map((feature, index) => (
                  <Card key={index} className="hover:border-accent/50 transition-all hover-scale">
                    <CardHeader>
                      <feature.icon className="h-10 w-10 text-accent mb-4" />
                      <CardTitle>{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <Card className="border-2 border-accent shadow-gold">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl font-display">ChexSystems 24-Hour Removal</CardTitle>
                  <CardDescription>Complete removal guaranteed in 24 hours</CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-6">
                  <div>
                    <div className="text-6xl font-bold text-accent mb-2">$400</div>
                    <p className="text-muted-foreground">One-time payment</p>
                  </div>
                  
                  <ul className="space-y-3 text-left max-w-sm mx-auto">
                    {[
                      "24-hour guaranteed removal",
                      "Full ChexSystems report deletion",
                      "Bank account access restored",
                      "Expert case management",
                      "Money-back guarantee"
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button asChild size="lg" className="w-full shadow-gold">
                    <Link to="/auth">Start 24-Hour Removal Now</Link>
                  </Button>
                  
                  <p className="text-sm text-muted-foreground">
                    Payment plans available through Affirm, Afterpay, and Zip
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-accent/10 to-accent/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-display font-bold mb-6">
              Ready to Get Back to Banking?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Don't let ChexSystems hold you back any longer. Start your 24-hour removal process today.
            </p>
            <Button asChild size="lg" className="shadow-gold">
              <Link to="/auth">Start Your Removal Now</Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
