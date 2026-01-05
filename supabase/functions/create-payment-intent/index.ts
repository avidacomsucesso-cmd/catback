import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@12.0.0?target=deno';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const secretKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!secretKey) {
      throw new Error('Stripe Secret Key not found in environment variables.');
    }

    const stripe = new Stripe(secretKey, {
      apiVersion: '2022-11-15',
      httpClient: Stripe.createFetchHttpClient(),
    });

    // Parse request body
    const { amount } = await req.json();

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'eur',
      automatic_payment_methods: {
        enabled: true,
      },
    });
    
    // Retrieve the public key to send to frontend
    // This solves the issue of missing .env in frontend
    const publicKey = Deno.env.get('VITE_STRIPE_PUBLISHABLE_KEY') || 
                      Deno.env.get('STRIPE_PUBLIC_KEY') || 
                      Deno.env.get('VITE_STRIPE_PUBLIC_KEY');

    console.log(`PaymentIntent created: ${paymentIntent.id}. Sending public key: ${publicKey ? 'Yes' : 'No'}`);

    return new Response(
      JSON.stringify({ 
        clientSecret: paymentIntent.client_secret,
        publicKey: publicKey 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error("Error creating payment intent:", error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});