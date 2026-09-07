import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, ShieldCheck, ArrowRight, Loader2, CheckCircle2, AlertTriangle, Copy, Check } from 'lucide-react';
import { createOrderFn, verifyPaymentFn, recoverPaymentFn } from '../../../../lib/payment';

export default function CheckoutModal({ isOpen, onClose, selectedPlan, existingLicenseKey, existingEmail }) {
  const [formData, setFormData] = useState({ name: '', email: existingEmail || '' });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [fulfillmentState, setFulfillmentState] = useState('idle'); // 'idle' | 'activating' | 'success' | 'email_delayed' | 'pending' | 'failed'
  const [createdKey, setCreatedKey] = useState(null);
  const [copied, setCopied] = useState(false);
  const [pendingReceipt, setPendingReceipt] = useState(null);
  const [activationStep, setActivationStep] = useState(0);

  const activationMessages = [
    "Capturing your transaction...",
    "Generating your license key...",
    "Sending your license email...",
    "Connecting to activation server..."
  ];

  useEffect(() => {
    let interval;
    if (fulfillmentState === 'activating') {
      interval = setInterval(() => {
        setActivationStep((prev) => (prev < activationMessages.length - 1 ? prev + 1 : prev));
      }, 1500);
    } else {
      setActivationStep(0);
    }
    return () => clearInterval(interval);
  }, [fulfillmentState]);

  useEffect(() => {
    // Load Razorpay checkout script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    // Check for cached pending payment receipt on mount
    try {
      const cached = localStorage.getItem("captiongrit_pending_payment");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.paymentId && parsed.orderId) {
          setPendingReceipt(parsed);
        }
      }
    } catch (e) {}

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (!isOpen || !selectedPlan) return null;

  const handleCopyKey = () => {
    if (createdKey) {
      navigator.clipboard.writeText(createdKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleRecovery = async (receiptToRecover) => {
    const r = receiptToRecover || pendingReceipt;
    if (!r || !r.paymentId || !r.orderId) return;
    setLoading(true);
    setFulfillmentState("activating");
    setErrorMsg(null);
    try {
      const recResult = await recoverPaymentFn({
        data: {
          paymentId: r.paymentId,
          orderId: r.orderId
        }
      });

      if (recResult.success) {
        try { localStorage.removeItem("captiongrit_pending_payment"); } catch (e) {}
        setCreatedKey(recResult.licenseKey);
        if (recResult.emailSent === false) {
          setFulfillmentState("email_delayed");
        } else {
          setFulfillmentState("success");
        }
      } else {
        setErrorMsg(recResult.error || "Recovery failed. Please contact support with your Payment ID.");
        setFulfillmentState("failed");
      }
    } catch (recErr) {
      setErrorMsg(recErr.message || "Failed to contact recovery server.");
      setFulfillmentState("failed");
    } finally {
      setLoading(false);
    }
  };

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

      if (order?.error) {
        throw new Error(order.error);
      }

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
            setFulfillmentState("activating");
            
            // Save sanitized receipt to localStorage (excluding signature)
            const receiptData = {
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              email: formData.email,
              name: formData.name,
              plan: selectedPlan.data.label,
              timestamp: Date.now()
            };
            setPendingReceipt(receiptData);
            try {
              localStorage.setItem("captiongrit_pending_payment", JSON.stringify(receiptData));
            } catch (e) {}

            // 3. Verify Signature & Fulfill
            const verifyResult = await verifyPaymentFn({
              data: {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                customer_email: formData.email,
                customer_name: formData.name,
                plan_name: selectedPlan.data.label,
                amount: order.amount / 100,
                currency: order.currency,
                existing_license_key: existingLicenseKey
              }
            });

            if (verifyResult.success) {
              try { localStorage.removeItem("captiongrit_pending_payment"); } catch (e) {}
              setCreatedKey(verifyResult.licenseKey);
              if (verifyResult.emailSent === false) {
                setFulfillmentState("email_delayed");
              } else {
                setFulfillmentState("success");
              }
            } else {
              setFulfillmentState("error_success");
            }
          } catch (verifyError) {
            console.error('Verification failed', verifyError);
            setFulfillmentState("error_success");
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
      setErrorMsg(err.message || 'Failed to initialize checkout. Please try again.');
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
          {fulfillmentState === 'activating' ? (
            <div className="text-center py-12 flex flex-col items-center">
              <Loader2 className="w-16 h-16 animate-spin text-accent-primary mb-6" />
              <h3 className="font-display text-2xl font-bold text-white mb-3">Almost there...</h3>
              <p className="text-text-secondary text-sm font-medium h-6 animate-pulse transition-all duration-300">
                {activationMessages[activationStep]}
              </p>
            </div>
          ) : fulfillmentState === 'error_success' ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-accent-primary/10 border border-accent-primary/30 rounded-full flex items-center justify-center mx-auto mb-4 text-accent-primary">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-2">Purchase Successful!</h3>
              <p className="text-text-secondary text-sm mb-6">
                Your purchase was successful and you will receive your email shortly. Kindly wait.
              </p>
              <button
                onClick={onClose}
                className="w-full bg-accent-primary hover:bg-accent-secondary text-black font-bold py-3.5 rounded-xl transition-all"
              >
                Done
              </button>
            </div>
          ) : fulfillmentState === 'success' || fulfillmentState === 'email_delayed' ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-accent-primary/10 border border-accent-primary/30 rounded-full flex items-center justify-center mx-auto mb-4 text-accent-primary">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-2">Purchase Successful!</h3>
              
              {fulfillmentState === 'success' ? (
                <p className="text-text-secondary text-sm mb-6">
                  Your <strong>{selectedPlan.data.label}</strong> license has been activated and we've sent you an email.
                </p>
              ) : (
                <div className="mb-6">
                  <p className="text-text-secondary text-sm mb-3">
                    Your <strong>{selectedPlan.data.label}</strong> license has been activated.
                  </p>
                  <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl text-xs text-left">
                    Your credentials email will arrive shortly. Please copy and save your license key below in the meantime.
                  </div>
                </div>
              )}

              {createdKey && (
                <div className="bg-bg-primary border border-white/10 p-4 rounded-xl mb-6 flex items-center justify-between gap-3">
                  <div className="text-left font-mono font-bold text-lg text-white tracking-widest truncate">
                    {createdKey}
                  </div>
                  <button
                    onClick={handleCopyKey}
                    className="flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold transition-colors shrink-0"
                  >
                    {copied ? <Check className="w-4 h-4 text-accent-primary" /> : <Copy className="w-4 h-4" />}
                    {copied ? "Copied" : "Copy Key"}
                  </button>
                </div>
              )}

              <button
                onClick={onClose}
                className="w-full bg-accent-primary hover:bg-accent-secondary text-black font-bold py-3.5 rounded-xl transition-all"
              >
                Enjoy the Plugin
              </button>
            </div>
          ) : (
            <>
              <h3 className="font-display text-2xl font-bold text-white mb-2">Complete your purchase</h3>
              <p className="text-text-secondary text-sm mb-8">You're getting the <strong className="text-white">{selectedPlan.data.label}</strong> license.</p>

              {pendingReceipt && (fulfillmentState === 'pending' || fulfillmentState === 'failed') && (
                <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-white text-sm">Unfulfilled Payment Found</div>
                      <div className="text-xs text-text-secondary mt-1">
                        Completed payment ID: <span className="font-mono text-amber-400">{pendingReceipt.paymentId}</span>
                      </div>
                      <button
                        onClick={() => handleRecovery(pendingReceipt)}
                        disabled={loading}
                        className="mt-3 px-4 py-2 bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5"
                      >
                        {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <ShieldCheck className="w-3.5 h-3.5" />}
                        Complete Activation Now
                      </button>
                    </div>
                  </div>
                </div>
              )}

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
                    placeholder="you@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    disabled={loading || !!existingEmail}
                    className={`w-full bg-bg-primary border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-colors ${existingEmail ? 'opacity-70 cursor-not-allowed' : ''}`}
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
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
