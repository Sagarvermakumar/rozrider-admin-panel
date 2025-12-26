import { Button } from "@/components/ui/button";
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
import { Label } from "@/components/ui/label";
import { useUploadDriverDocumentMutation } from "@/redux/services/adminApi";
import { Loader2, Upload, Pencil } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ImageEditorDialog } from "./image-editor-dialog";

interface UploadDocumentsDialogProps {
    driverId: string;
    onSuccess: () => void;
}

export function UploadDocumentsDialog({ driverId, onSuccess }: UploadDocumentsDialogProps) {
    const [open, setOpen] = useState(false);
    const [uploadDoc, { isLoading }] = useUploadDriverDocumentMutation();
    const [files, setFiles] = useState<Record<string, File | null>>({});

    // Editor state
    const [editorOpen, setEditorOpen] = useState(false);
    const [currentFile, setCurrentFile] = useState<File | null>(null);
    const [currentKey, setCurrentKey] = useState<string | null>(null);

    const requiredFields = [
        { key: "aadhar_front", label: "Aadhar Front" },
        { key: "aadhar_back", label: "Aadhar Back" },
        { key: "rc_front", label: "RC Front" },
        { key: "rc_back", label: "RC Back" },
        { key: "license_front", label: "License Front" },
        { key: "license_back", label: "License Back" },
        { key: "address_proof", label: "Address Proof" },
        { key: "pan_card", label: "PAN Card" },
        { key: "selfie", label: "Selfie" },
        { key: "vehicle_photo", label: "Vehicle Photo" },
    ];

    const optionalFields = [
        { key: "fitness_certificate", label: "Fitness Certificate" },
        { key: "insurance", label: "Insurance" },
        { key: "puc", label: "PUC" },
    ];

    const handleFileChange = (key: string, file: File | null) => {
        if (file) {
            setFiles((prev) => ({ ...prev, [key]: file }));
            setCurrentFile(file);
            setCurrentKey(key);
            setEditorOpen(true);
        } else {
            setFiles((prev) => ({ ...prev, [key]: null }));
        }
    };

    const handleEditorSave = (editedFile: File) => {
        if (currentKey) {
            setFiles((prev) => ({ ...prev, [currentKey]: editedFile }));
            toast.success("Image edited successfully");
        }
    };

    const handleUpload = async () => {
        // Check required fields
        const missing = requiredFields.filter((f) => !files[f.key]);
        if (missing.length > 0) {
            toast.error(`Missing required files: ${missing.map((f) => f.label).join(", ")}`);
            return;
        }

        const formData = new FormData();
        formData.append("driver_id", driverId);

        // Append all files
        Object.entries(files).forEach(([key, file]) => {
            if (file) formData.append(key, file);
        });

        try {
            await uploadDoc(formData).unwrap();
            toast.success("All documents uploaded successfully");
            setFiles({});
            setOpen(false);
            onSuccess();
        } catch (error: any) {
            console.error("Upload error:", error);
            toast.error(error?.data?.message || "Failed to upload documents. Please check file types and sizes.");
        }
    };

    const handleReEdit = (key: string) => {
        const file = files[key];
        if (file) {
            setCurrentFile(file);
            setCurrentKey(key);
            setEditorOpen(true);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Upload className="mr-2 h-4 w-4" /> Upload Documents
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-7xl! max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Upload Driver Documents</DialogTitle>
                    <DialogDescription>
                        Upload all required documents. Selected images will open in the editor for cropping.
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4 space-y-6">
                    <div className="space-y-4">
                        <h4 className="font-medium text-sm text-muted-foreground border-b pb-2">Required Documents</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {requiredFields.map((field) => (
                                <div key={field.key} className="space-y-2">
                                    <Label htmlFor={field.key} className="text-xs">{field.label} <span className="text-red-500">*</span></Label>
                                    <Input
                                        id={field.key}
                                        type="file"
                                        className="h-8 text-xs file:text-xs"
                                        accept="image/jpeg,image/png,image/jpg"
                                        onChange={(e) => handleFileChange(field.key, e.target.files?.[0] || null)}
                                    />
                                    {files[field.key] && (
                                        <div className="relative aspect-video w-full rounded-md overflow-hidden border group">
                                            <img
                                                src={URL.createObjectURL(files[field.key]!)}
                                                alt="Preview"
                                                className="object-cover w-full h-full"
                                            />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <Button size="sm" variant="secondary" onClick={() => handleReEdit(field.key)}>
                                                    <Pencil className="h-4 w-4 mr-2" /> Edit
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-medium text-sm text-muted-foreground border-b pb-2">Optional Documents</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {optionalFields.map((field) => (
                                <div key={field.key} className="space-y-2">
                                    <Label htmlFor={field.key} className="text-xs">{field.label}</Label>
                                    <Input
                                        id={field.key}
                                        type="file"
                                        className="h-8 text-xs file:text-xs"
                                        accept="image/jpeg,image/png,image/jpg"
                                        onChange={(e) => handleFileChange(field.key, e.target.files?.[0] || null)}
                                    />
                                    {files[field.key] && (
                                        <div className="relative aspect-video w-full rounded-md overflow-hidden border group">
                                            <img
                                                src={URL.createObjectURL(files[field.key]!)}
                                                alt="Preview"
                                                className="object-cover w-full h-full"
                                            />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <Button size="sm" variant="secondary" onClick={() => handleReEdit(field.key)}>
                                                    <Pencil className="h-4 w-4 mr-2" /> Edit
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleUpload} disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading...
                            </>
                        ) : (
                            "Upload All"
                        )}
                    </Button>
                </DialogFooter>

                <ImageEditorDialog
                    open={editorOpen}
                    onOpenChange={setEditorOpen}
                    file={currentFile}
                    onSave={handleEditorSave}
                />
            </DialogContent>
        </Dialog>
    );
}
