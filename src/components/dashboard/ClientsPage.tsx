import React, { useState, useMemo } from "react";
import { Loader2, ArrowLeft, PlusCircle, CreditCard, UserPlus } from "lucide-react";
import { useAllCustomers, useCreateCustomer } from "@/hooks/use-customers";
import { useCustomerCardsByIdentifier, useFindOrCreateCustomerCard } from "@/hooks/use-customer-cards";
import { CustomersDataTable } from "./CustomersDataTable";
import { createCustomerColumns } from "./CustomersColumns";
import CustomerCardInteraction from "./CustomerCardInteraction";
import CustomerDetailsForm from "./CustomerDetailsForm";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { showError, showSuccess } from "@/utils/toast";
import { useLoyaltyCards } from "@/hooks/use-loyalty-cards";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { differenceInDays } from "date-fns";
import CustomerNotes from "./CustomerNotes";
import CustomerTransactionHistory from "./CustomerTransactionHistory";
import CustomerAppointmentsHistory from "./CustomerAppointmentsHistory";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import CreateCustomerForm from "./CreateCustomerForm"; // Import the new form

const ClientDetailView: React.FC<{ identifier: string; onBack: () => void }> = ({ identifier, onBack }) => {
    const { data: customerCards, isLoading, error } = useCustomerCardsByIdentifier(identifier);
    const findOrCreateMutation = useFindOrCreateCustomerCard();
    const { data: loyaltyPrograms, isLoading: isLoadingPrograms } = useLoyaltyCards();
    const [selectedLoyaltyCardId, setSelectedLoyaltyCardId] = useState<string | undefined>(undefined);

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
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1 space-y-6">
                        <CustomerDetailsForm identifier={identifier} />
                        <CustomerNotes identifier={identifier} />
                        <CustomerAppointmentsHistory identifier={identifier} />
                        <CustomerTransactionHistory identifier={identifier} />
                    </div>
                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                            Cartões Ativos
                        </h2>
                        {customerCards && customerCards.length > 0 ? (
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
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
                    </div>
                </div>
            )}
        </div>
    );
};

const ClientsPage: React.FC = () => {
  const [selectedIdentifier, setSelectedIdentifier] = useState<string | null>(null);
  const [isCreateCustomerOpen, setIsCreateCustomerOpen] = useState(false);
  const { data: allCustomers, isLoading, error } = useAllCustomers();

  const customersWithTags = useMemo(() => {
    if (!allCustomers) return [];
    const now = new Date();
    return allCustomers.map(customer => {
        const tags = [];
        const daysSinceFirstSeen = differenceInDays(now, new Date(customer.first_seen_at));
        const daysSinceLastActivity = differenceInDays(now, new Date(customer.last_activity_at));

        if (customer.total_spent > 500) {
            tags.push({ name: "Cliente VIP", color: "bg-catback-energy-orange" });
        }
        if (daysSinceFirstSeen <= 30) {
            tags.push({ name: "Novo Cliente", color: "bg-catback-success-green" });
        }
        if (daysSinceLastActivity > 90) {
            tags.push({ name: "Em Risco", color: "bg-destructive" });
        }
        return { ...customer, tags };
    });
  }, [allCustomers]);

  const columns = React.useMemo(() => createCustomerColumns(setSelectedIdentifier), []);

  if (selectedIdentifier) {
    return <ClientDetailView identifier={selectedIdentifier} onBack={() => setSelectedIdentifier(null)} />;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Clientes (CRM)
        </h1>
        <Dialog open={isCreateCustomerOpen} onOpenChange={setIsCreateCustomerOpen}>
            <DialogTrigger asChild>
                <Button className="bg-catback-dark-purple hover:bg-catback-purple">
                    <UserPlus className="w-5 h-5 mr-2" />
                    Novo Cliente
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-catback-dark-purple">Adicionar Novo Cliente</DialogTitle>
                </DialogHeader>
                <CreateCustomerForm onFinished={() => setIsCreateCustomerOpen(false)} />
            </DialogContent>
        </Dialog>
      </div>
      
      <p className="text-gray-600 dark:text-gray-400">
        Veja e gerencie todos os seus clientes. Use o filtro para encontrar um cliente específico.
      </p>

      {isLoading && <div className="text-center p-10"><Loader2 className="h-8 w-8 animate-spin text-catback-purple mx-auto" /></div>}
      {error && <div className="text-center p-10 text-red-500">Erro ao carregar clientes: {error.message}</div>}
      
      {allCustomers && (
        <CustomersDataTable columns={columns} data={customersWithTags} />
      )}
    </div>
  );
};

export default ClientsPage;