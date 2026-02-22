import { Link } from 'react-router-dom';
import { Droplets, Sparkles, Gift, ArrowRight, Hand } from 'lucide-react';

const SERVICES = [
    {
        id: 'float',
        name: 'flutuação',
        description: 'isolamento sensorial profundo.',
        startingPrice: 250,
        icon: Droplets,
    },
    {
        id: 'massage',
        name: 'massoterapia',
        description: 'equilíbrio muscular e mental.',
        startingPrice: 200,
        icon: Hand,
    },
    {
        id: 'combo',
        name: 'combos',
        description: 'o reset completo: flutuação + massagem.',
        startingPrice: 390,
        icon: Sparkles,
    },
    {
        id: 'gift',
        name: 'vale presente',
        description: 'presenteie com uma experiência única.',
        startingPrice: 200,
        icon: Gift,
    },
];

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center py-20 px-4">
            <div className="max-w-7xl mx-auto w-full">

                {/* Services grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {SERVICES.map((service) => {
                        const Icon = service.icon;
                        return (
                            <div
                                key={service.id}
                                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col"
                            >
                                <div className="p-3 rounded-lg bg-slate-50 text-slate-700 w-fit mb-6 border border-slate-100">
                                    <Icon className="h-6 w-6" />
                                </div>

                                <h3 className="text-xl font-bold text-slate-900 tracking-tight">{service.name}</h3>
                                <p className="mt-2 text-sm text-slate-500 flex-1">
                                    {service.description}
                                </p>

                                <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                                    <span className="text-xs font-medium text-slate-400">
                                        a partir de <strong className="text-slate-700">R$ {service.startingPrice}</strong>
                                    </span>
                                    <Link
                                        to={`/checkout?type=${service.id}`}
                                        className="text-sm font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 transition-colors"
                                    >
                                        comprar <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
