import { Code2, Search, Server, Store } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { services, type Service } from "@/data/services";
import { staggerDelay } from "@/lib/motion";

const icons: Record<Service["icon"], typeof Code2> = {
  code: Code2,
  store: Store,
  search: Search,
  server: Server,
};

export function Services() {
  return (
    <Section id="services" labelledBy="services-heading" className="bg-surface/30">
      <Reveal>
        <p className="mb-3 text-sm uppercase tracking-[0.2em] text-muted">
          Services
        </p>
        <h2
          id="services-heading"
          className="max-w-2xl font-heading text-3xl font-semibold md:text-4xl"
        >
          How I can help your product move forward
        </h2>
      </Reveal>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {services.map((service, index) => {
          const Icon = icons[service.icon];
          return (
            <Reveal key={service.title} delay={index * staggerDelay}>
              <article className="h-full rounded-2xl border border-border bg-background/70 p-6 transition-transform duration-300 hover:-translate-y-1">
                <div className="inline-flex size-11 items-center justify-center rounded-xl border border-border bg-surface text-accent">
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <h3 className="mt-5 font-heading text-xl font-semibold">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
                  {service.description}
                </p>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
