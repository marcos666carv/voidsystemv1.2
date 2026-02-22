import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Thermometer,
    Clock,
    User,
    Play,
    PenTool,
    Waves,
    Lightbulb,
    Music,
    AlertOctagon,
    Power,
    Volume2
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

export interface TankData {
    id: string;
    name: string;
    status: 'available' | 'occupied' | 'cleaning' | 'maintenance';
    temp: number;
    client: string | null;
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
            case 'available': return 'border-emerald-500/50 bg-emerald-50/20';
            case 'occupied': return 'border-violet-500/50 bg-violet-50/20';
            case 'cleaning': return 'border-amber-500/50 bg-amber-50/20';
            case 'maintenance': return 'border-red-500/50 bg-red-50/20';
            default: return 'border-slate-200';
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'available': return <Badge variant="outline" className="bg-emerald-100 text-emerald-700 border-emerald-200">Available</Badge>;
            case 'occupied': return <Badge variant="outline" className="bg-violet-100 text-violet-700 border-violet-200 animate-pulse">In Session</Badge>;
            case 'cleaning': return <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-200">Cleaning</Badge>;
            case 'maintenance': return <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200">Maintenance</Badge>;
            default: return <Badge variant="outline">Unknown</Badge>;
        }
    };

    return (
        <Card className={`border-2 shadow-sm transition-all overflow-hidden ${getStatusColor(tank.status)}`}>
            {/* Header */}
            <CardHeader className="pb-3 border-b border-slate-100/50 bg-white/40">
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-xl font-bold text-slate-900">{tank.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                            {getStatusBadge(tank.status)}
                        </div>
                    </div>
                    {/* Emergency Stop - Always Visible */}
                    <Button
                        variant="destructive"
                        size="sm"
                        className="h-8 shadow-sm hover:shadow-md transition-all font-bold gap-1 bg-red-600 hover:bg-red-700"
                        onClick={() => onEmergency(tank.id)}
                    >
                        <AlertOctagon className="h-4 w-4" />
                        <span className="hidden sm:inline">STOP</span>
                    </Button>
                </div>
            </CardHeader>

            <CardContent className="p-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">

                    {/* LEFT COLUMN: Session & Status */}
                    <div className="p-5 space-y-6">
                        {/* Telemetry Overview */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/60 p-3 rounded-xl border border-slate-100">
                                <p className="text-xs font-medium text-slate-500 mb-1 flex items-center gap-1"><Thermometer className="h-3 w-3" /> Água</p>
                                <p className="text-2xl font-mono font-bold text-slate-800">{tank.temp.toFixed(1)}°C</p>
                            </div>
                            <div className="bg-white/60 p-3 rounded-xl border border-slate-100">
                                <p className="text-xs font-medium text-slate-500 mb-1 flex items-center gap-1"><Clock className="h-3 w-3" /> Tempo Restante</p>
                                <p className="text-2xl font-mono font-bold text-slate-800">
                                    {tank.timeRemaining !== null ? `${tank.timeRemaining}m` : '--:--'}
                                </p>
                            </div>
                        </div>

                        {/* Client Info */}
                        <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Sessão Atual</p>
                            <div className="flex items-center gap-3 p-3 bg-white/80 rounded-xl border border-slate-200">
                                <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                                    <User className="h-5 w-5 text-slate-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-800">{tank.client || 'Nenhum Cliente'}</p>
                                    <p className="text-xs text-slate-500">{tank.status === 'occupied' ? 'Sessão em andamento' : 'Aguardando'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Status Actions */}
                        <div className="flex flex-wrap gap-2 pt-2">
                            {tank.status === 'occupied' || tank.status === 'cleaning' ? (
                                <Button size="sm" variant="outline" className="flex-1 font-medium bg-white" onClick={() => onStatusChange(tank.id, 'available')}>
                                    Finalizar Atual
                                </Button>
                            ) : (
                                <>
                                    <Button size="sm" variant="outline" className="flex-1 font-medium bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:text-amber-800" onClick={() => onStatusChange(tank.id, 'cleaning')}>
                                        <Play className="h-3 w-3 mr-1" /> Iniciar Limpeza
                                    </Button>
                                    <Button size="sm" variant="outline" className="px-3 bg-white" onClick={() => onStatusChange(tank.id, 'maintenance')} title="Manutenção">
                                        <PenTool className="h-4 w-4 text-slate-600" />
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Hardware Controls */}
                    <div className="p-5 space-y-6 bg-slate-50/50">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Controles Diretos</p>

                        <div className="space-y-4">
                            {/* Filtragem */}
                            <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg ${tank.hardware.filtration ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
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
                                />
                            </div>

                            {/* Luzes */}
                            <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg ${tank.hardware.lightOn ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-400'}`}>
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
                                    />
                                </div>
                            </div>

                            {/* Musica */}
                            <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg ${tank.hardware.musicPlaying ? 'bg-violet-100 text-violet-600' : 'bg-slate-100 text-slate-400'}`}>
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
                                        className="h-8 w-8"
                                        onClick={() => onHardwareChange(tank.id, { musicPlaying: !tank.hardware.musicPlaying })}
                                    >
                                        <Power className={`h-4 w-4 ${tank.hardware.musicPlaying ? 'text-violet-600' : 'text-slate-400'}`} />
                                    </Button>
                                </div>
                                <div className="flex items-center gap-3 px-1">
                                    <Volume2 className="h-4 w-4 text-slate-400" />
                                    <Slider
                                        defaultValue={[tank.hardware.musicVolume]}
                                        max={100}
                                        step={1}
                                        className="flex-1"
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
}
