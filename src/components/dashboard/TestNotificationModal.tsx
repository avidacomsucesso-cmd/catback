import React, { useState } from "react";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAppointments, Appointment } from "@/hooks/use-appointments";
import { useSendAppointmentNotification } from "@/hooks/use-notifications";
import { Loader2, Send, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { showError } from "@/utils/toast";

interface TestNotificationModalProps {
    onClose: () => void;
}

const TestNotificationModal: React.FC<TestNotificationModalProps> = ({ onClose }) => {
    const { data: appointments, isLoading: isLoadingAppointments } = useAppointments();
    const sendNotificationMutation = useSendAppointmentNotification();
    
    const [selectedAppointmentId, setSelectedAppointmentId] = useState<string | undefined>(undefined);
    const [notificationType, setNotificationType] = useState<'confirmation' | 'reminder'>('confirmation');

    const selectedAppointment = appointments?.find(a => a.id === selectedAppointmentId);
    const isSubmitting = sendNotificationMutation.isPending;

    const handleSendTest = () => {
        if (!selectedAppointment) {
            showError("Selecione um agendamento válido.");
            return;
        }

        sendNotificationMutation.mutate({
            appointment: selectedAppointment,
            type: notificationType,
        }, {
            onSuccess: () => {
                onClose();
            }
        });
    };

    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle className="text-catback-purple flex items-center">
                    <Send className="w-5 h-5 mr-2" /> Testar Notificação
                </DialogTitle>
            </DialogHeader>
            
            <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Atenção!</AlertTitle>
                <AlertDescription>
                    Isto enviará uma mensagem REAL de WhatsApp para o número de telefone associado ao cliente selecionado.
                </AlertDescription>
            </Alert>

            <div className="space-y-4">
                <div>
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Agendamento
                    </label>
                    <Select onValueChange={setSelectedAppointmentId} value={selectedAppointmentId}>
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder={isLoadingAppointments ? "A carregar agendamentos..." : "Selecione um agendamento"} />
                        </SelectTrigger>
                        <SelectContent>
                            {appointments?.map(app => (
                                <SelectItem key={app.id} value={app.id}>
                                    {app.customer_identifier} - {app.services.name} ({format(new Date(app.start_time), "d MMM HH:mm", { locale: pt })})
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Tipo de Mensagem
                    </label>
                    <Select onValueChange={(value: 'confirmation' | 'reminder') => setNotificationType(value)} value={notificationType}>
                        <SelectTrigger className="mt-1">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="confirmation">Confirmação (Imediata)</SelectItem>
                            <SelectItem value="reminder">Lembrete (24h antes)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Button 
                    onClick={handleSendTest}
                    disabled={isSubmitting || !selectedAppointmentId}
                    className="w-full bg-catback-energy-orange hover:bg-catback-energy-orange/90"
                >
                    {isSubmitting ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                        <Send className="h-4 w-4 mr-2" />
                    )}
                    Enviar Teste
                </Button>
            </div>
        </DialogContent>
    );
};

export default TestNotificationModal;