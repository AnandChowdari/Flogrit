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
  const visualWidths = [180, 140, 105, 75];
  return (
    <svg viewBox="0 0 240 200" className="h-56 w-full">
      {stages.map((s, i) => {
        const y = 20 + i * 44;
        const wTrue = widths[i];
        const wVis = visualWidths[i];
        const x = (240 - wVis) / 2;
        return (
          <g key={s}>
            <motion.rect
              x={x}
              y={y}
              width={wVis}
              height={22}
              rx={6}
              fill="oklch(0.85 0.02 90 / 0.15)"
              stroke="none"
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
              style={{ originX: "50%" }}
            />
            <motion.text
              x={120}
              y={y + 14.5}
              fontSize={10}
              textAnchor="middle"
              fontFamily="JetBrains Mono, monospace"
              fill="oklch(0.85 0.02 90 / 0.9)"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.15 + 0.3 }}
            >
              {s} · {wTrue}%
            </motion.text>
            {!reduce && i < stages.length - 1 && (
              <motion.circle
                r={1.5}
                cx={x + wVis + 2}
                fill="var(--color-lime)"
                initial={{ cy: y + 22, opacity: 0 }}
                whileInView={{ cy: [y + 22, y + 42], opacity: [0.9, 0] }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 1.6,
                  delay: i * 0.4 + 0.8,
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
  const stages = [
    { s: "First click", cx: 30, cy: 30, ty: 18 },
    { s: "Clear offer", cx: 190, cy: 100, ty: 118 },
    { s: "Booked call", cx: 30, cy: 170, ty: 188 },
  ];
  return (
    <svg viewBox="0 0 240 200" className="h-56 w-full">
      <motion.path
        d="M 30 30 L 190 30 L 190 100 L 30 100 L 30 170"
        stroke="var(--color-lime)"
        strokeOpacity="0.6"
        strokeWidth={1.2}
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
      {stages.map(({ s, cx, cy, ty }, i) => (
        <g key={s}>
          <motion.circle 
            cx={cx} cy={cy} r={6} 
            fill="oklch(0.18 0.01 90)" 
            stroke="var(--color-lime)" 
            strokeWidth={1.2} 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.5 }}
          />
          <motion.text
            x={cx}
            y={ty}
            fontSize={10}
            textAnchor="middle"
            fontFamily="JetBrains Mono, monospace"
            fill="oklch(0.95 0 0 / 0.9)"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.5 + 0.2 }}
          >
            {s}
          </motion.text>
        </g>
      ))}
      {!reduce && (
        <motion.circle
          r={2.5}
          fill="var(--color-lime)"
          initial={{ offsetDistance: "0%", opacity: 0 }}
          whileInView={{ offsetDistance: "100%", opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 2.5, delay: 1.2, ease: "linear" }}
          style={{
            offsetPath: "path('M 30 30 L 190 30 L 190 100 L 30 100 L 30 170')",
            filter: "drop-shadow(0 0 6px var(--color-lime))",
          }}
        />
      )}
    </svg>
  );
}
