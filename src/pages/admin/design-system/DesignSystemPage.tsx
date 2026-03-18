import { useState, useEffect, useCallback } from 'react';
import { Pencil, X, Save, RotateCcw, CheckCircle2, AlertCircle } from 'lucide-react';
import { DS_SECTIONS } from './tokens';
import { TypographySection } from './sections/TypographySection';
import { ColorsSection } from './sections/ColorsSection';
import { SpacingSection } from './sections/SpacingSection';
import { ComponentsSection } from './sections/ComponentsSection';

// ─── Types ────────────────────────────────────────────────────────────────────

export type TokenChange = {
    cssVar: string;
    value: string;
    label: string;
};

export type EditorProps = {
    pendingChanges: Record<string, TokenChange>;
    onTokenChange: (cssVar: string, value: string, label: string) => void;
    onTokenRevert: (cssVar: string) => void;
    editMode: boolean;
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export function DesignSystemPage() {
    const [editMode, setEditMode] = useState(false);
    const [pendingChanges, setPendingChanges] = useState<Record<string, TokenChange>>({});
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
    const [activeSection, setActiveSection] = useState<string>('typography');

    const changeCount = Object.keys(pendingChanges).length;

    // ── Intersection observer p/ nav ─────────────────────────────────────────
    useEffect(() => {
        const observers: IntersectionObserver[] = [];
        DS_SECTIONS.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (!el) return;
            const obs = new IntersectionObserver(
                ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
                { rootMargin: '-10% 0px -60% 0px', threshold: 0 }
            );
            obs.observe(el);
            observers.push(obs);
        });
        return () => observers.forEach((o) => o.disconnect());
    }, []);

    // ── Token change: aplica no DOM imediatamente ─────────────────────────────
    const handleTokenChange = useCallback((cssVar: string, value: string, label: string) => {
        document.documentElement.style.setProperty(cssVar, value);
        setPendingChanges((prev) => ({ ...prev, [cssVar]: { cssVar, value, label } }));
    }, []);

    // ── Revert um token ───────────────────────────────────────────────────────
    const handleTokenRevert = useCallback((cssVar: string) => {
        document.documentElement.style.removeProperty(cssVar);
        setPendingChanges((prev) => {
            const next = { ...prev };
            delete next[cssVar];
            return next;
        });
    }, []);

    // ── Desfazer tudo ─────────────────────────────────────────────────────────
    const revertAll = () => {
        Object.keys(pendingChanges).forEach((cssVar) => {
            document.documentElement.style.removeProperty(cssVar);
        });
        setPendingChanges({});
    };

    // ── Desligar edit mode reverte tudo ───────────────────────────────────────
    const toggleEditMode = () => {
        if (editMode && changeCount > 0) revertAll();
        setEditMode((v) => !v);
        setSaveStatus('idle');
    };

    // ── Salvar no projeto ────────────────────────────────────────────────────
    const saveToProject = async () => {
        setSaveStatus('saving');
        const changes = Object.fromEntries(
            Object.entries(pendingChanges).map(([k, v]) => [k, v.value])
        );
        try {
            const res = await fetch('/api/design-tokens', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ changes }),
            });
            const data = await res.json();
            if (data.success) {
                // Remove overrides do DOM (o arquivo agora tem os valores)
                Object.keys(pendingChanges).forEach((cssVar) => {
                    document.documentElement.style.removeProperty(cssVar);
                });
                setPendingChanges({});
                setSaveStatus('success');
                setTimeout(() => setSaveStatus('idle'), 3000);
            } else {
                setSaveStatus('error');
            }
        } catch {
            setSaveStatus('error');
        }
    };

    const editorProps: EditorProps = {
        pendingChanges,
        onTokenChange: handleTokenChange,
        onTokenRevert: handleTokenRevert,
        editMode,
    };

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-32">

            {/* ── Header ────────────────────────────────────────────────── */}
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Design System</h1>
                    <p className="text-slate-500 mt-1.5 text-sm max-w-xl">
                        Tokens visuais, tipografia, cores e componentes.
                        {editMode
                            ? ' Modo de edição ativo — mudanças ficam em pré-visualização até você salvar.'
                            : ' Ative o modo de edição para testar e salvar alterações direto no projeto.'}
                    </p>
                </div>

                <button
                    onClick={toggleEditMode}
                    className={`shrink-0 flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
                        editMode
                            ? 'bg-slate-900 text-white hover:bg-slate-700'
                            : 'bg-violet-600 text-white hover:bg-violet-700'
                    }`}
                >
                    {editMode ? <X className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
                    {editMode ? 'Sair da edição' : 'Editar tokens'}
                </button>
            </div>

            {/* ── Edit mode banner ──────────────────────────────────────── */}
            {editMode && (
                <div className="flex items-center gap-3 px-4 py-3 bg-violet-50 border border-violet-200 rounded-xl text-sm text-violet-800">
                    <Pencil className="h-4 w-4 text-violet-500 shrink-0" />
                    <span>
                        Altere qualquer cor ou fonte — a pré-visualização é imediata.
                        Clique em <strong>Salvar no projeto</strong> para gravar em{' '}
                        <code className="font-mono text-[11px] bg-violet-100 px-1 py-0.5 rounded">src/index.css</code>.
                    </span>
                </div>
            )}

            {/* ── Body ─────────────────────────────────────────────────── */}
            <div className="flex gap-8 items-start">

                {/* Sticky nav */}
                <nav className="sticky top-4 w-44 shrink-0 hidden lg:block">
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2 px-3">
                        Seções
                    </p>
                    <ul className="space-y-0.5">
                        {DS_SECTIONS.map((s) => (
                            <li key={s.id}>
                                <button
                                    onClick={() => scrollTo(s.id)}
                                    className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                                        activeSection === s.id
                                            ? 'bg-violet-50 text-violet-700 font-semibold'
                                            : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                                    }`}
                                >
                                    {s.label}
                                </button>
                            </li>
                        ))}
                    </ul>

                    {editMode && changeCount > 0 && (
                        <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800">
                            <p className="font-semibold mb-1">{changeCount} alteração{changeCount !== 1 ? 'ões' : ''}</p>
                            <ul className="space-y-1 font-mono text-[10px] text-amber-600">
                                {Object.values(pendingChanges).map((c) => (
                                    <li key={c.cssVar} className="truncate">{c.label}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200">
                        <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
                            Arquivos
                        </p>
                        <ul className="space-y-1 text-[11px] font-mono text-slate-400">
                            <li>src/index.css</li>
                            <li>tailwind.config.js</li>
                        </ul>
                    </div>
                </nav>

                {/* Content */}
                <div className="flex-1 min-w-0 space-y-16">
                    <TypographySection editorProps={editorProps} />
                    <ColorsSection editorProps={editorProps} />
                    <SpacingSection />
                    <ComponentsSection />
                </div>
            </div>

            {/* ── Floating save bar ─────────────────────────────────────── */}
            {editMode && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg px-4">
                    <div className="flex items-center gap-3 px-5 py-3 bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-700">

                        {saveStatus === 'success' && (
                            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                        )}
                        {saveStatus === 'error' && (
                            <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
                        )}
                        {saveStatus !== 'success' && saveStatus !== 'error' && (
                            <div className={`h-2 w-2 rounded-full shrink-0 ${changeCount > 0 ? 'bg-amber-400' : 'bg-slate-600'}`} />
                        )}

                        <p className="text-sm flex-1">
                            {saveStatus === 'saving' && 'Salvando em src/index.css…'}
                            {saveStatus === 'success' && 'Salvo! Vite HMR propagou as mudanças.'}
                            {saveStatus === 'error' && 'Erro ao salvar. Confirme que o servidor está rodando.'}
                            {saveStatus === 'idle' && (
                                changeCount > 0
                                    ? <><span className="text-amber-400 font-semibold">{changeCount}</span> token{changeCount !== 1 ? 's' : ''} alterado{changeCount !== 1 ? 's' : ''} — não salvo{changeCount !== 1 ? 's' : ''}</>
                                    : <span className="text-slate-400">Sem alterações pendentes</span>
                            )}
                        </p>

                        {changeCount > 0 && saveStatus === 'idle' && (
                            <button
                                onClick={revertAll}
                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                            >
                                <RotateCcw className="h-3.5 w-3.5" />
                                Desfazer
                            </button>
                        )}

                        <button
                            onClick={saveToProject}
                            disabled={changeCount === 0 || saveStatus === 'saving'}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-violet-600 hover:bg-violet-500 disabled:bg-slate-700 disabled:text-slate-500 rounded-xl transition-colors"
                        >
                            <Save className="h-4 w-4" />
                            Salvar no projeto
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
