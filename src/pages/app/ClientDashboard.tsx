import { useState } from 'react';
import { Calendar, Clock, MapPin, Droplets, CreditCard, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function ClientDashboard() {
    const [mockCredits] = useState([
        { id: 1, name: 'Flutuação 60 min', count: 1, icon: Droplets, color: 'text-sky-500', bg: 'bg-sky-50' },
        { id: 2, name: 'Vale Presente', count: 0, icon: CreditCard, color: 'text-violet-500', bg: 'bg-violet-50' }
    ]);

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-12">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Olá, Marcos.</h1>
                <p className="text-slate-500 mt-1">Bem-vindo de volta ao seu espaço no Void.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Coluna Principal - Próxima Sessão */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-violet-600" />
                        Sua Próxima Sessão
                    </h2>

                    <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-violet-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />

                        <div className="relative z-10 flex flex-col md:flex-row gap-6 md:items-center justify-between">
                            <div className="flex items-start gap-4">
                                <div className="w-16 h-16 rounded-2xl bg-violet-100 text-violet-600 flex flex-col items-center justify-center shrink-0">
                                    <span className="text-sm font-bold uppercase tracking-wider">Mai</span>
                                    <span className="text-2xl font-black leading-none">20</span>
                                </div>
                                <div>
                                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold mb-2">
                                        <Droplets className="h-3.5 w-3.5" />
                                        Flutuação
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900">Sessão de 60 Minutos</h3>
                                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-3 text-sm text-slate-500 font-medium">
                                        <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> 14:00 - 15:00</span>
                                        <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> Unidade Curitiba</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 shrink-0">
                                <Button variant="outline" className="rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold w-full md:w-auto">
                                    Reagendar
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 flex items-center gap-4">
                        <Link to="/services" className="flex-1">
                            <button className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-2xl p-4 font-bold text-sm transition-all flex items-center justify-between group">
                                <span>Agendar Nova Sessão</span>
                                <ChevronRight className="h-4 w-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                            </button>
                        </Link>
                        <Link to="/services?type=gift" className="flex-1">
                            <button className="w-full bg-white border border-slate-200 hover:border-violet-300 text-slate-700 rounded-2xl p-4 font-bold text-sm transition-all flex items-center justify-between group">
                                <span>Comprar Presente</span>
                                <ChevronRight className="h-4 w-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Coluna Lateral - Créditos e Resumo */}
                <div className="space-y-6">
                    <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        Seus Créditos
                    </h2>

                    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col gap-4">
                        {mockCredits.map(credit => (
                            <div key={credit.id} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-xl ${credit.bg} ${credit.color} flex items-center justify-center`}>
                                        <credit.icon className="h-5 w-5" />
                                    </div>
                                    <span className="font-semibold text-slate-700 text-sm">{credit.name}</span>
                                </div>
                                <div className="text-xl font-black text-slate-900">
                                    {credit.count}
                                </div>
                            </div>
                        ))}

                        <div className="pt-4 mt-2 border-t border-slate-100">
                            <p className="text-xs text-slate-400 text-center">
                                Créditos nunca expiram. Use quando quiser.
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-900 rounded-3xl p-6 text-white overflow-hidden relative group cursor-pointer">
                        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-transparent" />
                        <div className="relative z-10 flex flex-col items-start gap-4">
                            <div className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold tracking-widest uppercase mb-2">
                                Void Club
                            </div>
                            <h3 className="text-xl font-bold leading-tight">Faça parte do clube e libere vantagens.</h3>
                            <span className="text-sm font-semibold text-violet-300 flex items-center gap-1 group-hover:text-white transition-colors">
                                Conhecer benefícios <ChevronRight className="h-4 w-4" />
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
