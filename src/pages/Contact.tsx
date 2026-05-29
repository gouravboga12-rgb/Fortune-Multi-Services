import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2, Clock } from 'lucide-react';
import { navLinks } from '../components/Navbar';
import { motion } from 'framer-motion';
import { createInquiry } from '../config/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  });

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const nameParam = params.get('name') || '';
    const serviceParam = params.get('service') || '';

    if (nameParam || serviceParam) {
      setFormData(prev => ({
        ...prev,
        service: serviceParam || prev.service,
        message: nameParam
          ? `I would like to verify the availability and register the company name: "${nameParam}".`
          : prev.message
      }));
    }
  }, [location]);

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await createInquiry({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      service: formData.service || 'General Consultancy',
      message: formData.message,
      paid: false
    });

    const whatsappMessage = encodeURIComponent(
      `Hello! My name is ${formData.name}. I am interested in ${formData.service || 'your services'}. \n\nMessage: ${formData.message}`
    );
    window.open(`https://wa.me/918919051513?text=${whatsappMessage}`, '_blank');

    setLoading(false);
    setSubmitted(true);
    setFormData({ name: '', phone: '', email: '', service: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const contactCards = [
    {
      icon: <Phone className="w-5 h-5 text-accent" />,
      bg: 'bg-accent/10',
      label: 'Call Us',
      sub: 'Mon–Sat, 9am–7pm',
      action: <a href="tel:+918919051513" className="text-white font-black text-base hover:text-accent hover:underline">+91 89190 51513</a>
    },
    {
      icon: <MessageSquare className="w-5 h-5 text-green-400" />,
      bg: 'bg-green-500/10',
      label: 'WhatsApp',
      sub: 'Instant consultation',
      action: <a href="https://wa.me/918919051513" target="_blank" rel="noopener noreferrer" className="text-green-400 font-black text-base hover:text-green-300 hover:underline">Chat with Expert</a>
    },
    {
      icon: <Mail className="w-5 h-5 text-accent" />,
      bg: 'bg-accent/10',
      label: 'Email',
      sub: 'For formal inquiries',
      action: <a href="mailto:fortunemultiservices2023@gmail.com" className="text-accent font-black text-xs break-all hover:text-accent-light hover:underline">fortunemultiservices2023@gmail.com</a>
    },
    {
      icon: <Clock className="w-5 h-5 text-purple-400" />,
      bg: 'bg-purple-500/10',
      label: 'Working Hours',
      sub: 'Sunday Closed',
      action: <span className="text-white font-black text-sm">Mon–Sat 9:00 AM – 7:00 PM</span>
    },
  ];

  return (
    <div className="bg-soft-white min-h-screen">

      {/* Hero Header */}
      <section className="relative pt-32 pb-10 sm:pt-40 sm:pb-16 overflow-hidden bg-primary">
        <div className="absolute inset-0 mesh-gradient opacity-60"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-accent/20 border border-accent/30 text-accent text-[10px] font-black uppercase tracking-widest mb-4">
              Get in Touch
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black text-white leading-tight tracking-tighter mb-4">
              Let's Build Your<br className="hidden sm:block" /> Business Together
            </h1>
            <p className="text-sm sm:text-lg text-white/60 font-medium max-w-xl mx-auto leading-relaxed">
              Have questions about registrations or compliance? Our experts are just a message away.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards — horizontal scroll on mobile */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 relative z-10">
        <div className="flex gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible snap-x snap-mandatory">
          {contactCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="glass-card bg-secondary p-5 rounded-2xl border border-light-gray shadow-premium shrink-0 w-[200px] sm:w-auto snap-center flex flex-col gap-3"
            >
              <div className={`w-10 h-10 ${card.bg} rounded-xl flex items-center justify-center shrink-0`}>
                {card.icon}
              </div>
              <div>
                <h3 className="text-sm font-black text-white mb-0.5">{card.label}</h3>
                <p className="text-[11px] text-gray-400 font-medium mb-2">{card.sub}</p>
                {card.action}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Main Form + Map */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-12">

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3 glass-card bg-secondary p-6 sm:p-10 rounded-2xl border border-light-gray shadow-premium"
          >
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-1">Send an Inquiry</h2>
            <p className="text-sm text-dark-gray/60 mb-6 sm:mb-8">Fill in the details below and we'll get back to you over WhatsApp instantly.</p>

            {submitted ? (
              <div className="bg-green-50 border border-green-200 p-6 sm:p-8 rounded-2xl text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto" />
                <h3 className="text-xl font-black text-green-800">Thank You!</h3>
                <p className="text-sm text-green-700">Your inquiry has been submitted and you are being redirected to WhatsApp for faster communication.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-dark-gray/80 uppercase tracking-wider">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-3 rounded-xl border border-light-gray focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all text-sm bg-primary text-white"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-dark-gray/80 uppercase tracking-wider">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 9876543210"
                      className="w-full px-4 py-3 rounded-xl border border-light-gray focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all text-sm bg-primary text-white"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-dark-gray/80 uppercase tracking-wider">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. john@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-light-gray focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all text-sm bg-primary text-white"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-dark-gray/80 uppercase tracking-wider">Service Required</label>
                    <select
                      required
                      className="w-full px-4 py-3 rounded-xl border border-light-gray focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all appearance-none bg-primary text-white text-sm"
                      value={formData.service}
                      onChange={(e) => setFormData({...formData, service: e.target.value})}
                    >
                      <option value="">Select a service</option>
                      <optgroup label="Web Services">
                        <option value="Business Websites">Business Websites</option>
                        <option value="Mobile-First Design">Mobile-First Design</option>
                        <option value="E-Commerce Solutions">E-Commerce Solutions</option>
                        <option value="Web Applications">Web Applications</option>
                        <option value="SEO & Marketing">SEO & Marketing</option>
                        <option value="Website Maintenance">Website Maintenance</option>
                        <option value="Shared Hosting">Shared Hosting</option>
                        <option value="Cloud Hosting">Cloud Hosting</option>
                        <option value="Dedicated Servers">Dedicated Servers</option>
                      </optgroup>
                      {navLinks
                        .filter(link => link.hasDropdown && link.services)
                        .map(link => (
                          <optgroup key={link.name} label={link.name}>
                            {link.services?.map(s => (
                              <option key={s.name} value={s.name}>{s.name}</option>
                            ))}
                          </optgroup>
                        ))
                      }
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-black text-dark-gray/80 uppercase tracking-wider">Your Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your requirements..."
                    className="w-full px-4 py-3 rounded-xl border border-light-gray focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all text-sm bg-primary text-white resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-accent w-full py-4 text-sm sm:text-base flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  {loading ? 'Submitting...' : 'Submit Inquiry'}
                </button>
              </form>
            )}
          </motion.div>

          {/* Office Info + Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            {/* Office Card */}
            <div className="glass-card bg-secondary p-6 rounded-2xl border border-light-gray shadow-premium">
              <h2 className="text-lg sm:text-xl font-black text-white mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-accent" />
                Visit Our Office
              </h2>
              <p className="text-sm text-dark-gray leading-relaxed mb-5">
                Plot no 178 &amp; 179, Flat No 303, Damarhu Construction,<br />
                Mahadevpuram Colony, Usha Mullapudi Rd,<br />
                Kukatpally, Hyderabad, Telangana 500072
              </p>
              <div className="pt-4 border-t border-light-gray space-y-2">
                <p className="text-[10px] font-black text-dark-gray/60 uppercase tracking-widest">Working Hours</p>
                <div className="flex justify-between text-sm font-bold text-white">
                  <span>Monday – Saturday</span>
                  <span className="text-accent">9:00 AM – 7:00 PM</span>
                </div>
                <div className="flex justify-between text-sm text-dark-gray/50">
                  <span>Sunday</span>
                  <span className="text-red-400 font-bold">Closed</span>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-light-gray shadow-premium h-[260px] sm:h-[340px] lg:flex-1">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.2952875150534!2d78.39763787595707!3d17.493393083411476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91f5f5f5f5f5%3A0x1234567890abcdef!2sKukatpally%2C%20Hyderabad%2C%20Telangana%20500072!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
};

export default Contact;
