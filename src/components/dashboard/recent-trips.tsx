import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { trips } from "@/constants/trips";

export function RecentTrips() {
    // Show only first 5 trips
    const recentTrips = trips.slice(0, 5);

    return (
        <Card className="col-span-3">
            <CardHeader>
                <CardTitle>Recent Trips</CardTitle>
                <CardDescription>
                    You made {trips.length} trips this month.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                    {recentTrips.map((trip) => (
                        <div key={trip.id} className="flex items-center">
                            <Avatar className="h-9 w-9">
                                <AvatarImage src="/avatars/01.png" alt="Avatar" />
                                <AvatarFallback>{trip.riderName[0]}</AvatarFallback>
                            </Avatar>
                            <div className="ml-4 space-y-1">
                                <p className="text-sm font-medium leading-none">{trip.riderName}</p>
                                <p className="text-sm text-muted-foreground">
                                    {trip.pickup} → {trip.dropoff}
                                </p>
                            </div>
                            <div className="ml-auto font-medium">
                                {trip.status === "cancelled" ? (
                                    <span className="text-red-500">Cancelled</span>
                                ) : (
                                    `+$${trip.amount.toFixed(2)}`
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
