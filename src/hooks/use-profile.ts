import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { showError, showSuccess } from "@/utils/toast";
import { useAuth } from "./use-auth";

export interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  updated_at: string | null;
}

// --- Fetching Profile ---
const fetchProfile = async (userId: string): Promise<Profile> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data as Profile;
};

export const useProfile = () => {
  const { user } = useAuth();
  const userId = user?.id;

  return useQuery<Profile, Error>({
    queryKey: ['profile', userId],
    queryFn: () => fetchProfile(userId!),
    enabled: !!userId,
  });
};

// --- Updating Profile ---
interface UpdateProfilePayload {
  first_name: string;
  last_name: string;
}

const updateProfile = async (payload: UpdateProfilePayload): Promise<Profile> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Usuário não autenticado.");

  const { data, error } = await supabase
    .from('profiles')
    .update({ 
        first_name: payload.first_name, 
        last_name: payload.last_name,
        updated_at: new Date().toISOString()
    })
    .eq('id', user.id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data as Profile;
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation<Profile, Error, UpdateProfilePayload>({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['profile', data.id] });
      showSuccess("Perfil atualizado com sucesso!");
    },
    onError: (error) => {
      showError(`Erro ao atualizar perfil: ${error.message}`);
    },
  });
};