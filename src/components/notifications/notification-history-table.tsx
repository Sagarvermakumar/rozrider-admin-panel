"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { notificationHistory } from "@/constants/notifications"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export function NotificationHistoryTable() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Notification History</CardTitle>
                <CardDescription>View all sent messages and their status.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User / Group</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Message</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {notificationHistory.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell className="font-medium">{item.user}</TableCell>
                                <TableCell>{item.type}</TableCell>
                                <TableCell className="max-w-[300px] truncate" title={item.message}>{item.message}</TableCell>
                                <TableCell>{item.date}</TableCell>
                                <TableCell>
                                    <Badge variant={item.status === "Sent" ? "default" : item.status === "Failed" ? "destructive" : "secondary"}>
                                        {item.status}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
