import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Clock, Phone, Instagram, Mail, Droplets, Heart, Users, Sparkles } from 'lucide-react';

const VALUES = [
    { icon: Droplets, title: 'ciência real', desc: 'baseado em pesquisas neurocientíficas sobre privação sensorial e seus benefícios comprovados' },
    { icon: Heart, title: 'cuidado genuíno', desc: 'cada detalhe é pensado para sua segurança, conforto e transformação pessoal' },
    { icon: Users, title: 'comunidade', desc: 'um espaço de encontro para pessoas que buscam desacelerar e se reconectar' },
    { icon: Sparkles, title: 'experiência', desc: 'não é só um serviço — é um convite para explorar o que existe além do silêncio' },
];

const STATS = [
    { number: '478+', label: 'clientes ativos' },
    { number: '2.500+', label: 'sessões realizadas' },
    { number: '4.8', label: 'avaliação média' },
    { number: '2024', label: 'desde' },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            {/* Hero */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                        sobre a void
                    </h1>
                    <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
                        nascemos com uma missão: criar o espaço mais avançado de desconexão sensorial em curitiba.
                        um laboratório onde ciência, tecnologia e bem-estar se encontram.
                    </p>
                </div>
            </section>

            {/* Stats */}
            <section className="px-4 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {STATS.map(({ number, label }) => (
                        <div key={label} className="bg-white rounded-xl border border-slate-100 p-5 text-center">
                            <p className="text-2xl font-bold text-slate-900">{number}</p>
                            <p className="text-xs text-slate-500 mt-1">{label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Mission */}
            <section className="px-4 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl border border-cyan-100 p-8 md:p-12">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">nossa missão</h2>
                        <p className="text-slate-600 leading-relaxed">
                            proporcionar experiências de flutuação terapêutica e massagem de alto nível,
                            utilizando tecnologia de ponta e práticas baseadas em evidência científica.
                            queremos que cada pessoa que entre na void saia transformada — mais leve,
                            mais presente, mais conectada consigo mesma.
                        </p>
                        <p className="text-slate-600 leading-relaxed mt-4">
                            acreditamos que em um mundo que nunca para, a pausa é o ato mais revolucionário.
                            a void é o seu refúgio de silêncio em uma cidade barulhenta.
                        </p>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="px-4 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">nossos valores</h2>
                    <div className="grid md:grid-cols-2 gap-5">
                        {VALUES.map(({ icon: Icon, title, desc }) => (
                            <div key={title} className="bg-white rounded-xl border border-slate-100 p-6 hover:shadow-sm transition-shadow">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 rounded-lg bg-slate-50">
                                        <Icon className="h-5 w-5 text-slate-600" />
                                    </div>
                                    <h3 className="font-semibold text-slate-900">{title}</h3>
                                </div>
                                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Location & Contact */}
            <section className="px-4 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl border border-slate-100 p-6">
                        <h3 className="font-semibold text-slate-900 mb-4">onde estamos</h3>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <MapPin className="h-4 w-4 text-slate-400 mt-0.5 shrink-0" />
                                <div>
                                    <p className="text-sm text-slate-700">Curitiba, PR — Brasil</p>
                                    <p className="text-xs text-slate-500">centro / água verde (verificar endereço exato)</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Clock className="h-4 w-4 text-slate-400 shrink-0" />
                                <p className="text-sm text-slate-700">seg–sáb: 9h–21h</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-100 p-6">
                        <h3 className="font-semibold text-slate-900 mb-4">contato</h3>
                        <div className="space-y-3">
                            <a href="https://instagram.com/voidfloat" target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-3 text-sm text-slate-700 hover:text-slate-900 transition-colors">
                                <Instagram className="h-4 w-4 text-slate-400 shrink-0" />
                                @voidfloat
                            </a>
                            <a href="tel:+5541999999999" className="flex items-center gap-3 text-sm text-slate-700 hover:text-slate-900 transition-colors">
                                <Phone className="h-4 w-4 text-slate-400 shrink-0" />
                                (41) 99999-9999
                            </a>
                            <a href="mailto:contato@voidfloat.com.br" className="flex items-center gap-3 text-sm text-slate-700 hover:text-slate-900 transition-colors">
                                <Mail className="h-4 w-4 text-slate-400 shrink-0" />
                                contato@voidfloat.com.br
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="px-4 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto bg-slate-900 rounded-2xl p-8 md:p-12 text-center">
                        <h2 className="text-2xl font-bold text-white">pronto para desconectar?</h2>
                        <p className="mt-2 text-slate-400 text-sm">
                            agende sua sessão e descubra o poder do silêncio
                        </p>
                        <Link
                            to="/schedule"
                            className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 font-medium rounded-lg hover:bg-slate-100 transition-colors text-sm"
                        >
                            agendar agora
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
