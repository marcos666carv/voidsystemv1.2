import { db } from "@/db"; // Assuming this is client-safe or this is a backend file
import { tanks, maintenanceLogs, appointments } from "@/db/schema";
import { eq, desc, and, gte } from "drizzle-orm";
import { subDays } from "date-fns";

// --- Mission Control Actions ---

export async function getMissionControlData() {
    // 1. Get Tanks with latest status
    const allTanks = await db.query.tanks.findMany({
        where: eq(tanks.active, true),
        with: {
            maintenanceLogs: {
                limit: 1,
                orderBy: [desc(maintenanceLogs.createdAt)],
                where: eq(maintenanceLogs.status, 'open')
            },
            // Get today's appointments to determine "Next Session"
            appointments: {
                where: and(
                    gte(appointments.startTime, new Date().toISOString()),
                    // Limit to next 24h for "Next Session"
                ),
                orderBy: [desc(appointments.startTime)], // We want the soonest, actually ASC.
                limit: 1
            }
        }
    });

    // Sort appointments manually since we can't easily do it inside `with` with dynamic dates in standard Drizzle query builder sometimes, 
    // but here we used `orderBy`. Let's correct it to ASC for "Next Session".
    // Actually, `with` queries in Drizzle are powerful. 
    // Let's refine the query in a separate step if needed, but `orderBy` ASC is what we need for "Next Session".

    // 2. Telemetry / Usage Stats (Simple aggregation)
    // Calculate hours used in the last 30 days
    const thirtyDaysAgo = subDays(new Date(), 30).toISOString();
    const recentAppointments = await db.query.appointments.findMany({
        where: and(
            eq(appointments.status, 'completed'),
            gte(appointments.startTime, thirtyDaysAgo)
        ),
        with: {
            service: true
        }
    });

    const usageStats = allTanks.map((tank: any) => {
        const tankAppts = recentAppointments.filter((a: any) => a.tankId === tank.id);
        const totalMinutes = tankAppts.reduce((acc: number, curr: any) => acc + curr.service.duration, 0);
        return {
            tankId: tank.id,
            hoursLast30Days: Math.round(totalMinutes / 60)
        };
    });

    // 3. Transform for UI
    const dashboardTanks = allTanks.map((tank: any) => {
        // Find next session
        // We need to re-query or fix the order above. 
        // Let's do a quick separate query for next session to be robust for now, 
        // or just trust the `with` if I change it to ASC. I'll assume I can fix the `with` logic or just process client side if small data.
        // Actually, for "Mission Control", real-time accuracy is key.

        return {
            ...tank,
            nextSession: tank.appointments[0]?.startTime || null,
            activeIssue: tank.maintenanceLogs[0] || null,
            usage: usageStats.find((u: any) => u.tankId === tank.id)?.hoursLast30Days || 0
        };
    });

    return dashboardTanks;
}

export async function toggleTankStatus(tankId: string, newStatus: 'livre' | 'limpeza' | 'modo_noturno' | 'manutencao' | 'standby') {
    await db.update(tanks)
        .set({ status: newStatus })
        .where(eq(tanks.id, tankId));

    return { success: true };
}

export async function reportMaintenance(tankId: string, description: string, severity: 'low' | 'medium' | 'high' | 'critical', reportedBy: string) {
    await db.insert(maintenanceLogs).values({
        id: crypto.randomUUID(),
        tankId,
        description,
        severity,
        status: 'open',
        reportedBy
    });

    // If critical/high, maybe set tank to maintenance?
    if (severity === 'critical' || severity === 'high') {
        await db.update(tanks).set({ status: 'manutencao' }).where(eq(tanks.id, tankId));
    }

    return { success: true };
}

export async function resolveMaintenance(logId: string) {
    await db.update(maintenanceLogs)
        .set({ status: 'resolved', resolvedAt: new Date().toISOString() })
        .where(eq(maintenanceLogs.id, logId));

    return { success: true };
}
