import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VariantStep } from './steps/VariantStep';
import { ScheduleStep } from './steps/ScheduleStep';
import { AuthStep } from './steps/AuthStep';
import { PaymentStep } from './steps/PaymentStep';
import { RecipientStep } from './steps/RecipientStep';
import { GiftCardStep } from './steps/GiftCardStep';

// Mock types
type FlowType = 'float' | 'massage' | 'combo' | 'gift';

const STEPS_BY_TYPE: Record<FlowType, { id: string, label: string }[]> = {
    float: [
        { id: 'variant', label: 'Detalhes do Serviço' },
        { id: 'schedule', label: 'Unidade e Agendamento' },
        { id: 'auth', label: 'Identificação' },
        { id: 'payment', label: 'Pagamento' }
    ],
    massage: [
        { id: 'variant', label: 'Detalhes do Serviço' },
        { id: 'schedule', label: 'Unidade e Agendamento' },
        { id: 'auth', label: 'Identificação' },
        { id: 'payment', label: 'Pagamento' }
    ],
    combo: [
        { id: 'variant', label: 'Detalhes do Serviço' },
        { id: 'schedule', label: 'Unidade e Agendar Sessões' },
        { id: 'auth', label: 'Identificação' },
        { id: 'payment', label: 'Pagamento' }
    ],
    gift: [
        { id: 'gift_card', label: 'Resgatar' },
        { id: 'recipient', label: 'Para Quem?' },
        { id: 'auth', label: 'Identificação' },
        { id: 'payment', label: 'Pagamento' }
    ]
};

