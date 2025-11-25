import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle, Calendar, CreditCard, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import AppointmentForm from "./AppointmentForm";
import CreateLoyaltyCardForm from "./CreateLoyaltyCardForm";

const QuickActions: React.FC = () => {
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [isLoyaltyModalOpen, setIsLoyaltyModalOpen] = useState(false);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Dialog open={isAppointmentModalOpen} onOpenChange={setIsAppointmentModalOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-1 shadow-sm hover:shadow-md transition-shadow">
            <PlusCircle className="w-6 h-6 text-catback-purple" />
            <span className="text-sm font-medium">Novo Agendamento</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar Novo Agendamento</DialogTitle>
          </DialogHeader>
          <AppointmentForm onFinished={() => setIsAppointmentModalOpen(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={isLoyaltyModalOpen} onOpenChange={setIsLoyaltyModalOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-1 shadow-sm hover:shadow-md transition-shadow">
            <CreditCard className="w-6 h-6 text-catback-energy-orange" />
            <span className="text-sm font-medium">Novo Programa</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar Novo Cartão de Fidelidade</DialogTitle>
          </DialogHeader>
          <CreateLoyaltyCardForm onCardCreated={() => setIsLoyaltyModalOpen(false)} />
        </DialogContent>
      </Dialog>

      <Link to="/dashboard/clients">
        <Button variant="outline" className="h-20 w-full flex flex-col items-center justify-center space-y-1 shadow-sm hover:shadow-md transition-shadow">
          <UserPlus className="w-6 h-6 text-catback-dark-purple" />
          <span className="text-sm font-medium">Adicionar Cliente</span>
        </Button>
      </Link>

      <Link to="/dashboard/scheduling">
        <Button variant="outline" className="h-20 w-full flex flex-col items-center justify-center space-y-1 shadow-sm hover:shadow-md transition-shadow">
          <Calendar className="w-6 h-6 text-catback-success-green" />
          <span className="text-sm font-medium">Ver Calendário</span>
        </Button>
      </Link>
    </div>
  );
};

export default QuickActions;