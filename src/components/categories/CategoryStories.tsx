import { useNavigate } from 'react-router-dom';
import { Waves, Hand, Sparkles, Gift, type LucideIcon } from 'lucide-react';
import { SERVICE_CATEGORIES, type ServiceCategory } from '@/lib/mockData';

const ICON_MAP: Record<string, LucideIcon> = {
    waves: Waves,
    hand: Hand,
    sparkles: Sparkles,
    gift: Gift,
};

interface CategoryStoriesProps {
    /** Se fornecido, controla seleção sem navegar */
    selectedId?: string;
    onSelect?: (category: ServiceCategory) => void;
    /** Classes extras no wrapper externo */
    className?: string;
}

export function CategoryStories({ selectedId, onSelect, className = '' }: CategoryStoriesProps) {
    const navigate = useNavigate();

    const handleClick = (cat: ServiceCategory) => {
        if (onSelect) {
            onSelect(cat);
        } else {
            navigate(cat.href);
        }
    };

    return (
        <div className={`flex items-start gap-6 overflow-x-auto pb-2 scrollbar-none ${className}`}>
            {SERVICE_CATEGORIES.map((cat) => {
                const Icon = ICON_MAP[cat.icon] || Sparkles;
                const isSelected = selectedId === cat.id;

                return (
                    <button
                        key={cat.id}
                        onClick={() => handleClick(cat)}
                        className="flex flex-col items-center gap-2.5 shrink-0 group focus:outline-none"
                        style={{ minWidth: '80px' }}
                    >
                        {/* Story ring + circle */}
                        <div
                            className="relative p-[3px] rounded-full transition-transform duration-300 ease-out group-hover:scale-105 group-active:scale-95"
                            style={{
                                background: isSelected
                                    ? `conic-gradient(${cat.titleColor} 0%, ${cat.color} 50%, ${cat.titleColor} 100%)`
                                    : `conic-gradient(${cat.color}CC 0%, ${cat.color}44 100%)`,
                                boxShadow: isSelected
                                    ? `0 0 0 2px white, 0 4px 20px -4px ${cat.color}99`
                                    : undefined,
                            }}
                        >
                            {/* Inner circle */}
                            <div
                                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-colors duration-300"
                                style={{
                                    backgroundColor: isSelected ? cat.color : `${cat.color}22`,
                                    border: `2px solid white`,
                                }}
                            >
                                <Icon
                                    className="transition-all duration-300 ease-out group-hover:scale-110"
                                    style={{
                                        width: '28px',
                                        height: '28px',
                                        color: isSelected ? cat.titleColor : cat.titleColor,
                                    }}
                                />
                            </div>
                        </div>

                        {/* Label */}
                        <span
                            className="text-xs font-semibold text-center leading-tight transition-colors duration-300"
                            style={{
                                color: isSelected ? cat.titleColor : '#64748b',
                                maxWidth: '72px',
                            }}
                        >
                            {cat.title}
                        </span>

                        {/* Price */}
                        <span className="text-[10px] text-slate-400 -mt-1.5">
                            R$ {cat.startingPrice}+
                        </span>
                    </button>
                );
            })}
        </div>
    );
}
