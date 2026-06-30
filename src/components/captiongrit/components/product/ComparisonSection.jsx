import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

export default function ComparisonSection() {
  const comparisonData = [
    { feature: "Price Model", captiongrit: "One-time", rev: "$0.25/min", descript: "$15/mo", manual: "Free (Your time)" },
    { feature: "Adobe Integration", captiongrit: true, rev: false, descript: false, manual: true },
    { feature: "Indian Languages", captiongrit: true, rev: "Limited", descript: "Limited", manual: true },
    { feature: "Phonetic Romanization", captiongrit: true, rev: false, descript: false, manual: true },
    { feature: "Generation Speed", captiongrit: "< 30s", rev: "Minutes", descript: "Minutes", manual: "Hours" },
  ];

  return (
    <section className="py-32 px-6 bg-bg-secondary border-y border-white/5">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-white">Captiongrit vs. The Rest</h2>
          <p className="text-text-secondary text-lg">Stop paying monthly subscriptions for basic features.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-x-auto"
        >
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr>
                <th className="p-4 border-b border-white/10 text-text-secondary font-medium w-1/4">Feature</th>
                <th className="p-4 border-b-2 border-accent-primary bg-accent-primary/5 text-accent-primary font-bold text-lg w-1/4 rounded-t-xl">Captiongrit</th>
                <th className="p-4 border-b border-white/10 text-text-secondary font-medium">Cloud Services</th>
                <th className="p-4 border-b border-white/10 text-text-secondary font-medium">Desktop Apps</th>
                <th className="p-4 border-b border-white/10 text-text-secondary font-medium">Manual Typing</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, idx) => (
                <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4 text-white font-medium">{row.feature}</td>
                  
                  {/* Captiongrit Column */}
                  <td className="p-4 bg-accent-primary/5 border-x border-accent-primary/10">
                    {typeof row.captiongrit === 'boolean' ? (
                      row.captiongrit ? <Check className="w-5 h-5 text-accent-primary" /> : <X className="w-5 h-5 text-text-secondary" />
                    ) : (
                      <span className="font-bold text-white">{row.captiongrit}</span>
                    )}
                  </td>
                  
                  {/* Rev Column */}
                  <td className="p-4 text-text-secondary">
                    {typeof row.rev === 'boolean' ? (
                      row.rev ? <Check className="w-5 h-5 text-white" /> : <X className="w-5 h-5" />
                    ) : (
                      <span>{row.rev}</span>
                    )}
                  </td>
                  
                  {/* Descript Column */}
                  <td className="p-4 text-text-secondary">
                    {typeof row.descript === 'boolean' ? (
                      row.descript ? <Check className="w-5 h-5 text-white" /> : <X className="w-5 h-5" />
                    ) : (
                      <span>{row.descript}</span>
                    )}
                  </td>
                  
                  {/* Manual Column */}
                  <td className="p-4 text-text-secondary">
                    {typeof row.manual === 'boolean' ? (
                      row.manual ? <Check className="w-5 h-5 text-white" /> : <X className="w-5 h-5" />
                    ) : (
                      <span>{row.manual}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
