import React from "react";
import { useDashboardStats } from "@/hooks/use-dashboard-stats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Users, Calendar, CreditCard, List } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom"; // Import Link

interface StatCardProps {
    title: string;
    value: number;
    icon: React.ElementType;
    href: string; // Added href prop
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, href }) => (
  <Link to={href} className="block">
    <Card className="shadow-md hover:shadow-lg transition-shadow hover:border-catback-purple/50 cursor-pointer h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</CardTitle>
        <Icon className="h-5 w-5 text-catback-purple" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-gray-900 dark:text-white">{value}</div>
      </CardContent>
    </Card>
  </Link>
);

const DashboardStats: React.FC = () => {
  const { data: stats, isLoading, error } = useDashboardStats();

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-28 w-full" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Erro ao carregar estatísticas: {error.message}</div>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <StatCard 
        title="Total de Clientes" 
        value={stats?.total_customers || 0} 
        icon={Users} 
        href="/dashboard/clients" 
      />
      <StatCard 
        title="Próximos Agendamentos" 
        value={stats?.upcoming_appointments || 0} 
        icon={Calendar} 
        href="/dashboard/scheduling" 
      />
      <StatCard 
        title="Programas de Fidelidade Ativos" 
        value={stats?.active_loyalty_programs || 0} 
        icon={CreditCard} 
        href="/dashboard/loyalty" 
      />
      <StatCard 
        title="Serviços Oferecidos" 
        value={stats?.total_services || 0} 
        icon={List} 
        href="/dashboard/scheduling?tab=services" // Direct to services tab if possible, otherwise just scheduling
      />
    </div>
  );
};

export default DashboardStats;