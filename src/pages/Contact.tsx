import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([formData]);

      if (error) throw error;

      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });

      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero */}
        <section className="py-20 gradient-green">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-display font-bold text-primary-foreground mb-6">
                Get In Touch
              </h1>
              <p className="text-lg text-primary-foreground/90">
                Have questions? We're here to help.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-20 bg-background">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Form */}
              <Card className="glass-card border-accent/20">
                <CardHeader>
                  <CardTitle className="text-2xl font-display">Send Us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Input
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Input
                        type="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Input
                        type="tel"
                        placeholder="Phone Number (Optional)"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <Textarea
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        rows={5}
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full shadow-gold" 
                      disabled={loading}
                    >
                      {loading ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <div className="space-y-6">
                <Card className="glass-card border-accent/20">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-accent/10 w-12 h-12 flex items-center justify-center flex-shrink-0">
                        <Mail className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Email Us</h3>
                        <p className="text-muted-foreground">support@dewaynescreditrepair.com</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card border-accent/20">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-accent/10 w-12 h-12 flex items-center justify-center flex-shrink-0">
                        <Phone className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Call Us</h3>
                        <p className="text-muted-foreground">1-800-CREDIT-FIX</p>
                        <p className="text-sm text-muted-foreground mt-1">Mon-Fri: 9AM-6PM EST</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card border-accent/20">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-accent/10 w-12 h-12 flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Visit Us</h3>
                        <p className="text-muted-foreground">
                          123 Credit Repair Lane<br />
                          Financial District<br />
                          New York, NY 10004
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}