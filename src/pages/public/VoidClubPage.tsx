import { useState } from 'react';
import {
    Crown,
    ArrowRight,
    Check,
    Brain,
    Heart,
    Moon,
    Shield,
    Sparkles,
    TrendingUp,
    Droplets,
    X,
    Loader2,
} from 'lucide-react';

// ─── Plans ──────────────────────────────────────────────────────

interface Plan {
    id: string;
    name: string;
    sessions: number;
    monthlyPrice: number;
    perSession: number;
    perks: string[];
    highlight?: boolean;
    promo?: string;
}

const PLANS: Plan[] = [
    {
        id: 'essencial',
        name: 'essencial',
        sessions: 2,
        monthlyPrice: 399,
        perSession: 199.5,
        perks: [
            '2 sessões de flutuação por mês',
            '10% off em massoterapia',
            'agendamento prioritário',
            'acesso ao app void',
        ],
    },
    {
        id: 'equilibrio',
        name: 'equilíbrio',
        sessions: 4,
        monthlyPrice: 699,
        perSession: 174.75,
        highlight: true,
        perks: [
            '4 sessões de flutuação por mês',
            '15% off em massoterapia',
            '1 massoterapia inclusa por mês',
            'agendamento prioritário',
            'sessão de aniversário grátis',
            'acesso a eventos exclusivos',
        ],
    },
    {
        id: 'imersao',
        name: 'imersão total',
        sessions: 8,
        monthlyPrice: 1199,
        perSession: 149.88,
        promo: '🔥 lançamento — 20% off nos 3 primeiros meses',
        perks: [
            '8 sessões de flutuação por mês',
            '20% off em todos os serviços',
            '2 massoterapias inclusas por mês',
            'agendamento vip — horários exclusivos',
            'kit void de boas-vindas',
            'acesso ao void lab (experiências beta)',
            'programa de indicação premium',
            'sessões extras por R$ 99',
        ],
    },
];

// ─── Benefits ───────────────────────────────────────────────────

const FLOAT_BENEFITS = [
    {
        icon: Brain,
        title: 'redução do cortisol',
        desc: 'estudos demonstram queda de até 25% nos níveis de cortisol após uma única sessão de flutuação.',
    },
    {
        icon: Moon,
        title: 'melhora do sono',
        desc: 'a descompressão sensorial ajuda a regular o ciclo circadiano, melhorando a qualidade do sono profundo.',
    },
    {
        icon: Heart,
        title: 'alívio de dores crônicas',
        desc: 'a gravidade zero alivia pressão articular e muscular, reduzindo dores e acelerando recuperação.',
    },
    {
        icon: Shield,
        title: 'sistema imunológico',
        desc: 'o estado meditativo profundo ativa respostas de autocura e fortalece o sistema imunológico.',
    },
    {
        icon: Sparkles,
        title: 'clareza mental',
        desc: 'ausência de estímulos sensoriais leva a estados de flow e insight, aumentando criatividade e foco.',
    },
    {
        icon: Droplets,
        title: 'absorção de magnésio',
        desc: '600kg de sal de Epsom permitem absorção transdérmica de magnésio, essencial para +300 funções do corpo.',
    },
];

// ─── Partners ───────────────────────────────────────────────────

const PARTNERS = [
    { name: 'Studio Yoga', benefit: '15% off em aulas' },
    { name: 'Zen Café', benefit: 'smoothie grátis pós-sessão' },
    { name: 'FitLab', benefit: '10% off plano mensal' },
    { name: 'Mindful App', benefit: '3 meses premium grátis' },
    { name: 'Nutri+', benefit: '1 consulta nutricional grátis' },
    { name: 'Breath Work', benefit: '20% off workshops' },
];

// ─── Component ──────────────────────────────────────────────────

