import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { showError, showSuccess } from "@/utils/toast";

export interface CustomerSummary {
  customer_identifier: string;
  total_cards: number;
  active_cards: number;
  last_activity_at: string;
  total_spent: number;
  first_seen_at: string;
}

export interface CustomerDetails {
  id?: string;
  owner_id?: string;
  identifier: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
}

// --- Fetching All Customers ---
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

// --- Creating Customer ---
type CreateCustomerPayload = Omit<CustomerDetails, 'id' | 'owner_id'>;

const createCustomer = async (payload: CreateCustomerPayload): Promise<CustomerDetails> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Utilizador não autenticado.");

  // Determine identifier based on provided data
  const identifier = payload.email || payload.phone;
  if (!identifier) {
    throw new Error("É necessário fornecer um email ou telefone como identificador.");
  }

  const dataToInsert = {
    ...payload,
    identifier: identifier,
    owner_id: user.id,
  };

  // Check if customer already exists for this owner
  const { data: existingCustomer, error: fetchError } = await supabase
    .from('customers')
    .select('id')
    .eq('owner_id', user.id)
    .eq('identifier', identifier)
    .maybeSingle();

  if (fetchError) throw new Error(fetchError.message);
  if (existingCustomer) {
    throw new Error(`O cliente com o identificador '${identifier}' já existe.`);
  }

  const { data, error } = await supabase
    .from('customers')
    .insert(dataToInsert)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as CustomerDetails;
};

export const useCreateCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation<CustomerDetails, Error, CreateCustomerPayload>({
    mutationFn: createCustomer,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['allCustomers'] });
      showSuccess(`Cliente ${data.identifier} criado com sucesso!`);
    },
    onError: (error) => {
      showError(`Erro ao criar cliente: ${error.message}`);
    },
  });
};