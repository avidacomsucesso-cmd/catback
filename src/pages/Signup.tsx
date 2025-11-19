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
      const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            first_name: values.businessName, // Using business name as first_name placeholder for profile creation
          },
        },
      });

      if (error) {
        throw error;
      }

      showSuccess("Conta criada com sucesso! Verifique seu email para confirmar o cadastro.");
      // Optionally redirect to a confirmation page or login
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
            <CardTitle className="text-3xl font-bold text-catback-dark-purple">Começar Grátis</CardTitle>
            <p className="text-sm text-gray-500">Inicie seu teste de 14 dias. Sem cartão de crédito.</p>
          </CardHeader>
          <CardContent className="space-y-6">
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
                      <Cat className="w-5 h-5 mr-2 fill-white" /> Iniciar Teste Grátis
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