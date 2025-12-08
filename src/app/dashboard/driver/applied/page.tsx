import { promises as fs } from "fs";
import path from "path";
import { Metadata } from "next";
import { z } from "zod";

import { columns } from "./columns";
import { appliedDrivers } from "./data";
import { DataTable } from "@/components/ui/data-table/data-table";

export const metadata: Metadata = {
    title: "Applied Drivers",
    description: "View and manage driver applications.",
};

export default async function AppliedDriversPage() {
    return (
        <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Applied Drivers</h2>
                    <p className="text-muted-foreground">
                        Manage new driver applications here.
                    </p>
                </div>
            </div>
            <DataTable
                data={appliedDrivers}
                columns={columns}
                searchKey="name"
            />
        </div>
    );
}
