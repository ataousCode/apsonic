'use client';

import * as React from "react";
import { cn } from "@/lib/utils";

export interface FileUploadProps {
  label?: string;
  error?: string;
  helper?: string;
  accept?: string;
  required?: boolean;
  onChange?: (files: FileList | null) => void;
  maxSize?: number; // in MB
  multiple?: boolean;
}

export const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
  ({ label, error, helper, accept, required, onChange, maxSize = 5, multiple = false }, ref) => {
    const [fileName, setFileName] = React.useState<string>("");
    const [uploadError, setUploadError] = React.useState<string>("");
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files || files.length === 0) {
        setFileName("");
        setUploadError("");
        onChange?.(null);
        return;
      }

      // Check file size
      const file = files[0];
      const fileSizeMB = file.size / (1024 * 1024);
      
      if (fileSizeMB > maxSize) {
        setUploadError(`File size must be less than ${maxSize}MB`);
        setFileName("");
        onChange?.(null);
        return;
      }

      setUploadError("");
      
      if (multiple) {
        const names = Array.from(files).map(f => f.name).join(", ");
        setFileName(names);
      } else {
        setFileName(file.name);
      }
      
      onChange?.(files);
    };

    const handleClick = () => {
      inputRef.current?.click();
    };

    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="block text-sm font-medium text-apsonic-text">
            {label}
            {required && (
              <span className="ml-1 text-apsonic-green">*</span>
            )}
          </label>
        )}
        
        <div
          onClick={handleClick}
          className={cn(
            "flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-apsonic-border bg-apsonic-surface transition-all hover:border-apsonic-green hover:bg-apsonic-surface-elevated",
            (error || uploadError) && "border-red-500 hover:border-red-500",
            fileName && "border-apsonic-green bg-apsonic-surface-elevated"
          )}
        >
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept={accept}
            required={required}
            multiple={multiple}
            onChange={handleFileChange}
          />
          
          {!fileName ? (
            <>
              <svg
                className="mb-3 h-10 w-10 text-apsonic-subtle"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="text-sm text-apsonic-text">
                Click to upload or drag and drop
              </p>
              <p className="mt-1 text-xs text-apsonic-subtle">
                {accept ? accept.toUpperCase() : "Any file"} (max {maxSize}MB)
              </p>
            </>
          ) : (
            <>
              <svg
                className="mb-3 h-10 w-10 text-apsonic-green"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-sm font-medium text-apsonic-green">
                {fileName}
              </p>
              <p className="mt-1 text-xs text-apsonic-subtle">
                Click to change file
              </p>
            </>
          )}
        </div>
        
        {(error || uploadError) && (
          <p className="text-sm text-red-500">{error || uploadError}</p>
        )}
        {helper && !error && !uploadError && (
          <p className="text-sm text-apsonic-subtle">{helper}</p>
        )}
      </div>
    );
  }
);

FileUpload.displayName = "FileUpload";

