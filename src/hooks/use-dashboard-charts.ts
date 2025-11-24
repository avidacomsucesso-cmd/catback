import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';

interface ChartDataPoint {
  day: string; // Formatted day
  count: number;
}

// --- Fetching New Customer Cards Chart Data ---
const fetchNewCustomersChartData = async (): Promise<ChartDataPoint[]> => {
  const { data, error } = await supabase.rpc('get_daily_new_customer_cards');
  if (error) throw new Error(error.message);
  
  return data.map((item: { day: string; count: number }) => ({
    day: format(new Date(item.day), 'EEE', { locale: pt }), // Format to 'Seg', 'Ter', etc.
    count: item.count,
  }));
};

export const useNewCustomersChart = () => {
  return useQuery<ChartDataPoint[], Error>({
    queryKey: ['newCustomersChart'],
    queryFn: fetchNewCustomersChartData,
  });
};

// --- Fetching Appointments Chart Data ---
const fetchAppointmentsChartData = async (): Promise<ChartDataPoint[]> => {
    const { data, error } = await supabase.rpc('get_daily_appointments');
    if (error) throw new Error(error.message);
    
    return data.map((item: { day: string; count: number }) => ({
      day: format(new Date(item.day), 'EEE', { locale: pt }),
      count: item.count,
    }));
};
  
export const useAppointmentsChart = () => {
    return useQuery<ChartDataPoint[], Error>({
        queryKey: ['appointmentsChart'],
        queryFn: fetchAppointmentsChartData,
    });
};