import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';
import { createOrderFn, verifyPaymentFn } from '../../../../lib/payment';

export default function CheckoutModal({ isOpen, onClose, selectedPlan }) {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    // Load Razorpay checkout script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (!isOpen || !selectedPlan) return null;

  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const amount = selectedPlan.data.price * 100; // convert to paise / cents
      const currency = selectedPlan.currencyCode || 'INR';

      // 1. Create Order
      const order = await createOrderFn({
        data: {
          amount,
          currency,
          receipt: `rcpt_${Date.now()}`
        }
      });

      console.log('Order created:', order);

      const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_TCxillawqes03z';

      if (!order?.order_id) {
        throw new Error('Failed to retrieve order ID from server.');
      }

      // 2. Open Razorpay Checkout
      const options = {
        key: razorpayKey,
        amount: order.amount,
        currency: order.currency,
        name: 'Flogrit',
        description: `${selectedPlan.data.label} Plan`,
        order_id: order.order_id,
        handler: async function (response) {
          try {
            // 3. Verify Signature
            const verifyResult = await verifyPaymentFn({
              data: {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              }
            });

            if (verifyResult.success) {
              alert('Payment Successful! Welcome to Flogrit.');
              onClose();
            }
          } catch (verifyError) {
            console.error('Verification failed', verifyError);
            setErrorMsg('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
        },
        theme: {
          color: '#C6FF34'
        }
      };

      const rzp = new window.Razorpay(options);
      
      rzp.on('payment.failed', function (response){
        console.error('Payment failed', response.error);
        setErrorMsg(`Payment failed: ${response.error.description}`);
      });
      
      rzp.open();
    } catch (err) {
      console.error('Checkout error:', err);
      setErrorMsg('Failed to initialize checkout. Please try again.');
    } finally {
      setLoading(false);
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

          <div className="glass p-6 mb-6 border-accent-primary/20 bg-accent-primary/5 rounded-xl">
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-white text-lg">{selectedPlan.data.label} Plan</span>
              <span className="font-display font-bold text-2xl text-accent-primary">
                {selectedPlan.currencySymbol || ''}{selectedPlan.data.price}
              </span>
            </div>
            <ul className="space-y-2 text-sm text-text-secondary">
              {selectedPlan.features?.filter(f => f.included).slice(0, 4).map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-accent-primary" />
                  {f.name}
                </li>
              ))}
              <li className="text-white/50 text-xs italic pt-2">Plus all other included features...</li>
            </ul>
          </div>

          {errorMsg && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleCheckout} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Full Name</label>
              <input 
                type="text" 
                required
                className="w-full bg-bg-primary border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-colors"
                placeholder="Your full name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                disabled={loading}
              />
            </div>
            
            <div className="mb-8">
              <label className="block text-sm font-medium text-text-secondary mb-1">Email Address</label>
              <input 
                type="email" 
                required
                className="w-full bg-bg-primary border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-colors"
                placeholder="you@email.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                disabled={loading}
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-accent-primary hover:bg-accent-secondary text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(198,255,52,0.2)] hover:shadow-[0_0_25px_rgba(198,255,52,0.4)] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
              ) : (
                <>Proceed to Payment <ArrowRight className="w-5 h-5" /></>
              )}
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
