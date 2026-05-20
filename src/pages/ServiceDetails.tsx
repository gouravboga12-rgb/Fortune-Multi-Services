import { useParams, Link } from 'react-router-dom';
import { servicesData } from '../data/services';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, FileText, Clock, ArrowRight, 
  ShieldCheck, HelpCircle, FileCheck,
  ChevronDown, ChevronUp, AlertTriangle, ThumbsUp, ThumbsDown,
  ShieldAlert, Award
} from 'lucide-react';
import { useState, useEffect } from 'react';

const ServiceDetails = () => {
  const { category: categorySlug, serviceSlug } = useParams();
  const category = servicesData.find((c) => c.slug === categorySlug);
  const service = category?.services.find((s) => s.slug === serviceSlug);
  
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceSlug]);

  if (!category || !service) {
    return (
      <div className="pt-40 pb-20 text-center">
        <h1 className="text-4xl font-black text-primary mb-4">Service Not Found</h1>
        <Link to="/" className="text-accent font-bold hover:underline">Return to Home</Link>
      </div>
    );
  }

  // Use service details if available, otherwise fallback to category details
  const details = service.details || category.details;
  const faqs = details.faqs || category.faqs;

  return (
    <div className="bg-soft-white min-h-screen">
      {/* Hero Header */}
      <section className="relative pt-40 pb-24 overflow-hidden bg-primary">
        <div className="absolute inset-0 mesh-gradient opacity-60"></div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <nav className="flex flex-wrap items-center gap-2 text-white/50 text-xs font-bold uppercase tracking-widest mb-6">
              <Link to="/" className="hover:text-accent transition-colors">Home</Link>
              <ArrowRight className="w-3 h-3" />
              <Link to={`/services/${category.slug}`} className="hover:text-accent transition-colors">{category.title}</Link>
              <ArrowRight className="w-3 h-3" />
              <span className="text-accent">{service.name}</span>
            </nav>
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
            <h1 className="text-5xl lg:text-7xl font-black text-white leading-none tracking-tighter mb-8">
              {service.name}
            </h1>
            <p className="text-xl text-white/70 font-medium leading-relaxed max-w-2xl">
              {service.description || `Professional ${service.name} services tailored for your business needs.`}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Left Column: Details */}
            <div className="lg:col-span-2 space-y-20">
              
              {/* Detailed Overview */}
              {details.overview && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="glass-card p-10 bg-white/60 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 blur-2xl rounded-full"></div>
                  <h2 className="text-3xl font-black text-primary mb-6">What is the service about?</h2>
                  <p className="text-dark-gray text-base font-medium leading-relaxed whitespace-pre-line">
                    {details.overview}
                  </p>
                </motion.div>
              )}

              {/* Key Characteristics */}
              {details.characteristics && details.characteristics.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 bg-accent/5 rounded-2xl flex items-center justify-center border border-accent/10">
                      <ShieldAlert className="w-6 h-6 text-accent" />
                    </div>
                    <h2 className="text-3xl font-black text-primary">Key Characteristics</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {details.characteristics.map((char, i) => (
                      <div key={i} className="flex gap-4 p-6 glass-card bg-white/40">
                        <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                          <Award className="w-4 h-4 text-accent" />
                        </div>
                        <p className="text-primary font-bold leading-normal text-sm">{char}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Benefits / Strategic Advantages */}
              {details.benefits && details.benefits.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 bg-accent/5 rounded-2xl flex items-center justify-center border border-accent/10">
                      <FileCheck className="w-6 h-6 text-accent" />
                    </div>
                    <h2 className="text-3xl font-black text-primary">Strategic Advantages</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {details.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-4 p-6 glass-card bg-white/40">
                        <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="text-primary font-bold text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Pros & Cons Side-by-Side */}
              {((details.pros && details.pros.length > 0) || (details.cons && details.cons.length > 0)) && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                  {/* Pros */}
                  {details.pros && details.pros.length > 0 && (
                    <div className="glass-card p-8 bg-green-500/[0.02] border-green-500/10">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                          <ThumbsUp className="w-5 h-5 text-green-600" />
                        </div>
                        <h3 className="text-xl font-bold text-green-950">Advantages (Pros)</h3>
                      </div>
                      <ul className="space-y-4">
                        {details.pros.map((pro, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm text-dark-gray font-medium">
                            <span className="text-green-600 mt-1 font-bold">✓</span>
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Cons */}
                  {details.cons && details.cons.length > 0 && (
                    <div className="glass-card p-8 bg-red-500/[0.02] border-red-500/10">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                          <ThumbsDown className="w-5 h-5 text-red-600" />
                        </div>
                        <h3 className="text-xl font-bold text-red-950">Disadvantages (Cons)</h3>
                      </div>
                      <ul className="space-y-4">
                        {details.cons.map((con, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm text-dark-gray font-medium">
                            <span className="text-red-500 mt-1 font-bold">✗</span>
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Registration Process */}
              {details.process && details.process.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-4 mb-12">
                    <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-black text-primary">Registration Process Flow</h2>
                  </div>
                  <div className="relative space-y-10 pl-10 border-l-2 border-primary/10 ml-5">
                    {details.process.map((step, i) => (
                      <div key={i} className="relative group">
                        <div className="absolute -left-[51px] top-0 w-5 h-5 bg-primary rounded-full border-4 border-soft-white group-hover:bg-accent transition-colors shadow-sm"></div>
                        <div className="glass-card p-8 group-hover:translate-x-2 transition-transform">
                          <div className="text-[10px] font-black text-accent uppercase tracking-widest mb-2">Phase 0{i + 1}</div>
                          <h4 className="text-xl font-bold text-primary">{step}</h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Common Mistakes */}
              {details.commonMistakes && details.commonMistakes.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="glass-card p-8 bg-amber-500/[0.03] border-amber-500/20"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                      <AlertTriangle className="w-5 h-5 text-amber-600" />
                    </div>
                    <h3 className="text-2xl font-black text-primary">Common Pitfalls to Avoid</h3>
                  </div>
                  <ul className="space-y-4">
                    {details.commonMistakes.map((mistake, i) => (
                      <li key={i} className="flex gap-3 text-sm text-dark-gray font-medium leading-relaxed">
                        <span className="text-amber-600 shrink-0 font-bold">•</span>
                        <span>{mistake}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Post-Registration Compliances */}
              {details.postCompliances && details.postCompliances.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center border border-primary/10">
                      <ShieldCheck className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-3xl font-black text-primary">Post-Registration Compliances</h2>
                  </div>
                  <div className="glass-card p-8 space-y-6">
                    <p className="text-sm font-medium text-dark-gray/60 leading-relaxed mb-6">
                      Maintaining compliances after registration is critical to prevent penalties, keep your corporate active, and protect your credit score.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {details.postCompliances.map((compliance, i) => (
                        <div key={i} className="flex items-center gap-3 p-4 bg-soft-white rounded-xl border border-light-gray">
                          <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                            <span className="text-accent text-xs font-black">!</span>
                          </div>
                          <span className="text-primary font-bold text-xs">{compliance}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* FAQs Section */}
              {faqs && faqs.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 bg-accent/5 rounded-2xl flex items-center justify-center border border-accent/10">
                      <HelpCircle className="w-6 h-6 text-accent" />
                    </div>
                    <h2 className="text-3xl font-black text-primary">Frequently Asked Questions</h2>
                  </div>
                  <div className="space-y-4">
                    {faqs.map((faq, i) => (
                      <div key={i} className="glass-card overflow-hidden">
                        <button 
                          onClick={() => setOpenFaq(openFaq === i ? null : i)}
                          className="w-full p-6 flex items-center justify-between text-left hover:bg-accent/5 transition-colors"
                        >
                          <span className="font-bold text-primary">{faq.question}</span>
                          {openFaq === i ? <ChevronUp className="w-5 h-5 text-accent" /> : <ChevronDown className="w-5 h-5 text-accent" />}
                        </button>
                        <AnimatePresence>
                          {openFaq === i && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="px-6 pb-6 text-dark-gray text-sm font-medium leading-relaxed"
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

            {/* Right Column: Sidebar */}
            <div className="space-y-8 sticky top-32 self-start">
              {/* Documents Card */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card p-10 bg-primary text-white border-white/5 shadow-2xl"
              >
                {details.documents && details.documents.length > 0 && (
                  <>
                    <div className="flex items-center gap-4 mb-8">
                      <FileText className="w-6 h-6 text-accent" />
                      <h3 className="text-2xl font-black tracking-tight text-white">Documents Required</h3>
                    </div>
                    <ul className="space-y-5 mb-10">
                      {details.documents.map((doc, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-white/60 font-medium">
                          <div className="w-1.5 h-1.5 bg-accent rounded-full shrink-0 mt-2"></div>
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                
                {details.timeline && (
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/10 mb-10">
                    <div className="flex items-center gap-4">
                      <Clock className="w-6 h-6 text-accent" />
                      <div>
                        <div className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Expected Timeline</div>
                        <div className="text-lg font-black text-white">{details.timeline}</div>
                      </div>
                    </div>
                  </div>
                )}

                <Link to={`/apply/${category.slug}/${service.slug}`} className="btn-accent w-full text-center py-4 rounded-xl mb-4 text-lg">
                  Apply Now
                </Link>
                <a 
                  href={`https://wa.me/918919051513?text=Hi, I am interested in ${service.name} service.`}
                  className="w-full flex items-center justify-center gap-3 font-bold text-white py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                >
                  <ShieldCheck className="w-5 h-5 text-green-400" />
                  Talk to Senior Partner
                </a>
              </motion.div>

              {/* Expert Advisory CTA */}
              <div className="glass-card p-8 bg-gradient-to-br from-primary to-secondary border-white/10 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 blur-3xl -mr-16 -mt-16 rounded-full group-hover:bg-accent/30 transition-all duration-700"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-accent transition-all duration-500">
                      <HelpCircle className="w-6 h-6 text-accent group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Expert Help</h3>
                  </div>
                  <p className="text-sm text-white/70 font-medium mb-8 leading-relaxed">
                    Unsure which legal structure suits your vision? Our consultants are available for a one-on-one session to clarify your path.
                  </p>
                  <Link to="/contact" className="inline-flex items-center gap-2 text-accent font-black uppercase text-[10px] tracking-widest hover:text-white transition-all">
                    Contact Advisory
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Services in Category CTA */}
      <section className="py-24 bg-white border-t border-light-gray">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl font-black text-primary mb-12">Explore Other {category.title} Services</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {category.services.filter(s => s.slug !== service.slug).map(s => (
              <Link 
                key={s.slug} 
                to={`/services/${category.slug}/${s.slug}`}
                className="px-8 py-3.5 bg-soft-white border border-light-gray rounded-2xl text-xs font-black text-primary uppercase tracking-widest hover:border-accent hover:text-accent transition-all shadow-sm"
              >
                {s.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetails;
