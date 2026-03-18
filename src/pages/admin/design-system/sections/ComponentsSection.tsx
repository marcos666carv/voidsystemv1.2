import { SectionWrapper } from '../shared/SectionWrapper';
import { CopyTokenButton } from '../shared/CopyTokenButton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { CategoryCard } from '@/components/cards/CategoryCard';
import {
    SiteAccordion,
    SiteAccordionItem,
    SiteAccordionTrigger,
    SiteAccordionContent,
} from '@/components/site/SiteAccordion';

function ComponentBlock({
    title,
    source,
    token,
    children,
}: {
    title: string;
    source: string;
    token?: string;
    children: React.ReactNode;
}) {
    return (
        <div className="rounded-2xl border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 bg-slate-50 border-b border-slate-200">
                <p className="text-sm font-semibold text-slate-700">{title}</p>
                <div className="flex items-center gap-2">
                    {token && <CopyTokenButton token={token} />}
                    <span className="text-[10px] font-mono text-slate-400">{source}</span>
                </div>
            </div>
            <div className="p-6 bg-white">
                {children}
            </div>
        </div>
    );
}

export function ComponentsSection() {
    return (
        <SectionWrapper
            id="components"
            title="Componentes"
            description="Exemplos ao vivo dos componentes reutilizáveis do sistema."
        >
            <div className="space-y-6">

                {/* ── Buttons ─────────────────────────────────────── */}
                <ComponentBlock
                    title="Button"
                    source="src/components/ui/button.tsx"
                    token="<Button variant='...' size='...'>…</Button>"
                >
                    <div className="space-y-4">
                        {/* Variants */}
                        <div>
                            <p className="text-xs font-mono text-slate-400 mb-3">variant — size default</p>
                            <div className="flex flex-wrap gap-2">
                                <Button>default</Button>
                                <Button variant="secondary">secondary</Button>
                                <Button variant="outline">outline</Button>
                                <Button variant="ghost">ghost</Button>
                                <Button variant="destructive">destructive</Button>
                                <Button variant="link">link</Button>
                            </div>
                        </div>
                        {/* Sizes */}
                        <div>
                            <p className="text-xs font-mono text-slate-400 mb-3">size — variant default</p>
                            <div className="flex flex-wrap items-center gap-2">
                                <Button size="lg">lg</Button>
                                <Button>default</Button>
                                <Button size="sm">sm</Button>
                                <Button size="icon" title="icon">+</Button>
                            </div>
                        </div>
                        {/* States */}
                        <div>
                            <p className="text-xs font-mono text-slate-400 mb-3">states</p>
                            <div className="flex flex-wrap gap-2">
                                <Button disabled>disabled</Button>
                                <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-8">
                                    app-style (rounded-xl)
                                </Button>
                                <Button className="rounded-full bg-[#e3e3d9] text-[#082b3b] hover:opacity-90 font-jakob lowercase">
                                    site-style (rounded-full)
                                </Button>
                            </div>
                        </div>
                    </div>
                </ComponentBlock>

                {/* ── Badges ──────────────────────────────────────── */}
                <ComponentBlock
                    title="Badge"
                    source="src/components/ui/badge.tsx"
                    token="<Badge variant='...'>…</Badge>"
                >
                    <div className="flex flex-wrap gap-2">
                        <Badge>default</Badge>
                        <Badge variant="secondary">secondary</Badge>
                        <Badge variant="outline">outline</Badge>
                        <Badge variant="destructive">destructive</Badge>
                        <Badge className="bg-lilac-500/15 text-lilac-700 border border-lilac-500/25">void club</Badge>
                        <Badge className="bg-emerald-100 text-emerald-700">confirmado</Badge>
                        <Badge className="bg-amber-100 text-amber-700">pendente</Badge>
                        <Badge className="bg-red-100 text-red-700">cancelado</Badge>
                    </div>
                </ComponentBlock>

                {/* ── Input ───────────────────────────────────────── */}
                <ComponentBlock
                    title="Input"
                    source="src/components/ui/input.tsx"
                    token="<Input placeholder='...' />"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg">
                        <Input placeholder="nome completo" />
                        <Input placeholder="email@exemplo.com" type="email" />
                        <Input placeholder="desabilitado" disabled />
                        <Input placeholder="com erro" className="border-red-400 focus-visible:ring-red-400" />
                    </div>
                </ComponentBlock>

                {/* ── CategoryCard ────────────────────────────────── */}
                <ComponentBlock
                    title="CategoryCard"
                    source="src/components/cards/CategoryCard.tsx"
                    token="<CategoryCard title='...' icon='...' color='...' />"
                >
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <CategoryCard
                            title="flutuação"
                            description="Isolamento sensorial profundo em gravidade zero."
                            icon="waves"
                            href="/flutuacao"
                            startingPrice={250}
                            color="#b0d6cf"
                            titleColor="#08283b"
                        />
                        <CategoryCard
                            title="massoterapia"
                            description="Equilíbrio muscular e mental com técnicas terapêuticas."
                            icon="hand"
                            href="/massoterapia"
                            startingPrice={200}
                            color="#ab542b"
                            titleColor="#e3e3d9"
                        />
                        <CategoryCard
                            title="combos"
                            description="Float + massagem — o reset completo."
                            icon="sparkles"
                            href="/checkout?type=combo"
                            startingPrice={390}
                            color="#082b3b"
                            titleColor="#b0d6cf"
                        />
                        <CategoryCard
                            title="vale presente"
                            description="Presenteie alguém com uma experiência única."
                            icon="gift"
                            href="/checkout?type=gift"
                            startingPrice={200}
                            color="#ccb0f0"
                            titleColor="#082b3b"
                        />
                    </div>
                </ComponentBlock>

                {/* ── SiteAccordion ────────────────────────────────── */}
                <ComponentBlock
                    title="SiteAccordion"
                    source="src/components/site/SiteAccordion.tsx"
                    token="<SiteAccordion type='multiple'>…</SiteAccordion>"
                >
                    <div className="p-8 rounded-xl" style={{ backgroundColor: '#ccb0f0' }}>
                        <SiteAccordion type="multiple" className="flex flex-col gap-4 max-w-xl">
                            {[
                                { q: 'O que é a terapia de flutuação?', a: 'A flutuação é uma prática feita em um tanque de privação sensorial, onde você flutua sem esforço em água saturada com sal de Epsom.' },
                                { q: 'É seguro?', a: 'Sim. O tanque é mantido em condições perfeitas de higiene, e você tem controle total da experiência.' },
                                { q: 'Preciso saber nadar?', a: 'Não — a concentração de sal faz você flutuar naturalmente.' },
                            ].map((item, i) => (
                                <SiteAccordionItem
                                    key={i}
                                    value={`demo-${i}`}
                                    className="flex flex-col items-center rounded-3xl bg-[#896dad] border-none transition-colors duration-500 data-[state=open]:bg-white"
                                >
                                    <SiteAccordionTrigger className="w-full p-6 rounded-3xl lowercase hover:no-underline text-[#e3e3d9] data-[state=open]:text-[#896dad]">
                                        <span className="font-jakob text-xl leading-8 text-left">{item.q}</span>
                                    </SiteAccordionTrigger>
                                    <SiteAccordionContent className="px-6 pb-6 text-[#082b3b]">
                                        <p className="font-sf-pro text-base pt-4">{item.a}</p>
                                    </SiteAccordionContent>
                                </SiteAccordionItem>
                            ))}
                        </SiteAccordion>
                    </div>
                </ComponentBlock>

                {/* ── Border radius ────────────────────────────────── */}
                <ComponentBlock
                    title="Border Radius"
                    source="tailwind.config.js:70"
                    token="rounded-sm / rounded-md / rounded-lg / rounded-xl / rounded-2xl / rounded-3xl / rounded-full"
                >
                    <div className="flex flex-wrap items-center gap-4">
                        {[
                            { label: 'rounded-sm',   cls: 'rounded-sm' },
                            { label: 'rounded-md',   cls: 'rounded-md' },
                            { label: 'rounded-lg',   cls: 'rounded-lg' },
                            { label: 'rounded-xl',   cls: 'rounded-xl' },
                            { label: 'rounded-2xl',  cls: 'rounded-2xl' },
                            { label: 'rounded-3xl',  cls: 'rounded-3xl' },
                            { label: 'rounded-full', cls: 'rounded-full' },
                        ].map((r) => (
                            <div key={r.label} className="flex flex-col items-center gap-2">
                                <div
                                    className={`h-14 w-14 bg-violet-200 border-2 border-violet-300 ${r.cls}`}
                                />
                                <CopyTokenButton token={r.cls} />
                            </div>
                        ))}
                    </div>
                </ComponentBlock>

            </div>
        </SectionWrapper>
    );
}
