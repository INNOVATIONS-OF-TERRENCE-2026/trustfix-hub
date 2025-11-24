import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Upload, Clock, FileText, MessageSquare } from "lucide-react";

export default function Success() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Success Card */}
          <Card className="glass-card border-accent/20 mb-8">
            <CardHeader className="text-center">
              <div className="mx-auto w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                <CheckCircle className="h-12 w-12 text-accent" />
              </div>
              <CardTitle className="text-4xl font-display mb-4">Welcome to DeWayne's Credit!</CardTitle>
              <p className="text-xl text-muted-foreground">
                Your payment has been confirmed and your case is now active.
              </p>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="text-center space-y-4">
                <div className="bg-accent/5 rounded-lg p-6 border border-accent/20">
                  <p className="text-lg font-semibold mb-2">🎉 Case Activation Confirmed</p>
                  <p className="text-muted-foreground">
                    Your credit restoration case has been opened and our team is ready to begin processing your file immediately.
                  </p>
                </div>

                {sessionId && (
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">Confirmation ID</p>
                    <p className="text-xs font-mono break-all">{sessionId}</p>
                  </div>
                )}
              </div>

              {/* What Happens Next Timeline */}
              <div className="space-y-6 pt-4">
                <h3 className="font-semibold text-2xl font-display text-center mb-6">What Happens Next?</h3>
                
                <div className="grid gap-6">
                  <div className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                      <Upload className="h-6 w-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg mb-2">Step 1: Upload Your Documents</h4>
                      <p className="text-muted-foreground">
                        Upload your Driver's License or Government ID (front only) and Social Security Card to your secure client portal.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                      <Clock className="h-6 w-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg mb-2">Step 2: SLA Timer Starts</h4>
                      <p className="text-muted-foreground">
                        Your guaranteed service timeline begins as soon as we receive all required documents. Track your progress in real-time.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                      <FileText className="h-6 w-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg mb-2">Step 3: We Begin Processing</h4>
                      <p className="text-muted-foreground">
                        Our expert team will review your file and begin drafting and submitting disputes on your behalf within your SLA timeline.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                      <MessageSquare className="h-6 w-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg mb-2">Step 4: Stay Updated</h4>
                      <p className="text-muted-foreground">
                        Receive real-time updates via email, SMS, and your client portal as we work on your case.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button asChild className="flex-1 shadow-gold" size="lg">
                  <Link to="/portal/documents">
                    <Upload className="mr-2 h-5 w-5" />
                    Upload Documents Now
                  </Link>
                </Button>
                <Button asChild variant="outline" className="flex-1" size="lg">
                  <Link to="/portal/dashboard">
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>

              {/* Support Section */}
              <div className="text-center pt-8 border-t border-border">
                <p className="text-sm text-muted-foreground mb-3">
                  Questions? Our support team is here to help.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <a href="mailto:Darrellcunningham20@gmail.com" className="text-accent hover:underline font-semibold">
                    Darrellcunningham20@gmail.com
                  </a>
                  <span className="hidden sm:inline text-muted-foreground">|</span>
                  <a href="tel:4698772300" className="text-accent hover:underline font-semibold">
                    (469) 877-2300
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Important Reminder */}
          <Card className="glass-card border-accent/20">
            <CardContent className="p-6">
              <div className="flex gap-3 items-start">
                <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold mb-2">Important Reminder</p>
                  <p className="text-sm text-muted-foreground">
                    To ensure the fastest processing of your case, please upload your documents as soon as possible. 
                    Your SLA guarantee begins only after all required documents are received and verified by our team.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
