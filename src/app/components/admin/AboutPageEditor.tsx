import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Switch } from "../ui/switch";
import { Plus, Trash2, Save, ArrowUp, ArrowDown, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { getPortfolioData, savePortfolioData } from "../../data/portfolioData";
import { ImageUploader } from "./ImageUploader";
import { IconPicker } from "./IconPicker";

export function AboutPageEditor() {
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
    toast.success("About Page updated successfully!");
    window.dispatchEvent(new Event("portfolioDataUpdated"));
  };

  const handleAddHighlight = () => {
    const newHighlight = {
      id: Date.now().toString(),
      title: "New Highlight",
      value: "0",
      icon: "Star",
      enabled: true
    };

    setData({
      ...data,
      aboutPage: {
        ...data.aboutPage,
        highlights: [...data.aboutPage.highlights, newHighlight]
      }
    });
  };

  const handleDeleteHighlight = (id: string) => {
    setData({
      ...data,
      aboutPage: {
        ...data.aboutPage,
        highlights: data.aboutPage.highlights.filter(h => h.id !== id)
      }
    });
  };

  const handleUpdateHighlight = (id: string, field: string, value: any) => {
    setData({
      ...data,
      aboutPage: {
        ...data.aboutPage,
        highlights: data.aboutPage.highlights.map(h =>
          h.id === id ? { ...h, [field]: value } : h
        )
      }
    });
  };

  const handleAddContentBlock = () => {
    const newBlock = {
      id: Date.now().toString(),
      title: "New Section",
      content: "Add your content here...",
      enabled: true,
      order: data.aboutPage.contentBlocks.length + 1
    };

    setData({
      ...data,
      aboutPage: {
        ...data.aboutPage,
        contentBlocks: [...data.aboutPage.contentBlocks, newBlock]
      }
    });
  };

  const handleDeleteContentBlock = (id: string) => {
    setData({
      ...data,
      aboutPage: {
        ...data.aboutPage,
        contentBlocks: data.aboutPage.contentBlocks.filter(b => b.id !== id)
      }
    });
  };

  const handleUpdateContentBlock = (id: string, field: string, value: any) => {
    setData({
      ...data,
      aboutPage: {
        ...data.aboutPage,
        contentBlocks: data.aboutPage.contentBlocks.map(b =>
          b.id === id ? { ...b, [field]: value } : b
        )
      }
    });
  };

  const handleReorderContentBlock = (id: string, direction: 'up' | 'down') => {
    const blocks = [...data.aboutPage.contentBlocks];
    const index = blocks.findIndex(b => b.id === id);
    
    if (direction === 'up' && index > 0) {
      [blocks[index], blocks[index - 1]] = [blocks[index - 1], blocks[index]];
    } else if (direction === 'down' && index < blocks.length - 1) {
      [blocks[index], blocks[index + 1]] = [blocks[index + 1], blocks[index]];
    }

    // Update order numbers
    blocks.forEach((block, idx) => {
      block.order = idx + 1;
    });

    setData({
      ...data,
      aboutPage: {
        ...data.aboutPage,
        contentBlocks: blocks
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <Card>
        <CardHeader>
          <CardTitle>About Page - Header Section</CardTitle>
          <CardDescription>
            Manage the main title, subtitle, and description for your About page
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="about-title">Page Title</Label>
            <Input
              id="about-title"
              value={data.aboutPage.title}
              onChange={(e) => setData({
                ...data,
                aboutPage: { ...data.aboutPage, title: e.target.value }
              })}
              placeholder="e.g., About Dixit Panchal"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="about-subtitle">Page Subtitle</Label>
            <Input
              id="about-subtitle"
              value={data.aboutPage.subtitle}
              onChange={(e) => setData({
                ...data,
                aboutPage: { ...data.aboutPage, subtitle: e.target.value }
              })}
              placeholder="e.g., Senior UI/UX & Graphic Designer"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="about-description">Page Description</Label>
            <Textarea
              id="about-description"
              value={data.aboutPage.description}
              onChange={(e) => setData({
                ...data,
                aboutPage: { ...data.aboutPage, description: e.target.value }
              })}
              placeholder="Write a brief introduction..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Images */}
      <Card>
        <CardHeader>
          <CardTitle>About Page - Images</CardTitle>
          <CardDescription>
            Upload banner and profile images for the About page
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Banner Image</Label>
            <ImageUploader
              currentImage={data.aboutPage.bannerImage}
              onImageChange={(url) => setData({
                ...data,
                aboutPage: { ...data.aboutPage, bannerImage: url }
              })}
              recommendedSize="1200x400px"
            />
          </div>

          <div className="space-y-2">
            <Label>Profile Image</Label>
            <ImageUploader
              currentImage={data.aboutPage.profileImage}
              onImageChange={(url) => setData({
                ...data,
                aboutPage: { ...data.aboutPage, profileImage: url }
              })}
              recommendedSize="400x400px"
            />
          </div>
        </CardContent>
      </Card>

      {/* Highlights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Highlights / Stats</span>
            <Button onClick={handleAddHighlight} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Highlight
            </Button>
          </CardTitle>
          <CardDescription>
            Showcase key achievements and statistics on your About page
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.aboutPage.highlights.map((highlight, index) => (
            <Card key={highlight.id} className="bg-gray-50">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={highlight.enabled}
                        onCheckedChange={(checked) =>
                          handleUpdateHighlight(highlight.id, "enabled", checked)
                        }
                      />
                      <span className="text-sm">
                        {highlight.enabled ? (
                          <Eye className="w-4 h-4 text-green-600" />
                        ) : (
                          <EyeOff className="w-4 h-4 text-gray-400" />
                        )}
                      </span>
                      <Label className="text-sm">
                        Highlight {index + 1}
                      </Label>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteHighlight(highlight.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input
                        value={highlight.title}
                        onChange={(e) =>
                          handleUpdateHighlight(highlight.id, "title", e.target.value)
                        }
                        placeholder="e.g., Years of Experience"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Value</Label>
                      <Input
                        value={highlight.value}
                        onChange={(e) =>
                          handleUpdateHighlight(highlight.id, "value", e.target.value)
                        }
                        placeholder="e.g., 9+"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Icon</Label>
                    <IconPicker
                      selectedIcon={highlight.icon}
                      onIconSelect={(icon) =>
                        handleUpdateHighlight(highlight.id, "icon", icon)
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {data.aboutPage.highlights.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p className="text-sm">No highlights added yet</p>
              <Button onClick={handleAddHighlight} variant="outline" size="sm" className="mt-2">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Highlight
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Content Blocks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Content Blocks</span>
            <Button onClick={handleAddContentBlock} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Content Block
            </Button>
          </CardTitle>
          <CardDescription>
            Add and manage content sections for your About page
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.aboutPage.contentBlocks
            .sort((a, b) => a.order - b.order)
            .map((block, index) => (
              <Card key={block.id} className="bg-gray-50">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={block.enabled}
                          onCheckedChange={(checked) =>
                            handleUpdateContentBlock(block.id, "enabled", checked)
                          }
                        />
                        <span className="text-sm">
                          {block.enabled ? (
                            <Eye className="w-4 h-4 text-green-600" />
                          ) : (
                            <EyeOff className="w-4 h-4 text-gray-400" />
                          )}
                        </span>
                        <Label className="text-sm">Block {index + 1}</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleReorderContentBlock(block.id, 'up')}
                          disabled={index === 0}
                        >
                          <ArrowUp className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleReorderContentBlock(block.id, 'down')}
                          disabled={index === data.aboutPage.contentBlocks.length - 1}
                        >
                          <ArrowDown className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteContentBlock(block.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Block Title</Label>
                      <Input
                        value={block.title}
                        onChange={(e) =>
                          handleUpdateContentBlock(block.id, "title", e.target.value)
                        }
                        placeholder="e.g., Design Philosophy"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Block Content</Label>
                      <Textarea
                        value={block.content}
                        onChange={(e) =>
                          handleUpdateContentBlock(block.id, "content", e.target.value)
                        }
                        placeholder="Write your content here..."
                        rows={4}
                      />
                      <p className="text-xs text-gray-500">
                        {block.content.length} characters
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

          {data.aboutPage.contentBlocks.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p className="text-sm">No content blocks added yet</p>
              <Button onClick={handleAddContentBlock} variant="outline" size="sm" className="mt-2">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Content Block
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg">
          <Save className="w-4 h-4 mr-2" />
          Save About Page
        </Button>
      </div>

      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm mb-2 text-[#1A73E8]">💡 About Page Tips</h4>
        <ul className="text-xs text-gray-700 space-y-1">
          <li>• Keep your description concise and engaging</li>
          <li>• Use highlights to showcase key achievements</li>
          <li>• Add content blocks for different aspects of your story</li>
          <li>• Reorder content blocks to structure your narrative</li>
          <li>• Disable blocks temporarily without deleting them</li>
        </ul>
      </div>
    </div>
  );
}
