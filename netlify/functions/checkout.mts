import type { Context, Config } from "@netlify/functions";
import { getDb } from "./lib/db.mjs";
import { jsonOk, jsonError } from "./lib/auth.mjs";
import { orders, appointments, clientCredits, clients, serviceVariants } from "../../src/db/schema.js";
import { eq, sql } from "drizzle-orm";

export default async (req: Request, context: Context) => {
    try {
        const db = getDb();
        const url = new URL(req.url);

        // POST /api/checkout/session
        if (req.method === "POST" && url.pathname.endsWith("/session")) {
            const body = await req.json();
            const { clientId, totalAmount, paymentMethod, checkoutData } = body;

            if (!clientId || totalAmount === undefined) {
                return jsonError("clientId and totalAmount are required", 400);
            }

            const id = crypto.randomUUID();

            await db.insert(orders).values({
                id,
                clientId,
                totalAmount,
                paymentMethod: paymentMethod || "credit_card",
                status: "pending",
                checkoutData: checkoutData || {},
            });

            return jsonOk({ id, message: "Order session created" }, 201);
        }

        // POST /api/checkout/confirm
        if (req.method === "POST" && url.pathname.endsWith("/confirm")) {
            const body = await req.json();
            const { orderId } = body;

            if (!orderId) {
                return jsonError("orderId is required", 400);
            }

            const existingOrder = await db.query.orders.findFirst({
                where: eq(orders.id, orderId),
            });

            if (!existingOrder) {
                return jsonError("Order not found", 404);
            }

            if (existingOrder.status === "paid") {
                return jsonError("Order is already paid", 400);
            }

            const checkoutData = existingOrder.checkoutData as any;
            const flowType = checkoutData?.flowType;
            const variantId = checkoutData?.variantId;
            const serviceId = checkoutData?.serviceId || "default-service-id"; // In a real scenario, map from variant
            const date = checkoutData?.date;
            const time = checkoutData?.time;
            const locationId = checkoutData?.locationId;
            const clientId = existingOrder.clientId;

            // Update order status
            await db.update(orders)
                .set({ status: "paid" })
                .where(eq(orders.id, orderId));

            // Logic to create appointment
            if (date && time && locationId) {
                // Determine startTime and endTime (mocking 1h duration)
                const startDateTime = new Date(`${date}T${time}:00-03:00`);
                const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000);

                await db.insert(appointments).values({
                    id: crypto.randomUUID(),
                    clientId,
                    serviceId,
                    locationId,
                    startTime: startDateTime.toISOString(),
                    endTime: endDateTime.toISOString(),
                    status: "confirmed",
                });
            }

            // Logic to create credits (e.g., for combos or packages)
            if (flowType === "combo") {
                // Combos give +1 credit for the secondary session (e.g., Massage)
                // The primary is scheduled above, the secondary becomes a credit
                await db.insert(clientCredits).values({
                    id: crypto.randomUUID(),
                    clientId,
                    serviceId: "secondary-service-id", // Mapped accordingly
                    amount: 1,
                });
            }

            // For Gift Cards (no immediate schedule)
            if (flowType === "gift") {
                // Here we would typically send the email to the recipient
                // and give them a unique code to claim the credit.
                // For now, we just log or store the credit.
                await db.insert(clientCredits).values({
                    id: crypto.randomUUID(),
                    clientId, // The buyer
                    serviceId,
                    amount: 1,
                });

                // TODO: Send email
            }

            // Update client total spent
            await db.update(clients)
                .set({ totalSpent: sql`${clients.totalSpent} + ${existingOrder.totalAmount}` })
                .where(eq(clients.id, clientId));

            return jsonOk({ success: true, message: "Payment confirmed, items provisioned." });
        }

        return jsonError("Method not allowed or route not found", 404);
    } catch (error: any) {
        console.error("Checkout error:", error);
        return jsonError("Internal server error", 500);
    }
};

export const config: Config = {
    path: "/api/checkout/*",
};
