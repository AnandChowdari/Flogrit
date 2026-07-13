import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';

// Layout
import CaptiongritNavbar from '../../components/layout/CaptiongritNavbar';
import CaptiongritFooter from '../../components/layout/CaptiongritFooter';

// Sections
import HeroSection from '../../components/product/HeroSection';
import SocialProofBar from '../../components/product/SocialProofBar';

import CaptionModesSection from '../../components/product/CaptionModesSection';
import HowItWorksSection from '../../components/product/HowItWorksSection';
import FeaturesSection from '../../components/product/FeaturesSection';
import LanguageMarquee from '../../components/product/LanguageMarquee';
import PricingSection from '../../components/product/PricingSection';
import ComparisonSection from '../../components/product/ComparisonSection';
import TestimonialsSection from '../../components/product/TestimonialsSection';
import FaqSection from '../../components/product/FaqSection';
import FinalCtaSection from '../../components/product/FinalCtaSection';
import CheckoutModal from '../../components/product/CheckoutModal';
import SectionDivider from '../../components/ui/SectionDivider';
import BetaTesterModal from '../../components/product/BetaTesterModal';

// Hidden Sections
// import CaseStudiesSection from '../../components/product/CaseStudiesSection';
// import AutomationWorkflowsSection from '../../components/product/AutomationWorkflowsSection';

export default function LandingPage() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isBetaModalOpen, setIsBetaModalOpen] = useState(false);

  // When clicking generic 'Buy Now' buttons, we can open the beta modal instead
  const handleGenericBuyNow = () => {
    setIsBetaModalOpen(true);
  };

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    // HIDING RAZORPAY FOR NOW: Open Beta Modal instead of Checkout
    setIsBetaModalOpen(true);
    // To restore Razorpay, comment out the line above and uncomment the line below:
    // setIsCheckoutOpen(true);
  };

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isCheckoutOpen || isBetaModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isCheckoutOpen, isBetaModalOpen]);

  return (
    <div className="min-h-screen flex flex-col bg-bg-primary font-body text-text-primary selection:bg-accent-primary/30 selection:text-white">
      <CaptiongritNavbar onBuyNow={handleGenericBuyNow} />

      <main className="flex-grow">
        <HeroSection onBuyNow={handleGenericBuyNow} />
        <SocialProofBar />
        <SectionDivider direction="down" />

        <CaptionModesSection />
        <HowItWorksSection />
        <SectionDivider direction="down" />
        <FeaturesSection />
        <LanguageMarquee />
        <SectionDivider direction="down" />
        <PricingSection onBuyNow={handleSelectPlan} />
        <ComparisonSection />
        <SectionDivider direction="down" />
        <TestimonialsSection />
        <FaqSection />
        <FinalCtaSection onBuyNow={handleGenericBuyNow} />

        {/* Hidden Sections */}
        {/* <CaseStudiesSection /> */}
        {/* <AutomationWorkflowsSection /> */}
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

      <BetaTesterModal 
        isOpen={isBetaModalOpen} 
        onClose={() => setIsBetaModalOpen(false)} 
      />

      {/* Premium Floating Notification Button */}
      <button 
        onClick={() => setIsBetaModalOpen(true)}
        className="fixed bottom-8 right-8 z-[90] bg-[#111111] text-white px-6 py-4 rounded-full shadow-[0_0_30px_rgba(198,255,52,0.15)] hover:shadow-[0_0_50px_rgba(198,255,52,0.3)] hover:-translate-y-1 transition-all duration-300 font-semibold flex items-center gap-3 border border-accent-primary/30 group"
      >
        <div className="absolute inset-0 bg-accent-primary/5 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <span className="relative flex h-3 w-3 z-10">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-primary shadow-[0_0_10px_rgba(198,255,52,0.8)]"></span>
        </span>
        <span className="relative z-10 tracking-wide text-sm group-hover:text-accent-primary transition-colors">Join Beta Program</span>
      </button>
    </div>
  );
}
