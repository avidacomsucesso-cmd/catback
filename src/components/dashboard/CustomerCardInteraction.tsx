import React from "react";
import { CustomerCard, useUpdateCustomerCardProgress } from "@/hooks/use-customer-cards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Stamp, Gift, CheckCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface CustomerCardInteractionProps {
  card: CustomerCard;
}

const CustomerCardInteraction: React.FC<CustomerCardInteractionProps> = ({ card }) => {
  const updateProgressMutation = useUpdateCustomerCardProgress();
  const loyaltyCard = card.loyalty_cards;

  if (!loyaltyCard) {
    return <Card className="p-4 text-red-500">Erro: Configuração do cartão de fidelidade não encontrada.</Card>;
  }

  const isStamps = loyaltyCard.type === 'stamps';
  const requiredStamps = isStamps ? loyaltyCard.config?.stamp_count || 10 : 1;
  const isComplete = isStamps ? card.current_progress >= requiredStamps : false; // Simplified completion logic for stamps

  const handleStamp = () => {
    if (isStamps && card.current_progress < requiredStamps) {
      updateProgressMutation.mutate({ 
        cardId: card.id, 
        progressChange: 1,
        customerIdentifier: card.customer_identifier, // Required for mutation
        loyaltyCardId: card.loyalty_card_id, // Required for mutation
      });
    }
  };

  const handleRedeem = () => {
    if (isComplete) {
      if (window.confirm(`Confirmar resgate da recompensa: ${loyaltyCard.reward_description}?`)) {
        updateProgressMutation.mutate({ 
          cardId: card.id, 
          progressChange: 0, 
          isRedeeming: true,
          customerIdentifier: card.customer_identifier, // Required for new card creation
          loyaltyCardId: card.loyalty_card_id, // Required for new card creation
        });
      }
    }
  };

  const progressPercentage = isStamps 
    ? Math.min(100, (card.current_progress / requiredStamps) * 100)
    : 0; // Placeholder for points/cashback

  return (
    <Card className="shadow-lg border-l-4 border-catback-purple h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl text-catback-dark-purple">{loyaltyCard.name}</CardTitle>
          <Badge className="bg-catback-light-purple text-catback-dark-purple hover:bg-catback-light-purple">
            {loyaltyCard.type.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-4 pt-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Recompensa: <span className="font-semibold">{loyaltyCard.reward_description}</span>
        </p>

        {isStamps && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span>Progresso: {card.current_progress} / {requiredStamps}</span>
              {isComplete && <span className="text-catback-success-green font-bold">PRONTO PARA RESGATE!</span>}
            </div>
            <Progress value={progressPercentage} className="h-2" indicatorClassName="bg-catback-purple" />
          </div>
        )}
        
        <div className="flex space-x-2 pt-2">
          {isStamps && (
            <Button 
              onClick={handleStamp}
              disabled={updateProgressMutation.isPending || isComplete}
              className="bg-catback-purple hover:bg-catback-dark-purple flex-grow"
            >
              {updateProgressMutation.isPending && !isComplete ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Stamp className="h-4 w-4 mr-2" />
              )}
              Carimbar (+1)
            </Button>
          )}

          <Button 
            onClick={handleRedeem}
            disabled={updateProgressMutation.isPending || !isComplete}
            variant="outline"
            className="border-catback-success-green text-catback-success-green hover:bg-catback-success-green/10 flex-grow"
          >
            {updateProgressMutation.isPending && isComplete ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
                <Gift className="h-4 w-4 mr-2" />
            )}
            Resgatar Recompensa
          </Button>
        </div>
        
        <p className="text-xs text-gray-500 dark:text-gray-500 pt-2">
            Última atualização: {new Date(card.updated_at).toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  );
};

export default CustomerCardInteraction;