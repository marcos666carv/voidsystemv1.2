import { useCart } from "@/context/CartContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";

export function CartDrawer() {
    const { state, toggleCart, updateQuantity, removeItem, subtotal } = useCart();

    return (
        <Sheet open={state.isOpen} onOpenChange={toggleCart}>
            <SheetContent className="flex flex-col h-full w-full sm:max-w-md">
                <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                        <ShoppingCart className="h-5 w-5" />
                        Your Cart
                    </SheetTitle>
                    <SheetDescription>
                        {state.items.length === 0 ? "Your cart is currently empty." : `You have ${state.items.length} items.`}
                    </SheetDescription>
                </SheetHeader>

                <ScrollArea className="flex-1 -mx-6 px-6 my-4">
                    {state.items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-48 text-muted-foreground space-y-2">
                            <ShoppingCart className="h-12 w-12 opacity-20" />
                            <p>Start adding items to see them here.</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {state.items.map((item) => (
                                <div key={item.cartId} className="flex gap-4">
                                    {/* Image Placeholder or Icon */}
                                    <div className="h-16 w-16 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200">
                                        {item.type === 'service' && <span className="text-2xl">🧘</span>}
                                        {item.type === 'product' && <img src={item.product?.image_url || ''} alt={item.product?.name} className="h-full w-full object-cover rounded-lg" />}
                                        {item.type === 'combo' && <span className="text-2xl">✨</span>}
                                        {item.type === 'gift_card' && <span className="text-2xl">🎁</span>}
                                    </div>

                                    <div className="flex-1 space-y-1">
                                        {/* Title & Desc */}
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-medium text-sm text-slate-900 line-clamp-2">
                                                {item.type === 'service' ? item.service?.name : ''}
                                                {item.type === 'product' ? item.product?.name : ''}
                                                {item.type === 'combo' ? item.title : ''}
                                                {item.type === 'gift_card' ? `Gift Card ($${item.value})` : ''}
                                            </h4>
                                            <p className="font-mono text-sm font-medium">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>

                                        {/* Meta details */}
                                        <p className="text-xs text-muted-foreground">
                                            {item.type === 'service' && item.sessionsCount > 1 && `${item.sessionsCount} Sessions Pack`}
                                            {item.type === 'combo' && `Float: ${item.slots?.float.time} • Massage: ${item.slots?.massage.time}`}
                                        </p>

                                        {/* Controls */}
                                        <div className="flex items-center justify-between pt-2">
                                            <div className="flex items-center border border-slate-200 rounded-md">
                                                <button
                                                    onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                                                    className="p-1 hover:bg-slate-50 disabled:opacity-50"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus className="h-3 w-3" />
                                                </button>
                                                <span className="text-xs font-mono w-6 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                                                    className="p-1 hover:bg-slate-50"
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeItem(item.cartId)}
                                                className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1"
                                            >
                                                <Trash2 className="h-3 w-3" />
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </ScrollArea>

                <div className="space-y-4 pt-6 border-t border-slate-100">
                    <div className="flex justify-between items-center text-lg font-semibold">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <Button className="w-full bg-violet-600 hover:bg-violet-700 h-12 text-base font-semibold" disabled={state.items.length === 0}>
                        Checkout Now
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
}
