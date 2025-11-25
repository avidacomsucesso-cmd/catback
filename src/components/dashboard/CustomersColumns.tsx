"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CustomerSummary } from "@/hooks/use-customers"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, Eye } from "lucide-react"
import { format } from "date-fns"
import { pt } from "date-fns/locale"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Extend the interface to include tags
interface CustomerSummaryWithTags extends CustomerSummary {
    tags: { name: string; color: string }[];
}

export const createCustomerColumns = (onViewDetails: (identifier: string) => void): ColumnDef<CustomerSummaryWithTags>[] => [
  {
    accessorKey: "customer_identifier",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Cliente <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="font-medium">{row.getValue("customer_identifier")}</div>,
  },
  {
    accessorKey: "tags",
    header: "Tags",
    cell: ({ row }) => {
        const tags = row.getValue("tags") as { name: string; color: string }[];
        return (
            <div className="flex flex-wrap gap-1">
                {tags.map(tag => (
                    <Badge key={tag.name} className={cn("text-white", tag.color)}>{tag.name}</Badge>
                ))}
            </div>
        )
    }
  },
  {
    accessorKey: "total_spent",
    header: "Total Gasto",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("total_spent"))
      const formatted = new Intl.NumberFormat("pt-PT", { style: "currency", currency: "EUR" }).format(amount)
      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "first_seen_at",
    header: "Cliente Desde",
    cell: ({ row }) => {
      const date = row.getValue("first_seen_at")
      if (!date) return "N/A"
      return format(new Date(date as string), "d MMM yyyy", { locale: pt })
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