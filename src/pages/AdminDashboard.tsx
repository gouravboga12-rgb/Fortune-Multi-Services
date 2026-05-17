import { useState, useEffect } from 'react';
import { LayoutDashboard, Users, MessageSquare, HelpCircle, LogOut, Trash2, ExternalLink, Calendar, Search } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { getInquiries, deleteInquiry as deleteInquiryApi } from '../config/api';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('inquiries');
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const loadInquiries = async () => {
    const data = await getInquiries();
    setInquiries(data.sort((a: any, b: any) => b.id - a.id));
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  const deleteInquiry = async (id: number) => {
    const success = await deleteInquiryApi(id);
    if (success) {
      setInquiries(prev => prev.filter(i => i.id !== id));
    }
  };

  const filteredInquiries = inquiries.filter(i => 
    i.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    i.service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-24 min-h-screen bg-soft-white flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 bg-secondary text-white p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
            <LayoutDashboard className="w-6 h-6 text-secondary" />
          </div>
          <span className="text-xl font-bold">Admin Panel</span>
        </div>

        <nav className="space-y-2 flex-grow">
          {[
            { id: 'inquiries', label: 'Inquiries', icon: MessageSquare },
            { id: 'services', label: 'Services', icon: LayoutDashboard },
            { id: 'testimonials', label: 'Testimonials', icon: Users },
            { id: 'faqs', label: 'FAQs', icon: HelpCircle },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-semibold',
                activeTab === item.id ? 'bg-primary text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors text-sm font-semibold mt-auto">
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 lg:p-12 overflow-x-hidden">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <h1 className="text-3xl font-bold text-secondary">Dashboard</h1>
            <p className="text-gray-500 text-sm">Welcome back! Here's what's happening today.</p>
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-light-gray focus:border-primary outline-none text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        {activeTab === 'inquiries' && (
          <div data-aos="fade-up">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-secondary">Recent Inquiries</h2>
              <span className="px-3 py-1 bg-blue-50 text-primary text-xs font-bold rounded-full">
                {inquiries.length} Total
              </span>
            </div>

            <div className="bg-white rounded-2xl border border-light-gray shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-light-gray">
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Client</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Service</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Payment Status</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-light-gray">
                    {filteredInquiries.length > 0 ? filteredInquiries.map((inquiry) => (
                      <tr key={inquiry.id} className="hover:bg-gray-50 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="font-bold text-secondary">{inquiry.name}</div>
                          <div className="text-xs text-gray-500">{inquiry.phone}</div>
                          <div className="text-xs text-gray-400">{inquiry.email}</div>
                          {inquiry.companyName && (
                            <div className="text-xs text-primary/40 font-semibold mt-1">Company: {inquiry.companyName}</div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-accent/10 text-accent text-[10px] font-bold uppercase rounded">
                            {inquiry.service}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {inquiry.paid ? (
                            <div className="space-y-1">
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-green-500/10 text-green-700 text-[10px] font-black uppercase rounded-full border border-green-500/20">
                                Paid ₹{inquiry.amount}
                              </span>
                              <div className="text-[9px] font-mono text-dark-gray/40 uppercase tracking-tight">ID: {inquiry.paymentId}</div>
                            </div>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-gray-500/10 text-gray-500 text-[10px] font-black uppercase rounded-full">
                              Free Inquiry
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-xs text-gray-500 flex items-center gap-2 mt-4 lg:mt-0">
                          <Calendar className="w-3 h-3" />
                          {new Date(inquiry.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button 
                              onClick={() => window.open(`https://wa.me/${inquiry.phone.replace(/[^0-9]/g, '')}`, '_blank')}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Contact on WhatsApp"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => deleteInquiry(inquiry.id)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete Inquiry"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-20 text-center text-gray-400">
                          <div className="flex flex-col items-center gap-4">
                            <MessageSquare className="w-12 h-12 text-gray-200" />
                            <p>No inquiries found matching your search.</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab !== 'inquiries' && (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-light-gray border-dashed" data-aos="fade-up">
            <LayoutDashboard className="w-16 h-16 text-gray-200 mb-4" />
            <h3 className="text-xl font-bold text-secondary mb-2">Content Management</h3>
            <p className="text-gray-500 max-w-sm text-center">
              This feature is coming soon! You will be able to edit services, testimonials, and FAQs directly from here.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
