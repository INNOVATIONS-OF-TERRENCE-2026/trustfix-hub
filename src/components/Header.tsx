import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, LogOut, User, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

const ADMIN_EMAIL = "darrellcunningham20@gmail.com";

export const Header = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsAdmin(session?.user?.email === ADMIN_EMAIL);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setIsAdmin(session?.user?.email === ADMIN_EMAIL);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out",
      description: "You've been successfully logged out."
    });
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-accent" />
          <span className="text-xl font-display font-bold text-foreground">
            DeWayne's Credit Repair
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link to="/" className="text-foreground/80 hover:text-foreground transition-colors">
            Home
          </Link>
          <Link to="/services" className="text-foreground/80 hover:text-foreground transition-colors">
            Services
          </Link>
          <Link to="/pricing" className="text-foreground/80 hover:text-foreground transition-colors">
            Pricing
          </Link>
          <Link to="/faq" className="text-foreground/80 hover:text-foreground transition-colors">
            FAQ
          </Link>
          {user ? (
            <>
              <Link to="/portal/dashboard" className="text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1">
                <User className="h-4 w-4" />
                Portal
              </Link>
              {isAdmin && (
                <Link to="/admin" className="text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1">
                  <ShieldCheck className="h-4 w-4" />
                  Admin
                </Link>
              )}
            </>
          ) : (
            <Link to="/auth" className="text-foreground/80 hover:text-foreground transition-colors">
              Login
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          ) : (
            <Button asChild className="shadow-gold">
              <Link to="/auth">Start My Repair</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};