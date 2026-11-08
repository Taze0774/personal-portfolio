import Image from "next/image";
import Tilt from "@/components/Tilt";

export default function About() {
  return (
    <section id="about" className="border-t border-line py-20 md:py-28">
      <div className="page-container max-w-6xl">
        <div className="mb-14 md:mb-16">
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            <span aria-hidden="true" className="h-px w-8 bg-accent/60" />
            About Me
          </p>
          <h2 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-fg sm:text-4xl md:text-5xl">
            A little about me
          </h2>
        </div>

        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <Tilt
              maxTilt={6}
              scale={1.02}
              className="relative mx-auto w-full max-w-[340px] md:max-w-none"
            >
              <div
                aria-hidden="true"
                className="absolute -inset-4 rounded-[2rem] bg-accent/10 blur-2xl"
              />
              <div className="relative aspect-[3.8/4.8] overflow-hidden rounded-3xl border border-line bg-surface transition-colors hover:border-accent/50">
                <Image
                  src="/about me portrait.png"
                  alt="Illustrated portrait of Julian Paul Alzate"
                  fill
                  sizes="(max-width: 768px) 340px, 440px"
                  className="object-cover object-center"
                />
              </div>
            </Tilt>
          </div>

          <div className="space-y-6 text-sm leading-[1.8] text-muted sm:text-base md:col-span-7">
            <p className="font-medium text-fg">
              I&apos;m a fourth-year Bachelor of Science in Information
              Technology student at STI College Fairview with a growing
              interest in software and web development. I enjoy exploring
              technologies, building practical applications, and finding ways
              to turn ideas into functional digital solutions.
            </p>
            <p>
              Throughout my academic journey, I&apos;ve gained hands-on
              experience working with technologies such as Java, Python,
              Django, Next.js, JavaScript, and PostgreSQL. I&apos;ve also
              worked on projects involving web-based management systems,
              appointment platforms, and personal productivity applications,
              which have helped me develop my understanding of software
              development and problem-solving.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
