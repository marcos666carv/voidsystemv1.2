// ─── tokens.ts ────────────────────────────────────────────────────────────────
// Fonte única de verdade de todos os design tokens do void system v1.3.

// ─── TIPOGRAFIA ───────────────────────────────────────────────────────────────

export type FontSample = {
    label: string;
    fontClass: string;          // 'font-jakob' | 'font-sf-pro' | ''
    sizeToken: string;          // descrição do token Tailwind original
    defaultSize: string;        // valor CSS editável ex: '48px', '2rem'
    defaultWeight: string;      // '400'
    cssVarSize: string;         // '--ds-jakob-display-size'
    cssVarWeight: string;       // '--ds-jakob-display-weight'
    source: string;
    sampleText: string;
};

export const JAKOB_SAMPLES: FontSample[] = [
    {
        label: 'display',
        fontClass: 'font-jakob',
        sizeToken: 'text-5xl (48px)',
        defaultSize: '48px',
        defaultWeight: '400',
        cssVarSize: '--ds-jakob-display-size',
        cssVarWeight: '--ds-jakob-display-weight',
        source: 'src/pages/public/AboutSection · FloatPage',
        sampleText: 'essa é a void',
    },
    {
        label: 'heading-1',
        fontClass: 'font-jakob',
        sizeToken: 'text-[32px] → md:text-5xl',
        defaultSize: '32px',
        defaultWeight: '400',
        cssVarSize: '--ds-jakob-h1-size',
        cssVarWeight: '--ds-jakob-h1-weight',
        source: 'src/pages/public/FloatPage.tsx:86',
        sampleText: 'o que a mente pensa, o corpo sente.',
    },
    {
        label: 'heading-2',
        fontClass: 'font-jakob',
        sizeToken: 'text-[32px] → md:text-5xl',
        defaultSize: '32px',
        defaultWeight: '400',
        cssVarSize: '--ds-jakob-h2-size',
        cssVarWeight: '--ds-jakob-h2-weight',
        source: 'src/pages/public/FloatPage.tsx:119',
        sampleText: 'motivos para flutuar',
    },
    {
        label: 'cta-heading',
        fontClass: 'font-jakob',
        sizeToken: 'text-[32px] → md:text-5xl',
        defaultSize: '32px',
        defaultWeight: '600',
        cssVarSize: '--ds-jakob-cta-size',
        cssVarWeight: '--ds-jakob-cta-weight',
        source: 'src/pages/public/FloatPage.tsx:264',
        sampleText: 'crie uma pausa para respirar',
    },
    {
        label: 'card-title',
        fontClass: 'font-jakob',
        sizeToken: 'text-[20px] → md:text-[2rem]',
        defaultSize: '20px',
        defaultWeight: '400',
        cssVarSize: '--ds-jakob-card-size',
        cssVarWeight: '--ds-jakob-card-weight',
        source: 'src/pages/public/FloatPage.tsx:152',
        sampleText: 'equilibrar',
    },
    {
        label: 'feature-title',
        fontClass: 'font-jakob',
        sizeToken: 'text-2xl (24px)',
        defaultSize: '24px',
        defaultWeight: '600',
        cssVarSize: '--ds-jakob-feature-size',
        cssVarWeight: '--ds-jakob-feature-weight',
        source: 'src/pages/public/FloatPage.tsx:353',
        sampleText: 'espaço amplo',
    },
    {
        label: 'faq-question',
        fontClass: 'font-jakob',
        sizeToken: 'text-2xl (24px)',
        defaultSize: '24px',
        defaultWeight: '400',
        cssVarSize: '--ds-jakob-faq-size',
        cssVarWeight: '--ds-jakob-faq-weight',
        source: 'src/pages/public/FloatPage.tsx:500',
        sampleText: 'como funciona a flutuação?',
    },
    {
        label: 'highlight-card',
        fontClass: 'font-jakob',
        sizeToken: 'text-[2rem] → lg:text-5xl',
        defaultSize: '32px',
        defaultWeight: '400',
        cssVarSize: '--ds-jakob-highlight-size',
        cssVarWeight: '--ds-jakob-highlight-weight',
        source: 'src/pages/public/FloatPage.tsx:386',
        sampleText: 'massoterapia',
    },
];

