import { cases, pillars } from "@/lib/data";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";

export function Proof() {
  return (
    <section className="relative border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Proof
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.02em] md:text-5xl">
              The work, told in numbers.
            </h2>
          </div>
          <Link to="/work" className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:bg-secondary">
            All case studies →
          </Link>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {cases.map((c, i) => (
            <motion.article
              key={c.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="hover-glow group flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:border-primary/40 hover:-translate-y-1 hover:scale-[1.02]"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  {c.industry}
                </span>
                <span className="rounded-full border border-border bg-secondary/30 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-foreground">
                  {c.status}
                </span>
              </div>

              <h3 className="mt-6 font-display text-xl font-semibold leading-tight md:text-2xl">
                {c.client}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">{c.oneLine}</p>

              {c.metric[0] && (
                <div className="mt-6 border-t border-border pt-5">
                  <div className="font-mono text-3xl font-semibold text-foreground">
                    {c.metric[0].value}
                  </div>
                  <div className="mt-1 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                    {c.metric[0].label}
                  </div>
                </div>
              )}

              <Link
                to="/work/$slug"
                params={{ slug: c.slug }}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary"
              >
                Read the case →
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
