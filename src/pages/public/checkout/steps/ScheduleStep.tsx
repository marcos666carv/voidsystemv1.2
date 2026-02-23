import { useState } from 'react';
import { Clock, CheckCircle2, MapPin } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

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

const MOCK_TIMES = [
    '09:00', '10:30', '14:00', '15:30', '18:00', '19:30'
];

interface ScheduleStepProps {
    flowType: string;
    selectedLocationId?: string;
    selectedDate?: string;
    selectedTime?: string;
    onLocationSelect: (id: string) => void;
    onScheduleSelect: (date: string, time: string) => void;
}

export function ScheduleStep({ flowType, selectedLocationId, selectedDate, selectedTime, onLocationSelect, onScheduleSelect }: ScheduleStepProps) {
    const [tempDate, setTempDate] = useState<Date | undefined>(
        selectedDate ? new Date(`${selectedDate}T12:00:00`) : new Date()
    );
    const [tempTime, setTempTime] = useState<string | undefined>(selectedTime);

    const handleDateSelect = (d: Date | undefined) => {
        if (!d) return;
        setTempDate(d);
        setTempTime(undefined); // Reset time when date changes
    };

    const handleTimeSelect = (t: string) => {
        if (!tempDate) return;
        setTempTime(t);
        onScheduleSelect(format(tempDate, 'yyyy-MM-dd'), t); // Commit selection
    };

    return (
        <div className="w-full max-w-2xl mx-auto space-y-8">
            <div className="text-center mb-8">
                {flowType === 'combo' ? (
                    <p className="text-slate-500 text-lg">
                        Escolha a unidade e quando deseja realizar a sua primeira sessão do combo.
                    </p>
                ) : (
                    <p className="text-slate-500 text-lg">
                        Escolha a unidade, data e o horário para a sua sessão.
                    </p>
                )}
            </div>

            <div className="space-y-10">
                {/* Location Selection */}
                <div>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                        Unidade
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-slate-100 p-2 rounded-3xl bg-slate-50/50">
                        {LOCATIONS.map((loc) => {
                            const isSelected = selectedLocationId === loc.id;
                            return (
                                <button
                                    key={loc.id}
                                    onClick={() => onLocationSelect(loc.id)}
                                    className={`
                                        relative text-left p-6 rounded-2xl border-2 transition-all
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

                                    <div className="flex items-start gap-4">
                                        <div className={`p-3 rounded-xl shrink-0 ${isSelected ? 'bg-violet-100 text-violet-600' : 'bg-slate-100 text-slate-500'}`}>
                                            <MapPin className="h-6 w-6" />
                                        </div>
                                        <div className="pr-4">
                                            <h3 className="text-lg font-bold text-slate-900">{loc.name}</h3>
                                            <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                                                {loc.address}
                                            </p>
                                        </div>
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Date and Time Selection grid wrapper */}
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Date Selection */}
                    <div className="flex-1 md:max-w-xs mx-auto w-full">
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                            Data
                        </h3>
                        <div className="flex justify-center md:justify-start">
                            <Calendar
                                mode="single"
                                selected={tempDate}
                                onSelect={handleDateSelect}
                                locale={ptBR}
                                className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm w-full"
                                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                            />
                        </div>
                    </div>

                    {/* Time Selection */}
                    <div className="flex-1">
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <Clock className="h-4 w-4 text-slate-400" />
                            Horário
                        </h3>
                        <div className="grid grid-cols-3 gap-3">
                            {MOCK_TIMES.map((t) => {
                                const isSelected = tempTime === t;
                                return (
                                    <button
                                        key={t}
                                        onClick={() => handleTimeSelect(t)}
                                        className={`
                                            py-3 rounded-xl border-2 transition-all font-bold text-base
                                            ${isSelected
                                                ? 'border-violet-600 bg-violet-600 text-white shadow-md'
                                                : 'border-slate-200 bg-white text-slate-700 hover:border-violet-300 hover:bg-slate-50 shadow-sm'
                                            }
                                        `}
                                    >
                                        {t}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </div>

                {tempDate && tempTime && selectedLocationId && (
                    <div className="mt-8 p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-3 text-emerald-800 animate-in fade-in duration-300">
                        <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                        <span className="text-sm font-medium">
                            Sessão na unidade <strong>{LOCATIONS.find(l => l.id === selectedLocationId)?.name}</strong> para <strong>{format(tempDate, "EEEE, d 'de' MMMM", { locale: ptBR })} às {tempTime}</strong>.
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
