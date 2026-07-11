import { motion } from "motion/react";
import { Quote } from "lucide-react";
import { testimonials, type Testimonial, type PillarKey } from "@/lib/data";
import { TiltCard } from "@/components/ui/TiltCard";

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
}

export function Testimonials({ pillar, heading }: { pillar?: PillarKey; heading?: string }) {
  const items = pillar
    ? [
        ...testimonials.filter((t) => t.pillar === pillar),
        ...testimonials.filter((t) => t.pillar !== pillar),
      ]
    : testimonials;
  const marqueeItems = items.slice(1);
  const row = [...marqueeItems, ...marqueeItems];

  return (
    <section className="relative overflow-hidden bg-background py-20 lg:py-28">
      <div className="mx-auto mb-12 max-w-7xl px-5 lg:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          Said about us
        </p>
        <h2 className="mt-3 max-w-3xl font-display text-4xl font-semibold tracking-[-0.02em] md:text-5xl">
          {heading ?? "Operators we built systems for."}
        </h2>
      </div>

      {/* Featured spotlight */}
      {items[0] && (
        <div className="mx-auto mb-10 max-w-7xl px-5 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <TiltCard
              className="hover-glow relative grid gap-6 rounded-3xl border border-border bg-card p-8 md:grid-cols-[1fr_280px] md:p-12"
              intensity={3}
            >
              <Quote className="absolute right-8 top-8 text-primary/15" size={120} />
              <div className="relative">
                <p className="font-display text-2xl font-medium leading-snug tracking-[-0.01em] md:text-3xl">
                  "{items[0].quote}"
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-primary font-mono text-sm font-semibold text-primary-foreground">
                    {initials(items[0].name)}
                  </div>
                  <div>
                    <div className="font-medium">{items[0].name}</div>
                    <div className="font-mono text-xs text-muted-foreground">
                      {items[0].role} · {items[0].company}
                    </div>
                  </div>
                </div>
              </div>
              {items[0].metric && (
                <div className="relative grid place-items-center rounded-2xl border border-primary/30 bg-secondary/40 p-6 text-center">
                  <div>
                    <div className="font-display text-5xl font-semibold text-primary">
                      {items[0].metric.value}
                    </div>
                    <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                      {items[0].metric.label}
                    </div>
                  </div>
                </div>
              )}
            </TiltCard>
          </motion.div>
        </div>
      )}

      {/* Marquee row */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        <div className="marquee-fast flex w-max gap-5 pr-5 hover:[animation-play-state:paused]">
          {row.map((t, i) => (
            <QuoteCard key={`${t.id}-${i}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

function QuoteCard({ t }: { t: Testimonial }) {
  return (
    <div className="hover-glow relative w-[360px] shrink-0 rounded-2xl border border-border bg-card p-6 transition-transform duration-300 hover:scale-[1.02]">
      <Quote className="absolute right-4 top-4 text-primary/10" size={48} />
      <p className="text-sm leading-relaxed text-foreground/90">"{t.quote}"</p>
      <div className="mt-5 flex items-center gap-2.5">
        <div className="grid h-8 w-8 place-items-center rounded-full bg-secondary font-mono text-[11px] font-semibold text-foreground">
          {initials(t.name)}
        </div>
        <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
          {t.name} · <span className="text-foreground/70">{t.company}</span>
        </div>
      </div>
    </div>
  );
}
