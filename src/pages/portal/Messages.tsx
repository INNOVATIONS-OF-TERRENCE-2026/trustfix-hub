import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

import { LucyAiButton } from "@/components/LucyAiButton";

export default function Messages() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [caseId, setCaseId] = useState("");

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
      return;
    }
    setUserId(session.user.id);
    
    // Get user's case
    const { data: caseData } = await supabase
      .from("cases")
      .select("id")
      .eq("user_id", session.user.id)
      .single();
    
    if (caseData) {
      setCaseId(caseData.id);
      fetchMessages(session.user.id, caseData.id);
      setupRealtimeSubscription(session.user.id, caseData.id);
    } else {
      setLoading(false);
      toast({
        title: "No Active Case",
        description: "You need an active case to send messages.",
        variant: "destructive"
      });
    }
  };

  const fetchMessages = async (uid: string, caseIdParam: string) => {
    try {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("case_id", caseIdParam)
        .order("created_at", { ascending: true });

      if (error) throw error;
      setMessages(data || []);
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

  const setupRealtimeSubscription = (uid: string, caseIdParam: string) => {
    const channel = supabase
      .channel(`messages-${caseIdParam}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
          filter: `case_id=eq.${caseIdParam}`
        },
        () => {
          fetchMessages(uid, caseIdParam);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !caseId) return;

    setSending(true);
    try {
      const { error } = await supabase.from("messages").insert({
        from_user_id: userId,
        case_id: caseId,
        content: newMessage,
        is_admin_message: false
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Message sent successfully"
      });

      setNewMessage("");
      fetchMessages(userId, caseId);
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
        <h1 className="text-4xl font-bold mb-8">Messages</h1>

        <Card className="h-[600px] flex flex-col">
          <CardHeader>
            <CardTitle>Chat with Support</CardTitle>
            <CardDescription>Send and receive messages from your agent</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 border rounded-lg bg-muted/10">
              {messages.length > 0 ? (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.from_user_id === userId ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] p-3 rounded-lg ${
                        msg.from_user_id === userId
                          ? "bg-primary text-primary-foreground"
                          : "bg-card border"
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {new Date(msg.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-8">No messages yet</p>
              )}
            </div>

            <div className="flex gap-2">
              <Textarea
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                className="resize-none"
                rows={3}
              />
              <Button onClick={handleSendMessage} disabled={sending || !newMessage.trim()}>
                {sending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
      <LucyAiButton />
    </div>
  );
}
