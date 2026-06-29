import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { cases } from "@/lib/data";

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
            { title: `${c.client} — ${c.title} · flow/studio` },
            { name: "description", content: c.summary },
            { property: "og:title", content: `${c.client} — ${c.title}` },
            { property: "og:description", content: c.summary },
          ]
        : [{ title: "Case study — flow/studio" }],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-5 py-32 text-center">
      <h1 className="font-display text-4xl font-bold">Case study not found</h1>
      <Link to="/work" className="mt-6 inline-block text-primary">← Back to work</Link>
    </div>
  ),
  component: CasePage,
});

function CasePage() {
  const { c } = Route.useLoaderData();
  return (
    <article className="bg-background">
      <header className="border-b border-border grain">
        <div className="mx-auto max-w-4xl px-5 py-20 lg:px-8 lg:py-28">
          <Link to="/work" className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground">
            ← all work
          </Link>
          <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            {c.industry} · {c.pillar}
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            {c.title}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">{c.summary}</p>

          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-8">
            {c.metric.map((m: { label: string; value: string }) => (
              <div key={m.label}>
                <dt className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{m.label}</dt>
                <dd className="mt-2 font-mono text-3xl text-primary md:text-4xl">{m.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <section className="border-b border-border bg-secondary/15">
        <div className="mx-auto grid max-w-4xl gap-12 px-5 py-20 md:grid-cols-3 lg:px-8">
          {[
            { h: "Problem", b: `${c.client} had a hard ceiling on growth. Existing channels had plateaued and the team was burning hours on work that didn't compound.` },
            { h: "What we built", b: c.pillar === "content"
              ? "A 12-reel content sprint anchored to founder POV, a hook library, and a publishing cadence that didn't break the team."
              : "An end-to-end pipeline: ads → WhatsApp qualification → AI voice fallback → calendar booking → CRM sync, all measured in one dashboard." },
            { h: "Outcome", b: "Numbers above. More importantly: the system kept compounding after we stepped back." },
          ].map((s) => (
            <div key={s.h}>
              <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">{s.h}</h2>
              <p className="mt-3 text-foreground/90">{s.b}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-4xl px-5 py-20 lg:px-8">
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
            Want the same? Book a call →
          </Link>
        </div>
      </section>
    </article>
  );
}
