import React, { useState, useMemo } from "react";
import { Calendar } from "@/components/ui/calendar";
import { useAppointments, useDeleteAppointment } from "@/hooks/use-appointments";
import { Loader2, Trash, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format, isSameDay } from "date-fns";
import { pt } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const AppointmentsCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const { data: appointments, isLoading, error } = useAppointments();
  const deleteMutation = useDeleteAppointment();

  const eventDays = useMemo(() => {
    return appointments?.map(a => new Date(a.start_time)) || [];
  }, [appointments]);

  const appointmentsForSelectedDay = useMemo(() => {
    if (!selectedDate || !appointments) return [];
    return appointments.filter(a => isSameDay(new Date(a.start_time), selectedDate));
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
                <div key={app.id} className="p-3 rounded-lg border bg-gray-50 dark:bg-gray-800">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-catback-dark-purple dark:text-white">{app.services.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{app.customer_identifier}</p>
                    </div>
                    <Badge variant="secondary">{format(new Date(app.start_time), "HH:mm")}</Badge>
                  </div>
                  <div className="flex justify-end mt-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:bg-red-500/10 h-8 w-8"
                      onClick={() => {
                        if (window.confirm("Tem certeza que deseja cancelar este agendamento?")) {
                          deleteMutation.mutate(app.id);
                        }
                      }}
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
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