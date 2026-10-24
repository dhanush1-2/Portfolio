"use client";

import { useEffect, useRef, type CSSProperties, type RefObject } from "react";

// Native canvas port of the 21st.dev "Gateway Flow" background: dotted bezier paths
// streaming in from both edges and converging on a focus point. The original ran the
// effect inside an iframe that loaded Tailwind CDN, GSAP, Iconify and Google Fonts;
// this version draws the same canvas directly and pauses when it is off screen.

type FlowMode = "dark" | "light";

export type GatewayFlowProps = {
  mode?: FlowMode;
  /** Animation speed multiplier (0–3) */
  speed?: number;
  /** Line thickness multiplier */
  size?: number;
  /** Path count multiplier (base 80 paths) */
  density?: number;
  /** Overall opacity (0–1) */
  opacity?: number;
  /** Element the paths converge on; defaults to the canvas centre */
  focusRef?: RefObject<HTMLElement | null>;
  className?: string;
  style?: CSSProperties;
};

type Particle = { t: number; speed: number };
type FlowPath = { isLeft: boolean; startY: number; particle: Particle };

const PALETTE: Record<FlowMode, { line: string; dot: string }> = {
  dark: { line: "rgba(255, 255, 255, 0.35)", dot: "rgba(255, 255, 255, 0.7)" },
  light: { line: "rgba(26, 31, 42, 0.4)", dot: "rgba(26, 31, 42, 0.75)" },
};

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

function bezier(t: number, a: number, b: number, c: number, d: number) {
  const u = 1 - t;
  return u * u * u * a + 3 * u * u * t * b + 3 * u * t * t * c + t * t * t * d;
}

export default function GatewayFlow({
  mode = "dark",
  speed = 1,
  size = 1,
  density = 1,
  opacity = 1,
  focusRef,
  className,
  style,
}: GatewayFlowProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const colors = PALETTE[mode];
    const safeSpeed = clamp(speed, 0, 3);
    const lineWidth = 1.2 * clamp(size, 0.25, 8);
    const numPaths = Math.max(12, Math.round(80 * clamp(density, 0.25, 2.5)));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let focusX = 0;
    let focusY = 0;
    let frame = 0;
    let visible = false;

    // startY is stored as a fraction of height so paths survive resizes
    const paths: FlowPath[] = Array.from({ length: numPaths }, (_, i) => ({
      isLeft: i % 2 === 0,
      startY: (i / numPaths) * 1.4 - 0.2,
      particle: { t: Math.random(), speed: 0.0015 + Math.random() * 0.002 },
    }));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = focusRef?.current;
      if (target) {
        const t = target.getBoundingClientRect();
        focusX = t.left + t.width / 2 - rect.left;
        focusY = t.top + t.height / 2 - rect.top;
      } else {
        focusX = width / 2;
        focusY = height / 2;
      }
    };

    const draw = (advance: boolean) => {
      ctx.clearRect(0, 0, width, height);

      // All guide paths in a single stroke
      ctx.beginPath();
      for (const path of paths) {
        const y0 = path.startY * height;
        const x0 = path.isLeft ? 0 : width;
        const x1 = path.isLeft ? focusX * 0.5 : width - (width - focusX) * 0.5;
        const x2 = path.isLeft ? focusX * 0.8 : width - (width - focusX) * 0.8;
        ctx.moveTo(x0, y0);
        ctx.bezierCurveTo(x1, y0, x2, focusY, focusX, focusY);
      }
      ctx.strokeStyle = colors.line;
      ctx.lineWidth = lineWidth;
      ctx.setLineDash([1, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      // One travelling particle per path
      ctx.fillStyle = colors.dot;
      for (const path of paths) {
        const p = path.particle;
        if (advance) {
          p.t += p.speed * safeSpeed;
          if (p.t > 1) {
            p.t = 0;
            path.startY += ((Math.random() - 0.5) * 10) / Math.max(height, 1);
          }
        }
        const y0 = path.startY * height;
        const x0 = path.isLeft ? 0 : width;
        const x1 = path.isLeft ? focusX * 0.5 : width - (width - focusX) * 0.5;
        const x2 = path.isLeft ? focusX * 0.8 : width - (width - focusX) * 0.8;
        const x = bezier(p.t, x0, x1, x2, focusX);
        const y = bezier(p.t, y0, y0, focusY, focusY);
        ctx.fillRect(x - 1.5, y - 1.5, 3, 3);
      }
    };

    const loop = () => {
      draw(true);
      frame = requestAnimationFrame(loop);
    };

    const start = () => {
      if (frame || reduceMotion || !visible || document.hidden) return;
      frame = requestAnimationFrame(loop);
    };

    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    resize();
    draw(false);

    const resizeObserver = new ResizeObserver(() => {
      resize();
      draw(false);
    });
    resizeObserver.observe(canvas);
    if (focusRef?.current) resizeObserver.observe(focusRef.current);

    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    intersection.observe(canvas);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      resizeObserver.disconnect();
      intersection.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [mode, speed, size, density, focusRef]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        opacity: clamp(opacity, 0.05, 1),
        ...style,
      }}
    />
  );
}
