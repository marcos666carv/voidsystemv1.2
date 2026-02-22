import { useState, useEffect } from "react";
import { TankControlPanel } from "@/components/admin/tanks/TankControlPanel";
import type { TankData } from "@/components/admin/tanks/TankControlPanel";
import { toast } from "sonner";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const INITIAL_TANKS: TankData[] = [
    {
        id: '1',
        name: 'Tank 1 (Ocean)',
        status: 'available',
        temp: 35.5,
        client: null,
        timeRemaining: null,
        hardware: { filtration: true, lightOn: true, lightColor: '#0ea5e9', musicPlaying: false, musicVolume: 40 }
    },
    {
        id: '2',
        name: 'Tank 2 (Void)',
        status: 'occupied',
        temp: 35.4,
        client: 'Alice Freeman',
        timeRemaining: 24,
        hardware: { filtration: false, lightOn: false, lightColor: '#8b5cf6', musicPlaying: true, musicVolume: 50 }
    },
    {
        id: '3',
        name: 'Tank 3 (Nebula)',
        status: 'cleaning',
        temp: 34.8,
        client: null,
        timeRemaining: 15,
        hardware: { filtration: true, lightOn: true, lightColor: '#f59e0b', musicPlaying: false, musicVolume: 30 }
    },
];

export function AdminTanksPage() {
    const [tanks, setTanks] = useState<TankData[]>(INITIAL_TANKS);

    // Mock Timer Logic
    useEffect(() => {
        const interval = setInterval(() => {
            setTanks(current => current.map(tank => {
                if (tank.timeRemaining && tank.timeRemaining > 0) {
                    return { ...tank, timeRemaining: tank.timeRemaining - 1 };
                }
                return tank;
            }));
        }, 60000); // Reduce 1 minute every minute (mock speed)
        return () => clearInterval(interval);
    }, []);

    const handleStatusChange = (id: string, newStatus: string) => {
        setTanks(current => current.map(t => {
            if (t.id === id) {
                let timeRemaining = null;
                let client = t.client;

                if (newStatus === 'cleaning') {
                    timeRemaining = 15;
                    client = null;
                } else if (newStatus === 'available' || newStatus === 'maintenance') {
                    client = null;
                }

                return { ...t, status: newStatus as any, timeRemaining, client };
            }
            return t;
        }));
        toast.success(`Status atualizado para ${newStatus}`);
    };

    const handleHardwareChange = (id: string, hardwareUpdate: Partial<TankData['hardware']>) => {
        setTanks(current => current.map(t => {
            if (t.id === id) {
                return { ...t, hardware: { ...t.hardware, ...hardwareUpdate } };
            }
            return t;
        }));
    };

    const handleEmergency = (id: string) => {
        setTanks(current => current.map(t => {
            if (t.id === id) {
                return {
                    ...t,
                    status: 'available',
                    timeRemaining: null,
                    hardware: { ...t.hardware, filtration: false, lightOn: true, lightColor: '#ef4444', musicPlaying: false }
                };
            }
            return t;
        }));
        toast.error(`Parada de emergência acionada no Tanque ${id}!`);
    };

    const refreshData = () => {
        toast.info("Sincronizando dados dos tanques...");
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Operação dos Tanques</h1>
                    <p className="text-slate-500 mt-2">Controle direto de hardware e status de sessão.</p>
                </div>
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" onClick={refreshData}>
                        <RefreshCw className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {tanks.map(tank => (
                    <TankControlPanel
                        key={tank.id}
                        tank={tank}
                        onStatusChange={handleStatusChange}
                        onHardwareChange={handleHardwareChange}
                        onEmergency={handleEmergency}
                    />
                ))}
            </div>
        </div>
    );
}
