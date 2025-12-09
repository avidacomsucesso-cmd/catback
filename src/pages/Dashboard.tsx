import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import LoyaltyPage from "@/components/dashboard/LoyaltyPage"; 
import ClientsPage from "@/components/dashboard/ClientsPage"; 
import ProfileSettingsForm from "@/components/dashboard/ProfileSettingsForm"; 
import PasswordSettingsForm from "@/components/dashboard/PasswordSettingsForm"; 
import LoyaltyCustomersPage from "@/components/dashboard/LoyaltyCustomersPage"; 
import CustomerCardDetailsPage from "@/components/dashboard/CustomerCardDetailsPage";
import SchedulingPage from "@/components/dashboard/SchedulingPage";
import DashboardStats from "@/components/dashboard/DashboardStats";
import DashboardCharts from "@/components/dashboard/DashboardCharts";
import MarketingPage from "@/components/dashboard/MarketingPage";
import TodaysAppointments from "@/components/dashboard/TodaysAppointments";
import RecentActivity from "@/components/dashboard/RecentActivity";
import QuickActions from "@/components/dashboard/QuickActions";
import BusinessSettingsForm from "@/components/dashboard/BusinessSettingsForm"; 
import GmbSettings from "@/components/dashboard/GmbSettings"; 

// Placeholder Pages for Dashboard Sections
const OverviewPage = () => (
  <div className="space-y-8">
    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Visão Geral</h2>
    <QuickActions />
    <DashboardStats />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <TodaysAppointments />
      <RecentActivity />
    </div>
    <DashboardCharts />
  </div>
);

const SettingsPage = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
      Configurações
    </h1>
    <BusinessSettingsForm />
    <GmbSettings /> 
    <ProfileSettingsForm />
    <PasswordSettingsForm />
    {/* Future: Billing settings */}
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
        <Route path="loyalty/customers/:loyaltyCardId" element={<LoyaltyCustomersPage />} />
        <Route path="loyalty/card/:customerCardId" element={<CustomerCardDetailsPage />} />
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