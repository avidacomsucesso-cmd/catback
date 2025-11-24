import React from "react";
import { useParams, Link } from "react-router-dom";
import { useCustomerCardsByLoyaltyId, CustomerCard } from "@/hooks/use-customer-cards";
import { Loader2, ArrowLeft, Cat } from "lucide-react";
import CustomerCardInteraction from "./CustomerCardInteraction";
import LoyaltyCardVisual from "./LoyaltyCardVisual";
import { Card, CardContent } from "@/components/ui/card";

const CustomerCardDetailsPage: React.FC = () => {
  const { customerCardId } = useParams<{ customerCardId: string }>();
  
  // We need a way to fetch a single customer card by ID. 
  // Since we don't have a dedicated hook for single fetch, we'll create one temporarily 
  // or rely on the existing structure if possible. 
  // For simplicity and speed, let's assume we can fetch the single card.
  
  // NOTE: Since we don't have a useCustomerCardById hook, I will simulate the fetch 
  // or assume a new hook exists. Let's create a simple fetch function and useQuery.
  
  // --- Temporary Single Fetch Logic (Ideally this would be a dedicated hook) ---
  const fetchSingleCustomerCard = async (id: string): Promise<CustomerCard | null> => {
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
  
  // Using useQuery to fetch the single card
  const { data: card, isLoading, error } = useQuery<CustomerCard | null, Error>({
    queryKey: ['customerCardDetail', customerCardId],
    queryFn: () => fetchSingleCustomerCard(customerCardId!),
    enabled: !!customerCardId,
  });
  // ---------------------------------------------------------------------------

  if (!customerCardId) {
    return <div className="text-red-500">ID do Cartão do Cliente não fornecido.</div>;
  }

  if (isLoading) {
    return <div className="text-center p-10"><Loader2 className="h-8 w-8 animate-spin text-catback-purple mx-auto" /> <p className="mt-2">A carregar detalhes do cartão...</p></div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-500">Erro ao carregar cartão: {error.message}</div>;
  }
  
  if (!card) {
    return <div className="text-center p-10 text-gray-500">Cartão do cliente não encontrado.</div>;
  }

  const loyaltyCardId = card.loyalty_card_id;
  const isStamps = card.loyalty_cards.type === 'stamps';

  return (
    <div className="space-y-8">
      <Link to={`/dashboard/loyalty/customers/${loyaltyCardId}`} className="flex items-center text-catback-purple hover:text-catback-dark-purple mb-4">
        <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para a Lista de Clientes
      </Link>
      
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Gerenciar Cartão de {card.loyalty_cards.name}
      </h1>
      <p className="text-xl font-semibold text-catback-dark-purple dark:text-catback-light-purple">
        Cliente: {card.customer_identifier}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Visualização do Cartão */}
        <Card className="p-6 shadow-lg">
            <CardContent className="p-0">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                    Visualização do Cliente
                </h2>
                {/* We use the StampCardVisual/PointsCashbackCardVisual logic here */}
                {isStamps ? (
                    <LoyaltyCardVisual card={card.loyalty_cards} isFlipped={false} showFlipButton={false} />
                ) : (
                    <div className="relative w-full h-64 rounded-xl p-6 bg-catback-dark-purple shadow-xl flex flex-col justify-center items-center text-white">
                        <Cat className="w-12 h-12 fill-white mb-4" />
                        <p className="text-xl font-bold">
                            {card.current_progress.toFixed(card.loyalty_cards.type === 'cashback' ? 2 : 0)} {card.loyalty_cards.type === 'cashback' ? '€' : 'Pts'}
                        </p>
                        <p className="text-sm opacity-80 mt-1">
                            {card.loyalty_cards.type.toUpperCase()}
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>

        {/* Right: Interação (Carimbar/Resgatar) */}
        <CustomerCardInteraction card={card} />
      </div>
    </div>
  );
};

// We need to import useQuery from @tanstack/react-query and supabase
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export default CustomerCardDetailsPage;