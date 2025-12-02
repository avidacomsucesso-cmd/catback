import React, { useState, useMemo } from "react";
import { Calendar } from "@/components/ui/calendar";
import { useAppointments, useDeleteAppointment, Appointment } from "@/hooks/use-appointments";
import { useSendAppointmentNotification } from "@/hooks/use-notifications"; // Import the new hook
import { Loader2, Trash, Clock, Pencil, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format, isSameDay } from "date-fns";
import { pt } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AppointmentForm from "./AppointmentForm";

// Helper component for displaying and managing a single appointment
const AppointmentItem: React.FC<{ appointment: Appointment }> = ({ appointment }) => {
    const deleteMutation = useDeleteAppointment();
    const sendNotificationMutation = useSendAppointmentNotification(); // Use the new hook
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const handleDelete = () => {
        if (window.confirm(`Tem certeza que deseja cancelar o agendamento para '${appointment.services.name}' de ${appointment.customer_identifier}?`)) {
            deleteMutation.mutate(appointment.id);
        }
    };
    
    const handleSendReminder = () => {
        sendNotificationMutation.mutate({
            appointment: appointment,
            type: 'reminder'
        });
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'confirmed':
                return <Badge className="bg-catback-success-green hover:bg-catback-success-green/90">Confirmado</Badge>;
            case 'pending':
                return <Badge variant="secondary">Pendente</Badge>;
            case 'cancelled':
                return <Badge variant="destructive">Cancelado</Badge>;
            case 'completed':
                return <Badge className="bg-catback-dark-purple hover:bg-catback-dark-purple/90">Concluído</Badge>;
            default:
                return <Badge variant="secondary">{status}</Badge>;
        }
    };

    const startTime = new Date(appointment.start_time);
    const formattedTime = isNaN(startTime.getTime()) ? 'N/A' : format(startTime, "HH:mm");

    return (
        <>
            <div className="p-3 rounded-lg border bg-gray-50 dark:bg-gray-800">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="font-semibold text-catback-dark-purple dark:text-white">{appointment.services.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{appointment.customer_identifier}</p>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                        {getStatusBadge(appointment.status)}
                        <Badge variant="secondary">{formattedTime}</Badge>
                    </div>
                </div>
                <div className="flex justify-end mt-2 space-x-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-catback-energy-orange hover:bg-catback-energy-orange/20 h-8 w-8"
                        onClick={handleSendReminder}
                        disabled={sendNotificationMutation.isPending}
                        title="Enviar Lembrete"
                    >
                        {sendNotificationMutation.isPending ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Bell className="w-4 h-4" />
                        )}
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-catback-purple hover:bg-catback-light-purple/20 h-8 w-8"
                        onClick={() => setIsEditDialogOpen(true)}
                        title="Editar Agendamento"
                    >
                        <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:bg-red-500/10 h-8 w-8"
                        onClick={handleDelete}
                        disabled={deleteMutation.isPending}
                        title="Cancelar Agendamento"
                    >
                        <Trash className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Editar Agendamento</DialogTitle>
                    </DialogHeader>
                    <AppointmentForm 
                        appointment={appointment} 
                        onFinished={() => setIsEditDialogOpen(false)} 
                    />
                </DialogContent>
            </Dialog>
        </>
    );
};


const AppointmentsCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const { data: appointments, isLoading, error } = useAppointments();

  const eventDays = useMemo(() => {
    return appointments
        ?.map(a => {
            const date = new Date(a.start_time);
            return isNaN(date.getTime()) ? null : date;
        })
        .filter((date): date is Date => date !== null) || [];
  }, [appointments]);

  const appointmentsForSelectedDay = useMemo(() => {
    if (!selectedDate || !appointments) return [];
    return appointments
        .filter(a => {
            const date = new Date(a.start_time);
            return !isNaN(date.getTime()) && isSameDay(date, selectedDate);
        })
        .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime());
  }, [selectedDate, appointments]);

  if (isLoading) {
    return <div className="text-center p-10"><Loader2 className="h-8 w-8 animate-spin text-catback-purple mx-auto" /></div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-500">Erro ao carregar agendamentos: {error.message}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <Card>
          <CardContent className="p-2">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="w-full"
              locale={pt}
              modifiers={{
                events: eventDays,
              }}
              modifiersStyles={{
                events: {
                  color: 'hsl(var(--primary-foreground))',
                  backgroundColor: 'hsl(var(--catback-purple))',
                },
              }}
            />
          </CardContent>
        </Card>
      </div>
      <div className="md:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>
              Agendamentos para {selectedDate ? format(selectedDate, "d 'de' MMMM", { locale: pt }) : "..."}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {appointmentsForSelectedDay.length > 0 ? (
              appointmentsForSelectedDay.map(app => (
                <AppointmentItem key={app.id} appointment={app} />
              ))
            ) : (
              <div className="text-center py-8">
                <Clock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Nenhum agendamento para este dia.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AppointmentsCalendar;