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
        const { email, password } = body;

        if (!email || !password) {
            return jsonError("Email and password are required", 400);
        }

        const db = getDb();
        const user = await db.query.clients.findFirst({
            where: eq(clients.email, email.toLowerCase().trim()),
        });

        if (!user || !user.passwordHash) {
            return jsonError("Invalid credentials", 401);
        }

        const isValid = await bcrypt.compare(password, user.passwordHash);
        if (!isValid) {
            return jsonError("Invalid credentials", 401);
        }

        const token = signToken({
            userId: user.id,
            email: user.email,
            role: user.role,
        });

        return jsonOk({
            token,
            user: {
                id: user.id,
                email: user.email,
                fullName: user.fullName,
                role: user.role,
                membershipTier: user.membershipTier,
                level: user.level,
                xp: user.xp,
            },
        });
    } catch (error: any) {
        console.error("Login error:", error);
        return jsonError("Internal server error", 500);
    }
};

export const config: Config = {
    path: "/api/auth/login",
};
