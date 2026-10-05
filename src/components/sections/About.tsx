import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { profile } from "@/data/profile";
import { staggerDelay } from "@/lib/motion";

export function About() {
  return (
    <Section id="about" labelledBy="about-heading">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Reveal>
          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-1 rounded-4xl bg-linear-to-br from-accent to-accent-2 opacity-60 blur-sm" />
            <div className="relative aspect-4/5 overflow-hidden rounded-4xl border border-border bg-surface">
              <div className="flex h-full flex-col items-center justify-center bg-linear-to-br from-surface via-background to-accent/10 p-8 text-center">
                <span className="font-heading text-6xl font-bold text-gradient">
                  {profile.name.slice(0, 1)}
                </span>
                <p className="mt-4 font-heading text-2xl font-semibold">
                  {profile.name}
                </p>
                <p className="mt-2 text-sm text-muted">{profile.role}</p>
              </div>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="mb-3 text-sm uppercase tracking-[0.2em] text-muted">
              About
            </p>
            <h2
              id="about-heading"
              className="font-heading text-3xl font-semibold md:text-4xl"
            >
              {profile.aboutHeading}
            </h2>
          </Reveal>

          <div className="mt-6 space-y-4">
            {profile.about.map((paragraph, index) => (
              <Reveal key={paragraph} delay={index * staggerDelay}>
                <p className="leading-relaxed text-muted">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {profile.stats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * staggerDelay}>
                <div className="rounded-2xl border border-border bg-surface/80 p-6 backdrop-blur-sm">
                  <p className="font-heading text-4xl font-bold text-accent">
                    {stat.value}+
                  </p>
                  <p className="mt-2 text-sm text-muted">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
