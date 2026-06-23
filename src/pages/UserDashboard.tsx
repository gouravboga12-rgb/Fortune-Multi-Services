import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, ShieldCheck,
  Calendar, LogOut, CheckCircle2,
  Clock, AlertTriangle, FileText, ArrowRight,
  HelpCircle, MessageSquare, Download
} from 'lucide-react';
import { getInquiries, type Inquiry } from '../config/api';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [orders, setOrders] = useState<Inquiry[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<'orders' | 'support'>('orders');

  useEffect(() => {
    const userEmail = sessionStorage.getItem('userEmail');
    if (!userEmail) {
      navigate('/login');
      return;
    }
    setEmail(userEmail);

    const loadData = async () => {
      try {
        const allInquiries = await getInquiries();
        // Filter inquiries belonging to the logged-in customer email
        const userRecords = allInquiries.filter(
          item => item.email.toLowerCase().trim() === userEmail.toLowerCase().trim()
        );
        
        // Split into orders (paid) and general inquiries (unpaid)
        setOrders(userRecords.filter(item => item.paid));
        setInquiries(userRecords.filter(item => !item.paid));
      } catch (error) {
        console.error('Failed to load user portal data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('userEmail');
    navigate('/login');
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'New':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20"><Clock className="w-3.5 h-3.5" /> Received</span>;
      case 'Under Review':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/20"><Clock className="w-3.5 h-3.5" /> Under Review</span>;
      case 'Documents Pending':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-bold border border-rose-500/20"><AlertTriangle className="w-3.5 h-3.5" /> Action Needed: Docs Pending</span>;
      case 'Processing':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold border border-purple-500/20"><Clock className="w-3.5 h-3.5" /> Processing setup</span>;
      case 'Completed':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20"><CheckCircle2 className="w-3.5 h-3.5" /> Completed & Issued</span>;
      case 'Rejected':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-bold border border-red-500/20"><AlertTriangle className="w-3.5 h-3.5" /> Rejected</span>;
      default:
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20"><Clock className="w-3.5 h-3.5" /> Pending Approval</span>;
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-soft-white relative overflow-hidden">
      {/* Dynamic BG Orbs */}
      <div className="absolute top-20 right-0 w-80 h-80 bg-accent/5 rounded-full blur-[120px] pointer-events-none -mr-20"></div>
      <div className="absolute bottom-10 left-0 w-80 h-80 bg-[#7C3AED]/5 rounded-full blur-[120px] pointer-events-none -ml-20"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Upper User Details banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 sm:p-10 bg-gradient-to-b from-[#0f172a]/95 to-[#0b0f19]/95 border border-white/10 shadow-premium rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6 mb-10 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-accent/5 blur-3xl pointer-events-none rounded-bl-full"></div>
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center border border-accent/30 shadow-[0_0_20px_rgba(6,182,212,0.15)] shrink-0">
              <User className="w-8 h-8 text-accent animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-black uppercase text-accent tracking-widest bg-accent/10 px-2 py-0.5 rounded-md border border-accent/20">Customer Workspace</span>
                <span className="flex items-center gap-0.5 text-[9px] font-black uppercase text-emerald-400 tracking-widest bg-emerald-400/10 px-2 py-0.5 rounded-md border border-emerald-400/20"><ShieldCheck className="w-3.5 h-3.5" /> Secured</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-100 mt-1 truncate max-w-xs sm:max-w-md">{email}</h1>
              <p className="text-xs text-dark-gray/60 font-medium mt-0.5">Track registration statuses and download final issued certifications.</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-3 bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/30 text-xs text-white/70 hover:text-red-400 font-bold uppercase tracking-wider rounded-xl transition-all duration-300 cursor-pointer shrink-0"
          >
            <LogOut className="w-4 h-4" />
            Logout Account
          </button>
        </motion.div>

        {/* Dynamic content wrapper */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Navigation panels sidebar */}
          <div className="lg:col-span-1 space-y-3">
            {[
              { id: 'orders', label: 'My Applications', count: orders.length, icon: FileText },
              { id: 'support', label: 'General Enquiries', count: inquiries.length, icon: MessageSquare }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id as any)}
                className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl text-left border transition-all cursor-pointer font-semibold text-sm ${
                  activeSection === item.id
                    ? 'bg-secondary text-white border-accent shadow-premium'
                    : 'bg-secondary/40 text-dark-gray border-white/5 hover:border-white/10 hover:bg-secondary/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={`w-4 h-4 ${activeSection === item.id ? 'text-accent' : 'text-dark-gray/60'}`} />
                  <span>{item.label}</span>
                </div>
                {item.count > 0 && (
                  <span className={`px-2 py-0.5 text-[9px] font-black rounded-md ${activeSection === item.id ? 'bg-accent/20 text-accent border border-accent/20' : 'bg-white/5 text-dark-gray/60 border border-white/5'}`}>{item.count}</span>
                )}
              </button>
            ))}

            <div className="glass-card p-6 bg-gradient-to-br from-secondary/30 to-primary/30 border border-white/5 space-y-4">
              <h4 className="text-xs font-black uppercase text-[#b9c9d6] flex items-center gap-1.5"><HelpCircle className="w-4 h-4 text-accent" /> Need Assistance?</h4>
              <p className="text-[11px] text-dark-gray/60 leading-relaxed font-medium">Reach out directly on WhatsApp to submit any pending documentation.</p>
              <a
                href="https://wa.me/918919051513?text=Hi, I am logged into my customer dashboard and need assistance."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent py-2.5 px-4 rounded-xl font-black text-[10px] uppercase tracking-wider text-center flex items-center justify-center gap-1.5 cursor-pointer shadow-glow"
              >
                WhatsApp Advisor
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Main workspace */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 bg-secondary/20 border border-white/5 rounded-3xl">
                <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
                <p className="text-xs text-dark-gray/60 mt-3 font-semibold">Connecting to vault...</p>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                {activeSection === 'orders' ? (
                  <motion.div
                    key="orders"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-black text-[#b9c9d6]">Service Applications</h2>
                      <span className="text-[10px] font-black uppercase text-accent tracking-wider bg-accent/10 border border-accent/20 px-3 py-1 rounded-full">{orders.length} Applications</span>
                    </div>

                    {orders.length > 0 ? (
                      <div className="space-y-4">
                        {orders.map(order => (
                          <div
                            key={order.id}
                            className="glass-card p-6 bg-secondary/45 border-white/5 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:border-white/10 transition-all duration-300"
                          >
                            <div className="space-y-3">
                              <div className="flex flex-wrap items-center gap-2.5">
                                <span className="text-[9px] font-mono font-black uppercase text-dark-gray/50 tracking-wider">ID: {order.payment_id || order.id}</span>
                                {getStatusBadge(order.order_status)}
                              </div>
                              <h3 className="text-base sm:text-lg font-bold text-slate-100 leading-tight">{order.service_name || order.service}</h3>
                              
                              <div className="flex flex-wrap gap-4 text-[10px] text-dark-gray/60 font-semibold uppercase tracking-wider">
                                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-accent" /> {new Date(order.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                                <span>·</span>
                                <span className="text-accent font-black">Fee Paid: ₹{order.amount || 199}/-</span>
                              </div>

                              {order.form_details && Object.keys(order.form_details).length > 0 && (
                                <div className="mt-2 p-3 bg-primary/30 border border-white/5 rounded-xl text-[11px] text-dark-gray font-medium space-y-1">
                                  <div className="font-bold text-[#b9c9d6] uppercase text-[9px] tracking-wider mb-1.5 border-b border-white/5 pb-1">Submitted Forms:</div>
                                  {Object.entries(order.form_details).map(([k, v]) => (
                                    <div key={k} className="flex justify-between gap-4 py-0.5">
                                      <span className="text-white/40">{k.replace(/([A-Z])/g, ' $1')}:</span>
                                      <span className="text-[#b9c9d6] font-bold text-right truncate max-w-xs">{typeof v === 'object' ? JSON.stringify(v) : String(v)}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>

                            {/* Certification Deliverables */}
                            <div className="shrink-0 flex items-center justify-end">
                              {order.certificate_url ? (
                                <a
                                  href={order.certificate_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  download
                                  className="btn-accent inline-flex items-center gap-2 py-3 px-5 rounded-xl text-xs font-black uppercase tracking-wider text-center cursor-pointer shadow-glow whitespace-nowrap"
                                >
                                  <Download className="w-4 h-4" />
                                  Download Certificate
                                </a>
                              ) : (
                                <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-center gap-2.5 max-w-xs text-right">
                                  <div className="text-[10px] text-dark-gray/50 font-bold leading-normal">
                                    <span className="text-[#b9c9d6] font-black uppercase block tracking-wider mb-0.5">Setup In Progress</span>
                                    Certificate will appear here upon completion
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-20 bg-secondary/20 border border-white/5 border-dashed rounded-3xl text-center p-6">
                        <FileText className="w-12 h-12 text-dark-gray/20 mb-3" />
                        <h3 className="text-[#b9c9d6] font-bold text-base mb-1">No Active Applications</h3>
                        <p className="text-xs text-dark-gray/60 max-w-xs mx-auto mb-6">You haven't applied or registered for any setup services yet.</p>
                        <Link to="/services/startup" className="btn-accent inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest px-6 py-3.5">
                          Purchase Registration <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="support"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-black text-[#b9c9d6]">General Contact Enquiries</h2>
                      <span className="text-[10px] font-black uppercase text-accent tracking-wider bg-accent/10 border border-accent/20 px-3 py-1 rounded-full">{inquiries.length} Enquiries</span>
                    </div>

                    {inquiries.length > 0 ? (
                      <div className="space-y-4">
                        {inquiries.map(inq => (
                          <div
                            key={inq.id}
                            className="glass-card p-6 bg-secondary/45 border-white/5 shadow-md flex flex-col gap-3"
                          >
                            <div className="flex justify-between items-start gap-4 border-b border-white/5 pb-2">
                              <div>
                                <span className="text-[9px] font-black uppercase text-accent tracking-widest bg-accent/10 border border-accent/20 px-2 py-0.5 rounded">Contact Query</span>
                                {inq.service_name && (
                                  <span className="ml-2 text-[9px] font-black uppercase text-dark-gray/60 bg-white/5 border border-white/5 px-2 py-0.5 rounded">Interested: {inq.service_name}</span>
                                )}
                              </div>
                              <span className="text-[10px] text-dark-gray/50 font-bold uppercase flex items-center gap-1.5 shrink-0"><Calendar className="w-3.5 h-3.5 text-accent" /> {new Date(inq.date).toLocaleDateString('en-GB')}</span>
                            </div>
                            
                            {inq.message ? (
                              <p className="text-xs text-dark-gray font-medium leading-relaxed italic bg-primary/20 p-4 border border-white/5 rounded-xl">"{inq.message}"</p>
                            ) : (
                              <p className="text-xs text-dark-gray/40 font-medium">No additional message provided.</p>
                            )}

                            <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest flex items-center gap-1.5 mt-2 bg-emerald-400/5 border border-emerald-400/20 py-2 px-3.5 rounded-lg w-fit">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                              Advisor will call phone: {inq.phone}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-20 bg-secondary/20 border border-white/5 border-dashed rounded-3xl text-center p-6">
                        <MessageSquare className="w-12 h-12 text-dark-gray/20 mb-3" />
                        <h3 className="text-[#b9c9d6] font-bold text-base mb-1">No Active Enquiries</h3>
                        <p className="text-xs text-dark-gray/60 max-w-xs mx-auto mb-6">You haven't submitted any general inquiries or support tickets.</p>
                        <Link to="/contact" className="btn-accent inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest px-6 py-3.5">
                          Submit Support Enquiry <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
