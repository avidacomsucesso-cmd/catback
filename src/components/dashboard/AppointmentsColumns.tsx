"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Appointment, useDeleteAppointment } from "@/hooks/use-appointments"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, MoreHorizontal, Pencil, Trash, Bell } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import AppointmentForm from "./AppointmentForm"
import React from "react"
import { format } from "date-fns"
import { pt } from "date-fns/locale"
import { useSendAppointmentNotification } from "@/hooks/use-notifications" // Import the new hook

const getStatusBadge = (status: string) => {
    switch (status) {
        case 'confirmed':
            return <Badge className="bg-catback-success-green hover:bg-catback-success-green/90">Confirmado</Badge>;
        case 'pending':
            return <Badge variant="secondary">Pendente</Badge>;
        case 'cancelled':
            return <Badge variant="destructive">Cancelado</Badge>;
        case 'completed':
            return <Badge className="bg-catback-dark-purple hover:bg-catback-dark-purple/90">Concluído</Badge>;
        default:
            return <Badge variant="secondary">{status}</Badge>;
    }
};

export const columns: ColumnDef<Appointment>[] = [
  {
    accessorKey: "start_time",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
        const startTime = new Date(row.getValue("start_time"))
        return (
            <div className="font-medium">
                {format(startTime, "d MMM yyyy", { locale: pt })}
                <span className="block text-xs text-gray-500">{format(startTime, "HH:mm")}</span>
            </div>
        )
    },
  },
  {
    accessorKey: "customer_identifier",
    header: "Cliente",
  },
  {
    accessorKey: "services.name",
    header: "Serviço",
    cell: ({ row }) => {
        return row.original.services.name
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return getStatusBadge(status)
    },
  },
  {
    accessorKey: "notes",
    header: "Notas",
    cell: ({ row }) => {
        const notes = row.getValue("notes") as string | null
        return <span className="text-sm text-gray-500 truncate max-w-[150px] block">{notes || '-'}</span>
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const appointment = row.original
      const deleteMutation = useDeleteAppointment()
      const sendNotificationMutation = useSendAppointmentNotification() // Use the new hook
      const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false)

      const handleDelete = () => {
        if (window.confirm(`Tem certeza que deseja cancelar o agendamento para '${appointment.services.name}'?`)) {
          deleteMutation.mutate(appointment.id)
        }
      }
      
      const handleSendReminder = () => {
        sendNotificationMutation.mutate({
            appointment: appointment,
            type: 'reminder'
        });
      }

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
                <Pencil className="mr-2 h-4 w-4" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={handleSendReminder}
                disabled={sendNotificationMutation.isPending}
              >
                {sendNotificationMutation.isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Bell className="mr-2 h-4 w-4" />
                )}
                Enviar Lembrete
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleDelete} className="text-red-500">
                <Trash className="mr-2 h-4 w-4" />
                Cancelar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Editar Agendamento</DialogTitle>
              </DialogHeader>
              <AppointmentForm appointment={appointment} onFinished={() => setIsEditDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </>
      )
    },
  },
]