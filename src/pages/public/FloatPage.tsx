import { Link } from 'react-router-dom';
import { ArrowRight, Crown } from 'lucide-react';
import { useDragScroll } from '@/hooks/useDragScroll';
import {
    SiteAccordion,
    SiteAccordionItem,
    SiteAccordionTrigger,
    SiteAccordionContent,
} from '@/components/site/SiteAccordion';
import { CategoryCard } from '@/components/cards/CategoryCard';
import { SERVICE_CATEGORIES } from '@/lib/mockData';

// ─── Design tokens (void-site-v2) ─────────────────────────────────────────────
// alabaster: #e3e3d9 | gunmetal: #082b3b | tiffany: #b0d6cf | rust: #ab542b
// mauve: #ccb0f0 | deep-ocean: #07162b | ocean: #008cff | violet: #896dad

// ─── Data ─────────────────────────────────────────────────────────────────────

const REASONS = [
    { title: 'equilibrar', description: 'reduza a ansiedade e viva o presente', image: '/assets/images/reasons/reason-1.webp' },
    { title: 'esclarecer', description: 'faça uma pausa para colocar as ideias em dia', image: '/assets/images/reasons/reason-2.webp' },
    { title: 'desconectar e reconectar', description: 'desligue o mundo e foque no interior', image: '/assets/images/reasons/reason-3.webp' },
    { title: 'acalmar', description: 'reduza o estresse e melhore seu bem-estar', image: '/assets/images/reasons/reason-4.webp' },
    { title: 'recarregar', description: 'melhore o sono, relaxe e renove as energias', image: '/assets/images/reasons/reason-5.webp' },
    { title: 'aliviar', description: 'cuide naturalmente de suas dores físicas', image: '/assets/images/reasons/reason-6.webp' },
];


const VOID_ZERO_FEATURES = [
    { title: 'Espaço amplo', description: 'com 2,60m ele é projetado para oferecer liberdade de movimento e conforto durante a sessão.', image: '/assets/images/void-zero/void-zero-1.webp' },
    { title: 'Personalização de som e cores', description: 'escolha o som e a iluminação interna que mais combinam com seu momento ou desligue tudo.', image: '/assets/images/void-zero/void-zero-2.webp' },
    { title: 'Temperatura ajustada ao corpo', description: 'a água mantém a mesma temperatura da sua pele, proporcionando uma sensação de leveza e conforto.', image: '/assets/images/void-zero/void-zero-3.webp' },
    { title: 'Abertura manual', description: 'o tanque possui uma abertura interna manual, para que você possa entrar e sair no seu próprio tempo.', image: '/assets/images/void-zero/void-zero-4.webp' },
    { title: 'Gravidade zero', description: 'Flutue sem esforço em uma solução de 500 kg de sal de Epsom dissolvidos em 500 litros de água.', image: '/assets/images/void-zero/void-zero-5.webp' },
    { title: 'Isolamento total', description: 'os 8 centímetros de espessura do tanque bloqueiam todos os ruídos e estímulos externos.', image: '/assets/images/void-zero/void-zero-6.webp' },
    { title: 'Privacidade garantida', description: 'Sessões individuais em tanques perfeitamente isolados para uma experiência única e pessoal.', image: '/assets/images/void-zero/void-zero-7.webp' },
];

const ABOUT_IMAGES = [
    { src: '/assets/images/about/about-1.webp', alt: 'Fachada do spa VOID' },
    { src: '/assets/images/about/about-2.webp', alt: 'Cristal de relaxamento' },
    { src: '/assets/images/about/about-3.webp', alt: 'POD VOID' },
    { src: '/assets/images/about/about-4.webp', alt: 'Prateleira de produtos' },
    { src: '/assets/images/about/about-5.webp', alt: 'Entrada do estabelecimento' },
    { src: '/assets/images/about/about-6.webp', alt: 'Recepção' },
    { src: '/assets/images/about/about-7.webp', alt: 'Produtos de relaxamento' },
    { src: '/assets/images/about/about-8.webp', alt: 'Cadeiras do lounge' },
    { src: '/assets/images/about/about-9.webp', alt: 'Corredor para as salas' },
];

