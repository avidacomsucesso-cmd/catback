import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import LoyaltyPage from "@/components/dashboard/LoyaltyPage"; 
import ClientsPage from "@/components/dashboard/ClientsPage"; // Import the new ClientsPage

// Placeholder Pages for Dashboard Sections
const OverviewPage = () => (
  <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
    <h2 className="text-3xl font-bold text-catback-purple mb-4">Visão Geral</h2>
    <p className="text-gray-700 dark:text-gray-300">
      Bem-vindo ao seu Dashboard CATBACK. Comece configurando seu Cartão de Fidelidade!
    </p>
    {/* Add quick stats here later */}
  </div>
);
const SchedulingPage = () => (
  <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
    <h2 className="text-3xl font-bold text-catback-purple mb-4">Agendamento Online</h2>
    <p className="text-gray-700 dark:text-gray-300">
      Gerencie seu calendário, serviços e lembretes automáticos.
    </p>
  </div>
);
const MarketingPage = () => (
  <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
    <h2 className="text-3xl font-bold text-catback-purple mb-4">Marketing Automatizado</h2>
    <p className="text-gray-700 dark:text-gray-300">
      Crie campanhas de SMS/WhatsApp e e-mail.
    </p>
  </div>
);
const SettingsPage = () => (
  <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
    <h2 className="text-3xl font-bold text-catback-purple mb-4">Configurações</h2>
    <p className="text-gray-700 dark:text-gray-300">
      Gerencie seu perfil, planos e integrações.
    </p>
  </div>
);


const Dashboard: React.FC = () => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-catback-purple" />
      </div>
    );
  }

  return (
    <DashboardLayout>
      <Routes>
        {/* Redirect /dashboard to /dashboard/overview */}
        <Route path="/" element={<Navigate to="overview" replace />} />
        
        <Route path="overview" element={<OverviewPage />} />
        <Route path="loyalty" element={<LoyaltyPage />} />
        <Route path="scheduling" element={<SchedulingPage />} />
        <Route path="clients" element={<ClientsPage />} />
        <Route path="marketing" element={<MarketingPage />} />
        <Route path="settings" element={<SettingsPage />} />
        
        {/* Catch-all for dashboard sub-routes */}
        <Route path="*" element={<OverviewPage />} />
      </Routes>
    </DashboardLayout>
  );
};

export default Dashboard;