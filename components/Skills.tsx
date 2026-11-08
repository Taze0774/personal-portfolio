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
import { Database } from "lucide-react";
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

export default function Skills() {
  return (
    <section id="skills" className="border-t border-line py-20 md:py-28">
      <div className="page-container max-w-6xl">
        <div className="mb-14 md:mb-16">
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            <span aria-hidden="true" className="h-px w-8 bg-accent/60" />
            Technical Skills
          </p>
          <h2 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-fg sm:text-4xl md:text-5xl">
            Tools I work with
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <Tilt
              key={group.title}
              maxTilt={4}
              scale={1.015}
              className="rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-accent/50 hover:shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
            >
              <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-fg">
                {group.title}
              </h3>
              <ul className="mt-5 flex flex-wrap gap-2.5">
                {group.skills.map((skill) => {
                  const Icon = icons[skill.icon];
                  return (
                    <li key={skill.name}>
                      <Tilt
                        maxTilt={10}
                        scale={1.05}
                        className="inline-flex items-center gap-2 rounded-lg border border-line bg-canvas px-3 py-2 text-xs text-muted transition-colors hover:border-accent/60 hover:text-fg sm:text-sm"
                      >
                        <Icon
                          aria-hidden="true"
                          className="size-4 shrink-0 text-accent"
                        />
                        <span className="text-fg">{skill.name}</span>
                        {skill.note && (
                          <span className="text-[0.6875rem] text-muted">
                            ({skill.note})
                          </span>
                        )}
                      </Tilt>
                    </li>
                  );
                })}
              </ul>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}