const FAQ_ITEMS = [
    { question: 'O que é a terapia de flutuação?', answer: 'A flutuação é uma prática feita em um tanque de privação sensorial, onde você flutua, sem esforço, em água com alta concentração de sal de Epsom.' },
    { question: 'Como é a sensação de flutuar?', answer: 'É como se você estivesse em gravidade zero, sem pressão no corpo. A água e a temperatura são ajustadas para que você se sinta completamente leve e confortável.' },
    { question: 'É seguro?', answer: 'Sim, a flutuação é completamente segura. O tanque é mantido em condições perfeitas de higiene, e você tem controle total da sua experiência.' },
    { question: 'Preciso saber nadar?', answer: 'Não! O sal faz você flutuar naturalmente. Mesmo quem nunca nadou antes vai flutuar sem esforço.' },
    { question: 'O que devo vestir?', answer: 'A flutuação é feita preferencialmente sem roupa, para que você possa sentir a experiência completa de privação sensorial.' },
    { question: 'Quanto tempo dura a sessão?', answer: 'Cada sessão de flutuação dura cerca de 1h30, sendo uma hora de flutuação e trinta minutos de preparo.' },
    { question: 'Quantas sessões são recomendadas?', answer: 'Depende dos seus objetivos. Muitas pessoas sentem os benefícios logo na primeira sessão.' },
    { question: 'O tanque é completamente fechado?', answer: 'Sim, mas você tem controle total. Pode abrir a porta a qualquer momento e ajustar a iluminação interna.' },
    { question: 'Preciso fazer algo antes de flutuar?', answer: 'É sempre recomendado evitar cafeína ou refeições pesadas antes da sessão.' },
    { question: 'Como faço para agendar?', answer: 'É simples! Clique no botão de agendamento e escolha o melhor horário para você.' },
];

const SCHEDULE_URL = 'https://wa.me/5541998010044?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20flutua%C3%A7%C3%A3o%20na%20VOID.';

