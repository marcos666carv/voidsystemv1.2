import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Menu, X, User, LogIn, Gift } from 'lucide-react';
import { useState, useEffect } from 'react';

function VoidLogo({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="82"
            height="21"
            viewBox="0 0 164 42"
            fill="currentColor"
            className={className}
            aria-label="VOID"
        >
            <path d="M149.18 11.3899H135.3V41.0099H149.18C157.34 41.0099 163.99 34.3699 163.99 26.1999C163.99 18.0299 157.35 11.3899 149.18 11.3899ZM149.18 36.4299H139.87V15.9699H149.18C154.82 15.9699 159.41 20.5599 159.41 26.1999C159.41 31.8399 154.82 36.4299 149.18 36.4299Z" />
            <path d="M112.37 11.3899H107.79V41.0099H112.37V11.3899Z" />
            <path d="M22.46 35.1599C21.82 36.5299 20.53 37.3499 19.02 37.3499C17.51 37.3499 16.22 36.5299 15.58 35.1599L4.1 10.5299L0 12.4399L11.48 37.0699C12.86 40.0399 15.75 41.8799 19.03 41.8799C22.31 41.8799 25.19 40.0399 26.58 37.0699L38.05 12.4299L33.95 10.5199L22.48 35.1499L22.46 35.1599Z" />
            <path d="M69.18 -0.000106812C60.53 -0.000106812 53.5 7.02989 53.5 15.6799C53.5 24.3299 60.53 31.3599 69.18 31.3599C77.83 31.3599 84.86 24.3299 84.86 15.6799C84.86 7.02989 77.83 -0.000106812 69.18 -0.000106812ZM69.18 26.7099C63.1 26.7099 58.14 21.7599 58.14 15.6699C58.14 9.57989 63.09 4.62989 69.18 4.62989C75.27 4.62989 80.22 9.57989 80.22 15.6699C80.22 21.7599 75.27 26.7099 69.18 26.7099Z" />
        </svg>
    );
}

const NAV_LINKS = [
    { href: '/flutuacao', label: 'flutuação' },
    { href: '/massoterapia', label: 'massoterapia' },
    { href: '/club', label: 'void club' },
    { href: '/about', label: 'sobre' },
];

// Pages that start with a dark full-screen hero — nav begins transparent
const DARK_HERO_PAGES = ['/', '/flutuacao', '/massoterapia', '/club', '/about'];

