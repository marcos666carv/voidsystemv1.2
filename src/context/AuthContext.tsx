import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { authApi } from '@/lib/api';

interface User {
    id: string;
    email: string;
    fullName: string;
    role: 'client' | 'admin' | 'staff';
    membershipTier?: string;
    level?: string;
    xp?: number;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

interface AuthContextType extends AuthState {
    login: (email: string, password: string) => Promise<void>;
    register: (data: {
        email: string;
        password: string;
        fullName: string;
        phone?: string;
        cpf?: string;
        birthDate?: string;
        neighborhood?: string;
        city?: string;
        cep?: string;
        profession?: string;
        role?: 'client' | 'admin';
    }) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<AuthState>({
        user: null,
        isAuthenticated: false,
        isLoading: true,
    });

    // Check for existing token on mount
    useEffect(() => {
        const token = localStorage.getItem('void_token');
        const userData = localStorage.getItem('void_user');

        if (token && userData) {
            try {
                const user = JSON.parse(userData);
                setState({ user, isAuthenticated: true, isLoading: false });
            } catch {
                localStorage.removeItem('void_token');
                localStorage.removeItem('void_user');
                setState({ user: null, isAuthenticated: false, isLoading: false });
            }
        } else {
            setState({ user: null, isAuthenticated: false, isLoading: false });
        }
    }, []);

    const login = useCallback(async (email: string, password: string) => {
        const response = await authApi.login(email, password);
        localStorage.setItem('void_token', response.token);
        localStorage.setItem('void_user', JSON.stringify(response.user));
        setState({ user: response.user, isAuthenticated: true, isLoading: false });
    }, []);

    const register = useCallback(async (data: Parameters<AuthContextType['register']>[0]) => {
        const response = await authApi.register(data);
        localStorage.setItem('void_token', response.token);
        localStorage.setItem('void_user', JSON.stringify(response.user));
        setState({ user: response.user, isAuthenticated: true, isLoading: false });
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('void_token');
        localStorage.removeItem('void_user');
        setState({ user: null, isAuthenticated: false, isLoading: false });
    }, []);

    return (
        <AuthContext.Provider value={{ ...state, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
