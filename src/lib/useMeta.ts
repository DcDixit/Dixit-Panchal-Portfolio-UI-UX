import { useEffect } from "react";
import { absolute, type PageMeta } from "./pageMeta";

function setTag(selector: string, attr: "content" | "href", value: string | null, create: () => HTMLElement) {
  let el = document.head.querySelector(selector);
  if (value === null) {
    el?.remove();
    return;
  }
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

const metaEl = (key: "name" | "property", name: string) => () => {
  const m = document.createElement("meta");
  m.setAttribute(key, name);
  return m;
};

/** Keeps title, description, canonical and social tags in sync during client-side navigation. */
export function useMeta(m: PageMeta) {
  useEffect(() => {
    document.title = m.title;
    const url = absolute(m.path);
    const hasOrigin = url.startsWith("http");
    setTag('meta[name="description"]', "content", m.description, metaEl("name", "description"));
    setTag('link[rel="canonical"]', "href", hasOrigin ? url : null, () => {
      const l = document.createElement("link");
      l.rel = "canonical";
      return l;
    });
    setTag('meta[property="og:type"]', "content", m.type, metaEl("property", "og:type"));
    setTag('meta[property="og:title"]', "content", m.title, metaEl("property", "og:title"));
    setTag('meta[property="og:description"]', "content", m.description, metaEl("property", "og:description"));
    setTag('meta[property="og:url"]', "content", hasOrigin ? url : null, metaEl("property", "og:url"));
    setTag('meta[property="og:image"]', "content", absolute(m.image), metaEl("property", "og:image"));
    setTag('meta[name="twitter:title"]', "content", m.title, metaEl("name", "twitter:title"));
    setTag('meta[name="twitter:description"]', "content", m.description, metaEl("name", "twitter:description"));
    setTag('meta[name="twitter:image"]', "content", absolute(m.image), metaEl("name", "twitter:image"));
  }, [m]);
}
