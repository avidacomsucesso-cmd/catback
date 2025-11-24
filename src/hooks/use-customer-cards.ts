import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { showError, showSuccess } from "@/utils/toast";
import { LoyaltyCard } from "./use-loyalty-cards";

export interface CustomerCard {
  id: string;
  loyalty_card_id: string;
  customer_identifier: string;
  current_progress: number;
  is_redeemed: boolean;
  owner_id: string;
  created_at: string;
  updated_at: string;
  loyalty_cards: LoyaltyCard; // Joined data
}

// --- Fetching Customer Cards by Identifier ---
const fetchCustomerCardsByIdentifier = async (identifier: string): Promise<CustomerCard[]> => {
  if (!identifier) return [];
  
  const { data, error } = await supabase
    .from('customer_cards')
    .select(`
      *,
      loyalty_cards (id, name, type, reward_description, config)
    `)
    .eq('customer_identifier', identifier)
    .eq('is_redeemed', false) // Only show active, non-redeemed cards
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }
  return data as CustomerCard[];
};

export const useCustomerCardsByIdentifier = (identifier: string) => {
  return useQuery<CustomerCard[], Error>({
    queryKey: ['customerCards', identifier],
    queryFn: () => fetchCustomerCardsByIdentifier(identifier),
    enabled: !!identifier,
  });
};

// --- Creating/Finding Customer Card ---
interface FindOrCreatePayload {
  loyalty_card_id: string;
  customer_identifier: string;
}

const findOrCreateCustomerCard = async ({ loyalty_card_id, customer_identifier }: FindOrCreatePayload): Promise<CustomerCard> => {
  // 1. Try to find an existing active card
  const { data: existingCard, error: fetchError } = await supabase
    .from('customer_cards')
    .select('*')
    .eq('loyalty_card_id', loyalty_card_id)
    .eq('customer_identifier', customer_identifier)
    .eq('is_redeemed', false)
    .maybeSingle();

  if (fetchError) throw new Error(fetchError.message);

  if (existingCard) {
    // Found existing card, return it (we need to fetch the joined data structure)
    const { data: fullCard, error: fullFetchError } = await supabase
        .from('customer_cards')
        .select(`
            *,
            loyalty_cards (id, name, type, reward_description, config)
        `)
        .eq('id', existingCard.id)
        .single();

    if (fullFetchError) throw new Error(fullFetchError.message);
    return fullCard as CustomerCard;
  }

  // 2. If not found, create a new one
  const { data: newCard, error: insertError } = await supabase
    .from('customer_cards')
    .insert({ 
        loyalty_card_id, 
        customer_identifier,
        // owner_id is automatically set by RLS policy if we rely on the user being authenticated
    })
    .select(`
        *,
        loyalty_cards (id, name, type, reward_description, config)
    `)
    .single();

  if (insertError) throw new Error(insertError.message);
  
  showSuccess("Novo cartão de cliente criado!");
  return newCard as CustomerCard;
};

export const useFindOrCreateCustomerCard = () => {
  const queryClient = useQueryClient();
  return useMutation<CustomerCard, Error, FindOrCreatePayload>({
    mutationFn: findOrCreateCustomerCard,
    onSuccess: (data) => {
      // Invalidate the list query for this identifier
      queryClient.invalidateQueries({ queryKey: ['customerCards', data.customer_identifier] });
    },
    onError: (error) => {
      showError(`Erro ao gerenciar cartão do cliente: ${error.message}`);
    },
  });
};

// --- Updating Progress (Stamping/Adding Points) ---
interface UpdateProgressPayload {
  cardId: string;
  progressChange: number; // +1 for stamp, +10 for points, etc.
  isRedeeming?: boolean;
}

const updateCustomerCardProgress = async ({ cardId, progressChange, isRedeeming = false }: UpdateProgressPayload): Promise<CustomerCard> => {
  // 1. Fetch current card state
  const { data: currentCard, error: fetchError } = await supabase
    .from('customer_cards')
    .select('current_progress, is_redeemed')
    .eq('id', cardId)
    .single();

  if (fetchError) throw new Error(fetchError.message);
  if (currentCard.is_redeemed) throw new Error("Este cartão já foi resgatado.");

  let newProgress = currentCard.current_progress + progressChange;
  let newIsRedeemed = isRedeeming;

  if (isRedeeming) {
    // When redeeming, progress usually resets or is marked as complete
    newProgress = 0; // Assuming we reset progress on redemption for simplicity
    newIsRedeemed = true;
  } else if (newProgress < 0) {
    newProgress = 0; // Prevent negative progress
  }

  // 2. Update the card
  const { data: updatedCard, error: updateError } = await supabase
    .from('customer_cards')
    .update({ 
        current_progress: newProgress, 
        is_redeemed: newIsRedeemed,
        updated_at: new Date().toISOString()
    })
    .eq('id', cardId)
    .select(`
        *,
        loyalty_cards (id, name, type, reward_description, config)
    `)
    .single();

  if (updateError) throw new Error(updateError.message);
  
  return updatedCard as CustomerCard;
};

export const useUpdateCustomerCardProgress = () => {
  const queryClient = useQueryClient();
  return useMutation<CustomerCard, Error, UpdateProgressPayload>({
    mutationFn: updateCustomerCardProgress,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['customerCards', data.customer_identifier] });
      queryClient.invalidateQueries({ queryKey: ['loyaltyCards'] }); // Just in case
      showSuccess(data.is_redeemed ? "Recompensa resgatada com sucesso!" : "Progresso atualizado!");
    },
    onError: (error) => {
      showError(`Erro ao atualizar progresso: ${error.message}`);
    },
  });
};