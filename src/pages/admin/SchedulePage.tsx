'use client';

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { GanttTimeline } from "@/components/admin/schedule/GanttTimeline";
import { OverrideBookingForm } from "@/components/admin/schedule/OverrideBookingForm";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAdminSchedule } from "@/actions/scheduling";

export function SchedulePage() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [scheduleData, setScheduleData] = useState<{ tanks: any[], bookings: any[] }>({ tanks: [], bookings: [] });

    useEffect(() => {
        if (date) {
            getAdminSchedule(format(date, 'yyyy-MM-dd')).then(data => {
                setScheduleData(data);
            });
        }
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
