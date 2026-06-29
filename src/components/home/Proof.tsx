import { cases } from "@/lib/data";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";

export function Proof() {
  return (
    <section className="relative border-b border-border bg-background grain">
      <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              ░ proof — shipped, measured, repeated
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl">
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
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-7 transition-colors hover:border-primary/40"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  {c.industry}
                </span>
                <span className={`font-mono text-[10px] uppercase tracking-[0.18em] ${c.pillar === "content" ? "text-primary" : "text-accent-foreground"}`}>
                  {c.pillar}
                </span>
              </div>

              <h3 className="mt-6 font-display text-xl font-bold leading-tight md:text-2xl">
                {c.title}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">{c.summary}</p>

              <dl className="mt-6 grid grid-cols-3 gap-2 border-t border-border pt-5">
                {c.metric.map((m) => (
                  <div key={m.label}>
                    <dt className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{m.label}</dt>
                    <dd className="mt-1 font-mono text-lg text-foreground">{m.value}</dd>
                  </div>
                ))}
              </dl>

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
