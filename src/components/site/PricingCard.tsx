import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Typography } from './Typography';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface SitePricingCardProps {
    title: string;
    originalPrice?: number;
    promotionalPrice: number;
    validityMonths: number;
    installments: number;
    buttonLabel: string;
    /** Rota interna (React Router) ou URL externa */
    buttonHref: string;
    /** Classe de cor do título — ex: "text-[#008CFF]" */
    titleColor?: string;
    /** Classe de borda — ex: "border-[#008CFF]" */
    borderColor?: string;
    className?: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatCurrency(value: number) {
    return `r$${value}`;
}

function buildValidityText(months: number) {
    return months === 1 ? '1 mês de validade' : `${months} meses de validade e até `;
}

function buildInstallmentsText(installments: number) {
    return installments > 1 ? `${installments}x sem juros` : undefined;
}

// ─── Component ───────────────────────────────────────────────────────────────

export function SitePricingCard({
    title,
    originalPrice,
    promotionalPrice,
    validityMonths,
    installments,
    buttonLabel,
    buttonHref,
    titleColor,
    borderColor,
    className,
}: SitePricingCardProps) {
    const hasDiscount = originalPrice !== undefined && originalPrice > promotionalPrice;
    const pricePrefix = hasDiscount ? `de ${formatCurrency(originalPrice!)} por ` : undefined;
    const finalPrice = formatCurrency(promotionalPrice);
    const validityText = buildValidityText(validityMonths);
    const installmentsText = buildInstallmentsText(installments);

    const isExternal = buttonHref.startsWith('http');

    return (
        <div
            className={cn(
                'flex flex-col rounded-3xl border overflow-hidden bg-[--color-alabaster] w-full',
                borderColor,
                className,
            )}
        >
            {/* Título */}
            <Typography
                as="h3"
                variant="heading2"
                className={cn(
                    'flex justify-center items-center font-semibold text-amber-50 p-4 min-h-[72px] md:min-h-[60px] text-center leading-snug',
                    titleColor,
                )}
            >
                {title}
            </Typography>

            {/* Preço */}
            <div className="flex flex-wrap items-center justify-center gap-1 px-4 py-6">
                {pricePrefix && (
                    <Typography as="span" variant="body" className="font-jakob text-[--color-gunmetal] text-center text-[clamp(12px,2vw,16px)]">
                        {pricePrefix}
                    </Typography>
                )}
                <Typography as="span" variant="body" weight="bold" className="font-jakob text-[--color-gunmetal] text-center text-[clamp(12px,2vw,16px)]">
                    {finalPrice}
                </Typography>
            </div>

            {/* CTA */}
            <div className="w-full flex flex-col items-center justify-center gap-4 px-4 py-6">
                {isExternal ? (
                    <a
                        href={buttonHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-full h-10 m-2 rounded-full bg-[--color-mauve] text-[--color-gunmetal] font-jakob font-semibold hover:opacity-90 transition-opacity"
                    >
                        <Typography as="span" variant="body" weight="semibold" className="font-jakob normal-case text-[clamp(11px,1.8vw,13px)]">
                            {buttonLabel}
                        </Typography>
                    </a>
                ) : (
                    <Link
                        to={buttonHref}
                        className="flex items-center justify-center w-full h-10 m-2 rounded-full bg-[--color-mauve] text-[--color-gunmetal] font-jakob font-semibold hover:opacity-90 transition-opacity"
                    >
                        <Typography as="span" variant="body" weight="semibold" className="font-jakob normal-case text-[clamp(11px,1.8vw,13px)]">
                            {buttonLabel}
                        </Typography>
                    </Link>
                )}

                <Typography as="p" variant="bodySm" className="font-jakob text-center tracking-tight leading-snug text-[clamp(10px,1.5vw,12px)]">
                    {validityText}
                    {installmentsText && (
                        <Typography as="span" variant="bodySm" weight="bold" className="font-jakob font-bold text-[clamp(10px,1.5vw,12px)]">
                            {installmentsText}
                        </Typography>
                    )}
                </Typography>
            </div>
        </div>
    );
}
