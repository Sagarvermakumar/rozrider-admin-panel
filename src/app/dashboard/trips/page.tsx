import { DataTable } from "@/components/ui/data-table/data-table";
import { columns } from "./columns";
import { trips } from "@/constants/trips";

export default function TripsPage() {
    return (
        <div className="flex-1 space-y-4 p-1 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Trips History</h2>
            </div>
            <DataTable columns={columns} data={trips} searchKey="driverName" />
        </div>
    );
}
