import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Users, DollarSign, Clock, Bell, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const ADMIN_EMAIL = "beatzbyyt.ceo@gmail.com";

export default function Admin() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [stats, setStats] = useState({ totalClients: 0, activeMembers: 0, totalRevenue: 0 });

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      toast({
        title: "Access Denied",
        description: "Please log in to access this page",
        variant: "destructive"
      });
      navigate("/auth");
      return;
    }

    // Check if user email matches admin email
    if (session.user.email !== ADMIN_EMAIL) {
      toast({
        title: "Access Denied",
        description: "You do not have permission to access the admin portal",
        variant: "destructive"
      });
      navigate("/portal/dashboard");
      return;
    }

    fetchAdminData();
  };

  const fetchAdminData = async () => {
    try {
      const [clientsRes, paymentsRes, casesRes] = await Promise.all([
        supabase
          .from("profiles")
          .select("*")
          .order("created_at", { ascending: false }),
        supabase
          .from("payments")
          .select("amount, payment_status")
          .eq("payment_status", "completed"),
        supabase
          .from("cases")
          .select("*")
          .eq("status", "active_member")
      ]);

      setClients(clientsRes.data || []);
      
      const totalRevenue = paymentsRes.data?.reduce((sum, p) => sum + Number(p.amount), 0) || 0;
      const activeMembers = casesRes.data?.length || 0;
      
      setStats({
        totalClients: clientsRes.data?.length || 0,
        activeMembers,
        totalRevenue
      });

      // Fetch recent notifications
      const { data: notifData } = await supabase
        .from("admin_notifications")
        .select("*")
        .eq("read", false)
        .order("created_at", { ascending: false })
        .limit(5);
      
      setNotifications(notifData || []);

    } catch (error: any) {
      toast({
        title: "Error loading data",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
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
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-8 w-8 text-accent" />
            <h1 className="text-4xl font-bold">Admin Portal</h1>
          </div>
          <p className="text-muted-foreground">Manage clients, view analytics, and monitor operations</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card className="glass-card border-accent/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-accent" />
                Total Clients
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.totalClients}</p>
            </CardContent>
          </Card>

          <Card className="glass-card border-accent/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-accent" />
                Active Members
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.activeMembers}</p>
            </CardContent>
          </Card>

          <Card className="glass-card border-accent/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-accent" />
                Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">${stats.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </CardContent>
          </Card>
        </div>

        {/* Notifications */}
        {notifications.length > 0 && (
          <Card className="mb-8 glass-card border-accent/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-accent" />
                Recent Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.map((notif) => (
                  <div key={notif.id} className="p-4 border border-accent/20 rounded-lg hover:bg-accent/5 transition-colors">
                    <p className="font-medium text-foreground">{notif.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">{notif.message}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(notif.created_at).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent Clients */}
        <Card className="glass-card border-accent/20">
          <CardHeader>
            <CardTitle>Recent Clients</CardTitle>
            <CardDescription>Latest client registrations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {clients.slice(0, 10).map((client) => (
                <div key={client.id} className="flex items-center justify-between p-4 border border-accent/20 rounded-lg hover:bg-accent/5 transition-colors">
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{client.full_name}</p>
                    <p className="text-sm text-muted-foreground">{client.phone || 'No phone'}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-xs">
                      {new Date(client.created_at).toLocaleDateString()}
                    </Badge>
                    <Button 
                      size="sm" 
                      onClick={() => navigate(`/admin/client/${client.id}`)}
                      className="shadow-gold"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
              {clients.length === 0 && (
                <p className="text-center text-muted-foreground py-8">No clients yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mt-8 flex gap-4 justify-center">
          <Button 
            onClick={() => navigate("/admin/dashboard")}
            variant="outline"
            className="shadow-elegant"
          >
            Full Admin Dashboard
          </Button>
          <Button 
            onClick={() => navigate("/admin/checkout-test")}
            variant="outline"
            className="shadow-elegant"
          >
            Checkout Test Tool
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
