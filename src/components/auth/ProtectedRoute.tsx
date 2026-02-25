import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
    children: ReactNode;
    role?: 'client' | 'admin' | 'staff';
    allowedRoles?: string[];
}

export function ProtectedRoute({ children, role, allowedRoles }: ProtectedRouteProps) {
    const { isAuthenticated, isLoading, user } = useAuth();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin h-8 w-8 border-2 border-slate-300 border-t-slate-900 rounded-full" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Role check
    if (role && user?.role !== role) {
        // Admins can access everything
        if (user?.role === 'admin') {
            return <>{children}</>;
        }
        // Staff can access admin routes
        if (role === 'admin' && user?.role === 'staff') {
            return <>{children}</>;
        }
        return <Navigate to="/" replace />;
    }

    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
}
