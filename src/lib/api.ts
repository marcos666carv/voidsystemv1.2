import { supabase } from './supabase';

const API_BASE = '/api';

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const { data: { session } } = await supabase.auth.getSession();
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...((options.headers as Record<string, string>) || {}),
    };

    if (session?.access_token) {
        headers['Authorization'] = `Bearer ${session.access_token}`;
    }

    const response = await fetch(`${API_BASE}${path}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(error.error || `Request failed: ${response.status}`);
    }

    return response.json();
}

// Clients
export const clientsApi = {
    list: (params?: { page?: number; limit?: number; search?: string; source?: string }) => {
        const query = new URLSearchParams();
        if (params?.page) query.set('page', String(params.page));
        if (params?.limit) query.set('limit', String(params.limit));
        if (params?.search) query.set('search', params.search);
        if (params?.source) query.set('source', params.source);
        return request<{ clients: any[]; pagination: any }>(`/clients?${query}`);
    },

    create: (data: any) =>
        request<{ id: string }>('/clients', {
            method: 'POST',
            body: JSON.stringify(data),
        }),
};

// Appointments
export const appointmentsApi = {
    list: (params?: { date?: string; clientId?: string; status?: string }) => {
        const query = new URLSearchParams();
        if (params?.date) query.set('date', params.date);
        if (params?.clientId) query.set('clientId', params.clientId);
        if (params?.status) query.set('status', params.status);
        return request<{ appointments: any[] }>(`/appointments?${query}`);
    },

    create: (data: {
        clientId: string;
        serviceId: string;
        tankId?: string;
        startTime: string;
        endTime: string;
        notes?: string;
    }) =>
        request<{ id: string }>('/appointments', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    update: (data: { id: string; status?: string; tankId?: string; notes?: string }) =>
        request<{ message: string }>('/appointments', {
            method: 'PUT',
            body: JSON.stringify(data),
        }),
};

// Sales
export const salesApi = {
    list: (params?: { startDate?: string; endDate?: string; clientId?: string; page?: number }) => {
        const query = new URLSearchParams();
        if (params?.startDate) query.set('startDate', params.startDate);
        if (params?.endDate) query.set('endDate', params.endDate);
        if (params?.clientId) query.set('clientId', params.clientId);
        if (params?.page) query.set('page', String(params.page));
        return request<{ sales: any[]; summary: any; pagination: any }>(`/sales?${query}`);
    },

    create: (data: {
        clientId: string;
        items: Array<{ productId: string; qty: number; price: number }>;
        totalAmount: number;
        paymentMethod: string;
        notes?: string;
    }) =>
        request<{ id: string }>('/sales', {
            method: 'POST',
            body: JSON.stringify(data),
        }),
};

// Dashboard
export const dashboardApi = {
    admin: () => request<any>('/dashboard?type=admin'),
    client: () => request<any>('/dashboard?type=client'),
};
