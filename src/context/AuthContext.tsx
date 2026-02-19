import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import type { User as SupabaseUser, Session } from '@supabase/supabase-js';

// ━━━ DEV MOCK AUTH ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Set to true to bypass Supabase and auto-login as admin
const DEV_MOCK_AUTH = true;

const MOCK_ADMIN_USER: User = {
    id: 'dev-admin-001',
    email: 'admin@void.dev',
    fullName: 'Admin Dev',
    role: 'admin',
};
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

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
    session: Session | null;
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
    logout: () => Promise<void>;
    supabaseUser: SupabaseUser | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

function mapSupabaseUser(su: SupabaseUser): User {
    const meta = su.user_metadata || {};
    return {
        id: su.id,
        email: su.email || '',
        fullName: meta.full_name || meta.name || su.email?.split('@')[0] || 'User',
        role: meta.role || 'client',
        membershipTier: meta.membership_tier,
        level: meta.level,
        xp: meta.xp,
    };
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<AuthState>({
        user: DEV_MOCK_AUTH ? MOCK_ADMIN_USER : null,
        session: null,
        isAuthenticated: DEV_MOCK_AUTH,
        isLoading: DEV_MOCK_AUTH ? false : true,
    });
    const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null);

    useEffect(() => {
        if (DEV_MOCK_AUTH) return; // Skip Supabase in dev mock mode

        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session?.user) {
                const user = mapSupabaseUser(session.user);
                setSupabaseUser(session.user);
                setState({ user, session, isAuthenticated: true, isLoading: false });
            } else {
                setState({ user: null, session: null, isAuthenticated: false, isLoading: false });
            }
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                const user = mapSupabaseUser(session.user);
                setSupabaseUser(session.user);
                setState({ user, session, isAuthenticated: true, isLoading: false });
            } else {
                setSupabaseUser(null);
                setState({ user: null, session: null, isAuthenticated: false, isLoading: false });
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const login = useCallback(async (email: string, password: string) => {
        if (DEV_MOCK_AUTH) {
            setState({ user: MOCK_ADMIN_USER, session: null, isAuthenticated: true, isLoading: false });
            return;
        }

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email.toLowerCase().trim(),
            password,
        });

        if (error) throw new Error(error.message);
        if (!data.user) throw new Error('Login failed');
    }, []);

    const register = useCallback(async (data: Parameters<AuthContextType['register']>[0]) => {
        if (DEV_MOCK_AUTH) {
            setState({ user: MOCK_ADMIN_USER, session: null, isAuthenticated: true, isLoading: false });
            return;
        }

        const { data: authData, error } = await supabase.auth.signUp({
            email: data.email.toLowerCase().trim(),
            password: data.password,
            options: {
                data: {
                    full_name: data.fullName.trim(),
                    phone: data.phone?.trim(),
                    cpf: data.cpf?.replace(/\D/g, ''),
                    birth_date: data.birthDate,
                    neighborhood: data.neighborhood?.trim(),
                    city: data.city?.trim(),
                    cep: data.cep?.replace(/\D/g, ''),
                    profession: data.profession?.trim(),
                    role: data.role || 'client',
                },
            },
        });

        if (error) throw new Error(error.message);
        if (!authData.user) throw new Error('Registration failed');
    }, []);

    const logout = useCallback(async () => {
        if (DEV_MOCK_AUTH) {
            setState({ user: null, session: null, isAuthenticated: false, isLoading: false });
            return;
        }

        await supabase.auth.signOut();
        setState({ user: null, session: null, isAuthenticated: false, isLoading: false });
    }, []);

    return (
        <AuthContext.Provider value={{ ...state, login, register, logout, supabaseUser }}>
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

