import { motion, useReducedMotion } from "motion/react";

/**
 * Small inline system-flow diagram reusing the Flogrit tech-grid aesthetic
 * from HeroFlowAnimation. Renders labeled nodes connected by hairline edges
 * with a lime particle traveling along the path.
 */
export function InlineFlowDiagram({ nodes }: { nodes: string[] }) {
  const reduce = useReducedMotion();

  return (
    <div className="relative overflow-x-auto">
      <div className="flex min-w-full items-center gap-2">
        {nodes.map((label, i) => (
          <div key={`${label}-${i}`} className="flex items-center gap-2">
            <div className="relative shrink-0 rounded-lg border border-border bg-background/60 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/85">
              <span
                aria-hidden
                className="absolute -inset-px rounded-lg border border-primary/20 opacity-60"
              />
              {label}
            </div>
            {i < nodes.length - 1 && (
              <div className="relative h-px w-6 shrink-0 bg-border md:w-10">
                {!reduce && (
                  <motion.span
                    className="absolute top-1/2 size-1 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_8px_var(--color-lime)]"
                    initial={{ left: 0, opacity: 0 }}
                    animate={{ left: "100%", opacity: [0, 1, 0] }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      delay: i * 0.25,
                      ease: "easeInOut",
                    }}
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
