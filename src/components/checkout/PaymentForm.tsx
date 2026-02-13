'use client';

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CreditCard, QrCode, Lock, CheckCircle2 } from "lucide-react";
import { processPayment } from "@/actions/payments";
import { toast } from "sonner"; // Assuming sonner is installed

interface PaymentFormProps {
    appointmentId: string;
    amount: number; // in cents
    onSuccess: () => void;
}

export function PaymentForm({ appointmentId, amount, onSuccess }: PaymentFormProps) {
    const [loading, setLoading] = useState(false);
    const [pixData, setPixData] = useState<{ qrCode: string, url: string } | null>(null);

    // Form States
    const [cardHolder, setCardHolder] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");

    const handlePayCard = async () => {
        setLoading(true);
        try {
            await processPayment(appointmentId, amount, {
                paymentMethod: 'credit_card',
                cardDetails: {
                    number: cardNumber,
                    holderName: cardHolder,
                    expirationDate: expiry,
                    cvv: cvv
                }
            });
            toast.success("Payment Successful!");
            onSuccess();
        } catch (error) {
            toast.error("Payment Failed. Try again.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handlePayPix = async () => {
        setLoading(true);
        try {
            const res = await processPayment(appointmentId, amount, {
                paymentMethod: 'pix'
            });

            if (res.pixQrCode && res.pixQrCodeUrl) {
                setPixData({ qrCode: res.pixQrCode, url: res.pixQrCodeUrl });
                toast.success("QR Code Generated!");
                // In real app, we would start polling for 'paid' status here
            }
        } catch (error) {
            toast.error("Failed to generate Pix.");
        } finally {
            setLoading(false);
        }
    };

    if (pixData) {
        return (
            <Card className="w-full max-w-md mx-auto text-center animate-in fade-in">
                <CardHeader>
                    <CardTitle className="flex items-center justify-center gap-2">
                        <QrCode className="h-6 w-6 text-primary" />
                        Scan to Pay
                    </CardTitle>
                    <CardDescription>Use your bank app to scan the QR Code</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-4">
                    <div className="border-4 border-white shadow-lg rounded-lg overflow-hidden">
                        <img src={pixData.url} alt="Pix QR Code" className="w-48 h-48 object-cover" />
                    </div>
                    <div className="w-full">
                        <Label className="text-xs text-muted-foreground mb-1 block">Pix Copy & Paste</Label>
                        <div className="flex gap-2">
                            <Input readOnly value={pixData.qrCode} className="text-xs font-mono bg-muted" />
                            <Button size="icon" variant="outline" onClick={() => navigator.clipboard.writeText(pixData.qrCode)}>
                                <CheckCircle2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button variant="ghost" className="w-full" onClick={() => setPixData(null)}>
                        Cancel / Back
                    </Button>
                </CardFooter>
            </Card>
        );
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Secure Checkout</CardTitle>
                <CardDescription>Total: ${(amount / 100).toFixed(2)}</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="card">
                    <TabsList className="grid w-full grid-cols-2 mb-4">
                        <TabsTrigger value="card" className="flex gap-2">
                            <CreditCard className="h-4 w-4" /> Credit Card
                        </TabsTrigger>
                        <TabsTrigger value="pix" className="flex gap-2">
                            <QrCode className="h-4 w-4" /> Pix
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="card" className="space-y-4">
                        <div className="space-y-2">
                            <Label>Card Holder Name</Label>
                            <Input placeholder="MARCOS CARVALHO" value={cardHolder} onChange={e => setCardHolder(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label>Card Number</Label>
                            <div className="relative">
                                <Input placeholder="0000 0000 0000 0000" value={cardNumber} onChange={e => setCardNumber(e.target.value)} />
                                <Lock className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Expiry</Label>
                                <Input placeholder="MM/YY" value={expiry} onChange={e => setExpiry(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>CVV</Label>
                                <Input type="password" placeholder="123" value={cvv} onChange={e => setCvv(e.target.value)} />
                            </div>
                        </div>
                        <Button className="w-full mt-4" onClick={handlePayCard} disabled={loading}>
                            {loading ? "Processing..." : `Pay $${(amount / 100).toFixed(2)}`}
                        </Button>
                    </TabsContent>

                    <TabsContent value="pix">
                        <div className="text-center py-6 space-y-4">
                            <p className="text-sm text-muted-foreground">
                                Generate a dynamic QR Code to pay instantly via Pix. Confirmation is immediate.
                            </p>
                            <Button className="w-full" onClick={handlePayPix} disabled={loading}>
                                Generate QR Code
                            </Button>
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
            <CardFooter className="justify-center">
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Lock className="h-3 w-3" /> Payments processed securely by Pagar.me
                </p>
            </CardFooter>
        </Card>
    );
}
