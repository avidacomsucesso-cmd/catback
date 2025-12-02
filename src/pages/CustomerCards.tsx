import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Cat, Loader2, CreditCard, RotateCw, LogOut, PlusCircle, Calendar, Settings, History } from "lucide-react";
import { useCustomerCardsByIdentifier, CustomerCard } from "@/hooks/use-customer-cards";
import { cn } from "@/lib/utils";
import StampCardVisual from "@/components/customer/StampCardVisual";
import PointsCashbackCardVisual from "@/components/customer/PointsCashbackCardVisual";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { showSuccess } from "@/utils/toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CustomerAppointmentsList from "@/components/customer/CustomerAppointmentsList";
import TransactionHistory from "@/components/customer/TransactionHistory";

// --- Componente Visual do Cartão do Cliente ---
const CustomerCardVisual: React.FC<{ card: CustomerCard }> = ({ card }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const loyaltyCard = card.loyalty_cards;
  
  const isStamps = loyaltyCard.type === 'stamps';

  const renderCardContent = () => {
    if (isStamps) {
      return <StampCardVisual card={card} isFlipped={isFlipped} />;
    }
    return <PointsCashbackCardVisual card={card} />;
  };

  return (
    <>
      <Card className="shadow-xl dark:bg-gray-900/80 border-gray-700/50 overflow-hidden">
        <CardContent className="p-4">
          {renderCardContent()}
          
          <div className="flex space-x-2 mt-4">
            {isStamps && (
                <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setIsFlipped(!isFlipped)}
                    className="w-full text-catback-purple border-catback-purple/50 hover:bg-catback-light-purple/20"
                >
                    <RotateCw className="w-4 h-4 mr-2" /> {isFlipped ? "Ver QR Code" : "Ver Progresso"}
                </Button>
            )}
            <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsHistoryOpen(true)}
                className="w-full text-catback-dark-purple border-gray-300 hover:bg-gray-100"
            >
                <History className="w-4 h-4 mr-2" /> Histórico
            </Button>
          </div>
        </CardContent>
      </Card>
      <TransactionHistory card={card} isOpen={isHistoryOpen} onClose={() => setIsHistoryOpen(false)} />
    </>
  );
};

// --- Componente para a Aba de Cartões ---
const LoyaltyCardsTab: React.FC = () => {
    const { user } = useAuth();
    const customerIdentifier = user?.email || user?.phone || '';
    const { data: customerCards, isLoading, isFetching, error } = useCustomerCardsByIdentifier(customerIdentifier);

    if (isLoading || isFetching) {
        return (
            <div className="text-center p-10">
              <Loader2 className="h-8 w-8 animate-spin text-catback-purple mx-auto" /> 
              <p className="mt-2 text-gray-600 dark:text-gray-400">A carregar cartões...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center p-10 text-red-500">
                Erro ao carregar cartões: {error.message}
            </div>
        );
    }

    return (
        <div className="space-y-6">
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
                        Peça ao seu lojista para lhe atribuir um cartão.
                    </p>
                </div>
            )}
        </div>
    );
};


// --- Página Principal ---
const CustomerCards: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    showSuccess("Sessão encerrada.");
    navigate("/customer-auth");
  };

  const displayIdentifier = user?.email || user?.phone || 'Cliente';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center pt-8 pb-16">
      <div className="w-full max-w-2xl px-4">
        <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
                <Cat className="w-8 h-8 text-catback-purple" />
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Minha Área
                </h1>
            </div>
            <div className="flex items-center space-x-2">
                <Link to="/customer-settings">
                    <Button variant="ghost" size="icon">
                        <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </Button>
                </Link>
                <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleLogout}
                    className="text-red-500 hover:bg-red-500/10"
                >
                    <LogOut className="w-4 h-4 mr-1" /> Sair
                </Button>
            </div>
        </div>

        <p className="text-gray-600 dark:text-gray-400 mb-6">
            Bem-vindo(a), <span className="font-semibold">{displayIdentifier}</span>.
        </p>

        <div className="mb-8">
            <Button onClick={() => navigate('/customer-booking')} className="w-full bg-catback-energy-orange hover:bg-catback-energy-orange/90 text-lg py-6">
                <PlusCircle className="w-5 h-5 mr-2" />
                Agendar Novo Serviço
            </Button>
        </div>

        <Tabs defaultValue="cards" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="cards"><CreditCard className="w-4 h-4 mr-2" />Meus Cartões</TabsTrigger>
                <TabsTrigger value="appointments"><Calendar className="w-4 h-4 mr-2" />Meus Agendamentos</TabsTrigger>
            </TabsList>
            <TabsContent value="cards" className="mt-6">
                <LoyaltyCardsTab />
            </TabsContent>
            <TabsContent value="appointments" className="mt-6">
                <CustomerAppointmentsList />
            </TabsContent>
        </Tabs>
        
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