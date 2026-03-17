import { useMemo } from 'react';
import { Check } from 'lucide-react';
import { MOCK_SERVICES, MOCK_PACKAGES } from '@/lib/mockData';

const formatPackageLabel = (name: string, count: number) => {
    if (count === 1) return `1 ${name}`;

    let pluralName = name;
    if (name.toLowerCase().includes('flutuação')) {
        pluralName = name.replace(/ção$/i, 'ções');
    } else if (name.toLowerCase().includes('massoterapia')) {
        pluralName = name + 's';
    } else if (name.toLowerCase().includes('massagem')) {
        pluralName = name.replace(/em$/i, 'ens');
    } else {
        pluralName = name + 's';
    }

    return `${count} ${pluralName}`;
};

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
                { id: 'g_f60', label: 'Flutuação 60 minutos', description: 'Sessão individual de 60 minutos.', price: 189, duration: '-' },
                { id: 'g_combo', label: 'Combo Mágico', description: 'Flutuação + Massagem 60 minutos.', price: 329, duration: '-' }
            ];
        }

        const baseServices = MOCK_SERVICES.filter(s => s.category === targetCategory && s.active);

        for (const svc of baseServices) {
            // Include the single 1-session option (from MOCK_PACKAGES or fallback to service price)
            const singlePkg = MOCK_PACKAGES.find(p => p.serviceId === svc.id && p.sessionCount === 1);
            if (singlePkg) {
                results.push({
                    id: singlePkg.id,
                    label: formatPackageLabel(svc.name, 1),
                    description: svc.description,
                    price: singlePkg.totalPrice,
                    duration: `${svc.duration} minutos`,
                    tag: undefined,
                });
            } else {
                results.push({
                    id: svc.id,
                    label: formatPackageLabel(svc.name, 1),
                    description: svc.description,
                    price: svc.price,
                    duration: `${svc.duration} minutos`,
                    tag: undefined,
                });
            }

            // Include packages > 1
            const multiPkgs = MOCK_PACKAGES.filter(p => p.serviceId === svc.id && p.sessionCount > 1);
            for (const pkg of multiPkgs) {
                results.push({
                    id: pkg.id,
                    label: formatPackageLabel(svc.name, pkg.sessionCount),
                    description: `Pacote de ${pkg.sessionCount} sessões de ${svc.duration} minutos.`,
                    price: pkg.totalPrice,
                    duration: `${svc.duration} min x${pkg.sessionCount}`,
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
        <div className="w-full space-y-6">
            <div className="text-center mb-8">
                <p className="text-slate-500 text-lg">
                    Escolha a duração e experiência ideal para você hoje.
                </p>
            </div>

            <div className={`grid gap-4 ${flowType === 'gift' ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'}`}>
                {options.map((opt) => {
                    const isSelected = selectedId === opt.id;
                    return (
                        <button
                            key={opt.id}
                            onClick={() => onSelect(opt.id, opt.price)}
                            className={`
                                relative w-full text-left p-5 rounded-2xl border-2 transition-all flex flex-col justify-between
                                ${isSelected
                                    ? 'border-violet-600 bg-violet-50/10 shadow-md shadow-violet-100'
                                    : 'border-slate-200 bg-white hover:border-violet-300 hover:bg-slate-50 shadow-sm'
                                }
                            `}
                        >
                            <div className="flex items-start gap-3 mb-4">
                                {/* Radio/Check indicator */}
                                <div className={`mt-1 h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0
                                    ${isSelected ? 'border-violet-600 bg-violet-600 text-white' : 'border-slate-300'}`}>
                                    {isSelected && <Check className="h-3 w-3" />}
                                </div>

                                <div className="flex-1 min-w-0 pr-2">
                                    <div className="flex items-center justify-between gap-2 mb-1.5 w-full">
                                        <h3 className="text-base font-bold text-slate-900 leading-tight truncate">{opt.label}</h3>
                                        {/* Tags Section */}
                                        {opt.tag && (
                                            <span className="bg-violet-600 text-[10px] font-bold uppercase tracking-wider text-white px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap shrink-0">
                                                {opt.tag}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-slate-500 leading-relaxed">{opt.description}</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                                {opt.duration !== '-' && (
                                    <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded">
                                        {opt.duration}
                                    </span>
                                )}
                                {opt.duration === '-' && <span />}
                                <div className="text-right">
                                    <span className="text-sm text-slate-400">R$</span>
                                    <span className="text-2xl font-bold text-slate-900 ml-1">{opt.price}</span>
                                </div>
                            </div>
                        </button>
                    )
                })}
            </div>
        </div>
    );
}