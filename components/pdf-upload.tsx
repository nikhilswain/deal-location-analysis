"use client";

import { ChangeEvent, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
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
  const { toast } = useToast();

  const simulateProgress = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 90) {
          clearInterval(interval);
          return p;
        }
        return p + 10;
      });
    }, 200);
    return interval;
  };

  const handleFileUpload = async (file: File) => {
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

      if (!response.ok) throw new Error("Upload failed");

      const result = await response.json();
      if (result.success && result.data) {
        onDataExtracted(result.data);
      } else {
        throw new Error(result.error || "Invalid response");
      }
    } catch (e) {
      console.error("Upload error:", e);
      toast({
        title: "Error",
        description: "Failed to process PDF",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      // optionally reset progress after a moment
      setTimeout(() => setProgress(0), 500);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(async (e) => {
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
                or click to browse files
              </p>
              <p className="text-xs text-muted-foreground">(PDF files only)</p>
            </>
          )}
        </label>
      </div>
    </div>
  );
}
