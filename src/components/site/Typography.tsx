import { useMemo } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ─── Variants ────────────────────────────────────────────────────────────────

const typographyVariants = cva('', {
    variants: {
        variant: {
            display:  'font-jakob text-5xl lowercase',
            heading1: 'font-jakob text-[32px] md:text-5xl md:leading-[60px] lowercase',
            heading2: 'font-jakob text-3xl lowercase',
            heading3: 'font-jakob text-2xl leading-9 lowercase',
            eyebrow:  'font-sf-pro text-sm tracking-[0.14em] uppercase',
            bodyLg:   'font-sf-pro text-xl leading-8',
            body:     'font-sf-pro text-base leading-7',
            bodySm:   'font-sf-pro text-sm leading-6',
        },
        color: {
            default:   'text-[--color-gunmetal]',
            inverse:   'text-[--color-alabaster]',
            accent:    'text-[--color-tiffany]',
            secondary: 'text-[--color-rust]',
            ocean:     'text-[--color-ocean]',
        },
        weight: {
            light:    'font-light',
            regular:  'font-normal',
            medium:   'font-medium',
            semibold: 'font-semibold',
            bold:     'font-bold',
        },
        align: {
            left:   'text-left',
            center: 'text-center',
            right:  'text-right',
        },
    },
    defaultVariants: {
        variant: 'body',
        color:   'default',
        weight:  'regular',
        align:   'left',
    },
});

// ─── Types ───────────────────────────────────────────────────────────────────

type TypographyVariantProps = VariantProps<typeof typographyVariants>;

type AllowedTag = 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div' | 'label';

interface TypographyProps extends TypographyVariantProps {
    as?: AllowedTag;
    children?: React.ReactNode;
    className?: string;
    /** Renderiza HTML escapado (apenas de fontes confiáveis) */
    html?: string;
}

// ─── Component ───────────────────────────────────────────────────────────────

export function Typography({
    as = 'p',
    variant,
    color,
    weight,
    align,
    children,
    className,
    html,
}: TypographyProps) {
    const Component = as;

    const composedClassName = useMemo(
        () => typographyVariants({ variant, color, weight, align }),
        [variant, color, weight, align],
    );

    if (html) {
        return (
            <Component
                className={cn(composedClassName, className)}
                dangerouslySetInnerHTML={{ __html: html }}
            />
        );
    }

    return (
        <Component className={cn(composedClassName, className)}>
            {children}
        </Component>
    );
}
