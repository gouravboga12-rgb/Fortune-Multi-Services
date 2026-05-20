import { useState, useEffect, useRef } from 'react';
import { Bot, X, Send, Sparkles, Phone, ArrowRight, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { servicesData } from '../data/services';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  link?: { label: string; path: string };
  cta?: boolean;
}

const FloatingWhatsApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Hello! I am your Fortune AI Business Advisor. 🏛️ Ask me any question about starting a business, GST registration, Trademarks, Food licenses, or corporate filings.'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const whatsappNumber = "918919051513";
  const defaultMessage = encodeURIComponent("Hello, I would like to get custom compliance and incorporation advice.");

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const getAiResponse = (query: string) => {
    const q = query.toLowerCase().trim();

    // Scan our rich B2B database
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

    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: msgText
    };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');

    // Simulate Bot response
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
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expanded Chat Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="bg-white w-[350px] sm:w-[400px] h-[550px] rounded-3xl shadow-2xl border border-light-gray flex flex-col overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="bg-primary text-white p-5 flex justify-between items-center relative overflow-hidden shrink-0">
              <div className="absolute inset-0 mesh-gradient opacity-20 pointer-events-none"></div>
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center border border-accent/20">
                  <Bot className="w-6 h-6 text-accent animate-pulse" />
                </div>
                <div>
                  <div className="font-black text-sm flex items-center gap-1.5">
                    Fortune AI Advisor
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  </div>
                  <div className="text-[10px] text-white/55 font-bold uppercase tracking-wider">Automated Tax & Filing Consultant</div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors z-10 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Message Area */}
            <div className="flex-grow p-5 overflow-y-auto space-y-4 bg-soft-white">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3.5 rounded-2xl text-xs font-semibold leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-accent text-primary rounded-tr-none font-bold'
                        : 'bg-white text-primary border border-light-gray rounded-tl-none shadow-sm'
                    }`}
                  >
                    {msg.text.split('\n\n').map((paragraph, i) => (
                      <p key={i} className={i > 0 ? 'mt-2' : ''}>
                        {paragraph.split('\n').map((line, j) => (
                          <span key={j} className="block">
                            {line.startsWith('📌') || line.startsWith('🏛️') ? (
                              <span className="font-bold text-accent-dark">{line}</span>
                            ) : line}
                          </span>
                        ))}
                      </p>
                    ))}

                    {/* Direct Service page Link */}
                    {msg.link && (
                      <Link
                        to={msg.link.path}
                        onClick={() => setIsOpen(false)}
                        className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white rounded-lg font-black tracking-wider uppercase text-[10px] hover:bg-accent hover:text-primary transition-colors w-full justify-center"
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
                        className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366] text-white rounded-lg font-black tracking-wider uppercase text-[10px] hover:bg-[#1ebd59] transition-colors w-full justify-center"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        Chat with Live Expert
                      </a>
                    )}
                  </div>
                </div>
              ))}

              {/* Bot typing simulation */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white text-primary border border-light-gray p-4 rounded-2xl rounded-tl-none flex items-center gap-1 shadow-sm">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Action Chips Panel */}
            <div className="p-3 bg-white border-t border-light-gray flex gap-2 overflow-x-auto shrink-0 scrollbar-none">
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
                  className="px-3 py-1.5 bg-soft-white hover:bg-accent/15 border border-light-gray hover:border-accent/30 text-[10px] font-bold text-dark-gray hover:text-accent rounded-xl whitespace-nowrap transition-all duration-300 cursor-pointer shrink-0"
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Message input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-4 bg-white border-t border-light-gray flex gap-2 shrink-0"
            >
              <input
                type="text"
                placeholder="Ask about Pvt Ltd, GST, Trademarks..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-grow h-12 px-4 bg-soft-white border border-light-gray focus:border-accent rounded-xl outline-none text-xs font-semibold placeholder-dark-gray/30 transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="w-12 h-12 bg-primary hover:bg-accent text-white hover:text-primary rounded-xl flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chat Bubble Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-[#25D366] hover:bg-[#1ebd59] text-white rounded-full shadow-lg shadow-[#25D366]/40 flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300 relative group cursor-pointer"
        aria-label="Toggle WhatsApp & AI Advisor"
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
              <MessageCircle className="w-8 h-8 text-white fill-white" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 text-white font-black text-[9px] rounded-full flex items-center justify-center border-2 border-[#25D366]">
                1
              </span>
              <span className="absolute -top-12 right-0 bg-[#25D366] text-white text-[10px] font-black uppercase tracking-wider px-3 py-2 rounded-xl shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
                WhatsApp & AI Advisor
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
};

export default FloatingWhatsApp;

