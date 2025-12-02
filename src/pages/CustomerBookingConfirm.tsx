import React, { useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, ArrowRight, AlertTriangle } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useCreateAppointment } from "@/hooks/use-appointments";
import { useServices, Service } from "@/hooks/use-services";
import { showSuccess, showError } from "@/utils/toast";
import { format, parseISO, setHours, setMinutes } from "date-fns";
import { pt } from "date-fns/locale";

const CustomerBookingConfirm: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, isLoading: isLoadingAuth } = useAuth();
  const createAppointment = useCreateAppointment();
  const { data: services, isLoading: isLoadingServices } = useServices();

  const serviceId = searchParams.get('serviceId');
  const dateString = searchParams.get('date');
  const timeString = searchParams.get('time');

  const selectedService = services?.find(s => s.id === serviceId);
  
  // Combine date and time into a single Date object
  const finalStartTime = useMemo(() => {
    if (dateString && timeString) {
        try {
            let date = parseISO(dateString);
            const [hours, minutes] = timeString.split(':').map(Number);
            date = setHours(date, hours);
            date = setMinutes(date, minutes);
            return date;
        } catch (e) {
            console.error("Invalid date/time format:", e);
            return null;
        }
    }
    return null;
  }, [dateString, timeString]);

  // 1. Handle Booking Confirmation
  useEffect(() => {
    if (user && !isLoadingAuth && selectedService && finalStartTime && !createAppointment.isPending) {
        const customerIdentifier = user.email || user.phone;
        
        if (!customerIdentifier) {
            showError("Não foi possível identificar o cliente.");
            return;
        }

        // Check if booking has already been attempted/succeeded
        if (createAppointment.isSuccess) return;

        createAppointment.mutate({
            service_id: selectedService.id,
            customer_identifier: customerIdentifier,
            start_time: finalStartTime.toISOString(),
            status: 'confirmed',
        }, {
            onSuccess: () => {
                showSuccess("Agendamento criado com sucesso!");
                // Clear search params after success to prevent re-running
                navigate('/customer-cards', { replace: true });
            },
            onError: (error) => {
                showError(`Falha ao agendar: ${error.message}`);
            }
        });
    }
  }, [user, isLoadingAuth, selectedService, finalStartTime, createAppointment, navigate]);

  if (isLoadingAuth || isLoadingServices || createAppointment.isPending) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
            <Loader2 className="h-8 w-8 animate-spin text-catback-purple mx-auto" />
            <p className="mt-2 text-gray-600 dark:text-gray-400">A confirmar agendamento...</p>
        </div>
    );
  }

  if (!user || !selectedService || !finalStartTime) {
    // If data is missing or user is not logged in (should be caught by ProtectedRoute, but safety check)
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
            <Card className="w-full max-w-md text-center shadow-xl">
                <CardHeader>
                    <AlertTriangle className="w-12 h-12 text-destructive mx-auto mb-4" />
                    <CardTitle className="text-2xl text-destructive">Erro de Agendamento</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600 dark:text-gray-400">
                        Detalhes do agendamento inválidos ou sessão expirada. Por favor, tente agendar novamente.
                    </p>
                    <Button onClick={() => navigate('/public-booking')} className="mt-6 w-full bg-catback-purple hover:bg-catback-dark-purple">
                        Voltar ao Agendamento
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
  }

  // This state should ideally not be reached if the useEffect runs correctly and redirects on success.
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center shadow-xl">
            <CardHeader>
                <CheckCircle className="w-16 h-16 text-catback-success-green mx-auto mb-4" />
                <CardTitle className="text-2xl text-gray-900 dark:text-white">Agendamento em Processo</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                    O seu agendamento para <strong>{selectedService.name}</strong> no dia <strong>{format(finalStartTime, "PPP", { locale: pt })}</strong> às <strong>{format(finalStartTime, "HH:mm")}</strong> está a ser finalizado.
                </p>
                <p className="mt-4 text-sm text-gray-500">Se não for redirecionado, clique abaixo:</p>
                <Button onClick={() => navigate('/customer-cards')} className="mt-2 w-full bg-catback-purple hover:bg-catback-dark-purple">
                    Ir para Minha Área
                </Button>
            </CardContent>
        </Card>
    </div>
  );
};

export default CustomerBookingConfirm;