import type { PortfolioProject } from "./portfolioData";
import type { ProjectListing } from "./projectCatalog";

export function portfolioProjectToListing(p: PortfolioProject): ProjectListing {
  const imageCandidate = (p.image && p.image.trim()) || p.galleryImages?.find((u) => u.trim()) || "";
  return {
    id: p.id,
    title: p.title,
    summary: p.description,
    problem: p.problem ?? "",
    solution: p.solution ?? "",
    role: p.role ?? "",
    process: p.process ?? "",
    timeline: p.timeline ?? "",
    tools: p.toolsUsed ?? [],
    impact: p.impact ?? "",
    category: p.category,
    imageUrl: imageCandidate,
    featured: p.featured,
    presentation: p.presentation,
    showcaseKind: p.showcaseKind,
    galleryImages: p.galleryImages?.length ? [...p.galleryImages] : undefined,
    caseStudySlug: p.presentation === "case-study" ? (p.caseStudyId?.trim() || p.id) : undefined,
  };
}

export function portfolioProjectsToListings(projects: PortfolioProject[]): ProjectListing[] {
  return [...projects]
    .filter((p) => p.enabled !== false)
    .sort((a, b) => a.order - b.order)
    .map(portfolioProjectToListing);
}

export function caseStudiesFromPortfolio(projects: PortfolioProject[]): ProjectListing[] {
  return portfolioProjectsToListings(projects).filter((l) => l.presentation === "case-study");
}

export function showcaseFromPortfolio(projects: PortfolioProject[]): ProjectListing[] {
  return portfolioProjectsToListings(projects).filter((l) => l.presentation === "showcase");
}
