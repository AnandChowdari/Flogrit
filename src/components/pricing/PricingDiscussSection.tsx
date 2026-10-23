import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { pillars, type PillarKey } from "@/lib/data";

interface PricingDiscussSectionProps {
  pillarKey?: PillarKey;
  className?: string;
  label?: string;
}

export function PricingDiscussSection({
  pillarKey,
  className = "",
}: PricingDiscussSectionProps) {
  const p = pillarKey ? pillars[pillarKey] : null;

  return (
    <section className={`relative overflow-hidden bg-background py-16 lg:py-24 ${className}`}>
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card via-card/90 to-secondary/30 p-8 sm:p-12 lg:p-16">
          {/* Ambient Glows */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-primary/15 blur-[100px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-primary/10 blur-[100px]"
          />

          <div className="relative z-10 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                <span className="size-1.5 rounded-full bg-primary" />
                {p ? `0${p.index} · ${p.label} Pricing` : "Custom Pricing"}
              </span>

              <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.02em] text-foreground sm:text-4xl lg:text-5xl">
                Want to discuss pricing?
              </h2>

              <p className="mt-4 text-base text-muted-foreground sm:text-lg leading-relaxed">
                {p
                  ? `Every ${p.label.toLowerCase()} system is custom-scoped around your bottlenecks, production volume, and growth velocity. Let's discuss transparent pricing and find the right model for your business.`
                  : "Every system is custom-scoped around your bottlenecks, production volume, and growth velocity. Let's discuss transparent pricing and find the right model for your business."}
              </p>
            </div>

            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center lg:flex-col lg:items-end">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-[0_0_35px_-8px_rgba(198,255,52,0.4)] transition-all hover:scale-105 hover:bg-primary/95"
              >
                Talk to us
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
              <p className="font-mono text-xs text-muted-foreground">
                30-min discovery call · No pitch
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
