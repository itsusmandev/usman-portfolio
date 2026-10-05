export type ExperienceItem = {
  title: string;
  org: string;
  period: string;
  description: string;
  type: "work" | "venture" | "education";
};

export const experience: ExperienceItem[] = [
  {
    title: "MERN Stack Developer",
    org: "Dev Blends",
    period: "Apr 2024 — Jul 2026",
    description:
      "Built full-stack web and mobile apps with the MERN stack, Next.js, React Native, Tailwind CSS, and Material UI.",
    type: "work",
  },
  {
    title: "Front-End Developer",
    org: "Innovator Solution",
    period: "Jan 2022 — Jul 2022",
    description:
      "Built and styled responsive pages with HTML, CSS, and JavaScript, and gained hands-on React and Git experience.",
    type: "work",
  },
  {
    title: "E-commerce Fashion Brand",
    org: "Al Shanaz",
    period: "2023 — Present",
    description:
      "Building and co-running a premium women's fashion store, from storefront to growth work.",
    type: "venture",
  },
  {
    title: "Bachelor of Science, Computer Science",
    org: "Virtual University of Pakistan",
    period: "Apr 2025 — Apr 2029",
    description: "Computer science studies alongside freelance and product work.",
    type: "education",
  },
  {
    title: "Intermediate, Business/Commerce",
    org: "I.Com",
    period: "2022",
    description: "Completed Intermediate in Commerce before moving into full-stack development.",
    type: "education",
  },
];
