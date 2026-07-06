import { motion } from 'motion/react';
import { ChevronDown, Sparkles } from 'lucide-react';

export default function LiveDemoSection() {
  return (
    <section className="relative py-28 sm:py-32 px-5 sm:px-6">
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="font-display font-semibold text-white tracking-[-0.02em] text-3xl sm:text-4xl mb-4">
            See it work inside <span className="cg-hl">Premiere Pro</span>.
          </h2>
          <p className="text-white/55 text-base max-w-lg mx-auto leading-relaxed">
            A native panel. Pick a language, click generate, get an SRT on your timeline.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          {/* Soft glow */}
          <div className="absolute -inset-6 bg-accent-primary/[0.08] rounded-3xl blur-3xl pointer-events-none" />

          {/* App chrome */}
          <div className="relative rounded-2xl border border-white/10 bg-[#0E0E12] overflow-hidden shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]">
            {/* Title bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] bg-white/[0.015]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
              </div>
              <span className="text-[10px] font-mono text-white/40 tracking-wider uppercase">
                Captiongrit · Premiere Pro panel
              </span>
              <span className="w-8" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_1.1fr]">
              {/* Left: settings */}
              <div className="p-6 sm:p-8 border-b md:border-b-0 md:border-r border-white/[0.06] space-y-5">
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-widest text-white/40 block mb-2">
                    Selected clip
                  </label>
                  <div className="flex items-center justify-between h-10 px-3 rounded-lg border border-white/[0.08] bg-white/[0.02] text-sm text-white/85">
                    <span className="truncate">interview_v2.mp4</span>
                    <span className="text-[10px] font-mono text-white/40">01:47</span>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase tracking-widest text-white/40 block mb-2">
                    Language
                  </label>
                  <div className="flex items-center justify-between h-10 px-3 rounded-lg border border-white/[0.08] bg-white/[0.02] text-sm text-white/85">
                    <span>English (US)</span>
                    <ChevronDown className="w-4 h-4 text-white/40" />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase tracking-widest text-white/40 block mb-2">
                    Mode
                  </label>
                  <div className="grid grid-cols-3 gap-1.5 text-[11px]">
                    <div className="px-2 py-2 rounded-md border border-accent-primary/40 bg-accent-primary/[0.06] text-white text-center">Natural</div>
                    <div className="px-2 py-2 rounded-md border border-white/[0.06] bg-white/[0.015] text-white/50 text-center">Word</div>
                    <div className="px-2 py-2 rounded-md border border-white/[0.06] bg-white/[0.015] text-white/50 text-center">Phonetic</div>
                  </div>
                </div>

                <button className="cg-btn-primary w-full mt-2 text-sm">
                  <Sparkles className="w-4 h-4" />
                  Generate captions
                </button>
              </div>

              {/* Right: output preview */}
              <div className="p-6 sm:p-8 bg-[#0B0B0F]">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                    Output — captions.srt
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-accent-primary">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-primary" />
                    ready
                  </span>
                </div>

                <div className="space-y-3 font-mono text-[12px] leading-relaxed">
                  {[
                    { t: '00:00:01,240 → 00:00:03,880', l: 'Don\u2019t waste hours on manual captions.' },
                    { t: '00:00:04,120 → 00:00:06,340', l: 'One click, and it\u2019s on your timeline.' },
                    { t: '00:00:06,600 → 00:00:09,000', l: 'Twenty-four languages. Native + roman script.' },
                  ].map((c, i) => (
                    <div key={i} className="rounded-md border border-white/[0.06] bg-white/[0.015] px-3 py-2.5">
                      <div className="text-white/35 text-[10px] mb-1">{c.t}</div>
                      <div className="text-white/90">{c.l}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-white/40">
                  <span>3 cues · 9.0s</span>
                  <span>98% confidence</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
