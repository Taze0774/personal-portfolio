import Image from "next/image";
import { Award } from "lucide-react";
import { achievements, type Achievement } from "@/data/achievements";

function AchievementFrame({
  item,
  aspect,
  rotate,
}: {
  item: Achievement;
  aspect: string;
  rotate: string;
}) {
  return (
    <figure
      tabIndex={0}
      aria-label={`${item.award}, ${item.title}, ${item.issuer}`}
      className={`group relative mb-5 break-inside-avoid overflow-hidden rounded-xl border border-line bg-surface p-2 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 motion-reduce:transition-none ${rotate}`}
    >
      <div
        className={`relative overflow-hidden rounded-lg bg-gradient-to-br from-[#161B23] via-[#12161C] to-[#0A0C0F] ${aspect}`}
      >
        {item.image ? (
          <Image
            src={item.image}
            alt={`${item.award} certificate`}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div className="flex size-full flex-col items-center justify-center gap-3 px-4 text-center">
            <Award aria-hidden="true" className="size-8 text-accent" />
            <span className="text-[0.6875rem] uppercase tracking-[0.2em] text-muted">
              Certificate image coming soon
            </span>
          </div>
        )}

        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100 motion-reduce:transition-none">
          <div>
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-accent">
              {item.award}
            </p>
            <p className="mt-1 text-sm font-bold text-fg">{item.title}</p>
            <p className="text-xs text-muted">{item.issuer}</p>
          </div>
        </div>
      </div>
    </figure>
  );
}

export default function Achievements() {
  return (
    <section id="achievements" className="border-t border-line py-20 md:py-28">
      <div className="page-container max-w-6xl">
        <div className="mb-14 md:mb-16">
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            <span aria-hidden="true" className="h-px w-8 bg-accent/60" />
            Achievements
          </p>
          <h2 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-fg sm:text-4xl md:text-5xl">
            Achievements &amp; certificates
          </h2>
        </div>

        <div className="columns-1 gap-5 sm:columns-2">
          <AchievementFrame
            item={achievements[0]}
            aspect="aspect-[4/3]"
            rotate="-rotate-1"
          />
          <AchievementFrame
            item={achievements[1]}
            aspect="aspect-[4/3]"
            rotate="rotate-1"
          />
        </div>
      </div>
    </section>
  );
}
