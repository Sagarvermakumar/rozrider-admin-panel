'use client';

import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { SectionCards } from "@/components/section-cards"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RecentSales } from "../../components/recent-sales";

export default function Page() {
    // Dashboard stats endpoint is not available in the current API definition.
    // We can either fetch users and drivers separateley to calculate counts, or use placeholders.
    // For now, let's use placeholders until a dedicated stats endpoint is added.
    const stats = {
        revenue: 0,
        totalUsers: 0,
        totalDrivers: 0,
        totalRides: 0
    };

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <SectionCards stats={stats} />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <ChartAreaInteractive />
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Recent Sales</CardTitle>
                        <CardDescription>
                            You made 265 sales this month.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RecentSales />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
