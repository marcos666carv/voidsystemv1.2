import 'dotenv/config';
import { db } from "../src/db";
import { sql } from "drizzle-orm";

async function main() {
    try {
        console.log("⏳ Fixing tank status data...");

        // Update 'available' to 'livre'
        await db.execute(sql`UPDATE tanks SET status = 'livre' WHERE status = 'available'`);

        // Update any other status to 'manutencao' just in case, or leave as is if it matches
        // But for now, just fixing the default 'available'

        console.log("✅ Tank status data updated.");
    } catch (error) {
        console.error("❌ Error updating data:", error);
        process.exit(1);
    }
    process.exit(0);
}

main();
