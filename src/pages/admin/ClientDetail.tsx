import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2, Send, FileText, Shield, Mail, Phone, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { STRIPE_PRODUCTS } from "@/config/stripeProducts";

export default function ClientDetail() {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [clientData, setClientData] = useState<any>(null);
  const [caseData, setCaseData] = useState<any>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    checkAdminAndFetch();
  }, [clientId]);

  const checkAdminAndFetch = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
      return;
    }

    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .eq("role", "admin")
      .single();

    if (!roles) {
      navigate("/portal/dashboard");
      return;
    }

    fetchClientData();
  };

  const fetchClientData = async () => {
    try {
      const [profileRes, caseRes, docsRes, msgsRes] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", clientId).single(),
        supabase.from("cases").select(`
          *,
          payments (amount, stripe_product_id, stripe_price_id, created_at)
        `).eq("user_id", clientId).single(),
        supabase.from("documents").select("*").eq("user_id", clientId).order("uploaded_at", { ascending: false }),
        supabase.from("messages").select("*").or(`from_user_id.eq.${clientId},to_user_id.eq.${clientId}`).order("created_at", { ascending: true })
      ]);

      setClientData(profileRes.data);
      setCaseData(caseRes.data);
      setDocuments(docsRes.data || []);
      setMessages(msgsRes.data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    setSending(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      const { error } = await supabase.from("messages").insert({
        from_user_id: session!.user.id,
        to_user_id: clientId,
        content: newMessage,
        is_admin_message: true
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Message sent to client"
      });

      setNewMessage("");
      fetchClientData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setSending(false);
    }
  };

  const getProductInfo = (productId: string) => {
    return STRIPE_PRODUCTS.find(p => p.stripeProductId === productId);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const productInfo = caseData?.payments?.[0]?.stripe_product_id 
    ? getProductInfo(caseData.payments[0].stripe_product_id)
    : null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Button variant="outline" onClick={() => navigate("/admin/dashboard")} className="mb-6">
          ← Back to Dashboard
        </Button>

        <h1 className="text-4xl font-bold mb-8">{clientData?.full_name}</h1>

        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          {/* Client Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Client Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  {clientData?.phone || 'Not provided'}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Experian Email</p>
                <p className="font-medium flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {clientData?.experian_email || 'Not provided'}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">SSN (Last 4)</p>
                <p className="font-medium">{clientData?.ssn_last4 || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Product Purchased</p>
                <p className="font-medium">{productInfo?.name || 'Unknown'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Case Status</p>
                <Badge>{caseData?.status?.replace(/_/g, ' ').toUpperCase()}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* SLA Timer */}
          <Card>
            <CardHeader>
              <CardTitle>SLA Status</CardTitle>
            </CardHeader>
            <CardContent>
              {caseData?.sla_deadline ? (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Service Type</p>
                  <Badge className="mb-4">{caseData.sla_hours}hr SLA</Badge>
                  <p className="text-sm text-muted-foreground mb-2">Deadline</p>
                  <p className="text-2xl font-bold mb-2">
                    {new Date(caseData.sla_deadline).toLocaleString()}
                  </p>
                </div>
              ) : (
                <p className="text-muted-foreground">Not started</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Documents */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Documents
            </CardTitle>
          </CardHeader>
          <CardContent>
            {documents.length > 0 ? (
              <div className="space-y-2">
                {documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <p className="font-medium">{doc.type.replace(/_/g, ' ')}</p>
                      <p className="text-sm text-muted-foreground">
                        Uploaded {new Date(doc.uploaded_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge>{doc.verification_status}</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">No documents uploaded</p>
            )}
          </CardContent>
        </Card>

        {/* Messages */}
        <Card>
          <CardHeader>
            <CardTitle>Messages</CardTitle>
            <CardDescription>Communicate with the client</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-3 rounded-lg ${
                    msg.is_admin_message ? "bg-primary text-primary-foreground ml-auto max-w-[80%]" : "bg-muted max-w-[80%]"
                  }`}
                >
                  <p>{msg.content}</p>
                  <p className="text-xs opacity-70 mt-1">{new Date(msg.created_at).toLocaleString()}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Textarea
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                rows={3}
              />
              <Button onClick={handleSendMessage} disabled={sending || !newMessage.trim()}>
                {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
