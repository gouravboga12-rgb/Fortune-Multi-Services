import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { servicesData, type ServiceDetail } from '../data/services';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, FileText, Clock, ArrowRight, 
  ShieldCheck, HelpCircle, FileCheck,
  ChevronDown, ChevronUp, AlertTriangle, ThumbsUp, ThumbsDown,
  ShieldAlert, Award, Star, Search, Link2, ArrowUp, ShoppingCart
} from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { getServices } from '../config/api';

const ServiceDetails = () => {
  const { category: categorySlug, serviceSlug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart, isInCart } = useCart();
  const cleanCategorySlug = categorySlug?.replace(/_/g, '-');
  const cleanServiceSlug = serviceSlug?.replace(/_/g, '-');

  const [categoriesList, setCategoriesList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();
        setCategoriesList(data);
      } catch (err) {
        console.error('Failed to load dynamic services in details page:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const category = categoriesList.find((c) => c.slug === cleanCategorySlug) || servicesData.find((c) => c.slug === cleanCategorySlug);
  const service = category?.services.find((s: any) => s.slug === cleanServiceSlug);
  
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const details = ((service && category) ? (service.details || category.details) : null) as ServiceDetail;

  const [reviewsList, setReviewsList] = useState<any[]>([]);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', city: '', rating: 5, review: '' });
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddToCart = () => {
    if (!service || !category) return;
    if (isInCart(service.slug ?? '')) {
      navigate('/cart');
      return;
    }
    addToCart({
      name: service.name,
      slug: service.slug ?? '',
      categorySlug: category.slug,
      price: service.discountPrice || service.price || 199,
    });
  };

  const handleBuyNow = () => {
    if (!service || !category) return;
    if (!isInCart(service.slug ?? '')) {
      addToCart({
        name: service.name,
        slug: service.slug ?? '',
        categorySlug: category.slug,
        price: service.discountPrice || service.price || 199,
      });
    }
    navigate('/cart');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Update reviewsList when service or details load
  useEffect(() => {
    if (details?.reviews && details.reviews.length > 0) {
      setReviewsList(details.reviews);
    } else if (service) {
      setReviewsList([
        {
          name: "Rajesh Kumar",
          city: "Mumbai",
          rating: 5,
          review: `Extremely smooth and professional experience for our ${service.name}. The team handled all paperwork and completed everything ahead of schedule. Highly recommended!`,
          date: "12 May 2026"
        },
        {
          name: "Sneha Patel",
          city: "Ahmedabad",
          rating: 5,
          review: `Excellent service. They clarified all my doubts about the ${service.name} process and kept me updated at every step. Truly premium experience.`,
          date: "28 April 2026"
        },
        {
          name: "Vikram Malhotra",
          city: "New Delhi",
          rating: 4,
          review: `Very efficient and reliable. Handled our registration without any hassle. A minor delay in government approval, but the team's support was prompt.`,
          date: "15 April 2026"
        }
      ]);
    }
  }, [serviceSlug, details, service]);

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [serviceSlug, location.hash]);

  // Proactively normalize/redirect underscore slugs to hyphenated slugs
  useEffect(() => {
    if (categorySlug?.includes('_') || serviceSlug?.includes('_')) {
      const targetCategory = categorySlug?.replace(/_/g, '-');
      const targetService = serviceSlug?.replace(/_/g, '-');
      navigate(`/services/${targetCategory}/${targetService}`, { replace: true });
    }
  }, [categorySlug, serviceSlug, navigate]);

  if (loading && categoriesList.length === 0) {
    return (
      <div className="pt-40 pb-20 text-center bg-primary min-h-screen flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs text-slate-400 mt-4 font-semibold">Loading service details...</p>
      </div>
    );
  }

  if (!category || !service) {
    return (
      <div className="pt-40 pb-20 text-center">
        <h1 className="text-4xl font-black text-primary mb-4">Service Not Found</h1>
        <Link to="/" className="text-accent font-bold hover:underline">Return to Home</Link>
      </div>
    );
  }

  const faqs = details?.faqs || category.faqs;

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
    
    // 1. Try to find a matching service in availableCategories
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

    const availableCategories = categoriesList.length > 0 ? categoriesList : servicesData;

    for (const cat of availableCategories) {
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
        const termWords = searchString.split(/\s+/).filter((w: string) => w.length > 2);
        const nameWords = cleanName.split(/\s+/).filter((w: string) => w.length > 2);
        
        let overlap = 0;
        for (const tw of termWords) {
          if (nameWords.some((nw: string) => nw.includes(tw) || tw.includes(nw))) {
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
    for (const cat of availableCategories) {
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
  const relatedServices = details?.relatedServices && details.relatedServices.length > 0
    ? details.relatedServices
    : category.services
        .filter((s: any) => s.slug !== service.slug && s.slug)
        .slice(0, 6)
        .map((s: any) => ({ name: s.name, slug: s.slug!, categorySlug: category.slug }));

  // Auto-generate popular searches if not defined
  const popularSearches = details.popularSearches && details.popularSearches.length > 0
    ? details.popularSearches
    : [
        `${service.name} registration`,
        `${service.name} documents required`,
        `${service.name} process in India`,
        `${service.name} fees and charges`,
        `${service.name} benefits`,
        `${service.name} eligibility criteria`,
        `how to apply for ${service.name}`,
        `${service.name} vs other options`,
        `${service.name} online registration`,
        `${service.name} time required`,
      ];

  return (
    <div className="bg-soft-white min-h-screen pb-24">

      {/* ─── Hero Header ─── */}
      <section className="relative pt-28 sm:pt-36 lg:pt-40 pb-12 sm:pb-16 lg:pb-24 overflow-hidden bg-primary">
        <div className="absolute inset-0 mesh-gradient opacity-60" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            {/* Breadcrumb */}
            <nav className="flex flex-wrap items-center gap-2 text-white/50 text-xs font-bold uppercase tracking-widest mb-6">
              <Link to="/" className="hover:text-accent transition-colors">Home</Link>
              <ArrowRight className="w-3 h-3" />
              <Link to={`/services/${category.slug}`} className="hover:text-accent transition-colors">{category.title}</Link>
              <ArrowRight className="w-3 h-3" />
              <span className="text-accent">{service.name}</span>
            </nav>

            {/* Badges */}
            <div className="flex flex-wrap gap-3 mb-6">
              {details.targetAudience && (
                <span
                  className={`px-3 py-1.5 rounded-xl bg-accent/20 border border-accent/30 text-accent text-[10px] leading-relaxed max-w-full inline-block ${
                    details.targetAudience.length <= 40
                      ? 'rounded-full uppercase tracking-widest font-black'
                      : 'normal-case tracking-normal font-semibold'
                  }`}
                >
                  <span className="font-black uppercase tracking-widest">Best For: </span>
                  {details.targetAudience}
                </span>
              )}
              {details.timeline && (
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white/80 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 shrink-0">
                  <Clock className="w-3 h-3 text-accent" /> {details.timeline}
                </span>
              )}
            </div>

            <h1 className="text-3xl lg:text-4xl font-black text-slate-100 leading-tight tracking-tight mb-5">
              {service.name}
            </h1>
            <p className="text-sm text-white/70 font-medium leading-relaxed max-w-2xl mb-6">
              {service.description || `Professional ${service.name} services tailored for your business needs.`}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Main Grid: Left content + Right sidebar ─── */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* ══════ LEFT COLUMN: Sticky Sidebar (1/3 width) ══════ */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:sticky lg:top-24 flex flex-col gap-4 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto pr-2 sidebar-scrollbar"
              >

                {/* Documents Required */}
                {details.documents && details.documents.length > 0 && (
                  <div id="documents-section" className="glass-card p-6 bg-secondary/40 text-slate-100 border-white/10 shadow-premium">
                    <div className="flex items-center gap-2.5 mb-4">
                      <FileText className="w-4 h-4 text-accent" />
                      <h3 className="text-sm font-black tracking-tight text-slate-100">Documents Required</h3>
                    </div>
                    <ul className="space-y-2.5">
                      {details.documents.map((doc, i) => (
                        <li key={i} className="flex items-start gap-2 text-[11px] text-white/60 font-medium leading-relaxed">
                          <div className="w-1.5 h-1.5 bg-accent rounded-full shrink-0 mt-1.5" />
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              </motion.div>
            </div>

            {/* ══════ RIGHT COLUMN: Main Content (2/3 width) ══════ */}
            <div className="lg:col-span-2 space-y-12">

              {/* 1 ── What is this service about? */}
              {details.overview && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="glass-card p-6 bg-secondary/40 border-white/10 shadow-premium relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 blur-2xl rounded-full" />
                  <h2 className="text-lg font-black text-slate-100 mb-4">What is this service about?</h2>
                  <p className="text-dark-gray text-xs font-medium leading-relaxed whitespace-pre-line">
                    {details.overview}
                  </p>
                </motion.div>
              )}

              {/* 2 ── Key Characteristics */}
              {details.characteristics && details.characteristics.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <SectionHeader icon={<ShieldAlert className="w-4 h-4 text-accent" />} title="Key Characteristics" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
                    {details.characteristics.map((char, i) => (
                      <div key={i} className="flex gap-3 p-3.5 glass-card bg-secondary/40 border border-white/10 shadow-premium">
                        <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                          <Award className="w-2.5 h-2.5 text-accent" />
                        </div>
                        <p className="text-slate-100 font-medium leading-relaxed text-[11px]">{char}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* 3 ── Strategic Advantages */}
              {details.benefits && details.benefits.length > 0 && (
                <motion.div
                  id="benefits-section"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <SectionHeader icon={<FileCheck className="w-4 h-4 text-accent" />} title="Strategic Advantages" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
                    {details.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-2.5 p-3.5 glass-card bg-secondary/40 border border-white/10 shadow-premium">
                        <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-2.5 h-2.5 text-green-500" />
                        </div>
                        <span className="text-slate-100 font-medium text-[11px] leading-relaxed">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* 4 ── Pros & Cons */}
              {((details.pros && details.pros.length > 0) || (details.cons && details.cons.length > 0)) && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <SectionHeader icon={<ThumbsUp className="w-4 h-4 text-accent" />} title="Advantages (Pros) and Disadvantages (Cons)" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    {details.pros && details.pros.length > 0 && (
                      <div className="glass-card p-6 bg-green-500/[0.02] border border-green-500/10">
                        <div className="flex items-center gap-3 mb-5">
                          <div className="w-9 h-9 rounded-xl bg-green-500/10 flex items-center justify-center">
                            <ThumbsUp className="w-4 h-4 text-green-500" />
                          </div>
                          <h3 className="text-sm font-black text-green-400">Advantages (Pros)</h3>
                        </div>
                        <ul className="space-y-2.5">
                          {details.pros.map((pro, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-dark-gray font-medium leading-relaxed">
                              <span className="text-green-500 mt-0.5 font-bold shrink-0">✓</span>
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {details.cons && details.cons.length > 0 && (
                      <div className="glass-card p-6 bg-red-500/[0.02] border border-red-500/10">
                        <div className="flex items-center gap-3 mb-5">
                          <div className="w-9 h-9 rounded-xl bg-red-500/10 flex items-center justify-center">
                            <ThumbsDown className="w-4 h-4 text-red-500" />
                          </div>
                          <h3 className="text-sm font-black text-red-400">Disadvantages (Cons)</h3>
                        </div>
                        <ul className="space-y-2.5">
                          {details.cons.map((con, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-dark-gray font-medium leading-relaxed">
                              <span className="text-red-400 mt-0.5 font-bold shrink-0">✗</span>
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* 5 ── Registration Process Flow */}
              {details.process && details.process.length > 0 && (
                <motion.div
                  id="process-section"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <SectionHeader icon={<Clock className="w-4 h-4 text-white" />} title="Registration Process Flow — Steps to Register" iconBg="bg-secondary" />
                  <div className="relative space-y-4 pl-8 border-l-2 border-white/10 ml-4 mt-8">
                    {details.process.map((step, i) => (
                      <div key={i} className="relative group">
                        <div className="absolute -left-[41px] top-1 w-4 h-4 bg-secondary rounded-full border-4 border-primary group-hover:bg-accent transition-colors shadow-sm" />
                        <div className="glass-card p-4 bg-secondary/40 border-white/10 shadow-premium group-hover:translate-x-1 transition-transform">
                          <div className="text-[9px] font-black text-accent uppercase tracking-widest mb-1">
                            Phase {String(i + 1).padStart(2, '0')}
                          </div>
                          <h4 className="text-sm font-semibold text-slate-100">{step}</h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* 6 ── Common Mistakes to Avoid */}
              {details.commonMistakes && details.commonMistakes.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="glass-card p-7 bg-amber-500/[0.02] border border-amber-500/25 shadow-premium"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                      <AlertTriangle className="w-5 h-5 text-amber-500" />
                    </div>
                    <h2 className="text-base font-black text-slate-100">Common Mistakes to Avoid</h2>
                  </div>
                  <ul className="space-y-3">
                    {details.commonMistakes.map((mistake, i) => (
                      <li key={i} className="flex gap-2.5 text-xs text-dark-gray font-medium leading-relaxed">
                        <span className="text-amber-500 shrink-0 font-bold mt-0.5">•</span>
                        <span>{mistake}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* 7 ── Post-Registration Compliances */}
              {details.postCompliances && details.postCompliances.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <SectionHeader icon={<ShieldCheck className="w-4 h-4 text-accent" />} title="Post-Registration Compliances" />
                  <div className="glass-card p-6 bg-secondary/40 border-white/10 shadow-premium mt-6">
                    <p className="text-xs font-medium text-dark-gray/60 leading-relaxed mb-5">
                      Maintaining compliances after registration is critical to prevent penalties, keep your business active, and protect your reputation.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {details.postCompliances.map((compliance, i) => (
                        <div key={i} className="flex items-start gap-2.5 p-3.5 bg-primary/40 rounded-xl border border-white/10">
                          <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                            <span className="text-accent text-[10px] font-black">!</span>
                          </div>
                          <span className="text-slate-100 font-semibold text-[11px] leading-snug">{compliance}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* 8 ── Frequently Asked Questions */}
              {faqs && faqs.length > 0 && (
                <motion.div
                  id="faq-section"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <SectionHeader icon={<HelpCircle className="w-4 h-4 text-accent" />} title="Frequently Asked Questions" />
                  <div className="space-y-3 mt-6">
                    {faqs.map((faq: any, i: number) => (
                      <div key={i} className="glass-card bg-secondary/40 border border-white/10 shadow-premium overflow-hidden">
                        <button
                          onClick={() => setOpenFaq(openFaq === i ? null : i)}
                          className="w-full p-5 flex items-center justify-between text-left hover:bg-accent/5 transition-colors"
                        >
                          <span className="text-sm font-semibold text-slate-100 pr-4">{faq.question}</span>
                          {openFaq === i
                            ? <ChevronUp className="w-4 h-4 text-accent shrink-0" />
                            : <ChevronDown className="w-4 h-4 text-accent shrink-0" />}
                        </button>
                        <AnimatePresence>
                          {openFaq === i && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="px-5 pb-5 text-dark-gray text-xs font-medium leading-relaxed"
                            >
                              {faq.answer}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 9: Related Services ─── */}
      {relatedServices.length > 0 && (
        <section className="py-14 bg-secondary/20 border-t border-light-gray">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-9 h-9 bg-accent/5 rounded-xl flex items-center justify-center border border-accent/10">
                <Link2 className="w-4 h-4 text-accent" />
              </div>
              <h2 className="text-xl font-black text-slate-100">Related Services</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {relatedServices.map((rs: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={`/services/${rs.categorySlug}/${rs.slug}`}
                    className="glass-card p-4 bg-secondary/40 border-white/10 shadow-premium flex items-center justify-between gap-2 hover:border-accent/30 hover:bg-accent/5 transition-all group"
                  >
                    <span className="text-xs font-bold text-slate-100 group-hover:text-accent transition-colors leading-snug">{rs.name}</span>
                    <ArrowRight className="w-3 h-3 text-accent opacity-0 group-hover:opacity-100 shrink-0 transition-all" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── 10: Customer Reviews ─── */}
      {reviewsList && reviewsList.length > 0 ? (
        <section className="py-14 border-t border-light-gray">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-9 h-9 bg-accent/5 rounded-xl flex items-center justify-center border border-accent/10">
                <Star className="w-4 h-4 text-accent" />
              </div>
              <h2 className="text-xl font-black text-slate-100">Customer Reviews</h2>
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
                  className="glass-card p-5 bg-secondary/40 border-white/10 shadow-premium"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center font-black text-accent text-sm shrink-0">
                      {review.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-bold text-slate-100 truncate">{review.name}</div>
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
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 bg-accent/5 rounded-xl flex items-center justify-center border border-accent/10">
                <Star className="w-4 h-4 text-accent" />
              </div>
              <h2 className="text-xl font-black text-slate-100">Customer Reviews</h2>
            </div>
            <div className="glass-card p-8 bg-secondary/40 border-white/10 shadow-premium text-center">
              <Star className="w-10 h-10 text-accent/30 mx-auto mb-3" />
              <p className="text-sm text-dark-gray font-medium mb-4">Be the first to review this service!</p>
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

      {/* ─── 11: Popular Searches ─── */}
      <section className="py-10 bg-secondary/10 border-t border-light-gray">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-3 mb-5">
            <Search className="w-4 h-4 text-accent" />
            <h2 className="text-base font-black text-slate-100">Popular Searches</h2>
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
                className="px-4 py-2 text-[11px] font-semibold text-dark-gray bg-secondary/40 border border-white/10 rounded-full hover:bg-accent/10 hover:text-accent transition-all cursor-pointer text-left"
              >
                {term}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Other Services in Category ─── */}
      <section className="py-20 bg-secondary/30 border-t border-light-gray">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-2xl font-black text-slate-100 mb-10">
            Explore Other <span className="text-accent">{category.title}</span> Services
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {category.services
              .filter((s: any) => s.slug !== service.slug)
              .map((s: any) => (
                <Link
                  key={s.slug}
                  to={`/services/${category.slug}/${s.slug}`}
                  className="px-6 py-3 bg-soft-white border border-light-gray rounded-2xl text-xs font-black text-dark-gray hover:text-white hover:border-accent/50 hover:bg-accent/10 transition-all shadow-sm"
                >
                  {s.name}
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
              className="glass-card bg-secondary border border-white/15 w-full max-w-md p-6 relative overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-black text-slate-100 mb-4">Write a Customer Review</h3>
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

      {/* Scroll to Top Button (Mobile only) */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-24 right-4 z-[99] sm:hidden w-12 h-12 rounded-full bg-[#0284C7] text-white flex items-center justify-center shadow-lg shadow-[#0284C7]/30 hover:scale-105 active:scale-95 transition-all cursor-pointer border-none"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5 text-white" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ─── Floating Action Bar — All screens ─── */}
      <div className="fixed bottom-0 left-0 right-0 z-[98] pb-4 lg:pb-6 px-3 sm:px-6">
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 26, delay: 0.4 }}
          className="floating-action-bar relative overflow-hidden backdrop-blur-2xl border border-transparent shadow-[0_-4px_60px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.05)] flex items-center rounded-2xl lg:rounded-[20px] max-w-3xl lg:mx-auto px-4 sm:px-6 lg:px-6 py-3 sm:py-3.5 lg:py-0 lg:h-[68px]"
        >
          {/* Ambient glow */}
          <div className="absolute left-1/4 top-0 w-64 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent pointer-events-none" />
          <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-40 h-40 bg-accent/5 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-40 h-40 bg-[#7C3AED]/8 blur-3xl rounded-full pointer-events-none" />

          {/* ── Mobile layout ── */}
          <div className="flex items-center justify-between w-full lg:hidden gap-2">
            <div className="flex flex-col shrink-0">
              <span className="fab-label text-[8px] font-black uppercase tracking-[0.18em]">BOOKING FEE</span>
              <span className="fab-value text-base sm:text-lg font-black leading-tight mt-0.5">
                ₹199<span className="fab-sub text-[10px] font-semibold">/service</span>
              </span>
              <span className="fab-sub text-[8px] font-medium">+ 18% GST included</span>
            </div>
            <div className="flex items-center gap-2 min-w-0">
              <motion.button
                whileTap={{ scale: 0.94 }}
                onClick={handleAddToCart}
                className={`flex items-center justify-center gap-1.5 rounded-xl px-2.5 sm:px-3.5 py-2.5 font-black text-[10px] sm:text-xs uppercase tracking-wider transition-all duration-300 shrink-0 ${
                  service.slug && isInCart(service.slug)
                    ? 'bg-green-500/20 border border-green-500 text-green-400'
                    : 'border border-[#7C3AED] text-slate-200 hover:bg-[#7C3AED]/15'
                }`}
              >
                <span>{service.slug && isInCart(service.slug) ? 'GO TO CART' : 'ADD TO CART'}</span>
                <ShoppingCart className="w-3.5 h-3.5" />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.94 }}
                onClick={handleBuyNow}
                className="flex items-center justify-center gap-1.5 rounded-xl px-3 sm:px-4 py-2.5 font-black text-[10px] sm:text-xs uppercase tracking-wider bg-[#7C3AED] hover:bg-[#6D28D9] text-white shadow-lg shadow-[#7C3AED]/40 transition-all duration-300 shrink-0"
              >
                <span>BUY NOW</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>
            </div>
          </div>

          {/* ── Desktop layout (3-column) ── */}
          <div className="hidden lg:flex items-center w-full gap-6">

            {/* Col 1 — Service identity */}
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="fab-icon-wrap w-9 h-9 rounded-xl border flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 text-accent" />
              </div>
              <div className="min-w-0">
                <p className="fab-label text-[9px] font-black uppercase tracking-[0.2em] mb-0.5">SELECTED SERVICE</p>
                <p className="fab-service-name font-bold text-sm truncate leading-tight">{service.name}</p>
              </div>
            </div>

            {/* Divider */}
            <div className="fab-divider w-px h-8 shrink-0" />

            {/* Col 3 — CTA */}
            <div className="flex items-center gap-3 shrink-0">
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
                onClick={handleAddToCart}
                className={`flex items-center gap-2 rounded-xl px-5 py-3 font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 ${
                  service.slug && isInCart(service.slug)
                    ? 'bg-green-500/20 border border-green-500 text-green-400 shadow-md'
                    : 'border border-[#7C3AED] text-slate-200 hover:bg-[#7C3AED]/15 shadow-md'
                }`}
              >
                <span>{service.slug && isInCart(service.slug) ? 'GO TO CART' : 'ADD TO CART'}</span>
                <ShoppingCart className="w-4 h-4" />
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
                onClick={handleBuyNow}
                className="flex items-center gap-2 rounded-xl px-6 py-3 font-black text-xs sm:text-sm uppercase tracking-wider bg-gradient-to-r from-[#7C3AED] to-[#6025C0] hover:from-[#6D28D9] hover:to-[#5020A8] text-white shadow-xl shadow-[#7C3AED]/40 transition-all duration-300"
              >
                <span>BUY NOW</span>
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                  <ArrowRight className="w-3 h-3 text-white" />
                </div>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

/* ── Small reusable section header ── */
const SectionHeader = ({
  icon,
  title,
  iconBg = 'bg-accent/5',
}: {
  icon: React.ReactNode;
  title: string;
  iconBg?: string;
}) => (
  <div className="flex items-center gap-3">
    <div className={`w-9 h-9 ${iconBg} rounded-xl flex items-center justify-center border border-white/10`}>
      {icon}
    </div>
    <h2 className="text-base font-black text-slate-100">{title}</h2>
  </div>
);

export default ServiceDetails;
