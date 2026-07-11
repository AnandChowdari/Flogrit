import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useFlow, type Flow } from "@/lib/flow";
import { pillars, type PillarKey } from "@/lib/data";
import { PricingMatrix } from "@/components/pricing/PricingMatrix";
import { CalendlyButton } from "@/components/site/CalendlyButton";
import type { CapabilityGroup, NextDirection, ProcessStep } from "@/lib/systemJourneys";

export function JourneyHeader({
  pillarKey,
  headline,
  body,
}: {
  pillarKey: PillarKey;
  headline: string;
  body: string;
}) {
  const p = pillars[pillarKey];
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          0{p.index} · {p.label} system
        </p>
        <h2 className="mt-4 max-w-4xl font-display text-4xl font-semibold leading-[1.02] tracking-[-0.02em] md:text-5xl lg:text-6xl">
          {headline}
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{body}</p>
      </div>
    </section>
  );
}

export function CapabilityGroups({ groups }: { groups: CapabilityGroup[] }) {
  return (
    <section className="bg-secondary/15">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          What Flogrit builds
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {groups.map((g, i) => (
            <motion.div
              key={g.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rounded-2xl border border-border bg-card p-7"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                0{i + 1}
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold">{g.label}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{g.blurb}</p>
              <ul className="mt-5 space-y-2 border-t border-border pt-4">
                {g.items.map((it) => (
                  <li key={it} className="flex items-start gap-2 text-sm text-foreground/85">
                    <span className="mt-2 size-1 rounded-full bg-primary" /> {it}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProcessCadence({ steps }: { steps: ProcessStep[] }) {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          How the system is built
        </p>
        <h3 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
          A cadence, not a project plan.
        </h3>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="rounded-2xl border border-border bg-card p-6">
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">
                {s.n}
              </div>
              <h4 className="mt-3 font-display text-lg font-semibold">{s.title}</h4>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PricingReveal({
  pillarKey,
  label,
}: {
  pillarKey: PillarKey;
  label: string;
}) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-5 pt-16 lg:px-8 lg:pt-20">
        <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          {open ? "Live pricing · tap a quantity to update" : "Transparent Pricing"}
        </p>
        
        <div className="relative">
          <motion.div
            initial={false}
            animate={{ height: open ? "auto" : 350 }}
            transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div 
              className={
                !open 
                  ? "pointer-events-none select-none blur-[4px] opacity-50 transition-all duration-500" 
                  : "transition-all duration-500"
              }
            >
              <PricingMatrix pillar={pillarKey} compact />
            </div>
          </motion.div>

          <AnimatePresence>
            {!open && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-t from-background via-background/40 to-transparent"
              >
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="group inline-flex items-center gap-3 rounded-full border border-primary/40 bg-background/80 px-8 py-4 text-base font-semibold text-foreground shadow-[0_0_50px_-12px_rgba(139,92,246,0.4)] backdrop-blur-xl transition-all hover:scale-105 hover:border-primary/80 hover:bg-secondary"
                >
                  {label}
                  <span className="grid size-7 place-items-center rounded-full bg-primary/20 text-primary transition-transform group-hover:translate-y-0.5">
                    <ChevronDown size={16} />
                  </span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export function JourneyPrimaryCTA({
  pillarKey,
  label,
}: {
  pillarKey: PillarKey;
  label: string;
}) {
  const p = pillars[pillarKey];
  return (
    <section className="bg-secondary/15">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-border bg-card p-8 md:flex-row md:items-center md:p-10">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              From {p.label.toLowerCase()} to a live system
            </p>
            <h3 className="mt-3 max-w-xl font-display text-2xl font-semibold tracking-[-0.01em] md:text-3xl">
              {p.oneLine}
            </h3>
          </div>
          <CalendlyButton>{label}</CalendlyButton>
        </div>
      </div>
    </section>
  );
}

export function NextDirections({
  from,
  next,
}: {
  from: PillarKey;
  next: readonly [NextDirection, NextDirection];
}) {
  const { setSystem } = useFlow();
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          Where {pillars[from].label.toLowerCase()} connects next
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {next.map((n) => {
            const target = pillars[n.toSystem];
            return (
              <button
                key={n.toSystem}
                type="button"
                onClick={() => setSystem(n.toSystem as Flow)}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-6 text-left transition-colors hover:border-primary/50"
              >
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    0{target.index} · {target.label}
                  </div>
                  <div className="mt-2 font-display text-lg font-semibold">{n.label}</div>
                </div>
                <ArrowRight
                  size={20}
                  className="shrink-0 text-primary transition-transform group-hover:translate-x-1"
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
