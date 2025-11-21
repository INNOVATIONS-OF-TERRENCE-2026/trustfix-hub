import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XCircle, ArrowLeft } from "lucide-react";

export default function Cancel() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="glass-card border-border">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <XCircle className="h-8 w-8 text-muted-foreground" />
              </div>
              <CardTitle className="text-3xl font-display">Payment Cancelled</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-2">
                <p className="text-lg text-muted-foreground">
                  Your payment was not completed
                </p>
                <p className="text-sm text-muted-foreground">
                  No charges were made to your account. You can try again whenever you're ready.
                </p>
              </div>

              <div className="space-y-4 pt-4">
                <h3 className="font-semibold text-lg">Still need help with your credit?</h3>
                <p className="text-sm text-muted-foreground">
                  Our team is here to answer any questions you might have about our services, pricing, or the credit repair process.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                    <span>4-Day Guaranteed Results</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                    <span>24-Hour ChexSystems Removal</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                    <span>Flexible Payment Options with Affirm, Afterpay & Klarna</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                    <span>Money-Back Guarantee</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button asChild className="flex-1 shadow-gold">
                  <Link to="/payments">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Try Again
                  </Link>
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>

              <div className="text-center pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground mb-2">
                  Questions? We're here to help:
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
