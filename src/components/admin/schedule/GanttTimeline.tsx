import { format } from "date-fns";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface TimelineProps {
    date: Date;
    tanks: any[];
    bookings: any[];
}

export function GanttTimeline({ date, tanks, bookings }: TimelineProps) {
    const startHour = 8; // 8 AM
    const endHour = 22; // 10 PM
    const hours = Array.from({ length: endHour - startHour + 1 }, (_, i) => startHour + i);
    const PIXELS_PER_HOUR = 120; // Width of one hour slot

    const getPosition = (timeStr: string) => {
        const [h, m] = timeStr.split(':').map(Number);
        const totalMinutes = (h - startHour) * 60 + m;
        return (totalMinutes / 60) * PIXELS_PER_HOUR;
    };

    const getWidth = (durationMinutes: number) => {
        return (durationMinutes / 60) * PIXELS_PER_HOUR;
    };

    return (
        <div className="border rounded-xl bg-white overflow-hidden">
            <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex flex-col min-w-max">

                    {/* Header Row (Hours) */}
                    <div className="flex border-b border-slate-200">
                        <div className="w-48 shrink-0 sticky left-0 z-20 bg-white border-r border-slate-200 p-4 font-semibold text-sm text-slate-500">
                            Resource
                        </div>
                        <div className="flex h-12">
                            {hours.map(hour => (
                                <div key={hour} className="border-r border-slate-100 flex items-center justify-center text-xs text-slate-400 font-mono" style={{ width: PIXELS_PER_HOUR }}>
                                    {hour}:00
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Resource Rows */}
                    {tanks.length > 0 ? tanks.map((tank, index) => (
                        <div key={index} className="flex border-b border-slate-100 hover:bg-slate-50/50 transition-colors relative group">
                            {/* Resource Label sticky to left */}
                            <div className="w-48 shrink-0 sticky left-0 z-10 bg-white group-hover:bg-slate-50 px-4 py-8 border-r border-slate-200 flex items-center font-medium text-sm text-slate-700">
                                {tank.name || tank}
                            </div>

                            {/* Timeline Track */}
                            <div className="relative h-24 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIi8+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmMWY1ZjkiLz4KPC9zdmc+')]">
                                {/* Hour Markers (Vertical Lines) */}
                                {hours.map(hour => (
                                    <div key={hour} className="absolute top-0 bottom-0 border-r border-slate-100 border-dashed" style={{ left: (hour - startHour) * PIXELS_PER_HOUR, width: 1 }}></div>
                                ))}

                                {/* Bookings for this tank */}
                                {bookings.filter(b => b.tankId === tank.id).map(booking => (
                                    <div
                                        key={booking.id}
                                        className="absolute top-4 h-16 rounded-lg bg-violet-100 border border-violet-200 text-violet-700 px-3 py-2 text-xs flex flex-col justify-center shadow-sm cursor-pointer hover:bg-violet-200 transition-colors z-10"
                                        style={{ left: getPosition(booking.startTime), width: getWidth(booking.duration) }}
                                    >
                                        <span className="font-bold">{booking.clientName}</span>
                                        <span className="opacity-75">{booking.startTime} - {booking.endTime}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )) : (
                        <div className="p-8 text-center text-muted-foreground">No resources available for {date && format(date, 'yyyy-MM-dd')}</div>
                    )}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    );
}
