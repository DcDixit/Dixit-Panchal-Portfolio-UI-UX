import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Save } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { getPortfolioData, savePortfolioData } from "../../data/portfolioData";

export function StatsEditor() {
  const [data, setData] = useState(getPortfolioData().stats);

  const handleSave = () => {
    const portfolioData = getPortfolioData();
    portfolioData.stats = data;
    savePortfolioData(portfolioData);
    toast.success("Statistics saved!");
    window.dispatchEvent(new Event("portfolioDataUpdated"));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Statistics</CardTitle>
        <CardDescription>Update your portfolio statistics and achievements</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="projectsCompleted">Projects Completed</Label>
            <Input
              id="projectsCompleted"
              value={data.projectsCompleted}
              onChange={(e) => setData({ ...data, projectsCompleted: e.target.value })}
              placeholder="e.g., 200+"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="happyClients">Happy Clients</Label>
            <Input
              id="happyClients"
              value={data.happyClients}
              onChange={(e) => setData({ ...data, happyClients: e.target.value })}
              placeholder="e.g., 50+"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="awards">Awards Won</Label>
            <Input
              id="awards"
              value={data.awards}
              onChange={(e) => setData({ ...data, awards: e.target.value })}
              placeholder="e.g., 15+"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience">Years of Experience</Label>
            <Input
              id="experience"
              value={data.experience}
              onChange={(e) => setData({ ...data, experience: e.target.value })}
              placeholder="e.g., 9+"
            />
          </div>
        </div>

        <Button onClick={handleSave} className="w-full">
          <Save className="w-4 h-4 mr-2" />
          Save Statistics
        </Button>
      </CardContent>
    </Card>
  );
}
