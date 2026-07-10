"use client";
import { useEffect, useRef } from "react";

type Node = {
  x: number; // 0..1
  y: number;
  label: string;
  sub: string[];
  subAlign: "left" | "center" | "right";
};

// Triangle: Attention top-left, Conversion top-right, Automation bottom-center.
const NODES: Node[] = [
  {
    x: 0.2, y: 0.28, label: "ATTENTION",
    sub: ["Content strategy", "Video & motion", "Brand"],
    subAlign: "left",
  },
  {
    x: 0.8, y: 0.28, label: "CONVERSION",
    sub: ["Websites", "Funnels", "Copy"],
    subAlign: "right",
  },
  {
    x: 0.5, y: 0.82, label: "AUTOMATION",
    sub: ["AI agents", "CRM workflows", "Reporting"],
    subAlign: "center",
  },
];

// Triangle edges as (from,to) pairs — closed loop.
const EDGES: Array<[number, number]> = [
  [0, 1], // Attention → Conversion
  [1, 2], // Conversion → Automation
  [2, 0], // Automation → Attention
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

    // Particles flowing around the triangle edges.
    type P = { edge: number; t: number; speed: number; size: number; hue: "lime" | "purple" };
    const particles: P[] = [];
    const spawn = (n = 1) => {
      for (let i = 0; i < n; i++) {
        particles.push({
          edge: Math.floor(Math.random() * EDGES.length),
          t: Math.random(),
          speed: 0.0022 + Math.random() * 0.0038,
          size: 0.8 + Math.random() * 2.0,
          hue: Math.random() > 0.4 ? "lime" : "purple",
        });
      }
    };
    spawn(reduced ? 24 : 110);

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
      tRef.current += reduced ? 0.002 : 0.009;
      const t = tRef.current;

      ctx.clearRect(0, 0, w, h);

      // Triangle edges — animated dashed gradient.
      for (let i = 0; i < EDGES.length; i++) {
        const [ai, bi] = EDGES[i];
        const a = pos(NODES[ai]);
        const b = pos(NODES[bi]);
        const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
        grad.addColorStop(0, hex(limeStr, 0.5));
        grad.addColorStop(1, hex(purpleStr, 0.4));
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.25;
        ctx.setLineDash([4, 6]);
        ctx.lineDashOffset = -t * 30 + i * 12;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Particles along edges.
      for (const p of particles) {
        p.t += p.speed;
        if (p.t > 1) { p.t = 0; p.edge = (p.edge + 1) % EDGES.length; }
        const [ai, bi] = EDGES[p.edge];
        const a = pos(NODES[ai]);
        const b = pos(NODES[bi]);
        // Perpendicular jitter along the edge for organic feel.
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const len = Math.hypot(dx, dy) || 1;
        const nx = -dy / len;
        const ny = dx / len;
        const wobble = Math.sin(t * 2 + p.edge + p.t * 6) * 4;
        const x = a.x + dx * p.t + nx * wobble;
        const y = a.y + dy * p.t + ny * wobble;
        const color = p.hue === "lime" ? limeStr : purpleStr;
        ctx.fillStyle = hex(color, 0.85);
        ctx.shadowColor = color;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      // Vertex glow — no discs, just natural radial light.
      NODES.forEach((n, i) => {
        const p = pos(n);
        const phase = (Math.sin(t * 1.1 + i * 1.7) + 1) / 2;
        const r = 96 + phase * 14;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
        g.addColorStop(0, hex(limeStr, 0.35 * phase + 0.18));
        g.addColorStop(0.55, hex(limeStr, 0.06));
        g.addColorStop(1, hex(limeStr, 0));
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();

        // tiny bright core dot to anchor the vertex on the triangle edge
        ctx.fillStyle = hex(limeStr, 0.9);
        ctx.shadowColor = limeStr;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Labels sitting on the edge (above vertex).
      ctx.textBaseline = "middle";
      NODES.forEach((n) => {
        const p = pos(n);
        ctx.textAlign = "center";
        // label background clear text — no chip
        ctx.fillStyle = hex(cream, 0.96);
        ctx.font = "600 12px 'JetBrains Mono Variable', monospace";
        const labelOffset = n.subAlign === "center" ? 22 : -20;
        ctx.fillText(n.label, p.x, p.y + labelOffset);
      });

      // Sub-labels: aligned outward so they don't collide with triangle edges.
      // Top-left / top-right vertices stack UPWARD (away from triangle body).
      // Bottom-center vertex stacks DOWNWARD.
      ctx.font = "10px 'Inter Tight', sans-serif";
      ctx.fillStyle = hex(cream, 0.6);
      NODES.forEach((n) => {
        const p = pos(n);
        ctx.textAlign = n.subAlign;
        const xOff = n.subAlign === "left" ? -18 : n.subAlign === "right" ? 18 : 0;
        if (n.subAlign === "center") {
          // Automation: stack below the label.
          const baseY = p.y + 42;
          n.sub.forEach((s, j) => ctx.fillText(s, p.x + xOff, baseY + j * 14));
        } else {
          // Attention / Conversion: stack upward, above the label.
          // Label sits at p.y - 20, so start subs at p.y - 36 and go up.
          const baseY = p.y - 38;
          n.sub.forEach((s, j) => ctx.fillText(s, p.x + xOff, baseY - j * 14));
        }
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
      className="relative aspect-[5/4.5] w-full overflow-hidden rounded-2xl border border-border bg-card grain"
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
    const n = c.length === 4
      ? c.slice(1).split("").map((x) => parseInt(x + x, 16))
      : [parseInt(c.slice(1, 3), 16), parseInt(c.slice(3, 5), 16), parseInt(c.slice(5, 7), 16)];
    return `rgba(${n[0]}, ${n[1]}, ${n[2]}, ${a})`;
  }
  if (c.startsWith("oklch(") || c.startsWith("oklab(")) {
    return c.replace(/\)$/, ` / ${a})`);
  }
  return c;
}
