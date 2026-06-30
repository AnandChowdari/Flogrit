import { createFileRoute, Link } from "@tanstack/react-router";
import { PricingMatrix } from "@/components/pricing/PricingMatrix";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Flogrit" },
      {
        name: "description",
        content:
          "Dynamic, per-pillar pricing — Attention, Conversion and Automation. Scoped to the system, not the deliverable.",
      },
      { property: "og:title", content: "Pricing — Flogrit" },
      {
        property: "og:description",
        content: "Indicative pricing for the Flogrit growth system.",
      },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  return (
    <>
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Pricing
          </p>
          <h1 className="mt-4 font-display text-5xl font-semibold leading-[1.02] tracking-[-0.02em] md:text-7xl">
            Pick a pillar.{" "}
            <span className="text-primary">Scale by the option you press.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-muted-foreground">
            Every card below is live — tap a quantity and the price updates. Engagements
            usually start at one pillar and extend as the system proves itself.
          </p>
          <div className="mt-8 flex flex-wrap gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            <a href="#attention" className="rounded-full border border-border px-3 py-1.5 hover:text-foreground">01 · Attention</a>
            <a href="#conversion" className="rounded-full border border-border px-3 py-1.5 hover:text-foreground">02 · Conversion</a>
            <a href="#automation" className="rounded-full border border-border px-3 py-1.5 hover:text-foreground">03 · Automation</a>
          </div>
        </div>
      </section>

      <div id="attention" />
      <PricingMatrix pillar="attention" />
      <div id="conversion" />
      <PricingMatrix pillar="conversion" />
      <div id="automation" />
      <PricingMatrix pillar="automation" />

      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <div className="rounded-3xl border border-border bg-card p-10 text-center lg:p-16">
            <h2 className="font-display text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
              Not sure which pillar to start with?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              We'll audit your current funnel and tell you the one move with the highest leverage. Free.
            </p>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-4 text-base font-medium text-primary-foreground hover:scale-[1.02]"
            >
              Scope an engagement →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
