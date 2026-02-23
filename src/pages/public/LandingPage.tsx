import { Link } from 'react-router-dom';
import { ArrowRight, Crown } from 'lucide-react';
import { CategoryCard } from '@/components/cards/CategoryCard';
import { ProductCard } from '@/components/cards/ProductCard';
import { SERVICE_CATEGORIES, MOCK_PRODUCTS } from '@/lib/mockData';

export function LandingPage() {
    return (
        <div className="min-h-screen">
            {/* ─── Hero ─────────────────────────────────────────── */}
            <section className="relative bg-slate-50" style={{ paddingTop: 'calc(64px + 80px)' }}>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1]">
                            escolha o seu <span style={{ color: '#008CFF' }}>reset.</span>
                        </h1>
                        <p className="mt-4 text-lg text-slate-500">
                            selecione uma categoria abaixo para começar sua jornada de alta performance.
                        </p>
                    </div>
                </div>
                {/* Subtle geometric accent */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-slate-100/60 to-transparent pointer-events-none" />
                <div style={{ height: '80px' }} />
            </section>

            {/* ─── Category Cards ───────────────────────────────── */}
            <section className="relative -mt-8 z-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {SERVICE_CATEGORIES.map((cat) => (
                            <CategoryCard
                                key={cat.id}
                                title={cat.title}
                                description={cat.description}
                                icon={cat.icon}
                                href={cat.href}
                                startingPrice={cat.startingPrice}
                                color={cat.color}
                                titleColor={cat.titleColor}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Void Club Feature ────────────────────────────── */}
            <section className="mt-4">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="relative overflow-hidden rounded-3xl bg-slate-900">
                        {/* Right half — image (full height) */}
                        <div className="hidden lg:block absolute top-0 right-0 w-1/2 h-full">
                            <img
                                src="/assets/images/void-club-hero.jpg"
                                alt="Void Club — experiência de flutuação"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent" />
                        </div>

                        {/* Left half — content */}
                        <div className="relative z-10 p-8 sm:p-12 lg:p-16 lg:w-1/2 space-y-5">
                            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-lilac-500/15 text-lilac-300 text-xs font-semibold rounded-full border border-lilac-500/25">
                                <Crown className="h-3.5 w-3.5" />
                                clube de vantagens — lista de espera aberta
                            </span>

                            <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
                                void{' '}
                                <span className="bg-gradient-to-r from-lilac-300 via-lilac-200 to-lilac-400 bg-clip-text text-transparent">
                                    club
                                </span>
                            </h2>

                            <p className="text-slate-400 max-w-md leading-relaxed">
                                assinatura mensal para quem busca consistência absoluta.
                                sessões de flutuação, massoterapia, preços especiais e prioridade total.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <Link
                                    to="/club#planos"
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-lilac-400 text-slate-900 text-sm font-semibold rounded-full transition-all duration-200 hover:bg-lilac-300 hover:gap-3 shadow-[0_0_25px_rgba(168,128,208,0.4)] hover:shadow-[0_0_35px_rgba(168,128,208,0.55)]"
                                >
                                    ver planos
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                                <Link
                                    to="/club"
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/15 text-white/90 text-sm font-medium rounded-full transition-all duration-200 hover:bg-white/10"
                                >
                                    entrar na lista de espera
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── Products ─────────────────────────────────────── */}
            <section className="mt-16 sm:mt-24 pb-20 sm:pb-28">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-end justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                                essenciais void
                            </h2>
                            <p className="mt-1 text-sm text-slate-500">
                                produtos para levar a experiência para casa.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {MOCK_PRODUCTS.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
