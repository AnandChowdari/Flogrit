import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ShieldCheck, ArrowRight } from 'lucide-react';

export default function CheckoutModal({ isOpen, onClose, selectedPlan }) {
  const [formData, setFormData] = useState({ name: '', email: '' });

  if (!isOpen || !selectedPlan) return null;

  // Since we don't know the exact region from just the plan prop easily here, 
  // we can look it up or pass it down. Assuming selectedPlan has the data.
  // Actually, we passed `plan` from PricingSection which has: { id, data: {price, label, paymentLink}, features, ... }
  // Wait, let's look up the currency from the pricing.js. Since pricing config separates by region,
  // we'll just assume the PricingSection passes down everything we need.
  
  const handleCheckout = (e) => {
    e.preventDefault();
    // Redirect to the configured payment link
    if (selectedPlan.data.paymentLink && selectedPlan.data.paymentLink !== '#') {
      window.location.href = selectedPlan.data.paymentLink;
    } else {
      alert(`Proceeding to payment for ${selectedPlan.data.label} plan... (Placeholder)`);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-lg bg-bg-secondary border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-10"
      >
        <div className="absolute top-4 right-4">
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 text-text-secondary hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-8">
          <h3 className="font-display text-2xl font-bold text-white mb-2">Complete your purchase</h3>
          <p className="text-text-secondary text-sm mb-8">You're getting the <strong className="text-white">{selectedPlan.data.label}</strong> license.</p>

          <div className="glass p-6 mb-8 border-accent-primary/20 bg-accent-primary/5">
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-white text-lg">{selectedPlan.data.label} Plan</span>
              <span className="font-display font-bold text-2xl text-accent-primary">
                {/* Assuming PricingSection passes currency symbol as part of selectedPlan or we just show price */}
                {selectedPlan.data.price}
              </span>
            </div>
            <ul className="space-y-2 text-sm text-text-secondary">
              {selectedPlan.features.filter(f => f.included).slice(0, 4).map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-accent-primary" />
                  {f.name}
                </li>
              ))}
              <li className="text-white/50 text-xs italic pt-2">Plus all other included features...</li>
            </ul>
          </div>

          <form onSubmit={handleCheckout} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Full Name</label>
              <input 
                type="text" 
                required
                className="w-full bg-bg-primary border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-colors"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            
            <div className="mb-8">
              <label className="block text-sm font-medium text-text-secondary mb-1">Email Address</label>
              <input 
                type="email" 
                required
                className="w-full bg-bg-primary border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-colors"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-accent-primary hover:bg-accent-secondary text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(198,255,52,0.2)] hover:shadow-[0_0_25px_rgba(198,255,52,0.4)]"
            >
              Proceed to Payment <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-text-secondary">
            <ShieldCheck className="w-4 h-4 text-accent-primary" />
            Secure · Instant delivery to your email
          </div>
        </div>
      </motion.div>
    </div>
  );
}
