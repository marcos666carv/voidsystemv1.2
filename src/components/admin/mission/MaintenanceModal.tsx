'use client';

import { useState } from "react";
import { reportMaintenance } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea"; // Assuming we have this or input
import { Label } from "@/components/ui/label"; // Assuming we have this
import { AlertTriangle } from "lucide-react";

interface MaintenanceModalProps {
    tank: { id: string, name: string } | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess: () => void;
}

export function MaintenanceModal({ tank, open, onOpenChange, onSuccess }: MaintenanceModalProps) {
    const [description, setDescription] = useState("");
    const [severity, setSeverity] = useState<'low' | 'medium' | 'high' | 'critical'>('low');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!tank) return;
        setLoading(true);
        try {
            await reportMaintenance(tank.id, description, severity, "Admin (Logged In)"); // Fixed user for now
            onSuccess();
            onOpenChange(false);
            setDescription("");
            setSeverity('low');
        } catch (error) {
            console.error("Failed to report issue", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                        Report Issue: {tank?.name}
                    </DialogTitle>
                    <DialogDescription>
                        Log a maintenance issue. High/Critical severity will set the tank to 'Maintenance' mode.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="severity" className="text-right">
                            Severity
                        </Label>
                        <select
                            id="severity"
                            className="col-span-3 border rounded px-3 py-2 text-sm"
                            value={severity}
                            onChange={(e) => setSeverity(e.target.value as any)}
                        >
                            <option value="low">Low (Cosmetic)</option>
                            <option value="medium">Medium (Functional)</option>
                            <option value="high">High (Urgent)</option>
                            <option value="critical">Critical (Safety)</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            Details
                        </Label>
                        <Textarea
                            id="description"
                            className="col-span-3"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe the issue..."
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button onClick={handleSubmit} disabled={loading || !description}>
                        {loading ? "Reporting..." : "Submit Report"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
