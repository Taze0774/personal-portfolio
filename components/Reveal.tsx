"use client";

import { useEffect, useRef, useState } from "react";

type RevealVariant = "up" | "left" | "right" | "scale";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
};

const HIDDEN_STATES: Record<RevealVariant, string> = {
  up: "motion-safe:translate-y-4 motion-safe:opacity-0",
  left: "motion-safe:-translate-x-5 motion-safe:opacity-0",
  right: "motion-safe:translate-x-5 motion-safe:opacity-0",
  scale:
    "motion-safe:translate-y-3 motion-safe:scale-[0.98] motion-safe:opacity-0",
};

export default function Reveal({
  children,
  className,
  delay = 0,
  variant = "up",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: shown ? `${delay}ms` : undefined }}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none ${
        shown
          ? "translate-x-0 translate-y-0 scale-100 opacity-100"
          : HIDDEN_STATES[variant]
      } ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
