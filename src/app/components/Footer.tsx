import { Linkedin, Dribbble, Mail } from "lucide-react";
import { siteConfig } from "../config/siteConfig";

interface FooterProps {
  onNavigate: (page: string, caseStudySlug?: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#1E1E1E] text-white py-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Column 1 - About */}
          <div>
            <h3 className="mb-4 text-white">{siteConfig.name}</h3>
            <p className="text-[#C9C9C9] mb-4">
              {siteConfig.recruiterPitch}
            </p>
            <div className="flex gap-4">
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#1A73E8] flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={siteConfig.social.dribbble}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#1A73E8] flex items-center justify-center transition-colors"
              >
                <Dribbble className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#1A73E8] flex items-center justify-center transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="mb-4 text-white">Quick Links</h3>
            <nav className="flex flex-col gap-3">
              <button
                onClick={() => onNavigate("home")}
                className="text-[#C9C9C9] hover:text-white transition-colors text-left"
              >
                Home
              </button>
              <button
                onClick={() => onNavigate("about")}
                className="text-[#C9C9C9] hover:text-white transition-colors text-left"
              >
                About
              </button>
              <button
                onClick={() => onNavigate("skills")}
                className="text-[#C9C9C9] hover:text-white transition-colors text-left"
              >
                Skills
              </button>
              <button
                onClick={() => onNavigate("projects")}
                className="text-[#C9C9C9] hover:text-white transition-colors text-left"
              >
                Projects
              </button>
              <button
                onClick={() => onNavigate("case-studies")}
                className="text-[#C9C9C9] hover:text-white transition-colors text-left"
              >
                Case Studies
              </button>
              <button
                onClick={() => onNavigate("case-study", "truckflow")}
                className="text-[#C9C9C9] hover:text-white transition-colors text-left"
              >
                Flagship narrative
              </button>
              <button
                onClick={() => onNavigate("contact")}
                className="text-[#C9C9C9] hover:text-white transition-colors text-left"
              >
                Contact
              </button>
            </nav>
          </div>

          {/* Column 3 - Contact Info */}
          <div>
            <h3 className="mb-4 text-white">Let's Connect</h3>
            <p className="text-[#C9C9C9] mb-3 text-sm">
              {siteConfig.availability}
            </p>
            <div className="flex flex-col gap-3 text-[#C9C9C9]">
              <p>{siteConfig.location}</p>
              <a href={`mailto:${siteConfig.email}`} className="hover:text-white transition-colors">
                {siteConfig.email}
              </a>
              <a href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`} className="hover:text-white transition-colors">
                {siteConfig.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 text-center text-[#C9C9C9]">
          <p>© 2026 {siteConfig.name}. Product design portfolio.</p>
        </div>
      </div>
    </footer>
  );
}
