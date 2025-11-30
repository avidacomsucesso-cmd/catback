import React from "react";
import { Menu, Cat, Home, CreditCard, Users, Calendar, Megaphone, Settings, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { showSuccess } from "@/utils/toast";
import { useProfile } from "@/hooks/use-profile"; 
import { useBusinessSettings } from "@/hooks/use-business-settings"; // Import useBusinessSettings

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { name: "Visão Geral", href: "/dashboard/overview", icon: Home },
  { name: "Fidelização", href: "/dashboard/loyalty", icon: CreditCard },
  { name: "Agendamento", href: "/dashboard/scheduling", icon: Calendar },
  { name: "Clientes (CRM)", href: "/dashboard/clients", icon: Users },
  { name: "Marketing", href: "/dashboard/marketing", icon: Megaphone },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    showSuccess("Sessão encerrada com sucesso.");
    navigate("/login");
  };

  return (
    <div className="flex flex-col h-full bg-sidebar dark:bg-sidebar-background border-r border-sidebar-border dark:border-gray-700">
      <div className="p-4 border-b border-sidebar-border dark:border-gray-700">
        <Link to="/dashboard/overview" className="flex items-center space-x-2 text-xl font-bold text-sidebar-primary dark:text-sidebar-foreground">
          <Cat className="w-6 h-6 text-catback-purple" />
          <span>CATBACK</span>
        </Link>
      </div>
      
      <nav className="flex-grow p-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              "flex items-center space-x-3 p-3 rounded-lg transition-colors",
              location.pathname.startsWith(item.href)
                ? "bg-sidebar-accent dark:bg-catback-dark-purple text-sidebar-primary dark:text-white font-semibold"
                : "text-sidebar-foreground dark:text-gray-300 hover:bg-sidebar-accent dark:hover:bg-gray-700"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border dark:border-gray-700 space-y-2">
        <Link
          to="/dashboard/settings"
          className={cn(
            "flex items-center space-x-3 p-3 rounded-lg transition-colors",
            location.pathname.startsWith("/dashboard/settings")
              ? "bg-sidebar-accent dark:bg-catback-dark-purple text-sidebar-primary dark:text-white font-semibold"
              : "text-sidebar-foreground dark:text-gray-300 hover:bg-sidebar-accent dark:hover:bg-gray-700"
          )}
        >
          <Settings className="w-5 h-5" />
          <span>Configurações</span>
        </Link>
        <Button 
          onClick={handleLogout} 
          variant="ghost" 
          className="w-full justify-start text-red-500 hover:bg-red-500/10"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Sair
        </Button>
      </div>
    </div>
  );
};

const DashboardHeader: React.FC<{ onMenuClick: () => void }> = ({ onMenuClick }) => {
  const { data: profile, isLoading: isLoadingProfile } = useProfile();
  const { data: businessSettings, isLoading: isLoadingSettings } = useBusinessSettings(); // Use business settings
  const { user } = useAuth();

  let businessName = "Carregando...";
  const isLoading = isLoadingProfile || isLoadingSettings;

  if (!isLoading) {
    if (businessSettings?.business_name) {
        businessName = businessSettings.business_name;
    } else if (profile) {
        const fullName = [profile.first_name, profile.last_name].filter(Boolean).join(' ');
        businessName = fullName || user?.email?.split('@')[0] || "Lojista";
    } else if (user) {
        businessName = user.email?.split('@')[0] || "Lojista";
    }
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 h-16 flex items-center px-4 lg:px-8">
      <Button variant="ghost" size="icon" className="lg:hidden mr-4" onClick={onMenuClick}>
        <Menu className="h-6 w-6" />
      </Button>
      <h1 className="text-xl font-semibold text-gray-900 dark:text-white truncate">
        Dashboard | {businessName}
      </h1>
      {/* Future: User profile/notifications can go here */}
    </header>
  );
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Sidebar (Sheet) */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild>
          {/* Hidden trigger, activated by DashboardHeader button */}
          <div className="hidden"></div>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <Sidebar />
        </SheetContent>
      </Sheet>

      <div className="flex flex-col flex-grow">
        <DashboardHeader onMenuClick={() => setIsMobileMenuOpen(true)} />
        <main className="flex-grow p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;