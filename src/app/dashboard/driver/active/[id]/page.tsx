"use client";

import { useParams, useRouter } from "next/navigation";
import { activeDrivers } from "../data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Car, IndianRupee, MapPin, Star, TrendingUp } from "lucide-react";
import Image from "next/image";

export default function ActiveDriverDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;
    const driver = activeDrivers.find((d) => d.id === decodeURIComponent(id));

    if (!driver) {
        return <div>Driver not found</div>;
    }

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Active Driver Details</h2>
                <div className="flex items-center space-x-2">
                    <Button variant="outline" onClick={() => router.back()}>
                        Back
                    </Button>
                </div>
            </div>

            {/* STATS OVERVIEW */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Trips</CardTitle>
                        <Car className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{driver.totalTrips}</div>
                        <p className="text-xs text-muted-foreground">+20% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Current Rating</CardTitle>
                        <Star className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{driver.rating}</div>
                        <p className="text-xs text-muted-foreground">Top rated driver</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                        <IndianRupee className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{driver.earnings}</div>
                        <p className="text-xs text-muted-foreground">+12% from last month</p>
                    </CardContent>
                </Card>
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
                            <Badge variant="default">Active Driver</Badge>
                        </div>

                        <Separator />

                        <div className="w-full space-y-2 pt-2">
                            <div className="flex items-center text-sm text-muted-foreground">
                                <MapPin className="mr-2 h-4 w-4" />
                                {driver.address}
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-sm pt-2">
                                <span className="font-semibold">Phone:</span>
                                <span>{driver.phone}</span>
                                <span className="font-semibold">DOB:</span>
                                <span>{driver.dob}</span>
                                <span className="font-semibold">Experience:</span>
                                <span>{driver.experience}</span>
                                <span className="font-semibold">Joined:</span>
                                <span>{driver.joinDate}</span>
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
                <div className="flex items-center justify-center h-full text-muted-foreground text-xs">
                    <Image src={src} alt={title} fill className="object-cover" />
                </div>
            </div>
        </div>
    );
}
