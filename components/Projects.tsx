"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { GitHubIcon } from "@/components/BrandIcons";
import Tilt from "@/components/Tilt";
import { projects } from "@/data/projects";

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
  const [index, setIndex] = useState(0);
  const count = projects.length;

  return (
    <section id="projects" className="border-t border-line py-20 md:py-28">
      <div className="page-container max-w-6xl">
        <div className="mb-14 md:mb-16">
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            <span aria-hidden="true" className="h-px w-8 bg-accent/60" />
            Projects
          </p>
          <h2 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-fg sm:text-4xl md:text-5xl">
            Things I&apos;ve built
          </h2>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button
            type="button"
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            disabled={index === 0}
            aria-label="Previous project"
            className="flex size-9 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-fg transition-all hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-[0_0_20px_rgba(59,130,246,0.25)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-none sm:size-10"
          >
            <ChevronLeft aria-hidden="true" className="size-5" />
          </button>

          <div
            className="min-w-0 flex-1 overflow-hidden"
            role="region"
            aria-roledescription="carousel"
            aria-label="Projects"
          >
          <div
            className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {projects.map((project, slideIndex) => (
              <div
                key={project.slug}
                className="w-full shrink-0 px-0.5"
                role="group"
                aria-roledescription="slide"
                aria-label={`${slideIndex + 1} of ${count}`}
                aria-hidden={slideIndex !== index}
                inert={slideIndex !== index}
              >
                <Tilt maxTilt={3} scale={1.01} className="mx-auto max-w-5xl">
                  <article className="overflow-hidden rounded-3xl border border-line bg-surface transition-colors hover:border-accent/40">
                  <div className="relative aspect-video w-full overflow-hidden border-b border-line bg-gradient-to-br from-[#161B23] via-[#12161C] to-[#0A0C0F]">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={`${project.title} screenshot`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 960px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex size-full flex-col items-center justify-center gap-3 px-6 text-center">
                        <span
                          aria-hidden="true"
                          className="flex size-16 items-center justify-center rounded-2xl border border-line bg-canvas font-heading text-xl font-extrabold text-accent"
                        >
                          {initials(project.title)}
                        </span>
                        <span className="text-xs uppercase tracking-[0.25em] text-muted">
                          Screenshot coming soon
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-6 sm:p-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                      {project.category}
                    </p>
                    <h3 className="mt-2 font-heading text-xl font-extrabold tracking-tight text-fg sm:text-2xl">
                      {project.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                      {project.description ??
                        "Project description coming soon."}
                    </p>

                    <ul className="mt-5 flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <li
                          key={tech}
                          className="rounded-lg border border-line bg-canvas px-3 py-1.5 text-xs text-fg"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-line pt-5">
                      {project.links.live ? (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-xs font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-accent/90 hover:shadow-[0_0_20px_rgba(59,130,246,0.35)] sm:text-sm"
                        >
                          <ExternalLink aria-hidden="true" className="size-4" />
                          Live Demo
                        </a>
                      ) : (
                        <span
                          aria-disabled="true"
                          className="inline-flex items-center gap-2 rounded-full bg-accent/40 px-5 py-2.5 text-xs font-semibold text-white/60 sm:text-sm"
                        >
                          <ExternalLink aria-hidden="true" className="size-4" />
                          Live Demo
                        </span>
                      )}

                      {project.links.github ? (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-line bg-canvas px-5 py-2.5 text-xs font-semibold text-fg transition-all hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-[0_0_20px_rgba(59,130,246,0.25)] sm:text-sm"
                        >
                          <GitHubIcon className="size-4" />
                          Source Code
                        </a>
                      ) : (
                        <span
                          aria-disabled="true"
                          className="inline-flex items-center gap-2 rounded-full border border-line bg-canvas px-5 py-2.5 text-xs font-semibold text-muted/60 sm:text-sm"
                        >
                          <GitHubIcon className="size-4" />
                          Source Code
                        </span>
                      )}
                    </div>
                  </div>
                  </article>
                </Tilt>
              </div>
            ))}
          </div>
          </div>

          <button
            type="button"
            onClick={() => setIndex((i) => Math.min(count - 1, i + 1))}
            disabled={index === count - 1}
            aria-label="Next project"
            className="flex size-9 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-fg transition-all hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-[0_0_20px_rgba(59,130,246,0.25)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-none sm:size-10"
          >
            <ChevronRight aria-hidden="true" className="size-5" />
          </button>
        </div>

        {/* Dots & counter */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            {projects.map((project, dotIndex) => (
              <button
                key={project.slug}
                type="button"
                onClick={() => setIndex(dotIndex)}
                aria-label={`Go to ${project.title}`}
                aria-current={dotIndex === index ? "true" : undefined}
                className={`size-2.5 rounded-full transition-transform hover:scale-150 ${
                  dotIndex === index ? "bg-accent" : "bg-line hover:bg-muted"
                }`}
              />
            ))}
          </div>
          <p className="text-xs font-semibold tracking-[0.2em] text-muted">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(count).padStart(2, "0")}
          </p>
        </div>
      </div>
    </section>
  );
}
