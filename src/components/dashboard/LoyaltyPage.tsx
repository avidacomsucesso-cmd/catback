import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import CreateLoyaltyCardForm from "./CreateLoyaltyCardForm";
import LoyaltyCardList from "./LoyaltyCardList";
import { Separator } from "@/components/ui/separator";

const LoyaltyPage: React.FC = () => {
  const [isCreating, setIsCreating] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Fidelização Digital
        </h1>
        <Button 
          onClick={() => setIsCreating(!isCreating)}
          className="bg-catback-purple hover:bg-catback-dark-purple"
        >
          <PlusCircle className="w-5 h-5 mr-2" /> 
          {isCreating ? "Cancelar" : "Novo Cartão"}
        </Button>
      </div>

      {isCreating && (
        <div className="max-w-lg">
          <CreateLoyaltyCardForm onCardCreated={() => setIsCreating(false)} />
        </div>
      )}

      <Separator />

      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
        Meus Programas de Fidelidade
      </h2>
      
      <LoyaltyCardList />
    </div>
  );
};

export default LoyaltyPage;