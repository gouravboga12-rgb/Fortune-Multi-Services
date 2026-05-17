import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2 } from 'lucide-react';
import { servicesData } from '../data/services';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Store inquiry in Resilient API backend
    await createInquiry({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      service: formData.service || 'General Consultancy',
      message: formData.message,
      paid: false
    });

    // Redirect to WhatsApp
    const whatsappMessage = encodeURIComponent(
      `Hello! My name is ${formData.name}. I am interested in ${formData.service || 'your services'}. \n\nMessage: ${formData.message}`
    );
    window.open(`https://wa.me/918919051513?text=${whatsappMessage}`, '_blank');

    setSubmitted(true);
    setFormData({ name: '', phone: '', email: '', service: '', message: '' });
    
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="pt-24 pb-20">
      <section className="bg-soft-white py-20 border-b border-light-gray">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-6 text-secondary" data-aos="fade-up">Get in Touch</h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            Have questions about business registrations or compliance? Our experts are just a message away.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 -mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-2xl border border-light-gray shadow-sm" data-aos="fade-up">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Call Us</h3>
              <p className="text-gray-500 text-sm mb-4">Available Mon-Sat, 9am to 7pm</p>
              <a href="tel:+918919051513" className="text-primary font-bold text-lg hover:underline">+91 89190 51513</a>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-light-gray shadow-sm" data-aos="fade-up" data-aos-delay="100">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-6">
                <MessageSquare className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">WhatsApp</h3>
              <p className="text-gray-500 text-sm mb-4">Instant support and consultation</p>
              <a href="https://wa.me/918919051513" target="_blank" rel="noopener noreferrer" className="text-green-600 font-bold text-lg hover:underline">Chat with Expert</a>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-light-gray shadow-sm" data-aos="fade-up" data-aos-delay="200">
              <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center mb-6">
                <Mail className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-2">Email</h3>
              <p className="text-gray-500 text-sm mb-4">For formal inquiries and quotes</p>
              <a href="mailto:fortunemultiservices2023@gmail.com" className="text-accent font-bold text-sm break-all hover:underline">fortunemultiservices2023@gmail.com</a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white p-8 lg:p-12 rounded-3xl border border-light-gray shadow-xl" data-aos="fade-left">
            <h2 className="text-3xl font-bold mb-8 text-secondary">Send an Inquiry</h2>
            
            {submitted ? (
              <div className="bg-green-50 border border-green-200 p-8 rounded-2xl text-center space-y-4">
                <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto" />
                <h3 className="text-2xl font-bold text-green-800">Thank You!</h3>
                <p className="text-green-700">Your inquiry has been stored and you are being redirected to WhatsApp for faster communication.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-secondary">Full Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-3 rounded-xl border border-light-gray focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-secondary">Phone Number</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="e.g. +91 9876543210"
                      className="w-full px-4 py-3 rounded-xl border border-light-gray focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-secondary">Email Address</label>
                    <input 
                      type="email" 
                      required
                      placeholder="e.g. john@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-light-gray focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-secondary">Service Required</label>
                    <select 
                      required
                      className="w-full px-4 py-3 rounded-xl border border-light-gray focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none bg-white"
                      value={formData.service}
                      onChange={(e) => setFormData({...formData, service: e.target.value})}
                    >
                      <option value="">Select a service</option>
                      {servicesData.map(c => (
                        <optgroup key={c.slug} label={c.title}>
                          {c.services.map(s => (
                            <option key={s.name} value={s.name}>{s.name}</option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-secondary">Your Message</label>
                  <textarea 
                    rows={4}
                    required
                    placeholder="Tell us about your requirements..."
                    className="w-full px-4 py-3 rounded-xl border border-light-gray focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>

                <button type="submit" className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-3">
                  <Send className="w-5 h-5" />
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Map & Address */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-right">
            <h2 className="text-3xl font-bold mb-8 text-secondary">Visit Our Office</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <MapPin className="w-6 h-6 text-primary shrink-0" />
                <div>
                  <h4 className="font-bold text-secondary">Registered Address</h4>
                  <p className="text-gray-500 leading-relaxed">
                    Plot no 178&179, Flat No 303, Damarhu Construction,<br />
                    Mahadevpuram colony, Usha Mullapudi Rd,<br />
                    Kukatpally, Hyderabad, Telangana 500072
                  </p>
                </div>
              </div>
              <div className="pt-8 border-t border-light-gray">
                <p className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-4">Working Hours</p>
                <div className="flex justify-between text-secondary font-bold">
                  <span>Monday - Saturday</span>
                  <span>09:00 AM - 07:00 PM</span>
                </div>
                <div className="flex justify-between text-gray-400 mt-2">
                  <span>Sunday</span>
                  <span className="text-red-400">Closed</span>
                </div>
              </div>
            </div>
          </div>
          <div data-aos="fade-left" className="h-[400px] rounded-3xl overflow-hidden border border-light-gray shadow-lg">
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
        </div>
      </div>
    </div>
  );
};

export default Contact;
