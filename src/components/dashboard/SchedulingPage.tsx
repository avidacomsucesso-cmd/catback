import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Loader2, Calendar, List, Trash } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useServices } from "@/hooks/use-services";
import { useAppointments, useDeleteAppointment } from "@/hooks/use-appointments";
import { ServicesDataTable } from "./ServicesDataTable";
import { columns as servicesColumns } from "./ServicesColumns";
import ServiceForm from "./ServiceForm";
import AppointmentForm from "./AppointmentForm";
import { format } from "date-fns";
import { pt } from "date-fns/locale";

const AppointmentsList: React.FC = () => {
    const { data: appointments, isLoading, error } = useAppointments();
    const deleteMutation = useDeleteAppointment();

    if (isLoading) {
        return <div className="text-center p-10"><Loader2 className="h-8 w-8 animate-spin text-catback-purple mx-auto" /></div>;
    }

    if (error) {
        return <div className="text-center p-10 text-red-500">Erro ao carregar agendamentos: {error.message}</div>;
    }

    const upcomingAppointments = appointments?.filter(a => new Date(a.start_time) >= new Date()) || [];

    return (
        <div className="space-y-4">
            {upcomingAppointments.length > 0 ? (
                upcomingAppointments.map(app => (
                    <Card key={app.id} className="shadow-sm">
                        <CardContent className="p-4 flex justify-between items-center">
                            <div>
                                <p className="font-bold text-lg text-catback-dark-purple dark:text-white">{app.services.name}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{app.customer_identifier}</p>
                                <p className="text-sm font-semibold text-catback-purple">
                                    {format(new Date(app.start_time), "PPP 'às' HH:mm", { locale: pt })}
                                </p>
                            </div>
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                className="text-red-500 hover:bg-red-500/10"
                                onClick={() => {
                                    if (window.confirm("Tem certeza que deseja cancelar este agendamento?")) {
                                        deleteMutation.mutate(app.id);
                                    }
                                }}
                            >
                                <Trash className="w-4 h-4" />
                            </Button>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <div className="text-center p-10 border-2 border-dashed rounded-lg">
                    <Calendar className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                    <p className="text-lg font-semibold">Nenhum agendamento futuro.</p>
                </div>
            )}
        </div>
    );
};

const SchedulingPage: React.FC = () => {
  const [isCreateServiceOpen, setIsCreateServiceOpen] = React.useState(false);
  const [isCreateAppointmentOpen, setIsCreateAppointmentOpen] = React.useState(false);
  const { data: services, isLoading: isLoadingServices, error: servicesError } = useServices();

  return (
    <Tabs defaultValue="calendar" className="space-y-4">
        <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Agendamento Online
            </h1>
            <TabsList>
                <TabsTrigger value="calendar"><Calendar className="w-4 h-4 mr-2" />Calendário</TabsTrigger>
                <TabsTrigger value="services"><List className="w-4 h-4 mr-2" />Serviços</TabsTrigger>
            </TabsList>
        </div>

        <TabsContent value="calendar" className="space-y-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Próximos Agendamentos</CardTitle>
                    <Dialog open={isCreateAppointmentOpen} onOpenChange={setIsCreateAppointmentOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-catback-purple hover:bg-catback-dark-purple">
                                <PlusCircle className="w-5 h-5 mr-2" />
                                Novo Agendamento
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Criar Novo Agendamento</DialogTitle>
                            </DialogHeader>
                            <AppointmentForm onFinished={() => setIsCreateAppointmentOpen(false)} />
                        </DialogContent>
                    </Dialog>
                </CardHeader>
                <CardContent>
                    <AppointmentsList />
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Meus Serviços</CardTitle>
                    <Dialog open={isCreateServiceOpen} onOpenChange={setIsCreateServiceOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline">
                                <PlusCircle className="w-5 h-5 mr-2" />
                                Adicionar Serviço
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Criar Novo Serviço</DialogTitle>
                            </DialogHeader>
                            <ServiceForm onFinished={() => setIsCreateServiceOpen(false)} />
                        </DialogContent>
                    </Dialog>
                </CardHeader>
                <CardContent>
                    {isLoadingServices ? (
                        <div className="text-center p-10"><Loader2 className="h-8 w-8 animate-spin text-catback-purple mx-auto" /></div>
                    ) : servicesError ? (
                        <div className="text-center p-10 text-red-500">Erro: {servicesError.message}</div>
                    ) : (
                        <ServicesDataTable columns={servicesColumns} data={services || []} />
                    )}
                </CardContent>
            </Card>
        </TabsContent>
    </Tabs>
  );
};

export default SchedulingPage;