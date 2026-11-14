import { LucideIcon } from "lucide-react";

interface IndustryCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  projectCount?: string;
}

export function IndustryCard({ icon, title, description, projectCount }: IndustryCardProps) {
  return (
    <div className="group relative">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A73E8]/5 to-[#FF6F3C]/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative bg-white rounded-2xl p-6 border border-[#E5E5E5] hover:border-[#1A73E8]/40 transition-all duration-300 h-full">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1A73E8]/10 to-[#FF6F3C]/10 flex items-center justify-center text-[#1A73E8] flex-shrink-0 group-hover:scale-110 transition-transform">
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="mb-2 text-[#1E1E1E] text-lg">{title}</h3>
            <p className="text-[#717182] text-sm leading-relaxed mb-2">{description}</p>
            {projectCount && (
              <span className="text-xs text-[#1A73E8]">{projectCount}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
