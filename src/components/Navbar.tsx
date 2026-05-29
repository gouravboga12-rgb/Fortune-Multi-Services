import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, User, Search, PhoneCall } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { servicesData } from '../data/services';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface NavService {
  name: string;
  path: string;
}

interface NavLink {
  name: string;
  path: string;
  hasDropdown?: boolean;
  services?: NavService[];
  columns?: number;
}

export const navLinks: NavLink[] = [
  {
    name: 'Startup',
    path: '/services/startup',
    hasDropdown: true,
    columns: 2,
    services: [
      { name: 'Proprietorship', path: '/services/startup/proprietorship' },
      { name: 'Partnership', path: '/services/startup/partnership' },
      { name: 'One Person Company', path: '/services/startup/one-person-company' },
      { name: 'Limited Liability Partnership', path: '/services/startup/limited-liability-partnership' },
      { name: 'Private Limited Company', path: '/services/startup/private-limited-company' },
      { name: 'Section 8 Company', path: '/services/startup/section-8-company' },
      { name: 'Trust Registration', path: '/services/startup/trust-registration' },
      { name: 'Public Limited Company', path: '/services/startup/public-limited-company' },
      { name: 'Producer Company', path: '/services/startup/producer-company' },
      { name: 'Indian Subsidiary', path: '/services/startup/indian-subsidiary' },
    ],
  },
  {
    name: 'Registrations',
    path: '/services/registrations',
    hasDropdown: true,
    columns: 4,
    services: [
      { name: 'Startup India', path: '/services/registrations/startup-india-registration' },
      { name: 'Trade License', path: '/services/registrations/trade-license' },
      { name: 'FSSAI Registration', path: '/services/registrations/fssai-registration' },
      { name: 'FSSAI License', path: '/services/registrations/fssai-license' },
      { name: 'Halal License & Certification', path: '/services/registrations/halal-license-certification' },
      { name: 'ICEGATE Registration', path: '/services/registrations/icegate-registration' },
      { name: 'Import Export Code', path: '/services/registrations/import-export-code' },
      { name: 'Legal Entity Identifier Code', path: '/services/registrations/legal-entity-identifier-code' },
      { name: 'ISO Registration', path: '/services/registrations/iso-registration' },
      { name: 'PF Registration', path: '/services/registrations/pf-registration' },
      { name: 'ESI Registration', path: '/services/registrations/esi-registration' },
      { name: 'Professional Tax Registration', path: '/services/registrations/professional-tax-registration' },
      { name: 'RCMC Registration', path: '/services/registrations/rcmc-registration' },
      { name: 'TN RERA Registration for Agents', path: '/services/registrations/tn-rera-registration-agents' },
      { name: '12A and 80G Registration', path: '/services/registrations/12a-80g-registration' },
      { name: '12A Registration', path: '/services/registrations/12a-80g-registration' },
      { name: '80G Registration', path: '/services/registrations/12a-80g-registration' },
      { name: 'Barcode Registration', path: '/services/registrations/barcode-registration' },
      { name: 'BIS Registration', path: '/services/registrations/bis-registration' },
      { name: 'Certificate of Incumbency', path: '/services/registrations/certificate-of-incumbency' },
      { name: 'Darpan Registration', path: '/services/registrations/darpan-registration' },
      { name: 'Digital Signature', path: '/services/registrations/digital-signature' },
      { name: 'Shop Act Registration', path: '/services/registrations/shop-act-registration' },
      { name: 'Udyam Registration', path: '/services/registrations/udyam-registration' },
      { name: 'Fire License', path: '/services/registrations/fire-license' },
      { name: 'Legal Name Change', path: '/services/registrations/legal-name-change' },
      { name: 'Water Testing', path: '/services/registrations/water-testing' },
      { name: 'Food Testing', path: '/services/registrations/food-testing' },
    ],
  },
  {
    name: 'Trademark',
    path: '/services/trademark',
    hasDropdown: true,
    columns: 3,
    services: [
      { name: 'Trademark Registration', path: '/services/trademark/trademark-registration' },
      { name: 'Trademark Objection', path: '/services/trademark/trademark-objection' },
      { name: 'Trademark Certificate', path: '/services/trademark/trademark-certificate' },
      { name: 'Trademark Opposition', path: '/services/trademark/trademark-opposition' },
      { name: 'Trademark Hearing', path: '/services/trademark/trademark-hearing' },
      { name: 'Trademark Rectification', path: '/services/trademark/trademark-rectification' },
      { name: 'TM Infringement Notice', path: '/services/trademark/tm-infringement-notice' },
      { name: 'Trademark Renewal', path: '/services/trademark/trademark-renewal' },
      { name: 'Trademark Transfer', path: '/services/trademark/trademark-transfer' },
      { name: 'Expedited TM Registration', path: '/services/trademark/expedited-tm-registration' },
      { name: 'Logo Designing', path: '/services/trademark/logo-designing' },
      { name: 'Design Registration', path: '/services/trademark/design-registration' },
      { name: 'Design Objection', path: '/services/trademark/design-objection' },
      { name: 'Copyright Registration', path: '/services/trademark/copyright-registration' },
      { name: 'Copyright Objection', path: '/services/trademark/copyright-objection' },
      { name: 'Patent Registration', path: '/services/trademark/patent-registration' },
      { name: 'Trademark Protection', path: '/services/trademark/trademark-protection' },
    ],
  },
  {
    name: 'GST',
    path: '/services/gst',
    hasDropdown: true,
    columns: 2,
    services: [
      { name: 'GST Registration', path: '/services/gst/gst-registration' },
      { name: 'GST Return Filing by Accountant', path: '/services/gst/gst-return-filing' },
      { name: 'GST LUT Form', path: '/services/gst/gst-lut-form' },
      { name: 'GST Notice', path: '/services/gst/gst-notice' },
      { name: 'GST Annual Return Filing (GSTR-9)', path: '/services/gst/gst-annual-return-filing' },
      { name: 'GST Registration for Foreigners', path: '/services/gst/gst-registration-foreigners' },
      { name: 'GST Amendment', path: '/services/gst/gst-amendment' },
      { name: 'GST Revocation', path: '/services/gst/gst-revocation' },
      { name: 'GSTR-10', path: '/services/gst/gstr10' },
      { name: 'Virtual Office + GSTIN', path: '/services/gst/virtual-office-gstin' },
    ],
  },
  {
    name: 'Income Tax',
    path: '/services/tax-compliance?section=income-tax',
    hasDropdown: true,
    columns: 2,
    services: [
      { name: 'Income Tax E-Filing', path: '/services/tax-compliance/income-tax-efiling' },
      { name: 'Business Tax Filing', path: '/services/tax-compliance/business-tax-filing' },
      { name: 'Partnership Firm / LLP ITR', path: '/services/tax-compliance/partnership-llp-itr' },
      { name: 'Company ITR Filing', path: '/services/tax-compliance/company-itr-filing' },
      { name: 'Trust / NGO Tax Filing', path: '/services/tax-compliance/trust-ngo-tax-filing' },
      { name: '15CA - 15CB Filing', path: '/services/tax-compliance/15ca-15cb-filing' },
      { name: 'TAN Registration', path: '/services/tax-compliance/tan-registration' },
      { name: 'TDS Return Filing', path: '/services/tax-compliance/tds-return-filing' },
      { name: 'Income Tax Notice', path: '/services/tax-compliance/income-tax-notice' },
      { name: 'Revised ITR Return (ITR-U)', path: '/services/tax-compliance/revised-itr-return' },
    ],
  },
  {
    name: 'MCA',
    path: '/services/tax-compliance?section=mca',
    hasDropdown: true,
    columns: 3,
    services: [
      { name: 'Company Compliance', path: '/services/tax-compliance/company-compliance' },
      { name: 'LLP Compliance', path: '/services/tax-compliance/llp-compliance' },
      { name: 'OPC Compliance', path: '/services/tax-compliance/opc-compliance' },
      { name: 'Name Change - Company', path: '/services/tax-compliance/name-change-company' },
      { name: 'Registered Office Change', path: '/services/tax-compliance/registered-office-change' },
      { name: 'DIN eKYC Filing', path: '/services/tax-compliance/din-ekyc-filing' },
      { name: 'DIN Reactivation', path: '/services/tax-compliance/din-reactivation' },
      { name: 'Director Change', path: '/services/tax-compliance/director-change' },
      { name: 'Remove Director', path: '/services/tax-compliance/remove-director' },
      { name: 'ADT-1 Filing', path: '/services/tax-compliance/adt-1-filing' },
      { name: 'DPT-3 Filing', path: '/services/tax-compliance/dpt-3-filing' },
      { name: 'LLP Form 11 Filing', path: '/services/tax-compliance/llp-form-11-filing' },
      { name: 'Dormant Status Filing', path: '/services/tax-compliance/dormant-status-filing' },
      { name: 'MOA Amendment', path: '/services/tax-compliance/moa-amendment' },
      { name: 'AOA Amendment', path: '/services/tax-compliance/aoa-amendment' },
      { name: 'Authorized Capital Increase', path: '/services/tax-compliance/authorized-capital-increase' },
      { name: 'Share Transfer', path: '/services/tax-compliance/share-transfer' },
      { name: 'Demat of Shares', path: '/services/tax-compliance/demat-of-shares' },
      { name: 'Winding Up - LLP', path: '/services/tax-compliance/winding-up-llp' },
      { name: 'Winding Up - Company', path: '/services/tax-compliance/winding-up-company' },
      { name: 'Commencement (INC-20A)', path: '/services/tax-compliance/commencement-inc-20a' },
      { name: 'CCFS Scheme', path: '/services/tax-compliance/ccfs-scheme' },
    ],
  },
  {
    name: 'Compliance',
    path: '/services/tax-compliance?section=compliance',
    hasDropdown: true,
    columns: 2,
    services: [
      { name: 'FDI Filing', path: '/services/tax-compliance/fdi-filing' },
      { name: 'ODI Filing', path: '/services/tax-compliance/odi-filing' },
      { name: 'FLA Return Filing', path: '/services/tax-compliance/fla-return-filing' },
      { name: 'FSSAI Renewal', path: '/services/registrations/fssai-license' },
      { name: 'FSSAI Return Filing', path: '/services/registrations/fssai-registration' },
      { name: 'Business Plan', path: '/services/tax-compliance/business-plan' },
      { name: 'HR & Payroll', path: '/services/tax-compliance/hr-payroll' },
      { name: 'PF Return Filing', path: '/services/tax-compliance/pf-return-filing' },
      { name: 'ESI Return Filing', path: '/services/tax-compliance/esi-return-filing' },
      { name: 'Professional Tax Return Filing', path: '/services/tax-compliance/professional-tax-return-filing' },
      { name: 'Partnership Compliance', path: '/services/tax-compliance/partnership-compliance' },
      { name: 'Proprietorship Compliance', path: '/services/tax-compliance/proprietorship-compliance' },
      { name: 'Bookkeeping', path: '/services/tax-compliance/bookkeeping' },
      { name: 'CA Support', path: '/services/tax-compliance/ca-support' },
    ],
  },
  {
    name: 'Global',
    path: '/services/global',
    hasDropdown: true,
    columns: 2,
    services: [
      { name: 'UAE Company', path: '/services/global/uae-company' },
      { name: 'USA Company', path: '/services/global/usa-company' },
      { name: 'Singapore Company', path: '/services/global/singapore-company' },
      { name: 'UK Company', path: '/services/global/uk-company' },
      { name: 'USA Trademark Registration', path: '/services/global/usa-trademark-registration' },
    ],
  },
  { name: 'Web Services', path: '/web-services' },
  { name: 'About Us', path: '/about' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const dropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isLinkActive = (link: NavLink) => {
    if (link.path === '/') return location.pathname === '/';
    
    // Normalize current path
    const normCurrent = location.pathname.toLowerCase().replace(/_/g, '-');
    
    // Extract base path from link (ignoring query parameters)
    const [baseLinkPath, queryStr] = link.path.split('?');
    const normLinkPath = baseLinkPath.toLowerCase().replace(/_/g, '-');

    // Check if current path matches any sub-service inside this link's dropdown
    if (link.services && link.services.some((s) => {
      const normPath = s.path.toLowerCase().replace(/_/g, '-');
      return normCurrent === normPath;
    })) {
      return true;
    }
    
    // Check if current path matches the main link category path exactly
    if (normCurrent === normLinkPath) {
      // Special check for tax-compliance to avoid highlighting all three
      if (normLinkPath === '/services/tax-compliance') {
        const params = new URLSearchParams(location.search);
        const section = params.get('section');
        
        // Extract section from link query
        const linkParams = new URLSearchParams(queryStr || '');
        const linkSection = linkParams.get('section');
        
        if (section && linkSection) {
          return section === linkSection;
        }
        
        // Default: If no section query parameter in URL, default highlight 'Income Tax'
        if (!section && link.name === 'Income Tax') {
          return true;
        }
        return false;
      }
      return true;
    }
    
    // Fallback: If it's another category page like /services/startup
    if (normLinkPath !== '/services/tax-compliance' && normCurrent.startsWith(normLinkPath) && link.path !== '/') {
      return true;
    }
    
    return false;
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleOpenSearch = (e: Event) => {
      const customEvent = e as CustomEvent<{ query?: string }>;
      setIsSearchOpen(true);
      if (customEvent.detail?.query) {
        setSearchQuery(customEvent.detail.query);
      }
    };
    window.addEventListener('open-global-search', handleOpenSearch);
    return () => window.removeEventListener('open-global-search', handleOpenSearch);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setIsSearchOpen(false);
    setSearchQuery('');
    setActiveDropdown(null);
  }, [location]);

  const handleMouseEnter = (name: string) => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    dropdownTimer.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 120);
  };

  // Flattened services for global search
  const allServices = servicesData.flatMap(cat =>
    cat.services.map(s => ({
      ...s,
      categoryName: cat.title,
      categorySlug: cat.slug,
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
          ? 'bg-secondary shadow-premium border-b border-light-gray'
          : 'bg-primary/90 backdrop-blur-md'
      )}
    >
      <div
        className={cn(
          'w-full flex items-center transition-all duration-500',
          isOpen ? 'px-4 sm:px-5 py-3' : isScrolled ? 'px-4 sm:px-5 py-1.5 xl:px-4 2xl:px-8' : 'px-4 sm:px-5 py-3 xl:px-4 2xl:px-8'
        )}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center shrink-0 mr-4 xl:mr-16 2xl:mr-24">
          <img
            src="/logo.png"
            alt="Fortune Multi Services"
            className="h-9 sm:h-10 xl:h-11 2xl:h-14 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden xl:flex items-center flex-1 min-w-0">
          <div className="flex items-center gap-0 flex-1">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative flex items-center h-full"
                onMouseEnter={() => link.hasDropdown && handleMouseEnter(link.name)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  to={link.path}
                  className={cn(
                    'px-1.5 xl:px-2 2xl:px-2.5 py-4 text-[8px] xl:text-[8.5px] 2xl:text-[10px] font-bold tracking-tight uppercase transition-all duration-300 flex items-center gap-0.5 whitespace-nowrap',
                    isLinkActive(link)
                      ? 'text-accent font-extrabold'
                      : 'text-dark-gray hover:text-accent'
                  )}
                >
                  {link.name}
                  {link.hasDropdown && (
                    <ChevronDown
                      className={cn(
                        'w-2.5 h-2.5 xl:w-3 xl:h-3 transition-transform duration-300 shrink-0',
                        activeDropdown === link.name && 'rotate-180 text-accent'
                      )}
                    />
                  )}
                </Link>
                {isLinkActive(link) && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-1.5 right-1.5 h-[3px] bg-accent rounded-full shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  />
                )}

                {/* Mega Dropdown */}
                <AnimatePresence>
                  {link.hasDropdown && activeDropdown === link.name && link.services && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      onMouseEnter={() => handleMouseEnter(link.name)}
                      onMouseLeave={handleMouseLeave}
                      className={cn(
                        "absolute top-full bg-secondary shadow-2xl border border-light-gray rounded-xl overflow-hidden z-50 mt-3",
                        link.name === 'Startup' ? 'left-0' :
                        link.name === 'Registrations' ? '-left-20 xl:-left-32 2xl:left-1/2 2xl:-translate-x-1/2' :
                        link.name === 'Trademark' ? '-left-10 xl:-left-20 2xl:left-1/2 2xl:-translate-x-1/2' :
                        'left-1/2 -translate-x-1/2'
                      )}
                      style={{
                        width:
                          (link.columns ?? 2) === 4
                            ? '780px'
                            : (link.columns ?? 2) === 3
                            ? '620px'
                            : '460px',
                      }}
                    >
                      <div
                        className={cn(
                          'p-4 grid gap-x-4 gap-y-0.5',
                          link.columns === 4
                            ? 'grid-cols-4'
                            : link.columns === 3
                            ? 'grid-cols-3'
                            : 'grid-cols-2'
                        )}
                      >
                        {link.services.map((service) => (
                          <Link
                            key={service.name}
                            to={service.path}
                            className="text-[11px] text-dark-gray hover:text-accent transition-colors py-1 px-1 rounded flex items-center gap-1.5 hover:bg-accent/5 group"
                          >
                            <div className="w-1 h-1 rounded-full bg-accent/40 group-hover:bg-accent shrink-0 transition-colors" />
                            {service.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-1.5 xl:gap-2 shrink-0 ml-1">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-7 h-7 xl:w-8 xl:h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent/10 hover:text-accent transition-all duration-300 cursor-pointer group"
              aria-label="Search"
            >
              <Search className="w-3 h-3 xl:w-3.5 xl:h-3.5 text-dark-gray group-hover:text-accent transition-colors" />
            </button>

            {/* Book Consultation */}
            <Link
              to="/contact"
              className="flex items-center gap-1 bg-accent hover:bg-accent-light text-white text-[8px] xl:text-[8.5px] 2xl:text-[10px] font-bold px-2 xl:px-2.5 2xl:px-3.5 py-1.5 xl:py-2 rounded-lg uppercase tracking-wide shadow-glow whitespace-nowrap transition-all duration-300"
            >
              <PhoneCall className="w-2.5 h-2.5 xl:w-3 xl:h-3 shrink-0" />
              Free Consult
            </Link>

            {/* Divider */}
            <div className="w-px h-6 bg-white/15 mx-0.5 shrink-0" />

            {/* Login / Signup */}
            <Link
              to="/login"
              className="flex items-center gap-1.5 group shrink-0"
            >
              <div className="hidden 2xl:flex flex-col items-end text-right">
                <span className="text-[7px] 2xl:text-[8px] font-bold text-accent/80 uppercase tracking-wider leading-none mb-0.5 whitespace-nowrap">
                  User Portal
                </span>
                <span className="text-[8px] 2xl:text-[9px] font-black text-white group-hover:text-accent transition-colors uppercase tracking-wide whitespace-nowrap">
                  Login / Signup
                </span>
              </div>
              <div className="flex items-center gap-1 bg-white/5 border border-accent/25 hover:bg-accent hover:border-accent px-2 xl:px-2.5 py-1.5 xl:py-2 rounded-lg transition-all duration-300">
                <User className="w-3 h-3 xl:w-3.5 xl:h-3.5 text-accent group-hover:text-white transition-colors" />
                <span className="text-[8px] xl:text-[8.5px] font-bold text-accent group-hover:text-white transition-colors uppercase tracking-wide whitespace-nowrap">
                  Login
                </span>
              </div>
            </Link>
          </div>
        </div>

        {/* Mobile Actions */}
        <div className="xl:hidden flex items-center gap-2 ml-auto shrink-0">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 text-white"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>
          <button
            className="text-white p-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
            className="xl:hidden bg-secondary border-b border-light-gray overflow-y-auto max-h-[80vh]"
          >
            <div className="flex flex-col p-5 gap-3">
              {navLinks.map((link) => (
                <div key={link.name} className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center w-full">
                    <div className="flex items-center gap-2">
                      {isLinkActive(link) && (
                        <div className="w-1 h-3.5 bg-accent rounded-full shadow-[0_0_8px_rgba(6,182,212,0.8)] shrink-0" />
                      )}
                      <Link
                        to={link.path}
                        className={cn(
                          'text-sm font-bold uppercase tracking-wide py-1 transition-all duration-300',
                          isLinkActive(link)
                            ? 'text-accent pl-0.5'
                            : 'text-white'
                        )}
                        onClick={() => !link.hasDropdown && setIsOpen(false)}
                      >
                        {link.name}
                      </Link>
                    </div>
                    {link.hasDropdown && (
                      <button
                        onClick={() =>
                          setMobileDropdown(mobileDropdown === link.name ? null : link.name)
                        }
                        className="p-1.5 text-dark-gray hover:text-accent transition-colors"
                      >
                        <ChevronDown
                          className={cn(
                            'w-4 h-4 transition-transform duration-300',
                            mobileDropdown === link.name && 'rotate-180 text-accent'
                          )}
                        />
                      </button>
                    )}
                  </div>
                  {link.hasDropdown && mobileDropdown === link.name && link.services && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="pl-3 border-l-2 border-accent/20 grid grid-cols-2 gap-x-2 gap-y-0.5"
                    >
                      {link.services.map((service) => (
                        <Link
                          key={service.name}
                          to={service.path}
                          className="text-xs text-dark-gray py-1.5 hover:text-accent transition-colors flex items-center gap-1"
                          onClick={() => setIsOpen(false)}
                        >
                          <div className="w-1 h-1 rounded-full bg-accent/40 shrink-0" />
                          {service.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}

              {/* Mobile Bottom Actions */}
              <div className="flex flex-col gap-2.5 mt-3 pt-4 border-t border-light-gray">
                <Link
                  to="/login"
                  className="flex items-center justify-center gap-2 w-full py-2.5 border border-accent/30 rounded-xl text-sm font-bold text-accent uppercase tracking-wide hover:bg-accent/5 transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  <User className="w-4 h-4" />
                  Login / Signup
                </Link>
                <Link
                  to="/contact"
                  className="flex items-center justify-center gap-2 w-full py-2.5 bg-accent text-white rounded-xl text-sm font-bold uppercase tracking-wide hover:bg-accent-light transition-all shadow-glow"
                  onClick={() => setIsOpen(false)}
                >
                  <PhoneCall className="w-4 h-4" />
                  Free Consultation
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-primary/50 backdrop-blur-md z-[100] flex items-start justify-center pt-24 px-4"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
              className="bg-secondary w-full max-w-2xl rounded-2xl shadow-2xl border border-light-gray overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-5 border-b border-light-gray flex items-center gap-3">
                <Search className="w-5 h-5 text-accent shrink-0" />
                <input
                  type="text"
                  placeholder="Search services... (e.g. GST, Trademark, FSSAI)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-base outline-none text-dark-gray bg-transparent placeholder-dark-gray/40 font-medium"
                  autoFocus
                />
                <button
                  onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                  className="p-1.5 rounded-lg bg-soft-white border border-light-gray text-dark-gray hover:bg-light-gray transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5 max-h-[60vh] overflow-y-auto">
                {searchQuery.trim() === '' ? (
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-black text-primary/30 uppercase tracking-[0.2em]">
                      Popular Services
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { name: 'Private Limited Company', path: '/services/startup/private-limited-company' },
                        { name: 'Trademark Registration', path: '/services/trademark/trademark-registration' },
                        { name: 'GST Registration', path: '/services/gst/gst-registration' },
                        { name: 'FSSAI License', path: '/services/registrations/fssai-license' },
                        { name: 'Udyam Registration', path: '/services/registrations/udyam-registration' },
                        { name: 'Income Tax Filing', path: '/services/tax-compliance/income-tax-efiling' },
                        { name: 'LLP Registration', path: '/services/startup/limited-liability-partnership' },
                      ].map((item) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                          className="px-3 py-1.5 bg-soft-white hover:bg-accent/10 border border-light-gray hover:border-accent/30 text-xs font-bold text-dark-gray hover:text-accent rounded-xl transition-all duration-300"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : filteredServices.length > 0 ? (
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-black text-primary/30 uppercase tracking-[0.2em] mb-3">
                      Results ({filteredServices.length})
                    </h4>
                    {filteredServices.map((service) => (
                      <Link
                        key={service.name}
                        to={`/services/${service.categorySlug}/${service.slug}`}
                        onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                        className="p-3 bg-secondary hover:bg-accent/5 border border-light-gray hover:border-accent/20 rounded-xl flex items-center justify-between group transition-all duration-300"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-lg bg-primary/5 flex items-center justify-center border border-primary/10 group-hover:bg-accent/10 transition-colors">
                            <Search className="w-3.5 h-3.5 text-primary group-hover:text-accent" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-primary group-hover:text-accent transition-colors">
                              {service.name}
                            </div>
                            <div className="text-[10px] text-dark-gray/50 font-bold uppercase tracking-wider">
                              {service.categoryName}
                            </div>
                          </div>
                        </div>
                        <span className="text-[10px] font-black text-accent-dark uppercase tracking-widest bg-accent/10 px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                          View →
                        </span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="py-10 text-center space-y-2">
                    <div className="text-3xl">🔍</div>
                    <p className="text-sm text-dark-gray/60 font-semibold">
                      No services found for "{searchQuery}"
                    </p>
                    <p className="text-xs text-dark-gray/40 font-medium">
                      Try terms like "GST", "LLP", "FSSAI", or "Trademark".
                    </p>
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
