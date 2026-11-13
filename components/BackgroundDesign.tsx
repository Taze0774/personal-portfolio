"use client";

import { useEffect, useRef } from "react";

type TriangleVariant = "outline" | "filled" | "gradient" | "glow" | "solid";

type Triangle = {
  variant: TriangleVariant;
  top: string;
  left?: string;
  right?: string;
  size: number;
  rotate: number;
  className?: string;
};

const triangles: Triangle[] = [
  { variant: "outline", top: "2%", left: "4%", size: 120, rotate: 12 },
  { variant: "filled", top: "5%", right: "8%", size: 64, rotate: -8 },
  {
    variant: "gradient",
    top: "8%",
    right: "12%",
    size: 180,
    rotate: 20,
    className: "hidden sm:block",
  },
  { variant: "outline", top: "14%", left: "12%", size: 56, rotate: -22 },
  {
    variant: "glow",
    top: "18%",
    right: "-2%",
    size: 220,
    rotate: 12,
    className: "hidden md:block",
  },
  { variant: "gradient", top: "26%", left: "2%", size: 120, rotate: -14 },
  {
    variant: "outline",
    top: "34%",
    right: "4%",
    size: 200,
    rotate: 18,
    className: "hidden sm:block",
  },
  { variant: "filled", top: "40%", left: "48%", size: 72, rotate: 30 },
  {
    variant: "glow",
    top: "47%",
    left: "-4%",
    size: 160,
    rotate: -10,
    className: "hidden md:block",
  },
  { variant: "outline", top: "54%", right: "14%", size: 96, rotate: -26 },
  {
    variant: "gradient",
    top: "60%",
    right: "6%",
    size: 240,
    rotate: 8,
    className: "hidden sm:block",
  },
  { variant: "filled", top: "66%", left: "6%", size: 48, rotate: 14 },
  {
    variant: "outline",
    top: "74%",
    left: "40%",
    size: 140,
    rotate: -18,
    className: "hidden md:block",
  },
  {
    variant: "glow",
    top: "80%",
    right: "6%",
    size: 200,
    rotate: 24,
    className: "hidden sm:block",
  },
  { variant: "gradient", top: "88%", left: "12%", size: 90, rotate: 10 },
  { variant: "filled", top: "94%", right: "30%", size: 60, rotate: -12 },

  // Small solid dark-red accents
  { variant: "solid", top: "3%", left: "26%", size: 22, rotate: 18 },
  { variant: "solid", top: "7%", right: "30%", size: 30, rotate: -24 },
  { variant: "solid", top: "11%", left: "58%", size: 18, rotate: 42 },
  { variant: "solid", top: "16%", right: "18%", size: 26, rotate: 12 },
  { variant: "solid", top: "22%", left: "22%", size: 34, rotate: -36 },
  { variant: "solid", top: "29%", right: "42%", size: 20, rotate: 28 },
  { variant: "solid", top: "36%", left: "70%", size: 28, rotate: -14 },
  { variant: "solid", top: "43%", left: "16%", size: 24, rotate: 52 },
  { variant: "solid", top: "51%", right: "26%", size: 32, rotate: -40 },
  { variant: "solid", top: "58%", left: "34%", size: 18, rotate: 16 },
  { variant: "solid", top: "64%", right: "52%", size: 26, rotate: -22 },
  { variant: "solid", top: "70%", left: "62%", size: 22, rotate: 38 },
  { variant: "solid", top: "77%", right: "12%", size: 34, rotate: 8 },
  { variant: "solid", top: "84%", left: "28%", size: 20, rotate: -30 },
  { variant: "solid", top: "91%", right: "44%", size: 28, rotate: 24 },
  { variant: "solid", top: "96%", left: "68%", size: 24, rotate: -18 },
];

function TriangleShape({
  variant,
  id,
}: {
  variant: TriangleVariant;
  id: string;
}) {
  const points = "50 4 96 92 4 92";

  return (
    <svg viewBox="0 0 100 104" className="size-full" aria-hidden="true">
      {variant === "gradient" && (
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E11D48" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#E11D48" stopOpacity="0" />
          </linearGradient>
        </defs>
      )}
      <polygon
        points={points}
        fill={
          variant === "outline"
            ? "none"
            : variant === "gradient"
              ? `url(#${id})`
              : variant === "solid"
                ? "#7F1D1D"
                : "#E11D48"
        }
        fillOpacity={
          variant === "outline"
            ? 0
            : variant === "glow"
              ? 0.16
              : variant === "solid"
                ? 0.7
                : 0.07
        }
        stroke={variant === "outline" ? "#3A424E" : "none"}
        strokeWidth={variant === "outline" ? 1.2 : 0}
        strokeLinejoin="round"
        style={
          variant === "glow"
            ? { filter: "blur(18px)" }
            : undefined
        }
      />
    </svg>
  );
}

export default function BackgroundDesign() {
  const auraRef = useRef<HTMLDivElement>(null);
  const trianglesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(min-width: 768px)").matches) return;

    let frame: number | null = null;

    const update = () => {
      frame = null;
      const scrollY = window.scrollY;
      const auraOffset = Math.min(scrollY * 0.06, 100);
      const triangleOffset = Math.min(scrollY * 0.03, 100);

      if (auraRef.current) {
        auraRef.current.style.transform = `translate3d(0, ${auraOffset}px, 0)`;
      }
      if (trianglesRef.current) {
        trianglesRef.current.style.transform = `translate3d(0, ${triangleOffset}px, 0)`;
      }
    };

    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* Wavy crimson aura */}
      <div ref={auraRef} className="absolute inset-0">
        <div className="absolute -left-1/4 top-[6%] size-[42rem] rounded-full bg-[radial-gradient(circle,rgba(225,29,72,0.16),transparent_70%)] blur-3xl motion-safe:animate-aura-a" />
        <div className="absolute -right-1/4 top-[24%] size-[38rem] rounded-full bg-[radial-gradient(circle,rgba(225,29,72,0.13),transparent_70%)] blur-3xl motion-safe:animate-aura-b" />
        <div className="absolute -left-1/3 top-[48%] size-[40rem] rounded-full bg-[radial-gradient(circle,rgba(225,29,72,0.14),transparent_70%)] blur-3xl motion-safe:animate-aura-b" />
        <div className="absolute -right-1/3 top-[72%] size-[44rem] rounded-full bg-[radial-gradient(circle,rgba(225,29,72,0.15),transparent_70%)] blur-3xl motion-safe:animate-aura-a" />
        <div className="absolute left-1/4 top-[90%] size-[36rem] rounded-full bg-[radial-gradient(circle,rgba(225,29,72,0.12),transparent_70%)] blur-3xl motion-safe:animate-aura-a" />
      </div>

      {/* Mixed-style triangles */}
      <div ref={trianglesRef} className="absolute inset-0">
        <ul>
          {triangles.map((triangle, index) => {
            const id = `triangle-gradient-${index}`;

            return (
              <li
                key={id}
                className={`absolute ${triangle.className ?? ""}`}
                style={{
                  top: triangle.top,
                  left: triangle.left,
                  right: triangle.right,
                  width: triangle.size,
                  height: triangle.size,
                  transform: `rotate(${triangle.rotate}deg)`,
                }}
              >
                <TriangleShape variant={triangle.variant} id={id} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
