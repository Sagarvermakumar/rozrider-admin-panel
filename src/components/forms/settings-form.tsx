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

export function SettingsForm() {
    return (
        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Pricing Settings</CardTitle>
                    <CardDescription>
                        Manage trip pricing and commission rates.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="base-fare">Base Fare ($)</Label>
                        <Input id="base-fare" type="number" defaultValue="5.00" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="price-km">Price per KM ($)</Label>
                        <Input id="price-km" type="number" defaultValue="1.50" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="cancel-fee">Cancellation Fee ($)</Label>
                        <Input id="cancel-fee" type="number" defaultValue="5.00" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="commission">Platform Commission (%)</Label>
                        <Input id="commission" type="number" defaultValue="20" />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button>Save Pricing</Button>
                </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Service Area</CardTitle>
                    <CardDescription>
                        Define the default service radius and location.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="city">City Center</Label>
                        <Input id="city" type="text" defaultValue="New York, NY" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="radius">Service Radius (KM)</Label>
                        <Input id="radius" type="number" defaultValue="50" />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button>Save Service Area</Button>
                </CardFooter>
            </Card>
        </div>
    );
}
