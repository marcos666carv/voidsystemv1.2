import { useState, useEffect } from 'react';
import { Mail, Lock, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';

interface AuthStepProps {
    isAuthenticated: boolean;
    onAuthSuccess: (userId: string) => void;
}

export function AuthStep({ onAuthSuccess }: AuthStepProps) {
    const { user, isAuthenticated, login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Se já está logado, propaga o userId imediatamente
    useEffect(() => {
        if (isAuthenticated && user?.id) {
            onAuthSuccess(user.id);
        }
    }, [isAuthenticated, user?.id, onAuthSuccess]);

    if (isAuthenticated && user) {
        return (
            <div className="w-full max-w-md mx-auto text-center space-y-6 py-10">
                <div className="mx-auto w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Você já está conectado!</h3>
                <p className="text-slate-500">
                    Compra vinculada à conta <strong>{user.email}</strong>. Pode continuar.
                </p>
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        try {
            await login(email, password);
            // useEffect acima propaga após o login
        } catch (err: any) {
            setError(err.message || 'E-mail ou senha incorretos.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto space-y-8">
            <div className="text-center mb-8">
                <p className="text-slate-500 text-lg">
                    Identifique-se para continuar sua compra de forma segura.
                </p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
                <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                    <div className="space-y-2 text-left">
                        <label className="text-sm font-bold text-slate-700">E-mail</label>
                        <div className="relative">
                            <Mail className="absolute inset-y-0 left-3 my-auto h-5 w-5 text-slate-400 pointer-events-none" />
                            <Input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="pl-10 h-12 rounded-xl bg-slate-50 border-slate-200 focus:bg-white text-base"
                                placeholder="seu@email.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2 text-left">
                        <label className="text-sm font-bold text-slate-700">Senha</label>
                        <div className="relative">
                            <Lock className="absolute inset-y-0 left-3 my-auto h-5 w-5 text-slate-400 pointer-events-none" />
                            <Input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="pl-10 h-12 rounded-xl bg-slate-50 border-slate-200 focus:bg-white text-base"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    {error && (
                        <p className="text-sm text-red-600 text-center">{error}</p>
                    )}

                    <Button
                        type="submit"
                        disabled={!email || !password || isSubmitting}
                        className="w-full h-12 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-base transition-all"
                    >
                        {isSubmitting
                            ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Entrando...</>
                            : 'Entrar e Continuar'
                        }
                    </Button>
                </form>

                <div className="mt-8 pt-6 border-t border-slate-100 relative z-10">
                    <p className="text-center text-xs text-slate-400 leading-relaxed">
                        Ao continuar, você concorda com nossos Termos de Serviço.
                    </p>
                </div>

                <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-violet-50 rounded-full blur-2xl opacity-50 pointer-events-none" />
            </div>
        </div>
    );
}
