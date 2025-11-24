import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { message } = await req.json()
    if (!message) {
      throw new Error("A mensagem é obrigatória.")
    }

    // Create a Supabase client with the service role key to bypass RLS
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get the authenticated user's ID from the request headers
    const authHeader = req.headers.get('Authorization')!
    const jwt = authHeader.split('Bearer ')[1]
    const { data: { user } } = await supabaseAdmin.auth.getUser(jwt)
    if (!user) {
        throw new Error("Utilizador não autenticado.")
    }

    // Fetch all unique customer identifiers for the authenticated user
    const { data: customers, error: dbError } = await supabaseAdmin
      .from('customer_cards')
      .select('customer_identifier')
      .eq('owner_id', user.id)

    if (dbError) {
      throw dbError
    }

    // Get a unique list of identifiers
    const uniqueIdentifiers = [...new Set(customers.map(c => c.customer_identifier))]

    // --- Placeholder for actual sending logic ---
    // In a real app, you would loop through uniqueIdentifiers and send an SMS or email.
    // For now, we just log the action.
    console.log(`Broadcast message simulation for user ${user.id}:`);
    console.log(`Message: "${message}"`);
    console.log(`Would be sent to ${uniqueIdentifiers.length} unique customers:`);
    console.log(uniqueIdentifiers);
    // -------------------------------------------

    return new Response(
      JSON.stringify({ 
        message: `Mensagem enviada para a fila de processamento para ${uniqueIdentifiers.length} clientes.`,
        customers: uniqueIdentifiers 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})