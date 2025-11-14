import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { TrendingUp, Home, Users, FileText, CheckCircle2 } from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: TrendingUp,
      title: "Collection Removal",
      description: "We dispute and remove unfair collection accounts that are damaging your credit score.",
      features: [
        "Unauthorized collections",
        "Paid collections reporting",
        "Medical collections",
        "Identity theft collections"
      ]
    },
    {
      icon: Home,
      title: "Eviction Removal",
      description: "Clear eviction records from your credit history to improve rental and credit opportunities.",
      features: [
        "Wrongful evictions",
        "Settled evictions",
        "Disputed evictions",
        "Old eviction records"
      ]
    },
    {
      icon: Users,
      title: "Repossession Removal",
      description: "Dispute and remove repossession entries that are unfairly impacting your creditworthiness.",
      features: [
        "Auto repossessions",
        "Settled repos",
        "Disputed ownership",
        "Inaccurate reporting"
      ]
    },
    {
      icon: FileText,
      title: "Hard Inquiry Removal",
      description: "Remove unauthorized credit inquiries that lower your score without your permission.",
      features: [
        "Unauthorized pulls",
        "Identity theft inquiries",
        "Duplicate inquiries",
        "Fraudulent applications"
      ]
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
                Our Credit Repair Services
              </h1>
              <p className="text-lg text-primary-foreground/90">
                Comprehensive FCRA-compliant solutions backed by our 48-hour guarantee
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-background">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {services.map((service, index) => (
                <Card key={index} className="glass-card border-accent/20 hover:shadow-elegant transition-all duration-300">
                  <CardHeader>
                    <div className="rounded-full bg-accent/10 w-12 h-12 flex items-center justify-center mb-4">
                      <service.icon className="h-6 w-6 text-accent" />
                    </div>
                    <CardTitle className="text-2xl font-display">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-foreground">
                          <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button size="lg" asChild className="shadow-gold">
                <Link to="/pricing">View Pricing Plans</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 bg-card">
          <div className="container max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
              Our FCRA-Compliant Process
            </h2>
            <div className="space-y-6">
              {[
                "Document Review: We thoroughly review all submitted documents and credit reports",
                "Dispute Letters: FCRA-compliant dispute letters are prepared and sent to bureaus",
                "Bureau Response: We track and manage all responses from credit bureaus",
                "Verification: Results are verified and documented for your records",
                "Ongoing Support: Continued monitoring and support throughout the process"
              ].map((step, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full gradient-gold flex items-center justify-center text-primary-foreground font-bold">
                    {index + 1}
                  </div>
                  <p className="text-lg text-foreground pt-1">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}