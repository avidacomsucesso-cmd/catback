import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { showError, showSuccess } from "@/utils/toast";
import { Appointment } from "./use-appointments";

interface SendNotificationPayload {
    appointment: Appointment;
    type: 'confirmation' | 'reminder';
}

const sendAppointmentNotification = async ({ appointment, type }: SendNotificationPayload): Promise<void> => {
    const payload = {
        customer_identifier: appointment.customer_identifier,
        start_time: appointment.start_time,
        service_name: appointment.services.name,
        type: type,
    };

    const { error } = await supabase.functions.invoke('send-appointment-notification', {
        body: payload,
    });

    if (error) {
        throw new Error(error.message);
    }
};

export const useSendAppointmentNotification = () => {
    const queryClient = useQueryClient();
    return useMutation<void, Error, SendNotificationPayload>({
        mutationFn: sendAppointmentNotification,
        onSuccess: (_, variables) => {
            showSuccess(`Lembrete de agendamento enviado para ${variables.appointment.customer_identifier}!`);
        },
        onError: (error) => {
            showError(`Erro ao enviar notificação: ${error.message}`);
        },
    });
};