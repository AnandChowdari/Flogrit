import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { systemJourneys } from "@/lib/systemJourneys";
import { cases } from "@/lib/data";
import { Testimonials } from "@/components/site/Testimonials";
import {
  CapabilityGroups,
  JourneyHeader,
  JourneyPrimaryCTA,
  NextDirections,
  PricingReveal,
  ProcessCadence,
} from "./_shared";
import { LeakVsPathDiagram } from "./LeakVsPathDiagram";
import { WhatsAppProof } from "./WhatsAppProof";

export function ConversionJourney() {
  const c = systemJourneys.conversion;
  const caseData = cases.find((x) => x.slug === c.caseStudy.caseSlug);

  return (
    <>
      <JourneyHeader
        pillarKey="conversion"
        headline={c.problem.headline}
        body={c.problem.body}
      />

      {/* Leak vs path visual */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-[1fr_1.1fr] lg:px-8 lg:py-24">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              The difference
            </p>
            <h3 className="mt-3 font-display text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
              A leaky funnel spills attention. A designed path routes it.
            </h3>
            <p className="mt-4 max-w-lg text-muted-foreground">
              Same traffic, two outcomes. The one on the right isn't smarter marketing — it's fewer decisions between a first click and a booked call.
            </p>
          </div>
          <LeakVsPathDiagram />
        </div>
      </section>

      <CapabilityGroups groups={c.capabilityGroups} />

      <ProcessCadence steps={c.process} />

      {/* Case study */}
      {caseData && (
        <section className="border-b border-border bg-secondary/15">
          <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Case study
            </p>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-6 grid gap-8 rounded-3xl border border-border bg-card p-8 md:p-12 lg:grid-cols-[1.2fr_1fr]"
            >
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">
                  {c.caseStudy.framing.split(" — ")[0]}
                </div>
                <h4 className="mt-4 font-display text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
                  {caseData.title}
                </h4>
                <p className="mt-4 max-w-xl text-muted-foreground">{caseData.context}</p>
                <Link
                  to="/work/$slug"
                  params={{ slug: caseData.slug }}
                  className="mt-6 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:bg-secondary"
                >
                  Read the full case →
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {caseData.metric.map((m) => (
                  <div key={m.label} className="rounded-2xl border border-border bg-background p-5">
                    <div className="font-display text-2xl font-semibold text-primary md:text-3xl">
                      {m.value}
                    </div>
                    <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      <WhatsAppProof />

      <Testimonials pillar="conversion" heading="Funnels that actually close." />

      <PricingReveal pillarKey="conversion" label={c.ctaLabels.pricing} />

      <JourneyPrimaryCTA pillarKey="conversion" label={c.ctaLabels.primary} />

      <NextDirections from="conversion" next={c.nextDirections} />
    </>
  );
}
