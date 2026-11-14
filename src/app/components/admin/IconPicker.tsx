import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { 
  Search, X, Car, Briefcase, Heart, Smartphone, CreditCard, 
  Globe, BarChart, Zap, Layers, Palette, Award, Eye, Code,
  Users, TrendingUp, Target, Lightbulb, PenTool, Database,
  Figma, Sparkles, Rocket, Building, MessageSquare, Star,
  FolderOpen, BookOpen, Settings, Mail, MapPin, Phone,
  Download, Upload, ChevronRight, ArrowRight, Check
} from "lucide-react";

// Map of icon names to their components
const ICON_MAP: Record<string, any> = {
  Car, Briefcase, Heart, Smartphone, CreditCard, Globe, BarChart,
  Zap, Layers, Palette, Award, Eye, Code, Users, TrendingUp,
  Target, Lightbulb, PenTool, Database, Figma, Sparkles, Rocket,
  Building, MessageSquare, Star, FolderOpen, BookOpen, Settings,
  Mail, MapPin, Phone, Download, Upload, ChevronRight, ArrowRight, Check
};

const ICON_CATEGORIES = {
  "Business & Work": ["Briefcase", "Building", "TrendingUp", "BarChart", "Target"],
  "Technology": ["Code", "Database", "Smartphone", "Globe", "Settings"],
  "Design": ["Palette", "Figma", "PenTool", "Layers", "Eye"],
  "Communication": ["Mail", "Phone", "MessageSquare", "Users"],
  "Actions": ["Download", "Upload", "Check", "ChevronRight", "ArrowRight"],
  "Industries": ["Car", "Heart", "CreditCard", "FolderOpen", "BookOpen"],
  "Symbols": ["Award", "Star", "Sparkles", "Lightbulb", "Zap", "Rocket"]
};

interface IconPickerProps {
  label: string;
  value: string;
  onChange: (iconName: string) => void;
  helpText?: string;
}

export function IconPicker({ label, value, onChange, helpText }: IconPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const SelectedIcon = ICON_MAP[value] || Layers;

  const filterIcons = (icons: string[]) => {
    if (!searchQuery) return icons;
    return icons.filter(icon => 
      icon.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const handleSelect = (iconName: string) => {
    onChange(iconName);
    setIsOpen(false);
    setSearchQuery("");
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      
      {/* Selected Icon Display */}
      <div 
        className="flex items-center justify-between p-3 border rounded-lg bg-white hover:bg-gray-50 cursor-pointer transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
            <SelectedIcon className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium">{value}</p>
            <p className="text-xs text-gray-500">Click to change icon</p>
          </div>
        </div>
        <Button variant="outline" size="sm" type="button">
          {isOpen ? "Close" : "Browse Icons"}
        </Button>
      </div>

      {/* Icon Picker Modal */}
      {isOpen && (
        <Card className="p-4 border-2 border-blue-200 shadow-lg">
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search icons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              )}
            </div>

            {/* Icon Categories */}
            <div className="max-h-96 overflow-y-auto space-y-4">
              {Object.entries(ICON_CATEGORIES).map(([category, icons]) => {
                const filteredIcons = filterIcons(icons);
                if (filteredIcons.length === 0) return null;

                return (
                  <div key={category}>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">
                      {category}
                    </h4>
                    <div className="grid grid-cols-6 gap-2">
                      {filteredIcons.map((iconName) => {
                        const IconComponent = ICON_MAP[iconName];
                        const isSelected = value === iconName;
                        
                        return (
                          <button
                            key={iconName}
                            type="button"
                            onClick={() => handleSelect(iconName)}
                            className={`relative p-3 rounded-lg border-2 transition-all hover:bg-blue-50 hover:border-blue-300 ${
                              isSelected
                                ? "bg-blue-100 border-blue-500"
                                : "bg-white border-gray-200"
                            }`}
                            title={iconName}
                          >
                            <IconComponent className="w-6 h-6 mx-auto text-gray-700" />
                            {isSelected && (
                              <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                                <Check className="w-3 h-3 text-white" />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* No Results */}
            {searchQuery && Object.entries(ICON_CATEGORIES).every(
              ([_, icons]) => filterIcons(icons).length === 0
            ) && (
              <div className="text-center py-8 text-gray-500">
                <Search className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm">No icons found for "{searchQuery}"</p>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Help Text */}
      {helpText && !isOpen && (
        <p className="text-xs text-gray-500">{helpText}</p>
      )}
    </div>
  );
}
