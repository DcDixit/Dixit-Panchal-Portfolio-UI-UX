import { Link } from "react-router";
import { ArrowLeft } from "../components/Icons";
import { site } from "../content/site";
import { useMeta } from "../lib/useMeta";

const meta = {
  title: `Page not found · ${site.name}`,
  description: "This page doesn’t exist. Head back to the portfolio to see selected work.",
  path: "/",
  image: "/work/og/home.jpg",
  type: "website" as const,
};

export function NotFound() {
  useMeta(meta);
  return (
    <section className="container-x flex min-h-[70vh] flex-col justify-center pt-[var(--header-h)]">
      <p className="t-eyebrow">404</p>
      <h1 className="t-h2 mt-4 max-w-[16ch]">This page doesn’t exist.</h1>
      <p className="t-lead mt-4 max-w-[48ch]">The link may be outdated. The case studies are all on the home page.</p>
      <Link to={{ pathname: "/", hash: "#work" }} className="btn btn-primary mt-8 self-start">
        <ArrowLeft />
        View selected work
      </Link>
    </section>
  );
}
