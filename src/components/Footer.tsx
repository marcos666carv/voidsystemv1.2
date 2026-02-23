import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Lock } from 'lucide-react';

const FOOTER_LINKS = [
    { href: '/checkout?type=float', label: 'agendar flutuação' },
    { href: '/club', label: 'void club' },
    { href: '/about', label: 'sobre' },
];

export function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-400">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Main footer */}
                <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* Brand + Contact */}
                    <div className="space-y-4">
                        <Link to="/" className="text-xl font-bold tracking-tighter text-white">
                            void
                        </Link>
                        <p className="text-sm leading-relaxed">
                            o que a mente pensa, o corpo sente.<br />
                            cuide dos dois.
                        </p>
                        <div className="space-y-2 pt-2">
                            <a href="https://maps.google.com/?q=R.+Fernando+Simas,+395+Bigorrilho,+Curitiba" target="_blank" rel="noopener"
                                className="flex items-center gap-2 text-sm hover:text-white transition-colors">
                                <MapPin className="h-4 w-4 shrink-0" />
                                R. Fernando Simas, 395 · Bigorrilho, Curitiba
                            </a>
                            <a href="tel:+5541998010044" className="flex items-center gap-2 text-sm hover:text-white transition-colors">
                                <Phone className="h-4 w-4 shrink-0" />
                                (41) 99801-0044
                            </a>
                            <a href="mailto:ola@voidfloat.com.br" className="flex items-center gap-2 text-sm hover:text-white transition-colors">
                                <Mail className="h-4 w-4 shrink-0" />
                                ola@voidfloat.com.br
                            </a>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">navegação</h4>
                        <nav className="space-y-2.5">
                            {FOOTER_LINKS.map((link) => (
                                <Link
                                    key={link.href}
                                    to={link.href}
                                    className="block text-sm hover:text-white transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Hours + Admin */}
                    <div className="space-y-6">
                        <div>
                            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">horário</h4>
                            <div className="space-y-1.5 text-sm">
                                <p>seg a sex · 9h às 21h</p>
                                <p>sábado · 9h às 18h</p>
                                <p>domingo · fechado</p>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">acesso</h4>
                            <nav className="space-y-2.5">
                                <Link to="/login" className="block text-sm hover:text-white transition-colors">
                                    entrar na conta
                                </Link>
                                <Link to="/register" className="block text-sm hover:text-white transition-colors">
                                    criar conta
                                </Link>
                            </nav>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-slate-800 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-xs text-slate-500">
                        © {new Date().getFullYear()} void float · curitiba, brasil
                    </p>
                    <Link
                        to="/admin/register"
                        className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-400 transition-colors"
                    >
                        <Lock className="h-3 w-3" />
                        admin
                    </Link>
                </div>
            </div>
        </footer>
    );
}
