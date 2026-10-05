export type SkillGroup = {
  title: string;
  items: readonly string[];
};

export const skillsHeading =
  "Tools I use to design, build, and ship" as const;

export const skillsIntro =
  "A focused stack for fast interfaces, solid APIs, and reliable deploys." as const;

export const skills: readonly SkillGroup[] = [
  {
    title: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Three.js"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express", "NestJS"],
  },
  {
    title: "Database / ORM",
    items: ["MongoDB", "MySQL", "Prisma"],
  },
  {
    title: "Tools / DevOps",
    items: ["Git", "GitHub", "Vercel", "Postman"],
  },
] as const;
