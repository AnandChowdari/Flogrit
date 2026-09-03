import { motion } from 'motion/react';
import { Check, X, Sparkles, Zap, Lock, DollarSign, Layers } from 'lucide-react';

export default function ComparisonSection() {
  const comparisonData = [
    { 
      feature: "Pricing Model",
      desc: "Are you renting or owning?",
      captiongrit: { text: "Pay Once, Yours Forever", highlight: true, icon: DollarSign },
      kalakar: "$15+/mo Subscription",
      submagic: "$50/mo Subscription",
      premiere: "Included with CC" 
    },
    { 
      feature: "Workflow Integration",
      desc: "Where does the AI live?",
      captiongrit: { text: "100% Native Premiere Plugin", highlight: true, icon: Layers },
      kalakar: "Cloud Sync Plugin",
      submagic: "External Web App",
      premiere: "Native"
    },
    { 
      feature: "Hinglish & Indic Accuracy",
      desc: "For South Asian creators",
      captiongrit: { text: "Flawless & Precise", highlight: false },
      kalakar: "Highly Accurate",
      submagic: "Struggles with Context",
      premiere: "Poor / Inaccurate"
    },
    { 
      feature: "Privacy & Security",
      desc: "Where does your footage go?",
      captiongrit: { text: "100% Local (Zero Uploads)", highlight: true, icon: Lock },
      kalakar: "Cloud Upload Required",
      submagic: "Cloud Upload Required",
      premiere: "Local / Adobe Cloud"
    },
    { 
      feature: "Viral Caption Templates",
      desc: "MrBeast, Hormozi, etc.",
      captiongrit: { text: "Instant Apply on Timeline", highlight: true, icon: Sparkles },
      kalakar: "Available via Plugin",
      submagic: "Available (Web Only)",
      premiere: "Manual Keyframing Only"
    },
    {
      feature: "Generation Speed",
      desc: "Time from click to captions",
      captiongrit: { text: "Lightning Fast (< 30s)", highlight: true, icon: Zap },
      kalakar: "Slower (Upload Wait)",
      submagic: "Slower (Upload Wait)",
      premiere: "Minutes"
    }
  ];

  return (
    <section className="py-32 px-6 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-primary/20 blur-[120px] rounded-full pointer-events-none opacity-50" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-accent-primary mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-wide uppercase">The Unfair Advantage</span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
            Stop Renting Your <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-primary to-purple-500">
              Editing Superpowers.
            </span>
          </h2>
          <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto">
            See why professional editors are ditching expensive cloud subscriptions and slow native tools for Captiongrit's 100% native, pay-once powerhouse.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-x-auto pb-8"
        >
          <div className="min-w-[1000px] rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden shadow-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="p-6 border-b border-white/10 w-1/4">
                    <span className="text-white font-bold text-xl">Feature</span>
                  </th>
                  <th className="p-6 border-b-2 border-accent-primary bg-accent-primary/10 w-1/4 relative overflow-hidden">
                    {/* Shimmer effect for our column header */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                    />
                    <div className="relative z-10 flex flex-col items-center text-center">
                      <span className="text-accent-primary font-black text-2xl tracking-tight">Captiongrit</span>
                      <span className="text-accent-primary/80 text-sm font-medium mt-1">The Professional Choice</span>
                    </div>
                  </th>
                  <th className="p-6 border-b border-white/10 w-1/6 text-center">
                    <span className="text-white/70 font-semibold text-lg">Kalakar.io</span>
                    <div className="text-white/40 text-xs mt-1">Cloud/Plugin</div>
                  </th>
                  <th className="p-6 border-b border-white/10 w-1/6 text-center">
                    <span className="text-white/70 font-semibold text-lg">Submagic</span>
                    <div className="text-white/40 text-xs mt-1">Web App</div>
                  </th>
                  <th className="p-6 border-b border-white/10 w-1/6 text-center">
                    <span className="text-white/70 font-semibold text-lg">Adobe Premiere</span>
                    <div className="text-white/40 text-xs mt-1">Native Auto-Captions</div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {comparisonData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="p-6">
                      <div className="text-white font-semibold text-lg">{row.feature}</div>
                      <div className="text-text-secondary text-sm mt-1">{row.desc}</div>
                    </td>
                    
                    {/* Captiongrit Column (Highlighted) */}
                    <td className="p-6 bg-accent-primary/5 border-x border-accent-primary/20 relative">
                      <div className="flex flex-col items-center text-center justify-center h-full gap-2">
                        {row.captiongrit.icon && (
                          <motion.div
                            animate={{ scale: [1, 1.15, 1], rotate: [0, -5, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                            className="bg-accent-primary/20 p-2 rounded-full text-accent-primary mb-1 shadow-[0_0_15px_rgba(var(--accent-primary-rgb),0.5)]"
                          >
                            <row.captiongrit.icon className="w-5 h-5" />
                          </motion.div>
                        )}
                        <span className={`font-bold ${row.captiongrit.highlight ? 'text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-purple-400 text-lg' : 'text-white'}`}>
                          {row.captiongrit.text}
                        </span>
                      </div>
                    </td>
                    
                    {/* Kalakar Column */}
                    <td className="p-6 text-center text-text-secondary">
                      <span className="font-medium text-white/80">{row.kalakar}</span>
                    </td>
                    
                    {/* Submagic Column */}
                    <td className="p-6 text-center text-text-secondary">
                      <span className="font-medium text-white/80">{row.submagic}</span>
                    </td>
                    
                    {/* Premiere Column */}
                    <td className="p-6 text-center text-text-secondary">
                      <span className="font-medium text-white/80">{row.premiere}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
