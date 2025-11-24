import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useUpdateLoyaltyCard, LoyaltyCard } from "@/hooks/use-loyalty-cards";
import { Loader2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const formSchema = z.object({
  id: z.string(),
  name: z.string().min(3, { message: "O nome é obrigatório." }),
  reward_description: z.string().min(5, { message: "Descreva a recompensa." }),
  is_active: z.boolean(),
  stampCount: z.coerce.number().int().min(2).max(20).optional(),
  pointsPerEuro: z.coerce.number().min(0.1).optional(),
  cashbackPercentage: z.coerce.number().min(1).max(100).optional(),
});

type EditLoyaltyCardFormValues = z.infer<typeof formSchema>;

interface EditLoyaltyCardFormProps {
    card: LoyaltyCard;
    onCardUpdated: () => void;
}

const EditLoyaltyCardForm: React.FC<EditLoyaltyCardFormProps> = ({ card, onCardUpdated }) => {
  const updateCardMutation = useUpdateLoyaltyCard();
  
  const form = useForm<EditLoyaltyCardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: card.id,
      name: card.name,
      reward_description: card.reward_description,
      is_active: card.is_active,
      stampCount: card.type === 'stamps' ? card.config?.stamp_count : undefined,
      pointsPerEuro: card.type === 'points' ? card.config?.points_per_euro : undefined,
      cashbackPercentage: card.type === 'cashback' ? card.config?.cashback_percentage : undefined,
    },
  });

  const selectedType = card.type; // Type cannot be changed after creation
  const { isSubmitting } = form.formState;

  async function onSubmit(values: EditLoyaltyCardFormValues) {
    const payload = {
      id: values.id,
      name: values.name,
      reward_description: values.reward_description,
      is_active: values.is_active,
      config: card.config, // Start with existing config
    };

    if (selectedType === 'stamps' && values.stampCount) {
        payload.config = { ...payload.config, stamp_count: values.stampCount };
    } else if (selectedType === 'points' && values.pointsPerEuro) {
        payload.config = { ...payload.config, points_per_euro: values.pointsPerEuro };
    } else if (selectedType === 'cashback' && values.cashbackPercentage) {
        payload.config = { ...payload.config, cashback_percentage: values.cashbackPercentage };
    }
    
    updateCardMutation.mutate(payload, {
        onSuccess: () => {
            onCardUpdated();
        }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Cartão</FormLabel>
              <FormControl>
                <Input placeholder="Nome interno do programa" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
                <FormLabel>Tipo de Fidelidade</FormLabel>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} (Não pode ser alterado)
                </p>
            </div>
        </div>

        {selectedType === 'stamps' && (
            <FormField
                control={form.control}
                name="stampCount"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Número de Selos Necessários</FormLabel>
                        <FormControl>
                            <Input type="number" placeholder="Ex: 10" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        )}

        {selectedType === 'points' && (
            <FormField
                control={form.control}
                name="pointsPerEuro"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Pontos Ganhos por cada Euro (€)</FormLabel>
                        <FormControl>
                            <Input type="number" step="0.1" placeholder="Ex: 1" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        )}

        {selectedType === 'cashback' && (
            <FormField
                control={form.control}
                name="cashbackPercentage"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Percentagem de Cashback (%)</FormLabel>
                        <FormControl>
                            <Input type="number" placeholder="Ex: 5" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        )}
        
        <FormField
          control={form.control}
          name="reward_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição da Recompensa</FormLabel>
              <FormControl>
                <Textarea placeholder="O que o cliente ganha ao completar o cartão?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="is_active"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel>Status do Cartão</FormLabel>
                <p className="text-sm text-muted-foreground">
                  {field.value ? "Ativo: Clientes podem aderir e usar este cartão." : "Inativo: Clientes não podem mais aderir a este cartão."}
                </p>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
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
            "Salvar Alterações"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default EditLoyaltyCardForm;