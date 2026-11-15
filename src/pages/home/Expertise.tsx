import { Reveal } from "../../components/Reveal";
import { site } from "../../content/site";
import { SectionHead } from "./SectionHead";

export function Expertise() {
  const { capabilities, domains, tools, ai } = site.expertise;
  return (
    <section id="expertise" aria-labelledby="expertise-title" className="bg-ink text-paper">
      <div className="container-x section-y">
        <SectionHead id="expertise" eyebrow="Expertise" title="What I bring to a team" dark />

        <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {capabilities.map((c, i) => (
            <li key={c.title} className="border-t border-paper/15 pt-5">
              <Reveal delay={i * 0.06}>
                <h3 className="text-lg !text-paper">{c.title}</h3>
                <ul className="mt-4 space-y-2 text-paper/75">
                  {c.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ul>

        {/* AI-assisted workflow: given its own panel so it reads at a glance */}
        <Reveal className="mt-16 rounded-2xl border border-paper/15 bg-paper/[0.05] p-7 md:p-10">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <h3 className="t-eyebrow !text-paper/60">AI-assisted workflow</h3>
              <p className="mt-3 text-xl leading-snug !text-paper">{ai.summary}</p>
            </div>
            <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-paper/15 sm:grid-cols-4 lg:col-span-7">
              {ai.tools.map((t) => (
                <li key={t.name} className="flex flex-col items-center justify-center gap-3 bg-ink px-5 py-6">
                  <img src={t.logo} alt="" width={40} height={40} className="h-10 w-10" loading="lazy" />
                  <span className="text-sm text-paper/75">{t.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <h3 className="t-eyebrow !text-paper/60">Domains</h3>
            <p className="mt-4 text-lg leading-relaxed text-paper">{domains.join(" · ")}</p>
          </div>
          <div className="md:col-span-5">
            <h3 className="t-eyebrow !text-paper/60">Design tools</h3>
            <p className="mt-4 text-lg leading-relaxed text-paper">{tools.join(" · ")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
