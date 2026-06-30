import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";
import { pillarPricing, type PillarKey, type PricingTier } from "@/lib/data";
import { TiltCard } from "@/components/ui/TiltCard";

function formatINR(n: number) {
  if (n >= 100000) return `₹${(n / 100000).toFixed(n % 100000 === 0 ? 0 : 2)}L`;
  return `₹${n.toLocaleString("en-IN")}`;
}

export function PricingMatrix({ pillar, compact = false }: { pillar: PillarKey; compact?: boolean }) {
  const data = pillarPricing[pillar];

  return (
    <section className="relative border-y border-border bg-background">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        {!compact && (
          <div className="mb-12 max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Pricing
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-[-0.02em] md:text-5xl">
              {data.heading}
            </h2>
            <p className="mt-4 text-muted-foreground">{data.sub}</p>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.tiers.map((tier, i) => (
            <TierCard key={tier.id} tier={tier} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TierCard({ tier, delay }: { tier: PricingTier; delay: number }) {
  const [idx, setIdx] = useState(tier.options.length > 1 ? 1 : 0);
  const opt = tier.options[idx];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      <TiltCard
        className={`hover-glow group relative rounded-3xl border bg-card p-7 ${
          tier.highlight ? "border-primary/40" : "border-border"
        }`}
        intensity={5}
      >
        {tier.highlight && (
          <span className="absolute right-5 top-5 z-10 rounded-full bg-primary px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-primary-foreground shadow-[0_8px_24px_-8px_oklch(0.85_0.2_125_/_0.6)]">
            Most picked
          </span>
        )}

        <h3 className="font-display text-2xl font-semibold">{tier.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{tier.tagline}</p>

        {/* Segmented control */}
        <div className="mt-6 flex flex-wrap gap-1.5 rounded-full border border-border bg-secondary/40 p-1">
          {tier.options.map((o, i) => (
            <button
              key={o.label}
              onClick={() => setIdx(i)}
              className={`relative rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                i === idx ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {i === idx && (
                <motion.span
                  layoutId={`seg-${tier.id}`}
                  className="absolute inset-0 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative">{o.label}</span>
            </button>
          ))}
        </div>

        {/* Price */}
        <div className="mt-7 flex items-baseline gap-2 overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={opt.price}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.32 }}
              className="font-display text-5xl font-semibold tracking-[-0.03em]"
            >
              {formatINR(opt.price)}
            </motion.span>
          </AnimatePresence>
        </div>
        <div className="mt-1 h-5 font-mono text-xs text-muted-foreground">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={opt.note ?? opt.label}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.24 }}
            >
              {opt.note ?? `${opt.qty} ${opt.unit}`}
            </motion.span>
          </AnimatePresence>
        </div>

        <ul className="mt-6 space-y-2.5 border-t border-border pt-6">
          {tier.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm">
              <Check size={14} className="mt-0.5 shrink-0 text-primary" />
              <span className="text-muted-foreground">{f}</span>
            </li>
          ))}
        </ul>

        <Link
          to="/contact"
          className={`mt-7 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition-transform hover:scale-[1.02] ${
            tier.highlight
              ? "bg-primary text-primary-foreground"
              : "border border-border bg-secondary/40 text-foreground hover:bg-secondary"
          }`}
        >
          {tier.cta} →
        </Link>
      </TiltCard>
    </motion.div>
  );
}
