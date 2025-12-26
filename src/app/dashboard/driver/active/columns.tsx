"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import Link from "next/link"

// Define Driver type based on the API response structure requested by user
export type Driver = {
    id: number
    name: string
    email: string
    phone: string
    emailother?: string | null
    phoneother?: string | null
    city?: string | null
    state?: string | null
    adres?: string | null
    pincode?: string | null
    gender?: string | null
    online: number
    kyc: number
    lastseen?: string | null
    vehicle_number?: string | null
    vehicle_name?: string | null
    vehicle_type?: string | null
    license_number?: string | null
    created_at: string
    updated_at: string
}

export const columns: ColumnDef<Driver>[] = [
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
        header: "City",
    },
    {
        id: "vehicle",
        header: "Vehicle",
        cell: ({ row }) => {
            const vehicleName = row.original.vehicle_name || "N/A"
            const vehicleNumber = row.original.vehicle_number || "N/A"
            return (
                <div className="flex flex-col">
                    <span className="font-medium">{vehicleName}</span>
                    <span className="text-xs text-muted-foreground">{vehicleNumber}</span>
                </div>
            )
        }
    },
    {
        accessorKey: "online",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
            const isOnline = row.original.online === 1
            return (
                <Badge variant={isOnline ? "default" : "secondary"}>
                    {isOnline ? "Online" : "Offline"}
                </Badge>
            )
        },
    },
    {
        accessorKey: "kyc",
        header: "KYC",
        cell: ({ row }) => {
            const isVerified = row.original.kyc === 1
            return (
                <Badge variant={isVerified ? "outline" : "destructive"} className={isVerified ? "text-green-600 border-green-600" : ""}>
                    {isVerified ? "Verified" : "Pending"}
                </Badge>
            )
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const driver = row.original

            return (
                <div className="flex justify-end p-2">
                    <Link href={`/dashboard/driver/active/${driver.id}`}>
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
