import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

export interface OccupiedSlot {
  start_time: string;
  end_time: string;
}

const fetchOccupiedSlots = async (date: Date): Promise<OccupiedSlot[]> => {
  const dateString = format(date, 'yyyy-MM-dd');
  
  const { data, error } = await supabase.rpc('get_occupied_slots', {
    p_date: dateString,
  });

  if (error) {
    throw new Error(error.message);
  }
  return data as OccupiedSlot[];
};

export const useOccupiedSlots = (date: Date | undefined) => {
  return useQuery<OccupiedSlot[], Error>({
    queryKey: ['occupiedSlots', date ? format(date, 'yyyy-MM-dd') : ''],
    queryFn: () => fetchOccupiedSlots(date!),
    enabled: !!date,
  });
};