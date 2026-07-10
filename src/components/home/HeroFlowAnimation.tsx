"use client";
import { useEffect, useRef } from "react";

type Zone = {
  label: string;
  sub: string[];
  xStart: number; // 0..1 fraction of canvas width where this zone begins
};

// Left → right pipeline. Order matters: Attention feeds Conversion feeds Automation.
const ZONES: Zone[] = [
  { label: "ATTENTION", sub: ["Content strategy", "Video & motion", "Brand"], xStart: 0.0 },
  { label: "CONVERSION", sub: ["Websites", "Funnels", "Copy"], xStart: 0.34 },
  { label: "AUTOMATION", sub: ["AI agents", "CRM workflows", "Reporting"], xStart: 0.67 },
];

const ZONE_BOUNDS = [0, 0.34, 0.67, 1];
const LANES = 5; // discrete automation lanes

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

// Smoothstep for gentle transitions between zone behaviors.
function smooth(t: number) {
  t = clamp(t, 0, 1);
  return t * t * (3 - 2 * t);
}

export function HeroFlowAnimation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number>(0);
  const tRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
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

    // Each particle: x progresses 0..1 across the whole canvas, looping.
    // offset is its personal wander value in -1..1, used to compute y.
    type P = {
      x: number;
      offset: number;
      wanderSeed: number;
      speed: number;
      size: number;
      hue: "lime" | "purple";
      lane: number; // assigned automation lane, -1 until first entry
      trail: Array<{ x: number; y: number }>;
    };
    const particles: P[] = [];
    const COUNT = reduced ? 40 : 130;
    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random(),
        offset: Math.random() * 2 - 1,
        wanderSeed: Math.random() * 1000,
        speed: 0.0012 + Math.random() * 0.0012,
        size: 1.1 + Math.random() * 1.6,
        hue: Math.random() > 0.4 ? "lime" : "purple",
        lane: Math.floor(Math.random() * LANES),
        trail: [],
      });
    }

    // Vertical spread (as a fraction of h, centered) for a given x fraction.
    function bandHalfWidth(xf: number) {
      const attentionSpread = 0.34; // wide, loose
      const throatSpread = 0.05; // narrow funnel throat
      const laneSpread = 0.24; // organized lane band

      if (xf < ZONE_BOUNDS[1]) return attentionSpread;
      if (xf < ZONE_BOUNDS[2]) {
        const local = smooth((xf - ZONE_BOUNDS[1]) / (ZONE_BOUNDS[2] - ZONE_BOUNDS[1]));
        return attentionSpread + (throatSpread - attentionSpread) * local;
      }
      if (xf < ZONE_BOUNDS[2] + 0.06) {
        const local = smooth((xf - ZONE_BOUNDS[2]) / 0.06);
        return throatSpread + (laneSpread - throatSpread) * local;
      }
      return laneSpread;
    }

    function laneY(lane: number) {
      const step = 1 / (LANES + 1);
      return (lane + 1) * step * 2 - 1; // -1..1
    }

    function draw() {
      tRef.current += reduced ? 0.0015 : 0.006;
      const t = tRef.current;

      ctx.clearRect(0, 0, w, h);
      const cy = h * 0.56; // vertical center of the flow, leaves room for zone labels

      // Funnel guide lines through the conversion throat.
      const guideTopStart = cy - h * bandHalfWidth(ZONE_BOUNDS[1]);
      const guideBotStart = cy + h * bandHalfWidth(ZONE_BOUNDS[1]);
      const guideTopThroat = cy - h * bandHalfWidth(ZONE_BOUNDS[2]);
      const guideBotThroat = cy + h * bandHalfWidth(ZONE_BOUNDS[2]);
      const guideTopEnd = cy - h * bandHalfWidth(1);
      const guideBotEnd = cy + h * bandHalfWidth(1);

      ctx.save();
      ctx.strokeStyle = hex(purpleStr, 0.25);
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 5]);
      ctx.beginPath();
      ctx.moveTo(ZONE_BOUNDS[1] * w, guideTopStart);
      ctx.quadraticCurveTo(ZONE_BOUNDS[2] * w, guideTopThroat, (ZONE_BOUNDS[2] + 0.06) * w, guideTopThroat);
      ctx.lineTo(w, guideTopEnd);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(ZONE_BOUNDS[1] * w, guideBotStart);
      ctx.quadraticCurveTo(ZONE_BOUNDS[2] * w, guideBotThroat, (ZONE_BOUNDS[2] + 0.06) * w, guideBotThroat);
      ctx.lineTo(w, guideBotEnd);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // Automation lane lines, faint, only visible in the automation zone.
      const autoStartX = (ZONE_BOUNDS[2] + 0.06) * w;
      for (let l = 0; l < LANES; l++) {
        const ly = cy + laneY(l) * h * bandHalfWidth(1);
        ctx.beginPath();
        ctx.strokeStyle = hex(limeStr, 0.12);
        ctx.lineWidth = 0.75;
        ctx.moveTo(autoStartX, ly);
        ctx.lineTo(w, ly);
        ctx.stroke();
      }

      // Zone dividers + labels.
      ZONES.forEach((zone) => {
        const zx = zone.xStart * w;
        if (zone.xStart > 0) {
          ctx.beginPath();
          ctx.strokeStyle = hex(limeStr, 0.08);
          ctx.lineWidth = 1;
          ctx.setLineDash([2, 6]);
          ctx.moveTo(zx, h * 0.08);
          ctx.lineTo(zx, h * 0.94);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        const zoneWidth = (ZONE_BOUNDS[ZONES.indexOf(zone) + 1] - zone.xStart) * w;
        const labelX = zx + zoneWidth / 2;

        ctx.textAlign = "center";
        ctx.fillStyle = hex(limeStr, 0.85);
        ctx.font = `600 13px 'JetBrains Mono Variable', monospace`;
        ctx.fillText(zone.label, labelX, h * 0.14);

        ctx.font = `400 10px 'JetBrains Mono Variable', monospace`;
        ctx.fillStyle = hex(limeStr, 0.4);
        zone.sub.forEach((line, i) => {
          ctx.fillText(line, labelX, h * 0.14 + 16 + i * 13);
        });
      });

      // Particles.
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

        if (p.x < ZONE_BOUNDS[2]) {
          // Attention → throat: organic wander, converging toward centerline.
          const wander = Math.sin(t * 1.3 + p.wanderSeed) * 0.15;
          yOffset = p.offset + wander;
        } else {
          // Post-throat: snap progressively onto the assigned lane.
          const snapAmount = smooth((p.x - ZONE_BOUNDS[2]) / 0.1);
          const wander = Math.sin(t * 1.3 + p.wanderSeed) * 0.15 * (1 - snapAmount);
          const target = laneY(p.lane);
          yOffset = p.offset + (target - p.offset) * snapAmount + wander;
        }

        const x = p.x * w;
        const y = cy + yOffset * h * spread;

        // Speed boost visually through the throat via denser trail.
        p.trail.unshift({ x, y });
        const trailLen = p.x > ZONE_BOUNDS[1] && p.x < ZONE_BOUNDS[2] + 0.06 ? 8 : 4;
        if (p.trail.length > trailLen) p.trail.pop();

        const color = p.hue === "lime" ? limeStr : purpleStr;
        for (let ti = p.trail.length - 1; ti >= 0; ti--) {
          const pt = p.trail[ti];
          const fade = 1 - ti / p.trail.length;
          ctx.beginPath();
          ctx.fillStyle = hex(color, fade * 0.35);
          ctx.arc(pt.x, pt.y, p.size * fade, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.beginPath();
        ctx.fillStyle = hex(color, 0.9);
        ctx.shadowColor = color;
        ctx.shadowBlur = 5;
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
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
      className="relative aspect-[16/8] w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
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
