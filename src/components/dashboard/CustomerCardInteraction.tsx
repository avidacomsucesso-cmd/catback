import React, { useState } from "react";
import { CustomerCard, useUpdateCustomerCardProgress } from "@/hooks/use-customer-cards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Stamp, Gift, Plus, Minus } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { showError } from "@/utils/toast";

interface CustomerCardInteractionProps {
  card: CustomerCard;
}

const CustomerCardInteraction: React.FC<CustomerCardInteractionProps> = ({ card }) => {
  const updateProgressMutation = useUpdateCustomerCardProgress();
  const loyaltyCard = card.loyalty_cards;
  const [purchaseValue, setPurchaseValue] = useState<number>(0);
  const [redeemValue, setRedeemValue] = useState<number>(0);

  if (!loyaltyCard) {
    return <Card className="p-4 text-red-500">Erro: Configuração do cartão de fidelidade não encontrada.</Card>;
  }

  const isStamps = loyaltyCard.type === 'stamps';
  const isPoints = loyaltyCard.type === 'points';
  const isCashback = loyaltyCard.type === 'cashback';
  
  const requiredStamps = isStamps ? loyaltyCard.config?.stamp_count || 10 : 1;
  const isComplete = isStamps ? card.current_progress >= requiredStamps : false;
  const currencySymbol = isCashback ? '€' : 'Pts';

  const handleStamp = () => {
    if (isStamps && card.current_progress < requiredStamps) {
      updateProgressMutation.mutate({ 
        cardId: card.id, 
        progressChange: 1,
        customerIdentifier: card.customer_identifier,
        loyaltyCardId: card.loyalty_card_id,
      });
    }
  };

  const handleAddProgress = () => {
    if (purchaseValue <= 0) {
      showError("Insira um valor de compra válido.");
      return;
    }

    let progressChange = 0;
    if (isPoints) {
      progressChange = purchaseValue * (loyaltyCard.config?.points_per_euro || 0);
    } else if (isCashback) {
      progressChange = purchaseValue * ((loyaltyCard.config?.cashback_percentage || 0) / 100);
    }

    if (progressChange > 0) {
      updateProgressMutation.mutate({ 
        cardId: card.id, 
        progressChange,
        customerIdentifier: card.customer_identifier,
        loyaltyCardId: card.loyalty_card_id,
      }, { onSuccess: () => setPurchaseValue(0) });
    }
  };

  const handleRedeemProgress = () => {
    if (redeemValue <= 0) {
      showError("Insira um valor válido para usar.");
      return;
    }
    if (redeemValue > card.current_progress) {
      showError(`Saldo insuficiente. O cliente tem apenas ${card.current_progress.toFixed(isCashback ? 2 : 0)} ${currencySymbol}.`);
      return;
    }

    updateProgressMutation.mutate({ 
      cardId: card.id, 
      progressChange: -redeemValue,
      customerIdentifier: card.customer_identifier,
      loyaltyCardId: card.loyalty_card_id,
    }, { onSuccess: () => setRedeemValue(0) });
  };

  const handleRedeemStampCard = () => {
    if (isStamps && !isComplete) return;
    
    if (window.confirm(`Confirmar resgate da recompensa: ${loyaltyCard.reward_description}?`)) {
      updateProgressMutation.mutate({ 
        cardId: card.id, 
        progressChange: 0, 
        isRedeeming: true,
        customerIdentifier: card.customer_identifier,
        loyaltyCardId: card.loyalty_card_id,
      });
    }
  };

  const progressPercentage = isStamps 
    ? Math.min(100, (card.current_progress / requiredStamps) * 100)
    : 0;

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

        {isStamps ? (
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span>Progresso: {card.current_progress} / {requiredStamps}</span>
              {isComplete && <span className="text-catback-success-green font-bold">PRONTO PARA RESGATE!</span>}
            </div>
            <Progress value={progressPercentage} className="h-2" indicatorClassName="bg-catback-purple" />
          </div>
        ) : (
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">Saldo Atual:</p>
                <p className="text-3xl font-extrabold text-catback-energy-orange">
                    {card.current_progress.toFixed(isCashback ? 2 : 0)} {currencySymbol}
                </p>
            </div>
        )}
        
        <div className="space-y-3 pt-2">
            {isStamps ? (
                <div className="flex space-x-2">
                    <Button 
                        onClick={handleStamp}
                        disabled={updateProgressMutation.isPending || isComplete}
                        className="bg-catback-purple hover:bg-catback-dark-purple flex-grow"
                    >
                        {updateProgressMutation.isPending && !isComplete ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Stamp className="h-4 w-4 mr-2" />}
                        Carimbar (+1)
                    </Button>
                    <Button 
                        onClick={handleRedeemStampCard}
                        disabled={updateProgressMutation.isPending || !isComplete}
                        variant="outline"
                        className="border-catback-success-green text-catback-success-green hover:bg-catback-success-green/10 flex-grow"
                    >
                        {updateProgressMutation.isPending && isComplete ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Gift className="h-4 w-4 mr-2" />}
                        Resgatar
                    </Button>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="space-y-2 p-3 border rounded-md">
                        <p className="text-sm font-medium">Adicionar {currencySymbol}</p>
                        <div className="flex space-x-2">
                            <Input type="number" placeholder="Valor da Compra (€)" value={purchaseValue || ''} onChange={(e) => setPurchaseValue(parseFloat(e.target.value) || 0)} />
                            <Button onClick={handleAddProgress} disabled={updateProgressMutation.isPending || purchaseValue <= 0} className="bg-catback-success-green hover:bg-catback-success-green/90">
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                    <div className="space-y-2 p-3 border rounded-md">
                        <p className="text-sm font-medium">Usar Saldo ({currencySymbol})</p>
                        <div className="flex space-x-2">
                            <Input type="number" placeholder={`Valor a usar em ${currencySymbol}`} value={redeemValue || ''} onChange={(e) => setRedeemValue(parseFloat(e.target.value) || 0)} />
                            <Button onClick={handleRedeemProgress} disabled={updateProgressMutation.isPending || redeemValue <= 0} variant="destructive">
                                <Minus className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
        
        <p className="text-xs text-gray-500 dark:text-gray-500 pt-2">
            Última atualização: {new Date(card.updated_at).toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  );
};

export default CustomerCardInteraction;