import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // This function simulates receiving a webhook from a GMB integration.
    // It expects a payload containing the user_id (owner of the business),
    // the review rating, and the customer identifier (e.g., email/phone).
    const { user_id, rating, customer_identifier } = await req.json();

    if (!user_id || !customer_identifier || rating === undefined) {
      throw new Error("Dados de avaliação incompletos.");
    }

    // 1. Initialize Supabase Admin Client
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // 2. Check if the review is 5 stars
    if (rating !== 5) {
      return new Response(
        JSON.stringify({ message: "Avaliação não é 5 estrelas. Nenhuma recompensa concedida." }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      );
    }

    // 3. Fetch GMB settings for the business owner
    const { data: gmbSettings, error: settingsError } = await supabaseAdmin
      .from('google_accounts')
      .select('loyalty_card_id_for_5_star_reviews')
      .eq('user_id', user_id)
      .maybeSingle();

    if (settingsError) throw settingsError;

    const loyaltyCardId = gmbSettings?.loyalty_card_id_for_5_star_reviews;

    if (!loyaltyCardId) {
      return new Response(
        JSON.stringify({ message: "Nenhum programa de fidelidade configurado para avaliações 5 estrelas." }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      );
    }

    // 4. Find or Create the Customer Card for the specific loyalty program
    const { data: customerCard, error: cardError } = await supabaseAdmin
      .from('customer_cards')
      .select('id, loyalty_cards(type)')
      .eq('owner_id', user_id)
      .eq('customer_identifier', customer_identifier)
      .eq('loyalty_card_id', loyaltyCardId)
      .eq('is_redeemed', false)
      .maybeSingle();

    if (cardError) throw cardError;

    if (!customerCard) {
        // If card doesn't exist, we create it first (assuming the customer is already registered)
        const { data: newCard, error: insertError } = await supabaseAdmin
            .from('customer_cards')
            .insert({ 
                loyalty_card_id: loyaltyCardId, 
                customer_identifier: customer_identifier, 
                owner_id: user_id 
            })
            .select('id, loyalty_cards(type)')
            .single();
        
        if (insertError) throw insertError;
        
        // Use the newly created card
        customerCard = newCard;
    }

    const cardId = customerCard.id;
    const cardType = customerCard.loyalty_cards.type;
    
    // Determine the progress change (1 point/stamp bonus)
    const progressChange = 1;
    const description = `Bónus por Avaliação 5 Estrelas (${cardType === 'stamps' ? 'Selo' : 'Ponto'})`;

    // 5. Update card progress using the stored procedure (requires service role key)
    const { error: updateError } = await supabaseAdmin.rpc('update_card_progress_and_log', {
      p_card_id: cardId,
      p_change_amount: progressChange,
      p_description: description,
    });

    if (updateError) {
      // Check if the error is due to a redeemed card (handled by the function)
      if (updateError.message.includes('This card has already been redeemed')) {
        return new Response(
            JSON.stringify({ message: "Cartão resgatado. Recompensa não aplicada." }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
        );
      }
      throw updateError;
    }

    return new Response(
      JSON.stringify({ success: true, message: `Recompensa de ${progressChange} ${cardType} concedida ao cliente ${customer_identifier}.` }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );

  } catch (error) {
    console.error("GMB Review Processing Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});