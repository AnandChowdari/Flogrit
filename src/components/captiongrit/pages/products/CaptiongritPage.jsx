import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

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

// Hidden Sections
// import CaseStudiesSection from '../../components/product/CaseStudiesSection';
// import AutomationWorkflowsSection from '../../components/product/AutomationWorkflowsSection';

export default function LandingPage() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // When clicking generic 'Buy Now' buttons, we can just scroll to pricing or open modal with a default plan
  const handleGenericBuyNow = () => {
    document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setIsCheckoutOpen(true);
  };

  // Prevent background scrolling when modal is open
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
    </div>
  );
}
