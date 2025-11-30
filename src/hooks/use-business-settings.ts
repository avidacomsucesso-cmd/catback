import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { showError, showSuccess } from "@/utils/toast";
import { useAuth } from "./use-auth";

export interface BusinessSettings {
  user_id: string;
  business_name: string;
  logo_url: string | null;
  created_at: string;
  updated_at: string;
}

// --- Fetching ---
const fetchBusinessSettings = async (userId: string): Promise<BusinessSettings | null> => {
  const { data, error } = await supabase
    .from('business_settings')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const useBusinessSettings = () => {
  const { user } = useAuth();
  const userId = user?.id;

  return useQuery<BusinessSettings | null, Error>({
    queryKey: ['businessSettings', userId],
    queryFn: () => fetchBusinessSettings(userId!),
    enabled: !!userId,
  });
};

// --- Upserting (Create or Update) ---
interface UpsertSettingsPayload {
  business_name: string;
  logo_url: string | null;
}

const upsertBusinessSettings = async (payload: UpsertSettingsPayload): Promise<BusinessSettings> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Usuário não autenticado.");

  const dataToUpsert = {
    user_id: user.id,
    business_name: payload.business_name,
    logo_url: payload.logo_url,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from('business_settings')
    // Use upsert since user_id is the primary key
    .upsert(dataToUpsert, { onConflict: 'user_id' })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data as BusinessSettings;
};

export const useUpsertBusinessSettings = () => {
  const queryClient = useQueryClient();
  return useMutation<BusinessSettings, Error, UpsertSettingsPayload>({
    mutationFn: upsertBusinessSettings,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['businessSettings', data.user_id] });
      showSuccess("Configurações do negócio salvas com sucesso!");
    },
    onError: (error) => {
      showError(`Erro ao salvar configurações: ${error.message}`);
    },
  });
};