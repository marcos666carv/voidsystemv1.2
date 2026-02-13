'use client';

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { GanttTimeline } from "@/components/admin/schedule/GanttTimeline";
import { OverrideBookingForm } from "@/components/admin/schedule/OverrideBookingForm";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { getAdminSchedule } from "@/actions/scheduling";

export function SchedulePage() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [scheduleData, setScheduleData] = useState<{ tanks: any[], bookings: any[] }>({ tanks: [], bookings: [] });

    // Mock data for demo
    useEffect(() => {
        setScheduleData({
            tanks: [
                { id: '1', name: 'Tank 1 (Ocean)' },
                { id: '2', name: 'Tank 2 (Void)' },
                { id: '3', name: 'Tank 3 (Nebula)' },
                { id: '4', name: 'Massage Room' }
            ],
            bookings: [
                { id: '1', tankId: '1', tankName: 'Tank 1 (Ocean)', clientName: 'John Doe', startTime: '10:00', endTime: '11:00', duration: 60, type: 'float', status: 'confirmed' },
                { id: '2', tankId: '1', tankName: 'Tank 1 (Ocean)', clientName: 'Sarah Smith', startTime: '14:30', endTime: '16:00', duration: 90, type: 'float', status: 'confirmed' },
                { id: '3', tankId: '2', tankName: 'Tank 2 (Void)', clientName: 'Mike Ross', startTime: '11:00', endTime: '12:00', duration: 60, type: 'float', status: 'confirmed' },
                { id: '4', tankId: '4', tankName: 'Massage Room', clientName: 'Emily Blunt', startTime: '13:00', endTime: '14:00', duration: 60, type: 'massage', status: 'confirmed' },
            ]
        });
    }, [date]);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Schedule Management</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Visual Timeline (Gantt) */}
                <div className="lg:col-span-2 space-y-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Timeline View</CardTitle>
                            <div className="text-sm text-muted-foreground">
                                {date ? format(date, 'PPPP') : 'Select a date'}
                            </div>
                        </CardHeader>
                        <CardContent>
                            {date && (
                                <GanttTimeline
                                    date={date}
                                    tanks={scheduleData.tanks}
                                    bookings={scheduleData.bookings}
                                />
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Controls (Calendar & Manual Override) */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Date Selector</CardTitle>
                        </CardHeader>
                        <CardContent className="flex justify-center">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="rounded-md border"
                            />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Manual Override</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <OverrideBookingForm />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
