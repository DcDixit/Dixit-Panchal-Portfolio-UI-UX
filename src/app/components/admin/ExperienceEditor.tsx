import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Save, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { getPortfolioData, savePortfolioData } from "../../data/portfolioData";

export function ExperienceEditor() {
  const [experiences, setExperiences] = useState(getPortfolioData().experience);

  const handleSave = () => {
    const portfolioData = getPortfolioData();
    portfolioData.experience = experiences;
    savePortfolioData(portfolioData);
    toast.success("Experience saved!");
    window.dispatchEvent(new Event("portfolioDataUpdated"));
  };

  const addExperience = () => {
    const newExperience = {
      id: Date.now().toString(),
      role: "Job Title",
      company: "Company Name",
      period: "2020 - 2024",
      location: "City, Country",
      description: "Brief description of your role",
      achievements: ["Achievement 1", "Achievement 2"]
    };
    setExperiences([...experiences, newExperience]);
  };

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter(e => e.id !== id));
  };

  const updateExperience = (id: string, field: string, value: any) => {
    setExperiences(experiences.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const updateAchievement = (expId: string, index: number, value: string) => {
    setExperiences(experiences.map(e => {
      if (e.id === expId) {
        const newAchievements = [...e.achievements];
        newAchievements[index] = value;
        return { ...e, achievements: newAchievements };
      }
      return e;
    }));
  };

  const addAchievement = (expId: string) => {
    setExperiences(experiences.map(e => {
      if (e.id === expId) {
        return { ...e, achievements: [...e.achievements, "New achievement"] };
      }
      return e;
    }));
  };

  const removeAchievement = (expId: string, index: number) => {
    setExperiences(experiences.map(e => {
      if (e.id === expId) {
        return { ...e, achievements: e.achievements.filter((_, i) => i !== index) };
      }
      return e;
    }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Work Experience</CardTitle>
              <CardDescription>Manage your professional experience</CardDescription>
            </div>
            <Button onClick={addExperience} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Experience
            </Button>
          </div>
        </CardHeader>
      </Card>

      {experiences.map((exp, index) => (
        <Card key={exp.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Experience {index + 1}</CardTitle>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => removeExperience(exp.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Role</Label>
                <Input
                  value={exp.role}
                  onChange={(e) => updateExperience(exp.id, "role", e.target.value)}
                  placeholder="Job title"
                />
              </div>
              <div className="space-y-2">
                <Label>Company</Label>
                <Input
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                  placeholder="Company name"
                />
              </div>
              <div className="space-y-2">
                <Label>Period</Label>
                <Input
                  value={exp.period}
                  onChange={(e) => updateExperience(exp.id, "period", e.target.value)}
                  placeholder="2020 - 2024"
                />
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  value={exp.location}
                  onChange={(e) => updateExperience(exp.id, "location", e.target.value)}
                  placeholder="City, Country"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={exp.description}
                onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                placeholder="Brief description of your role"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Achievements</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addAchievement(exp.id)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Achievement
                </Button>
              </div>
              <div className="space-y-2">
                {exp.achievements.map((achievement, achIndex) => (
                  <div key={achIndex} className="flex gap-2">
                    <Input
                      value={achievement}
                      onChange={(e) => updateAchievement(exp.id, achIndex, e.target.value)}
                      placeholder="Achievement or responsibility"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeAchievement(exp.id, achIndex)}
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

      <Button onClick={handleSave} className="w-full">
        <Save className="w-4 h-4 mr-2" />
        Save All Experience
      </Button>
    </div>
  );
}
