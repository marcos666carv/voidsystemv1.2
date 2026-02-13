'use client';

import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon, Loader2, AlertTriangle } from "lucide-react";
import { createAppointment } from "@/actions/scheduling";

// Stub components if Input/Select not available in shadcn subset installed, but I have Input.
import { Input } from "@/components/ui/input";

export function OverrideBookingForm() {
    const [date, setDate] = useState<Date>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [warning, setWarning] = useState<string | null>(null);
    const [overrideConfirmed, setOverrideConfirmed] = useState(false);

    // Simple form state management
    const [formData, setFormData] = useState({
        clientId: "mock-client-id", // Replace with real select
        serviceId: "s1", // Replace with real select
        time: "10:00",
        tankId: "", // Optional
        notes: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        setWarning(null);

        if (!date) {
            setError("Please select a date");
            setIsSubmitting(false);
            return;
        }

        try {
            const startTime = `${format(date, 'yyyy-MM-dd')}T${formData.time}:00`;

            await createAppointment({
                clientId: formData.clientId,
                serviceId: formData.serviceId,
                startTime,
                tankId: formData.tankId || undefined,
                notes: formData.notes,
                override: overrideConfirmed
            });

            alert("Booking created successfully!");
            setOverrideConfirmed(false);
            // Reset form?
        } catch (err: any) {
            const msg = err.message;
            if (msg.includes("not available") || msg.includes("No tanks")) {
                setWarning(`${msg} Do you want to force this booking?`);
                setError(null);
            } else {
                setError(msg || "An unexpected error occurred.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-6 border rounded-xl bg-card max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Manual Booking (Admin)</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Date</label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Time</label>
                        <Input
                            type="time"
                            value={formData.time}
                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Service ID</label>
                    <Input
                        value={formData.serviceId}
                        onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                        placeholder="e.g. s1"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Client ID</label>
                    <Input
                        value={formData.clientId}
                        onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
                        placeholder="Client ID"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Tank ID (Optional)</label>
                    <Input
                        value={formData.tankId}
                        onChange={(e) => setFormData({ ...formData, tankId: e.target.value })}
                        placeholder="Leave empty for auto-assign"
                    />
                </div>

                {error && (
                    <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
                        {error}
                    </div>
                )}

                {warning && (
                    <div className="bg-amber-100 border-amber-200 text-amber-800 text-sm p-3 rounded-md flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4" />
                            <span className="font-medium">Conflict Detected</span>
                        </div>
                        <p>{warning}</p>
                        <div className="flex items-center gap-2 mt-1">
                            <input
                                type="checkbox"
                                id="force"
                                checked={overrideConfirmed}
                                onChange={(e) => setOverrideConfirmed(e.target.checked)}
                                className="h-4 w-4"
                            />
                            <label htmlFor="force" className="font-medium text-amber-900 cursor-pointer">
                                Force Override (Create anyway)
                            </label>
                        </div>
                    </div>
                )}

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        overrideConfirmed ? "Confirm Override Booking" : "Create Booking"
                    )}
                </Button>
            </form>
        </div>
    );
}
