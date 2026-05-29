import { Shield, Target, Award, TrendingUp, Heart, Clock, ShieldCheck, FileText, Briefcase, DollarSign, MapPin, Users, Coins } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="bg-primary min-h-screen">
      {/* Hero Header */}
      <section className="relative pt-28 pb-10 sm:pt-36 sm:pb-16 lg:pt-48 lg:pb-24 overflow-hidden bg-primary">
        <div className="absolute inset-0 mesh-gradient opacity-60"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto space-y-4 sm:space-y-6"
          >
            <span className="text-accent uppercase tracking-widest font-black text-xs sm:text-sm px-4 py-2 bg-accent/10 rounded-full border border-accent/20">
              About Us
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black text-white leading-tight tracking-tighter">
              Who we are and what <span className="text-accent">We can do</span> for your Business?
            </h1>
            <p className="text-sm sm:text-lg md:text-xl text-white/80 font-medium leading-relaxed max-w-3xl mx-auto">
              <span className="text-accent font-bold">Fortune Multi Services</span> is the largest offline & online compliance services platform dedicated to helping people start and grow their business, at an affordable cost. Our aim is to help the entrepreneur on the legal and regulatory requirements, and be a partner throughout the business lifecycle, offering support at every stage to ensure the business remains compliant and continually growing.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Registrations & Licenses Section */}
      <section className="py-12 sm:py-20 lg:py-24 bg-secondary relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16 space-y-3 sm:space-y-4">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-xs font-black uppercase tracking-widest text-accent mb-2">
              <span className="px-3 py-1 bg-accent/10 rounded-full">Make a massive Progress</span>
              <span className="px-3 py-1 bg-green-500/10 text-green-600 rounded-full">Safe investment</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-white tracking-tight">
              Get Your Business Registrations &amp; Licenses
            </h2>
            <p className="text-sm sm:text-lg text-dark-gray font-medium opacity-65">
              Trusted by experts and businesses
            </p>
            <div className="w-20 h-1 bg-accent mx-auto rounded-full mt-4"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[
              {
                title: 'GST Filing',
                desc: 'File your GST returns every month with us.',
                icon: TrendingUp,
                color: 'bg-accent/5 text-accent border-accent/15 hover:border-accent/40',
              },
              {
                title: 'Labour Renewals',
                desc: 'Renew your Labour License annually with us.',
                icon: Clock,
                color: 'bg-accent-blue/5 text-accent-blue border-accent-blue/15 hover:border-accent-blue/40',
              },
              {
                title: 'Pvt Ltd Compliances',
                desc: 'File Private limited Company yearly compliances.',
                icon: ShieldCheck,
                color: 'bg-green-500/5 text-green-400 border-green-500/15 hover:border-green-500/40',
              },
              {
                title: 'IT Returns',
                desc: 'File your Income tax returns here.',
                icon: Award,
                color: 'bg-purple-500/5 text-purple-400 border-purple-500/15 hover:border-purple-500/40',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`p-5 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] border transition-all duration-500 group flex flex-col items-start ${item.color}`}
              >
                <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-primary/30 border border-white/10 shadow-sm mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-500">
                  <item.icon className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <h3 className="text-lg sm:text-2xl font-black mb-2 sm:mb-3 tracking-tight">{item.title}</h3>
                <p className="text-xs sm:text-sm font-medium leading-relaxed opacity-75">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience and Quote Banner */}
      <section className="py-12 sm:py-20 bg-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,166,35,0.08),transparent_70%)]"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <span className="text-accent uppercase tracking-widest font-black text-xs">
                Seven Years of Trust
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black tracking-tight leading-tight text-white">
                We have Over <span className="text-accent">Seven years</span> of Experience
              </h2>
              <div className="w-20 h-1 bg-accent rounded-full"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-6 sm:p-8 lg:p-12 rounded-[2rem] sm:rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-md space-y-4 sm:space-y-6"
            >
              <span className="text-accent font-black text-4xl sm:text-5xl leading-none">“</span>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-accent italic">
                Ensure Professional, Accurate, High Quality Service.
              </p>
              <p className="text-sm sm:text-base text-gray-300 font-medium leading-relaxed">
                Our Team has the Knowledge and Expertise to Ensure Professional, Accurate, High Quality Services.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Metrics Board Grid 1 */}
      <section className="py-12 sm:py-20 lg:py-24 bg-secondary relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16 space-y-3 sm:space-y-4">
            <span className="text-accent uppercase tracking-widest font-black text-xs">
              Milestones
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              Track Record of Business Excellence
            </h2>
            <div className="w-20 h-1 bg-accent mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 lg:gap-8">
            {[
              { label: 'Successful Projects', val: '734+', icon: Briefcase },
              { label: 'Happy Clients', val: '586+', icon: Heart },
              { label: 'Professionals Team', val: '3+', icon: Users },
              { label: 'Services Offered', val: '164+', icon: FileText },
              { label: 'Repeat Clients', val: '100%', icon: ShieldCheck },
              { label: 'Savings in Fees', val: '50%', icon: Coins },
              { label: 'Payment Options', val: '5+', icon: DollarSign },
              { label: 'Cities Served', val: '10+', icon: MapPin },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-secondary p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl border border-light-gray flex flex-col items-center text-center group hover:shadow-xl hover:border-accent transition-all duration-500"
              >
                <div className="p-2 sm:p-3 bg-primary/50 rounded-xl sm:rounded-2xl border border-white/10 text-accent mb-2 sm:mb-4 group-hover:scale-110 transition-transform">
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tighter mb-1 sm:mb-2">
                  {stat.val}
                </div>
                <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-dark-gray opacity-80">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* India's Largest Corporate compliance Platform Section */}
      <section className="py-12 sm:py-20 lg:py-24 bg-primary relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-16 items-center">
            {/* Platform Text Details */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 space-y-6 sm:space-y-8"
            >
              <div className="space-y-3 sm:space-y-4">
                <span className="text-accent uppercase tracking-widest font-black text-xs px-4 py-2 bg-accent/10 rounded-full border border-accent/20">
                  India's largest financial services
                </span>
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
                  <span className="text-accent">Fortune Multi Services</span>
                </h2>
                <div className="w-20 h-1 bg-accent rounded-full"></div>
              </div>

              <p className="text-sm sm:text-lg text-dark-gray font-medium leading-relaxed">
                <span className="bg-accent/10 text-accent px-1.5 py-0.5 rounded font-bold">Fortune Multi Services</span> is the Best Tax And Corporates compliance platform that helps small, medium and large businesses to fulfill with various Business registrations and Licenses, tax filings, accounting, And government services. We have already served over 3,000 customers and have a steadily growing network of over 50+ professionals from all the major cities (Like Hyderabad, Bangalore) on our online platform. In 2016, we launched way of working for legal professionals across India.
              </p>

              {/* Second Statistical Metrics list */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6 pt-2 sm:pt-4">
                {[
                  { title: 'Served clients', val: '1257+' },
                  { title: 'Office Employees', val: '10+' },
                  { title: 'Invoices Completed', val: '2684+' },
                  { title: 'Tax returns filed', val: '782+' },
                  { title: 'Happy clients', val: '1200+' },
                ].map((stat, idx) => (
                  <div key={idx} className="p-4 sm:p-6 bg-secondary rounded-xl sm:rounded-2xl border border-light-gray flex flex-col">
                    <span className="text-xl sm:text-2xl font-black text-white tracking-tight mb-1">{stat.val}</span>
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wide text-dark-gray opacity-70">{stat.title}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Corporate Accolades Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-5 bg-primary text-white p-7 sm:p-10 lg:p-12 rounded-[2rem] sm:rounded-[2.5rem] shadow-glow space-y-6 sm:space-y-8"
            >
              <div className="space-y-2">
                <span className="text-accent uppercase tracking-widest font-black text-xs">
                  Trusted Partners
                </span>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight text-white">
                  200+ brands. <br />700+ businesses. <br />20+ experts.
                </h3>
              </div>
              <div className="w-16 h-1 bg-accent rounded-full"></div>
              <p className="text-sm sm:text-lg text-gray-300 font-medium leading-relaxed">
                We are the trusted partners for tax experts and businesses across industries such as manufacturing, retail, FMCG, financial services, e-commerce and healthcare.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Operational Service Highlights */}
      <section className="py-12 sm:py-20 lg:py-24 bg-secondary relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-20 space-y-3 sm:space-y-4">
            <span className="text-accent uppercase tracking-widest font-black text-xs">
              Platform Features
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-white tracking-tight">
              Our Core Services &amp; Filings
            </h2>
            <div className="w-20 h-1 bg-accent mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[
              {
                title: 'GST Filings',
                desc: 'Easily file your GST monthly filings with our experts.',
                icon: TrendingUp,
              },
              {
                title: 'IncomeTax Returns',
                desc: 'File Income tax returns every year with us on time.',
                icon: Award,
              },
              {
                title: 'GST Way bills',
                desc: 'Generate GST e-way bills to transport your Goods.',
                icon: Clock,
              },
              {
                title: 'Trade Filing',
                desc: 'Complete Trade License registration and renewal.',
                icon: Shield,
              },
              {
                title: 'ESI & PF returns',
                desc: 'File ESI and PF returns every month.',
                icon: Target,
              },
              {
                title: 'TDS Refund',
                desc: 'File your ITR and get refunds from your TDS.',
                icon: Heart,
              },
            ].map((srv, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-light-gray hover:border-accent hover:shadow-xl transition-all duration-500 group"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent/10 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-accent group-hover:scale-110 transition-all duration-500">
                  <srv.icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent group-hover:text-white" />
                </div>
                <h4 className="text-lg sm:text-2xl font-black text-white mb-2 sm:mb-3 tracking-tight">{srv.title}</h4>
                <p className="text-dark-gray font-medium text-xs sm:text-sm leading-relaxed opacity-75">{srv.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
