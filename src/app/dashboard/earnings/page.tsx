import { Overview } from "@/components/dashboard/overview";
import { DataTable } from "@/components/ui/data-table/data-table";
import { columns } from "./columns";
import { payoutHistory, statsCards } from "@/constants/earnings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, CreditCard, Clock } from "lucide-react";

export default function EarningsPage() {
  return (
    <div className="w-full flex-1 space-y-6 px-3 pt-6"> 
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          Earnings & Payouts
        </h2>
      </div>

      {/* =================== TOP STATS CARDS =================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {statsCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Card
              key={index}
              className="w-full bg-gradient-to-b from-[#181818] to-[#0f0f0f] border-white/10"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>

              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                <p className="text-xs text-muted-foreground">{card.desc}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* =================== GRAPH + TABLE =================== */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 w-full">
        
        {/* Earnings Graph */}
        <Card className="col-span-4 border-white/10 w-full">
          <CardHeader>
            <CardTitle>Earnings Overview</CardTitle>
            <p className="text-sm text-muted-foreground">
              Total revenue trend for the last 3 months
            </p>
          </CardHeader>
          <CardContent>
            <Overview />
          </CardContent>
        </Card>

        {/* Payout History Table */}
        <Card className="col-span-3 border-white/10 w-full">
          <CardHeader>
            <CardTitle>Recent Payouts</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={columns}
              data={payoutHistory}
              searchKey="driver"
            />
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
