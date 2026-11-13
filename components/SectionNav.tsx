"use client";

import { useEffect, useState } from "react";
import { Cpu, FolderGit2, Mail, Trophy, User } from "lucide-react";
import { navItems } from "@/data/site";

const icons = {
  about: User,
  skills: Cpu,
  projects: FolderGit2,
  achievements: Trophy,
  contact: Mail,
} as const;

export default function SectionNav() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );

    for (const item of navItems) {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Section Navigation"
      className="sticky top-0 z-50 border-y border-line bg-canvas/90 backdrop-blur"
    >
      <div className="page-container flex items-center gap-2 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:justify-center sm:gap-4">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          const Icon = icons[item.id];
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={isActive ? "true" : undefined}
              aria-label={item.label}
              className={`group flex h-11 w-fit min-w-11 shrink-0 items-center justify-center gap-0 overflow-hidden transition-all duration-200 motion-safe:hover:-translate-y-0.5 hover:gap-2 hover:px-3 focus-visible:gap-2 focus-visible:px-3 motion-safe:hover:scale-105 sm:h-10 sm:min-w-10 ${
                isActive
                  ? "gap-2 rounded-none bg-accent/15 px-3 text-accent shadow-[0_0_16px_rgba(225,29,72,0.2)]"
                  : "rounded-none text-muted hover:bg-white hover:text-canvas"
              }`}
            >
              <Icon aria-hidden="true" className="size-5" />
              <span
                aria-hidden="true"
                className={`max-w-0 overflow-hidden whitespace-nowrap text-xs font-medium opacity-0 transition-[max-width,opacity] duration-500 ease-out group-hover:max-w-24 group-hover:opacity-100 group-focus-visible:max-w-24 group-focus-visible:opacity-100 ${
                  isActive ? "max-w-24 opacity-100" : ""
                }`}
              >
                {item.label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