const faqLeft = FAQ_ITEMS.filter((_, i) => i % 2 === 0);
const faqRight = FAQ_ITEMS.filter((_, i) => i % 2 !== 0);

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection() {
    return (
        <section className="relative w-full h-screen pb-10 md:pb-20 z-40">
            <video
                src="/videos/hero-video.mp4"
                autoPlay loop muted playsInline
                className="absolute h-full w-full object-cover -z-10"
            />
            {/* dark overlay */}
            <div className="absolute inset-0 bg-[#082b3b]/40 -z-10" />

            <div className="site-container flex flex-col h-full">
                <div className="flex flex-col h-96 md:h-auto gap-14 justify-between md:max-w-[560px] pt-[88px] 2xl:pt-40 text-[#e3e3d9]">
                    <div className="flex flex-col gap-6">
                        <h2
                            className="font-jakob text-[32px] md:text-5xl md:leading-[60px] lowercase text-[#e3e3d9]"
                            dangerouslySetInnerHTML={{ __html: 'o que a mente pensa, <br />o corpo sente.<br />cuide dos dois.' }}
                        />
                        <p
                            className="font-sf-pro text-xl leading-8 font-light text-[#e3e3d9]"
                            dangerouslySetInnerHTML={{ __html: 'conheça a VOID, o primeiro <br />spa de flutuação em Curitiba.' }}
                        />
                    </div>
                    <div className="mb-20">
                        <a
                            href={SCHEDULE_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center w-full md:w-fit px-8 py-3 rounded-full bg-[#e3e3d9] text-[#082b3b] font-jakob font-semibold lowercase hover:opacity-90 transition-opacity"
                        >
                            Agendar
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ─── Reasons ──────────────────────────────────────────────────────────────────

function ReasonsSection() {
    const { ref } = useDragScroll<HTMLUListElement>();

    return (
        <section id="flutuacao" className="bg-[#e3e3d9] py-30">
            <div className="flex flex-col gap-18 md:gap-20">
                <div className="site-container">
                    <h2 className="font-jakob text-[32px] md:text-5xl lowercase text-[#082b3b]">
                        motivos para flutuar
                    </h2>
                </div>

                <ul
                    ref={ref}
                    className="flex gap-5 h-fit scrollbar-none overflow-y-hidden cursor-grab overflow-x-auto"
                >
                    {REASONS.map((reason) => (
                        <li
                            key={reason.title}
                            className="first:pl-8 last:pr-8 xl:first:pl-30 xl:last:pr-30"
                        >
                            <div className="relative">
                                <img
                                    alt={reason.title}
                                    loading="lazy"
                                    draggable={false}
                                    src={reason.image}
                                    className="select-none min-w-[198px] min-h-[294px] md:min-w-[448px] md:h-[518px] bg-center object-cover rounded-3xl"
                                />
                                <div className="hidden md:block absolute -right-px top-12">
                                    <img
                                        alt=""
                                        src="/assets/svgs/card-border-wave.svg"
                                        width={48}
                                        height={213}
                                        className="select-none pointer-events-none"
                                    />
                                </div>
                            </div>
                            <div className="w-full flex flex-col gap-1 py-4 px-8">
                                <h3 className="font-jakob text-[20px] md:text-[2rem] leading-6 lowercase text-[#082b3b]">
                                    {reason.title}
                                </h3>
                                <p className="font-sf-pro text-xl leading-8 text-[#082b3b]">
                                    {reason.description}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

// ─── Escolha / Pricing Organism ───────────────────────────────────────────────

function PricingSection() {
    return (
        <section id="valores-flutuacao" className="bg-slate-50 pt-20 pb-4">
            {/* Header */}
            <div className="relative site-container pb-20">
                <div className="max-w-2xl">
                    <h2 className="font-jakob text-[32px] md:text-5xl lowercase text-[#082b3b] leading-[1.1]">
                        escolha o seu <span style={{ color: '#008CFF' }}>reset.</span>
                    </h2>
                    <p className="font-sf-pro mt-4 text-xl leading-8 text-[#082b3b]/70">
                        selecione uma categoria abaixo para começar sua jornada de alta performance.
                    </p>
                </div>
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-slate-100/60 to-transparent pointer-events-none" />
            </div>

            {/* Category cards */}
            <div className="relative -mt-8 z-10 site-container">
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

            {/* Void Club banner */}
            <div className="mt-4 site-container pb-8">
                <div className="relative overflow-hidden rounded-3xl bg-slate-900">
                    <div className="hidden lg:block absolute top-0 right-0 w-1/2 h-full">
                        <img
                            src="/assets/images/void-club-hero.jpg"
                            alt="Void Club"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent" />
                    </div>
                    <div className="relative z-10 p-8 sm:p-12 lg:p-16 lg:w-1/2 space-y-5">
                        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-lilac-500/15 text-lilac-300 text-xs font-semibold rounded-full border border-lilac-500/25">
                            <Crown className="h-3.5 w-3.5" />
                            clube de vantagens — lista de espera aberta
                        </span>
                        <h3 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
                            void{' '}
                            <span className="bg-gradient-to-r from-lilac-300 via-lilac-200 to-lilac-400 bg-clip-text text-transparent">
                                club
                            </span>
                        </h3>
                        <p className="text-slate-400 max-w-md leading-relaxed">
                            assinatura mensal para quem busca consistência absoluta.
                            sessões de flutuação, massoterapia, preços especiais e prioridade total.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Link
                                to="/club#planos"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-lilac-400 text-slate-900 text-sm font-semibold rounded-full transition-all duration-200 hover:bg-lilac-300 hover:gap-3 shadow-[0_0_25px_rgba(168,128,208,0.4)]"
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
    );
}

// ─── Schedule CTA ─────────────────────────────────────────────────────────────

function ScheduleCTASection() {
    return (
        <section className="w-full bg-[#b0d6cf]" id="agendar-flutuacao">
            <div className="site-container flex justify-center">
                <div className="flex flex-col gap-20 md:gap-30 py-20 md:py-40 w-full max-w-[1246px]">
                    {/* circle accent */}
                    <div className="w-15 h-15 rounded-full bg-[#ab542b] mx-auto" />

                    <div className="md:flex justify-between gap-8">
                        <div className="flex flex-col gap-10 w-full md:max-w-[434px] text-[#ab542b]">
                            <h2
                                className="font-jakob text-[32px] md:text-5xl leading-[3rem] md:leading-[4rem] lowercase"
                                dangerouslySetInnerHTML={{ __html: 'crie uma pausa <br />para respirar' }}
                            />
                            <p className="font-sf-pro text-2xl md:text-[28px] leading-8 md:max-w-80">
                                desligue o mundo exterior e foque no interior.
                            </p>
                            <a
                                href={SCHEDULE_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full md:w-fit px-8 py-3 rounded-full border-2 border-[#ab542b] text-[#ab542b] font-jakob font-semibold lowercase hover:bg-[#ab542b] hover:text-[#e3e3d9] transition-colors text-center"
                            >
                                Agendar flutuação
                            </a>
                        </div>
                        <img
                            alt="Ondas de flutuação"
                            src="/assets/svgs/wave-float-rotation.svg"
                            width={376}
                            height={365}
                            loading="lazy"
                            className="mx-auto mt-20 md:mt-0"
                        />
                    </div>

                    <img
                        alt="Onda em forma de pessoa"
                        src="/assets/svgs/mobile-wave.svg"
                        width={807}
                        height={278}
                        loading="lazy"
                        className="mx-auto"
                    />
                </div>
            </div>
        </section>
    );
}

// ─── Void Zero ────────────────────────────────────────────────────────────────

function VoidZeroSection() {
    const { ref } = useDragScroll<HTMLUListElement>();
    const gradient = 'radial-gradient(50.17% 54.87% at 63.49% 30.08%, #008cff33 0%, #04d9ff33 22.36%, #08172c33 100%), #07162b';

    return (
        <section
            id="void-zero"
            className="py-20 md:py-40 overflow-hidden"
            style={{ background: gradient }}
        >
            <div className="site-container">
                <div className="flex flex-col lg:flex-row md:gap-10 md:pb-30">
                    <div className="flex flex-col justify-center gap-6 md:gap-10 lg:max-w-lg">
                        <h2 className="font-jakob text-[32px] md:text-5xl lowercase text-[#e3e3d9]">
                            flutue no primeiro tanque de flutuação feito no Brasil
                        </h2>
                        <p className="font-sf-pro text-xl md:text-[28px] leading-8 md:leading-10 text-[#e3e3d9]">
                            VOID ZERO é o primeiro tanque de privação de sentidos produzido inteiramente no Brasil.
                        </p>
                    </div>
                    <img
                        alt="VOID ZERO"
                        src="/assets/images/pod2.webp"
                        loading="lazy"
                        className="w-full lg:w-auto lg:max-w-[730px] mx-auto my-20"
                    />
                </div>
            </div>

            <ul
                ref={ref}
                className="flex gap-5 mt-20 scrollbar-none overflow-x-auto cursor-grab"
            >
                {VOID_ZERO_FEATURES.map((feature) => (
                    <li
                        key={feature.title}
                        className="first:pl-8 last:pr-8 xl:first:pl-30 xl:last:pr-30"
                    >
                        <div className="relative min-w-[300px] md:min-w-[550px] overflow-hidden rounded-3xl">
                            <img
                                alt={feature.title}
                                src={feature.image}
                                loading="lazy"
                                draggable={false}
                                className="select-none w-full h-[400px] md:h-[550px] object-cover"
                            />
                        </div>
                        <div className="p-6 md:p-10">
                            <h3 className="font-jakob text-2xl leading-9 lowercase text-[#e3e3d9] font-semibold mb-2">
                                {feature.title}
                            </h3>
                            <p className="font-sf-pro text-xl leading-8 text-[#e3e3d9]">
                                {feature.description}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}

// ─── Highlights ───────────────────────────────────────────────────────────────

function HighlightsSection() {
    return (
        <section id="highlights" className="w-full bg-[#e3e3d9] py-20 md:py-40">
            <div className="site-container">
                <h2 className="font-jakob text-[32px] md:text-5xl lowercase text-[#082b3b] mb-10 md:mb-16">
                    aproveite também
                </h2>
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
                    {/* massoterapia */}
                    <Link to="/massoterapia" className="relative w-full h-[560px] lg:min-h-[720px] rounded-3xl overflow-hidden group">
                        <img
                            src="/assets/images/massoterapia-highlight.webp"
                            alt="Sessão de massoterapia"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#AB542B] to-transparent">
                            <div className="absolute bottom-0 flex flex-col p-8 lg:p-20 gap-4 text-[#e3e3d9]">
                                <h3 className="font-jakob text-[2rem] lg:text-5xl leading-none lowercase">massoterapia</h3>
                                <p className="font-sf-pro text-2xl lg:text-[1.75rem] leading-8">
                                    Combine sua flutuação com uma sessão de massoterapia para potencializar o relaxamento.
                                </p>
                            </div>
                        </div>
                    </Link>
                    {/* void clube */}
                    <Link to="/club" className="relative w-full h-[560px] lg:min-h-[720px] rounded-3xl overflow-hidden group">
                        <img
                            src="/assets/images/void-club-highlight.webp"
                            alt="VOID Clube"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#350A6C] to-transparent">
                            <div className="absolute bottom-0 flex flex-col p-8 lg:p-20 gap-4 text-[#e3e3d9]">
                                <h3 className="font-jakob text-[2rem] lg:text-5xl leading-none lowercase">void clube</h3>
                                <p className="font-sf-pro text-2xl lg:text-[1.75rem] leading-8">
                                    Assine o VOID Clube e tenha acesso a sessões de flutuação com valores exclusivos.
                                </p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
}

// ─── About ────────────────────────────────────────────────────────────────────

function AboutSection() {
    const { ref } = useDragScroll<HTMLUListElement>();

    const paragraphs = [
        'imersa no coração de Curitiba, a VOID oferece um ambiente ideal para quem busca uma pausa na vida na cidade.',
        'cada detalhe proporciona conforto, tranquilidade e diferentes experiências sensoriais.',
    ];

    return (
        <section id="sobre" className="relative bg-[#e3e3d9] py-20 md:py-40 overflow-hidden">
            <img
                src="/assets/svgs/wave-float-rotation.svg"
                alt=""
                aria-hidden
                className="absolute top-0 left-0 w-full h-full object-cover opacity-10 pointer-events-none animate-[spin_40s_linear_infinite]"
            />

            {/* mobile text */}
            <div className="md:hidden site-container relative z-10">
                <div className="mb-10">
                    <h2 className="font-jakob text-[#082b3b] text-[32px] leading-10 lowercase mb-4">essa é a VOID</h2>
                    <p className="font-sf-pro text-[#082b3b] text-xl leading-8">
                        {paragraphs[0]}<br /><br />{paragraphs[1]}
                    </p>
                </div>
            </div>

            {/* carousel */}
            <div className="relative z-10">
                <ul
                    ref={ref}
                    className="flex gap-5 scrollbar-none overflow-x-auto cursor-grab"
                >
                    {/* desktop text block inside carousel */}
                    <li className="hidden md:flex items-center min-w-[400px] lg:min-w-[500px] pl-8 xl:pl-30 flex-shrink-0">
                        <div className="flex flex-col gap-6">
                            <h2 className="font-jakob text-[#082b3b] text-5xl leading-[60px] lowercase">essa é a VOID</h2>
                            <p className="font-sf-pro text-[#082b3b] text-xl md:text-2xl leading-8">
                                {paragraphs[0]}<br /><br />{paragraphs[1]}
                            </p>
                        </div>
                    </li>

                    {ABOUT_IMAGES.map((img, i) => (
                        <li
                            key={img.src}
                            className={i === ABOUT_IMAGES.length - 1 ? 'pr-8 xl:pr-30 flex-shrink-0' : 'flex-shrink-0'}
                        >
                            <img
                                src={img.src}
                                alt={img.alt}
                                loading="lazy"
                                draggable={false}
                                className="select-none min-w-[224px] md:min-w-[336px] h-[350px] md:h-[518px] object-cover rounded-3xl"
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

function FAQSection() {
    return (
        <section id="perguntas-frequentes" className="relative z-10 w-full bg-[#ccb0f0] py-20 md:py-40">
            <div className="site-container">
                <h2 className="font-jakob text-[32px] md:text-5xl leading-[3rem] md:leading-[3.75rem] lowercase text-[#082b3b] mb-20">
                    dúvidas frequentes
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-5 items-start">
                    {/* left column */}
                    <SiteAccordion type="multiple" className="flex flex-col gap-5">
                        {faqLeft.map((item, i) => (
                            <SiteAccordionItem
                                key={item.question}
                                value={`faq-l-${i}`}
                                className="flex flex-col items-center rounded-3xl bg-[#896dad] border-none transition-colors duration-500 data-[state=open]:bg-white"
                            >
                                <SiteAccordionTrigger className="w-full p-6 md:p-8 rounded-3xl lowercase hover:no-underline text-[#e3e3d9] data-[state=open]:text-[#896dad]">
                                    <span className="font-jakob text-2xl leading-10 text-left">{item.question}</span>
                                </SiteAccordionTrigger>
                                <SiteAccordionContent className="px-6 md:px-8 pb-6 md:pb-8 text-[#082b3b]">
                                    <p className="font-sf-pro text-base pt-6">{item.answer}</p>
                                </SiteAccordionContent>
                            </SiteAccordionItem>
                        ))}
                    </SiteAccordion>

                    {/* right column */}
                    <SiteAccordion type="multiple" className="flex flex-col gap-5">
                        {faqRight.map((item, i) => (
                            <SiteAccordionItem
                                key={item.question}
                                value={`faq-r-${i}`}
                                className="flex flex-col items-center rounded-3xl bg-[#896dad] border-none transition-colors duration-500 data-[state=open]:bg-white"
                            >
                                <SiteAccordionTrigger className="w-full p-6 md:p-8 rounded-3xl lowercase hover:no-underline text-[#e3e3d9] data-[state=open]:text-[#896dad]">
                                    <span className="font-jakob text-2xl leading-10 text-left">{item.question}</span>
                                </SiteAccordionTrigger>
                                <SiteAccordionContent className="px-6 md:px-8 pb-6 md:pb-8 text-[#082b3b]">
                                    <p className="font-sf-pro text-base pt-6">{item.answer}</p>
                                </SiteAccordionContent>
                            </SiteAccordionItem>
                        ))}
                    </SiteAccordion>
                </div>
            </div>
        </section>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FloatPage() {
    return (
        <main className="bg-[#e3e3d9]">
            <HeroSection />
            <ReasonsSection />
            <PricingSection />
            <ScheduleCTASection />
            <VoidZeroSection />
            <HighlightsSection />
            <AboutSection />
            <FAQSection />
        </main>
    );
}
