import { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Receipt, Calendar, ArrowUpRight, ArrowDownRight, BarChart3 } from 'lucide-react';

const MOCK_MONTHLY = [
    { month: 'Set', revenue: 42500, expenses: 28000, sessions: 120 },
    { month: 'Out', revenue: 48200, expenses: 29500, sessions: 138 },
    { month: 'Nov', revenue: 52100, expenses: 30000, sessions: 145 },
    { month: 'Dez', revenue: 61800, expenses: 32000, sessions: 172 },
    { month: 'Jan', revenue: 55400, expenses: 31500, sessions: 158 },
    { month: 'Fev', revenue: 47200, expenses: 30800, sessions: 132 },
];

const PAYMENT_BREAKDOWN = [
    { method: 'PIX', percentage: 52, amount: 24500, color: 'bg-cyan-500' },
    { method: 'Crédito', percentage: 28, amount: 13200, color: 'bg-indigo-500' },
    { method: 'Débito', percentage: 12, amount: 5660, color: 'bg-amber-500' },
    { method: 'Dinheiro', percentage: 8, amount: 3770, color: 'bg-emerald-500' },
];

const RECENT_TRANSACTIONS = [
    { id: '1', client: 'Maria Silva', service: 'Flutuação 90min', amount: 24900, method: 'PIX', date: '18/02' },
    { id: '2', client: 'João Santos', service: 'Combo Float+Massage', amount: 32900, method: 'Crédito', date: '18/02' },
    { id: '3', client: 'Ana Costa', service: 'Massagem 60min', amount: 15900, method: 'PIX', date: '17/02' },
    { id: '4', client: 'Pedro Lima', service: 'Pacote 5 Sessões', amount: 84500, method: 'Crédito', date: '17/02' },
    { id: '5', client: 'Carla Oliveira', service: 'Flutuação 60min', amount: 18900, method: 'Débito', date: '16/02' },
];

const formatPrice = (cents: number) => `R$ ${(cents / 100).toFixed(2).replace('.', ',')}`;
const formatK = (v: number) => `R$ ${(v / 1000).toFixed(1)}k`;

export function FinancePage() {
    const [period, setPeriod] = useState<'month' | 'quarter' | 'year'>('month');

    const currentMonth = MOCK_MONTHLY[MOCK_MONTHLY.length - 1];
    const previousMonth = MOCK_MONTHLY[MOCK_MONTHLY.length - 2];
    const revenueGrowth = ((currentMonth.revenue - previousMonth.revenue) / previousMonth.revenue * 100).toFixed(1);
    const isPositive = Number(revenueGrowth) > 0;
    const maxRevenue = Math.max(...MOCK_MONTHLY.map(m => m.revenue));

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">financeiro</h1>
                    <p className="text-sm text-slate-500">visão geral das finanças</p>
                </div>
                <div className="flex gap-1 bg-slate-100 rounded-lg p-0.5">
                    {(['month', 'quarter', 'year'] as const).map((p) => (
                        <button
                            key={p}
                            onClick={() => setPeriod(p)}
                            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${period === p ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            {p === 'month' ? 'mês' : p === 'quarter' ? 'trimestre' : 'ano'}
                        </button>
                    ))}
                </div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <KpiCard
                    label="receita do mês"
                    value={formatK(currentMonth.revenue)}
                    change={`${isPositive ? '+' : ''}${revenueGrowth}%`}
                    positive={isPositive}
                    icon={DollarSign}
                />
                <KpiCard
                    label="despesas do mês"
                    value={formatK(currentMonth.expenses)}
                    change="-2.2%"
                    positive={true}
                    icon={TrendingDown}
                />
                <KpiCard
                    label="lucro líquido"
                    value={formatK(currentMonth.revenue - currentMonth.expenses)}
                    change={`${isPositive ? '+' : ''}${revenueGrowth}%`}
                    positive={isPositive}
                    icon={TrendingUp}
                />
                <KpiCard
                    label="sessões no mês"
                    value={String(currentMonth.sessions)}
                    change="-16.5%"
                    positive={false}
                    icon={Calendar}
                />
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Revenue chart (simple bar) */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5">
                    <div className="flex items-center justify-between mb-5">
                        <h3 className="text-sm font-semibold text-slate-900">receita mensal</h3>
                        <BarChart3 className="h-4 w-4 text-slate-400" />
                    </div>
                    <div className="flex items-end gap-3 h-40">
                        {MOCK_MONTHLY.map((m) => (
                            <div key={m.month} className="flex-1 flex flex-col items-center gap-1.5">
                                <span className="text-[10px] font-medium text-slate-500">{formatK(m.revenue)}</span>
                                <div
                                    className="w-full bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t-md transition-all"
                                    style={{ height: `${(m.revenue / maxRevenue) * 100}%` }}
                                />
                                <span className="text-[10px] text-slate-400">{m.month}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Payment breakdown */}
                <div className="bg-white rounded-xl border border-slate-200 p-5">
                    <h3 className="text-sm font-semibold text-slate-900 mb-4">métodos de pagamento</h3>
                    <div className="space-y-3">
                        {PAYMENT_BREAKDOWN.map((p) => (
                            <div key={p.method}>
                                <div className="flex items-center justify-between text-xs mb-1">
                                    <span className="text-slate-700 font-medium">{p.method}</span>
                                    <span className="text-slate-500">{p.percentage}%</span>
                                </div>
                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div className={`h-full ${p.color} rounded-full`} style={{ width: `${p.percentage}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent transactions */}
            <div className="bg-white rounded-xl border border-slate-200">
                <div className="px-5 py-4 border-b border-slate-100">
                    <h3 className="text-sm font-semibold text-slate-900">transações recentes</h3>
                </div>
                <div className="divide-y divide-slate-50">
                    {RECENT_TRANSACTIONS.map((tx) => (
                        <div key={tx.id} className="px-5 py-3 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center">
                                    <Receipt className="h-4 w-4 text-slate-500" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-900">{tx.client}</p>
                                    <p className="text-xs text-slate-500">{tx.service} · {tx.method}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-semibold text-slate-900">{formatPrice(tx.amount)}</p>
                                <p className="text-xs text-slate-400">{tx.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function KpiCard({ label, value, change, positive, icon: Icon }: {
    label: string; value: string; change: string; positive: boolean; icon: any;
}) {
    return (
        <div className="bg-white rounded-xl border border-slate-200 p-4">
            <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-slate-500 font-medium">{label}</span>
                <Icon className="h-4 w-4 text-slate-400" />
            </div>
            <p className="text-xl font-bold text-slate-900">{value}</p>
            <div className={`flex items-center gap-1 mt-1 text-xs font-medium ${positive ? 'text-emerald-600' : 'text-red-500'}`}>
                {positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {change} vs mês anterior
            </div>
        </div>
    );
}
