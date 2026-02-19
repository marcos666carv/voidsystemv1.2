import React, { useState, useMemo } from 'react';
import {
    Waves,
    Zap,
    Gift,
    Crown,
    Edit2,
    Trash2,
    Plus,
    Search,
    Tag,
    Layers,
    X,
    Hand,
    Palette,
} from 'lucide-react';
import { MOCK_SERVICES, MOCK_PACKAGES } from '@/lib/mockData';

// ─── Types ──────────────────────────────────────────────────────

interface Variation {
    id?: string;
    name: string;
    description?: string;
    price: number;
    promoPrice?: number;
    sessions?: number;
}

interface ServiceProduct {
    id: string;
    name: string;
    price: number;
    category: string;
    durationMinutes?: number;
    active: boolean;
    variations: Variation[];
    promoLabel?: string;
    promoStartDate?: string;
    promoEndDate?: string;
    color?: string;
}

// ─── Seed from mock data ────────────────────────────────────────

function buildInitialProducts(): ServiceProduct[] {
    const categoryMap: Record<string, string> = {
        flutuacao: 'floatation',
        massoterapia: 'massage',
        combo: 'combo',
        gift_card: 'gift_card',
    };

    const grouped = new Map<string, ServiceProduct>();

    for (const svc of MOCK_SERVICES) {
        const cat = categoryMap[svc.category] || svc.category;

        if (!grouped.has(cat)) {
            grouped.set(cat, {
                id: svc.id,
                name: svc.name,
                price: svc.price,
                category: cat,
                durationMinutes: svc.duration,
                active: svc.active,
                variations: [],
            });
        }
    }

    // Add packages as variations
    for (const pkg of MOCK_PACKAGES) {
        const svc = MOCK_SERVICES.find(s => s.id === pkg.serviceId);
        if (!svc) continue;
        const cat = categoryMap[svc.category] || svc.category;
        const product = grouped.get(cat);
        if (product) {
            product.variations.push({
                name: `${pkg.sessionCount} ${pkg.sessionCount === 1 ? 'sessão' : 'sessões'}`,
                price: pkg.totalPrice,
                sessions: pkg.sessionCount,
                description: pkg.savingsPercent > 0 ? `${pkg.savingsPercent}% de desconto` : undefined,
            });
        }
    }

    // Add vale presente
    grouped.set('gift_card', {
        id: 'srv-gift',
        name: 'Vale Presente',
        price: 150,
        category: 'gift_card',
        active: true,
        variations: [
            { name: 'Flutuação avulsa', price: 250, sessions: 1 },
            { name: 'Massoterapia avulsa', price: 200, sessions: 1 },
            { name: 'Combo completo', price: 390, sessions: 1 },
        ],
    });

    return Array.from(grouped.values());
}

// ─── Component ──────────────────────────────────────────────────

