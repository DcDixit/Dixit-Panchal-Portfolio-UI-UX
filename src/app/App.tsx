import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./components/pages/HomePage";
import { AboutPage } from "./components/pages/AboutPage";
import { SkillsPage } from "./components/pages/SkillsPage";
import { ProjectsPage } from "./components/pages/ProjectsPage";
import { CaseStudyPage } from "./components/pages/CaseStudyPage";
import { ContactPage } from "./components/pages/ContactPage";
import { Toaster } from "./components/ui/sonner";
import { AdminPanel } from "./components/admin/AdminPanel";
import { PortfolioProvider } from "./contexts/PortfolioContext";
import { Settings } from "lucide-react";
import { Button } from "./components/ui/button";
import { RecruiterMobileBar } from "./components/RecruiterMobileBar";
import { DEFAULT_CASE_STUDY_ID, PROJECTS_PAGE_SECTION_IDS } from "./data/projectCatalog";

const pageHashes: Record<string, string> = {
  home: "#home",
  about: "#about",
  skills: "#skills",
  projects: "#projects",
  "case-studies": "#case-studies",
  "case-study": "#case-study",
  contact: "#contact",
};

type ParsedRoute = {
  page: string;
  caseStudySlug?: string;
};

function parseHash(hash: string): ParsedRoute {
  const raw = (hash?.replace(/^#/, "") || "").trim();
  if (!raw) return { page: "home" };

  if (raw === "case-study" || raw.startsWith("case-study/")) {
    const slug =
      raw === "case-study" ? undefined : raw.slice("case-study/".length).split("/")[0]?.trim() || undefined;
    return { page: "case-study", caseStudySlug: slug };
  }

  const hit = Object.keys(pageHashes).find((p) => p === raw);
  return { page: hit ?? "home" };
}

function buildHash(navPage: string, caseStudySlug?: string): string {
  if (navPage === "case-study") {
    return `#case-study/${caseStudySlug ?? DEFAULT_CASE_STUDY_ID}`;
  }
  return pageHashes[navPage] ?? "#home";
}

export default function App() {
  const [route, setRoute] = useState<ParsedRoute>(() => parseHash(window.location.hash));
  const [showAdmin, setShowAdmin] = useState(false);
  const isDev = import.meta.env.DEV;

  const currentPage = route.page;
  const caseStudySlug = route.caseStudySlug;

  const handleNavigate = (navPage: string, slug?: string) => {
    const nextHash = buildHash(navPage, slug);
    if (window.location.hash !== nextHash) {
      window.history.pushState(null, "", nextHash);
    }
    setRoute(parseHash(nextHash));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";

    const handleHashChange = () => {
      setRoute(parseHash(window.location.hash));
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isDev) return;
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "a") {
        e.preventDefault();
        setShowAdmin(true);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [isDev]);

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={handleNavigate} />;
      case "about":
        return <AboutPage onNavigate={handleNavigate} />;
      case "skills":
        return <SkillsPage onNavigate={handleNavigate} />;
      case "projects":
      case "case-studies":
        return (
          <ProjectsPage
            onNavigate={handleNavigate}
            variant={currentPage === "case-studies" ? "case-studies" : "full"}
            initialScrollSectionId={
              currentPage === "case-studies" ? PROJECTS_PAGE_SECTION_IDS.caseStudies : undefined
            }
          />
        );
      case "case-study":
        return <CaseStudyPage onNavigate={handleNavigate} caseStudySlug={caseStudySlug} />;
      case "contact":
        return <ContactPage />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <PortfolioProvider>
      <div className="min-h-screen bg-white">
        <a
          href="#main-content"
          className="absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0 [clip:rect(0,0,0,0)] focus:static focus:w-auto focus:h-auto focus:rounded-lg focus:bg-[#1E1E1E] focus:text-white focus:px-4 focus:py-2 focus:m-4 focus:z-[100] focus:shadow-lg focus:[clip:auto]"
        >
          Skip to main content
        </a>
        <Header currentPage={currentPage} onNavigate={handleNavigate} />
        <main id="main-content" className="pb-[5.5rem] md:pb-0" tabIndex={-1}>
          {renderPage()}
        </main>
        <Footer onNavigate={handleNavigate} />
        <RecruiterMobileBar onNavigate={handleNavigate} />
        <Toaster position="top-right" />

        {isDev && (
          <div className="fixed bottom-6 right-6 z-40">
            <Button
              onClick={() => setShowAdmin(true)}
              className="rounded-full w-14 h-14 shadow-2xl bg-[#1A73E8] hover:bg-[#1557B0] transition-all"
              title="Open Admin Panel (Ctrl+Shift+A)"
              aria-label="Open admin panel"
            >
              <Settings className="w-6 h-6" />
            </Button>
          </div>
        )}

        {showAdmin && isDev && <AdminPanel onClose={() => setShowAdmin(false)} />}
      </div>
    </PortfolioProvider>
  );
}