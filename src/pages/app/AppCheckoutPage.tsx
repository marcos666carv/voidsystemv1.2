import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Waves, Hand, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VariantStep } from '@/pages/public/checkout/steps/VariantStep';
import { ScheduleStep } from '@/pages/public/checkout/steps/ScheduleStep';
import { PaymentStep } from '@/pages/public/checkout/steps/PaymentStep';
import { useAuth } from '@/context/AuthContext';
import { checkoutApi } from '@/lib/api';
import { MOCK_PACKAGES } from '@/lib/mockData';

type FlowType = 'float' | 'massage' | 'combo';

const CATEGORIES: { id: FlowType; label: string; description: string; Icon: typeof Waves }[] = [
    { id: 'float', label: 'Flutuação', description: 'Isolamento sensorial profundo.', Icon: Waves },
    { id: 'massage', label: 'Massoterapia', description: 'Equilíbrio muscular e mental.', Icon: Hand },
    { id: 'combo', label: 'Combos', description: 'Float + Massagem — o reset completo.', Icon: Sparkles },
];

const STEPS = [
    { id: 'category', label: 'O que você quer?' },
    { id: 'variant', label: 'Escolha sua sessão' },
    { id: 'schedule', label: 'Quando e onde?' },
    { id: 'payment', label: 'Pagamento' },
];

function resolveServiceId(variantId?: string): string {
    if (!variantId) return 'srv-flut';
    const pkg = MOCK_PACKAGES.find(p => p.id === variantId);
    return pkg?.serviceId ?? variantId;
}

