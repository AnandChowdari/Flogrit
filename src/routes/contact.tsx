import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, Mail, Calendar, MapPin, X } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Flogrit" },
      { name: "description", content: "Book a 30-minute conversation. We'll diagnose the bottleneck and tell you what we'd build first." },
      { property: "og:title", content: "Contact — Flogrit" },
      { property: "og:description", content: "Book a 30-minute conversation. No pitch — diagnosis." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [calendlyUrl, setCalendlyUrl] = useState<string | null>(null);

  return (
    <section className="bg-background">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 lg:grid-cols-[1.1fr_1fr] lg:gap-20 lg:px-8 lg:py-32">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Contact</p>
          <h1 className="mt-4 font-display text-5xl font-semibold leading-[1.02] tracking-[-0.02em] md:text-6xl lg:text-7xl">
            Let's diagnose the bottleneck. <span className="text-primary">30 minutes.</span>
          </h1>
          <p className="mt-6 max-w-md text-muted-foreground">
            Tell us where the system breaks — Attention, Conversion, Automation, or all of it. We'll come back with a sharp first move.
          </p>

          <ul className="mt-12 space-y-5">
            <ContactRow Icon={Mail} label="Email" value="flogrit.com@gmail.com" href="mailto:flogrit.com@gmail.com" />
            <ContactRow Icon={Calendar} label="Direct calendar" value="cal.com/flogrit" href="#" />
            <ContactRow Icon={MapPin} label="Based in" value="Hyderabad · IN" />
          </ul>
        </div>

        <div className="rounded-2xl border border-border bg-card p-7 md:p-9">
          {calendlyUrl ? (
            <div className="flex h-[650px] w-full flex-col">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display text-xl font-bold">Pick a time</h3>
                <button
                  type="button"
                  onClick={() => setCalendlyUrl(null)}
                  className="flex size-10 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                  aria-label="Cancel booking"
                >
                  <X size={20} />
                </button>
              </div>
              <iframe
                src={calendlyUrl}
                width="100%"
                height="100%"
                className="flex-1 rounded-xl"
                frameBorder="0"
                title="Calendly Scheduling Page"
              />
            </div>
          ) : (
            <form
              onSubmit={(e) => { 
                e.preventDefault(); 
                const formData = new FormData(e.currentTarget);
                const name = formData.get("name") as string;
                const contact = formData.get("contact") as string;
                const problem = formData.get("problem") as string;
                
                const url = new URL("https://calendly.com/astrophileanand/30min");
                url.searchParams.set("hide_event_type_details", "1");
                url.searchParams.set("hide_gdpr_banner", "1");
                url.searchParams.set("background_color", "121212");
                url.searchParams.set("text_color", "f0f2c0");
                url.searchParams.set("primary_color", "c6ff34");
                
                if (name) url.searchParams.set("name", name);
                if (contact) url.searchParams.set("email", contact);
                if (problem) url.searchParams.set("a1", problem);
                
                setCalendlyUrl(url.toString());
              }}
            >
              <h2 className="font-display text-2xl font-bold">Start the conversation</h2>
              <p className="mt-1 text-sm text-muted-foreground">Three fields. No marketing automation traps.</p>

              <div className="mt-6 space-y-4">
                <Field label="Your name" name="name" placeholder="Sara M." required />
                <Field label="Email or WhatsApp" name="contact" placeholder="sara@company.com" required />
                <div>
                  <label className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                    What's the actual problem?
                  </label>
                  <textarea
                    required
                    name="problem"
                    rows={5}
                    placeholder="e.g. ad spend is up 3× but qualified calls are flat — feels like the funnel leaks at the DM stage"
                    className="mt-2 w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-4 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.01]"
                >
                  Send it
                  <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
                <p className="text-center text-[11px] text-muted-foreground">
                  Pick a time on our calendar next.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, ...rest }: { label: string; name: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">{label}</label>
      <input
        name={name}
        {...rest}
        className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
      />
    </div>
  );
}

function ContactRow({ Icon, label, value, href }: { Icon: typeof Mail; label: string; value: string; href?: string }) {
  const inner = (
    <>
      <span className="grid size-10 place-items-center rounded-lg bg-secondary text-foreground">
        <Icon size={16} />
      </span>
      <span>
        <span className="block font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">{label}</span>
        <span className="mt-1 block text-base text-foreground">{value}</span>
      </span>
    </>
  );
  return (
    <li>
      {href ? (
        <a href={href} className="flex items-center gap-4 transition-colors hover:text-primary">{inner}</a>
      ) : (
        <div className="flex items-center gap-4">{inner}</div>
      )}
    </li>
  );
}
