import {
  Eye, Palette, Sparkles, PenTool, Code, Layers, Award, Zap,
  Car, Heart, Smartphone, Database, Globe, Briefcase
} from "lucide-react";

export function getIconComponent(iconName: string, className: string = "w-6 h-6") {
  const icons: Record<string, JSX.Element> = {
    Eye: <Eye className={className} />,
    Palette: <Palette className={className} />,
    Sparkles: <Sparkles className={className} />,
    PenTool: <PenTool className={className} />,
    Code: <Code className={className} />,
    Layers: <Layers className={className} />,
    Award: <Award className={className} />,
    Zap: <Zap className={className} />,
    Car: <Car className={className} />,
    Heart: <Heart className={className} />,
    Smartphone: <Smartphone className={className} />,
    Database: <Database className={className} />,
    Globe: <Globe className={className} />,
    Briefcase: <Briefcase className={className} />
  };

  return icons[iconName] || <Layers className={className} />;
}
