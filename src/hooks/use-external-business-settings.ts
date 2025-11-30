import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BusinessSettings } from "./use-business-settings"; // Reusing the interface

// --- Fetching External Settings ---
const fetchExternalBusinessSettings = async (userId: string): Promise<BusinessSettings | null> => {
  const { data, error } = await supabase
    .from('business_settings')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) {
    // We don't throw an error here, just return null if settings aren't found
    console.error("Failed to fetch external business settings:", error.message);
    return null;
  }
  return data;
};

export const useExternalBusinessSettings = (userId: string | undefined) => {
  return useQuery<BusinessSettings | null, Error>({
    queryKey: ['externalBusinessSettings', userId],
    queryFn: () => fetchExternalBusinessSettings(userId!),
    enabled: !!userId,
  });
};