import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLoyaltyCards, LoyaltyCard } from "@/hooks/use-loyalty-cards";
import { fetchOrCreateCustomerCard, useApplyProgress, useResetCard, CustomerCard } from "@/hooks/use-customer-cards";
import { Loader2, Search, Stamp, RefreshCw, CheckCircle } from "lucide-react";
import { showError } from "@/utils/toast";
import { Progress } from "@/components/ui/progress";

const ValidationPage: React.FC = () => {
  const { data: loyaltyCards, isLoading: isLoadingCards } = useLoyaltyCards();
  const applyProgressMutation = useApplyProgress();
  const resetCardMutation = useResetCard();

  const [selectedCardId, setSelectedCardId] = useState<string | undefined>(undefined);
  const [customerIdentifier, setCustomerIdentifier] = useState("");
  const [customerCard, setCustomerCard] = useState<CustomerCard | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const selectedLoyaltyCard = loyaltyCards?.find(c => c.id === selectedCardId);
  const maxStamps = selectedLoyaltyCard?.config?.stamp_count || 0;
  const currentProgress = customerCard?.current_progress || 0;
  const progressPercentage = maxStamps > 0 ? (currentProgress / maxStamps) * 100 : 0;
  const isCompleted = customerCard?.is_redeemed || (currentProgress >= maxStamps && maxStamps > 0);

  const handleSearch = async () => {
    if (!selectedCardId || !customerIdentifier) {
      showError("Selecione um cartão e insira um identificador de cliente.");
      return;
    }

    setIsSearching(true);
    setCustomerCard(null);

    try {
      const card = await fetchOrCreateCustomerCard({
        loyaltyCardId: selectedCardId,
        customerIdentifier: customerIdentifier.trim(),
      });
      setCustomerCard(card);
    } catch (error) {
      showError("Erro ao buscar ou criar cartão do cliente.");
      console.error(error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleApplyStamp = () => {
    if (!customerCard || !selectedLoyaltyCard) return;

    if (isCompleted) {
        showError("Este cartão já está completo. Resgate a recompensa antes de aplicar mais selos.");
        return;
    }

    applyProgressMutation.mutate({
      cardId: customerCard.id,
      currentProgress: customerCard.current_progress,
      maxStamps: maxStamps,
    }, {
        onSuccess: (updatedCard) => {
            setCustomerCard(updatedCard);
        }
    });
  };

  const handleRedeem = () => {
    if (!customerCard || !isCompleted) return;

    resetCardMutation.mutate(customerCard.id, {
        onSuccess: (updatedCard) => {
            setCustomerCard(updatedCard);
        }
    });
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Validação Rápida de Cartões
      </h1>
      <p className="text-gray-600 dark:text-gray-400">
        Use esta ferramenta para aplicar selos ou pontos aos cartões dos seus clientes.
      </p>

      <Card className="p-6 shadow-lg max-w-2xl mx-auto">
        <CardHeader className="p-0 mb-6">
          <CardTitle className="text-xl text-catback-dark-purple">1. Encontrar Cartão</CardTitle>
        </CardHeader>
        <CardContent className="p-0 space-y-4">
          {isLoadingCards ? (
            <Loader2 className="h-6 w-6 animate-spin text-catback-purple" />
          ) : (
            <Select onValueChange={setSelectedCardId} value={selectedCardId}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o Programa de Fidelidade" />
              </SelectTrigger>
              <SelectContent>
                {loyaltyCards?.filter(c => c.is_active).map(card => (
                  <SelectItem key={card.id} value={card.id}>
                    {card.name} ({card.type})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          <Input
            placeholder="Email ou ID do Cliente"
            value={customerIdentifier}
            onChange={(e) => setCustomerIdentifier(e.target.value)}
            disabled={!selectedCardId}
          />

          <Button 
            onClick={handleSearch} 
            disabled={!selectedCardId || !customerIdentifier || isSearching}
            className="w-full bg-catback-energy-orange hover:bg-catback-energy-orange/90"
          >
            {isSearching ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Search className="w-4 h-4 mr-2" />
            )}
            Buscar Cartão
          </Button>
        </CardContent>
      </Card>

      {customerCard && selectedLoyaltyCard && (
        <Card className="p-6 shadow-xl border-l-4 border-catback-purple max-w-2xl mx-auto">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-2xl text-catback-purple">
              Progresso do Cliente: {customerIdentifier}
            </CardTitle>
            <p className="text-sm text-gray-500">Programa: {selectedLoyaltyCard.name}</p>
          </CardHeader>
          <CardContent className="p-0 space-y-4">
            
            <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                    <span>Progresso Atual:</span>
                    <span className={isCompleted ? "text-catback-success-green font-bold" : "text-catback-dark-purple"}>
                        {currentProgress} / {maxStamps} Selos
                    </span>
                </div>
                <Progress value={progressPercentage} className="h-3" indicatorClassName={isCompleted ? "bg-catback-success-green" : "bg-catback-purple"} />
            </div>

            <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                Recompensa: {selectedLoyaltyCard.reward_description}
            </p>

            <div className="pt-4 flex space-x-4">
                <Button 
                    onClick={handleApplyStamp}
                    disabled={applyProgressMutation.isPending || isCompleted}
                    className="flex-1 bg-catback-purple hover:bg-catback-dark-purple"
                >
                    {applyProgressMutation.isPending ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Stamp className="w-4 h-4 mr-2" />
                    )}
                    Aplicar Selo
                </Button>

                <Button 
                    onClick={handleRedeem}
                    disabled={resetCardMutation.isPending || !isCompleted}
                    variant="outline"
                    className="flex-1 border-catback-success-green text-catback-success-green hover:bg-catback-success-green/10"
                >
                    {resetCardMutation.isPending ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <RefreshCw className="w-4 h-4 mr-2" />
                    )}
                    Resgatar Recompensa
                </Button>
            </div>
            
            {isCompleted && (
                <div className="mt-4 p-3 bg-catback-success-green/10 text-catback-success-green rounded-md flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold">PRONTO PARA RESGATE!</span>
                </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ValidationPage;