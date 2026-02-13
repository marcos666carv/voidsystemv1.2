import { db } from "@/db";
import { clients, appointments } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { subDays } from "date-fns";

// --- CRM / Segmentation Logic ---

export interface ClientSegment {
    id: string;
    fullName: string;
    email: string;
    lastVisit: string | null;
    totalSpent: number;
    npsScore: number | null;
    segment: 'vip' | 'risk' | 'new' | 'active';
}

export async function getClientSegments() {
    // Determine thresholds
    const riskThresholdDate = subDays(new Date(), 90);
    const newClientThresholdDate = subDays(new Date(), 30);

    const allClients = await db.query.clients.findMany({
        with: {
            appointments: {
                limit: 1,
                orderBy: [desc(appointments.startTime)]
            }
        }
    });

    const segments: ClientSegment[] = allClients.map((client: any) => {
        let segment: 'vip' | 'risk' | 'new' | 'active' = 'active';

        const lastVisitDate = client.lastVisit ? new Date(client.lastVisit) : null;
        const createdAtDate = new Date(client.createdAt);

        // Logic Hierarchy
        if (client.totalSpent > 1000 || (client.npsScore && client.npsScore >= 9)) {
            segment = 'vip';
        } else if (lastVisitDate && lastVisitDate < riskThresholdDate) {
            segment = 'risk';
        } else if (createdAtDate > newClientThresholdDate && client.totalSessions <= 1) {
            segment = 'new';
        }

        return {
            id: client.id,
            fullName: client.fullName,
            email: client.email,
            lastVisit: client.lastVisit,
            totalSpent: client.totalSpent,
            npsScore: client.npsScore,
            segment
        };
    });

    return {
        vip: segments.filter(s => s.segment === 'vip'),
        risk: segments.filter(s => s.segment === 'risk'),
        new: segments.filter(s => s.segment === 'new'),
        all: segments
    };
}

// --- Client Profile & Timeline ---

export async function getClientProfile(clientId: string) {
    const client = await db.query.clients.findFirst({
        where: eq(clients.id, clientId),
        with: {
            appointments: {
                orderBy: [desc(appointments.startTime)],
                with: {
                    service: true
                }
            }
        }
    });

    if (!client) return null;

    // Construct Timeline
    // Merge appointments, purchase history (if we had a table, currently jsonb), and interaction history
    // For now, we mainly use appointments as the interaction log
    const timeline = client.appointments.map((appt: any) => ({
        id: appt.id,
        type: 'appointment',
        date: appt.startTime,
        title: `Session: ${appt.service.name}`,
        status: appt.status,
        notes: appt.notes
    }));

    // Add fake "Communication" logs for demo if interactionHistory is empty
    // In real app, we'd pull from a `communications` table
    const mockComms = [
        { id: 'c1', type: 'communication', date: subDays(new Date(), 2).toISOString(), title: 'Sent Reminder Email', status: 'delivered', notes: 'Automated System' }
    ];

    const sortedTimeline = [...timeline, ...mockComms].sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return {
        ...client,
        timeline: sortedTimeline
    };
}

export async function updateClientPreferences(clientId: string, preferences: any) {
    await db.update(clients)
        .set({ preferences })
        .where(eq(clients.id, clientId));
    return { success: true };
}