export function AppCheckoutPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { user } = useAuth();

    const initialType = (searchParams.get('type') as FlowType) || null;
    const [currentStepIdx, setCurrentStepIdx] = useState(initialType ? 1 : 0);
    const [flowType, setFlowType] = useState<FlowType>(initialType || 'float');
    const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');
    const [checkoutData, setCheckoutData] = useState<{
        variantId?: string;
        price?: number;
        locationId?: string;
        date?: string;
        time?: string;
        paymentReady?: boolean;
        paymentMethod?: string;
    }>({});

    const currentStep = STEPS[currentStepIdx];

    const canProceed = () => {
        if (currentStep.id === 'variant') return !!checkoutData.variantId;
        if (currentStep.id === 'schedule') return !!(checkoutData.locationId && checkoutData.date && checkoutData.time);
        if (currentStep.id === 'payment') return !!checkoutData.paymentReady;
        return true;
    };

    const handleSelectCategory = (type: FlowType) => {
        setFlowType(type);
        setCurrentStepIdx(1);
    };

    const handleBack = () => {
        if (currentStepIdx > 0) {
            setCurrentStepIdx(prev => prev - 1);
        } else {
            navigate('/app');
        }
    };

    const handleNext = async () => {
        if (!canProceed()) return;

        if (currentStepIdx < STEPS.length - 1) {
            setCurrentStepIdx(prev => prev + 1);
            return;
        }

        if (!user?.id || !checkoutData.price) return;

        setStatus('processing');
        setErrorMsg('');

        const isPix = checkoutData.paymentMethod === 'pix';
        const serviceId = resolveServiceId(checkoutData.variantId);

        try {
            const { id: orderId } = await checkoutApi.createSession({
                clientId: user.id,
                totalAmount: Math.round(checkoutData.price * 100),
                paymentMethod: checkoutData.paymentMethod || 'credit_card',
                checkoutData: {
                    flowType,
                    variantId: checkoutData.variantId,
                    serviceId,
                    date: checkoutData.date,
                    time: checkoutData.time,
                    locationId: checkoutData.locationId,
                },
            });

            if (!isPix) {
                await checkoutApi.confirm(orderId);
            }
        } catch (err: any) {
            if (!isPix) {
                setErrorMsg(err.message || 'Erro ao processar. Tente novamente.');
                setStatus('error');
                return;
            }
        }

        setStatus('success');
    };

    // ── Tela de processamento ──────────────────────────────
    if (status === 'processing') {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                <div className="w-14 h-14 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin mb-6" />
                <h2 className="text-2xl font-bold text-slate-900">Verificando...</h2>
                <p className="text-slate-500 mt-2">Aguarde enquanto processamos seu pagamento.</p>
            </div>
        );
    }

    // ── Tela de sucesso ────────────────────────────────────
    if (status === 'success') {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-in fade-in duration-500">
                <CheckCircle2 className="h-20 w-20 text-emerald-500 mb-6 animate-in zoom-in duration-500" />
                <h2 className="text-2xl font-bold text-slate-900">Compra Confirmada!</h2>
                <p className="text-slate-500 mt-2 max-w-sm">
                    Sua sessão está agendada. Nos vemos em breve no Void.
                </p>
                <Button
                    className="mt-8 bg-slate-900 text-white hover:bg-slate-800 rounded-xl px-8"
                    onClick={() => navigate('/app')}
                >
                    Voltar ao painel
                </Button>
            </div>
        );
    }

    // ── Fluxo principal ────────────────────────────────────
    return (
        <div className="space-y-8 animate-in fade-in duration-300 pb-12">

            {/* Cabeçalho da página */}
            <div className="flex items-center gap-4">
                <button
                    onClick={handleBack}
                    className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    voltar
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">{currentStep.label}</h1>
                    {currentStepIdx > 0 && (
                        <p className="text-sm text-slate-400 mt-0.5">
                            Passo {currentStepIdx} de {STEPS.length - 1}
                        </p>
                    )}
                </div>
            </div>

            {/* Progress bar */}
            {currentStepIdx > 0 && (
                <div className="flex gap-1.5">
                    {STEPS.slice(1).map((_, idx) => (
                        <div
                            key={idx}
                            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                                idx < currentStepIdx ? 'bg-violet-600' : 'bg-slate-200'
                            }`}
                        />
                    ))}
                </div>
            )}

            {/* Conteúdo do step */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">

                {currentStep.id === 'category' && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {CATEGORIES.map(({ id, label, description, Icon }) => (
                            <button
                                key={id}
                                onClick={() => handleSelectCategory(id)}
                                className="flex flex-col gap-5 p-6 border-2 border-slate-200 rounded-2xl hover:border-violet-400 hover:shadow-md transition-all text-left group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-violet-50 group-hover:border-violet-100 transition-colors">
                                    <Icon className="h-6 w-6 text-slate-600 group-hover:text-violet-600 transition-colors" />
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900 text-base">{label}</p>
                                    <p className="text-sm text-slate-500 mt-1">{description}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                )}

                {currentStep.id === 'variant' && (
                    <VariantStep
                        flowType={flowType}
                        selectedId={checkoutData.variantId}
                        onSelect={(id, price) => setCheckoutData(prev => ({ ...prev, variantId: id, price }))}
                    />
                )}

                {currentStep.id === 'schedule' && (
                    <ScheduleStep
                        flowType={flowType}
                        selectedLocationId={checkoutData.locationId}
                        selectedDate={checkoutData.date}
                        selectedTime={checkoutData.time}
                        onLocationSelect={(id) => setCheckoutData(prev => ({ ...prev, locationId: id }))}
                        onScheduleSelect={(date, time) => setCheckoutData(prev => ({ ...prev, date, time }))}
                    />
                )}

                {currentStep.id === 'payment' && (
                    <PaymentStep
                        totalPrice={checkoutData.price || 0}
                        onPaymentReady={(isReady, method) => setCheckoutData(prev => ({ ...prev, paymentReady: isReady, paymentMethod: method }))}
                    />
                )}
            </div>

            {/* Footer de navegação */}
            {currentStep.id !== 'category' && (
                <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-500">
                        {checkoutData.price
                            ? <span>Total: <strong className="text-slate-900">R$ {checkoutData.price.toFixed(2)}</strong></span>
                            : <span>Selecione para calcular</span>
                        }
                    </div>
                    <div className="flex items-center gap-4">
                        {status === 'error' && errorMsg && (
                            <span className="text-sm text-red-600">{errorMsg}</span>
                        )}
                        <Button
                            size="lg"
                            className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-10"
                            onClick={handleNext}
                            disabled={!canProceed()}
                        >
                            {currentStepIdx === STEPS.length - 1 ? 'Finalizar Compra' : 'Continuar'}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
