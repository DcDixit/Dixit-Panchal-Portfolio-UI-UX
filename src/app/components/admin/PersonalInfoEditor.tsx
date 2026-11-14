import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Save, Upload, X } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { getPortfolioData, savePortfolioData } from "../../data/portfolioData";

export function PersonalInfoEditor() {
  const [data, setData] = useState(getPortfolioData().personal);
  const [profileImagePreview, setProfileImagePreview] = useState(data.profileImage);

  useEffect(() => {
    setProfileImagePreview(data.profileImage);
  }, [data.profileImage]);

  const handleSave = () => {
    const portfolioData = getPortfolioData();
    portfolioData.personal = data;
    savePortfolioData(portfolioData);
    toast.success("Personal information saved!");
    window.dispatchEvent(new Event("portfolioDataUpdated"));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size should be less than 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageData = event.target?.result as string;
      setData({ ...data, profileImage: imageData });
      setProfileImagePreview(imageData);
      toast.success("Image uploaded successfully!");
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setData({ ...data, profileImage: "" });
    setProfileImagePreview("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Update your basic information and profile photo</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              placeholder="Your full name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">Professional Title</Label>
            <Input
              id="title"
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              placeholder="Your job title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={data.location}
              onChange={(e) => setData({ ...data, location: e.target.value })}
              placeholder="City, Country"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="yearsOfExperience">Years of Experience</Label>
            <Input
              id="yearsOfExperience"
              value={data.yearsOfExperience}
              onChange={(e) => setData({ ...data, yearsOfExperience: e.target.value })}
              placeholder="e.g., 9+"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              placeholder="your@email.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={data.phone}
              onChange={(e) => setData({ ...data, phone: e.target.value })}
              placeholder="+1 234 567 8900"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            value={data.bio}
            onChange={(e) => setData({ ...data, bio: e.target.value })}
            placeholder="Tell us about yourself..."
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="resumeUrl">Resume URL (optional)</Label>
          <Input
            id="resumeUrl"
            value={data.resumeUrl}
            onChange={(e) => setData({ ...data, resumeUrl: e.target.value })}
            placeholder="https://example.com/resume.pdf"
          />
        </div>

        <div className="space-y-2">
          <Label>Profile Image</Label>
          <div className="flex items-start gap-4">
            {profileImagePreview && (
              <div className="relative">
                <img
                  src={profileImagePreview}
                  alt="Profile preview"
                  className="w-32 h-32 rounded-lg object-cover"
                />
                <button
                  onClick={handleRemoveImage}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
            <div className="flex-1">
              <Button asChild variant="outline">
                <label className="cursor-pointer">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Profile Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </Button>
              <p className="text-sm text-gray-500 mt-2">
                Recommended: Square image, max 2MB
              </p>
            </div>
          </div>
        </div>

        <Button onClick={handleSave} className="w-full">
          <Save className="w-4 h-4 mr-2" />
          Save Personal Information
        </Button>
      </CardContent>
    </Card>
  );
}
