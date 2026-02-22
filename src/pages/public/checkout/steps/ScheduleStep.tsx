import { useState } from 'react';
import { Clock, CheckCircle2 } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const MOCK_TIMES = [
    '09:00', '10:30', '14:00', '15:30', '18:00', '19:30'
];

interface ScheduleStepProps {
    flowType: string;
    selectedDate?: string;
    selectedTime?: string;
    onSelect: (date: string, time: string) => void;
}

export function ScheduleStep({ flowType, selectedDate, selectedTime, onSelect }: ScheduleStepProps) {
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
        onSelect(format(tempDate, 'yyyy-MM-dd'), t); // Commit selection
    };

    return (
        <div className="w-full max-w-2xl mx-auto space-y-8">
            <div className="text-center mb-8">
                {flowType === 'combo' ? (
                    <p className="text-slate-500 text-lg">
                        Escolha quando deseja realizar a sua primeira sessão do combo.
                    </p>
                ) : (
                    <p className="text-slate-500 text-lg">
                        Escolha a data e o horário para a sua sessão.
                    </p>
                )}
            </div>

            <div className="space-y-6">
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

                {tempDate && tempTime && (
                    <div className="mt-8 p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-3 text-emerald-800 animate-in fade-in duration-300">
                        <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                        <span className="text-sm font-medium">
                            Sessão reservada para <strong>{format(tempDate, "EEEE, d 'de' MMMM", { locale: ptBR })} às {tempTime}</strong>.
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}

