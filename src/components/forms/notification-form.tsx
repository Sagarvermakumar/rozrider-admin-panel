import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export function NotificationForm() {
    return (
        <Card className="w-full max-w-lg">
            <CardHeader>
                <CardTitle>Send Notification</CardTitle>
                <CardDescription>
                    Send push notifications to Drivers or Riders.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="target">Target Audience</Label>
                    <Select>
                        <SelectTrigger id="target">
                            <SelectValue placeholder="Select audience" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                            <SelectItem value="drivers">All Drivers</SelectItem>
                            <SelectItem value="riders">All Riders</SelectItem>
                            <SelectItem value="both">Everyone</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" placeholder="Notification Title" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Type your message here." />
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full">Send Notification</Button>
            </CardFooter>
        </Card>
    );
}
