import { motion } from 'framer-motion';

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
          className="font-display text-5xl md:text-7xl font-bold mb-6 text-white leading-tight"
        >
          Start captioning <br className="hidden md:block" />
          <span className="font-accent text-accent-primary glow-text">smarter today.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-text-secondary mb-12"
        >
          Starting at just ₹399 / $9 — one-time.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={onBuyNow}
            className="bg-accent-primary hover:bg-accent-secondary text-black px-10 py-5 rounded-xl font-bold text-xl transition-all shadow-[0_0_20px_rgba(198,255,52,0.3)] hover:shadow-[0_0_40px_rgba(198,255,52,0.5)] hover:-translate-y-1"
          >
            Buy Now
          </button>
          <a
            href="#pricing"
            className="flex items-center justify-center px-10 py-5 rounded-xl font-bold text-xl border border-white/20 hover:bg-white/5 transition-all text-white"
          >
            Compare Plans
          </a>
        </motion.div>
      </div>
    </section>
  );
}
