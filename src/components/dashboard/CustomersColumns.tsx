"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CustomerSummary } from "@/hooks/use-customers"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, Eye } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { pt } from "date-fns/locale"

export const createCustomerColumns = (onViewDetails: (identifier: string) => void): ColumnDef<CustomerSummary>[] => [
  {
    accessorKey: "customer_identifier",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cliente
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="font-medium">{row.getValue("customer_identifier")}</div>,
  },
  {
    accessorKey: "active_cards",
    header: "Cartões Ativos",
    cell: ({ row }) => <div className="text-center">{row.getValue("active_cards")}</div>,
  },
  {
    accessorKey: "last_activity_at",
    header: "Última Atividade",
    cell: ({ row }) => {
      const date = row.getValue("last_activity_at")
      if (!date) return "N/A"
      return formatDistanceToNow(new Date(date as string), {
        addSuffix: true,
        locale: pt,
      })
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const customer = row.original
      return (
        <Button variant="ghost" size="sm" onClick={() => onViewDetails(customer.customer_identifier)}>
            <Eye className="mr-2 h-4 w-4" />
            Ver Detalhes
        </Button>
      )
    },
  },
]