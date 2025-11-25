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

// --- Fetching (for Lojista) ---
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

// --- Fetching (for Customer) ---
const fetchCustomerAppointments = async (identifier: string): Promise<Appointment[]> => {
    if (!identifier) return [];
    const { data, error } = await supabase
      .from('appointments')
      .select(`
        *,
        services (name, duration_minutes, price)
      `)
      .eq('customer_identifier', identifier)
      .order('start_time', { ascending: false });
  
    if (error) throw new Error(error.message);
    return data as Appointment[];
};
  
export const useCustomerAppointments = (identifier: string) => {
    return useQuery<Appointment[], Error>({
        queryKey: ['customerAppointments', identifier],
        queryFn: () => fetchCustomerAppointments(identifier),
        enabled: !!identifier,
    });
};

// --- Creating ---
type CreateAppointmentPayload = Omit<Appointment, 'id' | 'user_id' | 'created_at' | 'end_time' | 'services'>;

const calculateEndTime = async (serviceId: string, startTime: Date): Promise<string> => {
    const { data: service, error: serviceError } = await supabase
        .from('services')
        .select('duration_minutes')
        .eq('id', serviceId)
        .single();

    if (serviceError) throw new Error(`Could not fetch service details: ${serviceError.message}`);

    const endTime = new Date(startTime.getTime() + service.duration_minutes * 60000);
    return endTime.toISOString();
}

const createAppointment = async (payload: CreateAppointmentPayload): Promise<Appointment> => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        throw new Error("Utilizador não autenticado.");
    }

    const startTime = new Date(payload.start_time);
    const endTime = await calculateEndTime(payload.service_id, startTime);

    const appointmentData = {
        ...payload,
        user_id: user.id, // Add the user_id here
        end_time: endTime,
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
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      queryClient.invalidateQueries({ queryKey: ['customerAppointments', data.customer_identifier] });
      showSuccess("Agendamento criado com sucesso!");
    },
    onError: (error) => {
      showError(`Erro ao criar agendamento: ${error.message}`);
    },
  });
};

// --- Updating ---
type UpdateAppointmentPayload = Partial<CreateAppointmentPayload> & { id: string };

const updateAppointment = async (payload: UpdateAppointmentPayload): Promise<Appointment> => {
    const { id, service_id, start_time, ...updates } = payload;
    
    const updateData: any = { ...updates };

    // If service_id or start_time is updated, recalculate end_time
    if (service_id && start_time) {
        const startTime = new Date(start_time);
        updateData.end_time = await calculateEndTime(service_id, startTime);
        updateData.start_time = start_time;
        updateData.service_id = service_id;
    } else if (service_id) {
        // If only service_id changes, we need the current start_time
        const { data: currentApp, error: fetchError } = await supabase
            .from('appointments')
            .select('start_time')
            .eq('id', id)
            .single();
        
        if (fetchError) throw new Error(fetchError.message);
        
        const startTime = new Date(currentApp.start_time);
        updateData.end_time = await calculateEndTime(service_id, startTime);
        updateData.service_id = service_id;
    } else if (start_time) {
        // If only start_time changes, we need the current service_id
        const { data: currentApp, error: fetchError } = await supabase
            .from('appointments')
            .select('service_id')
            .eq('id', id)
            .single();
        
        if (fetchError) throw new Error(fetchError.message);

        const startTime = new Date(start_time);
        updateData.end_time = await calculateEndTime(currentApp.service_id, startTime);
        updateData.start_time = start_time;
    }

    const { data, error } = await supabase
        .from('appointments')
        .update(updateData)
        .eq('id', id)
        .select(`
            *,
            services (name, duration_minutes, price)
        `)
        .single();

    if (error) throw new Error(error.message);
    return data as Appointment;
};

export const useUpdateAppointment = () => {
    const queryClient = useQueryClient();
    return useMutation<Appointment, Error, UpdateAppointmentPayload>({
        mutationFn: updateAppointment,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['appointments'] });
            queryClient.invalidateQueries({ queryKey: ['customerAppointments', data.customer_identifier] });
            showSuccess("Agendamento atualizado com sucesso!");
        },
        onError: (error) => {
            showError(`Erro ao atualizar agendamento: ${error.message}`);
        },
    });
};

// --- Deleting (Lojista & Customer) ---
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
            queryClient.invalidateQueries({ queryKey: ['customerAppointments'] }); // Invalidate all customer appointments queries
            showSuccess("Agendamento removido.");
        },
        onError: (error) => {
            showError(`Erro ao remover agendamento: ${error.message}`);
        },
    });
};

// --- Customer Cancellation Hook ---
export const useCancelAppointment = (customerIdentifier: string) => {
    const queryClient = useQueryClient();
    return useMutation<void, Error, string>({
        mutationFn: deleteAppointment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customerAppointments', customerIdentifier] });
            queryClient.invalidateQueries({ queryKey: ['appointments'] });
            showSuccess("Agendamento cancelado com sucesso.");
        },
        onError: (error) => {
            showError(`Erro ao cancelar agendamento: ${error.message}`);
        },
    });
};