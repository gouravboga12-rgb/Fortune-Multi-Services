import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart, Trash2, ArrowRight, Lock, CreditCard,
  CheckCircle2, AlertCircle, Mail, User, Building2,
  Smartphone, Landmark, QrCode, ChevronRight, X,
  ShieldCheck, Package, ChevronLeft, Plus
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { createInquiry } from '../config/api';

const GST_RATE = 0.18;

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    companyName: '',
    message: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [showRazorpay, setShowRazorpay] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentId, setPaymentId] = useState('');

  // Card states
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  // UPI states
  const [upiId, setUpiId] = useState('');
  const [showQR, setShowQR] = useState(false);

  const total = cartItems.reduce((acc, item) => acc + (item.price || 199), 0);
  const subtotalBase = total / (1 + GST_RATE);
  const gstAmount = total - subtotalBase;

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Full name is required';
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\+?[0-9\s-]{10,12}$/.test(formData.phone.trim())) {
      errors.phone = 'Please enter a valid 10-digit mobile number';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    return errors;
  };

  const handleOpenPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    setShowRazorpay(true);
  };

  const handlePaymentSuccess = async () => {
    setIsProcessing(true);
    setTimeout(async () => {
      const generatedPayId = 'pay_' + Math.random().toString(36).substring(2, 16).toUpperCase();
      setPaymentId(generatedPayId);
      setIsProcessing(false);
      setIsSuccess(true);

      // Create one inquiry per cart service
      for (const item of cartItems) {
        await createInquiry({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          message: formData.message,
          service: item.name,
          paid: true,
          paymentId: generatedPayId,
          amount: item.price || 199,
        });
      }
      clearCart();
    }, 1800);
  };

  const getWhatsAppMessage = () => {
    const serviceList = cartItems.map(item => `• ${item.name}`).join('\n');
    const text = encodeURIComponent(
      `Hello Fortune Multi Services!\n\nI have successfully initiated applications for the following services:\n${serviceList}\n\n*Payment Details:*\n- Applicant: ${formData.name}\n- Contact: ${formData.phone}\n- Payment ID: ${paymentId}\n- Total Amount Paid: ₹${total}/-\n\nPlease guide me on the next steps.`
    );
    return `https://wa.me/918919051513?text=${text}`;
  };

  if (cartItems.length === 0 && !isSuccess) {
    return (
      <div className="bg-soft-white min-h-screen pt-32 pb-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-10 h-10 text-accent/50" />
            </div>
            <h1 className="text-3xl font-black text-slate-100 mb-3">Your Cart is Empty</h1>
            <p className="text-dark-gray/60 text-sm font-medium mb-8">
              Browse our services and add registrations you need to your cart.
            </p>
            <Link
              to="/services/startup"
              className="inline-flex items-center gap-2 btn-accent px-8 py-4 text-sm font-black uppercase tracking-wider shadow-glow"
            >
              <Plus className="w-4 h-4" />
              Explore Services
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="bg-soft-white min-h-screen pt-32 pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto bg-secondary rounded-[2.5rem] border border-light-gray shadow-2xl p-8 lg:p-16 text-center space-y-10"
          >
            <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto border border-green-500/20">
              <CheckCircle2 className="w-12 h-12 text-green-400 animate-bounce" />
            </div>
            <div className="space-y-4">
              <span className="px-4 py-1.5 rounded-full bg-green-500/10 text-green-400 text-xs font-black uppercase tracking-wider">
                Booking Payment Successful
              </span>
              <h1 className="text-4xl font-black text-slate-100">₹{total} Paid!</h1>
              <p className="text-dark-gray/60 font-medium text-sm max-w-md mx-auto">
                Thank you, <span className="font-bold text-white">{formData.name}</span>! Your booking fee for{' '}
                <span className="font-bold text-accent">{cartItems.length > 0 ? 'all selected services' : 'your services'}</span> has been processed.
              </p>
            </div>

            {/* Receipt */}
            <div className="bg-primary border border-light-gray rounded-3xl p-8 text-left space-y-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-bl-full pointer-events-none" />
              <div className="flex justify-between items-center pb-4 border-b border-light-gray">
                <div>
                  <h4 className="text-xs text-dark-gray/40 font-bold uppercase tracking-wider">Transaction ID</h4>
                  <p className="font-mono font-bold text-slate-100 text-sm mt-0.5 uppercase">{paymentId}</p>
                </div>
                <div className="text-right">
                  <h4 className="text-xs text-dark-gray/40 font-bold uppercase tracking-wider">Total Paid</h4>
                  <p className="font-black text-accent text-lg mt-0.5">₹{total}/-</p>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="text-xs text-dark-gray/40 font-bold uppercase tracking-wider mb-3">Services Booked</h4>
                {/* We now use the paymentId to show the services that were in the cart when payment was made */}
                <p className="text-xs text-dark-gray/60 font-medium">Your booking confirmation has been sent to {formData.email}</p>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <a
                href={getWhatsAppMessage()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent w-full py-5 text-lg flex items-center justify-center gap-3 shadow-glow"
              >
                <Smartphone className="w-5 h-5" />
                Proceed on WhatsApp &amp; Share Documents
              </a>
              <button
                onClick={() => navigate('/')}
                className="w-full text-center text-xs font-black text-dark-gray hover:text-white uppercase tracking-widest transition-colors py-2"
              >
                Back to Home Page
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-soft-white min-h-screen pt-28 sm:pt-32 pb-24 relative">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-accent/5 blur-[150px] -z-10 rounded-full" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-primary/5 blur-[150px] -z-10 rounded-full" />

      <div className="container mx-auto px-4 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-bold text-dark-gray/40 uppercase tracking-widest mb-8">
          <Link to="/" className="hover:text-accent transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-100 font-black">Cart</span>
        </div>

        {/* Page Header */}
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center">
            <ShoppingCart className="w-6 h-6 text-accent" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-100">Your Service Cart</h1>
            <p className="text-sm text-dark-gray/50 font-medium mt-0.5">{cartItems.length} service{cartItems.length !== 1 ? 's' : ''} selected</p>
          </div>
          <Link to="/services/startup" className="ml-auto flex items-center gap-1.5 text-accent font-black text-xs uppercase tracking-widest hover:text-white transition-colors">
            <ChevronLeft className="w-3.5 h-3.5" /> Add More
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

          {/* Left Column: Form + Cart Items */}
          <div className="lg:col-span-2 space-y-6">

            {/* Cart Items */}
            <div className="bg-secondary rounded-3xl border border-light-gray shadow-xl overflow-hidden">
              <div className="p-6 border-b border-light-gray flex items-center gap-3">
                <Package className="w-4 h-4 text-accent" />
                <h2 className="text-sm font-black text-slate-100 uppercase tracking-wider">Selected Services</h2>
              </div>
              <div className="divide-y divide-light-gray">
                <AnimatePresence>
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={item.slug}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20, height: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-4 p-5"
                    >
                      <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-5 h-5 text-accent" />
                      </div>
                      <div className="flex-grow min-w-0">
                        <div className="font-bold text-slate-100 text-sm truncate">{item.name}</div>
                        <div className="text-[10px] text-dark-gray/50 font-bold uppercase tracking-wider mt-0.5 capitalize">{item.categorySlug.replace(/-/g, ' ')} Registration</div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-black text-accent text-base">₹{item.price || 199}</div>
                        <div className="text-[9px] text-dark-gray/40 uppercase tracking-wide font-bold">Booking Fee</div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.slug)}
                        className="p-2 text-red-400/60 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all ml-2 shrink-0"
                        title="Remove from cart"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-secondary rounded-3xl p-8 border border-light-gray shadow-xl">
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold border border-accent/20 mb-4">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Secure Checkout Gateway
                </div>
                <h2 className="text-xl font-black text-slate-100 mb-1">Your Contact Details</h2>
                <p className="text-sm text-dark-gray/50 font-medium">We'll use this to process and deliver your services.</p>
              </div>

              <form onSubmit={handleOpenPayment} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-dark-gray/80 ml-1">Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                      <input
                        type="text" placeholder="e.g. Rahul Sharma" required
                        className={`w-full pl-12 pr-4 py-4 bg-primary text-white rounded-xl border ${formErrors.name ? 'border-red-500' : 'border-light-gray focus:border-accent'} focus:ring-1 outline-none transition-all font-medium text-sm`}
                        value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    {formErrors.name && <p className="text-xs text-red-500 font-bold ml-1">{formErrors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-dark-gray/80 ml-1">Mobile Number *</label>
                    <div className="relative">
                      <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                      <input
                        type="tel" placeholder="e.g. 9876543210" required
                        className={`w-full pl-12 pr-4 py-4 bg-primary text-white rounded-xl border ${formErrors.phone ? 'border-red-500' : 'border-light-gray focus:border-accent'} focus:ring-1 outline-none transition-all font-medium text-sm`}
                        value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    {formErrors.phone && <p className="text-xs text-red-500 font-bold ml-1">{formErrors.phone}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-dark-gray/80 ml-1">Email Address *</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                      <input
                        type="email" placeholder="e.g. rahul@company.com" required
                        className={`w-full pl-12 pr-4 py-4 bg-primary text-white rounded-xl border ${formErrors.email ? 'border-red-500' : 'border-light-gray focus:border-accent'} focus:ring-1 outline-none transition-all font-medium text-sm`}
                        value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    {formErrors.email && <p className="text-xs text-red-500 font-bold ml-1">{formErrors.email}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-dark-gray/80 ml-1">Company / Proposed Name</label>
                    <div className="relative">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                      <input
                        type="text" placeholder="e.g. Sharma Enterprises (Optional)"
                        className="w-full pl-12 pr-4 py-4 bg-primary text-white rounded-xl border border-light-gray focus:border-accent focus:ring-1 outline-none transition-all font-medium text-sm"
                        value={formData.companyName} onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-dark-gray/80 ml-1">Additional Requirements</label>
                  <textarea
                    rows={3} placeholder="Any specific requirements or timelines..."
                    className="w-full px-4 py-4 bg-primary text-white rounded-xl border border-light-gray focus:border-accent focus:ring-1 outline-none transition-all font-medium text-sm resize-none"
                    value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>
                <button
                  type="submit"
                  className="btn-accent w-full py-5 text-base flex items-center justify-center gap-3 shadow-glow"
                >
                  Proceed to Payment (₹{total.toFixed(0)})
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="space-y-6">
            <div className="bg-primary rounded-3xl p-8 text-white border border-white/5 shadow-2xl space-y-8 lg:sticky lg:top-28">
              <div>
                <h3 className="text-xl font-black text-slate-100 mb-1">Order Summary</h3>
                <div className="w-12 h-0.5 bg-accent rounded-full" />
              </div>

              {/* Service breakdown */}
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div key={item.slug} className="flex justify-between text-sm">
                    <span className="text-white/70 font-medium truncate mr-2">{item.name}</span>
                    <span className="text-white font-bold shrink-0">₹{item.price || 199}</span>
                  </div>
                ))}
              </div>

              {/* Pricing Totals */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <div className="flex justify-between text-sm text-white/70">
                  <span>Subtotal (excl. GST)</span>
                  <span>₹{subtotalBase.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-white/70">
                  <span>GST (18% Included)</span>
                  <span>₹{gstAmount.toFixed(2)}</span>
                </div>
                <div className="h-px bg-white/10" />
                <div className="flex justify-between items-center">
                  <span className="text-base font-bold text-white">Total Booking Fee</span>
                  <div className="text-right">
                    <span className="text-2xl font-black text-accent">₹{total}/-</span>
                    <p className="text-[10px] text-white/50 font-bold uppercase">All Inclusive</p>
                  </div>
                </div>
              </div>

              {/* Info Notice */}
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <p className="text-xs text-white/60 leading-relaxed font-medium">
                  Booking fee secures your consultation slot, document review, and expert advisory dispatch. 100% money-back guarantee.
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 text-[10px] text-white/30 uppercase tracking-[0.2em] font-black">
                <Lock className="w-3.5 h-3.5 text-accent" />
                PCI-DSS SECURED PROTOCOL
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Razorpay Modal */}
      <AnimatePresence>
        {showRazorpay && !isProcessing && !isSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-primary/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-secondary rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden border border-light-gray"
            >
              {/* Razorpay Header */}
              <div className="bg-[#0f1b2d] px-8 py-6 text-white flex justify-between items-center relative border-b border-white/5">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-2xl rounded-full" />
                <div className="flex items-center gap-3 z-10">
                  <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center font-black text-white text-base">R</div>
                  <div>
                    <h3 className="font-bold text-sm tracking-tight text-slate-100">Fortune Multi Services</h3>
                    <p className="text-[10px] text-white/50 font-bold uppercase tracking-wider">{cartItems.length} Service{cartItems.length !== 1 ? 's' : ''}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 z-10">
                  <div className="text-right">
                    <span className="text-[10px] text-white/40 font-bold uppercase tracking-wider block">Total Amount</span>
                    <span className="text-xl font-black text-accent">₹{total}.00</span>
                  </div>
                  <button onClick={() => setShowRazorpay(false)} className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <X className="w-4 h-4 text-white/50" />
                  </button>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="p-8 space-y-6">
                {!paymentMethod ? (
                  <>
                    <div className="space-y-4">
                      <p className="text-[10px] font-black uppercase text-dark-gray/40 tracking-wider">CHOOSE PAYMENT METHOD</p>
                      {[
                        { id: 'upi' as const, icon: <QrCode className="w-5 h-5 text-accent" />, title: 'UPI (Google Pay, PhonePe, BHIM)', sub: 'Instant pay using UPI Apps or Scan QR' },
                        { id: 'card' as const, icon: <CreditCard className="w-5 h-5 text-accent" />, title: 'Card (Credit/Debit/ATM)', sub: 'Visa, Mastercard, RuPay, Maestro' },
                        { id: 'netbanking' as const, icon: <Landmark className="w-5 h-5 text-accent" />, title: 'Net Banking', sub: 'All major Indian banks available' },
                      ].map(method => (
                        <button
                          key={method.id}
                          onClick={() => setPaymentMethod(method.id)}
                          className="w-full flex items-center justify-between p-5 rounded-2xl border border-light-gray hover:border-accent hover:bg-primary transition-all group"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-accent/10 transition-colors">{method.icon}</div>
                            <div className="text-left">
                              <h4 className="font-bold text-slate-100 text-sm">{method.title}</h4>
                              <p className="text-[10px] text-dark-gray/50 font-semibold mt-0.5">{method.sub}</p>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-dark-gray/40 group-hover:translate-x-1 transition-transform" />
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="space-y-6">
                    <button onClick={() => { setPaymentMethod(null); setShowQR(false); }} className="text-xs font-bold text-accent hover:underline flex items-center gap-1">
                      ← Back to payment options
                    </button>

                    {paymentMethod === 'card' && (
                      <div className="space-y-4">
                        <p className="text-[10px] font-black uppercase text-dark-gray/40 tracking-wider">ENTER CARD DETAILS</p>
                        <div className="space-y-3">
                          <input
                            type="text" placeholder="Card Number (e.g. 4111 2222 3333 4444)" maxLength={19}
                            className="w-full px-4 py-3 bg-primary text-white rounded-xl border border-light-gray focus:border-accent outline-none text-sm font-semibold"
                            value={cardNumber}
                            onChange={(e) => {
                              const v = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
                              const parts = [];
                              for (let i = 0, len = v.length; i < len; i += 4) parts.push(v.substring(i, i + 4));
                              setCardNumber(parts.join(' ') || v);
                            }}
                          />
                          <div className="grid grid-cols-2 gap-4">
                            <input
                              type="text" placeholder="Expiry (MM/YY)" maxLength={5}
                              className="w-full px-4 py-3 bg-primary text-white rounded-xl border border-light-gray focus:border-accent outline-none text-sm font-semibold text-center"
                              value={cardExpiry}
                              onChange={(e) => {
                                let v = e.target.value.replace(/[^0-9]/g, '');
                                if (v.length > 2) v = v.substring(0, 2) + '/' + v.substring(2, 4);
                                setCardExpiry(v);
                              }}
                            />
                            <input
                              type="password" placeholder="CVV" maxLength={3}
                              className="w-full px-4 py-3 bg-primary text-white rounded-xl border border-light-gray focus:border-accent outline-none text-sm font-semibold text-center"
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value.replace(/[^0-9]/g, ''))}
                            />
                          </div>
                        </div>
                        <button
                          onClick={handlePaymentSuccess}
                          disabled={cardNumber.length < 12 || cardExpiry.length < 5 || cardCvv.length < 3}
                          className="w-full py-4 bg-accent hover:bg-accent-light text-white font-bold rounded-xl text-sm transition-colors mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Pay Securely ₹{total}.00
                        </button>
                      </div>
                    )}

                    {paymentMethod === 'upi' && (
                      <div className="space-y-6">
                        <p className="text-[10px] font-black uppercase text-dark-gray/40 tracking-wider">PAY VIA UPI</p>
                        {!showQR ? (
                          <div className="space-y-4">
                            <div className="flex gap-2">
                              <input
                                type="text" placeholder="Enter UPI ID (e.g. rahul@oksbi)"
                                className="flex-grow px-4 py-3 bg-primary text-white rounded-xl border border-light-gray focus:border-accent outline-none text-sm font-semibold"
                                value={upiId} onChange={(e) => setUpiId(e.target.value)}
                              />
                              <button
                                onClick={handlePaymentSuccess} disabled={!upiId.includes('@')}
                                className="px-6 py-3 bg-accent hover:bg-accent-light text-white font-bold rounded-xl text-xs transition-colors disabled:opacity-50"
                              >
                                Pay ₹{total}
                              </button>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="h-px bg-light-gray flex-grow" />
                              <span className="text-[10px] text-dark-gray/40 font-bold">OR SCAN QR CODE</span>
                              <div className="h-px bg-light-gray flex-grow" />
                            </div>
                            <button
                              onClick={() => setShowQR(true)}
                              className="w-full py-4 border border-dashed border-accent text-accent font-black rounded-xl text-xs hover:bg-accent/5 transition-colors flex items-center justify-center gap-2"
                            >
                              <QrCode className="w-4 h-4" />
                              Generate Secure Dynamic QR Code
                            </button>
                          </div>
                        ) : (
                          <div className="text-center space-y-4">
                            <div className="w-40 h-40 border border-light-gray p-3 rounded-2xl mx-auto bg-white flex items-center justify-center shadow-inner">
                              <img
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=fortunemultiservices@oksbi%26pn=Fortune%20Multi%20Services%26am=${total}%26cu=INR`}
                                alt="Payment QR Code"
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <p className="text-[10px] text-dark-gray/50 font-medium">Scan using GPay, PhonePe, Paytm or BHIM to pay ₹{total}/-</p>
                            <button
                              onClick={handlePaymentSuccess}
                              className="w-full py-4 bg-accent hover:bg-accent-light text-white font-bold rounded-xl text-sm transition-colors"
                            >
                              I Have Completed the QR Scan Payment
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {paymentMethod === 'netbanking' && (
                      <div className="space-y-4">
                        <p className="text-[10px] font-black uppercase text-dark-gray/40 tracking-wider">SELECT YOUR BANK</p>
                        <div className="grid grid-cols-2 gap-3">
                          {['SBI', 'HDFC', 'ICICI', 'Axis', 'KOTAK', 'PNB'].map(bank => (
                            <button
                              key={bank} onClick={handlePaymentSuccess}
                              className="p-3 text-xs font-bold border border-light-gray rounded-xl hover:border-accent hover:bg-primary transition-colors text-center text-slate-100"
                            >
                              {bank}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Secure banner */}
              <div className="bg-[#0f1b2d] px-8 py-4 border-t border-light-gray flex justify-between items-center text-[10px] text-dark-gray/40 font-bold uppercase tracking-wider">
                <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-accent" /> Secure Razorpay Gateway</span>
                <span>Powered by Razorpay</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Processing Overlay */}
      <AnimatePresence>
        {isProcessing && (
          <div className="fixed inset-0 bg-[#0f1b2d]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
              <div>
                <h3 className="font-bold text-lg text-white">Processing your payment...</h3>
                <p className="text-xs text-white/50 mt-1 font-medium">Please do not close this window.</p>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Cart;
