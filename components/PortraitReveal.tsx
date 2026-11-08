"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const sizes = "(max-width: 640px) 224px, (max-width: 1024px) 288px, 416px";
const BLOCK_SIZE = 10;
const REVEAL_RATIO = 0.225;

export default function PortraitReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const pointerRef = useRef<{ x: number; y: number } | null>(null);
  const drawRef = useRef<(x: number, y: number) => void>(() => {});
  const clearRef = useRef<() => void>(() => {});

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const sizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
    };

    const clear = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const draw = (pointerX: number, pointerY: number) => {
      const image = imageRef.current;
      const rect = container.getBoundingClientRect();
      if (!image || rect.width === 0 || rect.height === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (
        canvas.width !== Math.round(rect.width * dpr) ||
        canvas.height !== Math.round(rect.height * dpr)
      ) {
        sizeCanvas();
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, rect.width, rect.height);

      // object-cover mapping from frame space to image space.
      const scale = Math.max(
        rect.width / image.naturalWidth,
        rect.height / image.naturalHeight
      );
      const offsetX = (rect.width - image.naturalWidth * scale) / 2;
      const offsetY = (rect.height - image.naturalHeight * scale) / 2;

      const radius = Math.min(rect.width, rect.height) * REVEAL_RATIO;

      for (let y = 0; y < rect.height; y += BLOCK_SIZE) {
        for (let x = 0; x < rect.width; x += BLOCK_SIZE) {
          const centerX = x + BLOCK_SIZE / 2;
          const centerY = y + BLOCK_SIZE / 2;

          if (Math.hypot(centerX - pointerX, centerY - pointerY) > radius) {
            continue;
          }

          const width = Math.min(BLOCK_SIZE, rect.width - x);
          const height = Math.min(BLOCK_SIZE, rect.height - y);

          ctx.drawImage(
            image,
            (x - offsetX) / scale,
            (y - offsetY) / scale,
            width / scale,
            height / scale,
            x,
            y,
            width,
            height
          );
        }
      }
    };

    drawRef.current = draw;
    clearRef.current = clear;

    const image = new window.Image();
    image.onload = () => {
      imageRef.current = image;
      if (pointerRef.current) {
        draw(pointerRef.current.x, pointerRef.current.y);
      }
    };
    image.src = "/about-portrait.png";

    const observer = new ResizeObserver(() => {
      sizeCanvas();
      if (pointerRef.current) {
        draw(pointerRef.current.x, pointerRef.current.y);
      } else {
        clear();
      }
    });
    observer.observe(container);
    sizeCanvas();

    return () => observer.disconnect();
  }, []);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;

    const rect = event.currentTarget.getBoundingClientRect();
    const point = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
    pointerRef.current = point;
    drawRef.current(point.x, point.y);
  };

  const handlePointerLeave = () => {
    pointerRef.current = null;
    clearRef.current();
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative size-full"
    >
      <Image
        src="/profile image.png"
        alt="Portrait of Julian Paul Alzate"
        priority
        fill
        sizes={sizes}
        className="object-cover object-center"
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 size-full"
      />
    </div>
  );
}
