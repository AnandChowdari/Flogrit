import { createFileRoute, Link } from "@tanstack/react-router";
import { pillars } from "@/lib/data";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

const p = pillars.conversion;

export const Route = createFileRoute("/services/conversion")({
  head: () => ({
    meta: [
      { title: `${p.label} — Flogrit` },
      { name: "description", content: `${p.oneLine} Websites, funnels and copy engineered so interest becomes action.` },
      { property: "og:title", content: `${p.label} — Flogrit` },
      { property: "og:description", content: `${p.oneLine} The second pillar of the Flogrit growth system.` },
    ],
  }),
  component: ConversionPage,
});

function ConversionPage() {
  return (
    <>
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">02 · {p.label}</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl font-semibold leading-[1.02] tracking-[-0.02em] md:text-6xl lg:text-7xl">
            {p.oneLine.replace(/\.$/, "")} — <span className="text-primary">without friction.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{p.body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground">
              Audit our funnel →
            </Link>
            <Link to="/work" className="rounded-full border border-border px-5 py-3 text-sm font-medium hover:bg-secondary">
              See case studies
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-secondary/15">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
          <div className="grid gap-5 md:grid-cols-3">
            {p.services.map((s, i) => (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="rounded-2xl border border-border bg-card p-8"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">0{i + 1}</span>
                <h2 className="mt-5 font-display text-2xl font-semibold">{s.title}</h2>
                <p className="mt-3 text-muted-foreground">{s.blurb}</p>
                <ul className="mt-5 space-y-2 border-t border-border pt-5">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm">
                      <ArrowRight size={12} className="text-primary" /> {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
