"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Code2, ExternalLink, FileCode2, X } from "lucide-react";
import type { IconType } from "react-icons";
import {
  SiDjango,
  SiJavascript,
  SiNextdotjs,
  SiPostgresql,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { GitHubIcon } from "@/components/BrandIcons";
import Reveal from "@/components/Reveal";
import { projects, type Project } from "@/data/projects";

const techIcons: Record<string, IconType> = {
  Django: SiDjango,
  PostgreSQL: SiPostgresql,
  Supabase: SiSupabase,
  JavaScript: SiJavascript,
  "Next.js": SiNextdotjs,
  "Tailwind CSS": SiTailwindcss,
  TypeScript: SiTypescript,
};

function initials(title: string) {
  return title
    .replace(/[^A-Za-z ]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !selected) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (!dialog.open) dialog.showModal();

    return () => {
      document.body.style.overflow = previousOverflow;
      if (dialog.open) dialog.close();
    };
  }, [selected]);

  const openProject = (project: Project, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setSelected(project);
  };

  const closeProject = () => {
    dialogRef.current?.close();
  };

  const handleDialogClose = () => {
    setSelected(null);
    triggerRef.current?.focus();
  };

  return (
    <section id="projects" className="border-t border-line py-20 md:py-28">
      <div className="page-container max-w-6xl">
        <Reveal className="mb-14 md:mb-16">
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            <span aria-hidden="true" className="h-px w-8 bg-accent/60" />
            Projects
          </p>
          <h2 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-fg sm:text-4xl md:text-5xl">
            Things I&apos;ve built
          </h2>
        </Reveal>

        <Reveal className="overflow-hidden rounded-2xl border border-line bg-surface/40">
          <div className="flex items-center gap-4 border-b border-line bg-canvas/70 px-4 py-3 sm:px-5">
            <div aria-hidden="true" className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-accent/80" />
              <span className="size-2.5 rounded-full bg-line" />
              <span className="size-2.5 rounded-full bg-line" />
            </div>
            <p className="flex-1 text-xs font-medium tracking-[0.15em] text-muted">
              ~/projects
            </p>
            <p className="text-[0.625rem] uppercase tracking-[0.2em] text-muted">
              {projects.length} files
            </p>
          </div>

          <ul className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-3 sm:gap-4 sm:p-6">
            {projects.map((project, index) => (
              <li key={project.slug}>
                <Reveal delay={index * 70} className="h-full">
                  <button
                    type="button"
                    onClick={(event) =>
                      openProject(project, event.currentTarget)
                    }
                    className="group flex h-full w-full flex-col items-center gap-3 rounded-xl border border-line bg-canvas/40 px-4 py-6 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/60 hover:bg-surface hover:shadow-[0_0_24px_rgba(225,29,72,0.18)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                  >
                    <FileCode2
                      aria-hidden="true"
                      className="size-10 text-muted transition-colors duration-200 group-hover:text-accent"
                    />
                    <span className="text-xs font-medium text-fg sm:text-sm">
                      {project.slug}
                    </span>
                  </button>
                </Reveal>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <dialog
        ref={dialogRef}
        onClose={handleDialogClose}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeProject();
        }}
        aria-labelledby="project-dialog-title"
        className="project-dialog m-auto w-[calc(100vw-1.5rem)] max-w-none bg-transparent p-0 text-fg sm:w-[min(92vw,48rem)]"
      >
        {selected && (
          <div className="max-h-[85dvh] overflow-y-auto overscroll-contain rounded-2xl border border-line bg-surface shadow-2xl">
            <div className="flex items-center gap-4 border-b border-line px-5 py-4 sm:px-6">
              <p className="flex-1 truncate text-xs font-medium tracking-[0.15em] text-muted">
                ~/projects/{selected.slug}
              </p>
              <button
                type="button"
                onClick={closeProject}
                aria-label="Close project"
                className="flex size-9 shrink-0 items-center justify-center rounded-md border border-line bg-canvas text-muted transition-colors hover:border-accent/60 hover:text-fg"
              >
                <X aria-hidden="true" className="size-4" />
              </button>
            </div>

            <div className="grid gap-6 p-5 sm:p-6 md:grid-cols-[1.1fr_1fr] md:items-start">
              <div className="relative aspect-video overflow-hidden rounded-xl border border-line bg-gradient-to-br from-[#161B23] via-[#12161C] to-[#0A0C0F]">
                {selected.image ? (
                  <Image
                    src={selected.image}
                    alt={`${selected.title} screenshot`}
                    fill
                    sizes="(max-width: 768px) 92vw, 480px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex size-full flex-col items-center justify-center gap-3 px-6 text-center">
                    <span
                      aria-hidden="true"
                      className="flex size-16 items-center justify-center rounded-2xl border border-line bg-canvas font-heading text-xl font-extrabold text-accent"
                    >
                      {initials(selected.title)}
                    </span>
                    <span className="text-xs uppercase tracking-[0.25em] text-muted">
                      Screenshot coming soon
                    </span>
                  </div>
                )}
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  {selected.category}
                </p>
                <h3
                  id="project-dialog-title"
                  className="mt-2 font-heading text-2xl font-extrabold tracking-tight text-fg sm:text-3xl"
                >
                  {selected.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                  {selected.description ?? "Project description coming soon."}
                </p>
              </div>
            </div>

            <div className="border-t border-line px-5 py-4 sm:px-6">
              <p className="text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-muted">
                Tech stack
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {selected.technologies.map((tech) => {
                  const Icon = techIcons[tech] ?? Code2;

                  return (
                    <li key={tech}>
                      <span
                        tabIndex={0}
                        aria-label={tech}
                        title={tech}
                        className="group/tech flex h-10 w-fit items-center justify-center gap-2 overflow-hidden rounded-full border border-line bg-canvas px-3 transition-all duration-200 hover:border-accent/40 sm:min-w-10 sm:gap-0 sm:px-0 sm:hover:gap-2 sm:hover:px-3 sm:focus-visible:gap-2 sm:focus-visible:px-3 motion-safe:hover:-translate-y-0.5 motion-reduce:transition-none"
                      >
                        <Icon
                          aria-hidden="true"
                          className="size-4 shrink-0 text-accent"
                        />
                        <span
                          aria-hidden="true"
                          className="max-w-32 overflow-hidden whitespace-nowrap text-xs font-medium text-fg opacity-100 transition-[max-width,opacity] duration-300 ease-out sm:max-w-0 sm:opacity-0 sm:group-hover/tech:max-w-32 sm:group-hover/tech:opacity-100 sm:group-focus-visible/tech:max-w-32 sm:group-focus-visible/tech:opacity-100"
                        >
                          {tech}
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="flex flex-wrap items-center gap-3 border-t border-line px-5 py-4 sm:px-6">
              {selected.links.live ? (
                <a
                  href={selected.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-none bg-accent px-5 py-2.5 text-xs font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white hover:text-canvas hover:shadow-[0_0_20px_rgba(225,29,72,0.35)] sm:w-auto sm:text-sm"
                >
                  <ExternalLink aria-hidden="true" className="size-4" />
                  Live Demo
                </a>
              ) : (
                <span
                  aria-disabled="true"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-none bg-accent/40 px-5 py-2.5 text-xs font-semibold text-white/60 sm:w-auto sm:text-sm"
                >
                  <ExternalLink aria-hidden="true" className="size-4" />
                  Live Demo
                </span>
              )}

              {selected.links.github ? (
                <a
                  href={selected.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-none border border-line bg-canvas px-5 py-2.5 text-xs font-semibold text-fg transition-all hover:-translate-y-0.5 hover:border-accent/60 hover:bg-white hover:text-canvas hover:shadow-[0_0_20px_rgba(225,29,72,0.25)] sm:w-auto sm:text-sm"
                >
                  <GitHubIcon className="size-4" />
                  Source Code
                </a>
              ) : (
                <span
                  aria-disabled="true"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-none border border-line bg-canvas px-5 py-2.5 text-xs font-semibold text-muted/60 sm:w-auto sm:text-sm"
                >
                  <GitHubIcon className="size-4" />
                  Source Code
                </span>
              )}
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
