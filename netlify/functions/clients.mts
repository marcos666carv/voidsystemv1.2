import type { Context, Config } from "@netlify/functions";
import { getDb } from "./lib/db.mjs";
import { jsonOk, jsonError, requireAuth } from "./lib/auth.mjs";
import { clients, clientTags } from "../../src/db/schema.js";
import { eq, ilike, desc, sql, count } from "drizzle-orm";

export default async (req: Request, context: Context) => {
    try {
        const db = getDb();
        const url = new URL(req.url);

        if (req.method === "GET") {
            // Parse query params
            const page = parseInt(url.searchParams.get("page") || "1", 10);
            const limit = parseInt(url.searchParams.get("limit") || "50", 10);
            const search = url.searchParams.get("search") || "";
            const segment = url.searchParams.get("segment") || "";
            const source = url.searchParams.get("source") || "";
            const offset = (page - 1) * limit;

            let query = db.select().from(clients);

            // Apply search filter
            if (search) {
                query = query.where(
                    ilike(clients.fullName, `%${search}%`)
                ) as any;
            }

            if (source) {
                query = query.where(eq(clients.leadSource, source)) as any;
            }

            const results = await (query as any)
                .orderBy(desc(clients.createdAt))
                .limit(limit)
                .offset(offset);

            // Get total count
            const totalResult = await db.select({ total: count() }).from(clients);
            const total = totalResult[0]?.total || 0;

            return jsonOk({
                clients: results,
                pagination: { page, limit, total, pages: Math.ceil(total / limit) },
            });
        }

        if (req.method === "POST") {
            const auth = await requireAuth(req);
            if (auth.role !== "admin" && auth.role !== "staff") {
                return jsonError("Forbidden", 403);
            }

            const body = await req.json();
            const id = crypto.randomUUID();

            await db.insert(clients).values({
                id,
                email: body.email.toLowerCase().trim(),
                fullName: body.fullName.trim(),
                phone: body.phone?.trim() || null,
                cpf: body.cpf?.replace(/\D/g, "") || null,
                birthDate: body.birthDate || null,
                addressNeighborhood: body.neighborhood?.trim() || null,
                addressCity: body.city?.trim() || null,
                addressCityNormalized: body.city?.trim()
                    ? body.city.trim().split(" ").map((w: string) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ")
                    : null,
                addressCep: body.cep?.replace(/\D/g, "") || null,
                profession: body.profession?.trim() || null,
                leadSource: body.leadSource || "manual",
                lifeCycleStage: "new",
            });

            // Add tags if provided
            if (body.tags && Array.isArray(body.tags)) {
                for (const tag of body.tags) {
                    await db.insert(clientTags).values({
                        id: crypto.randomUUID(),
                        clientId: id,
                        tag: tag.toLowerCase().trim(),
                    });
                }
            }

            return jsonOk({ id, message: "Client created" }, 201);
        }

        return jsonError("Method not allowed", 405);
    } catch (error: any) {
        if (error.message === "UNAUTHORIZED") {
            return jsonError("Unauthorized", 401);
        }
        console.error("Clients error:", error);
        return jsonError("Internal server error", 500);
    }
};

export const config: Config = {
    path: "/api/clients",
};
