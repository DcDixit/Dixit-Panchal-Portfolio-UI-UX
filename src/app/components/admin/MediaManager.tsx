import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Upload, Trash2, Search, Image as ImageIcon, Copy, CheckCircle } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { getPortfolioData, savePortfolioData } from "../../data/portfolioData";

export function MediaManager() {
  const [data, setData] = useState(getPortfolioData());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  useEffect(() => {
    const handleUpdate = () => {
      setData(getPortfolioData());
    };

    window.addEventListener("portfolioDataUpdated", handleUpdate);
    return () => window.removeEventListener("portfolioDataUpdated", handleUpdate);
  }, []);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file");
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size should be less than 2MB");
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        const newMedia = {
          id: Date.now().toString(),
          name: file.name,
          url: imageUrl,
          type: file.type,
          size: file.size,
          uploadedAt: new Date().toISOString(),
          usedIn: []
        };

        const updatedData = {
          ...data,
          mediaLibrary: [...(data.mediaLibrary || []), newMedia]
        };

        savePortfolioData(updatedData);
        setData(updatedData);
        toast.success(`${file.name} uploaded successfully!`);
      };

      reader.readAsDataURL(file);
    } catch (error) {
      toast.error("Failed to upload image");
    }
  };

  const handleDeleteImage = (id: string) => {
    const image = data.mediaLibrary?.find(img => img.id === id);
    if (image && image.usedIn && image.usedIn.length > 0) {
      if (!confirm(`This image is used in ${image.usedIn.length} place(s). Are you sure you want to delete it?`)) {
        return;
      }
    }

    const updatedData = {
      ...data,
      mediaLibrary: (data.mediaLibrary || []).filter(img => img.id !== id)
    };

    savePortfolioData(updatedData);
    setData(updatedData);
    toast.success("Image deleted successfully");
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    toast.success("Image URL copied to clipboard");
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const filteredImages = (data.mediaLibrary || []).filter(img =>
    img.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="w-5 h-5" />
          Media Library
        </CardTitle>
        <CardDescription>
          Upload, manage, and organize all your portfolio images in one place
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Upload Section */}
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#1A73E8] transition-colors">
            <ImageIcon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <Label htmlFor="media-upload" className="cursor-pointer">
              <div className="space-y-2">
                <p className="text-sm">
                  Drag and drop images here, or{" "}
                  <span className="text-[#1A73E8]">browse</span>
                </p>
                <p className="text-xs text-gray-500">
                  Supported: JPG, PNG, GIF, WebP (Max 2MB)
                </p>
              </div>
            </Label>
            <Input
              id="media-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          <Button asChild className="w-full">
            <Label htmlFor="media-upload" className="cursor-pointer flex items-center justify-center gap-2">
              <Upload className="w-4 h-4" />
              Upload New Image
            </Label>
          </Button>
        </div>

        {/* Search */}
        <div className="space-y-2">
          <Label>Search Images</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by filename..."
              className="pl-10"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-2xl text-[#1A73E8]">{data.mediaLibrary?.length || 0}</p>
            <p className="text-xs text-gray-600">Total Images</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-2xl text-[#1A73E8]">
              {((data.mediaLibrary || []).reduce((acc, img) => acc + img.size, 0) / 1024).toFixed(0)}
            </p>
            <p className="text-xs text-gray-600">Total KB</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-2xl text-[#1A73E8]">
              {(data.mediaLibrary || []).filter(img => img.usedIn && img.usedIn.length > 0).length}
            </p>
            <p className="text-xs text-gray-600">In Use</p>
          </div>
        </div>

        {/* Image Grid */}
        <div>
          <h3 className="text-sm mb-3">
            All Images ({filteredImages.length})
          </h3>
          
          {filteredImages.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <ImageIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p className="text-sm">
                {searchTerm ? "No images found" : "No images uploaded yet"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  className={`relative group border-2 rounded-lg overflow-hidden cursor-pointer transition-all ${
                    selectedImage === image.id
                      ? "border-[#1A73E8] shadow-md"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedImage(image.id)}
                >
                  {/* Image */}
                  <div className="aspect-video bg-gray-100 relative">
                    <img
                      src={image.url}
                      alt={image.name}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Overlay Actions */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyUrl(image.url);
                        }}
                      >
                        {copiedUrl === image.url ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteImage(image.id);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-2 bg-white">
                    <p className="text-xs truncate" title={image.name}>
                      {image.name}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-500">
                        {(image.size / 1024).toFixed(0)} KB
                      </span>
                      {image.usedIn && image.usedIn.length > 0 && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                          Used
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Selected Image Details */}
        {selectedImage && (
          <Card className="bg-gray-50">
            <CardHeader>
              <CardTitle className="text-sm">Selected Image Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {(() => {
                const image = (data.mediaLibrary || []).find(img => img.id === selectedImage);
                if (!image) return null;

                return (
                  <>
                    <div>
                      <Label className="text-xs text-gray-600">File Name</Label>
                      <p className="text-sm">{image.name}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">File Size</Label>
                      <p className="text-sm">{(image.size / 1024).toFixed(2)} KB</p>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Upload Date</Label>
                      <p className="text-sm">
                        {new Date(image.uploadedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Used In</Label>
                      {image.usedIn && image.usedIn.length > 0 ? (
                        <ul className="text-sm list-disc list-inside">
                          {image.usedIn.map((location, idx) => (
                            <li key={idx}>{location}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-gray-500">Not used anywhere</p>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopyUrl(image.url)}
                      className="w-full"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Image URL
                    </Button>
                  </>
                );
              })()}
            </CardContent>
          </Card>
        )}

        {/* Tips */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm mb-2 text-[#1A73E8]">💡 Media Library Tips</h4>
          <ul className="text-xs text-gray-700 space-y-1">
            <li>• Upload images before assigning them to sections</li>
            <li>• Keep image file sizes under 2MB for better performance</li>
            <li>• Use descriptive file names for easy searching</li>
            <li>• Copy image URLs to use in other sections</li>
            <li>• Images marked "Used" are assigned to sections</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
