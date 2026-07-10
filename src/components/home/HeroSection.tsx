import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { HeroFlowAnimation } from "./HeroFlowAnimation";
import { ArrowUpRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <BackgroundGrid />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:px-8 lg:py-28">
        <div className="relative z-10 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-secondary/40 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground"
          >
            <span className="size-1.5 rounded-full bg-primary" />
            Flogrit — a Growth Systems Company
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-6 font-display text-5xl font-semibold leading-[1.02] tracking-[-0.02em] text-balance md:text-6xl lg:text-7xl"
          >
            We help businesses turn{" "}
            <span className="text-primary">attention into customers.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 max-w-xl text-lg text-muted-foreground md:text-xl"
          >
            Most companies don't lack tools — they lack a system that connects them.
            Flogrit designs and builds the system: Attention, Conversion, Automation, working as one.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
            >
              Talk to us
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              to="/work"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              See the work
            </Link>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-6"
          >
            {[
              ["01", "Attention"],
              ["02", "Conversion"],
              ["03", "Automation"],
            ].map(([n, l]) => (
              <div key={l}>
                <dt className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">{n}</dt>
                <dd className="mt-2 font-display text-lg font-medium text-foreground">{l}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative z-10"
        >
          <HeroFlowAnimation />
        </motion.div>
      </div>
    </section>
  );
}

function BackgroundGrid() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.16]"
      style={{
        backgroundImage:
          "linear-gradient(to right, var(--color-line) 1px, transparent 1px), linear-gradient(to bottom, var(--color-line) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
        maskImage: "radial-gradient(ellipse at 70% 50%, black 25%, transparent 75%)",
      }}
    />
  );
}
