"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { payoutHistory } from "@/constants/earnings" // Need to export type if not available, inferring here
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header"

// Creating a local type/interface based on the data structure if strictly needed, or import from constants
type Payout = {
    id: string;
    driver: string;
    amount: number;
    date: string;
    status: string;
}

export const columns: ColumnDef<Payout>[] = [
    {
        accessorKey: "date",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Date" />
        ),
    },
    {
        accessorKey: "driver",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Driver" />
        ),
    },
    {
        accessorKey: "amount",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Amount" />
        ),
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"))
            return <span>${amount.toFixed(2)}</span>
        }
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
            const status = row.getValue("status") as string
            return (
                <Badge
                    variant={
                        status === "Paid"
                            ? "default"
                            : status === "Processing"
                                ? "secondary"
                                : "destructive"
                    }
                    className={status === "Paid" ? "bg-green-600 hover:bg-green-700" : ""}
                >
                    {status}
                </Badge>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
]
