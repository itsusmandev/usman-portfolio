export type Service = {
  title: string;
  description: string;
  icon: "code" | "store" | "search" | "server";
};

export const services: Service[] = [
  {
    title: "Custom Web Apps (MERN)",
    description: "Full-stack apps with React, Node, and MongoDB, built to ship and scale.",
    icon: "code",
  },
  {
    title: "E-commerce Stores",
    description: "Fashion and product stores with clean UX, SEO, and conversion-focused flows.",
    icon: "store",
  },
  {
    title: "Next.js / SEO Optimization",
    description: "Faster Next.js sites, structured content, and search-ready landing pages.",
    icon: "search",
  },
  {
    title: "API and Backend Development",
    description: "Secure APIs, auth, and databases with Express, NestJS, Prisma, and SQL.",
    icon: "server",
  },
];
