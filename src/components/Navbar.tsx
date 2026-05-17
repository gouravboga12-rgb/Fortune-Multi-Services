import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, User } from 'lucide-react';
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
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About Us', path: '/about' },
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
      name: 'Govt License', 
      path: '/services/govt-license', 
      hasDropdown: true,
      category: servicesData.find(c => c.slug === 'govt-license')
    },
    { 
      name: 'Food License', 
      path: '/services/food-license', 
      hasDropdown: true,
      category: servicesData.find(c => c.slug === 'food-license')
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
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-500',
        isScrolled 
          ? 'bg-white py-1 shadow-premium border-b border-light-gray' 
          : 'bg-white/80 backdrop-blur-md py-4'
      )}
    >
      <div className="w-full px-4 lg:px-8 2xl:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <img src="/logo.png" alt="Fortune Multi Services" className="h-14 md:h-16 w-auto object-contain" />
        </Link>

        {/* Desktop Links */}
        <div className="hidden xl:flex items-center gap-1">
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
                    className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-white shadow-2xl border border-light-gray rounded-xl overflow-hidden z-50 mt-[-5px]"
                  >
                    <div className="p-6 grid grid-cols-2 gap-x-8 gap-y-2">
                      {link.category?.services.map((service) => (
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
                      <p className="text-[11px] text-primary/60">{link.category?.description}</p>
                      <Link to={link.path} className="text-[11px] font-bold text-accent hover:underline uppercase tracking-wider">
                        View All Services
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          
          <Link to="/contact" className="btn-accent text-[10px] 2xl:text-[11px] px-4 2xl:px-5 py-2 2xl:py-2.5 ml-2 2xl:ml-4 shadow-glow whitespace-nowrap uppercase tracking-wider">
            Book Consultation
          </Link>

          <div className="w-px h-8 bg-light-gray mx-4 hidden xl:block"></div>

          <Link 
            to="/login" 
            className="flex items-center gap-3 group"
          >
            <div className="flex flex-col items-end hidden xl:flex">
              <span className="text-[8px] font-black text-primary/30 uppercase tracking-[0.2em] leading-none mb-1">User Portal</span>
              <span className="text-[10px] font-black text-primary group-hover:text-accent transition-colors uppercase tracking-widest">Login / Signup</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center group-hover:bg-primary transition-all duration-500">
              <User className="w-5 h-5 text-primary group-hover:text-white transition-colors duration-500 group-hover:scale-110" />
            </div>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="xl:hidden text-primary p-2 bg-white/50 backdrop-blur-md rounded-lg border border-white/20"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
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
                      className="grid grid-cols-1 gap-2 pl-4 border-l-2 border-accent/10 overflow-hidden"
                    >
                      {link.category?.services.map((service) => (
                        <Link
                          key={service.name}
                          to={`${link.path}/${service.slug}`}
                          className="text-xs text-dark-gray py-1.5 hover:text-accent transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {service.name}
                        </Link>
                      ))}
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
                  className="btn-accent w-full text-center py-3"
                  onClick={() => setIsOpen(false)}
                >
                  Free Consultation
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
