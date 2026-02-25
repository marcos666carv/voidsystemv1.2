import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Menu, X, User, LogIn, Gift } from 'lucide-react';
import { useState, useEffect } from 'react';

const NAV_LINKS = [
    { href: 'https://voidfloat.com.br', label: 'flutuação', external: true },
    { href: '/checkout?type=massage', label: 'massoterapia' },
    { href: '/club', label: 'void club' },
    { href: '/about', label: 'sobre' },
];

export function Navbar() {
    const { isAuthenticated, user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    useEffect(() => { setIsOpen(false); }, [location.pathname]);
    const profileHref = user?.role === 'admin' || user?.role === 'staff' ? '/admin' : '/app/profile';

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-1.5 group">
                        <span className="text-xl font-bold tracking-tighter text-slate-900">
                            void
                        </span>
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
                                    className="px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                                >
                                    {link.label}
                                </a>
                            ) : (
                                <NavLink
                                    key={link.href}
                                    to={link.href}
                                    end={link.href === '/'}
                                    className={({ isActive }) =>
                                        `px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${isActive
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
                            {/* Subtle continuous glow behind the button */}
                            <div className="absolute -inset-[3px] bg-gradient-to-r from-fuchsia-500/30 to-cyan-400/30 rounded-full blur-md opacity-70 group-hover:opacity-100 group-hover:from-fuchsia-500/60 group-hover:to-cyan-400/60 transition-all duration-500"></div>

                            {/* Container for the button and spinning border */}
                            <div className="relative rounded-full overflow-hidden p-[2px]">
                                {/* Animated spinning background */}
                                <div className="absolute inset-[-1000%] animate-spin-slow bg-[conic-gradient(from_90deg_at_50%_50%,#08283B_0%,#c084fc_50%,#22d3ee_100%)] opacity-75 group-hover:opacity-100 transition-opacity duration-500"></div>

                                {/* Inner dark button */}
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
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full border border-slate-900 text-slate-900 bg-transparent hover:bg-slate-50 transition-all duration-200"
                            >
                                <User className="h-4 w-4" />
                                meu perfil
                            </Link>
                        ) : (
                            <Link
                                to="/login"
                                className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-full border border-slate-900 text-slate-900 bg-transparent hover:bg-slate-50 transition-all duration-200"
                            >
                                <LogIn className="h-4 w-4" />
                                entrar
                            </Link>
                        )}
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-lg transition-colors text-slate-700 hover:bg-slate-100"
                    >
                        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
                }`}>
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
                                    `block px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${isActive ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                    }`
                                }
                            >
                                {link.label}
                            </NavLink>
                        )
                    )}

                    <div className="pt-3 mt-3 border-t border-slate-100 space-y-2">
                        <div className="relative group rounded-lg overflow-visible mt-2">
                            {/* Subtle continuous glow behind the button */}
                            <div className="absolute -inset-[3px] bg-gradient-to-r from-fuchsia-500/30 to-cyan-400/30 rounded-lg blur-md opacity-70 group-hover:opacity-100 group-hover:from-fuchsia-500/60 group-hover:to-cyan-400/60 transition-all duration-500"></div>

                            {/* Container for the button and spinning border */}
                            <div className="relative rounded-lg overflow-hidden p-[2px]">
                                {/* Animated spinning background */}
                                <div className="absolute inset-[-1000%] animate-[spin_8s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#08283B_0%,#c084fc_50%,#22d3ee_100%)] opacity-75 group-hover:opacity-100 transition-opacity duration-500"></div>

                                {/* Inner dark button */}
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
