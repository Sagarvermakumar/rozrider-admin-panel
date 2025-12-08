import { DataTable } from "@/components/ui/data-table/data-table";
import { columns } from "./columns";
import { customers } from "@/constants/customers";

export default function CustomersPage() {
    return (
        <div className="flex-1 space-y-4 p-1 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
            </div>
            <DataTable columns={columns} data={customers} searchKey="name" />
        </div>
    );
}
