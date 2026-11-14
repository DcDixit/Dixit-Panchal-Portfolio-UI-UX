import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

interface ProjectCardProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  onViewCase?: () => void;
  size?: "large" | "medium";
}

export function ProjectCard({
  title,
  subtitle,
  imageUrl,
  onViewCase,
  size = "medium",
}: ProjectCardProps) {
  return (
    <div
      className={`group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer ${
        size === "large" ? "col-span-1 md:col-span-2" : ""
      }`}
      onClick={onViewCase}
    >
      <div className={`relative overflow-hidden ${size === "large" ? "h-[400px]" : "h-[280px]"}`}>
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-8">
        <div className="mb-2 text-[#1A73E8]">{subtitle}</div>
        <h3 className="mb-4 text-[#1E1E1E]">{title}</h3>
        <Button
          variant="ghost"
          className="text-[#1A73E8] hover:text-[#1557B0] p-0 h-auto"
          onClick={(e) => {
            e.stopPropagation();
            onViewCase?.();
          }}
        >
          View Case Study
          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
}
