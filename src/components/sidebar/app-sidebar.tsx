"use client"

import {
    ApertureIcon,
    Bell,
    Car,
    Caravan,
    CarTaxiFront,
    CreditCard,
    LayoutDashboard,
    Map,
    Users
} from "lucide-react"
import * as React from "react"

import { NavMain } from "@/components/sidebar/nav-main"
import { NavUser } from "@/components/sidebar/nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail
} from "@/components/ui/sidebar"

const data = {
    user: {
        name: "Admin",
        email: "admin@rozzrider.com",
        avatar: "/avatars/01.png",
    },
    navMain: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: LayoutDashboard,
            isActive: true,
        },
    ],
    navManagement: [
        {
            title: "Customers",
            url: "/dashboard/customers",
            icon: Users,

        },
        {
            title: "Active Riders",
            url: "/dashboard/driver/active",
            icon: Caravan,
        },
        {
            title: "Applied Riders",
            url: "/dashboard/driver/applied",
            icon: CarTaxiFront,
        }
    ],
    navOperations: [
        {
            title: "Earnings",
            url: "/dashboard/earnings",
            icon: CreditCard,
        },
        {
            title: "Trips",
            url: "/dashboard/trips",
            icon: Map,
        },

    ],
    navCommunications: [
        {
            title: "Notifications",
            url: "/dashboard/notifications",
            icon: Bell,
        }
    ],

}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="#">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <Car className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">RozRider</span>
                                    <span className="truncate text-xs">Admin Panel</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} label="Main" />
                <NavMain items={data.navManagement} label="Management" />
                <NavMain items={data.navOperations} label="Operations" />
                <NavMain items={data.navCommunications} label="Communications" />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
