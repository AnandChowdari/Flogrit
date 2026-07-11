// Conditional customer-message proof block.
// Renders ONLY when real evidence assets exist under
// `src/assets/proof/whatsapp/`. No placeholder, no fake WhatsApp UI,
// no "coming soon" — nothing shows on the live site until real screenshots
// are dropped into that directory.

const assetModules = import.meta.glob(
  "/src/assets/proof/whatsapp/*.{png,jpg,jpeg,webp}",
  { eager: true, query: "?url", import: "default" }
) as Record<string, string>;

const assets = Object.entries(assetModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, url]) => ({ path, url }));

export function WhatsAppProof() {
  if (assets.length === 0) return null;

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          What customers actually say
        </p>
        <h3 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
          Real messages, unedited.
        </h3>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {assets.map((a) => (
            <div
              key={a.path}
              className="overflow-hidden rounded-2xl border border-border bg-card"
            >
              <img
                src={a.url}
                alt="Customer message"
                loading="lazy"
                className="h-auto w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
