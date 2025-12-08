"use client"

import {
    SidebarGroup as SidebarGroupPrimitive,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
} from "@/components/ui/sidebar"
import { SidebarItem } from "./sidebar-item"
import type { LucideIcon } from "lucide-react"

export function SidebarGroup({
    label,
    items,
}: {
    label: string
    items: {
        title: string
        url: string
        icon?: LucideIcon
        isActive?: boolean
        items?: {
            title: string
            url: string
        }[]
    }[]
}) {
    return (
        <SidebarGroupPrimitive>
            <SidebarGroupLabel>{label}</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarItem key={item.title} item={item} />
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroupPrimitive>
    )
}
