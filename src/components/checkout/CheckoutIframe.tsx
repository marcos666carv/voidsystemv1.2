import { useEffect } from 'react';
import { X } from 'lucide-react';

export type CheckoutFlowType = 'float' | 'massage' | 'combo' | 'gift' | 'redeem';

interface CheckoutIframeProps {
    type: CheckoutFlowType;
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

/**
 * Componente reutilizável que embute o fluxo de checkout (/checkout?type=X)
 * dentro de um overlay com iframe. Comunica com o pai via postMessage.
 *
 * Uso:
 *   <CheckoutIframe type="float" isOpen={open} onClose={() => setOpen(false)} />
 */
export function CheckoutIframe({ type, isOpen, onClose, onSuccess }: CheckoutIframeProps) {
    useEffect(() => {
        if (!isOpen) return;

        const handleMessage = (event: MessageEvent) => {
            if (event.origin !== window.location.origin) return;
            if (event.data?.type === 'void:checkout:success') {
                onSuccess?.();
                onClose();
            }
            if (event.data?.type === 'void:checkout:close') {
                onClose();
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [isOpen, onClose, onSuccess]);

    // Bloqueia scroll do body enquanto aberto
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Frame container */}
            <div className="relative w-full max-w-5xl h-[92vh] bg-white rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col">
                {/* Botão fechar */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-white shadow-md transition-all"
                    aria-label="Fechar"
                >
                    <X className="h-5 w-5" />
                </button>

                <iframe
                    src={`/checkout?type=${type}`}
                    className="w-full flex-1 border-0"
                    title={`Checkout — ${type}`}
                />
            </div>
        </div>
    );
}
