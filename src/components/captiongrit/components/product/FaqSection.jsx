import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus } from 'lucide-react';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { q: "What's the difference between Basic, Pro, and Extreme?", a: "Basic gives you standard captions in English + 5 Indian languages. Pro unlocks all 24 languages, phonetic modes, and custom dictionaries. Extreme adds a second AI verification pass for maximum accuracy, lifetime updates, and 1-on-1 setup support." },
    { q: 'Is this a one-time payment or a subscription?', a: "It's a strict one-time payment for the software license. You bring your own API key for the generation model, so we don't have to charge a monthly subscription." },
    { q: 'How do I receive the plugin after purchase?', a: "You'll receive an email instantly with a secure download link for the .zxp plugin file, your license key, and installation instructions." },
    { q: 'Can I use the license on multiple devices?', a: 'Each license key allows activation on up to 1 device for a single user.' },
    { q: 'Can I upgrade from Basic to Pro later?', a: 'Yes, you can upgrade at any time by paying just the price difference between the two tiers.' },
    { q: 'Why is the pricing different for India?', a: "Purchasing power parity. Indian pricing is set locally to make it accessible to regional creators while maintaining global standards elsewhere." },
    { q: 'What Adobe versions are supported?', a: 'Adobe Premiere Pro CC 2022 and newer, and Adobe After Effects CC 2022 and newer (Pro/Extreme tiers).' },
    { q: 'Do I need my own API key?', a: 'Yes. You use your own key (OpenAI or Groq) so you pay wholesale rates directly to the provider. We guide you through a 2-minute setup.' },
    { q: 'Which Indian languages are supported?', a: 'Telugu, Hindi, Tamil, Kannada, Malayalam, Marathi, Bengali, Gujarati, Punjabi, and Odia — all with phonetic romanization on Pro/Extreme.' },
    { q: 'Does it work offline?', a: 'No, transcription requires an internet connection to process audio.' },
  ];

  return (
    <section id="faq" className="py-28 sm:py-32 px-5 sm:px-6 relative">
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-display font-semibold text-white tracking-[-0.02em] text-3xl sm:text-4xl mb-4">
            Frequently asked <span className="cg-hl">questions</span>
          </h2>
        </motion.div>

        <div className="flex flex-col divide-y divide-white/[0.06] border-y border-white/[0.06]">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full py-5 flex items-center justify-between text-left focus:outline-none group"
                >
                  <span className="text-white/90 font-medium pr-6 text-[15px] group-hover:text-white transition-colors">
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0"
                  >
                    <Plus className={`w-4 h-4 ${isOpen ? 'text-accent-primary' : 'text-white/40'}`} />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 pr-8 text-sm text-white/55 leading-[1.7]">{faq.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
