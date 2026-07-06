import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, Search } from 'lucide-react';
import { fadeUpVariant } from '../../lib/motionVariants';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const [filter, setFilter] = useState('');

  const faqs = [
    { q: "What's the difference between Basic, Pro, and Extreme?", a: "Basic gives you standard captions in English + 5 Indian languages. Pro unlocks all 24 languages, phonetic modes, and custom dictionaries. Extreme adds a second AI verification pass for maximum accuracy, lifetime updates, and 1-on-1 setup support." },
    { q: "Is this a one-time payment or a subscription?", a: "It's a strict one-time payment for the software license. You bring your own API key for the generation model (which costs pennies per hour of video), so we don't have to charge you a monthly subscription." },
    { q: "How do I receive the plugin after purchase?", a: "You'll receive an email instantly with a secure download link for the .zxp plugin file, along with your license key and installation instructions." },
    { q: "Can I use the license on multiple devices?", a: "No, each license key allows activation on up to 1 device for a single user." },
    { q: "Can I upgrade from Basic to Pro later?", a: "Yes, you can upgrade at any time by paying just the difference in price between the two tiers." },
    { q: "Why is the pricing different for India?", a: "We believe in Purchasing Power Parity (PPP). We've priced the Indian version locally to make it accessible to regional creators while maintaining global standards for international users." },
    { q: "What Adobe versions are supported?", a: "Captiongrit works natively with Adobe Premiere Pro CC 2022 and newer, and Adobe After Effects CC 2022 and newer (Pro/Extreme tiers)." },
    { q: "Do I need my own API key?", a: "Yes. To keep the plugin a one-time purchase, you use your own API key (like OpenAI or Groq). This means you pay wholesale rates (often less than $0.10 per hour of video) directly to the provider. We guide you through the 2-minute setup." },
    { q: "Which Indian languages are supported?", a: "We support Telugu, Hindi, Tamil, Kannada, Malayalam, Marathi, Bengali, Gujarati, Punjabi, and Odia — all with Phonetic Romanization support in Pro/Extreme." },
    { q: "Does it work offline?", a: "No, the AI transcription models require an internet connection to process the audio and generate the text." }
  ];

  const filteredFaqs = filter
    ? faqs.filter(faq => faq.q.toLowerCase().includes(filter.toLowerCase()) || faq.a.toLowerCase().includes(filter.toLowerCase()))
    : faqs;

  return (
    <section id="faq" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-white tracking-tight">Frequently Asked Questions</h2>
        </motion.div>

        {/* Search filter */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search FAQ..."
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="w-full bg-[#111111] border border-[#1E1E1E] rounded-xl px-4 py-3 pl-10
                         text-sm font-body text-white placeholder:text-text-secondary
                         focus:outline-none focus:border-accent-primary/40 transition-colors"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
          </div>
        </motion.div>

        {/* 2-column FAQ grid on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.03 }}
                className={`overflow-hidden rounded-2xl bg-[#13131A] border-2 transition-all ${isOpen ? 'border-[#3B82F6]/50' : 'border-white/10 hover:border-accent-primary/30'}`}
                style={isOpen ? { boxShadow: '5px 5px 0 0 #3B82F6' } : undefined}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="font-black text-white pr-8 text-sm">{faq.q}</span>
                  <motion.div animate={{ rotate: isOpen ? 45 : 0 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} className="shrink-0">
                    <Plus className={`w-5 h-5 ${isOpen ? 'text-[#3B82F6]' : 'text-text-secondary'}`} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 24 }}
                    >
                      <div className="px-6 pb-6 text-sm text-text-secondary font-body leading-relaxed border-t border-white/5 pt-4 mt-2">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {filteredFaqs.length === 0 && (
          <p className="text-center text-text-secondary text-sm mt-8 font-body">No matching questions found.</p>
        )}
      </div>
    </section>
  );
}
