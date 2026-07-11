import { motion } from "motion/react";
import { Check } from "lucide-react";
import { systemJourneys } from "@/lib/systemJourneys";
import { Testimonials } from "@/components/site/Testimonials";
import {
  JourneyHeader,
  JourneyPrimaryCTA,
  NextDirections,
  PricingReveal,
  ProcessCadence,
} from "./_shared";
import { InlineFlowDiagram } from "./InlineFlowDiagram";

export function AutomationJourney() {
  const c = systemJourneys.automation;

  return (
    <>
      <JourneyHeader
        pillarKey="automation"
        headline={c.problem.headline}
        body={c.problem.body}
      />

      {/* Implementation frameworks */}
      <section className="bg-secondary/15">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Implementation frameworks
          </p>
          <h3 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
            Five patterns we implement, mapped to the pain they replace.
          </h3>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {c.frameworks.map((f, i) => (
              <motion.article
                key={f.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="rounded-2xl border border-border bg-card p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    Framework {f.n}
                  </span>
                  <span className="rounded-full border border-border bg-secondary/30 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-foreground">
                    Implementation framework
                  </span>
                </div>
                <h4 className="mt-5 font-display text-xl font-semibold md:text-2xl">{f.title}</h4>
                <p className="mt-3 text-sm text-muted-foreground">{f.painScenario}</p>
                <div className="mt-6 border-t border-border pt-5">
                  <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    System flow
                  </div>
                  <InlineFlowDiagram nodes={f.systemFlow} />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            What Flogrit can implement
          </p>
          <h3 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
            Custom automation, wired to the tools you already pay for.
          </h3>
          <ul className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {c.capabilities.map((cap) => (
              <li
                key={cap}
                className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5"
              >
                <span className="mt-0.5 grid size-6 place-items-center rounded-full bg-primary/15 text-primary">
                  <Check size={12} strokeWidth={3} />
                </span>
                <span className="text-sm text-foreground/90">{cap}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ProcessCadence steps={c.process} />

      <Testimonials pillar="automation" heading="Systems doing the quiet work." />

      <PricingReveal pillarKey="automation" label={c.ctaLabels.pricing} />

      <JourneyPrimaryCTA pillarKey="automation" label={c.ctaLabels.primary} />

      <NextDirections from="automation" next={c.nextDirections} />
    </>
  );
}
