import { Link } from "@tanstack/react-router";
import logo from "@/assets/flogrit-logo.svg.asset.json";

// Footer columns: SERVICES / COMPANY / LEGAL only.
// Flogrit has no official Instagram or LinkedIn accounts today — no SOCIAL
// column is rendered. When official handles exist, add a fourth column here.

type FooterLink =
  | { label: string; to: string; system?: never }
  | { label: string; to: "/"; system: "attention" | "conversion" | "automation" };

const SERVICES: FooterLink[] = [
  { label: "Attention", to: "/", system: "attention" },
  { label: "Conversion", to: "/", system: "conversion" },
  { label: "Automation", to: "/", system: "automation" },
];

const COMPANY: FooterLink[] = [
  { label: "Work", to: "/work" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const LEGAL: FooterLink[] = [
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms of Service", to: "/terms" },
  { label: "Refund Policy", to: "/refund-policy" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" className="flex items-center gap-2 font-display text-xl font-semibold">
              <img src={logo.url} alt="Flogrit" width={28} height={28} className="h-7 w-7 shrink-0" />
              Flogrit
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              A Growth Systems Company. We help businesses turn attention into customers — by designing the system the work runs inside.
            </p>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              flogrit.com · Hyderabad · IN
            </p>
          </div>

          <FooterCol title="Services" links={SERVICES} />
          <FooterCol title="Company" links={COMPANY} />
          <FooterCol title="Legal" links={LEGAL} />
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Flogrit. All rights reserved.</p>
          <p className="font-mono uppercase tracking-[0.22em]">Attention · Conversion · Automation</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <h4 className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">{title}</h4>
      <ul className="mt-4 space-y-2">
        {links.map((l) => (
          <li key={l.label}>
            {l.system ? (
              <Link
                to="/"
                search={{ system: l.system }}
                className="text-sm text-foreground/90 transition-colors hover:text-primary"
              >
                {l.label}
              </Link>
            ) : (
              <Link
                to={l.to}
                className="text-sm text-foreground/90 transition-colors hover:text-primary"
              >
                {l.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
