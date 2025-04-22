"use client";

import { ChangeEvent, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ExtractedData } from "@/types";
import { File, Loader2 } from "lucide-react";

interface PdfUploadProps {
  onDataExtracted: (data: ExtractedData) => void;
}

export function PdfUpload({ onDataExtracted }: PdfUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(
    null
  );

  const handleFileUpload = async (file: File) => {
    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const result = await response.json();
      if (result.success && result.data) {
        setExtractedData(result.data);
        onDataExtracted(result.data);
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Error",
        description: "Failed to process PDF",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      await handleFileUpload(file);
    }
  }, []);

  return (
    <div className="w-full">
      <div
        className={`relative min-h-[200px] rounded-lg border-2 border-dashed transition-colors ${
          isDragging
            ? "border-primary bg-primary/5"
            : "border-gray-200 hover:border-primary"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
          id="pdf-upload"
          disabled={isUploading}
        />
        <label
          htmlFor="pdf-upload"
          className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 p-6"
        >
          {isUploading ? (
            <>
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Processing PDF...</p>
            </>
          ) : (
            <>
              <div className="rounded-full bg-primary/10 p-4">
                <File className="h-6 w-6 text-primary" />
              </div>
              <p className="text-sm font-medium">
                Drag and drop your Offering Memorandum here
              </p>
              <p className="text-xs text-muted-foreground">
                or click to browse files
              </p>
              <p className="text-xs text-muted-foreground">(PDF files only)</p>
            </>
          )}
        </label>
      </div>

      {extractedData && (
        <div className="mt-4 space-y-4 rounded-lg border bg-background p-4">
          <div className="grid gap-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-muted-foreground">
                  Property Type
                </label>
                <p className="text-sm font-medium">
                  {extractedData.propertyOverview.propertyType || "N/A"}
                </p>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">
                  Location
                </label>
                <p className="text-sm font-medium">
                  {extractedData.propertyOverview.location || "N/A"}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-2">
            <label className="text-xs text-muted-foreground">
              Financial Metrics
            </label>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-xs text-muted-foreground">NOI</label>
                <p className="text-sm font-medium">
                  {extractedData.financialMetrics.noi?.formatted || "N/A"}
                </p>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">
                  Cap Rate
                </label>
                <p className="text-sm font-medium">
                  {extractedData.financialMetrics.capRate
                    ? `${extractedData.financialMetrics.capRate}%`
                    : "N/A"}
                </p>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">
                  Occupancy
                </label>
                <p className="text-sm font-medium">
                  {extractedData.financialMetrics.occupancy
                    ? `${extractedData.financialMetrics.occupancy}%`
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
