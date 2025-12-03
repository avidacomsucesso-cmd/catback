import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { showError, showSuccess } from "@/utils/toast";

interface UploadPayload {
  file: File;
  bucket: string;
  path: string; // Full path including filename, e.g., 'logos/user_id/logo.png'
}

const uploadFile = async ({ file, bucket, path }: UploadPayload): Promise<string> => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: true, // Overwrite existing file if path is the same
    });

  if (error) {
    throw new Error(`Falha ao fazer upload: ${error.message}`);
  }

  // Get the public URL
  const { data: publicUrlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(path);

  if (!publicUrlData.publicUrl) {
    throw new Error("Falha ao obter URL pública após o upload.");
  }

  return publicUrlData.publicUrl;
};

export const useFileUpload = () => {
  return useMutation<string, Error, UploadPayload>({
    mutationFn: uploadFile,
    onError: (error) => {
      showError(error.message);
    },
  });
};