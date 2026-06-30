import { motion } from 'framer-motion';

export default function SocialProofBar() {
  const features = [
    { title: 'Write Better Captions', description: 'Turn simple ideas into impactful content.' },
    { title: 'Match Your Brand', description: 'Keep every caption aligned with your unique voice.' },
    { title: 'Built for Creators', description: 'Designed for marketers, businesses, and content teams.' },
    { title: 'Ready to Share', description: 'Create polished captions without the extra effort.' },
  ];

  return (
    <section className="relative z-20 -mt-10 px-6 max-w-6xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card py-8 px-8 sm:px-12 shadow-2xl"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
          {features.map((feat, idx) => (
            <div key={idx} className="flex flex-col items-center sm:items-start text-center sm:text-left group">
              <span className="font-display font-bold text-lg text-white mb-1.5 group-hover:text-accent-primary transition-colors">
                {feat.title}
              </span>
              <span className="text-xs text-text-secondary font-body leading-relaxed">
                {feat.description}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
