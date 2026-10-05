export type ProjectCategory = "E-commerce" | "Web App";

export type Project = {
  slug: string;
  title: string;
  summary: string;
  category: ProjectCategory;
  image: string;
  tech: string[];
  live?: string;
  repo?: string;
  featured?: boolean;
  problem?: string;
  solution?: string;
  features?: string[];
};

export const projectFilters = ["All", "E-commerce", "Web Apps"] as const;

export const projects: Project[] = [
  {
    slug: "focus-blade",
    title: "Focus Blade",
    summary:
      "Productivity suite with web app, Chrome extension, and React Native mobile — plan your day and block distractions.",
    category: "Web App",
    image: "/images/projects/focus-blade.png",
    tech: ["Next.js", "MERN", "React Native", "Chrome APIs"],
    live: "https://focusblade.com/",
    featured: true,
    problem:
      "People list tasks but still lose hours to distractions and never follow the plan.",
    solution:
      "Built a full productivity system — web app, browser extension, and mobile — that plans the day and intervenes when focus slips.",
    features: [
      "Task planning with priorities and due dates",
      "Focus mode with distraction blocking",
      "Chrome and Firefox companion extensions",
      "React Native apps for iOS and Android",
    ],
  },
  {
    slug: "al-shanaz",
    title: "Al Shanaz",
    summary: "Premium women's fashion online store with SEO and growth work.",
    category: "E-commerce",
    image: "/images/projects/al-shanaz.png",
    tech: ["Next.js", "Tailwind CSS", "Node.js", "MongoDB"],
    live: "https://www.alshanaz.com/",
    featured: true,
    problem: "A fashion brand needed a faster storefront that could rank and convert.",
    solution: "Built a modern e-commerce site with SEO-ready pages and a clean shopping flow.",
    features: ["Product catalog", "SEO landing pages", "Mobile-first checkout"],
  },
  {
    slug: "arenaops",
    title: "ArenaOps",
    summary:
      "Full-stack arena booking platform — same product on web and app for browsing and reserving slots.",
    category: "Web App",
    image: "/images/projects/arenaops.png",
    tech: ["MongoDB", "Express.js", "React", "Node.js"],
    live: "https://arenaops.pk/",
    featured: true,
    problem:
      "Arena and venue operators needed a reliable way to manage bookings and schedules online.",
    solution:
      "Built a MERN booking platform with auth, scheduling, and a responsive UI that works as both web and app.",
    features: [
      "Arena slot booking and scheduling",
      "Auth and management dashboard",
      "Web and app experience",
      "Responsive booking UI",
    ],
  },
  {
    slug: "wellspring-dentistry",
    title: "Wellspring Dentistry",
    summary:
      "Business website for a dental clinic with services, booking, and patient testimonials.",
    category: "Web App",
    image: "/images/projects/wellspring-dentistry.png",
    tech: ["React.js", "Tailwind CSS"],
    live: "https://www.wellspring-dentistry.com/",
    featured: true,
    problem:
      "A dental clinic needed a modern site to showcase services and drive appointment bookings.",
    solution:
      "Developed a responsive React site with service listings, appointment booking CTAs, and patient testimonials.",
    features: [
      "Service catalog",
      "Appointment booking flow",
      "Patient testimonials",
      "Mobile-responsive layouts",
    ],
  },
];