export default function VoidClubPage() {
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
    const [showWaitlist, setShowWaitlist] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [waitlistForm, setWaitlistForm] = useState({
        name: '',
        email: '',
        phone: '',
        planInterest: '',
    });

    const handleWaitlistSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await new Promise(r => setTimeout(r, 1500));
        setLoading(false);
        setSubmitted(true);
    };

    const openWaitlist = (plan?: Plan) => {
        setSelectedPlan(plan || null);
        setWaitlistForm(prev => ({
            ...prev,
            planInterest: plan?.name || '',
        }));
        setShowWaitlist(true);
    };

    const formatBRL = (v: number) =>
        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v);

    return (
        <div className="min-h-screen bg-[#0c1117]">
            {/* ─── Hero — Split layout with photo right ──── */}
            <section className="relative overflow-hidden bg-[#0c1117]" style={{ paddingTop: '64px' }}>
                <div className="grid lg:grid-cols-2 min-h-[80vh]">
                    {/* Left — Content */}
                    <div className="flex flex-col justify-center px-4 sm:px-6 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:pr-12 py-16 lg:py-0">
                        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-lilac-500/15 text-lilac-400 text-xs font-semibold rounded-full border border-lilac-500/25 w-fit mb-6">
                            <Crown className="h-3.5 w-3.5" />
                            clube de vantagens — lista de espera aberta
                        </span>

                        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[0.95]">
                            void
                            <br />
                            <span className="bg-gradient-to-r from-lilac-400 via-lilac-300 to-lilac-500 bg-clip-text text-transparent">
                                club
                            </span>
                        </h1>

                        <p className="mt-6 text-lg text-slate-400 leading-relaxed max-w-md">
                            assinatura mensal para quem busca consistência absoluta.
                            sessões de flutuação, massoterapia, preços especiais e prioridade total.
                        </p>

                        <div className="mt-8 flex flex-col sm:flex-row gap-3">
                            <a
                                href="#planos"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-lilac-500 text-white font-semibold rounded-full hover:bg-lilac-400 transition-all duration-300 text-sm hover:gap-3 shadow-lg shadow-lilac-500/20"
                            >
                                ver planos
                                <ArrowRight className="h-4 w-4" />
                            </a>
                            <button
                                onClick={() => openWaitlist()}
                                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-white/15 text-white/90 font-medium rounded-full hover:bg-white/10 backdrop-blur-sm transition-all duration-300 text-sm"
                            >
                                entrar na lista de espera
                            </button>
                        </div>
                    </div>

                    {/* Right — Photo */}
                    <div className="relative hidden lg:block">
                        <img
                            src="/assets/images/void-club-hero.jpg"
                            alt="Void Club — experiência de flutuação"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0c1117] via-[#0c1117]/30 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0c1117] via-transparent to-[#0c1117]/20" />
                    </div>

                    {/* Mobile image fallback */}
                    <div className="lg:hidden relative h-64">
                        <img
                            src="/assets/images/void-club-hero.jpg"
                            alt="Void Club — experiência de flutuação"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0c1117] via-[#0c1117]/50 to-transparent" />
                    </div>
                </div>
            </section>

            {/* ─── Benefits Section ─────────────────────────── */}
            <section className="py-16 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0c1117] via-[#0f1620] to-[#0c1117]" />

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-10">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 text-slate-400 text-xs font-medium rounded-full border border-white/10 mb-4">
                            ciência da flutuação
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                            por que flutuar <span className="text-lilac-400">muda tudo</span>
                        </h2>
                        <p className="mt-3 text-slate-500 max-w-xl leading-relaxed">
                            benefícios comprovados pela ciência para corpo, mente e performance.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {FLOAT_BENEFITS.map(({ icon: Icon, title, desc }) => (
                            <div
                                key={title}
                                className="group bg-white/[0.03] rounded-2xl border border-white/[0.06] p-6 hover:bg-white/[0.06] hover:border-lilac-500/20 transition-all duration-500"
                            >
                                <div className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-lilac-500/10 group-hover:bg-lilac-500/20 transition-colors mb-4">
                                    <Icon className="h-5 w-5 text-lilac-400/80 group-hover:text-lilac-400 transition-colors" />
                                </div>
                                <h3 className="font-semibold text-white text-sm mb-2">{title}</h3>
                                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Consistency Section ──────────────────────── */}
            <section className="py-14 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0c1117] to-[#0f1620]" />

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <TrendingUp className="h-7 w-7 text-lilac-500/60 mb-4" />
                    <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                        consistência é o <span className="text-lilac-400">segredo</span>
                    </h2>
                    <p className="mt-4 text-slate-500 max-w-2xl leading-relaxed">
                        práticas de wellness como flutuação, meditação e massoterapia funcionam
                        como treino para o sistema nervoso. os benefícios são <strong className="text-slate-300">cumulativos e progressivos</strong> —
                        quanto mais regular a prática, mais profundos os resultados.
                    </p>

                    <div className="mt-10 grid sm:grid-cols-3 gap-4">
                        <div className="bg-white/[0.03] rounded-2xl border border-white/[0.06] p-6 hover:border-white/10 transition-all">
                            <span className="text-3xl font-bold text-white">1ª</span>
                            <span className="text-lg font-light text-slate-500 ml-1">sessão</span>
                            <p className="text-sm text-slate-500 mt-2">relaxamento e curiosidade</p>
                        </div>
                        <div className="bg-white/[0.04] rounded-2xl border border-lilac-500/15 p-6 hover:border-lilac-500/25 transition-all">
                            <span className="text-3xl font-bold text-lilac-400">4ª</span>
                            <span className="text-lg font-light text-slate-500 ml-1">sessão</span>
                            <p className="text-sm text-slate-400 mt-2">o corpo começa a "lembrar" do estado de calma</p>
                        </div>
                        <div className="bg-gradient-to-br from-lilac-500/10 to-lilac-600/5 rounded-2xl border border-lilac-500/20 p-6 hover:border-lilac-500/30 transition-all">
                            <span className="text-3xl font-bold text-lilac-400">8ª+</span>
                            <span className="text-lg font-light text-lilac-400/60 ml-1">sessão</span>
                            <p className="text-sm text-lilac-300/60 mt-2">mudanças perceptíveis em sono, foco e dor crônica</p>
                        </div>
                    </div>

                    <p className="mt-6 text-sm text-slate-600 italic">
                        por isso o void club existe — para tornar a prática acessível e contínua.
                    </p>
                </div>
            </section>

            {/* ─── Plans ───────────────────────────────────── */}
            <section id="planos" className="py-16 scroll-mt-20 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0f1620] via-[#0c1117] to-[#0f1620]" />

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-10">
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-lilac-500/15 text-lilac-400 text-xs font-semibold rounded-full border border-lilac-500/25 mb-4">
                            <Crown className="h-3 w-3" />
                            lista de espera aberta
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                            escolha o seu plano
                        </h2>
                        <p className="mt-3 text-slate-500">
                            cobrança mensal. cancele quando quiser. sem fidelidade.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-5 items-stretch">
                        {PLANS.map((plan) => (
                            <div
                                key={plan.id}
                                className={`relative flex flex-col h-full rounded-2xl border p-7 transition-all duration-500 ${plan.highlight
                                    ? 'bg-gradient-to-b from-lilac-500/10 via-lilac-500/5 to-transparent border-lilac-500/30 shadow-[0_0_60px_-20px_rgba(168,128,208,0.15)]'
                                    : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/10'
                                    }`}
                            >
                                {plan.highlight && (
                                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-lilac-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg shadow-lilac-500/30">
                                        mais popular
                                    </span>
                                )}
                                {plan.promo && !plan.highlight && (
                                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-red-500/80 text-white border border-red-500/20 text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg shadow-red-500/20 whitespace-nowrap">
                                        {plan.promo}
                                    </span>
                                )}

                                <h3 className={`text-xl font-bold ${plan.highlight ? 'text-lilac-400' : 'text-white'}`}>
                                    {plan.name}
                                </h3>
                                <p className="text-xs mt-1.5 text-slate-500">
                                    {plan.sessions} sessões de flutuação por mês
                                </p>

                                <div className="mt-6 mb-4">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-bold text-white">
                                            {formatBRL(plan.monthlyPrice)}
                                        </span>
                                        <span className="text-sm text-slate-600">/mês</span>
                                    </div>
                                    <p className="text-xs mt-1 text-slate-600">
                                        {formatBRL(plan.perSession)} por sessão
                                    </p>
                                </div>

                                <div className={`h-px mb-6 ${plan.highlight ? 'bg-lilac-500/20' : 'bg-white/[0.06]'}`} />

                                <ul className="space-y-3 flex-1">
                                    {plan.perks.map(perk => (
                                        <li key={perk} className="flex items-start gap-2.5 text-sm">
                                            <Check className={`h-4 w-4 shrink-0 mt-0.5 ${plan.highlight ? 'text-lilac-400' : 'text-emerald-500/70'
                                                }`} />
                                            <span className="text-slate-400">{perk}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={() => openWaitlist(plan)}
                                    className={`mt-8 w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 ${plan.highlight
                                        ? 'bg-lilac-500 text-white hover:bg-lilac-400 shadow-lg shadow-lilac-500/20'
                                        : 'bg-white/[0.06] text-white hover:bg-white/10 border border-white/[0.06]'
                                        }`}
                                >
                                    entrar na fila →
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Partners ────────────────────────────────── */}
            <section className="py-14 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0f1620] to-[#0c1117]" />

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-10">
                        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                            vantagens de ser <span className="text-lilac-400">membro</span>
                        </h2>
                        <p className="mt-2 text-slate-500 text-sm">
                            marcas parceiras que compartilham da filosofia void de bem-estar.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {PARTNERS.map(p => (
                            <div
                                key={p.name}
                                className="group bg-white/[0.02] rounded-2xl border border-white/[0.06] p-5 text-center hover:bg-white/[0.04] hover:border-lilac-500/15 transition-all duration-500"
                            >
                                <div className="h-11 w-11 rounded-full bg-white/[0.05] mx-auto mb-3 flex items-center justify-center border border-white/[0.06] group-hover:border-lilac-500/20 group-hover:bg-lilac-500/10 transition-all">
                                    <span className="text-sm font-bold text-slate-500 group-hover:text-lilac-400 transition-colors">
                                        {p.name.charAt(0)}
                                    </span>
                                </div>
                                <h4 className="font-semibold text-white text-sm">{p.name}</h4>
                                <p className="text-xs text-slate-500 mt-1">{p.benefit}</p>
                            </div>
                        ))}
                    </div>

                    <p className="text-xs text-slate-600 mt-6">
                        rede de parceiros em expansão — novas vantagens todo mês.
                    </p>
                </div>
            </section>

            {/* ─── Final CTA ───────────────────────────────── */}
            <section className="py-16 relative">
                <div className="absolute inset-0 bg-[#0c1117]" />

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="relative overflow-hidden rounded-3xl">
                        <div className="absolute inset-0">
                            <img
                                src="/assets/images/void-club-hero.jpg"
                                alt=""
                                className="w-full h-full object-cover opacity-30"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/60" />
                        </div>

                        <div className="relative p-10 md:p-14 text-center">
                            <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-lilac-500/15 border border-lilac-500/25 mb-5">
                                <Crown className="h-7 w-7 text-lilac-400" />
                            </div>
                            <h2 className="text-3xl font-bold text-white">
                                não perca a abertura
                            </h2>
                            <p className="mt-3 text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
                                vagas limitadas para os primeiros membros.
                                entre na lista de espera e garanta condições especiais de lançamento.
                            </p>
                            <button
                                onClick={() => openWaitlist()}
                                className="mt-7 inline-flex items-center gap-2 px-7 py-3.5 bg-lilac-500 text-white font-semibold rounded-full hover:bg-lilac-400 transition-all duration-300 text-sm hover:gap-3 shadow-lg shadow-lilac-500/20"
                            >
                                quero entrar na fila
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── Waitlist Modal ───────────────────────────── */}
            {showWaitlist && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-[#0c1117]/80 backdrop-blur-md"
                        onClick={() => { setShowWaitlist(false); setSubmitted(false); }}
                    />

                    <div className="relative bg-[#151c25] rounded-2xl shadow-2xl max-w-md w-full p-7 border border-white/[0.08] animate-in zoom-in-95 duration-200">
                        <button
                            onClick={() => { setShowWaitlist(false); setSubmitted(false); }}
                            className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-white/10 text-slate-500 hover:text-white transition-colors"
                        >
                            <X size={18} />
                        </button>

                        {submitted ? (
                            <div className="text-center py-8">
                                <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-emerald-500/15 border border-emerald-500/25 mb-4">
                                    <Check className="h-7 w-7 text-emerald-400" />
                                </div>
                                <h3 className="text-xl font-bold text-white">
                                    você está na lista!
                                </h3>
                                <p className="mt-2 text-sm text-slate-400">
                                    entraremos em contato assim que o void club estiver disponível.
                                    {selectedPlan && (
                                        <span className="block mt-1 text-lilac-400 font-medium">
                                            plano de interesse: {selectedPlan.name}
                                        </span>
                                    )}
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="mb-6">
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-lilac-500/15 text-lilac-400 text-[10px] font-semibold rounded-full border border-lilac-500/25 mb-3">
                                        <Crown className="h-2.5 w-2.5" />
                                        LISTA DE ESPERA
                                    </span>
                                    <h3 className="text-xl font-bold text-white">
                                        entre na fila do void club
                                    </h3>
                                    <p className="mt-1 text-sm text-slate-500">
                                        seja notificado quando abrirmos as portas.
                                    </p>
                                </div>

                                <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                                    <div>
                                        <label className="text-xs font-medium text-slate-400 mb-1.5 block">
                                            nome completo <span className="text-lilac-500">*</span>
                                        </label>
                                        <input
                                            required
                                            value={waitlistForm.name}
                                            onChange={e => setWaitlistForm({ ...waitlistForm, name: e.target.value })}
                                            placeholder="seu nome"
                                            className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder:text-slate-600 focus:ring-2 focus:ring-lilac-500/20 focus:border-lilac-500/40 outline-none transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-slate-400 mb-1.5 block">
                                            email <span className="text-lilac-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={waitlistForm.email}
                                            onChange={e => setWaitlistForm({ ...waitlistForm, email: e.target.value })}
                                            placeholder="seu@email.com"
                                            className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder:text-slate-600 focus:ring-2 focus:ring-lilac-500/20 focus:border-lilac-500/40 outline-none transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-slate-400 mb-1.5 block">
                                            whatsapp
                                        </label>
                                        <input
                                            type="tel"
                                            value={waitlistForm.phone}
                                            onChange={e => setWaitlistForm({ ...waitlistForm, phone: e.target.value })}
                                            placeholder="(11) 99999-9999"
                                            className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder:text-slate-600 focus:ring-2 focus:ring-lilac-500/20 focus:border-lilac-500/40 outline-none transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-slate-400 mb-1.5 block">
                                            plano de interesse
                                        </label>
                                        <select
                                            value={waitlistForm.planInterest}
                                            onChange={e => setWaitlistForm({ ...waitlistForm, planInterest: e.target.value })}
                                            className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white focus:ring-2 focus:ring-lilac-500/20 focus:border-lilac-500/40 outline-none transition-all"
                                        >
                                            <option value="" className="bg-[#151c25]">ainda não sei</option>
                                            {PLANS.map(p => (
                                                <option key={p.id} value={p.name} className="bg-[#151c25]">
                                                    {p.name} — {formatBRL(p.monthlyPrice)}/mês
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-3 px-4 bg-lilac-500 text-white font-semibold text-sm rounded-xl hover:bg-lilac-400 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-lilac-500/15"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                enviando...
                                            </>
                                        ) : (
                                            'entrar na lista de espera'
                                        )}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
