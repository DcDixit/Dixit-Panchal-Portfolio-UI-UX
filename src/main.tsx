import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App";
import { getCaseStudy } from "./content/projects";
import "./styles/index.css";

/**
 * The previous version used hash routes (#about, #case-study/<id>).
 * Rewrite them to the new URLs so links already shared keep working.
 */
function migrateLegacyHash() {
  const raw = window.location.hash.replace(/^#/, "");
  if (window.location.pathname !== "/" || !raw) return;

  const sections: Record<string, string> = {
    home: "/",
    projects: "/#work",
    "case-studies": "/#work",
    skills: "/#expertise",
  };
  const renamed: Record<string, string> = { "financial-reporting": "cash-flow-reporting" };

  let target: string | null = null;
  if (raw === "case-study" || raw.startsWith("case-study/")) {
    const id = raw.split("/")[1] ?? "";
    const slug = renamed[id] ?? id;
    target = getCaseStudy(slug) ? `/work/${slug}` : "/#work";
  } else if (raw in sections) {
    target = sections[raw];
  }
  if (target) window.history.replaceState(null, "", target);
}

const container = document.getElementById("root")!;
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

/** True when the pre-rendered markup was rendered for the current URL. */
function matchesPrerender(): boolean {
  const rendered = container.dataset.route;
  if (!rendered) return false;
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  if (rendered === path) return true;
  // 404.html is served for any unknown URL; it holds the not-found page.
  const known = path === "/" || (path.startsWith("/work/") && !!getCaseStudy(path.slice("/work/".length)));
  return rendered === "/404" && !known;
}

// Production HTML is pre-rendered (scripts/prerender.mjs), so hydrate it. Render fresh in
// development, or when the URL differs from what was pre-rendered (legacy redirects, SPA fallbacks).
migrateLegacyHash();
if (matchesPrerender()) {
  hydrateRoot(container, app);
} else {
  container.replaceChildren();
  createRoot(container).render(app);
}
