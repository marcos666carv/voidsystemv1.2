import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ChevronLeft, ChevronRight, Droplets, Heart, Sparkles, ArrowRight, Check } from 'lucide-react';

const SERVICES = [
    { id: 'float-60', name: 'flutuação 60min', price: 189, duration: 60, icon: Droplets, color: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
    { id: 'float-90', name: 'flutuação 90min', price: 249, duration: 90, icon: Clock, color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
    { id: 'massage-60', name: 'massagem 60min', price: 159, duration: 60, icon: Heart, color: 'bg-rose-50 text-rose-700 border-rose-200' },
    { id: 'combo', name: 'combo float + massagem', price: 329, duration: 120, icon: Sparkles, color: 'bg-amber-50 text-amber-700 border-amber-200' },
];

const HOURS = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];

function getDaysInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number) {
    return new Date(year, month, 1).getDay();
}

const MONTH_NAMES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

export default function PublicBookingPage() {
    const today = new Date();
    const [step, setStep] = useState(1);
    const [selectedService, setSelectedService] = useState('');
    const [month, setMonth] = useState(today.getMonth());
    const [year, setYear] = useState(today.getFullYear());
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [selectedTime, setSelectedTime] = useState('');

    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfWeek(year, month);

    const prevMonth = () => {
        if (month === 0) { setMonth(11); setYear(year - 1); }
        else setMonth(month - 1);
        setSelectedDay(null);
    };

    const nextMonth = () => {
        if (month === 11) { setMonth(0); setYear(year + 1); }
        else setMonth(month + 1);
        setSelectedDay(null);
    };

    const isToday = (day: number) => day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
    const isPast = (day: number) => new Date(year, month, day) < new Date(today.getFullYear(), today.getMonth(), today.getDate());

    const selectedServiceData = SERVICES.find(s => s.id === selectedService);

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                        agendar sessão
                    </h1>
                    <p className="mt-2 text-slate-500 text-sm">
                        escolha seu serviço, data e horário
                    </p>
                </div>

                {/* Progress */}
                <div className="flex items-center justify-center gap-3 mb-10">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className="flex items-center gap-2">
                            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${s === step ? 'bg-slate-900 text-white scale-110' :
                                s < step ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'
                                }`}>
                                {s < step ? <Check className="h-4 w-4" /> : s}
                            </div>
                            {s < 3 && <div className={`hidden sm:block w-12 h-px ${s < step ? 'bg-emerald-300' : 'bg-slate-200'}`} />}
                        </div>
                    ))}
                </div>

                {/* Step 1: Service */}
                {step === 1 && (
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-slate-800">escolha o serviço</h2>
                        <div className="grid sm:grid-cols-2 gap-3">
                            {SERVICES.map((service) => {
                                const Icon = service.icon;
                                return (
                                    <button
                                        key={service.id}
                                        onClick={() => { setSelectedService(service.id); setStep(2); }}
                                        className={`p-4 rounded-xl border text-left transition-all hover:shadow-md ${selectedService === service.id ? 'border-slate-900 ring-2 ring-slate-900/10' : 'border-slate-200 hover:border-slate-300'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-lg border ${service.color}`}>
                                                <Icon className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-900 text-sm">{service.name}</p>
                                                <p className="text-xs text-slate-500">{service.duration} min · R${service.price}</p>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Step 2: Date */}
                {step === 2 && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-slate-800">escolha a data</h2>
                            <button onClick={() => setStep(1)} className="text-sm text-slate-500 hover:text-slate-900">← voltar</button>
                        </div>

                        <div className="bg-white rounded-xl border border-slate-200 p-5">
                            <div className="flex items-center justify-between mb-5">
                                <button onClick={prevMonth} className="p-1 hover:bg-slate-100 rounded">
                                    <ChevronLeft className="h-5 w-5 text-slate-600" />
                                </button>
                                <span className="text-sm font-medium text-slate-800">
                                    {MONTH_NAMES[month]} {year}
                                </span>
                                <button onClick={nextMonth} className="p-1 hover:bg-slate-100 rounded">
                                    <ChevronRight className="h-5 w-5 text-slate-600" />
                                </button>
                            </div>

                            <div className="grid grid-cols-7 gap-1 text-center">
                                {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((d, i) => (
                                    <div key={i} className="text-[10px] font-medium text-slate-400 py-1">{d}</div>
                                ))}
                                {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
                                {Array.from({ length: daysInMonth }).map((_, i) => {
                                    const day = i + 1;
                                    const past = isPast(day);
                                    const selected = selectedDay === day;
                                    const dayOfWeek = new Date(year, month, day).getDay();
                                    const isWeekend = dayOfWeek === 0;

                                    return (
                                        <button
                                            key={day}
                                            disabled={past || isWeekend}
                                            onClick={() => { setSelectedDay(day); setStep(3); }}
                                            className={`py-2 rounded-lg text-sm transition-all ${selected ? 'bg-slate-900 text-white font-semibold' :
                                                isToday(day) ? 'bg-cyan-50 text-cyan-700 font-medium border border-cyan-200' :
                                                    past || isWeekend ? 'text-slate-300 cursor-not-allowed' :
                                                        'text-slate-700 hover:bg-slate-100'
                                                }`}
                                        >
                                            {day}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 3: Time */}
                {step === 3 && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-slate-800">escolha o horário</h2>
                            <button onClick={() => setStep(2)} className="text-sm text-slate-500 hover:text-slate-900">← voltar</button>
                        </div>

                        {/* Summary */}
                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                            <div className="flex items-center gap-3">
                                <Calendar className="h-5 w-5 text-slate-400" />
                                <div>
                                    <p className="text-sm font-medium text-slate-900">
                                        {selectedServiceData?.name}
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        {selectedDay} de {MONTH_NAMES[month]} de {year} · R${selectedServiceData?.price}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                            {HOURS.map((hour) => (
                                <button
                                    key={hour}
                                    onClick={() => setSelectedTime(hour)}
                                    className={`py-3 rounded-lg text-sm font-medium transition-all ${selectedTime === hour
                                        ? 'bg-slate-900 text-white'
                                        : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-400'
                                        }`}
                                >
                                    {hour}
                                </button>
                            ))}
                        </div>

                        {selectedTime && (
                            <Link
                                to="/register"
                                className="mt-4 w-full py-3 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                            >
                                confirmar agendamento
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
