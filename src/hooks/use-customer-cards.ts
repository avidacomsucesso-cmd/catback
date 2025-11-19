import { useMutation, useQueryClient } from "@tanstack/react-query";
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
}

// --- Fetch or Create Customer Card ---
interface FetchOrCreatePayload {
  loyaltyCardId: string;
  customerIdentifier: string;
}

const fetchOrCreateCustomerCard = async ({ loyaltyCardId, customerIdentifier }: FetchOrCreatePayload): Promise<CustomerCard> => {
  // 1. Try to fetch existing card
  let { data: card, error } = await supabase
    .from('customer_cards')
    .select('*')
    .eq('loyalty_card_id', loyaltyCardId)
    .eq('customer_identifier', customerIdentifier)
    .maybeSingle();

  if (error) throw new Error(error.message);

  // 2. If not found, create a new one
  if (!card) {
    const { data: newCard, error: insertError } = await supabase
      .from('customer_cards')
      .insert({
        loyalty_card_id: loyaltyCardId,
        customer_identifier: customerIdentifier,
        current_progress: 0,
      })
      .select()
      .single();

    if (insertError) throw new Error(insertError.message);
    card = newCard;
  }

  return card as CustomerCard;
};

// --- Apply Stamp/Progress Mutation ---
interface ApplyProgressPayload {
  cardId: string;
  currentProgress: number;
  maxStamps: number;
}

const applyProgress = async ({ cardId, currentProgress, maxStamps }: ApplyProgressPayload): Promise<CustomerCard> => {
  let newProgress = currentProgress + 1;
  let isRedeemed = false;
  let message = `Selo aplicado com sucesso! Progresso: ${newProgress}/${maxStamps}.`;

  if (newProgress >= maxStamps) {
    newProgress = maxStamps; // Cap at max
    isRedeemed = true;
    message = `Cartão Completo! O cliente ganhou a recompensa.`;
  }

  const { data, error } = await supabase
    .from('customer_cards')
    .update({ 
      current_progress: newProgress, 
      is_redeemed: isRedeemed,
      updated_at: new Date().toISOString(),
    })
    .eq('id', cardId)
    .select()
    .single();

  if (error) throw new Error(error.message);
  
  showSuccess(message);
  return data as CustomerCard;
};

export const useApplyProgress = () => {
  const queryClient = useQueryClient();
  return useMutation<CustomerCard, Error, ApplyProgressPayload>({
    mutationFn: applyProgress,
    onSuccess: () => {
      // Invalidate relevant queries if needed, but for a quick validation page, we might not need global invalidation
    },
    onError: (error) => {
      showError(`Erro ao aplicar progresso: ${error.message}`);
    },
  });
};

// --- Reset Card Mutation (Redeem) ---
const resetCard = async (cardId: string): Promise<CustomerCard> => {
  const { data, error } = await supabase
    .from('customer_cards')
    .update({ 
      current_progress: 0, 
      is_redeemed: false,
      updated_at: new Date().toISOString(),
    })
    .eq('id', cardId)
    .select()
    .single();

  if (error) throw new Error(error.message);
  
  showSuccess("Cartão resgatado e reiniciado com sucesso!");
  return data as CustomerCard;
};

export const useResetCard = () => {
  const queryClient = useQueryClient();
  return useMutation<CustomerCard, Error, string>({
    mutationFn: resetCard,
    onSuccess: () => {
      // No global invalidation needed here either
    },
    onError: (error) => {
      showError(`Erro ao resgatar cartão: ${error.message}`);
    },
  });
};

export { fetchOrCreateCustomerCard };