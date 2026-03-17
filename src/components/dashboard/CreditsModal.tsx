import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowLeft, Waves, Hand, Sparkles } from 'lucide-react';
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
    { id: 'combo', label: 'Combos', description: 'Float + Massagem.', Icon: Sparkles },
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

interface CreditsModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CreditsModal({ isOpen, onOpenChange }: CreditsModalProps) {
    const { user } = useAuth();
    const [currentStepIdx, setCurrentStepIdx] = useState(0);
    const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');
    const [flowType, setFlowType] = useState<FlowType>('float');
    const [checkoutData, setCheckoutData] = useState<{
        variantId?: string;
        price?: number;
        locationId?: string;
        date?: string;
        time?: string;
        paymentReady?: boolean;
        paymentMethod?: string;
    }>({});

    useEffect(() => {
        if (!isOpen) {
            const t = setTimeout(() => {
                setCurrentStepIdx(0);
                setStatus('idle');
                setErrorMsg('');
                setCheckoutData({});
                setFlowType('float');
            }, 300);
            return () => clearTimeout(t);
        }
    }, [isOpen]);

    const currentStep = STEPS[currentStepIdx];

    const canProceed = () => {
        if (currentStep.id === 'category') return true; // botão de categoria já avança
        if (currentStep.id === 'variant') return !!checkoutData.variantId;
        if (currentStep.id === 'schedule') return !!(checkoutData.locationId && checkoutData.date && checkoutData.time);
        if (currentStep.id === 'payment') return !!checkoutData.paymentReady;
        return true;
    };

    const handleSelectCategory = (type: FlowType) => {
        setFlowType(type);
        setCurrentStepIdx(1);
    };

    const handleNext = async () => {
        if (!canProceed()) return;

        if (currentStepIdx < STEPS.length - 1) {
            setCurrentStepIdx(prev => prev + 1);
            return;
        }

        // Finalizar compra
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

    const handleBack = () => {
        if (currentStepIdx > 0) setCurrentStepIdx(prev => prev - 1);
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            if (status !== 'processing') onOpenChange(open);
        }}>
            <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto w-11/12 p-0 gap-0 bg-slate-50 border-slate-200">

                {/* Processing */}
                {status === 'processing' && (
                    <div className="flex flex-col items-center justify-center p-12 min-h-[420px]">
                        <div className="w-16 h-16 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin mb-6" />
                        <h2 className="text-2xl font-bold text-slate-900">Verificando...</h2>
                        <p className="text-slate-500 mt-2 text-center">Aguarde enquanto processamos.</p>
                    </div>
                )}

                {/* Success */}
                {status === 'success' && (
                    <div className="flex flex-col items-center justify-center p-12 min-h-[420px] text-center">
                        <CheckCircle2 className="h-20 w-20 text-emerald-500 mb-6 animate-in zoom-in duration-500" />
                        <h2 className="text-2xl font-bold text-slate-900">Compra Confirmada!</h2>
                        <p className="text-slate-500 mt-2 max-w-sm">
                            Sua sessão está agendada. Nos vemos em breve no Void.
                        </p>
                        <Button
                            className="mt-8 bg-slate-900 text-white hover:bg-slate-800 rounded-xl px-8"
                            onClick={() => onOpenChange(false)}
                        >
                            Fechar
                        </Button>
                    </div>
                )}

                {/* Flow */}
                {(status === 'idle' || status === 'error') && (
                    <>
                        {/* Header */}
                        <div className="p-6 pb-0">
                            <div className="flex justify-between items-center mb-4">
                                {currentStepIdx > 0 ? (
                                    <button
                                        onClick={handleBack}
                                        className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
                                    >
                                        <ArrowLeft className="h-4 w-4" />
                                        voltar
                                    </button>
                                ) : <div />}
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                    {currentStepIdx > 0 ? `Passo ${currentStepIdx} de ${STEPS.length - 1}` : 'comprar créditos'}
                                </span>
                            </div>
                            <DialogTitle className="text-2xl font-bold text-slate-900 text-center">
                                {currentStep.label}
                            </DialogTitle>
                            <DialogDescription className="sr-only">
                                Fluxo de compra de créditos — passo {currentStepIdx + 1}
                            </DialogDescription>
                        </div>

                        {/* Body */}
                        <div className="p-6 pt-8 min-h-[320px] flex items-start justify-center w-full">
                            {currentStep.id === 'category' && (
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                                    {CATEGORIES.map(({ id, label, description, Icon }) => (
                                        <button
                                            key={id}
                                            onClick={() => handleSelectCategory(id)}
                                            className="flex flex-col gap-4 p-6 bg-white border-2 border-slate-200 rounded-2xl hover:border-violet-400 hover:shadow-md transition-all text-left group"
                                        >
                                            <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-violet-50 group-hover:border-violet-100 transition-colors">
                                                <Icon className="h-5 w-5 text-slate-600 group-hover:text-violet-600 transition-colors" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900">{label}</p>
                                                <p className="text-sm text-slate-500 mt-0.5">{description}</p>
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

                        {/* Footer */}
                        {currentStep.id !== 'category' && (
                            <div className="p-6 border-t border-slate-200 bg-white flex items-center justify-between sticky top-[100%] rounded-b-lg">
                                <div className="text-slate-500 text-sm">
                                    {checkoutData.price
                                        ? <span>Total: <strong className="text-slate-900">R$ {checkoutData.price.toFixed(2)}</strong></span>
                                        : <span>Selecione para calcular</span>
                                    }
                                </div>
                                {status === 'error' && errorMsg && (
                                    <span className="text-sm text-red-600 mx-4">{errorMsg}</span>
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
                        )}
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}
