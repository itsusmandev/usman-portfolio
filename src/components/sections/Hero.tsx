"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { Fallback } from "@/components/three/Fallback";
import { Button } from "@/components/ui/Button";
import { profile } from "@/data/profile";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { motionDuration, motionEase } from "@/lib/motion";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => <Fallback />,
});

const social = [
  { href: profile.github, label: "GitHub", icon: FaGithub },
  { href: profile.linkedin, label: "LinkedIn", icon: FaLinkedin },
  { href: profile.whatsapp, label: "WhatsApp", icon: FaWhatsapp },
] as const;

export function Hero() {
  const reduced = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setRoleIndex((current) => (current + 1) % profile.roles.length);
    }, 2600);
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <section
      id="top"
      className="relative flex min-h-svh items-center overflow-hidden pt-24 md:pt-28"
    >
      <div className="pointer-events-none absolute inset-0">
        <HeroScene />
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/80 to-transparent md:via-background/55" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-background to-transparent" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center px-5 py-16 md:px-8 lg:grid-cols-[minmax(0,34rem)_1fr]">
        <div className="max-w-xl">
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: motionDuration.base, ease: motionEase }}
            className="mb-4 text-sm font-medium uppercase tracking-[0.22em] text-muted"
          >
            {profile.role} — {profile.location}
          </motion.p>

          <motion.h1
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: motionDuration.slow,
              ease: motionEase,
              delay: 0.08,
            }}
            className="font-heading text-[clamp(2.5rem,7vw,5.2rem)] leading-[0.95] font-bold tracking-tight"
          >
            {profile.name}
            <span className="text-accent">.</span>
            <span className="mt-3 block text-[clamp(1.35rem,3.4vw,2.35rem)] leading-snug font-semibold text-muted">
              {profile.tagline}
            </span>
          </motion.h1>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: motionDuration.base,
              ease: motionEase,
              delay: 0.16,
            }}
            className="mt-5 h-8 overflow-hidden"
          >
            <p className="text-lg text-accent">{profile.roles[roleIndex]}</p>
          </motion.div>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: motionDuration.base,
              ease: motionEase,
              delay: 0.22,
            }}
            className="mt-4 text-base leading-relaxed text-muted md:text-lg"
          >
            {profile.about[0]}
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: motionDuration.base,
              ease: motionEase,
              delay: 0.28,
            }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button href="#projects">View projects</Button>
            <Button href={profile.resume} variant="secondary">
              Download CV
            </Button>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex items-center gap-3"
          >
            {social.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-background/70 text-muted backdrop-blur-sm transition-colors hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <Icon className="size-4" aria-hidden="true" />
              </a>
            ))}
          </motion.div>
        </div>

        <div aria-hidden="true" className="hidden min-h-88 lg:block" />
      </div>

      <a
        href="#about"
        aria-label="Scroll to about"
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent md:inline-flex"
      >
        Scroll
        <ChevronDown className="size-4 animate-bounce" aria-hidden="true" />
      </a>
    </section>
  );
}
