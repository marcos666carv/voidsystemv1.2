import 'dotenv/config';
import { db } from "../src/db";
import { clients } from "../src/db/schema";
import { count } from "drizzle-orm";

async function main() {
    try {
        console.log("⏳ Connecting to Nexus (Neon DB)...");

        const clientCount = await db.select({ count: count() }).from(clients);
        console.log(`✅ Connection successful. Found ${clientCount[0].count} clients.`);

        process.exit(0);
    } catch (error) {
        console.error("❌ Connection failed:", error);
        process.exit(1);
    }
}

main();
