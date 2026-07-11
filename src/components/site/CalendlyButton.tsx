import { useEffect, useRef, useState, type ReactNode } from "react";
import { PopupModal } from "react-calendly";
import { ArrowUpRight } from "lucide-react";

const CALENDLY_URL = "https://calendly.com/astrophileanand/30min";

type Variant = "primary" | "secondary" | "ghost";

const variantClass: Record<Variant, string> = {
  primary:
    "group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]",
  secondary:
    "group inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary",
  ghost:
    "group inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80",
};

export function CalendlyButton({
  children,
  variant = "primary",
  className,
  withIcon = true,
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  withIcon?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // react-calendly renders portal into document.body — the modal itself
    // handles focus/scroll lock; we just need to expose the root element.
    rootRef.current = typeof document !== "undefined" ? document.body : null;
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={className ?? variantClass[variant]}
      >
        {children}
        {withIcon && variant !== "ghost" && (
          <ArrowUpRight
            size={16}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        )}
        {withIcon && variant === "ghost" && (
          <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        )}
      </button>
      {rootRef.current && (
        <PopupModal
          url={CALENDLY_URL}
          onModalClose={() => setOpen(false)}
          open={open}
          rootElement={rootRef.current}
          pageSettings={{
            backgroundColor: "121212",
            primaryColor: "c1fc30",
            textColor: "f5f5f0",
            hideEventTypeDetails: false,
            hideLandingPageDetails: false,
          }}
        />
      )}
    </>
  );
}
