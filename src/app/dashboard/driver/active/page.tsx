'use client';

import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table/data-table";
import { useGetDriversQuery } from "@/redux/services/adminApi";

export default function ActiveDriversPage() {
    const { data, isLoading } = useGetDriversQuery(undefined);

    if (isLoading) {
        return <div className="p-8">Loading drivers...</div>;
    }

    // Determine data structure
    const allDrivers = Array.isArray(data) ? data : (data?.drivers || data?.data || []);

    return (
        <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Active Drivers</h2>
                    <p className="text-muted-foreground">
                        Monitor active driver partners and their performance.
                    </p>
                </div>
            </div>
            <DataTable
                data={allDrivers}
                columns={columns}
                searchKey="name"
            />
        </div>
    );
}
