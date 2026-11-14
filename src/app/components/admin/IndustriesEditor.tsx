import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Save, Plus, Trash2, GripVertical, ChevronUp, ChevronDown } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { getPortfolioData, savePortfolioData } from "../../data/portfolioData";
import { IconPicker } from "./IconPicker";

export function IndustriesEditor() {
  const [industries, setIndustries] = useState(getPortfolioData().industries);

  const handleSave = () => {
    const portfolioData = getPortfolioData();
    portfolioData.industries = industries;
    savePortfolioData(portfolioData);
    toast.success("Industries saved!");
    window.dispatchEvent(new Event("portfolioDataUpdated"));
  };

  const addIndustry = () => {
    const newIndustry = {
      id: Date.now().toString(),
      title: "New Industry",
      description: "Industry description",
      projectCount: "0+ Projects",
      icon: "Layers"
    };
    setIndustries([...industries, newIndustry]);
  };

  const removeIndustry = (id: string) => {
    setIndustries(industries.filter(i => i.id !== id));
  };

  const updateIndustry = (id: string, field: string, value: any) => {
    setIndustries(industries.map(i => i.id === id ? { ...i, [field]: value } : i));
  };

  const moveIndustryUp = (id: string) => {
    const index = industries.findIndex(i => i.id === id);
    if (index > 0) {
      const newIndustries = [...industries];
      [newIndustries[index], newIndustries[index - 1]] = [newIndustries[index - 1], newIndustries[index]];
      setIndustries(newIndustries);
    }
  };

  const moveIndustryDown = (id: string) => {
    const index = industries.findIndex(i => i.id === id);
    if (index < industries.length - 1) {
      const newIndustries = [...industries];
      [newIndustries[index], newIndustries[index + 1]] = [newIndustries[index + 1], newIndustries[index]];
      setIndustries(newIndustries);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Industry Experience</CardTitle>
              <CardDescription>Manage the industries you've worked in</CardDescription>
            </div>
            <Button onClick={addIndustry} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Industry
            </Button>
          </div>
        </CardHeader>
      </Card>

      {industries.map((industry, index) => (
        <Card key={industry.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                {industry.title || `Industry ${index + 1}`}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => moveIndustryUp(industry.id)}
                  disabled={index === 0}
                >
                  <ChevronUp className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => moveIndustryDown(industry.id)}
                  disabled={index === industries.length - 1}
                >
                  <ChevronDown className="w-4 h-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeIndustry(industry.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Industry Title</Label>
                <Input
                  value={industry.title}
                  onChange={(e) => updateIndustry(industry.id, "title", e.target.value)}
                  placeholder="e.g., Automotive Industry"
                />
              </div>
              <div className="space-y-2">
                <Label>Project Count</Label>
                <Input
                  value={industry.projectCount}
                  onChange={(e) => updateIndustry(industry.id, "projectCount", e.target.value)}
                  placeholder="e.g., 12+ Projects"
                />
              </div>
            </div>

            <IconPicker
              label="Icon"
              value={industry.icon}
              onChange={(value) => updateIndustry(industry.id, "icon", value)}
              helpText="Select an icon that represents this industry"
            />

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={industry.description}
                onChange={(e) => updateIndustry(industry.id, "description", e.target.value)}
                placeholder="Brief description of your work in this industry"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      ))}

      <Button onClick={handleSave} className="w-full">
        <Save className="w-4 h-4 mr-2" />
        Save All Industries
      </Button>
    </div>
  );
}