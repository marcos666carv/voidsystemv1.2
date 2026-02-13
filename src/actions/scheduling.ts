'use server';

import { db } from "@/db";
import { appointments, tanks, services } from "@/db/schema";
import { eq, and, gte, lte, or } from "drizzle-orm";
import { addMinutes, format, parseISO, startOfDay, endOfDay, isBefore, isAfter } from "date-fns";

// Types
export interface TimeSlot {
    time: string; // HH:mm
    available: boolean;
    tankId?: string;
    reason?: 'booked' | 'cleaning' | 'maintenance' | 'closed';
}

export async function getDailyAvailability(dateStr: string, serviceId: string): Promise<TimeSlot[]> {
    const date = parseISO(dateStr);
    const dayStart = startOfDay(date);
    const dayEnd = endOfDay(date);

    // 1. Get Service Details
    const service = await db.query.services.findFirst({
        where: eq(services.id, serviceId),
    });

    if (!service) throw new Error("Service not found");

    const totalDuration = service.duration + service.setupCleanupMinutes;

    // 2. Get Active Tanks (that can perform this service - assuming all tanks do all services for now, or filter by capability if schema had it)
    // Filtering only 'livre' (free) tanks is wrong because a tank is valid for booking even if currently busy, as long as it's free at the *specific slot*.
    // However, if status is 'manutencao', it should be excluded for the whole day?
    // User req: "Só mostrar horários se status = 'Livre'". This might mean "Tanks that are generally operational".
    // Let's assume 'manutencao' means out of order. 'em_sessao' just means busy right now.

    const activeTanks = await db.query.tanks.findMany({
        where: and(
            eq(tanks.active, true),
            or(eq(tanks.status, 'livre'), eq(tanks.status, 'em_sessao'), eq(tanks.status, 'limpeza'), eq(tanks.status, 'standby'))
            // Exclude 'manutencao', 'modo_noturno'? 
            // Actually, 'status' in DB is current realtime status. 
            // For future booking, we only care if the tank is *Operational*.
            // So we should probably check `active` flag mostly. 
            // But the requirement says "status = 'Livre'".
            // If I interpret "status" as "Current Realtime Status", then I can't book a slot for 2pm if right now at 10am the tank is 'em_sessao'.
            // The user likely means "The slot is free".
            // BUT, maybe they mean "Don't show slots for tanks that are in Maintenance".
            // I will adhere to: Tank must be `active` AND not in `manutencao`.
        )
    });

    if (activeTanks.length === 0) return [];

    // 3. Get Appointments for the day
    const dailyAppointments = await db.query.appointments.findMany({
        where: and(
            gte(appointments.startTime, dayStart.toISOString()),
            lte(appointments.startTime, dayEnd.toISOString()),
            // We need to check filtering by status? Cancelled/NoShow should free up slots.
            or(
                eq(appointments.status, 'confirmed'),
                eq(appointments.status, 'pending'),
                eq(appointments.status, 'completed') // Past/Current appointments block slots
            )
        )
    });

    // 4. Generate Slots
    // Open hours: 08:00 to 22:00 (Hardcoded for now)
    const OPEN_HOUR = 8;
    const CLOSE_HOUR = 22;
    const INTERVAL = 15; // 15 min slots

    const slots: TimeSlot[] = [];

    let currentTime = new Date(dayStart);
    currentTime.setHours(OPEN_HOUR, 0, 0, 0);

    const endTime = new Date(dayStart);
    endTime.setHours(CLOSE_HOUR, 0, 0, 0);

    while (isBefore(currentTime, endTime)) {
        const slotStart = new Date(currentTime);
        const slotEnd = addMinutes(slotStart, totalDuration);

        // Check if slot exceeds closing time
        if (isAfter(slotEnd, endTime)) {
            currentTime = addMinutes(currentTime, INTERVAL);
            continue;
        }

        // Check availability for this slot across ALL tanks
        // We need at least ONE tank available for the entire duration
        let availableTankId: string | undefined;

        for (const tank of activeTanks) {
            const isTankBusy = dailyAppointments.some(appt => {
                if (appt.tankId !== tank.id) return false;

                // Check overlap
                // Appt Start < Slot End AND Appt End > Slot Start
                // Note: Appt End in DB usually includes cleanup? No, usually distinct.
                // Requirement: "Adicionar automaticamente 15min de 'Limpeza' após cada sessão".
                // So efficient blocking: [Appt Start, Appt End + 15min]
                // Wait, `totalDuration` already includes cleanup for the NEW appointment.
                // We need to check if the EXISTING appointment blocks the start of the new one.

                const apptStart = parseISO(appt.startTime);
                const apptEnd = parseISO(appt.endTime);

                // We assume the DB appointment `endTime` is the session end.
                // We need to add 15min cleanup to `apptEnd` when checking conflict.
                // Wait, does existing booking have separate cleanup logic?
                // Let's assume 15min cleanup is rule.

                const apptBlockEnd = addMinutes(apptEnd, 15);

                // Overlap Logic:
                // New Slot: [slotStart, slotEnd]
                // Existing Block: [apptStart, apptBlockEnd]

                return isBefore(slotStart, apptBlockEnd) && isAfter(slotEnd, apptStart);
            });

            if (!isTankBusy) {
                availableTankId = tank.id;
                break; // Found a tank!
            }
        }

        slots.push({
            time: format(slotStart, 'HH:mm'),
            available: !!availableTankId,
            tankId: availableTankId,
            reason: availableTankId ? undefined : 'booked' // Simplified reason
        });

        currentTime = addMinutes(currentTime, INTERVAL);
    }
    return slots;
}

