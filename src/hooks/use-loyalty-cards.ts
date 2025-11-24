import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { showError, showSuccess } from "@/utils/toast";

export interface LoyaltyCard {
  id: string;
  user_id: string;
  name: string;
  type: 'stamps' | 'points' | 'cashback';
  reward_description: string;
  is_active: boolean;
  config: any; // JSONB structure
  created_at: string;
}

// --- Fetching ---
const fetchLoyaltyCards = async (): Promise<LoyaltyCard[]> => {
  const { data, error } = await supabase
    .from('loyalty_cards')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }
  return data as LoyaltyCard[];
};

export const useLoyaltyCards = () => {
  return useQuery<LoyaltyCard[], Error>({
    queryKey: ['loyaltyCards'],
    queryFn: fetchLoyaltyCards,
  });
};

// --- Creating ---
interface CreateCardPayload {
  name: string;
  type: 'stamps' | 'points' | 'cashback';
  reward_description: string;
  config: any;
}

const createLoyaltyCard = async (cardData: CreateCardPayload): Promise<LoyaltyCard> => {
  const { data, error } = await supabase
    .from('loyalty_cards')
    .insert(cardData)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data as LoyaltyCard;
};

export const useCreateLoyaltyCard = () => {
  const queryClient = useQueryClient();
  return useMutation<LoyaltyCard, Error, CreateCardPayload>({
    mutationFn: createLoyaltyCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['loyaltyCards'] });
      showSuccess("Cartão de fidelidade criado com sucesso!");
    },
    onError: (error) => {
      showError(`Erro ao criar cartão: ${error.message}`);
    },
  });
};

// --- Updating ---
interface UpdateCardPayload {
    id: string;
    name: string;
    reward_description: string;
    is_active: boolean;
    config: any;
}

const updateLoyaltyCard = async (cardData: UpdateCardPayload): Promise<LoyaltyCard> => {
    const { id, ...updates } = cardData;
    const { data, error } = await supabase
        .from('loyalty_cards')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        throw new Error(error.message);
    }
    return data as LoyaltyCard;
};

export const useUpdateLoyaltyCard = () => {
    const queryClient = useQueryClient();
    return useMutation<LoyaltyCard, Error, UpdateCardPayload>({
        mutationFn: updateLoyaltyCard,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['loyaltyCards'] });
            showSuccess(`Cartão '${data.name}' atualizado com sucesso!`);
        },
        onError: (error) => {
            showError(`Erro ao atualizar cartão: ${error.message}`);
        },
    });
};

// --- Deleting ---
const deleteLoyaltyCard = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('loyalty_cards')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }
};

export const useDeleteLoyaltyCard = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: deleteLoyaltyCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['loyaltyCards'] });
      showSuccess("Cartão de fidelidade removido.");
    },
    onError: (error) => {
      showError(`Erro ao remover cartão: ${error.message}`);
    },
  });
};