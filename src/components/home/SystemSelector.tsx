import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useFlow } from "@/lib/flow";
import { pillars, pillarOrder } from "@/lib/data";
import { systemJourneys } from "@/lib/systemJourneys";

export function SystemSelector() {
  const { setSystem } = useFlow();

  return (
    <section
      id="system-selector"
      className="relative overflow-hidden border-y border-border bg-secondary/15"
    >
      <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Where the system is breaking
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.02em] md:text-5xl lg:text-6xl">
            What's holding your business{" "}
            <span className="text-primary">back?</span>
          </h2>
          <p className="mt-5 text-muted-foreground md:text-lg">
            Choose the pillar closest to your reality. The rest of the page becomes about that one system.
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3 md:gap-5">
          {pillarOrder.map((key, i) => {
            const p = pillars[key];
            const j = systemJourneys[key];
            return (
              <motion.button
                key={key}
                type="button"
                onClick={() => setSystem(key)}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                whileHover={{ y: -3 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 text-left transition-colors hover:border-primary/50 md:p-8"
              >
                <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  0{p.index} · {p.label}
                </div>

                <p className="mt-8 font-display text-xl font-medium leading-snug text-foreground md:text-2xl">
                  &ldquo;{p.problem}&rdquo;
                </p>

                <p className="mt-4 text-sm text-muted-foreground">
                  {j.problem.body}
                </p>

                <div className="mt-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-primary">
                  Enter this system
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
