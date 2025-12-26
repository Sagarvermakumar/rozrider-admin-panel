"use client";

import { useEffect, useRef, useState } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RotateCw, RotateCcw, ZoomIn, ZoomOut, RefreshCw, Check, X } from "lucide-react";

interface ImageEditorDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    file: File | null;
    onSave: (editedFile: File) => void;
}

export function ImageEditorDialog({ open, onOpenChange, file, onSave }: ImageEditorDialogProps) {
    const cropperRef = useRef<ReactCropperElement>(null);
    const [imageSrc, setImageSrc] = useState<string | null>(null);

    useEffect(() => {
        if (file) {
            const url = URL.createObjectURL(file);
            setImageSrc(url);
            return () => URL.revokeObjectURL(url);
        } else {
            setImageSrc(null);
        }
    }, [file]);

    const handleSave = () => {
        if (cropperRef.current && cropperRef.current.cropper) {
            cropperRef.current.cropper.getCroppedCanvas().toBlob((blob) => {
                if (blob) {
                    const editedFile = new File([blob], file?.name || "edited-image.jpg", {
                        type: "image/jpeg",
                        lastModified: Date.now(),
                    });
                    onSave(editedFile);
                    onOpenChange(false);
                }
            }, "image/jpeg");
        }
    };

    const rotateLeft = () => cropperRef.current?.cropper.rotate(-90);
    const rotateRight = () => cropperRef.current?.cropper.rotate(90);
    const zoomIn = () => cropperRef.current?.cropper.zoom(0.1);
    const zoomOut = () => cropperRef.current?.cropper.zoom(-0.1);
    const reset = () => cropperRef.current?.cropper.reset();

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black/95">
                <DialogHeader className="p-4 bg-muted/20">
                    <DialogTitle>Edit Image</DialogTitle>
                </DialogHeader>

                <div className="h-[60vh] w-full bg-black flex items-center justify-center">
                    {imageSrc && (
                        <Cropper
                            src={imageSrc}
                            style={{ height: "100%", width: "100%" }}
                            initialAspectRatio={16 / 9}
                            guides={true}
                            ref={cropperRef}
                            background={false}
                            responsive={true}
                            dragMode="move"
                            viewMode={1}
                            autoCropArea={0.8}
                        />
                    )}
                </div>

                <div className="p-4 bg-muted/20 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" onClick={rotateLeft} title="Rotate Left">
                            <RotateCcw className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={rotateRight} title="Rotate Right">
                            <RotateCw className="h-4 w-4" />
                        </Button>
                        <div className="h-6 w-px bg-border mx-2" />
                        <Button variant="outline" size="icon" onClick={zoomOut} title="Zoom Out">
                            <ZoomOut className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={zoomIn} title="Zoom In">
                            <ZoomIn className="h-4 w-4" />
                        </Button>
                        <div className="h-6 w-px bg-border mx-2" />
                        <Button variant="ghost" size="icon" onClick={reset} title="Reset">
                            <RefreshCw className="h-4 w-4" />
                        </Button>
                    </div>

                    <DialogFooter className="gap-2">
                        <Button variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSave}>
                            <Check className="mr-2 h-4 w-4" /> Save Changes
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
}
