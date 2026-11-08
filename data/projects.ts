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
    description:
      "An online appointment system developed for AMG Dental Clinic – Commonwealth Branch, designed to streamline appointment scheduling and clinic management.",
    technologies: ["Django", "PostgreSQL", "Supabase", "JavaScript"],
    image: "/project - capstone.png",
    links: {
      live: "https://amg-appt-sys.onrender.com/",
      github: "https://github.com/AMG-Capstone-Team/IT-Capstone-2",
    },
  },
  {
    slug: "ideal",
    title: "IDEAL – Personal Workspace",
    category: "Web Application",
    description:
      "A contextual workspace to organize your spaces for school, work, and projects, and track what matters.",
    technologies: ["Next.js", "Supabase", "Tailwind CSS"],
    image: "/project - ideal.png",
    links: {
      live: "https://ideal-sage.vercel.app/",
      github: "https://github.com/Taze0774/IDEAL",
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
      github: "https://github.com/Taze0774/Personal-Portfolio",
    },
  },
];