export default function CheckoutFlow() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // Determine flow type from URL, default to float if missing or invalid
    const rawType = searchParams.get('type') as FlowType;
    const flowType: FlowType = STEPS_BY_TYPE[rawType] ? rawType : 'float';

    // State
    const [currentStepIdx, setCurrentStepIdx] = useState(0);
    const [checkoutData, setCheckoutData] = useState<{
        variantId?: string;
        price?: number;
        locationId?: string;
        date?: string;
        time?: string;
        userId?: string;
        paymentReady?: boolean;
        paymentMethod?: string;
        recipient?: {
            senderName: string;
            recipientName: string;
            recipientEmail: string;
            message: string;
        };
        recipientComplete?: boolean;
        giftCode?: string;
    }>({});

    const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');

    const steps = STEPS_BY_TYPE[flowType];
    const currentStep = steps[currentStepIdx];

    // Check if valid, if not, wait or redirect. Ideally we stay here.
    useEffect(() => {
        if (!STEPS_BY_TYPE[rawType]) {
            navigate('/services', { replace: true });
        }
    }, [rawType, navigate]);

    if (!STEPS_BY_TYPE[rawType]) return null;

    // Checks if the user can proceed from the current step
    const canProceed = () => {
        if (currentStep.id === 'variant') return !!checkoutData.variantId;
        if (currentStep.id === 'gift_card') return !!checkoutData.giftCode;
        if (currentStep.id === 'schedule') return !!(checkoutData.locationId && checkoutData.date && checkoutData.time);
        if (currentStep.id === 'recipient') return !!checkoutData.recipientComplete;
        if (currentStep.id === 'auth') return !!checkoutData.userId;
        if (currentStep.id === 'payment') return !!checkoutData.paymentReady;
        return true; // For unimplemented steps
    };

    const handleNext = () => {
        if (!canProceed()) return;

        if (currentStepIdx < steps.length - 1) {
            setCurrentStepIdx(prev => prev + 1);
        } else {
            // Finish flow -> simulate processing, then success, and redirect to /app
            setStatus('processing');
            setTimeout(() => {
                setStatus('success');
                setTimeout(() => {
                    navigate('/app');
                }, 2500);
            }, 1500);
        }
    };

    const handleBack = () => {
        if (currentStepIdx > 0) {
            setCurrentStepIdx(prev => prev - 1);
        } else {
            navigate('/services');
        }
    };

    if (status === 'processing') {
        return (
            <div className="min-h-screen bg-violet-600 flex flex-col items-center justify-center p-4">
                <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mb-6" />
                <h1 className="text-3xl font-bold text-white tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
                    Verificando...
                </h1>
                <p className="text-violet-200 mt-2 font-medium animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300 text-center">
                    Aguarde enquanto processamos seu pagamento.
                </p>
            </div>
        )
    }

    if (status === 'success') {
        return (
            <div className="min-h-screen bg-emerald-600 flex flex-col items-center justify-center p-4">
                <CheckCircle2 className="h-24 w-24 text-white mb-6 animate-in zoom-in duration-500" />
                <h1 className="text-3xl font-bold text-white tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
                    Compra Confirmada!
                </h1>
                <p className="text-emerald-100 mt-2 font-medium animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300 text-center max-w-sm">
                    Sua experiência no Void está garantida. Te redirecionando para o painel...
                </p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* Minimal Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10 px-4 py-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <button
                        onClick={handleBack}
                        className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        voltar
                    </button>
                    <div className="text-xl font-bold tracking-tighter text-slate-900">
                        void
                    </div>
                    <div className="w-[60px]"></div> {/* spacer for centering */}
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">

                    {/* Stepper Header */}
                    <div className="mb-12">
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight text-center mb-6">
                            {currentStep.label}
                        </h1>

                        {/* Progress Bar (Visual Stepper) */}
                        <div className="flex items-center justify-center gap-2 max-w-xl mx-auto">
                            {steps.map((step, idx) => {
                                const isPast = idx < currentStepIdx;
                                const isCurrent = idx === currentStepIdx;
                                return (
                                    <div key={step.id} className="flex items-center">
                                        <div className={`
                                            flex items-center justify-center rounded-full text-xs font-bold w-8 h-8 shrink-0 transition-colors
                                            ${isPast ? 'bg-slate-900 text-white' : ''}
                                            ${isCurrent ? 'bg-violet-600 text-white shadow-md shadow-violet-200' : ''}
                                            ${!isPast && !isCurrent ? 'bg-slate-200 text-slate-500' : ''}
                                        `}>
                                            {isPast ? <CheckCircle2 className="h-4 w-4" /> : (idx + 1)}
                                        </div>
                                        {idx < steps.length - 1 && (
                                            <div className={`h-[2px] w-8 sm:w-16 mx-2 transition-colors ${isPast ? 'bg-slate-900' : 'bg-slate-200'}`} />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Step Body */}
                    <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-sm min-h-[400px] flex flex-col justify-between">

                        <div className="flex-1 w-full flex flex-col items-center justify-center">
                            {currentStep.id === 'variant' && (
                                <VariantStep
                                    flowType={flowType}
                                    selectedId={checkoutData.variantId}
                                    onSelect={(id, price) => setCheckoutData(prev => ({ ...prev, variantId: id, price }))}
                                />
                            )}

                            {currentStep.id === 'gift_card' && (
                                <GiftCardStep
                                    onValidCode={(code, amount) => {
                                        setCheckoutData(prev => ({ ...prev, giftCode: code, price: amount }));
                                        // Auto advance on success validation
                                        setTimeout(() => {
                                            if (currentStepIdx < steps.length - 1) {
                                                setCurrentStepIdx(prev => prev + 1);
                                            }
                                        }, 800);
                                    }}
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

                            {currentStep.id === 'recipient' && (
                                <RecipientStep
                                    data={checkoutData.recipient}
                                    onSelect={(data, isComplete) => setCheckoutData(prev => ({ ...prev, recipient: data, recipientComplete: isComplete }))}
                                />
                            )}

                            {currentStep.id === 'auth' && (
                                <AuthStep
                                    isAuthenticated={!!checkoutData.userId}
                                    onAuthSuccess={(userId) => setCheckoutData(prev => ({ ...prev, userId }))}
                                />
                            )}

                            {currentStep.id === 'payment' && (
                                <PaymentStep
                                    totalPrice={checkoutData.price || 0}
                                    onPaymentReady={(isReady, method) => setCheckoutData(prev => ({ ...prev, paymentReady: isReady, paymentMethod: method }))}
                                />
                            )}

                            {/* Placeholders for unimplemented steps */}
                            {currentStep.id !== 'variant' && currentStep.id !== 'gift_card' && currentStep.id !== 'schedule' && currentStep.id !== 'auth' && currentStep.id !== 'payment' && currentStep.id !== 'recipient' && (
                                <div className="text-center space-y-4">
                                    <h2 className="text-2xl font-bold text-slate-300">
                                        Conteúdo do Passo: {currentStep.id}
                                    </h2>
                                    <p className="text-slate-500">
                                        Componente específico será injetado aqui.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Navigation Actions */}
                        <div className="pt-8 mt-8 border-t border-slate-100 flex items-center justify-between">
                            <div className="text-slate-500">
                                {/* Only show price if a variant is selected and we are past the variant step or on it */}
                                {checkoutData.price ? (
                                    <span>Total Previsto: <strong className="text-slate-900">R$ {checkoutData.price.toFixed(2)}</strong></span>
                                ) : (
                                    <span className="text-sm">Selecione para calcular</span>
                                )}
                            </div>
                            <Button
                                size="lg"
                                className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-10"
                                onClick={handleNext}
                                disabled={!canProceed()}
                            >
                                {currentStepIdx === steps.length - 1 ? 'Finalizar Compra' : 'Continuar'}
                            </Button>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
