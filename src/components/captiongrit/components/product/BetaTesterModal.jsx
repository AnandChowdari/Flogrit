import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2, CheckCircle, AlertCircle, X } from 'lucide-react';

export default function BetaTesterModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({ name: '', email: '', info: '' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    const googleSheetsUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL || 'YOUR_GOOGLE_SHEETS_WEB_APP_URL';

    try {
      if (googleSheetsUrl === 'YOUR_GOOGLE_SHEETS_WEB_APP_URL') {
        setTimeout(() => setStatus('success'), 1500);
        return;
      }
      
      const data = new URLSearchParams();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('info', formData.info);

      const response = await fetch(googleSheetsUrl, {
        method: 'POST',
        body: data,
        mode: 'no-cors'
      });
      setStatus('success');
    } catch (error) {
      console.error('Error submitting form:', error);
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
                Beta Program
              </div>
              <h2 className="text-2xl font-bold font-display mb-2">Join Our Beta Test</h2>
              <p className="text-text-secondary text-sm">
                Get early access to Captiongrit's newest features.
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
                <h3 className="text-xl font-bold font-display mb-2">You're on the list!</h3>
                <p className="text-text-secondary text-sm">
                  We'll be in touch soon with more details.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="relative z-10 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      placeholder="John Doe"
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
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="info" className="text-xs font-medium text-text-secondary pl-1">
                    How do you use captions?
                  </label>
                  <textarea
                    id="info"
                    name="info"
                    required
                    rows={3}
                    value={formData.info}
                    onChange={handleChange}
                    className="w-full bg-bg-primary border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-all text-white placeholder-white/30 resize-none"
                    placeholder="Tell us about your workflow..."
                  />
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-3 rounded-xl border border-red-400/20">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <p className="text-xs">Something went wrong. Please try again.</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-accent-primary hover:bg-accent-primary/90 text-white font-medium py-3 px-6 rounded-xl transition-all shadow-[0_0_15px_rgba(var(--color-accent-primary-rgb),0.3)] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Join Beta Program'
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
