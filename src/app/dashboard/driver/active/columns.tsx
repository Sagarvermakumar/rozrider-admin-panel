"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ActiveDriver } from "./data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Eye, Star } from "lucide-react";

export const columns: ColumnDef<ActiveDriver>[] = [
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
        accessorKey: "joinDate",
        header: "Join Date",
    },
    {
        accessorKey: "rating",
        header: "Rating",
        cell: ({ row }) => {
            const rating = parseFloat(row.getValue("rating"));
            return (
                <div className="flex items-center">
                    <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{rating}</span>
                </div>
            );
        },
    },
    {
        accessorKey: "totalTrips",
        header: "Total Trips",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const driver = row.original;
            return (
                <Link href={`/dashboard/driver/active/${driver.id}`}>
                    <Button variant="ghost" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                    </Button>
                </Link>
            );
        },
    },
];
