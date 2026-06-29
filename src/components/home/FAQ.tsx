import { faqs } from "@/lib/data";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 lg:grid-cols-[1fr_1.4fr] lg:px-8 lg:py-32">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            ░ questions
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl">
            The honest answers.
          </h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            If something's missing, ask it on the call — we'd rather over-explain than over-promise.
          </p>
        </div>

        <ul className="divide-y divide-border border-y border-border">
          {faqs.map((f, i) => {
            const active = open === i;
            return (
              <li key={f.q}>
                <button
                  onClick={() => setOpen(active ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-display text-lg font-semibold md:text-xl">{f.q}</span>
                  <span className="grid size-7 shrink-0 place-items-center rounded-full border border-border text-muted-foreground">
                    {active ? <Minus size={14} /> : <Plus size={14} />}
                  </span>
                </button>
                <AnimatePresence>
                  {active && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-10 text-muted-foreground">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
