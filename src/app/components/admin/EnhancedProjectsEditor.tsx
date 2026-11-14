import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Save, Plus, Trash2, ArrowUp, ArrowDown, Eye, EyeOff, Star, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { getPortfolioData, savePortfolioData, type PortfolioProject } from "../../data/portfolioData";
import { FEATURED_CASE_STUDY_IDS, type ProjectPresentation, type ShowcaseKind } from "../../data/projectCatalog";
import { ImageUploader } from "./ImageUploader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function EnhancedProjectsEditor() {
  const [data, setData] = useState(getPortfolioData());

  useEffect(() => {
    const handleUpdate = () => {
      setData(getPortfolioData());
    };

    window.addEventListener("portfolioDataUpdated", handleUpdate);
    return () => window.removeEventListener("portfolioDataUpdated", handleUpdate);
  }, []);

  const handleSave = () => {
    savePortfolioData(data);
    toast.success("Projects saved successfully!");
    window.dispatchEvent(new Event("portfolioDataUpdated"));
  };

  const addProject = () => {
    const newProject: PortfolioProject = {
      id: Date.now().toString(),
      title: "New Project",
      category: "Design",
      description: "Short summary shown on project cards and showcase headers.",
      image: "",
      tags: ["Portfolio"],
      featured: false,
      isFeaturedHero: false,
      client: "",
      year: new Date().getFullYear().toString(),
      link: "",
      galleryImages: [],
      toolsUsed: [],
      caseStudyUrl: "",
      enabled: true,
      order: data.projects.length + 1,
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
    setData({
      ...data,
      projects: [...data.projects, newProject],
    });
  };

  const removeProject = (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    setData({
      ...data,
      projects: data.projects.filter(p => p.id !== id)
    });
  };

  const updateProject = (id: string, field: string, value: any) => {
    setData({
      ...data,
      projects: data.projects.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    });
  };

  const patchProject = (id: string, patch: Partial<PortfolioProject>) => {
    setData({
      ...data,
      projects: data.projects.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    });
  };

  const reorderProject = (id: string, direction: 'up' | 'down') => {
    const projects = [...data.projects].sort((a, b) => a.order - b.order);
    const index = projects.findIndex(p => p.id === id);
    
    if (direction === 'up' && index > 0) {
      [projects[index], projects[index - 1]] = [projects[index - 1], projects[index]];
    } else if (direction === 'down' && index < projects.length - 1) {
      [projects[index], projects[index + 1]] = [projects[index + 1], projects[index]];
    }

    // Update order numbers
    projects.forEach((project, idx) => {
      project.order = idx + 1;
    });

    setData({
      ...data,
      projects: projects
    });
  };

  const updateTags = (id: string, tagsString: string) => {
    const tags = tagsString.split(",").map(t => t.trim()).filter(t => t);
    updateProject(id, "tags", tags);
  };

  const updateToolsUsed = (id: string, toolsString: string) => {
    const tools = toolsString.split(",").map(t => t.trim()).filter(t => t);
    updateProject(id, "toolsUsed", tools);
  };

  const addGalleryImage = (id: string, imageUrl: string) => {
    const project = data.projects.find(p => p.id === id);
    if (project) {
      const galleryImages = [...(project.galleryImages || []), imageUrl];
      updateProject(id, "galleryImages", galleryImages);
    }
  };

  const removeGalleryImage = (id: string, imageIndex: number) => {
    const project = data.projects.find(p => p.id === id);
    if (project && project.galleryImages) {
      const galleryImages = project.galleryImages.filter((_, idx) => idx !== imageIndex);
      updateProject(id, "galleryImages", galleryImages);
    }
  };

  const sortedProjects = [...data.projects].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Projects Management</CardTitle>
              <CardDescription>
                Controls the public Projects page: case study cards vs visual grids (synced with saved portfolio data).
              </CardDescription>
            </div>
            <Button onClick={addProject} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-6">
            <div className="rounded-lg bg-gray-50 p-3 text-center md:p-4">
              <p className="text-xl text-[#1A73E8] md:text-2xl">{data.projects.length}</p>
              <p className="text-[11px] text-gray-600 md:text-xs">Total</p>
            </div>
            <div className="rounded-lg bg-gray-50 p-3 text-center md:p-4">
              <p className="text-xl text-green-600 md:text-2xl">{data.projects.filter((p) => p.enabled).length}</p>
              <p className="text-[11px] text-gray-600 md:text-xs">Visible</p>
            </div>
            <div className="rounded-lg bg-gray-50 p-3 text-center md:p-4">
              <p className="text-xl text-[#1557B0] md:text-2xl">
                {data.projects.filter((p) => p.enabled && p.presentation === "case-study").length}
              </p>
              <p className="text-[11px] text-gray-600 md:text-xs">Case studies</p>
            </div>
            <div className="rounded-lg bg-gray-50 p-3 text-center md:p-4">
              <p className="text-xl text-[#6366f1] md:text-2xl">
                {data.projects.filter((p) => p.enabled && p.presentation === "showcase").length}
              </p>
              <p className="text-[11px] text-gray-600 md:text-xs">Showcases</p>
            </div>
            <div className="rounded-lg bg-gray-50 p-3 text-center md:p-4">
              <p className="text-xl text-[#FF6F3C] md:text-2xl">{data.projects.filter((p) => p.featured).length}</p>
              <p className="text-[11px] text-gray-600 md:text-xs">Featured</p>
            </div>
            <div className="rounded-lg bg-gray-50 p-3 text-center md:p-4">
              <p className="text-xl text-gray-400 md:text-2xl">{data.projects.filter((p) => !p.enabled).length}</p>
              <p className="text-[11px] text-gray-600 md:text-xs">Hidden</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {sortedProjects.map((project, index) => (
        <Card key={project.id} className={!project.enabled ? "opacity-60" : ""}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Switch
                  checked={project.enabled}
                  onCheckedChange={(checked) =>
                    updateProject(project.id, "enabled", checked)
                  }
                />
                {project.enabled ? (
                  <Eye className="w-4 h-4 text-green-600" />
                ) : (
                  <EyeOff className="w-4 h-4 text-gray-400" />
                )}
                {project.featured && <Star className="w-4 h-4 text-[#FF6F3C] fill-current" />}
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                    project.presentation === "case-study"
                      ? "bg-[#1557B0]/10 text-[#1557B0]"
                      : "bg-[#6366f1]/10 text-[#4338ca]"
                  }`}
                >
                  {project.presentation === "case-study" ? "Case study" : "Showcase"}
                </span>
                <CardTitle className="text-lg">
                  {project.title || `Project ${index + 1}`}
                </CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => reorderProject(project.id, 'up')}
                  disabled={index === 0}
                  title="Move Up"
                >
                  <ArrowUp className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => reorderProject(project.id, 'down')}
                  disabled={index === sortedProjects.length - 1}
                  title="Move Down"
                >
                  <ArrowDown className="w-4 h-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeProject(project.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <h3 className="text-sm text-[#1A73E8]">Basic Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Project Title *</Label>
                  <Input
                    value={project.title}
                    onChange={(e) => updateProject(project.id, "title", e.target.value)}
                    placeholder="e.g., Mobile Banking App"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Category *</Label>
                  <Input
                    value={project.category}
                    onChange={(e) => updateProject(project.id, "category", e.target.value)}
                    placeholder="e.g., Mobile App Design"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description *</Label>
                <Textarea
                  value={project.description}
                  onChange={(e) => updateProject(project.id, "description", e.target.value)}
                  placeholder="Describe your project..."
                  rows={3}
                />
                <p className="text-xs text-gray-500">
                  {project.description.length} characters
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Client</Label>
                  <Input
                    value={project.client || ""}
                    onChange={(e) => updateProject(project.id, "client", e.target.value)}
                    placeholder="e.g., ABC Company"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Year</Label>
                  <Input
                    value={project.year || ""}
                    onChange={(e) => updateProject(project.id, "year", e.target.value)}
                    placeholder="e.g., 2024"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Live URL</Label>
                  <Input
                    value={project.link || ""}
                    onChange={(e) => updateProject(project.id, "link", e.target.value)}
                    placeholder="https://example.com"
                  />
                </div>
              </div>
            </div>

            {/* Thumbnail Image */}
            <div className="space-y-2">
              <h3 className="text-sm text-[#1A73E8]">Thumbnail Image *</h3>
              <ImageUploader
                currentImage={project.image}
                onImageChange={(url) => updateProject(project.id, "image", url)}
                recommendedSize="600x400px"
              />
            </div>

            {/* Gallery Images */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm text-[#1A73E8]">Gallery images</h3>
                  <p className="text-xs text-gray-500">
                    Showcase mode uses this grid with lightbox zoom. Case studies still benefit from a hero thumbnail above.
                  </p>
                </div>
                <p className="text-xs text-gray-500">
                  {project.galleryImages?.length || 0} images
                </p>
              </div>
              
              {project.galleryImages && project.galleryImages.length > 0 && (
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {project.galleryImages.map((img, idx) => (
                    <div key={idx} className="relative group">
                      <img
                        src={img}
                        alt={`Gallery ${idx + 1}`}
                        className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeGalleryImage(project.id, idx)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <ImageUploader
                currentImage=""
                onImageChange={(url) => addGalleryImage(project.id, url)}
                recommendedSize="800x600px"
                label="Add Gallery Image"
              />
            </div>

            {/* Tags & Tools */}
            <div className="space-y-4">
              <h3 className="text-sm text-[#1A73E8]">Tags & Tools</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tags (comma-separated)</Label>
                  <Input
                    value={project.tags.join(", ")}
                    onChange={(e) => updateTags(project.id, e.target.value)}
                    placeholder="e.g., UI/UX, Mobile, Finance"
                  />
                  <p className="text-xs text-gray-500">
                    {project.tags.length} tags
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>Tools Used (comma-separated)</Label>
                  <Input
                    value={(project.toolsUsed || []).join(", ")}
                    onChange={(e) => updateToolsUsed(project.id, e.target.value)}
                    placeholder="e.g., Figma, Adobe XD, Sketch"
                  />
                  <p className="text-xs text-gray-500">
                    {project.toolsUsed?.length || 0} tools
                  </p>
                </div>
              </div>
            </div>

            {/* Projects page behavior */}
            <div className="space-y-4 rounded-xl border border-gray-200 bg-[#fafbfc] p-4 md:p-5">
              <h3 className="text-sm text-[#1A73E8]">Projects page behavior</h3>
              <p className="text-xs text-gray-600">
                Choose whether this entry appears as a narrative case study card or as a visual showcase block on the public Projects page.
              </p>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Presentation</Label>
                  <Select
                    value={project.presentation}
                    onValueChange={(v) => {
                      const next = v as ProjectPresentation;
                      if (next === "case-study") {
                        patchProject(project.id, {
                          presentation: next,
                          showcaseKind: undefined,
                          caseStudyId: project.caseStudyId?.trim() || project.id,
                        });
                      } else {
                        patchProject(project.id, {
                          presentation: next,
                          showcaseKind: project.showcaseKind ?? "web",
                          caseStudyId: undefined,
                        });
                      }
                    }}
                  >
                    <SelectTrigger className="w-full bg-white">
                      <SelectValue placeholder="Choose mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="showcase">Visual showcase (grid + lightbox)</SelectItem>
                      <SelectItem value="case-study">Case study (card → narrative)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {project.presentation === "showcase" ? (
                  <div className="space-y-2">
                    <Label>Showcase filter</Label>
                    <Select
                      value={project.showcaseKind ?? "web"}
                      onValueChange={(v) =>
                        updateProject(project.id, "showcaseKind", v as ShowcaseKind)
                      }
                    >
                      <SelectTrigger className="w-full bg-white">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="branding">Branding</SelectItem>
                        <SelectItem value="saas">SaaS / product UI</SelectItem>
                        <SelectItem value="dashboard">Dashboard</SelectItem>
                        <SelectItem value="ecommerce">E-commerce</SelectItem>
                        <SelectItem value="mobile">Mobile</SelectItem>
                        <SelectItem value="web">Web / marketing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label>Case study slug</Label>
                    <Input
                      value={project.caseStudyId ?? ""}
                      onChange={(e) => updateProject(project.id, "caseStudyId", e.target.value)}
                      placeholder={`Default: ${project.id}`}
                    />
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Opens{" "}
                      <code className="rounded bg-gray-100 px-1 py-0.5 text-[11px]">#case-study/&lt;slug&gt;</code>.
                      Bundled long-form pages in this template: {FEATURED_CASE_STUDY_IDS.join(", ")}.
                    </p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label>Impact line</Label>
                  <Input
                    value={project.impact ?? ""}
                    onChange={(e) => updateProject(project.id, "impact", e.target.value)}
                    placeholder="e.g., 40% faster workflows"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Input
                    value={project.role ?? ""}
                    onChange={(e) => updateProject(project.id, "role", e.target.value)}
                    placeholder="e.g., Lead product designer"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Timeline</Label>
                  <Input
                    value={project.timeline ?? ""}
                    onChange={(e) => updateProject(project.id, "timeline", e.target.value)}
                    placeholder="e.g., 12 weeks"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label>Problem (optional)</Label>
                  <Textarea
                    value={project.problem ?? ""}
                    onChange={(e) => updateProject(project.id, "problem", e.target.value)}
                    rows={3}
                    placeholder="Stored for exports / future CMS tie-ins"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Solution (optional)</Label>
                  <Textarea
                    value={project.solution ?? ""}
                    onChange={(e) => updateProject(project.id, "solution", e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Process (optional)</Label>
                  <Textarea
                    value={project.process ?? ""}
                    onChange={(e) => updateProject(project.id, "process", e.target.value)}
                    rows={3}
                    placeholder="e.g., Research → IA → Prototypes"
                  />
                </div>
              </div>
            </div>

            {/* Settings */}
            <div className="space-y-4">
              <h3 className="text-sm text-[#1A73E8]">Display Settings</h3>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <Label className="text-sm">Featured Project</Label>
                  <p className="text-xs text-gray-600">Show in featured projects section</p>
                </div>
                <Switch
                  checked={project.featured}
                  onCheckedChange={(checked) =>
                    updateProject(project.id, "featured", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <Label className="text-sm">Hero Featured</Label>
                  <p className="text-xs text-gray-600">Display on homepage hero section</p>
                </div>
                <Switch
                  checked={project.isFeaturedHero || false}
                  onCheckedChange={(checked) =>
                    updateProject(project.id, "isFeaturedHero", checked)
                  }
                />
              </div>
            </div>

            {/* External case study link */}
            <div className="space-y-2">
              <Label>External case study URL (optional)</Label>
              <Input
                value={project.caseStudyUrl || ""}
                onChange={(e) => updateProject(project.id, "caseStudyUrl", e.target.value)}
                placeholder="https://medium.com/… or PDF"
              />
              <p className="text-xs text-gray-500">
                Separate from the in-site narrative route; use for Medium, Behance, or PDF hand-offs.
              </p>
            </div>
          </CardContent>
        </Card>
      ))}

      {data.projects.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <ImageIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 mb-4">No projects added yet</p>
            <Button onClick={addProject}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Project
            </Button>
          </CardContent>
        </Card>
      )}

      <Button onClick={handleSave} className="w-full" size="lg">
        <Save className="w-4 h-4 mr-2" />
        Save All Projects
      </Button>

      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm mb-2 text-[#1A73E8]">Projects editor tips</h4>
        <ul className="text-xs text-gray-700 space-y-1">
          <li>• Use ↑↓ to set display order on the live Projects page (enabled items only).</li>
          <li>• Presentation splits entries between case study cards and visual showcase grids.</li>
          <li>• Showcase filter maps to the chip filters on Projects; add many frames via gallery uploads.</li>
          <li>• Case study slug must match a bundled narrative (see list under slug field) unless you extend code.</li>
          <li>• Toggle visibility to stage work without deleting rows.</li>
        </ul>
      </div>
    </div>
  );
}
