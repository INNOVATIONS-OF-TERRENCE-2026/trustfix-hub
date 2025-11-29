import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LucyAiButton } from "@/components/LucyAiButton";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Pricing from "./pages/Pricing";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/portal/Dashboard";
import Documents from "./pages/portal/Documents";
import Messages from "./pages/portal/Messages";
import Profile from "./pages/portal/Profile";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Admin from "./pages/admin/Admin";
import ClientDetail from "./pages/admin/ClientDetail";
import ChexSystems from "./pages/ChexSystems";
import Payments from "./pages/Payments";
import Success from "./pages/Success";
import PaymentSuccess from "./pages/PaymentSuccess";
import Cancel from "./pages/Cancel";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Guarantee from "./pages/Guarantee";
import Results from "./pages/Results";
import CheckoutTest from "./pages/admin/CheckoutTest";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <LucyAiButton />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/chexsystems" element={<ChexSystems />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/portal/dashboard" element={<Dashboard />} />
          <Route path="/portal/documents" element={<Documents />} />
          <Route path="/portal/messages" element={<Messages />} />
          <Route path="/portal/profile" element={<Profile />} />
          <Route path="/success" element={<Success />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/guarantee" element={<Guarantee />} />
          <Route path="/results" element={<Results />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/client/:clientId" element={<ClientDetail />} />
          <Route path="/admin/checkout-test" element={<CheckoutTest />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
