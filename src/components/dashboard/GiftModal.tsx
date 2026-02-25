import { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowLeft } from 'lucide-react';

import { VariantStep } from '@/pages/public/checkout/steps/VariantStep';
import { RecipientStep } from '@/pages/public/checkout/steps/RecipientStep';
import { PaymentStep } from '@/pages/public/checkout/steps/PaymentStep';

interface GiftModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

const STEPS = [
    { id: 'variant', label: 'Qual Presente?' },
    { id: 'recipient', label: 'Para Quem?' },
    { id: 'payment', label: 'Pagamento' }
];

export function GiftModal({ isOpen, onOpenChange }: GiftModalProps) {
    const [currentStepIdx, setCurrentStepIdx] = useState(0);
    const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');
    const [checkoutData, setCheckoutData] = useState<{
        variantId?: string;
        price?: number;
        paymentReady?: boolean;
        paymentMethod?: string;
        recipient?: {
            senderName: string;
            recipientName: string;
            recipientEmail: string;
            message: string;
        };
        recipientComplete?: boolean;
    }>({});

    // Reset state when modal is opened/closed
    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                setCurrentStepIdx(0);
                setStatus('idle');
                setCheckoutData({});
            }, 300); // Wait for modal exit animation
        }
    }, [isOpen]);

    const currentStep = STEPS[currentStepIdx];

    const canProceed = () => {
        if (currentStep.id === 'variant') return !!checkoutData.variantId;
        if (currentStep.id === 'recipient') return !!checkoutData.recipientComplete;
        if (currentStep.id === 'payment') return !!checkoutData.paymentReady;
        return true;
    };

    const handleNext = () => {
        if (!canProceed()) return;

        if (currentStepIdx < STEPS.length - 1) {
            setCurrentStepIdx(prev => prev + 1);
        } else {
            setStatus('processing');
            setTimeout(() => {
                setStatus('success');
            }, 1500);
        }
    };

    const handleBack = () => {
        if (currentStepIdx > 0) {
            setCurrentStepIdx(prev => prev - 1);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            if (status !== 'processing') onOpenChange(open);
        }}>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto w-11/12 p-0 gap-0 bg-slate-50 border-slate-200">

                {status === 'processing' && (
                    <div className="flex flex-col items-center justify-center p-12 min-h-[400px]">
                        <div className="w-16 h-16 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin mb-6" />
                        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                            Verificando...
                        </h2>
                        <p className="text-slate-500 mt-2 font-medium text-center">
                            Aguarde enquanto processamos seu pagamento.
                        </p>
                    </div>
                )}

                {status === 'success' && (
                    <div className="flex flex-col items-center justify-center p-12 min-h-[400px] text-center">
                        <CheckCircle2 className="h-20 w-20 text-emerald-500 mb-6 animate-in zoom-in duration-500" />
                        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                            Presente Comprado com Sucesso!
                        </h2>
                        <p className="text-slate-500 mt-2 font-medium max-w-sm">
                            Um email foi enviado para o destinatário com os detalhes do presente e o código de resgate.
                        </p>
                        <Button
                            className="mt-8 bg-slate-900 text-white hover:bg-slate-800"
                            onClick={() => onOpenChange(false)}
                        >
                            Fechar
                        </Button>
                    </div>
                )}

                {status === 'idle' && (
                    <>
                        <DialogHeader className="p-6 pb-0">
                            <div className="flex justify-between items-center mb-4">
                                {currentStepIdx > 0 ? (
                                    <button
                                        onClick={handleBack}
                                        className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
                                    >
                                        <ArrowLeft className="h-4 w-4" />
                                        voltar
                                    </button>
                                ) : (
                                    <div />
                                )}
                                <div className="text-sm font-bold text-slate-400">
                                    PASSO {currentStepIdx + 1} DE {STEPS.length}
                                </div>
                            </div>
                            <DialogTitle className="text-2xl font-bold text-slate-900 text-center">
                                {currentStep.label}
                            </DialogTitle>
                            <DialogDescription className="sr-only">
                                Comprar vale presente passo a passo
                            </DialogDescription>
                        </DialogHeader>

                        <div className="p-6 pt-8 min-h-[300px]">
                            {currentStep.id === 'variant' && (
                                <VariantStep
                                    flowType="gift"
                                    selectedId={checkoutData.variantId}
                                    onSelect={(id, price) => setCheckoutData(prev => ({ ...prev, variantId: id, price }))}
                                />
                            )}

                            {currentStep.id === 'recipient' && (
                                <RecipientStep
                                    data={checkoutData.recipient}
                                    onSelect={(data, isComplete) => setCheckoutData(prev => ({ ...prev, recipient: data, recipientComplete: isComplete }))}
                                />
                            )}

                            {currentStep.id === 'payment' && (
                                <PaymentStep
                                    totalPrice={checkoutData.price || 0}
                                    onPaymentReady={(isReady, method) => setCheckoutData(prev => ({ ...prev, paymentReady: isReady, paymentMethod: method }))}
                                />
                            )}
                        </div>

                        <div className="p-6 border-t border-slate-200 bg-white flex items-center justify-between mt-auto sticky top-[100%] rounded-b-lg">
                            <div className="text-slate-500">
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
                                {currentStepIdx === STEPS.length - 1 ? 'Finalizar Compra' : 'Continuar'}
                            </Button>
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}
