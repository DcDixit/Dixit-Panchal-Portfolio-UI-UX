import { Reveal } from "../../components/Reveal";
import { Rich } from "../../components/Rich";
import { site } from "../../content/site";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="border-t border-line section-y">
      <div className="container-x grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="t-eyebrow mb-4">About</p>
          <h2 id="about-title" className="t-h2 max-w-[13ch]">
            Clarity for products with real complexity
          </h2>
        </Reveal>
        <Reveal className="space-y-5 lg:col-span-7 lg:pt-9">
          {site.about.paragraphs.map((p) => (
            <p key={p} className="t-lead">
              <Rich text={p} />
            </p>
          ))}
        </Reveal>
      </div>

      <div className="container-x mt-16 md:mt-20">
        <h3 className="t-eyebrow mb-6">How I lead</h3>
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {site.about.leadership.map((item, i) => (
            <li key={item.title} className="border-t-2 border-ink pt-5">
              <Reveal delay={i * 0.06}>
                <h4 className="text-xl leading-snug">{item.title}</h4>
                <p className="mt-3 text-muted">
                  <Rich text={item.body} />
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
