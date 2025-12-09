import React from "react";
import Layout from "@/components/Layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Cat, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { showSuccess, showError } from "@/utils/toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { getAuthErrorMessage } from "@/utils/auth-errors";

const authSchema = z.object({
  email: z.string().email({
    message: "Insira um email válido.",
  }),
  password: z.string().min(6, {
    message: "A senha deve ter pelo menos 6 caracteres.",
  }),
});

type AuthFormValues = z.infer<typeof authSchema>;

const Login: React.FC = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  
  const form = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isSubmitting } = form.formState;

  // Redirect authenticated users to dashboard
  React.useEffect(() => {
    if (user && !isLoading) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, isLoading, navigate]);

  async function onSubmit(values: AuthFormValues) {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
        throw error;
      }

      showSuccess("Login bem-sucedido! Redirecionando para o Dashboard...");
      // Redirection handled by useEffect
    } catch (error) {
      const message = getAuthErrorMessage(error);
      showError(message);
    }
  }

  if (isLoading || user) {
    return (
        <Layout>
            <div className="container py-16 flex justify-center">
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
            <Cat className="w-8 h-8 mx-auto text-catback-purple mb-2" />
            <CardTitle className="text-3xl font-bold text-catback-dark-purple">Acesso Lojista</CardTitle>
            <p className="text-sm text-gray-500">Entre para gerenciar seu negócio.</p>
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
                    <Link to="/forgot-password-lojista" className="text-catback-energy-orange hover:underline">
                        Esqueceu a senha?
                    </Link>
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-catback-purple hover:bg-catback-dark-purple"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    "Entrar"
                  )}
                </Button>
              </form>
            </Form>
            <div className="text-center text-sm text-gray-500">
              Não tem conta?{" "}
              <Link to="/signup" className="text-catback-purple hover:underline">
                Criar Conta Grátis
              </Link>
            </div>
            <div className="text-center text-sm text-gray-500 pt-4">
                <Link to="/customer-auth" className="text-catback-energy-orange hover:underline">
                    Acesso para Clientes
                </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Login;