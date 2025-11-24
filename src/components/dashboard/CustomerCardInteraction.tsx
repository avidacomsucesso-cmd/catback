import React, { useState } from "react";
import { CustomerCard, useUpdateCustomerCardProgress } from "@/hooks/use-customer-cards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Stamp, Gift, CheckCircle, Plus, Minus } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { showSuccess, showError } from "@/utils/toast";

interface CustomerCardInteractionProps {
  card: CustomerCard;
}

const CustomerCardInteraction: React.FC<CustomerCardInteractionProps> = ({ card }) => {
  const updateProgressMutation = useUpdateCustomerCardProgress();
  const loyaltyCard = card.loyalty_cards;
  const [amount, setAmount] = useState<number>(1); // Used for points/cashback interaction

  if (!loyaltyCard) {
    return <Card className="p-4 text-red-500">Erro: Configuração do cartão de fidelidade não encontrada.</Card>;
  }

  const isStamps = loyaltyCard.type === 'stamps';
  const isPoints = loyaltyCard.type === 'points';
  const isCashback = loyaltyCard.type === 'cashback';
  
  const requiredStamps = isStamps ? loyaltyCard.config?.stamp_count || 10 : 1;
  const isComplete = isStamps ? card.current_progress >= requiredStamps : false; // Simplified completion logic for stamps
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

  const handleProgressChange = (change: number) => {
    if (!isPoints && !isCashback) return;

    if (amount <= 0) {
        showError(`Insira um valor válido para ${isPoints ? 'pontos' : 'cashback'}.`);
        return;
    }

    const progressChange = change * amount;

    // Prevent negative balance if subtracting
    if (progressChange < 0 && card.current_progress + progressChange < 0) {
        showError(`Saldo insuficiente. O cliente tem apenas ${card.current_progress.toFixed(isCashback ? 2 : 0)} ${currencySymbol}.`);
        return;
    }

    updateProgressMutation.mutate({ 
        cardId: card.id, 
        progressChange: progressChange,
        customerIdentifier: card.customer_identifier,
        loyaltyCardId: card.loyalty_card_id,
    }, {
        onSuccess: () => {
            setAmount(1); // Reset amount after successful transaction
        }
    });
  };

  const handleRedeem = () => {
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
    : 0; // Progress bar only for stamps for now

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

        {/* Progress Display */}
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
        
        {/* Interaction Buttons */}
        <div className="space-y-3 pt-2">
            {isStamps ? (
                <div className="flex space-x-2">
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
                        Resgatar
                    </Button>
                </div>
            ) : (
                <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Gerenciar {isPoints ? 'Pontos' : 'Cashback'}
                    </p>
                    <div className="flex space-x-2">
                        <Input
                            type="number"
                            placeholder={`Valor em ${currencySymbol}`}
                            value={amount}
                            onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                            className="w-24 text-center"
                            min={0.01}
                            step={isCashback ? 0.01 : 1}
                        />
                        <Button 
                            onClick={() => handleProgressChange(1)}
                            disabled={updateProgressMutation.isPending || amount <= 0}
                            className="bg-catback-success-green hover:bg-catback-success-green/90 flex-grow"
                        >
                            <Plus className="h-4 w-4 mr-2" /> Adicionar {currencySymbol}
                        </Button>
                        <Button 
                            onClick={() => handleProgressChange(-1)}
                            disabled={updateProgressMutation.isPending || amount <= 0 || card.current_progress < amount}
                            variant="destructive"
                            className="flex-grow"
                        >
                            <Minus className="h-4 w-4 mr-2" /> Remover {currencySymbol}
                        </Button>
                    </div>
                    <Button 
                        onClick={handleRedeem}
                        disabled={updateProgressMutation.isPending} // Redemption logic for P/C is complex, keeping it simple for now
                        variant="outline"
                        className="w-full border-catback-energy-orange text-catback-energy-orange hover:bg-catback-energy-orange/10"
                    >
                        Resgatar Recompensa (Manual)
                    </Button>
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