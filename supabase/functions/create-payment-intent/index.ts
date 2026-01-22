import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@11.1.0";
import { corsHeaders } from "../_shared/cors.ts";

const STRIPE_API_KEY = Deno.env.get("STRIPE_API_KEY");

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    if (!STRIPE_API_KEY) {
      throw new Error("STRIPE_API_KEY is not set in environment variables.");
    }

    const stripe = new Stripe(STRIPE_API_KEY, {
      apiVersion: "2022-11-15",
    });

    const { amount, name, email, address, city, zipCode, nif } = await req.json();
    
    // Default to 20€ if amount is not provided (safety)
    const finalAmount = amount || 2000;

    console.log(`Creating payment intent for ${email} - Amount: ${finalAmount}`);

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
      amount: finalAmount,
      currency: "eur",
      customer: customer.id,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        nif: nif || "",
        customer_email: email,
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
    console.error("Error creating payment intent:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});