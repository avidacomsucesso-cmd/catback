import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Calendar, List, Clock, Send } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useServices } from "@/hooks/use-services";
import { useAppointments } from "@/hooks/use-appointments"; // Import useAppointments
import { Loader2 } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { columns as servicesColumns } from "./ServicesColumns";
import { columns as appointmentsColumns } from "./AppointmentsColumns"; // Import appointments columns
import ServiceForm from "./ServiceForm";
import AppointmentForm from "./AppointmentForm";
import AppointmentsCalendar from "./AppointmentsCalendar";
import TestNotificationModal from "./TestNotificationModal"; // Import the new modal

const AppointmentsListTab: React.FC = () => {
    const { data: appointments, isLoading, error } = useAppointments();

    if (isLoading) {
        return <div className="text-center p-10"><Loader2 className="h-8 w-8 animate-spin text-catback-purple mx-auto" /></div>;
    }

    if (error) {
        return <div className="text-center p-10 text-red-500">Erro ao carregar agendamentos: {error.message}</div>;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Todos os Agendamentos</CardTitle>
            </CardHeader>
            <CardContent>
                <DataTable 
                    columns={appointmentsColumns} 
                    data={appointments || []} 
                    filterColumnId="customer_identifier"
                    filterPlaceholder="Filtrar por cliente..."
                />
            </CardContent>
        </Card>
    );
};

const SchedulingPage: React.FC = () => {
  const [isCreateServiceOpen, setIsCreateServiceOpen] = React.useState(false);
  const [isCreateAppointmentOpen, setIsCreateAppointmentOpen] = React.useState(false);
  const [isTestNotificationOpen, setIsTestNotificationOpen] = React.useState(false); // New state
  const { data: services, isLoading: isLoadingServices, error: servicesError } = useServices();

  return (
    <Tabs defaultValue="calendar" className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Agendamento Online
            </h1>
            <div className="flex w-full sm:w-auto space-x-2">
                <TabsList className="grid grid-cols-3 w-full sm:w-auto">
                    <TabsTrigger value="calendar"><Calendar className="w-4 h-4 mr-2" />Calendário</TabsTrigger>
                    <TabsTrigger value="list"><List className="w-4 h-4 mr-2" />Lista</TabsTrigger>
                    <TabsTrigger value="services"><List className="w-4 h-4 mr-2" />Serviços</TabsTrigger>
                </TabsList>
                
                <Dialog open={isCreateAppointmentOpen} onOpenChange={setIsCreateAppointmentOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-catback-purple hover:bg-catback-dark-purple flex-shrink-0">
                            <PlusCircle className="w-5 h-5" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Criar Novo Agendamento</DialogTitle>
                        </DialogHeader>
                        <AppointmentForm onFinished={() => setIsCreateAppointmentOpen(false)} />
                    </DialogContent>
                </Dialog>
                
                {/* New Test Notification Button */}
                <Dialog open={isTestNotificationOpen} onOpenChange={setIsTestNotificationOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="flex-shrink-0 hidden sm:flex">
                            <Send className="w-4 h-4" />
                        </Button>
                    </DialogTrigger>
                    <TestNotificationModal onClose={() => setIsTestNotificationOpen(false)} />
                </Dialog>
            </div>
        </div>

        <TabsContent value="calendar" className="space-y-6">
            <AppointmentsCalendar />
        </TabsContent>
        
        <TabsContent value="list" className="space-y-6">
            <AppointmentsListTab />
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
                        <DataTable 
                            columns={servicesColumns} 
                            data={services || []} 
                            filterColumnId="name"
                            filterPlaceholder="Filtrar por nome..."
                        />
                    )}
                </CardContent>
            </Card>
        </TabsContent>
    </Tabs>
  );
};

export default SchedulingPage;