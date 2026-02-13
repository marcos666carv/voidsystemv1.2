'use client';

import { useEffect, useState } from "react";
import { getMissionControlData } from "@/actions/admin";
import { TankCard } from "@/components/admin/mission/TankCard";
import { Button } from "@/components/ui/button";
import { RefreshCw, CheckCircle2 } from "lucide-react";
import { MaintenanceModal } from "@/components/admin/mission/MaintenanceModal";
import { toast } from "sonner";

export function MissionControl() {
    const [tanks, setTanks] = useState<any[]>([]);
    const [role, setRole] = useState<'admin' | 'staff'>('admin');
    const [selectedTank, setSelectedTank] = useState<{ id: string, name: string } | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const refreshData = () => {
        getMissionControlData().then(data => setTanks(data));
    };

    useEffect(() => {
        refreshData();
        // Poll every 30s?
        const interval = setInterval(refreshData, 30000);
        return () => clearInterval(interval);
    }, []);

    const handleReportIssue = (tank: { id: string, name: string }) => {
        setSelectedTank(tank);
        setIsModalOpen(true);
    };

    const handleMaintenanceComplete = (tankId: string) => {
        toast.success(`Maintenance for tank ${tankId} complete!`, {
            icon: <CheckCircle2 className="h-4 w-4" />,
        });
        refreshData();
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Mission Control</h1>
                    <p className="text-muted-foreground">Digital Twin Operations • {tanks.length} Tanks Online</p>
                </div>
                <div className="flex items-center gap-4">
                    {/* RBAC Toggle Mock */}
                    <select
                        className="text-sm border rounded p-1"
                        value={role}
                        onChange={(e) => setRole(e.target.value as any)}
                    >
                        <option value="admin">Admin View</option>
                        <option value="staff">Staff View</option>
                    </select>

                    <Button variant="outline" size="icon" onClick={refreshData}>
                        <RefreshCw className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {tanks.map(tank => (
                    <TankCard
                        key={tank.id}
                        tank={tank}
                        onRefresh={refreshData}
                        onReportIssue={() => handleReportIssue(tank)}
                    />
                ))}
            </div>

            {/* Financials (RBAC Protected) */}
            {role === 'admin' && (
                <div className="p-6 border border-dashed rounded-xl bg-muted/20">
                    <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
                        Restricted Financial Data (Admin Only)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                            <p className="text-2xl font-mono font-bold">$12,450.00</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Active Members</p>
                            <p className="text-2xl font-mono font-bold">142</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Avg. Session Value</p>
                            <p className="text-2xl font-mono font-bold">$85.00</p>
                        </div>
                    </div>
                </div>
            )}

            <MaintenanceModal
                tank={selectedTank}
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                onSuccess={() => selectedTank && handleMaintenanceComplete(selectedTank.name)}
            />
        </div>
    );
}
