'use client';

import { DataTable } from "@/components/ui/data-table/data-table";
import { columns } from "./columns";
import { useGetUsersQuery } from "@/redux/services/adminApi";
import { TableSkeleton } from "@/components/skeletons/table-skeleton";
import { Button } from "@/components/ui/button";
import { Plus, Send } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default function CustomersPage() {
    const { data, isLoading } = useGetUsersQuery(undefined);

    const users = Array.isArray(data) ? data : (data?.users || data?.data || []);

    if (isLoading) {
        return (
            <div className="flex-1 space-y-4 p-4 pt-6">
                {/* Header Skeleton */}
                <div className="flex items-center justify-between space-y-2 mb-6">
                    <div>
                        <div className="h-8 w-48 bg-muted animate-pulse rounded mb-2"></div>
                        <div className="h-4 w-64 bg-muted animate-pulse rounded"></div>
                    </div>
                </div>
                <div className="rounded-md border border-neutral-200 dark:border-neutral-800 bg-background/50 p-4">
                    <TableSkeleton columnCount={6} rowCount={10} />
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 space-y-6 p-4 pt-6">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h2 className="text-3xl font-bold tracking-tight bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        Customers
                    </h2>
                    <p className="text-muted-foreground text-sm">
                        Manage registered customers, view their details and track their activity.
                    </p>
                </div>


            </div>

            {/* Main Table Card */}
            <div className="rounded-xl border border-neutral-800 bg-black/40 backdrop-blur-sm shadow-sm overflow-hidden">
                <div className="p-3">
                    <DataTable columns={columns} data={users} searchKey="name" />
                </div>
            </div>
        </div>
    );
}
