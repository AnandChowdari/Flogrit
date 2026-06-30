import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, Mail, Calendar, MapPin } from "lucide-react";

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
  const [sent, setSent] = useState(false);

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
            <ContactRow Icon={Mail} label="Email" value="hello@flogrit.com" href="mailto:hello@flogrit.com" />
            <ContactRow Icon={Calendar} label="Direct calendar" value="cal.com/flogrit" href="#" />
            <ContactRow Icon={MapPin} label="Based in" value="Hyderabad · IN" />
          </ul>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="rounded-2xl border border-border bg-card p-7 md:p-9"
        >
          {sent ? (
            <div className="flex h-full min-h-72 flex-col items-center justify-center text-center">
              <div className="grid size-14 place-items-center rounded-full bg-primary text-primary-foreground">
                <ArrowUpRight size={22} />
              </div>
              <h3 className="mt-5 font-display text-2xl font-bold">In the inbox.</h3>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                We reply within 24 hours, usually faster. Check your spam if it ghosts.
              </p>
            </div>
          ) : (
            <>
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
                  We reply in under 24 hours. No mailing list. No drip.
                </p>
              </div>
            </>
          )}
        </form>
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
