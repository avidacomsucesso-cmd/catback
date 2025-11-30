import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Cat, Loader2, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { showSuccess, showError } from "@/utils/toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useLoyaltyCards } from "@/hooks/use-loyalty-cards"; // <-- Importação adicionada
import { useExternalBusinessSettings } from "@/hooks/use-external-business-settings";

const authSchema = z.object({
  email: z.string().email({
    message: "Insira um email válido.",
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
  const [isLinkSent, setIsLinkSent] = useState(false);
  
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

  async function sendMagicLinkEmail(email: string) {
    // Determine the final redirect URL after successful login
    const finalRedirectTo = redirectUrl || `${window.location.origin}/customer-cards`;

    // 1. Request Magic Link from Supabase (This sends the default Supabase email)
    const { error: otpError } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
            emailRedirectTo: finalRedirectTo,
        }
    });

    if (otpError) {
        throw otpError;
    }

    // 2. Send Custom Email via Edge Function (This sends our branded email)
    const payload = {
        email: email,
        subject: "Seu Acesso CATBACK - Clique para Entrar",
        bodyText: `Olá! Enviámos o seu link de acesso. Por favor, procure na sua caixa de entrada por um email com o assunto "Magic Link" ou "Seu Acesso CATBACK". Clique no link para aceder à sua área de cliente e ver os seus cartões de fidelidade e agendamentos.`,
        ctaLink: finalRedirectTo, // Use the final redirect link
        ctaText: "Aceder à Minha Área",
        logoUrl: businessSettings?.logo_url || undefined,
        businessName: businessSettings?.business_name || undefined,
    };

    const { error: edgeError } = await supabase.functions.invoke('send-welcome-email', {
        body: payload,
    });

    if (edgeError) {
        console.error("Failed to send custom email via Edge Function:", edgeError);
        // We still proceed, as the user should receive the default Supabase email.
    }
  }

  async function onSubmit(values: AuthFormValues) {
    try {
      await sendMagicLinkEmail(values.email);
      showSuccess("Link de acesso enviado! Verifique seu email.");
      setIsLinkSent(true);
    } catch (error) {
      showError("Erro ao enviar link de acesso. Tente novamente.");
      console.error(error);
    }
  }

  if (isLoading || user || isLoadingSettings) {
    return (
        <Layout>
            <div className="container py-20 text-center">
                <Loader2 className="h-8 w-8 animate-spin text-catback-purple mx-auto" />
            </div>
        </Layout>
    );
  }
  
  const businessName = businessSettings?.business_name || "CATBACK";
  const logoUrl = businessSettings?.logo_url;

  return (
    <Layout>
      <div className="container py-16 flex justify-center">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center">
            {logoUrl ? (
                <img src={logoUrl} alt={businessName} className="w-20 h-20 mx-auto mb-2 object-contain" />
            ) : (
                <Cat className="w-8 h-8 mx-auto text-catback-purple mb-2" />
            )}
            <CardTitle className="text-3xl font-bold text-catback-dark-purple">Acesso Cliente {businessName !== "CATBACK" && `| ${businessName}`}</CardTitle>
            <p className="text-sm text-gray-500">Entre ou crie sua conta para ver seus cartões de fidelidade.</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {isLinkSent ? (
                <div className="text-center p-6 border rounded-lg bg-gray-50 dark:bg-gray-800">
                    <Mail className="w-8 h-8 text-catback-success-green mx-auto mb-3" />
                    <p className="font-semibold text-gray-800 dark:text-gray-200">
                        Verifique seu Email!
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        Enviámos um link de acesso. Procure por um email com o assunto "Magic Link" ou "Seu Acesso CATBACK".
                    </p>
                    <Button variant="link" onClick={() => setIsLinkSent(false)} className="mt-4">
                        Tentar outro email
                    </Button>
                </div>
            ) : (
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
                        <Button 
                            type="submit" 
                            className="w-full bg-catback-energy-orange hover:bg-catback-energy-orange/90"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                "Enviar Link de Acesso"
                            )}
                        </Button>
                    </form>
                </Form>
            )}
            
            <div className="text-center text-sm text-gray-500 pt-4">
              <Link to="/login" className="text-catback-purple hover:underline">
                Acesso para Lojistas
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CustomerAuth;