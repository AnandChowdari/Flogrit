import { motion } from 'motion/react';
import { Globe, Zap, Palette, BookA, ShieldCheck, Film } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    { icon: Globe, title: '24 Languages', desc: 'English + 10 Indian languages with phonetic romanization (Tenglish, Hinglish).' },
    { icon: Zap, title: 'One-Click Generate', desc: 'Full transcript in a single call. Fast, reliable, timeline-ready.' },
    { icon: Palette, title: 'Caption Styles', desc: 'Natural phrase, word-by-word, and phonetic modes.' },
    { icon: BookA, title: 'Custom Dictionary', desc: 'Protect brand names, technical terms, and unique spellings.' },
    { icon: ShieldCheck, title: 'AI Verification Pass', desc: 'Second-pass correction for maximum accuracy.', proOnly: true },
    { icon: Film, title: 'Adobe Native', desc: 'Works natively inside Premiere Pro and After Effects.' },
  ];

  return (
    <section id="features" className="py-28 sm:py-32 px-5 sm:px-6 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-semibold text-white tracking-[-0.02em] text-3xl sm:text-4xl mb-4">
            <span className="cg-hl">Everything</span> you need. Nothing you don&rsquo;t.
          </h2>
          <p className="text-white/55 max-w-lg mx-auto leading-relaxed">
            Built specifically for the modern video editor&rsquo;s workflow.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.035]"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-accent-primary/10 text-accent-primary flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1.5">
                      <h3 className="font-display font-semibold text-white text-lg tracking-tight">
                        {feat.title}
                      </h3>
                      {feat.proOnly && (
                        <span className="text-[10px] font-mono uppercase tracking-[0.14em] px-1.5 py-0.5 rounded border border-accent-primary/30 text-accent-primary bg-accent-primary/[0.06]">
                          Pro only
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-white/55 leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