export default function AdminServicesPage() {
    const [products, setProducts] = useState<ServiceProduct[]>(buildInitialProducts);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState<ServiceProduct | null>(null);
    const [search, setSearch] = useState('');

    // Form state
    const [form, setForm] = useState({
        name: '',
        price: '',
        category: 'floatation',
        durationMinutes: '',
        promoLabel: '',
        promoStartDate: '',
        promoEndDate: '',
        color: '#80D6CF',
    });
    const [variations, setVariations] = useState<Variation[]>([]);

    const resetForm = () => {
        setForm({
            name: '', price: '', category: 'floatation', durationMinutes: '',
            promoLabel: '', promoStartDate: '', promoEndDate: '', color: '#80D6CF',
        });
        setVariations([]);
        setEditingProduct(null);
        setShowForm(false);
    };

    const openEdit = (p: ServiceProduct) => {
        setEditingProduct(p);
        setForm({
            name: p.name,
            price: String(p.price),
            category: p.category,
            durationMinutes: p.durationMinutes ? String(p.durationMinutes) : '',
            promoLabel: p.promoLabel || '',
            promoStartDate: p.promoStartDate || '',
            promoEndDate: p.promoEndDate || '',
            color: p.color || '#80D6CF',
        });
        setVariations([...p.variations]);
        setShowForm(true);
    };

    const addVariation = () => {
        setVariations([...variations, { name: '', price: 0, sessions: 1 }]);
    };

    const updateVariation = (idx: number, field: keyof Variation, value: string | number | undefined) => {
        const updated = [...variations];
        updated[idx] = { ...updated[idx], [field]: value };
        setVariations(updated);
    };

    const removeVariation = (idx: number) => {
        setVariations(variations.filter((_, i) => i !== idx));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const payload: ServiceProduct = {
            id: editingProduct?.id || `srv-${Date.now()}`,
            name: form.name,
            price: Number(form.price),
            category: form.category,
            durationMinutes: form.durationMinutes ? Number(form.durationMinutes) : undefined,
            active: true,
            variations: [...variations],
            promoLabel: form.promoLabel || undefined,
            promoStartDate: form.promoStartDate || undefined,
            promoEndDate: form.promoEndDate || undefined,
            color: form.color || undefined,
        };

        if (editingProduct) {
            setProducts(products.map(p => p.id === editingProduct.id ? payload : p));
        } else {
            setProducts([...products, payload]);
        }
        resetForm();
    };

    const handleDelete = (id: string) => {
        if (!confirm('Tem certeza que deseja remover este serviço?')) return;
        setProducts(products.filter(p => p.id !== id));
    };

    const getIcon = (category: string) => {
        const cls = "size-5";
        switch (category) {
            case 'floatation': return <Waves className={cls} />;
            case 'massage': return <Hand className={cls} />;
            case 'combo': return <Zap className={cls} />;
            case 'gift_card': return <Gift className={cls} />;
            case 'void_club': return <Crown className={cls} />;
            default: return <Tag className={cls} />;
        }
    };

    const getCategoryLabel = (cat: string) => {
        switch (cat) {
            case 'floatation': return 'FLOATATION';
            case 'massage': return 'MASSAGE';
            case 'combo': return 'COMBO';
            case 'gift_card': return 'GIFT CARD';
            case 'void_club': return 'VOID CLUB';
            default: return cat.toUpperCase();
        }
    };

    const filtered = useMemo(
        () => products.filter(p => p.name.toLowerCase().includes(search.toLowerCase())),
        [products, search]
    );

    const formatBRL = (value: number) =>
        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

    return (
        <div className="max-w-[1600px] mx-auto pb-10 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                        catálogo de serviços
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        gerencie preços, variações e metadados
                    </p>
                </div>
                <button
                    onClick={() => { resetForm(); setShowForm(true); }}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus className="size-4" />
                    novo serviço
                </button>
            </div>

            {/* Inline Form */}
            {showForm && (
                <div className="animate-in slide-in-from-top-4 duration-300">
                    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                        <div className="flex justify-between mb-6">
                            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                                {editingProduct ? <Edit2 size={18} /> : <Plus size={18} />}
                                {editingProduct ? 'editar serviço' : 'novo serviço'}
                            </h3>
                            <button
                                onClick={resetForm}
                                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Row 1: Name + Category */}
                            <div className="grid grid-cols-[2fr_1fr] gap-4">
                                <div>
                                    <label className="text-xs font-medium text-slate-600 mb-1.5 block">
                                        nome do serviço <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={form.name}
                                        onChange={e => setForm({ ...form, name: e.target.value })}
                                        placeholder="ex: flutuação avulsa"
                                        className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-slate-600 mb-1.5 block">categoria</label>
                                    <select
                                        value={form.category}
                                        onChange={e => setForm({ ...form, category: e.target.value })}
                                        className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 text-sm h-[38px] focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                    >
                                        <option value="floatation">flutuação</option>
                                        <option value="massage">massagem</option>
                                        <option value="combo">combo</option>
                                        <option value="gift_card">vale presente</option>
                                        <option value="void_club">void club</option>
                                        <option value="merchandise">produto</option>
                                    </select>
                                </div>
                            </div>

                            {/* Row: Color Picker */}
                            <div>
                                <label className="text-xs font-medium text-slate-600 mb-2 flex items-center gap-1.5">
                                    <Palette size={14} />
                                    cor do card (exibição)
                                </label>
                                <div className="flex items-center gap-3">
                                    <div className="flex gap-1.5">
                                        {['#80D6CF', '#AB542B', '#CCB0F0', '#2C677A', '#0F2A40', '#FF5200'].map((c) => (
                                            <button
                                                key={c}
                                                type="button"
                                                onClick={() => setForm({ ...form, color: c })}
                                                className={`w-7 h-7 rounded-lg border-2 transition-all duration-150 hover:scale-110 ${form.color === c ? 'border-blue-500 ring-2 ring-blue-500/25 scale-110' : 'border-slate-200'
                                                    }`}
                                                style={{ backgroundColor: c }}
                                            />
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-2 ml-2">
                                        <input
                                            type="color"
                                            value={form.color}
                                            onChange={e => setForm({ ...form, color: e.target.value })}
                                            className="w-7 h-7 rounded-md border border-slate-200 cursor-pointer"
                                        />
                                        <span className="text-xs font-mono text-slate-500 uppercase">{form.color}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Row 2: Price + Duration */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-medium text-slate-600 mb-1.5 block">
                                        preço base (r$) <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        required
                                        value={form.price}
                                        onChange={e => setForm({ ...form, price: e.target.value })}
                                        placeholder="0.00"
                                        className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                    />
                                    <p className="text-xs text-slate-400 mt-1">
                                        se houver variações, este é o preço 'a partir de'
                                    </p>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-slate-600 mb-1.5 block">duração (min)</label>
                                    <input
                                        type="number"
                                        value={form.durationMinutes}
                                        onChange={e => setForm({ ...form, durationMinutes: e.target.value })}
                                        placeholder="opcional"
                                        className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            {/* Variations */}
                            <div className="border-t border-slate-100 pt-6">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center gap-2">
                                        <Layers size={16} className="text-slate-400" />
                                        <span className="text-sm font-semibold text-slate-900">variações</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={addVariation}
                                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                                    >
                                        <Plus className="size-3.5" /> adicionar variação
                                    </button>
                                </div>

                                {variations.length === 0 && (
                                    <p className="text-sm text-slate-400 italic">
                                        nenhuma variação configurada. será usado o preço base.
                                    </p>
                                )}

                                <div className="space-y-3">
                                    {variations.map((v, idx) => (
                                        <div key={idx} className="grid grid-cols-[1.5fr_2fr_1fr_0.8fr_auto] gap-2 items-end p-3 bg-slate-50 rounded-lg border border-slate-100">
                                            <div>
                                                <label className="text-xs font-medium text-slate-500 mb-1 block">nome</label>
                                                <input
                                                    value={v.name}
                                                    onChange={e => updateVariation(idx, 'name', e.target.value)}
                                                    placeholder="ex: 3 sessões"
                                                    className="w-full px-2.5 py-1.5 rounded-md border border-slate-200 bg-white text-sm text-slate-900 focus:ring-2 focus:ring-blue-500/20 outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-medium text-slate-500 mb-1 block">descrição</label>
                                                <input
                                                    value={v.description || ''}
                                                    onChange={e => updateVariation(idx, 'description', e.target.value)}
                                                    placeholder="detalhes"
                                                    className="w-full px-2.5 py-1.5 rounded-md border border-slate-200 bg-white text-sm text-slate-900 focus:ring-2 focus:ring-blue-500/20 outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-medium text-slate-500 mb-1 block">preço</label>
                                                <input
                                                    type="number"
                                                    value={String(v.price ?? '')}
                                                    onChange={e => updateVariation(idx, 'price', Number(e.target.value))}
                                                    className="w-full px-2.5 py-1.5 rounded-md border border-slate-200 bg-white text-sm text-slate-900 focus:ring-2 focus:ring-blue-500/20 outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-medium text-slate-500 mb-1 block">sessões</label>
                                                <input
                                                    type="number"
                                                    value={String(v.sessions ?? '')}
                                                    onChange={e => updateVariation(idx, 'sessions', Number(e.target.value))}
                                                    placeholder="1"
                                                    className="w-full px-2.5 py-1.5 rounded-md border border-slate-200 bg-white text-sm text-slate-900 focus:ring-2 focus:ring-blue-500/20 outline-none"
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeVariation(idx)}
                                                className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Promotions */}
                            <div className="border-t border-slate-100 pt-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <Tag size={16} className="text-slate-400" />
                                    <span className="text-sm font-semibold text-slate-900">promoção geral</span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div>
                                        <label className="text-xs font-medium text-slate-600 mb-1.5 block">etiqueta</label>
                                        <input
                                            value={form.promoLabel}
                                            onChange={e => setForm({ ...form, promoLabel: e.target.value })}
                                            placeholder="ex: 20% OFF"
                                            className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-slate-600 mb-1.5 block">início</label>
                                        <input
                                            type="date"
                                            value={form.promoStartDate}
                                            onChange={e => setForm({ ...form, promoStartDate: e.target.value })}
                                            className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-slate-600 mb-1.5 block">fim</label>
                                        <input
                                            type="date"
                                            value={form.promoEndDate}
                                            onChange={e => setForm({ ...form, promoEndDate: e.target.value })}
                                            className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 justify-end pt-2">
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="px-4 py-2 text-sm font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                                >
                                    cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    {editingProduct ? 'salvar alterações' : 'criar serviço'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Search */}
            <div className="max-w-[400px]">
                <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="buscar serviço..."
                        className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                    />
                </div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filtered.map(p => (
                    <div
                        key={p.id}
                        className={`flex flex-col h-full min-h-[200px] bg-white rounded-xl border transition-all duration-200 group ${p.active
                            ? 'border-slate-200 hover:border-blue-300 hover:shadow-md'
                            : 'border-dashed border-slate-300 opacity-60'
                            }`}
                    >
                        <div className="p-5 flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2.5 rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm">
                                    {getIcon(p.category)}
                                </div>
                                {p.variations.length > 0 && (
                                    <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                                        {p.variations.length} variações
                                    </span>
                                )}
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-slate-900 leading-tight">
                                    {p.name.toLowerCase()}
                                </h3>
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">
                                    {getCategoryLabel(p.category)}
                                </p>
                            </div>

                            <div className="mt-auto pt-4">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-xl font-bold text-slate-900">
                                        {formatBRL(p.price)}
                                    </span>
                                    {p.variations.length > 0 && (
                                        <span className="text-xs text-slate-400">a partir de</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-slate-100 px-4 py-3 flex justify-between bg-slate-50/50 rounded-b-xl">
                            <button
                                onClick={() => openEdit(p)}
                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <Edit2 className="size-3.5" /> editar
                            </button>
                            <button
                                onClick={() => handleDelete(p.id)}
                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                            >
                                <Trash2 className="size-3.5" /> remover
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
