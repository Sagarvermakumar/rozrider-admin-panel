"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { appliedDrivers } from "../data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function DriverDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;
    const driver = appliedDrivers.find((d) => d.id === decodeURIComponent(id));

    const [isOpen, setIsOpen] = useState(false);
    const [rejectReason, setRejectReason] = useState("");
    const [loading, setLoading] = useState(false);

    if (!driver) {
        return <div>Driver not found</div>;
    }

    const handleApprove = () => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            alert("Driver Approved!");
            router.push("/dashboard/driver/applied");
        }, 1000);
    };

    const handleReject = () => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setIsOpen(false);
            alert(`Driver Rejected. Reason: ${rejectReason}`);
            router.push("/dashboard/driver/applied");
        }, 1000);
    };

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Driver Details</h2>
                <div className="flex items-center space-x-2">
                    <Button variant="outline" onClick={() => router.back()}>
                        Back
                    </Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Profile</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center space-y-4">
                        <Avatar className="h-32 w-32">
                            <AvatarImage src={driver.profile} alt={driver.name} />
                            <AvatarFallback>{driver.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="text-center">
                            <h3 className="text-xl font-bold">{driver.name}</h3>
                            <p className="text-sm text-muted-foreground">{driver.email}</p>
                        </div>
                        <div className="flex space-x-2">
                            <Badge variant="outline">{driver.vehicleType}</Badge>
                            <Badge variant="secondary">{driver.status}</Badge>
                        </div>
                        <div className="w-full space-y-2 pt-4">
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <span className="font-semibold">Phone:</span>
                                <span>{driver.phone}</span>
                                <span className="font-semibold">DOB:</span>
                                <span>{driver.dob}</span>
                                <span className="font-semibold">Experience:</span>
                                <span>{driver.experience}</span>
                                <span className="font-semibold">Applied:</span>
                                <span>{driver.appliedDate}</span>
                                <span className="font-semibold">Address:</span>
                                <span className="col-span-2">{driver.address}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="col-span-4 space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Vehicle Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label>Vehicle Model</Label>
                                    <Input value={driver.vehicleModel} readOnly />
                                </div>
                                <div>
                                    <Label>Vehicle Number</Label>
                                    <Input value={driver.vehicleNumber} readOnly />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Documents</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                <DocumentCard title="Aadhar Card" src={driver.aadhar} />
                                <DocumentCard title="PAN Card" src={driver.pan} />
                                <DocumentCard title="Driving License" src={driver.license} />
                                <DocumentCard title="Vehicle RC" src={driver.rc} />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end space-x-2">
                        <Dialog open={isOpen} onOpenChange={setIsOpen}>
                            <DialogTrigger asChild>
                                <Button variant="destructive">Reject</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Reject Application</DialogTitle>
                                    <DialogDescription>
                                        Please provide a reason for rejecting this application.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="reason">Reason</Label>
                                        <Textarea
                                            id="reason"
                                            placeholder="e.g. Invalid documents..."
                                            value={rejectReason}
                                            onChange={(e) => setRejectReason(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button variant="outline" onClick={() => setIsOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button variant="destructive" onClick={handleReject} disabled={loading}>
                                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        Confirm Reject
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        <Button onClick={handleApprove} disabled={loading} className="bg-green-600 hover:bg-green-700">
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Approve
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function DocumentCard({ title, src }: { title: string; src: string }) {
    return (
        <div className="space-y-2 border rounded-md p-2">
            <h4 className="font-semibold text-sm">{title}</h4>
            <div className="relative aspect-video w-full bg-muted rounded overflow-hidden">
                {/* Using a simple placeholder text since actual images might be missing */}
                {/* In real app, use Image component. For now generic or just the src */}
                <div className="flex items-center justify-center h-full text-muted-foreground text-xs">
                    <Image src={src} alt={title} fill className="object-cover" />
                </div>
            </div>
        </div>
    );
}
