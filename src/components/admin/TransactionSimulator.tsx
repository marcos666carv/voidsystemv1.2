'use client';

import { useState } from "react";
import { handlePagarmeWebhook } from "@/actions/payments";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Webhook } from "lucide-react";

export function TransactionSimulator() {
    const [apptId, setApptId] = useState("");
    const [amount, setAmount] = useState("15000"); // 150.00
    const [loading, setLoading] = useState(false);

    const handleTrigger = async () => {
        if (!apptId) {
            toast.error("ID required");
            return;
        }

        setLoading(true);
        try {
            await handlePagarmeWebhook({
                type: 'transaction.paid',
                data: {
                    amount: parseInt(amount),
                    metadata: { appointmentId: apptId }
                }
            });
            toast.success(`Webhook 'paid' triggered for ${apptId}`);
        } catch (e) {
            toast.error("Webhook failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="border-dashed border-2 bg-muted/20">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-md">
                    <Webhook className="h-4 w-4" />
                    Webhook Simulator
                </CardTitle>
                <CardDescription>Manually trigger "Paid" events for testing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2 space-y-1">
                        <Label className="text-xs">Appointment ID</Label>
                        <Input
                            value={apptId}
                            onChange={e => setApptId(e.target.value)}
                            placeholder="appt_..."
                            className="bg-background text-xs"
                        />
                    </div>
                    <div className="space-y-1">
                        <Label className="text-xs">Amount (cents)</Label>
                        <Input
                            value={amount}
                            onChange={e => setAmount(e.target.value)}
                            className="bg-background text-xs"
                        />
                    </div>
                </div>
                <Button size="sm" className="w-full" onClick={handleTrigger} disabled={loading}>
                    {loading ? "Triggering..." : "Simulate 'Paid' Event"}
                </Button>
                <p className="text-[10px] text-muted-foreground">
                    This updates status to 'confirmed' and adds to client total spent.
                </p>
            </CardContent>
        </Card>
    );
}
