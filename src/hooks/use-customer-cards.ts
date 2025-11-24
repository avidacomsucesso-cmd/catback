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
    .eq('is_redeemed', false)
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

// --- Fetching Single Customer Card Detail ---
const fetchSingleCustomerCard = async (id: string): Promise<CustomerCard> => {
    const { data, error } = await supabase
        .from('customer_cards')
        .select(`
            *,
            loyalty_cards (id, name, type, reward_description, config)
        `)
        .eq('id', id)
        .single();

    if (error) {
        throw new Error(error.message);
    }
    return data as CustomerCard;
};

export const useCustomerCardDetail = (cardId: string) => {
    return useQuery<CustomerCard, Error>({
        queryKey: ['customerCardDetail', cardId],
        queryFn: () => fetchSingleCustomerCard(cardId),
        enabled: !!cardId,
    });
};

// --- Creating/Finding Customer Card ---
interface FindOrCreatePayload {
  loyalty_card_id: string;
  customer_identifier: string;
}

const findOrCreateCustomerCard = async ({ loyalty_card_id, customer_identifier }: FindOrCreatePayload): Promise<CustomerCard> => {
  const { data: existingCard, error: fetchError } = await supabase
    .from('customer_cards')
    .select('*')
    .eq('loyalty_card_id', loyalty_card_id)
    .eq('customer_identifier', customer_identifier)
    .eq('is_redeemed', false)
    .maybeSingle();

  if (fetchError) throw new Error(fetchError.message);

  if (existingCard) {
    const { data: fullCard, error: fullFetchError } = await supabase
        .from('customer_cards')
        .select(`*, loyalty_cards (*)`)
        .eq('id', existingCard.id)
        .single();
    if (fullFetchError) throw new Error(fullFetchError.message);
    return fullCard as CustomerCard;
  }

  const { data: newCard, error: insertError } = await supabase
    .from('customer_cards')
    .insert({ loyalty_card_id, customer_identifier })
    .select(`*, loyalty_cards (*)`)
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
  progressChange: number;
  description: string;
}

const updateCustomerCardProgress = async ({ cardId, progressChange, description }: UpdateProgressPayload): Promise<void> => {
  const { error } = await supabase.rpc('update_card_progress_and_log', {
    p_card_id: cardId,
    p_change_amount: progressChange,
    p_description: description,
  });
  if (error) throw new Error(error.message);
};

export const useUpdateCustomerCardProgress = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, UpdateProgressPayload>({
    mutationFn: updateCustomerCardProgress,
    onSuccess: (_, variables) => {
      const cardData = queryClient.getQueryData<CustomerCard>(['customerCardDetail', variables.cardId]);
      if (cardData) {
        queryClient.invalidateQueries({ queryKey: ['customerCards', cardData.customer_identifier] });
        queryClient.invalidateQueries({ queryKey: ['loyaltyProgramCustomers', cardData.loyalty_card_id] });
        queryClient.invalidateQueries({ queryKey: ['customerCardDetail', cardData.id] });
        queryClient.invalidateQueries({ queryKey: ['loyaltyTransactions', cardData.id] });
      }
      showSuccess("Progresso atualizado!");
    },
    onError: (error) => {
      showError(`Erro ao atualizar progresso: ${error.message}`);
    },
  });
};

// --- Redeeming Stamp Card ---
interface RedeemStampCardPayload {
    cardId: string;
}

const redeemStampCard = async ({ cardId }: RedeemStampCardPayload): Promise<void> => {
    const { error } = await supabase.rpc('redeem_stamp_card_and_reissue', {
        p_card_id: cardId,
    });
    if (error) throw new Error(error.message);
};

export const useRedeemStampCard = () => {
    const queryClient = useQueryClient();
    return useMutation<void, Error, RedeemStampCardPayload>({
        mutationFn: redeemStampCard,
        onSuccess: (_, variables) => {
            const cardData = queryClient.getQueryData<CustomerCard>(['customerCardDetail', variables.cardId]);
            if (cardData) {
                queryClient.invalidateQueries({ queryKey: ['customerCards', cardData.customer_identifier] });
                queryClient.invalidateQueries({ queryKey: ['loyaltyProgramCustomers', cardData.loyalty_card_id] });
                queryClient.invalidateQueries({ queryKey: ['customerCardDetail', cardData.id] });
                queryClient.invalidateQueries({ queryKey: ['loyaltyTransactions', cardData.id] });
            }
            showSuccess("Recompensa resgatada e novo cartão emitido!");
        },
        onError: (error) => {
            showError(`Erro ao resgatar recompensa: ${error.message}`);
        },
    });
};