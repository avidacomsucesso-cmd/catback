import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Loader2, Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ServiceForm from "./ServiceForm";
import { useServices } from "@/hooks/use-services";
import { ServicesDataTable } from "./ServicesDataTable";
import { columns } from "./ServicesColumns";

const SchedulingPage: React.FC = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false);
  const { data: services, isLoading, error } = useServices();

  if (isLoading) {
    return <div className="text-center p-10"><Loader2 className="h-8 w-8 animate-spin text-catback-purple mx-auto" /></div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-500">Erro ao carregar serviços: {error.message}</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Agendamento Online
        </h1>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-catback-purple hover:bg-catback-dark-purple">
              <PlusCircle className="w-5 h-5 mr-2" />
              Adicionar Serviço
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar Novo Serviço</DialogTitle>
            </DialogHeader>
            <ServiceForm onFinished={() => setIsCreateDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-catback-purple mb-4">Meus Serviços</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Gerencie os serviços que os seus clientes podem agendar. O calendário de agendamentos será implementado a seguir.
        </p>
        <ServicesDataTable columns={columns} data={services || []} />
      </div>

      <div className="p-6 bg-gray-100 dark:bg-gray-800/50 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-catback-dark-purple mb-4">Próximos Passos</h2>
        <div className="flex items-center space-x-3">
            <Calendar className="w-6 h-6 text-catback-energy-orange" />
            <p className="text-gray-700 dark:text-gray-300">
                A seguir, vamos construir o calendário visual para que possa ver e gerir os agendamentos dos seus clientes.
            </p>
        </div>
      </div>
    </div>
  );
};

export default SchedulingPage;