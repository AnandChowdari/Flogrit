import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type Flow = "A" | "B";

type FlowCtx = {
  flow: Flow;
  setFlow: (f: Flow) => void;
  hasChosen: boolean;
};

const Ctx = createContext<FlowCtx | null>(null);
const KEY = "flow.preference";

export function FlowProvider({ children }: { children: ReactNode }) {
  const [flow, setFlowState] = useState<Flow>("A");
  const [hasChosen, setHasChosen] = useState(false);

  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      const q = url.searchParams.get("flow")?.toUpperCase();
      if (q === "A" || q === "B") {
        setFlowState(q);
        setHasChosen(true);
        localStorage.setItem(KEY, q);
        return;
      }
      const stored = localStorage.getItem(KEY);
      if (stored === "A" || stored === "B") {
        setFlowState(stored);
        setHasChosen(true);
      }
    } catch {
      // ignore
    }
  }, []);

  const setFlow = useCallback((f: Flow) => {
    setFlowState(f);
    setHasChosen(true);
    try {
      localStorage.setItem(KEY, f);
    } catch {
      // ignore
    }
  }, []);

  return <Ctx.Provider value={{ flow, setFlow, hasChosen }}>{children}</Ctx.Provider>;
}

export function useFlow() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useFlow must be used inside FlowProvider");
  return ctx;
}
