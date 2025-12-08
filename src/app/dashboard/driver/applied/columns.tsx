"use client";

import { ColumnDef } from "@tanstack/react-table";
import { AppliedDriver } from "./data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Eye } from "lucide-react";

export const columns: ColumnDef<AppliedDriver>[] = [
    {
        accessorKey: "name",
        header: "Driver Name",
    },
    {
        accessorKey: "vehicleType",
        header: "Vehicle Type",
        cell: ({ row }) => {
            return (
                <Badge variant="outline" className="capitalize">
                    {row.getValue("vehicleType")}
                </Badge>
            );
        },
    },
    {
        accessorKey: "appliedDate",
        header: "Applied Date",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string;
            return (
                <Badge
                    variant={status === "pending" ? "secondary" : "default"}
                    className="capitalize"
                >
                    {status}
                </Badge>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const driver = row.original;
            return (
                <Link href={`/dashboard/driver/applied/${driver.id}`}>
                    <Button variant="ghost" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                    </Button>
                </Link>
            );
        },
    },
];
