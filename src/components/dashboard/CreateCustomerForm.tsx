import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2, UserPlus } from "lucide-react";
import { useCreateCustomer } from "@/hooks/use-customers";
import { showError } from "@/utils/toast";

const formSchema = z.object({
  full_name: z.string().optional().nullable(),
  email: z.string().email({ message: "Insira um email válido." }).optional().nullable(),
  phone: z.string().optional().nullable(),
}).refine(data => data.email || data.phone, {
    message: "É necessário fornecer um Email ou Telefone como identificador principal.",
    path: ["email"], // Attach error to email field if both are missing
});

type FormValues = z.infer<typeof formSchema>;

interface CreateCustomerFormProps {
  onFinished: () => void;
}

const CreateCustomerForm: React.FC<CreateCustomerFormProps> = ({ onFinished }) => {
  const createMutation = useCreateCustomer();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    // Ensure at least one identifier is present (handled by schema refine)
    if (!values.email && !values.phone) {
        showError("É necessário um email ou telefone.");
        return;
    }

    createMutation.mutate({
      full_name: values.full_name || null,
      email: values.email || null,
      phone: values.phone || null,
      // The identifier will be derived in the hook (email or phone)
      identifier: values.email || values.phone || "", 
    }, {
        onSuccess: onFinished
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome Completo (Opcional)</FormLabel>
              <FormControl>
                <Input placeholder="Nome do cliente" {...field} value={field.value || ''} />
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
              <FormLabel>Email (Identificador Principal)</FormLabel>
              <FormControl>
                <Input type="email" placeholder="email@cliente.com" {...field} value={field.value || ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone (Identificador Secundário)</FormLabel>
              <FormControl>
                <Input placeholder="912345678" {...field} value={field.value || ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-catback-dark-purple hover:bg-catback-purple" disabled={createMutation.isPending}>
          {createMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <UserPlus className="h-4 w-4 mr-2" />}
          Criar Cliente
        </Button>
      </form>
    </Form>
  );
};

export default CreateCustomerForm;