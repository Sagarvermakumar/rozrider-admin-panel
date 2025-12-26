"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    useGetDriverQuery,
    useUpdateDriverDetailsMutation,
    useDeleteDriverMutation,
    useUpdateDriverStatusMutation,
    useGetDriverDocumentsMutation,
    useUpdateDriverDocumentStatusMutation,
    useDeleteDriverDocumentsMutation,
    useUploadDriverDocumentMutation
} from "@/redux/services/adminApi";
import { toast } from "sonner";
import { ArrowLeft, Loader2, Trash2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { DocumentCard } from "@/components/driver/document-card";
import { UploadDocumentsDialog } from "@/components/driver/upload-documents-dialog";

// Fields mapping for display
const documentFields = [
    { key: 'aadhar_front', title: 'Aadhar Front' },
    { key: 'aadhar_back', title: 'Aadhar Back' },
    { key: 'rc_front', title: 'RC Front' },
    { key: 'rc_back', title: 'RC Back' },
    { key: 'license_front', title: 'License Front' },
    { key: 'license_back', title: 'License Back' },
    { key: 'pan_card', title: 'PAN Card' },
    { key: 'address_proof', title: 'Address Proof' },
    { key: 'selfie', title: 'Selfie' },
    { key: 'vehicle_photo', title: 'Vehicle Photo' },
    { key: 'fitness_certificate', title: 'Fitness Certificate' },
    { key: 'insurance', title: 'Insurance' },
    { key: 'puc', title: 'PUC' },
];

export default function DriverDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const { data: fetchedData, isLoading: isFetching, refetch } = useGetDriverQuery(id);
    const driverData = fetchedData?.data;

    const [updateStatus, { isLoading: isUpdatingStatus }] = useUpdateDriverStatusMutation();
    const [updateDetails, { isLoading: isUpdatingDetails }] = useUpdateDriverDetailsMutation();
    const [deleteDriver, { isLoading: isDeleting }] = useDeleteDriverMutation();

    // Document mutations
    const [getDocuments, { data: documentsData, isLoading: isLoadingDocs }] = useGetDriverDocumentsMutation();
    const [updateDocStatus, { isLoading: isUpdatingDocStatus }] = useUpdateDriverDocumentStatusMutation();
    const [deleteDocs, { isLoading: isDeletingDocs }] = useDeleteDriverDocumentsMutation();
    const [uploadDoc, { isLoading: isUploadingDoc }] = useUploadDriverDocumentMutation();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        adres: "",
        city: "",
        state: "",
        pincode: "",
        phoneother: "",
        emailother: "",
        gender: "",
        vehicle_name: "",
        vehicle_number: "",
        vehicle_type: "",
        license_number: ""
    });

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState("");

    // Fetch documents on load
    useEffect(() => {
        if (id) {
            getDocuments(id);
        }
    }, [id, getDocuments]);

    useEffect(() => {
        if (driverData) {
            setFormData({
                name: driverData.name || "",
                email: driverData.email || "",
                phone: driverData.phone || "",
                adres: driverData.adres || "",
                city: driverData.city || "",
                state: driverData.state || "",
                pincode: driverData.pincode || "",
                phoneother: driverData.phoneother || "",
                emailother: driverData.emailother || "",
                gender: driverData.gender || "",
                vehicle_name: driverData.vehicle_name || "",
                vehicle_number: driverData.vehicle_number || "",
                vehicle_type: driverData.vehicle_type || "",
                license_number: driverData.license_number || ""
            });
        }
    }, [driverData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdateDetails = async () => {
        try {
            await updateDetails({ id, data: formData }).unwrap();
            toast.success("Driver details updated successfully");
            refetch();
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to update details");
        }
    };

    const handleStatusChange = async (newStatus: string) => {
        try {
            await updateStatus({ id, action: newStatus }).unwrap();
            toast.success(`Driver status updated to ${newStatus}`);
            refetch();
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to update status");
        }
    };

    const handleDelete = async () => {
        if (deleteConfirmation !== driverData?.vehicle_number) {
            toast.error("Vehicle number does not match. Please try again.");
            return;
        }

        try {
            await deleteDriver(id).unwrap();
            toast.success("Driver deleted successfully");
            router.push('/dashboard/driver/active');
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to delete driver");
        }
    };

    // Document handlers
    const handleUpdateDocStatus = async (field: string, status: 'approved' | 'rejected') => {
        try {
            await updateDocStatus({ driver_id: id, [field]: status }).unwrap();
            toast.success(`Document status updated`);
            getDocuments(id); // Refresh documents
        } catch (error: any) {
            toast.error("Failed to update status");
        }
    };

    const handleDeleteAllDocs = async () => {
        if (!confirm("Are you sure you want to delete ALL documents for this driver? This action cannot be undone.")) return;
        try {
            await deleteDocs(id).unwrap();
            toast.success("All documents deleted");
            getDocuments(id);
        } catch (error: any) {
            toast.error("Failed to delete documents");
        }
    };

    const handleUploadDoc = async (field: string, file: File) => {
        const formData = new FormData();
        formData.append('driver_id', id);
        formData.append(field, file);

        // Since API requires ALL required files for the main 'store',
        // but user might want to update ONE.
        // The `store` API validates ALL required fields.
        // This is tricky. If we just want to update one, `store` might fail if others are missing.
        // Let's check the API again... `store` requires all.
        // `adminStore` also requires all.
        // If we want to update ONE, we might need to send existing ones? No, usually not possible with file input value.
        // Wait, if the user uploads ONE file, we can't easily re-submit others unless we have the file objects.

        // Strategy: Usually Update APIs allow partials, but this one has `required` rules.
        // However, `DriverDocument::firstOrNew` is used.
        // Maybe I should try just sending the one file and see if validator fails.
        // Yes, validator checks `required`. This means single file update via `store` is BLOCKED by backend validation logic unless all are sent.

        // FIXME: Backend limitation. I cannot update a SINGLE document if the backend requires ALL of them every time relative to request, not DB state.
        // Wait, `validation` is `required|file`.
        // If I can't send one, I can't implement "Update Single Doc".
        // I will implement it, but it will likely fail. I'll add a note or try to handle it.
        // Actually, for now, let's implement validation-aware upload? No, I can't.

        // Alternative: Maybe the backend allows partials if I don't use `store` but `update`? There is no update active doc endpoint, only status update.
        // Let's assume for now I will try to upload. If it fails, I'll notify user.

        try {
            // We need to bypass validation? No we can't.
            // Let's sending dummys for others? No.
            // I will just try sending it. Maybe validation rules are context aware? No.

            // To make "Upload Single" work, the backend MUST be changed to `nullable` or `sometimes`.
            // User asked to implement based on backend.

            // If I use `store`, I must send all.
            // I will implement uploading ALL at once? No, UI is per card.
            // I will disable "Upload" button for individual cards for now to avoid confusion, 
            // OR I will implement a global "Upload Documents" dialog.

            // Let's go with Global Upload Dialog later if needed. For now I will comment out the upload handler usage in render, 
            // or better, I will implement it but warn user.

            await uploadDoc(formData).unwrap();
            toast.success("Document uploaded");
            getDocuments(id);
        } catch (error: any) {
            toast.error(error?.data?.message || "Upload failed (Backend requires all files?)");
        }
    };

    if (isFetching) {
        return (
            <div className="flex h-full items-center justify-center p-6">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (!driverData) {
        return <div className="p-6">Driver not found</div>;
    }

    const displayStatus = driverData.online === 1 ? 'Online' : 'Offline';
    const joinedDate = driverData.created_at ? new Date(driverData.created_at).toLocaleDateString() : 'N/A';
    const kycStatus = driverData.kyc === 1 ? 'Verified' : 'Pending';

    // Parse documents
    const documents = documentsData?.data || {};

    return (
        <div className="flex-1 space-y-6 p-4 pt-6 max-w-7xl mx-auto">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Driver Details</h2>
                    <p className="text-sm text-muted-foreground">View and edit information for {driverData.name}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Personal Info Form */}
                <Card className="lg:col-span-2 border-neutral-200 dark:border-neutral-800 bg-black/40 backdrop-blur-sm h-fit">
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
                                <Label htmlFor="gender">Gender</Label>
                                <Input id="gender" name="gender" value={formData.gender} onChange={handleInputChange} />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="adres">Address</Label>
                                <Input id="adres" name="adres" value={formData.adres} onChange={handleInputChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="city">City</Label>
                                <Input id="city" name="city" value={formData.city} onChange={handleInputChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="state">State</Label>
                                <Input id="state" name="state" value={formData.state} onChange={handleInputChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="pincode">Pincode</Label>
                                <Input id="pincode" name="pincode" value={formData.pincode} onChange={handleInputChange} />
                            </div>
                        </div>

                        <Separator className="my-4" />
                        <h3 className="text-lg font-medium mb-4">Vehicle Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="vehicle_name">Vehicle Name</Label>
                                <Input id="vehicle_name" name="vehicle_name" value={formData.vehicle_name} onChange={handleInputChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="vehicle_number">Vehicle Number</Label>
                                <Input id="vehicle_number" name="vehicle_number" value={formData.vehicle_number} onChange={handleInputChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="vehicle_type">Vehicle Type</Label>
                                <Input id="vehicle_type" name="vehicle_type" value={formData.vehicle_type} onChange={handleInputChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="license_number">License Number</Label>
                                <Input id="license_number" name="license_number" value={formData.license_number} onChange={handleInputChange} />
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button onClick={handleUpdateDetails} disabled={isUpdatingDetails}>
                                {isUpdatingDetails ? "Updating..." : "Update Details"}
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
                                <span className="text-muted-foreground">Last Seen:</span>
                                <span className="font-medium">{driverData.lastseen || 'N/A'}</span>
                            </div>

                            <Separator className="my-2" />

                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => handleStatusChange('approve')} // Logic placeholder
                                    disabled={isUpdatingStatus}
                                >
                                    Activate
                                </Button>
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => handleStatusChange('reject')} // Logic placeholder
                                    disabled={isUpdatingStatus}
                                >
                                    Block
                                </Button>
                            </div>

                            <Separator className="my-2" />

                            <Button
                                variant="destructive"
                                className="w-full gap-2"
                                onClick={handleDeleteAllDocs}
                                disabled={isDeletingDocs}
                            >
                                <Trash2 className="h-4 w-4" />
                                Delete All Documents
                            </Button>

                            <Button
                                variant="destructive"
                                className="w-full mt-2"
                                onClick={() => setIsDeleteDialogOpen(true)}
                                disabled={isDeleting}
                            >
                                Delete Driver Account
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Full Width: Documents Section */}
                <div className="lg:col-span-3">
                    <div className="flex items-center justify-between mb-4 mt-2">
                        <h3 className="text-xl font-bold tracking-tight">Driver Documents</h3>
                        <UploadDocumentsDialog driverId={id} onSuccess={() => getDocuments(id)} />
                    </div>

                    {isLoadingDocs ? (
                        <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {documentFields.map((field) => (
                                <DocumentCard
                                    key={field.key}
                                    title={field.title}
                                    fieldKey={field.key}
                                    imageUrl={documents[field.key]}
                                    status={documents[field.key + '_status']}
                                    onUpdateStatus={handleUpdateDocStatus}
                                    // onUpload={(file) => handleUploadDoc(field.key, file)} // Disabled due to backend limitation
                                    isLoading={isUpdatingDocStatus}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Driver Deletion</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. To confirm, please enter the driver's vehicle number: <span className="font-bold">{driverData.vehicle_number}</span>
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <Input
                            value={deleteConfirmation}
                            onChange={(e) => setDeleteConfirmation(e.target.value)}
                            placeholder="Enter vehicle number"
                        />
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={handleDelete} disabled={isDeleting || deleteConfirmation !== driverData.vehicle_number}>
                            {isDeleting ? "Deleting..." : "Delete Driver"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
