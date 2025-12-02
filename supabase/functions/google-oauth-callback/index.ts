import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const GOOGLE_CLIENT_ID = Deno.env.get('GOOGLE_CLIENT_ID');
const GOOGLE_CLIENT_SECRET = Deno.env.get('GOOGLE_CLIENT_SECRET');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

// The redirect URI must match the one registered in Google Cloud Console
const REDIRECT_URI = `${SUPABASE_URL}/functions/v1/google-oauth-callback`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  // CRITICAL ERROR: Check for required environment variables
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
    return new Response('Server configuration error: Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET secrets.', { status: 500 });
  }
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return new Response('Server configuration error: Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY secrets.', { status: 500 });
  }

  try {
    const url = new URL(req.url);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state'); // Contains the user's JWT

    if (!code || !state) {
      return new Response('Missing code or state parameter.', { status: 400 });
    }

    // 1. Authenticate user using the JWT from the state parameter
    const supabaseAdmin = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(state);

    if (authError || !user) {
      console.error("Authentication failed:", authError?.message);
      return new Response('Authentication failed. Invalid state token.', { status: 401 });
    }

    // 2. Exchange authorization code for tokens
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code: code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code',
      }).toString(),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json();
      console.error("Token exchange failed:", errorData);
      throw new Error(`Failed to exchange code for tokens: ${errorData.error_description || errorData.error}`);
    }

    const tokens = await tokenResponse.json();
    const expiresAt = new Date(Date.now() + tokens.expires_in * 1000).toISOString();

    // 3. Get basic user info (optional, but useful for business name)
    const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
        headers: {
            'Authorization': `Bearer ${tokens.access_token}`,
        },
    });
    const userInfo = await userInfoResponse.json();
    const businessName = userInfo.name || 'Conta Google';

    // 4. Store tokens in the database (using upsert based on user_id)
    const { error: dbError } = await supabaseAdmin
      .from('google_accounts')
      .upsert({
        user_id: user.id,
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        expires_at: expiresAt,
        business_name: businessName,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id' });

    if (dbError) {
      console.error("Database upsert failed:", dbError);
      throw new Error('Failed to save tokens to database.');
    }

    // Redirect back to the dashboard settings page
    const successRedirect = `${url.origin}/dashboard/settings?gmb_status=success`;
    return Response.redirect(successRedirect, 303);

  } catch (error) {
    console.error("OAuth flow error:", error);
    const errorRedirect = `${url.origin}/dashboard/settings?gmb_status=error&message=${encodeURIComponent(error.message)}`;
    return Response.redirect(errorRedirect, 303);
  }
});