import { useParams, Link, useLocation } from 'react-router-dom';
import { servicesData } from '../data/services';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, FileText, Clock, ArrowRight, 
  ShieldCheck, HelpCircle, Landmark, FileCheck,
  ChevronDown, ChevronUp
} from 'lucide-react';
import { useState, useEffect } from 'react';

const ServiceCategory = () => {
  const { category: slug } = useParams();
  const location = useLocation();
  const category = servicesData.find((c) => c.slug === slug);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Scroll to hash on load
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [location.hash]);

  if (!category) {
    return (
      <div className="pt-40 pb-20 text-center">
        <h1 className="text-4xl font-black text-primary mb-4">Category Not Found</h1>
        <Link to="/" className="text-accent font-bold hover:underline">Return to Home</Link>
      </div>
    );
  }

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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-16">
            {/* Left Column: Details */}
            <div className="lg:col-span-2 space-y-12 sm:space-y-20">
              {/* Service Cards */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-10">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/5 rounded-xl sm:rounded-2xl flex items-center justify-center border border-primary/10">
                    <Landmark className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-primary">Service Catalog</h2>
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
                          <div className={`text-xs font-black uppercase tracking-widest text-primary/40 group-hover:text-accent transition-colors`}>
                            {service.tag}
                          </div>
                          <ArrowRight className={`w-4 h-4 sm:w-5 sm:h-5 text-accent opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0`} />
                        </div>
                        <h3 className={`text-base sm:text-xl font-bold text-primary group-hover:text-accent transition-colors`}>
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
                  <h2 className="text-2xl sm:text-3xl font-black text-primary">Strategic Advantages</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {category.details.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 glass-card bg-white/40">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600" />
                      </div>
                      <span className="text-primary font-bold text-sm sm:text-base">{benefit}</span>
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
                  <h2 className="text-2xl sm:text-3xl font-black text-primary">The Engagement Flow</h2>
                </div>
                <div className="relative space-y-6 sm:space-y-10 pl-6 sm:pl-10 border-l-2 border-primary/10 ml-3 sm:ml-5">
                  {category.details.process.map((step, i) => (
                    <div key={i} className="relative group">
                      <div className="absolute -left-[35px] sm:-left-[51px] top-0 w-4 h-4 sm:w-5 sm:h-5 bg-primary rounded-full border-4 border-soft-white group-hover:bg-accent transition-colors shadow-sm"></div>
                      <div className="glass-card p-5 sm:p-8 group-hover:translate-x-2 transition-transform">
                        <div className="text-[10px] font-black text-accent uppercase tracking-widest mb-1 sm:mb-2">Phase 0{i + 1}</div>
                        <h4 className="text-base sm:text-xl font-bold text-primary">{step}</h4>
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
                  <h2 className="text-2xl sm:text-3xl font-black text-primary">Frequently Asked Questions</h2>
                </div>
                <div className="space-y-4">
                  {category.faqs.map((faq, i) => (
                    <div key={i} className="glass-card overflow-hidden">
                      <button 
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full p-4 sm:p-6 flex items-center justify-between text-left hover:bg-accent/5 transition-colors gap-3"
                      >
                        <span className="font-bold text-primary text-sm sm:text-base">{faq.question}</span>
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

            {/* Right Column: Sidebar */}
            <div className="space-y-6 sm:space-y-8 lg:sticky lg:top-32 lg:self-start">
              {/* Documents Card */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card p-6 sm:p-10 bg-primary text-white border-white/5 shadow-2xl"
              >
                <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <FileText className="w-6 h-6 text-accent" />
                  <h3 className="text-2xl font-black tracking-tight text-white">Prerequisites</h3>
                </div>
                <ul className="space-y-5 mb-10">
                  {category.details.documents.map((doc, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-white/60 font-medium">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full shrink-0 mt-2"></div>
                      {doc}
                    </li>
                  ))}
                </ul>
                
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10 mb-10">
                  <div className="flex items-center gap-4">
                    <Clock className="w-6 h-6 text-accent" />
                    <div>
                      <div className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Expected Timeline</div>
                      <div className="text-lg font-black text-white">{category.details.timeline}</div>
                    </div>
                  </div>
                </div>

                <Link to="/contact" className="btn-accent w-full text-center py-4 rounded-xl mb-4 text-lg">
                  Apply Now
                </Link>
                <a 
                  href={`https://wa.me/918919051513?text=Hi, I am interested in ${category.title} services.`}
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

      {/* Other Categories CTA */}
      <section className="py-12 sm:py-20 lg:py-24 bg-white border-t border-light-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-primary mb-6 sm:mb-12">Explore Other Excellence Areas</h2>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {servicesData.filter(c => c.slug !== slug).map(c => (
              <Link 
                key={c.slug} 
                to={`/services/${c.slug}`}
                className="px-5 sm:px-8 py-2.5 sm:py-3.5 bg-soft-white border border-light-gray rounded-xl sm:rounded-2xl text-xs font-black text-primary uppercase tracking-widest hover:border-accent hover:text-accent transition-all shadow-sm"
              >
                {c.title}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceCategory;
