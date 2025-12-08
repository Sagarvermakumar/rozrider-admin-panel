"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BroadcastForm } from "@/components/notifications/broadcast-form"
import { SingleUserForm } from "@/components/notifications/single-user-form"
import { AutoRulesTable } from "@/components/notifications/auto-rules-table"
import { NotificationHistoryTable } from "@/components/notifications/notification-history-table"

export default function NotificationsPage() {
    return (
        <div className="flex-1 space-y-4 p-1 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Notifications</h2>
            </div>
            <Tabs defaultValue="broadcast" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="broadcast">Broadcast</TabsTrigger>
                    <TabsTrigger value="single">Single User</TabsTrigger>
                    <TabsTrigger value="auto">Auto Rules</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>
                <TabsContent value="broadcast" className="space-y-4">
                    <BroadcastForm />
                </TabsContent>
                <TabsContent value="single" className="space-y-4">
                    <SingleUserForm />
                </TabsContent>
                <TabsContent value="auto" className="space-y-4">
                    <AutoRulesTable />
                </TabsContent>
                <TabsContent value="history" className="space-y-4">
                    <NotificationHistoryTable />
                </TabsContent>
            </Tabs>
        </div>
    )
}
