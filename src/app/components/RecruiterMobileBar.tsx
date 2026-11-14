import { Button } from "./ui/button";
import { Mail, Sparkles } from "lucide-react";

interface RecruiterMobileBarProps {
  onNavigate: (page: string, caseStudySlug?: string) => void;
}

export function RecruiterMobileBar({ onNavigate }: RecruiterMobileBarProps) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-30 md:hidden border-t border-[#E5E5E5] bg-white/95 backdrop-blur-md px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-4px_24px_rgba(30,30,30,0.08)]"
      role="region"
      aria-label="Quick hiring actions"
    >
      <div className="max-w-[1200px] mx-auto flex gap-2">
        <Button
          type="button"
          variant="outline"
          className="flex-1 rounded-full border-[#1A73E8] text-[#1A73E8] hover:bg-[#1A73E8] hover:text-white h-12"
          onClick={() => onNavigate("case-study", "truckflow")}
        >
          <Sparkles className="mr-2 h-4 w-4 shrink-0" aria-hidden />
          Flagship case
        </Button>
        <Button
          type="button"
          className="flex-1 rounded-full bg-[#1A73E8] hover:bg-[#1557B0] text-white h-12"
          onClick={() => onNavigate("contact")}
        >
          <Mail className="mr-2 h-4 w-4 shrink-0" aria-hidden />
          Contact
        </Button>
      </div>
    </div>
  );
}
