import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Megaphone, Loader2, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { showSuccess, showError } from "@/utils/toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
  message: z.string().min(10, {
    message: "A mensagem deve ter pelo menos 10 caracteres.",
  }).max(160, {
    message: "A mensagem não pode exceder 160 caracteres (limite de SMS).",
  }),
});

type MarketingFormValues = z.infer<typeof formSchema>;

const MarketingPage: React.FC = () => {
  const form = useForm<MarketingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  const { isSubmitting } = form.formState;
  const messageLength = form.watch("message").length;

  async function onSubmit(values: MarketingFormValues) {
    if (!window.confirm("Tem a certeza que deseja enviar esta mensagem para TODOS os seus clientes?")) {
      return;
    }

    try {
      const { error } = await supabase.functions.invoke('send-broadcast', {
        body: { message: values.message },
      });

      if (error) {
        throw new Error(error.message);
      }

      showSuccess("Mensagem enviada para a fila de processamento!");
      form.reset();
    } catch (error: any) {
      showError(`Erro ao enviar mensagem: ${error.message}`);
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Marketing Direto
      </h1>
      
      <Alert>
        <Megaphone className="h-4 w-4" />
        <AlertTitle>Funcionalidade em Desenvolvimento</AlertTitle>
        <AlertDescription>
          Atualmente, esta funcionalidade apenas simula o envio. A integração com serviços de SMS/Email será adicionada no futuro.
        </AlertDescription>
      </Alert>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Enviar Anúncio em Massa</CardTitle>
          <CardDescription>
            Escreva uma mensagem curta para enviar a todos os clientes que possuem um cartão de fidelidade.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mensagem</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ex: Olá! Este fim de semana, aproveite 20% de desconto em todos os serviços. Mostre esta mensagem para validar."
                        rows={5}
                        maxLength={160}
                        {...field}
                      />
                    </FormControl>
                    <div className="text-right text-sm text-muted-foreground">
                      {messageLength} / 160
                    </div>
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
                  <Send className="mr-2 h-4 w-4" />
                )}
                Enviar para Todos os Clientes
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketingPage;