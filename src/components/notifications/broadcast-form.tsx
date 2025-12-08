"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const formSchema = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
    message: z.string().min(10, {
        message: "Message must be at least 10 characters.",
    }),
    targetGroup: z.string().min(1, {
        message: "Please select a target group.",
    }),
})

export function BroadcastForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            message: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log("Broadcast Notification:", values)
        // Placeholder API Call
        // await fetch('/api/notifications/broadcast', { method: 'POST', body: JSON.stringify(values) })
        alert(`Broadcast Sent: ${JSON.stringify(values, null, 2)}`)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Broadcast Notification</CardTitle>
                <CardDescription>Send a message to a large group of users.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Notification Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., Weekend Bonanza!" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="targetGroup"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Target Group</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select audience" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="all_users">All Users</SelectItem>
                                            <SelectItem value="all_drivers">All Drivers</SelectItem>
                                            <SelectItem value="all_riders">All Riders</SelectItem>
                                            <SelectItem value="all_customers">All Customers</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Choose who will receive this notification.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Message</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Type your message here..."
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Send Broadcast</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
