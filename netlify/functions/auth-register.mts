import type { Context, Config } from "@netlify/functions";
import { getDb } from "./lib/db.mjs";
import { jsonOk, jsonError, signToken } from "./lib/auth.mjs";
import { clients } from "../../src/db/schema.js";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export default async (req: Request, context: Context) => {
    if (req.method !== "POST") {
        return jsonError("Method not allowed", 405);
    }

    try {
        const body = await req.json();
        const { email, password, fullName, phone, cpf, birthDate, neighborhood, city, cep, profession, role: requestedRole } = body;

        if (!email || !password || !fullName) {
            return jsonError("Email, password, and full name are required", 400);
        }

        const db = getDb();

        // Check if email already exists
        const existing = await db.query.clients.findFirst({
            where: eq(clients.email, email.toLowerCase().trim()),
        });

        if (existing) {
            return jsonError("Email already registered", 409);
        }

        const passwordHash = await bcrypt.hash(password, 12);
        const id = crypto.randomUUID();
        const userRole = requestedRole === 'admin' ? 'admin' : 'client';

        // Normalize city
        const cityNormalized = city
            ? city.trim().split(' ').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ')
            : null;

        await db.insert(clients).values({
            id,
            email: email.toLowerCase().trim(),
            fullName: fullName.trim(),
            passwordHash,
            phone: phone?.trim() || null,
            cpf: cpf?.replace(/\D/g, '') || null,
            birthDate: birthDate || null,
            addressNeighborhood: neighborhood?.trim() || null,
            addressCity: city?.trim() || null,
            addressCityNormalized: cityNormalized,
            addressCep: cep?.replace(/\D/g, '') || null,
            profession: profession?.trim() || null,
            role: userRole,
            leadSource: 'website',
            lifeCycleStage: 'new',
        });

        const token = signToken({ userId: id, email: email.toLowerCase().trim(), role: userRole });

        return jsonOk({
            token,
            user: { id, email: email.toLowerCase().trim(), fullName: fullName.trim(), role: userRole },
        }, 201);
    } catch (error: any) {
        console.error("Register error:", error);
        return jsonError("Internal server error", 500);
    }
};

export const config: Config = {
    path: "/api/auth/register",
};
