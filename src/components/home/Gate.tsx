import { useFlow } from "@/lib/flow";
import { pillars, pillarOrder } from "@/lib/data";
import { motion, AnimatePresence } from "motion/react";
import { Check } from "lucide-react";

export function Gate() {
  const { flow, setFlow, hasChosen } = useFlow();

  return (
    <section
      id="gate"
      className="relative overflow-hidden border-y border-border bg-secondary/15"
    >
      <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Where to begin
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.02em] md:text-5xl lg:text-6xl">
            Which part of the system{" "}
            <span className="text-primary">isn't working yet?</span>
          </h2>
          <p className="mt-5 text-muted-foreground md:text-lg">
            Pick the one closest to your reality. The rest of the page reorders around the pillar you actually need first.
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3 md:gap-5">
          {pillarOrder.map((key) => {
            const p = pillars[key];
            const active = hasChosen && flow === key;
            return (
              <motion.button
                key={key}
                onClick={() => setFlow(key)}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className={`group relative overflow-hidden rounded-2xl border p-7 text-left transition-colors md:p-8 ${
                  active
                    ? "border-primary bg-primary/[0.05]"
                    : "border-border bg-card hover:border-foreground/30"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                    0{p.index} · {p.label}
                  </div>
                  <AnimatePresence>
                    {active && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="grid size-6 place-items-center rounded-full bg-primary text-primary-foreground"
                      >
                        <Check size={12} strokeWidth={3} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <p className="mt-8 font-display text-xl font-medium leading-snug text-foreground md:text-2xl">
                  &ldquo;{p.problem}&rdquo;
                </p>
                <p className="mt-4 text-sm text-muted-foreground">{p.body}</p>

                <div className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
                  {active ? "Leading the page" : "Start here →"}
                </div>
              </motion.button>
            );
          })}
        </div>

        {hasChosen && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-10 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground"
          >
            {pillars[flow].label} leads · the other pillars follow underneath
          </motion.p>
        )}
      </div>
    </section>
  );
}
