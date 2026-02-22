import { useState } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AuthStepProps {
    isAuthenticated: boolean;
    onAuthSuccess: (userId: string) => void;
}

export function AuthStep({ isAuthenticated, onAuthSuccess }: AuthStepProps) {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (isAuthenticated) {
        return (
            <div className="w-full max-w-md mx-auto text-center space-y-6 py-10">
                <div className="mx-auto w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Você já está conectado!</h3>
                <p className="text-slate-500">
                    Sua conta está vinculada a esta compra. Podemos continuar.
                </p>
            </div>
        );
    }

    const handleMockLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            onAuthSuccess('mock-user-id');
        }, 800);
    };

    return (
        <div className="w-full max-w-md mx-auto space-y-8">
            <div className="text-center mb-8">
                <p className="text-slate-500 text-lg">
                    Identifique-se para continuar sua compra de forma segura.
                </p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
                <form onSubmit={handleMockLogin} className="space-y-5 relative z-10">
                    <div className="space-y-2 text-left">
                        <label className="text-sm font-bold text-slate-700">E-mail</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-slate-400" />
                            </div>
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

                    <Button
                        type="submit"
                        disabled={!email || isSubmitting}
                        className="w-full h-12 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-base transition-all"
                    >
                        {isSubmitting ? 'Conectando...' : 'Continuar com E-mail'}
                    </Button>
                </form>

                <div className="mt-8 pt-6 border-t border-slate-100 relative z-10">
                    <p className="text-center text-xs text-slate-400 leading-relaxed">
                        Ao continuar, você concorda com nossos Termos de Serviço.
                        Não enviamos spam.
                    </p>
                </div>

                {/* Decorative blob */}
                <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-violet-50 rounded-full blur-2xl opacity-50 pointer-events-none" />
            </div>
        </div>
    );
}
