import { SectionWrapper } from '../shared/SectionWrapper';
import { CopyTokenButton } from '../shared/CopyTokenButton';
import { JAKOB_SAMPLES, SF_PRO_SAMPLES, INTER_SAMPLES, type FontSample } from '../tokens';
import type { EditorProps } from '../DesignSystemPage';

// Tokens de font-family que vivem em index.css :root
const FONT_VARS = [
    {
        cssVar: '--font-jakob',
        label: 'font-jakob',
        usage: 'Headings e títulos das páginas públicas',
        default: "'dT_Jakob', Georgia, serif",
        source: 'src/index.css:104',
    },
    {
        cssVar: '--font-sf-pro',
        label: 'font-sf-pro',
        usage: 'Corpo de texto das páginas públicas',
        default: "'Inter', system-ui, sans-serif",
        source: 'src/index.css:105',
    },
];

const FONT_CLASS_TO_VAR: Record<string, string> = {
    'font-jakob': '--font-jakob',
    'font-sf-pro': '--font-sf-pro',
};

const WEIGHT_OPTIONS = ['100', '200', '300', '400', '500', '600', '700', '800', '900'];

interface FontGroupProps {
    title: string;
    subtitle: string;
    source: string;
    samples: FontSample[];
    editorProps: EditorProps;
}

