import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { User, Mail, Lock, Phone, CreditCard, MapPin, Briefcase, ArrowRight, Eye, EyeOff, Calendar } from 'lucide-react';

export default function ClientRegisterPage() {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(1);

    const [form, setForm] = useState({
        fullName: '',
        email: '',
        password: '',
        phone: '',
        cpf: '',
        birthDate: '',
        neighborhood: '',
        city: '',
        cep: '',
        profession: '',
    });

    const update = (field: string, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await register({ ...form, role: 'client' });
            navigate('/app', { replace: true });
        } catch (err: any) {
            setError(err.message || 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h3 className="text-xl font-semibold text-slate-800 tracking-tight">
                    criar sua conta
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                    faça parte do void
                </p>
            </div>

            {/* Progress dots */}
            <div className="flex items-center justify-center gap-2">
                {[1, 2].map((s) => (
                    <div
                        key={s}
                        className={`h-2 rounded-full transition-all duration-300 ${s === step ? 'w-8 bg-slate-900' : 'w-2 bg-slate-200'
                            }`}
                    />
                ))}
            </div>

            {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                {step === 1 && (
                    <>
                        <InputField
                            id="reg-name"
                            label="nome completo"
                            icon={<User className="h-4 w-4" />}
                            value={form.fullName}
                            onChange={(v) => update('fullName', v)}
                            placeholder="seu nome completo"
                            required
                        />

                        <InputField
                            id="reg-email"
                            label="email"
                            type="email"
                            icon={<Mail className="h-4 w-4" />}
                            value={form.email}
                            onChange={(v) => update('email', v)}
                            placeholder="seu@email.com"
                            required
                            autoComplete="email"
                        />

                        <div className="space-y-1.5">
                            <label htmlFor="reg-password" className="text-sm font-medium text-slate-700">
                                senha
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <input
                                    id="reg-password"
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

                        <InputField
                            id="reg-phone"
                            label="telefone"
                            type="tel"
                            icon={<Phone className="h-4 w-4" />}
                            value={form.phone}
                            onChange={(v) => update('phone', v)}
                            placeholder="(41) 99999-9999"
                        />

                        <button
                            type="button"
                            onClick={() => setStep(2)}
                            disabled={!form.fullName || !form.email || !form.password}
                            className="w-full py-2.5 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            continuar
                            <ArrowRight className="h-4 w-4" />
                        </button>
                    </>
                )}

                {step === 2 && (
                    <>
                        <InputField
                            id="reg-cpf"
                            label="cpf"
                            icon={<CreditCard className="h-4 w-4" />}
                            value={form.cpf}
                            onChange={(v) => update('cpf', v)}
                            placeholder="000.000.000-00"
                        />

                        <InputField
                            id="reg-birth"
                            label="data de nascimento"
                            type="date"
                            icon={<Calendar className="h-4 w-4" />}
                            value={form.birthDate}
                            onChange={(v) => update('birthDate', v)}
                        />

                        <div className="grid grid-cols-2 gap-3">
                            <InputField
                                id="reg-neighborhood"
                                label="bairro"
                                icon={<MapPin className="h-4 w-4" />}
                                value={form.neighborhood}
                                onChange={(v) => update('neighborhood', v)}
                                placeholder="Água Verde"
                            />
                            <InputField
                                id="reg-city"
                                label="cidade"
                                icon={<MapPin className="h-4 w-4" />}
                                value={form.city}
                                onChange={(v) => update('city', v)}
                                placeholder="Curitiba"
                            />
                        </div>

                        <InputField
                            id="reg-cep"
                            label="cep"
                            icon={<MapPin className="h-4 w-4" />}
                            value={form.cep}
                            onChange={(v) => update('cep', v)}
                            placeholder="80000-000"
                        />

                        <InputField
                            id="reg-profession"
                            label="profissão"
                            icon={<Briefcase className="h-4 w-4" />}
                            value={form.profession}
                            onChange={(v) => update('profession', v)}
                            placeholder="sua profissão"
                        />

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="flex-1 py-2.5 border border-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors"
                            >
                                voltar
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="flex-1 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        criar conta
                                        <ArrowRight className="h-4 w-4" />
                                    </>
                                )}
                            </button>
                        </div>
                    </>
                )}
            </form>

            <div className="text-center text-sm text-slate-500">
                já tem uma conta?{' '}
                <Link to="/login" className="text-slate-900 font-medium hover:underline">
                    entrar
                </Link>
            </div>
        </div>
    );
}

// Reusable input field component
function InputField({
    id,
    label,
    type = 'text',
    icon,
    value,
    onChange,
    placeholder,
    required,
    autoComplete,
    minLength,
}: {
    id: string;
    label: string;
    type?: string;
    icon: React.ReactNode;
    value: string;
    onChange: (val: string) => void;
    placeholder?: string;
    required?: boolean;
    autoComplete?: string;
    minLength?: number;
}) {
    return (
        <div className="space-y-1.5">
            <label htmlFor={id} className="text-sm font-medium text-slate-700">
                {label}
            </label>
            <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    {icon}
                </span>
                <input
                    id={id}
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-colors bg-slate-50/50"
                    placeholder={placeholder}
                    required={required}
                    autoComplete={autoComplete}
                    minLength={minLength}
                />
            </div>
        </div>
    );
}
