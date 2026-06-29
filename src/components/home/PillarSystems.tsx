import { systemsServices } from "@/lib/data";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Bot, MessageSquare, Mic, Search, Globe, Target } from "lucide-react";

const icons = [Target, Bot, MessageSquare, Mic, Search, Globe];

export function PillarSystems({ leading, bridge }: { leading: boolean; bridge?: string }) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-secondary/15">
      <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
        {bridge && (
          <p className="mb-10 max-w-3xl border-l-2 border-accent pl-5 font-display text-xl italic text-muted-foreground md:text-2xl">
            {bridge}
          </p>
        )}

        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-3xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              ░ pillar {leading ? "01" : "02"} — conversion systems
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
              {leading
                ? "Catch every signal. Convert it on autopilot."
                : "Then bolt on the system that catches every signal."}
            </h2>
            <p className="mt-5 max-w-2xl text-muted-foreground md:text-lg">
              Meta ads, AI automations, voice agents, SEO and websites — wired together so a like in the morning is a booked call by lunch.
            </p>
          </div>
          <Link
            to="/services/systems"
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary"
          >
            Deep dive <ArrowRight size={14} />
          </Link>
        </div>

        {/* Ads → Automation → Conversion pipeline */}
        <FunnelDiagram />

        {/* Services */}
        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {systemsServices.map((s, i) => {
            const Icon = icons[i] ?? Bot;
            return (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-colors hover:border-accent/50"
              >
                <div className="flex items-center justify-between">
                  <div className="grid size-9 place-items-center rounded-lg bg-accent/15 text-accent-foreground">
                    <Icon size={16} />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.blurb}</p>
                <ul className="mt-4 space-y-1">
                  {s.bullets.map((b) => (
                    <li key={b} className="text-xs text-foreground/80">
                      — {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FunnelDiagram() {
  const stages = [
    { label: "Ads", sub: ["Meta", "Google", "YouTube"] },
    { label: "Automation", sub: ["WhatsApp flow", "AI qualifies", "Voice fallback", "CRM sync"] },
    { label: "Conversion", sub: ["Calendar booked", "Follow-ups", "Re-engage"] },
  ];

  return (
    <div className="mt-14 rounded-3xl border border-border bg-card p-6 md:p-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          ░ the pipeline — from ad to booked call
        </p>
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">
          avg. response: 8s
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-[1fr_auto_1.2fr_auto_1fr] md:items-stretch">
        {stages.flatMap((s, i) => {
          const node = (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="flex flex-col rounded-2xl border border-border bg-background p-5"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                stage 0{i + 1}
              </div>
              <div className="mt-2 font-display text-2xl font-bold text-foreground">{s.label}</div>
              <ul className="mt-4 space-y-1.5">
                {s.sub.map((x) => (
                  <li key={x} className="flex items-center gap-2 text-sm text-foreground/85">
                    <span className="size-1.5 rounded-sm bg-primary" /> {x}
                  </li>
                ))}
              </ul>
            </motion.div>
          );
          if (i < stages.length - 1) {
            return [
              node,
              <div key={`arrow-${i}`} className="flex items-center justify-center py-3 md:py-0">
                <Arrow />
              </div>,
            ];
          }
          return [node];
        })}
      </div>

    </div>
  );
}

function Arrow() {
  return (
    <svg width="42" height="20" viewBox="0 0 42 20" className="rotate-90 md:rotate-0">
      <motion.path
        d="M2 10 H38 M30 4 L38 10 L30 16"
        fill="none"
        stroke="var(--color-lime)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="4 4"
        initial={{ strokeDashoffset: 0 }}
        animate={{ strokeDashoffset: -32 }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
      />
    </svg>
  );
}
