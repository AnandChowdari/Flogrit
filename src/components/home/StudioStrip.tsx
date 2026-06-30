import { reels } from "@/lib/data";
import { motion } from "motion/react";
import { Play } from "lucide-react";

export function StudioStrip() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Attention, in motion
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.02em] md:text-5xl">
              The output of the first pillar.
            </h2>
            <p className="mt-4 max-w-xl text-muted-foreground">
              A snapshot of recent work — the content that earns the room before any system gets to do its job.
            </p>
          </div>
          <div className="hidden font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground md:block">
            12M+ views · 36 pieces shipped this quarter
          </div>
        </div>

        <div className="relative mt-10 h-px w-full bg-border">
          <motion.div
            initial={{ x: "-10%" }}
            whileInView={{ x: "110%" }}
            viewport={{ once: false, margin: "-30%" }}
            transition={{ duration: 6, ease: "linear", repeat: Infinity }}
            className="absolute top-1/2 size-2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_20px_var(--color-lime)]"
          />
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4">
          {reels.map((r, i) => (
            <ReelCard key={r.id} reel={r} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ReelCard({ reel, index }: { reel: typeof reels[number]; index: number }) {
  const tall = index % 3 === 0;
  return (
    <motion.figure
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className={`group relative overflow-hidden rounded-xl border border-border bg-card ${tall ? "row-span-2 aspect-[9/20]" : "aspect-[9/14]"}`}
    >
      <div
        className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
        style={{
          background: `radial-gradient(circle at 30% 20%, oklch(0.45 0.16 ${reel.hue} / 0.7), oklch(0.18 0.04 ${reel.hue} / 0.95))`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

      <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-background/70 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground backdrop-blur">
        <span className="size-1 rounded-full bg-primary" /> {reel.watch}
      </div>

      <div className="absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-primary/90 text-primary-foreground opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
        <Play size={18} fill="currentColor" />
      </div>

      <figcaption className="absolute inset-x-3 bottom-3 z-10">
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{reel.client}</div>
        <div className="mt-1 text-sm font-medium text-foreground">{reel.title}</div>
        <div className="mt-1 font-mono text-[10px] text-primary">{reel.views} views</div>
      </figcaption>
    </motion.figure>
  );
}
