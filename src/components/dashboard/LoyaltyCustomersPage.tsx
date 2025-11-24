import React from "react";
import { useParams, Link } from "react-router-dom";
import { useCustomerCardsByLoyaltyId, CustomerCard } from "@/hooks/use-customer-cards";
import { Loader2, ArrowLeft, User, CreditCard, Check, X, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const CustomerRow: React.FC<{ card: CustomerCard }> = ({ card }) => {
    const loyaltyCard = card.loyalty_cards;
    const isStamps = loyaltyCard.type === 'stamps';
    const requiredStamps = isStamps ? loyaltyCard.config?.stamp_count || 10 : 1;
    const isComplete = isStamps ? card.current_progress >= requiredStamps : false;

    const statusBadge = () => {
        if (card.is_redeemed) {
            return <Badge variant="secondary" className="bg-gray-500 text-white">Resgatado</Badge>;
        }
        if (isComplete) {
            return <Badge className="bg-catback-energy-orange hover:bg-catback-energy-orange/90">Pronto para Resgate</Badge>;
        }
        return <Badge className="bg-catback-success-green hover:bg-catback-success-green/90">Ativo</Badge>;
    };

    return (
        <Link to={`/dashboard/loyalty/card/${card.id}`}>
            <Card className="shadow-sm hover:shadow-md transition-shadow hover:border-catback-purple/50 cursor-pointer">
                <CardContent className="p-4 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <User className="w-6 h-6 text-catback-dark-purple" />
                        <div>
                            <p className="font-semibold text-gray-900 dark:text-white">{card.customer_identifier}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {isStamps ? `Progresso: ${card.current_progress}/${requiredStamps} Selos` : `Saldo: ${card.current_progress.toFixed(loyaltyCard.type === 'cashback' ? 2 : 0)} ${loyaltyCard.type === 'cashback' ? '€' : 'Pts'}`}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        {statusBadge()}
                        <ArrowRight className="w-4 h-4 text-catback-purple hidden sm:block" />
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
};

const LoyaltyCustomersPage: React.FC = () => {
  const { loyaltyCardId } = useParams<{ loyaltyCardId: string }>();
  
  const { data: customerCards, isLoading, error } = useCustomerCardsByLoyaltyId(loyaltyCardId || '');

  if (!loyaltyCardId) {
    return <div className="text-red-500">ID do Cartão de Fidelidade não fornecido.</div>;
  }

  if (isLoading) {
    return <div className="text-center p-10"><Loader2 className="h-8 w-8 animate-spin text-catback-purple mx-auto" /> <p className="mt-2">A carregar clientes...</p></div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-500">Erro ao carregar clientes: {error.message}</div>;
  }

  const programName = customerCards?.[0]?.loyalty_cards?.name || "Programa de Fidelidade";

  return (
    <div className="space-y-8">
      <Link to="/dashboard/loyalty" className="flex items-center text-catback-purple hover:text-catback-dark-purple mb-4">
        <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para Fidelização
      </Link>
      
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Clientes do Programa: {programName}
      </h1>
      <p className="text-gray-600 dark:text-gray-400">
        Total de {customerCards?.length || 0} cartões de clientes associados a este programa (incluindo resgatados). Clique em um cartão para interagir.
      </p>

      <div className="space-y-4">
        {customerCards && customerCards.length > 0 ? (
          customerCards.map((card) => (
            <CustomerRow key={card.id} card={card} />
          ))
        ) : (
          <div className="text-center p-10 border-2 border-dashed border-gray-300 rounded-lg dark:border-gray-700">
            <CreditCard className="w-10 h-10 text-gray-400 mx-auto mb-3" />
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              Nenhum cliente aderiu a este programa ainda.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoyaltyCustomersPage;