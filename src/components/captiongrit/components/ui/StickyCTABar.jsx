import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation, Link } from '@tanstack/react-router';
import { siteConfig } from '../../config/site';

export default function StickyCTABar() {
  const [show, setShow] = useState(false);
  const { pathname } = useLocation();
  const exclude = ['/products/captiongrit', '/contact'];

  useEffect(() => {
    const handler = () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      setShow(pct > 0.5);
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  if (exclude.includes(pathname)) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between gap-4 px-4 py-3 md:px-8
                     bg-[#111111]/90 backdrop-blur-md border-t border-[#1E1E1E]"
        >
          {siteConfig.urgency.enabled && (
            <p className="text-sm font-body text-text-secondary hidden sm:block">
              <span className="text-white font-medium">Only {siteConfig.urgency.spotsLeft} client spots</span> open this month.
            </p>
          )}
          <div className="flex gap-3 w-full sm:w-auto">
            <Link to="/#contact"
               className="flex-1 sm:flex-none px-5 py-2.5 bg-accent-primary text-black text-sm font-semibold font-display rounded-lg
                          hover:bg-accent-secondary transition-colors text-center whitespace-nowrap
                          shadow-[0_0_20px_rgba(198,255,52,0.2)]">
              Book a Discovery Call →
            </Link>
            <Link to="/products/captiongrit"
               className="flex-1 sm:flex-none px-5 py-2.5 border border-accent-primary/40 text-accent-primary text-sm font-display rounded-lg
                          hover:bg-accent-primary/10 transition-colors text-center whitespace-nowrap">
              Get Captiongrit
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
