import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { showError, showSuccess } from "@/utils/toast";
import { useAuth } from "./use-auth";

export interface GoogleAccount {
  id: string;
  user_id: string;
  access_token: string;
  refresh_token: string;
  expires_at: string;
  business_name: string | null;
  place_id: string | null;
  account_resource_name: string | null;
  location_resource_name: string | null;
  loyalty_card_id_for_5_star_reviews: string | null;
  created_at: string;
  updated_at: string;
}

// --- Fetching ---
const fetchGoogleAccount = async (userId: string): Promise<GoogleAccount | null> => {
  const { data, error } = await supabase
    .from('google_accounts')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const useGoogleAccount = () => {
  const { user } = useAuth();
  const userId = user?.id;

  return useQuery<GoogleAccount | null, Error>({
    queryKey: ['googleAccount', userId],
    queryFn: () => fetchGoogleAccount(userId!),
    enabled: !!userId,
  });
};

// --- Deleting ---
const deleteGoogleAccount = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('google_accounts')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }
};

export const useDeleteGoogleAccount = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation<void, Error, string>({
    mutationFn: deleteGoogleAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['googleAccount', user?.id] });
      showSuccess("Conta Google desconectada com sucesso.");
    },
    onError: (error) => {
      showError(`Erro ao desconectar conta Google: ${error.message}`);
    },
  });
};