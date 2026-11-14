import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Save, Plus, Trash2, Upload, X } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { getPortfolioData, savePortfolioData } from "../../data/portfolioData";

export function CaseStudiesEditor() {
  const [caseStudies, setCaseStudies] = useState(getPortfolioData().caseStudies);

  const handleSave = () => {
    const portfolioData = getPortfolioData();
    portfolioData.caseStudies = caseStudies;
    savePortfolioData(portfolioData);
    toast.success("Case studies saved!");
    window.dispatchEvent(new Event("portfolioDataUpdated"));
  };

  const addCaseStudy = () => {
    const newCaseStudy = {
      id: Date.now().toString(),
      title: "New Case Study",
      subtitle: "Case study subtitle",
      category: "Category",
      image: "",
      description: "Case study description",
      challenge: "The challenge faced",
      solution: "The solution implemented",
      results: ["Result 1", "Result 2", "Result 3"],
      tags: ["Tag 1", "Tag 2"]
    };
    setCaseStudies([...caseStudies, newCaseStudy]);
  };

  const removeCaseStudy = (id: string) => {
    setCaseStudies(caseStudies.filter(cs => cs.id !== id));
  };

  const updateCaseStudy = (id: string, field: string, value: any) => {
    setCaseStudies(caseStudies.map(cs => cs.id === id ? { ...cs, [field]: value } : cs));
  };

  const handleImageUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size should be less than 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageData = event.target?.result as string;
      updateCaseStudy(id, "image", imageData);
      toast.success("Image uploaded!");
    };
    reader.readAsDataURL(file);
  };

  const updateTags = (id: string, tagsString: string) => {
    const tags = tagsString.split(",").map(t => t.trim()).filter(t => t);
    updateCaseStudy(id, "tags", tags);
  };

  const updateResults = (id: string, resultsString: string) => {
    const results = resultsString.split("\n").filter(r => r.trim());
    updateCaseStudy(id, "results", results);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Case Studies</CardTitle>
              <CardDescription>Manage detailed case studies of your work</CardDescription>
            </div>
            <Button onClick={addCaseStudy} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Case Study
            </Button>
          </div>
        </CardHeader>
      </Card>

      {caseStudies.map((caseStudy, index) => (
        <Card key={caseStudy.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                {caseStudy.title || `Case Study ${index + 1}`}
              </CardTitle>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => removeCaseStudy(caseStudy.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={caseStudy.title}
                  onChange={(e) => updateCaseStudy(caseStudy.id, "title", e.target.value)}
                  placeholder="Case study title"
                />
              </div>
              <div className="space-y-2">
                <Label>Subtitle</Label>
                <Input
                  value={caseStudy.subtitle}
                  onChange={(e) => updateCaseStudy(caseStudy.id, "subtitle", e.target.value)}
                  placeholder="Brief tagline"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <Input
                value={caseStudy.category}
                onChange={(e) => updateCaseStudy(caseStudy.id, "category", e.target.value)}
                placeholder="e.g., Web Design"
              />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={caseStudy.description}
                onChange={(e) => updateCaseStudy(caseStudy.id, "description", e.target.value)}
                placeholder="Overview of the case study"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Challenge</Label>
              <Textarea
                value={caseStudy.challenge}
                onChange={(e) => updateCaseStudy(caseStudy.id, "challenge", e.target.value)}
                placeholder="What was the problem or challenge?"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Solution</Label>
              <Textarea
                value={caseStudy.solution}
                onChange={(e) => updateCaseStudy(caseStudy.id, "solution", e.target.value)}
                placeholder="How did you solve it?"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Results (one per line)</Label>
              <Textarea
                value={caseStudy.results.join("\n")}
                onChange={(e) => updateResults(caseStudy.id, e.target.value)}
                placeholder="45% increase in conversion&#10;30% reduction in bounce rate&#10;25% increase in engagement"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label>Tags (comma-separated)</Label>
              <Input
                value={caseStudy.tags.join(", ")}
                onChange={(e) => updateTags(caseStudy.id, e.target.value)}
                placeholder="E-Commerce, UX Research, Design System"
              />
            </div>

            <div className="space-y-4">
              <Label>Cover Image</Label>
              {caseStudy.image && (
                <div className="relative inline-block">
                  <img
                    src={caseStudy.image}
                    alt={caseStudy.title}
                    className="w-full max-w-xs rounded-lg"
                  />
                  <button
                    onClick={() => updateCaseStudy(caseStudy.id, "image", "")}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
              <Button asChild variant="outline" size="sm">
                <label className="cursor-pointer">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(caseStudy.id, e)}
                    className="hidden"
                  />
                </label>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      <Button onClick={handleSave} className="w-full">
        <Save className="w-4 h-4 mr-2" />
        Save All Case Studies
      </Button>
    </div>
  );
}
