import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Flogrit" },
      { name: "description", content: "Flogrit is a Growth Systems Company. We design and build the connected system Attention, Conversion and Automation run inside." },
      { property: "og:title", content: "About — Flogrit" },
      { property: "og:description", content: "We don't sell isolated services. We design the system the work runs inside." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-4xl px-5 py-24 lg:px-8 lg:py-32">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">About</p>
          <h1 className="mt-4 font-display text-5xl font-semibold leading-[1.02] tracking-[-0.02em] md:text-6xl lg:text-7xl">
            We don't sell services. <span className="text-primary">We design the system</span> they're supposed to run inside.
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground">
            Most companies don't fail because they lack tools. They fail because their tools, people and processes don't work together. Marketing ships content nobody converts. Sales chases leads nobody qualified. Operations cleans up what nobody automated.
          </p>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Flogrit exists to design that connective tissue — and to ship it. Three pillars, one system: Attention, Conversion, Automation.
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-secondary/15">
        <div className="mx-auto max-w-5xl px-5 py-20 lg:px-8 lg:py-24">
          <h2 className="font-display text-3xl font-semibold tracking-[-0.02em] md:text-4xl">How we think</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {[
              ["We don't think in services. We think in systems.", "A video, a website, an automation — each is only useful inside a system that connects them. We design the system first; the deliverables follow."],
              ["We start with the bottleneck, not the brief.", "Instead of asking what you want built, we ask what's preventing customers from buying. The right question makes the work obvious."],
              ["Outcomes over output.", "We measure the work by the business it moves — not the volume of content shipped, hours billed or features delivered."],
              ["Every part should connect to the next.", "Attention earns the room. Conversion uses it. Automation makes it durable. Anything that breaks that line gets cut."],
              ["Premium product, not pitched service.", "We work like a product team — strategy, design, engineering, copy — and we ship like one. Calm cadence, clear scope, honest numbers."],
              ["Show, don't sell.", "We don't run on persuasion. We run on clarity. If the work is good, the case studies do the convincing."],
            ].map(([h, b]) => (
              <div key={h} className="rounded-2xl border border-border bg-card p-7">
                <h3 className="font-display text-xl font-semibold tracking-tight">{h}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-4xl px-5 py-20 lg:px-8 lg:py-24">
          <h2 className="font-display text-3xl font-semibold tracking-[-0.02em] md:text-4xl">Who we work with</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Founders, coaches, consultants, SaaS, agencies, D2C and service businesses that already have something worth selling — and want a predictable system around it. We are not built for enterprise; we build for ambitious teams on the way there.
          </p>
          <Link to="/contact" className="mt-12 inline-flex rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground">
            Talk to us →
          </Link>
        </div>
      </section>
    </>
  );
}
