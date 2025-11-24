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
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import About from "./pages/About";
import Careers from "./pages/Careers";
import BlogPost from "./pages/BlogPost";
import Dashboard from "./pages/Dashboard";
import CustomerCards from "./pages/CustomerCards"; 
import CustomerAuth from "./pages/CustomerAuth"; // Import the new customer auth page
import CustomerCardEnrollment from "./pages/CustomerCardEnrollment"; // Import the new enrollment page

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
            
            {/* Customer Routes */}
            <Route path="/customer-auth" element={<CustomerAuth />} />
            <Route path="/enroll" element={<CustomerCardEnrollment />} /> {/* Public Enrollment Link */}
            
            {/* Protected Routes (Lojista) */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard/*" element={<Dashboard />} /> 
            </Route>

            {/* Protected Customer Route (Visualização dos Cartões) */}
            <Route element={<ProtectedRoute redirectPath="/customer-auth" />}>
                <Route path="/customer-cards" element={<CustomerCards />} />
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