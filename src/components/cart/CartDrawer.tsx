import { useCart } from "@/context/CartContext";
import { X, ShoppingBag, Trash2, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CartDrawer() {
    const { state, toggleCart, removeItem, updateQuantity, subtotal } = useCart();
    const { items, isOpen } = state;

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={toggleCart}
            />

            {/* Drawer */}
            <div className="relative w-full max-w-md bg-background shadow-xl animate-in slide-in-from-right duration-300 flex flex-col h-full border-l border-border">
                <div className="flex items-center justify-between p-4 border-b border-border">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5" />
                        Your Cart
                    </h2>
                    <Button variant="ghost" size="icon" onClick={toggleCart}>
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-muted-foreground space-y-4">
                            <ShoppingBag className="w-12 h-12 opacity-20" />
                            <p>Your cart is empty.</p>
                            <Button variant="outline" onClick={toggleCart}>Continue Shopping</Button>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={item.cartId} className="flex gap-4 p-3 rounded-lg border border-border bg-card/50">
                                {/* Image Placeholder based on type */}
                                <div className="w-20 h-20 rounded-md bg-muted flex-shrink-0 overflow-hidden">
                                    {item.type === 'product' && <img src={item.product?.image_url || ''} alt={item.product.name} className="w-full h-full object-cover" />}
                                    {item.type === 'service' && <div className="w-full h-full bg-violet-500/10 flex items-center justify-center text-violet-500 font-bold text-xs p-1 text-center">{item.service.name}</div>}
                                    {item.type === 'combo' && <div className="w-full h-full bg-indigo-500/10 flex items-center justify-center text-indigo-500 font-bold text-xs">COMBO</div>}
                                    {item.type === 'gift_card' && <div className="w-full h-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 font-bold text-xs">GIFT</div>}
                                </div>

                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-medium text-sm">
                                            {item.type === 'product' ? item.product.name :
                                                item.type === 'service' ? `${item.service.name} (${item.sessionsCount}x)` :
                                                    item.type === 'combo' ? item.title :
                                                        'Gift Card'}
                                        </h3>
                                        <p className="text-xs text-muted-foreground">
                                            {item.type === 'service' && `${item.sessionsCount} Sessions`}
                                            {item.type === 'combo' && 'Float + Massage'}
                                            {item.type === 'gift_card' && `Value: $${item.value}`}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center gap-2">
                                            <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.cartId, item.quantity - 1)}>
                                                <Minus className="w-3 h-3" />
                                            </Button>
                                            <span className="text-sm w-4 text-center">{item.quantity}</span>
                                            <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.cartId, item.quantity + 1)}>
                                                <Plus className="w-3 h-3" />
                                            </Button>
                                        </div>
                                        <div className="font-medium text-sm">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </div>
                                    </div>
                                </div>

                                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive h-6 w-6" onClick={() => removeItem(item.cartId)}>
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        ))
                    )}
                </div>

                {items.length > 0 && (
                    <div className="p-4 border-t border-border space-y-4 bg-background">
                        <div className="flex justify-between items-center text-lg font-bold">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <Button className="w-full" size="lg">Checkout</Button>
                    </div>
                )}
            </div>
        </div>
    );
}
