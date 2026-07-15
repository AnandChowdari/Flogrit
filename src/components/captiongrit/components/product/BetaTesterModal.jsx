import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2, CheckCircle, AlertCircle, X } from 'lucide-react';

export default function BetaTesterModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const gasUrl = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL || 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';

    try {
      if (gasUrl === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE' && !import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL) {
        // Fallback for demo purposes if URL is not set
        setTimeout(() => setStatus('success'), 1500);
        return;
      }

      const response = await fetch(gasUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          action: "beta_signup",
          name: formData.name,
          email: formData.email
        })
      });
      const data = await response.json();
      if (data.success) {
        setStatus('success');
      } else {
        setErrorMessage(data.reason === "already_registered" ? "Email already registered." : "Error. Try again.");
        setStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage("Network error. Please try again.");
      setStatus('error');
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-bg-secondary p-8 rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-primary/20 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/4"></div>

            <div className="mb-8 text-center relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-primary/10 text-accent-primary font-medium text-xs mb-4 border border-accent-primary/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-primary"></span>
                </span>
                Beta Program • Early Access
              </div>
              <h2 className="text-2xl font-bold font-display mb-2">Get Beta Access</h2>
              <p className="text-text-secondary text-sm">
                Join our beta test and get your license key automatically.
              </p>
            </div>

            {status === 'success' ? (
              <div className="relative z-10 flex flex-col items-center justify-center py-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', bounce: 0.5 }}
                  className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-4"
                >
                  <CheckCircle className="w-8 h-8" />
                </motion.div>
                <h3 className="text-xl font-bold font-display mb-2">Success!</h3>
                <p className="text-text-secondary text-sm">
                  Check your email for your Beta Key.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="relative z-10 space-y-4">
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-medium text-text-secondary pl-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-bg-primary border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-all text-white placeholder-white/30"
                      placeholder="Your Name"
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-medium text-text-secondary pl-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-bg-primary border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-all text-white placeholder-white/30"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-3 rounded-xl border border-red-400/20">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <p className="text-xs">{errorMessage}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-accent-primary hover:bg-accent-primary/90 text-black font-bold py-3 px-4 text-sm sm:text-base rounded-xl transition-all shadow-[0_0_15px_rgba(var(--color-accent-primary-rgb),0.3)] flex items-center justify-center gap-1 sm:gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-4 whitespace-nowrap"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Get Beta Access'
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
