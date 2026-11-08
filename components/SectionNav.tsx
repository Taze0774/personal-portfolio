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
              title={item.label}
              className={`flex size-10 shrink-0 items-center justify-center rounded-full transition-all duration-200 motion-safe:hover:-translate-y-0.5 hover:scale-105 ${
                isActive
                  ? "bg-accent/15 text-accent shadow-[0_0_16px_rgba(59,130,246,0.2)]"
                  : "text-muted hover:bg-surface hover:text-fg"
              }`}
            >
              <Icon aria-hidden="true" className="size-5" />
              <span className="sr-only">{item.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
