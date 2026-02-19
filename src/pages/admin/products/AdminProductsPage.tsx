import React, { useState, useMemo } from 'react';
import {
    Package,
    Edit2,
    Trash2,
    Plus,
    Search,
    ShoppingBag,
    Image as ImageIcon,
    X,
    Layers,
    Save,
    UploadCloud
} from 'lucide-react';
import { MOCK_PRODUCTS } from '@/lib/mockData';
import type { Product, ProductVariant } from '@/types/database';

// ─── Component ──────────────────────────────────────────────────

export default function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [search, setSearch] = useState('');

    // Form state
    const [form, setForm] = useState<{
        name: string;
        description: string;
        price: string;
        current_stock: string;
        image_url: string;
        sku: string;
    }>({
        name: '',
        description: '',
        price: '',
        current_stock: '',
        image_url: '',
        sku: '',
    });

    const [variations, setVariations] = useState<ProductVariant[]>([]);

    const resetForm = () => {
        setForm({
            name: '', description: '', price: '', current_stock: '', image_url: '', sku: ''
        });
        setVariations([]);
        setEditingProduct(null);
        setShowForm(false);
    };

    const openEdit = (p: Product) => {
        setEditingProduct(p);
        setForm({
            name: p.name,
            description: p.description || '',
            price: String(p.price),
            current_stock: String(p.current_stock),
            image_url: p.image_url || '',
            sku: p.sku || '',
        });
        setVariations(p.variants ? [...p.variants] : []);
        setShowForm(true);
    };

    const addVariation = () => {
        const newVariant: ProductVariant = {
            id: `v-${Date.now()}`,
            product_id: editingProduct?.id || 'temp',
            name: '',
            type: 'custom',
            price: Number(form.price) || 0,
            stock: 0,
            sku: '',
            image_url: null,
            active: true
        };
        setVariations([...variations, newVariant]);
    };

    const updateVariation = (idx: number, field: keyof ProductVariant, value: string | number | boolean | null) => {
        const updated = [...variations];
        updated[idx] = { ...updated[idx], [field]: value };
        setVariations(updated);
    };

    const removeVariation = (idx: number) => {
        setVariations(variations.filter((_, i) => i !== idx));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Calculate total stock if variations exist
        const calculatedStock = variations.length > 0
            ? variations.reduce((acc, v) => acc + v.stock, 0)
            : Number(form.current_stock);

        const payload: Product = {
            id: editingProduct?.id || `prod-${Date.now()}`,
            name: form.name,
            description: form.description,
            price: Number(form.price),
            current_stock: calculatedStock,
            image_url: form.image_url || null,
            sku: form.sku || null,
            active: true,
            variants: variations.length > 0 ? variations : undefined,
        };

        if (editingProduct) {
            setProducts(products.map(p => p.id === editingProduct.id ? payload : p));
        } else {
            setProducts([...products, payload]);
        }
        resetForm();
    };

    const handleDelete = (id: string) => {
        if (!confirm('Tem certeza que deseja remover este produto?')) return;
        setProducts(products.filter(p => p.id !== id));
    };

    const filtered = useMemo(
        () => products.filter(p => p.name.toLowerCase().includes(search.toLowerCase())),
        [products, search]
    );

    const formatBRL = (value: number) =>
        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

    // Simulated image upload handler
    const handleImageUpload = (idx: number | null) => {
        // In a real app, this would open a file picker.
        // For now, we'll prompt for a URL or just set a placeholder.
        const url = prompt("Cole a URL da imagem (simulação de upload):", "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600");
        if (url) {
            if (idx === null) {
                setForm({ ...form, image_url: url });
            } else {
                updateVariation(idx, 'image_url', url);
            }
        }
    };

    return (
        <div className="max-w-[1600px] mx-auto pb-10 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                        <ShoppingBag className="size-8 text-blue-600" />
                        catálogo de produtos
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        gerencie estoque, variações e fotos
                    </p>
                </div>
                <button
                    onClick={() => { resetForm(); setShowForm(true); }}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200"
                >
                    <Plus className="size-4" />
                    novo produto
                </button>
            </div>

            {/* Inline Form */}
            {showForm && (
                <div className="animate-in slide-in-from-top-4 duration-300">
                    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                        <div className="flex justify-between mb-6">
                            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                                {editingProduct ? <Edit2 size={18} /> : <Plus size={18} />}
                                {editingProduct ? 'editar produto' : 'novo produto'}
                            </h3>
                            <button
                                onClick={resetForm}
                                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
                                {/* Left Column: Main Image */}
                                <div>
                                    <label className="text-xs font-medium text-slate-600 mb-2 block">foto principal</label>
                                    <div
                                        onClick={() => handleImageUpload(null)}
                                        className="aspect-square bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-all group relative overflow-hidden"
                                    >
                                        {form.image_url ? (
                                            <img src={form.image_url} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <>
                                                <UploadCloud className="size-8 text-slate-400 group-hover:text-blue-500 mb-2 transition-colors" />
                                                <span className="text-xs text-slate-500 group-hover:text-blue-600 text-center px-4">
                                                    clique para upload
                                                </span>
                                            </>
                                        )}
                                        {form.image_url && (
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                <span className="text-white text-xs font-medium">trocar foto</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Right Column: Fields */}
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="md:col-span-2">
                                            <label className="text-xs font-medium text-slate-600 mb-1.5 block">nome do produto <span className="text-red-500">*</span></label>
                                            <input
                                                required
                                                value={form.name}
                                                onChange={e => setForm({ ...form, name: e.target.value })}
                                                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                                placeholder="ex: Camiseta Void"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="text-xs font-medium text-slate-600 mb-1.5 block">descrição</label>
                                            <textarea
                                                value={form.description}
                                                onChange={e => setForm({ ...form, description: e.target.value })}
                                                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none h-20"
                                                placeholder="detalhes do produto"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-medium text-slate-600 mb-1.5 block">preço base (R$)</label>
                                            <input
                                                type="number"
                                                required
                                                value={form.price}
                                                onChange={e => setForm({ ...form, price: e.target.value })}
                                                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                                placeholder="0.00"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-medium text-slate-600 mb-1.5 block">
                                                {variations.length > 0 ? "estoque total (calculado)" : "estoque atual"}
                                            </label>
                                            <input
                                                type="number"
                                                disabled={variations.length > 0}
                                                value={variations.length > 0 ? variations.reduce((acc, v) => acc + v.stock, 0) : form.current_stock}
                                                onChange={e => setForm({ ...form, current_stock: e.target.value })}
                                                className={`w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all ${variations.length > 0 ? 'bg-slate-100 text-slate-500' : 'bg-white'}`}
                                                placeholder="0"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-medium text-slate-600 mb-1.5 block">SKU (opcional)</label>
                                            <input
                                                value={form.sku}
                                                onChange={e => setForm({ ...form, sku: e.target.value })}
                                                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                                placeholder="COD-001"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Variations Section */}
                            <div className="border-t border-slate-100 pt-6">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center gap-2">
                                        <Layers size={16} className="text-slate-400" />
                                        <span className="text-sm font-semibold text-slate-900">variações de produto</span>
                                        <span className="text-xs text-slate-400 font-normal ml-2">
                                            (cor, tamanho, peso, etc)
                                        </span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={addVariation}
                                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                                    >
                                        <Plus className="size-3.5" /> adicionar variação
                                    </button>
                                </div>

                                {variations.length === 0 ? (
                                    <div className="text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                                        <p className="text-sm text-slate-400">
                                            Sem variações adicionadas. O produto será simples.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {variations.map((v, idx) => (
                                            <div key={idx} className="bg-slate-50 rounded-lg border border-slate-200 p-4 transition-all hover:border-blue-200 hover:shadow-sm">
                                                <div className="flex items-start gap-4">
                                                    {/* Variant Image */}
                                                    <div
                                                        onClick={() => handleImageUpload(idx)}
                                                        className="w-16 h-16 rounded-lg border border-slate-200 bg-white flex items-center justify-center cursor-pointer overflow-hidden relative group shrink-0"
                                                    >
                                                        {v.image_url ? (
                                                            <img src={v.image_url} alt="" className="w-full h-full object-cover" />
                                                        ) : (
                                                            <ImageIcon className="size-6 text-slate-300 group-hover:text-blue-400 transition-colors" />
                                                        )}
                                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                            <Plus className="size-4 text-white" />
                                                        </div>
                                                    </div>

                                                    {/* Fields */}
                                                    <div className="flex-1 grid grid-cols-2 md:grid-cols-5 gap-3">
                                                        <div>
                                                            <label className="text-[10px] font-medium text-slate-500 mb-1 block uppercase">Tipo</label>
                                                            <select
                                                                value={v.type}
                                                                onChange={e => updateVariation(idx, 'type', e.target.value)}
                                                                className="w-full px-2 py-1.5 rounded border border-slate-200 text-xs bg-white"
                                                            >
                                                                <option value="color">Cor</option>
                                                                <option value="size">Tamanho</option>
                                                                <option value="weight">Peso</option>
                                                                <option value="custom">Outro</option>
                                                            </select>
                                                        </div>
                                                        <div>
                                                            <label className="text-[10px] font-medium text-slate-500 mb-1 block uppercase">Nome/Valor</label>
                                                            <input
                                                                value={v.name}
                                                                onChange={e => updateVariation(idx, 'name', e.target.value)}
                                                                placeholder="ex: Preto, GG"
                                                                className="w-full px-2 py-1.5 rounded border border-slate-200 text-xs"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="text-[10px] font-medium text-slate-500 mb-1 block uppercase">Preço (R$)</label>
                                                            <input
                                                                type="number"
                                                                value={v.price}
                                                                onChange={e => updateVariation(idx, 'price', Number(e.target.value))}
                                                                className="w-full px-2 py-1.5 rounded border border-slate-200 text-xs"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="text-[10px] font-medium text-slate-500 mb-1 block uppercase">Estoque</label>
                                                            <input
                                                                type="number"
                                                                value={v.stock}
                                                                onChange={e => updateVariation(idx, 'stock', Number(e.target.value))}
                                                                className="w-full px-2 py-1.5 rounded border border-slate-200 text-xs"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="text-[10px] font-medium text-slate-500 mb-1 block uppercase">SKU</label>
                                                            <input
                                                                value={v.sku || ''}
                                                                onChange={e => updateVariation(idx, 'sku', e.target.value)}
                                                                className="w-full px-2 py-1.5 rounded border border-slate-200 text-xs"
                                                            />
                                                        </div>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        onClick={() => removeVariation(idx)}
                                                        className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors mt-4"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Footer Actions */}
                            <div className="flex gap-3 justify-end pt-4 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="px-4 py-2 text-sm font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                                >
                                    cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                                >
                                    <Save size={16} />
                                    {editingProduct ? 'Salvar Produto' : 'Criar Produto'}
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
                        placeholder="buscar produto por nome, sku..."
                        className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                    />
                </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.map(p => (
                    <div
                        key={p.id}
                        className={`flex flex-col bg-white rounded-xl border transition-all duration-200 group hover:border-blue-300 hover:shadow-lg overflow-hidden ${p.active ? 'border-slate-200' : 'border-dashed border-slate-300 opacity-70'
                            }`}
                    >
                        {/* Card Image */}
                        <div className="h-48 w-full bg-slate-100 relative overflow-hidden">
                            {p.image_url ? (
                                <img src={p.image_url} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-400">
                                    <Package size={32} />
                                </div>
                            )}
                            <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold shadow-sm">
                                {formatBRL(p.price)}
                            </div>
                        </div>

                        <div className="p-4 flex-1 flex flex-col">
                            <h3 className="font-bold text-slate-900 mb-1">{p.name}</h3>
                            <p className="text-xs text-slate-500 line-clamp-2 min-h-[2.5em]">{p.description}</p>

                            {/* Stock & Info */}
                            <div className="mt-4 flex items-center justify-between text-xs text-slate-600">
                                <div className="flex items-center gap-1.5">
                                    <Package size={14} className="text-slate-400" />
                                    <span>{p.current_stock} em estoque</span>
                                </div>
                                {p.variants && p.variants.length > 0 && (
                                    <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">
                                        {p.variants.length} variações
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="border-t border-slate-100 px-4 py-3 flex justify-between bg-slate-50/50">
                            <button
                                onClick={() => openEdit(p)}
                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
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
