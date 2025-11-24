import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { showError, showSuccess } from "@/utils/toast";

export interface Service {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  duration_minutes: number;
  price: number;
  is_active: boolean;
  created_at: string;
}

// --- Fetching ---
const fetchServices = async (): Promise<Service[]> => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data as Service[];
};

export const useServices = () => {
  return useQuery<Service[], Error>({
    queryKey: ['services'],
    queryFn: fetchServices,
  });
};

// --- Creating ---
type CreateServicePayload = Omit<Service, 'id' | 'user_id' | 'created_at'>;

const createService = async (serviceData: CreateServicePayload): Promise<Service> => {
  const { data, error } = await supabase
    .from('services')
    .insert(serviceData)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Service;
};

export const useCreateService = () => {
  const queryClient = useQueryClient();
  return useMutation<Service, Error, CreateServicePayload>({
    mutationFn: createService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      showSuccess("Serviço criado com sucesso!");
    },
    onError: (error) => {
      showError(`Erro ao criar serviço: ${error.message}`);
    },
  });
};

// --- Updating ---
type UpdateServicePayload = Partial<CreateServicePayload> & { id: string };

const updateService = async (serviceData: UpdateServicePayload): Promise<Service> => {
  const { id, ...updates } = serviceData;
  const { data, error } = await supabase
    .from('services')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Service;
};

export const useUpdateService = () => {
  const queryClient = useQueryClient();
  return useMutation<Service, Error, UpdateServicePayload>({
    mutationFn: updateService,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      showSuccess(`Serviço '${data.name}' atualizado.`);
    },
    onError: (error) => {
      showError(`Erro ao atualizar serviço: ${error.message}`);
    },
  });
};

// --- Deleting ---
const deleteService = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('services')
    .delete()
    .eq('id', id);

  if (error) throw new Error(error.message);
};

export const useDeleteService = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: deleteService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      showSuccess("Serviço removido.");
    },
    onError: (error) => {
      showError(`Erro ao remover serviço: ${error.message}`);
    },
  });
};