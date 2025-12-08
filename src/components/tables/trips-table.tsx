import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { trips, Trip } from "@/constants/trips";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function TripsTable() {
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Driver</TableHead>
                        <TableHead>Rider</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Route</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {trips.map((trip) => (
                        <TableRow key={trip.id}>
                            <TableCell>{new Date(trip.date).toLocaleDateString()}</TableCell>
                            <TableCell>{trip.driverName}</TableCell>
                            <TableCell>{trip.riderName}</TableCell>
                            <TableCell>
                                <Badge
                                    variant={
                                        trip.status === "completed"
                                            ? "default"
                                            : trip.status === "ongoing"
                                                ? "secondary" // secondary for blue/ongoing
                                                : "destructive"
                                    }
                                    className={trip.status === "ongoing" ? "bg-blue-500 hover:bg-blue-600 text-white" : ""}
                                >
                                    {trip.status}
                                </Badge>
                            </TableCell>
                            <TableCell className="max-w-[200px] truncate text-xs text-muted-foreground">
                                {trip.pickup} → {trip.dropoff}
                            </TableCell>
                            <TableCell>${trip.amount.toFixed(2)}</TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                            <span className="sr-only">Open menu</span>
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuItem>View Details</DropdownMenuItem>
                                        <DropdownMenuItem>Invoice</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
