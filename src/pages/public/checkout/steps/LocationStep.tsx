import { MapPin } from 'lucide-react';

const LOCATIONS = [
    {
        id: 'cwb',
        name: 'Curitiba',
        address: 'R. Fernando Simas, 395 · Bigorrilho',
        mapPreview: 'bg-slate-100' // Mock for a subtle map background or image
    },
    {
        id: 'cl',
        name: 'Campo Largo',
        address: 'R. Oswaldo Cruz, 123 · Centro',
        mapPreview: 'bg-slate-100'
    }
];

interface LocationStepProps {
    selectedId?: string;
    onSelect: (id: string) => void;
}

export function LocationStep({ selectedId, onSelect }: LocationStepProps) {
    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            <div className="text-center mb-10">
                <p className="text-slate-500 text-lg">
                    Selecione a unidade mais próxima de você.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-slate-100 p-2 rounded-3xl bg-slate-50/50">
                {LOCATIONS.map((loc) => {
                    const isSelected = selectedId === loc.id;
                    return (
                        <button
                            key={loc.id}
                            onClick={() => onSelect(loc.id)}
                            className={`
                                relative text-left p-6 rounded-2xl border-2 transition-all overflow-hidden
                                ${isSelected
                                    ? 'border-violet-600 bg-white shadow-md shadow-violet-100'
                                    : 'border-transparent bg-white hover:bg-slate-50 hover:border-slate-200 shadow-sm'
                                }
                            `}
                        >
                            {/* Selected Indicator */}
                            {isSelected && (
                                <div className="absolute top-4 right-4 h-3 w-3 rounded-full bg-violet-600" />
                            )}

                            <div className="flex items-start gap-4 mb-6">
                                <div className={`p-3 rounded-xl ${isSelected ? 'bg-violet-100 text-violet-600' : 'bg-slate-100 text-slate-500'}`}>
                                    <MapPin className="h-6 w-6" />
                                </div>
                                <div className="pr-4">
                                    <h3 className="text-lg font-bold text-slate-900">{loc.name}</h3>
                                    <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                                        {loc.address}
                                    </p>
                                </div>
                            </div>

                            {/* Map Mock/Placeholder */}
                            <div className={`w-full h-24 rounded-xl ${loc.mapPreview} flex items-center justify-center opacity-70`}>
                                <span className="text-xs font-medium text-slate-400">Ver no Mapa</span>
                            </div>
                        </button>
                    )
                })}
            </div>
        </div>
    );
}
