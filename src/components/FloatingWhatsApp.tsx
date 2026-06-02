import { useState, useEffect, useRef } from 'react';
import { X, Send, Sparkles, Phone, ArrowRight, MessageCircle, User, Mail, ArrowLeft, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { servicesData } from '../data/services';
import { createInquiry } from '../config/api';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  link?: { label: string; path: string };
  cta?: boolean;
}

// Inline WhatsApp SVG Logo for premium look matching the images
const WhatsAppLogo = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={`${className} fill-current`} viewBox="0 0 24 24">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.731-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.852.002-2.631-1.019-5.105-2.876-6.964C16.583 1.93 14.113.91 11.488.91c-5.439 0-9.867 4.42-9.871 9.853-.001 1.737.457 3.432 1.328 4.93L1.921 21.6l6.143-1.613c1.472.804 3.125 1.228 4.583 1.228zM17.152 14.5c-.3-.15-1.783-.88-2.063-.98-.28-.1-.484-.15-.688.15-.204.3-.79.98-.969 1.18-.18.2-.359.225-.659.075-.3-.15-1.265-.467-2.41-1.487-.89-.794-1.492-1.775-1.667-2.075-.175-.3-.019-.463.13-.612.135-.133.3-.349.45-.525.15-.175.2-.3.3-.5s.05-.375-.025-.525C9.444 8.944 8.832 7.447 8.577 6.83c-.25-.6-.5-.515-.688-.525-.18-.01-.384-.01-.587-.01-.203 0-.533.076-.812.379-.28.303-1.066 1.042-1.066 2.541s1.092 2.946 1.241 3.148c.15.202 2.15 3.284 5.208 4.605.727.315 1.293.502 1.735.643.73.232 1.393.199 1.918.121.585-.087 1.783-.728 2.033-1.433.25-.705.25-1.312.175-1.43-.076-.12-.28-.198-.58-.348z" />
  </svg>
);

const FloatingWhatsApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatUsingWhatsApp, setChatUsingWhatsApp] = useState(true);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [formErrors, setFormErrors] = useState<any>({});

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const whatsappNumber = "918919051513";
  const defaultMessage = encodeURIComponent("Hello, I would like to get custom compliance and incorporation advice.");

  // Load saved lead data on mount
  useEffect(() => {
    const savedLead = localStorage.getItem('fortune_chat_lead');
    if (savedLead) {
      try {
        const parsed = JSON.parse(savedLead);
        setFormData(parsed);
        setIsFormSubmitted(true);
        // Pre-initialize welcome message with user name
        setMessages([
          {
            id: '1',
            sender: 'bot',
            text: `Hello ${parsed.name}! I am your Fortune AI Business Advisor. 🏛️ Ask me any question about starting a business, GST registration, Trademarks, Food licenses, or corporate filings.`
          }
        ]);
      } catch (e) {
        console.error(e);
      }
    } else {
      // Default fallback welcome
      setMessages([
        {
          id: '1',
          sender: 'bot',
          text: 'Hello! I am your Fortune AI Business Advisor. 🏛️ Ask me any question about starting a business, GST registration, Trademarks, Food licenses, or corporate filings.'
        }
      ]);
    }
  }, []);

  // Sync scroll to bottom in chat messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  const validateForm = () => {
    const errs: any = {};
    if (!formData.name.trim()) {
      errs.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/[^0-9]/g, ''))) {
      errs.phone = 'Please enter a valid 10-digit phone number';
    }
    return errs;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateForm();
    if (Object.keys(errs).length > 0) {
      setFormErrors(errs);
      return;
    }
    setFormErrors({});

    // Save lead in localStorage
    localStorage.setItem('fortune_chat_lead', JSON.stringify(formData));

    // Register lead inquiry via API
    await createInquiry({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      service: chatUsingWhatsApp ? 'WhatsApp Lead' : 'Live Chat Lead',
      message: chatUsingWhatsApp ? 'WhatsApp Live Chat Request' : 'AI Live Chat Initiated',
      paid: false
    });

    // Initialize custom welcome message greeting user by name
    setMessages([
      {
        id: '1',
        sender: 'bot',
        text: `Hello ${formData.name}! I am your Fortune AI Business Advisor. 🏛️ Ask me any question about starting a business, GST registration, Trademarks, Food licenses, or corporate filings.`
      }
    ]);

    if (chatUsingWhatsApp) {
      // Redirect directly to WhatsApp with pre-filled lead message
      const text = encodeURIComponent(
        `Hello! My name is ${formData.name}. Email: ${formData.email}, Phone: ${formData.phone}. I would like to get professional business advice.`
      );
      window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
      
      // Keep chat drawer open in bot mode so they can still interact when they return
      setIsFormSubmitted(true);
    } else {
      // Switch view to active AI bot chat drawer immediately
      setIsFormSubmitted(true);
    }
  };

  const getAiResponse = (query: string) => {
    const q = query.toLowerCase().trim();

    // Scan B2B database
    let bestService: any = null;
    let bestCategory: any = null;

    for (const cat of servicesData) {
      for (const s of cat.services) {
        const words = s.name.toLowerCase().split(/\s+/).filter(w => w.length > 3);
        const matchesName = words.some(word => q.includes(word));
        const matchesTag = s.tag.toLowerCase().includes(q);
        const matchesDesc = s.description && s.description.toLowerCase().includes(q);

        if (matchesName || matchesTag || matchesDesc) {
          bestService = s;
          bestCategory = cat;
          break;
        }
      }
      if (bestService) break;
    }

    if (bestService) {
      const faqText = bestService.faqs && bestService.faqs.length > 0
        ? `\n\n📌 **Key Insight**: ${bestService.faqs[0].question}\n${bestService.faqs[0].answer}`
        : '';

      return {
        text: `I found matching details on **${bestService.name}** under **${bestCategory.title}**:\n\n${bestService.description || ''}${faqText}`,
        link: {
          label: `Open ${bestService.name} Page`,
          path: `/services/${bestCategory.slug}/${bestService.slug}`
        }
      };
    }

    // Keyword Fallbacks
    if (q.includes('gst') || q.includes('tax') || q.includes('compliance')) {
      return {
        text: 'I can help with all GST & Tax Compliances! We handle GST registrations, PF/ESI registrations, and automated filing filings. Would you like to inspect our GST plans?',
        link: { label: 'Explore GST Services', path: '/services/gst' }
      };
    }
    if (q.includes('startup') || q.includes('incorporate') || q.includes('company') || q.includes('incorporation')) {
      return {
        text: 'Looking to start a business? We offer Private Limited Company setups, LLPs, One Person Companies, and Section 8 foundations with all registration certifications included.',
        link: { label: 'Explore Startup incorporations', path: '/services/startup' }
      };
    }
    if (q.includes('trademark') || q.includes('brand') || q.includes('logo') || q.includes('copyright')) {
      return {
        text: 'Protect your intellectual brand registry! We perform comprehensive trademark journal audits, Class searches, and expedited USP registry filings.',
        link: { label: 'Explore Trademark options', path: '/services/trademark' }
      };
    }

    return {
      text: "I want to verify we give you 100% legally accurate filing guidance. You can search any of our 100+ categories, or link directly to one of our Senior Tax Consultants via WhatsApp for immediate live counsel.",
      cta: true
    };
  };

  const handleSend = (textToSend?: string) => {
    const msgText = textToSend || input;
    if (!msgText.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: msgText
    };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');

    setIsTyping(true);
    setTimeout(() => {
      const response = getAiResponse(msgText);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: response.text,
        link: response.link,
        cta: response.cta
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-4 right-3 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">
      {/* Expanded Chat Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="bg-secondary text-dark-gray w-[calc(100vw-24px)] max-w-[360px] sm:w-[400px] h-[540px] sm:h-[570px] rounded-3xl shadow-premium border border-light-gray flex flex-col overflow-hidden mb-3 sm:mb-4"
          >
            {/* Header - changes background dynamically based on mode */}
            <div 
              className={`p-5 flex justify-between items-center text-white relative shrink-0 transition-all duration-300 bg-gradient-to-r ${
                chatUsingWhatsApp && !isFormSubmitted 
                  ? 'from-[#25D366] to-[#128C7E]' 
                  : 'from-accent to-accent-light'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
              <div className="flex items-center gap-3 relative z-10">
                {isFormSubmitted && (
                  <button 
                    onClick={() => setIsFormSubmitted(false)}
                    className="p-1.5 rounded-lg hover:bg-white/10 text-white transition-colors cursor-pointer mr-0.5"
                    title="Back to details"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                )}
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center border border-white/20">
                  {chatUsingWhatsApp && !isFormSubmitted ? (
                    <WhatsAppLogo className="w-6 h-6 text-white" />
                  ) : (
                    <MessageSquare className="w-6 h-6 text-white fill-white" />
                  )}
                </div>
                <div>
                  <div className="font-black text-sm flex items-center gap-1.5">
                    {isFormSubmitted ? "Fortune AI Advisor" : "Live Chat with Experts"}
                    {isFormSubmitted && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>}
                  </div>
                  <div className="text-[10px] text-white/80 font-bold uppercase tracking-wider">
                    {isFormSubmitted ? "Automated Tax & Filing Consultant" : "We're here to help!"}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer flex items-center justify-center"
                aria-label="Close Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Main Area */}
            {!isFormSubmitted ? (
              // Lead Generation Form page (exactly matching reference images)
              <form onSubmit={handleFormSubmit} className="flex-grow p-6 flex flex-col justify-between bg-secondary overflow-y-auto">
                <div className="space-y-4 py-2">
                  {/* Name field */}
                  <div className="space-y-1">
                    <div className="relative flex items-center border border-light-gray focus-within:border-accent rounded-full px-4 py-3 bg-primary transition-all shadow-sm">
                      <User className="w-5 h-5 text-text-muted mr-2.5 shrink-0" />
                      <input
                        type="text"
                        placeholder="Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-transparent border-none outline-none text-white text-sm font-semibold placeholder-text-muted"
                      />
                    </div>
                    {formErrors.name && (
                      <p className="text-[11px] text-red-500 font-bold ml-4">{formErrors.name}</p>
                    )}
                  </div>

                  {/* Email field */}
                  <div className="space-y-1">
                    <div className="relative flex items-center border border-light-gray focus-within:border-accent rounded-full px-4 py-3 bg-primary transition-all shadow-sm">
                      <Mail className="w-5 h-5 text-text-muted mr-2.5 shrink-0" />
                      <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-transparent border-none outline-none text-white text-sm font-semibold placeholder-text-muted"
                      />
                    </div>
                    {formErrors.email && (
                      <p className="text-[11px] text-red-500 font-bold ml-4">{formErrors.email}</p>
                    )}
                  </div>

                  {/* Phone field with prefilled flag */}
                  <div className="space-y-1">
                    <div className="relative flex items-center border border-light-gray focus-within:border-accent rounded-full px-4 py-3 bg-primary transition-all shadow-sm">
                      <div className="flex items-center gap-1 text-dark-gray text-sm font-bold shrink-0 border-r border-light-gray pr-3 mr-2.5">
                        <span>🇮🇳</span>
                        <span className="text-[9px] text-text-muted">▼</span>
                        <span className="text-white font-semibold">+91</span>
                      </div>
                      <input
                        type="tel"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-transparent border-none outline-none text-white text-sm font-semibold placeholder-text-muted"
                      />
                    </div>
                    {formErrors.phone && (
                      <p className="text-[11px] text-red-500 font-bold ml-4">{formErrors.phone}</p>
                    )}
                  </div>
                </div>

                {/* Bottom Toggle & Button Section */}
                <div className="space-y-3 shrink-0 pt-4 border-t border-light-gray mt-4">
                  {/* Toggle Switch */}
                  <div className="flex items-center justify-between py-1">
                    <span className="text-xs sm:text-sm font-bold text-dark-gray">Chat using WhatsApp</span>
                    <button
                      type="button"
                      onClick={() => setChatUsingWhatsApp(!chatUsingWhatsApp)}
                      className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 cursor-pointer outline-none border-none ${
                        chatUsingWhatsApp ? 'bg-[#25D366]' : 'bg-primary'
                      }`}
                    >
                      <span
                        className={`inline-block w-4 h-4 transform rounded-full bg-white shadow transition-transform duration-300 ${
                          chatUsingWhatsApp ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className={`w-full py-4 rounded-full font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98] border-none text-white cursor-pointer ${
                      chatUsingWhatsApp
                        ? 'bg-[#25D366] hover:bg-[#1ebd59]'
                        : 'bg-accent hover:bg-accent-light'
                    }`}
                  >
                    {chatUsingWhatsApp ? (
                      <>
                        <WhatsAppLogo className="w-5 h-5 text-white" />
                        <span>WhatsApp Chat</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-white" />
                        <span>Live Chat</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              // AI chatbot interface
              <div className="flex-grow flex flex-col justify-between overflow-hidden bg-primary">
                {/* Message Area */}
                <div className="flex-grow p-4 overflow-y-auto space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3.5 rounded-2xl text-xs font-semibold leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-accent text-white rounded-tr-none font-bold'
                            : 'bg-card-bg text-dark-gray border border-light-gray rounded-tl-none shadow-sm'
                        }`}
                      >
                        {msg.text.split('\n\n').map((paragraph, i) => (
                          <p key={i} className={i > 0 ? 'mt-2' : ''}>
                            {paragraph.split('\n').map((line, j) => (
                              <span key={j} className="block">
                                {line.startsWith('📌') || line.startsWith('🏛️') ? (
                                  <span className="font-bold text-accent-blue">{line}</span>
                                ) : line}
                              </span>
                            ))}
                          </p>
                        ))}

                        {/* Direct link */}
                        {msg.link && (
                          <Link
                            to={msg.link.path}
                            onClick={() => setIsOpen(false)}
                            className="mt-3 inline-flex items-center gap-1.5 px-3 py-2 bg-secondary hover:bg-accent text-white hover:text-white rounded-lg font-black tracking-wider uppercase text-[10px] transition-colors w-full justify-center border border-light-gray"
                          >
                            {msg.link.label}
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        )}

                        {/* WhatsApp CTA */}
                        {msg.cta && (
                          <a
                            href={`https://wa.me/${whatsappNumber}?text=${defaultMessage}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 inline-flex items-center gap-1.5 px-3 py-2 bg-[#25D366] hover:bg-[#1ebd59] text-white rounded-lg font-black tracking-wider uppercase text-[10px] transition-colors w-full justify-center"
                          >
                            <Phone className="w-3.5 h-3.5 fill-white text-white" />
                            Chat with Live Expert
                          </a>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Typing animation */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-card-bg text-dark-gray border border-light-gray p-4 rounded-2xl rounded-tl-none flex items-center gap-1 shadow-sm">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce"></span>
                        <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-delay:0.2s]"></span>
                        <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-delay:0.4s]"></span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Bottom Input Area */}
                <div className="shrink-0 bg-secondary border-t border-light-gray">
                  {/* Quick Action Chips */}
                  <div className="px-4 py-2 flex gap-2 overflow-x-auto scrollbar-none border-b border-light-gray bg-secondary">
                    {[
                      { label: '📞 Speak to Live Expert', type: 'whatsapp' },
                      { label: '🚀 Setup Pvt Ltd', query: 'Private Limited setup' },
                      { label: '📝 Trademark filing', query: 'Trademark registration' },
                      { label: '💼 Get GSTIN', query: 'GST setup' }
                    ].map((chip) => (
                      <button
                        key={chip.label}
                        onClick={() => {
                          if (chip.type === 'whatsapp') {
                            window.open(`https://wa.me/${whatsappNumber}?text=${defaultMessage}`, '_blank');
                          } else {
                            handleSend(chip.query);
                          }
                        }}
                        className="px-3 py-1.5 bg-card-bg hover:bg-primary border border-light-gray text-[10px] font-bold text-dark-gray hover:text-accent rounded-full whitespace-nowrap transition-all cursor-pointer shrink-0"
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>

                  {/* Input Form */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSend();
                    }}
                    className="p-3 flex gap-2"
                  >
                    <input
                      type="text"
                      placeholder="Ask about Pvt Ltd, GST, Trademarks..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className="flex-grow h-12 px-4 bg-primary border border-light-gray focus:border-accent rounded-full outline-none text-xs font-semibold text-white placeholder-text-muted transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={!input.trim()}
                      className="w-12 h-12 bg-accent hover:bg-accent-light text-white rounded-full flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shrink-0 border-none"
                    >
                      <Send className="w-4 h-4 text-white" />
                    </button>
                  </form>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chat Bubble Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300 relative group cursor-pointer border-none text-white ${
          chatUsingWhatsApp && !isFormSubmitted
            ? 'bg-[#25D366] shadow-[#25D366]/40'
            : 'bg-[#0284C7] shadow-[#0284C7]/40'
        }`}
        aria-label="Toggle AI Advisor & WhatsApp"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close-btn"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="whatsapp-btn"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              className="relative flex items-center justify-center"
            >
              {chatUsingWhatsApp ? (
                <WhatsAppLogo className="w-7 h-7 text-white" />
              ) : (
                <MessageCircle className="w-8 h-8 text-white fill-white" />
              )}
              {!isFormSubmitted && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 text-white font-black text-[9px] rounded-full flex items-center justify-center border-2 border-current">
                  1
                </span>
              )}
              <span 
                className={`absolute -top-12 right-0 text-white text-[10px] font-black uppercase tracking-wider px-3 py-2 rounded-xl shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center gap-1.5 ${
                  chatUsingWhatsApp ? 'bg-[#25D366]' : 'bg-[#0284C7]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
                {chatUsingWhatsApp ? 'WhatsApp Chat' : 'Live Chat AI Advisor'}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
};

export default FloatingWhatsApp;
