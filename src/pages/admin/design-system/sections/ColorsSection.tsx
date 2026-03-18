import { SectionWrapper } from '../shared/SectionWrapper';
import { CopyTokenButton } from '../shared/CopyTokenButton';
import { SITE_COLORS, APP_COLOR_SCALES } from '../tokens';
import type { EditorProps } from '../DesignSystemPage';

function isLight(hex: string): boolean {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 > 128;
}

interface Props {
    editorProps: EditorProps;
}

export function ColorsSection({ editorProps }: Props) {
    const { editMode, pendingChanges, onTokenChange, onTokenRevert } = editorProps;

    return (
        <SectionWrapper
            id="colors"
            title="Cores"
            description="Paleta completa — site público e app admin."
            source="src/index.css:107 · tailwind.config.js:43"
        >
            {/* ── Site colors ──────────────────────────────────────────── */}
            <div className="mb-10">
                <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-4">
                    Site público — CSS vars
                    {editMode && (
                        <span className="ml-2 text-[10px] font-normal normal-case text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full">
                            clique no swatch para editar
                        </span>
                    )}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                    {SITE_COLORS.map((swatch) => {
                        const pending = pendingChanges[swatch.cssVar];
                        const currentHex = pending?.value ?? swatch.hex;
                        const light = isLight(currentHex);
                        const isEdited = !!pending;

                        return (
                            <div
                                key={swatch.name}
                                className={`rounded-xl overflow-hidden border shadow-sm transition-all ${
                                    isEdited ? 'border-violet-400 ring-2 ring-violet-200' : 'border-slate-200'
                                }`}
                            >
                                {/* Swatch — clicável em edit mode */}
                                <div
                                    className="h-20 w-full flex items-end p-2 relative group"
                                    style={{ backgroundColor: currentHex }}
                                >
                                    <span
                                        className="text-[10px] font-mono font-semibold"
                                        style={{ color: light ? '#082b3b' : '#e3e3d9' }}
                                    >
                                        {currentHex}
                                    </span>

                                    {/* Color picker oculto, ativado pelo label */}
                                    {editMode && (
                                        <>
                                            <input
                                                type="color"
                                                id={`color-${swatch.cssVar}`}
                                                value={currentHex}
                                                onChange={(e) =>
                                                    onTokenChange(swatch.cssVar, e.target.value, swatch.name)
                                                }
                                                className="sr-only"
                                            />
                                            <label
                                                htmlFor={`color-${swatch.cssVar}`}
                                                className="absolute inset-0 cursor-pointer flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                style={{ backgroundColor: `${currentHex}80` }}
                                            >
                                                <span className="text-xs font-semibold px-2 py-1 rounded-lg bg-white/80 text-slate-800 backdrop-blur-sm">
                                                    editar
                                                </span>
                                            </label>
                                        </>
                                    )}
                                </div>

                                <div className="bg-white p-3 space-y-1.5">
                                    <div className="flex items-center justify-between">
                                        <p className="text-xs font-semibold text-slate-800">{swatch.name}</p>
                                        {isEdited && (
                                            <button
                                                onClick={() => onTokenRevert(swatch.cssVar)}
                                                className="text-[10px] text-slate-400 hover:text-red-500 transition-colors"
                                                title="Reverter"
                                            >
                                                ↺
                                            </button>
                                        )}
                                    </div>
                                    <p className="text-[10px] font-mono text-slate-400">{swatch.cssVar}</p>
                                    <div className="flex flex-wrap gap-1 pt-0.5">
                                        <CopyTokenButton token={`var(${swatch.cssVar})`} label="CSS var" />
                                        <CopyTokenButton token={swatch.twBgClass} label="TW" />
                                    </div>
                                    <p className="text-[10px] font-mono text-slate-300">{swatch.source}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* ── App color scales ──────────────────────────────────────── */}
            <div className="mb-10">
                <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-4">
                    App — escalas (Tailwind config)
                </h3>
                <div className="space-y-6">
                    {APP_COLOR_SCALES.map((scale) => (
                        <div key={scale.name}>
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-xs font-semibold text-slate-600">{scale.name}</p>
                                <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                                    {scale.source}
                                </span>
                            </div>
                            <div className="grid grid-cols-11 gap-1">
                                {scale.shades.map((shade) => {
                                    const token = `bg-${scale.tokenPrefix}-${shade.step}`;
                                    return (
                                        <div key={shade.step} className="group relative">
                                            <div
                                                className="h-12 rounded-lg cursor-pointer"
                                                style={{ backgroundColor: shade.hex }}
                                                title={token}
                                                onClick={() => navigator.clipboard.writeText(token)}
                                            />
                                            <p className="mt-1 text-center text-[9px] font-mono text-slate-500">
                                                {shade.step}
                                            </p>
                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900 text-white text-[9px] font-mono rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                                {token}<br />{shade.hex}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Tailwind semantic strips ──────────────────────────────── */}
            <div>
                <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-4">
                    Tailwind semântico
                </h3>
                <div className="space-y-3">
                    {[
                        'slate', 'violet', 'emerald', 'red', 'amber', 'cyan', 'fuchsia',
                    ].map((name) => (
                        <div key={name} className="flex items-center gap-2">
                            <span className="w-16 text-xs font-medium text-slate-500 shrink-0 capitalize">{name}</span>
                            <div className="flex-1 grid grid-cols-11 gap-1">
                                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((stop) => {
                                    const cls = `bg-${name}-${stop}`;
                                    return (
                                        <div
                                            key={stop}
                                            className={`h-8 rounded cursor-pointer ${cls} group relative`}
                                            title={cls}
                                            onClick={() => navigator.clipboard.writeText(cls)}
                                        >
                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-1.5 py-0.5 bg-slate-900 text-white text-[9px] font-mono rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                                {cls}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
                <p className="text-[10px] text-slate-400 font-mono mt-3">
                    Clique em qualquer swatch para copiar a classe Tailwind.
                </p>
            </div>
        </SectionWrapper>
    );
}
