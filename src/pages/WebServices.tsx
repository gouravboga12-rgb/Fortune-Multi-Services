import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Globe, Smartphone, ShoppingCart, AppWindow, TrendingUp, Wrench,
  CheckCircle, ArrowRight, Code2, Database, Cloud, Layers,
  MessageSquare, Lightbulb, Hammer, Rocket, Server
} from 'lucide-react';

const solutions = [
  {
    icon: Globe,
    title: 'Business Websites',
    desc: 'Professional websites that establish credibility and attract customers. Perfect for startups, SMEs, and enterprises.',
    color: 'bg-blue-500/5 text-blue-400 border-blue-500/15 hover:border-blue-500/40',
  },
  {
    icon: Smartphone,
    title: 'Mobile-First Design',
    desc: 'Responsive websites that look and perform flawlessly on all devices, with priority on mobile experience.',
    color: 'bg-green-500/5 text-green-400 border-green-500/15 hover:border-green-500/40',
  },
  {
    icon: ShoppingCart,
    title: 'E-Commerce Solutions',
    desc: 'Powerful online stores with secure payment gateways, inventory management, and marketing tools.',
    color: 'bg-accent/5 text-accent border-accent/15 hover:border-accent/40',
  },
  {
    icon: AppWindow,
    title: 'Web Applications',
    desc: 'Custom web apps with advanced functionality tailored to your specific business needs.',
    color: 'bg-purple-500/5 text-purple-400 border-purple-500/15 hover:border-purple-500/40',
  },
  {
    icon: TrendingUp,
    title: 'SEO & Marketing',
    desc: 'Comprehensive digital marketing services to increase your online visibility and conversions.',
    color: 'bg-pink-500/5 text-pink-400 border-pink-500/15 hover:border-pink-500/40',
  },
  {
    icon: Wrench,
    title: 'Website Maintenance',
    desc: 'Ongoing support, updates, and security to keep your website running smoothly.',
    color: 'bg-indigo-500/5 text-indigo-400 border-indigo-500/15 hover:border-indigo-500/40',
  },
];

const processSteps = [
  { icon: MessageSquare, label: 'Consultation', desc: 'We discuss your vision and requirements' },
  { icon: Lightbulb,     label: 'Planning',      desc: 'We create a customized strategy' },
  { icon: Hammer,        label: 'Development',   desc: 'We build your digital solution' },
  { icon: Rocket,        label: 'Launch',        desc: 'We deploy and support your project' },
];

const techStack = [
  {
    icon: Code2,
    label: 'Frontend Technologies',
    color: 'bg-blue-500/5 text-blue-400 border-blue-500/15',
    items: ['React.js, Next.js, Angular', 'TypeScript, JavaScript (ES6+)', 'Tailwind CSS, SASS, Bootstrap', 'Redux, Context API'],
  },
  {
    icon: Server,
    label: 'Backend Technologies',
    color: 'bg-green-500/5 text-green-400 border-green-500/15',
    items: ['Node.js, Express.js', 'Python (Django, Flask)', 'PHP (Laravel)', 'Java, .NET Core'],
  },
  {
    icon: Database,
    label: 'Databases',
    color: 'bg-accent/5 text-accent border-accent/15',
    items: ['MongoDB, PostgreSQL', 'MySQL, Firebase', 'Redis, Elasticsearch', 'AWS DynamoDB'],
  },
  {
    icon: Cloud,
    label: 'DevOps & Cloud',
    color: 'bg-purple-500/5 text-purple-400 border-purple-500/15',
    items: ['AWS, Azure, Google Cloud', 'Docker, Kubernetes', 'CI/CD Pipelines', 'Terraform, Ansible'],
  },
];

const lifecycle = [
  { num: '01', title: 'Requirement Analysis', desc: 'Gathering business requirements and technical specifications' },
  { num: '02', title: 'System Design',        desc: 'Architecture design and technology selection' },
  { num: '03', title: 'Development',          desc: 'Agile development with sprints and iterations' },
  { num: '04', title: 'Testing',              desc: 'QA, Security, and Performance testing' },
  { num: '05', title: 'Deployment & Maintenance', desc: 'CI/CD deployment and ongoing support' },
];

