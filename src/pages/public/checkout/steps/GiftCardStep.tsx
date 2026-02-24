import { useState } from 'react';
import { Gift, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface GiftCardStepProps {
    onValidCode: (code: string, amount: number) => void;
}

export function GiftCardStep({ onValidCode }: GiftCardStepProps) {
    const [code, setCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

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
            if (code.trim().toUpperCase() === 'INVALIDO') {
                setError('Código inválido ou já utilizado.');
            } else {
                // Mock success: any code other than 'INVALIDO' works, giving a fixed mock value
                onValidCode(code.trim().toUpperCase(), 0); // Price is 0 since the gift card covers it, or could be the gift card value. Let's send 0 to make checkout total 0.
            }
        }, 1200);
    };

    return (
        <div className="w-full max-w-md mx-auto space-y-8">
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
