import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type Flow = "attention" | "conversion" | "automation";

type FlowCtx = {
  flow: Flow;
  setFlow: (f: Flow) => void;
  hasChosen: boolean;
};

const Ctx = createContext<FlowCtx | null>(null);
const KEY = "flogrit.flow";
const VALID: Flow[] = ["attention", "conversion", "automation"];

export function FlowProvider({ children }: { children: ReactNode }) {
  const [flow, setFlowState] = useState<Flow>("conversion");
  const [hasChosen, setHasChosen] = useState(false);

  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      const q = url.searchParams.get("flow")?.toLowerCase();
      if (q && (VALID as string[]).includes(q)) {
        setFlowState(q as Flow);
        setHasChosen(true);
        localStorage.setItem(KEY, q);
        return;
      }
      const stored = localStorage.getItem(KEY);
      if (stored && (VALID as string[]).includes(stored)) {
        setFlowState(stored as Flow);
        setHasChosen(true);
      }
    } catch {
      /* noop */
    }
  }, []);

  const setFlow = useCallback((f: Flow) => {
    setFlowState(f);
    setHasChosen(true);
    try {
      localStorage.setItem(KEY, f);
    } catch {
      /* noop */
    }
  }, []);

  return <Ctx.Provider value={{ flow, setFlow, hasChosen }}>{children}</Ctx.Provider>;
}

export function useFlow() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useFlow must be used inside FlowProvider");
  return ctx;
}
