import { useState, useEffect } from 'react';
import { CreditCard, QrCode, Tag, CheckCircle2 } from 'lucide-react';
import { Input } from '@/components/ui/input';

type PaymentMethod = 'credit_card' | 'pix' | 'coupon';

interface PaymentStepProps {
    totalPrice: number;
    onPaymentReady: (isReady: boolean, method: PaymentMethod) => void;
}

export function PaymentStep({ totalPrice, onPaymentReady }: PaymentStepProps) {
    const [method, setMethod] = useState<PaymentMethod | null>(null);

    // Form states
    const [ccName, setCcName] = useState('');
    const [ccNumber, setCcNumber] = useState('');
    const [ccExpiry, setCcExpiry] = useState('');
    const [ccCvv, setCcCvv] = useState('');
    const [coupon, setCoupon] = useState('');

    // Validation
    useEffect(() => {
        let isReady = false;
        if (method === 'pix') {
            isReady = true; // PIX is just showing QR code
        } else if (method === 'credit_card') {
            isReady = ccName.length > 3 && ccNumber.length >= 15 && ccExpiry.length >= 4 && ccCvv.length >= 3;
        } else if (method === 'coupon') {
            isReady = coupon.length > 3;
        }

        if (method) {
            onPaymentReady(isReady, method);
        } else {
            onPaymentReady(false, 'credit_card');
        }
    }, [method, ccName, ccNumber, ccExpiry, ccCvv, coupon, onPaymentReady]);

    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

    return (
        <div className="w-full max-w-xl mx-auto space-y-8">
            <div className="text-center mb-8">
                <p className="text-slate-500 text-lg">
                    Escolha sua forma de pagamento.
                </p>
                <div className="mt-4 text-3xl font-black text-slate-900 tracking-tight">
                    {formatCurrency(totalPrice)}
                </div>
            </div>

            {/* Methods */}
            <div className="grid grid-cols-3 gap-3">
                <button
                    onClick={() => setMethod('credit_card')}
                    className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all gap-2
                        ${method === 'credit_card' ? 'border-violet-600 bg-violet-50 text-violet-700' : 'border-slate-200 bg-white text-slate-500 hover:border-violet-300'}`}
                >
                    <CreditCard className="h-6 w-6" />
                    <span className="text-xs font-bold uppercase tracking-wider">Cartão</span>
                </button>
                <button
                    onClick={() => setMethod('pix')}
                    className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all gap-2
                        ${method === 'pix' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-200 bg-white text-slate-500 hover:border-emerald-300'}`}
                >
                    <QrCode className="h-6 w-6" />
                    <span className="text-xs font-bold uppercase tracking-wider">PIX</span>
                </button>
                <button
                    onClick={() => setMethod('coupon')}
                    className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all gap-2
                        ${method === 'coupon' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 bg-white text-slate-500 hover:border-blue-300'}`}
                >
                    <Tag className="h-6 w-6" />
                    <span className="text-xs font-bold uppercase tracking-wider text-center leading-tight">Gift Card</span>
                </button>
            </div>

            {/* Form Area */}
            <div className="min-h-[220px]">
                {method === 'credit_card' && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <Input
                            placeholder="Nome Impresso no Cartão"
                            className="h-12 rounded-xl bg-slate-50 border-slate-200"
                            value={ccName}
                            onChange={(e) => setCcName(e.target.value)}
                        />
                        <Input
                            placeholder="0000 0000 0000 0000"
                            className="h-12 rounded-xl bg-slate-50 border-slate-200 font-mono text-lg tracking-widest"
                            maxLength={19}
                            value={ccNumber}
                            onChange={(e) => setCcNumber(e.target.value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 '))}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                placeholder="MM/AA"
                                className="h-12 rounded-xl bg-slate-50 border-slate-200 text-center"
                                maxLength={5}
                                value={ccExpiry}
                                onChange={(e) => setCcExpiry(e.target.value.replace(/\D/g, '').replace(/(\d{2})(?=\d)/, '$1/'))}
                            />
                            <Input
                                placeholder="CVV"
                                className="h-12 rounded-xl bg-slate-50 border-slate-200 text-center"
                                maxLength={4}
                                type="password"
                                value={ccCvv}
                                onChange={(e) => setCcCvv(e.target.value.replace(/\D/g, ''))}
                            />
                        </div>
                    </div>
                )}

                {method === 'pix' && (
                    <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border border-slate-200 border-dashed animate-in fade-in zoom-in duration-300">
                        <div className="w-40 h-40 bg-white border border-slate-200 rounded-xl flex items-center justify-center mb-4">
                            <QrCode className="h-16 w-16 text-emerald-600 opacity-20" />
                        </div>
                        <p className="text-sm text-slate-500 mb-2">
                            Abra o app do seu banco e escaneie o código.
                        </p>
                        <div className="px-4 py-2 bg-white rounded-lg border border-slate-200 text-xs font-mono text-slate-400 select-all cursor-pointer hover:bg-slate-100">
                            00020126420014BR.GOV.BCB.PIX...
                        </div>
                    </div>
                )}

                {method === 'coupon' && (
                    <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-200 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <p className="text-sm text-slate-600 mb-2 text-center">
                            Se você possui um vale-presente ou pacote, digite o código abaixo.
                        </p>
                        <div className="relative">
                            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                            <Input
                                placeholder="VOIDX-0000"
                                className="pl-10 h-12 rounded-xl bg-white border-slate-200 uppercase font-mono tracking-widest text-center"
                                value={coupon}
                                onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                            />
                        </div>
                    </div>
                )}
            </div>

            {(ccName && ccNumber && ccExpiry && ccCvv && method === 'credit_card') && (
                <div className="flex items-center justify-center text-emerald-600 gap-2 animate-in fade-in">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="text-sm font-bold">Cartão Validado</span>
                </div>
            )}
        </div>
    );
}
