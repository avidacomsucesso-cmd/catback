import React, { useState, useMemo } from "react";
import { useServices, Service } from "@/hooks/use-services";
import { useOccupiedSlots } from "@/hooks/use-occupied-slots";
import { Loader2, Calendar as CalendarIcon, Clock, ArrowLeft, CheckCircle, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format, addMinutes, setHours, startOfDay } from "date-fns";
import { pt } from "date-fns/locale";
import { useNavigate, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { showSuccess, showError } from "@/utils/toast";
import { useAuth } from "@/hooks/use-auth";

// Horários de abertura/fecho (Exemplo: 9:00 às 18:00)
const OPEN_HOUR = 9;
const CLOSE_HOUR = 18;
const SLOT_INTERVAL_MINUTES = 30;

const generateTimeSlots = () => {
    const slots: string[] = [];
    const start = setHours(startOfDay(new Date()), OPEN_HOUR);
    const end = setHours(startOfDay(new Date()), CLOSE_HOUR);
    let current = start;

    while (current < end) {
        slots.push(format(current, 'HH:mm'));
        current = addMinutes(current, SLOT_INTERVAL_MINUTES);
    }
    return slots;
};

const allTimeSlots = generateTimeSlots();

const PublicBooking: React.FC = () => {
  const { data: services, isLoading: isLoadingServices } = useServices();
  const { user, isLoading: isLoadingAuth } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | undefined>();

  // Fetch occupied slots for the selected date
  const { data: occupiedSlots, isLoading: isLoadingSlots } = useOccupiedSlots(selectedDate);

  const serviceDuration = selectedService?.duration_minutes || 0;

  const availableTimeSlots = useMemo(() => {
    if (!selectedDate || !occupiedSlots || serviceDuration === 0) return [];

    return allTimeSlots.filter(timeSlot => {
        const [hours, minutes] = timeSlot.split(':').map(Number);
        
        // 1. Calculate proposed appointment interval
        const proposedStart = new Date(selectedDate);
        proposedStart.setHours(hours, minutes, 0, 0);
        
        const proposedEnd = addMinutes(proposedStart, serviceDuration);

        // 2. Check if the proposed slot is outside business hours
        const businessEnd = setHours(startOfDay(selectedDate), CLOSE_HOUR);
        if (proposedEnd > businessEnd) {
            return false;
        }

        // 3. Check for overlap with occupied slots
        const isOverlapping = occupiedSlots.some(slot => {
            const occupiedStart = new Date(slot.start_time);
            const occupiedEnd = new Date(slot.end_time);

            // Check if proposed interval overlaps with occupied interval
            // (Start A < End B) AND (End A > Start B)
            return (proposedStart < occupiedEnd) && (proposedEnd > occupiedStart);
        });

        // 4. Check if the slot is in the past (only for today)
        if (isSameDay(selectedDate, new Date())) {
            if (proposedStart < new Date()) {
                return false;
            }
        }

        return !isOverlapping;
    });
  }, [selectedDate, occupiedSlots, serviceDuration]);


  const handleSelectService = (service: Service) => {
    setSelectedService(service);
    setSelectedTime(undefined); // Reset time selection when service changes
    setStep(2);
  };

  const handleProceedToAuth = () => {
    if (!selectedService || !selectedDate || !selectedTime) {
        showError("Por favor, selecione o serviço, data e hora.");
        return;
    }

    // Store selection in session storage or state management if needed, 
    // but for simplicity, we'll rely on the redirect URL to signal the intent.
    
    // Construct the redirect URL to pass the booking details
    const bookingDetails = new URLSearchParams({
        serviceId: selectedService.id,
        date: format(selectedDate, 'yyyy-MM-dd'),
        time: selectedTime,
    }).toString();

    const redirectPath = `/customer-auth?redirect=/customer-booking-confirm?${bookingDetails}`;
    navigate(redirectPath);
  };

  if (isLoadingServices) {
    return <Layout><div className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-catback-purple mx-auto" /></div></Layout>;
  }

  return (
    <Layout>
        <div className="container py-16 flex justify-center">
            <Card className="w-full max-w-2xl shadow-lg">
                <CardHeader>
                    <CardTitle className="text-3xl text-catback-dark-purple">
                        {step === 1 ? "Agendamento Público" : `Agendar: ${selectedService?.name}`}
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
                                    <Button onClick={() => handleSelectService(service)} className="bg-catback-energy-orange hover:bg-catback-energy-orange/90">Selecionar</Button>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="flex flex-col items-center">
                                <h3 className="font-semibold mb-2">1. Escolha o Dia</h3>
                                <Calendar
                                    mode="single"
                                    selected={selectedDate}
                                    onSelect={(date) => {
                                        setSelectedDate(date);
                                        setSelectedTime(undefined);
                                    }}
                                    disabled={(date) => date < startOfDay(new Date())}
                                    locale={pt}
                                />
                            </div>
                            <div className="space-y-4">
                                <h3 className="font-semibold">2. Escolha a Hora ({serviceDuration} min)</h3>
                                {isLoadingSlots ? (
                                    <div className="text-center py-10"><Loader2 className="h-6 w-6 animate-spin mx-auto" /></div>
                                ) : availableTimeSlots.length > 0 ? (
                                    <div className="grid grid-cols-3 gap-2 max-h-80 overflow-y-auto p-2 border rounded-md">
                                        {availableTimeSlots.map(time => (
                                            <Button 
                                                key={time} 
                                                variant={selectedTime === time ? "default" : "outline"}
                                                onClick={() => setSelectedTime(time)}
                                                className={selectedTime === time ? "bg-catback-energy-orange hover:bg-catback-energy-orange/90" : "border-gray-300"}
                                            >
                                                {time}
                                            </Button>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-10 text-gray-500">
                                        Nenhum horário disponível para este dia.
                                    </div>
                                )}
                                
                                <Button 
                                    onClick={handleProceedToAuth} 
                                    disabled={!selectedDate || !selectedTime}
                                    className="w-full bg-catback-purple hover:bg-catback-dark-purple"
                                >
                                    <User className="w-4 h-4 mr-2" /> Continuar e Entrar
                                </Button>
                                <Button 
                                    variant="ghost" 
                                    onClick={() => setStep(1)} 
                                    className="w-full text-catback-dark-purple hover:bg-gray-100"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
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

export default PublicBooking;