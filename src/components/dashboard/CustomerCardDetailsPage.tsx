import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCustomerCardDetail } from "@/hooks/use-customer-cards";
import { Loader2, ArrowLeft, History } from "lucide-react";
import CustomerCardInteraction from "./CustomerCardInteraction";
import { Card, CardContent } from "@/components/ui/card";
import StampCardVisual from "@/components/customer/StampCardVisual";
import PointsCashbackCardVisual from "@/components/customer/PointsCashbackCardVisual";
import { Button } from "@/components/ui/button";
import TransactionHistory from "@/components/customer/TransactionHistory";

const CustomerCardDetailsPage: React.FC = () => {
  const { customerCardId } = useParams<{ customerCardId: string }>();
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  
  // Using the dedicated hook to fetch the single card
  const { data: card, isLoading, error } = useCustomerCardDetail(customerCardId || '');

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
    <>
      <div className="space-y-8">
        <Link to={`/dashboard/loyalty/customers/${loyaltyCardId}`} className="flex items-center text-catback-purple hover:text-catback-dark-purple mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para a Lista de Clientes
        </Link>
        
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Gerenciar Cartão de {card.loyalty_cards.name}
        </h1>
        <div className="flex justify-between items-center">
            <p className="text-xl font-semibold text-catback-dark-purple dark:text-catback-light-purple">
                Cliente: {card.customer_identifier}
            </p>
            <Button 
                variant="outline" 
                onClick={() => setIsHistoryOpen(true)}
                className="text-catback-dark-purple border-gray-300 hover:bg-gray-100"
            >
                <History className="w-4 h-4 mr-2" /> Ver Histórico
            </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Visualização do Cartão */}
          <Card className="p-6 shadow-lg">
              <CardContent className="p-0">
                  <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                      Visualização do Cliente
                  </h2>
                  {isStamps ? (
                      <StampCardVisual card={card} isFlipped={false} />
                  ) : (
                      <PointsCashbackCardVisual card={card} />
                  )}
              </CardContent>
          </Card>

          {/* Right: Interação (Carimbar/Resgatar) */}
          <CustomerCardInteraction card={card} onViewHistory={() => setIsHistoryOpen(true)} />
        </div>
      </div>
      {/* Transaction History Sheet */}
      {card && <TransactionHistory card={card} isOpen={isHistoryOpen} onClose={() => setIsHistoryOpen(false)} />}
    </>
  );
};

export default CustomerCardDetailsPage;