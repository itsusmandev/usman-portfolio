"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import {
  projectFilters,
  projects,
  type Project,
  type ProjectCategory,
} from "@/data/projects";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { staggerDelay } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Filter = (typeof projectFilters)[number];

function matchesFilter(project: Project, filter: Filter) {
  if (filter === "All") return true;
  if (filter === "Web Apps") return project.category === "Web App";
  return project.category === (filter as ProjectCategory);
}

function PreviewSurface({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(project.image) && !imageFailed;
  const frameClass = featured ? "aspect-video md:aspect-21/9" : "aspect-16/10";

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-linear-to-br from-accent/25 via-surface to-accent-2/20",
        frameClass,
      )}
    >
      {showImage ? (
        <Image
          src={project.image}
          alt={`${project.title} live site screenshot`}
          fill
          sizes={
            featured
              ? "(max-width: 1024px) 100vw, 60vw"
              : "(max-width: 768px) 100vw, 50vw"
          }
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          onError={() => setImageFailed(true)}
          priority={featured}
        />
      ) : (
        <>
          <div className="absolute inset-0 opacity-40">
            <div className="absolute -top-10 -right-8 size-40 rounded-full bg-accent/30 blur-3xl" />
            <div className="absolute bottom-0 left-8 size-28 rounded-full bg-accent-2/25 blur-2xl" />
          </div>

          <div className="absolute inset-x-6 top-6 bottom-10 rounded-xl border border-border/70 bg-background/55 p-4 shadow-lg backdrop-blur-md transition-transform duration-500 group-hover:scale-[1.02] md:inset-x-8 md:top-8 md:bottom-12 md:p-5">
            <div className="mb-4 flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-red-400/80" />
              <span className="size-2.5 rounded-full bg-amber-400/80" />
              <span className="size-2.5 rounded-full bg-emerald-400/80" />
              <span className="ml-3 truncate text-[10px] tracking-wide text-muted uppercase">
                {project.slug}.app
              </span>
            </div>
            <div className="space-y-2.5">
              <div className="h-2.5 w-2/5 rounded-full bg-accent/50" />
              <div className="h-2 w-4/5 rounded-full bg-muted/25" />
              <div className="h-2 w-3/5 rounded-full bg-muted/20" />
              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="h-12 rounded-lg bg-accent/15" />
                <div className="h-12 rounded-lg bg-accent-2/15" />
                <div className="h-12 rounded-lg bg-muted/15" />
              </div>
            </div>
          </div>
        </>
      )}

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-linear-to-t from-background/80 to-transparent p-4 md:p-5">
        <Badge className="bg-background/80 backdrop-blur-sm">
          {project.category}
        </Badge>
      </div>
    </div>
  );
}

function TechPreview({ tech }: { tech: string[] }) {
  const visible = tech.slice(0, 3);
  const rest = tech.length - visible.length;

  return (
    <div className="mt-5 flex flex-wrap items-center gap-2">
      {visible.map((item) => (
        <Badge key={item}>{item}</Badge>
      ))}
      {rest > 0 ? (
        <Badge className="border-accent/30 text-accent" aria-label={`${rest} more technologies`}>
          ...
        </Badge>
      ) : null}
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reduced = useReducedMotion();

  return (
    <Reveal delay={index * staggerDelay}>
      <motion.article
        whileHover={reduced ? undefined : { y: -6 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="group relative h-full overflow-hidden rounded-2xl border border-border bg-surface/80"
      >
        <Link href={`/projects/${project.slug}`} className="block">
          <PreviewSurface project={project} />
        </Link>

        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-heading text-xl font-semibold md:text-2xl">
              <Link
                href={`/projects/${project.slug}`}
                className="transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {project.title}
              </Link>
            </h3>
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label={`Open case study for ${project.title}`}
            >
              <ArrowUpRight className="size-4" />
            </Link>
          </div>

          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted md:text-base">
            {project.summary}
          </p>

          <TechPreview tech={project.tech} />

          <div className="mt-5 flex flex-wrap gap-3 text-sm">
            {project.live ? (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                Live
                <ExternalLink className="size-3.5" aria-hidden="true" />
              </a>
            ) : null}
            {project.repo ? (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-muted hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <FaGithub className="size-3.5" aria-hidden="true" />
                GitHub
              </a>
            ) : null}
            <Link
              href={`/projects/${project.slug}`}
              className="text-muted transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Case study ...
            </Link>
          </div>
        </div>
      </motion.article>
    </Reveal>
  );
}

function FeaturedPreview({ items }: { items: Project[] }) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const project = items[active] ?? items[0];

  useEffect(() => {
    if (reduced || items.length <= 1) return;
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % items.length);
    }, 4200);
    return () => window.clearInterval(id);
  }, [items.length, reduced]);

  if (!project) return null;

  return (
    <Reveal>
      <div className="mb-10 overflow-hidden rounded-2xl border border-border bg-surface/70">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={project.slug}
                initial={reduced ? false : { opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduced ? undefined : { opacity: 0, x: -18 }}
                transition={{ duration: 0.35 }}
                className="group"
              >
                <Link href={`/projects/${project.slug}`}>
                  <PreviewSurface project={project} featured />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex flex-col justify-center p-6 md:p-8">
            <p className="text-sm uppercase tracking-[0.18em] text-muted">
              Featured preview
            </p>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${project.slug}-copy`}
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="mt-3 font-heading text-2xl font-semibold md:text-3xl">
                  {project.title}
                </h3>
                <p className="mt-3 line-clamp-2 text-muted">{project.summary}</p>
                <TechPreview tech={project.tech} />
                <Link
                  href={`/projects/${project.slug}`}
                  className="mt-6 inline-flex items-center gap-2 text-sm text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  View case study
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
              </motion.div>
            </AnimatePresence>

            <div
              className="mt-8 flex items-center gap-2"
              role="tablist"
              aria-label="Featured project previews"
            >
              {items.map((item, index) => (
                <button
                  key={item.slug}
                  type="button"
                  role="tab"
                  aria-label={`Show ${item.title}`}
                  aria-selected={index === active}
                  onClick={() => setActive(index)}
                  className={cn(
                    "h-2.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                    index === active
                      ? "w-7 bg-accent"
                      : "w-2.5 bg-muted/40 hover:bg-muted/70",
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<Filter>("All");
  const filtered = useMemo(
    () => projects.filter((project) => matchesFilter(project, filter)),
    [filter],
  );
  const featured = useMemo(() => {
    const preferred = projects.filter((project) => project.featured);
    return (preferred.length > 0 ? preferred : projects).slice(0, 3);
  }, []);

  return (
    <Section id="projects" labelledBy="projects-heading">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <Reveal>
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-muted">
            Portfolio
          </p>
          <h2
            id="projects-heading"
            className="font-heading text-3xl font-semibold md:text-4xl"
          >
            Selected Work
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            role="tablist"
            aria-label="Filter projects"
            className="flex flex-wrap gap-2"
          >
            {projectFilters.map((item) => (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={filter === item}
                onClick={() => setFilter(item)}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                  filter === item
                    ? "border-accent bg-accent/15 text-accent"
                    : "border-border text-muted hover:text-text",
                )}
              >
                {item}
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      {filter === "All" ? <div className="mt-10"><FeaturedPreview items={featured} /></div> : null}

      <div className={cn("grid gap-5 md:grid-cols-2", filter === "All" ? "mt-2" : "mt-10")}>
        {filtered.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </Section>
  );
}
