import { Star, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
    title: string;
    price: string;
    imageUrl: string;
    rating?: number;
    className?: string;
    onAddToCart?: () => void;
}

export function ProductCard({
    title,
    price,
    imageUrl,
    rating = 5,
    className,
    onAddToCart,
}: ProductCardProps) {
    return (
        <div
            className={cn(
                "group relative overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5",
                className
            )}
        >
            <div className="aspect-square overflow-hidden bg-muted relative">
                <img
                    src={imageUrl}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                        onClick={onAddToCart}
                        className="bg-primary text-primary-foreground px-4 py-2 rounded-full font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform flex items-center gap-2"
                    >
                        <ShoppingBag className="w-4 h-4" />
                        Add to Cart
                    </button>
                </div>
            </div>

            <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                    <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {title}
                    </h3>
                    <div className="flex items-center text-amber-500">
                        <Star className="h-3 w-3 fill-current" />
                        <span className="ml-1 text-xs font-medium text-muted-foreground">{rating.toFixed(1)}</span>
                    </div>
                </div>
                <p className="text-sm font-semibold text-foreground">{price}</p>
            </div>
        </div>
    );
}
