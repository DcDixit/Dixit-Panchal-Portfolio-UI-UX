import { site } from "../content/site";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-x flex flex-col gap-3 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name} · {site.role}
        </p>
        <a href="#top" className="link self-start font-medium sm:self-auto">
          Back to top
        </a>
      </div>
    </footer>
  );
}
