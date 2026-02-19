import React, { useState } from 'react';
import {
    Crown,
    Plus,
    Edit2,
    Trash2,
    Check,
    X,
    Handshake,
    Layers,
    GripVertical,
} from 'lucide-react';

// ─── Types ──────────────────────────────────────────────────────

interface Plan {
    id: string;
    name: string;
    sessions: number;
    monthlyPrice: number;
    perSession: number;
    perks: string[];
    highlight: boolean;
    promo: string;
}

interface Partner {
    id: string;
    name: string;
    benefit: string;
}

// ─── Initial Data ───────────────────────────────────────────────

const INITIAL_PLANS: Plan[] = [
    {
        id: 'essencial',
        name: 'essencial',
        sessions: 2,
        monthlyPrice: 399,
        perSession: 199.5,
        highlight: false,
        promo: '',
        perks: [
            '2 sessões de flutuação por mês',
            '10% off em massoterapia',
            'agendamento prioritário',
            'acesso ao app void',
        ],
    },
    {
        id: 'equilibrio',
        name: 'equilíbrio',
        sessions: 4,
        monthlyPrice: 699,
        perSession: 174.75,
        highlight: true,
        promo: '',
        perks: [
            '4 sessões de flutuação por mês',
            '15% off em massoterapia',
            '1 massoterapia inclusa por mês',
            'agendamento prioritário',
            'sessão de aniversário grátis',
            'acesso a eventos exclusivos',
        ],
    },
    {
        id: 'imersao',
        name: 'imersão total',
        sessions: 8,
        monthlyPrice: 1199,
        perSession: 149.88,
        highlight: false,
        promo: '🔥 lançamento — 20% off nos 3 primeiros meses',
        perks: [
            '8 sessões de flutuação por mês',
            '20% off em todos os serviços',
            '2 massoterapias inclusas por mês',
            'agendamento vip — horários exclusivos',
            'kit void de boas-vindas',
            'acesso ao void lab (experiências beta)',
            'programa de indicação premium',
            'sessões extras por R$ 99',
        ],
    },
];

const INITIAL_PARTNERS: Partner[] = [
    { id: 'p1', name: 'Studio Yoga', benefit: '15% off em aulas' },
    { id: 'p2', name: 'Zen Café', benefit: 'smoothie grátis pós-sessão' },
    { id: 'p3', name: 'FitLab', benefit: '10% off plano mensal' },
    { id: 'p4', name: 'Mindful App', benefit: '3 meses premium grátis' },
    { id: 'p5', name: 'Nutri+', benefit: '1 consulta nutricional grátis' },
    { id: 'p6', name: 'Breath Work', benefit: '20% off workshops' },
];

// ─── Component ──────────────────────────────────────────────────

