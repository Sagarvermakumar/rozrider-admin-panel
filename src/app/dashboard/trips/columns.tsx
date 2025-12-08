"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Trip } from "@/constants/trips"
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const columns: ColumnDef<Trip>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "date",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Date" />
        ),
        cell: ({ row }) => {
            return new Date(row.getValue("date")).toLocaleDateString()
        }
    },
    {
        accessorKey: "driverName",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Driver" />
        ),
    },
    {
        accessorKey: "riderName",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Rider" />
        ),
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
                        status === "completed"
                            ? "default"
                            : status === "ongoing"
                                ? "secondary" // secondary for blue/ongoing
                                : "destructive"
                    }
                    className={status === "ongoing" ? "bg-blue-500 hover:bg-blue-600 text-white" : ""}
                >
                    {status}
                </Badge>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        accessorKey: "pickup",
        header: "Pickup",
        cell: ({ row }) => <span className="truncate max-w-[200px] block" title={row.getValue("pickup")}>{row.getValue("pickup")}</span>
    },
    {
        accessorKey: "dropoff",
        header: "Dropoff",
        cell: ({ row }) => <span className="truncate max-w-[200px] block" title={row.getValue("dropoff")}>{row.getValue("dropoff")}</span>
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
        id: "actions",
        cell: ({ row }) => {
            // const trip = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Invoice</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
