import type { Context, Config } from "@netlify/functions";
import { getDb } from "./lib/db.mjs";
import { jsonOk, jsonError, requireAuth } from "./lib/auth.mjs";
import { sales, clients } from "../../src/db/schema.js";
import { eq, desc, gte, lte, and, sql, sum, count } from "drizzle-orm";

export default async (req: Request, context: Context) => {
    try {
        const auth = await requireAuth(req);
        if (auth.role !== "admin" && auth.role !== "staff") {
            return jsonError("Forbidden", 403);
        }

        const db = getDb();
        const url = new URL(req.url);

        if (req.method === "GET") {
            const startDate = url.searchParams.get("startDate");
            const endDate = url.searchParams.get("endDate");
            const clientId = url.searchParams.get("clientId");
            const page = parseInt(url.searchParams.get("page") || "1", 10);
            const limit = parseInt(url.searchParams.get("limit") || "50", 10);
            const offset = (page - 1) * limit;

            let query = db.select().from(sales);

            if (startDate && endDate) {
                query = query.where(
                    and(gte(sales.createdAt, startDate), lte(sales.createdAt, endDate))
                ) as any;
            }

            if (clientId) {
                query = query.where(eq(sales.clientId, clientId)) as any;
            }

            const results = await (query as any)
                .orderBy(desc(sales.createdAt))
                .limit(limit)
                .offset(offset);

            // Totals
            const totalResult = await db
                .select({ total: count(), revenue: sum(sales.totalAmount) })
                .from(sales);

            return jsonOk({
                sales: results,
                summary: {
                    totalSales: totalResult[0]?.total || 0,
                    totalRevenue: totalResult[0]?.revenue || 0,
                },
                pagination: { page, limit },
            });
        }

        if (req.method === "POST") {
            const body = await req.json();
            const { clientId, items, totalAmount, paymentMethod, notes } = body;

            if (!clientId || !items || !totalAmount) {
                return jsonError("clientId, items, and totalAmount are required", 400);
            }

            const id = crypto.randomUUID();

            await db.insert(sales).values({
                id,
                clientId,
                items,
                totalAmount,
                paymentMethod: paymentMethod || "cash",
                notes: notes || null,
                createdBy: auth.userId,
            });

            // Update client total spent
            await db
                .update(clients)
                .set({
                    totalSpent: sql`${clients.totalSpent} + ${totalAmount}`,
                })
                .where(eq(clients.id, clientId));

            return jsonOk({ id, message: "Sale recorded" }, 201);
        }

        return jsonError("Method not allowed", 405);
    } catch (error: any) {
        if (error.message === "UNAUTHORIZED") {
            return jsonError("Unauthorized", 401);
        }
        console.error("Sales error:", error);
        return jsonError("Internal server error", 500);
    }
};

export const config: Config = {
    path: "/api/sales",
};
