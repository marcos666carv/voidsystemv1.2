import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Calendar, Clock, ChevronLeft, ChevronRight, Droplets, Heart, Sparkles, ArrowRight, Check, MapPin } from 'lucide-react';

const SERVICES = [
    { id: 'float-60', name: 'flutuação 60min', price: 189, duration: 60, icon: Droplets, color: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
    { id: 'float-90', name: 'flutuação 90min', price: 249, duration: 90, icon: Clock, color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
    { id: 'massage-60', name: 'massagem 60min', price: 159, duration: 60, icon: Heart, color: 'bg-rose-50 text-rose-700 border-rose-200' },
    { id: 'combo', name: 'combo float + massagem', price: 329, duration: 120, icon: Sparkles, color: 'bg-amber-50 text-amber-700 border-amber-200' },
];

const HOURS = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];
const MONTH_NAMES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

function getDaysInMonth(y: number, m: number) { return new Date(y, m + 1, 0).getDate(); }
function getFirstDayOfWeek(y: number, m: number) { return new Date(y, m, 1).getDay(); }

export default function BookingPage() {
    const { user } = useAuth();
    const today = new Date();
    const [step, setStep] = useState(1);
    const [selectedService, setSelectedService] = useState('');
    const [month, setMonth] = useState(today.getMonth());
    const [year, setYear] = useState(today.getFullYear());
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [selectedTime, setSelectedTime] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [notes, setNotes] = useState('');

    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfWeek(year, month);
    const isPast = (day: number) => new Date(year, month, day) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const isToday = (day: number) => day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
    const selectedServiceData = SERVICES.find(s => s.id === selectedService);

    const handleConfirm = async () => {
        // TODO: appointmentsApi.create(...)
        setConfirmed(true);
    };

    if (confirmed) {
        return (
            <div className="max-w-md mx-auto text-center py-16">
                <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                    <Check className="h-8 w-8 text-emerald-600" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">sessão agendada!</h2>
                <p className="text-sm text-slate-500 mt-2">
                    {selectedServiceData?.name} — {selectedDay} de {MONTH_NAMES[month]} às {selectedTime}
                </p>
                <p className="text-xs text-slate-400 mt-4">
                    você receberá um lembrete por email antes da sessão
                </p>
                <button
                    onClick={() => { setConfirmed(false); setStep(1); setSelectedService(''); setSelectedDay(null); setSelectedTime(''); }}
                    className="mt-6 px-6 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors"
                >
                    agendar outra sessão
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">agendar sessão</h1>
                <p className="text-sm text-slate-500">olá {user?.fullName?.split(' ')[0]}, escolha sua próxima experiência</p>
            </div>

            {/* Progress */}
            <div className="flex items-center gap-3">
                {['serviço', 'data', 'horário', 'confirmar'].map((label, i) => (
                    <div key={label} className="flex items-center gap-2 flex-1">
                        <div className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-medium shrink-0 ${i + 1 === step ? 'bg-slate-900 text-white' : i + 1 < step ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'
                            }`}>
                            {i + 1 < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
                        </div>
                        <span className="text-[10px] text-slate-500 hidden sm:block">{label}</span>
                        {i < 3 && <div className={`flex-1 h-px ${i + 1 < step ? 'bg-emerald-200' : 'bg-slate-200'}`} />}
                    </div>
                ))}
            </div>

            {/* Step 1 */}
            {step === 1 && (
                <div className="grid sm:grid-cols-2 gap-3">
                    {SERVICES.map((s) => {
                        const Icon = s.icon;
                        return (
                            <button key={s.id} onClick={() => { setSelectedService(s.id); setStep(2); }}
                                className="p-4 bg-white rounded-xl border border-slate-200 text-left hover:border-slate-400 hover:shadow-sm transition-all">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg border ${s.color}`}><Icon className="h-5 w-5" /></div>
                                    <div>
                                        <p className="font-medium text-slate-900 text-sm">{s.name}</p>
                                        <p className="text-xs text-slate-500">{s.duration}min · R${s.price}</p>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            )}

            {/* Step 2: Calendar */}
            {step === 2 && (
                <div className="bg-white rounded-xl border border-slate-200 p-5">
                    <div className="flex items-center justify-between mb-5">
                        <button onClick={() => { if (month === 0) { setMonth(11); setYear(year - 1); } else setMonth(month - 1); setSelectedDay(null); }}>
                            <ChevronLeft className="h-5 w-5 text-slate-500" />
                        </button>
                        <span className="text-sm font-medium text-slate-800">{MONTH_NAMES[month]} {year}</span>
                        <button onClick={() => { if (month === 11) { setMonth(0); setYear(year + 1); } else setMonth(month + 1); setSelectedDay(null); }}>
                            <ChevronRight className="h-5 w-5 text-slate-500" />
                        </button>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center">
                        {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((d, i) => <div key={i} className="text-[10px] font-medium text-slate-400 py-1">{d}</div>)}
                        {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
                        {Array.from({ length: daysInMonth }).map((_, i) => {
                            const day = i + 1; const past = isPast(day); const isSun = new Date(year, month, day).getDay() === 0;
                            return (
                                <button key={day} disabled={past || isSun} onClick={() => { setSelectedDay(day); setStep(3); }}
                                    className={`py-2 rounded-lg text-sm transition-all ${selectedDay === day ? 'bg-slate-900 text-white font-semibold' : isToday(day) ? 'bg-cyan-50 text-cyan-700 font-medium border border-cyan-200' :
                                            past || isSun ? 'text-slate-300 cursor-not-allowed' : 'text-slate-700 hover:bg-slate-100'}`}>
                                    {day}
                                </button>
                            );
                        })}
                    </div>
                    <button onClick={() => setStep(1)} className="mt-4 text-sm text-slate-500 hover:text-slate-900">← voltar</button>
                </div>
            )}

            {/* Step 3: Time */}
            {step === 3 && (
                <div className="space-y-4">
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {HOURS.map((h) => (
                            <button key={h} onClick={() => { setSelectedTime(h); setStep(4); }}
                                className={`py-3 rounded-lg text-sm font-medium transition-all ${selectedTime === h ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-400'}`}>
                                {h}
                            </button>
                        ))}
                    </div>
                    <button onClick={() => setStep(2)} className="text-sm text-slate-500 hover:text-slate-900">← voltar</button>
                </div>
            )}

            {/* Step 4: Confirm */}
            {step === 4 && (
                <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
                    <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">resumo do agendamento</h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 text-sm"><Droplets className="h-4 w-4 text-slate-400" /><span className="text-slate-700">{selectedServiceData?.name}</span></div>
                        <div className="flex items-center gap-3 text-sm"><Calendar className="h-4 w-4 text-slate-400" /><span className="text-slate-700">{selectedDay} de {MONTH_NAMES[month]} de {year}</span></div>
                        <div className="flex items-center gap-3 text-sm"><Clock className="h-4 w-4 text-slate-400" /><span className="text-slate-700">{selectedTime}</span></div>
                        <div className="flex items-center gap-3 text-sm"><MapPin className="h-4 w-4 text-slate-400" /><span className="text-slate-700">void float — curitiba</span></div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                        <span className="text-sm text-slate-500">valor</span>
                        <span className="text-lg font-bold text-slate-900">R${selectedServiceData?.price}</span>
                    </div>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="observações (opcional)"
                        className="w-full p-3 border border-slate-200 rounded-lg text-sm resize-none h-20 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                    />
                    <div className="flex gap-3">
                        <button onClick={() => setStep(3)} className="flex-1 py-2.5 border border-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50">voltar</button>
                        <button onClick={handleConfirm} className="flex-1 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-slate-800 flex items-center justify-center gap-2">
                            confirmar <ArrowRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
