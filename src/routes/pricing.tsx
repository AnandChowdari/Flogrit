import { createFileRoute, Link } from "@tanstack/react-router";
import { simplePlans, precisePlans } from "@/lib/data";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Flogrit" },
      { name: "description", content: "Engagements are scoped to the system, not the deliverable. Indicative pricing for content cadences and conversion systems." },
      { property: "og:title", content: "Pricing — Flogrit" },
      { property: "og:description", content: "Indicative pricing for the Flogrit growth system." },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          Pricing
        </p>
        <h1 className="mt-4 font-display text-5xl font-semibold leading-[1.02] tracking-[-0.02em] md:text-7xl">
          Scoped to the system. <span className="text-primary">Not the deliverable.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-muted-foreground">
          Engagements start with a single pillar and extend as the system proves itself. Below is what a typical entry point looks like.
        </p>

        <h2 className="mt-20 font-display text-3xl font-semibold tracking-[-0.02em]">Attention — content cadence</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">Monthly retainers for the video and content pillar.</p>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {[
            { name: "Simple", tagline: "Fast turnaround. Strong fundamentals.", plans: simplePlans },
            { name: "Precise", tagline: "Cinematic. Strategic. Founder-led.", plans: precisePlans, highlight: true },
          ].map((t) => (
            <div key={t.name} className={`rounded-2xl border bg-card p-8 ${t.highlight ? "border-primary/50" : "border-border"}`}>
              <h3 className="font-display text-2xl font-semibold">{t.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t.tagline}</p>
              <ul className="mt-6 divide-y divide-border">
                {t.plans.map((p) => (
                  <li key={p.label} className="flex items-baseline justify-between py-4">
                    <div>
                      <div className="font-medium">{p.label}</div>
                      <div className="font-mono text-xs text-muted-foreground">{p.videos} videos · {p.per}</div>
                    </div>
                    <div className="font-mono text-xl">{p.price}</div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <h2 className="mt-20 font-display text-3xl font-semibold tracking-[-0.02em]">Conversion & Automation</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Sites, funnels and connected systems are scoped per engagement — fixed-fee for builds, retainer for ongoing optimization.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            { name: "Foundation", price: "from ₹45k / mo", features: ["One funnel or one workflow", "Site or landing page", "Basic tracking & reporting"] },
            { name: "System", price: "from ₹95k / mo", features: ["Site + funnels + automations", "AI agent or voice fallback", "CRM + calendar integration", "Weekly reporting"], highlight: true },
            { name: "Engine", price: "Scoped", features: ["Multi-product systems", "Operations layer", "Custom integrations", "Dedicated team"] },
          ].map((t) => (
            <div key={t.name} className={`rounded-2xl border bg-card p-8 ${t.highlight ? "border-primary/50" : "border-border"}`}>
              <h3 className="font-display text-2xl font-semibold">{t.name}</h3>
              <div className="mt-2 font-mono text-lg text-foreground">{t.price}</div>
              <ul className="mt-6 space-y-2">
                {t.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <span className="size-1.5 rounded-full bg-primary" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-4 text-base font-medium text-primary-foreground">
            Scope an engagement →
          </Link>
        </div>
      </div>
    </section>
  );
}
