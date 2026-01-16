import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@11.1.0";
import { corsHeaders } from "../_shared/cors.ts";

const stripe = new Stripe(Deno.env.get("STRIPE_API_KEY") as string, {
  apiVersion: "2022-11-15",
});

serve(async (req) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { amount, name, email, address, city, zipCode, nif } = await req.json();

    const customer = await stripe.customers.create({
      name,
      email,
      address: {
        line1: address,
        city,
        postal_code: zipCode,
        country: 'PT',
      },
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "eur",
      customer: customer.id,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        nif: nif,
      },
    });

    return new Response(
      JSON.stringify({
        clientSecret: paymentIntent.client_secret,
        publicKey: Deno.env.get("STRIPE_PUBLIC_KEY"),
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});