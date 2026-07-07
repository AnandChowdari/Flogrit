import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, ShieldCheck, ArrowLeft, Sparkles, MessageSquare, ArrowRight } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { PRICING } from '../../config/pricing';

export default function PricingSection({ onBuyNow }) {
  const [region, setRegion] = useState(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz && !tz.toLowerCase().includes('calcutta') && !tz.toLowerCase().includes('kolkata')) {
        return 'international';
      }
    } catch {
      // Ignore timezone detection errors
    }
    return 'india';
  });
  const [selectedPlanId, setSelectedPlanId] = useState(null);

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
    <section id="pricing" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-white tracking-tight">Simple, <span className="font-accent">One-Time</span> Pricing</h2>
          <p className="text-base font-body text-text-secondary mb-4">Pay once. Use forever. No subscriptions, no renewals.</p>
          <p className="text-sm font-body text-text-secondary mb-8">
            Trusted by <span className="text-white font-medium">editors across India</span>
          </p>

          {/* Region Toggle */}
          <div className="inline-flex bg-bg-secondary p-1 rounded-full border border-white/10 relative">
            <div
              className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-accent-primary rounded-full transition-all duration-300 ease-out"
              style={{ left: region === 'india' ? '4px' : 'calc(50%)' }}
            />
            <button
              onClick={() => {
                setRegion('india');
              }}
              className={`relative z-10 w-[140px] py-2.5 rounded-full font-semibold text-sm transition-colors ${region === 'india' ? 'text-[#0a1200]' : 'text-text-secondary hover:text-white'}`}
            >
              India
            </button>
            <button
              onClick={() => {
                setRegion('international');
              }}
              className={`relative z-10 w-[140px] py-2.5 rounded-full font-semibold text-sm transition-colors ${region === 'international' ? 'text-[#0a1200]' : 'text-text-secondary hover:text-white'}`}
            >
              International
            </button>
          </div>
        </motion.div>

        {/* Unified Premium Pricing Container */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-[#0D0D0D]/60 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.8)]">

            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-accent-primary/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent-primary/2 rounded-full blur-[100px] pointer-events-none" />

            <AnimatePresence mode="wait">
              {!selectedPlanId ? (
                // PLAN SELECTOR VIEW (STATE A)
                <motion.div
                  key="selector"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="relative z-10"
                >
                  <div className="text-center mb-8">
                    <h3 className="text-xl font-display font-bold text-white mb-2">Choose your plan</h3>
                    <p className="text-sm text-text-secondary">Tap a card to see everything included.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                    {plans.map((plan) => {
                      const isPro = plan.isPopular;
                      return (
                        <button
                          key={plan.id}
                          onClick={() => setSelectedPlanId(plan.id)}
                          className={`group relative text-left rounded-2xl p-6 flex flex-col gap-5 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/40 hover:-translate-y-1 ${
                            isPro
                              ? 'bg-gradient-to-b from-accent-primary/[0.08] to-white/[0.02] border border-accent-primary/40 shadow-[0_0_30px_rgba(198,255,52,0.10)]'
                              : 'bg-white/[0.02] border border-white/10 hover:border-accent-primary/30'
                          }`}
                        >
                          {isPro && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent-primary text-black px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-md whitespace-nowrap">
                              <Sparkles className="w-2.5 h-2.5" /> Most Popular
                            </div>
                          )}

                          <div className="flex items-center justify-between">
                            <span className="text-lg font-display font-bold text-white tracking-tight">
                              {plan.name}
                            </span>
                            <span className="text-[10px] text-text-secondary uppercase tracking-widest font-mono">
                              One-Time
                            </span>
                          </div>

                          <div className="flex items-baseline gap-1">
                            <span className="text-4xl font-display font-extrabold text-white">
                              {pricingData.currency}{plan.data.price}
                            </span>
                          </div>

                          <ul className="space-y-2 text-xs text-text-secondary border-t border-white/5 pt-4">
                            <li className="flex items-center gap-2">
                              <Check className="w-3.5 h-3.5 text-accent-primary shrink-0" />
                              <span>{plan.duration}</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <Check className="w-3.5 h-3.5 text-accent-primary shrink-0" />
                              <span>{plan.accuracy}</span>
                            </li>
                          </ul>

                          <div className="mt-auto pt-3 flex justify-between items-center text-xs font-bold text-accent-primary">
                            <span>View details</span>
                            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              ) : (
                // PLAN DETAIL VIEW (STATE B)
                <motion.div
                  key="detail"
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="relative z-10 max-w-xl mx-auto"
                >
                  {/* Back Button */}
                  <button
                    onClick={() => setSelectedPlanId(null)}
                    className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-white mb-8 group transition-colors focus:outline-none"
                  >
                    <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                    Back to all plans
                  </button>

                  <div className="flex flex-col gap-8">
                    {/* Info & CTA */}
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-3xl font-display font-bold text-white">
                            {selectedPlan.name}
                          </h3>
                          {selectedPlan.isPopular && (
                            <span className="bg-accent-primary text-black px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                              <Sparkles className="w-2.5 h-2.5" /> Most Popular
                            </span>
                          )}
                        </div>
                        <p className="text-text-secondary text-sm leading-relaxed">
                          {selectedPlan.description}
                        </p>
                      </div>

                      {/* Large Price Display */}
                      <div className="py-4 border-y border-white/5">
                        <div className="flex items-baseline gap-2">
                          <span className="text-5xl font-display font-extrabold text-white">
                            {pricingData.currency}{selectedPlan.data.price}
                          </span>
                          <span className="text-xs text-text-secondary uppercase tracking-widest font-mono">
                            One-Time Purchase
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="space-y-3">
                        <button
                          onClick={() => onBuyNow(selectedPlan)}
                          className="w-full bg-accent-primary hover:bg-accent-secondary text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(198,255,52,0.2)] hover:-translate-y-1"
                        >
                          Buy Now <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Detailed Feature List */}
                    <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-6 sm:p-8">
                      <h4 className="text-xs font-mono uppercase tracking-widest text-text-secondary mb-4">
                        What's Included
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {selectedPlan.features.map((feature, fIdx) => (
                          <li
                            key={fIdx}
                            className={`flex items-start gap-2.5 text-xs sm:text-sm leading-tight transition-opacity ${feature.included ? 'text-white/90' : 'text-text-secondary/40'
                              }`}
                          >
                            {feature.included ? (
                              <Check className="w-4 h-4 text-accent-primary shrink-0 mt-0.5" />
                            ) : (
                              <X className="w-4 h-4 text-white/20 shrink-0 mt-0.5" />
                            )}
                            <span>{feature.name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

        {/* Secure Checkout Trust Footer */}
        <div className="mt-16 text-center flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-text-secondary">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-accent-primary" />
            Secure Payment
          </div>
          <div className="hidden sm:block w-1 h-1 rounded-full bg-white/20" />
          <div>Instant Download After Purchase</div>
        </div>

      </div>
    </section>
  );
}
