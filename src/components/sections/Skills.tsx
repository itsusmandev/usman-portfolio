import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { skills } from "@/data/skills";
import { staggerDelay } from "@/lib/motion";

export function Skills() {
  return (
    <Section id="skills" labelledBy="skills-heading" className="bg-surface/30">
      <Reveal>
        <p className="mb-3 text-sm uppercase tracking-[0.2em] text-muted">
          Skills
        </p>
        <h2
          id="skills-heading"
          className="max-w-2xl font-heading text-3xl font-semibold md:text-4xl"
        >
          Tools I use to design, build, and ship
        </h2>
      </Reveal>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {skills.map((group, index) => (
          <Reveal key={group.title} delay={index * staggerDelay}>
            <div className="h-full rounded-2xl border border-border bg-background/70 p-6">
              <h3 className="font-heading text-lg font-semibold">
                {group.title}
              </h3>
              <ul className="mt-5 flex flex-wrap gap-2.5">
                {group.items.map((skill) => (
                  <li key={skill}>
                    <span className="inline-flex rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm text-muted transition-all duration-300 hover:border-accent/50 hover:text-accent hover:shadow-[0_0_20px_var(--glow)]">
                      {skill}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
