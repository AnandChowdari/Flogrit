import { motion } from 'motion/react';

export default function SocialProofBar() {
  const features = [
    { title: 'Write Better Captions', description: 'Turn simple ideas into impactful content.' },
    { title: 'Match Your Brand', description: 'Keep every caption aligned with your unique voice.' },
    { title: 'Built for Creators', description: 'Designed for marketers, businesses, and content teams.' },
    { title: 'Ready to Share', description: 'Create polished captions without the extra effort.' },
  ];

  return (
    <section className="relative z-20 -mt-6 px-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {features.map((feat, idx) => {
          const rots = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2'];
          const shadowColor = idx % 2 === 0 ? '#C6FF34' : '#3B82F6';
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ rotate: 0, y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20, delay: idx * 0.08 }}
              viewport={{ once: true }}
              className={`bg-[#13131A] border border-white/10 rounded-2xl p-5 transform ${rots[idx]}`}
              style={{ boxShadow: `5px 5px 0 0 ${shadowColor}` }}
            >
              <span className="font-display font-black text-base text-white block mb-1">
                {feat.title}
              </span>
              <span className="text-xs text-text-secondary font-body leading-relaxed block">
                {feat.description}
              </span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
