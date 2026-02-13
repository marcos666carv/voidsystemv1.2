import { ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/database";
import { useCart } from "@/context/CartContext";
import { Button } from "../ui/button";

interface ProductCardProps {
    product: Product;
    className?: string;
}

export function ProductCard({
    product,
    className,
}: ProductCardProps) {
    const { addItem, toggleCart } = useCart();

    const handleAddToCart = () => {
        addItem({
            cartId: crypto.randomUUID(),
            type: 'product',
            product: product,
            quantity: 1,
            price: product.price
        });
        toggleCart();
    };

    return (
        <div
            className={cn(
                "group relative overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5",
                className
            )}
        >
            <div className="aspect-square overflow-hidden bg-muted relative">
                <img
                    src={product.image_url || ''}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                    <Button
                        onClick={handleAddToCart}
                        className="w-full rounded-full font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform flex items-center gap-2"
                    >
                        <ShoppingBag className="w-4 h-4" />
                        Add to Cart
                    </Button>
                </div>
            </div>

            <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                    <h3 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {product.name}
                    </h3>
                </div>
                <p className="text-sm font-semibold text-foreground">${product.price}</p>
            </div>
        </div>
    );
}
