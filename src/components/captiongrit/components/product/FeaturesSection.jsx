import { motion } from 'motion/react';
import { Globe, Zap, Palette, BookA, ShieldCheck, Film } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: Globe,
      title: "24 Languages",
      desc: "English + 10 Indian languages with phonetic romanization (Tenglish, Hinglish, etc)."
    },
    {
      icon: Zap,
      title: "One-Click Generate",
      desc: "Full transcript in a single API call. Fast and reliable."
    },
    {
      icon: Palette,
      title: "Caption Styles",
      desc: "Natural Phrase, Word-by-Word, and Phonetic modes."
    },
    {
      icon: BookA,
      title: "Custom Dictionary",
      desc: "Protect brand names, technical terms, and unique spellings."
    },
    {
      icon: ShieldCheck,
      title: "AI Verification Pass",
      desc: "Second-pass correction for maximum accuracy (Pro only).",
      highlight: true
    },
    {
      icon: Film,
      title: "Adobe Native",
      desc: "Works natively inside Premiere Pro and After Effects."
    }
  ];

  return (
    <section id="features" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-white tracking-tight"><span className="font-accent">Everything</span> you need. Nothing you don't.</h2>
          <p className="text-base font-body text-text-secondary">Built specifically for the modern video editor's workflow.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            const rotClasses = ['-rotate-1', 'rotate-1', '-rotate-1', 'rotate-1', '-rotate-1', 'rotate-1'];
            const shadow = feat.highlight ? '6px 6px 0 0 #3B82F6' : '5px 5px 0 0 #C6FF34';
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ rotate: 0, y: -4 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 260, damping: 20, delay: idx * 0.06 }}
                className={`relative bg-[#13131A] border rounded-2xl p-7 flex flex-col gap-4 overflow-hidden transform ${rotClasses[idx % 6]} ${feat.highlight ? 'border-[#3B82F6]/40' : 'border-white/10'}`}
                style={{ boxShadow: shadow }}
              >
                {feat.highlight && (
                  <span className="absolute -top-2 right-4 bg-[#3B82F6] text-black text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded rotate-3">
                    Pro only
                  </span>
                )}

                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${feat.highlight ? 'bg-[#3B82F6]/20 text-[#3B82F6]' : 'bg-accent-primary/15 text-accent-primary'}`}>
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="font-display font-black text-xl text-white mt-1">{feat.title}</h3>
                <p className="text-sm font-body text-text-secondary leading-relaxed">{feat.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
