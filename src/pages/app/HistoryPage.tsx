import { useAuth } from '@/context/AuthContext';
import { Calendar, Droplets, Heart, Sparkles, Star, Filter } from 'lucide-react';
import { useState } from 'react';

const MOCK_HISTORY = [
    { id: '1', service: 'Flutuação 90min', date: '2026-02-15', time: '14:00', status: 'completed', xpEarned: 35, icon: Droplets },
    { id: '2', service: 'Combo Float + Massagem', date: '2026-02-08', time: '10:00', status: 'completed', xpEarned: 60, icon: Sparkles },
    { id: '3', service: 'Massagem 60min', date: '2026-01-28', time: '16:00', status: 'completed', xpEarned: 25, icon: Heart },
    { id: '4', service: 'Flutuação 60min', date: '2026-01-15', time: '11:00', status: 'completed', xpEarned: 20, icon: Droplets },
    { id: '5', service: 'Flutuação 90min', date: '2026-01-02', time: '09:00', status: 'cancelled', xpEarned: 0, icon: Droplets },
    { id: '6', service: 'Massagem 60min', date: '2025-12-20', time: '15:00', status: 'completed', xpEarned: 25, icon: Heart },
    { id: '7', service: 'Combo Float + Massagem', date: '2025-12-10', time: '14:00', status: 'completed', xpEarned: 60, icon: Sparkles },
];

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
    completed: { label: 'concluída', color: 'bg-emerald-100 text-emerald-700' },
    cancelled: { label: 'cancelada', color: 'bg-red-100 text-red-600' },
    pending: { label: 'pendente', color: 'bg-amber-100 text-amber-700' },
};

export default function HistoryPage() {
    const { user } = useAuth();
    const [filter, setFilter] = useState('all');

    const totalXp = MOCK_HISTORY.reduce((sum, h) => sum + h.xpEarned, 0);
    const totalSessions = MOCK_HISTORY.filter(h => h.status === 'completed').length;
    const filtered = filter === 'all' ? MOCK_HISTORY : MOCK_HISTORY.filter(h => h.status === filter);

    const formatDate = (d: string) => {
        const [y, m, day] = d.split('-');
        return `${day}/${m}/${y}`;
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">meu histórico</h1>
                <p className="text-sm text-slate-500">suas sessões e evolução na void</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
                <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
                    <p className="text-2xl font-bold text-slate-900">{totalSessions}</p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">sessões</p>
                </div>
                <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl border border-cyan-200 p-4 text-center">
                    <p className="text-2xl font-bold text-cyan-900">{totalXp}</p>
                    <p className="text-[10px] text-cyan-600 uppercase tracking-wider mt-1">xp total</p>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                        <Star className="h-4 w-4 text-amber-500" />
                        <p className="text-2xl font-bold text-slate-900">{user?.level || 'iniciado'}</p>
                    </div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">nível</p>
                </div>
            </div>

            {/* Filter */}
            <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-slate-400" />
                {[
                    { value: 'all', label: 'todas' },
                    { value: 'completed', label: 'concluídas' },
                    { value: 'cancelled', label: 'canceladas' },
                ].map(({ value, label }) => (
                    <button
                        key={value}
                        onClick={() => setFilter(value)}
                        className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${filter === value ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {/* History list */}
            <div className="space-y-2">
                {filtered.map((session) => {
                    const Icon = session.icon;
                    const status = STATUS_LABELS[session.status];
                    return (
                        <div key={session.id} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-4 hover:shadow-sm transition-shadow">
                            <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                                <Icon className="h-5 w-5 text-slate-500" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-slate-900">{session.service}</p>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-xs text-slate-500">{formatDate(session.date)} · {session.time}</span>
                                    <span className={`px-1.5 py-0.5 text-[10px] font-medium rounded-full ${status.color}`}>{status.label}</span>
                                </div>
                            </div>
                            {session.xpEarned > 0 && (
                                <span className="text-xs font-semibold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded-full">
                                    +{session.xpEarned} xp
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>

            {filtered.length === 0 && (
                <div className="text-center py-12">
                    <Calendar className="h-8 w-8 text-slate-200 mx-auto mb-3" />
                    <p className="text-sm text-slate-400">nenhuma sessão encontrada</p>
                </div>
            )}
        </div>
    );
}
