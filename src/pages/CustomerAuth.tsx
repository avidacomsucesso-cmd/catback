import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Cat, Loader2, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { showSuccess, showError } from "@/utils/toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useLoyaltyCards } from "@/hooks/use-loyalty-cards";
import { useExternalBusinessSettings } from "@/hooks/use-external-business-settings";
import { getAuthErrorMessage } from "@/utils/auth-errors"; // Importar para tratamento de erros

const authSchema = z.object({
  email: z.string().email({
    message: "Insira um email válido.",
  }),
  password: z.string().min(6, {
    message: "A senha deve ter pelo menos 6 caracteres.",
  }),
});

type AuthFormValues = z.infer<typeof authSchema>;

// Helper hook to fetch a single loyalty card by ID (needed here)
const useLoyaltyCardById = (id: string | null) => {
    return useLoyaltyCards().data?.find(card => card.id === id);
};

const CustomerAuth: React.FC = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get('redirect');
  
  // Try to extract loyaltyCardId from redirect URL if present
  const loyaltyCardIdMatch = redirectUrl ? new URLSearchParams(redirectUrl.split('?')[1]).get('id') : null;
  
  // Fetch loyalty card details to get owner ID
  const loyaltyCard = useLoyaltyCardById(loyaltyCardIdMatch);
  const ownerId = loyaltyCard?.user_id;
  const { data: businessSettings, isLoading: isLoadingSettings } = useExternalBusinessSettings(ownerId);

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isSubmitting } = form.formState;

  // Redirect authenticated customers to their cards page
  React.useEffect(() => {
    if (user && !isLoading) {
      // If a redirect URL was provided, use it. Otherwise, go to customer cards.
      navigate(redirectUrl || "/customer-cards", { replace: true });
    }
  }, [user, isLoading, navigate, redirectUrl]);

  async function onSubmit(values: AuthFormValues) {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
        throw error;
      }

      showSuccess("Login bem-sucedido! Redirecionando...");
      // Redirect is handled by the useEffect hook after session updates, 
      // but we can force navigation here for immediate feedback if needed.
      navigate(redirectUrl || "/customer-cards");

    } catch (error) {
      const message = getAuthErrorMessage(error);
      showError(message);
    }
  }

  if (isLoading || user || isLoadingSettings) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-catback-purple mx-auto" />
        </div>
    );
  }
  
  const businessName = businessSettings?.business_name || "CATBACK";
  const logoUrl = businessSettings?.logo_url;
  const signupRedirect = `/customer-signup?redirect=${encodeURIComponent(redirectUrl || "/customer-cards")}`;
  const forgotPasswordRedirect = `/forgot-password-cliente?redirect=${encodeURIComponent(redirectUrl || "/customer-cards")}`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          {logoUrl ? (
              <img src={logoUrl} alt={businessName} className="w-20 h-20 mx-auto mb-2 object-contain" />
          ) : (
              <Cat className="w-8 h-8 mx-auto text-catback-purple mb-2" />
          )}
          <CardTitle className="text-3xl font-bold text-catback-dark-purple">Acesso Cliente {businessName !== "CATBACK" && `| ${businessName}`}</CardTitle>
          <p className="text-sm text-gray-500">Entre para ver seus cartões de fidelidade e agendamentos.</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                          <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                  <Input id="email" type="email" placeholder="seu@email.com" {...field} />
                              </FormControl>
                              <FormMessage />
                          </FormItem>
                      )}
                  />
                  <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                          <FormItem>
                              <FormLabel>Senha</FormLabel>
                              <FormControl>
                                  <Input id="password" type="password" placeholder="********" {...field} />
                              </FormControl>
                              <FormMessage />
                          </FormItem>
                      )}
                  />
                  <div className="flex justify-end text-sm">
                    <Link to={forgotPasswordRedirect} className="text-catback-energy-orange hover:underline">
                        Esqueceu a senha?
                    </Link>
                  </div>
                  <Button 
                      type="submit" 
                      className="w-full bg-catback-energy-orange hover:bg-catback-energy-orange/90"
                      disabled={isSubmitting}
                  >
                      {isSubmitting ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                          "Entrar na Minha Área"
                      )}
                  </Button>
              </form>
          </Form>
          
          <div className="text-center text-sm text-gray-500">
            Não tem conta?{" "}
            <Link to={signupRedirect} className="text-catback-energy-orange hover:underline">
              Criar Conta Cliente
            </Link>
          </div>
          <div className="text-center text-sm text-gray-500 pt-4">
            <Link to="/login" className="text-catback-purple hover:underline">
              Acesso para Lojistas
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerAuth;