import { motion } from 'motion/react';

export default function FinalCtaSection({ onBuyNow }) {
  return (
    <section className="relative py-28 sm:py-36 px-5 sm:px-6 border-t border-white/[0.06]">
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display font-semibold text-white tracking-[-0.02em] mb-5"
          style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}
        >
          Start captioning <span className="cg-hl">smarter</span> today.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-white/55 mb-10 text-base"
        >
          One-time. From ₹399 / $9. That&rsquo;s it.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center"
        >
          <button onClick={onBuyNow} className="cg-btn-primary text-base">Buy now</button>
          <a href="#pricing" className="cg-btn-ghost text-base">Compare plans</a>
        </motion.div>
      </div>
    </section>
  );
}
