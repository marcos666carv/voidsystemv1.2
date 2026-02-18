import type { Context, Config } from "@netlify/functions";
import { getDb } from "./lib/db.mjs";
import { jsonOk, jsonError, requireAuth } from "./lib/auth.mjs";
import { appointments, clients, services, tanks } from "../../src/db/schema.js";
import { eq, and, gte, lte, desc } from "drizzle-orm";

export default async (req: Request, context: Context) => {
    try {
        const db = getDb();
        const url = new URL(req.url);

        if (req.method === "GET") {
            const date = url.searchParams.get("date");
            const clientId = url.searchParams.get("clientId");
            const status = url.searchParams.get("status");

            let query = db.select().from(appointments);

            if (date) {
                const dayStart = `${date}T00:00:00`;
                const dayEnd = `${date}T23:59:59`;
                query = query.where(
                    and(
                        gte(appointments.startTime, dayStart),
                        lte(appointments.startTime, dayEnd)
                    )
                ) as any;
            }

            if (clientId) {
                query = query.where(eq(appointments.clientId, clientId)) as any;
            }

            if (status) {
                query = query.where(eq(appointments.status, status as any)) as any;
            }

            const results = await (query as any).orderBy(desc(appointments.startTime)).limit(100);

            return jsonOk({ appointments: results });
        }

        if (req.method === "POST") {
            const body = await req.json();
            const { clientId, serviceId, tankId, startTime, endTime, notes } = body;

            if (!clientId || !serviceId || !startTime || !endTime) {
                return jsonError("clientId, serviceId, startTime, and endTime are required", 400);
            }

            const id = crypto.randomUUID();

            await db.insert(appointments).values({
                id,
                clientId,
                serviceId,
                tankId: tankId || null,
                startTime,
                endTime,
                status: "pending",
                notes: notes || null,
            });

            return jsonOk({ id, message: "Appointment created" }, 201);
        }

        if (req.method === "PUT") {
            const auth = requireAuth(req);
            const body = await req.json();
            const { id, status, tankId, notes } = body;

            if (!id) {
                return jsonError("Appointment id is required", 400);
            }

            const updateData: Record<string, any> = {};
            if (status) updateData.status = status;
            if (tankId !== undefined) updateData.tankId = tankId;
            if (notes !== undefined) updateData.notes = notes;

            await db.update(appointments).set(updateData).where(eq(appointments.id, id));

            return jsonOk({ message: "Appointment updated" });
        }

        return jsonError("Method not allowed", 405);
    } catch (error: any) {
        if (error.message === "UNAUTHORIZED") {
            return jsonError("Unauthorized", 401);
        }
        console.error("Appointments error:", error);
        return jsonError("Internal server error", 500);
    }
};

export const config: Config = {
    path: "/api/appointments",
};
