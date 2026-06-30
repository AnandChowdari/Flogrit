import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function CaptiongritPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if the user has already seen the popup
    const hasSeenPopup = localStorage.getItem("flogrit_captiongrit_popup");
    if (!hasSeenPopup) {
      // Delay popup slightly for a better user experience
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setIsOpen(false);
    localStorage.setItem("flogrit_captiongrit_popup", "true");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-50 max-w-sm rounded-2xl border border-white/10 bg-background/80 p-6 shadow-2xl backdrop-blur-xl lg:bottom-10 lg:right-10"
        >
          <button
            onClick={closePopup}
            className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
            aria-label="Close"
          >
            <X size={18} />
          </button>
          
          <div className="mb-2 inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
            New Product Launch
          </div>
          <h3 className="mb-2 font-display text-xl font-bold text-foreground">
            Meet Captiongrit
          </h3>
          <p className="mb-5 text-sm text-muted-foreground">
            Make captions way faster for regional creators. Hindi, Telugu, Tamil, Kannada, and Malayalam. One-time purchase.
          </p>
          
          <div className="flex gap-3">
            <Link
              to="/captiongrit"
              onClick={closePopup}
              className="inline-flex flex-1 items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
            >
              Check it out
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
