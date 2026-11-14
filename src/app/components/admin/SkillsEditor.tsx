import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Save, Plus, Trash2, ArrowUp, ArrowDown, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { getPortfolioData, savePortfolioData } from "../../data/portfolioData";
import { IconPicker } from "./IconPicker";

export function SkillsEditor() {
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
    toast.success("Skills saved successfully!");
    window.dispatchEvent(new Event("portfolioDataUpdated"));
  };

  const addSkillCategory = () => {
    const newSkill = {
      id: Date.now().toString(),
      category: "New Category",
      items: ["Skill 1", "Skill 2"],
      icon: "Eye",
      enabled: true,
      order: data.skills.length + 1,
      description: "Add a description for this skill category"
    };
    setData({
      ...data,
      skills: [...data.skills, newSkill]
    });
  };

  const removeSkillCategory = (id: string) => {
    setData({
      ...data,
      skills: data.skills.filter(s => s.id !== id)
    });
  };

  const updateSkillCategory = (id: string, field: string, value: any) => {
    setData({
      ...data,
      skills: data.skills.map(s => s.id === id ? { ...s, [field]: value } : s)
    });
  };

  const reorderSkill = (id: string, direction: 'up' | 'down') => {
    const skills = [...data.skills].sort((a, b) => a.order - b.order);
    const index = skills.findIndex(s => s.id === id);
    
    if (direction === 'up' && index > 0) {
      [skills[index], skills[index - 1]] = [skills[index - 1], skills[index]];
    } else if (direction === 'down' && index < skills.length - 1) {
      [skills[index], skills[index + 1]] = [skills[index + 1], skills[index]];
    }

    // Update order numbers
    skills.forEach((skill, idx) => {
      skill.order = idx + 1;
    });

    setData({
      ...data,
      skills: skills
    });
  };

  const updateSkillItem = (skillId: string, index: number, value: string) => {
    setData({
      ...data,
      skills: data.skills.map(s => {
        if (s.id === skillId) {
          const newItems = [...s.items];
          newItems[index] = value;
          return { ...s, items: newItems };
        }
        return s;
      })
    });
  };

  const addSkillItem = (skillId: string) => {
    setData({
      ...data,
      skills: data.skills.map(s => {
        if (s.id === skillId) {
          return { ...s, items: [...s.items, "New Skill"] };
        }
        return s;
      })
    });
  };

  const removeSkillItem = (skillId: string, index: number) => {
    setData({
      ...data,
      skills: data.skills.map(s => {
        if (s.id === skillId) {
          return { ...s, items: s.items.filter((_, i) => i !== index) };
        }
        return s;
      })
    });
  };

  const sortedSkills = [...data.skills].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Skills Management</CardTitle>
              <CardDescription>Manage your skill categories, items, and display order</CardDescription>
            </div>
            <Button onClick={addSkillCategory} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </Button>
          </div>
        </CardHeader>
      </Card>

      {sortedSkills.map((skill, skillIndex) => (
        <Card key={skill.id} className={!skill.enabled ? "opacity-60" : ""}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Switch
                  checked={skill.enabled}
                  onCheckedChange={(checked) =>
                    updateSkillCategory(skill.id, "enabled", checked)
                  }
                />
                {skill.enabled ? (
                  <Eye className="w-4 h-4 text-green-600" />
                ) : (
                  <EyeOff className="w-4 h-4 text-gray-400" />
                )}
                <CardTitle className="text-lg">
                  {skill.category || `Category ${skillIndex + 1}`}
                </CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => reorderSkill(skill.id, 'up')}
                  disabled={skillIndex === 0}
                  title="Move Up"
                >
                  <ArrowUp className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => reorderSkill(skill.id, 'down')}
                  disabled={skillIndex === sortedSkills.length - 1}
                  title="Move Down"
                >
                  <ArrowDown className="w-4 h-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeSkillCategory(skill.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category Name</Label>
                <Input
                  value={skill.category}
                  onChange={(e) => updateSkillCategory(skill.id, "category", e.target.value)}
                  placeholder="e.g., UI/UX Design"
                />
              </div>
              <div className="space-y-2">
                <Label>Icon</Label>
                <IconPicker
                  selectedIcon={skill.icon}
                  onIconSelect={(icon) => updateSkillCategory(skill.id, "icon", icon)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Category Description (Optional)</Label>
              <Textarea
                value={skill.description || ""}
                onChange={(e) => updateSkillCategory(skill.id, "description", e.target.value)}
                placeholder="Brief description of this skill category..."
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Skills in this category</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addSkillItem(skill.id)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Skill
                </Button>
              </div>
              <div className="space-y-2">
                {skill.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex gap-2">
                    <Input
                      value={item}
                      onChange={(e) => updateSkillItem(skill.id, itemIndex, e.target.value)}
                      placeholder="Skill name"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeSkillItem(skill.id, itemIndex)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {data.skills.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-500 mb-4">No skill categories added yet</p>
            <Button onClick={addSkillCategory}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Skill Category
            </Button>
          </CardContent>
        </Card>
      )}

      <Button onClick={handleSave} className="w-full" size="lg">
        <Save className="w-4 h-4 mr-2" />
        Save All Skills
      </Button>

      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm mb-2 text-[#1A73E8]">💡 Skills Management Tips</h4>
        <ul className="text-xs text-gray-700 space-y-1">
          <li>• Use ↑↓ arrows to reorder skill categories</li>
          <li>• Toggle visibility to temporarily hide skills without deleting</li>
          <li>• Add descriptions to provide context for each category</li>
          <li>• Choose icons that represent each skill category</li>
          <li>• Group related skills under meaningful categories</li>
        </ul>
      </div>
    </div>
  );
}