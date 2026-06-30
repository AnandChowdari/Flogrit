import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { pillars, type PillarKey } from "@/lib/data";

export function PillarSection({
  pillarKey,
  position,
  bridge,
}: {
  pillarKey: PillarKey;
  position: number; // 1 / 2 / 3 in the page
  bridge?: string;
}) {
  const p = pillars[pillarKey];
  const alt = position % 2 === 0;

  return (
    <section
      className={`relative border-b border-border ${alt ? "bg-secondary/15" : "bg-background"}`}
    >
      <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-28">
        {bridge && (
          <p className="mb-12 max-w-3xl border-l-2 border-primary pl-5 font-display text-xl italic text-muted-foreground md:text-2xl">
            {bridge}
          </p>
        )}

        <div className="grid items-end gap-8 md:grid-cols-[1.4fr_auto]">
          <div className="max-w-3xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              0{position} · {p.label}
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.02em] md:text-5xl lg:text-6xl">
              {p.headline}
            </h2>
            <p className="mt-5 max-w-2xl text-muted-foreground md:text-lg">{p.body}</p>
            <p className="mt-3 max-w-2xl font-mono text-[11px] uppercase tracking-[0.22em] text-primary">
              {p.oneLine}
            </p>
          </div>
          <Link
            to={p.href}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary"
          >
            Inside {p.label.toLowerCase()} <ArrowRight size={14} />
          </Link>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3 md:gap-5">
          {p.services.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 transition-colors hover:border-primary/40"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.blurb}</p>
              <ul className="mt-5 space-y-1.5 border-t border-border pt-4">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm text-foreground/85">
                    <span className="size-1 rounded-full bg-primary" /> {b}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
