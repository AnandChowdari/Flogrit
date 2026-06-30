import { createFileRoute, Link } from "@tanstack/react-router";
import { cases, pillars, pillarOrder, type PillarKey } from "@/lib/data";
import { useState } from "react";
import { motion } from "motion/react";

export const Route = createFileRoute("/work/")({
  head: () => ({
    meta: [
      { title: "Work — Flogrit" },
      {
        name: "description",
        content: "Selected case studies across Attention, Conversion and Automation — shipped, measured, repeatable.",
      },
      { property: "og:title", content: "Work — Flogrit" },
      { property: "og:description", content: "Selected case studies across the Flogrit growth system." },
    ],
  }),
  component: WorkPage,
});

type Filter = "all" | PillarKey;

function WorkPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const list = filter === "all" ? cases : cases.filter((c) => c.pillar === filter);
  const filters: Filter[] = ["all", ...pillarOrder];

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          Selected work
        </p>
        <h1 className="mt-4 font-display text-5xl font-semibold leading-[1.02] tracking-[-0.02em] md:text-7xl">
          Shipped. Measured. Compounding.
        </h1>

        <div className="mt-12 inline-flex flex-wrap rounded-full border border-border bg-card p-1">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors ${
                filter === f ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f === "all" ? "All" : pillars[f].label}
            </button>
          ))}
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {list.map((c, i) => (
            <motion.article
              key={c.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rounded-2xl border border-border bg-card p-8 transition-colors hover:border-primary/40"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  {c.industry}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
                  {pillars[c.pillar].label}
                </span>
              </div>
              <h2 className="mt-6 font-display text-2xl font-semibold leading-tight md:text-3xl">{c.title}</h2>
              <p className="mt-3 text-muted-foreground">{c.summary}</p>
              <dl className="mt-6 grid grid-cols-3 gap-2 border-t border-border pt-5">
                {c.metric.map((m) => (
                  <div key={m.label}>
                    <dt className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{m.label}</dt>
                    <dd className="mt-1 font-mono text-xl text-foreground">{m.value}</dd>
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
