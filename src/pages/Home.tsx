import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import { ResultsPreviewCard } from "@/components/ResultsPreviewCard";
import { 
  Shield, 
  Clock, 
  FileCheck, 
  Lock, 
  Star,
  CheckCircle2,
  TrendingUp,
  Users,
  FileText,
  Home as HomeIcon
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 gradient-green opacity-95" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE4YzAtOS45NC04LjA2LTE4LTE4LTE4UzAgOC4wNiAwIDE4YzAgOS45NCA4LjA2IDE4IDE4IDE4czE4LTguMDYgMTgtMTh6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10" />
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 shadow-gold">
              <Shield className="h-3 w-3 mr-1" />
              FCRA Compliant & Secure
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-primary-foreground mb-6 leading-tight">
              4-Day Guaranteed Results —{" "}
              <span className="text-gradient-gold">Or Your Money Back</span>
            </h1>
            
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Remove Collections • Evictions • Repossessions • Hard Inquiries • Student Loans • ChexSystems
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" asChild className="shadow-gold text-lg px-8">
                <Link to="/pricing">
                  Start today for as low as $50 with BNPL.
                  <Lock className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" asChild variant="outline" className="bg-white/10 backdrop-blur border-white/20 text-primary-foreground hover:bg-white/20">
                <Link to="/chexsystems">
                  24-Hour ChexSystems Removal
                </Link>
              </Button>
            </div>
            
            {/* Payment Providers */}
            <div className="mb-8">
              <p className="text-sm text-primary-foreground/70 mb-3">Payment Plans Available Through:</p>
              <div className="flex flex-wrap items-center justify-center gap-6">
                <span className="text-primary-foreground/90 font-semibold">Afterpay</span>
                <span className="text-primary-foreground/90 font-semibold">Affirm</span>
                <span className="text-primary-foreground/90 font-semibold">Klarna</span>
                <span className="text-primary-foreground/90 font-semibold">Zip</span>
              </div>
            </div>
            
            {/* Bank Logos */}
            <div className="mb-8">
              <p className="text-sm text-primary-foreground/70 mb-3">Trusted by Clients at:</p>
              <div className="flex flex-wrap items-center justify-center gap-6">
                <span className="text-primary-foreground/90 font-semibold">Navy Federal</span>
                <span className="text-primary-foreground/90 font-semibold">Chase</span>
                <span className="text-primary-foreground/90 font-semibold">Bank of America</span>
              </div>
            </div>
            
            <div className="mt-12 flex items-center justify-center gap-8 text-primary-foreground/80 text-sm">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Encrypted Storage
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                FCRA Compliant
              </div>
              <div className="flex items-center gap-2">
                <FileCheck className="h-4 w-4" />
                ID Verified
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
              What We Remove
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive credit repair services backed by our 4-day guarantee
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: TrendingUp,
                title: "Collections",
                description: "Remove unfair collection accounts impacting your score"
              },
              {
                icon: HomeIcon,
                title: "Evictions",
                description: "Clear eviction records from your credit history"
              },
              {
                icon: Users,
                title: "Repossessions",
                description: "Dispute and remove repossession entries"
              },
              {
                icon: FileText,
                title: "Hard Inquiries",
                description: "Remove unauthorized credit inquiries"
              },
              {
                icon: FileCheck,
                title: "Student Loans",
                description: "Challenge inaccurate student loan reporting"
              },
              {
                icon: Shield,
                title: "ChexSystems",
                description: "24-hour removal to restore banking access"
              }
            ].map((service, index) => (
              <Card key={index} className="glass-card hover:shadow-elegant transition-all duration-300 border-accent/20">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-accent/10 w-12 h-12 flex items-center justify-center mb-4">
                    <service.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-display font-bold mb-2 text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-card">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
              Simple 3-Step Process
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "1",
                icon: FileCheck,
                title: "Upload Documents",
                description: "Securely upload your ID and required documents through our encrypted portal"
              },
              {
                step: "2",
                icon: Clock,
                title: "4-Day Guaranteed Results",
                description: "Our team begins work immediately with FCRA-compliant dispute letters"
              },
              {
                step: "3",
                icon: CheckCircle2,
                title: "Results Delivered",
                description: "Get verified results within 4 days or receive a full refund"
              }
            ].map((step, index) => (
              <div key={index} className="relative text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-gold text-primary-foreground text-2xl font-bold mb-4 shadow-gold">
                  {step.step}
                </div>
                <div className="rounded-full bg-accent/10 w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                  <step.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-display font-bold mb-2 text-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Preview */}
      <ResultsPreviewCard />

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-lg text-muted-foreground">Real stories from real clients</p>
          </div>

          <TestimonialsCarousel />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-green opacity-95" />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-primary-foreground mb-6">
              Ready to Fix Your Credit?
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8">
              Join thousands who've improved their credit score with our guaranteed service
            </p>
            <Button size="lg" asChild className="shadow-gold text-lg px-8">
              <Link to="/auth">
                Get Started Now
                <CheckCircle2 className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}