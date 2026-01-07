import React, { useEffect, useState } from "react";
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
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { supabase } from "@/integrations/supabase/client";

const checkoutSchema = z.object({
  name: z.string().min(2, { message: "Nome é obrigatório." }),
  email: z.string().email({ message: "Email inválido." }),
  address: z.string().min(5, { message: "Morada é obrigatória." }),
  city: z.string().min(2, { message: "Cidade é obrigatória." }),
  zipCode: z.string().min(4, { message: "Código postal é obrigatório." }),
  nif: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

const CheckoutForm: React.FC<{ clientSecret: string }> = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  
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

  const onSubmit = async (values: CheckoutFormValues) => {
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    // Track Google Ads conversion: Initiate Payment
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        'send_to': 'AW-17823816531/tQENCJrGz94bENO2h7NC'
      });
    }

    try {
      // 1. (Optional) Save shipping info to DB here before payment
      // For now, we proceed to payment

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/nfc-display/success`,
          payment_method_data: {
            billing_details: {
              name: values.name,
              email: values.email,
              address: {
                line1: values.address,
                city: values.city,
                postal_code: values.zipCode,
                country: 'PT', // Defaulting to Portugal
              },
            },
          },
        },
      });

      if (error) {
        showError(error.message || "Ocorreu um erro no pagamento.");
      }
      // If successful, Stripe redirects to return_url
      
    } catch (err: any) {
      showError("Erro inesperado: " + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const price = 33.90;

  return (
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

      {/* Checkout Form */}
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
            
            <div className="pt-4 border-t mt-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Pagamento Seguro</h3>
              <PaymentElement />
            </div>

            <Button 
                type="submit" 
                className="w-full bg-catback-purple hover:bg-catback-dark-purple mt-6"
                disabled={isProcessing || !stripe || !elements}
            >
                {isProcessing ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    `Pagar Agora €${price.toFixed(2)}`
                )}
            </Button>
            <Link to="/nfc-display" className="flex items-center justify-center text-sm text-gray-500 hover:text-catback-purple mt-2">
                <ArrowLeft className="w-4 h-4 mr-1" /> Voltar
            </Link>
        </form>
      </Form>
    </div>
  );
};

const NfcCheckout: React.FC = () => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the PaymentIntent client secret AND the public key
    const fetchPaymentConfig = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('create-payment-intent', {
          body: { amount: 3390 }, // 33.90 EUR in cents
        });

        if (error) {
            console.error("Supabase Invoke Error:", error);
            // Check if it's a connection error (function missing or CORS)
            if (error.message && (error.message.includes("Failed to send a request") || error.message.includes("fetch"))) {
                throw new Error("Erro de conexão (CORS/Network). Verifique se a Edge Function foi atualizada e implantada corretamente.");
            }
            throw error;
        }

        if (data) {
            if (data.clientSecret) {
                setClientSecret(data.clientSecret);
            }
            
            // Prioritize key from backend, fallback to frontend env, finally error
            const backendKey = data.publicKey;
            const frontendKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
            const keyToUse = backendKey || frontendKey;

            if (keyToUse) {
                setStripePromise(loadStripe(keyToUse));
            } else {
                throw new Error("Chave pública do Stripe não encontrada (Frontend ou Backend).");
            }
        }
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Erro desconhecido ao iniciar checkout.");
        showError("Erro ao iniciar pagamento.");
      }
    };

    fetchPaymentConfig();
  }, []);

  const price = 33.90;

  if (error) {
    return (
        <Layout>
            <div className="container py-16 flex justify-center text-center flex-col items-center">
                <div className="text-red-500 text-lg font-semibold mb-2">Erro de Configuração</div>
                <p className="text-gray-600 mb-4">{error}</p>
                <Button onClick={() => window.location.reload()}>Tentar Novamente</Button>
            </div>
        </Layout>
    );
  }

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
            {clientSecret && stripePromise ? (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm clientSecret={clientSecret} />
              </Elements>
            ) : (
              <div className="flex justify-center p-12">
                <Loader2 className="h-8 w-8 animate-spin text-catback-purple" />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default NfcCheckout;