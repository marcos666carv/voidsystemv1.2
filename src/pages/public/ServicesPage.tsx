import { Link } from 'react-router-dom';
import { Droplets, Clock, Brain, Sparkles, Heart, ArrowRight, Star, Zap, Shield } from 'lucide-react';

const SERVICES = [
    {
        id: 'float-60',
        name: 'flutuação 60min',
        description: 'sessão clássica de isolamento sensorial. tanque privativo com 600kg de sal epsom, temperatura corporal, silêncio absoluto.',
        duration: '60 min',
        price: 189,
        icon: Droplets,
        benefits: ['redução de estresse', 'alívio muscular', 'clareza mental', 'sono profundo'],
        color: 'from-cyan-500/10 to-blue-500/10',
        borderColor: 'border-cyan-200',
        iconColor: 'text-cyan-600',
    },
    {
        id: 'float-90',
        name: 'flutuação 90min',
        description: 'sessão estendida para imersão mais profunda. ideal para praticantes experientes ou tratamento terapêutico.',
        duration: '90 min',
        price: 249,
        icon: Clock,
        benefits: ['meditação profunda', 'recuperação muscular', 'criatividade expandida', 'neuroplasticidade'],
        color: 'from-indigo-500/10 to-cyan-500/10',
        borderColor: 'border-indigo-200',
        iconColor: 'text-indigo-600',
        popular: true,
    },
    {
        id: 'massage-60',
        name: 'massagem terapêutica 60min',
        description: 'técnicas integradas de massagem profunda, liberação miofascial e relaxamento. complemento perfeito para float.',
        duration: '60 min',
        price: 159,
        icon: Heart,
        benefits: ['liberação de tensão', 'flexibilidade', 'circulação', 'bem-estar'],
        color: 'from-rose-500/10 to-orange-500/10',
        borderColor: 'border-rose-200',
        iconColor: 'text-rose-600',
    },
    {
        id: 'combo',
        name: 'combo float + massagem',
        description: 'a experiência completa. flutuação seguida de massagem — peak relaxation. o mais procurado da void.',
        duration: '120 min',
        price: 329,
        icon: Sparkles,
        benefits: ['experiência completa', 'relaxamento máximo', 'desconexão total', 'transformação'],
        color: 'from-amber-500/10 to-rose-500/10',
        borderColor: 'border-amber-200',
        iconColor: 'text-amber-600',
        bestValue: true,
    },
];

const FEATURES = [
    { icon: Shield, label: 'tanques privativos com higienização UV' },
    { icon: Star, label: '600kg de sal epsom de grau farmacêutico' },
    { icon: Zap, label: 'temperatura precisamente controlada a 35.5°C' },
    { icon: Brain, label: 'isolamento acústico e visual completo' },
];

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            {/* Hero */}
            <section className="relative py-20 px-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="inline-block px-3 py-1 bg-cyan-50 text-cyan-700 text-xs font-medium rounded-full border border-cyan-200 mb-6">
                        experiências void
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
                        nossos serviços
                    </h1>
                    <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
                        cada sessão é uma jornada de desconexão e reconexão consigo mesmo.
                        escolha sua experiência ideal.
                    </p>
                </div>
            </section>

            {/* Features strip */}
            <section className="px-4 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {FEATURES.map(({ icon: Icon, label }) => (
                        <div key={label} className="flex items-center gap-2.5 p-3 bg-white rounded-xl border border-slate-100 shadow-sm">
                            <Icon className="h-4 w-4 text-slate-400 shrink-0" />
                            <span className="text-xs text-slate-600">{label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Services grid */}
            <section className="px-4 pb-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-6">
                    {SERVICES.map((service) => {
                        const Icon = service.icon;
                        return (
                            <div
                                key={service.id}
                                className={`group relative bg-gradient-to-br ${service.color} rounded-2xl border ${service.borderColor} p-6 hover:shadow-lg transition-all duration-300`}
                            >
                                {service.popular && (
                                    <span className="absolute top-4 right-4 px-2.5 py-0.5 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-full">
                                        mais popular
                                    </span>
                                )}
                                {service.bestValue && (
                                    <span className="absolute top-4 right-4 px-2.5 py-0.5 bg-amber-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-full">
                                        melhor custo-benefício
                                    </span>
                                )}

                                <div className="flex items-start gap-4">
                                    <div className={`p-3 rounded-xl bg-white/80 ${service.iconColor}`}>
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-slate-900">{service.name}</h3>
                                        <p className="text-xs text-slate-500 mt-0.5">{service.duration}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-2xl font-bold text-slate-900">R${service.price}</span>
                                    </div>
                                </div>

                                <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                                    {service.description}
                                </p>

                                <div className="mt-4 flex flex-wrap gap-1.5">
                                    {service.benefits.map((b) => (
                                        <span key={b} className="px-2 py-0.5 bg-white/60 rounded-full text-[11px] text-slate-600 border border-white/80">
                                            {b}
                                        </span>
                                    ))}
                                </div>

                                <Link
                                    to="/schedule"
                                    className="mt-5 w-full py-2.5 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                                >
                                    agendar
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* CTA */}
            <section className="px-4 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto bg-slate-900 rounded-2xl p-8 md:p-12 text-center">
                        <h2 className="text-2xl font-bold text-white">primeira vez?</h2>
                        <p className="mt-2 text-slate-400 text-sm">
                            agende sua primeira sessão com 15% de desconto e descubra a experiência
                        </p>
                        <Link
                            to="/schedule"
                            className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 font-medium rounded-lg hover:bg-slate-100 transition-colors text-sm"
                        >
                            agendar primeira sessão
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
