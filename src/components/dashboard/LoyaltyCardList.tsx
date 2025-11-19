import React from "react";
import { useLoyaltyCards, useDeleteLoyaltyCard, LoyaltyCard } from "@/hooks/use-loyalty-cards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Trash, Stamp, DollarSign, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const getIcon = (type: LoyaltyCard['type']) => {
  switch (type) {
    case 'stamps':
      return <Stamp className="w-5 h-5 text-catback-purple" />;
    case 'points':
      return <Star className="w-5 h-5 text-catback-energy-orange" />;
    case 'cashback':
      return <DollarSign className="w-5 h-5 text-catback-success-green" />;
    default:
      return <Stamp className="w-5 h-5 text-gray-500" />;
  }
};

const LoyaltyCardItem: React.FC<{ card: LoyaltyCard }> = ({ card }) => {
  const deleteMutation = useDeleteLoyaltyCard();

  const handleDelete = () => {
    if (window.confirm(`Tem certeza que deseja deletar o cartão '${card.name}'?`)) {
      deleteMutation.mutate(card.id);
    }
  };

  const getCardDetails = () => {
    switch (card.type) {
      case 'stamps':
        return `Selos necessários: ${card.config?.stamp_count || 'N/A'}`;
      case 'points':
        return 'Programa de Pontos (Configuração Avançada)';
      case 'cashback':
        return 'Programa de Cashback (Configuração Avançada)';
      default:
        return 'Detalhes não configurados.';
    }
  };

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center space-x-3">
          {getIcon(card.type)}
          <CardTitle className="text-xl">{card.name}</CardTitle>
        </div>
        <Badge variant={card.is_active ? "default" : "secondary"} className={card.is_active ? "bg-catback-success-green hover:bg-catback-success-green/90" : ""}>
          {card.is_active ? "Ativo" : "Inativo"}
        </Badge>
      </CardHeader>
      <CardContent className="flex-grow space-y-3 pt-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Recompensa: <span className="font-medium text-catback-dark-purple dark:text-white">{card.reward_description}</span>
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-500">{getCardDetails()}</p>
      </CardContent>
      <div className="p-4 border-t flex justify-end">
        <Button 
          variant="destructive" 
          size="sm" 
          onClick={handleDelete}
          disabled={deleteMutation.isPending}
        >
          {deleteMutation.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash className="w-4 h-4" />
          )}
        </Button>
      </div>
    </Card>
  );
};

const LoyaltyCardList: React.FC = () => {
  const { data: cards, isLoading, error } = useLoyaltyCards();

  if (isLoading) {
    return <div className="text-center p-10"><Loader2 className="h-8 w-8 animate-spin text-catback-purple mx-auto" /> <p className="mt-2">A carregar cartões...</p></div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-500">Erro ao carregar: {error.message}</div>;
  }

  if (!cards || cards.length === 0) {
    return (
      <div className="text-center p-10 border-2 border-dashed border-gray-300 rounded-lg dark:border-gray-700">
        <Stamp className="w-10 h-10 text-gray-400 mx-auto mb-3" />
        <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          Nenhum cartão de fidelidade encontrado.
        </p>
        <p className="text-sm text-gray-500">Crie o seu primeiro cartão para começar a fidelizar!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card) => (
        <LoyaltyCardItem key={card.id} card={card} />
      ))}
    </div>
  );
};

export default LoyaltyCardList;