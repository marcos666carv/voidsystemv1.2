import { useState } from 'react';
import { Search, Receipt, CreditCard, Banknote, QrCode, User, ShoppingBag, X, Check } from 'lucide-react';

interface CartItem {
    id: string;
    name: string;
    price: number;
    qty: number;
}

const QUICK_PRODUCTS = [
    { id: 'float-60', name: 'Flutuação 60min', price: 18900, category: 'serviço' },
    { id: 'float-90', name: 'Flutuação 90min', price: 24900, category: 'serviço' },
    { id: 'massage-60', name: 'Massagem 60min', price: 15900, category: 'serviço' },
    { id: 'combo', name: 'Combo Float + Massagem', price: 32900, category: 'serviço' },
    { id: 'pack-5', name: 'Pacote 5 Sessões', price: 84500, category: 'pacote' },
    { id: 'pack-10', name: 'Pacote 10 Sessões', price: 159000, category: 'pacote' },
    { id: 'gift', name: 'Gift Card R$200', price: 20000, category: 'gift' },
    { id: 'product-1', name: 'Sal Epsom 1kg', price: 3900, category: 'produto' },
];

const PAYMENT_METHODS = [
    { id: 'pix', label: 'PIX', icon: QrCode },
    { id: 'credit', label: 'Crédito', icon: CreditCard },
    { id: 'debit', label: 'Débito', icon: CreditCard },
    { id: 'cash', label: 'Dinheiro', icon: Banknote },
];

export function SalesPage() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [searchClient, setSearchClient] = useState('');
    const [selectedClient, setSelectedClient] = useState<{ id: string; name: string } | null>(null);
    const [paymentMethod, setPaymentMethod] = useState('pix');
    const [showSuccess, setShowSuccess] = useState(false);

    const addToCart = (product: typeof QUICK_PRODUCTS[0]) => {
        setCart(prev => {
            const existing = prev.find(i => i.id === product.id);
            if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
            return [...prev, { id: product.id, name: product.name, price: product.price, qty: 1 }];
        });
    };

    const removeFromCart = (id: string) => setCart(prev => prev.filter(i => i.id !== id));
    const updateQty = (id: string, qty: number) => {
        if (qty < 1) return removeFromCart(id);
        setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
    };

    const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    const formatPrice = (cents: number) => `R$ ${(cents / 100).toFixed(2).replace('.', ',')}`;

    const handleFinalize = () => {
        // TODO: call salesApi.create()
        setShowSuccess(true);
        setTimeout(() => {
            setShowSuccess(false);
            setCart([]);
            setSelectedClient(null);
        }, 2000);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">ponto de venda</h1>
                    <p className="text-sm text-slate-500">registrar vendas e pagamentos</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-5 gap-6">
                {/* Products */}
                <div className="lg:col-span-3 space-y-4">
                    <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">produtos e serviços</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {QUICK_PRODUCTS.map((product) => (
                            <button
                                key={product.id}
                                onClick={() => addToCart(product)}
                                className="p-3 bg-white rounded-xl border border-slate-200 text-left hover:border-slate-400 hover:shadow-sm transition-all group"
                            >
                                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">{product.category}</span>
                                <p className="text-sm font-medium text-slate-900 mt-1 group-hover:text-slate-700">{product.name}</p>
                                <p className="text-xs text-slate-500 mt-0.5">{formatPrice(product.price)}</p>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Cart */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl border border-slate-200 p-5 sticky top-6">
                        {/* Client */}
                        <div className="mb-4">
                            <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">cliente</label>
                            {selectedClient ? (
                                <div className="flex items-center justify-between mt-1.5 p-2.5 bg-emerald-50 rounded-lg border border-emerald-200">
                                    <div className="flex items-center gap-2">
                                        <User className="h-4 w-4 text-emerald-600" />
                                        <span className="text-sm font-medium text-emerald-800">{selectedClient.name}</span>
                                    </div>
                                    <button onClick={() => setSelectedClient(null)}>
                                        <X className="h-3.5 w-3.5 text-emerald-600" />
                                    </button>
                                </div>
                            ) : (
                                <div className="relative mt-1.5">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <input
                                        type="text"
                                        value={searchClient}
                                        onChange={(e) => setSearchClient(e.target.value)}
                                        placeholder="buscar cliente..."
                                        className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Items */}
                        <div className="border-t border-slate-100 pt-4">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">carrinho</span>
                                <span className="text-xs text-slate-400">{cart.length} itens</span>
                            </div>

                            {cart.length === 0 ? (
                                <div className="py-8 text-center">
                                    <ShoppingBag className="h-8 w-8 text-slate-200 mx-auto mb-2" />
                                    <p className="text-sm text-slate-400">carrinho vazio</p>
                                </div>
                            ) : (
                                <div className="space-y-2 max-h-64 overflow-y-auto">
                                    {cart.map((item) => (
                                        <div key={item.id} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-slate-800 truncate">{item.name}</p>
                                                <p className="text-xs text-slate-500">{formatPrice(item.price)}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button onClick={() => updateQty(item.id, item.qty - 1)} className="h-6 w-6 rounded bg-white border border-slate-200 text-xs font-medium">−</button>
                                                <span className="text-sm font-medium w-5 text-center">{item.qty}</span>
                                                <button onClick={() => updateQty(item.id, item.qty + 1)} className="h-6 w-6 rounded bg-white border border-slate-200 text-xs font-medium">+</button>
                                                <button onClick={() => removeFromCart(item.id)} className="ml-1">
                                                    <X className="h-3.5 w-3.5 text-slate-400" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Payment */}
                        {cart.length > 0 && (
                            <>
                                <div className="border-t border-slate-100 pt-4 mt-4">
                                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">pagamento</span>
                                    <div className="grid grid-cols-4 gap-2 mt-2">
                                        {PAYMENT_METHODS.map(({ id, label, icon: Icon }) => (
                                            <button
                                                key={id}
                                                onClick={() => setPaymentMethod(id)}
                                                className={`p-2 rounded-lg border text-center transition-all ${paymentMethod === id ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 text-slate-600 hover:border-slate-400'
                                                    }`}
                                            >
                                                <Icon className="h-4 w-4 mx-auto mb-0.5" />
                                                <span className="text-[10px] font-medium">{label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="border-t border-slate-100 pt-4 mt-4">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-sm font-semibold text-slate-900">total</span>
                                        <span className="text-xl font-bold text-slate-900">{formatPrice(subtotal)}</span>
                                    </div>

                                    <button
                                        onClick={handleFinalize}
                                        disabled={showSuccess}
                                        className="w-full py-3 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        {showSuccess ? (
                                            <><Check className="h-4 w-4" /> venda registrada!</>
                                        ) : (
                                            <><Receipt className="h-4 w-4" /> finalizar venda</>
                                        )}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
