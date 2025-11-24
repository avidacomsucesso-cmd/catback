import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// --- Today's Appointments ---
export interface TodaysAppointment {
  id: string;
  customer_identifier: string;
  start_time: string;
  service_name: string;
}

const fetchTodaysAppointments = async (): Promise<TodaysAppointment[]> => {
  const { data, error } = await supabase.rpc('get_todays_appointments');
  if (error) throw new Error(error.message);
  return data;
};

export const useTodaysAppointments = () => {
  return useQuery<TodaysAppointment[], Error>({
    queryKey: ['todaysAppointments'],
    queryFn: fetchTodaysAppointments,
  });
};

// --- Recent Activity ---
export interface RecentActivity {
  id: string;
  customer_identifier: string;
  updated_at: string;
  loyalty_card_name: string;
  progress: number;
  card_type: 'stamps' | 'points' | 'cashback';
}

const fetchRecentActivity = async (): Promise<RecentActivity[]> => {
    const { data, error } = await supabase.rpc('get_recent_activity');
    if (error) throw new Error(error.message);
    return data;
};
  
export const useRecentActivity = () => {
    return useQuery<RecentActivity[], Error>({
        queryKey: ['recentActivity'],
        queryFn: fetchRecentActivity,
    });
};