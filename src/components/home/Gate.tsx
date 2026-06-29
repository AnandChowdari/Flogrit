import { useFlow, type Flow } from "@/lib/flow";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Check } from "lucide-react";

export function Gate() {
  const { flow, setFlow, hasChosen } = useFlow();

  const options: Array<{
    key: Flow;
    title: string;
    quote: string;
    body: string;
    keywords: string[];
  }> = [
    {
      key: "A",
      title: "I can't build presence.",
      quote: "I'm invisible.",
      body: "Posts flop, no one knows the brand exists. I need attention before I can sell anything.",
      keywords: ["video editing", "content strategy", "branding"],
    },
    {
      key: "B",
      title: "I get views but no customers.",
      quote: "Reach is fine, conversion is broken.",
      body: "Traffic comes in. Nothing happens. Leads ghost. I need a system that catches every signal.",
      keywords: ["meta ads", "AI automation", "voice agents"],
    },
  ];

  return (
    <section
      id="gate"
      className="relative overflow-hidden border-y border-border bg-secondary/20 grain"
    >
      <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            ░ the gate — pick your starting point
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
            What's actually killing your <span className="text-primary">growth</span> right now?
          </h2>
          <p className="mt-5 text-muted-foreground md:text-lg">
            Pick the one that hurts more. The rest of the page reorders itself around the pillar you actually need.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 md:gap-6">
          {options.map((opt) => {
            const active = hasChosen && flow === opt.key;
            return (
              <motion.button
                key={opt.key}
                onClick={() => setFlow(opt.key)}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className={`group relative overflow-hidden rounded-2xl border p-7 text-left transition-colors md:p-9 ${
                  active
                    ? "border-primary bg-primary/[0.06]"
                    : "border-border bg-card hover:border-foreground/40"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
                    option {opt.key.toLowerCase()}
                  </div>
                  <AnimatePresence>
                    {active && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="grid size-7 place-items-center rounded-full bg-primary text-primary-foreground"
                      >
                        <Check size={14} strokeWidth={3} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <h3 className="mt-8 font-display text-2xl font-bold leading-tight md:text-3xl">
                  "{opt.quote}"
                </h3>
                <p className="mt-3 text-foreground/85">{opt.body}</p>

                <div className="mt-8 flex flex-wrap gap-2">
                  {opt.keywords.map((k) => (
                    <span
                      key={k}
                      className="rounded-full border border-border bg-background/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground"
                    >
                      {k}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-primary">
                  {active ? "leading the page" : "start here"}
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </div>
              </motion.button>
            );
          })}
        </div>

        {hasChosen && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 text-center font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground"
          >
            flow {flow.toLowerCase()} locked · switch anytime in the top nav
          </motion.p>
        )}
      </div>
    </section>
  );
}
