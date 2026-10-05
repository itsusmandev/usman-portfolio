"use client";

import type { IconType } from "react-icons";
import {
  SiExpress,
  SiGit,
  SiGithub,
  SiMongodb,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPostman,
  SiPrisma,
  SiReact,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import { Reveal } from "@/components/ui/Reveal";
import {
  skills,
  skillsHeading,
  skillsIntro,
} from "@/data/skills";
import { staggerDelay } from "@/lib/motion";
import { cn } from "@/lib/utils";

const skillIcons: Record<string, IconType> = {
  React: SiReact,
  "Next.js": SiNextdotjs,
  TypeScript: SiTypescript,
  "Tailwind CSS": SiTailwindcss,
  "Three.js": SiThreedotjs,
  "Node.js": SiNodedotjs,
  Express: SiExpress,
  NestJS: SiNestjs,
  MongoDB: SiMongodb,
  MySQL: SiMysql,
  Prisma: SiPrisma,
  Git: SiGit,
  GitHub: SiGithub,
  Vercel: SiVercel,
  Postman: SiPostman,
};

function SkillChip({ name, index }: { name: string; index: number }) {
  const Icon = skillIcons[name];

  return (
    <li>
      <span
        className={cn(
          "group inline-flex items-center gap-2.5 border border-border/80 bg-background/40 px-3.5 py-2.5 text-sm text-muted",
          "transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/45 hover:text-accent",
          "hover:shadow-[0_0_28px_var(--glow)]",
        )}
        style={{ transitionDelay: `${index * 20}ms` }}
      >
        {Icon ? (
          <Icon
            className="size-4 text-accent/80 transition-colors group-hover:text-accent"
            aria-hidden="true"
          />
        ) : null}
        {name}
      </span>
    </li>
  );
}

export function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative overflow-hidden py-24 md:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute top-0 left-0 h-px w-full bg-linear-to-r from-transparent via-border to-transparent" />
        <div className="absolute right-0 bottom-10 font-heading text-[clamp(5rem,18vw,12rem)] leading-none font-bold tracking-tighter text-text/3 select-none">
          STACK
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <div className="flex items-start gap-5">
              <span className="font-heading text-5xl font-bold text-accent/80 md:text-6xl">
                02
              </span>
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-muted">
                  Skills
                </p>
                <h2
                  id="skills-heading"
                  className="mt-2 max-w-xl font-heading text-3xl font-semibold tracking-tight md:text-4xl"
                >
                  {skillsHeading}
                </h2>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="max-w-xs text-sm leading-relaxed text-muted md:text-right">
              {skillsIntro}
            </p>
          </Reveal>
        </div>

        <div className="mt-14 space-y-0 border-t border-border">
          {skills.map((group, groupIndex) => (
            <Reveal key={group.title} delay={groupIndex * staggerDelay}>
              <div className="grid gap-6 border-b border-border py-8 md:grid-cols-[11rem_1fr] md:items-start md:gap-10 md:py-10">
                <div className="flex items-baseline gap-3 md:block">
                  <span className="font-heading text-xs tracking-[0.24em] text-accent uppercase">
                    {String(groupIndex + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-heading text-lg font-semibold tracking-tight md:mt-2">
                    {group.title}
                  </h3>
                </div>

                <ul className="flex flex-wrap gap-2.5">
                  {group.items.map((skill, skillIndex) => (
                    <SkillChip
                      key={skill}
                      name={skill}
                      index={groupIndex * 4 + skillIndex}
                    />
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
