import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// NOTE: In a real scenario, you would use Twilio or a similar service here.
// We are simulating the external API call using environment variables like TWILIO_ACCOUNT_SID, etc.

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { customer_identifier, start_time, service_name, type } = await req.json();

    if (!customer_identifier || !start_time || !service_name || !type) {
      throw new Error("Dados de notificação incompletos.");
    }

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // 1. Get customer details (phone/email)
    const { data: customer, error: customerError } = await supabaseAdmin
        .from('customers')
        .select('phone, email')
        .eq('identifier', customer_identifier)
        .maybeSingle();

    if (customerError) throw customerError;

    // Determine the best contact method (prioritize phone for WhatsApp/SMS)
    const targetPhone = customer?.phone;
    const targetEmail = customer?.email;
    
    const formattedTime = new Date(start_time).toLocaleString('pt-PT', { 
        dateStyle: 'short', 
        timeStyle: 'short' 
    });

    let messageBody = '';
    if (type === 'confirmation') {
        messageBody = `✅ Agendamento Confirmado! Olá ${customer_identifier}, o seu serviço '${service_name}' está confirmado para ${formattedTime}. Obrigado!`;
    } else if (type === 'reminder') {
        messageBody = `🔔 Lembrete: Tem um agendamento para '${service_name}' em ${formattedTime}. Por favor, confirme a sua presença.`;
    } else {
        throw new Error("Tipo de notificação inválido.");
    }

    // --- SIMULATION LOGIC ---
    console.log(`--- Notification Simulation ---`);
    console.log(`Type: ${type}`);
    
    if (targetPhone) {
        console.log(`Attempting to send via WhatsApp/SMS to: ${targetPhone}`);
        // In a real app, Twilio/WhatsApp API call would go here
    } else if (targetEmail) {
        console.log(`Attempting to send via Email to: ${targetEmail}`);
        // In a real app, Resend API call would go here
    } else {
        console.log(`No contact method found for identifier: ${customer_identifier}. Notification skipped.`);
    }
    
    console.log(`Message: ${messageBody}`);
    // --------------------------

    return new Response(
      JSON.stringify({ success: true, message: `Simulação de envio de ${type} concluída.` }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error("Edge Function Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});