import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface DropzoneFieldProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
  accept?: Record<string, string[]>;
  disabled?: boolean;
  preview?: string | null;
}

export default function DropzoneField({
  file,
  onFileChange,
  accept = { "image/jpeg": [".jpg", ".jpeg"], "image/png": [".png"], "image/webp": [".webp"] },
  disabled = false,
  preview,
}: DropzoneFieldProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles[0]) {
        onFileChange(acceptedFiles[0]);
      }
    },
    [onFileChange],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    onDrop,
    disabled,
    multiple: false,
  });

  const renderContent = () => {
    if (disabled) {
      return <span className="text-sm text-gray">Uploading...</span>;
    }
    if (isDragActive) {
      return <span className="text-sm text-gray">Drop the file here...</span>;
    }
    if (file) {
      return (
        <div className="flex flex-col items-center gap-2">
          {preview ? (
            <img src={preview} alt="Preview" className="max-w-[280px] max-h-[160px] rounded object-cover" />
          ) : (
            <span className="text-sm font-medium text-gray-dark">{file.name}</span>
          )}
          <button
            type="button"
            className="text-xs text-red-600 hover:underline"
            onClick={(e) => {
              e.stopPropagation();
              onFileChange(null);
            }}
          >
            &times; Remove
          </button>
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center gap-1.5">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#9ca3af"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        <span className="text-sm font-semibold text-gray-dark">Drag & drop file here</span>
        <span className="text-xs text-gray">or click to browse</span>
      </div>
    );
  };

  return (
    <div
      {...getRootProps()}
      className={`flex flex-col items-center justify-center gap-0 rounded border-2 border-dashed border-gray-light bg-gray-50 px-4 py-8 cursor-pointer transition-colors ${
        isDragActive ? "border-blue-600 bg-blue-50" : ""
      }${file ? " border-solid border-gray-light" : ""}`}
    >
      <input {...getInputProps()} />
      {renderContent()}
    </div>
  );
}
