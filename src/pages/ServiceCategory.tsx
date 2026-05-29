import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { servicesData } from '../data/services';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, Clock, ArrowRight, 
  HelpCircle, Landmark, FileCheck,
  ChevronDown, ChevronUp, Star, Search, Link2,
  Bot, Sparkles, Send
} from 'lucide-react';
import React, { useState, useEffect } from 'react';

const renderMessageText = (text: string) => {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} className="text-accent font-black">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

const ServiceCategory = () => {
  const { category: slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const cleanSlug = slug?.replace(/_/g, '-');
  const category = servicesData.find((c) => c.slug === cleanSlug);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const details = category?.details;

  // Initialize reviews state with realistic dummy reviews as fallback safely
  const initialReviews = (details && category)
    ? (details.reviews && details.reviews.length > 0
        ? details.reviews
        : [
            {
              name: "Anil Sharma",
              city: "Bengaluru",
              rating: 5,
              review: `Outstanding legal assistance for ${category.title} services. Saved us tons of time and effort. Transparent pricing and exceptional support.`,
              date: "18 May 2026"
            },
            {
              name: "Sneha Reddy",
              city: "Hyderabad",
              rating: 5,
              review: `Highly professional team. They assisted us with compliance filings in the ${category.title} category. Communication was spot-on.`,
              date: "04 May 2026"
            },
            {
              name: "Amit Singhal",
              city: "Pune",
              rating: 4,
              review: `Great advisory and seamless execution. The compliance setup was structured very well. Will definitely use their services again.`,
              date: "20 April 2026"
            }
          ])
    : [];

  const [reviewsList, setReviewsList] = useState(initialReviews);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', city: '', rating: 5, review: '' });

  // AI Assistant chatbot states
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);

  useEffect(() => {
    if (category) {
      setChatMessages([
        {
          sender: 'ai',
          text: `Hi! I'm your Fortune AI Assistant. I can help you choose the right service in **${category.title}**. What are you looking to accomplish today?`
        }
      ]);
    }
  }, [slug, category]);

  const getAiSuggestions = (categorySlug: string) => {
    switch (categorySlug) {
      case 'startup':
        return [
          { label: "Solo business with low compliance", serviceSlug: "proprietorship" },
          { label: "Structure to raise funding", serviceSlug: "private-limited-company" },
          { label: "Partnership with limited liability", serviceSlug: "limited-liability-partnership" },
        ];
      case 'registrations':
        return [
          { label: "Register a food business", serviceSlug: "fssai-license" },
          { label: "Start import/export business", serviceSlug: "import-export-code" },
          { label: "Get MSME registration", serviceSlug: "udyam-registration" },
        ];
      case 'trademark':
        return [
          { label: "Register a brand name / logo", serviceSlug: "trademark-registration" },
          { label: "File a trademark objection reply", serviceSlug: "trademark-objection-reply" },
          { label: "Renew my trademark", serviceSlug: "trademark-renewal" },
        ];
      case 'gst':
        return [
          { label: "Get a new GST registration", serviceSlug: "gst-registration" },
          { label: "File annual return (GSTR-9)", serviceSlug: "gst-annual-return-filing" },
          { label: "GST amendment / address change", serviceSlug: "gst-amendment" },
        ];
      case 'tax-compliance':
        return [
          { label: "File personal tax return (ITR)", serviceSlug: "income-tax-efiling" },
          { label: "Company Annual compliance (ROC)", serviceSlug: "company-compliance" },
          { label: "Onboard new director", serviceSlug: "director-change" },
          { label: "Bookkeeping & CA support", serviceSlug: "bookkeeping" },
        ];
      case 'global':
        return [
          { label: "Incorporate in Dubai (UAE)", serviceSlug: "uae-company-registration" },
          { label: "Register a US LLC / Corporation", serviceSlug: "usa-company-registration" },
          { label: "UK limited company setup", serviceSlug: "uk-company-registration" },
        ];
      default:
        return [];
    }
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim() || !category) return;

    const newMessages = [...chatMessages, { sender: 'user', text }];
    setChatMessages(newMessages);
    setChatInput('');
    setIsAiTyping(true);

    setTimeout(() => {
      const cleanInput = text.toLowerCase();
      let matchedService = null;
      let highestScore = 0;

      category.services.forEach(s => {
        let score = 0;
        const nameLower = s.name.toLowerCase();
        const descLower = (s.description || '').toLowerCase();
        
        if (cleanInput.includes(nameLower) || nameLower.includes(cleanInput)) {
          score += 10;
        }
        
        const words = cleanInput.split(/\s+/).filter(w => w.length > 2);
        words.forEach(w => {
          if (nameLower.includes(w)) score += 3;
          if (descLower.includes(w)) score += 1;
        });

        if (score > highestScore) {
          highestScore = score;
          matchedService = s;
        }
      });

      let globalMatch = null;
      if (highestScore < 3) {
        let highestGlobalScore = 0;
        servicesData.forEach(cat => {
          cat.services.forEach(s => {
            let score = 0;
            const nameLower = s.name.toLowerCase();
            const descLower = (s.description || '').toLowerCase();
            
            if (cleanInput.includes(nameLower) || nameLower.includes(cleanInput)) {
              score += 10;
            }
            
            const words = cleanInput.split(/\s+/).filter(w => w.length > 2);
            words.forEach(w => {
              if (nameLower.includes(w)) score += 3;
              if (descLower.includes(w)) score += 1;
            });

            if (score > highestGlobalScore) {
              highestGlobalScore = score;
              globalMatch = { service: s, categorySlug: cat.slug, categoryTitle: cat.title };
            }
          });
        });
        
        if (highestGlobalScore >= 3 && globalMatch) {
          setIsAiTyping(false);
          setChatMessages([
            ...newMessages,
            {
              sender: 'ai',
              text: `I found a matching service outside of **${category.title}**. You might be looking for **${globalMatch.service.name}** under the **${globalMatch.categoryTitle}** category.`,
              serviceMatch: {
                name: globalMatch.service.name,
                slug: globalMatch.service.slug,
                categorySlug: globalMatch.categorySlug
              }
            }
          ]);
          return;
        }
      }

      setIsAiTyping(false);
      
      if (matchedService) {
        const sObj = matchedService as any;
        setChatMessages([
          ...newMessages,
          {
            sender: 'ai',
            text: `Based on your description, I highly recommend the **${sObj.name}** service. ${sObj.description || 'It matches your requirements perfectly.'}`,
            serviceMatch: {
              name: sObj.name,
              slug: sObj.slug,
              categorySlug: category.slug
            }
          }
        ]);
      } else {
        setChatMessages([
          ...newMessages,
          {
            sender: 'ai',
            text: `I couldn't find a precise match for that in **${category.title}**. Could you describe what you're trying to set up in a different way? Or click one of the suggested questions below.`
          }
        ]);
      }
    }, 1000);
  };

  // Update reviewsList when category slug changes to reload reviews
  useEffect(() => {
    setReviewsList(initialReviews);
  }, [slug, details]);

  // Scroll to hash on load
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [location.hash]);

  // Proactively normalize/redirect underscore slugs to hyphenated slugs
  useEffect(() => {
    if (slug?.includes('_')) {
      navigate(`/services/${slug.replace(/_/g, '-')}`, { replace: true });
    }
  }, [slug, navigate]);

  if (!category) {
    return (
      <div className="pt-40 pb-20 text-center">
        <h1 className="text-4xl font-black text-primary mb-4">Category Not Found</h1>
        <Link to="/" className="text-accent font-bold hover:underline">Return to Home</Link>
      </div>
    );
  }

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const reviewToAdd = {
      ...newReview,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    };
    setReviewsList([reviewToAdd, ...reviewsList]);
    setNewReview({ name: '', city: '', rating: 5, review: '' });
    setIsReviewModalOpen(false);
  };

  const handlePopularSearchClick = (term: string) => {
    const cleanTerm = term.toLowerCase();
    
    // 1. Try to find a matching service in servicesData
    let bestServiceMatch = null;
    let maxServiceOverlap = 0;
    
    const synonyms: { [key: string]: string } = {
      'llp': 'limited liability partnership',
      'opc': 'one person company',
      'pvt ltd': 'private limited company',
      'proprietorship': 'sole proprietorship',
      'it return': 'income tax',
      'itr': 'income tax',
      'gst': 'gst'
    };

    let searchString = cleanTerm;
    for (const [abbr, full] of Object.entries(synonyms)) {
      if (cleanTerm.includes(abbr)) {
        searchString += " " + full;
      }
    }

    for (const cat of servicesData) {
      for (const s of cat.services) {
        const cleanName = s.name.toLowerCase();
        
        // Direct substring check
        if (cleanName && (searchString.includes(cleanName) || cleanName.includes(searchString))) {
          let hash = '';
          if (cleanTerm.includes('document')) {
            hash = '#documents-section';
          } else if (cleanTerm.includes('process') || cleanTerm.includes('step') || cleanTerm.includes('how to')) {
            hash = '#process-section';
          } else if (cleanTerm.includes('benefit') || cleanTerm.includes('advantage')) {
            hash = '#benefits-section';
          } else if (cleanTerm.includes('faq') || cleanTerm.includes('question')) {
            hash = '#faq-section';
          }

          const targetPath = `/services/${cat.slug}/${s.slug}`;
          
          if (location.pathname === targetPath) {
            if (hash) {
              const element = document.getElementById(hash.substring(1));
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            return;
          }

          navigate(targetPath + hash);
          return;
        }

        // Overlapping words check
        const termWords = searchString.split(/\s+/).filter(w => w.length > 2);
        const nameWords = cleanName.split(/\s+/).filter(w => w.length > 2);
        
        let overlap = 0;
        for (const tw of termWords) {
          if (nameWords.some(nw => nw.includes(tw) || tw.includes(nw))) {
            overlap++;
          }
        }
        
        if (overlap > maxServiceOverlap) {
          maxServiceOverlap = overlap;
          bestServiceMatch = { categorySlug: cat.slug, serviceSlug: s.slug };
        }
      }
    }

    if (maxServiceOverlap > 0 && bestServiceMatch) {
      let hash = '';
      if (cleanTerm.includes('document')) {
        hash = '#documents-section';
      } else if (cleanTerm.includes('process') || cleanTerm.includes('step') || cleanTerm.includes('how to')) {
        hash = '#process-section';
      } else if (cleanTerm.includes('benefit') || cleanTerm.includes('advantage')) {
        hash = '#benefits-section';
      } else if (cleanTerm.includes('faq') || cleanTerm.includes('question')) {
        hash = '#faq-section';
      }

      navigate(`/services/${bestServiceMatch.categorySlug}/${bestServiceMatch.serviceSlug}${hash}`);
      return;
    }

    // 2. Try to find a matching category
    for (const cat of servicesData) {
      const cleanTitle = cat.title.toLowerCase();
      if (searchString.includes(cleanTitle) || cleanTitle.includes(searchString)) {
        navigate(`/services/${cat.slug}`);
        return;
      }
    }

    // 3. Fallback: Open global search overlay
    const event = new CustomEvent('open-global-search', { detail: { query: term } });
    window.dispatchEvent(event);
  };

  // Auto-derive related services from same category if not defined
  const relatedServices = details.relatedServices && details.relatedServices.length > 0
    ? details.relatedServices
    : category.services
        .filter(s => s.slug)
        .slice(0, 8)
        .map(s => ({ name: s.name, slug: s.slug!, categorySlug: category.slug }));

  // Auto-generate popular searches if not defined
  const popularSearches = details.popularSearches && details.popularSearches.length > 0
    ? details.popularSearches
    : [
        `${category.title} services`,
        `${category.title} registration documents`,
        `${category.title} filing process`,
        `${category.title} fees and charges`,
        `${category.title} compliance checklist`,
        `best ${category.title} consultant`,
      ];

  return (
    <div className="bg-soft-white min-h-screen">
      {/* Hero Header */}
      <section className="relative pt-32 pb-10 sm:pt-40 sm:pb-20 overflow-hidden bg-primary">
        <div className="absolute inset-0 mesh-gradient opacity-60"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <nav className="flex items-center gap-2 text-white/50 text-xs font-bold uppercase tracking-widest mb-4 sm:mb-6">
              <Link to="/" className="hover:text-accent transition-colors">Home</Link>
              <ArrowRight className="w-3 h-3" />
              <span className="text-accent">Services</span>
            </nav>
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black text-white leading-none tracking-tighter mb-4 sm:mb-8">
              {category.title}
            </h1>
            <p className="text-base sm:text-xl text-white/70 font-medium leading-relaxed max-w-2xl">
              {category.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-10 sm:py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto space-y-12 sm:space-y-20">
            {/* AI Assistant */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative glass-card p-6 sm:p-10 bg-gradient-to-b from-[#0f172a]/98 to-[#0b0f19]/98 border border-white/10 shadow-premium rounded-3xl overflow-hidden group"
            >
              {/* Glowing Background Orbs */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#00d2ff]/5 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

              <div className="relative z-10 flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center border border-accent/35 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
                      <Bot className="w-6 h-6 text-accent" />
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#0f172a] rounded-full"></span>
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white flex items-center gap-1.5 leading-none">
                      Fortune AI Advisor
                      <Sparkles className="w-4 h-4 text-accent animate-pulse" />
                    </h3>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      <p className="text-[10px] text-accent/80 font-bold uppercase tracking-widest leading-none">Online · Instant Assistance</p>
                    </div>
                  </div>
                </div>
                
                {/* Reset Chat utility button */}
                {chatMessages.length > 1 && (
                  <button
                    onClick={() => {
                      if (category) {
                        setChatMessages([
                          {
                            sender: 'ai',
                            text: `Hi! I'm your Fortune AI Assistant. I can help you choose the right service in **${category.title}**. What are you looking to accomplish today?`
                          }
                        ]);
                      }
                    }}
                    className="px-3.5 py-2 bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/30 text-[10px] text-white/70 hover:text-red-400 font-bold uppercase tracking-wider rounded-xl transition-all duration-300 cursor-pointer flex items-center gap-1"
                  >
                    Reset Chat
                  </button>
                )}
              </div>

              {/* Chat window */}
              <div className="relative z-10 h-80 sm:h-[400px] overflow-y-auto border border-white/5 bg-[#070b14]/65 backdrop-blur-md rounded-2xl p-5 space-y-4 mb-6 flex flex-col scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                {chatMessages.map((msg, i) => (
                  <div 
                    key={i} 
                    className={`max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm font-semibold leading-relaxed ${
                      msg.sender === 'user' 
                        ? "bg-accent/15 text-white border border-accent/30 self-end rounded-tr-none ml-auto shadow-md shadow-accent/5" 
                        : "bg-white/5 text-white border border-white/10 self-start rounded-tl-none mr-auto shadow-sm"
                    }`}
                  >
                    <p className="whitespace-pre-line">{renderMessageText(msg.text)}</p>
                    
                    {msg.serviceMatch && (
                      <div className="mt-4 p-4 bg-[#0a0e1a] border border-accent/30 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in shadow-inner shadow-accent/5">
                        <div className="space-y-1">
                          <span className="text-[9px] font-black uppercase text-accent tracking-widest">Recommended Service</span>
                          <div className="text-xs sm:text-sm font-black text-white">{msg.serviceMatch.name}</div>
                        </div>
                        <Link 
                          to={`/services/${msg.serviceMatch.categorySlug}/${msg.serviceMatch.slug}`}
                          className="btn-accent py-2.5 px-5 rounded-xl font-black text-[10px] uppercase tracking-wider text-center flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-glow whitespace-nowrap shrink-0"
                        >
                          View Service Details
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    )}
                  </div>
                ))}
                {isAiTyping && (
                  <div className="bg-white/5 text-white border border-white/10 max-w-[80%] rounded-2xl rounded-tl-none p-4 text-xs font-semibold leading-relaxed self-start mr-auto flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce delay-150"></span>
                    <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce delay-300"></span>
                  </div>
                )}
              </div>

              {/* Suggestions badges */}
              <div className="relative z-10 mb-6">
                <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-3">Suggested Questions</p>
                <div className="flex flex-wrap gap-2.5">
                  {getAiSuggestions(cleanSlug || '').map((sug, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleSendMessage(sug.label)}
                      className="px-4 py-2.5 text-[11px] font-bold text-white/80 bg-white/5 border border-white/10 rounded-full hover:border-accent hover:text-white hover:bg-accent/10 transition-all duration-300 cursor-pointer text-left shadow-sm"
                    >
                      {sug.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input form */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(chatInput);
                }}
                className="relative z-10 flex gap-2.5"
              >
                <div className="relative flex-grow">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder={`Ask our AI what type of ${category.title} service you need...`}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-5 pr-12 py-4 text-xs sm:text-sm text-white outline-none focus:border-accent/80 focus:ring-1 focus:ring-accent/30 transition-all font-semibold placeholder-white/20 shadow-inner"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-white/20">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn-accent p-4 rounded-2xl flex items-center justify-center transition-all shadow-glow hover:shadow-accent/20 hover:scale-105 active:scale-95 shrink-0 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </motion.div>

            {/* Service Cards */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-10">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/5 rounded-xl sm:rounded-2xl flex items-center justify-center border border-white/10">
                  <Landmark className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white">Service Catalog</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {category.services.map((service, i) => {
                  return (
                    <Link 
                      key={i} 
                      to={`/services/${category.slug}/${service.slug}`}
                      className={`block glass-card p-5 sm:p-8 group transition-all duration-500 hover:border-accent/30 hover:shadow-lg`}
                    >
                      <div className="flex items-start justify-between mb-3 sm:mb-4">
                        <div className={`text-xs font-black uppercase tracking-widest text-dark-gray/60 group-hover:text-accent transition-colors`}>
                          {service.tag}
                        </div>
                        <ArrowRight className={`w-4 h-4 sm:w-5 sm:h-5 text-accent group-hover:translate-x-1 transition-transform`} />
                      </div>
                      <h3 className={`text-base sm:text-xl font-bold text-white group-hover:text-accent transition-colors`}>
                        {service.name}
                      </h3>
                    </Link>
                  );
                })}
              </div>
            </motion.div>

            {/* Benefits */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-10">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent/5 rounded-xl sm:rounded-2xl flex items-center justify-center border border-accent/10">
                  <FileCheck className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white">Strategic Advantages</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {category.details.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 glass-card bg-white/5 border border-white/10">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400" />
                    </div>
                    <span className="text-white font-bold text-sm sm:text-base">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Process */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-12">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white">The Engagement Flow</h2>
              </div>
              <div className="relative space-y-6 sm:space-y-10 pl-6 sm:pl-10 border-l-2 border-white/10 ml-3 sm:ml-5">
                {category.details.process.map((step, i) => (
                  <div key={i} className="relative group">
                    <div className="absolute -left-[35px] sm:-left-[51px] top-0 w-4 h-4 sm:w-5 sm:h-5 bg-secondary rounded-full border-4 border-primary group-hover:bg-accent transition-colors shadow-sm"></div>
                    <div className="glass-card p-5 sm:p-8 group-hover:translate-x-2 transition-transform">
                      <div className="text-[10px] font-black text-accent uppercase tracking-widest mb-1 sm:mb-2">Phase 0{i + 1}</div>
                      <h4 className="text-base sm:text-xl font-bold text-white">{step}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* FAQs Section */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-10">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent/5 rounded-xl sm:rounded-2xl flex items-center justify-center border border-accent/10">
                  <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white">Frequently Asked Questions</h2>
              </div>
              <div className="space-y-4">
                {category.faqs.map((faq, i) => (
                  <div key={i} className="glass-card overflow-hidden">
                    <button 
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full p-4 sm:p-6 flex items-center justify-between text-left hover:bg-accent/5 transition-colors gap-3"
                    >
                      <span className="font-bold text-white text-sm sm:text-base">{faq.question}</span>
                      {openFaq === i ? <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-accent shrink-0" /> : <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-accent shrink-0" />}
                    </button>
                    <AnimatePresence>
                      {openFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-4 sm:px-6 pb-4 sm:pb-6 text-dark-gray text-sm font-medium leading-relaxed"
                        >
                          {faq.answer}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="py-14 bg-secondary/20 border-t border-light-gray">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-9 h-9 bg-accent/5 rounded-xl flex items-center justify-center border border-accent/10">
                <Link2 className="w-4 h-4 text-accent" />
              </div>
              <h2 className="text-xl font-black text-white">Related Services</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {relatedServices.map((rs, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={`/services/${rs.categorySlug}/${rs.slug}`}
                    className="glass-card p-4 flex items-center justify-between gap-2 hover:border-accent/30 hover:bg-accent/5 transition-all group"
                  >
                    <span className="text-xs font-bold text-white group-hover:text-accent transition-colors leading-snug">{rs.name}</span>
                    <ArrowRight className="w-3 h-3 text-accent opacity-0 group-hover:opacity-100 shrink-0 transition-all" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Customer Reviews */}
      {reviewsList && reviewsList.length > 0 ? (
        <section className="py-14 border-t border-light-gray">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-9 h-9 bg-accent/5 rounded-xl flex items-center justify-center border border-accent/10">
                <Star className="w-4 h-4 text-accent" />
              </div>
              <h2 className="text-xl font-black text-white">Customer Reviews</h2>
              <span className="ml-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-[10px] font-black uppercase tracking-widest">
                {reviewsList.length} Reviews
              </span>
              <button
                onClick={() => setIsReviewModalOpen(true)}
                className="ml-auto flex items-center gap-1.5 text-accent font-black uppercase text-[10px] tracking-widest hover:text-white transition-colors"
              >
                Write a Review
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {reviewsList.map((review, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-5"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center font-black text-accent text-sm shrink-0">
                      {review.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-bold text-white truncate">{review.name}</div>
                      <div className="text-[10px] text-dark-gray">{review.city} · {review.date}</div>
                    </div>
                    <div className="ml-auto flex items-center gap-0.5 shrink-0">
                      {[...Array(5)].map((_, si) => (
                        <Star
                          key={si}
                          className={`w-3 h-3 ${si < review.rating ? 'text-amber-400 fill-amber-400' : 'text-white/20'}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-dark-gray font-medium leading-relaxed">"{review.review}"</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="py-14 border-t border-light-gray">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 bg-accent/5 rounded-xl flex items-center justify-center border border-accent/10">
                <Star className="w-4 h-4 text-accent" />
              </div>
              <h2 className="text-xl font-black text-white">Customer Reviews</h2>
            </div>
            <div className="glass-card p-8 text-center">
              <Star className="w-10 h-10 text-accent/30 mx-auto mb-3" />
              <p className="text-sm text-dark-gray font-medium mb-4">Be the first to review these services!</p>
              <button
                onClick={() => setIsReviewModalOpen(true)}
                className="btn-accent inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider px-6 py-3"
              >
                Write a Review
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Popular Searches */}
      <section className="py-10 bg-secondary/10 border-t border-light-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-5">
            <Search className="w-4 h-4 text-accent" />
            <h2 className="text-base font-black text-white">Popular Searches</h2>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {popularSearches.map((term, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                onClick={() => handlePopularSearchClick(term)}
                className="px-4 py-2 text-[11px] font-semibold text-dark-gray bg-white/5 border border-white/10 rounded-full hover:border-accent/40 hover:text-white transition-all cursor-pointer text-left"
              >
                {term}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Other Categories CTA */}
      <section className="py-12 sm:py-20 lg:py-24 bg-secondary/30 border-t border-light-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-6 sm:mb-12">Explore Other Excellence Areas</h2>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {servicesData.filter(c => c.slug !== slug).map(c => (
              <Link 
                key={c.slug} 
                to={`/services/${c.slug}`}
                className="px-5 sm:px-8 py-2.5 sm:py-3.5 bg-soft-white border border-light-gray rounded-xl sm:rounded-2xl text-xs font-black text-dark-gray hover:text-white hover:border-accent transition-all shadow-sm"
              >
                {c.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Review Modal ─── */}
      <AnimatePresence>
        {isReviewModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-primary/60 backdrop-blur-md z-[110] flex items-center justify-center p-4"
            onClick={() => setIsReviewModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="glass-card bg-secondary border border-white/10 w-full max-w-md p-6 relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-black text-white mb-4">Write a Customer Review</h3>
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-dark-gray/60 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-accent transition-colors"
                    placeholder="e.g. Amit Sharma"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-dark-gray/60 mb-1">Your City</label>
                  <input
                    type="text"
                    required
                    value={newReview.city}
                    onChange={(e) => setNewReview({ ...newReview, city: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-accent transition-colors"
                    placeholder="e.g. Mumbai"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-dark-gray/60 mb-1">Rating</label>
                  <div className="flex gap-1.5 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        className="p-1 focus:outline-none cursor-pointer"
                      >
                        <Star
                          className={`w-5 h-5 ${star <= newReview.rating ? 'text-amber-400 fill-amber-400' : 'text-white/20 hover:text-amber-400/55'}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-dark-gray/60 mb-1">Your Review</label>
                  <textarea
                    required
                    rows={4}
                    value={newReview.review}
                    onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-accent transition-colors resize-none"
                    placeholder="Describe your experience with our services..."
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsReviewModalOpen(false)}
                    className="flex-1 py-3 border border-white/10 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 btn-accent rounded-xl text-xs font-bold uppercase tracking-widest cursor-pointer"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServiceCategory;
