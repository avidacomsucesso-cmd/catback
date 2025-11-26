import React, { useState, useMemo } from "react";
import { Loader2, ArrowLeft, PlusCircle, CreditCard, UserPlus, Users, History, Settings, MessageSquare, Star, AlertTriangle, Gift, Sparkles } from "lucide-react";
import { useAllCustomers } from "@/hooks/use-customers";
import { useCustomerCardsByIdentifier, useFindOrCreateCustomerCard } from "@/hooks/use-customer-cards";
import CustomerCardInteraction from "./CustomerCardInteraction";
import CustomerDetailsForm from "./CustomerDetailsForm";
import { Button } from "@/components/ui/button";
import { showError, showSuccess } from "@/utils/toast";
import { useLoyaltyCards } from "@/hooks/use-loyalty-cards";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { differenceInDays, differenceInHours } from "date-fns";
import CustomerNotes from "./CustomerNotes";
import CustomerTransactionHistory from "./CustomerTransactionHistory";
import CustomerAppointmentsHistory from "./CustomerAppointmentsHistory";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import CreateCustomerForm from "./CreateCustomerForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import CustomerStatusCard from "./CustomerStatusCard";
import { Input } from "@/components/ui/input";

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
            
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Detalhes do Cliente: {identifier}
            </h1>

            {isLoading && <div className="text-center p-10"><Loader2 className="h-8 w-8 animate-spin text-catback-purple mx-auto" /></div>}
            {error && <div className="text-center p-10 text-red-500">Erro: {error.message}</div>}
            
            {!isLoading && (
                <Tabs defaultValue="details" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-gray-100 dark:bg-gray-800">
                        <TabsTrigger value="details" className="flex items-center justify-center space-x-2 p-3"><Settings className="w-4 h-4" /> Detalhes</TabsTrigger>
                        <TabsTrigger value="loyalty" className="flex items-center justify-center space-x-2 p-3"><CreditCard className="w-4 h-4" /> Fidelização</TabsTrigger>
                        <TabsTrigger value="history" className="flex items-center justify-center space-x-2 p-3"><History className="w-4 h-4" /> Histórico</TabsTrigger>
                    </TabsList>

                    <TabsContent value="details" className="mt-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <CustomerDetailsForm identifier={identifier} />
                            <CustomerNotes identifier={identifier} />
                        </div>
                    </TabsContent>

                    <TabsContent value="loyalty" className="mt-6 space-y-6">
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
                            <Card className="p-6 border-2 border-dashed border-catback-light-purple">
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
                            </Card>
                        )}
                    </TabsContent>

                    <TabsContent value="history" className="mt-6 space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <CustomerTransactionHistory identifier={identifier} />
                            <CustomerAppointmentsHistory identifier={identifier} />
                        </div>
                    </TabsContent>
                </Tabs>
            )}
        </div>
    );
};

const ClientsPage: React.FC = () => {
  const [selectedIdentifier, setSelectedIdentifier] = useState<string | null>(null);
  const [isCreateCustomerOpen, setIsCreateCustomerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { data: allCustomers, isLoading, error } = useAllCustomers();

  const getCustomerStatus = (customer: any) => {
    const now = new Date();
    if (customer.last_redemption_at && differenceInHours(now, new Date(customer.last_redemption_at)) <= 72) {
      return { label: "Resgatou Recompensa", color: "border-purple-500", icon: Gift };
    }
    if (differenceInDays(now, new Date(customer.last_activity_at)) > 60) {
      return { label: "Em Risco", color: "border-yellow-500", icon: AlertTriangle };
    }
    if (differenceInDays(now, new Date(customer.first_seen_at)) <= 30) {
      return { label: "Novo Cliente", color: "border-blue-500", icon: Sparkles };
    }
    if (customer.total_spent > 250) {
      return { label: "Cliente VIP", color: "border-green-500", icon: Star };
    }
    return { label: "Cliente Regular", color: "border-gray-300", icon: Users };
  };

  const filteredCustomers = useMemo(() => {
    if (!allCustomers) return [];
    return allCustomers
      .map(customer => ({
        ...customer,
        status: getCustomerStatus(customer),
      }))
      .filter(customer =>
        customer.customer_identifier.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [allCustomers, searchTerm]);

  if (selectedIdentifier) {
    return <ClientDetailView identifier={selectedIdentifier} onBack={() => setSelectedIdentifier(null)} />;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Clientes (CRM)
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
                Visualize e gerencie seus clientes.
            </p>
        </div>
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
      
      <Input
        placeholder="Filtrar por email ou telefone..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm"
      />

      {isLoading && <div className="text-center p-10"><Loader2 className="h-8 w-8 animate-spin text-catback-purple mx-auto" /></div>}
      {error && <div className="text-center p-10 text-red-500">Erro ao carregar clientes: {error.message}</div>}
      
      {!isLoading && filteredCustomers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCustomers.map(customer => (
                <CustomerStatusCard 
                    key={customer.customer_identifier} 
                    customer={customer} 
                    onViewDetails={setSelectedIdentifier}
                />
            ))}
        </div>
      ) : (
        !isLoading && <p className="text-center text-gray-500 pt-10">Nenhum cliente encontrado.</p>
      )}
    </div>
  );
};

export default ClientsPage;