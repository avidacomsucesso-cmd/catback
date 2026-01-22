import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Stripe from "https://esm.sh/stripe@11.1.0";

const stripe = new Stripe(Deno.env.get("STRIPE_API_KEY") as string, {
  apiVersion: "2022-11-15",
});

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

async function sendNewOrderEmail(order: any) {
  if (!RESEND_API_KEY) {
    console.warn("RESEND_API_KEY is missing. Skipping email notification.");
    return;
  }

  const customerName = order.shipping_details?.name || 'N/A';
  const customerEmail = order.customer_details?.email || 'N/A';
  const shippingAddress = order.shipping_details?.address
    ? `${order.shipping_details.address.line1}, ${order.shipping_details.address.city}, ${order.shipping_details.address.postal_code}`
    : 'N/A';

  const emailHtml = `
    <h1>Nova Venda de Display NFC!</h1>
    <p>Uma nova venda foi realizada através do site.</p>
    <h2>Detalhes do Cliente:</h2>
    <ul>
      <li><strong>Nome:</strong> ${customerName}</li>
      <li><strong>Email:</strong> ${customerEmail}</li>
      <li><strong>Morada de Envio:</strong> ${shippingAddress}</li>
      <li><strong>NIF:</strong> ${order.nif || 'N/A'}</li>
    </ul>
    <h2>Detalhes do Pedido:</h2>
    <ul>
      <li><strong>Produto:</strong> Display NFC CATBACK</li>
      <li><strong>Valor Total:</strong> ${(order.amount_total / 100).toFixed(2)} EUR</li>
      <li><strong>ID da Transação Stripe:</strong> ${order.payment_intent}</li>
    </ul>
    <p>Por favor, proceda com o envio do produto.</p>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "CATBACK <noreply@catback.app>",
      to: ["geral@catback.app"], // Atualizado para o seu email de suporte/gestão
      subject: `Nova Venda de Display NFC - Pedido de ${customerName}`,
      html: emailHtml,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    console.error("Failed to send email:", error);
  } else {
    console.log("New order notification email sent successfully.");
  }
}


serve(async (req) => {
  const signature = req.headers.get("Stripe-Signature");
  const body = await req.text();

  let receivedEvent;
  try {
    receivedEvent = await stripe.webhooks.constructEventAsync(
      body,
      signature!,
      Deno.env.get("STRIPE_WEBHOOK_SIGNING_SECRET")!
    );
  } catch (err) {
    return new Response(err.message, { status: 400 });
  }

  if (receivedEvent.type === "checkout.session.completed") {
    const session = receivedEvent.data.object;

    // Extract metadata
    const { nif } = session.metadata || {};

    // Get shipping and customer details
    const shippingDetails = session.shipping_details;
    const customerDetails = session.customer_details;

    if (!shippingDetails || !customerDetails) {
        console.error("Missing shipping or customer details in session:", session.id);
        return new Response("Missing shipping or customer details", { status: 400 });
    }

    const orderData = {
      stripe_payment_intent: session.payment_intent,
      amount_total: session.amount_total,
      customer_name: shippingDetails.name,
      customer_email: customerDetails.email,
      shipping_address: JSON.stringify(shippingDetails.address),
      nif: nif,
      status: 'completed',
    };

    // Save to database
    const { data, error } = await supabase.from("orders").insert([orderData]);

    if (error) {
      console.error("Error saving order to Supabase:", error);
      return new Response(error.message, { status: 500 });
    }

    console.log("Order saved successfully:", data);

    // Send email notification
    await sendNewOrderEmail({
        ...session,
        nif: nif,
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" },
  });
});