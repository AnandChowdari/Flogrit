import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, ShieldCheck, ArrowLeft, Sparkles, MessageSquare, ArrowRight } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { PRICING } from '../../config/pricing';

export default function PricingSection({ onBuyNow }) {
  // Init to 'india' on BOTH server and client to avoid hydration mismatch,
  // then detect region on the client only.
  const [region, setRegion] = useState('india');
  const [selectedPlanId, setSelectedPlanId] = useState(null);

  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz && !tz.toLowerCase().includes('calcutta') && !tz.toLowerCase().includes('kolkata')) {
        setRegion('international');
      }
    } catch {
      // ignore
    }
  }, []);

  const pricingData = PRICING[region];

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      data: pricingData.tiers.basic,
      description: 'Ideal for getting started with clean, automated captions.',
      accuracy: '95% Accuracy',
      duration: 'Up to 30 Sec per take',
      buttonText: 'Get Basic',
      isPopular: false,
      features: [
        { name: 'All 24 languages supported', included: true },
        { name: 'Natural phrase mode', included: true },
        { name: 'English phonetic mode', included: true },
        { name: 'Self Installation Guide', included: true },
        { name: 'Email Support', included: true },
        { name: 'Up to 30 Sec conversion per take', included: true },
        { name: '95% Accuracy', included: true },
        { name: 'Word by word mode', included: false },
        { name: 'Double pass by AI', included: false },
        { name: 'Custom Dictionary & Text Editor', included: false },
      ]
    },
    {
      id: 'pro',
      name: 'Pro',
      data: pricingData.tiers.pro,
      description: 'Our flagship plan. Highly accurate and fully customizable captions.',
      accuracy: '98% Accuracy',
      duration: 'Up to 2:30 min per take',
      buttonText: 'Get Pro',
      isPopular: true,
      features: [
        { name: 'Everything in Basic', included: true },
        { name: 'Word by word mode', included: true },
        { name: 'Double pass by AI', included: true },
        { name: 'Custom Dictionary & Text Editor', included: true },
        { name: 'Video Installation Guide', included: true },
        { name: 'Up to 2:30 min long version per take', included: true },
        { name: '98% Accuracy', included: true },
        { name: 'Advanced Batch processing', included: false },
        { name: 'Priority & Personal support', included: false },
      ]
    },
    {
      id: 'extreme',
      name: 'Extreme',
      data: pricingData.tiers.extreme,
      description: 'Designed for production agencies needing top-tier speed and custom support.',
      accuracy: '99% Accuracy',
      duration: 'Advanced Batch processing',
      buttonText: 'Get Extreme',
      isPopular: false,
      features: [
        { name: 'Everything in Pro', included: true },
        { name: 'Advanced Batch processing', included: true },
        { name: 'Personal custom support', included: true },
        { name: 'Access up to 99% Accuracy', included: true },
        { name: '10+ Custom presets', included: true },
        { name: 'Mogrt (Advanced)', included: true },
        { name: 'Text Animations', included: true },
        { name: 'Priority Support', included: true },
      ]
    }
  ];

  const selectedPlan = plans.find((p) => p.id === selectedPlanId);

  return (
    <section id="pricing" className="py-28 sm:py-32 px-5 sm:px-6 relative">
      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-display font-semibold text-white tracking-[-0.02em] text-3xl sm:text-4xl mb-4">
            Simple, <span className="cg-hl">one-time</span> pricing.
          </h2>
          <p className="text-white/55 mb-8">Pay once. Use forever. No subscriptions, no renewals.</p>

          {/* Region Toggle */}
          <div className="inline-flex bg-white/[0.03] p-1 rounded-full border border-white/[0.08] relative">
            <div
              className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-accent-primary rounded-full transition-all duration-300 ease-out"
              style={{ left: region === 'india' ? '4px' : 'calc(50%)' }}
            />
            <button
              onClick={() => setRegion('india')}
              className={`relative z-10 w-[120px] py-2 rounded-full font-semibold text-[13px] transition-colors ${region === 'india' ? 'text-black' : 'text-white/50 hover:text-white'}`}
            >
              India
            </button>
            <button
              onClick={() => setRegion('international')}
              className={`relative z-10 w-[120px] py-2 rounded-full font-semibold text-[13px] transition-colors ${region === 'international' ? 'text-black' : 'text-white/50 hover:text-white'}`}
            >
              International
            </button>
          </div>
        </motion.div>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {plans.map((plan) => {
            const isPro = plan.isPopular;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className={`relative rounded-2xl p-7 flex flex-col gap-6 border transition-colors ${
                  isPro
                    ? 'border-accent-primary/40 bg-accent-primary/[0.03]'
                    : 'border-white/[0.08] bg-white/[0.02] hover:border-white/20'
                }`}
                style={isPro ? { boxShadow: '0 20px 60px -30px rgba(198, 255, 52, 0.35)' } : undefined}
              >
                {isPro && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px] font-mono uppercase tracking-[0.16em] px-2.5 py-1 rounded-full bg-accent-primary text-black">
                    Most popular
                  </span>
                )}

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-lg font-display font-semibold text-white">
                      {plan.name}
                    </span>
                    <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono">
                      one-time
                    </span>
                  </div>
                  <p className="text-[12px] text-white/50 leading-relaxed">{plan.description}</p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-display font-semibold text-white tracking-tight">
                    {pricingData.currency}{plan.data.price}
                  </span>
                </div>

                <ul className="space-y-2.5 text-[13px] text-white/70 border-t border-white/[0.06] pt-5">
                  {plan.features.filter(f => f.included).slice(0, 6).map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Check className="w-3.5 h-3.5 text-accent-primary shrink-0 mt-1" />
                      <span className="leading-relaxed">
                        {f.name}
                        {f.name === 'Double pass by AI' && (
                          <span className="ml-1.5 text-[9px] font-mono uppercase tracking-[0.14em] px-1.5 py-0.5 rounded border border-accent-primary/30 text-accent-primary bg-accent-primary/[0.06]">
                            Pro only
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                  {plan.features.filter(f => !f.included).slice(0, 2).map((f, i) => (
                    <li key={`x-${i}`} className="flex items-start gap-2.5 text-white/25">
                      <X className="w-3.5 h-3.5 shrink-0 mt-1" />
                      <span className="leading-relaxed line-through">{f.name}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => onBuyNow(plan)}
                  className={`mt-auto ${isPro ? 'cg-btn-primary' : 'cg-btn-ghost'} w-full text-sm`}
                >
                  {plan.buttonText}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Trust Footer */}
        <div className="mt-14 text-center flex flex-col sm:flex-row items-center justify-center gap-6 text-[13px] text-white/45">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-accent-primary" />
            Secure payment
          </div>
          <div className="hidden sm:block w-1 h-1 rounded-full bg-white/20" />
          <div>Instant download after purchase</div>
        </div>

      </div>
    </section>
  );
}

