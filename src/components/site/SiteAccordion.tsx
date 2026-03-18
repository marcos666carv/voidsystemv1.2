import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { cn } from '@/lib/utils';

// ─── Types ───────────────────────────────────────────────────────────────────

type AccordionRootProps =
    | (React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root> & { type: 'single' })
    | (React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root> & { type: 'multiple' });

interface AccordionItemProps extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> {}
interface AccordionTriggerProps extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> {
    hideIcon?: boolean;
}
interface AccordionContentProps extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> {}

// ─── Components ──────────────────────────────────────────────────────────────

export function SiteAccordion({ className, children, ...props }: AccordionRootProps) {
    return (
        <AccordionPrimitive.Root className={cn(className)} {...props as any}>
            {children}
        </AccordionPrimitive.Root>
    );
}

export function SiteAccordionItem({ className, ...props }: AccordionItemProps) {
    return (
        <AccordionPrimitive.Item
            className={cn('border-b border-white/10 last:border-b-0', className)}
            {...props}
        />
    );
}

export function SiteAccordionTrigger({ className, children, hideIcon = false, ...props }: AccordionTriggerProps) {
    return (
        <AccordionPrimitive.Header className="flex">
            <AccordionPrimitive.Trigger
                className={cn(
                    'font-sf-pro flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left',
                    'font-medium transition-all outline-none',
                    'hover:underline focus-visible:ring-2 focus-visible:ring-[--color-tiffany]',
                    'disabled:pointer-events-none disabled:opacity-50',
                    'group',
                    className,
                )}
                {...props}
            >
                {children}
                {!hideIcon && (
                    <span className="shrink-0 relative inline-block w-9 h-9">
                        {/* open icon */}
                        <img
                            src="/assets/svgs/open.svg"
                            alt=""
                            width={36}
                            height={36}
                            className="absolute inset-0 opacity-100 scale-100 rotate-0 transition-all duration-300 ease-in-out group-data-[state=open]:opacity-0 group-data-[state=open]:scale-95 group-data-[state=open]:rotate-90"
                        />
                        {/* close icon */}
                        <img
                            src="/assets/svgs/close.svg"
                            alt=""
                            width={36}
                            height={36}
                            className="absolute inset-0 opacity-0 scale-95 -rotate-90 transition-all duration-300 ease-in-out group-data-[state=open]:opacity-100 group-data-[state=open]:scale-100 group-data-[state=open]:rotate-0"
                        />
                    </span>
                )}
            </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
    );
}

export function SiteAccordionContent({ className, children, ...props }: AccordionContentProps) {
    return (
        <AccordionPrimitive.Content
            className={cn(
                'font-sf-pro overflow-hidden text-sm transition-all',
                'data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
            )}
            {...props}
        >
            <div className={cn('pb-4', className)}>{children}</div>
        </AccordionPrimitive.Content>
    );
}