function FontGroup({ title, subtitle, source, samples, editorProps }: FontGroupProps) {
    const { editMode, pendingChanges, onTokenChange, onTokenRevert } = editorProps;

    return (
        <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-base font-semibold text-slate-800">{title}</h3>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">{subtitle}</p>
                </div>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-2 py-1 rounded">
                    {source}
                </span>
            </div>

            <div className="rounded-2xl border border-slate-200 overflow-hidden divide-y divide-slate-100">
                {samples.map((sample) => {
                    const pendingSize = pendingChanges[sample.cssVarSize];
                    const pendingWeight = pendingChanges[sample.cssVarWeight];
                    const currentSize = pendingSize?.value ?? sample.defaultSize;
                    const currentWeight = pendingWeight?.value ?? sample.defaultWeight;
                    const fontFamilyVar = FONT_CLASS_TO_VAR[sample.fontClass];
                    const isEdited = !!(pendingSize || pendingWeight);

                    const previewStyle: React.CSSProperties = {
                        fontFamily: fontFamilyVar ? `var(${fontFamilyVar})` : 'Inter, system-ui, sans-serif',
                        fontSize: `var(${sample.cssVarSize}, ${currentSize})`,
                        fontWeight: `var(${sample.cssVarWeight}, ${currentWeight})`,
                    };

                    return (
                        <div
                            key={sample.label}
                            className={`flex gap-6 p-5 transition-colors group ${isEdited ? 'bg-violet-50/40' : 'hover:bg-slate-50/60'}`}
                        >
                            {/* Metadata */}
                            <div className="w-52 shrink-0 pt-1 space-y-1.5">
                                <p className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                                    {sample.label}
                                </p>
                                <p className="text-[11px] font-mono text-slate-400">{sample.sizeToken}</p>

                                {editMode ? (
                                    <div className="space-y-2 pt-1">
                                        {/* Size input */}
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-[10px] text-slate-400 w-10 shrink-0">size</span>
                                            <input
                                                type="text"
                                                value={currentSize}
                                                onChange={(e) =>
                                                    onTokenChange(sample.cssVarSize, e.target.value, `${sample.label} size`)
                                                }
                                                className="flex-1 px-2 py-1 text-xs font-mono border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400 bg-white"
                                                placeholder={sample.defaultSize}
                                                spellCheck={false}
                                            />
                                            {pendingSize && (
                                                <button
                                                    onClick={() => onTokenRevert(sample.cssVarSize)}
                                                    className="text-slate-300 hover:text-red-400 transition-colors text-xs"
                                                    title="Reverter size"
                                                >
                                                    ↺
                                                </button>
                                            )}
                                        </div>
                                        {/* Weight select */}
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-[10px] text-slate-400 w-10 shrink-0">weight</span>
                                            <select
                                                value={currentWeight}
                                                onChange={(e) =>
                                                    onTokenChange(sample.cssVarWeight, e.target.value, `${sample.label} weight`)
                                                }
                                                className="flex-1 px-2 py-1 text-xs font-mono border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400 bg-white"
                                            >
                                                {WEIGHT_OPTIONS.map((w) => (
                                                    <option key={w} value={w}>{w}</option>
                                                ))}
                                            </select>
                                            {pendingWeight && (
                                                <button
                                                    onClick={() => onTokenRevert(sample.cssVarWeight)}
                                                    className="text-slate-300 hover:text-red-400 transition-colors text-xs"
                                                    title="Reverter weight"
                                                >
                                                    ↺
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-[11px] text-slate-400">
                                        {currentSize} / {currentWeight}
                                    </p>
                                )}

                                <div className="flex flex-wrap gap-1 pt-1">
                                    <CopyTokenButton token={sample.cssVarSize} label="size var" />
                                    <CopyTokenButton token={sample.cssVarWeight} label="weight var" />
                                </div>
                                <p className="text-[10px] font-mono text-slate-300 pt-0.5">{sample.source}</p>
                            </div>

                            {/* Rendered preview */}
                            <div className="flex-1 flex items-center overflow-hidden">
                                <span style={previewStyle} className="leading-tight">
                                    {sample.sampleText}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

interface Props {
    editorProps: EditorProps;
}

export function TypographySection({ editorProps }: Props) {
    const { editMode, pendingChanges, onTokenChange, onTokenRevert } = editorProps;

    return (
        <SectionWrapper
            id="typography"
            title="Tipografia"
            description="Famílias, tamanhos e pesos em uso no projeto."
            source="src/index.css:94–121"
        >
            {/* ── Font family tokens (editáveis) ────────────────────── */}
            <div className="mb-10 rounded-2xl border border-slate-200 overflow-hidden">
                <div className="px-5 py-3 bg-slate-50 border-b border-slate-200">
                    <p className="text-sm font-semibold text-slate-700">Font Family Tokens</p>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">src/index.css:104–105</p>
                </div>

                <div className="divide-y divide-slate-100">
                    {FONT_VARS.map((fv) => {
                        const pending = pendingChanges[fv.cssVar];
                        const currentValue = pending?.value ?? fv.default;
                        const isEdited = !!pending;

                        return (
                            <div
                                key={fv.cssVar}
                                className={`p-5 transition-colors ${isEdited ? 'bg-violet-50/50' : 'bg-white hover:bg-slate-50/60'}`}
                            >
                                <div className="flex items-start gap-4">
                                    {/* Info */}
                                    <div className="w-52 shrink-0 space-y-1">
                                        <code className="text-xs font-mono font-semibold text-violet-700">
                                            {fv.cssVar}
                                        </code>
                                        <p className="text-[11px] text-slate-500">{fv.usage}</p>
                                        <div className="flex flex-wrap gap-1 pt-1">
                                            <CopyTokenButton token={fv.cssVar} label="CSS var" />
                                            <CopyTokenButton token={fv.label} label="classe" />
                                        </div>
                                        <p className="text-[10px] font-mono text-slate-300">{fv.source}</p>
                                    </div>

                                    {/* Editor ou valor atual */}
                                    <div className="flex-1 space-y-3">
                                        {editMode ? (
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="text"
                                                    value={currentValue}
                                                    onChange={(e) =>
                                                        onTokenChange(fv.cssVar, e.target.value, fv.label)
                                                    }
                                                    className="flex-1 px-3 py-2 text-sm font-mono border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400 bg-white"
                                                    placeholder={fv.default}
                                                    spellCheck={false}
                                                />
                                                {isEdited && (
                                                    <button
                                                        onClick={() => onTokenRevert(fv.cssVar)}
                                                        className="px-2 py-2 text-xs text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Reverter ao original"
                                                    >
                                                        ↺
                                                    </button>
                                                )}
                                            </div>
                                        ) : (
                                            <code className="text-sm font-mono text-slate-600">
                                                {currentValue}
                                            </code>
                                        )}

                                        {/* Preview live */}
                                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                                            <p
                                                className="text-2xl lowercase text-slate-800"
                                                style={{ fontFamily: `var(${fv.cssVar})` }}
                                            >
                                                void system — flutuação sensorial
                                            </p>
                                            <p
                                                className="text-sm text-slate-500 mt-1"
                                                style={{ fontFamily: `var(${fv.cssVar})` }}
                                            >
                                                The quick brown fox jumps over the lazy dog. 0123456789.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* ── Font samples ──────────────────────────────────────── */}
            <FontGroup
                title="dT Jakob"
                subtitle="font-jakob — headings das páginas públicas"
                source="index.css:94"
                samples={JAKOB_SAMPLES}
                editorProps={editorProps}
            />
            <FontGroup
                title="SF Pro / Inter — site público"
                subtitle="font-sf-pro — corpo de texto público"
                source="index.css:105"
                samples={SF_PRO_SAMPLES}
                editorProps={editorProps}
            />
            <FontGroup
                title="Inter — app & admin"
                subtitle="padrão Tailwind — dashboard, admin, shadcn/ui"
                source="index.css:78"
                samples={INTER_SAMPLES}
                editorProps={editorProps}
            />
        </SectionWrapper>
    );
}
