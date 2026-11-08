import { ArrowUp, Download, Mail } from "lucide-react";
import {
  FacebookIcon,
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
} from "@/components/BrandIcons";
import { site } from "@/data/site";

const socials = [
  { label: "Instagram", href: site.socials.instagram, Icon: InstagramIcon },
  { label: "Facebook", href: site.socials.facebook, Icon: FacebookIcon },
  { label: "GitHub", href: site.socials.github, Icon: GitHubIcon },
  { label: "LinkedIn", href: site.socials.linkedin, Icon: LinkedInIcon },
];

export default function Contact() {
  return (
    <section id="contact" className="border-t border-line py-20 md:py-28">
      <div className="page-container max-w-3xl text-center">
        <p className="flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
          <span aria-hidden="true" className="h-px w-8 bg-accent/60" />
          Contact
        </p>

        <h2 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-fg sm:text-4xl md:text-5xl">
          Let&apos;s build something together.
        </h2>

        <div className="mt-6 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-1.5 text-xs font-medium text-muted">
            <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
            Open to OJT opportunities
          </span>
        </div>

        <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-muted sm:text-base">
          I&apos;m open to internships, software projects, and learning
          environments where I can contribute. Feel free to reach out.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-accent/90 hover:shadow-[0_0_28px_rgba(59,130,246,0.45)]"
          >
            <Mail aria-hidden="true" className="size-4" />
            Email Me
          </a>

          {site.resume ? (
            <a
              href={site.resume}
              download
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3 text-sm font-semibold text-fg transition-all hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-[0_0_24px_rgba(59,130,246,0.25)]"
            >
              <Download aria-hidden="true" className="size-4" />
              Resume
            </a>
          ) : (
            <span
              aria-disabled="true"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3 text-sm font-semibold text-muted/60"
            >
              <Download aria-hidden="true" className="size-4" />
              Resume (soon)
            </span>
          )}
        </div>

        <div className="mt-8 flex items-center justify-center gap-3">
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

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 text-xs text-muted sm:flex-row">
          <p>© 2026 {site.name}</p>
          <a
            href="#home"
            className="inline-flex items-center gap-1.5 transition-all hover:-translate-y-0.5 hover:text-fg"
          >
            Back to top
            <ArrowUp aria-hidden="true" className="size-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