const hosting = [
  {
    label: 'Shared Hosting',
    badge: 'Starter',
    badgeColor: 'bg-blue-100 text-blue-700',
    desc: 'Cost-effective solution for small websites and blogs',
    features: ['cPanel/Plesk access', 'SSD Storage', 'Free SSL Certificate'],
  },
  {
    label: 'Cloud Hosting',
    badge: 'Popular',
    badgeColor: 'bg-accent/10 text-accent',
    desc: 'Scalable solutions for growing businesses',
    features: ['AWS/Azure/Google Cloud', 'Auto-scaling', 'Load Balancing', 'CDN Integration'],
    highlight: true,
  },
  {
    label: 'Dedicated Servers',
    badge: 'Enterprise',
    badgeColor: 'bg-purple-100 text-purple-700',
    desc: 'High-performance solutions for enterprise applications',
    features: ['Bare Metal Servers', 'Custom Configurations', '24/7 Monitoring', 'Managed Services'],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.09 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const WebServices = () => {
  return (
    <div className="bg-soft-white min-h-screen">

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-10 sm:pt-44 sm:pb-20 bg-primary overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-60"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="max-w-4xl mx-auto space-y-4 sm:space-y-6"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 border border-accent/30 text-accent text-[10px] sm:text-xs font-black uppercase tracking-[0.2em]">
              Web Development Services
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black text-white leading-tight tracking-tighter">
              Full-Cycle Web Development<br className="hidden sm:block" />
              <span className="text-accent"> From Concept to Deployment</span>
            </h1>
            <p className="text-sm sm:text-lg text-white/60 font-medium max-w-2xl mx-auto leading-relaxed">
              We design, build, and launch high-performance digital products that drive real business results — on time and on budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Link to="/contact" className="btn-accent px-8 py-4 text-sm sm:text-base flex items-center justify-center gap-2">
                Start Your Project <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="#solutions" className="px-8 py-4 rounded-xl border border-white/20 text-white text-sm font-bold hover:bg-white/10 transition-all">
                Explore Solutions
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Our Web Solutions ── */}
      <section id="solutions" className="py-12 sm:py-20 lg:py-28 scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-10 sm:mb-16 space-y-3"
          >
            <span className="text-accent uppercase tracking-widest font-black text-xs">Our Offerings</span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">Our Web Solutions</h2>
            <div className="w-20 h-1 bg-accent mx-auto rounded-full"></div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            {solutions.map((s, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className={`glass-card p-6 sm:p-8 border rounded-2xl hover:shadow-premium hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4 group ${s.color}`}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary/30 border border-white/10 group-hover:scale-110 transition-transform duration-500">
                  <s.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-white mb-2">{s.title}</h3>
                  <p className="text-sm text-dark-gray font-medium leading-relaxed opacity-75">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Our Simple Process ── */}
      <section className="py-12 sm:py-20 lg:py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(245,166,35,0.1),transparent_60%)]"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-10 sm:mb-16 space-y-3"
          >
            <span className="text-accent uppercase tracking-widest font-black text-xs">How We Work</span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">Our Simple Process</h2>
            <div className="w-20 h-1 bg-accent mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {processSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center gap-3 sm:gap-4"
              >
                <div className="relative">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
                    <step.icon className="w-6 h-6 sm:w-7 sm:h-7 text-accent" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-accent flex items-center justify-center text-white text-[10px] font-black">
                    {i + 1}
                  </div>
                </div>
                <h3 className="text-sm sm:text-lg font-black text-white">{step.label}</h3>
                <p className="text-xs sm:text-sm text-white/50 font-medium leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tech Stack ── */}
      <section className="py-12 sm:py-20 lg:py-28 bg-secondary/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-10 sm:mb-16 space-y-3"
          >
            <span className="text-accent uppercase tracking-widest font-black text-xs">Built With The Best</span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">Our Technology Stack</h2>
            <div className="w-20 h-1 bg-accent mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {techStack.map((tech, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`p-5 sm:p-7 rounded-2xl border border-light-gray bg-secondary shadow-sm hover:shadow-premium transition-all`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border mb-4 ${tech.color}`}>
                  <tech.icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-black text-white uppercase tracking-wider mb-3">{tech.label}</h3>
                <ul className="space-y-2">
                  {tech.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs text-dark-gray font-medium">
                      <span className="text-accent mt-0.5">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Development Lifecycle ── */}
      <section className="py-12 sm:py-20 lg:py-28 bg-soft-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-10 sm:mb-16 space-y-3"
          >
            <span className="text-accent uppercase tracking-widest font-black text-xs">End-to-End</span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">Our Development Lifecycle</h2>
            <div className="w-20 h-1 bg-accent mx-auto rounded-full"></div>
          </motion.div>

          <div className="relative pl-6 sm:pl-10 border-l-2 border-accent/20 ml-3 sm:ml-6 space-y-6 sm:space-y-8 max-w-3xl mx-auto">
            {lifecycle.map((phase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative group"
              >
                <div className="absolute -left-[35px] sm:-left-[51px] top-1 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-secondary flex items-center justify-center text-white text-[10px] sm:text-xs font-black border-4 border-primary group-hover:bg-accent transition-colors shadow">
                  {phase.num}
                </div>
                <div className="glass-card p-5 sm:p-7 bg-secondary/80 group-hover:border-accent/30 group-hover:translate-x-1 transition-all">
                  <h3 className="text-base sm:text-xl font-black text-white mb-1">{phase.title}</h3>
                  <p className="text-xs sm:text-sm text-dark-gray font-medium opacity-75">{phase.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Hosting & Deployment ── */}
      <section className="py-12 sm:py-20 lg:py-28 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-10 sm:mb-16 space-y-3"
          >
            <span className="text-accent uppercase tracking-widest font-black text-xs">Go Live</span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">Hosting &amp; Deployment Options</h2>
            <div className="w-20 h-1 bg-accent mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-8 max-w-5xl mx-auto">
            {hosting.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className={`rounded-2xl border flex flex-col p-6 sm:p-8 transition-all hover:shadow-premium ${
                  plan.highlight
                    ? 'bg-primary text-white border-primary/30 shadow-glow scale-[1.02]'
                    : 'bg-secondary border-light-gray'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-lg sm:text-xl font-black text-white`}>
                    {plan.label}
                  </h3>
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${plan.badgeColor}`}>
                    {plan.badge}
                  </span>
                </div>
                <p className={`text-xs sm:text-sm font-medium leading-relaxed mb-5 ${plan.highlight ? 'text-white/60' : 'text-dark-gray opacity-70'}`}>
                  {plan.desc}
                </p>
                <ul className="space-y-2.5 flex-1">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2.5 text-xs sm:text-sm font-medium">
                      <CheckCircle className={`w-4 h-4 shrink-0 ${plan.highlight ? 'text-accent' : 'text-green-500'}`} />
                      <span className={plan.highlight ? 'text-white/80' : 'text-dark-gray'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={`mt-6 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                    plan.highlight
                      ? 'bg-accent text-white hover:bg-accent/90 shadow-glow'
                      : 'border border-light-gray text-dark-gray hover:border-accent hover:text-accent'
                  }`}
                >
                  Get Started <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-14 sm:py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,166,35,0.12),transparent_70%)]"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto space-y-4 sm:space-y-6"
          >
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Ready to Build Your <span className="text-accent">Digital Presence?</span>
            </h2>
            <p className="text-sm sm:text-lg text-white/60 font-medium">
              Let's turn your idea into a high-performing digital product. Our team is ready to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/contact" className="btn-accent px-8 py-4 text-sm flex items-center justify-center gap-2">
                Book Free Consultation <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/918919051513?text=Hi, I am interested in Web Development services."
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-xl border border-white/20 text-white text-sm font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              >
                <Layers className="w-4 h-4 text-green-400" />
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default WebServices;
