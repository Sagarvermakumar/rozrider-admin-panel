"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { AutoNotificationRule, autoNotificationRules } from "@/constants/notifications"
import { useState } from "react"
import { Edit } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"


export function AutoRulesTable() {
    const [rules, setRules] = useState<AutoNotificationRule[]>(autoNotificationRules)

    const toggleRule = (id: string, currentStatus: boolean) => {
        setRules(rules.map(rule => rule.id === id ? { ...rule, isActive: !currentStatus } : rule))
        // Placeholder API Call: POST /api/notifications/auto-trigger { id, status: !currentStatus }
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex flex-col gap-1">
                    <CardTitle>Auto-Trigger Rules</CardTitle>
                    <CardDescription>Manage system-generated automated notifications.</CardDescription>
                </div>
                <Button size="sm">Add Rule</Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Event</TableHead>
                            <TableHead>Notification Message</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rules.map((rule) => (
                            <TableRow key={rule.id}>
                                <TableCell className="font-medium">{rule.event}</TableCell>
                                <TableCell>{rule.message}</TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            checked={rule.isActive}
                                            onCheckedChange={() => toggleRule(rule.id, rule.isActive)}
                                        />
                                        <span className="text-xs text-muted-foreground">{rule.isActive ? 'ON' : 'OFF'}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon">
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
