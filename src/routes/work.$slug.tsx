import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { cases, pillars } from "@/lib/data";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const c = cases.find((x) => x.slug === params.slug);
    if (!c) throw notFound();
    return { c };
  },
  head: ({ loaderData }) => {
    const c = loaderData?.c;
    return {
      meta: c
        ? [
            { title: `${c.client} — ${c.title} · Flogrit` },
            { name: "description", content: c.summary },
            { property: "og:title", content: `${c.client} — ${c.title}` },
            { property: "og:description", content: c.summary },
          ]
        : [{ title: "Case study — Flogrit" }],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-5 py-32 text-center">
      <h1 className="font-display text-4xl font-semibold">Case study not found</h1>
      <Link to="/work" className="mt-6 inline-block text-primary">← Back to work</Link>
    </div>
  ),
  component: CasePage,
});

function CasePage() {
  const { c } = Route.useLoaderData() as { c: (typeof cases)[number] };
  const p = pillars[c.pillar];
  return (
    <article className="bg-background">
      <header className="border-b border-border">
        <div className="mx-auto max-w-4xl px-5 py-20 lg:px-8 lg:py-28">
          <Link to="/work" className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground">
            ← all work
          </Link>
          <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            {c.industry} · {p.label}
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.02em] md:text-6xl">
            {c.title}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">{c.summary}</p>

          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-8">
            {c.metric.map((m: { label: string; value: string }) => (
              <div key={m.label}>
                <dt className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{m.label}</dt>
                <dd className="mt-2 font-mono text-3xl text-primary md:text-4xl">{m.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <section className="border-b border-border bg-secondary/15">
        <div className="mx-auto grid max-w-4xl gap-12 px-5 py-20 md:grid-cols-3 lg:px-8">
          {[
            { h: "Problem", b: `${c.client} had a clear ceiling. Existing work didn't compound, and the team was burning hours on tasks that didn't connect.` },
            { h: "What we built", b: c.pillar === "attention"
              ? "A founder-led content engine: a hook library, a 90-day editorial system and a publishing cadence the team could actually sustain."
              : c.pillar === "conversion"
              ? "A rebuilt funnel: one decision per page, instrumented end-to-end, copy that answered the question buyers were really asking."
              : "A connected operations layer: qualification, follow-up, voice fallback, CRM sync — quietly running in the background." },
            { h: "Outcome", b: "Numbers above. More importantly: the system kept compounding after we stepped back." },
          ].map((s) => (
            <div key={s.h}>
              <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">{s.h}</h2>
              <p className="mt-3 text-foreground/90">{s.b}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-4xl px-5 py-20 lg:px-8">
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground">
            Want the same system? Talk to us →
          </Link>
        </div>
      </section>
    </article>
  );
}
