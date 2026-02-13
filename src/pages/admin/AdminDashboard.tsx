import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, PenTool, Thermometer, User, Clock } from "lucide-react";
import { TransactionSimulator } from "@/components/admin/TransactionSimulator";

// Mock Tank Data
const INITIAL_TANKS = [
    { id: '1', name: 'Tank 1 (Ocean)', status: 'available', temp: 35.5, client: null, timeRemaining: null },
    { id: '2', name: 'Tank 2 (Void)', status: 'occupied', temp: 35.4, client: 'Alice Freeman', timeRemaining: 24 },
    { id: '3', name: 'Tank 3 (Nebula)', status: 'cleaning', temp: 34.8, client: null, timeRemaining: 12 },
    { id: '4', name: 'Massage Room 1', status: 'available', temp: 22.0, client: null, timeRemaining: null },
];

export function AdminDashboard() {
    const [tanks, setTanks] = useState(INITIAL_TANKS);

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

    const handleStartCleaning = (id: string) => {
        setTanks(current => current.map(t =>
            t.id === id ? { ...t, status: 'cleaning', timeRemaining: 15, client: null } : t
        ));
    };

    const handleMaintenance = (id: string) => {
        setTanks(current => current.map(t =>
            t.id === id ? { ...t, status: 'maintenance', timeRemaining: null, client: null } : t
        ));
    };

    const handleFinish = (id: string) => {
        setTanks(current => current.map(t =>
            t.id === id ? { ...t, status: 'available', timeRemaining: null, client: null } : t
        ));
    };

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
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h1>
                <p className="text-slate-500 mt-2">Real-time facility overview.</p>
            </div>

            {/* IOT Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {tanks.map(tank => (
                    <Card key={tank.id} className={`border-2 shadow-sm transition-all ${getStatusColor(tank.status)}`}>
                        <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                                <CardTitle className="text-lg font-medium">{tank.name}</CardTitle>
                                {getStatusBadge(tank.status)}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {/* Telemetry */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center gap-2 text-slate-600">
                                        <Thermometer className="h-4 w-4" />
                                        <span className="font-mono font-bold">{tank.temp}°C</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-600">
                                        <Clock className="h-4 w-4" />
                                        <span className="font-mono font-bold">{tank.timeRemaining ? `${tank.timeRemaining}m` : '--'}</span>
                                    </div>
                                </div>

                                {/* Active Client */}
                                <div className="flex items-center gap-2 p-2 bg-white/50 rounded-lg border border-slate-100">
                                    <User className="h-4 w-4 text-slate-400" />
                                    <span className="text-sm font-medium text-slate-700 truncate">
                                        {tank.client || 'No Client'}
                                    </span>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2 pt-2">
                                    {tank.status === 'occupied' || tank.status === 'cleaning' ? (
                                        <Button size="sm" variant="outline" className="w-full text-xs" onClick={() => handleFinish(tank.id)}>
                                            Finish
                                        </Button>
                                    ) : (
                                        <>
                                            <Button size="sm" variant="outline" className="flex-1 text-xs hover:bg-amber-50 hover:text-amber-700 hover:border-amber-200" onClick={() => handleStartCleaning(tank.id)}>
                                                <Play className="h-3 w-3 mr-1" /> Clean
                                            </Button>
                                            <Button size="sm" variant="ghost" className="px-2" onClick={() => handleMaintenance(tank.id)}>
                                                <PenTool className="h-3 w-3 text-slate-400" />
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Simulator (Existing) */}
                <div className="lg:col-span-1">
                    <TransactionSimulator />
                </div>

                {/* Stats (Placeholder for now) */}
                <div className="lg:col-span-2 grid grid-cols-2 gap-6">
                    <Card className="bg-slate-900 text-white border-0 shadow-lg">
                        <CardHeader>
                            <CardDescription className="text-slate-400">Total Revenue (Today)</CardDescription>
                            <CardTitle className="text-4xl">$1,250</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-emerald-400 text-sm flex items-center gap-1">
                                +15% vs yesterday
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardDescription>Utilization Rate</CardDescription>
                            <CardTitle className="text-4xl">78%</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-violet-600 w-[78%]"></div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
