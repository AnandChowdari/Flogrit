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
    x: 0.22,
    y: 0.3,
    label: "ATTENTION",
    sub: ["Content strategy", "Video & motion", "Brand"],
    subAlign: "left",
  },
  {
    x: 0.78,
    y: 0.3,
    label: "CONVERSION",
    sub: ["Websites", "Funnels", "Copy"],
    subAlign: "right",
  },
  {
    x: 0.5,
    y: 0.78,
    label: "AUTOMATION",
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

// How far each edge's control point bows outward from the triangle centroid,
// as a fraction of the triangle's own size. Gives the pipe its organic curve.
const BOW = 0.16;

function easeInOutSine(t: number) {
  return -(Math.cos(Math.PI * t) - 1) / 2;
}

export function HeroFlowAnimation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number>(0);
  const tRef = useRef(0);
  const pulsesRef = useRef<Array<{ node: number; born: number }>>([]);

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

    // Particles flowing around the triangle edges.
    // trail: recent (x,y) history for the comet-tail effect.
    type P = {
      edge: number;
      t: number;
      speed: number;
      size: number;
      hue: "lime" | "purple";
      layer: "back" | "front";
      trail: Array<{ x: number; y: number }>;
    };
    const particles: P[] = [];
    const spawn = (n = 1) => {
      for (let i = 0; i < n; i++) {
        const layer = Math.random() > 0.45 ? "front" : "back";
        particles.push({
          edge: Math.floor(Math.random() * EDGES.length),
          t: Math.random(),
          speed: layer === "front" ? 0.0026 + Math.random() * 0.0034 : 0.0014 + Math.random() * 0.0018,
          size: layer === "front" ? 1.1 + Math.random() * 1.6 : 1.6 + Math.random() * 2.4,
          hue: Math.random() > 0.4 ? "lime" : "purple",
          layer,
          trail: [],
        });
      }
    };
    spawn(reduced ? 24 : 90);

    let visible = true;
    const io = new IntersectionObserver((entries) => {
      visible = entries[0]?.isIntersecting ?? true;
    });
    io.observe(wrap);

    const limeStr = getCss("--color-lime") || "#C6FF34";
    const purpleStr = getCss("--color-purple") || "#8671D3";

    function pos(n: Node) {
      return { x: n.x * w, y: n.y * h };
    }

    function centroid() {
      const cx = (NODES[0].x + NODES[1].x + NODES[2].x) / 3;
      const cy = (NODES[0].y + NODES[1].y + NODES[2].y) / 3;
      return { x: cx * w, y: cy * h };
    }

    // Quadratic control point for an edge, bowed away from the centroid.
    function edgeControl(ai: number, bi: number) {
      const a = pos(NODES[ai]);
      const b = pos(NODES[bi]);
      const c = centroid();
      const mx = (a.x + b.x) / 2;
      const my = (a.y + b.y) / 2;
      const dx = mx - c.x;
      const dy = my - c.y;
      const len = Math.hypot(dx, dy) || 1;
      const bow = Math.min(w, h) * BOW;
      return { x: mx + (dx / len) * bow, y: my + (dy / len) * bow };
    }

    function quadPoint(
      a: { x: number; y: number },
      cpt: { x: number; y: number },
      b: { x: number; y: number },
      t: number,
    ) {
      const mt = 1 - t;
      const x = mt * mt * a.x + 2 * mt * t * cpt.x + t * t * b.x;
      const y = mt * mt * a.y + 2 * mt * t * cpt.y + t * t * b.y;
      return { x, y };
    }

    function draw() {
      tRef.current += reduced ? 0.002 : 0.009;
      const t = tRef.current;

      ctx.clearRect(0, 0, w, h);

      // Curved pipe edges.
      for (let i = 0; i < EDGES.length; i++) {
        const [ai, bi] = EDGES[i];
        const a = pos(NODES[ai]);
        const b = pos(NODES[bi]);
        const cpt = edgeControl(ai, bi);
        const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
        grad.addColorStop(0, hex(limeStr, 0.5));
        grad.addColorStop(1, hex(purpleStr, 0.4));
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.25;
        ctx.setLineDash([4, 6]);
        ctx.lineDashOffset = -t * 30 + i * 12;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.quadraticCurveTo(cpt.x, cpt.y, b.x, b.y);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Back layer particles first (dimmer, behind everything).
      for (const layer of ["back", "front"] as const) {
        for (const p of particles) {
          if (p.layer !== layer) continue;

          const prevT = p.t;
          p.t += p.speed;
          if (p.t > 1) {
            p.t = 0;
            p.trail.length = 0;
            pulsesRef.current.push({ node: EDGES[p.edge][1], born: t });
            p.edge = (p.edge + 1) % EDGES.length;
          }

          const [ai, bi] = EDGES[p.edge];
          const a = pos(NODES[ai]);
          const b = pos(NODES[bi]);
          const cpt = edgeControl(ai, bi);

          // Ease speed: slow near both ends, faster through the middle.
          const eased = easeInOutSine(p.t);
          void prevT;
          const { x, y } = quadPoint(a, cpt, b, eased);

          p.trail.unshift({ x, y });
          if (p.trail.length > 6) p.trail.pop();

          const color = p.hue === "lime" ? limeStr : purpleStr;
          const alphaBase = layer === "front" ? 0.9 : 0.35;

          // Fading trail.
          for (let ti = p.trail.length - 1; ti >= 0; ti--) {
            const pt = p.trail[ti];
            const fade = 1 - ti / p.trail.length;
            ctx.beginPath();
            ctx.fillStyle = hex(color, alphaBase * fade * 0.5);
            ctx.arc(pt.x, pt.y, p.size * fade, 0, Math.PI * 2);
            ctx.fill();
          }

          // Head of the particle.
          ctx.fillStyle = hex(color, alphaBase);
          if (layer === "front") {
            ctx.shadowColor = color;
            ctx.shadowBlur = 6;
          }
          ctx.beginPath();
          ctx.arc(x, y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // Arrival pulses — a brief expanding ring where particles land.
      pulsesRef.current = pulsesRef.current.filter((pulse) => t - pulse.born < 0.6);
      const R = Math.min(w, h) * 0.1;
      for (const pulse of pulsesRef.current) {
        const age = (t - pulse.born) / 0.6; // 0..1
        const p = pos(NODES[pulse.node]);
        ctx.beginPath();
        ctx.strokeStyle = hex(limeStr, 0.5 * (1 - age));
        ctx.lineWidth = 1.5;
        ctx.arc(p.x, p.y, R + age * R * 0.6, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Vertex premium dark discs with lime labels.
      NODES.forEach((n, i) => {
        const p = pos(n);
        const breathe = 1 + Math.sin(t * 1.4 + i * 2.1) * 0.015;

        // subtle drop shadow beneath disc
        ctx.save();
        ctx.shadowColor = "rgba(0,0,0,0.55)";
        ctx.shadowBlur = 18;
        ctx.shadowOffsetY = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, R * breathe, 0, Math.PI * 2);
        ctx.fillStyle = "#0d0d0f";
        ctx.fill();
        ctx.restore();

        // inner top-down gradient for depth
        const ig = ctx.createLinearGradient(p.x, p.y - R, p.x, p.y + R);
        ig.addColorStop(0, "#1a1a1c");
        ig.addColorStop(1, "#0a0a0b");
        ctx.beginPath();
        ctx.arc(p.x, p.y, R * breathe - 0.5, 0, Math.PI * 2);
        ctx.fillStyle = ig;
        ctx.fill();

        // crisp lime hairline edge, breathing subtly
        ctx.strokeStyle = hex(limeStr, 0.3 + Math.sin(t * 1.4 + i * 2.1) * 0.08);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, R * breathe, 0, Math.PI * 2);
        ctx.stroke();

        // glassy top highlight arc
        ctx.strokeStyle = "rgba(255,255,255,0.08)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, R - 2, Math.PI * 1.15, Math.PI * 1.85);
        ctx.stroke();

        // lime label inside
        ctx.fillStyle = limeStr;
        ctx.font = `600 ${Math.max(9, Math.round(R * 0.19))}px 'JetBrains Mono Variable', monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(n.label, p.x, p.y);
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
      className="relative aspect-[5/5.2] w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
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
