import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// URL da Edge Function genérica de envio de email
const SEND_EMAIL_URL = 'https://xwwvhlwoxmbczqkcxqxg.supabase.co/functions/v1/send-email';

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

    // 1. Get customer details (we need the email)
    const { data: customer, error: customerError } = await supabaseAdmin
        .from('customers')
        .select('email')
        // NOTE: We assume customer_identifier is the email or phone stored in the identifier column
        .eq('identifier', customer_identifier)
        .maybeSingle();

    if (customerError) throw customerError;

    const targetEmail = customer?.email;
    
    if (!targetEmail) {
        console.log(`No email found for identifier: ${customer_identifier}. Email notification skipped.`);
        // Return 200 OK even if email is skipped, as this is expected behavior if data is missing
        return new Response(
            JSON.stringify({ success: true, message: "Email do cliente não encontrado. Notificação ignorada." }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
        );
    }

    // 2. Get business settings for branding
    const authHeader = req.headers.get('Authorization')!;
    const jwt = authHeader.split('Bearer ')[1];
    const { data: { user } } = await supabaseAdmin.auth.getUser(jwt);
    
    let businessName = "CATBACK";
    let logoUrl = null;

    if (user) {
        const { data: settings } = await supabaseAdmin
            .from('business_settings')
            .select('business_name, logo_url')
            .eq('user_id', user.id)
            .maybeSingle();
        
        if (settings) {
            businessName = settings.business_name;
            logoUrl = settings.logo_url;
        }
    }

    // 3. Prepare Email Content
    const formattedTime = new Date(start_time).toLocaleString('pt-PT', { 
        dateStyle: 'full', 
        timeStyle: 'short' 
    });
    
    let subject = '';
    let bodyText = '';
    let ctaText = 'Ver Meus Agendamentos';
    let ctaLink = `${req.url.split('/functions')[0]}/customer-cards?tab=appointments`;

    if (type === 'confirmation') {
        subject = `Confirmação de Agendamento com ${businessName}`;
        bodyText = `O seu agendamento para o serviço <strong>${service_name}</strong> foi confirmado com sucesso para o dia <strong>${formattedTime}</strong>. Estamos ansiosos pela sua visita!`;
    } else if (type === 'reminder') {
        subject = `Lembrete: Agendamento com ${businessName}`;
        bodyText = `Este é um lembrete amigável sobre o seu agendamento para <strong>${service_name}</strong>, que está marcado para <strong>${formattedTime}</strong>. Por favor, confirme a sua presença.`;
    } else {
        throw new Error("Tipo de notificação inválido.");
    }

    // 4. Call the generic send-email function
    const emailPayload = {
        email: targetEmail,
        subject: subject,
        bodyText: bodyText,
        ctaLink: ctaLink,
        ctaText: ctaText,
        logoUrl: logoUrl,
        businessName: businessName,
    };

    const emailResponse = await fetch(SEND_EMAIL_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailPayload),
    });

    if (!emailResponse.ok) {
        // Read the error response from the send-email function for better debugging
        const errorData = await emailResponse.json();
        console.error("Email Function Error:", errorData);
        // Throw an error to return a non-2xx status code to the client
        throw new Error(`Falha ao enviar email: ${errorData.error || emailResponse.statusText}`);
    }
    
    return new Response(
      JSON.stringify({ success: true, message: `Notificação de Email processada com sucesso.` }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error("Edge Function Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400, // Return 400 status code on error
    });
  }
});