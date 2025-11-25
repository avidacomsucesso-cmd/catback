import React from "react";
import { useCustomerAppointments } from "@/hooks/use-appointments";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Calendar, Clock, CheckCircle, XCircle } from "lucide-react";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface CustomerAppointmentsHistoryProps {
  identifier: string;
}

const AppointmentRow: React.FC<{ appointment: any }> = ({ appointment }) => {
    const startTime = new Date(appointment.start_time);
    const isUpcoming = startTime >= new Date();
    
    const statusBadge = (status: string) => {
        switch (status) {
            case 'confirmed':
                return <Badge className="bg-catback-success-green hover:bg-catback-success-green/90">Confirmado</Badge>;
            case 'pending':
                return <Badge variant="secondary">Pendente</Badge>;
            case 'cancelled':
                return <Badge variant="destructive">Cancelado</Badge>;
            default:
                return <Badge variant="secondary">{status}</Badge>;
        }
    };

    return (
        <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-800">
            <div>
                <p className="font-medium text-gray-800 dark:text-gray-200">{appointment.services.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    {format(startTime, "d MMM yyyy, HH:mm", { locale: pt })}
                </p>
            </div>
            <div className="flex flex-col items-end space-y-1">
                {statusBadge(appointment.status)}
                {appointment.notes && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 italic truncate max-w-[100px]">
                        {appointment.notes}
                    </p>
                )}
            </div>
        </div>
    );
};

const CustomerAppointmentsHistory: React.FC<CustomerAppointmentsHistoryProps> = ({ identifier }) => {
  const { data: appointments, isLoading, error } = useCustomerAppointments(identifier);

  if (isLoading) {
    return (
      <Card className="shadow-lg h-full flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center text-xl text-catback-dark-purple">
            <Calendar className="w-5 h-5 mr-2" />
            Histórico de Agendamentos
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow flex justify-center items-center h-40">
          <Loader2 className="h-6 w-6 animate-spin text-catback-purple" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="shadow-lg h-full p-6">
        <p className="text-red-500">Erro ao carregar agendamentos.</p>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center text-xl text-catback-dark-purple">
          <Calendar className="w-5 h-5 mr-2" />
          Histórico de Agendamentos
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <ScrollArea className="flex-grow h-96 pr-4">
          {appointments && appointments.length > 0 ? (
            <div className="space-y-2">
              {appointments.map(app => <AppointmentRow key={app.id} appointment={app} />)}
            </div>
          ) : (
            <p className="text-center text-sm text-gray-500 pt-8">Nenhum agendamento encontrado para este cliente.</p>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default CustomerAppointmentsHistory;