export type Project = {
  slug: string;
  title: string;
  category: string;
  description?: string;
  technologies: string[];
  links: {
    live: string | null;
    github: string | null;
  };
  image?: string;
};

export const projects: Project[] = [
  {
    slug: "amg-dental",
    title: "AMG Dental Clinic – Online Appointment System",
    category: "Capstone Project",
    technologies: ["Django", "PostgreSQL", "Supabase", "JavaScript"],
    image: "/project - capstone.png",
    links: {
      live: null,
      github: null,
    },
  },
  {
    slug: "ideal",
    title: "IDEAL – Personal Workspace",
    category: "Web Application",
    technologies: ["Next.js", "Supabase", "Tailwind CSS"],
    image: "/project - ideal.png",
    links: {
      live: null,
      github: null,
    },
  },
  {
    slug: "portfolio",
    title: "Julian Paul Alzate – Portfolio",
    category: "Personal Website",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "react-icons"],
    image: "/project - portfolio.png",
    links: {
      live: null,
      github: null,
    },
  },
];
