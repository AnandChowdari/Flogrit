import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function FinalCtaSection({ onBuyNow }) {
  return (
    <section className="relative py-32 md:py-48 px-6 overflow-hidden bg-accent-primary">
      {/* Subtle Grain/Pattern overlay for premium texture */}
      <div className="absolute inset-0 bg-black/[0.02]" />
      
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/10 text-black font-bold uppercase tracking-[0.2em] text-sm backdrop-blur-sm">
            <Sparkles className="w-4 h-4" />
            Your Time is Valuable
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-6xl md:text-[8rem] font-black mb-8 text-black leading-[0.85] tracking-tighter text-center"
        >
          START CAPTIONING <br />
          <span className="text-black/70">SMARTER TODAY.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-2xl md:text-4xl font-semibold text-black/60 mb-16 text-center tracking-tight"
        >
          Starting at just <span className="text-black font-black">₹399 / $9</span> — one-time.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-2xl mx-auto"
        >
          <button
            onClick={onBuyNow}
            className="flex-1 flex items-center justify-center gap-3 bg-black hover:bg-black/90 text-white px-10 py-6 rounded-2xl font-bold text-2xl transition-all hover:scale-105 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] group"
          >
            Buy Now
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <a
            href="#pricing"
            className="flex-1 flex items-center justify-center px-10 py-6 rounded-2xl font-bold text-2xl border-2 border-black/20 text-black hover:bg-black/5 transition-all hover:border-black/40"
          >
            Compare Plans
          </a>
        </motion.div>
      </div>
    </section>
  );
}
