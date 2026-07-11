import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { useRouter } from "@tanstack/react-router";

export type Flow = "attention" | "conversion" | "automation";

type FlowCtx = {
  /** Currently selected system, or null when the visitor hasn't chosen yet. */
  system: Flow | null;
  /** Back-compat alias: falls back to "attention" when nothing is chosen. */
  flow: Flow;
  hasChosen: boolean;
  setSystem: (f: Flow) => void;
  /** Back-compat alias. */
  setFlow: (f: Flow) => void;
  clearSystem: () => void;
};

const Ctx = createContext<FlowCtx | null>(null);
const KEY = "flogrit.flow";
const VALID: Flow[] = ["attention", "conversion", "automation"];

function isFlow(v: unknown): v is Flow {
  return typeof v === "string" && (VALID as string[]).includes(v);
}

export function FlowProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [system, setSystemState] = useState<Flow | null>(null);

  // Hydrate from ?system= (primary) or ?flow= (back-compat) or localStorage.
  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      const q = url.searchParams.get("system")?.toLowerCase()
        ?? url.searchParams.get("flow")?.toLowerCase();
      if (isFlow(q)) {
        setSystemState(q);
        localStorage.setItem(KEY, q);
        return;
      }
      const stored = localStorage.getItem(KEY);
      if (isFlow(stored)) setSystemState(stored);
    } catch {
      /* noop */
    }
  }, []);

  const setSystem = useCallback((f: Flow) => {
    setSystemState(f);
    try {
      localStorage.setItem(KEY, f);
    } catch {
      /* noop */
    }
    // Only rewrite the URL when we're on the homepage, so system links inside
    // other routes stay clean.
    try {
      const pathname = window.location.pathname;
      if (pathname === "/") {
        router.navigate({
          to: "/",
          search: (prev: Record<string, unknown>) => ({ ...(prev ?? {}), system: f, flow: undefined }),
          replace: false,
        });
      }
    } catch {
      /* noop */
    }
  }, [router]);

  const clearSystem = useCallback(() => {
    setSystemState(null);
    try {
      localStorage.removeItem(KEY);
    } catch {
      /* noop */
    }
    try {
      if (window.location.pathname === "/") {
        router.navigate({
          to: "/",
          search: (prev: Record<string, unknown>) => {
            const next = { ...(prev ?? {}) } as Record<string, unknown>;
            delete next.system;
            delete next.flow;
            return next;
          },
        });
      }
    } catch {
      /* noop */
    }
  }, [router]);

  const value: FlowCtx = {
    system,
    flow: system ?? "attention",
    hasChosen: system !== null,
    setSystem,
    setFlow: setSystem,
    clearSystem,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useFlow() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useFlow must be used inside FlowProvider");
  return ctx;
}
