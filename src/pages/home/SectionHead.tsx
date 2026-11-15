import { Reveal } from "../../components/Reveal";

export function SectionHead({
  id,
  eyebrow,
  title,
  aside,
  dark,
}: {
  id: string;
  eyebrow: string;
  title: string;
  aside?: string;
  dark?: boolean;
}) {
  return (
    <Reveal className="mb-12 grid gap-6 md:mb-16 lg:grid-cols-12 lg:items-end">
      <div className="lg:col-span-7">
        <p className={`t-eyebrow mb-4 ${dark ? "!text-paper/60" : ""}`}>{eyebrow}</p>
        <h2 id={`${id}-title`} className={`t-h2 ${dark ? "!text-paper" : ""}`}>
          {title}
        </h2>
      </div>
      {aside ? (
        <p className={`max-w-[46ch] lg:col-span-5 lg:justify-self-end ${dark ? "text-paper/70" : "text-muted"}`}>{aside}</p>
      ) : null}
    </Reveal>
  );
}
