import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { showError, showSuccess } from "@/utils/toast";
import { Service } from "./use-services"; // Assuming Service type is exported

export interface Appointment {
  id: string;
  user_id: string;
  service_id: string;
  customer_identifier: string;
  start_time: string;
  end_time: string;
  status: string;
  notes: string | null;
  created_at: string;
  services: Pick<Service, 'name' | 'duration_minutes' | 'price'>; // Joined data
}

// --- Fetching ---
const fetchAppointments = async (): Promise<Appointment[]> => {
  const { data, error } = await supabase
    .from('appointments')
    .select(`
      *,
      services (name, duration_minutes, price)
    `)
    .order('start_time', { ascending: true });

  if (error) throw new Error(error.message);
  return data as Appointment[];
};

export const useAppointments = () => {
  return useQuery<Appointment[], Error>({
    queryKey: ['appointments'],
    queryFn: fetchAppointments,
  });
};

// --- Creating ---
type CreateAppointmentPayload = Omit<Appointment, 'id' | 'user_id' | 'created_at' | 'end_time' | 'services'>;

const createAppointment = async (payload: CreateAppointmentPayload): Promise<Appointment> => {
    // Fetch service duration to calculate end_time
    const { data: service, error: serviceError } = await supabase
        .from('services')
        .select('duration_minutes')
        .eq('id', payload.service_id)
        .single();

    if (serviceError) throw new Error(`Could not fetch service details: ${serviceError.message}`);

    const startTime = new Date(payload.start_time);
    const endTime = new Date(startTime.getTime() + service.duration_minutes * 60000);

    const appointmentData = {
        ...payload,
        end_time: endTime.toISOString(),
    };

    const { data, error } = await supabase
        .from('appointments')
        .insert(appointmentData)
        .select()
        .single();

    if (error) throw new Error(error.message);
    return data as Appointment;
};

export const useCreateAppointment = () => {
  const queryClient = useQueryClient();
  return useMutation<Appointment, Error, CreateAppointmentPayload>({
    mutationFn: createAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      showSuccess("Agendamento criado com sucesso!");
    },
    onError: (error) => {
      showError(`Erro ao criar agendamento: ${error.message}`);
    },
  });
};

// --- Deleting ---
const deleteAppointment = async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('appointments')
      .delete()
      .eq('id', id);
  
    if (error) throw new Error(error.message);
};
  
export const useDeleteAppointment = () => {
    const queryClient = useQueryClient();
    return useMutation<void, Error, string>({
        mutationFn: deleteAppointment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['appointments'] });
            showSuccess("Agendamento removido.");
        },
        onError: (error) => {
            showError(`Erro ao remover agendamento: ${error.message}`);
        },
    });
};