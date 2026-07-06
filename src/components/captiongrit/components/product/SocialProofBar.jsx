import { motion } from 'motion/react';

export default function SocialProofBar() {
  const items = [
    'Write better captions',
    'Match your brand',
    'Built for creators',
    'Ready to share',
  ];

  return (
    <section className="relative z-10 px-6 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-6 border-y border-white/[0.06]"
      >
        {items.map((label, idx) => (
          <span key={idx} className="text-[12px] font-mono uppercase tracking-[0.14em] text-white/40">
            {label}
          </span>
        ))}
      </motion.div>
    </section>
  );
}
