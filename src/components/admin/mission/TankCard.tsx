'use client';

import { format } from "date-fns";
import { Thermometer, Timer, AlertTriangle, Moon, PenTool } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { toggleTankStatus } from "@/actions/admin";

interface TankCardProps {
    tank: {
        id: string;
        name: string;
        status: 'livre' | 'em_sessao' | 'limpeza' | 'modo_noturno' | 'manutencao' | 'standby';
        temperature?: number | null;
        nextSession?: string | null;
        activeIssue?: { description: string, severity: 'low' | 'medium' | 'high' | 'critical' } | null;
        usage: number;
    };
    onRefresh: () => void;
    onReportIssue: () => void;
}

export function TankCard({ tank, onRefresh, onReportIssue }: TankCardProps) {

    const statusColors = {
        'livre': 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]',
        'em_sessao': 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)] animate-pulse',
        'limpeza': 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.6)]',
        'modo_noturno': 'bg-indigo-900 shadow-[0_0_10px_rgba(49,46,129,0.6)]',
        'manutencao': 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.6)]',
        'standby': 'bg-gray-400'
    };

    const handleStatusChange = async (newStatus: any) => {
        if (confirm(`Change status of ${tank.name} to ${newStatus}?`)) {
            await toggleTankStatus(tank.id, newStatus);
            onRefresh();
        }
    };

    return (
        <Card className="relative overflow-hidden border-2 transition-all hover:border-primary/50">
            {/* Status LED Bar */}
            <div className={cn("h-2 w-full", statusColors[tank.status] || 'bg-gray-200')} />

            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-bold">{tank.name}</CardTitle>
                <div className={cn("h-3 w-3 rounded-full", statusColors[tank.status])} />
            </CardHeader>

            <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm mt-2">
                    {/* Temperature */}
                    <div className="flex items-center gap-2">
                        <Thermometer className="h-4 w-4 text-muted-foreground" />
                        <span className="font-mono text-lg">{tank.temperature ? `${tank.temperature}°C` : '--'}</span>
                    </div>

                    {/* Next Session */}
                    <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Timer className="h-3 w-3" /> Next
                        </span>
                        <span className="font-medium">
                            {tank.nextSession ? format(new Date(tank.nextSession), 'HH:mm') : 'None'}
                        </span>
                    </div>

                    {/* Usage Telemetry */}
                    <div className="col-span-2 pt-2 border-t mt-2">
                        <div className="flex justify-between items-center text-xs text-muted-foreground mb-1">
                            <span>Usage (30d)</span>
                            <span>{tank.usage}h</span>
                        </div>
                        <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary"
                                style={{ width: `${Math.min((tank.usage / 300) * 100, 100)}%` }} // 300h cap visual
                            />
                        </div>
                    </div>
                </div>

                {/* Active Issue Alert */}
                {tank.activeIssue && (
                    <div className="mt-4 p-2 bg-destructive/10 border border-destructive/20 rounded-md flex items-start gap-2 text-destructive text-xs">
                        <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                        <div>
                            <span className="font-bold uppercase text-[10px]">{tank.activeIssue.severity}</span>
                            <p className="line-clamp-2">{tank.activeIssue.description}</p>
                        </div>
                    </div>
                )}
            </CardContent>

            <CardFooter className="flex flex-col gap-2 pt-2">
                <div className="flex w-full gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 text-xs"
                        onClick={() => handleStatusChange('limpeza')}
                    >
                        Clean
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 text-xs"
                        onClick={() => handleStatusChange('modo_noturno')}
                    >
                        <Moon className="h-3 w-3 mr-1" /> Sleep
                    </Button>
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-xs text-muted-foreground hover:text-destructive"
                    onClick={onReportIssue}
                >
                    <PenTool className="h-3 w-3 mr-1" /> Report Issue
                </Button>
            </CardFooter>
        </Card>
    );
}
