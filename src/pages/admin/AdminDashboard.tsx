import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Users, DollarSign, Clock, Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [clients, setClients] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [stats, setStats] = useState({ totalClients: 0, activeMembers: 0, totalRevenue: 0 });

  useEffect(() => {
    checkAdminAuth();
  }, []);

  const checkAdminAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
      return;
    }

    // Check if user has admin role
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .eq("role", "admin")
      .single();

    if (!roles) {
      toast({
        title: "Access Denied",
        description: "You don't have admin privileges",
        variant: "destructive"
      });
      navigate("/portal/dashboard");
      return;
    }

    setIsAdmin(true);
    fetchAdminData(session.user.id);
  };

  const fetchAdminData = async (adminId: string) => {
    try {
      const [clientsRes, notificationsRes, paymentsRes] = await Promise.all([
        supabase
          .from("cases")
          .select(`
            *,
            profiles!cases_user_id_fkey (full_name, phone),
            payments (amount, stripe_product_id)
          `)
          .order("created_at", { ascending: false }),
        supabase
          .from("admin_notifications")
          .select("*")
          .eq("admin_user_id", adminId)
          .eq("read", false)
          .order("created_at", { ascending: false })
          .limit(10),
        supabase
          .from("payments")
          .select("amount")
          .eq("payment_status", "paid")
      ]);

      setClients(clientsRes.data || []);
      setNotifications(notificationsRes.data || []);
      
      const totalRevenue = paymentsRes.data?.reduce((sum, p) => sum + Number(p.amount), 0) || 0;
      const activeMembers = clientsRes.data?.filter(c => c.status === 'active_member').length || 0;
      
      setStats({
        totalClients: clientsRes.data?.length || 0,
        activeMembers,
        totalRevenue
      });
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

  const getSLAStatus = (deadline: string | null) => {
    if (!deadline) return { text: "Not Started", color: "bg-muted" };
    
    const now = new Date().getTime();
    const deadlineTime = new Date(deadline).getTime();
    const distance = deadlineTime - now;
    
    if (distance < 0) return { text: "EXPIRED", color: "bg-destructive" };
    
    const hours = Math.floor(distance / (1000 * 60 * 60));
    return { text: `${hours}h remaining`, color: hours < 12 ? "bg-warning" : "bg-success" };
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
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage clients and monitor operations</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Total Clients
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.totalClients}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Active Members
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.activeMembers}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">${stats.totalRevenue.toFixed(2)}</p>
            </CardContent>
          </Card>
        </div>

        {/* Notifications */}
        {notifications.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Recent Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {notifications.map((notif) => (
                  <div key={notif.id} className="p-3 border rounded-lg">
                    <p className="font-medium">{notif.title}</p>
                    <p className="text-sm text-muted-foreground">{notif.message}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Clients List */}
        <Card>
          <CardHeader>
            <CardTitle>All Clients</CardTitle>
            <CardDescription>Manage client cases and information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {clients.map((client) => {
                const slaStatus = getSLAStatus(client.sla_deadline);
                return (
                  <div key={client.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{client.profiles?.full_name || 'Unknown'}</p>
                      <p className="text-sm text-muted-foreground">{client.profiles?.phone}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge className={`${slaStatus.color} text-white`}>
                        {slaStatus.text}
                      </Badge>
                      <Badge variant="outline">{client.status.replace(/_/g, ' ')}</Badge>
                      <Button 
                        size="sm" 
                        onClick={() => navigate(`/admin/client/${client.user_id}`)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
