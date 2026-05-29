import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { servicesData } from '../data/services';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, FileText, Clock, ArrowRight, 
  ShieldCheck, HelpCircle, FileCheck,
  ChevronDown, ChevronUp, AlertTriangle, ThumbsUp, ThumbsDown,
  ShieldAlert, Award, Star, Search, Link2
} from 'lucide-react';
import React, { useState, useEffect } from 'react';

const ServiceDetails = () => {
  const { category: categorySlug, serviceSlug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const cleanCategorySlug = categorySlug?.replace(/_/g, '-');
  const cleanServiceSlug = serviceSlug?.replace(/_/g, '-');
  const category = servicesData.find((c) => c.slug === cleanCategorySlug);
  const service = category?.services.find((s) => s.slug === cleanServiceSlug);
  
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const details = (service && category) ? (service.details || category.details) : null;

  // Initialize reviews state with realistic dummy reviews as fallback
  const initialReviews = (details && service)
    ? (details.reviews && details.reviews.length > 0
        ? details.reviews
        : [
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
          ])
    : [];

  const [reviewsList, setReviewsList] = useState(initialReviews);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', city: '', rating: 5, review: '' });

  // Update reviewsList when serviceSlug changes to reload reviews
  useEffect(() => {
    setReviewsList(initialReviews);
  }, [serviceSlug, details]);

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

  if (!category || !service) {
    return (
      <div className="pt-40 pb-20 text-center">
        <h1 className="text-4xl font-black text-primary mb-4">Service Not Found</h1>
        <Link to="/" className="text-accent font-bold hover:underline">Return to Home</Link>
      </div>
    );
  }

  const faqs = details!.faqs || category.faqs;

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
        .filter(s => s.slug !== service.slug && s.slug)
        .slice(0, 6)
        .map(s => ({ name: s.name, slug: s.slug!, categorySlug: category.slug }));

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
    <div className="bg-soft-white min-h-screen">

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
                <span className="px-3 py-1 rounded-full bg-accent/20 border border-accent/30 text-accent text-[10px] font-black uppercase tracking-widest">
                  Best For: {details.targetAudience}
                </span>
              )}
              {details.timeline && (
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white/80 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-accent" /> {details.timeline}
                </span>
              )}
            </div>

            <h1 className="text-3xl lg:text-5xl font-black text-white leading-tight tracking-tight mb-5">
              {service.name}
            </h1>
            <p className="text-sm text-white/70 font-medium leading-relaxed max-w-2xl mb-6">
              {service.description || `Professional ${service.name} services tailored for your business needs.`}
            </p>

            <div className="flex flex-col xs:flex-row flex-wrap gap-3 sm:gap-4 mt-6">
              <Link
                to={`/apply/${category.slug}/${service.slug}`}
                className="btn-accent text-xs font-black uppercase tracking-widest px-6 sm:px-8 py-3.5 sm:py-4 shadow-glow text-center"
              >
                Apply Now
              </Link>
              <a
                href={`https://wa.me/918919051513?text=Hi, I am interested in ${service.name} service.`}
                className="flex items-center justify-center gap-2 font-black text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-xs uppercase tracking-widest"
              >
                Talk to Senior Partner
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Main Grid: Left content + Right sidebar ─── */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* ══════ LEFT COLUMN ══════ */}
            <div className="lg:col-span-2 space-y-12 order-2 lg:order-1">

              {/* 1 ── What is this service about? */}
              {details.overview && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="glass-card p-6 bg-secondary/80 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 blur-2xl rounded-full" />
                  <h2 className="text-lg font-black text-white mb-4">What is this service about?</h2>
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
                      <div key={i} className="flex gap-3 p-3.5 glass-card bg-white/5 border border-white/10">
                        <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                          <Award className="w-2.5 h-2.5 text-accent" />
                        </div>
                        <p className="text-white font-medium leading-relaxed text-[11px]">{char}</p>
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
                      <div key={i} className="flex items-center gap-2.5 p-3.5 glass-card bg-white/5 border border-white/10">
                        <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-2.5 h-2.5 text-green-500" />
                        </div>
                        <span className="text-white font-medium text-[11px] leading-relaxed">{benefit}</span>
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
                        <div className="glass-card p-4 group-hover:translate-x-1 transition-transform">
                          <div className="text-[9px] font-black text-accent uppercase tracking-widest mb-1">
                            Phase {String(i + 1).padStart(2, '0')}
                          </div>
                          <h4 className="text-sm font-semibold text-white">{step}</h4>
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
                  className="glass-card p-7 bg-amber-500/[0.03] border border-amber-500/20"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                      <AlertTriangle className="w-5 h-5 text-amber-500" />
                    </div>
                    <h2 className="text-base font-black text-white">Common Mistakes to Avoid</h2>
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
                  <div className="glass-card p-6 mt-6">
                    <p className="text-xs font-medium text-dark-gray/60 leading-relaxed mb-5">
                      Maintaining compliances after registration is critical to prevent penalties, keep your business active, and protect your reputation.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {details.postCompliances.map((compliance, i) => (
                        <div key={i} className="flex items-start gap-2.5 p-3.5 bg-secondary/50 rounded-xl border border-white/10">
                          <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                            <span className="text-accent text-[10px] font-black">!</span>
                          </div>
                          <span className="text-white font-semibold text-[11px] leading-snug">{compliance}</span>
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
                    {faqs.map((faq, i) => (
                      <div key={i} className="glass-card overflow-hidden">
                        <button
                          onClick={() => setOpenFaq(openFaq === i ? null : i)}
                          className="w-full p-5 flex items-center justify-between text-left hover:bg-accent/5 transition-colors"
                        >
                          <span className="text-sm font-semibold text-white pr-4">{faq.question}</span>
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

            {/* ══════ RIGHT COLUMN: Sticky Sidebar ══════ */}
            <div className="order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:sticky lg:top-24 flex flex-col gap-4"
              >
                {/* Apply Now CTA */}
                <div className="order-2 lg:order-1 glass-card p-5 bg-primary text-white border-white/5 shadow-2xl">
                  <Link
                    to={`/apply/${category.slug}/${service.slug}`}
                    className="btn-accent w-full text-center py-3.5 rounded-lg mb-3 text-sm font-bold uppercase tracking-wider shadow-glow block"
                  >
                    Apply Now
                  </Link>
                  <a
                    href={`https://wa.me/918919051513?text=Hi, I am interested in ${service.name} service.`}
                    className="w-full flex items-center justify-center gap-2 font-bold text-white py-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-xs uppercase tracking-wider"
                  >
                    <ShieldCheck className="w-4 h-4 text-green-400" />
                    Talk to Senior Partner
                  </a>
                  {details.timeline && (
                    <div className="mt-3 p-3 bg-white/5 rounded-xl border border-white/10">
                      <div className="flex items-center gap-2.5">
                        <Clock className="w-4 h-4 text-accent shrink-0" />
                        <div>
                          <div className="text-[8px] text-white/30 font-bold uppercase tracking-widest">Expected Timeline</div>
                          <div className="text-sm font-black text-white">{details.timeline}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Documents Required */}
                {details.documents && details.documents.length > 0 && (
                  <div id="documents-section" className="order-1 lg:order-2 glass-card p-5 bg-primary text-white border-white/5 shadow-2xl">
                    <div className="flex items-center gap-2.5 mb-4">
                      <FileText className="w-4 h-4 text-accent" />
                      <h3 className="text-sm font-black tracking-tight text-white">Documents Required</h3>
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

                {/* Expert Advisory */}
                <div className="order-3 lg:order-3 glass-card p-5 bg-gradient-to-br from-primary to-secondary border-white/10 shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-accent/20 blur-3xl -mr-12 -mt-12 rounded-full group-hover:bg-accent/30 transition-all duration-700" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-9 h-9 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover:bg-accent transition-all duration-500">
                        <HelpCircle className="w-4 h-4 text-accent group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="text-sm font-bold text-white">Need Expert Help?</h3>
                    </div>
                    <p className="text-[11px] text-white/70 font-medium mb-4 leading-relaxed">
                      Our consultants are available for a one-on-one session to clarify your path.
                    </p>
                    <Link to="/contact" className="inline-flex items-center gap-1.5 text-accent font-black uppercase text-[9px] tracking-widest hover:text-white transition-all">
                      Contact Advisory
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </motion.div>
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

      {/* ─── 10: Customer Reviews ─── */}
      {reviewsList && reviewsList.length > 0 ? (
        <section className="py-14 border-t border-light-gray">
          <div className="container mx-auto px-4 lg:px-8">
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
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 bg-accent/5 rounded-xl flex items-center justify-center border border-accent/10">
                <Star className="w-4 h-4 text-accent" />
              </div>
              <h2 className="text-xl font-black text-white">Customer Reviews</h2>
            </div>
            <div className="glass-card p-8 text-center">
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

      {/* ─── Other Services in Category ─── */}
      <section className="py-20 bg-secondary/30 border-t border-light-gray">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-2xl font-black text-white mb-10">
            Explore Other <span className="text-accent">{category.title}</span> Services
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {category.services
              .filter(s => s.slug !== service.slug)
              .map(s => (
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
    <h2 className="text-base font-black text-white">{title}</h2>
  </div>
);

export default ServiceDetails;