export const SF_PRO_SAMPLES: FontSample[] = [
    {
        label: 'hero-body',
        fontClass: 'font-sf-pro',
        sizeToken: 'text-xl (20px)',
        defaultSize: '20px',
        defaultWeight: '300',
        cssVarSize: '--ds-sfpro-hero-size',
        cssVarWeight: '--ds-sfpro-hero-weight',
        source: 'src/pages/public/FloatPage.tsx:89',
        sampleText: 'conheça a VOID, o primeiro spa de flutuação em Curitiba.',
    },
    {
        label: 'body-lg',
        fontClass: 'font-sf-pro',
        sizeToken: 'text-xl (20px)',
        defaultSize: '20px',
        defaultWeight: '400',
        cssVarSize: '--ds-sfpro-bodylg-size',
        cssVarWeight: '--ds-sfpro-bodylg-weight',
        source: 'src/pages/public/FloatPage.tsx:155',
        sampleText: 'reduza a ansiedade e viva o presente.',
    },
    {
        label: 'cta-body',
        fontClass: 'font-sf-pro',
        sizeToken: 'text-2xl → text-[28px]',
        defaultSize: '24px',
        defaultWeight: '400',
        cssVarSize: '--ds-sfpro-cta-size',
        cssVarWeight: '--ds-sfpro-cta-weight',
        source: 'src/pages/public/FloatPage.tsx:267',
        sampleText: 'desligue o mundo exterior e foque no interior.',
    },
    {
        label: 'highlights-desc',
        fontClass: 'font-sf-pro',
        sizeToken: 'text-2xl → text-[1.75rem]',
        defaultSize: '24px',
        defaultWeight: '400',
        cssVarSize: '--ds-sfpro-highlights-size',
        cssVarWeight: '--ds-sfpro-highlights-weight',
        source: 'src/pages/public/FloatPage.tsx:387',
        sampleText: 'Combine flutuação com massoterapia para potencializar o relaxamento.',
    },
    {
        label: 'faq-answer',
        fontClass: 'font-sf-pro',
        sizeToken: 'text-base (16px)',
        defaultSize: '16px',
        defaultWeight: '400',
        cssVarSize: '--ds-sfpro-faq-size',
        cssVarWeight: '--ds-sfpro-faq-weight',
        source: 'src/pages/public/FloatPage.tsx:503',
        sampleText: 'A flutuação é completamente segura. Você tem controle total da experiência.',
    },
    {
        label: 'about-body',
        fontClass: 'font-sf-pro',
        sizeToken: 'text-xl → text-2xl',
        defaultSize: '20px',
        defaultWeight: '400',
        cssVarSize: '--ds-sfpro-about-size',
        cssVarWeight: '--ds-sfpro-about-weight',
        source: 'src/pages/public/FloatPage.tsx:454',
        sampleText: 'imersa no coração de Curitiba, a VOID oferece um ambiente ideal para quem busca uma pausa.',
    },
];

