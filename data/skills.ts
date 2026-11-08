export type SkillIconKey =
  | "html"
  | "css"
  | "javascript"
  | "java"
  | "python"
  | "sql"
  | "django"
  | "nextjs"
  | "postgresql"
  | "supabase"
  | "androidstudio"
  | "vscode";

export type Skill = {
  name: string;
  icon: SkillIconKey;
  note?: string;
};

export type SkillGroup = {
  title: string;
  skills: Skill[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    skills: [
      { name: "HTML", icon: "html" },
      { name: "CSS", icon: "css" },
      { name: "JavaScript", icon: "javascript" },
      { name: "Java", icon: "java" },
      { name: "Python", icon: "python" },
      { name: "SQL", icon: "sql" },
    ],
  },
  {
    title: "Frameworks",
    skills: [
      { name: "Django", icon: "django" },
      { name: "Next.js", icon: "nextjs", note: "basic" },
    ],
  },
  {
    title: "Backend & Data",
    skills: [
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "Supabase", icon: "supabase" },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Android Studio", icon: "androidstudio" },
      { name: "VS Code", icon: "vscode" },
    ],
  },
];
