import React from "react";
import Layout from "@/components/Layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Cat, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { showSuccess, showError } from "@/utils/toast";
import { getAuthErrorMessage } from "@/utils/auth-errors";
import { useExternalBusinessSettings } from "@/hooks/use-external-business-settings";

const signupSchema = z.object({
  email: z.string().email({
    message: "Insira um email válido.",
  }),
  password: z.string().min(6, {
    message: "A senha deve ter pelo menos 6 caracteres.",
  }),
});

type SignupFormValues = z.infer<typeof signupSchema>;

const CustomerSignup: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || "/customer-cards";
  const loyaltyCardIdMatch = redirectUrl ? new URLSearchParams(redirectUrl.split('?')[1]).get('id') : null;
  
  // Fetch business settings if enrolling via QR code
  const { data: loyaltyCards } = useLoyaltyCards();
  const loyaltyCard = loyaltyCards?.find(card => card.id === loyaltyCardIdMatch);
  const ownerId = loyaltyCard?.user_id;
  const { data: businessSettings, isLoading: isLoadingSettings } = useExternalBusinessSettings(ownerId);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: SignupFormValues) {
    try {
      // 1. Sign up the user (Supabase sends the default confirmation email)
      const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          // We don't need to set a redirect URL here, as the user will be logged in immediately
          // and the useEffect in CustomerAuth will handle the final redirect.
        },
      });

      if (error) {
        throw error;
      }
      
      showSuccess("Cadastro realizado com sucesso! Você está logado.");
      // Redirect to the intended page (e.g., /enroll?id=...)
      navigate(redirectUrl, { replace: true });

    } catch (error) {
      const message = getAuthErrorMessage(error);
      showError(message);
    }
  }

  const businessName = businessSettings?.business_name || "CATBACK";
  const logoUrl = businessSettings?.logo_url;

  if (isLoadingSettings) {
    return (
        <Layout>
            <div className="container py-20 text-center">
                <Loader2 className="h-8 w-8 animate-spin text-catback-purple mx-auto" />
            </div>
        </Layout>
    );
  }

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
            <CardTitle className="text-3xl font-bold text-catback-dark-purple">Criar Conta Cliente</CardTitle>
            <p className="text-sm text-gray-500">Cadastre-se para gerenciar seus cartões de fidelidade.</p>
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
                      <FormLabel>Criar Senha</FormLabel>
                      <FormControl>
                        <Input id="password" type="password" placeholder="********" {...field} />
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
                    "Criar Conta e Aderir"
                  )}
                </Button>
              </form>
            </Form>
            <div className="text-center text-sm text-gray-500">
              Já tem conta?{" "}
              <Link to={`/customer-auth?redirect=${encodeURIComponent(redirectUrl)}`} className="text-catback-purple hover:underline">
                Entrar
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

// Need to import useLoyaltyCards here since it's used in the component
import { useLoyaltyCards } from "@/hooks/use-loyalty-cards";

export default CustomerSignup;