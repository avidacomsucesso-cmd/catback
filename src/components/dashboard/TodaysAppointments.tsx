import React from "react";
import { useTodaysAppointments } from "@/hooks/use-dashboard-widgets";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Calendar, Clock } from "lucide-react";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";

const TodaysAppointments: React.FC = () => {
  const { data: appointments, isLoading, error } = useTodaysAppointments();

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center text-lg font-semibold text-gray-800 dark:text-gray-200">
          <Calendar className="w-5 h-5 mr-3 text-catback-purple" />
          Agendamentos de Hoje
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-24">
            <Loader2 className="h-6 w-6 animate-spin text-catback-purple" />
          </div>
        ) : error ? (
          <p className="text-red-500 text-sm">Erro ao carregar agendamentos.</p>
        ) : appointments && appointments.length > 0 ? (
          <div className="space-y-4">
            {appointments.map((app) => (
              <div key={app.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{app.service_name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{app.customer_identifier}</p>
                </div>
                <Badge className="bg-catback-energy-orange hover:bg-catback-energy-orange/90">
                  <Clock className="w-3 h-3 mr-1.5" />
                  {format(new Date(app.start_time), "HH:mm")}
                </Badge>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-sm text-gray-500">Nenhum agendamento para hoje.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TodaysAppointments;