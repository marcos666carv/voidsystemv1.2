import { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowLeft, Calendar, Clock, MapPin } from 'lucide-react';

import { ScheduleStep } from '@/pages/public/checkout/steps/ScheduleStep';

interface CreditType {
    id: number;
    name: string;
    count: number;
    icon: any;
    color: string;
    bg: string;
}

interface BookingModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    credit: CreditType | null;
}

const STEPS = [
    { id: 'schedule', label: 'Unidade e Agendamento' },
    { id: 'confirm', label: 'Confirmar Sessão' }
];

export function BookingModal({ isOpen, onOpenChange, credit }: BookingModalProps) {
    const [currentStepIdx, setCurrentStepIdx] = useState(0);
    const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');
    const [bookingData, setBookingData] = useState<{
        locationId?: string;
        date?: string;
        time?: string;
    }>({});

    // Reset state when modal is opened/closed
    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                setCurrentStepIdx(0);
                setStatus('idle');
                setBookingData({});
            }, 300); // Wait for modal exit animation
        }
    }, [isOpen]);

    if (!credit) return null;

    const currentStep = STEPS[currentStepIdx];

    const canProceed = () => {
        if (currentStep.id === 'schedule') return !!(bookingData.locationId && bookingData.date && bookingData.time);
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
                            Confirmando Agendamento...
                        </h2>
                    </div>
                )}

                {status === 'success' && (
                    <div className="flex flex-col items-center justify-center p-12 min-h-[400px] text-center w-full max-w-lg mx-auto">
                        <CheckCircle2 className="h-20 w-20 text-emerald-500 mb-6 animate-in zoom-in duration-500" />
                        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                            Sessão Agendada!
                        </h2>
                        <p className="text-slate-500 mt-2 font-medium">
                            Enviamos os detalhes para o seu e-mail e WhatsApp.
                        </p>

                        <div className="mt-8 bg-slate-100 rounded-2xl p-6 text-left w-full space-y-4">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-xl ${credit.bg} ${credit.color} flex items-center justify-center shrink-0`}>
                                    <credit.icon className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 font-semibold">Serviço</p>
                                    <p className="font-bold text-slate-900">{credit.name}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center shrink-0">
                                    <Calendar className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 font-semibold">Data e Hora</p>
                                    <p className="font-bold text-slate-900 flex items-center gap-2">
                                        {bookingData.date} às {bookingData.time}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <Button
                            className="mt-8 bg-slate-900 text-white hover:bg-slate-800 w-full"
                            onClick={() => onOpenChange(false)}
                        >
                            Ver no Painel
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
                            <DialogTitle className="text-2xl font-bold text-slate-900 text-center flex items-center justify-center gap-2">
                                <credit.icon className={`h-6 w-6 ${credit.color}`} />
                                Agendar {credit.name}
                            </DialogTitle>
                            <DialogDescription className="text-center text-slate-500 mt-2">
                                Você tem {credit.count} crédito{credit.count !== 1 ? 's' : ''} disponível. Selecione quando deseja utilizar.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="p-6 pt-8 min-h-[300px]">
                            {currentStep.id === 'schedule' && (
                                <ScheduleStep
                                    flowType={credit.name.toLowerCase().includes('massagem') ? 'massage' : 'float'}
                                    selectedLocationId={bookingData.locationId}
                                    selectedDate={bookingData.date}
                                    selectedTime={bookingData.time}
                                    onLocationSelect={(id) => setBookingData(prev => ({ ...prev, locationId: id }))}
                                    onScheduleSelect={(date, time) => setBookingData(prev => ({ ...prev, date, time }))}
                                />
                            )}

                            {currentStep.id === 'confirm' && (
                                <div className="w-full max-w-md mx-auto space-y-6">
                                    <div className="text-center mb-8">
                                        <div className="mx-auto w-16 h-16 bg-violet-100 text-violet-600 rounded-full flex items-center justify-center mb-4">
                                            <Calendar className="h-8 w-8" />
                                        </div>
                                        <p className="text-slate-500 text-lg">
                                            Revise os dados antes de confirmar seu agendamento.
                                        </p>
                                    </div>

                                    <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                                                <MapPin className="h-5 w-5 text-slate-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-500">Unidade</p>
                                                <p className="font-semibold text-slate-900">{bookingData.locationId === 'cwb1' ? 'Void Curitiba (Batel)' : bookingData.locationId}</p>
                                            </div>
                                        </div>

                                        <div className="h-px bg-slate-100 w-full" />

                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                                                <Clock className="h-5 w-5 text-slate-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-500">Data e Horário</p>
                                                <p className="font-semibold text-slate-900">{bookingData.date} às {bookingData.time}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl text-sm font-semibold text-center border border-emerald-100">
                                        1 Crédito de {credit.name} será utilizado.
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="p-6 border-t border-slate-200 bg-white flex items-center justify-end mt-auto sticky top-[100%] rounded-b-lg">
                            <Button
                                size="lg"
                                className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-10 w-full md:w-auto"
                                onClick={handleNext}
                                disabled={!canProceed()}
                            >
                                {currentStepIdx === STEPS.length - 1 ? 'Confirmar Agendamento' : 'Continuar'}
                            </Button>
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}
