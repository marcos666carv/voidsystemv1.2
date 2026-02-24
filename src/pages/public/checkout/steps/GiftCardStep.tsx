import { useState } from 'react';
import { Gift, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface GiftCardStepProps {
    onValidCode: (code: string, amount: number) => void;
}

export function GiftCardStep({ onValidCode }: GiftCardStepProps) {
    const [code, setCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState<{ code: string; service: string } | null>(null);

    const handleValidate = () => {
        if (!code.trim()) {
            setError('Por favor, informe o código do vale presente.');
            return;
        }

        setIsLoading(true);
        setError('');

        // Mock validation process
        setTimeout(() => {
            setIsLoading(false);
            const checkCode = code.trim().toUpperCase();
            if (checkCode === 'INVALIDO') {
                setError('Código inválido ou já utilizado.');
            } else {
                // Mock success
                const serviceWon = checkCode.includes('MAS') ? 'Massoterapia' : 'Flutuação de 60 minutos';
                setSuccess({ code: checkCode, service: serviceWon });
                onValidCode(checkCode, 0);
            }
        }, 1200);
    };

    if (success) {
        return (
            <div className="w-full max-w-md mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500">
                <div className="bg-gradient-to-b from-fuchsia-50 to-white border border-fuchsia-100 rounded-3xl p-8 text-center shadow-sm relative overflow-hidden">
                    {/* Decorative background elements */}
                    <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-fuchsia-100 rounded-full blur-3xl opacity-50"></div>
                    <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-32 h-32 bg-cyan-100 rounded-full blur-3xl opacity-50"></div>

                    <div className="relative">
                        <div className="flex justify-center mb-6">
                            <div className="relative">
                                <div className="absolute inset-0 bg-fuchsia-200 rounded-full blur animate-pulse" />
                                <div className="relative h-20 w-20 bg-white shadow-md rounded-full flex items-center justify-center border border-fuchsia-100">
                                    <Sparkles className="h-10 w-10 text-fuchsia-600" />
                                </div>
                                <div className="absolute -bottom-2 -right-2 h-8 w-8 bg-emerald-500 rounded-full border-4 border-white flex items-center justify-center">
                                    <CheckCircle2 className="h-4 w-4 text-white" />
                                </div>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-2">
                            Parabéns!
                        </h2>
                        <p className="text-slate-600 mb-6 leading-relaxed">
                            O código foi validado com sucesso. Você acaba de ganhar a seguinte experiência:
                        </p>

                        <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm mb-6 w-full text-left">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-fuchsia-100 rounded-lg flex items-center justify-center shrink-0">
                                    <Gift className="h-5 w-5 text-fuchsia-600" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-fuchsia-600 uppercase tracking-widest mb-0.5">Válido</p>
                                    <p className="font-bold text-slate-900">{success.service}</p>
                                </div>
                            </div>
                        </div>

                        <p className="text-sm text-slate-500 font-medium pb-2">
                            Clique em Continuar para agendar seu horário e criar seu acesso.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-md mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                    <div className="h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center">
                        <Gift className="h-8 w-8 text-slate-900" />
                    </div>
                </div>
                <p className="text-slate-500 text-lg">
                    Insira o código do seu vale presente para resgatar sua experiência.
                </p>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <label htmlFor="gift-code" className="text-sm font-medium text-slate-700">
                        Código do Vale Presente
                    </label>
                    <Input
                        id="gift-code"
                        placeholder="Ex: VOID-A1B2-C3D4"
                        value={code}
                        onChange={(e) => {
                            setCode(e.target.value);
                            setError('');
                        }}
                        className="text-center text-lg tracking-widest uppercase py-6"
                        maxLength={20}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleValidate();
                        }}
                    />
                    {error && (
                        <p className="text-sm text-red-500 text-center animate-in fade-in duration-300">
                            {error}
                        </p>
                    )}
                </div>

                <Button
                    onClick={handleValidate}
                    disabled={isLoading || !code.trim()}
                    className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl transition-all"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Validando...
                        </>
                    ) : (
                        'Validar Código'
                    )}
                </Button>
            </div>

            <div className="text-center mt-6">
                <p className="text-xs text-slate-400">
                    O valor do vale presente cobrirá integralmente as opções de agendamento disponíveis para resgate.
                </p>
            </div>
        </div>
    );
}
