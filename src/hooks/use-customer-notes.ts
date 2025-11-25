import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { showError, showSuccess } from "@/utils/toast";

export interface CustomerNote {
  id: string;
  owner_id: string;
  customer_identifier: string;
  note: string;
  created_at: string;
}

// --- Fetching ---
const fetchCustomerNotes = async (identifier: string): Promise<CustomerNote[]> => {
  if (!identifier) return [];
  const { data, error } = await supabase
    .from('customer_notes')
    .select('*')
    .eq('customer_identifier', identifier)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};

export const useCustomerNotes = (identifier: string) => {
  return useQuery<CustomerNote[], Error>({
    queryKey: ['customerNotes', identifier],
    queryFn: () => fetchCustomerNotes(identifier),
    enabled: !!identifier,
  });
};

// --- Creating ---
const createCustomerNote = async (payload: { customer_identifier: string; note: string }): Promise<CustomerNote> => {
  const { data, error } = await supabase
    .from('customer_notes')
    .insert(payload)
    .select()
    .single();
  
  if (error) throw new Error(error.message);
  return data;
};

export const useCreateCustomerNote = () => {
  const queryClient = useQueryClient();
  return useMutation<CustomerNote, Error, { customer_identifier: string; note: string }>({
    mutationFn: createCustomerNote,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['customerNotes', data.customer_identifier] });
      showSuccess("Nota adicionada.");
    },
    onError: (error) => showError(error.message),
  });
};

// --- Deleting ---
const deleteCustomerNote = async (noteId: string): Promise<void> => {
  const { error } = await supabase
    .from('customer_notes')
    .delete()
    .eq('id', noteId);
  
  if (error) throw new Error(error.message);
};

export const useDeleteCustomerNote = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, { noteId: string; identifier: string }>({
    mutationFn: ({ noteId }) => deleteCustomerNote(noteId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['customerNotes', variables.identifier] });
      showSuccess("Nota removida.");
    },
    onError: (error) => showError(error.message),
  });
};