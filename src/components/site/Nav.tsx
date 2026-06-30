import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { LogoMark } from "./LogoMark";

export function Nav() {
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/services/attention", label: "Attention" },
    { to: "/services/conversion", label: "Conversion" },
    { to: "/services/automation", label: "Automation" },
    { to: "/work", label: "Work" },
    { to: "/about", label: "About" },
  ] as const;

  return (
    <header className="sticky top-3 z-50 mx-3 lg:mx-6">
      <div
        className="mx-auto flex h-16 max-w-7xl items-center justify-between rounded-full border border-white/10 bg-background/40 px-4 pl-5 pr-3 backdrop-blur-xl backdrop-saturate-150 lg:px-6 lg:pr-4"
        style={{
          boxShadow:
            "0 1px 0 0 color-mix(in oklab, var(--color-cream) 8%, transparent) inset, 0 20px 50px -20px rgb(0 0 0 / 0.6)",
        }}
      >
        <Link
          to="/"
          className="flex items-center gap-2 font-display text-[1.25rem] font-semibold leading-none tracking-[-0.04em] sm:gap-2.5 sm:text-[1.4rem] lg:text-[1.55rem]"
        >
          <LogoMark className="h-7 w-7 shrink-0 text-primary sm:h-8 sm:w-8 lg:h-9 lg:w-9" />
          <span className="text-foreground">Flogrit</span>
        </Link>



        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className="hidden rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02] md:inline-block"
          >
            Talk to us
          </Link>
          <button
            className="grid h-9 w-9 place-items-center rounded-md border border-border text-foreground md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="mx-auto mt-2 max-w-7xl rounded-2xl border border-white/10 bg-background/70 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1 px-3 py-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground"
            >
              Talk to us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
