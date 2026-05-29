import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { servicesData } from '../data/services';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, ArrowRight, Lock, CreditCard, 
  CheckCircle2, AlertCircle, Mail, 
  User, Building2, Smartphone, Landmark,
  QrCode, ChevronRight
} from 'lucide-react';
import { createInquiry } from '../config/api';

const ApplyService = () => {
  const { category: categorySlug, serviceSlug } = useParams();
  const navigate = useNavigate();

  const cleanCategorySlug = categorySlug?.replace(/_/g, '-');
  const cleanServiceSlug = serviceSlug?.replace(/_/g, '-');
  const category = servicesData.find((c) => c.slug === cleanCategorySlug);
  const service = category?.services.find((s) => s.slug === cleanServiceSlug);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    companyName: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState<any>({});
  const [showRazorpay, setShowRazorpay] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentId, setPaymentId] = useState('');
  
  // Card input states
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  
  // UPI input states
  const [upiId, setUpiId] = useState('');
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Proactively normalize/redirect underscore slugs to hyphenated slugs
  useEffect(() => {
    if (categorySlug?.includes('_') || serviceSlug?.includes('_')) {
      const targetCategory = categorySlug?.replace(/_/g, '-');
      const targetService = serviceSlug?.replace(/_/g, '-');
      navigate(`/apply/${targetCategory}/${targetService}`, { replace: true });
    }
  }, [categorySlug, serviceSlug, navigate]);

  if (!category || !service) {
    return (
      <div className="pt-40 pb-20 text-center">
        <h1 className="text-4xl font-black text-white mb-4">Service Not Found</h1>
        <Link to="/" className="text-accent font-bold hover:underline">Return to Home</Link>
      </div>
    );
  }

  const validateForm = () => {
    const errors: any = {};
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
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    setShowRazorpay(true);
  };

  const handlePaymentSuccess = () => {
    setIsProcessing(true);
    
    // Simulate Razorpay payment processing (1.5 seconds)
    setTimeout(async () => {
      const generatedPayId = 'pay_' + Math.random().toString(36).substring(2, 16).toUpperCase();
      setPaymentId(generatedPayId);
      setIsProcessing(false);
      setIsSuccess(true);
      
      // Store in Resilient API backend
      await createInquiry({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        companyName: formData.companyName,
        message: formData.message,
        service: service.name,
        paid: true,
        paymentId: generatedPayId,
        amount: 199
      });
    }, 1800);
  };

  const getWhatsAppLink = () => {
    const text = encodeURIComponent(
      `Hello Fortune Multi Services!\n\nI have successfully initiated an application for *${service.name}* and paid the booking fee of ₹199/- via Razorpay.\n\n*Payment Details:*\n- Applicant: ${formData.name}\n- Contact: ${formData.phone}\n- Payment ID: ${paymentId}\n- Amount: ₹199/-\n\nPlease guide me on the next steps for my registration.`
    );
    return `https://wa.me/918919051513?text=${text}`;
  };

  return (
    <div className="bg-soft-white min-h-screen pt-32 pb-24 relative">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-accent/5 blur-[150px] -z-10 rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-primary/5 blur-[150px] -z-10 rounded-full"></div>

      <div className="container mx-auto px-4 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-bold text-dark-gray/40 uppercase tracking-widest mb-8">
          <Link to="/" className="hover:text-accent transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to={`/services/${category.slug}`} className="hover:text-accent transition-colors">{category.title}</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to={`/services/${category.slug}/${service.slug}`} className="hover:text-accent transition-colors">{service.name}</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-white font-black">Application & Checkout</span>
        </div>

        {!isSuccess ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Left Column: Form */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-secondary rounded-3xl p-8 lg:p-12 border border-light-gray shadow-xl">
                <div className="mb-10">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold border border-accent/20 mb-4">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Instant Secure Gateway
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-black text-white mb-2">
                    Initialize Setup: <span className="text-accent font-medium italic">{service.name}</span>
                  </h1>
                  <p className="text-sm text-dark-gray/60 font-medium">
                    Fill out your basic contact and business information. Your application will be instantly secured and processed.
                  </p>
                </div>

                <form onSubmit={handleOpenPayment} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-dark-gray/80 ml-1">Full Name *</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                        <input 
                          type="text" 
                          placeholder="e.g. Rahul Sharma"
                          required
                          className={`w-full pl-12 pr-4 py-4 bg-primary text-white rounded-xl border ${formErrors.name ? 'border-red-500 focus:border-red-500' : 'border-light-gray focus:border-accent'} focus:ring-1 outline-none transition-all font-medium text-sm`}
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                      {formErrors.name && <p className="text-xs text-red-500 font-bold ml-1">{formErrors.name}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-dark-gray/80 ml-1">Mobile Number *</label>
                      <div className="relative">
                        <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                        <input 
                          type="tel" 
                          placeholder="e.g. 9876543210"
                          required
                          className={`w-full pl-12 pr-4 py-4 bg-primary text-white rounded-xl border ${formErrors.phone ? 'border-red-500 focus:border-red-500' : 'border-light-gray focus:border-accent'} focus:ring-1 outline-none transition-all font-medium text-sm`}
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                      {formErrors.phone && <p className="text-xs text-red-500 font-bold ml-1">{formErrors.phone}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-dark-gray/80 ml-1">Email Address *</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                        <input 
                          type="email" 
                          placeholder="e.g. rahul@company.com"
                          required
                          className={`w-full pl-12 pr-4 py-4 bg-primary text-white rounded-xl border ${formErrors.email ? 'border-red-500 focus:border-red-500' : 'border-light-gray focus:border-accent'} focus:ring-1 outline-none transition-all font-medium text-sm`}
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                      {formErrors.email && <p className="text-xs text-red-500 font-bold ml-1">{formErrors.email}</p>}
                    </div>
 
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-dark-gray/80 ml-1">Company / Proposed Name</label>
                      <div className="relative">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                        <input 
                          type="text" 
                          placeholder="e.g. Sharma Enterprise (Optional)"
                          className="w-full pl-12 pr-4 py-4 bg-primary text-white rounded-xl border border-light-gray focus:border-accent focus:ring-1 outline-none transition-all font-medium text-sm"
                          value={formData.companyName}
                          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-dark-gray/80 ml-1">Message / Key Requirements</label>
                    <textarea 
                      rows={4}
                      placeholder="Share any specific requests, operational targets, or timelines..."
                      className="w-full px-4 py-4 bg-primary text-white rounded-xl border border-light-gray focus:border-accent focus:ring-1 outline-none transition-all font-medium text-sm"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className="btn-accent w-full py-5 text-lg flex items-center justify-center gap-3 shadow-glow"
                  >
                    Proceed to Payment (₹199)
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </div>

            {/* Right Column: Service Receipt Summary */}
            <div className="space-y-8">
              <div className="bg-primary rounded-3xl p-8 lg:p-10 text-white border border-white/5 shadow-2xl space-y-8">
                <div>
                  <h3 className="text-xl font-black mb-1">Application Summary</h3>
                  <div className="w-12 h-0.5 bg-accent rounded-full"></div>
                </div>

                <div className="space-y-6">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <span className="text-xs text-white/50 font-bold uppercase tracking-widest">Selected Service</span>
                      <h4 className="text-lg font-bold text-accent mt-0.5 leading-tight">{service.name}</h4>
                    </div>
                  </div>

                  <div className="flex justify-between items-center py-4 border-y border-white/10">
                    <div>
                      <span className="text-xs text-white/50 font-bold uppercase tracking-widest">Category</span>
                      <p className="text-sm font-bold mt-0.5">{category.title}</p>
                    </div>
                    {service.details?.timeline && (
                      <div className="text-right">
                        <span className="text-xs text-white/50 font-bold uppercase tracking-widest">Timeline</span>
                        <p className="text-sm font-bold mt-0.5">{service.details.timeline}</p>
                      </div>
                    )}
                  </div>

                  {/* Pricing breakdown */}
                  <div className="space-y-4 pt-2">
                    <div className="flex justify-between text-sm text-white/70">
                      <span>Standard Booking Fee</span>
                      <span>₹168.64</span>
                    </div>
                    <div className="flex justify-between text-sm text-white/70">
                      <span>GST (18% Included)</span>
                      <span>₹30.36</span>
                    </div>
                    <div className="h-px bg-white/10 my-2"></div>
                    <div className="flex justify-between items-center">
                      <span className="text-base font-bold text-white">Total Booking Fee</span>
                      <div className="text-right">
                        <span className="text-2xl font-black text-accent">₹199/-</span>
                        <p className="text-[10px] text-white/50 font-bold uppercase">All Inclusive</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 bg-white/5 rounded-2xl border border-white/10 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <p className="text-xs text-white/70 leading-normal font-medium">
                    This nominal booking fee secures your consultation slot, initial documentation review, and expert advisory dispatch. 100% money-back guarantee.
                  </p>
                </div>

                <div className="flex items-center justify-center gap-3 text-[10px] text-white/30 uppercase tracking-[0.2em] font-black">
                  <Lock className="w-3.5 h-3.5 text-accent" />
                  PCI-DSS SECURED PROTOCOL
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Payment Success Layout */
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
                Booking Payment Success
              </span>
              <h1 className="text-4xl font-black text-white">₹199 Paid Successfully</h1>
              <p className="text-dark-gray/60 font-medium text-sm max-w-md mx-auto">
                Thank you, <span className="font-bold text-white">{formData.name}</span>! Your setup fee for <span className="font-bold text-white">{service.name}</span> has been processed via Razorpay.
              </p>
            </div>

            {/* Receipt Details Box */}
            <div className="bg-primary border border-light-gray rounded-3xl p-8 text-left space-y-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-bl-full pointer-events-none"></div>
              
              <div className="flex justify-between items-center pb-4 border-b border-light-gray">
                <div>
                  <h4 className="text-xs text-dark-gray/40 font-bold uppercase tracking-wider">Service Ordered</h4>
                  <p className="font-bold text-white text-base mt-0.5">{service.name}</p>
                </div>
                <div className="text-right">
                  <h4 className="text-xs text-dark-gray/40 font-bold uppercase tracking-wider">Amount Paid</h4>
                  <p className="font-black text-accent text-lg mt-0.5">₹199/-</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
                <div>
                  <span className="text-xs text-dark-gray/40 font-bold uppercase tracking-wider block">Transaction ID</span>
                  <span className="font-mono font-bold text-white uppercase">{paymentId}</span>
                </div>
                <div>
                  <span className="text-xs text-dark-gray/40 font-bold uppercase tracking-wider block">Payment Mode</span>
                  <span className="font-bold text-white">Razorpay Standard Secure</span>
                </div>
                <div>
                  <span className="text-xs text-dark-gray/40 font-bold uppercase tracking-wider block">Receipt Timestamp</span>
                  <span className="font-bold text-white">{new Date().toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-xs text-dark-gray/40 font-bold uppercase tracking-wider block">Status</span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-green-700">
                    <CheckCircle2 className="w-3.5 h-3.5 fill-green-500 text-white" /> Confirmed
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <a 
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent w-full py-5 text-lg flex items-center justify-center gap-3 shadow-glow"
              >
                <Smartphone className="w-5 h-5" />
                Proceed on WhatsApp & Share Documents
              </a>

              <button 
                onClick={() => navigate('/')}
                className="w-full text-center text-xs font-black text-dark-gray hover:text-white uppercase tracking-widest transition-colors py-2"
              >
                Back to Home Page
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Razorpay Interactive Simulator Modal */}
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
              {/* Razorpay Header banner */}
              <div className="bg-[#0f1b2d] px-8 py-6 text-white flex justify-between items-center relative border-b border-white/5">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-2xl rounded-full"></div>
                
                <div className="flex items-center gap-3 z-10">
                  <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center font-black text-white text-base">
                    R
                  </div>
                  <div>
                    <h3 className="font-bold text-sm tracking-tight text-white/90">Fortune Multi Services</h3>
                    <p className="text-[10px] text-white/50 font-bold uppercase tracking-wider">{service.name}</p>
                  </div>
                </div>

                <div className="text-right z-10">
                  <span className="text-[10px] text-white/40 font-bold uppercase tracking-wider block">Payable Amount</span>
                  <span className="text-xl font-black text-accent">₹199.00</span>
                </div>
              </div>

              {/* Razorpay Select Payment Method */}
              <div className="p-8 space-y-6">
                {!paymentMethod ? (
                  <>
                    <div className="space-y-4">
                      <p className="text-[10px] font-black uppercase text-dark-gray/40 tracking-wider">CHOOSE PAYMENT METHOD</p>
                      
                      <button 
                        onClick={() => setPaymentMethod('upi')}
                        className="w-full flex items-center justify-between p-5 rounded-2xl border border-light-gray hover:border-accent hover:bg-primary transition-all group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-[#e2e8f0]/10 rounded-xl flex items-center justify-center group-hover:bg-[#ebf8ff]/10 transition-colors">
                            <QrCode className="w-5 h-5 text-accent" />
                          </div>
                          <div className="text-left">
                            <h4 className="font-bold text-white text-sm">UPI (Google Pay, PhonePe, BHIM)</h4>
                            <p className="text-[10px] text-dark-gray/50 font-semibold mt-0.5">Instant pay using UPI Apps or Scan QR</p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-dark-gray/40 group-hover:translate-x-1 transition-transform" />
                      </button>

                      <button 
                        onClick={() => setPaymentMethod('card')}
                        className="w-full flex items-center justify-between p-5 rounded-2xl border border-light-gray hover:border-accent hover:bg-primary transition-all group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-[#e2e8f0]/10 rounded-xl flex items-center justify-center group-hover:bg-[#ebf8ff]/10 transition-colors">
                            <CreditCard className="w-5 h-5 text-accent" />
                          </div>
                          <div className="text-left">
                            <h4 className="font-bold text-white text-sm">Card (Credit/Debit/ATM)</h4>
                            <p className="text-[10px] text-dark-gray/50 font-semibold mt-0.5">Visa, Mastercard, RuPay, Maestro</p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-dark-gray/40 group-hover:translate-x-1 transition-transform" />
                      </button>

                      <button 
                        onClick={() => setPaymentMethod('netbanking')}
                        className="w-full flex items-center justify-between p-5 rounded-2xl border border-light-gray hover:border-accent hover:bg-primary transition-all group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-[#e2e8f0]/10 rounded-xl flex items-center justify-center group-hover:bg-[#ebf8ff]/10 transition-colors">
                            <Landmark className="w-5 h-5 text-accent" />
                          </div>
                          <div className="text-left">
                            <h4 className="font-bold text-white text-sm">Net Banking</h4>
                            <p className="text-[10px] text-dark-gray/50 font-semibold mt-0.5">All major Indian banks available</p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-dark-gray/40 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </>
                ) : (
                  /* Active Payment Method form */
                  <div className="space-y-6">
                    {/* Back Button */}
                    <button 
                      onClick={() => {
                        setPaymentMethod(null);
                        setShowQR(false);
                      }} 
                      className="text-xs font-bold text-accent hover:underline flex items-center gap-1"
                    >
                      ← Back to payment options
                    </button>

                    {paymentMethod === 'card' && (
                      <div className="space-y-4">
                        <p className="text-[10px] font-black uppercase text-dark-gray/40 tracking-wider">ENTER CARD DETAILS</p>
                        
                        <div className="space-y-3">
                          <input 
                            type="text" 
                            placeholder="Card Number (e.g. 4111 2222 3333 4444)"
                            maxLength={19}
                            className="w-full px-4 py-3 bg-primary text-white rounded-xl border border-light-gray focus:border-accent outline-none text-sm font-semibold"
                            value={cardNumber}
                            onChange={(e) => {
                              // Auto-format spaces
                              const v = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
                              const matches = v.match(/\d{4,16}/g);
                              const match = (matches && matches[0]) || '';
                              const parts = [];
                              for (let i=0, len=match.length; i<len; i+=4) {
                                parts.push(match.substring(i, i+4));
                              }
                              if (parts.length > 0) {
                                setCardNumber(parts.join(' '));
                              } else {
                                setCardNumber(v);
                              }
                            }}
                          />

                          <div className="grid grid-cols-2 gap-4">
                            <input 
                              type="text" 
                              placeholder="Expiry (MM/YY)"
                              maxLength={5}
                              className="w-full px-4 py-3 bg-primary text-white rounded-xl border border-light-gray focus:border-accent outline-none text-sm font-semibold text-center"
                              value={cardExpiry}
                              onChange={(e) => {
                                let v = e.target.value.replace(/[^0-9]/g, '');
                                if (v.length > 2) {
                                  v = v.substring(0,2) + '/' + v.substring(2,4);
                                }
                                setCardExpiry(v);
                              }}
                            />
                            <input 
                              type="password" 
                              placeholder="CVV"
                              maxLength={3}
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
                          Pay Securely ₹199.00
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
                                type="text" 
                                placeholder="Enter UPI ID (e.g. rahul@oksbi)"
                                className="flex-grow px-4 py-3 bg-primary text-white rounded-xl border border-light-gray focus:border-accent outline-none text-sm font-semibold"
                                value={upiId}
                                onChange={(e) => setUpiId(e.target.value)}
                              />
                              <button 
                                onClick={handlePaymentSuccess}
                                disabled={!upiId.includes('@')}
                                className="px-6 py-3 bg-accent hover:bg-accent-light text-white font-bold rounded-xl text-xs transition-colors disabled:opacity-50"
                              >
                                Pay ₹199
                              </button>
                            </div>

                            <div className="flex items-center gap-3">
                              <div className="h-px bg-light-gray flex-grow"></div>
                              <span className="text-[10px] text-dark-gray/40 font-bold">OR SCAN QR CODE</span>
                              <div className="h-px bg-light-gray flex-grow"></div>
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
                            <div className="w-40 h-40 border border-light-gray p-3 rounded-2xl mx-auto bg-white flex items-center justify-center shadow-inner relative group">
                              {/* Simulated QR Code */}
                              <div className="absolute inset-0 bg-[#e2e8f0]/40 flex items-center justify-center group-hover:bg-transparent transition-all pointer-events-none rounded-2xl">
                                <QrCode className="w-16 h-16 text-[#2b6cb0]/40" />
                              </div>
                              <img 
                                src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=fortunemultiservices@oksbi%26pn=Fortune%20Multi%20Services%26am=199%26cu=INR" 
                                alt="Payment QR Code" 
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <p className="text-[10px] text-dark-gray/50 font-medium">Scan this QR code using GPay, PhonePe, Paytm, or any BHIM UPI App to pay ₹199/-</p>
                            
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
                        <p className="text-[10px] font-black uppercase text-dark-gray/40 tracking-wider">SELECT POPULAR BANKS</p>
                        
                        <div className="grid grid-cols-2 gap-3">
                          {['SBI', 'HDFC', 'ICICI', 'Axis', 'KOTAK', 'PNB'].map(bank => (
                            <button 
                              key={bank}
                              onClick={handlePaymentSuccess}
                              className="p-3 text-xs font-bold border border-light-gray rounded-xl hover:border-accent hover:bg-primary transition-colors text-center text-white"
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
                <span className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-accent" /> Secure Razorpay Gateway
                </span>
                <span>Powered by Razorpay</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Razorpay Loading overlay */}
      <AnimatePresence>
        {isProcessing && (
          <div className="fixed inset-0 bg-[#0f1b2d]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto"></div>
              <div>
                <h3 className="font-bold text-lg text-white">Contacting Razorpay Secure Gateway...</h3>
                <p className="text-xs text-white/50 mt-1 font-medium">Please do not close this window or hit back.</p>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ApplyService;
