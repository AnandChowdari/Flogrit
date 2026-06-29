import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      <div
        className="pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.4) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] opacity-70">
          ░ final track — your turn
        </p>
        <h2 className="mt-4 max-w-4xl font-display text-5xl font-bold leading-[0.98] tracking-tight md:text-6xl lg:text-[5.5rem]">
          Stop renting attention. <em className="not-italic underline decoration-[3px] underline-offset-[6px]">Start converting it.</em>
        </h2>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-background px-6 py-4 text-base font-semibold text-foreground transition-transform hover:scale-[1.02]"
          >
            Book a discovery call
            <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <p className="font-mono text-xs uppercase tracking-[0.22em] opacity-80">
            30 min · no pitch · just diagnosis
          </p>
        </div>
      </div>
    </section>
  );
}
