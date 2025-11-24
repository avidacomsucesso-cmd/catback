import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cat, Search, Loader2, CreditCard, Check, RotateCw } from "lucide-react";
import { useCustomerCardsByIdentifier, CustomerCard } from "@/hooks/use-customer-cards";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

// --- Componente Visual do Cartão do Cliente ---
const CustomerCardVisual: React.FC<{ card: CustomerCard }> = ({ card }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const loyaltyCard = card.loyalty_cards;
  
  const isStamps = loyaltyCard.type === 'stamps';
  const requiredStamps = isStamps ? loyaltyCard.config?.stamp_count || 10 : 1;
  const isComplete = isStamps ? card.current_progress >= requiredStamps : false;
  const progressPercentage = isStamps 
    ? Math.min(100, (card.current_progress / requiredStamps) * 100)
    : 0;

  const stampsArray = isStamps ? Array.from({ length: requiredStamps }, (_, i) => i + 1) : [];

  return (
    <Card className="shadow-xl dark:bg-gray-900/80 border-gray-700/50 overflow-hidden">
      <CardContent className="p-4">
        <div className="relative w-full h-64 perspective-1000">
          <div
            className={cn(
              "absolute w-full h-full transition-transform duration-700 preserve-3d",
              isFlipped ? "rotate-y-180" : ""
            )}
          >
            {/* Card Front (Progress View) */}
            <div className="absolute w-full h-full backface-hidden rounded-xl p-4 bg-catback-purple shadow-lg flex flex-col justify-between text-white">
              <div>
                <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold">{loyaltyCard.name}</h3>
                    <Cat className="w-8 h-8 fill-white" />
                </div>
                <p className="text-sm mt-1 opacity-90">
                    Recompensa: {loyaltyCard.reward_description}
                </p>
              </div>

              {isStamps && (
                <div className="mt-4">
                    <div className="grid grid-cols-5 gap-2">
                        {stampsArray.map((num) => (
                            <div
                                key={num}
                                className={cn(
                                    "w-full aspect-square rounded-md flex items-center justify-center text-sm font-bold border-2",
                                    card.current_progress >= num
                                        ? "bg-catback-success-green border-catback-success-green text-white"
                                        : "bg-white/20 border-white/50 text-white/70"
                                )}
                            >
                                {card.current_progress >= num ? <Check className="w-5 h-5" /> : num}
                            </div>
                        ))}
                    </div>
                    <div className="mt-3 text-center">
                        <p className="text-lg font-semibold">
                            {card.current_progress} / {requiredStamps} Selos
                        </p>
                        <Progress value={progressPercentage} className="h-2 mt-1" indicatorClassName="bg-catback-energy-orange" />
                    </div>
                </div>
              )}
              {isComplete && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl">
                    <p className="text-2xl font-extrabold text-catback-energy-orange animate-pulse">
                        RESGATE DISPONÍVEL!
                    </p>
                </div>
              )}
            </div>

            {/* Card Back (Details View) */}
            <div className="absolute w-full h-full backface-hidden rounded-xl p-4 bg-gray-100 dark:bg-gray-800 shadow-lg flex flex-col justify-center text-center rotate-y-180">
                <h3 className="text-xl font-bold text-catback-dark-purple dark:text-white mb-3">
                    Detalhes do Programa
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Tipo: {loyaltyCard.type.toUpperCase()}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    ID do Cartão: {card.id.substring(0, 8)}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-4">
                    Apresente este cartão ao lojista para carimbar ou resgatar sua recompensa.
                </p>
            </div>
          </div>
        </div>
        
        <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full mt-4 text-catback-purple border-catback-purple/50 hover:bg-catback-light-purple/20"
        >
            <RotateCw className="w-4 h-4 mr-2" /> Girar Cartão para Detalhes
        </Button>
      </CardContent>
    </Card>
  );
};

// --- Página Principal ---
const CustomerCards: React.FC = () => {
  const [identifier, setIdentifier] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: customerCards, isLoading, isFetching, error } = useCustomerCardsByIdentifier(searchQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedIdentifier = identifier.trim();
    if (trimmedIdentifier) {
        setSearchQuery(trimmedIdentifier);
    }
  };

  const showResults = searchQuery && !isLoading && !isFetching;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center pt-12 pb-16">
      <div className="w-full max-w-xl px-4">
        <div className="text-center mb-8">
          <Cat className="w-10 h-10 mx-auto text-catback-purple mb-2" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Meus Cartões CATBACK
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Insira seu email ou telefone para ver seus cartões de fidelidade ativos.
          </p>
        </div>

        {/* Search Form */}
        <Card className="p-6 shadow-xl mb-8">
          <form onSubmit={handleSearch} className="flex space-x-3">
            <Input
              type="text"
              placeholder="Email ou Telefone"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="flex-grow"
            />
            <Button 
              type="submit" 
              className="bg-catback-energy-orange hover:bg-catback-energy-orange/90"
              disabled={!identifier || isLoading || isFetching}
            >
              {isLoading || isFetching ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                  <Search className="w-5 h-5" />
              )}
            </Button>
          </form>
        </Card>

        {/* Results */}
        {isLoading && searchQuery && (
            <div className="text-center p-10">
              <Loader2 className="h-8 w-8 animate-spin text-catback-purple mx-auto" /> 
              <p className="mt-2 text-gray-600 dark:text-gray-400">A procurar cartões...</p>
            </div>
        )}

        {showResults && (
            <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                    Cartões Ativos para {searchQuery}
                </h2>
                
                {customerCards && customerCards.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6">
                        {customerCards.map((card) => (
                            <CustomerCardVisual key={card.id} card={card} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center p-10 border-2 border-dashed border-gray-300 rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800">
                        <CreditCard className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                        <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                            Nenhum cartão ativo encontrado.
                        </p>
                        <p className="text-sm text-gray-500">
                            Certifique-se de que inseriu o identificador correto.
                        </p>
                    </div>
                )}
            </div>
        )}
        
        {error && (
            <div className="text-center p-10 text-red-500">
                Erro ao carregar cartões: {error.message}
            </div>
        )}

        <div className="mt-10 text-center text-sm text-gray-500">
            <Link to="/" className="text-catback-purple hover:underline">
                ← Voltar à Página Inicial
            </Link>
        </div>
      </div>
    </div>
  );
};

export default CustomerCards;