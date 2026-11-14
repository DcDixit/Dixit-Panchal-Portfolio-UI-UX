import { useMemo, useState } from "react";
import { Expand } from "lucide-react";
import type { ProjectListing, ShowcaseKind } from "../data/projectCatalog";
import { ImageGalleryLightbox } from "./ImageGalleryLightbox";

function gridLayout(kind: ShowcaseKind | undefined): string {
  switch (kind) {
    case "branding":
      return "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5";
    case "saas":
    case "dashboard":
      return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4";
    case "ecommerce":
      return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4";
    case "web":
      return "grid grid-cols-1 md:grid-cols-2 gap-4";
    case "mobile":
    default:
      return "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3";
  }
}

function thumbAspect(kind: ShowcaseKind | undefined): string {
  switch (kind) {
    case "branding":
      return "aspect-square";
    case "saas":
    case "dashboard":
    case "ecommerce":
    case "web":
      return "aspect-[16/10]";
    case "mobile":
    default:
      return "aspect-[10/16]";
  }
}

function kindBadge(kind: ShowcaseKind | undefined): string {
  switch (kind) {
    case "branding":
      return "Branding";
    case "saas":
      return "SaaS / Product UI";
    case "dashboard":
      return "Dashboard";
    case "ecommerce":
      return "E-commerce";
    case "mobile":
      return "Mobile";
    case "web":
      return "Web";
    default:
      return "Showcase";
  }
}

interface VisualShowcaseProjectProps {
  project: ProjectListing;
}

export function VisualShowcaseProject({ project }: VisualShowcaseProjectProps) {
  const images = useMemo(
    () => (project.galleryImages?.length ? project.galleryImages : [project.imageUrl]),
    [project.galleryImages, project.imageUrl],
  );

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <article className="rounded-[28px] border border-[#e8e8e8] bg-white p-5 shadow-[0_2px_14px_rgba(0,0,0,0.04)] md:p-7">
      <header className="mb-5 flex flex-wrap items-end justify-between gap-4 md:mb-6">
        <div className="min-w-0 space-y-1">
          <span className="inline-flex rounded-full border border-[#e5e5e5] bg-[#fafbfc] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#717182]">
            {kindBadge(project.showcaseKind)}
          </span>
          <h3 className="text-xl font-semibold tracking-tight text-[#1e1e1e] md:text-[1.35rem]">{project.title}</h3>
          <p className="max-w-2xl text-sm leading-relaxed text-[#5c5c66] line-clamp-2">{project.summary}</p>
        </div>
        <p className="shrink-0 text-xs tabular-nums text-[#9a9aa8]">
          {images.length} frames · tap to zoom
        </p>
      </header>

      <div className={`${gridLayout(project.showcaseKind)}`}>
        {images.map((src, i) => (
          <button
            key={`${project.id}-${i}`}
            type="button"
            className={`group relative overflow-hidden rounded-xl border border-[#ececec] bg-[#f4f5f7] text-left outline-none ring-[#1a73e8] transition hover:border-[#1a73e8]/35 hover:shadow-lg focus-visible:ring-2 ${thumbAspect(project.showcaseKind)}`}
            onClick={() => setLightboxIndex(i)}
            aria-label={`Open image ${i + 1} for ${project.title}`}
          >
            <img
              src={src}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-top transition duration-300 group-hover:scale-[1.02]"
            />
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
            <span className="pointer-events-none absolute bottom-2 right-2 flex h-9 w-9 items-center justify-center rounded-full bg-black/45 text-white opacity-0 backdrop-blur-sm transition group-hover:opacity-100">
              <Expand className="h-4 w-4" aria-hidden />
            </span>
          </button>
        ))}
      </div>

      <ImageGalleryLightbox
        images={images}
        index={lightboxIndex}
        onIndexChange={setLightboxIndex}
        label={project.title}
      />
    </article>
  );
}
