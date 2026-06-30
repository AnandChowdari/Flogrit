import { Link } from "@tanstack/react-router";
import logo from "@/assets/flogrit-logo.svg.asset.json";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" className="flex items-center gap-2 font-display text-xl font-semibold">
              <img src={logo.url} alt="" width={28} height={28} className="h-7 w-7" />
              Flogrit
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              A Growth Systems Company. We help businesses turn attention into customers — by designing the system the work runs inside.
            </p>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Hyderabad · IN
            </p>
          </div>

          <FooterCol title="System" links={[
            ["Attention", "/services/attention"],
            ["Conversion", "/services/conversion"],
            ["Automation", "/services/automation"],
          ]} />
          <FooterCol title="Company" links={[
            ["Work", "/work"],
            ["About", "/about"],
            ["Pricing", "/pricing"],
          ]} />
          <FooterCol title="Talk" links={[
            ["Contact", "/contact"],
            ["Book a call", "/contact"],
          ]} />
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Flogrit. All rights reserved.</p>
          <p className="font-mono uppercase tracking-[0.22em]">Attention · Conversion · Automation</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">{title}</h4>
      <ul className="mt-4 space-y-2">
        {links.map(([label, to]) => (
          <li key={label}>
            <Link to={to} className="text-sm text-foreground/90 transition-colors hover:text-primary">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
