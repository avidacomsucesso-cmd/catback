import React, { useEffect } from "react";
import { useParams, useSearchParams, useNavigate, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Cat, CheckCircle, ArrowRight } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useFindOrCreateCustomerCard } from "@/hooks/use-customer-cards";
import { useLoyaltyCards } from "@/hooks/use-loyalty-cards";
import { showError, showSuccess } from "@/utils/toast";

const CustomerCardEnrollment: React.FC = () => {
  const [searchParams] = useSearchParams();
  const loyaltyCardId = searchParams.get('id');
  const navigate = useNavigate();
  const { user, isLoading: isLoadingAuth } = useAuth();
  const findOrCreateMutation = useFindOrCreateCustomerCard();
  
  // Fetch all loyalty cards to find the specific one and get its details
  const { data: loyaltyCards, isLoading: isLoadingPrograms } = useLoyaltyCards();
  const loyaltyCard = loyaltyCards?.find(card => card.id === loyaltyCardId);

  const isLoading = isLoadingAuth || isLoadingPrograms;

  // 1. Handle Authentication Check
  useEffect(() => {
    if (!isLoadingAuth && !user) {
      // Redirect to customer auth page, passing the current URL as redirect path
      navigate(`/customer-auth?redirect=${encodeURIComponent(window.location.pathname + window.location.search)}`, { replace: true });
    }
  }, [isLoadingAuth, user, navigate]);

  // 2. Handle Enrollment Logic
  useEffect(() => {
    // Only run mutation if user is authenticated, card details are loaded, 
    // and we haven't successfully retrieved/created the card yet.
    if (
      user && 
      loyaltyCardId && 
      loyaltyCard && 
      !findOrCreateMutation.isPending &&
      !findOrCreateMutation.data // <-- Prevents infinite loop after success
    ) {
      const customerIdentifier = user.email || user.phone;
      
      if (!customerIdentifier) {
        showError("Não foi possível identificar o cliente. Por favor, verifique seu perfil.");
        return;
      }

      findOrCreateMutation.mutate({
        loyalty_card_id: loyaltyCardId,
        customer_identifier: customerIdentifier,
      }, {
        onSuccess: (card) => {
          if (card.id) {
            showSuccess(`Você aderiu ao cartão '${card.loyalty_cards.name}'!`);
          }
        },
        onError: (error) => {
          // If the card already exists, the mutation will still succeed but we handle the error case here
          showError(`Falha ao aderir ao cartão: ${error.message}`);
        }
      });
    }
  }, [user, loyaltyCardId, loyaltyCard, findOrCreateMutation]);

  if (isLoading || (user && !loyaltyCard)) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <Loader2 className="h-8 w-8 animate-spin text-catback-purple mx-auto" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            {loyaltyCardId ? "A carregar programa de fidelidade..." : "ID do cartão inválido."}
          </p>
        </div>
      </Layout>
    );
  }

  if (!user) {
    // This state should be brief as the useEffect should redirect quickly
    return (
        <Layout>
            <div className="container py-20 text-center">
                <Loader2 className="h-8 w-8 animate-spin text-catback-purple mx-auto" />
                <p className="mt-4 text-gray-600 dark:text-gray-400">
                    Redirecionando para autenticação...
                </p>
            </div>
        </Layout>
    );
  }

  const isEnrolling = findOrCreateMutation.isPending;
  const enrollmentSuccess = findOrCreateMutation.isSuccess || !!findOrCreateMutation.data;
  const cardName = loyaltyCard?.name || "Cartão de Fidelidade";

  return (
    <Layout>
      <div className="container py-16 flex justify-center">
        <Card className="w-full max-w-md shadow-xl text-center">
          <CardHeader>
            <Cat className="w-10 h-10 mx-auto text-catback-purple mb-2" />
            <CardTitle className="text-3xl font-bold text-catback-dark-purple">
              {enrollmentSuccess ? "Adesão Concluída!" : `Aderir ao ${cardName}`}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {isEnrolling ? (
              <div className="p-6">
                <Loader2 className="h-8 w-8 animate-spin text-catback-purple mx-auto" />
                <p className="mt-4 text-gray-600 dark:text-gray-400">
                  A processar sua adesão...
                </p>
              </div>
            ) : enrollmentSuccess ? (
              <div className="p-6 space-y-4">
                <CheckCircle className="h-12 w-12 text-catback-success-green mx-auto" />
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  Parabéns! Você agora faz parte do programa de fidelidade "{cardName}".
                </p>
                <Link to="/customer-cards">
                  <Button className="w-full bg-catback-purple hover:bg-catback-dark-purple">
                    Ver Meus Cartões <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            ) : (
                <div className="p-6 space-y-4">
                    <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                        Clique abaixo para adicionar o cartão "{cardName}" à sua conta.
                    </p>
                    <Button 
                        onClick={() => {
                            // Manually trigger the mutation if it hasn't run yet (e.g., if user was already logged in)
                            const customerIdentifier = user?.email || user?.phone;
                            if (customerIdentifier) {
                                findOrCreateMutation.mutate({
                                    loyalty_card_id: loyaltyCardId!,
                                    customer_identifier: customerIdentifier,
                                });
                            }
                        }}
                        className="w-full bg-catback-energy-orange hover:bg-catback-energy-orange/90"
                    >
                        Aderir Agora
                    </Button>
                </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CustomerCardEnrollment;