import Hero from '../components/Hero';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CheckCircle, ArrowRight, Star, Quote, 
  Briefcase, Award, TrendingUp, Users2, ShieldCheck, 
  Zap, FileText, Landmark, Scale, Globe 
} from 'lucide-react';
import GstCalculator from '../components/GstCalculator';
import premiumAdvisors from '../assets/premium_advisors.png';

const Home = () => {
  const stats = [
    { label: 'Years Experience', value: '10+', icon: Briefcase },
    { label: 'Satisfied Clients', value: '5,000+', icon: Users2 },
    { label: 'Compliance Guarantee', value: '100%', icon: ShieldCheck },
    { label: 'Successful Registrations', value: '2,500+', icon: CheckCircle },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };


  return (
    <div className="bg-soft-white">
      <Hero />

      {/* Credibility Registry Strip */}
      <div className="bg-secondary/50 py-6 sm:py-8 border-y border-light-gray overflow-x-auto">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
            <span className="text-[10px] font-black text-dark-gray/60 uppercase tracking-[0.2em] whitespace-nowrap shrink-0">
              Coordinating Direct Filings &amp; Registries With:
            </span>
            <div className="flex flex-wrap justify-center sm:justify-end items-center gap-x-6 sm:gap-x-12 gap-y-3 sm:gap-y-4 opacity-40">
              {['MCA Registry', 'Income Tax Dept', 'GST Network', 'FSSAI Authority', 'Trademark Patent Office'].map((logo) => (
                <div key={logo} className="text-dark-gray font-black text-[10px] sm:text-xs uppercase tracking-widest whitespace-nowrap">
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <GstCalculator />

      {/* Services Grid — matches Header Navigation */}
      <section id="our-services" className="py-16 sm:py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-accent/5 blur-[150px] -z-10 rounded-full" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto mb-10 sm:mb-20 text-center space-y-4"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black text-white">
              Our <span className="text-accent">Services</span>
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto rounded-full" />
            <p className="text-base sm:text-lg text-dark-gray font-medium max-w-2xl mx-auto leading-relaxed">
              End-to-end business compliance — from startup registration to global expansion.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {[
              {
                title: 'Startup',
                path: '/services/startup',
                icon: TrendingUp,
                description: 'Launch your venture with the right legal structure — Proprietorship, LLP, Pvt Ltd & more.',
                highlights: ['Proprietorship', 'Private Limited Company'],
                color: 'from-blue-500/10 to-accent/5',
                isLarge: true,
              },
              {
                title: 'Registrations',
                path: '/services/registrations',
                icon: Landmark,
                description: 'Government licenses, FSSAI, Trade License, ISO, Import Export Code & more.',
                highlights: ['FSSAI Registration', 'Udyam Registration'],
                color: 'from-purple-500/10 to-accent/5',
                isLarge: false,
              },
              {
                title: 'Trademark',
                path: '/services/trademark',
                icon: ShieldCheck,
                description: 'Protect your brand identity, IP rights, and creative works.',
                highlights: ['Trademark Registration', 'Copyright Registration'],
                color: 'from-pink-500/10 to-accent/5',
                isLarge: false,
              },
              {
                title: 'GST',
                path: '/services/gst',
                icon: FileText,
                description: 'Complete GST registration, return filing, notices, and compliance support.',
                highlights: ['GST Registration', 'GST Return Filing'],
                color: 'from-green-500/10 to-accent/5',
                isLarge: true,
              },
              {
                title: 'Income Tax',
                path: '/services/tax-compliance?section=income-tax',
                icon: Scale,
                description: 'Personal & business ITR filing, TDS returns, and tax notice handling.',
                highlights: ['Income Tax E-Filing', 'TDS Return Filing'],
                color: 'from-yellow-500/10 to-accent/5',
                isLarge: false,
              },
              {
                title: 'MCA',
                path: '/services/tax-compliance?section=mca',
                icon: Briefcase,
                description: 'ROC filings, director changes, MOA/AOA amendments, and corporate compliance.',
                highlights: ['Company Compliance', 'DIN eKYC Filing'],
                color: 'from-orange-500/10 to-accent/5',
                isLarge: false,
              },
              {
                title: 'Compliance',
                path: '/services/tax-compliance?section=compliance',
                icon: Award,
                description: 'PF/ESI returns, payroll, bookkeeping, professional tax & more.',
                highlights: ['PF Return Filing', 'HR & Payroll'],
                color: 'from-teal-500/10 to-accent/5',
                isLarge: false,
              },
              {
                title: 'Global',
                path: '/services/global',
                icon: Globe,
                description: 'International company formation in UAE, USA, UK, Singapore & trademark globally.',
                highlights: ['UAE Company', 'USA Company'],
                color: 'from-cyan-500/10 to-accent/5',
                isLarge: false,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={itemVariants}
                  className={cn(
                    'bento-card group flex flex-col justify-between overflow-hidden relative min-h-[260px] sm:min-h-[300px]',
                    item.isLarge ? 'lg:col-span-2' : 'lg:col-span-1'
                  )}
                >
                  {/* Background watermark icon */}
                  <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-700">
                    <Icon className="w-32 h-32 sm:w-40 sm:h-40" />
                  </div>

                  <div>
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 border border-white/10 group-hover:bg-accent group-hover:text-white transition-all duration-500">
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-white group-hover:text-accent transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-dark-gray/60 text-sm font-medium line-clamp-2 max-w-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-light-gray/50">
                    <div className="flex flex-col gap-2">
                      {item.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs font-bold text-dark-gray/80">
                          <CheckCircle className="w-3.5 h-3.5 text-accent shrink-0" />
                          <span className="truncate">{h}</span>
                        </div>
                      ))}
                    </div>
                    <Link
                      to={item.path}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary text-white flex items-center justify-center group-hover:bg-accent group-hover:shadow-glow transition-all duration-500 shrink-0"
                    >
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>


      {/* Premium Stats Section */}
      <section className="py-16 sm:py-24 relative">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="bg-primary rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-12 lg:p-20 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 mesh-gradient opacity-40"></div>
            <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-12 lg:gap-8">
              {stats.map((stat, index) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center space-y-3 sm:space-y-4"
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto border border-white/10 backdrop-blur-md">
                    <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-accent" />
                  </div>
                  <div>
                    <div className="text-3xl sm:text-4xl lg:text-6xl font-black text-white tracking-tighter mb-1">{stat.value}</div>
                    <div className="text-[10px] sm:text-xs lg:text-sm text-white/50 font-bold uppercase tracking-widest">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us: Editorial Style */}
      <section className="py-16 sm:py-24 lg:py-32 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div className="space-y-8 sm:space-y-12">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-4 sm:space-y-6"
              >
                <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-xs sm:text-sm font-bold border border-accent/20">
                  <ShieldCheck className="w-4 h-4" />
                  Elite Business Solutions
                </div>
                <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-none tracking-tighter">
                  The Gold Standard <br />
                  <span className="text-accent">Of Consulting</span>
                </h2>
                <p className="text-lg sm:text-xl text-dark-gray font-medium leading-relaxed">
                  We don't just register companies; we build the foundations for global conglomerates. Our approach is surgical, data-driven, and results-oriented.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
                {[
                  { title: 'Full Spectrum', desc: 'End-to-end compliance from incorporation to annual audit.', icon: Zap },
                  { title: 'Global Precision', desc: 'Adhering to international standards for trademark and IP.', icon: Award },
                  { title: 'Zero Hidden Fees', desc: 'Transparent billing with detailed progress tracking.', icon: CheckCircle },
                  { title: '24/7 Concierge', desc: 'Dedicated account managers for premium corporate clients.', icon: Users2 },
                ].map((item, i) => (
                  <motion.div 
                    key={item.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="space-y-2 sm:space-y-3"
                  >
                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                      <item.icon className="w-6 h-6 text-accent" />
                    </div>
                    <h4 className="text-lg font-bold text-white">{item.title}</h4>
                    <p className="text-dark-gray/60 text-sm font-medium leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative z-10 rounded-[1.5rem] sm:rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(15,23,42,0.25)] border-4 sm:border-8 lg:border-[16px] border-soft-white">
                <img 
                  src={premiumAdvisors} 
                  alt="Elite Business Advisory Board" 
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-accent/10 blur-[80px] -z-10 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-12 -left-12 bg-secondary p-10 rounded-[2rem] shadow-2xl z-20 border border-light-gray hidden xl:block">
                <div className="flex items-center gap-6">
                  <div className="text-5xl font-black text-white">100%</div>
                  <div className="w-px h-12 bg-light-gray"></div>
                  <div className="text-xs text-dark-gray font-bold uppercase tracking-widest leading-tight">Compliance <br />Guaranteed</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials: Premium Carousel feel */}
      <section className="py-16 sm:py-24 lg:py-32 bg-secondary overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12 sm:mb-24 space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black text-white">Client Success Stories</h2>
            <div className="w-20 h-1 bg-accent mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10">
            {[
              { name: 'Rahul Sharma', role: 'CEO, TechLogics', content: 'Fortune Multi Services transformed our legal foundation. Their precision is unmatched in the industry.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150' },
              { name: 'Ananya Goel', role: 'Founder, Organic Bloom', content: 'From GST to Trademark, they handled everything while I focused on growth. A true partner in every sense.', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150' },
              { name: 'Vikram Singh', role: 'Director, Zenith Corp', content: 'Highly professional team. Their compliance strategies saved us millions in potential penalties.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150' },
            ].map((t, i) => (
              <motion.div 
                key={t.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 sm:p-10 relative group"
              >
                <Quote className="absolute top-8 right-8 w-16 h-16 text-primary/5 group-hover:text-accent/10 transition-colors" />
                <div className="flex items-center gap-5 mb-8">
                  <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-2xl border-2 border-white shadow-lg" />
                  <div>
                    <div className="font-black text-white text-lg">{t.name}</div>
                    <div className="text-[10px] text-accent font-black uppercase tracking-widest">{t.role}</div>
                  </div>
                </div>
                <p className="text-dark-gray font-medium leading-relaxed text-base sm:text-lg">"{t.content}"</p>
                <div className="mt-8 flex gap-1">
                  {[1,2,3,4,5].map(star => <Star key={star} className="w-4 h-4 fill-accent text-accent" />)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-16 sm:py-24 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="relative bg-primary rounded-[2rem] sm:rounded-[3rem] lg:rounded-[4rem] p-6 sm:p-16 lg:p-32 text-center text-white overflow-hidden shadow-[0_50px_100px_-20px_rgba(15,23,42,0.5)]">
            <div className="absolute inset-0 mesh-gradient opacity-60"></div>
            <div className="relative z-10 max-w-4xl mx-auto space-y-8 sm:space-y-12">
              <h2 className="text-3xl sm:text-5xl lg:text-8xl font-black tracking-tighter leading-none text-white">
                Build Your <span className="text-accent">Empire</span> <br />
                With Confidence
              </h2>
              <p className="text-lg sm:text-2xl text-white/70 font-medium">
                Join the elite circle of 5,000+ businesses powered by Fortune Multi Services.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8">
                <Link to="/contact" className="btn-accent px-8 sm:px-16 py-4 sm:py-6 text-base sm:text-xl shadow-glow">
                  Initialize Setup
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 ml-2" />
                </Link>
                <a 
                  href="https://wa.me/918919051513" 
                  className="px-8 sm:px-16 py-4 sm:py-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 font-bold text-white hover:bg-white/20 transition-all text-base sm:text-xl text-center"
                >
                  Priority Concierge
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Simple utility for tailwind classes (usually comes from a separate utils file but defined here for Home.tsx specifically)
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

export default Home;
