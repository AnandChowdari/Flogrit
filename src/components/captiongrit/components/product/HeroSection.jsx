import { motion } from 'motion/react';

export default function HeroSection({ onBuyNow }) {
  return (
    <section className="relative pt-36 sm:pt-44 pb-28 sm:pb-40 overflow-hidden">
      <div className="max-w-3xl mx-auto px-5 sm:px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-[11px] font-medium tracking-wide text-white/60 mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent-primary" />
          v1.0 · Adobe Premiere Pro &amp; After Effects
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="font-display font-semibold text-white leading-[1.05] tracking-[-0.03em] mb-6"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 4.25rem)' }}
        >
          Don&rsquo;t waste hours.<br />
          Create captions in <span className="cg-hl">seconds</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-base sm:text-lg font-body text-white/60 leading-[1.7] mb-10 max-w-xl mx-auto"
        >
          AI-powered captions in 24 languages. One click, one-time license,
          right inside Premiere Pro and After Effects.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-10"
        >
          <button onClick={onBuyNow} className="cg-btn-primary text-sm sm:text-base">
            Buy Now — from ₹399
          </button>
          <a href="#how-it-works" className="cg-btn-ghost text-sm sm:text-base">
            See how it works
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[12px] text-white/45 font-mono"
        >
          <span>one-time purchase</span>
          <span className="text-white/20">·</span>
          <span><span className="cg-hl">24</span> languages</span>
          <span className="text-white/20">·</span>
          <span>Windows + Mac</span>
          <span className="text-white/20">·</span>
          <span>no subscriptions</span>
        </motion.div>
      </div>
    </section>
  );
}
