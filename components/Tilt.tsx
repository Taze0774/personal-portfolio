"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type TiltProps = {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
};

const REST_TRANSFORM =
  "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";

export default function Tilt({
  children,
  className,
  maxTilt = 6,
  scale = 1.02,
}: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);
  const [transform, setTransform] = useState(REST_TRANSFORM);

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      setTransform(
        `perspective(900px) rotateX(${(-y * maxTilt).toFixed(2)}deg) rotateY(${(x * maxTilt).toFixed(2)}deg) scale(${scale})`
      );
    });
  };

  const reset = useCallback(() => {
    if (frame.current !== null) {
      cancelAnimationFrame(frame.current);
      frame.current = null;
    }
    setTransform(REST_TRANSFORM);
  }, []);

  useEffect(() => {
    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      onBlur={reset}
      style={{ transform, transformStyle: "preserve-3d" }}
      className={`transition-transform duration-200 ease-out will-change-transform motion-reduce:transition-none ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
