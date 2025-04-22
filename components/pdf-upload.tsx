"use client";

import { ChangeEvent, useState, useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ExtractedData } from "@/types";
import { File } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface PdfUploadProps {
  onDataExtracted: (data: ExtractedData) => void;
}

export function PdfUpload({ onDataExtracted }: PdfUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { toast } = useToast();

  const simulateProgress = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => (p >= 90 ? (clearInterval(interval), p) : p + 10));
    }, 200);
    return interval;
  };

  const handleFileUpload = async (file: File | Blob) => {
    setErrorMsg(null);

    if (
      !file ||
      typeof file !== "object" ||
      !("type" in file) ||
      file.type !== "application/pdf"
    ) {
      const msg = "Please upload a PDF file only.";
      setErrorMsg(msg);
      toast({
        title: "Invalid file",
        description: msg,
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    const progressInterval = simulateProgress();

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);
      setProgress(100);

      if (!response.ok) {
        throw new Error("Upload failed");
      }
      const result = await response.json();
      if (!result.success || !result.data) {
        throw new Error(result.error || "Invalid response");
      }

      toast({
        title: "PDF processed",
        description: "Pdf parsed, please scroll to see updated changes.",
      });
      onDataExtracted(result.data);
    } catch (e: any) {
      console.error("Upload error:", e);
      toast({
        title: "Error processing PDF",
        description: e.message ?? "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setTimeout(() => setProgress(0), 500);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  const handleDragOver = useCallback((e: any) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);
  const handleDragLeave = useCallback((e: any) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);
  const handleDrop = useCallback(async (e: any) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) await handleFileUpload(file);
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
          id="pdf-upload"
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
          disabled={isUploading}
        />
        <label
          htmlFor="pdf-upload"
          className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 p-6"
        >
          {isUploading ? (
            <>
              <Progress
                value={progress}
                className="w-full mb-2 bg-blue-50"
                indicatorClassName="bg-blue-300"
              />
              <p className="text-sm text-muted-foreground">
                Processing PDF… {progress}%
              </p>
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
                or click to browse files (PDF only)
              </p>
            </>
          )}
        </label>
      </div>
      {errorMsg && <p className="mt-2 text-sm text-destructive">{errorMsg}</p>}
    </div>
  );
}
