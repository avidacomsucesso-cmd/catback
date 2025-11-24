import React, { useState } from "react";
import { Loader2, ArrowLeft, PlusCircle, CreditCard } from "lucide-react";
import { useAllCustomers } from "@/hooks/use-customers";
import { useCustomerCardsByIdentifier, useFindOrCreateCustomerCard } from "@/hooks/use-customer-cards";
import { CustomersDataTable } from "./CustomersDataTable";
import { createCustomerColumns } from "./CustomersColumns";
import CustomerCardInteraction from "./CustomerCardInteraction";
import ClientProfileCard from "./ClientProfileCard";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { showError, showSuccess } from "@/utils/toast";
import { useLoyaltyCards } from "@/hooks/use-loyalty-cards";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ClientDetailView: React.FC<{ identifier: string; onBack: () => void }> = ({ identifier, onBack }) => {
    const { data: customerCards, isLoading, error } = useCustomerCardsByIdentifier(identifier);
    const [isResettingPassword, setIsResettingPassword] = useState(false);
    const findOrCreateMutation = useFindOrCreateCustomerCard();
    const { data: loyaltyPrograms, isLoading: isLoadingPrograms } = useLoyaltyCards();
    const [selectedLoyaltyCardId, setSelectedLoyaltyCardId] = useState<string | undefined>(undefined);

    const handlePasswordReset = async () => {
        if (!identifier || !identifier.includes('@')) {
            showError("A redefinição de senha só é possível para clientes registados com um endereço de email válido.");
            return;
        }

        setIsResettingPassword(true);
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(identifier, {
                redirectTo: `${window.location.origin}/customer-auth?view=update_password`, 
            });
            if (error) throw error;
            showSuccess(`Email de redefinição de senha enviado para ${identifier}.`);
        } catch (error) {
            showError("Erro ao enviar email de redefinição.");
        } finally {
            setIsResettingPassword(false);
        }
    };

    const handleCreateNewCard = () => {
        if (!identifier || !selectedLoyaltyCardId) return;
        findOrCreateMutation.mutate({
            loyalty_card_id: selectedLoyaltyCardId,
            customer_identifier: identifier,
        }, {
            onSuccess: (newCard) => {
                showSuccess(`Novo cartão '${newCard.loyalty_cards.name}' criado.`);
                setSelectedLoyaltyCardId(undefined);
            }
        });
    };

    return (
        <div className="space-y-6">
            <Button variant="ghost" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" /> Voltar à Lista de Clientes
            </Button>
            
            {isLoading && <div className="text-center p-10"><Loader2 className="h-8 w-8 animate-spin text-catback-purple mx-auto" /></div>}
            {error && <div className="text-center p-10 text-red-500">Erro: {error.message}</div>}
            
            {!isLoading && (
                <>
                    <ClientProfileCard 
                        identifier={identifier} 
                        activeCardsCount={customerCards?.length || 0} 
                        onPasswordReset={handlePasswordReset}
                        isResetting={isResettingPassword}
                    />
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                        Cartões Ativos
                    </h2>
                    {customerCards && customerCards.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {customerCards.map((card) => (
                                <CustomerCardInteraction key={card.id} card={card} />
                            ))}
                        </div>
                    ) : (
                        <div className="p-10 border-2 border-dashed border-catback-light-purple rounded-lg">
                            <CreditCard className="w-10 h-10 text-catback-purple mx-auto mb-3" />
                            <p className="text-lg font-semibold text-center mb-4">Nenhum cartão ativo encontrado.</p>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <Select onValueChange={setSelectedLoyaltyCardId} value={selectedLoyaltyCardId}>
                                    <SelectTrigger className="flex-grow">
                                        <SelectValue placeholder={isLoadingPrograms ? "A carregar..." : "Selecione um programa"} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {loyaltyPrograms?.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                                <Button onClick={handleCreateNewCard} disabled={!selectedLoyaltyCardId || findOrCreateMutation.isPending}>
                                    <PlusCircle className="w-5 h-5 mr-2" /> Atribuir Cartão
                                </Button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

const ClientsPage: React.FC = () => {
  const [selectedIdentifier, setSelectedIdentifier] = useState<string | null>(null);
  const { data: allCustomers, isLoading, error } = useAllCustomers();

  const columns = React.useMemo(() => createCustomerColumns(setSelectedIdentifier), []);

  if (selectedIdentifier) {
    return <ClientDetailView identifier={selectedIdentifier} onBack={() => setSelectedIdentifier(null)} />;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Clientes (CRM)
      </h1>
      <p className="text-gray-600 dark:text-gray-400">
        Veja e gerencie todos os seus clientes. Use o filtro para encontrar um cliente específico.
      </p>

      {isLoading && <div className="text-center p-10"><Loader2 className="h-8 w-8 animate-spin text-catback-purple mx-auto" /></div>}
      {error && <div className="text-center p-10 text-red-500">Erro ao carregar clientes: {error.message}</div>}
      
      {allCustomers && (
        <CustomersDataTable columns={columns} data={allCustomers} />
      )}
    </div>
  );
};

export default ClientsPage;