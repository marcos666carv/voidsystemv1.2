'use client';

import { format, parseISO, startOfDay, differenceInMinutes } from "date-fns";
import { cn } from "@/lib/utils";

// Types matching DB/Action return (mocked for visualization if specific action not yet created for this view)
interface Booking {
    id: string;
    tankName: string;
    clientName: string;
    startTime: string;
    endTime: string;
    status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
    type: 'float' | 'massage' | 'cleaning';
}

interface GanttProps {
    date: Date;
    bookings: Booking[]; // In real implementation, this would be fetched
    tanks: { id: string, name: string }[];
}

export function GanttTimeline({ date, bookings, tanks }: GanttProps) {
    // Config
    const START_HOUR = 8;
    const END_HOUR = 22; // 10 PM
    const TOTAL_MINUTES = (END_HOUR - START_HOUR) * 60;

    // Helper to position blocks
    const getPosition = (timeStr: string) => {
        const time = parseISO(timeStr);
        const startOfDayTime = startOfDay(time);
        startOfDayTime.setHours(START_HOUR, 0, 0, 0);

        const diff = differenceInMinutes(time, startOfDayTime);
        return (diff / TOTAL_MINUTES) * 100;
    };

    const getWidth = (startStr: string, endStr: string) => {
        const start = parseISO(startStr);
        const end = parseISO(endStr);
        const duration = differenceInMinutes(end, start);
        return (duration / TOTAL_MINUTES) * 100;
    };

    // Time markers
    const hours = Array.from({ length: END_HOUR - START_HOUR + 1 }, (_, i) => START_HOUR + i);

    return (
        <div className="overflow-x-auto border rounded-xl bg-card">
            <div className="min-w-[800px]">
                {/* Header (Time Scale) */}
                <div className="flex border-b border-border bg-muted/40 h-10 items-center">
                    <div className="w-40 flex-shrink-0 px-4 font-medium text-sm text-muted-foreground border-r border-border flex flex-col justify-center">
                        <span>Resource</span>
                        <span className="text-xs font-normal">{format(date, 'MMM dd')}</span>
                    </div>
                    <div className="flex-1 relative h-full">
                        {hours.map(hour => (
                            <div
                                key={hour}
                                className="absolute h-full border-l border-border/50 text-xs text-muted-foreground pl-1 pt-2"
                                style={{ left: `${((hour - START_HOUR) * 60 / TOTAL_MINUTES) * 100}%` }}
                            >
                                {hour}:00
                            </div>
                        ))}
                    </div>
                </div>

                {/* Rows */}
                <div className="divide-y divide-border">
                    {tanks.map(tank => (
                        <div key={tank.id} className="flex h-20 group hover:bg-muted/5 transition-colors">
                            {/* Tank Name */}
                            <div className="w-40 flex-shrink-0 p-4 border-r border-border flex items-center font-medium text-sm">
                                {tank.name}
                            </div>

                            {/* Timeline Lane */}
                            <div className="flex-1 relative h-full bg-[repeating-linear-gradient(90deg,transparent,transparent_calc(100%/14-1px),var(--border)_calc(100%/14-1px),var(--border)_calc(100%/14))]">

                                {/* Bookings */}
                                {bookings
                                    .filter(b => b.tankName === tank.name) // In real app, match by ID
                                    .map(booking => (
                                        <div
                                            key={booking.id}
                                            className={cn(
                                                "absolute top-2 bottom-2 rounded-md shadow-sm border text-xs flex flex-col justify-center px-2 truncate cursor-pointer transition-all hover:brightness-95",
                                                booking.type === 'cleaning' ? "bg-slate-100 border-slate-200 text-slate-500 opacity-70" :
                                                    booking.status === 'confirmed' ? "bg-violet-100 border-violet-200 text-violet-700" :
                                                        booking.status === 'pending' ? "bg-amber-100 border-amber-200 text-amber-700" :
                                                            "bg-gray-100 text-gray-500"
                                            )}
                                            style={{
                                                left: `${getPosition(booking.startTime)}%`,
                                                width: `${getWidth(booking.startTime, booking.endTime)}%`
                                            }}
                                            title={`${booking.clientName} (${format(parseISO(booking.startTime), 'HH:mm')} - ${format(parseISO(booking.endTime), 'HH:mm')})`}
                                        >
                                            {booking.type === 'cleaning' ? (
                                                <span className="italic">Cleaning</span>
                                            ) : (
                                                <>
                                                    <span className="font-semibold">{booking.clientName}</span>
                                                    <span className="opacity-75 hidden sm:inline">{format(parseISO(booking.startTime), 'HH:mm')}</span>
                                                </>
                                            )}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
