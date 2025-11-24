import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cat, Search, Loader2, CreditCard, Check, RotateCw, LogOut, PlusCircle } from "lucide-react";
import { useCustomerCardsByIdentifier, CustomerCard } from "@/hooks/use-customer-cards";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import StampCardVisual from "@/components/customer/StampCardVisual";
import PointsCashbackCardVisual from "@/components/customer/PointsCashbackCardVisual"; // Import new component
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { showSuccess } from "@/utils/toast";

// --- Componente Visual do Cartão do Cliente ---
const CustomerCardVisual: React.FC<{ card: CustomerCard }> = ({ card }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const loyaltyCard = card.loyalty_cards;
  
  const isStamps = loyaltyCard.type === 'stamps';

  const renderCardContent = () => {
    if (isStamps) {
      // StampCardVisual handles the flip transformation internally
      return <StampCardVisual card={card} isFlipped={isFlipped} />;
    }

    // Points and Cashback use the new component (no flip needed for now, just static display)
    return <PointsCashbackCardVisual card={card} />;
  };

  return (
    <Card className="shadow-xl dark:bg-gray-900/80 border-gray-700/50 overflow-hidden">
      <CardContent className="p-4">
        {renderCardContent()}
        
        {isStamps && (
            <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsFlipped(!isFlipped)}
                className="w-full mt-4 text-catback-purple border-catback-purple/50 hover:bg-catback-light-purple/20"
            >
                <RotateCw className="w-4 h-4 mr-2" /> {isFlipped ? "Ver QR Code" : "Girar Cartão para Progresso"}
            </Button>
        )}
      </CardContent>
    </Card>
  );
};

// --- Página Principal ---
const CustomerCards: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const customerIdentifier = user?.email || user?.phone || ''; // Use email or phone as identifier

  // We reuse useCustomerCardsByIdentifier but pass the authenticated user's identifier
  const { data: customerCards, isLoading, isFetching, error } = useCustomerCardsByIdentifier(customerIdentifier);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    showSuccess("Sessão encerrada.");
    navigate("/customer-auth");
  };

  const displayIdentifier = user?.email || user?.phone || 'Cliente';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center pt-12 pb-16">
      <div className="w-full max-w-2xl px-4">
        <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
                <Cat className="w-8 h-8 text-catback-purple" />
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Minha Área
                </h1>
            </div>
            <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="text-red-500 hover:bg-red-500/10"
            >
                <LogOut className="w-4 h-4 mr-1" /> Sair
            </Button>
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

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Meus Cartões de Fidelidade</h2>

        {(isLoading || isFetching) && (
            <div className="text-center p-10">
              <Loader2 className="h-8 w-8 animate-spin text-catback-purple mx-auto" /> 
              <p className="mt-2 text-gray-600 dark:text-gray-400">A carregar cartões...</p>
            </div>
        )}

        {!isLoading && !isFetching && (
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