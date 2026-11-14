import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Save, Plus, Trash2, Upload, X } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { getPortfolioData, savePortfolioData } from "../../data/portfolioData";

export function TestimonialsEditor() {
  const [testimonials, setTestimonials] = useState(getPortfolioData().testimonials);

  const handleSave = () => {
    const portfolioData = getPortfolioData();
    portfolioData.testimonials = testimonials;
    savePortfolioData(portfolioData);
    toast.success("Testimonials saved!");
    window.dispatchEvent(new Event("portfolioDataUpdated"));
  };

  const addTestimonial = () => {
    const newTestimonial = {
      id: Date.now().toString(),
      name: "Client Name",
      role: "Job Title",
      company: "Company Name",
      content: "Testimonial content goes here...",
      avatar: ""
    };
    setTestimonials([...testimonials, newTestimonial]);
  };

  const removeTestimonial = (id: string) => {
    setTestimonials(testimonials.filter(t => t.id !== id));
  };

  const updateTestimonial = (id: string, field: string, value: any) => {
    setTestimonials(testimonials.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  const handleImageUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1 * 1024 * 1024) {
      toast.error("Image size should be less than 1MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageData = event.target?.result as string;
      updateTestimonial(id, "avatar", imageData);
      toast.success("Avatar uploaded!");
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Testimonials</CardTitle>
              <CardDescription>Manage client testimonials and reviews</CardDescription>
            </div>
            <Button onClick={addTestimonial} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Testimonial
            </Button>
          </div>
        </CardHeader>
      </Card>

      {testimonials.map((testimonial, index) => (
        <Card key={testimonial.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                {testimonial.name || `Testimonial ${index + 1}`}
              </CardTitle>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => removeTestimonial(testimonial.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  value={testimonial.name}
                  onChange={(e) => updateTestimonial(testimonial.id, "name", e.target.value)}
                  placeholder="Client name"
                />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Input
                  value={testimonial.role}
                  onChange={(e) => updateTestimonial(testimonial.id, "role", e.target.value)}
                  placeholder="Job title"
                />
              </div>
              <div className="space-y-2">
                <Label>Company</Label>
                <Input
                  value={testimonial.company}
                  onChange={(e) => updateTestimonial(testimonial.id, "company", e.target.value)}
                  placeholder="Company name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Testimonial Content</Label>
              <Textarea
                value={testimonial.content}
                onChange={(e) => updateTestimonial(testimonial.id, "content", e.target.value)}
                placeholder="What did they say about working with you?"
                rows={4}
              />
            </div>

            <div className="space-y-4">
              <Label>Avatar Image (optional)</Label>
              <div className="flex items-center gap-4">
                {testimonial.avatar && (
                  <div className="relative">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <button
                      onClick={() => updateTestimonial(testimonial.id, "avatar", "")}
                      className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
                <Button asChild variant="outline" size="sm">
                  <label className="cursor-pointer">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Avatar
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(testimonial.id, e)}
                      className="hidden"
                    />
                  </label>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <Button onClick={handleSave} className="w-full">
        <Save className="w-4 h-4 mr-2" />
        Save All Testimonials
      </Button>
    </div>
  );
}
