export interface Inquiry {
  id: number;
  name: string;
  phone: string;
  email: string;
  companyName?: string;
  message?: string;
  service: string;
  paid: boolean;
  paymentId?: string;
  amount?: number;
  date: string;
}

const API_BASE_URL = 'http://localhost:5000/api';

// Helper to determine if we should fall back to localStorage
const handleLocalStorageFallback = (action: string, error: any) => {
  console.warn(`[API RESILIENCY] ${action} API failed. Falling back to browser LocalStorage.`, error);
};

// GET: All Inquiries
export const getInquiries = async (): Promise<Inquiry[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/inquiries`);
    if (!response.ok) throw new Error('API server returned error status');
    const data = await response.json();
    console.log('[API] Fetched inquiries successfully from backend server.');
    return data;
  } catch (error) {
    handleLocalStorageFallback('fetch', error);
    const local = localStorage.getItem('inquiries');
    return JSON.parse(local || '[]');
  }
};

// POST: Add new inquiry
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
    console.log('[API] Inquiry synchronized successfully with backend server.');
    return data;
  } catch (error) {
    handleLocalStorageFallback('create', error);
    
    // Save to local storage as fallback
    const local = localStorage.getItem('inquiries');
    const existing = JSON.parse(local || '[]');
    const newInquiry = payload as Inquiry;
    localStorage.setItem('inquiries', JSON.stringify([...existing, newInquiry]));
    return newInquiry;
  }
};

// DELETE: Remove inquiry by ID
export const deleteInquiry = async (id: number): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/inquiries/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('API server returned error status');
    console.log('[API] Inquiry deleted successfully from backend server.');
    return true;
  } catch (error) {
    handleLocalStorageFallback('delete', error);
    
    // Remove from local storage as fallback
    const local = localStorage.getItem('inquiries');
    const existing: Inquiry[] = JSON.parse(local || '[]');
    const updated = existing.filter(item => item.id !== id);
    localStorage.setItem('inquiries', JSON.stringify(updated));
    return true;
  }
};