// Types for booking

// Types for booking
export interface CreateAppointmentParams {
    clientId: string;
    serviceId: string;
    startTime: string; // ISO string
    tankId?: string; // Optional, if not provided, auto-assign
    notes?: string;
    override?: boolean; // Admin override flag
}

export async function createAppointment(params: CreateAppointmentParams) {
    const { clientId, serviceId, startTime, tankId, override, notes } = params;
    const start = parseISO(startTime);

    // 1. Get Service
    const service = await db.query.services.findFirst({
        where: eq(services.id, serviceId)
    });
    if (!service) throw new Error("Service not found");

    // const totalDuration = service.duration + service.setupCleanupMinutes;
    const end = addMinutes(start, service.duration); // Booking time is just duration
    // But blocking time effectively includes cleanup. 
    // Usually we store the Appointment End as the time the customer leaves the tank.
    // The cleanup is implicit in availability checks.

    // 2. Validate Availability (unless override)
    if (!override) {
        // We need to check if the specific slot is free on the specific tank (if provided) or ANY tank.
        // Re-using logic from getDailyAvailability but specific to this slot.
        // It's cheaper to just query overlapping appointments.

        const bookingEndWithCleanup = addMinutes(end, service.setupCleanupMinutes);

        const conflicts = await db.query.appointments.findMany({
            where: and(
                // Overlap: existing.start < new.end+cleanup AND existing.end+cleanup > new.start
                // Wait, existing appointments ALSO have cleanup.
                // Conflict condition: 
                // (Existing.Start < New.End+Cleanup) AND (Existing.End+Cleanup > New.Start)

                // Simplified: Just use 15min buffer. 
                // Note: Is cleanup after or before? Usually after.
                // Logic: 
                // A1: 10:00 - 11:00 (Busy until 11:15)
                // A2: Try 11:00 - 12:00.
                // A2 Start (11:00) < A1 End+Cleanup (11:15)? YES -> Conflict.
                // A2 Start (11:15) < A1 End+Cleanup (11:15)? NO -> OK.

                or(
                    eq(appointments.status, 'confirmed'),
                    eq(appointments.status, 'pending')
                )
            )
        });

        // Filter collisions in application code for simplicity regarding 15min buffer calculation on DB side
        const hasConflict = conflicts.some(appt => {
            // For each existing appointment, determine its blocking range
            // We need its service duration to know its setup time? 
            // Or assume global 15min?
            // Let's assume global 15min for now or fetch service if strict.
            // Ideally we store 'blockingEndTime' in DB, but we don't.

            const apptStart = parseISO(appt.startTime);
            const apptEnd = parseISO(appt.endTime);
            const apptBlockingEnd = addMinutes(apptEnd, 15); // Assume 15min cleanup

            // Check if specific tank is requested or if we need to find ANY free tank
            if (tankId && appt.tankId !== tankId) return false; // Conflict on another tank doesn't matter if specific tank requested.

            // If no tank requested, we only fail if ALL tanks are blocked.
            // But usually for "createBooking", a tank is selected or assigned.
            // Let's assume if tankId is NOT provided, we try to finding one.

            // If tankId is provided, check overlap
            if (tankId) {
                // New Start < Old Blocking End AND New Blocking End > Old Start
                return isBefore(start, apptBlockingEnd) && isAfter(bookingEndWithCleanup, apptStart);
            }

            // If no tank provided, we don't know if there's a conflict yet until we check all tanks.
            return false;
        });

        // If tankId was provided and conflict found
        if (tankId && hasConflict) {
            throw new Error("Selected tank is not available at this time.");
        }

        // If no tankId, we need to find one free tank.
        if (!tankId) {
            // Get all active tanks
            const activeTanks = await db.query.tanks.findMany({ where: eq(tanks.active, true) });

            // Find a tank that has NO conflicts
            const validTank = activeTanks.find(tank => {
                const tankConflicts = conflicts.filter(c => c.tankId === tank.id);
                const isBusy = tankConflicts.some(appt => {
                    const apptStart = parseISO(appt.startTime);
                    const apptEnd = parseISO(appt.endTime);
                    const apptBlockingEnd = addMinutes(apptEnd, 15);

                    return isBefore(start, apptBlockingEnd) && isAfter(bookingEndWithCleanup, apptStart);
                });
                return !isBusy;
            });

            if (!validTank) {
                throw new Error("No tanks available at this time.");
            }

            // Assign the found tank
            // eslint-disable-next-line no-param-reassign
            params.tankId = validTank.id;
        }
    }

    // 3. Create Appointment
    // Validate tankId is present (it should be assigned above if missing)
    if (!params.tankId && !override) throw new Error("Could not assign a tank.");

    await db.insert(appointments).values({
        id: crypto.randomUUID(),
        clientId,
        serviceId,
        tankId: params.tankId, // Might be undefined if override allowed without tank? No, implies tank booking.
        startTime: startTime,
        endTime: format(end, "yyyy-MM-dd'T'HH:mm:ss"),
        status: 'confirmed', // Auto-confirm for admin/demo
        notes: notes
    });

    return { success: true };
}

