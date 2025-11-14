import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

export const Header = () => {
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
          <Link to="/auth" className="text-foreground/80 hover:text-foreground transition-colors">
            Login
          </Link>
        </nav>

        <Button asChild className="shadow-gold">
          <Link to="/auth">Start My Repair</Link>
        </Button>
      </div>
    </header>
  );
};