import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { showSuccess, showError } from "@/utils/toast";
import { getAuthErrorMessage } from "@/utils/auth-errors";

const formSchema = z.object({
  email: z.string().email({
    message: "Insira um email válido.",
  }),
});

type ForgotPasswordFormValues = z.infer<typeof formSchema>;

interface ForgotPasswordFormProps {
    isCustomerFlow?: boolean;
    onEmailSent: () => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ isCustomerFlow = false, onEmailSent }) => {
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: ForgotPasswordFormValues) {
    try {
      const redirectTo = isCustomerFlow ? `${window.location.origin}/customer-auth` : `${window.location.origin}/login`;

      const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
        redirectTo: redirectTo,
      });

      if (error) {
        throw error;
      }

      showSuccess("Email de recuperação enviado! Verifique sua caixa de entrada.");
      onEmailSent();

    } catch (error) {
      const message = getAuthErrorMessage(error);
      showError(message);
    }
  }

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader className="text-center">
        <Mail className={`w-8 h-8 mx-auto mb-2 ${isCustomerFlow ? 'text-catback-energy-orange' : 'text-catback-purple'}`} />
        <CardTitle className="text-3xl font-bold text-catback-dark-purple">Recuperar Senha</CardTitle>
        <CardDescription className="text-sm text-gray-500">
          Insira seu email para receber um link de redefinição de senha.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="seu@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className={`w-full ${isCustomerFlow ? 'bg-catback-energy-orange hover:bg-catback-energy-orange/90' : 'bg-catback-purple hover:bg-catback-dark-purple'}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Enviar Link de Redefinição"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ForgotPasswordForm;