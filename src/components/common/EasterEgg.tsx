import { useEffect, useState, useRef } from 'react';

export function EasterEgg() {
    const countRef = useRef(0);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowUp') {
                countRef.current += 1;
                if (countRef.current === 10) {
                    setShow(true);
                    countRef.current = 0; // Reset after activation
                }
            } else {
                countRef.current = 0; // Reset on any other key
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                setShow(false);
            }, 10000); // 10 seconds
            return () => clearTimeout(timer);
        }
    }, [show]);

    if (!show) return null;

    return (
        <div
            className="fixed inset-0 z-[9999] bg-black bg-cover bg-center bg-no-repeat animate-in fade-in duration-1000"
            style={{ backgroundImage: `url('/assets/images/easter-egg-bg.png')` }}
        >
            <div className="absolute inset-x-0 bottom-[240px] flex justify-center animate-in slide-in-from-bottom-8 duration-1000 delay-500">
                <svg width="1400" height="300" viewBox="0 0 1400 300" className="w-full max-w-[1400px] overflow-visible drop-shadow-lg">
                    <defs>
                        {/* Curve path: Starts left, goes up in middle, ends right (convex/rainbow arch) */}
                        <path id="curve" d="M100,250 Q700,50 1300,250" fill="transparent" />
                    </defs>
                    <text width="1400">
                        <textPath
                            href="#curve"
                            startOffset="50%"
                            textAnchor="middle"
                            className="text-3xl md:text-5xl font-serif italic fill-white tracking-widest uppercase"
                            style={{
                                fontSize: '32px',
                                fontWeight: 'bold',
                                textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
                            }}
                        >
                            "MUITO OBRIGADO, AMIGO. VOCÊ É UM AMIGO."
                        </textPath>
                    </text>
                </svg>
            </div>
        </div>
    );
}
