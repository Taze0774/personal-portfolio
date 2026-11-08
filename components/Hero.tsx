import Image from "next/image";
import {
  ArrowUpRight,
  ChevronDown,
  Download,
  Mouse,
} from "lucide-react";
import {
  FacebookIcon,
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
} from "@/components/BrandIcons";
import PortraitReveal from "@/components/PortraitReveal";
import Tilt from "@/components/Tilt";
import { site } from "@/data/site";

const socials = [
  { label: "Instagram", href: site.socials.instagram, Icon: InstagramIcon },
  { label: "Facebook", href: site.socials.facebook, Icon: FacebookIcon },
  { label: "GitHub", href: site.socials.github, Icon: GitHubIcon },
  { label: "LinkedIn", href: site.socials.linkedin, Icon: LinkedInIcon },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-dvh items-center overflow-hidden bg-canvas"
    >
      {/* Background banner */}
      <Image
        src="/background-banner.png"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-canvas via-canvas/85 to-canvas/25"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-canvas via-transparent to-canvas/40"
      />

      <div className="page-container relative grid grid-cols-1 items-center gap-12 pb-32 pt-24 md:grid-cols-2 md:gap-16 md:py-24">
        {/* Profile photo – first on mobile, right on desktop */}
        <div className="order-first flex justify-center md:order-last md:justify-end">
          <Tilt
            maxTilt={8}
            scale={1.03}
            className="relative size-56 sm:size-72 lg:size-[26rem]"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-accent/20 blur-3xl"
            />
            <div className="relative size-full overflow-hidden rounded-full border-4 border-line ring-1 ring-accent/40 transition-shadow hover:shadow-[0_0_45px_rgba(59,130,246,0.35)]">
              <PortraitReveal />
            </div>
          </Tilt>
        </div>

        {/* Name, bio, actions, socials */}
        <div className="text-center md:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            {site.role}
          </p>

          <h1 className="mt-4 font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-fg sm:text-5xl lg:text-6xl">
            {site.name}
          </h1>

          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-muted sm:text-base md:mx-0">
            {site.bio}
          </p>

          <p className="mt-5 flex items-center justify-center gap-2 text-xs font-medium text-emerald-300 sm:text-sm md:justify-start">
            <span aria-hidden="true" className="size-2 rounded-full bg-emerald-400" />
            Open to IT OJT Opportunities
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3 md:justify-start">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-accent/90 hover:shadow-[0_0_28px_rgba(59,130,246,0.45)]"
            >
              View My Projects
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>

            {site.resume ? (
              <a
                href={site.resume}
                download
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-6 py-3 text-sm font-semibold text-fg transition-all hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-[0_0_24px_rgba(59,130,246,0.25)]"
              >
                Download Resume
                <Download aria-hidden="true" className="size-4" />
              </a>
            ) : (
              <span
                aria-disabled="true"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-6 py-3 text-sm font-semibold text-muted/60"
              >
                Download Resume (soon)
                <Download aria-hidden="true" className="size-4" />
              </span>
            )}
          </div>

          <div className="mt-8 flex items-center justify-center gap-3 md:justify-start">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                aria-label={label}
                title={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="flex size-11 items-center justify-center rounded-full border border-line bg-surface text-muted transition-all duration-200 motion-safe:hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent hover:shadow-[0_0_20px_rgba(59,130,246,0.25)]"
              >
                <Icon className="size-5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#about"
        className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-muted transition-colors hover:text-fg"
      >
        <span className="text-[0.625rem] font-semibold uppercase tracking-[0.3em]">
          Scroll to explore
        </span>
        <span className="flex flex-col items-center gap-1">
          <Mouse aria-hidden="true" className="size-5" />
          <ChevronDown
            aria-hidden="true"
            className="size-4 motion-safe:animate-bounce"
          />
        </span>
      </a>
    </section>
  );
}
