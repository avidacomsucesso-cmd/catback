import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/use-auth";
import ProtectedRoute from "@/components/ProtectedRoute"; // Import ProtectedRoute
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Industries from "./pages/Industries";
import HowItWorks from "./pages/HowItWorks";
import Blog from "./pages/Blog";
import Help from "./pages/Help";
import Login from "./pages/Login"; // Re-importing Login
import Signup from "./pages/Signup";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import About from "./pages/About";
import Careers from "./pages/Careers";
import BlogPost from "./pages/BlogPost";
import Dashboard from "./pages/Dashboard"; // Re-importing Dashboard
import CustomerCards from "./pages/CustomerCards"; // Re-importing CustomerCards
import CustomerAuth from "./pages/CustomerAuth";
import CustomerSignup from "./pages/CustomerSignup"; 
import CustomerCardEnrollment from "./pages/CustomerCardEnrollment";
import CustomerBooking from "./pages/CustomerBooking";
import CustomerSettings from "./pages/CustomerSettings"; 
import PublicBooking from "./pages/PublicBooking"; 
import CustomerBookingConfirm from "./pages/CustomerBookingConfirm"; 
import ForgotPasswordLojista from "./pages/ForgotPasswordLojista"; 
import ForgotPasswordCliente from "./pages/ForgotPasswordCliente"; 
import NfcDisplay from "./pages/NfcDisplay"; 
import NfcCheckout from "./pages/NfcCheckout"; 
import CheckoutSuccess from "./pages/CheckoutSuccess"; 

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/features" element={<Features />} />
            <Route path="/nfc-display" element={<NfcDisplay />} /> 
            <Route path="/nfc-display/checkout" element={<NfcCheckout />} /> 
            <Route path="/nfc-display/success" element={<CheckoutSuccess />} /> 
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/help" element={<Help />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/about" element={<About />} />
            <Route path="/careers" element={<Careers />} />
            
            {/* Forgot Password Routes */}
            <Route path="/forgot-password-lojista" element={<ForgotPasswordLojista />} />
            <Route path="/forgot-password-cliente" element={<ForgotPasswordCliente />} />
            
            {/* Customer Routes (Public/Auth Entry) */}
            <Route path="/customer-auth" element={<CustomerAuth />} />
            <Route path="/customer-signup" element={<CustomerSignup />} /> 
            <Route path="/enroll" element={<CustomerCardEnrollment />} />
            <Route path="/public-booking" element={<PublicBooking />} /> 
            
            {/* Protected Customer Routes */}
            <Route element={<ProtectedRoute redirectPath="/customer-auth" />}>
                <Route path="/customer-cards" element={<CustomerCards />} />
                <Route path="/customer-booking" element={<CustomerBooking />} />
                <Route path="/customer-booking-confirm" element={<CustomerBookingConfirm />} /> 
                <Route path="/customer-settings" element={<CustomerSettings />} />
            </Route>

            {/* Protected Routes (Lojista) */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard/*" element={<Dashboard />} /> 
            </Route>

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;