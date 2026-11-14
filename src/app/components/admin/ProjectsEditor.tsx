import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Save, Plus, Trash2, Upload, X } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { getPortfolioData, savePortfolioData, type PortfolioProject } from "../../data/portfolioData";

export function ProjectsEditor() {
  const [projects, setProjects] = useState(getPortfolioData().projects);

  const handleSave = () => {
    const portfolioData = getPortfolioData();
    portfolioData.projects = projects;
    savePortfolioData(portfolioData);
    toast.success("Projects saved!");
    window.dispatchEvent(new Event("portfolioDataUpdated"));
  };

  const addProject = () => {
    const newProject: PortfolioProject = {
      id: Date.now().toString(),
      title: "New Project",
      category: "Design",
      description: "Project description",
      image: "",
      tags: ["Tag 1", "Tag 2"],
      featured: false,
      isFeaturedHero: false,
      client: "",
      year: new Date().getFullYear().toString(),
      link: "",
      galleryImages: [],
      toolsUsed: [],
      caseStudyUrl: "",
      enabled: true,
      order: projects.length + 1,
      presentation: "showcase",
      showcaseKind: "web",
      impact: "",
      role: "",
      timeline: "",
      problem: "",
      solution: "",
      process: "",
      caseStudyId: undefined,
    };
    setProjects([...projects, newProject]);
  };

  const removeProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const updateProject = (id: string, field: string, value: any) => {
    setProjects(projects.map(p => p.id === id ? { ...p, [field]: value } : p));
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
      updateProject(id, "image", imageData);
      toast.success("Image uploaded!");
    };
    reader.readAsDataURL(file);
  };

  const updateTags = (id: string, tagsString: string) => {
    const tags = tagsString.split(",").map(t => t.trim()).filter(t => t);
    updateProject(id, "tags", tags);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Projects</CardTitle>
              <CardDescription>Manage your portfolio projects</CardDescription>
            </div>
            <Button onClick={addProject} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          </div>
        </CardHeader>
      </Card>

      {projects.map((project, index) => (
        <Card key={project.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                {project.title || `Project ${index + 1}`}
              </CardTitle>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => removeProject(project.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Project Title</Label>
                <Input
                  value={project.title}
                  onChange={(e) => updateProject(project.id, "title", e.target.value)}
                  placeholder="Project name"
                />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Input
                  value={project.category}
                  onChange={(e) => updateProject(project.id, "category", e.target.value)}
                  placeholder="e.g., Mobile App Design"
                />
              </div>
              <div className="space-y-2">
                <Label>Client (optional)</Label>
                <Input
                  value={project.client || ""}
                  onChange={(e) => updateProject(project.id, "client", e.target.value)}
                  placeholder="Client name"
                />
              </div>
              <div className="space-y-2">
                <Label>Year</Label>
                <Input
                  value={project.year || ""}
                  onChange={(e) => updateProject(project.id, "year", e.target.value)}
                  placeholder="2024"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={project.description}
                onChange={(e) => updateProject(project.id, "description", e.target.value)}
                placeholder="Project description"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Tags (comma-separated)</Label>
              <Input
                value={project.tags.join(", ")}
                onChange={(e) => updateTags(project.id, e.target.value)}
                placeholder="UI/UX, Mobile, Design"
              />
            </div>

            <div className="space-y-2">
              <Label>Project Link (optional)</Label>
              <Input
                value={project.link || ""}
                onChange={(e) => updateProject(project.id, "link", e.target.value)}
                placeholder="https://project-url.com"
              />
            </div>

            <div className="space-y-4">
              <Label>Project Image</Label>
              {project.image && (
                <div className="relative inline-block">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full max-w-xs rounded-lg"
                  />
                  <button
                    onClick={() => updateProject(project.id, "image", "")}
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
                    onChange={(e) => handleImageUpload(project.id, e)}
                    className="hidden"
                  />
                </label>
              </Button>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={project.featured}
                    onCheckedChange={(checked) => updateProject(project.id, "featured", checked)}
                  />
                  <Label>Featured Project</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={project.isFeaturedHero || false}
                    onCheckedChange={(checked) => updateProject(project.id, "isFeaturedHero", checked)}
                  />
                  <Label>Hero Featured Project</Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <Button onClick={handleSave} className="w-full">
        <Save className="w-4 h-4 mr-2" />
        Save All Projects
      </Button>
    </div>
  );
}
