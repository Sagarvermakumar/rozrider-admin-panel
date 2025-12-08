import { TrendingUp, TrendingDown } from "lucide-react"
import { Car, Users, CreditCard, Activity } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// ----------------------------
// EOZRIDER ADMIN ANALYTICS DATA
// ----------------------------
export const eozriderStats = [
  {
    id: 1,
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1% from last month",
    trendingUp: true,
    icon: CreditCard,
    footerTitle: "Revenue growth strong",
    footerDesc: "Payments processed across all cities",
  },
  {
    id: 2,
    title: "Active Drivers",
    value: "2,350",
    change: "+180.1% from last month",
    trendingUp: true,
    icon: Car,
    footerTitle: "Fleet expansion successful",
    footerDesc: "New drivers added & verified",
  },
  {
    id: 3,
    title: "Total Rides",
    value: "12,234",
    change: "+19% from last month",
    trendingUp: true,
    icon: Activity,
    footerTitle: "Ride volume increasing",
    footerDesc: "Peak hours show strong usage",
  },
  {
    id: 4,
    title: "Active Riders",
    value: "573",
    change: "+201 since last hour",
    trendingUp: true,
    icon: Users,
    footerTitle: "High user engagement",
    footerDesc: "New riders onboarding quickly",
  },
]

// ----------------------------
// MAIN COMPONENT
// ----------------------------
export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card 
      dark:*:data-[slot=card]:bg-card grid lg:grid-cols-2 sm:grid-cols-1  
      gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs 
      mt-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4"
    >

      {eozriderStats.map((item) => {
        const ArrowIcon = item.trendingUp ? TrendingUp : TrendingDown
        const StatIcon = item.icon

        return (
          <Card key={item.id} className="@container/card">
            <CardHeader>

              <div className="flex items-center justify-between">
                <CardDescription>{item.title}</CardDescription>
                <StatIcon className="w-5 h-5 text-primary" />
              </div>

              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {item.value}
              </CardTitle>

              <CardAction>
                <Badge variant="outline" className="flex items-center gap-1">
                  <ArrowIcon className="w-4 h-4" />
                  {item.change}
                </Badge>
              </CardAction>

            </CardHeader>

            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                {item.footerTitle}
                <ArrowIcon className="size-4" />
              </div>

              <div className="text-muted-foreground">
                {item.footerDesc}
              </div>
            </CardFooter>
          </Card>
        )
      })}

    </div>
  )
}
