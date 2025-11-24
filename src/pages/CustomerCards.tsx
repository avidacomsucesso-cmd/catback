import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cat, Search, Loader2, CreditCard, Check, RotateCw, LogOut } from "lucide-react";
import { useCustomerCardsByIdentifier, CustomerCard } from "@/hooks/use-customer-cards";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import StampCardVisual from "@/components/customer/StampCardVisual";
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

    // Placeholder for other types (Points, Cashback)
    return (
        <div className="relative w-full h-64 rounded-xl p-4 bg-gray-700 shadow-lg flex flex-col justify-center items-center text-white">
            <CreditCard className="w-12 h-12 mb-3 text-catback-energy-orange" />
            <h3 className="text-xl font-bold">{loyaltyCard.name}</h3>
            <p className="text-sm mt-1 opacity-90">
                Tipo: {loyaltyCard.type.toUpperCase()}
            </p>
            <p className="text-3xl font-extrabold mt-4">
                {card.current_progress}
            </p>
            <p className="text-sm">
                {loyaltyCard.type === 'points' ? 'Pontos' : 'Saldo'}
            </p>
        </div>
    );
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
                <RotateCw className="w-4 h-4 mr-2" /> {isFlipped ? "Ver Progresso" : "Girar Cartão para Detalhes"}
            </Button>
        )}
      </CardContent>
    </Card>
  );
};

// --- Página Principal ---
const CustomerCards: React.FC = () => {
  const { user } = useAuth();
  const customerIdentifier = user?.email || user?.phone || ''; // Use email or phone as identifier

  // We reuse useCustomerCardsByIdentifier but pass the authenticated user's identifier
  const { data: customerCards, isLoading, isFetching, error } = useCustomerCardsByIdentifier(customerIdentifier);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    showSuccess("Sessão encerrada.");
  };

  const displayIdentifier = user?.email || user?.phone || 'Cliente';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center pt-12 pb-16">
      <div className="w-full max-w-xl px-4">
        <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-2">
                <Cat className="w-8 h-8 text-catback-purple" />
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Meus Cartões
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

        <p className="text-gray-600 dark:text-gray-400 mb-8">
            Bem-vindo(a), <span className="font-semibold">{displayIdentifier}</span>. Aqui estão seus cartões ativos.
        </p>

        {/* Results */}
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
                            Se você acabou de aderir, pode levar um momento para aparecer.
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