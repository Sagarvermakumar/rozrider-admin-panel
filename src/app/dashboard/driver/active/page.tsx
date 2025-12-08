import { Metadata } from "next";

import { columns } from "./columns";
import { activeDrivers } from "./data";
import { DataTable } from "@/components/ui/data-table/data-table";

export const metadata: Metadata = {
    title: "Active Drivers",
    description: "View and manage active drivers.",
};

export default async function ActiveDriversPage() {
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
                data={activeDrivers}
                columns={columns}
                searchKey="name"
            />
        </div>
    );
}
