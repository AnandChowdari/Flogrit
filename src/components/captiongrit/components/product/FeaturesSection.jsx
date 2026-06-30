import { motion } from 'framer-motion';
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
      desc: "Second-pass correction for maximum accuracy (Extreme only).",
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
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`glass-card p-8 flex flex-col gap-4 relative overflow-hidden group ${feat.highlight ? 'border-accent-primary/30' : ''}`}
              >
                {feat.highlight && (
                  <div className="absolute inset-0 bg-accent-primary/5 pointer-events-none" />
                )}
                
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${feat.highlight ? 'bg-accent-primary/20 text-accent-primary shadow-[0_0_15px_rgba(198,255,52,0.3)]' : 'bg-white/5 text-white'}`}>
                  <Icon className="w-6 h-6" />
                </div>
                
                <h3 className="font-display font-bold text-xl text-white mt-2">{feat.title}</h3>
                <p className="text-base font-body text-text-secondary leading-relaxed">{feat.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
