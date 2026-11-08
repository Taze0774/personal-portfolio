import type { IconType } from "react-icons";
import {
  SiAndroidstudio,
  SiCss,
  SiDjango,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiOpenjdk,
  SiPostgresql,
  SiPython,
  SiSupabase,
} from "react-icons/si";
import {
  Code2,
  Database,
  Layers,
  Server,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { TbBrandVscode } from "react-icons/tb";
import Tilt from "@/components/Tilt";
import { skillGroups, type SkillIconKey } from "@/data/skills";

const icons: Record<SkillIconKey, IconType> = {
  html: SiHtml5,
  css: SiCss,
  javascript: SiJavascript,
  java: SiOpenjdk,
  python: SiPython,
  sql: Database,
  django: SiDjango,
  nextjs: SiNextdotjs,
  postgresql: SiPostgresql,
  supabase: SiSupabase,
  androidstudio: SiAndroidstudio,
  vscode: TbBrandVscode,
};

const categoryMeta: Record<
  string,
  {
    icon: LucideIcon;
    tagline: string;
    colSpan: string;
  }
> = {
  Languages: {
    icon: Code2,
    tagline: "Core programming & markup",
    colSpan: "lg:col-span-7",
  },
  Frameworks: {
    icon: Layers,
    tagline: "Fullstack & web libraries",
    colSpan: "lg:col-span-5",
  },
  "Backend & Data": {
    icon: Server,
    tagline: "Databases & cloud services",
    colSpan: "lg:col-span-5",
  },
  Tools: {
    icon: Wrench,
    tagline: "IDEs & development environments",
    colSpan: "lg:col-span-7",
  },
};

export default function Skills() {
  return (
    <section id="skills" className="border-t border-line py-20 md:py-28">
      <div className="page-container max-w-6xl">
        {/* Section Header */}
        <div className="mb-14 md:mb-16">
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            <span aria-hidden="true" className="h-px w-8 bg-accent/60" />
            Technical Skills
          </p>
          <h2 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-fg sm:text-4xl md:text-5xl">
            Tools I work with
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-12">
          {skillGroups.map((group) => {
            const meta = categoryMeta[group.title] ?? {
              icon: Code2,
              tagline: "",
              colSpan: "lg:col-span-6",
            };
            const CategoryIcon = meta.icon;

            return (
              <Tilt
                key={group.title}
                maxTilt={4}
                scale={1.015}
                className={`relative flex flex-col justify-between overflow-hidden rounded-2xl border border-line bg-surface p-6 sm:p-7 transition-colors hover:border-accent/50 hover:shadow-[0_10px_30px_rgba(0,0,0,0.35)] ${meta.colSpan}`}
              >
                {/* Ambient accent glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-accent/5 blur-3xl transition-opacity hover:opacity-100"
                />

                <div className="relative z-10">
                  {/* Category Header */}
                  <div className="flex items-center gap-3 border-b border-line pb-4">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-line bg-canvas text-accent">
                      <CategoryIcon aria-hidden="true" className="size-4" />
                    </span>
                    <div>
                      <h3 className="font-heading text-base font-semibold tracking-tight text-fg sm:text-lg">
                        {group.title}
                      </h3>
                      <p className="text-xs text-muted">{meta.tagline}</p>
                    </div>
                  </div>

                  {/* Pills List - content-wrapping flex layout */}
                  <div className="mt-6 flex flex-wrap gap-2.5 sm:gap-3">
                    {group.skills.map((skill) => {
                      const Icon = icons[skill.icon];

                      return (
                        <div
                          key={skill.name}
                          className="group inline-flex min-h-11 items-center gap-2.5 rounded-full border border-line bg-canvas px-4 py-2 text-fg shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/60 hover:bg-surface hover:shadow-[0_0_16px_rgba(59,130,246,0.15)] sm:min-h-12 sm:px-5 sm:py-2.5"
                        >
                          <Icon
                            aria-hidden="true"
                            className="size-[18px] shrink-0 text-accent transition-transform duration-200 group-hover:scale-110 sm:size-5"
                          />
                          <span className="text-xs font-medium tracking-tight text-fg sm:text-sm">
                            {skill.name}
                          </span>
                          {skill.note && (
                            <span className="rounded-full bg-surface px-1.5 py-0.5 text-[9px] font-medium leading-none text-muted">
                              {skill.note}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Tilt>
            );
          })}
        </div>
      </div>
    </section>
  );
}
