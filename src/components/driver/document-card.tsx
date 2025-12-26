import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Check, Eye, Upload, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface DocumentCardProps {
    title: string;
    fieldKey: string;
    imageUrl?: string | null;
    status: 'pending' | 'approved' | 'rejected' | null;
    onUpdateStatus: (field: string, status: 'approved' | 'rejected') => void;
    onUpload?: (file: File) => void;
    isLoading: boolean;
}

export function DocumentCard({
    title,
    fieldKey,
    imageUrl,
    status,
    onUpdateStatus,
    onUpload,
    isLoading
}: DocumentCardProps) {
    const [previewOpen, setPreviewOpen] = useState(false);

    const getStatusBadge = () => {
        if (!imageUrl) return <Badge variant="secondary">Not Uploaded</Badge>;
        switch (status) {
            case 'approved':
                return <Badge className="bg-green-500 hover:bg-green-600">Approved</Badge>;
            case 'rejected':
                return <Badge variant="destructive">Rejected</Badge>;
            default:
                return <Badge variant="outline" className="text-yellow-500 border-yellow-500">Pending</Badge>;
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0] && onUpload) {
            onUpload(e.target.files[0]);
        }
    };

    const getFullImageUrl = (url: string | null | undefined) => {
        if (!url) return null;
        if (url.startsWith('http://') || url.startsWith('https://')) return url;
        // Clean leading slash
        const cleanPath = url.startsWith('/') ? url.substring(1) : url;
        return `https://rozzride.com/storage/driver-document/${cleanPath}`;
        // return `https://vps.bloatwareitsolutions.com:2083/etc/apps/filemanager/index.php?option=com_extplorer&action=get_image&dir=%2Frozzride_projects%2Fpublic%2Fstorage%2Fdriver_documents&item=${cleanPath}&order=name&direction=ASC`
    };

    const fullImageUrl = getFullImageUrl(imageUrl);

    return (
        <Card className="overflow-hidden border-neutral-200 dark:border-neutral-800 bg-black/20">
            <CardContent className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                    <h4 className="font-semibold text-sm">{title}</h4>
                    {getStatusBadge()}
                </div>

                <div className="aspect-video relative bg-muted rounded-md overflow-hidden group">
                    {fullImageUrl ? (
                        <>
                            <Image
                                src={fullImageUrl}
                                alt={title}
                                fill
                                className="object-cover transition-transform group-hover:scale-105"
                                unoptimized
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
                                    <DialogTrigger asChild>
                                        <Button size="icon" variant="secondary" className="h-8 w-8">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-3xl w-full p-0 overflow-hidden bg-transparent border-none shadow-none">
                                        <div className="relative w-full h-[80vh]">
                                            <Image
                                                src={fullImageUrl}
                                                alt={title}
                                                fill
                                                className="object-contain"
                                                unoptimized
                                            />
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center justify-center h-full text-muted-foreground text-xs">
                            No Image
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-2 pt-2">
                    {imageUrl && status !== 'approved' && (
                        <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 h-8 text-green-500 border-green-500/20 hover:bg-green-500/10 hover:text-green-600"
                            onClick={() => onUpdateStatus(fieldKey + '_status', 'approved')}
                            disabled={isLoading}
                        >
                            <Check className="h-3 w-3 mr-1" /> Approve
                        </Button>
                    )}

                    {imageUrl && status !== 'rejected' && (
                        <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 h-8 text-red-500 border-red-500/20 hover:bg-red-500/10 hover:text-red-600"
                            onClick={() => onUpdateStatus(fieldKey + '_status', 'rejected')}
                            disabled={isLoading}
                        >
                            <X className="h-3 w-3 mr-1" /> Reject
                        </Button>
                    )}

                    {!imageUrl && onUpload && (
                        <div className="relative flex-1">
                            <Input
                                type="file"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={handleFileChange}
                                accept="image/*"
                                disabled={isLoading}
                            />
                            <Button size="sm" variant="outline" className="w-full h-8" disabled={isLoading}>
                                <Upload className="h-3 w-3 mr-1" /> Upload
                            </Button>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
