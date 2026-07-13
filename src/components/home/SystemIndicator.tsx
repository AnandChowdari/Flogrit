import { AnimatePresence, motion } from "motion/react";
import { ArrowLeftRight, X, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useFlow, type Flow } from "@/lib/flow";
import { pillars, pillarOrder } from "@/lib/data";

/**
 * Shows as a side pull tag, expanding into a bottom pill when clicked.
 */
export function SystemIndicator() {
  const { system, setSystem, clearSystem } = useFlow();
  const [openSwitch, setOpenSwitch] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  if (!system) return null;
  const active = pillars[system];

  return (
    <>
      <AnimatePresence>
        {!isExpanded ? (
          <motion.button
            key="minimized"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ duration: 0.23, ease: [0.2, 0.8, 0.2, 1] }}
            onClick={() => setIsExpanded(true)}
            className="fixed right-0 top-1/2 z-50 flex -translate-y-1/2 items-center gap-3 rounded-l-[18px] border border-r-0 border-secondary/60 bg-gradient-to-l from-secondary/80 to-secondary/40 py-2 pl-3 pr-2 shadow-lg backdrop-blur-xl ring-1 ring-inset ring-secondary/40 transition-all hover:from-secondary hover:to-secondary/60 group"
          >
            <div className="flex items-center justify-center rounded-[18px] bg-primary/20 p-1 text-primary shadow-[inset_0_0_0_1px_hsl(var(--primary)/0.35)] transition-transform group-hover:-translate-x-0.5">
              <ChevronRight size={14} className="rotate-180" />
            </div>
            <div className="flex flex-col items-start pr-1 text-left">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-secondary-foreground/70">Exploring</span>
              <span className="font-mono text-[11px] font-semibold text-primary uppercase tracking-[0.1em]">{active.label}</span>
            </div>
          </motion.button>
        ) : (
          <motion.div
            key="expanded"
            initial={{ y: 50, opacity: 0, scale: 0.95, x: "-50%" }}
            animate={{ y: 0, opacity: 1, scale: 1, x: "-50%" }}
            exit={{ y: 50, opacity: 0, scale: 0.95, x: "-50%" }}
            transition={{ duration: 0.23, ease: [0.2, 0.8, 0.2, 1] }}
            className={`fixed bottom-6 left-1/2 z-50 transition-all duration-300 ease-in-out ${openSwitch ? "w-[95%] md:w-auto md:max-w-[fit-content]" : "w-[95%] max-w-[fit-content]"}`}
          >
            <div
              className="relative flex flex-wrap items-center justify-between gap-4 rounded-[18px] border border-secondary/60 bg-gradient-to-r from-secondary/90 via-secondary/70 to-secondary/90 px-4 py-2.5 shadow-lg backdrop-blur-xl ring-1 ring-inset ring-secondary/40"
            >
              <div className="flex items-center gap-2 sm:gap-3 font-mono text-[9px] sm:text-[11px] uppercase tracking-[0.22em] text-secondary-foreground/80 pl-1 sm:pl-2">
                <span>Exploring</span>
                <span className="whitespace-nowrap rounded-[4px] bg-primary/20 px-2.5 py-1 text-primary shadow-[inset_0_0_0_1px_hsl(var(--primary)/0.35)]">
                  0{active.index} · {active.label}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setOpenSwitch((o) => !o)}
                  className="inline-flex items-center gap-1.5 rounded-[18px] border border-secondary-foreground/25 bg-background/60 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-secondary-foreground transition-colors hover:border-primary/50 hover:text-primary"
                >
                  Switch
                  <ArrowLeftRight size={12} />
                </button>
                <button
                  type="button"
                  onClick={() => { setOpenSwitch(false); setIsExpanded(false); }}
                  aria-label="Minimize journey"
                  className="grid size-8 place-items-center rounded-[4px] border border-secondary-foreground/25 bg-background/60 text-secondary-foreground/80 transition-colors hover:border-primary/50 hover:text-primary ml-1"
                >
                  <ChevronRight size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => { setOpenSwitch(false); setIsExpanded(false); clearSystem(); }}
                  aria-label="Close journey"
                  className="grid size-8 place-items-center rounded-[18px] border border-destructive/30 bg-background/60 text-secondary-foreground/80 transition-colors hover:border-destructive/80 hover:text-destructive hover:bg-destructive/10"
                >
                  <X size={14} />
                </button>
              </div>

              <AnimatePresence>
                {openSwitch && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-full left-0 right-0 mb-3 grid gap-2 rounded-[18px] border border-border bg-background/95 p-2 md:p-3 backdrop-blur-xl grid-cols-3 shadow-2xl"
                  >
                    {pillarOrder.map((key) => {
                      const p = pillars[key];
                      const isActive = key === system;
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => { setSystem(key as Flow); setOpenSwitch(false); }}
                          className={`rounded-[18px] border p-2 md:p-4 text-left transition-colors ${isActive
                            ? "border-primary/60 bg-primary/10 text-foreground"
                            : "border-border bg-card hover:border-foreground/30"
                            }`}
                        >
                          <div className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                            0{p.index}
                          </div>
                          <div className="mt-1 md:mt-2 font-display text-xs sm:text-sm md:text-lg font-semibold">{p.label}</div>
                          <div className="mt-1 hidden text-[10px] sm:text-xs text-muted-foreground sm:block">{p.oneLine}</div>
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
