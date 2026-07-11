import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Flow } from "@/lib/flow";
import { SystemIndicator } from "./SystemIndicator";
import { AttentionJourney } from "./journeys/AttentionJourney";
import { ConversionJourney } from "./journeys/ConversionJourney";
import { AutomationJourney } from "./journeys/AutomationJourney";

export function SystemJourney({ system }: { system: Flow }) {
  const reduce = useReducedMotion();
  const anchorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (reduce) return;
    // Scroll the journey into view when a new system is chosen.
    const el = anchorRef.current;
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [system, reduce]);

  return (
    <section
      aria-label={`${system} journey`}
      className="relative bg-background"
    >
      <div ref={anchorRef} className="pointer-events-none absolute -top-24" />
      <SystemIndicator />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={system}
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
        >
          {system === "attention" && <AttentionJourney />}
          {system === "conversion" && <ConversionJourney />}
          {system === "automation" && <AutomationJourney />}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