export async function getAdminSchedule(dateStr: string) {
    const date = parseISO(dateStr);
    const dayStart = startOfDay(date);
    const dayEnd = endOfDay(date);

    // 1. Get All Tanks
    const _tanks = await db.query.tanks.findMany({
        where: eq(tanks.active, true),
        with: {
            location: true // if needed
        }
    });

    // 2. Get Appointments
    const _appointments = await db.query.appointments.findMany({
        where: and(
            gte(appointments.startTime, dayStart.toISOString()),
            lte(appointments.startTime, dayEnd.toISOString())
        ),
        with: {
            client: true,
            tank: true,
            service: true
        }
    });

    // 3. Transform for Frontend
    const bookings = _appointments.map(appt => ({
        id: appt.id,
        tankName: appt.tank?.name || 'Unassigned',
        clientName: appt.client?.fullName || 'Unknown',
        startTime: appt.startTime,
        endTime: appt.endTime,
        status: appt.status,
        type: (appt.service?.name.toLowerCase().includes('massagem') ? 'massage' : 'float') as 'float' | 'massage' | 'cleaning'
    }));

    // Add fake "Cleaning" blocks?
    // User requirement: "Adicionar automaticamente 15min de 'Limpeza' após cada sessão".
    // We should visualize this in Gantt.
    const cleaningBlocks = _appointments.map(appt => {
        const end = parseISO(appt.endTime);
        const cleanupEnd = addMinutes(end, 15);
        return {
            id: `${appt.id}-cleaning`,
            tankName: appt.tank?.name || 'Unassigned',
            clientName: "",
            startTime: appt.endTime,
            endTime: format(cleanupEnd, "yyyy-MM-dd'T'HH:mm:ss"),
            status: 'completed', // cleaning is task
            type: 'cleaning' as const
        };
    });

    return {
        tanks: _tanks.map(t => ({ id: t.id, name: t.name })),
        bookings: [...bookings, ...cleaningBlocks]
    };
}
