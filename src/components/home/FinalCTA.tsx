import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      <div
        className="pointer-events-none absolute inset-0 opacity-15 mix-blend-overlay"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.4) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] opacity-70">
          From attention to customers
        </p>
        <h2 className="mt-4 max-w-4xl font-display text-5xl font-semibold leading-[0.98] tracking-[-0.02em] md:text-6xl lg:text-[5.5rem]">
          Let's design the system your business is supposed to run on.
        </h2>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-background px-6 py-4 text-base font-medium text-foreground transition-transform hover:scale-[1.02]"
          >
            Start with a 30-minute call
            <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] opacity-80">
            No pitch · just diagnosis
          </p>
        </div>
      </div>
    </section>
  );
}
