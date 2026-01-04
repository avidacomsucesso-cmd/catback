import React from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Nfc, Loader2, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { showSuccess, showError } from "@/utils/toast";

const checkoutSchema = z.object({
  name: z.string().min(2, { message: "Nome é obrigatório." }),
  email: z.string().email({ message: "Email inválido." }),
  address: z.string().min(5, { message: "Morada é obrigatória." }),
  city: z.string().min(2, { message: "Cidade é obrigatória." }),
  zipCode: z.string().min(4, { message: "Código postal é obrigatório." }),
  nif: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

const NfcCheckout: React.FC = () => {
  const navigate = useNavigate();
  
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      city: "",
      zipCode: "",
      nif: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: CheckoutFormValues) {
    // Simulate payment processing
    console.log("Processing order:", values);
    
    // In a real app, this would be a Stripe/Payment API call
    await new Promise(resolve => setTimeout(resolve, 1500)); 

    showSuccess("Pedido processado com sucesso! Redirecionando...");
    navigate("/nfc-display/success", { replace: true });
  }

  const price = 33.90; // Atualizado para 33.90

  return (
    <Layout>
      <div className="container py-16 flex justify-center">
        <Card className="w-full max-w-3xl shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-catback-dark-purple flex items-center justify-center">
                <Nfc className="w-6 h-6 mr-2 text-catback-energy-orange" /> Checkout Display NFC
            </CardTitle>
            <CardDescription>
                Pagamento único de <span className="font-bold text-catback-purple">€{price.toFixed(2)}</span>.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid lg:grid-cols-2 gap-8">
                {/* Order Summary */}
                <div className="space-y-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 h-full">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Seu Pedido</h3>
                    <div className="flex justify-between text-sm">
                        <span>Display NFC CATBACK</span>
                        <span className="font-semibold">€33.90</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span>Portes de Envio (Portugal Continental)</span>
                        <span className="font-semibold">€0.00</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-300 dark:border-gray-700">
                        <span>Total a Pagar</span>
                        <span className="text-catback-energy-orange">€{price.toFixed(2)}</span>
                    </div>
                    <div className="space-y-2 pt-4 text-sm text-gray-600 dark:text-gray-400">
                        <p className="flex items-center"><Check className="w-4 h-4 mr-2 text-catback-success-green" /> Pagamento Único</p>
                        <p className="flex items-center"><Check className="w-4 h-4 mr-2 text-catback-success-green" /> Envio Grátis</p>
                        <p className="flex items-center"><Check className="w-4 h-4 mr-2 text-catback-success-green" /> Garantia de 1 Ano</p>
                    </div>
                </div>

                {/* Shipping Form */}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Dados de Envio</h3>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome Completo</FormLabel>
                                    <FormControl><Input placeholder="Seu nome" {...field} /></FormControl>
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
                                    <FormControl><Input type="email" placeholder="seu@email.com" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Morada</FormLabel>
                                    <FormControl><Input placeholder="Rua, número, andar" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Cidade</FormLabel>
                                        <FormControl><Input placeholder="Lisboa" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="zipCode"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Código Postal</FormLabel>
                                        <FormControl><Input placeholder="1000-000" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="nif"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>NIF (Opcional)</FormLabel>
                                    <FormControl><Input placeholder="Número de Identificação Fiscal" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        
                        <Button 
                            type="submit" 
                            className="w-full bg-catback-purple hover:bg-catback-dark-purple mt-6"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                "Pagar Agora €33.90 (Simulação)"
                            )}
                        </Button>
                        <Link to="/nfc-display" className="flex items-center justify-center text-sm text-gray-500 hover:text-catback-purple mt-2">
                            <ArrowLeft className="w-4 h-4 mr-1" /> Voltar
                        </Link>
                    </form>
                </Form>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default NfcCheckout;