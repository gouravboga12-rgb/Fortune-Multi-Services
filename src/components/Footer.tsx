import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link to="/" className="inline-block">
              <img src="/logo-footer.png" alt="Logo" className="h-24 md:h-32 object-contain" />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Fortune Multi Services provides complete business compliance and consultancy solutions for startups, professionals, and companies.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/fortune_multi_services_hyd?utm_source=qr&igsh=MThzbXVnMzhjZzJsdQ==" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 bg-gray-800 rounded-full hover:bg-accent hover:text-secondary transition-colors flex items-center justify-center"
                title="Instagram"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a 
                href="https://www.facebook.com/share/18ujQB7vop/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 bg-gray-800 rounded-full hover:bg-accent hover:text-secondary transition-colors flex items-center justify-center"
                title="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com/in/fortune-multi-services-hyderabad-74903b394?utm_source=share_via&utm_content=profile&utm_medium=member_android" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 bg-gray-800 rounded-full hover:bg-accent hover:text-secondary transition-colors flex items-center justify-center"
                title="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a 
                href="https://x.com/services28465" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 bg-gray-800 rounded-full hover:bg-accent hover:text-secondary transition-colors flex items-center justify-center"
                title="Twitter"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-accent">Quick Links</h4>
            <ul className="space-y-4 text-gray-400">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-accent">Our Services</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link to="/services/registrations" className="hover:text-white transition-colors">Business Registration</Link></li>
              <li><Link to="/services/gst" className="hover:text-white transition-colors">GST Filings</Link></li>
              <li><Link to="/services/tax-compliance" className="hover:text-white transition-colors">Tax Compliance</Link></li>
              <li><Link to="/services/govt-license" className="hover:text-white transition-colors">Govt. Licenses</Link></li>
              <li><Link to="/services/food-license" className="hover:text-white transition-colors">Food License</Link></li>
              <li><Link to="/services/trademark" className="hover:text-white transition-colors">Trademark Registration</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-accent">Get in Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin className="w-5 h-5 text-accent-light shrink-0" />
                <span>Plot no 178&179, Flat No 303, Mahadevpuram colony, Kukatpally, Hyderabad, 500072</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone className="w-5 h-5 text-accent-light shrink-0" />
                <a href="tel:+918919051513" className="hover:text-white">+91 89190 51513</a>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail className="w-5 h-5 text-accent-light shrink-0" />
                <a href="mailto:fortunemultiservices2023@gmail.com" className="hover:text-white">fortunemultiservices2023@gmail.com</a>
              </li>
            </ul>
            <div className="mt-8">
              <a
                href="https://wa.me/918919051513"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Fortune Multi Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