export const INTER_SAMPLES: FontSample[] = [
    {
        label: 'page-title',
        fontClass: '',
        sizeToken: 'text-3xl (30px)',
        defaultSize: '30px',
        defaultWeight: '700',
        cssVarSize: '--ds-inter-title-size',
        cssVarWeight: '--ds-inter-title-weight',
        source: 'src/pages/admin/SystemMap.tsx:8',
        sampleText: 'Design System',
    },
    {
        label: 'section-heading',
        fontClass: '',
        sizeToken: 'text-xl (20px)',
        defaultSize: '20px',
        defaultWeight: '600',
        cssVarSize: '--ds-inter-section-size',
        cssVarWeight: '--ds-inter-section-weight',
        source: 'src/layouts/AdminLayout.tsx:67',
        sampleText: 'Tipografia',
    },
    {
        label: 'nav-item',
        fontClass: '',
        sizeToken: 'text-sm (14px)',
        defaultSize: '14px',
        defaultWeight: '500',
        cssVarSize: '--ds-inter-nav-size',
        cssVarWeight: '--ds-inter-nav-weight',
        source: 'src/layouts/AdminLayout.tsx:45',
        sampleText: 'Mission Control',
    },
    {
        label: 'body-default',
        fontClass: '',
        sizeToken: 'text-sm (14px)',
        defaultSize: '14px',
        defaultWeight: '400',
        cssVarSize: '--ds-inter-body-size',
        cssVarWeight: '--ds-inter-body-weight',
        source: 'src/components/cards/CategoryCard.tsx:66',
        sampleText: 'Sessões de flutuação com preços especiais e prioridade total.',
    },
    {
        label: 'meta / badge',
        fontClass: '',
        sizeToken: 'text-xs (12px)',
        defaultSize: '12px',
        defaultWeight: '600',
        cssVarSize: '--ds-inter-badge-size',
        cssVarWeight: '--ds-inter-badge-weight',
        source: 'src/components/ui/badge.tsx:7',
        sampleText: 'VOID CLUB',
    },
    {
        label: 'caption',
        fontClass: '',
        sizeToken: 'text-xs (12px)',
        defaultSize: '12px',
        defaultWeight: '400',
        cssVarSize: '--ds-inter-caption-size',
        cssVarWeight: '--ds-inter-caption-weight',
        source: 'src/components/shop/CartDrawer.tsx:51',
        sampleText: 'Cancelamento gratuito até 24h antes da sessão.',
    },
];

// ─── CORES ────────────────────────────────────────────────────────────────────

export type ColorSwatch = {
    name: string;
    cssVar: string;
    hex: string;
    source: string;
    textDark: boolean;
    twBgClass: string;
};

export const SITE_COLORS: ColorSwatch[] = [
    { name: 'Alabaster',       cssVar: '--color-alabaster',        hex: '#e3e3d9', source: 'src/index.css:108', textDark: true,  twBgClass: 'bg-[#e3e3d9]' },
    { name: 'Gunmetal',        cssVar: '--color-gunmetal',         hex: '#082b3b', source: 'src/index.css:109', textDark: false, twBgClass: 'bg-[#082b3b]' },
    { name: 'Tiffany',         cssVar: '--color-tiffany',          hex: '#b0d6cf', source: 'src/index.css:110', textDark: true,  twBgClass: 'bg-[#b0d6cf]' },
    { name: 'Rust',            cssVar: '--color-rust',             hex: '#ab542b', source: 'src/index.css:111', textDark: false, twBgClass: 'bg-[#ab542b]' },
    { name: 'Ocean',           cssVar: '--color-ocean',            hex: '#008cff', source: 'src/index.css:112', textDark: false, twBgClass: 'bg-[#008cff]' },
    { name: 'Mauve',           cssVar: '--color-mauve',            hex: '#ccb0f0', source: 'src/index.css:113', textDark: true,  twBgClass: 'bg-[#ccb0f0]' },
    { name: 'Silver',          cssVar: '--color-silver',           hex: '#86868b', source: 'src/index.css:114', textDark: false, twBgClass: 'bg-[#86868b]' },
    { name: 'Deep Ocean',      cssVar: '--color-deep-ocean',       hex: '#07162b', source: 'src/index.css:115', textDark: false, twBgClass: 'bg-[#07162b]' },
    { name: 'Electric Violet', cssVar: '--color-eletric-violet',   hex: '#896dad', source: 'src/index.css:116', textDark: false, twBgClass: 'bg-[#896dad]' },
];

export type ColorScale = {
    name: string;
    tokenPrefix: string;
    source: string;
    shades: { step: number; hex: string }[];
};

