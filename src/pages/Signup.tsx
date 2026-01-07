import React from "react";
import Layout from "@/components/Layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Cat, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { showSuccess, showError } from "@/utils/toast";
import { getAuthErrorMessage } from "@/utils/auth-errors";

const signupSchema = z.object({
  businessName: z.string().min(2, {
    message: "O nome do negócio deve ter pelo menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Insira um email válido.",
  }),
  password: z.string().min(6, {
    message: "A senha deve ter pelo menos 6 caracteres.",
  }),
});

type SignupFormValues = z.infer<typeof signupSchema>;

const Signup: React.FC = () => {
  const navigate = useNavigate();
  
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      businessName: "",
      email: "",
      password: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: SignupFormValues) {
    try {
      // 1. Sign up the user (Supabase sends the default confirmation email)
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            first_name: values.businessName, // Use business name as first name initially
          },
          emailRedirectTo: `${window.location.origin}/login`,
        },
      });

      if (error) {
        throw error;
      }
      
      // 2. Send Custom Welcome Email via Edge Function
      const confirmationLink = `${window.location.origin}/login`; // Link to login page
      
      const payload = {
          email: values.email,
          subject: "Bem-vindo ao CATBACK! Confirme seu Email",
          bodyText: `Olá ${values.businessName}! Obrigado por se juntar ao CATBACK. Enviámos um email de confirmação para ${values.email}. Por favor, verifique a sua caixa de entrada e clique no link para ativar a sua conta e iniciar o seu teste de 14 dias.`,
          ctaLink: confirmationLink,
          ctaText: "Ir para a Página de Login",
          // Pass business name for email personalization (logo is not available yet)
          businessName: values.businessName, 
      };

      // NOTE: Renamed from 'send-welcome-email' to 'send-email'
      const { error: edgeError } = await supabase.functions.invoke('send-email', {
          body: payload,
      });

      if (edgeError) {
          console.error("Failed to send welcome email via Edge Function:", edgeError);
      }
      
      showSuccess("Conta criada com sucesso! Verifique seu email para confirmar o cadastro.");
      navigate("/login");

    } catch (error) {
      const message = getAuthErrorMessage(error);
      showError(message);
    }
  }

  return (
    <Layout>
      <div className="container py-16 flex justify-center">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-catback-dark-purple">Solicite sua Avaliação</CardTitle>
            <p className="text-sm text-gray-500">Comece hoje mesmo. Sem cartão de crédito.</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed border-catback-purple/30">
              <p className="text-gray-600 dark:text-gray-400 mb-4 font-medium">Para garantir o melhor setup para o seu negócio, agora oferecemos atendimento personalizado via WhatsApp.</p>
              <a href="https://wa.me/351928202241" target="_blank" rel="noopener noreferrer">
                <Button className="w-full bg-catback-energy-orange hover:bg-catback-energy-orange/90 h-12 text-lg">
                  Solicite uma avaliação Grátis
                </Button>
              </a>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t"></span></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">Ou continue com o registo manual</span></div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="businessName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Negócio</FormLabel>
                      <FormControl>
                        <Input id="businessName" placeholder="Café da Praça" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                    <Loader2 className="mr-2 h-4 w-4 animate-spin fill-white" />
                  ) : (
                    <>
                      <Cat className="w-5 h-5 mr-2 fill-white" /> Criar Conta
                    </>
                  )}
                </Button>
              </form>
            </Form>
            <div className="text-center text-sm text-gray-500">
              Já tem conta?{" "}
              <Link to="/login" className="text-catback-purple hover:underline">
                Entrar
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Signup;