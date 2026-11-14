import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { 
  Lock, Download, Upload, Save, Plus, Trash2, Eye, EyeOff, 
  User, Briefcase, Award, FolderOpen, BookOpen, Star, Settings,
  LayoutDashboard, MousePointer, Image as ImageIcon, Globe, Info
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { getPortfolioData, savePortfolioData, exportPortfolioData, importPortfolioData, ADMIN_PASSWORD_KEY } from "../../data/portfolioData";
import { PersonalInfoEditor } from "./PersonalInfoEditor";
import { HeroEditor } from "./HeroEditor";
import { StatsEditor } from "./StatsEditor";
import { SkillsEditor } from "./SkillsEditor";
import { ExperienceEditor } from "./ExperienceEditor";
import { EnhancedProjectsEditor } from "./EnhancedProjectsEditor";
import { CaseStudiesEditor } from "./CaseStudiesEditor";
import { IndustriesEditor } from "./IndustriesEditor";
import { TestimonialsEditor } from "./TestimonialsEditor";
import { AdminWelcome } from "./AdminWelcome";
import { TabManager } from "./TabManager";
import { CTAManager } from "./CTAManager";
import { MediaManager } from "./MediaManager";
import { AboutPageEditor } from "./AboutPageEditor";
import { PagesManager } from "./PagesManager";

interface AdminPanelProps {
  onClose: () => void;
}

export function AdminPanel({ onClose }: AdminPanelProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSettingPassword, setIsSettingPassword] = useState(false);

  useEffect(() => {
    // Check if password is set
    const storedPassword = localStorage.getItem(ADMIN_PASSWORD_KEY);
    if (!storedPassword) {
      setIsSettingPassword(true);
    }
  }, []);

  const handleSetPassword = () => {
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    localStorage.setItem(ADMIN_PASSWORD_KEY, password);
    setIsSettingPassword(false);
    setIsAuthenticated(true);
    setPassword("");
    toast.success("Password set successfully!");
  };

  const handleLogin = () => {
    const storedPassword = localStorage.getItem(ADMIN_PASSWORD_KEY);
    if (password === storedPassword) {
      setIsAuthenticated(true);
      setPassword("");
      toast.success("Logged in successfully!");
    } else {
      toast.error("Incorrect password");
    }
  };

  const handleExport = () => {
    const data = exportPortfolioData();
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `portfolio-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Portfolio data exported successfully!");
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (importPortfolioData(content)) {
        toast.success("Portfolio data imported successfully!");
        // Trigger refresh
        window.dispatchEvent(new Event("portfolioDataUpdated"));
      } else {
        toast.error("Failed to import data. Please check the file format.");
      }
    };
    reader.readAsText(file);
  };

  const handleSave = () => {
    // Data is saved automatically by each editor
    toast.success("All changes saved!");
    window.dispatchEvent(new Event("portfolioDataUpdated"));
  };

  const handleResetPassword = () => {
    if (confirm("Are you sure you want to reset your password? You will need to set a new one.")) {
      localStorage.removeItem(ADMIN_PASSWORD_KEY);
      setIsAuthenticated(false);
      setIsSettingPassword(true);
      toast.info("Password reset. Please set a new password.");
    }
  };

  if (isSettingPassword) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Set Admin Password
            </CardTitle>
            <CardDescription>
              Create a password to secure your admin panel
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password (min. 6 characters)</Label>
              <div className="relative">
                <Input
                  id="new-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  onKeyDown={(e) => e.key === "Enter" && handleSetPassword()}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSetPassword} className="flex-1">
                Set Password
              </Button>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Admin Login
            </CardTitle>
            <CardDescription>
              Enter your password to access the admin panel
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleLogin} className="flex-1">
                Login
              </Button>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-auto">
      <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl text-[#1E1E1E]">Portfolio Admin Panel</h1>
              <p className="text-sm text-gray-600">Manage your portfolio content and images</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
              <Button variant="outline" size="sm" asChild>
                <label className="cursor-pointer">
                  <Upload className="w-4 h-4 mr-2" />
                  Import Data
                  <input
                    type="file"
                    accept="application/json"
                    onChange={handleImport}
                    className="hidden"
                  />
                </label>
              </Button>
              <Button variant="outline" size="sm" onClick={handleResetPassword}>
                <Settings className="w-4 h-4 mr-2" />
                Reset Password
              </Button>
              <Button size="sm" onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save All
              </Button>
              <Button variant="outline" size="sm" onClick={onClose}>
                Close Admin
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs defaultValue="media-manager" className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <h3 className="text-sm mb-1 text-[#1A73E8]">🎉 Welcome to Your Centralized CMS!</h3>
            <p className="text-xs text-gray-700">
              You now have complete control over all pages, images, and content. Start with Media Manager to upload images, then manage each page independently.
            </p>
          </div>

          <TabsList className="grid grid-cols-7 w-full gap-1">
            <TabsTrigger value="media-manager" className="flex items-center gap-1 text-xs">
              <ImageIcon className="w-3 h-3" />
              Media
            </TabsTrigger>
            <TabsTrigger value="pages-manager" className="flex items-center gap-1 text-xs">
              <Globe className="w-3 h-3" />
              Pages
            </TabsTrigger>
            <TabsTrigger value="about-page" className="flex items-center gap-1 text-xs">
              <Info className="w-3 h-3" />
              About
            </TabsTrigger>
            <TabsTrigger value="personal" className="flex items-center gap-1 text-xs">
              <User className="w-3 h-3" />
              Personal
            </TabsTrigger>
            <TabsTrigger value="hero" className="flex items-center gap-1 text-xs">
              <Star className="w-3 h-3" />
              Hero
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-1 text-xs">
              <Award className="w-3 h-3" />
              Stats
            </TabsTrigger>
            <TabsTrigger value="skills" className="flex items-center gap-1 text-xs">
              <Award className="w-3 h-3" />
              Skills
            </TabsTrigger>
            <TabsTrigger value="experience" className="flex items-center gap-1 text-xs">
              <Briefcase className="w-3 h-3" />
              Experience
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-1 text-xs">
              <FolderOpen className="w-3 h-3" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="case-studies" className="flex items-center gap-1 text-xs">
              <BookOpen className="w-3 h-3" />
              Cases
            </TabsTrigger>
            <TabsTrigger value="industries" className="flex items-center gap-1 text-xs">
              <Briefcase className="w-3 h-3" />
              Industries
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="flex items-center gap-1 text-xs">
              <Star className="w-3 h-3" />
              Reviews
            </TabsTrigger>
            <TabsTrigger value="cta-manager" className="flex items-center gap-1 text-xs">
              <MousePointer className="w-3 h-3" />
              CTAs
            </TabsTrigger>
            <TabsTrigger value="tab-manager" className="flex items-center gap-1 text-xs">
              <LayoutDashboard className="w-3 h-3" />
              Tabs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="media-manager">
            <MediaManager />
          </TabsContent>

          <TabsContent value="pages-manager">
            <PagesManager />
          </TabsContent>

          <TabsContent value="about-page">
            <AboutPageEditor />
          </TabsContent>

          <TabsContent value="personal">
            <PersonalInfoEditor />
          </TabsContent>

          <TabsContent value="hero">
            <HeroEditor />
          </TabsContent>

          <TabsContent value="stats">
            <StatsEditor />
          </TabsContent>

          <TabsContent value="skills">
            <SkillsEditor />
          </TabsContent>

          <TabsContent value="experience">
            <ExperienceEditor />
          </TabsContent>

          <TabsContent value="projects">
            <EnhancedProjectsEditor />
          </TabsContent>

          <TabsContent value="case-studies">
            <CaseStudiesEditor />
          </TabsContent>

          <TabsContent value="industries">
            <IndustriesEditor />
          </TabsContent>

          <TabsContent value="testimonials">
            <TestimonialsEditor />
          </TabsContent>

          <TabsContent value="cta-manager">
            <CTAManager />
          </TabsContent>

          <TabsContent value="tab-manager">
            <TabManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}