import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { experience } from "@/data/experience";
import { staggerDelay } from "@/lib/motion";

export function Experience() {
  return (
    <Section id="experience" labelledBy="experience-heading">
      <Reveal>
        <p className="mb-3 text-sm uppercase tracking-[0.2em] text-muted">
          Experience
        </p>
        <h2
          id="experience-heading"
          className="max-w-2xl font-heading text-3xl font-semibold md:text-4xl"
        >
          Path so far
        </h2>
      </Reveal>

      <ol className="relative mt-12 space-y-0 border-l border-border pl-8">
        {experience.map((item, index) => (
          <li key={`${item.title}-${item.period}`} className="relative pb-10 last:pb-0">
            <span
              aria-hidden="true"
              className="absolute top-1.5 -left-[2.4rem] size-3 rounded-full border-2 border-accent bg-background"
            />
            <Reveal delay={index * staggerDelay}>
              <div className="rounded-2xl border border-border bg-surface/60 p-5 md:p-6">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <h3 className="font-heading text-lg font-semibold md:text-xl">
                    {item.title}
                  </h3>
                  <span className="rounded-full border border-border px-2.5 py-0.5 text-xs uppercase tracking-wide text-muted">
                    {item.type}
                  </span>
                </div>
                <p className="mt-1 text-sm text-accent">
                  {item.org} · {item.period}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
                  {item.description}
                </p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
