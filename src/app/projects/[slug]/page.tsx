import type { Metadata } from "next";
import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/SiteShell";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { projects } from "@/data/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

function projectImageExists(image: string) {
  const relative = image.replace(/^\//, "");
  return existsSync(path.join(process.cwd(), "public", relative));
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.title} — Case study`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  const hasImage = projectImageExists(project.image);

  return (
    <SiteShell>
      <main>
        <Section className="pt-28 md:pt-32">
          <Link
            href="/#projects"
            className="text-sm text-muted transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            ← Back to projects
          </Link>

          <div className="mt-6 max-w-3xl">
            <Badge>{project.category}</Badge>
            <h1 className="mt-4 font-heading text-4xl font-bold md:text-5xl">
              {project.title}
            </h1>
            <p className="mt-4 text-lg text-muted">{project.summary}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {project.live ? (
                <Button href={project.live} target="_blank">
                  View live
                </Button>
              ) : null}
              {project.repo ? (
                <Button href={project.repo} target="_blank" variant="secondary">
                  View repo
                </Button>
              ) : null}
            </div>
          </div>

          {hasImage ? (
            <div className="relative mt-12 aspect-video overflow-hidden rounded-2xl border border-border bg-surface">
              <Image
                src={project.image}
                alt={`${project.title} screenshot`}
                fill
                sizes="(max-width: 768px) 100vw, 960px"
                className="object-cover object-top"
                priority
              />
            </div>
          ) : null}

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-border bg-surface/70 p-6">
              <h2 className="font-heading text-xl font-semibold">Problem</h2>
              <p className="mt-3 text-muted">
                {project.problem ?? "Case study details coming soon."}
              </p>
            </article>
            <article className="rounded-2xl border border-border bg-surface/70 p-6">
              <h2 className="font-heading text-xl font-semibold">Solution</h2>
              <p className="mt-3 text-muted">
                {project.solution ?? "Case study details coming soon."}
              </p>
            </article>
          </div>

          {project.features?.length ? (
            <article className="mt-6 rounded-2xl border border-border bg-surface/70 p-6">
              <h2 className="font-heading text-xl font-semibold">Features</h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {project.features.map((feature) => (
                  <li key={feature} className="text-muted">
                    • {feature}
                  </li>
                ))}
              </ul>
            </article>
          ) : null}
        </Section>
      </main>
    </SiteShell>
  );
}
