import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';

// Layout
import CaptiongritNavbar from '../../components/layout/CaptiongritNavbar';
import CaptiongritFooter from '../../components/layout/CaptiongritFooter';

// Sections
import HeroSection from '../../components/product/HeroSection';
import SocialProofBar from '../../components/product/SocialProofBar';
import LiveDemoSection from '../../components/product/LiveDemoSection';
import HowItWorksSection from '../../components/product/HowItWorksSection';
import FeaturesSection from '../../components/product/FeaturesSection';
import LanguageMarquee from '../../components/product/LanguageMarquee';
import PricingSection from '../../components/product/PricingSection';
import FaqSection from '../../components/product/FaqSection';
import FinalCtaSection from '../../components/product/FinalCtaSection';
import CheckoutModal from '../../components/product/CheckoutModal';

export default function LandingPage() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleGenericBuyNow = () => {
    document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setIsCheckoutOpen(true);
  };

  useEffect(() => {
    if (isCheckoutOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isCheckoutOpen]);

  return (
    <div className="min-h-screen flex flex-col bg-bg-primary font-body text-text-primary selection:bg-accent-primary/30 selection:text-white">
      <CaptiongritNavbar onBuyNow={handleGenericBuyNow} />

      <main className="flex-grow relative z-10">
        <HeroSection onBuyNow={handleGenericBuyNow} />
        <SocialProofBar />
        <LiveDemoSection />
        <HowItWorksSection />
        <FeaturesSection />
        <LanguageMarquee />
        <PricingSection onBuyNow={handleSelectPlan} />
        <FaqSection />
        <FinalCtaSection onBuyNow={handleGenericBuyNow} />
      </main>

      <CaptiongritFooter />

      <AnimatePresence>
        {isCheckoutOpen && (
          <CheckoutModal
            isOpen={isCheckoutOpen}
            onClose={() => setIsCheckoutOpen(false)}
            selectedPlan={selectedPlan}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

