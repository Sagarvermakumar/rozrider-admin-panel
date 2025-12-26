'use client';

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetUserQuery, useUpdateUserStatusMutation, useDeleteUserMutation, useUpdateUserDetailsMutation } from "@/redux/services/adminApi";
import { toast } from "sonner";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function CustomerDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const { data: fetchedData, isLoading: isFetching, refetch } = useGetUserQuery(id);
    const customerData = fetchedData?.data;

    const [updateStatus, { isLoading: isUpdatingStatus }] = useUpdateUserStatusMutation();
    const [updateDetails, { isLoading: isUpdatingDetails }] = useUpdateUserDetailsMutation();
    const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        adres: "",
        city: "",
        phoneother: "",
        emailother: "",
        gender: ""
    });

    useEffect(() => {
        if (customerData) {
            setFormData({
                name: customerData.name || "",
                email: customerData.email || "",
                phone: customerData.phone || "",
                adres: customerData.adres || "",
                city: customerData.city || "",
                phoneother: customerData.phoneother || "",
                emailother: customerData.emailother || "",
                gender: customerData.gender || ""
            });
        }
    }, [customerData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdateDetails = async () => {
        try {
            await updateDetails({ id, data: formData }).unwrap();
            toast.success("User details updated successfully");
            refetch();
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to update details");
        }
    };

    const handleStatusChange = async (newStatus: string) => {
        try {
            await updateStatus({ id, status: newStatus }).unwrap();
            toast.success(`User status updated to ${newStatus}`);
            refetch();
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to update status");
        }
    };

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;
        try {
            await deleteUser(id).unwrap();
            toast.success("User deleted successfully");
            router.push('/dashboard/customers');
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to delete user");
        }
    };

    if (isFetching) {
        return (
            <div className="flex h-full items-center justify-center p-6">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (!customerData) {
        return <div className="p-6">User not found</div>;
    }

    const displayStatus = customerData.online === 1 ? 'Active' : 'Offline';
    const joinedDate = customerData.created_at ? new Date(customerData.created_at).toLocaleDateString() : 'N/A';
    const kycStatus = customerData.kyc ? 'Verified' : 'Pending';

    // Mock stats
    const totalTrips = (customerData as any).totalTrips || 0;
    const walletBalance = (customerData as any).walletBalance || 0;
    const recentTrips = (customerData as any).recentTrips || [];

    return (
        <div className="flex-1 space-y-6 p-4 pt-6 max-w-5xl mx-auto">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Customer Details</h2>
                    <p className="text-sm text-muted-foreground">View and edit information for {customerData.name}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Column: Personal Info Form */}
                <Card className="md:col-span-2 border-neutral-200 dark:border-neutral-800 bg-black/40 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" name="name" value={formData.name} onChange={handleInputChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" value={formData.email} onChange={handleInputChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="city">City</Label>
                                <Input id="city" name="city" value={formData.city} onChange={handleInputChange} />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="adres">Address</Label>
                                <Input id="adres" name="adres" value={formData.adres} onChange={handleInputChange} />
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button onClick={handleUpdateDetails} disabled={isUpdatingDetails}>
                                {isUpdatingDetails ? "Updating..." : "Update User Details"}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Right Column: Actions & Stats */}
                <div className="space-y-6">
                    <Card className="border-neutral-200 dark:border-neutral-800 bg-black/40 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle>Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                                <span className="text-muted-foreground">Status:</span>
                                <span className="font-medium capitalize">{displayStatus}</span>
                                <span className="text-muted-foreground">Joined:</span>
                                <span className="font-medium">{joinedDate}</span>
                                <span className="text-muted-foreground">KYC:</span>
                                <span className="font-medium">{kycStatus}</span>
                            </div>

                            <Separator className="my-2" />

                            {customerData.online === 1 ? (
                                <Button
                                    variant="destructive"
                                    className="w-full"
                                    onClick={() => handleStatusChange('blocked')}
                                    disabled={isUpdatingStatus}
                                >
                                    Block User
                                </Button>
                            ) : (
                                <Button
                                    variant="default"
                                    className="w-full"
                                    onClick={() => handleStatusChange('active')}
                                    disabled={isUpdatingStatus}
                                >
                                    Activate User
                                </Button>
                            )}

                            <Button
                                variant="outline"
                                className="w-full border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600"
                                onClick={handleDelete}
                                disabled={isDeleting}
                            >
                                Delete User
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="border-neutral-200 dark:border-neutral-800 bg-black/40 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle>Activity Stats</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-2 gap-4">
                            <div className="bg-muted/30 p-3 rounded-md text-center">
                                <div className="text-xs text-muted-foreground uppercase">Total Trips</div>
                                <div className="text-xl font-bold">{totalTrips}</div>
                            </div>
                            <div className="bg-muted/30 p-3 rounded-md text-center">
                                <div className="text-xs text-muted-foreground uppercase">Wallet</div>
                                <div className="text-xl font-bold">${Number(walletBalance).toFixed(2)}</div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Recent Trips Section (Full Width) */}
            <Card className="border-neutral-200 dark:border-neutral-800 bg-black/40 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Recent Trips</CardTitle>
                </CardHeader>
                <CardContent>
                    {recentTrips.length > 0 ? (
                        <div className="space-y-4">
                            {recentTrips.map((trip: any) => (
                                <div key={trip.id} className="flex justify-between items-center border-b pb-2 last:border-0 last:pb-0">
                                    <div>
                                        <p className="font-medium">{trip.destination}</p>
                                        <p className="text-sm text-muted-foreground">{trip.date}</p>
                                    </div>
                                    <span className="font-bold">${trip.amount.toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground">No recent trips found for this user.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
