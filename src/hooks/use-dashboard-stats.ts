import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface DashboardStats {
  total_services: number;
  upcoming_appointments: number;
  active_loyalty_programs: number;
  total_customers: number;
}

const fetchDashboardStats = async (): Promise<DashboardStats> => {
  const { data, error } = await supabase.rpc('get_dashboard_stats');

  if (error) {
    throw new Error(`Erro ao buscar estatísticas: ${error.message}`);
  }
  return data as DashboardStats;
};

export const useDashboardStats = () => {
  return useQuery<DashboardStats, Error>({
    queryKey: ['dashboardStats'],
    queryFn: fetchDashboardStats,
  });
};