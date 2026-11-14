import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
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

migrateLegacyHash();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
