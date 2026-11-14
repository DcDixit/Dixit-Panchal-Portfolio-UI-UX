import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Switch } from "../ui/switch";
import { Save, Plus, Trash2, ExternalLink, MousePointer } from "lucide-react";
import { toast } from "sonner@2.0.3";

export interface CTAConfig {
  id: string;
  label: string;
  action: "navigate" | "external" | "download" | "scroll";
  target: string;
  enabled: boolean;
  variant: "primary" | "secondary" | "outline";
  location: string;
}

const DEFAULT_CTAS: CTAConfig[] = [
  {
    id: "hero-primary",
    label: "View My Work",
    action: "navigate",
    target: "projects",
    enabled: true,
    variant: "primary",
    location: "Hero Section"
  },
  {
    id: "hero-secondary",
    label: "Download Resume",
    action: "download",
    target: "#",
    enabled: true,
    variant: "secondary",
    location: "Hero Section"
  },
  {
    id: "about-cta",
    label: "Let's Talk",
    action: "navigate",
    target: "contact",
    enabled: true,
    variant: "primary",
    location: "About Page"
  },
  {
    id: "skills-cta",
    label: "View Projects",
    action: "navigate",
    target: "projects",
    enabled: true,
    variant: "primary",
    location: "Skills Page"
  },
  {
    id: "projects-cta",
    label: "Get in Touch",
    action: "navigate",
    target: "contact",
    enabled: true,
    variant: "primary",
    location: "Projects Page"
  }
];

export function CTAManager() {
  const [ctas, setCTAs] = useState<CTAConfig[]>(() => {
    const saved = localStorage.getItem("portfolio_cta_config");
    return saved ? JSON.parse(saved) : DEFAULT_CTAS;
  });

  const handleSave = () => {
    localStorage.setItem("portfolio_cta_config", JSON.stringify(ctas));
    toast.success("CTA configuration saved!");
    window.dispatchEvent(new Event("portfolioDataUpdated"));
  };

  const addCTA = () => {
    const newCTA: CTAConfig = {
      id: `cta-${Date.now()}`,
      label: "New Button",
      action: "navigate",
      target: "projects",
      enabled: true,
      variant: "primary",
      location: "Custom"
    };
    setCTAs([...ctas, newCTA]);
  };

  const removeCTA = (id: string) => {
    setCTAs(ctas.filter(cta => cta.id !== id));
  };

  const updateCTA = (id: string, field: keyof CTAConfig, value: any) => {
    setCTAs(ctas.map(cta => cta.id === id ? { ...cta, [field]: value } : cta));
  };

  const resetToDefault = () => {
    if (confirm("Reset all CTAs to default configuration?")) {
      setCTAs(DEFAULT_CTAS);
      toast.info("CTA configuration reset to default");
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <MousePointer className="w-5 h-5" />
                Call-to-Action Buttons
              </CardTitle>
              <CardDescription>
                Manage all CTA buttons across your portfolio pages
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={resetToDefault}>
                Reset to Default
              </Button>
              <Button variant="outline" size="sm" onClick={addCTA}>
                <Plus className="w-4 h-4 mr-2" />
                Add CTA
              </Button>
              <Button size="sm" onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save All
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {ctas.map((cta, index) => (
        <Card key={cta.id} className={!cta.enabled ? "opacity-60" : ""}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  {cta.label}
                  {!cta.enabled && (
                    <span className="text-xs font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      Disabled
                    </span>
                  )}
                </CardTitle>
                <CardDescription>{cta.location}</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <Label className="text-xs">Enabled</Label>
                  <Switch
                    checked={cta.enabled}
                    onCheckedChange={(checked) => updateCTA(cta.id, "enabled", checked)}
                  />
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeCTA(cta.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Button Label</Label>
                <Input
                  value={cta.label}
                  onChange={(e) => updateCTA(cta.id, "label", e.target.value)}
                  placeholder="e.g., View My Work"
                />
              </div>

              <div className="space-y-2">
                <Label>Location/Page</Label>
                <Input
                  value={cta.location}
                  onChange={(e) => updateCTA(cta.id, "location", e.target.value)}
                  placeholder="e.g., Hero Section"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Action Type</Label>
                <Select
                  value={cta.action}
                  onValueChange={(value) => updateCTA(cta.id, "action", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="navigate">Navigate (Internal)</SelectItem>
                    <SelectItem value="external">External Link</SelectItem>
                    <SelectItem value="download">Download File</SelectItem>
                    <SelectItem value="scroll">Scroll to Section</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Target / URL</Label>
                <Input
                  value={cta.target}
                  onChange={(e) => updateCTA(cta.id, "target", e.target.value)}
                  placeholder={
                    cta.action === "navigate" 
                      ? "e.g., projects" 
                      : cta.action === "external"
                      ? "e.g., https://..."
                      : cta.action === "download"
                      ? "e.g., /resume.pdf"
                      : "e.g., #contact"
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Button Style</Label>
                <Select
                  value={cta.variant}
                  onValueChange={(value) => updateCTA(cta.id, "variant", value as any)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="primary">Primary (Blue)</SelectItem>
                    <SelectItem value="secondary">Secondary (Orange)</SelectItem>
                    <SelectItem value="outline">Outline</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Preview */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <Label className="text-xs text-gray-500 mb-2 block">Preview:</Label>
              <div className="flex gap-2">
                <Button
                  variant={cta.variant === "outline" ? "outline" : "default"}
                  className={
                    cta.variant === "secondary"
                      ? "bg-[#FF6F3C] hover:bg-[#E65A2C] text-white"
                      : cta.variant === "primary"
                      ? "bg-[#1A73E8] hover:bg-[#1557B0] text-white"
                      : ""
                  }
                  disabled={!cta.enabled}
                >
                  {cta.label}
                  {cta.action === "external" && <ExternalLink className="w-4 h-4 ml-2" />}
                </Button>
                <div className="flex items-center text-xs text-gray-500">
                  <span>→ {cta.action === "navigate" ? `Go to ${cta.target}` : cta.target}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-medium text-sm text-blue-900 mb-2">💡 CTA Best Practices:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Use action-oriented labels (e.g., "View Projects" instead of "Click Here")</li>
          <li>• Limit to 1-2 CTAs per section to avoid overwhelming users</li>
          <li>• Use Primary style for main actions, Secondary for alternative options</li>
          <li>• Ensure CTAs are clearly visible and properly contrasted</li>
        </ul>
      </div>
    </div>
  );
}
