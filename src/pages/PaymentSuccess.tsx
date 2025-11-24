import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2 } from "lucide-react";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get("session_id");
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/portal/dashboard");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12 flex items-center justify-center">
        <Card className="glass-card border-accent/20 max-w-2xl w-full">
          <CardHeader className="text-center">
            <div className="mx-auto w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-6 animate-pulse">
              <CheckCircle2 className="h-12 w-12 text-accent" />
            </div>
            <CardTitle className="text-4xl font-display mb-4">Payment Successful!</CardTitle>
            <div className="inline-block px-4 py-2 bg-accent/10 rounded-full">
              <p className="text-accent font-semibold">✓ Payment Verified</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <div className="space-y-3">
              <p className="text-xl font-semibold">
                Thank you for choosing DeWayne's Credit Repair & Solutions
              </p>
              <p className="text-muted-foreground">
                Your payment has been successfully processed and your case is now active.
              </p>
            </div>

            {sessionId && (
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Transaction ID</p>
                <p className="text-xs font-mono break-all">{sessionId}</p>
              </div>
            )}

            <div className="bg-accent/5 border border-accent/20 rounded-lg p-6 space-y-3">
              <p className="font-semibold text-lg">Your Case Has Been Activated</p>
              <p className="text-sm text-muted-foreground">
                Our team will begin processing your file immediately. You'll receive a confirmation email with next steps.
              </p>
            </div>

            <div className="pt-6 space-y-4">
              <Button 
                onClick={() => navigate("/portal/dashboard")} 
                className="w-full shadow-gold" 
                size="lg"
              >
                Go to Your Dashboard
              </Button>
              
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Redirecting in {countdown} seconds...</span>
              </div>
            </div>

            <div className="pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground mb-2">Need Help?</p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <a href="mailto:Darrellcunningham20@gmail.com" className="text-accent hover:underline">
                  Darrellcunningham20@gmail.com
                </a>
                <span className="hidden sm:inline text-muted-foreground">|</span>
                <a href="tel:4698772300" className="text-accent hover:underline">
                  (469) 877-2300
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
}
