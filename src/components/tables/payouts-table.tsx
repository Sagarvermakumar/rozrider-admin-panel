import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { payoutHistory } from "@/constants/earnings";

export function PayoutsTable() {
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Driver</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {payoutHistory.map((payout) => (
                        <TableRow key={payout.id}>
                            <TableCell>{payout.date}</TableCell>
                            <TableCell>{payout.driver}</TableCell>
                            <TableCell>${payout.amount.toFixed(2)}</TableCell>
                            <TableCell>
                                <Badge
                                    variant={
                                        payout.status === "Paid"
                                            ? "default"
                                            : payout.status === "Processing"
                                                ? "secondary"
                                                : "destructive"
                                    }
                                    className={payout.status === "Paid" ? "bg-green-600 hover:bg-green-700" : ""}
                                >
                                    {payout.status}
                                </Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
