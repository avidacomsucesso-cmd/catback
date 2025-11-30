import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBusinessSettings, useUpsertBusinessSettings } from "@/hooks/use-business-settings";
import { Loader2, Store } from "lucide-react";

const settingsSchema = z.object({
  business_name: z.string().min(2, { message: "O nome do negócio é obrigatório." }),
  logo_url: z.string().url({ message: "Insira um URL de logo válido." }).optional().or(z.literal('')),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

const BusinessSettingsForm: React.FC = () => {
  const { data: settings, isLoading: isLoadingSettings } = useBusinessSettings();
  const upsertMutation = useUpsertBusinessSettings();
  
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      business_name: "",
      logo_url: "",
    },
  });

  // Populate form when settings data loads
  useEffect(() => {
    if (settings) {
      form.reset({
        business_name: settings.business_name || "",
        logo_url: settings.logo_url || "",
      });
    }
  }, [settings, form]);

  const { isSubmitting } = form.formState;

  async function onSubmit(values: SettingsFormValues) {
    upsertMutation.mutate({
        business_name: values.business_name,
        logo_url: values.logo_url || null,
    });
  }

  if (isLoadingSettings) {
    return (
      <Card className="w-full max-w-lg">
        <CardContent className="p-6 flex justify-center items-center h-40">
          <Loader2 className="h-6 w-6 animate-spin text-catback-purple" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="text-2xl text-catback-dark-purple flex items-center">
            <Store className="w-6 h-6 mr-2" /> Configurações do Negócio
        </CardTitle>
        <p className="text-sm text-gray-500">Defina o nome e a logo que aparecerão nos cartões e emails dos seus clientes.</p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="business_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Negócio</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Café da Praça" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="logo_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL da Logo (Opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://suaempresa.com/logo.png" {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full bg-catback-purple hover:bg-catback-dark-purple"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Salvar Configurações"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default BusinessSettingsForm;