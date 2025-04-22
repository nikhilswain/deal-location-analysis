"use client";

export function UploadDate() {
  return (
    <div className="text-sm text-muted-foreground">
      Date Uploaded: {new Date().toLocaleDateString()}
    </div>
  );
}
