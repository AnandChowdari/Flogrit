import { AnimatePresence, motion } from "motion/react";
import { ArrowLeftRight, X } from "lucide-react";
import { useState } from "react";
import { useFlow, type Flow } from "@/lib/flow";
import { pillars, pillarOrder } from "@/lib/data";

/**
 * Sticky, compact indicator shown while a system journey is active.
 * No scroll-direction detection — always visible, always reachable.
 */
export function SystemIndicator() {
  const { system, setSystem, clearSystem } = useFlow();
  const [openSwitch, setOpenSwitch] = useState(false);

  if (!system) return null;
  const active = pillars[system];

  return (
    <div className="sticky top-24 z-30 mx-auto max-w-7xl px-5 lg:px-8">
      <div className="relative flex flex-wrap items-center justify-between gap-3 rounded-full border border-border bg-background/70 px-4 py-2 backdrop-blur-xl">
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          <span>Exploring</span>
          <span className="rounded-full bg-primary/15 px-2.5 py-1 text-primary">
            0{active.index} · {active.label}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setOpenSwitch((o) => !o)}
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/80 transition-colors hover:text-foreground"
          >
            Switch
            <ArrowLeftRight size={12} />
          </button>
          <button
            type="button"
            onClick={() => { setOpenSwitch(false); clearSystem(); }}
            aria-label="Close journey"
            className="grid size-7 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground"
          >
            <X size={12} />
          </button>
        </div>

        <AnimatePresence>
          {openSwitch && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 right-0 top-full mt-2 grid gap-2 rounded-2xl border border-border bg-background/95 p-3 backdrop-blur-xl md:grid-cols-3"
            >
              {pillarOrder.map((key) => {
                const p = pillars[key];
                const isActive = key === system;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => { setSystem(key as Flow); setOpenSwitch(false); }}
                    className={`rounded-xl border p-4 text-left transition-colors ${
                      isActive
                        ? "border-primary/60 bg-primary/10 text-foreground"
                        : "border-border bg-card hover:border-foreground/30"
                    }`}
                  >
                    <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                      0{p.index}
                    </div>
                    <div className="mt-2 font-display text-lg font-semibold">{p.label}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{p.oneLine}</div>
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
