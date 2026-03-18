import { SectionWrapper } from '../shared/SectionWrapper';
import { CopyTokenButton } from '../shared/CopyTokenButton';
import { CUSTOM_SPACING } from '../tokens';

const MAX_PX = 704; // largura representada como 100%

export function SpacingSection() {
    return (
        <SectionWrapper
            id="spacing"
            title="Espaçamento"
            description="Tokens customizados adicionados ao Tailwind config. Use como p-, m-, w-, h-, gap-, etc."
            source="tailwind.config.js:78–92"
        >
            {/* Tailwind default scale reminder */}
            <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500">
                <strong className="text-slate-700">Tailwind padrão (0–12):</strong>{' '}
                Os tokens 0–12 já existem no Tailwind por default e não aparecem aqui.
                Esta tabela mostra apenas as <strong className="text-slate-700">extensões customizadas</strong> do projeto.
            </div>

            {/* Table */}
            <div className="rounded-xl border border-slate-200 overflow-hidden">
                <div className="grid grid-cols-[60px_80px_80px_1fr_80px] gap-0 bg-slate-50 border-b border-slate-200 px-4 py-2 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                    <span>Token</span>
                    <span>Valor</span>
                    <span>px</span>
                    <span>Visual</span>
                    <span>Copiar</span>
                </div>
                <div className="divide-y divide-slate-100">
                    {CUSTOM_SPACING.map((token) => {
                        const pct = Math.min((token.px / MAX_PX) * 100, 100);
                        return (
                            <div
                                key={token.key}
                                className="grid grid-cols-[60px_80px_80px_1fr_80px] gap-0 items-center px-4 py-2.5 hover:bg-slate-50/80 transition-colors"
                            >
                                <span className="text-xs font-mono font-semibold text-slate-800">
                                    {token.key}
                                </span>
                                <span className="text-xs font-mono text-slate-500">{token.value}</span>
                                <span className="text-xs font-mono text-slate-400">{token.px}px</span>
                                <div className="flex items-center pr-4">
                                    <div
                                        className="h-4 bg-violet-200 rounded-full"
                                        style={{ width: `${pct}%`, minWidth: '4px' }}
                                    />
                                </div>
                                <div className="flex flex-wrap gap-1">
                                    <CopyTokenButton token={`p-${token.key}`} label={`p-${token.key}`} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Common uses */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                    { label: 'site-container (xl)', token: 'px-30', desc: 'padding horizontal das seções públicas em telas ≥ 1280px' },
                    { label: 'section vertical', token: 'py-30', desc: 'espaçamento vertical padrão das seções públicas' },
                    { label: 'carousel gap', token: 'gap-18', desc: 'espaço entre itens no carousel de razões' },
                ].map((use) => (
                    <div key={use.label} className="p-4 rounded-xl bg-violet-50 border border-violet-100">
                        <p className="text-xs font-semibold text-violet-800 mb-1">{use.label}</p>
                        <CopyTokenButton token={use.token} />
                        <p className="text-[11px] text-violet-600 mt-2 leading-relaxed">{use.desc}</p>
                    </div>
                ))}
            </div>
        </SectionWrapper>
    );
}
