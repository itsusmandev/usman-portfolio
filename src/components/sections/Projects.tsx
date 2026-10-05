"use client";

import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { Fallback } from "@/components/three/Fallback";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import {
  projectFilters,
  projects,
  projectsHeading,
  projectsIntro,
  type Project,
  type ProjectCategory,
} from "@/data/projects";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { staggerDelay } from "@/lib/motion";
import { cn } from "@/lib/utils";

const ProjectsScene = dynamic(() => import("@/components/three/ProjectsScene"), {
  ssr: false,
  loading: () => <Fallback />,
});

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

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-linear-to-br from-accent/20 via-surface to-accent-2/15",
        featured ? "aspect-video" : "aspect-16/10",
      )}
    >
      {showImage ? (
        <Image
          src={project.image}
          alt={`${project.title} live site screenshot`}
          fill
          sizes={
            featured
              ? "(max-width: 1024px) 100vw, 55vw"
              : "(max-width: 768px) 100vw, 50vw"
          }
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          onError={() => setImageFailed(true)}
          priority={featured}
        />
      ) : (
        <div className="absolute inset-0 bg-linear-to-br from-accent/20 to-accent-2/10" />
      )}

      <div className="absolute inset-x-0 bottom-0 flex items-end bg-linear-to-t from-background/85 to-transparent p-4 md:p-5">
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
    <div className="mt-4 flex flex-wrap items-center gap-2">
      {visible.map((item) => (
        <Badge key={item}>{item}</Badge>
      ))}
      {rest > 0 ? (
        <Badge
          className="border-accent/30 text-accent"
          aria-label={`${rest} more technologies`}
        >
          +{rest}
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
        whileHover={reduced ? undefined : { y: -5 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="group relative h-full overflow-hidden border border-border bg-surface/50"
      >
        <Link href={`/projects/${project.slug}`} className="block">
          <PreviewSurface project={project} />
        </Link>

        <div className="p-5 md:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] tracking-[0.24em] text-accent uppercase">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-1 font-heading text-xl font-semibold md:text-2xl">
                <Link
                  href={`/projects/${project.slug}`}
                  className="transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {project.title}
                </Link>
              </h3>
            </div>
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex size-9 shrink-0 items-center justify-center border border-border text-muted transition-colors hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label={`Open case study for ${project.title}`}
            >
              <ArrowUpRight className="size-4" />
            </Link>
          </div>

          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">
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
              Case study
            </Link>
          </div>
        </div>
      </motion.article>
    </Reveal>
  );
}

function FeaturedStage({ items }: { items: Project[] }) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const project = items[active] ?? items[0];

  useEffect(() => {
    if (reduced || items.length <= 1) return;
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % items.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, [items.length, reduced]);

  if (!project) return null;

  return (
    <Reveal>
      <div className="relative mt-12 overflow-hidden border border-border bg-surface/30 md:mt-16">
        <div className="pointer-events-none absolute inset-y-0 right-0 w-full md:w-[48%]">
          <ProjectsScene />
          <div className="absolute inset-0 bg-linear-to-r from-background via-background/40 to-transparent md:from-background/80" />
          <div className="absolute inset-0 bg-linear-to-t from-background/70 via-transparent to-background/20" />
        </div>

        <div className="relative grid lg:grid-cols-[1.15fr_0.85fr]">
          <div className="group border-b border-border lg:border-r lg:border-b-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={project.slug}
                initial={reduced ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
              >
                <Link href={`/projects/${project.slug}`}>
                  <PreviewSurface project={project} featured />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative z-10 flex flex-col justify-center p-6 md:p-8 lg:p-10">
            <p className="text-[10px] tracking-[0.3em] text-accent uppercase">
              Featured build
            </p>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${project.slug}-copy`}
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="mt-3 font-heading text-3xl font-semibold tracking-tight md:text-4xl">
                  {project.title}
                </h3>
                <p className="mt-3 max-w-md text-muted">{project.summary}</p>
                <TechPreview tech={project.tech} />
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-2 text-sm text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    View case study
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </Link>
                  {project.live ? (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      Live
                      <ExternalLink className="size-3.5" aria-hidden="true" />
                    </a>
                  ) : null}
                </div>
              </motion.div>
            </AnimatePresence>

            <div
              className="mt-8 flex flex-wrap gap-2"
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
                    "border px-3 py-1.5 text-xs tracking-wide uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                    index === active
                      ? "border-accent bg-accent/15 text-accent"
                      : "border-border text-muted hover:text-text",
                  )}
                >
                  {item.title}
                </button>
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
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative overflow-hidden py-24 md:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute top-0 left-0 h-px w-full bg-linear-to-r from-transparent via-border to-transparent" />
        <div className="absolute top-28 right-0 font-heading text-[clamp(5rem,18vw,12rem)] leading-none font-bold tracking-tighter text-text/3 select-none">
          WORK
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <div className="flex items-start gap-5">
              <span className="font-heading text-5xl font-bold text-accent/80 md:text-6xl">
                03
              </span>
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-muted">
                  Projects
                </p>
                <h2
                  id="projects-heading"
                  className="mt-2 font-heading text-3xl font-semibold tracking-tight md:text-4xl"
                >
                  {projectsHeading}
                </h2>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="max-w-xs text-sm leading-relaxed text-muted md:text-right">
              {projectsIntro}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div
            role="tablist"
            aria-label="Filter projects"
            className="mt-8 flex flex-wrap gap-2"
          >
            {projectFilters.map((item) => (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={filter === item}
                onClick={() => setFilter(item)}
                className={cn(
                  "border px-3.5 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
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

        {filter === "All" ? <FeaturedStage items={featured} /> : null}

        <div
          className={cn(
            "grid gap-5 md:grid-cols-2",
            filter === "All" ? "mt-8" : "mt-10",
          )}
        >
          {filtered.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
