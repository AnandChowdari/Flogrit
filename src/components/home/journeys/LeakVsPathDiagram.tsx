import { motion, useReducedMotion } from "motion/react";

/**
 * "Leak vs Path" — two mini funnels rendered in the Flogrit grid aesthetic.
 * Left: attention drips out at each stage. Right: a single designed route.
 * Pure inline SVG — no new dependencies.
 */
export function LeakVsPathDiagram() {
  const reduce = useReducedMotion();
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Panel title="Leaky funnel" tone="dim">
        <FunnelLeak reduce={!!reduce} />
      </Panel>
      <Panel title="Designed path" tone="primary">
        <FunnelPath reduce={!!reduce} />
      </Panel>
    </div>
  );
}

function Panel({
  title,
  tone,
  children,
}: {
  title: string;
  tone: "dim" | "primary";
  children: React.ReactNode;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border p-5 ${
        tone === "primary"
          ? "border-primary/40 bg-primary/[0.03]"
          : "border-border bg-card"
      }`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-line) 1px, transparent 1px), linear-gradient(to bottom, var(--color-line) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div
        className={`relative font-mono text-[10px] uppercase tracking-[0.22em] ${
          tone === "primary" ? "text-primary" : "text-muted-foreground"
        }`}
      >
        {title}
      </div>
      <div className="relative mt-4">{children}</div>
    </div>
  );
}

function FunnelLeak({ reduce }: { reduce: boolean }) {
  const stages = ["Views", "Clicks", "Enquiries", "Calls"];
  const widths = [100, 78, 42, 12];
  return (
    <svg viewBox="0 0 220 200" className="h-56 w-full">
      {stages.map((s, i) => {
        const y = 20 + i * 42;
        const w = widths[i];
        const x = (220 - w * 1.8) / 2;
        return (
          <g key={s}>
            <rect
              x={x}
              y={y}
              width={w * 1.8}
              height={18}
              rx={4}
              fill="transparent"
              stroke="oklch(0.85 0.02 90 / 0.35)"
              strokeWidth={1}
            />
            <text
              x={110}
              y={y + 12}
              fontSize={9}
              textAnchor="middle"
              fontFamily="JetBrains Mono, monospace"
              fill="oklch(0.85 0.02 90 / 0.75)"
            >
              {s} · {w}%
            </text>
            {i < stages.length - 1 && !reduce && (
              <motion.circle
                r={1.5}
                cx={x + w * 1.8 + 2}
                fill="var(--color-lime)"
                initial={{ cy: y + 18, opacity: 0.9 }}
                animate={{ cy: y + 40, opacity: 0 }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: "easeIn",
                }}
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}

function FunnelPath({ reduce }: { reduce: boolean }) {
  const stages = ["Views", "One decision", "Booked call"];
  return (
    <svg viewBox="0 0 220 200" className="h-56 w-full">
      <path
        d="M 30 30 L 190 30 L 190 100 L 30 100 L 30 170 L 190 170"
        stroke="var(--color-lime)"
        strokeOpacity="0.6"
        strokeWidth={1.2}
        fill="none"
      />
      {stages.map((s, i) => {
        const cy = 30 + i * 70;
        const cx = i % 2 === 0 ? 30 : 190;
        return (
          <g key={s}>
            <circle cx={cx} cy={cy} r={6} fill="oklch(0.18 0.01 90)" stroke="var(--color-lime)" strokeWidth={1.2} />
            <text
              x={i % 2 === 0 ? cx + 12 : cx - 12}
              y={cy + 3}
              fontSize={9}
              textAnchor={i % 2 === 0 ? "start" : "end"}
              fontFamily="JetBrains Mono, monospace"
              fill="oklch(0.95 0 0 / 0.9)"
            >
              {s}
            </text>
          </g>
        );
      })}
      {!reduce && (
        <motion.circle
          r={2.5}
          fill="var(--color-lime)"
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: "100%" }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
          style={{
            offsetPath: "path('M 30 30 L 190 30 L 190 100 L 30 100 L 30 170 L 190 170')",
            filter: "drop-shadow(0 0 6px var(--color-lime))",
          }}
        />
      )}
    </svg>
  );
}
