import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { 
  GripVertical, Eye, EyeOff, ChevronUp, ChevronDown, 
  LayoutDashboard, Settings 
} from "lucide-react";
import { toast } from "sonner@2.0.3";

export interface TabConfig {
  id: string;
  name: string;
  icon: string;
  enabled: boolean;
  order: number;
  description: string;
}

const DEFAULT_TABS: TabConfig[] = [
  { id: "personal", name: "Personal Info", icon: "User", enabled: true, order: 0, description: "Your personal details and contact information" },
  { id: "hero", name: "Hero Section", icon: "Star", enabled: true, order: 1, description: "Main landing section content" },
  { id: "stats", name: "Statistics", icon: "Award", enabled: true, order: 2, description: "Your achievements and metrics" },
  { id: "skills", name: "Skills", icon: "Layers", enabled: true, order: 3, description: "Your technical and design skills" },
  { id: "experience", name: "Experience", icon: "Briefcase", enabled: true, order: 4, description: "Work history and career timeline" },
  { id: "projects", name: "Projects", icon: "FolderOpen", enabled: true, order: 5, description: "Portfolio projects showcase" },
  { id: "case-studies", name: "Case Studies", icon: "BookOpen", enabled: true, order: 6, description: "Detailed project case studies" },
  { id: "industries", name: "Industries", icon: "Building", enabled: true, order: 7, description: "Industry experience and expertise" },
  { id: "testimonials", name: "Testimonials", icon: "MessageSquare", enabled: true, order: 8, description: "Client feedback and reviews" },
];

export function TabManager() {
  const [tabs, setTabs] = useState<TabConfig[]>(() => {
    const saved = localStorage.getItem("portfolio_tab_config");
    return saved ? JSON.parse(saved) : DEFAULT_TABS;
  });

  const handleSave = () => {
    localStorage.setItem("portfolio_tab_config", JSON.stringify(tabs));
    toast.success("Tab configuration saved!");
    window.dispatchEvent(new Event("portfolioDataUpdated"));
  };

  const toggleTab = (id: string) => {
    setTabs(tabs.map(tab => 
      tab.id === id ? { ...tab, enabled: !tab.enabled } : tab
    ));
  };

  const moveTab = (index: number, direction: "up" | "down") => {
    const newTabs = [...tabs];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    
    if (targetIndex < 0 || targetIndex >= tabs.length) return;
    
    // Swap tabs
    [newTabs[index], newTabs[targetIndex]] = [newTabs[targetIndex], newTabs[index]];
    
    // Update order values
    newTabs.forEach((tab, idx) => {
      tab.order = idx;
    });
    
    setTabs(newTabs);
  };

  const resetToDefault = () => {
    if (confirm("Are you sure you want to reset tab configuration to default?")) {
      setTabs(DEFAULT_TABS);
      toast.info("Tab configuration reset to default");
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <LayoutDashboard className="w-5 h-5" />
                Tab Management
              </CardTitle>
              <CardDescription>
                Control which tabs are visible and their order in the admin panel
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={resetToDefault}>
                <Settings className="w-4 h-4 mr-2" />
                Reset to Default
              </Button>
              <Button size="sm" onClick={handleSave}>
                Save Configuration
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="grid grid-cols-12 gap-4 px-4 py-2 bg-gray-100 rounded-lg text-sm">
              <div className="col-span-1"></div>
              <div className="col-span-3">Tab Name</div>
              <div className="col-span-4">Description</div>
              <div className="col-span-2 text-center">Status</div>
              <div className="col-span-2 text-center">Order</div>
            </div>

            {tabs.map((tab, index) => (
              <div
                key={tab.id}
                className={`grid grid-cols-12 gap-4 items-center p-4 border rounded-lg transition-all ${
                  tab.enabled ? "bg-white" : "bg-gray-50 opacity-60"
                }`}
              >
                <div className="col-span-1 flex items-center">
                  <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
                </div>

                <div className="col-span-3">
                  <p className="font-medium text-sm">{tab.name}</p>
                  <p className="text-xs text-gray-500">{tab.icon}</p>
                </div>

                <div className="col-span-4">
                  <p className="text-sm text-gray-600">{tab.description}</p>
                </div>

                <div className="col-span-2 flex items-center justify-center gap-2">
                  <Switch
                    checked={tab.enabled}
                    onCheckedChange={() => toggleTab(tab.id)}
                  />
                  <div className="flex items-center gap-1 text-sm">
                    {tab.enabled ? (
                      <>
                        <Eye className="w-4 h-4 text-green-600" />
                        <span className="text-green-600">Enabled</span>
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-400">Disabled</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="col-span-2 flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => moveTab(index, "up")}
                    disabled={index === 0}
                  >
                    <ChevronUp className="w-4 h-4" />
                  </Button>
                  <span className="text-sm font-medium w-8 text-center">{index + 1}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => moveTab(index, "down")}
                    disabled={index === tabs.length - 1}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-sm text-blue-900 mb-2">ℹ️ How to use:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Toggle the switch to enable/disable specific tabs</li>
              <li>• Use the arrow buttons to reorder tabs</li>
              <li>• Disabled tabs won't appear in the admin panel but data is preserved</li>
              <li>• Click "Save Configuration" to apply changes</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
