"use client";

import dynamic from "next/dynamic";
import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Fallback } from "@/components/three/Fallback";
import { Reveal } from "@/components/ui/Reveal";
import { profile } from "@/data/profile";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { staggerDelay } from "@/lib/motion";
import { cn } from "@/lib/utils";

const AboutScene = dynamic(() => import("@/components/three/AboutScene"), {
  ssr: false,
  loading: () => <Fallback />,
});

function CountValue({
  value,
  delay,
}: {
  value: number;
  delay: number;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.7 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: reduced ? 0 : 1.2,
      delay: reduced ? 0 : delay,
      ease: "easeOut",
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [delay, inView, reduced, value]);

  return <span ref={ref}>{display}</span>;
}

export function About() {
  const [lead, ...rest] = profile.about;

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative overflow-hidden py-24 md:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute top-0 left-0 h-px w-full bg-linear-to-r from-transparent via-border to-transparent" />
        <div className="absolute top-24 -left-20 font-heading text-[clamp(6rem,22vw,16rem)] leading-none font-bold tracking-tighter text-text/4 select-none">
          {profile.name.toUpperCase()}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <div className="flex items-start gap-5">
              <span className="font-heading text-5xl font-bold text-accent/80 md:text-6xl">
                01
              </span>
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-muted">
                  About signal
                </p>
                <p className="mt-2 text-sm text-muted">
                  {profile.location} · {profile.role}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <ul className="flex flex-wrap gap-2" aria-label="Focus roles">
              {profile.roles.map((role) => (
                <li
                  key={role}
                  className="border-b border-accent/40 pb-0.5 text-xs tracking-[0.16em] text-muted uppercase"
                >
                  {role}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.05}>
          <h2
            id="about-heading"
            className="mt-10 max-w-4xl font-heading text-[clamp(2.1rem,5.5vw,4.25rem)] leading-[1.05] font-semibold tracking-tight"
          >
            {profile.aboutHeading}
          </h2>
        </Reveal>
      </div>

      <div className="relative mt-12 md:mt-16">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-background to-transparent md:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-background to-transparent md:w-28" />

        <div
          className={cn(
            "relative mx-auto h-88 w-[min(100%,72rem)] overflow-hidden md:h-112",
            "[clip-path:polygon(4%_0,100%_0,96%_100%,0_100%)] md:[clip-path:polygon(6%_0,100%_0,94%_100%,0_100%)]",
          )}
        >
          <div className="absolute inset-0 bg-surface/40" />
          <AboutScene />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-background/50 via-transparent to-background/50" />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-background/30 via-transparent to-background/55" />

          <div className="absolute bottom-6 left-[8%] z-10 md:bottom-8 md:left-[10%]">
            <p className="text-[10px] tracking-[0.35em] text-accent uppercase">
              Craft helix
            </p>
            <p className="mt-1 font-heading text-lg text-text/90 md:text-xl">
              {profile.aboutSignal}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-14 grid max-w-6xl gap-10 px-5 md:mt-20 md:grid-cols-12 md:gap-8 md:px-8">
        <Reveal className="md:col-span-5">
          <blockquote className="relative border-l-2 border-accent pl-5 md:pl-6">
            <p className="font-heading text-2xl leading-snug font-medium tracking-tight text-text md:text-3xl">
              {lead}
            </p>
          </blockquote>
        </Reveal>

        <div className="space-y-5 md:col-span-6 md:col-start-7">
          {rest.map((paragraph, index) => (
            <Reveal key={paragraph} delay={index * staggerDelay}>
              <p className="max-w-md text-base leading-relaxed text-muted md:text-[1.05rem]">
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-6xl px-5 md:mt-24 md:px-8">
        <div className="grid grid-cols-1 gap-8 border-t border-border pt-10 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-border">
          {profile.stats.map((stat, index) => (
            <Reveal
              key={stat.label}
              delay={index * staggerDelay}
              className={cn(index > 0 && "sm:pl-8", index < 2 && "sm:pr-8")}
            >
              <p className="font-heading text-5xl font-bold tracking-tight text-accent md:text-6xl">
                <CountValue value={stat.value} delay={index * staggerDelay} />
                <span className="text-accent-2">+</span>
              </p>
              <p className="mt-3 text-xs tracking-[0.22em] text-muted uppercase">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
