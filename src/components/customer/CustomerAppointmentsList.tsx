import React from "react";
import { useCustomerAppointments } from "@/hooks/use-appointments";
import { useAuth } from "@/hooks/use-auth";
import { Loader2, Calendar, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const CustomerAppointmentsList: React.FC = () => {
  const { user } = useAuth();
  const identifier = user?.email || user?.phone || '';
  const { data: appointments, isLoading, error } = useCustomerAppointments(identifier);

  if (isLoading) {
    return (
      <div className="text-center p-10">
        <Loader2 className="h-8 w-8 animate-spin text-catback-purple mx-auto" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center p-10 text-red-500">Erro ao carregar agendamentos.</div>;
  }

  const upcomingAppointments = appointments?.filter(a => new Date(a.start_time) >= new Date()) || [];
  const pastAppointments = appointments?.filter(a => new Date(a.start_time) < new Date()) || [];

  return (
    <div className="space-y-8">
      {/* Upcoming Appointments */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Próximos Agendamentos</h3>
        {upcomingAppointments.length > 0 ? (
          <div className="space-y-4">
            {upcomingAppointments.map(app => (
              <Card key={app.id} className="shadow-sm">
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-catback-dark-purple dark:text-white">{app.services.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {format(new Date(app.start_time), "EEEE, d 'de' MMMM 'de' yyyy", { locale: pt })}
                    </p>
                  </div>
                  <Badge className="bg-catback-energy-orange hover:bg-catback-energy-orange/90">
                    <Clock className="w-3 h-3 mr-1.5" />
                    {format(new Date(app.start_time), "HH:mm")}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">Não tem agendamentos futuros.</p>
        )}
      </div>

      <Separator />

      {/* Past Appointments */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Histórico</h3>
        {pastAppointments.length > 0 ? (
          <div className="space-y-4">
            {pastAppointments.map(app => (
              <Card key={app.id} className="shadow-sm bg-gray-50 dark:bg-gray-800/50 opacity-80">
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-gray-700 dark:text-gray-300">{app.services.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {format(new Date(app.start_time), "d 'de' MMMM 'de' yyyy", { locale: pt })}
                    </p>
                  </div>
                  <Badge variant="outline">
                    {format(new Date(app.start_time), "HH:mm")}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">Ainda não tem histórico de agendamentos.</p>
        )}
      </div>
    </div>
  );
};

export default CustomerAppointmentsList;