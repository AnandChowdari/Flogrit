import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Marcus Vella",
      role: "YouTube Creator (1.2M Subs)",
      quote: "The phonetic Romanization is a game changer for my Telugu channel. I can finally add accurate subtitles without manually typing everything out.",
      rating: 5
    },
    {
      name: "Priya Iyer",
      role: "Freelance Video Editor",
      quote: "Captiongrit saves me about 2 hours per video. The fact that it works directly inside Premiere means I never have to break my workflow.",
      rating: 5
    },
    {
      name: "David Chen",
      role: "Agency Director",
      quote: "We were paying hundreds a month for cloud captioning services. A one-time payment for this level of accuracy is an absolute steal.",
      rating: 5
    },
    {
      name: "Sarah Kim",
      role: "Content Strategist",
      quote: "The multi-language support is incredible. We localize our content into 5 languages and Captiongrit handles it all without breaking a sweat.",
      rating: 5
    },
    {
      name: "Raj Patel",
      role: "Short-Form Creator",
      quote: "I've tried every captioning tool out there. Nothing comes close to the speed and accuracy of Captiongrit for TikTok and Reels content.",
      rating: 5
    },
    {
      name: "Elena Torres",
      role: "Podcast Producer",
      quote: "Being able to generate captions directly inside the timeline without leaving Premiere Pro has completely changed our post-production pipeline.",
      rating: 5
    }
  ];

  // Duplicate for seamless infinite loop
  const marqueeItems = [...testimonials, ...testimonials];

  return (
    <section className="py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-1 rounded-full border border-white/10 bg-white/5 text-sm text-text-secondary mb-4">
            Early Beta Feedback
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-white tracking-tight">What Beta Testers Say</h2>
        </motion.div>
      </div>

      {/* Marquee container */}
      <div className="relative">

        <div className="flex w-max animate-marquee-testimonials hover:[animation-play-state:paused]">
          {marqueeItems.map((test, idx) => (
            <div
              key={idx}
              className="glass-card p-6 flex flex-col justify-between w-[320px] shrink-0 mx-4"
            >
              <div>
                <div className="flex gap-1 mb-4">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent-primary text-accent-primary" />
                  ))}
                </div>
                <p className="text-white/90 text-sm leading-relaxed mb-6">"{test.quote}"</p>
              </div>
              <div className="flex items-center gap-3 border-t border-white/5 pt-4">
                <div className="w-8 h-8 rounded-full bg-accent-primary/20 flex items-center justify-center font-bold text-accent-primary text-sm">
                  {test.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-white text-xs">{test.name}</h4>
                  <p className="text-text-secondary text-xs">{test.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