export function Navbar() {
    const { isAuthenticated } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    const hasDarkHero = DARK_HERO_PAGES.includes(location.pathname);
    const transparent = hasDarkHero && !scrolled && !isOpen;

    useEffect(() => { setIsOpen(false); }, [location.pathname]);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const profileHref = '/app';

    return (
        <nav className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
            transparent
                ? 'top-24 bg-transparent border-b border-transparent shadow-none'
                : 'top-0 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100'
        }`}>
            <div className="site-container">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className={`flex items-center transition-colors duration-300 ${transparent ? 'text-white' : 'text-slate-900'}`}>
                        <VoidLogo />
                    </Link>

                    {/* Desktop Nav — center */}
                    <div className="hidden md:flex items-center gap-1">
                        {NAV_LINKS.map((link) =>
                            'external' in link && link.external ? (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
                                        transparent
                                            ? 'text-white/80 hover:text-white hover:bg-white/10'
                                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                    }`}
                                >
                                    {link.label}
                                </a>
                            ) : (
                                <NavLink
                                    key={link.href}
                                    to={link.href}
                                    end={link.href === '/'}
                                    className={({ isActive }) =>
                                        `px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
                                            transparent
                                                ? isActive
                                                    ? 'text-white bg-white/15 font-semibold'
                                                    : 'text-white/80 hover:text-white hover:bg-white/10'
                                                : isActive
                                                    ? 'text-slate-900 bg-slate-100'
                                                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                        }`
                                    }
                                >
                                    {link.label}
                                </NavLink>
                            )
                        )}
                    </div>

                    {/* Desktop Actions — right */}
                    <div className="hidden md:flex items-center gap-3">
                        <div className="relative group rounded-full overflow-visible">
                            <div className="absolute -inset-[3px] bg-gradient-to-r from-fuchsia-500/30 to-cyan-400/30 rounded-full blur-md opacity-70 group-hover:opacity-100 group-hover:from-fuchsia-500/60 group-hover:to-cyan-400/60 transition-all duration-500"></div>
                            <div className="relative rounded-full overflow-hidden p-[2px]">
                                <div className="absolute inset-[-1000%] animate-spin-slow bg-[conic-gradient(from_90deg_at_50%_50%,#08283B_0%,#c084fc_50%,#22d3ee_100%)] opacity-75 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <Link
                                    to="/checkout?type=redeem"
                                    className="relative flex items-center justify-center gap-2 px-6 py-2 text-[13px] font-medium tracking-wide rounded-full bg-slate-900/90 text-white backdrop-blur-sm transition-all duration-300 hover:bg-slate-900 hover:text-white"
                                >
                                    <Gift className="h-4 w-4 text-fuchsia-400 group-hover:text-cyan-400 transition-colors" />
                                    tenho um vale presente
                                </Link>
                            </div>
                        </div>
                        {isAuthenticated ? (
                            <Link
                                to={profileHref}
                                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full border transition-all duration-200 ${
                                    transparent
                                        ? 'border-white/50 text-white hover:bg-white/10'
                                        : 'border-slate-900 text-slate-900 bg-transparent hover:bg-slate-50'
                                }`}
                            >
                                <User className="h-4 w-4" />
                                meu perfil
                            </Link>
                        ) : (
                            <Link
                                to="/login"
                                className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-full border transition-all duration-200 ${
                                    transparent
                                        ? 'border-white/50 text-white hover:bg-white/10'
                                        : 'border-slate-900 text-slate-900 bg-transparent hover:bg-slate-50'
                                }`}
                            >
                                <LogIn className="h-4 w-4" />
                                entrar
                            </Link>
                        )}
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`md:hidden p-2 rounded-lg transition-colors ${
                            transparent
                                ? 'text-white hover:bg-white/10'
                                : 'text-slate-700 hover:bg-slate-100'
                        }`}
                    >
                        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="bg-white border-t border-slate-100 px-4 py-4 space-y-1 shadow-lg">
                    {NAV_LINKS.map((link) =>
                        'external' in link && link.external ? (
                            <a
                                key={link.href}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block px-4 py-2.5 text-sm font-medium rounded-lg transition-colors text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            >
                                {link.label}
                            </a>
                        ) : (
                            <NavLink
                                key={link.href}
                                to={link.href}
                                end={link.href === '/'}
                                className={({ isActive }) =>
                                    `block px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${isActive ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`
                                }
                            >
                                {link.label}
                            </NavLink>
                        )
                    )}

                    <div className="pt-3 mt-3 border-t border-slate-100 space-y-2">
                        <div className="relative group rounded-lg overflow-visible mt-2">
                            <div className="absolute -inset-[3px] bg-gradient-to-r from-fuchsia-500/30 to-cyan-400/30 rounded-lg blur-md opacity-70 group-hover:opacity-100 group-hover:from-fuchsia-500/60 group-hover:to-cyan-400/60 transition-all duration-500"></div>
                            <div className="relative rounded-lg overflow-hidden p-[2px]">
                                <div className="absolute inset-[-1000%] animate-[spin_8s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#08283B_0%,#c084fc_50%,#22d3ee_100%)] opacity-75 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <Link
                                    to="/checkout?type=redeem"
                                    className="relative flex justify-center items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg bg-slate-900/90 text-white backdrop-blur-sm transition-all duration-300 hover:bg-slate-900 hover:text-white"
                                >
                                    <Gift className="h-4 w-4 text-fuchsia-400 group-hover:text-cyan-400 transition-colors" />
                                    tenho um vale presente
                                </Link>
                            </div>
                        </div>
                        {isAuthenticated ? (
                            <Link
                                to={profileHref}
                                className="flex justify-center items-center gap-2 px-4 py-2.5 text-sm font-medium border border-slate-900 text-slate-900 bg-transparent hover:bg-slate-50 rounded-lg transition-all"
                            >
                                <User className="h-4 w-4" /> meu perfil
                            </Link>
                        ) : (
                            <Link to="/login" className="flex justify-center px-4 py-2.5 text-sm font-medium border border-slate-900 text-slate-900 bg-transparent hover:bg-slate-50 rounded-lg transition-all">
                                <span className="flex items-center gap-2"><LogIn className="h-4 w-4" /> entrar</span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
