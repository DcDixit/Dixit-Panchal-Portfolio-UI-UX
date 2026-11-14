import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Switch } from "../ui/switch";
import { Save, Eye, EyeOff, Home, User, Award, FolderOpen, BookOpen, Mail } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { getPortfolioData, savePortfolioData } from "../../data/portfolioData";

const PAGE_ICONS = {
  home: Home,
  about: User,
  skills: Award,
  projects: FolderOpen,
  caseStudy: BookOpen,
  contact: Mail
};

const PAGE_NAMES = {
  home: "Home Page",
  about: "About Page",
  skills: "Skills Page",
  projects: "Projects Page",
  caseStudy: "Case Study Page",
  contact: "Contact Page"
};

export function PagesManager() {
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
    toast.success("Pages configuration saved successfully!");
    window.dispatchEvent(new Event("portfolioDataUpdated"));
  };

  const handleTogglePage = (pageKey: keyof typeof data.pages, enabled: boolean) => {
    setData({
      ...data,
      pages: {
        ...data.pages,
        [pageKey]: {
          ...data.pages[pageKey],
          enabled
        }
      }
    });
  };

  const handleUpdateSEO = (pageKey: keyof typeof data.pages, field: 'seoTitle' | 'seoDescription', value: string) => {
    setData({
      ...data,
      pages: {
        ...data.pages,
        [pageKey]: {
          ...data.pages[pageKey],
          [field]: value
        }
      }
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Pages Manager</CardTitle>
          <CardDescription>
            Control which pages are visible on your portfolio and manage SEO settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.entries(data.pages).map(([pageKey, pageData]) => {
              const Icon = PAGE_ICONS[pageKey as keyof typeof PAGE_ICONS];
              const pageName = PAGE_NAMES[pageKey as keyof typeof PAGE_NAMES];

              return (
                <Card key={pageKey} className="bg-gray-50">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {/* Page Header */}
                      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-[#1A73E8]/10 flex items-center justify-center">
                            <Icon className="w-6 h-6 text-[#1A73E8]" />
                          </div>
                          <div>
                            <h3 className="font-medium">{pageName}</h3>
                            <p className="text-sm text-gray-600">/{pageKey === 'home' ? '' : pageKey}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            {pageData.enabled ? (
                              <Eye className="w-4 h-4 text-green-600" />
                            ) : (
                              <EyeOff className="w-4 h-4 text-gray-400" />
                            )}
                            <Label className="text-sm">
                              {pageData.enabled ? "Visible" : "Hidden"}
                            </Label>
                          </div>
                          <Switch
                            checked={pageData.enabled}
                            onCheckedChange={(checked) =>
                              handleTogglePage(pageKey as keyof typeof data.pages, checked)
                            }
                          />
                        </div>
                      </div>

                      {/* SEO Settings */}
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm mb-3 text-gray-700">SEO Settings (Optional)</h4>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`${pageKey}-seo-title`}>Page Title (SEO)</Label>
                          <Input
                            id={`${pageKey}-seo-title`}
                            value={pageData.seoTitle}
                            onChange={(e) =>
                              handleUpdateSEO(pageKey as keyof typeof data.pages, 'seoTitle', e.target.value)
                            }
                            placeholder={`e.g., ${pageName} - Dixit Panchal`}
                            disabled={!pageData.enabled}
                          />
                          <p className="text-xs text-gray-500">
                            Recommended: 50-60 characters ({pageData.seoTitle.length}/60)
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`${pageKey}-seo-description`}>Meta Description (SEO)</Label>
                          <Textarea
                            id={`${pageKey}-seo-description`}
                            value={pageData.seoDescription}
                            onChange={(e) =>
                              handleUpdateSEO(pageKey as keyof typeof data.pages, 'seoDescription', e.target.value)
                            }
                            placeholder={`e.g., Explore ${pageName.toLowerCase()} showcasing 9+ years of UI/UX design experience...`}
                            rows={2}
                            disabled={!pageData.enabled}
                          />
                          <p className="text-xs text-gray-500">
                            Recommended: 150-160 characters ({pageData.seoDescription.length}/160)
                          </p>
                        </div>
                      </div>

                      {!pageData.enabled && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                          <p className="text-xs text-yellow-800">
                            ⚠️ This page is currently hidden. It won't appear in navigation or be accessible to visitors.
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card className="bg-gray-50">
        <CardHeader>
          <CardTitle className="text-sm">Page Visibility Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
              <p className="text-2xl text-[#1A73E8]">
                {Object.values(data.pages).filter(p => p.enabled).length}
              </p>
              <p className="text-xs text-gray-600 mt-1">Visible Pages</p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
              <p className="text-2xl text-gray-400">
                {Object.values(data.pages).filter(p => !p.enabled).length}
              </p>
              <p className="text-xs text-gray-600 mt-1">Hidden Pages</p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
              <p className="text-2xl text-[#1A73E8]">
                {Object.keys(data.pages).length}
              </p>
              <p className="text-xs text-gray-600 mt-1">Total Pages</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg">
          <Save className="w-4 h-4 mr-2" />
          Save Pages Configuration
        </Button>
      </div>

      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm mb-2 text-[#1A73E8]">💡 Pages Manager Tips</h4>
        <ul className="text-xs text-gray-700 space-y-1">
          <li>• Use page visibility to control which sections visitors can access</li>
          <li>• SEO titles appear in browser tabs and search results</li>
          <li>• Meta descriptions help search engines understand your pages</li>
          <li>• Hidden pages won't show in navigation but data is preserved</li>
          <li>• At least one page should be visible for the portfolio to work</li>
        </ul>
      </div>
    </div>
  );
}
