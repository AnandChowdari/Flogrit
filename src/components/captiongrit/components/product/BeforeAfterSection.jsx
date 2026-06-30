import { motion } from 'framer-motion';
import { fadeUpVariant } from '../../lib/motionVariants';

export default function BeforeAfterSection() {
  const comparisons = [
    { metric: 'Caption one 10-min video', before: '2–3 hours', after: '< 30 seconds' },
    { metric: 'Language accuracy', before: 'Manual / error-prone', after: '95–99% AI accuracy' },
    { metric: 'Indian language support', before: 'Not available in tools', after: '10 languages + phonetic' },
    { metric: 'Cost per video', before: '$0.25/min (Cloud services)', after: '< $0.10/hour of video' },
    { metric: 'Software you need', before: 'Exit Adobe, upload elsewhere', after: 'Stay inside Premiere / AE' },
  ];

  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Background glow decoration behind the glass table */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-accent-primary/5 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs font-mono text-text-secondary uppercase tracking-widest mb-3">Time saved</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-white tracking-tight">Before vs. After Captiongrit</h2>
          <p className="text-base font-body text-text-secondary">See how much time and money you save on every project.</p>
        </motion.div>

        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white/[0.03] backdrop-blur-[20px] border border-accent-primary/30 rounded-2xl p-1 md:p-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
        >
          <div className="overflow-x-auto p-5 md:p-8">
            <table className="w-full text-sm font-body min-w-[650px] border-collapse">
              <thead>
                <tr className="border-b border-white/[0.08]">
                  <th className="text-left pb-5 pr-6 text-text-secondary font-semibold uppercase tracking-wider text-[10px] w-1/3">Metric</th>
                  <th className="pb-5 px-6 text-left font-semibold uppercase tracking-wider text-[10px] w-1/3">
                    <span className="text-[#ff6b6b]/90 flex items-center gap-2"> Without Captiongrit</span>
                  </th>
                  <th className="pb-5 px-6 text-left font-bold uppercase tracking-wider text-[10px] w-1/3">
                    <span className="text-accent-primary flex items-center gap-2"> With Captiongrit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {comparisons.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="py-4 pr-6 text-white/95 font-medium group-hover:text-white transition-colors">{row.metric}</td>
                    <td className="py-4 px-6 text-[13px] font-medium" style={{ color: '#ff6b6b' }}>{row.before}</td>
                    <td className="py-4 px-6 text-accent-primary font-bold">{row.after}</td>
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
