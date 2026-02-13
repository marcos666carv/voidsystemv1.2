'use client';

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { getDailyAvailability, type TimeSlot } from "@/actions/scheduling";
import { Loader2 } from "lucide-react";

interface ClientCalendarProps {
    serviceId: string;
    onSlotSelect: (date: Date, time: string) => void;
}

export function ClientCalendar({ serviceId, onSlotSelect }: ClientCalendarProps) {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [slots, setSlots] = useState<TimeSlot[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchSlots() {
            if (!date || !serviceId) return;

            setLoading(true);
            setError(null);
            setSlots([]);

            try {
                const dateStr = format(date, 'yyyy-MM-dd');
                // Server Action call
                const availableSlots = await getDailyAvailability(dateStr, serviceId);
                setSlots(availableSlots);
            } catch (err) {
                console.error("Failed to fetch slots:", err);
                setError("Could not load availability. Please try again.");
            } finally {
                setLoading(false);
            }
        }

        fetchSlots();
    }, [date, serviceId]);

    return (
        <div className="flex flex-col md:flex-row gap-8 p-6 bg-card rounded-xl border border-border shadow-sm">
            <div className="flex-shrink-0">
                <h3 className="text-lg font-semibold mb-4">Select Date</h3>
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                    disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                />
            </div>

            <div className="flex-1">
                <h3 className="text-lg font-semibold mb-4">
                    Available Slots {date ? `for ${format(date, 'MMM do')}` : ''}
                </h3>

                {loading ? (
                    <div className="flex items-center justify-center h-48">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : error ? (
                    <div className="text-destructive p-4 bg-destructive/10 rounded-md">
                        {error}
                    </div>
                ) : !date ? (
                    <div className="text-muted-foreground p-4">Please select a date to view availability.</div>
                ) : slots.length === 0 ? (
                    <div className="text-muted-foreground p-4">No slots available for this date.</div>
                ) : (
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                        {slots.map((slot, index) => (
                            <Button
                                key={`${slot.time}-${index}`}
                                variant={slot.available ? "outline" : "ghost"}
                                disabled={!slot.available}
                                onClick={() => slot.available && onSlotSelect(date, slot.time)}
                                className={!slot.available ? "opacity-50" : "hover:border-primary hover:text-primary"}
                            >
                                {slot.time}
                            </Button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
