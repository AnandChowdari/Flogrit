import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { cases, pillars } from "@/lib/data";
import { motion } from "motion/react";
import { Building2, AlertTriangle, Wrench, Boxes, BarChart3, Image as ImageIcon, MessageSquareQuote, Globe, Instagram, Youtube } from "lucide-react";

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
            { name: "description", content: c.oneLine },
            { property: "og:title", content: `${c.client} — ${c.title}` },
            { property: "og:description", content: c.oneLine },
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
    <article className="bg-background text-foreground overflow-hidden">
      {/* Background glow effects */}
      <div className="pointer-events-none absolute inset-0 flex justify-center opacity-20">
        <div className="h-[40rem] w-[40rem] -translate-y-1/2 rounded-full bg-primary/20 blur-[120px]"></div>
      </div>

      <header className="relative border-b border-border/50">
        <div className="mx-auto max-w-4xl px-5 py-24 lg:px-8 lg:py-32 relative z-10">
          <Link to="/work" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground hover:text-primary transition-colors">
            ← Back to all work
          </Link>
          
          <div className="mt-12 flex flex-wrap items-center gap-4">
            {/* Company logo or initial-letter fallback */}
            {c.logo ? (
              <div className="w-14 h-14 rounded-xl bg-white border border-border flex items-center justify-center shadow-sm p-2 overflow-hidden">
                <img src={c.logo} alt={`${c.company ?? c.client} logo`} className="w-full h-full object-contain" />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-xl bg-secondary/50 border border-border flex items-center justify-center shadow-sm">
                <span className="font-display font-bold text-lg text-primary">{c.client.charAt(0)}</span>
              </div>
            )}
            <div className="flex items-center gap-3">
              {c.portrait && (
                <img
                  src={c.portrait}
                  alt={c.client}
                  className="w-12 h-12 rounded-full object-cover border border-border shadow-sm"
                />
              )}
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground flex items-center gap-2">
                  {c.industry} <span className="w-1 h-1 rounded-full bg-border"></span> {p.label}
                </p>
                <div className="mt-2 flex items-center gap-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest border ${
                    c.status === "Real Client"
                      ? "bg-primary/10 text-primary border-primary/20"
                      : "bg-secondary/50 text-muted-foreground border-border"
                  }`}>
                    {c.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-8 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.02em] md:text-5xl lg:text-6xl text-white"
          >
            {c.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-xl text-muted-foreground max-w-3xl leading-relaxed"
          >
            {c.oneLine}
          </motion.p>

          {c.links && (
            <div className="mt-8 flex flex-wrap items-center gap-2">
              {c.links.website && (
                <a href={c.links.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-3.5 py-1.5 text-xs text-foreground/80 transition-colors hover:border-primary/50 hover:text-primary">
                  <Globe className="h-3.5 w-3.5" /> Website
                </a>
              )}
              {c.links.instagram && (
                <a href={c.links.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-3.5 py-1.5 text-xs text-foreground/80 transition-colors hover:border-primary/50 hover:text-primary">
                  <Instagram className="h-3.5 w-3.5" /> Instagram
                </a>
              )}
              {c.links.youtube && (
                <a href={c.links.youtube} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-3.5 py-1.5 text-xs text-foreground/80 transition-colors hover:border-primary/50 hover:text-primary">
                  <Youtube className="h-3.5 w-3.5" /> YouTube
                </a>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Main Content Sections */}
      <div className="mx-auto max-w-4xl px-5 py-24 lg:px-8 space-y-32">
        
        {/* Business Context */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-full bg-secondary/50 border border-border flex items-center justify-center">
              <Building2 className="w-4 h-4 text-muted-foreground" />
            </div>
            <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground">Business Context</h2>
          </div>
          <div className="bg-card/30 border border-border/50 rounded-[24px] p-8 md:p-12 backdrop-blur-sm">
            <p className="text-lg leading-relaxed text-foreground/90">{c.context}</p>
          </div>
        </motion.section>

        {/* The Challenge */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-red-400" />
            </div>
            <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground">The Challenge</h2>
          </div>
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-foreground/90">{c.challenge.description}</p>
            {c.challenge.bullets && c.challenge.bullets.length > 0 && (
              <ul className="grid gap-4 mt-8 md:grid-cols-2">
                {c.challenge.bullets.map((bullet, idx) => (
                  <motion.li 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    key={idx} 
                    className="flex gap-4 p-5 rounded-2xl bg-secondary/20 border border-border/50 shadow-sm"
                  >
                    <span className="text-primary mt-1 shrink-0">→</span>
                    <span className="text-muted-foreground text-sm leading-relaxed">{bullet}</span>
                  </motion.li>
                ))}
              </ul>
            )}
          </div>
        </motion.section>

        {/* Implementation / Strategy Blocks */}
        <section className="space-y-24">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Wrench className="w-4 h-4 text-primary" />
            </div>
            <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground">Strategy & Implementation</h2>
          </div>

          {c.sections.map((section, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`grid gap-8 md:grid-cols-12 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="md:col-span-4">
                <h3 className="font-display text-2xl font-semibold text-white">{section.title}</h3>
              </div>
              <div className="md:col-span-8 space-y-6">
                {section.quote && (
                  <blockquote className="border-l-2 border-primary pl-6 py-2 text-xl italic font-display text-foreground/90">
                    "{section.quote}"
                  </blockquote>
                )}
                {section.description && (
                  <p className="text-lg leading-relaxed text-muted-foreground">{section.description}</p>
                )}
                {section.bullets && section.bullets.length > 0 && (
                  <ul className="grid gap-3 sm:grid-cols-2 mt-6">
                    {section.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-3 bg-card/20 p-3 rounded-lg border border-border/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0 shadow-[0_0_8px_var(--color-lime)]"></span>
                        <span className="text-sm text-foreground/80">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </section>

        {/* Tech Stack */}
        {c.techStack && c.techStack.length > 0 && (
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <Boxes className="w-4 h-4 text-blue-400" />
              </div>
              <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground">Technology Stack</h2>
            </div>
            
            <div className="flex flex-wrap gap-4">
              {c.techStack.map((tech, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05, y: -2, rotate: 2 }}
                  className="group relative flex items-center gap-3 px-5 py-3 rounded-full bg-card/40 border border-border/50 hover:border-primary/50 hover:bg-card hover:shadow-[0_4px_24px_-8px_var(--color-lime)] transition-all cursor-default"
                >
                  {tech.iconSlug ? (
                    <img 
                      src={`https://cdn.simpleicons.org/${tech.iconSlug}/white`} 
                      alt={tech.name} 
                      loading="lazy"
                      className="w-5 h-5 opacity-70 group-hover:opacity-100 group-hover:[filter:drop-shadow(0_0_8px_var(--color-lime))] transition-all"
                      onError={(e) => {
                        const img = e.currentTarget as HTMLImageElement;
                        img.style.display = 'none';
                        const dot = img.nextElementSibling as HTMLElement | null;
                        if (dot) dot.style.display = 'inline-block';
                      }}
                    />
                  ) : null}
                  <span
                    className="w-2 h-2 rounded-full bg-primary opacity-70 group-hover:opacity-100"
                    style={{ display: tech.iconSlug ? 'none' : 'inline-block' }}
                  />
                  <span className="font-medium text-sm text-foreground/80 group-hover:text-foreground">{tech.name}</span>
                  
                  {/* Tooltip */}
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-popover text-popover-foreground text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md border border-border">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Results */}
        {c.metric && c.metric.length > 0 && (
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="pt-12 border-t border-border/30"
          >
            <div className="flex items-center gap-3 mb-12">
              <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-primary" />
              </div>
              <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground">The Results</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {c.metric.map((m, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="relative p-6 rounded-[24px] bg-secondary/10 border border-border overflow-hidden group hover:border-primary/30 transition-colors"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  {/* Shine effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

                  <dt className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground relative z-10">{m.label}</dt>
                  <dd className="mt-4 font-display text-4xl lg:text-5xl font-bold text-white relative z-10">
                    {/* Fake count up visually by styling numbers, since pure string count-up requires parsing */}
                    <motion.span
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 + 0.3, duration: 0.6, type: "spring" }}
                      className="inline-block"
                    >
                      {m.value}
                    </motion.span>
                  </dd>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

      </div>

      <section className="bg-secondary/10 border-t border-border">
        <div className="mx-auto max-w-4xl px-5 py-24 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-semibold mb-8 text-white">Ready to remove your bottlenecks?</h2>
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors hover:shadow-[0_0_30px_-5px_var(--color-lime)]">
            Start a conversation →
          </Link>
        </div>
      </section>
    </article>
  );
}
