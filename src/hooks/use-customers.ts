import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface CustomerSummary {
  customer_identifier: string;
  total_cards: number;
  active_cards: number;
  last_activity_at: string;
  total_spent: number;
  first_seen_at: string;
}

const fetchAllCustomers = async (): Promise<CustomerSummary[]> => {
  const { data, error } = await supabase.rpc('get_all_customers');
  if (error) {
    throw new Error(error.message);
  }
  return data as CustomerSummary[];
};

export const useAllCustomers = () => {
  return useQuery<CustomerSummary[], Error>({
    queryKey: ['allCustomers'],
    queryFn: fetchAllCustomers,
  });
};