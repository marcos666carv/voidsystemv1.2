import { Link } from 'react-router-dom';
import { Waves, Hand, Sparkles, Gift, ArrowRight, type LucideIcon } from 'lucide-react';
import { useRef } from 'react';

const ICON_MAP: Record<string, LucideIcon> = {
    waves: Waves,
    hand: Hand,
    sparkles: Sparkles,
    gift: Gift,
};

interface CategoryCardProps {
    title: string;
    description: string;
    icon: string;
    href: string;
    startingPrice: number;
    color?: string;
    titleColor?: string;
}

export function CategoryCard({ title, description, icon, href, startingPrice, color = '#B0D6CF', titleColor = '#08283B' }: CategoryCardProps) {
    const Icon = ICON_MAP[icon] || Sparkles;
    const titleRef = useRef<HTMLHeadingElement>(null);
    const titleWrapRef = useRef<HTMLDivElement>(null);
    const iconSvgRef = useRef<SVGSVGElement>(null);

    return (
        <Link
            to={href}
            className="group relative flex flex-col rounded-2xl transition-all duration-500 ease-in-out bg-white border border-slate-200 overflow-hidden"
            onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.backgroundColor = color;
                // el.style.boxShadow = `0 8px 30px -5px ${color}80, 0 20px 40px -10px ${color}60`; // Removed glow per request
                if (titleRef.current) titleRef.current.style.color = titleColor;
                if (iconSvgRef.current) iconSvgRef.current.style.color = titleColor;
            }}
            onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.backgroundColor = '';
                // el.style.boxShadow = ''; // Removed glow per request
                if (titleRef.current) titleRef.current.style.color = '';
                if (iconSvgRef.current) iconSvgRef.current.style.color = '';
            }}
        >
            {/* Main content */}
            <div className="p-6 pb-[24px] flex flex-col gap-4 flex-1">
                {/* Icon — box gone on hover, icon grows to fill */}
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 transition-all duration-0 delay-[400ms] ease-in-out group-hover:duration-100 group-hover:delay-0 group-hover:bg-transparent group-hover:border-transparent">
                    <Icon
                        ref={iconSvgRef}
                        className="h-5 w-5 text-slate-600 transition-all duration-500 ease-in-out group-hover:h-9 group-hover:w-9"
                    />
                </div>

                {/* Title + Description */}
                <div ref={titleWrapRef} className="space-y-1.5 transition-all duration-500 ease-in-out">
                    <h3
                        ref={titleRef}
                        className="text-xl font-bold text-slate-900 tracking-tight transition-all duration-500 ease-in-out origin-top-left group-hover:scale-[1.20]"
                    >
                        {title}
                    </h3>
                    {/* Description — hides on hover */}
                    <p className="text-sm text-slate-500 leading-relaxed transition-all duration-500 ease-in-out opacity-100 group-hover:opacity-0 overflow-hidden">
                        {description}
                    </p>
                </div>
            </div>

            {/* Footer wrapper — fixed height */}
            <div className="relative h-12 border-t border-slate-100 transition-all duration-500 ease-in-out group-hover:border-transparent">
                {/* Default: price + "comprar" */}
                {/* Text slides out to LEFT (-translate-x-4) on hover */}
                <div className="absolute inset-0 px-6 flex items-center justify-between transition-all duration-500 ease-in-out group-hover:opacity-0 group-hover:-translate-x-4">
                    <span className="text-xs text-slate-400">
                        a partir de <span className="font-semibold text-slate-700">R$ {startingPrice}</span>
                    </span>
                    <span className="flex items-center gap-1 text-sm font-medium text-slate-500">
                        comprar
                        <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                </div>

                {/* Hover: "comprar" CTA background */}
                {/* Background wipes in from RIGHT (translate-x-full) to LEFT (0) */}
                <div
                    className="absolute inset-0 translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0"
                    style={{ backgroundColor: titleColor }}
                />

                {/* Hover: "comprar" CTA text */}
                <div
                    className="absolute inset-0 flex items-center justify-start px-6 gap-2 text-sm font-semibold opacity-0 translate-x-8 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:translate-x-0"
                    style={{ color: color }}
                >
                    comprar
                    <ArrowRight className="h-4 w-4" />
                </div>
            </div>
        </Link>
    );
}
