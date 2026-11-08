"use client";

import { useEffect, useRef, useState } from "react";

const INTRO_KEY = "intro-seen";
const BLOCK_SIZE = 36;
const WAVE_DELAY = 480;
const FADE_DURATION = 450;
const DISSOLVE_COLOR = "#3B82F6";

export default function Intro() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const dissolvingRef = useRef(false);
  const clickHandlerRef = useRef<
    ((event: React.MouseEvent<HTMLDivElement>) => void) | null
  >(null);
  const [hintVisible, setHintVisible] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (root.dataset.intro === "seen" || prefersReducedMotion) {
      root.dataset.intro = "seen";
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const draw = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "#0A0C0F";
      ctx.fillRect(0, 0, width, height);

      const family =
        getComputedStyle(root).getPropertyValue("--font-display").trim() ||
        "sans-serif";
      const size = Math.min(width * 0.15, height * 0.26);

      ctx.font = `900 ${size}px ${family}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#F5F7FA";
      (
        ctx as CanvasRenderingContext2D & { letterSpacing?: string }
      ).letterSpacing = `${size * 0.02}px`;
      ctx.fillText("PORTFOLIO", width / 2, height / 2);

      ctx.fillStyle = "#3B82F6";
      ctx.beginPath();
      ctx.arc(
        width / 2,
        height / 2 + size * 0.85,
        size * 0.035,
        0,
        Math.PI * 2
      );
      ctx.fill();
    };

    let ready = false;
    document.fonts.ready.then(() => {
      ready = true;
      draw();
    });

    const handleResize = () => {
      if (ready && !dissolvingRef.current) draw();
    };

    const finish = () => {
      root.dataset.intro = "seen";
      try {
        sessionStorage.setItem(INTRO_KEY, "1");
      } catch {
        // sessionStorage unavailable; intro will replay next load.
      }
      document.body.style.overflow = previousOverflow;
      setHintVisible(false);
    };

    const dissolve = (clientX: number, clientY: number) => {
      if (dissolvingRef.current || !ready) return;
      dissolvingRef.current = true;
      setHintVisible(false);
      if (overlayRef.current) {
        overlayRef.current.style.backgroundColor = "transparent";
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        finish();
        return;
      }

      const dpr = canvas.width / window.innerWidth;
      const width = window.innerWidth;
      const height = window.innerHeight;

      const buffer = document.createElement("canvas");
      buffer.width = canvas.width;
      buffer.height = canvas.height;
      buffer.getContext("2d")?.drawImage(canvas, 0, 0);

      const cols = Math.ceil(width / BLOCK_SIZE);
      const rows = Math.ceil(height / BLOCK_SIZE);
      const maxDistance = Math.hypot(
        Math.max(clientX, width - clientX),
        Math.max(clientY, height - clientY)
      );
      const start = performance.now();

      const frame = (now: number) => {
        const elapsed = now - start;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, width, height);
        ctx.globalAlpha = 1;

        let remaining = false;

        for (let row = 0; row < rows; row += 1) {
          for (let col = 0; col < cols; col += 1) {
            const x = col * BLOCK_SIZE;
            const y = row * BLOCK_SIZE;
            const distance = Math.hypot(
              x + BLOCK_SIZE / 2 - clientX,
              y + BLOCK_SIZE / 2 - clientY
            );
            const delay = (distance / maxDistance) * WAVE_DELAY;
            const progress = Math.min(
              1,
              Math.max(0, (elapsed - delay) / FADE_DURATION)
            );

            if (progress >= 1) continue;
            remaining = true;

            const scale = 1 - progress * 0.7;
            const drawSize = BLOCK_SIZE * scale;
            const dx = x + BLOCK_SIZE / 2 - drawSize / 2;
            const dy = y + BLOCK_SIZE / 2 - drawSize / 2;

            ctx.globalAlpha = 1 - progress;
            ctx.drawImage(
              buffer,
              x * dpr,
              y * dpr,
              BLOCK_SIZE * dpr,
              BLOCK_SIZE * dpr,
              dx,
              dy,
              drawSize,
              drawSize
            );

            // Cold-blue glow that peaks as the wavefront passes.
            const tint = Math.sin(progress * Math.PI);
            ctx.globalAlpha = tint * 0.55;
            ctx.fillStyle = DISSOLVE_COLOR;
            ctx.fillRect(dx, dy, drawSize, drawSize);
          }
        }

        if (remaining) {
          rafRef.current = requestAnimationFrame(frame);
        } else {
          finish();
        }
      };

      rafRef.current = requestAnimationFrame(frame);
    };

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      dissolve(event.clientX, event.clientY);
    };
    clickHandlerRef.current = handleClick;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        dissolve(window.innerWidth / 2, window.innerHeight / 2);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", handleResize);
    draw();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", handleResize);
      clickHandlerRef.current = null;
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <div
      id="intro"
      ref={overlayRef}
      role="button"
      tabIndex={0}
      aria-label="Enter portfolio"
      onClick={(event) => clickHandlerRef.current?.(event)}
      className="fixed inset-0 z-[100] cursor-pointer bg-canvas"
    >
      <canvas ref={canvasRef} aria-hidden="true" className="size-full" />
      <p
        className={`pointer-events-none absolute inset-x-0 bottom-14 text-center text-xs font-semibold uppercase tracking-[0.3em] text-muted transition-opacity duration-300 ${
          hintVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        Click to enter
      </p>
    </div>
  );
}
