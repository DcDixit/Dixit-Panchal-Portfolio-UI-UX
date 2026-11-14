import { useState, useRef } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Card } from "../ui/card";
import { Upload, X, Image as ImageIcon, Check, AlertCircle } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface ImageUploaderProps {
  label: string;
  currentImage?: string;
  onImageChange: (imageData: string) => void;
  maxSizeKB?: number;
  recommendedDimensions?: string;
  aspectRatio?: string;
  helpText?: string;
}

export function ImageUploader({
  label,
  currentImage,
  onImageChange,
  maxSizeKB = 2048, // 2MB default
  recommendedDimensions,
  aspectRatio,
  helpText
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateImage = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      // Check file type
      if (!file.type.startsWith("image/")) {
        setErrorMessage("Please upload a valid image file (JPG, PNG, GIF, WebP)");
        setUploadStatus("error");
        toast.error("Invalid file type");
        resolve(false);
        return;
      }

      // Check file size
      const fileSizeKB = file.size / 1024;
      if (fileSizeKB > maxSizeKB) {
        setErrorMessage(`Image size must be less than ${maxSizeKB}KB (current: ${Math.round(fileSizeKB)}KB)`);
        setUploadStatus("error");
        toast.error("Image too large");
        resolve(false);
        return;
      }

      resolve(true);
    });
  };

  const handleFileChange = async (file: File) => {
    const isValid = await validateImage(file);
    if (!isValid) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreview(result);
      onImageChange(result);
      setUploadStatus("success");
      setErrorMessage("");
      toast.success("Image uploaded successfully!");
    };
    reader.onerror = () => {
      setErrorMessage("Failed to read image file");
      setUploadStatus("error");
      toast.error("Upload failed");
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onImageChange("");
    setUploadStatus("idle");
    setErrorMessage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    toast.info("Image removed");
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-4 transition-all ${
          isDragging
            ? "border-blue-500 bg-blue-50"
            : uploadStatus === "success"
            ? "border-green-500 bg-green-50"
            : uploadStatus === "error"
            ? "border-red-500 bg-red-50"
            : "border-gray-300 hover:border-gray-400"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {preview ? (
          // Preview Display
          <div className="space-y-3">
            <div className="relative bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-48 object-contain"
              />
              <div className="absolute top-2 right-2 flex gap-2">
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={handleRemove}
                  className="h-8"
                >
                  <X className="w-4 h-4 mr-1" />
                  Remove
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={handleClick}
                  className="h-8"
                >
                  <Upload className="w-4 h-4 mr-1" />
                  Replace
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-green-600">
              <Check className="w-4 h-4" />
              <span>Image uploaded successfully</span>
            </div>
          </div>
        ) : (
          // Upload Prompt
          <div
            className="text-center cursor-pointer py-6"
            onClick={handleClick}
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-gray-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  JPG, PNG, GIF, or WebP (max {maxSizeKB}KB)
                </p>
              </div>
            </div>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          className="hidden"
        />
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-red-600">{errorMessage}</p>
        </div>
      )}

      {/* Help Text */}
      {(helpText || recommendedDimensions || aspectRatio) && !errorMessage && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg space-y-1">
          {helpText && <p className="text-xs text-blue-700">{helpText}</p>}
          {recommendedDimensions && (
            <p className="text-xs text-blue-600">
              📐 Recommended: {recommendedDimensions}
            </p>
          )}
          {aspectRatio && (
            <p className="text-xs text-blue-600">
              📏 Aspect Ratio: {aspectRatio}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
