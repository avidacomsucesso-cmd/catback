import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface LoyaltyTransaction {
  id: string;
  customer_card_id: string;
  change_amount: number;
  new_progress: number;
  description: string | null;
  created_at: string;
}

const fetchLoyaltyTransactions = async (customerCardId: string): Promise<LoyaltyTransaction[]> => {
  if (!customerCardId) return [];
  
  const { data, error } = await supabase
    .from('loyalty_transactions')
    .select('*')
    .eq('customer_card_id', customerCardId)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }
  return data as LoyaltyTransaction[];
};

export const useLoyaltyTransactions = (customerCardId: string) => {
  return useQuery<LoyaltyTransaction[], Error>({
    queryKey: ['loyaltyTransactions', customerCardId],
    queryFn: () => fetchLoyaltyTransactions(customerCardId),
    enabled: !!customerCardId,
  });
};