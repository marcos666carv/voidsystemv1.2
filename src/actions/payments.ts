import { db } from "@/db";
import { appointments, clients } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { createTransaction, type TransactionRequest } from "@/services/pagarme";

// 1. Process Payment Integration
export async function processPayment(appointmentId: string, amount: number, paymentDetails: Omit<TransactionRequest, 'amount' | 'metadata'>) {
    // Fetch appointment to get client details if needed (omitted for brevity)

    // Call Service
    const transaction = await createTransaction({
        ...paymentDetails,
        amount,
        metadata: { appointmentId }
    });

    // If Pix, we just return the QR code. Status remains pending.
    // If Card and 'paid', we could auto-confirm, but let's rely on the "Webhook" logic for consistency
    if (transaction.status === 'paid') {
        await handlePagarmeWebhook({
            type: 'transaction.paid',
            data: {
                metadata: { appointmentId },
                amount: transaction.amount
            }
        });
    }

    return transaction;
}

// 2. Webhook Handler Logic
// This function simulates what we would do when Pagar.me sends a POST to /api/webhooks/pagarme
export async function handlePagarmeWebhook(event: any) {
    console.log("Receiving Webhook Event:", event);

    if (event.type === 'transaction.paid') {
        const { appointmentId } = event.data.metadata;
        const amount = event.data.amount; // in cents

        // A. Update Appointment Status
        const [updatedAppt] = await db.update(appointments)
            .set({ status: 'confirmed' })
            .where(eq(appointments.id, appointmentId))
            .returning();

        if (!updatedAppt) {
            console.error("Webhook Error: Appointment not found", appointmentId);
            return { success: false, error: 'Appointment not found' };
        }

        // B. Update Client Total Spend
        // Note: amount is in cents, our DB stores... let's assume cents (integer) for safety
        await db.update(clients)
            .set({
                totalSpent: sql`${clients.totalSpent} + ${amount / 100}`, // Convert cents to dollars/reais if DB is unit-based
                totalSessions: sql`${clients.totalSessions} + 1`
            })
            .where(eq(clients.id, updatedAppt.clientId));

        console.log(`Payment Confirmed for Appt ${appointmentId}. Client Updated.`);
        return { success: true };
    }

    return { success: true, ignored: true };
}
