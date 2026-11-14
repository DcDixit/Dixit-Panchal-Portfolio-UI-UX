import { LazyMotion, MotionConfig, domAnimation, m, useReducedMotion } from "motion/react";
import { useEffect, useLayoutEffect, useRef } from "react";
import { Route, Routes, useLocation, useNavigationType } from "react-router";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { CaseStudy } from "./pages/CaseStudy";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";

const savedScroll = new Map<string, number>();

/** Scroll to top on new pages, to #section for hash links, and restore position on Back/Forward. */
function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  const navType = useNavigationType();
  const reduce = useReducedMotion();
  const prevPath = useRef<string | null>(null);

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    const onScroll = () => savedScroll.set(history.state?.key ?? "default", window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useLayoutEffect(() => {
    const samePage = prevPath.current === pathname;
    const firstLoad = prevPath.current === null;
    prevPath.current = pathname;

    if (navType === "POP" && !firstLoad && savedScroll.has(key) && !hash) {
      window.scrollTo({ top: savedScroll.get(key)!, behavior: "instant" });
      return;
    }
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      const go = () => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: samePage && !reduce ? "smooth" : "instant", block: "start" });
        else if (id === "top") window.scrollTo({ top: 0, behavior: reduce ? "instant" : "smooth" });
      };
      // Wait one frame so a newly rendered page has laid out.
      requestAnimationFrame(go);
      return;
    }
    if (!samePage) window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash, key, navType, reduce]);

  // Move focus to the new page for screen-reader and keyboard users.
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    document.getElementById("main")?.focus({ preventScroll: true });
  }, [pathname]);

  return null;
}

export default function App() {
  const { pathname } = useLocation();
  const reduce = useReducedMotion();

  return (
    <LazyMotion features={domAnimation} strict>
    <MotionConfig reducedMotion="user">
      <div id="top">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <ScrollManager />
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          <m.div
            key={pathname}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/work/:slug" element={<CaseStudy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </m.div>
        </main>
        <Footer />
      </div>
    </MotionConfig>
    </LazyMotion>
  );
}
