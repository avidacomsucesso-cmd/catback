import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const SENDER_EMAIL_ADDRESS = Deno.env.get('SENDER_EMAIL_ADDRESS'); // Nova variável de ambiente
const RESEND_URL = 'https://api.resend.com/emails';
const SENDER_NAME = 'CATBACK'; // Nome que aparecerá como remetente

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Helper function to generate a simple, branded HTML email template
function generateEmailHtml(subject: string, bodyText: string, ctaLink: string, ctaText: string, logoUrl?: string, businessName?: string) {
  const logoHtml = logoUrl 
    ? `<img src="${logoUrl}" alt="${businessName || 'Logo do Negócio'}" style="max-width: 150px; height: auto; border-radius: 4px; margin-bottom: 10px;">`
    : `<p class="logo-text">CATBACK</p>`;

  const headerStyle = logoUrl ? 'background-color: #ffffff; padding: 20px; text-align: center;' : 'background-color: #7C3AED; padding: 20px; text-align: center;';
  
  return `
    <!DOCTYPE html>
    <html lang="pt">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
        <style>
            body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }
            .header { ${headerStyle} }
            .content { padding: 30px; color: #333333; line-height: 1.6; }
            .cta { display: block; width: 80%; margin: 20px auto; padding: 12px 20px; background-color: #F59E0B; color: #ffffff; text-align: center; text-decoration: none; border-radius: 6px; font-weight: bold; }
            .footer { padding: 20px; text-align: center; font-size: 12px; color: #999999; border-top: 1px solid #eeeeee; }
            .logo-text { color: #ffffff; font-size: 24px; font-weight: bold; margin-top: 10px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                ${logoHtml}
            </div>
            <div class="content">
                <h2>${subject}</h2>
                <p>${bodyText}</p>
                <a href="${ctaLink}" class="cta">${ctaText}</a>
                <p>Se o botão não funcionar, copie e cole o seguinte link no seu navegador:</p>
                <p><a href="${ctaLink}">${ctaLink}</a></p>
                <p>Obrigado,<br>A Equipa CATBACK</p>
            </div>
            <div class="footer">
                <p>&copy; ${new Date().getFullYear()} CATBACK. Todos os direitos reservados.</p>
            </div>
        </div>
    </body>
    </html>
  `;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (!RESEND_API_KEY) {
    return new Response(JSON.stringify({ error: 'RESEND_API_KEY not configured in Supabase Secrets.' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }

  if (!SENDER_EMAIL_ADDRESS) {
    return new Response(JSON.stringify({ error: 'SENDER_EMAIL_ADDRESS not configured in Supabase Secrets.' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }

  try {
    const { email, subject, bodyText, ctaLink, ctaText, logoUrl, businessName } = await req.json();

    if (!email || !subject || !bodyText || !ctaLink || !ctaText) {
      throw new Error("Dados de email incompletos.");
    }

    const htmlContent = generateEmailHtml(subject, bodyText, ctaLink, ctaText, logoUrl, businessName);
    
    const fullSender = `${SENDER_NAME} <${SENDER_EMAIL_ADDRESS}>`;

    const resendResponse = await fetch(RESEND_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: fullSender,
        to: email,
        subject: subject,
        html: htmlContent,
      }),
    });

    if (!resendResponse.ok) {
      const errorData = await resendResponse.json();
      console.error("Resend API Error:", errorData);
      throw new Error(`Falha ao enviar email via Resend: ${errorData.message || resendResponse.statusText}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error("Edge Function Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});