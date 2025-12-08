"use client"

import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Customer } from "@/constants/customers"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface CustomersSheetProps {
    children: React.ReactNode
    customer: Customer
}

export function CustomersSheet({ children, customer }: CustomersSheetProps) {
    return (
        <Sheet  >
            <SheetTrigger asChild>
                {children}
            </SheetTrigger>
            <SheetContent className="overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>Customer Details</SheetTitle>
                    <SheetDescription>
                        View detailed information about {customer.name}.
                    </SheetDescription>
                </SheetHeader>
                <div className="space-y-6 py-6 p-4">
                    <div className="flex flex-col space-y-2">
                        <h3 className="text-lg font-medium">Personal Information</h3>
                        <div className="grid grid-cols-3 gap-2 text-sm">
                            <span className="font-semibold">Name:</span>
                            <span className="col-span-2">{customer.name}</span>
                            <span className="font-semibold">Email:</span>
                            <span className="col-span-2">{customer.email}</span>
                            <span className="font-semibold">Phone:</span>
                            <span className="col-span-2">{customer.phone}</span>
                            <span className="font-semibold">Address:</span>
                            <span className="col-span-2">{customer.address}</span>
                            <span className="font-semibold">Joined:</span>
                            <span className="col-span-2">{customer.joinedDate}</span>
                        </div>
                    </div>

                    <Separator />

                    <div className="flex flex-col space-y-4">
                        <h3 className="text-lg font-medium">Activity Stats</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <Card>
                                <CardHeader className="p-4">
                                    <CardTitle className="text-sm">Total Trips</CardTitle>
                                </CardHeader>
                                <CardContent className="px-4 pb-4">
                                    <div className="text-2xl font-bold">{customer.totalTrips}</div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="p-4">
                                    <CardTitle className="text-sm">Wallet Balance</CardTitle>
                                </CardHeader>
                                <CardContent className="px-4 pb-4">
                                    <div className="text-2xl font-bold">${customer.walletBalance.toFixed(2)}</div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <Separator />

                    <div className="flex flex-col space-y-2">
                        <h3 className="text-lg font-medium">Recent Trips</h3>
                        {customer.recentTrips.length > 0 ? (
                            <div className="space-y-4">
                                {customer.recentTrips.map((trip) => (
                                    <div key={trip.id} className="flex justify-between items-center bg-muted/50 p-3 rounded-md">
                                        <div>
                                            <p className="text-sm font-medium">{trip.destination}</p>
                                            <p className="text-xs text-muted-foreground">{trip.date}</p>
                                        </div>
                                        <span className="font-bold text-sm">${trip.amount.toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground">No recent trips found.</p>
                        )}
                    </div>

                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button type="submit">Close</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
