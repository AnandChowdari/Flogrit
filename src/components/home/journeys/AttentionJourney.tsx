import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { systemJourneys } from "@/lib/systemJourneys";
import { cases } from "@/lib/data";
import { Testimonials } from "@/components/site/Testimonials";
import { ReelGallery } from "@/components/attention/ReelGallery";
import {
  CapabilityGroups,
  JourneyHeader,
  JourneyPrimaryCTA,
  NextDirections,
  PricingReveal,
  ProcessCadence,
} from "./_shared";

export function AttentionJourney() {
  const c = systemJourneys.attention;
  const attentionCases = cases.filter((x) => x.pillar === "attention");

  return (
    <>
      <JourneyHeader
        pillarKey="attention"
        headline={c.problem.headline}
        body={c.problem.body}
      />

      <CapabilityGroups groups={c.capabilityGroups} />

      <ReelGallery />

      <ProcessCadence steps={c.process} />

      {/* Proof */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Proof
          </p>
          <div className="mt-6 grid gap-10 md:grid-cols-[auto_1fr] md:items-end">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="font-display text-6xl font-semibold tracking-[-0.03em] text-primary md:text-7xl">
                {c.proof.headlineStat}
              </div>
              <div className="mt-2 max-w-xs font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                {c.proof.label}
              </div>
            </motion.div>
            <p className="max-w-xl text-muted-foreground">{c.proof.body}</p>
          </div>

          {attentionCases.length > 0 && (
            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {attentionCases.map((cs) => (
                <Link
                  key={cs.slug}
                  to="/work/$slug"
                  params={{ slug: cs.slug }}
                  className="group flex flex-col rounded-2xl border border-border bg-card p-7 transition-colors hover:border-primary/40"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    {cs.industry}
                  </span>
                  <h4 className="mt-5 font-display text-xl font-semibold">{cs.client}</h4>
                  <p className="mt-2 text-sm text-muted-foreground">{cs.oneLine}</p>
                  {cs.metric[0] && (
                    <div className="mt-6 border-t border-border pt-4">
                      <div className="font-display text-3xl font-semibold text-foreground">
                        {cs.metric[0].value}
                      </div>
                      <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                        {cs.metric[0].label}
                      </div>
                    </div>
                  )}
                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Read the case →
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Testimonials pillar="attention" heading="Operators we've directed." />

      <PricingReveal pillarKey="attention" label={c.ctaLabels.pricing} />

      <JourneyPrimaryCTA pillarKey="attention" label={c.ctaLabels.primary} />

      <NextDirections from="attention" next={c.nextDirections} />
    </>
  );
}
