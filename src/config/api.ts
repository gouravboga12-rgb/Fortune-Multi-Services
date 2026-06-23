import { servicesData, type ServiceCategory } from '../data/services';

export interface Inquiry {
  id: number;
  type?: 'enquiry' | 'lead' | 'order';
  name: string;
  phone: string;
  email: string;
  message?: string;
  service_name?: string;
  service?: string; // mapping for convenience
  amount?: number;
  paid: boolean;
  payment_id?: string;
  paymentId?: string; // mapping for convenience
  order_status?: 'New' | 'Under Review' | 'Documents Pending' | 'Processing' | 'Completed' | 'Rejected';
  lead_status?: 'New' | 'Contacted' | 'Qualified' | 'Converted' | 'Closed';
  certificate_name?: string;
  certificate_url?: string;
  form_details?: Record<string, any>;
  date: string;
}

export interface UserRecord {
  id: number;
  email: string;
  status: 'active' | 'blocked';
  created_at: string;
}

export interface GlobalSettings {
  paymentModes: {
    upi: boolean;
    razorpay: boolean;
    bankTransfer: boolean;
    manual: boolean;
  };
}

const API_BASE_URL = 'http://localhost:5000/api';

const handleLocalStorageFallback = (action: string, error: any) => {
  console.warn(`[API RESILIENCY] ${action} API failed. Falling back to browser LocalStorage/Cache.`, error);
};

// --- INQUIRIES & ORDERS API ---

export const getInquiries = async (): Promise<Inquiry[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/inquiries`);
    if (!response.ok) throw new Error('API server returned error status');
    const data = await response.json();
    // Sync with local storage
    localStorage.setItem('inquiries', JSON.stringify(data));
    return data;
  } catch (error) {
    handleLocalStorageFallback('fetch inquiries', error);
    const local = localStorage.getItem('inquiries');
    return JSON.parse(local || '[]');
  }
};

export const createInquiry = async (inquiryData: Omit<Inquiry, 'id' | 'date'> & { id?: number; date?: string }): Promise<Inquiry> => {
  const payload = {
    ...inquiryData,
    id: inquiryData.id || Date.now(),
    date: inquiryData.date || new Date().toISOString()
  };

  try {
    const response = await fetch(`${API_BASE_URL}/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error('API server returned error status');
    const data = await response.json();
    return data;
  } catch (error) {
    handleLocalStorageFallback('create inquiry', error);
    const local = localStorage.getItem('inquiries');
    const existing = JSON.parse(local || '[]');
    const newRecord = payload as Inquiry;
    localStorage.setItem('inquiries', JSON.stringify([...existing, newRecord]));
    return newRecord;
  }
};

export const updateInquiry = async (id: number, updateData: Partial<Inquiry>): Promise<boolean> => {
  // Map fields for convenience
  const payload = { ...updateData };
  
  try {
    const response = await fetch(`${API_BASE_URL}/inquiries/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error('API server returned error status');
    return true;
  } catch (error) {
    handleLocalStorageFallback('update inquiry', error);
    const local = localStorage.getItem('inquiries');
    const existing: Inquiry[] = JSON.parse(local || '[]');
    const idx = existing.findIndex(item => item.id === id);
    if (idx !== -1) {
      existing[idx] = { ...existing[idx], ...updateData };
      localStorage.setItem('inquiries', JSON.stringify(existing));
    }
    return true;
  }
};

export const deleteInquiry = async (id: number): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/inquiries/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('API server returned error status');
    return true;
  } catch (error) {
    handleLocalStorageFallback('delete inquiry', error);
    const local = localStorage.getItem('inquiries');
    const existing: Inquiry[] = JSON.parse(local || '[]');
    const updated = existing.filter(item => item.id !== id);
    localStorage.setItem('inquiries', JSON.stringify(updated));
    return true;
  }
};

// --- SERVICES & CATEGORIES DATABASE API ---

export const getServices = async (): Promise<ServiceCategory[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/services`);
    if (!response.ok) throw new Error('API server returned error status');
    const data = await response.json();
    localStorage.setItem('services_data', JSON.stringify(data));
    return data;
  } catch (error) {
    handleLocalStorageFallback('fetch services', error);
    const local = localStorage.getItem('services_data');
    if (local) {
      return JSON.parse(local);
    }
    return servicesData; // Default hardcoded static data
  }
};

export const saveServices = async (data: ServiceCategory[]): Promise<boolean> => {
  localStorage.setItem('services_data', JSON.stringify(data));
  try {
    const response = await fetch(`${API_BASE_URL}/services`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.ok;
  } catch (error) {
    handleLocalStorageFallback('save services', error);
    return false;
  }
};

// --- USER DIRECTORY API ---

export const getUsers = async (): Promise<UserRecord[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) throw new Error('API server returned error status');
    return await response.json();
  } catch (error) {
    handleLocalStorageFallback('fetch users', error);
    return [];
  }
};

export const updateUserStatus = async (email: string, status: 'active' | 'blocked'): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${encodeURIComponent(email)}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    return response.ok;
  } catch (error) {
    handleLocalStorageFallback('update user status', error);
    return false;
  }
};

// --- GLOBAL SETTINGS API ---

export const getSettings = async (): Promise<GlobalSettings> => {
  const fallbackSettings: GlobalSettings = {
    paymentModes: {
      upi: true,
      razorpay: true,
      bankTransfer: true,
      manual: true
    }
  };
  try {
    const response = await fetch(`${API_BASE_URL}/settings`);
    if (!response.ok) throw new Error('API server returned error status');
    const data = await response.json();
    localStorage.setItem('global_settings', JSON.stringify(data));
    return data;
  } catch (error) {
    handleLocalStorageFallback('fetch settings', error);
    const local = localStorage.getItem('global_settings');
    if (local) return JSON.parse(local);
    return fallbackSettings;
  }
};

export const saveSettings = async (settings: GlobalSettings): Promise<boolean> => {
  localStorage.setItem('global_settings', JSON.stringify(settings));
  try {
    const response = await fetch(`${API_BASE_URL}/settings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings)
    });
    return response.ok;
  } catch (error) {
    handleLocalStorageFallback('save settings', error);
    return false;
  }
};

// --- FILE UPLOADS (CERTIFICATES) API ---

export const uploadCertificateFile = async (fileName: string, base64Data: string): Promise<{ success: boolean; fileName?: string; fileUrl?: string; error?: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/upload-certificate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileName, fileData: base64Data })
    });
    if (!response.ok) throw new Error('API server failed to process file upload');
    return await response.json();
  } catch (error: any) {
    console.error('[API] File upload failed:', error);
    return { success: false, error: error.message || 'Network upload failed' };
  }
};
