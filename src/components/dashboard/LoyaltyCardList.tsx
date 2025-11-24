import React from "react";
import { useLoyaltyCards } from "@/hooks/use-loyalty-cards";
import { Loader2, Stamp } from "lucide-react";
import LoyaltyCardDisplay from "./LoyaltyCardDisplay"; // Import the new component
import { Card, CardContent } from "@/components/ui/card";

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
        <LoyaltyCardDisplay key={card.id} card={card} />
      ))}
    </div>
  );
};

export default LoyaltyCardList;