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
// This function is used by both the Lojista (CRM) and the Customer (CustomerCards page)
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

// --- Fetching All Customer Cards for a Loyalty Program ---
const fetchCustomerCardsByLoyaltyId = async (loyaltyCardId: string): Promise<CustomerCard[]> => {
  if (!loyaltyCardId) return [];
  
  const { data, error } = await supabase
    .from('customer_cards')
    .select(`
      *,
      loyalty_cards (id, name, type, reward_description, config)
    `)
    .eq('loyalty_card_id', loyaltyCardId)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }
  return data as CustomerCard[];
};

export const useCustomerCardsByLoyaltyId = (loyaltyCardId: string) => {
  return useQuery<CustomerCard[], Error>({
    queryKey: ['loyaltyProgramCustomers', loyaltyCardId],
    queryFn: () => fetchCustomerCardsByLoyaltyId(loyaltyCardId),
    enabled: !!loyaltyCardId,
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
  customerIdentifier: string; // Needed for creating new card after redemption
  loyaltyCardId: string; // Needed for creating new card after redemption
}

const updateCustomerCardProgress = async ({ cardId, progressChange, isRedeeming = false, customerIdentifier, loyaltyCardId }: UpdateProgressPayload): Promise<CustomerCard> => {
  // 1. Fetch current card state
  const { data: currentCard, error: fetchError } = await supabase
    .from('customer_cards')
    .select('current_progress, is_redeemed')
    .eq('id', cardId)
    .single();

  if (fetchError) throw new Error(fetchError.message);
  if (currentCard.is_redeemed) throw new Error("Este cartão já foi resgatado.");

  let newProgress = currentCard.current_progress;
  let newIsRedeemed = false;

  if (isRedeeming) {
    // Mark current card as redeemed
    newIsRedeemed = true;
  } else {
    // Update progress normally
    newProgress = currentCard.current_progress + progressChange;
    if (newProgress < 0) {
      newProgress = 0; // Prevent negative progress
    }
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
  
  // 3. If redeeming, automatically create a new card for the customer
  if (isRedeeming) {
    showSuccess("Recompensa resgatada com sucesso! Criando novo cartão...");
    // We don't return the redeemed card, but the newly created one (or the last updated one)
    // For simplicity in the mutation return type, we return the updated (redeemed) card, 
    // but we trigger the creation of the new one.
    await findOrCreateCustomerCard({ loyalty_card_id: loyaltyCardId, customer_identifier: customerIdentifier });
  } else {
    showSuccess("Progresso atualizado!");
  }

  return updatedCard as CustomerCard;
};

export const useUpdateCustomerCardProgress = () => {
  const queryClient = useQueryClient();
  return useMutation<CustomerCard, Error, UpdateProgressPayload>({
    mutationFn: updateCustomerCardProgress,
    onSuccess: (data) => {
      // Invalidate the list query for this identifier to show the new card (if redeemed) or updated progress
      queryClient.invalidateQueries({ queryKey: ['customerCards', data.customer_identifier] });
      queryClient.invalidateQueries({ queryKey: ['loyaltyCards'] }); // Just in case
    },
    onError: (error) => {
      showError(`Erro ao atualizar progresso: ${error.message}`);
    },
  });
};