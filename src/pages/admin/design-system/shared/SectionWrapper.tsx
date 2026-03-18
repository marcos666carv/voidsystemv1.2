import type { ReactNode } from 'react';

interface SectionWrapperProps {
    id: string;
    title: string;
    description?: string;
    source?: string;
    children: ReactNode;
}

export function SectionWrapper({ id, title, description, source, children }: SectionWrapperProps) {
    return (
        <section id={id} className="scroll-mt-6">
            <div className="flex items-start justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">{title}</h2>
                    {description && (
                        <p className="text-sm text-slate-500 mt-1">{description}</p>
                    )}
                </div>
                {source && (
                    <span className="shrink-0 text-[10px] font-mono text-slate-400 bg-slate-100 px-2 py-1 rounded mt-1">
                        {source}
                    </span>
                )}
            </div>
            {children}
        </section>
    );
}
