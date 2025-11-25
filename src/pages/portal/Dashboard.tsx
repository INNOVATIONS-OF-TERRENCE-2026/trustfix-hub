import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, FileText, MessageSquare, Clock, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

import { LucyAiButton } from "@/components/LucyAiButton";

export default function Dashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const [caseData, setCaseData] = useState<any>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [timeRemaining, setTimeRemaining] = useState<string>("");

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (caseData?.sla_deadline) {
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const deadline = new Date(caseData.sla_deadline).getTime();
        const distance = deadline - now;

        if (distance < 0) {
          setTimeRemaining("EXPIRED");
          clearInterval(interval);
        } else {
          const hours = Math.floor(distance / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          setTimeRemaining(`${hours}h ${minutes}m`);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [caseData]);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
      return;
    }
    fetchDashboardData(session.user.id);
  };

  const fetchDashboardData = async (userId: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const [profileRes, caseRes, docsRes, msgsRes] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", userId).single(),
        supabase.functions.invoke("get-active-case", {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        }),
        supabase.from("documents").select("*").eq("user_id", userId).order("uploaded_at", { ascending: false }).limit(5),
        supabase.from("messages").select("*").eq("to_user_id", userId).order("created_at", { ascending: false }).limit(5)
      ]);

      setUserData(profileRes.data);
      setCaseData(caseRes.data?.case || null);
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

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      not_started: "bg-muted text-muted-foreground",
      files_needed: "bg-warning text-warning-foreground",
      under_review: "bg-info text-info-foreground",
      in_progress: "bg-primary text-primary-foreground",
      completed: "bg-success text-success-foreground"
    };
    return colors[status] || "bg-muted text-muted-foreground";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome back, {userData?.full_name}</h1>
          <p className="text-muted-foreground">Track your credit repair progress</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Case Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              {caseData ? (
                <div className="space-y-2">
                  <Badge className={getStatusColor(caseData.status)}>
                    {caseData.status.replace(/_/g, " ").toUpperCase()}
                  </Badge>
                  <p className="text-sm text-muted-foreground">
                    Current Stage: {caseData.current_stage?.replace(/_/g, " ")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Product: {caseData.service_type || "Credit Repair"}
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">No active case yet.</p>
                  <Button size="sm" onClick={() => navigate("/pricing")}>
                    View Plans
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                SLA Timer
              </CardTitle>
            </CardHeader>
            <CardContent>
              {caseData?.sla_deadline ? (
                <div className="space-y-2">
                  <p className={`text-3xl font-bold ${
                    timeRemaining === "EXPIRED" ? "text-destructive" : "text-accent"
                  }`}>
                    {timeRemaining}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {timeRemaining === "EXPIRED" ? "SLA deadline has passed" : "Time remaining"}
                  </p>
                  {timeRemaining === "EXPIRED" && (
                    <p className="text-sm text-destructive font-semibold">
                      Refund eligible - Contact support
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Not started</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Messages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{messages.length}</p>
              <p className="text-sm text-muted-foreground">Unread messages</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Documents</CardTitle>
              <CardDescription>Your uploaded documents</CardDescription>
            </CardHeader>
            <CardContent>
              {documents.length > 0 ? (
                <div className="space-y-2">
                  {documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">{doc.type.replace(/_/g, " ")}</span>
                      <Badge variant="outline">{doc.verification_status}</Badge>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full" onClick={() => navigate("/portal/documents")}>
                    View All Documents
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <AlertCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-4">No documents uploaded yet</p>
                  <Button onClick={() => navigate("/portal/documents")}>Upload Documents</Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Messages</CardTitle>
              <CardDescription>Messages from your agent</CardDescription>
            </CardHeader>
            <CardContent>
              {messages.length > 0 ? (
                <div className="space-y-2">
                  {messages.map((msg) => (
                    <div key={msg.id} className="p-2 border rounded">
                      <p className="text-sm line-clamp-2">{msg.content}</p>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full" onClick={() => navigate("/portal/messages")}>
                    View All Messages
                  </Button>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">No messages yet</p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
      <LucyAiButton />
    </div>
  );
}
