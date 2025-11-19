import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCreateLoyaltyCard } from "@/hooks/use-loyalty-cards";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(3, { message: "O nome é obrigatório." }),
  type: z.enum(["stamps", "points", "cashback"], {
    required_error: "Selecione um tipo de fidelidade.",
  }),
  reward_description: z.string().min(5, { message: "Descreva a recompensa." }),
  // Config fields will be dynamic, but we start with a simple stamp count for 'stamps'
  stampCount: z.number().int().min(2).max(20).optional(),
});

type LoyaltyCardFormValues = z.infer<typeof formSchema>;

const CreateLoyaltyCardForm: React.FC<{ onCardCreated: () => void }> = ({ onCardCreated }) => {
  const createCardMutation = useCreateLoyaltyCard();
  
  const form = useForm<LoyaltyCardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "stamps",
      reward_description: "",
      stampCount: 10,
    },
  });

  const selectedType = form.watch("type");
  const { isSubmitting } = form.formState;

  async function onSubmit(values: LoyaltyCardFormValues) {
    const payload = {
      name: values.name,
      type: values.type,
      reward_description: values.reward_description,
      config: {},
    };

    if (values.type === 'stamps' && values.stampCount) {
        payload.config = { stamp_count: values.stampCount };
    }
    
    createCardMutation.mutate(payload, {
        onSuccess: () => {
            form.reset();
            onCardCreated();
        }
    });
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl text-catback-purple">Criar Novo Cartão de Fidelidade</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Cartão (Ex: Cartão Café)</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome interno do programa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Fidelidade</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo de programa" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="stamps">Cartão de Selos (Carimbos)</SelectItem>
                      <SelectItem value="points">Pontos Acumulativos</SelectItem>
                      <SelectItem value="cashback">Cashback</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectedType === 'stamps' && (
                <FormField
                    control={form.control}
                    name="stampCount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Número de Selos Necessários</FormLabel>
                            <FormControl>
                                <Input 
                                    type="number" 
                                    placeholder="Ex: 10" 
                                    {...field} 
                                    onChange={e => field.onChange(parseInt(e.target.value))}
                                />
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
                  <FormLabel>Descrição da Recompensa (Ex: 1 Café Grátis)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="O que o cliente ganha ao completar o cartão?" {...field} />
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
                "Criar Cartão"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateLoyaltyCardForm;