import { motion } from 'motion/react';

export default function FinalCtaSection({ onBuyNow }) {
  return (
    <section className="relative py-40 px-6 overflow-hidden border-t border-white/5">
      {/* Glow Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-primary/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="noise-overlay" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-5xl md:text-7xl font-black mb-6 text-white leading-[1.02]"
        >
          Start captioning <br className="hidden md:block" />
          <span className="font-accent text-accent-primary glow-text cg-underline-coral">smarter today.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-text-secondary mb-12"
        >
          One-time. ₹399 / $9. That's it.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={onBuyNow}
            className="cg-squish bg-accent-primary text-black px-10 py-5 rounded-2xl font-black text-xl shadow-[8px_8px_0_0_#FF5A3C] hover:shadow-[10px_10px_0_0_#FF5A3C]"
          >
            Buy Now
          </button>
          <a
            href="#pricing"
            className="cg-squish flex items-center justify-center px-10 py-5 rounded-2xl font-black text-xl border-2 border-white/20 hover:border-[#FF5A3C]/60 hover:text-[#FF5A3C] text-white transition-colors"
          >
            Compare Plans
          </a>
        </motion.div>
      </div>
    </section>
  );
}
