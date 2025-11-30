import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Link, useSearchParams } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { useGoogleAccount, useDeleteGoogleAccount } from "@/hooks/use-google-accounts";
import { Loader2, Link as LinkIcon, Trash, CheckCircle, AlertTriangle, MapPin } from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";
import { supabase } from "@/integrations/supabase/client";

const GmbSettings: React.FC = () => {
  const { user } = useAuth();
  const { data: account, isLoading: isLoadingAccount } = useGoogleAccount();
  const deleteMutation = useDeleteGoogleAccount();
  const [searchParams, setSearchParams] = useSearchParams();
  const gmbStatus = searchParams.get('gmb_status');
  const gmbMessage = searchParams.get('message');

  // Handle OAuth callback status messages
  useEffect(() => {
    if (gmbStatus === 'success') {
      showSuccess("Conexão com Google My Business estabelecida com sucesso!");
    } else if (gmbStatus === 'error' && gmbMessage) {
      showError(`Falha na conexão GMB: ${gmbMessage}`);
    }
    // Clean up URL parameters after showing toast
    if (gmbStatus) {
        setSearchParams({}, { replace: true });
    }
  }, [gmbStatus, gmbMessage, setSearchParams]);

  const handleConnect = async () => {
    if (!user) {
        showError("Usuário não autenticado.");
        return;
    }

    // 1. Get the user's JWT to pass as 'state' for authentication in the Edge Function
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !session) {
        showError("Falha ao obter sessão. Tente fazer login novamente.");
        return;
    }
    const jwt = session.access_token;

    // 2. Construct the Google OAuth URL
    const SUPABASE_URL = "https://xwwvhlwoxmbczqkcxqxg.supabase.co"; // Hardcoded Supabase URL
    const REDIRECT_URI = `${SUPABASE_URL}/functions/v1/google-oauth-callback`;
    
    // NOTE: GOOGLE_CLIENT_ID must be configured as a secret in Supabase Edge Functions
    const GOOGLE_CLIENT_ID = Deno.env.get('GOOGLE_CLIENT_ID'); 
    
    const scope = [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/business.manage', // Scope for GMB access
    ].join(' ');

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` + new URLSearchParams({
        client_id: GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID_HERE', // Placeholder if secret isn't available client-side
        redirect_uri: REDIRECT_URI,
        response_type: 'code',
        scope: scope,
        access_type: 'offline', // Request refresh token
        prompt: 'consent', // Ensure user is prompted for consent every time
        state: jwt, // Pass JWT for authentication in the callback function
    }).toString();

    // 3. Redirect user to Google
    window.location.href = authUrl;
  };

  if (isLoadingAccount) {
    return (
      <Card className="w-full max-w-lg">
        <CardContent className="p-6 flex justify-center items-center h-40">
          <Loader2 className="h-6 w-6 animate-spin text-catback-purple" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="text-2xl text-catback-dark-purple flex items-center">
            <MapPin className="w-6 h-6 mr-2" /> Google My Business
        </CardTitle>
        <CardDescription>
            Conecte sua conta Google para gerenciar avaliações e automatizar recompensas.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {account ? (
          <div className="space-y-4">
            <Alert className="border-catback-success-green text-catback-dark-purple">
              <CheckCircle className="h-4 w-4 text-catback-success-green" />
              <AlertTitle>Conectado!</AlertTitle>
              <AlertDescription>
                Conta conectada: <span className="font-semibold">{account.business_name}</span>.
                {account.location_resource_name && (
                    <span className="block text-sm mt-1">Localização: {account.location_resource_name}</span>
                )}
              </AlertDescription>
            </Alert>
            
            <Button 
                variant="destructive" 
                onClick={() => deleteMutation.mutate(account.id)}
                disabled={deleteMutation.isPending}
                className="w-full"
            >
                {deleteMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Trash className="h-4 w-4 mr-2" />}
                Desconectar Conta Google
            </Button>
            
            {/* Future: Location selection and Loyalty Card mapping */}
            <Alert variant="secondary">
                <AlertTriangle className="h-4 w-4 text-catback-energy-orange" />
                <AlertTitle>Próximos Passos</AlertTitle>
                <AlertDescription>
                    Selecione a localização do seu negócio e o programa de fidelidade para recompensar avaliações 5 estrelas.
                </AlertDescription>
            </Alert>
          </div>
        ) : (
          <div className="space-y-4">
            <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Atenção!</AlertTitle>
                <AlertDescription>
                    Certifique-se de que as variáveis de ambiente GOOGLE_CLIENT_ID e GOOGLE_CLIENT_SECRET estão configuradas no Supabase Edge Functions.
                </AlertDescription>
            </Alert>
            <Button 
                onClick={handleConnect} 
                className="w-full bg-catback-energy-orange hover:bg-catback-energy-orange/90"
            >
                <LinkIcon className="h-4 w-4 mr-2" /> Conectar Google My Business
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GmbSettings;