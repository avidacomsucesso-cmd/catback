import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface CustomerTransaction {
  id: string;
  change_amount: number;
  new_progress: number;
  description: string | null;
  created_at: string;
  loyalty_card_name: string;
  card_type: 'stamps' | 'points' | 'cashback';
}

const fetchCustomerTransactions = async (identifier: string): Promise<CustomerTransaction[]> => {
  if (!identifier) return [];
  
  const { data, error } = await supabase.rpc('get_customer_transactions', {
    p_customer_identifier: identifier,
  });

  if (error) {
    throw new Error(error.message);
  }
  return data as CustomerTransaction[];
};

export const useCustomerTransactions = (identifier: string) => {
  return useQuery<CustomerTransaction[], Error>({
    queryKey: ['customerTransactions', identifier],
    queryFn: () => fetchCustomerTransactions(identifier),
    enabled: !!identifier,
  });
};