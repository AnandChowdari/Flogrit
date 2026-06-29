import { createFileRoute, Link } from "@tanstack/react-router";
import { cases } from "@/lib/data";
import { useState } from "react";
import { motion } from "motion/react";

export const Route = createFileRoute("/work/")({
  head: () => ({
    meta: [
      { title: "Work — flow/studio" },
      {
        name: "description",
        content: "Selected case studies — shipped, measured, repeatable. Content programmes and conversion systems.",
      },
      { property: "og:title", content: "Work — flow/studio" },
      { property: "og:description", content: "Selected case studies across content and conversion systems." },
    ],
  }),
  component: WorkPage,
});

function WorkPage() {
  const [filter, setFilter] = useState<"all" | "content" | "systems">("all");
  const list = filter === "all" ? cases : cases.filter((c) => c.pillar === filter);

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          ░ selected work
        </p>
        <h1 className="mt-4 font-display text-5xl font-bold leading-[1.02] tracking-tight md:text-7xl">
          Shipped. Measured. Repeated.
        </h1>

        <div className="mt-12 inline-flex rounded-full border border-border bg-card p-1">
          {(["all", "content", "systems"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] transition-colors ${
                filter === f ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
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
                <span className={`font-mono text-[10px] uppercase tracking-[0.18em] ${c.pillar === "content" ? "text-primary" : "text-accent-foreground"}`}>
                  {c.pillar}
                </span>
              </div>
              <h2 className="mt-6 font-display text-2xl font-bold leading-tight md:text-3xl">{c.title}</h2>
              <p className="mt-3 text-muted-foreground">{c.summary}</p>
              <dl className="mt-6 grid grid-cols-3 gap-2 border-t border-border pt-5">
                {c.metric.map((m) => (
                  <div key={m.label}>
                    <dt className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{m.label}</dt>
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
