import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { showError, showSuccess } from "@/utils/toast";
import { useAuth } from "./use-auth";

export interface CustomerDetails {
  id?: string;
  owner_id?: string;
  identifier: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
}

// --- Fetching ---
const fetchCustomerDetails = async (identifier: string): Promise<CustomerDetails | null> => {
  if (!identifier) return null;
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .eq('identifier', identifier)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data;
};

export const useCustomerDetails = (identifier: string) => {
  return useQuery<CustomerDetails | null, Error>({
    queryKey: ['customerDetails', identifier],
    queryFn: () => fetchCustomerDetails(identifier),
    enabled: !!identifier,
  });
};

// --- Upserting (Create or Update) ---
const upsertCustomerDetails = async (payload: CustomerDetails): Promise<CustomerDetails> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Utilizador não autenticado.");

  const dataToUpsert = {
    ...payload,
    owner_id: user.id,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from('customers')
    .upsert(dataToUpsert, { onConflict: 'owner_id, identifier' })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const useUpsertCustomerDetails = () => {
  const queryClient = useQueryClient();
  return useMutation<CustomerDetails, Error, CustomerDetails>({
    mutationFn: upsertCustomerDetails,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['customerDetails', data.identifier] });
      showSuccess("Detalhes do cliente salvos com sucesso!");
    },
    onError: (error) => {
      showError(`Erro ao salvar: ${error.message}`);
    },
  });
};