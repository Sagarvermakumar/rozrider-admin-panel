"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import Link from "next/link"

export type Customer = {
    id: number
    name: string
    email: string
    emailother?: string | null
    phone: string | null
    city: string | null
    online: number
    kyc: number
    created_at: string
    adres?: string | null
    phoneother?: string | null
    gender?: string | null
    // Add optional fields that might be used in the Sheet but not yet in API
    totalTrips?: number
    walletBalance?: number
    recentTrips?: any[]
}

export const columns: ColumnDef<Customer>[] = [
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
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" />
        ),
    },
    {
        accessorKey: "email",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Email" />
        ),
    },
    {
        accessorKey: "phone",
        header: "Phone",
    },
    {
        accessorKey: "city",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="City" />
        ),
    },
    {
        accessorKey: "online",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
            const isOnline = row.getValue("online") as number
            return (
                <Badge
                    variant={isOnline === 1 ? "default" : "secondary"}
                >
                    {isOnline === 1 ? "Online" : "Offline"}
                </Badge>
            )
        },
    },
    {
        accessorKey: "created_at",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Joined" />
        ),
        cell: ({ row }) => {
            const date = new Date(row.getValue("created_at"))
            return <div>{date.toLocaleDateString()}</div>
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const customer = row.original

            return (
                <div className="flex justify-end p-2">
                    <Link href={`/dashboard/customers/${customer.id}`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted">
                            <Eye className="h-4 w-4 text-muted-foreground" />
                            <span className="sr-only">View Details</span>
                        </Button>
                    </Link>
                </div>
            )
        },
    },
]
