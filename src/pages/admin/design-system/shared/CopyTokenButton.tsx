import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyTokenButtonProps {
    token: string;
    label?: string;
}

export function CopyTokenButton({ token, label }: CopyTokenButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(token);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <button
            onClick={handleCopy}
            title={`Copiar: ${token}`}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors group"
        >
            {copied
                ? <Check className="h-2.5 w-2.5 text-emerald-500" />
                : <Copy className="h-2.5 w-2.5" />
            }
            <span className="truncate max-w-[180px]">{label ?? token}</span>
        </button>
    );
}
