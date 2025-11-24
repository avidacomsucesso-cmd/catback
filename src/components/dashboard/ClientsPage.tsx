import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, User, Loader2, CreditCard, PlusCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCustomerCardsByIdentifier, useFindOrCreateCustomerCard } from "@/hooks/use-customer-cards";
import { useLoyaltyCards } from "@/hooks/use-loyalty-cards";
import CustomerCardInteraction from "./CustomerCardInteraction";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { showSuccess } from "@/utils/toast";

const ClientsPage: React.FC = () => {
  const [identifier, setIdentifier] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLoyaltyCardId, setSelectedLoyaltyCardId] = useState<string | undefined>(undefined);
  
  const { data: customerCards, isLoading: isLoadingCards, isFetching: isFetchingCards, error: cardsError } = useCustomerCardsByIdentifier(searchQuery);
  const { data: loyaltyPrograms, isLoading: isLoadingPrograms } = useLoyaltyCards();
  const findOrCreateMutation = useFindOrCreateCustomerCard();

  const isFetching = isFetchingCards || isLoadingPrograms || findOrCreateMutation.isPending;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedIdentifier = identifier.trim();
    if (trimmedIdentifier) {
        setSearchQuery(trimmedIdentifier);
    }
  };

  const handleCreateNewCard = () => {
    if (!searchQuery || !selectedLoyaltyCardId) return;

    findOrCreateMutation.mutate({
        loyalty_card_id: selectedLoyaltyCardId,
        customer_identifier: searchQuery,
    }, {
        onSuccess: (newCard) => {
            showSuccess(`Novo cartão '${newCard.loyalty_cards.name}' criado para ${searchQuery}.`);
            setSelectedLoyaltyCardId(undefined); // Reset selection
        }
    });
  };

  const showCreationSection = searchQuery && !isLoadingCards && (customerCards?.length === 0 || !customerCards);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Clientes (CRM)
      </h1>
      <p className="text-gray-600 dark:text-gray-400">
        Pesquise um cliente pelo email ou número de telefone para gerenciar seus cartões de fidelidade.
      </p>

      {/* Search Form */}
      <Card className="p-6 shadow-md max-w-xl">
        <form onSubmit={handleSearch} className="flex space-x-3">
          <Input
            type="text"
            placeholder="Email ou Telefone do Cliente"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="flex-grow"
          />
          <Button 
            type="submit" 
            className="bg-catback-purple hover:bg-catback-dark-purple"
            disabled={!identifier || isFetching}
          >
            {isFetching ? (
                <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
                <Search className="w-5 h-5" />
            )}
          </Button>
        </form>
      </Card>

      <Separator />

      {/* Results */}
      {searchQuery && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Cartões Ativos para: <span className="text-catback-purple">{searchQuery}</span>
          </h2>

          {isLoadingCards && (
            <div className="text-center p-10">
              <Loader2 className="h-8 w-8 animate-spin text-catback-purple mx-auto" /> 
              <p className="mt-2">A procurar cartões...</p>
            </div>
          )}

          {cardsError && (
            <div className="text-center p-10 text-red-500">
              Erro ao carregar cartões: {cardsError.message}
            </div>
          )}

          {customerCards && customerCards.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {customerCards.map((card) => (
                <CustomerCardInteraction key={card.id} card={card} />
              ))}
            </div>
          ) : (
            showCreationSection && (
              <div className="p-10 border-2 border-dashed border-catback-light-purple rounded-lg dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <CreditCard className="w-10 h-10 text-catback-purple mx-auto mb-3" />
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
                  Nenhum cartão ativo encontrado.
                </p>
                
                <h3 className="text-xl font-bold text-catback-dark-purple mb-3">
                    Atribuir Novo Cartão de Fidelidade
                </h3>
                
                <div className="flex flex-col sm:flex-row gap-3">
                    <Select onValueChange={setSelectedLoyaltyCardId} value={selectedLoyaltyCardId}>
                        <SelectTrigger className="flex-grow">
                            <SelectValue placeholder={isLoadingPrograms ? "A carregar programas..." : "Selecione um programa de fidelidade"} />
                        </SelectTrigger>
                        <SelectContent>
                            {loyaltyPrograms?.map(program => (
                                <SelectItem key={program.id} value={program.id}>
                                    {program.name} ({program.type.toUpperCase()})
                                </SelectItem>
                            ))}
                            {(!loyaltyPrograms || loyaltyPrograms.length === 0) && (
                                <SelectItem value="none" disabled>
                                    Nenhum programa ativo. Crie um em Fidelização.
                                </SelectItem>
                            )}
                        </SelectContent>
                    </Select>
                    <Button 
                        onClick={handleCreateNewCard}
                        disabled={!selectedLoyaltyCardId || findOrCreateMutation.isPending}
                        className="bg-catback-energy-orange hover:bg-catback-energy-orange/90 flex-shrink-0"
                    >
                        {findOrCreateMutation.isPending ? (
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : (
                            <PlusCircle className="w-5 h-5 mr-2" />
                        )}
                        Atribuir Cartão
                    </Button>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default ClientsPage;