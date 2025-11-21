import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";

export default function Success() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading the session details
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="glass-card border-accent/20">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-accent" />
              </div>
              <CardTitle className="text-3xl font-display">Payment Successful!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-2">
                <p className="text-lg text-muted-foreground">
                  Thank you for choosing DeWayne's Credit Repair & Solutions
                </p>
                <p className="text-sm text-muted-foreground">
                  Your payment has been processed successfully. You will receive a confirmation email shortly.
                </p>
              </div>

              {sessionId && (
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-1">Session ID</p>
                  <p className="text-xs font-mono break-all">{sessionId}</p>
                </div>
              )}

              <div className="space-y-4 pt-4">
                <h3 className="font-semibold text-lg">What happens next?</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <span>You'll receive a confirmation email with your receipt and service details</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <span>Our team will begin processing your case within 24 hours</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <span>Check your client portal for real-time updates on your case progress</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <span>Our support team is available if you have any questions</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button asChild className="flex-1 shadow-gold">
                  <Link to="/portal/dashboard">
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <Link to="/">Return Home</Link>
                </Button>
              </div>

              <div className="text-center pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground mb-2">
                  Need help? Contact us:
                </p>
                <p className="text-sm font-semibold">
                  <a href="mailto:Darrellcunningham20@gmail.com" className="text-accent hover:underline">
                    Darrellcunningham20@gmail.com
                  </a>
                  {" | "}
                  <a href="tel:4698772300" className="text-accent hover:underline">
                    (469) 877-2300
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
