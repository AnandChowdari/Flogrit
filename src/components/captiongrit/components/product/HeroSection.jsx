import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { fadeUpVariant, slideRightVariant } from '../../lib/motionVariants';
import CaptiongritPluginDemo from './CaptiongritPluginDemo';

export default function HeroSection({ onBuyNow }) {
  const trustItems = [
    "One-time payment",
    "No subscriptions",
    "24 languages",
    "Works inside Adobe"
  ];

  return (
    <section className="relative pt-28 sm:pt-32 pb-16 sm:pb-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="noise-overlay" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.25fr] gap-10 lg:gap-14 items-center">
          
          {/* Left Text */}
          <motion.div 
            variants={fadeUpVariant}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent-primary/30 bg-accent-primary/5 text-accent-primary text-sm font-semibold mb-8">
              <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse" />
              Now Available — Version 1.0
            </div>
            
            <h1 className="font-display text-[2.6rem] sm:text-5xl md:text-6xl lg:text-[4.5rem] font-black leading-[1.02] mb-5 text-white tracking-tight">
              Don't waste hours.<br />
              <span className="font-accent glow-text text-accent-primary">Create captions in <span className="cg-underline-coral">seconds</span>.</span>
            </h1>

            <p className="text-base md:text-lg font-body text-text-secondary leading-relaxed mb-8 max-w-xl">
              AI-powered captions in 24 languages — One Click, One-Time License. Works inside Adobe Premiere Pro & After Effects.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-8 w-full sm:w-auto">
              <button
                onClick={onBuyNow}
                className="cg-squish bg-accent-primary text-black px-7 py-3.5 rounded-2xl font-black text-base font-display shadow-[6px_6px_0_0_#3B82F6] hover:shadow-[8px_8px_0_0_#3B82F6]"
              >
                Buy Now — from ₹399
              </button>
              <a
                href="#how-it-works"
                className="flex items-center justify-center px-7 py-3.5 rounded-xl font-bold text-base border border-white/15 hover:bg-white/5 transition-all text-white"
              >
                See How It Works
              </a>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {trustItems.map((item, idx) => {
                const rot = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2'][idx % 4];
                return (
                  <div key={idx} className={`flex items-center gap-1.5 text-xs font-bold text-white bg-white/5 border border-white/10 px-3 py-1.5 rounded-full transform ${rot} hover:rotate-0 hover:border-accent-primary/50 transition-transform`}>
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent-primary" />
                    {item}
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Visual: Interactive Plugin Demo */}
          <motion.div 
            variants={slideRightVariant}
            initial="hidden"
            animate="visible"
            className="w-full flex items-center justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-4xl transform lg:rotate-y-[-5deg] lg:rotate-x-[2deg] hover:rotate-y-0 hover:rotate-x-0 transition-transform duration-700 perspective-1000">
              {/* Glow behind demo */}
              <div className="absolute -inset-4 bg-accent-primary/20 rounded-3xl blur-3xl pointer-events-none" />
              
              {/* Demo container */}
              <div className="relative">
                <CaptiongritPluginDemo />
              </div>
              
              {/* Floating badge */}
              <div className="absolute -bottom-3 -right-3 bg-[#3B82F6] text-black rounded-xl px-4 py-2 flex items-center gap-2 shadow-[4px_4px_0_0_#C6FF34] z-10 -rotate-3 hover:rotate-0 transition-transform">
                <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
                <span className="text-xs font-black uppercase tracking-widest">Live Demo</span>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