export const APP_COLOR_SCALES: ColorScale[] = [
    {
        name: 'Lilac',
        tokenPrefix: 'lilac',
        source: 'tailwind.config.js:43',
        shades: [
            { step: 50,  hex: '#F5F0FA' },
            { step: 100, hex: '#EDE4F7' },
            { step: 200, hex: '#DCC8F0' },
            { step: 300, hex: '#CCB0F0' },
            { step: 400, hex: '#B898E0' },
            { step: 500, hex: '#A880D0' },
            { step: 600, hex: '#9060C0' },
            { step: 700, hex: '#7548A0' },
            { step: 800, hex: '#5A3580' },
            { step: 900, hex: '#3F2460' },
            { step: 950, hex: '#241440' },
        ],
    },
    {
        name: 'Void',
        tokenPrefix: 'void',
        source: 'tailwind.config.js:56',
        shades: [
            { step: 50,  hex: '#E8F0F4' },
            { step: 100, hex: '#C8DBE3' },
            { step: 200, hex: '#9BBCC9' },
            { step: 300, hex: '#6E9DAF' },
            { step: 400, hex: '#4A7E95' },
            { step: 500, hex: '#2E5F7A' },
            { step: 600, hex: '#1A4560' },
            { step: 700, hex: '#103549' },
            { step: 800, hex: '#08283B' },
            { step: 900, hex: '#051C2A' },
            { step: 950, hex: '#030F18' },
        ],
    },
];

// ─── ESPAÇAMENTO ──────────────────────────────────────────────────────────────

export type SpacingToken = {
    key: string;
    value: string;
    px: number;
};

export const CUSTOM_SPACING: SpacingToken[] = [
    { key: '13',  value: '3.25rem', px: 52  },
    { key: '15',  value: '3.75rem', px: 60  },
    { key: '18',  value: '4.5rem',  px: 72  },
    { key: '22',  value: '5.5rem',  px: 88  },
    { key: '26',  value: '6.5rem',  px: 104 },
    { key: '30',  value: '7.5rem',  px: 120 },
    { key: '34',  value: '8.5rem',  px: 136 },
    { key: '38',  value: '9.5rem',  px: 152 },
    { key: '42',  value: '10.5rem', px: 168 },
    { key: '46',  value: '11.5rem', px: 184 },
    { key: '50',  value: '12.5rem', px: 200 },
    { key: '54',  value: '13.5rem', px: 216 },
    { key: '58',  value: '14.5rem', px: 232 },
    { key: '66',  value: '16.5rem', px: 264 },
    { key: '68',  value: '17rem',   px: 272 },
    { key: '70',  value: '17.5rem', px: 280 },
    { key: '74',  value: '18.5rem', px: 296 },
    { key: '76',  value: '19rem',   px: 304 },
    { key: '78',  value: '19.5rem', px: 312 },
    { key: '82',  value: '20.5rem', px: 328 },
    { key: '84',  value: '21rem',   px: 336 },
    { key: '86',  value: '21.5rem', px: 344 },
    { key: '88',  value: '22rem',   px: 352 },
    { key: '90',  value: '22.5rem', px: 360 },
    { key: '92',  value: '23rem',   px: 368 },
    { key: '94',  value: '23.5rem', px: 376 },
    { key: '100', value: '25rem',   px: 400 },
    { key: '104', value: '26rem',   px: 416 },
    { key: '108', value: '27rem',   px: 432 },
    { key: '112', value: '28rem',   px: 448 },
    { key: '116', value: '29rem',   px: 464 },
    { key: '120', value: '30rem',   px: 480 },
    { key: '128', value: '32rem',   px: 512 },
    { key: '132', value: '33rem',   px: 528 },
    { key: '136', value: '34rem',   px: 544 },
    { key: '140', value: '35rem',   px: 560 },
    { key: '144', value: '36rem',   px: 576 },
    { key: '160', value: '40rem',   px: 640 },
    { key: '176', value: '44rem',   px: 704 },
];

// ─── FONT FAMILY VARS ─────────────────────────────────────────────────────────

export const FONT_VARS = [
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
] as const;

// ─── SEÇÕES DE NAVEGAÇÃO ──────────────────────────────────────────────────────

export const DS_SECTIONS = [
    { id: 'typography', label: 'Tipografia' },
    { id: 'colors',     label: 'Cores' },
    { id: 'spacing',    label: 'Espaçamento' },
    { id: 'components', label: 'Componentes' },
] as const;
