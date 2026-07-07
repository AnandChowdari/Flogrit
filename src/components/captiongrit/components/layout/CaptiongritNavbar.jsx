import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowLeft, Menu, X } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';

export default function Navbar({ onBuyNow }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 });

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Languages', href: '#languages' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <header className="fixed inset-x-0 top-3 z-50 mx-3 lg:mx-6">
      <div
        className="relative mx-auto flex h-16 max-w-6xl items-center justify-between overflow-hidden rounded-full border border-white/10 bg-[#0c0c0f]/55 px-3 pl-4 pr-3 backdrop-blur-xl backdrop-saturate-150 lg:px-5"
        style={{
          boxShadow:
            '0 1px 0 0 rgba(255,255,255,0.06) inset, 0 0 40px -10px rgba(198,255,52,0.22), 0 20px 50px -20px rgba(0,0,0,0.7)',
        }}
      >
        <motion.div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-[#C6FF34]"
          style={{ scaleX: progress }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'repeating-linear-gradient(180deg, transparent 0 3px, rgba(255,255,255,0.04) 3px 4px)',
          }}
        />

        <div className="relative z-10 flex items-center gap-2">
          <Link
            to="/"
            className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70 transition-colors hover:text-white sm:inline-flex"
            aria-label="Back to Flogrit"
          >
            <ArrowLeft size={12} /> Flogrit
          </Link>
          <a href="#" className="flex items-center gap-2 group shrink-0">
            <img
              src="/captiongrit-logo.svg"
              alt="Captiongrit"
              className="h-8 w-8 object-contain transition-transform group-hover:scale-110 md:h-9 md:w-9"
            />
            <span className="font-display text-[1.15rem] font-semibold leading-none tracking-[-0.03em] text-white sm:text-[1.3rem]">
              Captiongrit
            </span>
          </a>
        </div>

        <nav className="relative z-10 hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm text-white/60 transition-colors hover:text-white"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="relative z-10 flex items-center gap-2">
          <button
            onClick={onBuyNow}
            className="hidden rounded-full bg-[#C6FF34] px-4 py-2 text-sm font-semibold text-black transition-transform hover:scale-[1.02] md:inline-block"
          >
            Buy now
          </button>
          <button
            className="grid h-9 w-9 place-items-center rounded-md border border-white/15 text-white md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.18 }}
            className="mx-auto mt-2 max-w-6xl rounded-2xl border border-white/10 bg-[#0A0A0A]/95 p-4 shadow-2xl backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 border-b border-white/5 pb-3">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-white/80 hover:bg-white/5 hover:text-white"
              >
                ← Back to Flogrit
              </Link>
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm text-white/70 hover:bg-white/5 hover:text-white"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onBuyNow();
              }}
              className="mt-3 w-full rounded-full bg-[#C6FF34] px-5 py-3 text-center text-sm font-semibold text-black"
            >
              Buy now
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
