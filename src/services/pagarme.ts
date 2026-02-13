// src/services/pagarme.ts

export interface TransactionRequest {
    amount: number; // in cents
    paymentMethod: 'credit_card' | 'pix';
    cardDetails?: {
        number: string;
        holderName: string;
        expirationDate: string; // MM/YY
        cvv: string;
    };
    customer?: {
        name: string;
        email: string;
        document: string; // CPF
    };
    metadata: {
        appointmentId: string;
    };
}

export interface TransactionResponse {
    id: string; // Transaction ID
    status: 'paid' | 'pending' | 'failed';
    amount: number;
    pixQrCode?: string;
    pixQrCodeUrl?: string;
}

// MOCK Pagar.me API
export async function createTransaction(data: TransactionRequest): Promise<TransactionResponse> {
    console.log("Creating Pagar.me Transaction:", data);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (data.paymentMethod === 'pix') {
        return {
            id: `tid_${Math.random().toString(36).substr(2, 9)}`,
            status: 'pending',
            amount: data.amount,
            // Mock QR Code (this would return a real EMV string)
            pixQrCode: "00020126580014BR.GOV.BCB.PIX0136123e4567-e89b-12d3-a456-426614174000520400005303986540510.005802BR5913Void Float6008Brasilia62070503***6304E2CA",
            pixQrCodeUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" // Placeholder image
        };
    }

    // Credit Card (Assume success for demo)
    return {
        id: `tid_${Math.random().toString(36).substr(2, 9)}`,
        status: 'paid', // Cards usually capture immediately in simple demos
        amount: data.amount
    };
}
