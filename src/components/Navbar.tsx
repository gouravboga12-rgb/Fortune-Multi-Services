import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, User, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { servicesData } from '../data/services';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile/search menus when location changes
  useEffect(() => {
    setIsOpen(false);
    setIsSearchOpen(false);
    setSearchQuery('');
  }, [location]);

  const navLinks = [
    { 
      name: 'Startup', 
      path: '/services/startup', 
      hasDropdown: true,
      category: servicesData.find(c => c.slug === 'startup')
    },
    { 
      name: 'Registrations', 
      path: '/services/registrations', 
      hasDropdown: true,
      category: servicesData.find(c => c.slug === 'registrations')
    },
    {
      name: 'Licenses',
      path: '/services/govt-license',
      hasDropdown: true,
      categories: [
        servicesData.find(c => c.slug === 'govt-license'),
        servicesData.find(c => c.slug === 'food-license'),
      ].filter(Boolean)
    },
    { 
      name: 'GST', 
      path: '/services/gst', 
      hasDropdown: true,
      category: servicesData.find(c => c.slug === 'gst')
    },
    { 
      name: 'Trademark', 
      path: '/services/trademark', 
      hasDropdown: true,
      category: servicesData.find(c => c.slug === 'trademark')
    },
    { 
      name: 'Global', 
      path: '/services/global', 
      hasDropdown: true,
      category: servicesData.find(c => c.slug === 'global')
    },
    { 
      name: 'Tax Compliances', 
      path: '/services/tax-compliance', 
      hasDropdown: true,
      category: servicesData.find(c => c.slug === 'tax-compliance')
    },
    { name: 'Web Services', path: '/web-services' },
    { name: 'About Us', path: '/about' },
  ];

  // Flattened services for global search matching
  const allServices = servicesData.flatMap(cat => 
    cat.services.map(s => ({
      ...s,
      categoryName: cat.title,
      categorySlug: cat.slug
    }))
  );

  const filteredServices = searchQuery.trim() === '' 
    ? [] 
    : allServices.filter(s => 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (s.description && s.description.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 8);

  return (
    <nav
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-500',
        isScrolled || isOpen
          ? 'bg-white shadow-premium border-b border-light-gray' 
          : 'bg-white/80 backdrop-blur-md'
      )}
    >
      <div 
        className={cn(
          "w-full flex justify-between items-center transition-all duration-500",
          isOpen
            ? "px-6 py-4"
            : isScrolled
              ? "px-6 py-2 lg:px-8 2xl:px-12"
              : "px-6 py-4 lg:px-8 2xl:px-12"
        )}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <img src="/logo.png" alt="Fortune Multi Services" className="h-14 md:h-16 w-auto object-contain" />
        </Link>

        {/* Desktop Links */}
        <div className="hidden xl:flex items-center gap-0.5 2xl:gap-1.5 shrink-0">
          {navLinks.map((link) => (
            <div
              key={link.name}
              className="relative h-full flex items-center"
              onMouseEnter={() => link.hasDropdown && setActiveDropdown(link.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                to={link.path}
                className={cn(
                  'px-2 2xl:px-3 py-4 text-[10px] 2xl:text-[11px] font-bold tracking-tight uppercase transition-all duration-300 flex items-center gap-1 group whitespace-nowrap',
                  location.pathname === link.path ? 'text-accent' : 'text-primary hover:text-accent'
                )}
              >
                {link.name}
                {link.hasDropdown && (
                  <ChevronDown className={cn(
                    "w-3 h-3 transition-transform duration-300",
                    activeDropdown === link.name && "rotate-180 text-accent"
                  )} />
                )}
              </Link>

              {/* Mega Menu Dropdown */}
              <AnimatePresence>
                {link.hasDropdown && activeDropdown === link.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-[680px] bg-white shadow-2xl border border-light-gray rounded-xl overflow-hidden z-50 mt-[-5px]"
                  >
                    {'categories' in link && link.categories ? (
                      <>
                        <div className="p-6 grid grid-cols-2 gap-x-6">
                          {(link.categories as NonNullable<typeof link.categories>).map((cat) => (
                            <div key={cat!.slug}>
                              <div className="flex items-center gap-2 mb-3">
                                <span className="text-[9px] font-black text-accent uppercase tracking-[0.18em]">{cat!.title}</span>
                                <div className="flex-1 h-px bg-accent/15"></div>
                              </div>
                              <div className="flex flex-col gap-0.5">
                                {cat!.services.map((service) => (
                                  <Link
                                    key={service.name}
                                    to={`/services/${cat!.slug}/${service.slug}`}
                                    className="text-[13px] text-dark-gray hover:text-accent transition-colors py-1.5 border-b border-transparent hover:border-accent/10 flex items-center gap-2"
                                  >
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent/30" />
                                    {service.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="bg-soft-white p-4 border-t border-light-gray flex justify-between items-center">
                          <p className="text-[11px] text-primary/60">Government & Food Regulatory Licenses</p>
                          <div className="flex gap-4">
                            <Link to="/services/govt-license" className="text-[11px] font-bold text-accent hover:underline uppercase tracking-wider">Govt License</Link>
                            <Link to="/services/food-license" className="text-[11px] font-bold text-accent hover:underline uppercase tracking-wider">Food License</Link>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="p-6 grid grid-cols-2 gap-x-8 gap-y-2">
                          {(link as {category?: {services: {name: string; slug?: string}[]}}).category?.services.map((service) => (
                            <Link
                              key={service.name}
                              to={`${link.path}/${service.slug}`}
                              className="text-[13px] text-dark-gray hover:text-accent transition-colors py-1.5 border-b border-transparent hover:border-accent/10 flex items-center gap-2"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-accent/30 group-hover:bg-accent" />
                              {service.name}
                            </Link>
                          ))}
                        </div>
                        <div className="bg-soft-white p-4 border-t border-light-gray flex justify-between items-center">
                          <p className="text-[11px] text-primary/60">{(link as {category?: {description: string}}).category?.description}</p>
                          <Link to={link.path} className="text-[11px] font-bold text-accent hover:underline uppercase tracking-wider">
                            View All Services
                          </Link>
                        </div>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          
          {/* Desktop Search Trigger */}
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="w-10 h-10 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center hover:bg-accent/10 hover:text-accent transition-all duration-300 ml-2 group cursor-pointer"
            aria-label="Search Services"
          >
            <Search className="w-4 h-4 text-primary group-hover:text-accent transition-colors" />
          </button>

          <Link to="/contact" className="btn-accent text-[10px] 2xl:text-[11px] px-4 2xl:px-5 py-2 2xl:py-2.5 ml-2 shadow-glow whitespace-nowrap uppercase tracking-wider shrink-0">
            Book Consultation
          </Link>

          <div className="w-px h-8 bg-light-gray mx-4 hidden xl:block shrink-0"></div>

          <Link 
            to="/login" 
            className="flex items-center gap-2.5 group shrink-0"
          >
            <div className="flex flex-col items-end hidden xl:flex text-right shrink-0">
              <span className="text-[10px] font-bold text-accent-light uppercase tracking-wider leading-none mb-1 whitespace-nowrap">User Portal</span>
              <span className="text-xs font-black text-primary group-hover:text-accent transition-colors uppercase tracking-wider whitespace-nowrap">Login / Signup</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-accent/5 border border-accent/20 flex items-center justify-center group-hover:bg-accent transition-all duration-500 shrink-0 shadow-sm">
              <User className="w-5 h-5 text-accent group-hover:text-white transition-colors duration-500 group-hover:scale-110" />
            </div>
          </Link>
        </div>

        {/* Mobile Actions Container */}
        <div className="xl:hidden flex items-center gap-2">
          {/* Mobile Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 bg-white/50 backdrop-blur-md rounded-lg border border-white/20 text-primary"
            aria-label="Search Services"
          >
            <Search className="w-5 h-5" />
          </button>
          
          {/* Mobile Menu Toggle */}
          <button
            className="text-primary p-2 bg-white/50 backdrop-blur-md rounded-lg border border-white/20"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="xl:hidden bg-white border-b border-light-gray overflow-y-auto max-h-[80vh]"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <div key={link.name} className="flex flex-col gap-2">
                  <div className="flex justify-between items-center w-full">
                    <Link
                      to={link.path}
                      className={cn(
                        'text-sm font-bold uppercase tracking-wide py-1',
                        location.pathname === link.path ? 'text-accent' : 'text-primary'
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                    {link.hasDropdown && (
                      <button
                        onClick={() => setMobileDropdown(mobileDropdown === link.name ? null : link.name)}
                        className="p-2 text-primary hover:text-accent transition-colors"
                      >
                        <ChevronDown className={cn(
                          "w-4 h-4 transition-transform duration-300",
                          mobileDropdown === link.name && "rotate-180 text-accent"
                        )} />
                      </button>
                    )}
                  </div>
                  {link.hasDropdown && mobileDropdown === link.name && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="pl-4 border-l-2 border-accent/10 overflow-hidden"
                    >
                      {'categories' in link && link.categories ? (
                        (link.categories as NonNullable<typeof link.categories>).map((cat) => (
                          <div key={cat!.slug} className="mb-3">
                            <div className="text-[9px] font-black text-accent uppercase tracking-widest mb-1.5">{cat!.title}</div>
                            {cat!.services.map((service) => (
                              <Link
                                key={service.name}
                                to={`/services/${cat!.slug}/${service.slug}`}
                                className="block text-xs text-dark-gray py-1.5 hover:text-accent transition-colors"
                                onClick={() => setIsOpen(false)}
                              >
                                {service.name}
                              </Link>
                            ))}
                          </div>
                        ))
                      ) : (
                        (link as {category?: {services: {name: string; slug?: string}[]}}).category?.services.map((service) => (
                          <Link
                            key={service.name}
                            to={`${link.path}/${service.slug}`}
                            className="block text-xs text-dark-gray py-1.5 hover:text-accent transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            {service.name}
                          </Link>
                        ))
                      )}
                    </motion.div>
                  )}
                </div>
              ))}
              <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-light-gray">
                <Link 
                  to="/login" 
                  className="flex items-center justify-center gap-3 w-full py-3 border border-light-gray rounded-xl text-sm font-bold text-primary uppercase tracking-wide"
                  onClick={() => setIsOpen(false)}
                >
                  <User className="w-4 h-4" />
                  Login / Signup
                </Link>
                <Link 
                  to="/contact" 
                  className="flex items-center justify-center gap-2 w-full py-3 bg-accent text-white rounded-xl text-sm font-bold uppercase tracking-wide hover:bg-accent-light transition-all shadow-glow"
                  onClick={() => setIsOpen(false)}
                >
                  Free Consultation
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Search Overlay Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-primary/40 backdrop-blur-md z-[100] flex items-start justify-center pt-24 px-4"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
              className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-light-gray overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Search input header */}
              <div className="p-5 border-b border-light-gray flex items-center gap-3">
                <Search className="w-6 h-6 text-accent shrink-0" />
                <input
                  type="text"
                  placeholder="Search 100+ business compliances... (e.g. GST, Private Limited)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-lg outline-none text-primary placeholder-dark-gray/40 font-medium"
                  autoFocus
                />
                <button 
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className="p-1.5 rounded-lg bg-soft-white border border-light-gray text-dark-gray hover:bg-light-gray transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Suggestions / Results */}
              <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">
                {searchQuery.trim() === '' ? (
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black text-primary/30 uppercase tracking-[0.2em]">Popular Services</h4>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { name: 'Private Limited Company', slug: 'private-limited-company', cat: 'startup' },
                        { name: 'Trademark Registration', slug: 'trademark-registration', cat: 'trademark' },
                        { name: 'GST Registration', slug: 'gst-registration', cat: 'gst' },
                        { name: 'Startup India', slug: 'startup-india-registration', cat: 'registrations' },
                        { name: 'FSSAI License', slug: 'fssai-license', cat: 'food-license' },
                        { name: 'MSME Registration', slug: 'udyam-registration', cat: 'registrations' },
                        { name: 'LEI Code', slug: 'legal-entity-identifier-code', cat: 'registrations' }
                      ].map((item) => (
                        <button
                          key={item.name}
                          onClick={() => setSearchQuery(item.name)}
                          className="px-4 py-2 bg-soft-white hover:bg-accent/10 border border-light-gray hover:border-accent/30 text-xs font-bold text-dark-gray hover:text-accent rounded-xl transition-all duration-300 cursor-pointer"
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : filteredServices.length > 0 ? (
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-black text-primary/30 uppercase tracking-[0.2em] mb-4">Search Results ({filteredServices.length})</h4>
                    <div className="grid grid-cols-1 gap-2.5">
                      {filteredServices.map((service) => (
                        <Link
                          key={service.name}
                          to={`/services/${service.categorySlug}/${service.slug}`}
                          onClick={() => {
                            setIsSearchOpen(false);
                            setSearchQuery('');
                          }}
                          className="p-3.5 bg-soft-white hover:bg-accent/5 border border-light-gray hover:border-accent/20 rounded-xl flex items-center justify-between group transition-all duration-300"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center border border-primary/10 group-hover:bg-accent/10 transition-colors">
                              <Search className="w-4 h-4 text-primary group-hover:text-accent" />
                            </div>
                            <div>
                              <div className="text-sm font-bold text-primary group-hover:text-accent transition-colors">{service.name}</div>
                              <div className="text-[10px] text-dark-gray/50 font-bold uppercase tracking-wider">{service.categoryName}</div>
                            </div>
                          </div>
                          <span className="text-[10px] font-black text-accent-dark uppercase tracking-widest bg-accent/10 px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                            Get Quote
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="py-12 text-center space-y-3">
                    <div className="text-4xl">🔍</div>
                    <p className="text-sm text-dark-gray/60 font-semibold">No services found matching "{searchQuery}"</p>
                    <p className="text-xs text-dark-gray/40 font-medium">Try searching for generic terms like "GST", "LLP", or "FSSAI".</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

