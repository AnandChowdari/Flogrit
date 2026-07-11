"use client";
import { useEffect, useRef } from "react";

type Zone = {
  label: string;
  sub: string[];
};

const ZONES: Zone[] = [
  { label: "ATTENTION", sub: ["Content strategy", "Video & motion", "Brand"] },
  { label: "CONVERSION", sub: ["Websites", "Funnels", "Copy"] },
  { label: "AUTOMATION", sub: ["AI agents", "CRM workflows", "Reporting"] },
];

// Fraction of total width where each zone begins (attention / conversion / automation).
const ZONE_BOUNDS = [0, 0.34, 0.67, 1];
const LANES = 4;

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}
function smooth(t: number) {
  t = clamp(t, 0, 1);
  return t * t * (3 - 2 * t);
}

export function HeroFlowAnimation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const flowRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number>(0);
  const tRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = flowRef.current; // the flow area only, below the label header
    if (!canvas || !wrap) return;

    const ctx2d = canvas.getContext("2d");
    if (!ctx2d) return;
    const ctx: CanvasRenderingContext2D = ctx2d;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0,
      h = 0,
      dpr = 1;
    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    let visible = true;
    const io = new IntersectionObserver((entries) => {
      visible = entries[0]?.isIntersecting ?? true;
    });
    io.observe(wrap);

    const limeStr = getCss("--color-lime") || "#C6FF34";
    const purpleStr = getCss("--color-purple") || "#8671D3";

    type P = {
      x: number;
      offset: number;
      wanderSeed: number;
      speed: number;
      size: number;
      accent: boolean; // rare purple accent, otherwise lime
      lane: number;
      trail: Array<{ x: number; y: number }>;
    };
    const particles: P[] = [];
    const COUNT = reduced ? 26 : 64;
    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random(),
        offset: Math.random() * 2 - 1,
        wanderSeed: Math.random() * 1000,
        speed: 0.001 + Math.random() * 0.0008,
        size: 1.3 + Math.random() * 1.3,
        accent: Math.random() > 0.82, // ~18% purple, rest lime
        lane: Math.floor(Math.random() * LANES),
        trail: [],
      });
    }

    // Vertical half-spread (fraction of flow-area height) at a given x fraction.
    function bandHalfWidth(xf: number) {
      const attentionSpread = 0.4;
      const throatSpread = 0.045;
      const laneSpread = 0.3;

      if (xf < ZONE_BOUNDS[1]) return attentionSpread;
      if (xf < ZONE_BOUNDS[2]) {
        const local = smooth((xf - ZONE_BOUNDS[1]) / (ZONE_BOUNDS[2] - ZONE_BOUNDS[1]));
        return attentionSpread + (throatSpread - attentionSpread) * local;
      }
      if (xf < ZONE_BOUNDS[2] + 0.08) {
        const local = smooth((xf - ZONE_BOUNDS[2]) / 0.08);
        return throatSpread + (laneSpread - throatSpread) * local;
      }
      return laneSpread;
    }

    function laneY(lane: number) {
      const step = 2 / (LANES + 1);
      return -1 + step * (lane + 1);
    }

    function draw() {
      tRef.current += reduced ? 0.0012 : 0.0045;
      const t = tRef.current;

      ctx.clearRect(0, 0, w, h);
      const cy = h * 0.54;

      // --- The glass tube: a single filled, tapering shape from left to right ---
      const steps = 48;
      ctx.beginPath();
      for (let i = 0; i <= steps; i++) {
        const xf = i / steps;
        const x = xf * w;
        const y = cy - h * bandHalfWidth(xf);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      for (let i = steps; i >= 0; i--) {
        const xf = i / steps;
        const x = xf * w;
        const y = cy + h * bandHalfWidth(xf);
        ctx.lineTo(x, y);
      }
      ctx.closePath();
      const fillGrad = ctx.createLinearGradient(0, 0, w, 0);
      fillGrad.addColorStop(0, hex(limeStr, 0.05));
      fillGrad.addColorStop(0.5, hex(purpleStr, 0.045));
      fillGrad.addColorStop(1, hex(limeStr, 0.06));
      ctx.fillStyle = fillGrad;
      ctx.fill();

      // Crisp top & bottom edge lines for the tube.
      for (const sign of [-1, 1]) {
        ctx.beginPath();
        for (let i = 0; i <= steps; i++) {
          const xf = i / steps;
          const x = xf * w;
          const y = cy + sign * h * bandHalfWidth(xf);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        const strokeGrad = ctx.createLinearGradient(0, 0, w, 0);
        strokeGrad.addColorStop(0, hex(limeStr, 0.28));
        strokeGrad.addColorStop(0.5, hex(purpleStr, 0.22));
        strokeGrad.addColorStop(1, hex(limeStr, 0.3));
        ctx.strokeStyle = strokeGrad;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Automation lane lines (only visible once inside the lane band).
      const autoStartX = (ZONE_BOUNDS[2] + 0.08) * w;
      for (let l = 0; l < LANES; l++) {
        const ly = cy + laneY(l) * h * bandHalfWidth(1);
        ctx.beginPath();
        ctx.strokeStyle = hex(limeStr, 0.1);
        ctx.lineWidth = 0.75;
        ctx.moveTo(autoStartX, ly);
        ctx.lineTo(w, ly);
        ctx.stroke();
      }

      // --- Particles ---
      for (const p of particles) {
        p.x += p.speed;
        if (p.x > 1) {
          p.x = 0;
          p.offset = Math.random() * 2 - 1;
          p.lane = Math.floor(Math.random() * LANES);
          p.trail.length = 0;
        }

        const spread = bandHalfWidth(p.x);
        let yOffset: number;
        const inLaneZone = p.x >= ZONE_BOUNDS[2];

        if (!inLaneZone) {
          const wander = Math.sin(t * 1.1 + p.wanderSeed) * 0.09;
          yOffset = p.offset + wander;
        } else {
          const snapAmount = smooth((p.x - ZONE_BOUNDS[2]) / 0.08);
          const wander = Math.sin(t * 1.1 + p.wanderSeed) * 0.09 * (1 - snapAmount);
          const target = laneY(p.lane);
          yOffset = p.offset + (target - p.offset) * snapAmount + wander;
        }

        const x = p.x * w;
        const y = cy + yOffset * h * spread;

        p.trail.unshift({ x, y });
        const trailLen = p.x > ZONE_BOUNDS[1] && p.x < ZONE_BOUNDS[2] + 0.08 ? 7 : 3;
        if (p.trail.length > trailLen) p.trail.pop();

        const color = p.accent ? purpleStr : limeStr;

        for (let ti = p.trail.length - 1; ti >= 1; ti--) {
          const pt = p.trail[ti];
          const fade = 1 - ti / p.trail.length;
          ctx.beginPath();
          ctx.fillStyle = hex(color, fade * 0.3);
          ctx.arc(pt.x, pt.y, p.size * fade, 0, Math.PI * 2);
          ctx.fill();
        }

        if (inLaneZone) {
          const pw = p.size * 3.2;
          const ph = p.size * 1.5;
          ctx.beginPath();
          roundRect(ctx, x - pw / 2, y - ph / 2, pw, ph, ph / 2);
          ctx.fillStyle = hex(color, 0.85);
          ctx.shadowColor = color;
          ctx.shadowBlur = 4;
          ctx.fill();
          ctx.shadowBlur = 0;
        } else {
          ctx.beginPath();
          ctx.fillStyle = hex(color, 0.85);
          ctx.shadowColor = color;
          ctx.shadowBlur = 4;
          ctx.arc(x, y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      if (visible) rafRef.current = requestAnimationFrame(draw);
      else rafRef.current = window.setTimeout(() => requestAnimationFrame(draw), 200) as unknown as number;
    }

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative h-full w-full min-h-[280px] lg:min-h-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
    >
      {/* Ambient glow, CSS only — matches the rest of the page's background glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 30% 15%, rgba(198,255,52,0.05), transparent 60%)",
        }}
      />

      {/* Label header — real DOM text, never touched by canvas particles */}
      <div className="relative z-10 grid grid-cols-3 gap-4 border-b border-white/5 px-5 pt-4 pb-3">
        {ZONES.map((zone) => (
          <div key={zone.label}>
            <p className="font-mono text-[11px] font-semibold tracking-wide text-lime-300/90">{zone.label}</p>
            <div className="mt-1 space-y-0.5">
              {zone.sub.map((line) => (
                <p key={line} className="font-mono text-[9px] leading-tight text-lime-300/35">
                  {line}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Flow area — canvas only lives here, fully separated from the labels */}
      <div ref={flowRef} className="relative h-[calc(100%-4.5rem)] w-full">
        <canvas ref={canvasRef} className="absolute inset-0" />
      </div>
    </div>
  );
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, r: number) {
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function getCss(name: string): string {
  if (typeof window === "undefined") return "";
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function hex(c: string, a: number): string {
  if (!c) return `rgba(198, 255, 52, ${a})`;
  if (c.startsWith("#")) {
    const n =
      c.length === 4
        ? c
            .slice(1)
            .split("")
            .map((x) => parseInt(x + x, 16))
        : [parseInt(c.slice(1, 3), 16), parseInt(c.slice(3, 5), 16), parseInt(c.slice(5, 7), 16)];
    return `rgba(${n[0]}, ${n[1]}, ${n[2]}, ${a})`;
  }
  if (c.startsWith("oklch(") || c.startsWith("oklab(")) {
    return c.replace(/\)$/, ` / ${a})`);
  }
  return c;
}
