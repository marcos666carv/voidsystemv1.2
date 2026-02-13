import { Clock, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
    title: string;
    duration: string;
    price: string;
    benefitDescription: string;
    className?: string;
    onSelect?: () => void;
}

export function ServiceCard({
    title,
    duration,
    price,
    benefitDescription,
    className,
    onSelect,
}: ServiceCardProps) {
    return (
        <div
            onClick={onSelect}
            className={cn(
                "group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 cursor-pointer",
                className
            )}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

            <div className="relative z-10 space-y-4">
                <div className="flex items-start justify-between">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {title}
                    </h3>
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                        <Clock className="mr-1 h-3 w-3" />
                        {duration}
                    </span>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed">
                    {benefitDescription}
                </p>

                <div className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="mr-2 h-4 w-4 text-emerald-500" />
                    <span>Clinically proven benefits</span>
                </div>
            </div>

            <div className="relative z-10 mt-6 flex items-center justify-between border-t border-border pt-4">
                <span className="text-lg font-bold text-foreground">{price}</span>
                <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                    Book Now &rarr;
                </button>
            </div>
        </div>
    );
}
