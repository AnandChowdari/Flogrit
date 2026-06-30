import { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar({ onBuyNow }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Flogrit', path: '/' },
    { name: 'Features', href: '#features' },
    { name: 'Languages', href: '#languages' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <nav
      className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-[95%] max-w-[680px] px-2 ${
        isScrolled ? 'top-4' : 'top-6'
      }`}
    >
      <div className="flex items-center justify-between gap-4 px-6 py-2.5 rounded-full border border-white/10 bg-[#0c0c0f]/80 backdrop-blur-md shadow-[0_12px_40px_-12px_rgba(0,0,0,0.7)] transition-all duration-300">
        <a href="#" className="flex items-center gap-2 group shrink-0">
          <img src="/logo.svg" alt="Captiongrit Logo" className="w-8 h-8 md:w-9 md:h-9 object-contain group-hover:scale-110 transition-transform rounded-md" />
          <span className="font-display font-bold text-base text-white tracking-wide">Captiongrit</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center justify-between flex-grow pl-6">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => 
              link.path ? (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-xs font-semibold tracking-wide text-text-secondary hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-xs font-semibold tracking-wide text-text-secondary hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              )
            )}
          </div>

          <div className="flex items-center">
            <button
              onClick={onBuyNow}
              className="bg-accent-primary hover:bg-accent-secondary text-black px-5 py-2 rounded-full font-extrabold text-[11px] uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(198,255,52,0.15)] hover:shadow-[0_0_25px_rgba(198,255,52,0.3)] hover:-translate-y-0.5"
            >
              Buy Now
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[calc(100%+12px)] left-2 right-2 glass bg-[#0A0A0A]/95 p-6 flex flex-col gap-4 md:hidden shadow-2xl rounded-2xl border border-white/10"
          >
            <div className="flex flex-col gap-4 border-b border-white/10 pb-4">
              {navLinks.map((link) => 
                link.path ? (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="text-base font-semibold text-white/80 hover:text-white transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    className="text-base font-semibold text-white/80 hover:text-white transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                )
              )}
            </div>
            <button onClick={() => { setMobileMenuOpen(false); onBuyNow(); }} className="bg-accent-primary text-black px-6 py-3.5 text-center font-extrabold text-sm uppercase tracking-wider rounded-xl mt-2">
              Buy Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
