"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";

const INTRO_KEY = "intro-seen";
const EXIT_DURATION = 960;
const BLOCK_SIZE = 36;
const WAVE_DELAY = 480;
const FADE_DURATION = 450;
const DISSOLVE_COLOR = "#E11D48";

export default function Intro() {
  const [exiting, setExiting] = useState(false);
  const exitingRef = useRef(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const enterRef = useRef<(x: number, y: number) => void>(() => {});
  const timerRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

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

    const prepareCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const ctx = canvas.getContext("2d");
      if (!ctx) return null;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return { ctx, dpr, width, height };
    };

    const drawStill = () => {
      const sized = prepareCanvas();
      if (!sized) return;

      const { ctx, width, height } = sized;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#0A0C0F";
      ctx.fillRect(0, 0, width, height);

      const title = titleRef.current;
      if (!title) return;

      const rect = title.getBoundingClientRect();
      const style = getComputedStyle(title);

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#F5F7FA";
      ctx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      (
        ctx as CanvasRenderingContext2D & { letterSpacing?: string }
      ).letterSpacing = style.letterSpacing;

      ctx.fillText(
        title.dataset.text ?? title.textContent ?? "",
        rect.left + rect.width / 2,
        rect.top + rect.height / 2
      );
    };

    const finish = () => {
      root.dataset.intro = "seen";
      try {
        sessionStorage.setItem(INTRO_KEY, "1");
      } catch {
        // sessionStorage unavailable; intro will replay next load.
      }
      document.body.style.overflow = previousOverflow;
    };

    const dissolve = (clientX: number, clientY: number) => {
      const sized = prepareCanvas();
      if (!sized) {
        finish();
        return;
      }

      const { ctx, dpr, width, height } = sized;
      drawStill();

      const buffer = document.createElement("canvas");
      buffer.width = canvas.width;
      buffer.height = canvas.height;
      buffer.getContext("2d")?.drawImage(canvas, 0, 0);

      const cols = Math.ceil(width / BLOCK_SIZE);
      const rows = Math.ceil(height / BLOCK_SIZE);
      const maxDistance =
        Math.hypot(
          Math.max(clientX, width - clientX),
          Math.max(clientY, height - clientY)
        ) || 1;
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
            const x2 = x + BLOCK_SIZE;
            const y2 = y + BLOCK_SIZE;

            const shards = [
              {
                points: [x, y, x2, y, x, y2] as const,
                cx: x + BLOCK_SIZE / 3,
                cy: y + BLOCK_SIZE / 3,
              },
              {
                points: [x2, y2, x2, y, x, y2] as const,
                cx: x + (BLOCK_SIZE * 2) / 3,
                cy: y + (BLOCK_SIZE * 2) / 3,
              },
            ];

            for (const shard of shards) {
              const distance = Math.hypot(
                shard.cx - clientX,
                shard.cy - clientY
              );
              const delay = (distance / maxDistance) * WAVE_DELAY;
              const progress = Math.min(
                1,
                Math.max(0, (elapsed - delay) / FADE_DURATION)
              );

              if (progress >= 1) continue;
              remaining = true;

              const scale = 1 - progress * 0.7;
              const [ax, ay, bx, by, cx, cy] = shard.points;

              ctx.save();
              ctx.translate(shard.cx, shard.cy);
              ctx.scale(scale, scale);
              ctx.translate(-shard.cx, -shard.cy);

              ctx.globalAlpha = 1 - progress;
              ctx.beginPath();
              ctx.moveTo(ax, ay);
              ctx.lineTo(bx, by);
              ctx.lineTo(cx, cy);
              ctx.closePath();
              ctx.clip();
              ctx.drawImage(
                buffer,
                x * dpr,
                y * dpr,
                BLOCK_SIZE * dpr,
                BLOCK_SIZE * dpr,
                x,
                y,
                BLOCK_SIZE,
                BLOCK_SIZE
              );

              // Crimson glow that peaks as the wavefront passes.
              const tint = Math.sin(progress * Math.PI);
              ctx.globalAlpha = tint * 0.55;
              ctx.fillStyle = DISSOLVE_COLOR;
              ctx.beginPath();
              ctx.moveTo(ax, ay);
              ctx.lineTo(bx, by);
              ctx.lineTo(cx, cy);
              ctx.closePath();
              ctx.fill();
              ctx.restore();
            }
          }
        }

        if (remaining) {
          rafRef.current = requestAnimationFrame(frame);
        } else {
          ctx.clearRect(0, 0, width, height);
        }
      };

      rafRef.current = requestAnimationFrame(frame);
    };

    const enter = (originX: number, originY: number) => {
      if (exitingRef.current) return;
      exitingRef.current = true;
      setExiting(true);
      dissolve(originX, originY);

      timerRef.current = window.setTimeout(finish, EXIT_DURATION);
    };

    enterRef.current = enter;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        enter(window.innerWidth / 2, window.innerHeight / 2);
      }
    };

    const onResize = () => {
      if (!exitingRef.current) drawStill();
    };

    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    drawStill();
    document.fonts.ready.then(() => {
      if (!exitingRef.current) drawStill();
    });

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const title = site.name.toUpperCase();

  return (
    <div
      id="intro"
      role="button"
      tabIndex={0}
      aria-label="Enter portfolio"
      onClick={(event) => enterRef.current(event.clientX, event.clientY)}
      style={exiting ? { backgroundColor: "transparent" } : undefined}
      className={`fixed inset-0 z-[100] cursor-pointer overflow-hidden bg-canvas ${
        exiting ? "intro--exiting" : ""
      }`}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 size-full"
      />
      <div className="intro-scanlines" aria-hidden="true" />

      <div className="intro-stage relative flex min-h-full flex-col items-center justify-center px-6 text-center">
        <h1
          ref={titleRef}
          className="intro-title font-heading text-[clamp(2.75rem,11vw,10rem)] font-bold uppercase leading-none tracking-[-0.02em]"
          data-text={title}
        >
          {title}
        </h1>

        <p className="mt-6 flex max-w-[calc(100vw-3rem)] flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center text-[0.625rem] font-medium uppercase leading-relaxed tracking-[0.2em] text-muted sm:text-xs sm:tracking-[0.3em]">
          <span aria-hidden="true" className="size-1.5 bg-accent" />
          {site.role}
        </p>
      </div>

      <p className="intro-hint pointer-events-none absolute inset-x-0 bottom-14 text-center text-[0.625rem] font-semibold uppercase tracking-[0.3em] text-muted">
        Click to enter
      </p>
    </div>
  );
}
