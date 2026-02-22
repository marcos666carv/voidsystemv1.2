import { useState, useEffect } from 'react';
import { Gift, User, Mail, MessageSquare } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface RecipientData {
    senderName: string;
    recipientName: string;
    recipientEmail: string;
    message: string;
}

interface RecipientStepProps {
    data?: RecipientData;
    onSelect: (data: RecipientData, isComplete: boolean) => void;
}

export function RecipientStep({ data, onSelect }: RecipientStepProps) {
    const [formData, setFormData] = useState<RecipientData>({
        senderName: data?.senderName || '',
        recipientName: data?.recipientName || '',
        recipientEmail: data?.recipientEmail || '',
        message: data?.message || ''
    });

    useEffect(() => {
        const isComplete =
            formData.senderName.trim().length > 1 &&
            formData.recipientName.trim().length > 1 &&
            formData.recipientEmail.includes('@') &&
            formData.recipientEmail.includes('.');

        onSelect(formData, isComplete);
    }, [formData, onSelect]);

    const handleInput = (field: keyof RecipientData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="w-full max-w-xl mx-auto space-y-8">
            <div className="text-center mb-8">
                <div className="mx-auto w-16 h-16 bg-violet-100 text-violet-600 rounded-full flex items-center justify-center mb-4">
                    <Gift className="h-8 w-8" />
                </div>
                <p className="text-slate-500 text-lg">
                    Personalize o seu Vale Presente.
                </p>
            </div>

            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">De (Seu Nome)</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-slate-400" />
                            </div>
                            <Input
                                placeholder="Seu nome"
                                className="pl-10 h-12 rounded-xl bg-slate-50 border-slate-200"
                                value={formData.senderName}
                                onChange={(e) => handleInput('senderName', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Para (Nome do Presenteado)</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-slate-400" />
                            </div>
                            <Input
                                placeholder="Nome de quem vai receber"
                                className="pl-10 h-12 rounded-xl bg-slate-50 border-slate-200"
                                value={formData.recipientName}
                                onChange={(e) => handleInput('recipientName', e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">E-mail do Presenteado</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-slate-400" />
                        </div>
                        <Input
                            type="email"
                            placeholder="email@exemplo.com"
                            className="pl-10 h-12 rounded-xl bg-slate-50 border-slate-200"
                            value={formData.recipientEmail}
                            onChange={(e) => handleInput('recipientEmail', e.target.value)}
                        />
                    </div>
                    <p className="text-xs text-slate-400 mt-1 pl-1">
                        O Vale Presente será enviado para este e-mail.
                    </p>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Mensagem (Opcional)</label>
                    <div className="relative">
                        <div className="absolute top-3 left-3 pointer-events-none">
                            <MessageSquare className="h-5 w-5 text-slate-400" />
                        </div>
                        <Textarea
                            placeholder="Escreva uma mensagem especial..."
                            className="pl-10 min-h-[100px] rounded-xl bg-slate-50 border-slate-200 resize-y"
                            value={formData.message}
                            onChange={(e) => handleInput('message', e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Preview Card */}
            {formData.senderName && formData.recipientName && (
                <div className="mt-8 p-6 bg-gradient-to-br from-violet-600 to-indigo-700 rounded-3xl text-white shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10" />
                    <div className="relative z-10 space-y-4">
                        <div className="flex items-center justify-between">
                            <Gift className="h-8 w-8 text-violet-200" />
                            <span className="text-sm font-bold tracking-widest uppercase text-violet-200">Vale Presente Void</span>
                        </div>
                        <div>
                            <p className="text-violet-200 text-sm">Para:</p>
                            <p className="text-2xl font-black">{formData.recipientName}</p>
                        </div>
                        <div>
                            <p className="text-violet-200 text-sm">De:</p>
                            <p className="text-lg font-bold">{formData.senderName}</p>
                        </div>
                        {formData.message && (
                            <div className="pt-4 mt-4 border-t border-white/20">
                                <p className="text-sm italic text-violet-100">"{formData.message}"</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
