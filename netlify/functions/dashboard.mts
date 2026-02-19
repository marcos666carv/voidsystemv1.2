import type { Context, Config } from "@netlify/functions";
import { getDb } from "./lib/db.mjs";
import { jsonOk, jsonError, requireAuth } from "./lib/auth.mjs";
import { clients, appointments, sales, tanks, services } from "../../src/db/schema.js";
import { eq, gte, lte, and, sql, count, sum, desc } from "drizzle-orm";

export default async (req: Request, context: Context) => {
    if (req.method !== "GET") {
        return jsonError("Method not allowed", 405);
    }

    try {
        const auth = await requireAuth(req);
        const db = getDb();
        const url = new URL(req.url);
        const type = url.searchParams.get("type") || "admin";

        if (type === "admin") {
            if (auth.role !== "admin" && auth.role !== "staff") {
                return jsonError("Forbidden", 403);
            }

            const today = new Date();
            const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).toISOString();
            const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59).toISOString();
            const todayStr = today.toISOString().split("T")[0];

            // Total clients
            const totalClientsResult = await db.select({ total: count() }).from(clients);

            // New clients this month
            const newClientsResult = await db
                .select({ total: count() })
                .from(clients)
                .where(and(gte(clients.createdAt, startOfMonth), lte(clients.createdAt, endOfMonth)));

            // Today's appointments
            const todayAppointments = await db
                .select({ total: count() })
                .from(appointments)
                .where(
                    and(
                        gte(appointments.startTime, `${todayStr}T00:00:00`),
                        lte(appointments.startTime, `${todayStr}T23:59:59`)
                    )
                );

            // Monthly revenue
            const revenueResult = await db
                .select({ total: sum(sales.totalAmount) })
                .from(sales)
                .where(and(gte(sales.createdAt, startOfMonth), lte(sales.createdAt, endOfMonth)));

            // Monthly sales count
            const salesCountResult = await db
                .select({ total: count() })
                .from(sales)
                .where(and(gte(sales.createdAt, startOfMonth), lte(sales.createdAt, endOfMonth)));

            // Active tanks
            const activeTanks = await db
                .select()
                .from(tanks)
                .where(eq(tanks.active, true));

            // Lead source distribution
            const leadSources = await db
                .select({
                    source: clients.leadSource,
                    total: count(),
                })
                .from(clients)
                .groupBy(clients.leadSource);

            // Upcoming appointments
            const upcomingAppointments = await db
                .select()
                .from(appointments)
                .where(gte(appointments.startTime, todayStr))
                .orderBy(appointments.startTime)
                .limit(10);

            // Recent clients
            const recentClients = await db
                .select({
                    id: clients.id,
                    fullName: clients.fullName,
                    email: clients.email,
                    leadSource: clients.leadSource,
                    createdAt: clients.createdAt,
                })
                .from(clients)
                .orderBy(desc(clients.createdAt))
                .limit(5);

            return jsonOk({
                totalClients: totalClientsResult[0]?.total || 0,
                newClientsThisMonth: newClientsResult[0]?.total || 0,
                todayAppointments: todayAppointments[0]?.total || 0,
                monthlyRevenue: revenueResult[0]?.total || 0,
                monthlySales: salesCountResult[0]?.total || 0,
                activeTanks,
                leadSources,
                upcomingAppointments,
                recentClients,
            });
        }

        // Client dashboard
        if (type === "client") {
            const clientData = await db.query.clients.findFirst({
                where: eq(clients.id, auth.userId),
                with: {
                    appointments: {
                        orderBy: desc(appointments.startTime),
                        limit: 5,
                    },
                },
            });

            if (!clientData) {
                return jsonError("Client not found", 404);
            }

            const { passwordHash, ...safeData } = clientData;

            return jsonOk({
                profile: safeData,
            });
        }

        return jsonError("Invalid dashboard type", 400);
    } catch (error: any) {
        if (error.message === "UNAUTHORIZED") {
            return jsonError("Unauthorized", 401);
        }
        console.error("Dashboard error:", error);
        return jsonError("Internal server error", 500);
    }
};

export const config: Config = {
    path: "/api/dashboard",
};
