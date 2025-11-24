import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useCreateService, useUpdateService, Service } from "@/hooks/use-services";
import { Loader2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const formSchema = z.object({
  name: z.string().min(3, { message: "O nome do serviço é obrigatório." }),
  description: z.string().optional(),
  duration_minutes: z.coerce.number().int().min(1, { message: "A duração deve ser de pelo menos 1 minuto." }),
  price: z.coerce.number().min(0, { message: "O preço não pode ser negativo." }),
  is_active: z.boolean(),
});

type ServiceFormValues = z.infer<typeof formSchema>;

interface ServiceFormProps {
  service?: Service;
  onFinished: () => void;
}

const ServiceForm: React.FC<ServiceFormProps> = ({ service, onFinished }) => {
  const createMutation = useCreateService();
  const updateMutation = useUpdateService();
  const isEditing = !!service;
  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      duration_minutes: 30,
      price: 0,
      is_active: true,
    },
  });

  useEffect(() => {
    if (service) {
      form.reset({
        name: service.name,
        description: service.description || "",
        duration_minutes: service.duration_minutes,
        price: service.price,
        is_active: service.is_active,
      });
    }
  }, [service, form]);

  async function onSubmit(values: ServiceFormValues) {
    if (isEditing) {
      updateMutation.mutate({ id: service.id, ...values }, { onSuccess: onFinished });
    } else {
      createMutation.mutate(values, { onSuccess: onFinished });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Serviço</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Corte de Cabelo Masculino" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição (Opcional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Detalhes sobre o serviço" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="duration_minutes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duração (minutos)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Ex: 30" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço (€)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" placeholder="Ex: 15.00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="is_active"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel>Serviço Ativo</FormLabel>
                <p className="text-sm text-muted-foreground">
                  Clientes podem agendar este serviço.
                </p>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-catback-purple hover:bg-catback-dark-purple" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : (isEditing ? "Salvar Alterações" : "Criar Serviço")}
        </Button>
      </form>
    </Form>
  );
};

export default ServiceForm;