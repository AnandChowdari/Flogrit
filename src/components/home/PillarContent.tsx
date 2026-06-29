import { contentServices, simplePlans, precisePlans } from "@/lib/data";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Film, Sparkles, Zap } from "lucide-react";

const icons = [Film, Sparkles, Zap];

export function PillarContent({ leading, bridge }: { leading: boolean; bridge?: string }) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
        {bridge && (
          <p className="mb-10 max-w-3xl border-l-2 border-primary pl-5 font-display text-xl italic text-muted-foreground md:text-2xl">
            {bridge}
          </p>
        )}

        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-3xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              ░ pillar {leading ? "01" : "02"} — content & reach
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
              {leading
                ? "Earn the attention. Own the feed."
                : "And keep the top of the funnel honest."}
            </h2>
            <p className="mt-5 max-w-2xl text-muted-foreground md:text-lg">
              The studio side. Video editing, content strategy, and brand work that turns scrollers into subscribers and subscribers into pipeline.
            </p>
          </div>
          <Link
            to="/services/content"
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary"
          >
            Deep dive <ArrowRight size={14} />
          </Link>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {contentServices.map((s, i) => {
            const Icon = icons[i] ?? Film;
            return (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 transition-colors hover:border-primary/40"
              >
                <div className="flex items-center justify-between">
                  <div className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Icon size={18} />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-2xl font-bold">{s.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{s.blurb}</p>
                <ul className="mt-5 space-y-1.5">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-foreground/85">
                      <span className="size-1 rounded-full bg-primary" /> {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Plans */}
        <div className="mt-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h3 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              Video plans — pick your cadence
            </h3>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
              prices in inr · monthly
            </p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <PlanTable name="Simple" tagline="Fast turnaround. Strong fundamentals." plans={simplePlans} />
            <PlanTable name="Precise" tagline="Cinematic. Strategic. Founder-led." plans={precisePlans} highlight />
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="rounded-full border border-border bg-secondary/40 px-4 py-2 text-sm text-foreground">
              ✱ Try one video first — we'll prove quality before any retainer
            </span>
            <Link
              to="/contact"
              className="rounded-full border border-primary/60 bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
            >
              Bulk campaign? Book a call →
            </Link>
          </div>
        </div>

        {/* Custom band */}
        <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-secondary/60 to-card p-8 md:p-10">
          <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                ░ outside the plans
              </p>
              <h4 className="mt-3 font-display text-2xl font-bold leading-tight md:text-3xl">
                Can't find a plan that fits? We build custom.
              </h4>
              <div className="mt-4 flex flex-wrap gap-2">
                {["SaaS animations", "Product launch films", "Brand systems"].map((t) => (
                  <span key={t} className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs text-foreground/90">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-start gap-3 md:items-end">
              <div className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
                starting from
              </div>
              <div className="font-display text-4xl font-bold text-primary md:text-5xl">₹26,000</div>
              <Link
                to="/contact"
                className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
              >
                Book a scope call →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PlanTable({
  name,
  tagline,
  plans,
  highlight,
}: {
  name: string;
  tagline: string;
  plans: typeof simplePlans;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border bg-card p-6 md:p-8 ${
        highlight ? "border-primary/50 shadow-[0_0_60px_-30px_var(--color-lime)]" : "border-border"
      }`}
    >
      <div className="flex items-baseline justify-between">
        <h4 className="font-display text-2xl font-bold">{name}</h4>
        {highlight && (
          <span className="rounded-full bg-primary px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-primary-foreground">
            most picked
          </span>
        )}
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{tagline}</p>

      <ul className="mt-6 divide-y divide-border">
        {plans.map((p) => (
          <li key={p.label} className="flex items-baseline justify-between py-4">
            <div>
              <div className="font-medium text-foreground">{p.label}</div>
              <div className="font-mono text-xs text-muted-foreground">{p.videos} videos · {p.per}</div>
            </div>
            <div className="font-mono text-xl text-foreground md:text-2xl">{p.price}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
