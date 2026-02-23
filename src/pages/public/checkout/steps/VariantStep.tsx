import { useMemo } from 'react';
import { Check } from 'lucide-react';
import { MOCK_SERVICES, MOCK_PACKAGES } from '@/lib/mockData';

interface VariantStepProps {
    flowType: string;
    selectedId?: string;
    onSelect: (id: string, price: number) => void;
}

export function VariantStep({ flowType, selectedId, onSelect }: VariantStepProps) {
    // Determine target category based on flowType
    const targetCategory = useMemo(() => {
        if (flowType === 'float') return 'flutuacao';
        if (flowType === 'massage') return 'massoterapia';
        return flowType; // combo, gift_card
    }, [flowType]);

    // Build options dynamically from central mock
    const options = useMemo(() => {
        const results: any[] = [];

        if (targetCategory === 'gift') {
            return [
                { id: 'g_f60', label: 'Flutuação 60 min', description: 'Sessão individual de 60m.', price: 189, duration: '-' },
                { id: 'g_combo', label: 'Combo Mágico', description: 'Flutuação + Massagem 60m.', price: 329, duration: '-' }
            ];
        }

        const baseServices = MOCK_SERVICES.filter(s => s.category === targetCategory && s.active);

        for (const svc of baseServices) {
            // Include the single 1-session option (from MOCK_PACKAGES or fallback to service price)
            const singlePkg = MOCK_PACKAGES.find(p => p.serviceId === svc.id && p.sessionCount === 1);
            if (singlePkg) {
                results.push({
                    id: singlePkg.id,
                    label: svc.name,
                    description: svc.description,
                    price: singlePkg.totalPrice,
                    duration: `${svc.duration}m`,
                    tag: undefined,
                });
            } else {
                results.push({
                    id: svc.id,
                    label: svc.name,
                    description: svc.description,
                    price: svc.price,
                    duration: `${svc.duration}m`,
                    tag: undefined,
                });
            }

            // Include packages > 1
            const multiPkgs = MOCK_PACKAGES.filter(p => p.serviceId === svc.id && p.sessionCount > 1);
            for (const pkg of multiPkgs) {
                results.push({
                    id: pkg.id,
                    label: `${svc.name} - ${pkg.sessionCount} Sessões`,
                    description: `Pacote de ${pkg.sessionCount} sessões de ${svc.duration}m.`,
                    price: pkg.totalPrice,
                    duration: `${svc.duration}m x${pkg.sessionCount}`,
                    tag: pkg.savingsPercent > 0 ? `${pkg.savingsPercent}% OFF` : undefined,
                });
            }
        }

        return results;
    }, [targetCategory]);

    if (options.length === 0) {
        return <div className="text-center text-slate-500 py-10">Opções não encontradas para este tipo.</div>;
    }

    return (
        <div className="w-full max-w-xl mx-auto space-y-6">
            <div className="text-center mb-8">
                <p className="text-slate-500 text-lg">
                    Escolha a duração e experiência ideal para você hoje.
                </p>
            </div>

            <div className="space-y-4">
                {options.map((opt) => {
                    const isSelected = selectedId === opt.id;
                    return (
                        <button
                            key={opt.id}
                            onClick={() => onSelect(opt.id, opt.price)}
                            className={`
                                relative w-full text-left p-5 rounded-2xl border-2 transition-all flex items-center justify-between
                                ${isSelected
                                    ? 'border-violet-600 bg-violet-50/10 shadow-md shadow-violet-100'
                                    : 'border-slate-200 bg-white hover:border-violet-300 hover:bg-slate-50 shadow-sm'
                                }
                            `}
                        >
                            {/* Tags Section */}
                            {opt.tag && (
                                <span className="absolute top-3 right-3 bg-violet-600 text-[10px] font-bold uppercase tracking-wider text-white px-3 py-1 rounded-full shadow-sm">
                                    {opt.tag}
                                </span>
                            )}

                            <div className="flex-1 pr-6 flex items-start gap-4">
                                {/* Radio/Check indicator */}
                                <div className={`mt-1 h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0
                                    ${isSelected ? 'border-violet-600 bg-violet-600 text-white' : 'border-slate-300'}`}>
                                    {isSelected && <Check className="h-3 w-3" />}
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-slate-900">{opt.label}</h3>
                                    <p className="text-sm text-slate-500 mt-1">{opt.description}</p>
                                    {opt.duration !== '-' && (
                                        <div className="mt-3 text-xs font-semibold text-slate-400 uppercase tracking-wider bg-slate-100 px-2 py-1 rounded w-fit">
                                            {opt.duration}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="text-right pl-4 border-l border-slate-100">
                                <span className="text-sm text-slate-400">R$</span>
                                <span className="text-2xl font-bold text-slate-900 ml-1">{opt.price}</span>
                            </div>
                        </button>
                    )
                })}
            </div>
        </div>
    );
}
