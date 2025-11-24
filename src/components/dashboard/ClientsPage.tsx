import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, User, Loader2, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCustomerCardsByIdentifier } from "@/hooks/use-customer-cards";
import CustomerCardInteraction from "./CustomerCardInteraction";
import { Separator } from "@/components/ui/separator";

const ClientsPage: React.FC = () => {
  const [identifier, setIdentifier] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: customerCards, isLoading, isFetching, error } = useCustomerCardsByIdentifier(searchQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(identifier.trim());
  };

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

          {isLoading && (
            <div className="text-center p-10">
              <Loader2 className="h-8 w-8 animate-spin text-catback-purple mx-auto" /> 
              <p className="mt-2">A procurar cartões...</p>
            </div>
          )}

          {error && (
            <div className="text-center p-10 text-red-500">
              Erro ao carregar cartões: {error.message}
            </div>
          )}

          {customerCards && customerCards.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {customerCards.map((card) => (
                <CustomerCardInteraction key={card.id} card={card} />
              ))}
            </div>
          ) : (
            !isLoading && searchQuery && (
              <div className="text-center p-10 border-2 border-dashed border-gray-300 rounded-lg dark:border-gray-700">
                <CreditCard className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                  Nenhum cartão ativo encontrado para este cliente.
                </p>
                <p className="text-sm text-gray-500">
                  O cliente pode não ter um cartão ou todos os cartões foram resgatados.
                </p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default ClientsPage;