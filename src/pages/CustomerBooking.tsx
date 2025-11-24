import React, { useState } from "react";
import Layout from "@/components/Layout";
import { useServices, Service } from "@/hooks/use-services";
import { useCreateAppointment } from "@/hooks/use-appointments";
import { useAuth } from "@/hooks/use-auth";
import { Loader2, Calendar as CalendarIcon, Clock, ArrowLeft, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import { showSuccess } from "@/utils/toast";

const timeSlots = Array.from({ length: 24 * 2 }, (_, i) => {
    const hours = Math.floor(i / 2);
    const minutes = (i % 2) * 30;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
});

const CustomerBooking: React.FC = () => {
  const { data: services, isLoading: isLoadingServices } = useServices();
  const createAppointment = useCreateAppointment();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | undefined>();

  const handleSelectService = (service: Service) => {
    setSelectedService(service);
    setStep(2);
  };

  const handleConfirmBooking = () => {
    if (!selectedService || !selectedDate || !selectedTime || !user) return;

    const customerIdentifier = user.email || user.phone;
    if (!customerIdentifier) return;

    const [hours, minutes] = selectedTime.split(':').map(Number);
    const finalStartTime = new Date(selectedDate);
    finalStartTime.setHours(hours, minutes, 0, 0);

    createAppointment.mutate({
      service_id: selectedService.id,
      customer_identifier: customerIdentifier,
      start_time: finalStartTime.toISOString(),
      status: 'confirmed',
    }, {
      onSuccess: () => {
        setStep(3); // Move to success step
      }
    });
  };

  if (isLoadingServices) {
    return <Layout><div className="container py-10 text-center"><Loader2 className="h-8 w-8 animate-spin mx-auto" /></div></Layout>;
  }

  if (step === 3) {
    return (
        <Layout>
            <div className="container py-16 flex justify-center">
                <Card className="w-full max-w-lg text-center shadow-xl">
                    <CardContent className="p-8">
                        <CheckCircle className="w-16 h-16 text-catback-success-green mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Agendamento Confirmado!</h2>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                            O seu agendamento para <strong>{selectedService?.name}</strong> no dia <strong>{selectedDate && format(selectedDate, "PPP", { locale: pt })}</strong> às <strong>{selectedTime}</strong> foi realizado com sucesso.
                        </p>
                        <Button onClick={() => navigate('/customer-cards')} className="mt-6 w-full bg-catback-purple hover:bg-catback-dark-purple">
                            Ver Meus Cartões e Agendamentos
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-10">
        {step === 2 && (
          <Button variant="ghost" onClick={() => setStep(1)} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" /> Voltar à Lista de Serviços
          </Button>
        )}

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl text-catback-dark-purple">
              {step === 1 ? "Escolha um Serviço" : `Agendar: ${selectedService?.name}`}
            </CardTitle>
            <CardDescription>
              {step === 1 ? "Selecione o serviço que deseja agendar." : "Escolha a data e a hora para o seu agendamento."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 1 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services?.filter(s => s.is_active).map(service => (
                  <Card key={service.id} className="p-4 flex justify-between items-center">
                    <div>
                      <p className="font-bold">{service.name}</p>
                      <p className="text-sm text-gray-500">{service.duration_minutes} min - {new Intl.NumberFormat("pt-PT", { style: "currency", currency: "EUR" }).format(service.price)}</p>
                    </div>
                    <Button onClick={() => handleSelectService(service)}>Agendar</Button>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col items-center">
                  <h3 className="font-semibold mb-2">1. Escolha o Dia</h3>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date()}
                    locale={pt}
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold">2. Escolha a Hora</h3>
                  <Select onValueChange={setSelectedTime} value={selectedTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um horário" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map(time => (
                        <SelectItem key={time} value={time}>{time}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button 
                    onClick={handleConfirmBooking} 
                    disabled={!selectedDate || !selectedTime || createAppointment.isPending}
                    className="w-full bg-catback-success-green hover:bg-catback-success-green/90"
                  >
                    {createAppointment.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <CheckCircle className="w-4 h-4 mr-2" />}
                    Confirmar Agendamento
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CustomerBooking;