export default function AdminVoidClubPage() {
    const [plans, setPlans] = useState<Plan[]>(INITIAL_PLANS);
    const [partners, setPartners] = useState<Partner[]>(INITIAL_PARTNERS);

    // Plan form state
    const [showPlanForm, setShowPlanForm] = useState(false);
    const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
    const [planForm, setPlanForm] = useState({
        name: '',
        sessions: '',
        monthlyPrice: '',
        highlight: false,
        promo: '',
        perks: [''],
    });

    // Partner form state
    const [showPartnerForm, setShowPartnerForm] = useState(false);
    const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
    const [partnerForm, setPartnerForm] = useState({ name: '', benefit: '' });

    // ─── Plan Handlers ──────────────────────────────────────────

    const resetPlanForm = () => {
        setPlanForm({ name: '', sessions: '', monthlyPrice: '', highlight: false, promo: '', perks: [''] });
        setEditingPlan(null);
        setShowPlanForm(false);
    };

    const openEditPlan = (plan: Plan) => {
        setEditingPlan(plan);
        setPlanForm({
            name: plan.name,
            sessions: String(plan.sessions),
            monthlyPrice: String(plan.monthlyPrice),
            highlight: plan.highlight,
            promo: plan.promo,
            perks: plan.perks.length > 0 ? [...plan.perks] : [''],
        });
        setShowPlanForm(true);
    };

    const handlePlanSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const sessions = Number(planForm.sessions);
        const monthlyPrice = Number(planForm.monthlyPrice);
        const payload: Plan = {
            id: editingPlan?.id || `plan-${Date.now()}`,
            name: planForm.name,
            sessions,
            monthlyPrice,
            perSession: sessions > 0 ? monthlyPrice / sessions : 0,
            highlight: planForm.highlight,
            promo: planForm.promo,
            perks: planForm.perks.filter(p => p.trim() !== ''),
        };

        if (editingPlan) {
            setPlans(plans.map(p => p.id === editingPlan.id ? payload : p));
        } else {
            setPlans([...plans, payload]);
        }
        resetPlanForm();
    };

    const deletePlan = (id: string) => {
        if (!confirm('Remover este plano?')) return;
        setPlans(plans.filter(p => p.id !== id));
    };

    const addPerk = () => setPlanForm({ ...planForm, perks: [...planForm.perks, ''] });

    const updatePerk = (idx: number, value: string) => {
        const updated = [...planForm.perks];
        updated[idx] = value;
        setPlanForm({ ...planForm, perks: updated });
    };

    const removePerk = (idx: number) => {
        setPlanForm({ ...planForm, perks: planForm.perks.filter((_, i) => i !== idx) });
    };

    // ─── Partner Handlers ───────────────────────────────────────

    const resetPartnerForm = () => {
        setPartnerForm({ name: '', benefit: '' });
        setEditingPartner(null);
        setShowPartnerForm(false);
    };

    const openEditPartner = (partner: Partner) => {
        setEditingPartner(partner);
        setPartnerForm({ name: partner.name, benefit: partner.benefit });
        setShowPartnerForm(true);
    };

    const handlePartnerSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const payload: Partner = {
            id: editingPartner?.id || `partner-${Date.now()}`,
            name: partnerForm.name,
            benefit: partnerForm.benefit,
        };
        if (editingPartner) {
            setPartners(partners.map(p => p.id === editingPartner.id ? payload : p));
        } else {
            setPartners([...partners, payload]);
        }
        resetPartnerForm();
    };

    const deletePartner = (id: string) => {
        if (!confirm('Remover este parceiro?')) return;
        setPartners(partners.filter(p => p.id !== id));
    };

    const formatBRL = (v: number) =>
        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v);

    return (
        <div className="max-w-[1600px] mx-auto pb-10 space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
                    <Crown className="h-7 w-7 text-lilac-400" />
                    void club
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                    gerencie planos de assinatura e parceiros do clube
                </p>
            </div>

            {/* ─── Plans Section ──────────────────────────────── */}
            <section className="space-y-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Layers className="h-5 w-5 text-slate-400" />
                        <h2 className="text-lg font-semibold text-slate-900">planos</h2>
                        <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                            {plans.length}
                        </span>
                    </div>
                    <button
                        onClick={() => { resetPlanForm(); setShowPlanForm(true); }}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Plus className="h-4 w-4" />
                        novo plano
                    </button>
                </div>

                {/* Plan Form */}
                {showPlanForm && (
                    <div className="animate-in slide-in-from-top-4 duration-300">
                        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                            <div className="flex justify-between mb-6">
                                <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
                                    {editingPlan ? <Edit2 size={16} /> : <Plus size={16} />}
                                    {editingPlan ? 'editar plano' : 'novo plano'}
                                </h3>
                                <button onClick={resetPlanForm} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                                    <X size={18} />
                                </button>
                            </div>

                            <form onSubmit={handlePlanSubmit} className="space-y-5">
                                {/* Row 1: Name + Sessions + Price */}
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="text-xs font-medium text-slate-600 mb-1.5 block">
                                            nome do plano <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            required
                                            value={planForm.name}
                                            onChange={e => setPlanForm({ ...planForm, name: e.target.value })}
                                            placeholder="ex: equilíbrio"
                                            className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-slate-600 mb-1.5 block">
                                            sessões/mês <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            required
                                            value={planForm.sessions}
                                            onChange={e => setPlanForm({ ...planForm, sessions: e.target.value })}
                                            placeholder="4"
                                            className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-slate-600 mb-1.5 block">
                                            preço mensal (R$) <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            required
                                            value={planForm.monthlyPrice}
                                            onChange={e => setPlanForm({ ...planForm, monthlyPrice: e.target.value })}
                                            placeholder="699"
                                            className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Row 2: Promo + Highlight */}
                                <div className="grid grid-cols-[2fr_auto] gap-4 items-end">
                                    <div>
                                        <label className="text-xs font-medium text-slate-600 mb-1.5 block">etiqueta promo</label>
                                        <input
                                            value={planForm.promo}
                                            onChange={e => setPlanForm({ ...planForm, promo: e.target.value })}
                                            placeholder="ex: 🔥 lançamento — 20% off"
                                            className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                        />
                                    </div>
                                    <label className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors h-[38px]">
                                        <input
                                            type="checkbox"
                                            checked={planForm.highlight}
                                            onChange={e => setPlanForm({ ...planForm, highlight: e.target.checked })}
                                            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500/20"
                                        />
                                        <span className="text-sm text-slate-700 whitespace-nowrap">plano destaque</span>
                                    </label>
                                </div>

                                {/* Perks */}
                                <div className="border-t border-slate-100 pt-5">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-sm font-semibold text-slate-900">benefícios do plano</span>
                                        <button
                                            type="button"
                                            onClick={addPerk}
                                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                                        >
                                            <Plus className="h-3.5 w-3.5" /> adicionar
                                        </button>
                                    </div>
                                    <div className="space-y-2">
                                        {planForm.perks.map((perk, idx) => (
                                            <div key={idx} className="flex items-center gap-2">
                                                <GripVertical className="h-4 w-4 text-slate-300 shrink-0" />
                                                <input
                                                    value={perk}
                                                    onChange={e => updatePerk(idx, e.target.value)}
                                                    placeholder="ex: agendamento prioritário"
                                                    className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 focus:ring-2 focus:ring-blue-500/20 outline-none"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removePerk(idx)}
                                                    className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-3 justify-end pt-2">
                                    <button type="button" onClick={resetPlanForm} className="px-4 py-2 text-sm font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                                        cancelar
                                    </button>
                                    <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                                        {editingPlan ? 'salvar alterações' : 'criar plano'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Plans Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {plans.map(plan => (
                        <div
                            key={plan.id}
                            className={`flex flex-col bg-white rounded-xl border p-5 transition-all duration-200 group ${plan.highlight
                                    ? 'border-lilac-400/50 ring-1 ring-lilac-400/20 shadow-sm'
                                    : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
                                }`}
                        >
                            {/* Plan header */}
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-lg font-bold text-slate-900">{plan.name}</h3>
                                        {plan.highlight && (
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-lilac-500 bg-lilac-100 px-2 py-0.5 rounded-full">
                                                destaque
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-slate-400 mt-0.5">
                                        {plan.sessions} sessões/mês
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xl font-bold text-slate-900">{formatBRL(plan.monthlyPrice)}</p>
                                    <p className="text-[10px] text-slate-400">{formatBRL(plan.perSession)}/sessão</p>
                                </div>
                            </div>

                            {plan.promo && (
                                <p className="text-xs font-medium text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg mb-3">
                                    {plan.promo}
                                </p>
                            )}

                            {/* Perks list */}
                            <div className="flex-1 space-y-1.5 mb-4">
                                {plan.perks.map((perk, i) => (
                                    <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                                        <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                        <span>{perk}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Actions */}
                            <div className="border-t border-slate-100 pt-3 flex justify-between">
                                <button
                                    onClick={() => openEditPlan(plan)}
                                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                                >
                                    <Edit2 className="h-3.5 w-3.5" /> editar
                                </button>
                                <button
                                    onClick={() => deletePlan(plan.id)}
                                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <Trash2 className="h-3.5 w-3.5" /> remover
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── Partners Section ───────────────────────────── */}
            <section className="space-y-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Handshake className="h-5 w-5 text-slate-400" />
                        <h2 className="text-lg font-semibold text-slate-900">parceiros</h2>
                        <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                            {partners.length}
                        </span>
                    </div>
                    <button
                        onClick={() => { resetPartnerForm(); setShowPartnerForm(true); }}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Plus className="h-4 w-4" />
                        novo parceiro
                    </button>
                </div>

                {/* Partner Form */}
                {showPartnerForm && (
                    <div className="animate-in slide-in-from-top-4 duration-300">
                        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                            <div className="flex justify-between mb-5">
                                <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
                                    {editingPartner ? <Edit2 size={16} /> : <Plus size={16} />}
                                    {editingPartner ? 'editar parceiro' : 'novo parceiro'}
                                </h3>
                                <button onClick={resetPartnerForm} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                                    <X size={18} />
                                </button>
                            </div>

                            <form onSubmit={handlePartnerSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-medium text-slate-600 mb-1.5 block">
                                            nome do parceiro <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            required
                                            value={partnerForm.name}
                                            onChange={e => setPartnerForm({ ...partnerForm, name: e.target.value })}
                                            placeholder="ex: Studio Yoga"
                                            className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-slate-600 mb-1.5 block">
                                            benefício <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            required
                                            value={partnerForm.benefit}
                                            onChange={e => setPartnerForm({ ...partnerForm, benefit: e.target.value })}
                                            placeholder="ex: 15% off em aulas"
                                            className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-3 justify-end pt-1">
                                    <button type="button" onClick={resetPartnerForm} className="px-4 py-2 text-sm font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                                        cancelar
                                    </button>
                                    <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                                        {editingPartner ? 'salvar alterações' : 'adicionar parceiro'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Partners Table */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-slate-100 bg-slate-50/50">
                                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">parceiro</th>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">benefício para membros</th>
                                <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider w-32">ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {partners.map(partner => (
                                <tr key={partner.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                                    <td className="px-5 py-3.5 font-medium text-slate-900">{partner.name}</td>
                                    <td className="px-5 py-3.5 text-slate-500">{partner.benefit}</td>
                                    <td className="px-5 py-3.5 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <button
                                                onClick={() => openEditPartner(partner)}
                                                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                                            >
                                                <Edit2 className="h-3.5 w-3.5" />
                                            </button>
                                            <button
                                                onClick={() => deletePartner(partner.id)}
                                                className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 className="h-3.5 w-3.5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {partners.length === 0 && (
                                <tr>
                                    <td colSpan={3} className="px-5 py-8 text-center text-slate-400 text-sm italic">
                                        nenhum parceiro cadastrado
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
