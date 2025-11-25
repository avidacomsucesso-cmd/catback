import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCustomerDetails, useUpsertCustomerDetails } from "@/hooks/use-customer-details";
import { Loader2, User, Mail, Phone } from "lucide-react";

const formSchema = z.object({
  full_name: z.string().optional().nullable(),
  email: z.string().email({ message: "Insira um email válido." }).optional().nullable(),
  phone: z.string().optional().nullable(),
});

type FormValues = z.infer<typeof formSchema>;

interface CustomerDetailsFormProps {
  identifier: string;
}

const CustomerDetailsForm: React.FC<CustomerDetailsFormProps> = ({ identifier }) => {
  const { data: customer, isLoading } = useCustomerDetails(identifier);
  const upsertMutation = useUpsertCustomerDetails();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (customer) {
      form.reset({
        full_name: customer.full_name || "",
        email: customer.email || (identifier.includes('@') ? identifier : ""),
        phone: customer.phone || (!identifier.includes('@') ? identifier : ""),
      });
    } else {
        form.reset({
            full_name: "",
            email: identifier.includes('@') ? identifier : "",
            phone: !identifier.includes('@') ? identifier : "",
        });
    }
  }, [customer, identifier, form]);

  const onSubmit = (values: FormValues) => {
    upsertMutation.mutate({
      identifier,
      ...values,
    });
  };

  return (
    <Card className="shadow-lg border-l-4 border-catback-energy-orange">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl text-gray-900 dark:text-white">
          <User className="w-6 h-6 mr-3 text-catback-dark-purple" />
          Detalhes do Cliente
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-6 w-6 animate-spin text-catback-purple" />
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Completo</FormLabel>
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
                    <FormLabel>Email</FormLabel>
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
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input placeholder="912345678" {...field} value={field.value || ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={upsertMutation.isPending}>
                {upsertMutation.isPending && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                Salvar Informações
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
};

export default CustomerDetailsForm;