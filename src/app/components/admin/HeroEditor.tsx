import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Save } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { getPortfolioData, savePortfolioData } from "../../data/portfolioData";

export function HeroEditor() {
  const [data, setData] = useState(getPortfolioData().hero);

  const handleSave = () => {
    const portfolioData = getPortfolioData();
    portfolioData.hero = data;
    savePortfolioData(portfolioData);
    toast.success("Hero section saved!");
    window.dispatchEvent(new Event("portfolioDataUpdated"));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hero Section</CardTitle>
        <CardDescription>Customize the main hero section on your homepage</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="statusText">Status Badge Text</Label>
          <Input
            id="statusText"
            value={data.statusText}
            onChange={(e) => setData({ ...data, statusText: e.target.value })}
            placeholder="e.g., Open to New Opportunities"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="headline">Main Headline</Label>
          <Input
            id="headline"
            value={data.headline}
            onChange={(e) => setData({ ...data, headline: e.target.value })}
            placeholder="Your name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="subheadline">Sub-headline</Label>
          <Input
            id="subheadline"
            value={data.subheadline}
            onChange={(e) => setData({ ...data, subheadline: e.target.value })}
            placeholder="Your title or tagline"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            placeholder="Brief description of your work and goals"
            rows={4}
          />
        </div>

        <Button onClick={handleSave} className="w-full">
          <Save className="w-4 h-4 mr-2" />
          Save Hero Section
        </Button>
      </CardContent>
    </Card>
  );
}
