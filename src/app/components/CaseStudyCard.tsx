import { ArrowUpRight, Clock, Target } from "lucide-react";
import { Button } from "./ui/button";

interface CaseStudyCardProps {
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  metrics?: {
    label: string;
    value: string;
  }[];
  isReversed?: boolean;
  onViewCase?: () => void;
}

export function CaseStudyCard({
  title,
  category,
  description,
  imageUrl,
  metrics,
  isReversed = false,
  onViewCase,
}: CaseStudyCardProps) {
  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
        isReversed ? "lg:grid-flow-dense" : ""
      }`}
    >
      {/* Image Column */}
      <div className={`relative group ${isReversed ? "lg:col-start-2" : ""}`}>
        <div className="absolute -inset-4 bg-gradient-to-br from-[#1A73E8]/20 to-[#FF6F3C]/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative rounded-3xl overflow-hidden shadow-xl">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-[400px] lg:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        {/* Floating Badge */}
        <div className="absolute -top-4 -right-4 bg-white rounded-2xl px-6 py-3 shadow-lg">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-[#1A73E8]" />
            <span className="text-sm text-[#1E1E1E]">{category}</span>
          </div>
        </div>
      </div>

      {/* Content Column */}
      <div className={isReversed ? "lg:col-start-1 lg:row-start-1" : ""}>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1A73E8]/10 text-[#1A73E8] rounded-full mb-6">
          <Clock className="w-4 h-4" />
          <span className="text-sm">Case study</span>
        </div>
        
        <h3 className="mb-4 text-[#1E1E1E] text-3xl lg:text-4xl">{title}</h3>
        
        <p className="text-[#717182] text-lg leading-relaxed mb-6">
          {description}
        </p>

        {/* Metrics */}
        {metrics && metrics.length > 0 && (
          <div className="grid grid-cols-2 gap-4 mb-8">
            {metrics.map((metric, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-[#F5F5F5] to-white rounded-2xl p-4 border border-[#E5E5E5]"
              >
                <div className="text-2xl text-[#1A73E8] mb-1">
                  {metric.value}
                </div>
                <p className="text-sm text-[#717182]">{metric.label}</p>
              </div>
            ))}
          </div>
        )}

        <Button
          onClick={onViewCase}
          className="bg-[#1A73E8] hover:bg-[#1557B0] text-white rounded-full px-8 py-6 group"
        >
          Read case study
          <ArrowUpRight className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
}
