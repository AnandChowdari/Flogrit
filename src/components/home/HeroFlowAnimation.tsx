"use client";
import { useEffect, useRef } from "react";

type Node = {
  x: number; // 0..1
  y: number;
  label: string;
  sub: string[];
};

const NODES: Node[] = [
  {
    x: 0.18, y: 0.5, label: "ATTENTION",
    sub: ["Content strategy", "Video & motion", "Brand"],
  },
  {
    x: 0.5, y: 0.5, label: "CONVERSION",
    sub: ["Websites", "Funnels", "Copy"],
  },
  {
    x: 0.82, y: 0.5, label: "AUTOMATION",
    sub: ["AI agents", "CRM workflows", "Reporting"],
  },
];

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


    let w = 0, h = 0, dpr = 1;
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

    // Particles flowing between nodes
    type P = { seg: number; t: number; speed: number; size: number; hue: "lime" | "purple" };
    const particles: P[] = [];
    const SEG_COUNT = NODES.length - 1;
    const spawn = (n = 1) => {
      for (let i = 0; i < n; i++) {
        particles.push({
          seg: Math.floor(Math.random() * SEG_COUNT),
          t: Math.random(),
          speed: 0.0025 + Math.random() * 0.004,
          size: 0.8 + Math.random() * 2.2,
          hue: Math.random() > 0.35 ? "lime" : "purple",
        });
      }
    };
    spawn(reduced ? 20 : 90);

    let visible = true;
    const io = new IntersectionObserver((entries) => {
      visible = entries[0]?.isIntersecting ?? true;
    });
    io.observe(wrap);

    const limeStr = getCss("--color-lime") || "#C6FF34";
    const purpleStr = getCss("--color-purple") || "#8671D3";
    const cream = getCss("--color-foreground") || "#F0F2C0";

    function pos(n: Node) {
      return { x: n.x * w, y: n.y * h };
    }

    function draw() {
      tRef.current += reduced ? 0.002 : 0.01;
      const t = tRef.current;

      // bg wash
      ctx.clearRect(0, 0, w, h);

      // connector lines
      for (let i = 0; i < NODES.length - 1; i++) {
        const a = pos(NODES[i]);
        const b = pos(NODES[i + 1]);
        const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
        grad.addColorStop(0, hex(limeStr, 0.45));
        grad.addColorStop(1, hex(purpleStr, 0.35));
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.2;
        ctx.setLineDash([4, 6]);
        ctx.lineDashOffset = -t * 30;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // particles
      for (const p of particles) {
        p.t += p.speed;
        if (p.t > 1) { p.t = 0; p.seg = (p.seg + 1) % SEG_COUNT; }
        const a = pos(NODES[p.seg]);
        const b = pos(NODES[p.seg + 1]);
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t + Math.sin(t * 2 + p.seg + p.t * 6) * 6;
        const color = p.hue === "lime" ? limeStr : purpleStr;
        ctx.fillStyle = hex(color, 0.85);
        ctx.shadowColor = color;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      // big nodes — glow + ring
      NODES.forEach((n, i) => {
        const p = pos(n);
        const phase = (Math.sin(t * 1.3 + i * 1.7) + 1) / 2;
        const r = 44 + phase * 6;

        // outer glow
        const g = ctx.createRadialGradient(p.x, p.y, r * 0.4, p.x, p.y, r * 2.4);
        g.addColorStop(0, hex(limeStr, 0.35 * phase + 0.15));
        g.addColorStop(1, hex(limeStr, 0));
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 2.4, 0, Math.PI * 2);
        ctx.fill();

        // disc
        ctx.fillStyle = hex("#121212", 0.95);
        ctx.strokeStyle = hex(limeStr, 0.85);
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // inner ring
        ctx.strokeStyle = hex(limeStr, 0.25);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r - 8, 0, Math.PI * 2);
        ctx.stroke();

        // orbiting subs
        n.sub.forEach((_, j) => {
          const ang = t * (0.4 + i * 0.1) + (j / n.sub.length) * Math.PI * 2;
          const orbR = r + 22;
          const sx = p.x + Math.cos(ang) * orbR;
          const sy = p.y + Math.sin(ang) * orbR * 0.55;
          ctx.fillStyle = hex(purpleStr, 0.75);
          ctx.shadowColor = purpleStr;
          ctx.shadowBlur = 6;
          ctx.beginPath();
          ctx.arc(sx, sy, 3, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.shadowBlur = 0;
      });

      // labels on top of discs
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      NODES.forEach((n) => {
        const p = pos(n);
        ctx.fillStyle = hex(cream, 0.95);
        ctx.font = "600 11px 'JetBrains Mono Variable', monospace";
        ctx.fillText(n.label, p.x, p.y);
      });

      // sub labels below each node
      ctx.font = "10px 'Inter Tight', sans-serif";
      ctx.fillStyle = hex(cream, 0.55);
      NODES.forEach((n) => {
        const p = pos(n);
        n.sub.forEach((s, j) => {
          ctx.fillText(s, p.x, p.y + 64 + j * 14);
        });
      });

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
      className="relative aspect-[5/4] w-full overflow-hidden rounded-2xl border border-border bg-card grain"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="pointer-events-none absolute left-4 top-4 z-10 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        the system · attention → conversion → automation
      </div>
      <div className="pointer-events-none absolute right-4 top-4 z-10 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        <span className="size-1.5 animate-pulse rounded-full bg-primary" /> flogrit.live
      </div>
    </div>
  );
}

function getCss(name: string): string {
  if (typeof window === "undefined") return "";
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

// rgba with alpha — accepts oklch() string by drawing through a temp canvas-friendly fallback
function hex(c: string, a: number): string {
  if (!c) return `rgba(198, 255, 52, ${a})`;
  if (c.startsWith("#")) {
    const n = c.length === 4
      ? c.slice(1).split("").map((x) => parseInt(x + x, 16))
      : [parseInt(c.slice(1, 3), 16), parseInt(c.slice(3, 5), 16), parseInt(c.slice(5, 7), 16)];
    return `rgba(${n[0]}, ${n[1]}, ${n[2]}, ${a})`;
  }
  // oklch/oklab/etc — wrap in color-mix via canvas isn't possible; fall back to using the string directly
  // browsers accept oklch() in fillStyle, so blend alpha through globalAlpha-style usage instead
  // simplest: append slash alpha for oklch()
  if (c.startsWith("oklch(") || c.startsWith("oklab(")) {
    return c.replace(/\)$/, ` / ${a})`);
  }
  return c;
}
