import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Thermometer,
    Clock,
    User,
    Waves,
    Lightbulb,
    Music,
    Power,
    Volume2
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import type { Profile } from "@/types/database";

export interface TankData {
    id: string;
    name: string;
    status: 'available' | 'occupied' | 'cleaning' | 'maintenance';
    temp: number;
    client: Profile | null;
    timeRemaining: number | null;
    hardware: {
        filtration: boolean;
        lightOn: boolean;
        lightColor: string;
        musicPlaying: boolean;
        musicVolume: number;
    };
}

interface TankControlPanelProps {
    tank: TankData;
    onStatusChange: (id: string, newStatus: string) => void;
    onHardwareChange: (id: string, hardware: Partial<TankData['hardware']>) => void;
    onEmergency: (id: string) => void;
}

export function TankControlPanel({ tank, onStatusChange, onHardwareChange, onEmergency }: TankControlPanelProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'occupied':
                return 'bg-emerald-50 text-emerald-800 border-emerald-200';
            case 'available':
            case 'cleaning':
            case 'maintenance':
            default:
                return 'bg-slate-50 text-slate-800 border-slate-200';
        }
    };

    return (
        <Card className="bg-white border shadow-sm transition-all overflow-hidden border-slate-200">
            {/* Header */}
            <CardHeader className={`p-4 border-b transition-colors ${getStatusColor(tank.status)}`}>
                <div className="flex justify-between items-center gap-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-3">
                            <CardTitle className="text-xl font-bold">{tank.name}</CardTitle>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        {/* Status Actions as small top buttons */}
                        <div className="flex bg-slate-900/5 rounded-md p-1 items-center gap-1">
                            <Button
                                size="sm"
                                variant="ghost"
                                className={`h-7 px-2 text-xs font-semibold transition-colors ${tank.status === 'available' ? 'bg-white text-slate-900 shadow-sm hover:text-slate-900 hover:bg-white' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-900/10'}`}
                                onClick={() => onStatusChange(tank.id, 'available')}
                            >
                                Livre
                            </Button>
                            <Button
                                size="sm"
                                variant="ghost"
                                className={`h-7 px-2 text-xs font-semibold transition-colors ${tank.status === 'occupied' ? 'bg-white text-slate-900 shadow-sm hover:text-slate-900 hover:bg-white' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-900/10'}`}
                                onClick={() => onStatusChange(tank.id, 'occupied')}
                            >
                                Sessão
                            </Button>
                            <Button
                                size="sm"
                                variant="ghost"
                                className={`h-7 px-2 text-xs font-semibold transition-colors ${tank.status === 'cleaning' ? 'bg-white text-slate-900 shadow-sm hover:text-slate-900 hover:bg-white' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-900/10'}`}
                                onClick={() => onStatusChange(tank.id, 'cleaning')}
                            >
                                Limpeza
                            </Button>
                            <Button
                                size="sm"
                                variant="ghost"
                                className={`h-7 px-2 text-xs font-semibold transition-colors ${tank.status === 'maintenance' ? 'bg-white text-slate-900 shadow-sm hover:text-slate-900 hover:bg-white' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-900/10'}`}
                                onClick={() => onStatusChange(tank.id, 'maintenance')}
                            >
                                Manute.
                            </Button>
                        </div>

                        {/* Emergency Stop - Always Visible */}
                        <Button
                            variant="destructive"
                            size="sm"
                            className="h-8 shadow-sm hover:shadow-md transition-all font-medium bg-red-100 hover:bg-red-200 text-red-700 border border-red-200 ml-2"
                            onClick={() => onEmergency(tank.id)}
                        >
                            Parar
                        </Button>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="p-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">

                    {/* LEFT COLUMN: Session & Status */}
                    <div className="p-5 space-y-6">
                        {/* Telemetry Overview */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-start justify-center">
                                <p className="text-xs font-medium text-slate-500 mb-1 flex items-center gap-1"><Thermometer className="h-3 w-3" /> Água</p>
                                <p className="text-xl font-mono font-bold text-slate-800 tracking-tight">{tank.temp.toFixed(1)}°C</p>
                            </div>
                            <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-start justify-center">
                                <p className="text-xs font-medium text-slate-500 mb-1 flex items-center gap-1"><Clock className="h-3 w-3" /> Restante</p>
                                <p className="text-xl font-mono font-bold text-slate-800 tracking-tight">
                                    {tank.timeRemaining !== null ? `${tank.timeRemaining}m` : '--:--'}
                                </p>
                            </div>
                        </div>

                        {/* Client Info */}
                        <div>
                            {tank.status === 'occupied' && tank.client ? (
                                <>
                                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Sessão Atual</p>
                                    <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 shadow-sm text-left">
                                        <div className="h-10 w-10 rounded-full bg-violet-100 flex items-center justify-center border border-violet-200 flex-shrink-0">
                                            <User className="h-5 w-5 text-violet-600" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-center mb-1.5">
                                                <p className="text-sm font-bold text-slate-800 truncate">{tank.client.full_name}</p>
                                            </div>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <p className="text-xs text-slate-500 truncate">{tank.client.email}</p>
                                            </div>
                                            <div className="flex justify-start items-center mt-2 pt-2 border-t border-slate-100">
                                                <span className="text-[10px] uppercase font-bold text-violet-700 bg-violet-100 px-1.5 py-0.5 rounded tracking-wider flex-shrink-0">
                                                    {tank.client.acquisition_source || 'Novo'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="flex items-center justify-center p-4 border border-dashed rounded-xl border-slate-200 bg-slate-50/50 text-slate-400">
                                    <span className="text-sm font-medium">Nenhuma sessão ativa</span>
                                </div>
                            )}
                        </div>

                    </div>

                    {/* RIGHT COLUMN: Hardware Controls */}
                    <div className="p-5 bg-slate-50/80 border-l border-slate-100">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-5">Controles Diretos</p>

                        <div className="space-y-4">
                            {/* Filtragem */}
                            <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg ${tank.hardware.filtration ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                                        <Waves className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-800">Filtragem</p>
                                        <p className="text-xs text-slate-500">{tank.hardware.filtration ? 'Bomba Ativa' : 'Standby'}</p>
                                    </div>
                                </div>
                                <Switch
                                    checked={tank.hardware.filtration}
                                    onCheckedChange={(checked) => onHardwareChange(tank.id, { filtration: checked })}
                                    className="data-[state=checked]:bg-emerald-500"
                                />
                            </div>

                            {/* Luzes */}
                            <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg ${tank.hardware.lightOn ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                                        <Lightbulb className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-800">Iluminação Interna</p>
                                        <div className="flex items-center gap-1 mt-1">
                                            <div className="w-3 h-3 rounded-full border border-slate-300" style={{ backgroundColor: tank.hardware.lightColor }}></div>
                                            <span className="text-xs text-slate-500 uppercase font-mono">{tank.hardware.lightColor}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Switch
                                        checked={tank.hardware.lightOn}
                                        onCheckedChange={(checked) => onHardwareChange(tank.id, { lightOn: checked })}
                                        className="data-[state=checked]:bg-emerald-500"
                                    />
                                </div>
                            </div>

                            {/* Musica */}
                            <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg ${tank.hardware.musicPlaying ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                                            <Music className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-800">Áudio do Tanque</p>
                                            <p className="text-xs text-slate-500">{tank.hardware.musicPlaying ? 'Reproduzindo' : 'Pausado'}</p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className={`h-8 w-8 ${tank.hardware.musicPlaying ? 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200 hover:text-emerald-700' : ''}`}
                                        onClick={() => onHardwareChange(tank.id, { musicPlaying: !tank.hardware.musicPlaying })}
                                    >
                                        <Power className={`h-4 w-4 ${tank.hardware.musicPlaying ? 'text-emerald-600' : 'text-slate-400'}`} />
                                    </Button>
                                </div>
                                <div className="flex items-center gap-3 px-1">
                                    <Volume2 className="h-4 w-4 text-slate-400" />
                                    <Slider
                                        defaultValue={[tank.hardware.musicVolume]}
                                        max={100}
                                        step={1}
                                        className="flex-1 [&_[role=slider]]:bg-emerald-500 [&_.bg-slate-900]:bg-emerald-500"
                                        onValueChange={(vals) => onHardwareChange(tank.id, { musicVolume: vals[0] })}
                                    />
                                    <span className="text-xs font-mono w-8 text-right text-slate-500">{tank.hardware.musicVolume}%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </CardContent>
        </Card>
    );
};
