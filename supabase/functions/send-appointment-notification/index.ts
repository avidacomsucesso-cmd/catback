import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Meta API Configuration (Requires secrets to be set in Supabase)
const WHATSAPP_ACCESS_TOKEN = Deno.env.get('WHATSAPP_ACCESS_TOKEN');
const WHATSAPP_PHONE_NUMBER_ID = Deno.env.get('WHATSAPP_PHONE_NUMBER_ID');
const META_API_URL = `https://graph.facebook.com/v19.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`;

// Template names (These must be pre-approved by Meta)
const TEMPLATE_CONFIRMATION = 'appointment_confirmation';
const TEMPLATE_REMINDER = 'appointment_reminder';

// Function to simulate sending a message via Meta API
async function sendWhatsAppMessage(recipientPhone: string, templateName: string, components: any[]) {
    if (!WHATSAPP_ACCESS_TOKEN || !WHATSAPP_PHONE_NUMBER_ID) {
        console.error("Meta API secrets not configured. Skipping real send.");
        return { success: false, message: "Meta API not configured." };
    }

    // NOTE: This is a simulation of the fetch call structure.
    const payload = {
        messaging_product: "whatsapp",
        to: recipientPhone,
        type: "template",
        template: {
            name: templateName,
            language: { code: "pt_PT" },
            components: components,
        },
    };

    console.log(`--- Meta API Call Simulation ---`);
    console.log(`Recipient: ${recipientPhone}`);
    console.log(`Template: ${templateName}`);
    console.log(`Payload: ${JSON.stringify(payload)}`);
    
    // In a real app, the fetch call would be here:
    /*
    const response = await fetch(META_API_URL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Meta API Error: ${JSON.stringify(errorData)}`);
    }
    */

    return { success: true, message: "Meta API call simulated successfully." };
}


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

    const targetPhone = customer?.phone;
    
    const formattedTime = new Date(start_time).toLocaleString('pt-PT', { 
        dateStyle: 'short', 
        timeStyle: 'short' 
    });

    let templateName = '';
    let components: any[] = [];

    if (type === 'confirmation') {
        templateName = TEMPLATE_CONFIRMATION;
        components = [
            {
                type: "body",
                parameters: [
                    { type: "text", text: service_name },
                    { type: "text", text: formattedTime },
                ],
            },
        ];
    } else if (type === 'reminder') {
        templateName = TEMPLATE_REMINDER;
        components = [
            {
                type: "body",
                parameters: [
                    { type: "text", text: service_name },
                    { type: "text", text: formattedTime },
                ],
            },
        ];
    } else {
        throw new Error("Tipo de notificação inválido.");
    }

    let notificationResult = { success: false, message: "Nenhuma notificação enviada." };

    if (targetPhone) {
        // Meta API requires phone number to start with country code (e.g., 35191...)
        // Assuming the stored phone number is correctly formatted for Meta API.
        notificationResult = await sendWhatsAppMessage(targetPhone, templateName, components);
    } else {
        // Fallback to email if phone is missing (optional, but good practice)
        console.log(`No phone number found for identifier: ${customer_identifier}. Skipping WhatsApp.`);
    }
    
    return new Response(
      JSON.stringify({ success: true, message: `Simulação de envio de WhatsApp concluída. Resultado: ${notificationResult.message}` }),
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