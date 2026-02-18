import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { User, Mail, Lock, Shield, ArrowRight, Eye, EyeOff } from 'lucide-react';

export default function AdminRegisterPage() {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [form, setForm] = useState({
        fullName: '',
        email: '',
        password: '',
        inviteCode: '',
    });

    const update = (field: string, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Simple invite code validation (can be improved later)
        if (form.inviteCode !== 'VOID-ADMIN-2026') {
            setError('Código de convite inválido');
            return;
        }

        setIsLoading(true);

        try {
            await register({
                fullName: form.fullName,
                email: form.email,
                password: form.password,
                role: 'admin',
            });
            navigate('/admin', { replace: true });
        } catch (err: any) {
            setError(err.message || 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="text-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 text-xs font-medium rounded-full border border-amber-200 mb-4">
                    <Shield className="h-3 w-3" />
                    acesso restrito
                </div>
                <h3 className="text-xl font-semibold text-slate-800 tracking-tight">
                    registro de administrador
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                    requer código de convite
                </p>
            </div>

            {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                    <label htmlFor="admin-name" className="text-sm font-medium text-slate-700">
                        nome completo
                    </label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                            id="admin-name"
                            type="text"
                            value={form.fullName}
                            onChange={(e) => update('fullName', e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-colors bg-slate-50/50"
                            placeholder="nome do administrador"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label htmlFor="admin-email" className="text-sm font-medium text-slate-700">
                        email corporativo
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                            id="admin-email"
                            type="email"
                            value={form.email}
                            onChange={(e) => update('email', e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-colors bg-slate-50/50"
                            placeholder="admin@voidfloat.com.br"
                            required
                            autoComplete="email"
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label htmlFor="admin-password" className="text-sm font-medium text-slate-700">
                        senha
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                            id="admin-password"
                            type={showPassword ? 'text' : 'password'}
                            value={form.password}
                            onChange={(e) => update('password', e.target.value)}
                            className="w-full pl-10 pr-11 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-colors bg-slate-50/50"
                            placeholder="mínimo 8 caracteres"
                            required
                            minLength={8}
                            autoComplete="new-password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label htmlFor="admin-invite" className="text-sm font-medium text-slate-700">
                        código de convite
                    </label>
                    <div className="relative">
                        <Shield className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                            id="admin-invite"
                            type="text"
                            value={form.inviteCode}
                            onChange={(e) => update('inviteCode', e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-colors bg-slate-50/50 font-mono"
                            placeholder="VOID-XXXX-XXXX"
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2.5 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <>
                            registrar administrador
                            <ArrowRight className="h-4 w-4" />
                        </>
                    )}
                </button>
            </form>

            <div className="text-center text-sm text-slate-500">
                já tem acesso?{' '}
                <Link to="/login" className="text-slate-900 font-medium hover:underline">
                    entrar
                </Link>
            </div>
        </div>
    );
}
