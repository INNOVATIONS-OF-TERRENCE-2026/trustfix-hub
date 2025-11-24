import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Profile() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    full_name: "",
    phone: "",
    ssn_last4: "",
    experian_email: "",
    experian_password: ""
  });

  useEffect(() => {
    checkAuthAndFetch();
  }, []);

  const checkAuthAndFetch = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
      return;
    }
    fetchProfile(session.user.id);
  };

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) throw error;
      
      setProfile({
        full_name: data.full_name || "",
        phone: data.phone || "",
        ssn_last4: data.ssn_last4 || "",
        experian_email: data.experian_email || "",
        experian_password: "" // Never load password
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

  const handleSave = async () => {
    setSaving(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");

      const updateData: any = {
        full_name: profile.full_name,
        phone: profile.phone,
        ssn_last4: profile.ssn_last4,
        experian_email: profile.experian_email
      };

      // Only update password if a new one is provided
      if (profile.experian_password.trim()) {
        updateData.experian_password_encrypted = profile.experian_password;
      }

      const { error } = await supabase
        .from("profiles")
        .update(updateData)
        .eq("id", session.user.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Profile updated successfully"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setSaving(false);
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
        <h1 className="text-4xl font-bold mb-8">Profile Settings</h1>

        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your profile and sensitive information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name</Label>
              <Input
                id="full_name"
                value={profile.full_name}
                onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ssn">Social Security Number (Last 4 Digits)</Label>
              <Input
                id="ssn"
                value={profile.ssn_last4}
                onChange={(e) => setProfile({ ...profile, ssn_last4: e.target.value })}
                maxLength={4}
                placeholder="1234"
              />
              <p className="text-xs text-muted-foreground">Only the last 4 digits for verification</p>
            </div>

            <div className="border-t pt-4 mt-6">
              <h3 className="font-semibold mb-4">Experian Login Credentials</h3>
              <p className="text-sm text-muted-foreground mb-4">
                This information is stored securely and only accessible to admins for case processing
              </p>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="experian_email">Experian Login Email</Label>
                  <Input
                    id="experian_email"
                    type="email"
                    value={profile.experian_email}
                    onChange={(e) => setProfile({ ...profile, experian_email: e.target.value })}
                    placeholder="your-email@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experian_password">Experian Login Password</Label>
                  <Input
                    id="experian_password"
                    type="password"
                    value={profile.experian_password}
                    onChange={(e) => setProfile({ ...profile, experian_password: e.target.value })}
                    placeholder="Enter new password to update"
                  />
                  <p className="text-xs text-muted-foreground">
                    Leave blank to keep current password
                  </p>
                </div>
              </div>
            </div>

            <Button onClick={handleSave} disabled={saving} className="w-full mt-6">
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
