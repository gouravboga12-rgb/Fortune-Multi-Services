import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Users, MessageSquare, LogOut, 
  Trash2, ExternalLink, Calendar, Search, Plus, Edit2, Save, X, 
  CheckCircle, FileText, Upload, ShieldAlert,
  ChevronRight, DollarSign, FileCheck, Landmark,
  Mail, Lock, ArrowRight
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { 
  getInquiries, updateInquiry, deleteInquiry as deleteInquiryApi,
  getServices, saveServices, 
  getUsers, updateUserStatus, 
  uploadCertificateFile
} from '../config/api';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Data States
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [usersList, setUsersList] = useState<any[]>([]);
  
  // UI States
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Editing States
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [editingService, setEditingService] = useState<any>(null);
  const [selectedServiceCategorySlug, setSelectedServiceCategorySlug] = useState<string>('');
  const [serviceSubTab, setServiceSubTab] = useState<'meta' | 'lists' | 'faqs' | 'form'>('meta');

  const configObj = editingService?.details?.formFields?.find((f: any) => f.isStandardFieldsConfig);
  const disabledStandardFields = configObj ? configObj.disabledStandardFields || [] : [];
  
  // File Upload State for Order management
  const [selectedOrderForUpload, setSelectedOrderForUpload] = useState<any>(null);
  const [uploadingCertificate, setUploadingCertificate] = useState(false);

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(
    !!sessionStorage.getItem('adminToken')
  );

  // Admin login credentials state
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: adminEmail, password: adminPassword })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.role === 'admin') {
          sessionStorage.setItem('adminToken', data.token);
          setIsAdminAuthenticated(true);
        } else {
          setLoginError('Access denied. This portal is for authorized administrators only.');
        }
      } else {
        const data = await response.json();
        setLoginError(data.error || 'Invalid administrator credentials.');
      }
    } catch (err) {
      setLoginError('Unable to connect to authentication server. Verify backend is running.');
    } finally {
      setLoginLoading(false);
    }
  };

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [inqs, servs, usrs] = await Promise.all([
        getInquiries(),
        getServices(),
        getUsers()
      ]);
      setInquiries(inqs.sort((a: any, b: any) => b.id - a.id));
      setCategories(servs);
      setUsersList(usrs);
    } catch (e) {
      console.error('Failed to load dashboard data:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdminAuthenticated) {
      loadAllData();
    }
  }, [isAdminAuthenticated]);

  // --- LOGOUT ---
  const handleLogout = () => {
    sessionStorage.removeItem('adminToken');
    setIsAdminAuthenticated(false);
  };

  // --- SAVE DB SYNC HANDLER ---
  const syncServicesToDatabase = async (updatedCategories: any[]) => {
    const success = await saveServices(updatedCategories);
    if (success) {
      setCategories(updatedCategories);
    } else {
      alert('Failed to sync changes to database server.');
    }
  };

  // --- STATS COMPUTATIONS ---
  const totalServices = categories.reduce((acc, cat) => acc + (cat.services?.length || 0), 0);
  const totalOrders = inquiries.filter(i => i.paid).length;
  const pendingOrders = inquiries.filter(i => i.paid && i.order_status !== 'Completed' && i.order_status !== 'Rejected').length;
  const completedOrders = inquiries.filter(i => i.paid && i.order_status === 'Completed').length;
  const totalEnquiries = inquiries.filter(i => !i.paid).length;

  // --- CATEGORIES OPERATIONS ---
  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;
    
    let updated;
    if (editingCategory.id === 'new') {
      // Create new
      const newCat = {
        title: editingCategory.title,
        slug: editingCategory.slug || editingCategory.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        description: editingCategory.description,
        status: editingCategory.status || 'active',
        services: []
      };
      updated = [...categories, newCat];
    } else {
      // Update existing
      updated = categories.map(c => c.slug === editingCategory.oldSlug ? {
        ...c,
        title: editingCategory.title,
        slug: editingCategory.slug,
        description: editingCategory.description,
        status: editingCategory.status
      } : c);
    }
    
    await syncServicesToDatabase(updated);
    setEditingCategory(null);
  };

  const handleDeleteCategory = async (slug: string) => {
    if (window.confirm('Are you sure you want to delete this category? All services under it will be lost.')) {
      const updated = categories.filter(c => c.slug !== slug);
      await syncServicesToDatabase(updated);
    }
  };

  // --- SERVICES CRUD OPERATIONS ---
  const handleStartEditService = (service: any, catSlug: string) => {
    setEditingService(JSON.parse(JSON.stringify(service))); // deep copy
    setSelectedServiceCategorySlug(catSlug);
    setServiceSubTab('meta');
  };

  const handleStartNewService = (catSlug: string) => {
    setSelectedServiceCategorySlug(catSlug);
    setEditingService({
      slug: '',
      name: '',
      tag: '',
      description: '',
      price: 199,
      discountPrice: 199,
      status: 'active',
      details: {
        overview: '',
        targetAudience: '',
        timeline: '',
        characteristics: [],
        benefits: [],
        documents: [],
        process: [],
        pros: [],
        cons: [],
        commonMistakes: [],
        postCompliances: [],
        faqs: [],
        formFields: [],
        paymentModes: []
      }
    });
    setServiceSubTab('meta');
  };

  const handleSaveService = async () => {
    if (!editingService) return;
    
    if (!editingService.slug) {
      editingService.slug = editingService.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }

    const updated = categories.map(cat => {
      if (cat.slug === selectedServiceCategorySlug) {
        let exists = cat.services.some((s: any) => s.slug === editingService.slug || s.slug === editingService.oldSlug);
        let servicesList = cat.services;
        
        if (exists) {
          servicesList = cat.services.map((s: any) => 
            (s.slug === editingService.slug || s.slug === editingService.oldSlug) ? editingService : s
          );
        } else {
          servicesList = [...cat.services, editingService];
        }
        
        return { ...cat, services: servicesList };
      }
      return cat;
    });

    await syncServicesToDatabase(updated);
    setEditingService(null);
  };

  const handleDeleteService = async (serviceSlug: string, catSlug: string) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      const updated = categories.map(cat => {
        if (cat.slug === catSlug) {
          return {
            ...cat,
            services: cat.services.filter((s: any) => s.slug !== serviceSlug)
          };
        }
        return cat;
      });
      await syncServicesToDatabase(updated);
    }
  };

  // --- CERTIFICATE UPLOAD FLOW FOR ORDERS ---
  const handleUploadCertificate = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedOrderForUpload) return;
    
    setUploadingCertificate(true);
    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const result = event.target?.result as string;
        if (result) {
          // Strip prefix
          const base64Data = result.split(',')[1] || result;
          const uploadRes = await uploadCertificateFile(file.name, base64Data);
          if (uploadRes.success && uploadRes.fileUrl) {
            // Update Inquiry Order
            const success = await updateInquiry(selectedOrderForUpload.id, {
              order_status: 'Completed',
              certificate_name: file.name,
              certificate_url: uploadRes.fileUrl
            });
            
            if (success) {
              setInquiries(prev => prev.map(inq => inq.id === selectedOrderForUpload.id ? {
                ...inq,
                order_status: 'Completed',
                certificate_name: file.name,
                certificate_url: uploadRes.fileUrl
              } : inq));
              alert('Certificate uploaded and order marked as Completed successfully!');
              setSelectedOrderForUpload(null);
            } else {
              alert('Failed to update order record.');
            }
          } else {
            alert('File upload failed: ' + (uploadRes.error || 'Server error'));
          }
        }
      };
      reader.readAsDataURL(file);
    } catch (err: any) {
      console.error(err);
      alert('Error reading certificate file: ' + err.message);
    } finally {
      setUploadingCertificate(false);
    }
  };

  // --- CRM LEAD STATUS UPDATE ---
  const handleUpdateLeadStatus = async (id: number, status: string) => {
    const success = await updateInquiry(id, { lead_status: status as any });
    if (success) {
      setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, lead_status: status } : inq));
    }
  };

  // --- ORDER STATUS UPDATE ---
  const handleUpdateOrderStatus = async (id: number, status: string) => {
    const success = await updateInquiry(id, { order_status: status as any });
    if (success) {
      setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, order_status: status } : inq));
    }
  };

  // --- DELETE RECORD (INQUIRY / ORDER / LEAD) ---
  const handleDeleteRecord = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this record permanently?')) {
      const success = await deleteInquiryApi(id);
      if (success) {
        setInquiries(prev => prev.filter(inq => inq.id !== id));
      }
    }
  };



  // --- USER DIRECTORY BLOCK/UNBLOCK ---
  const handleToggleUserStatus = async (email: string, currentStatus: string) => {
    const newStatus = currentStatus === 'blocked' ? 'active' : 'blocked';
    const success = await updateUserStatus(email, newStatus);
    if (success) {
      setUsersList(prev => prev.map(u => u.email === email ? { ...u, status: newStatus } : u));
    }
  };

  // --- USER DIRECTORY DELETE ---
  const handleDeleteUser = async (email: string) => {
    if (window.confirm(`Are you sure you want to permanently delete the account: ${email}?\n\nThis action cannot be undone.`)) {
      try {
        const response = await fetch(`http://localhost:5000/api/users/${encodeURIComponent(email)}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${sessionStorage.getItem('adminToken')}` }
        });
        if (response.ok) {
          setUsersList(prev => prev.filter(u => u.email !== email));
        } else {
          alert('Failed to delete user. Please try again.');
        }
      } catch (err) {
        console.error('Delete user error:', err);
        alert('Network error while deleting user.');
      }
    }
  };

  // --- FILTERING ---
  const filteredInquiries = inquiries.filter(i => {
    const isSearchMatch = (
      i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (i.service_name || i.service || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
    return isSearchMatch;
  });

  const ordersList = filteredInquiries.filter(i => i.paid);
  const leadsList = filteredInquiries.filter(i => !i.paid);

  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-secondary flex items-center justify-center px-4 relative overflow-hidden font-sans">
        {/* Abstract background blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-md w-full glass-card bg-secondary/80 border-white/10 p-8 lg:p-12 relative z-10 shadow-premium">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-accent/20">
              <ShieldAlert className="w-8 h-8 text-accent animate-pulse" />
            </div>
            <h1 className="text-3xl font-black text-[#b9c9d6] mb-2 tracking-tight">
              Admin Portal
            </h1>
            <p className="text-dark-gray text-sm font-semibold">
              Authorized personnel only. Please sign in to manage business console.
            </p>
          </div>

          {loginError && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs font-semibold flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <p>{loginError}</p>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleAdminLogin}>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-[#b9c9d6] ml-1">Admin Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <input 
                  type="email" 
                  required
                  placeholder="admin@fortune.com"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-primary text-white rounded-xl border border-white/10 focus:border-accent outline-none transition-all font-medium text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-[#b9c9d6] ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-primary text-white rounded-xl border border-white/10 focus:border-accent outline-none transition-all font-medium text-sm"
                />
              </div>
              <div className="text-right">
                <button 
                  type="button" 
                  onClick={() => setLoginError("To reset the admin password, please contact backend portal support or edit credentials inside server/index.js.")}
                  className="text-xs font-bold text-accent hover:underline bg-transparent border-none cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loginLoading}
              className="btn-primary w-full py-4 rounded-xl text-sm flex items-center justify-center gap-3 group disabled:opacity-50 mt-6 cursor-pointer"
            >
              {loginLoading ? 'Verifying...' : 'Access Dashboard'}
              {!loginLoading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-soft-white flex flex-col lg:flex-row">
      
      {/* Sidebar */}
      <aside className="w-full lg:w-64 bg-secondary text-white p-6 flex flex-col shrink-0">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
            <LayoutDashboard className="w-6 h-6 text-secondary" />
          </div>
          <span className="text-xl font-bold text-[#b9c9d6]">Admin Panel</span>
        </div>

        <nav className="space-y-1 flex-grow">
          {[
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'categories', label: 'Categories', icon: Landmark },
            { id: 'services', label: 'Services CRUD', icon: FileCheck },
            { id: 'orders', label: 'Orders Portal', icon: FileText, count: pendingOrders },
            { id: 'leads', label: 'Leads & Enquiries', icon: MessageSquare },
            { id: 'users', label: 'User Directory', icon: Users },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setEditingService(null);
                setEditingCategory(null);
              }}
              className={cn(
                'w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all text-xs font-bold uppercase tracking-wider',
                activeTab === item.id 
                  ? 'bg-primary text-white border-l-4 border-accent shadow-premium' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-4 h-4 text-accent" />
                <span>{item.label}</span>
              </div>
              {item.count !== undefined && item.count > 0 ? (
                <span className="px-2 py-0.5 bg-accent/20 text-accent border border-accent/20 text-[9px] font-black rounded-md">{item.count}</span>
              ) : null}
            </button>
          ))}
        </nav>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all text-xs font-bold uppercase tracking-wider mt-10"
        >
          <LogOut className="w-4 h-4" />
          Logout Account
        </button>
      </aside>

      {/* Main Content Workspace */}
      <main className="flex-grow p-6 lg:p-10 overflow-x-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs text-dark-gray/60 font-semibold mt-4">Connecting to Hostinger DB Vault...</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 pb-6 border-b border-light-gray">
              <div>
                <h1 className="text-3xl font-black text-[#b9c9d6] capitalize">{activeTab} Workspace</h1>
                <p className="text-dark-gray text-xs font-semibold mt-0.5">Secure Administration Dashboard Panel.</p>
              </div>
              
              {/* Search bar displayed for relevant tabs */}
              {['orders', 'leads', 'users'].includes(activeTab) && (
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search database..."
                    className="w-full pl-10 pr-4 py-3 bg-secondary/15 rounded-xl border border-light-gray focus:border-accent outline-none text-xs text-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              )}
            </header>

            {/* TAB CONTENT: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-10 animate-fade-in">
                {/* Stats Widgets */}
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                  {[
                    { label: 'Total Services', val: totalServices, icon: FileCheck, color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
                    { label: 'Paid Orders', val: totalOrders, icon: DollarSign, color: 'text-green-400 bg-green-500/10 border-green-500/20' },
                    { label: 'Pending Orders', val: pendingOrders, icon: Calendar, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
                    { label: 'Completed Setup', val: completedOrders, icon: CheckCircle, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
                    { label: 'Contact Enquiries', val: totalEnquiries, icon: MessageSquare, color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' }
                  ].map((stat, idx) => (
                    <div key={idx} className="glass-card p-5 bg-secondary/45 border-white/5 flex items-center justify-between gap-4">
                      <div>
                        <span className="text-[10px] font-black uppercase text-dark-gray/50 tracking-wider block">{stat.label}</span>
                        <span className="text-2xl font-black text-slate-100 block mt-1">{stat.val}</span>
                      </div>
                      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center border", stat.color)}>
                        <stat.icon className="w-5 h-5" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Split grid lists */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Recent paid applications */}
                  <div className="glass-card p-6 bg-secondary/45 border-white/5 space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-white/5">
                      <h3 className="text-sm font-black uppercase text-[#b9c9d6]">Recent Applications</h3>
                      <button onClick={() => setActiveTab('orders')} className="text-accent text-[10px] font-black uppercase tracking-wider flex items-center gap-1 hover:underline">View All <ChevronRight className="w-3 h-3" /></button>
                    </div>
                    <div className="divide-y divide-white/5">
                      {ordersList.slice(0, 5).map((order: any) => (
                        <div key={order.id} className="py-3 flex justify-between items-center gap-4">
                          <div className="min-w-0">
                            <h4 className="text-xs font-bold text-slate-100 truncate">{order.name}</h4>
                            <p className="text-[10px] text-dark-gray/60 truncate mt-0.5">{order.service_name || order.service}</p>
                          </div>
                          <span className="px-2 py-0.5 bg-accent/10 text-accent text-[9px] font-black rounded border border-accent/25 uppercase shrink-0">₹{order.amount || 199}</span>
                        </div>
                      ))}
                      {ordersList.length === 0 && <p className="text-xs text-dark-gray/40 py-4 text-center">No service applications found.</p>}
                    </div>
                  </div>

                  {/* Recent support enquiries */}
                  <div className="glass-card p-6 bg-secondary/45 border-white/5 space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-white/5">
                      <h3 className="text-sm font-black uppercase text-[#b9c9d6]">Recent Enquiries</h3>
                      <button onClick={() => setActiveTab('leads')} className="text-accent text-[10px] font-black uppercase tracking-wider flex items-center gap-1 hover:underline">View All <ChevronRight className="w-3 h-3" /></button>
                    </div>
                    <div className="divide-y divide-white/5">
                      {leadsList.slice(0, 5).map((lead: any) => (
                        <div key={lead.id} className="py-3 flex justify-between items-center gap-4">
                          <div className="min-w-0">
                            <h4 className="text-xs font-bold text-slate-100 truncate">{lead.name}</h4>
                            <p className="text-[10px] text-dark-gray/60 truncate mt-0.5 italic">"{lead.message || 'No description'}"</p>
                          </div>
                          <span className="text-[10px] text-dark-gray shrink-0">{new Date(lead.date).toLocaleDateString()}</span>
                        </div>
                      ))}
                      {leadsList.length === 0 && <p className="text-xs text-dark-gray/40 py-4 text-center">No customer enquiries found.</p>}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: CATEGORIES */}
            {activeTab === 'categories' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-black text-[#b9c9d6]">Categories Catalog</h2>
                  <button 
                    onClick={() => setEditingCategory({ id: 'new', title: '', slug: '', description: '', status: 'active' })}
                    className="btn-accent inline-flex items-center gap-1.5 px-4 py-2 text-xs font-black uppercase tracking-widest"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Category
                  </button>
                </div>

                {editingCategory && (
                  <form onSubmit={handleSaveCategory} className="glass-card p-6 bg-secondary/50 border-accent/20 space-y-4 max-w-xl animate-slide-up">
                    <div className="flex justify-between items-center pb-2 border-b border-white/5">
                      <h3 className="text-xs font-black uppercase text-[#b9c9d6]">{editingCategory.id === 'new' ? 'Create New' : 'Edit'} Category</h3>
                      <button type="button" onClick={() => setEditingCategory(null)} className="p-1 hover:bg-white/5 rounded"><X className="w-4 h-4 text-white/50" /></button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase text-dark-gray/60">Category Title *</label>
                        <input 
                          type="text" 
                          required 
                          className="w-full px-3 py-2.5 bg-primary border border-light-gray rounded-xl text-xs text-white"
                          value={editingCategory.title}
                          onChange={(e) => setEditingCategory({ ...editingCategory, title: e.target.value })}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase text-dark-gray/60">Slug (dynamic path) *</label>
                        <input 
                          type="text" 
                          required 
                          className="w-full px-3 py-2.5 bg-primary border border-light-gray rounded-xl text-xs text-white"
                          value={editingCategory.slug}
                          placeholder="e.g. tax-audit"
                          onChange={(e) => setEditingCategory({ ...editingCategory, slug: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase text-dark-gray/60">Description</label>
                      <textarea 
                        rows={3}
                        className="w-full px-3 py-2.5 bg-primary border border-light-gray rounded-xl text-xs text-white"
                        value={editingCategory.description || ''}
                        onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                      />
                    </div>

                    <div className="flex justify-between gap-3 pt-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase text-dark-gray/60">Status:</span>
                        <select 
                          className="px-2.5 py-1 bg-primary text-xs border border-light-gray rounded-lg text-white"
                          value={editingCategory.status}
                          onChange={(e) => setEditingCategory({ ...editingCategory, status: e.target.value })}
                        >
                          <option value="active">Active</option>
                          <option value="disabled">Disabled</option>
                        </select>
                      </div>
                      <div className="flex gap-2">
                        <button type="button" onClick={() => setEditingCategory(null)} className="px-4 py-2 border border-white/10 hover:bg-white/5 rounded-xl text-xs font-bold text-white">Cancel</button>
                        <button type="submit" className="btn-accent px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider">Save Sync</button>
                      </div>
                    </div>
                  </form>
                )}

                <div className="bg-secondary rounded-2xl border border-light-gray overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left text-xs">
                      <thead>
                        <tr className="bg-primary/50 border-b border-light-gray text-dark-gray/60 font-black uppercase tracking-wider">
                          <th className="px-6 py-4">Category Title</th>
                          <th className="px-6 py-4">URL Slug</th>
                          <th className="px-6 py-4">Services Linked</th>
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-slate-200">
                        {categories.map(cat => (
                          <tr key={cat.slug} className="hover:bg-primary/20 transition-all">
                            <td className="px-6 py-4">
                              <span className="font-bold text-slate-100 block">{cat.title}</span>
                              <span className="text-[10px] text-dark-gray/50 block truncate max-w-xs">{cat.description || 'No description'}</span>
                            </td>
                            <td className="px-6 py-4 font-mono text-accent">/services/{cat.slug}</td>
                            <td className="px-6 py-4 font-bold text-center w-32">{cat.services?.length || 0}</td>
                            <td className="px-6 py-4">
                              <span className={cn(
                                'px-2 py-0.5 text-[9px] font-black uppercase rounded-md border',
                                cat.status === 'active' ? 'bg-green-500/10 border-green-500/25 text-green-400' : 'bg-red-500/10 border-red-500/25 text-red-400'
                              )}>{cat.status || 'active'}</span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex gap-2 justify-end">
                                <button 
                                  onClick={() => setEditingCategory({ ...cat, oldSlug: cat.slug })}
                                  className="p-2 text-white/60 hover:text-accent hover:bg-white/5 rounded-lg transition-all"
                                  title="Edit Category details"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button 
                                  onClick={() => handleDeleteCategory(cat.slug)}
                                  className="p-2 text-red-400/60 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                                  title="Delete Category"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: SERVICES CRUD */}
            {activeTab === 'services' && !editingService && (
              <div className="space-y-8">
                {categories.map(cat => (
                  <div key={cat.slug} className="glass-card p-6 bg-secondary/45 border-white/5 space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-white/5">
                      <div>
                        <h3 className="text-base font-black text-slate-100">{cat.title}</h3>
                        <p className="text-[10px] text-dark-gray/50 tracking-wider uppercase">Category services list</p>
                      </div>
                      <button 
                        onClick={() => handleStartNewService(cat.slug)}
                        className="btn-accent inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Service to {cat.title}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {cat.services?.map((s: any) => (
                        <div key={s.slug} className="p-4 bg-primary/40 border border-white/5 rounded-2xl flex flex-col justify-between gap-4 hover:border-white/10 transition-all">
                          <div>
                            <div className="flex justify-between items-start gap-2">
                              <span className="px-2 py-0.5 bg-accent/10 border border-accent/20 text-accent text-[9px] font-black rounded uppercase">{s.tag || 'Standard'}</span>
                              <span className="font-mono text-dark-gray/50 text-[9px]">/apply/{cat.slug}/{s.slug}</span>
                            </div>
                            <h4 className="text-sm font-bold text-slate-100 mt-2">{s.name}</h4>
                            <p className="text-[10px] text-dark-gray/60 leading-normal mt-1 block truncate">{s.description || 'No summary text.'}</p>
                            
                            <div className="mt-3 flex items-center gap-2">
                              <span className="text-accent font-black text-sm">₹{s.discountPrice || s.price || 199}</span>
                              {(s.price && s.price !== s.discountPrice) && (
                                <span className="line-through text-dark-gray text-xs">₹{s.price}</span>
                              )}
                              <span className="text-[9px] text-dark-gray/60 font-semibold">(inclusive of 18% GST)</span>
                            </div>
                          </div>

                          <div className="flex gap-2 border-t border-white/5 pt-3 justify-between items-center">
                            <span className={cn(
                              'px-2 py-0.5 text-[8px] font-black uppercase rounded border',
                              s.status === 'active' ? 'bg-green-500/10 border-green-500/25 text-green-400' : 'bg-red-500/10 border-red-500/25 text-red-400'
                            )}>{s.status || 'active'}</span>
                            <div className="flex gap-1.5">
                              <button 
                                onClick={() => handleStartEditService(s, cat.slug)}
                                className="px-3 py-1.5 bg-white/5 hover:bg-accent/10 text-white hover:text-accent border border-white/10 hover:border-accent/30 rounded-xl text-[10px] font-bold uppercase transition-all"
                              >
                                Edit / Form Builder
                              </button>
                              <button 
                                onClick={() => handleDeleteService(s.slug, cat.slug)}
                                className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                                title="Delete service"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                      {(!cat.services || cat.services.length === 0) && (
                        <p className="text-xs text-dark-gray/40 py-2 col-span-3 text-center">No services added under this category yet.</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB CONTENT: SERVICE DETAILED EDITOR */}
            {activeTab === 'services' && editingService && (
              <div className="space-y-6 max-w-4xl animate-slide-up">
                <div className="flex items-center gap-3 justify-between pb-4 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setEditingService(null)}
                      className="text-xs font-bold text-accent hover:underline"
                    >
                      ← Back to Services List
                    </button>
                    <span className="text-white/30">|</span>
                    <h2 className="text-base font-black text-slate-100 truncate">Editing: {editingService.name || 'New Service'}</h2>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      type="button" 
                      onClick={() => setEditingService(null)} 
                      className="px-4 py-2 border border-white/10 hover:bg-white/5 rounded-xl text-xs font-bold text-white"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleSaveService} 
                      className="btn-accent inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-glow"
                    >
                      <Save className="w-3.5 h-3.5" /> Save Changes
                    </button>
                  </div>
                </div>

                {/* Sub Tab Navigation inside Editor */}
                <div className="flex border-b border-white/5">
                  {[
                    { id: 'meta', label: 'General Info' },
                    { id: 'lists', label: 'Key Lists' },
                    { id: 'faqs', label: 'FAQs Editor' },
                    { id: 'form', label: 'Application Form Builder' }
                  ].map(subTab => (
                    <button
                      key={subTab.id}
                      onClick={() => setServiceSubTab(subTab.id as any)}
                      className={cn(
                        'px-5 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all',
                        serviceSubTab === subTab.id 
                          ? 'border-accent text-accent bg-accent/5' 
                          : 'border-transparent text-gray-400 hover:text-white'
                      )}
                    >
                      {subTab.label}
                    </button>
                  ))}
                </div>

                {/* Editor Content Area */}
                <div className="glass-card p-6 sm:p-8 bg-secondary/50 border-white/5">
                  
                  {/* META SUB-TAB */}
                  {serviceSubTab === 'meta' && (
                    <div className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black uppercase text-dark-gray/60">Service Name *</label>
                          <input 
                            type="text" 
                            required 
                            className="w-full px-3 py-2.5 bg-primary border border-light-gray rounded-xl text-xs text-white"
                            value={editingService.name}
                            onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black uppercase text-dark-gray/60">Slug (dynamic URL) *</label>
                          <input 
                            type="text" 
                            required 
                            className="w-full px-3 py-2.5 bg-primary border border-light-gray rounded-xl text-xs text-white"
                            value={editingService.slug}
                            placeholder="e.g. gst-registration"
                            onChange={(e) => setEditingService({ ...editingService, slug: e.target.value })}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black uppercase text-dark-gray/60">Badge / Tag text</label>
                          <input 
                            type="text" 
                            className="w-full px-3 py-2.5 bg-primary border border-light-gray rounded-xl text-xs text-white"
                            value={editingService.tag}
                            placeholder="e.g. Popular, Hot"
                            onChange={(e) => setEditingService({ ...editingService, tag: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black uppercase text-dark-gray/60">Standard Price (excl. GST)</label>
                          <input 
                            type="number" 
                            className="w-full px-3 py-2.5 bg-primary border border-light-gray rounded-xl text-xs text-white font-mono"
                            value={editingService.price}
                            onChange={(e) => setEditingService({ ...editingService, price: parseFloat(e.target.value) || 0 })}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black uppercase text-dark-gray/60">Discount Price (Payable Amount)</label>
                          <input 
                            type="number" 
                            className="w-full px-3 py-2.5 bg-primary border border-light-gray rounded-xl text-xs text-white font-mono"
                            value={editingService.discountPrice}
                            onChange={(e) => setEditingService({ ...editingService, discountPrice: parseFloat(e.target.value) || 0 })}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black uppercase text-dark-gray/60">Timeline string</label>
                          <input 
                            type="text" 
                            className="w-full px-3 py-2.5 bg-primary border border-light-gray rounded-xl text-xs text-white"
                            value={editingService.details?.timeline || ''}
                            placeholder="e.g. 3-5 Working Days"
                            onChange={(e) => setEditingService({ 
                              ...editingService, 
                              details: { ...editingService.details, timeline: e.target.value } 
                            })}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black uppercase text-dark-gray/60">Best For / Target Audience</label>
                          <input 
                            type="text" 
                            className="w-full px-3 py-2.5 bg-primary border border-light-gray rounded-xl text-xs text-white"
                            value={editingService.details?.targetAudience || ''}
                            placeholder="e.g. Small business owner, Freelancer"
                            onChange={(e) => setEditingService({ 
                              ...editingService, 
                              details: { ...editingService.details, targetAudience: e.target.value } 
                            })}
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase text-dark-gray/60">Short Summary description</label>
                        <textarea 
                          rows={2}
                          className="w-full px-3 py-2.5 bg-primary border border-light-gray rounded-xl text-xs text-white"
                          value={editingService.description}
                          onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase text-dark-gray/60">Detailed Overview paragraph (Markdown/Whitespace supported)</label>
                        <textarea 
                          rows={6}
                          className="w-full px-3 py-2.5 bg-primary border border-light-gray rounded-xl text-xs text-white leading-relaxed font-semibold"
                          value={editingService.details?.overview || ''}
                          onChange={(e) => setEditingService({ 
                            ...editingService, 
                            details: { ...editingService.details, overview: e.target.value } 
                          })}
                        />
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-[10px] font-black uppercase text-dark-gray/60">Service Status:</span>
                        <select
                          className="px-3 py-1.5 bg-primary text-xs border border-light-gray rounded-xl text-white"
                          value={editingService.status}
                          onChange={(e) => setEditingService({ ...editingService, status: e.target.value })}
                        >
                          <option value="active">Active</option>
                          <option value="disabled">Disabled</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* LISTS SUB-TAB */}
                  {serviceSubTab === 'lists' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {[
                        { key: 'characteristics', label: 'Key Characteristics' },
                        { key: 'benefits', label: 'Strategic Advantages' },
                        { key: 'documents', label: 'Documents Required' },
                        { key: 'process', label: 'Registration Steps Flow' },
                        { key: 'pros', label: 'Advantages (Pros)' },
                        { key: 'cons', label: 'Disadvantages (Cons)' },
                        { key: 'commonMistakes', label: 'Mistakes to Avoid' },
                        { key: 'postCompliances', label: 'Post-Registration Compliances' }
                      ].map((itemDef) => {
                        const listItems = editingService.details?.[itemDef.key] || [];
                        return (
                          <div key={itemDef.key} className="p-4 bg-primary/20 border border-white/5 rounded-2xl space-y-3">
                            <div className="flex justify-between items-center pb-1 border-b border-white/5">
                              <h4 className="text-xs font-black uppercase text-[#b9c9d6]">{itemDef.label}</h4>
                              <button 
                                type="button"
                                onClick={() => {
                                  const updatedList = [...listItems, ''];
                                  setEditingService({
                                    ...editingService,
                                    details: { ...editingService.details, [itemDef.key]: updatedList }
                                  });
                                }}
                                className="text-accent text-[10px] font-black uppercase tracking-wider flex items-center gap-1 hover:underline"
                              >
                                <Plus className="w-3 h-3" /> Add Item
                              </button>
                            </div>
                            
                            <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                              {listItems.map((val: string, lIdx: number) => (
                                <div key={lIdx} className="flex gap-2 items-center">
                                  <input 
                                    type="text" 
                                    className="flex-grow px-2 py-1.5 bg-primary border border-light-gray rounded-lg text-xs text-white"
                                    value={val}
                                    onChange={(e) => {
                                      const updatedList = [...listItems];
                                      updatedList[lIdx] = e.target.value;
                                      setEditingService({
                                        ...editingService,
                                        details: { ...editingService.details, [itemDef.key]: updatedList }
                                      });
                                    }}
                                  />
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const updatedList = listItems.filter((_: any, i: number) => i !== lIdx);
                                      setEditingService({
                                        ...editingService,
                                        details: { ...editingService.details, [itemDef.key]: updatedList }
                                      });
                                    }}
                                    className="p-1 text-red-400 hover:bg-red-500/10 rounded"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ))}
                              {listItems.length === 0 && (
                                <p className="text-[10px] text-dark-gray/40 text-center py-4">No list items added. Click 'Add Item'.</p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* FAQS SUB-TAB */}
                  {serviceSubTab === 'faqs' && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-2 border-b border-white/5">
                        <h4 className="text-xs font-black uppercase text-[#b9c9d6]">Service FAQ Lists</h4>
                        <button 
                          type="button"
                          onClick={() => {
                            const currentFaqs = editingService.details?.faqs || [];
                            const updatedFaqs = [...currentFaqs, { question: '', answer: '' }];
                            setEditingService({
                              ...editingService,
                              details: { ...editingService.details, faqs: updatedFaqs }
                            });
                          }}
                          className="btn-accent inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider"
                        >
                          <Plus className="w-3 h-3" /> Add FAQ Card
                        </button>
                      </div>

                      <div className="space-y-4 max-h-[450px] overflow-y-auto pr-1">
                        {(editingService.details?.faqs || []).map((faq: any, fIdx: number) => (
                          <div key={fIdx} className="p-4 bg-primary/20 border border-white/5 rounded-2xl space-y-3 relative">
                            <button 
                              type="button"
                              onClick={() => {
                                const currentFaqs = editingService.details?.faqs || [];
                                const updatedFaqs = currentFaqs.filter((_: any, i: number) => i !== fIdx);
                                setEditingService({
                                  ...editingService,
                                  details: { ...editingService.details, faqs: updatedFaqs }
                                });
                              }}
                              className="absolute top-3 right-3 p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                              title="Delete FAQ"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>

                            <div className="space-y-1 max-w-[90%]">
                              <label className="text-[9px] font-black uppercase text-dark-gray/60 block">Question {fIdx + 1}</label>
                              <input 
                                type="text" 
                                className="w-full px-3 py-2 bg-primary border border-light-gray rounded-xl text-xs text-white"
                                value={faq.question}
                                onChange={(e) => {
                                  const currentFaqs = [...(editingService.details?.faqs || [])];
                                  currentFaqs[fIdx] = { ...faq, question: e.target.value };
                                  setEditingService({
                                    ...editingService,
                                    details: { ...editingService.details, faqs: currentFaqs }
                                  });
                                }}
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-[9px] font-black uppercase text-dark-gray/60 block">Answer</label>
                              <textarea 
                                rows={2}
                                className="w-full px-3 py-2 bg-primary border border-light-gray rounded-xl text-xs text-white leading-relaxed"
                                value={faq.answer}
                                onChange={(e) => {
                                  const currentFaqs = [...(editingService.details?.faqs || [])];
                                  currentFaqs[fIdx] = { ...faq, answer: e.target.value };
                                  setEditingService({
                                    ...editingService,
                                    details: { ...editingService.details, faqs: currentFaqs }
                                  });
                                }}
                              />
                            </div>
                          </div>
                        ))}
                        {(!editingService.details?.faqs || editingService.details.faqs.length === 0) && (
                          <p className="text-xs text-dark-gray/40 text-center py-10">No FAQs defined for this service.</p>
                        )}
                      </div>
                    </div>
                  )}                  {/* FORM BUILDER SUB-TAB */}
                  {serviceSubTab === 'form' && (
                    <div className="space-y-6">
                      {/* Standard Auto-Included Fields */}
                      <div className="space-y-4 p-5 bg-primary/20 border border-white/5 rounded-3xl">
                        <div>
                          <h4 className="text-xs font-black uppercase text-accent tracking-wider">Standard Fields (Auto-Included)</h4>
                          <p className="text-[9px] text-dark-gray/50 uppercase mt-0.5 font-bold font-mono">These basic application fields are enabled by default. Use 'Remove' to exclude them from this service's form.</p>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-1">
                          {[
                            { id: 'name', name: 'Full Name', type: 'Text Box', req: true },
                            { id: 'phone', name: 'Mobile Number', type: 'Phone Input', req: true },
                            { id: 'email', name: 'Email Address', type: 'Email Input', req: true },
                            { id: 'panCard', name: 'PAN Card Number', type: 'Text Input', req: true },
                            { id: 'aadhaarCard', name: 'Aadhaar Card Number', type: 'Text Input', req: true },
                            { id: 'description', name: 'Description / Key Requirements', type: 'Textarea', req: true },
                            { id: 'companyName', name: 'Company Name', type: 'Text Input', req: false },
                          ].map((field) => {
                            const isDisabled = disabledStandardFields.includes(field.id);
                            return (
                              <div key={field.name} className={`p-3 bg-primary/45 border border-white/5 rounded-xl flex flex-col justify-between transition-all ${isDisabled ? 'opacity-40 border-dashed bg-primary/20' : ''}`}>
                                <div className="flex justify-between items-start gap-1">
                                  <span className={`text-[11px] font-bold leading-snug ${isDisabled ? 'text-slate-500 line-through' : 'text-slate-200'}`}>{field.name}</span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      let updatedDisabled = [...disabledStandardFields];
                                      if (isDisabled) {
                                        updatedDisabled = updatedDisabled.filter(id => id !== field.id);
                                      } else {
                                        updatedDisabled.push(field.id);
                                      }
                                      // Save back to formFields list
                                      const cleanFields = (editingService.details?.formFields || []).filter((f: any) => !f.isStandardFieldsConfig);
                                      const updatedFields = [...cleanFields, { isStandardFieldsConfig: true, disabledStandardFields: updatedDisabled }];
                                      setEditingService({
                                        ...editingService,
                                        details: { ...editingService.details, formFields: updatedFields }
                                      });
                                    }}
                                    className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded transition-all shrink-0 ${
                                      isDisabled 
                                        ? 'bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20' 
                                        : 'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20'
                                    }`}
                                  >
                                    {isDisabled ? 'Enable' : 'Remove'}
                                  </button>
                                </div>
                                <div className="flex justify-between items-center mt-2.5">
                                  <span className="text-[8px] text-dark-gray/50 font-bold uppercase">{field.type}</span>
                                  {!isDisabled && (
                                    <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded ${field.req ? 'bg-accent/10 text-accent border border-accent/20' : 'bg-white/5 text-dark-gray/60'}`}>
                                      {field.req ? 'Required' : 'Optional'}
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="flex justify-between items-center pb-2 border-b border-white/5">
                        <div>
                          <h4 className="text-xs font-black uppercase text-[#b9c9d6]">Custom Form Builder</h4>
                          <p className="text-[9px] text-dark-gray/50 uppercase mt-0.5 font-bold">Configure extra client application inputs</p>
                        </div>
                        <button 
                          type="button"
                          onClick={() => {
                            const currentFields = editingService.details?.formFields || [];
                            const updatedFields = [...currentFields, { 
                              id: 'field_' + Math.random().toString(36).substring(2, 7), 
                              label: 'New Question', 
                              type: 'text', 
                              required: false,
                              options: [] 
                            }];
                            setEditingService({
                              ...editingService,
                              details: { ...editingService.details, formFields: updatedFields }
                            });
                          }}
                          className="btn-accent inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider"
                        >
                          <Plus className="w-3 h-3" /> Add Input Field
                        </button>
                      </div>
                      <div className="space-y-4 max-h-[450px] overflow-y-auto pr-1">
                        {(editingService.details?.formFields || []).filter((f: any) => !f.isStandardFieldsConfig).map((field: any, fieldIdx: number) => (
                          <div key={field.id || fieldIdx} className="p-4 bg-primary/20 border border-white/5 rounded-2xl space-y-4 relative animate-fade-in">
                            <button 
                              type="button"
                              onClick={() => {
                                const currentFields = editingService.details?.formFields || [];
                                const updatedFields = currentFields.filter((f: any) => f.id !== field.id);
                                setEditingService({
                                  ...editingService,
                                  details: { ...editingService.details, formFields: updatedFields }
                                });
                              }}
                              className="absolute top-3.5 right-3.5 p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                              title="Remove Field"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="space-y-1">
                                <label className="text-[9px] font-black uppercase text-dark-gray/60 block">Field Label / Name *</label>
                                <input 
                                  type="text" 
                                  required
                                  className="w-full px-3 py-2 bg-primary border border-light-gray rounded-xl text-xs text-white"
                                  value={field.label}
                                  onChange={(e) => {
                                    const currentFields = [...(editingService.details?.formFields || [])];
                                    const origIdx = currentFields.findIndex((f: any) => f.id === field.id);
                                    if (origIdx !== -1) {
                                      currentFields[origIdx] = { ...field, label: e.target.value };
                                      setEditingService({
                                        ...editingService,
                                        details: { ...editingService.details, formFields: currentFields }
                                      });
                                    }
                                  }}
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="text-[9px] font-black uppercase text-dark-gray/60 block">Input Type *</label>
                                <select 
                                  className="w-full px-3 py-2 bg-primary border border-light-gray rounded-xl text-xs text-white"
                                  value={field.type}
                                  onChange={(e) => {
                                    const currentFields = [...(editingService.details?.formFields || [])];
                                    const origIdx = currentFields.findIndex((f: any) => f.id === field.id);
                                    if (origIdx !== -1) {
                                      currentFields[origIdx] = { ...field, type: e.target.value };
                                      setEditingService({
                                        ...editingService,
                                        details: { ...editingService.details, formFields: currentFields }
                                      });
                                    }
                                  }}
                                >
                                  <option value="text">Text Box</option>
                                  <option value="number">Number Input</option>
                                  <option value="email">Email Input</option>
                                  <option value="tel">Telephone / Phone</option>
                                  <option value="textarea">Multi-line Textarea</option>
                                  <option value="select">Dropdown Menu</option>
                                  <option value="checkbox">Checkbox Check</option>
                                  <option value="radio">Radio Buttons</option>
                                  <option value="file">Document/File Upload</option>
                                </select>
                              </div>

                              <div className="flex items-center gap-3 pt-6 pl-2">
                                <input 
                                  type="checkbox" 
                                  id={`required_${field.id || fieldIdx}`}
                                  className="w-4 h-4 accent-accent rounded"
                                  checked={field.required}
                                  onChange={(e) => {
                                    const currentFields = [...(editingService.details?.formFields || [])];
                                    const origIdx = currentFields.findIndex((f: any) => f.id === field.id);
                                    if (origIdx !== -1) {
                                      currentFields[origIdx] = { ...field, required: e.target.checked };
                                      setEditingService({
                                        ...editingService,
                                        details: { ...editingService.details, formFields: currentFields }
                                      });
                                    }
                                  }}
                                />
                                <label htmlFor={`required_${field.id || fieldIdx}`} className="text-xs font-bold text-slate-300 cursor-pointer">Required Input</label>
                              </div>
                            </div>

                            {/* Dropdown Options List Builder */}
                            {['select', 'radio', 'checkbox'].includes(field.type) && (
                              <div className="space-y-2 p-3 bg-primary/30 border border-white/5 rounded-xl">
                                <div className="flex justify-between items-center pb-1 border-b border-white/5">
                                  <label className="text-[9px] font-black uppercase text-dark-gray/60 block">Configure Options List</label>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const currentFields = [...(editingService.details?.formFields || [])];
                                      const origIdx = currentFields.findIndex((f: any) => f.id === field.id);
                                      if (origIdx !== -1) {
                                        const opts = field.options || [];
                                        currentFields[origIdx] = { ...field, options: [...opts, 'New Option'] };
                                        setEditingService({
                                          ...editingService,
                                          details: { ...editingService.details, formFields: currentFields }
                                        });
                                      }
                                    }}
                                    className="text-accent text-[9px] font-black uppercase tracking-wider flex items-center gap-1 hover:underline"
                                  >
                                    + Add Option
                                  </button>
                                </div>
                                <div className="flex flex-wrap gap-2 pt-1">
                                  {(field.options || []).map((opt: string, optIdx: number) => (
                                    <div key={optIdx} className="flex gap-1 items-center bg-primary border border-light-gray px-2 py-1 rounded-lg text-xs text-white">
                                      <input 
                                        type="text" 
                                        className="bg-transparent text-xs text-white outline-none border-none w-20"
                                        value={opt}
                                        onChange={(e) => {
                                          const currentFields = [...(editingService.details?.formFields || [])];
                                          const origIdx = currentFields.findIndex((f: any) => f.id === field.id);
                                          if (origIdx !== -1) {
                                            const opts = [...(field.options || [])];
                                            opts[optIdx] = e.target.value;
                                            currentFields[origIdx] = { ...field, options: opts };
                                            setEditingService({
                                              ...editingService,
                                              details: { ...editingService.details, formFields: currentFields }
                                            });
                                          }
                                        }}
                                      />
                                      <button 
                                        type="button" 
                                        onClick={() => {
                                          const currentFields = [...(editingService.details?.formFields || [])];
                                          const origIdx = currentFields.findIndex((f: any) => f.id === field.id);
                                          if (origIdx !== -1) {
                                            const opts = (field.options || []).filter((_: any, i: number) => i !== optIdx);
                                            currentFields[origIdx] = { ...field, options: opts };
                                            setEditingService({
                                              ...editingService,
                                              details: { ...editingService.details, formFields: currentFields }
                                            });
                                          }
                                        }}
                                        className="text-red-400 hover:text-red-300 font-bold ml-1"
                                      >
                                        ×
                                      </button>
                                    </div>
                                  ))}
                                  {(field.options || []).length === 0 && (
                                    <p className="text-[9px] text-dark-gray/40 py-2">Click '+ Add Option' to build menu selections.</p>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                        {(!editingService.details?.formFields || editingService.details.formFields.filter((f: any) => !f.isStandardFieldsConfig).length === 0) && (
                          <div className="p-8 border border-dashed border-white/10 rounded-2xl text-center text-dark-gray/40 text-xs">
                            No custom form fields built. Each service form in the cart will automatically include enabled basic fields: Full Name, Phone, Email, Description, PAN Card, and Aadhaar Card.
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                </div>
              </div>
            )}

            {/* TAB CONTENT: ORDERS PORTAL */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-black text-[#b9c9d6]">Service Setup Orders Portal</h2>
                  <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-bold rounded-full">{ordersList.length} Active Orders</span>
                </div>

                <div className="bg-secondary rounded-2xl border border-light-gray overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left text-xs">
                      <thead>
                        <tr className="bg-primary/50 border-b border-light-gray text-dark-gray/60 font-black uppercase tracking-wider">
                          <th className="px-6 py-4">Client Detail</th>
                          <th className="px-6 py-4">Service Applied</th>
                          <th className="px-6 py-4">Order Payment</th>
                          <th className="px-6 py-4">Submitted Forms</th>
                          <th className="px-6 py-4">Status Workflow</th>
                          <th className="px-6 py-4">Final Certificate</th>
                          <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-slate-200">
                        {ordersList.map((order: any) => (
                          <tr key={order.id} className="hover:bg-primary/20 transition-all">
                            <td className="px-6 py-4 space-y-1">
                              <div className="font-bold text-slate-100">{order.name}</div>
                              <div className="text-dark-gray/60">{order.phone}</div>
                              <div className="text-dark-gray/50">{order.email}</div>
                              <div className="text-[10px] text-accent flex items-center gap-1"><Calendar className="w-3.5 h-3.5 shrink-0" /> {new Date(order.date).toLocaleDateString()}</div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="px-2 py-0.5 bg-accent/10 border border-accent/20 text-accent text-[9px] font-black rounded uppercase">{order.service_name || order.service}</span>
                            </td>
                            <td className="px-6 py-4 space-y-1">
                              <span className="inline-flex items-center px-2 py-0.5 bg-green-500/10 text-green-400 border border-green-500/20 text-[9px] font-black uppercase rounded-full">Paid ₹{order.amount || 199}</span>
                              <div className="text-[9px] font-mono text-dark-gray/50 font-bold uppercase truncate max-w-xs">{order.payment_id || order.paymentId}</div>
                            </td>
                            <td className="px-6 py-4 max-w-xs">
                              {order.form_details && Object.keys(order.form_details).length > 0 ? (
                                <div className="space-y-1 text-[10px] bg-primary/20 border border-white/5 p-2.5 rounded-xl">
                                  {Object.entries(order.form_details).map(([key, val]: any) => (
                                    <div key={key} className="flex justify-between gap-3 border-b border-white/5 last:border-b-0 pb-0.5 last:pb-0">
                                      <span className="text-dark-gray/50 font-bold">{key.replace(/([A-Z])/g, ' $1')}:</span>
                                      <span className="font-semibold text-slate-300 truncate max-w-[120px]" title={String(val)}>
                                        {typeof val === 'string' && val.startsWith('/uploads/') ? (
                                          <a href={val} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline flex items-center gap-0.5">View Doc</a>
                                        ) : String(val)}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <span className="text-dark-gray/40">No form metadata</span>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              <select 
                                className="px-2.5 py-1 bg-primary text-xs border border-light-gray rounded-lg text-white"
                                value={order.order_status || 'New'}
                                onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                              >
                                <option value="New">New Order</option>
                                <option value="Under Review">Under Review</option>
                                <option value="Documents Pending">Docs Pending</option>
                                <option value="Processing">Processing</option>
                                <option value="Completed">Completed</option>
                                <option value="Rejected">Rejected</option>
                              </select>
                            </td>
                            <td className="px-6 py-4 space-y-2">
                              {order.certificate_url ? (
                                <div className="space-y-1">
                                  <a 
                                    href={order.certificate_url} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-green-400 hover:underline text-[10px] font-bold block max-w-xs truncate"
                                  >
                                    ✓ {order.certificate_name || 'View certificate'}
                                  </a>
                                  <span className="text-[9px] text-dark-gray block">Ready in User Dashboard</span>
                                </div>
                              ) : (
                                <span className="text-dark-gray/40 italic">Pending Upload</span>
                              )}
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex gap-2 justify-end items-center">
                                <button
                                  onClick={() => setSelectedOrderForUpload(order)}
                                  className="px-3 py-1.5 bg-accent hover:bg-accent-light text-secondary font-black text-[9px] uppercase tracking-wider rounded-xl transition-all inline-flex items-center gap-1 cursor-pointer"
                                >
                                  <Upload className="w-3 h-3" /> Upload Cert
                                </button>
                                <button 
                                  onClick={() => handleDeleteRecord(order.id)}
                                  className="p-2 text-red-400/60 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                                  title="Delete Order record"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Certificate Upload Modal */}
                {selectedOrderForUpload && (
                  <div className="fixed inset-0 bg-primary/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="glass-card bg-secondary border border-accent/25 rounded-3xl p-6 sm:p-8 max-w-md w-full relative space-y-6">
                      <button 
                        onClick={() => setSelectedOrderForUpload(null)} 
                        className="absolute top-4 right-4 p-1 hover:bg-white/5 rounded"
                      >
                        <X className="w-4 h-4 text-white/50" />
                      </button>

                      <div className="space-y-2">
                        <span className="text-[9px] font-black uppercase text-accent tracking-widest block">Deliver Certificate</span>
                        <h3 className="text-base font-black text-slate-100">Upload Final Certification</h3>
                        <p className="text-[11px] text-dark-gray/60 leading-normal">
                          Upload the certificate file for <strong>{selectedOrderForUpload.name}</strong> ({selectedOrderForUpload.service_name || selectedOrderForUpload.service}). This document will instantly load inside their user dashboard.
                        </p>
                      </div>

                      <div className="relative border-2 border-dashed border-light-gray rounded-2xl p-8 bg-primary flex flex-col items-center justify-center gap-3 group hover:border-accent transition-all">
                        {uploadingCertificate ? (
                          <div className="flex flex-col items-center gap-2">
                            <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-xs font-bold text-accent">Writing file on Hostinger DB...</span>
                          </div>
                        ) : (
                          <>
                            <Upload className="w-8 h-8 text-white/30 group-hover:text-accent transition-colors" />
                            <span className="text-xs font-bold text-white/60">Choose PDF / Image Certificate</span>
                            <input 
                              type="file" 
                              className="absolute inset-0 opacity-0 cursor-pointer"
                              onChange={handleUploadCertificate}
                            />
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT: LEADS & ENQUIRIES */}
            {activeTab === 'leads' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-black text-[#b9c9d6]">CRM Inquiries & Leads tracker</h2>
                  <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-bold rounded-full">{leadsList.length} Total Enquiries</span>
                </div>

                <div className="bg-secondary rounded-2xl border border-light-gray overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left text-xs">
                      <thead>
                        <tr className="bg-primary/50 border-b border-light-gray text-dark-gray/60 font-black uppercase tracking-wider">
                          <th className="px-6 py-4">Enquirer Contact</th>
                          <th className="px-6 py-4">Interest Area</th>
                          <th className="px-6 py-4">Message / Query Text</th>
                          <th className="px-6 py-4">Lead Status</th>
                          <th className="px-6 py-4">WhatsApp Link</th>
                          <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-slate-200">
                        {leadsList.map((lead: any) => (
                          <tr key={lead.id} className="hover:bg-primary/20 transition-all">
                            <td className="px-6 py-4 space-y-1">
                              <div className="font-bold text-slate-100">{lead.name}</div>
                              <div className="text-dark-gray/60">{lead.phone}</div>
                              <div className="text-dark-gray/50">{lead.email}</div>
                              <div className="text-[10px] text-accent flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {new Date(lead.date).toLocaleDateString()}</div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="px-2 py-0.5 bg-accent/10 border border-accent/20 text-accent text-[9px] font-black rounded uppercase">{lead.service_name || lead.service || 'General Support'}</span>
                            </td>
                            <td className="px-6 py-4 max-w-sm">
                              <p className="leading-normal text-slate-300 font-semibold italic bg-primary/20 p-3 border border-white/5 rounded-xl">"{lead.message || 'No additional details.'}"</p>
                            </td>
                            <td className="px-6 py-4">
                              <select 
                                className="px-2.5 py-1 bg-primary text-xs border border-light-gray rounded-lg text-white"
                                value={lead.lead_status || 'New'}
                                onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value)}
                              >
                                <option value="New">New Lead</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Qualified">Qualified</option>
                                <option value="Converted">Converted</option>
                                <option value="Closed">Closed</option>
                              </select>
                            </td>
                            <td className="px-6 py-4">
                              <button 
                                onClick={() => window.open(`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=Hi ${lead.name}, regarding your inquiry on Fortune Multi Services.`, '_blank')}
                                className="px-3 py-1.5 bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all inline-flex items-center gap-1 cursor-pointer"
                              >
                                <ExternalLink className="w-3 h-3" /> WhatsApp Advisor
                              </button>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <button 
                                onClick={() => handleDeleteRecord(lead.id)}
                                className="p-2 text-red-400/60 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                                title="Delete Lead permanently"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: USER DIRECTORY */}
            {activeTab === 'users' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-black text-[#b9c9d6]">Client Directory Directory</h2>
                  <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-bold rounded-full">{usersList.length} Total Profiles</span>
                </div>

                <div className="bg-secondary rounded-2xl border border-light-gray overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left text-xs">
                      <thead>
                        <tr className="bg-primary/50 border-b border-light-gray text-dark-gray/60 font-black uppercase tracking-wider">
                          <th className="px-6 py-4">Client ID Profile</th>
                          <th className="px-6 py-4">Registered Date</th>
                          <th className="px-6 py-4">Active Status</th>
                          <th className="px-6 py-4 text-right">Account Control</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-slate-200">
                        {usersList.map((user: any) => (
                          <tr key={user.id} className="hover:bg-primary/20 transition-all">
                            <td className="px-6 py-4 flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center font-black text-accent text-xs">
                                {user.email.charAt(0).toUpperCase()}
                              </div>
                              <span className="font-bold text-slate-100">{user.email}</span>
                            </td>
                            <td className="px-6 py-4">
                              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-accent" /> {new Date(user.created_at || user.id).toLocaleDateString()}</span>
                            </td>
                            <td className="px-6 py-4">
                              <span className={cn(
                                'px-2.5 py-0.5 text-[9px] font-black uppercase rounded-full border',
                                user.status === 'active' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                              )}>{user.status || 'active'}</span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button 
                                  onClick={() => handleToggleUserStatus(user.email, user.status)}
                                  className={cn(
                                    'px-4 py-2 text-[10px] font-black uppercase tracking-wider border rounded-xl transition-all cursor-pointer whitespace-nowrap',
                                    user.status === 'blocked' 
                                      ? 'bg-green-500/10 hover:bg-green-500/20 border-green-500/20 text-green-400' 
                                      : 'bg-rose-500/10 hover:bg-rose-500/20 border-rose-500/20 text-rose-400'
                                  )}
                                >
                                  {user.status === 'blocked' ? 'Activate' : 'Block User'}
                                </button>
                                <button
                                  onClick={() => handleDeleteUser(user.email)}
                                  className="p-2 bg-red-500/10 hover:bg-red-500/25 border border-red-500/30 hover:border-red-500/50 text-red-400 hover:text-red-300 rounded-xl transition-all cursor-pointer"
                                  title="Delete user permanently"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}



          </>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
