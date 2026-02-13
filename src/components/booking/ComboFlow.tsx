import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useCart } from "@/context/CartContext";
import { Calendar, Clock } from "lucide-react";

export function ComboBookingFlow() {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const { addItem, toggleCart } = useCart();

    const [floatSlot, setFloatSlot] = useState<{ date: string, time: string } | null>(null);
    const [massageSlot, setMassageSlot] = useState<{ date: string, time: string } | null>(null);

    const handleBook = () => {
        if (floatSlot && massageSlot) {
            addItem({
                cartId: crypto.randomUUID(),
                type: 'combo',
                title: 'Float & Massage Combo',
                quantity: 1,
                price: 140, // Mock price
                slots: {
                    float: floatSlot,
                    massage: massageSlot
                }
            });
            setIsOpen(false);
            setStep(1);
            setFloatSlot(null);
            setMassageSlot(null);
            toggleCart();
        }
    };

    // Mock slot selection visual
    const SlotSelector = ({ onSelect }: { onSelect: (slot: { date: string, time: string }) => void }) => (
        <div className="grid grid-cols-3 gap-2 mt-4">
            {['10:00', '14:00', '18:00'].map(time => (
                <Button key={time} variant="outline" onClick={() => onSelect({ date: 'Today', time })}>
                    {time}
                </Button>
            ))}
        </div>
    );

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button size="lg" className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700">
                    Book Combo (Float + Massage)
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Book Your Combo Experience</DialogTitle>
                    <DialogDescription>
                        {step === 1 && "Step 1: Select your Float Session"}
                        {step === 2 && "Step 2: Select your Massage Session"}
                        {step === 3 && "Step 3: Confirm Booking"}
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4">
                    {step === 1 && (
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-primary">
                                <Clock className="w-5 h-5" />
                                <span className="font-semibold">60min Float Therapy</span>
                            </div>
                            <p className="text-sm text-muted-foreground">Select a time for your float:</p>
                            <SlotSelector onSelect={(slot) => {
                                setFloatSlot(slot);
                                setStep(2);
                            }} />
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-indigo-500">
                                <Calendar className="w-5 h-5" />
                                <span className="font-semibold">60min Massage</span>
                            </div>
                            <p className="text-sm text-muted-foreground">Select a time for your massage (after your float):</p>
                            <SlotSelector onSelect={(slot) => {
                                setMassageSlot(slot);
                                setStep(3);
                            }} />
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-4 bg-muted/30 p-4 rounded-lg">
                            <div className="flex justify-between items-center border-b border-border pb-2">
                                <span className="text-sm font-medium">Float Session</span>
                                <span className="text-sm">{floatSlot?.time}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-border pb-2">
                                <span className="text-sm font-medium">Massage Session</span>
                                <span className="text-sm">{massageSlot?.time}</span>
                            </div>
                            <div className="flex justify-between items-center font-bold pt-2">
                                <span>Total Price</span>
                                <span>$140.00</span>
                            </div>
                        </div>
                    )}
                </div>

                <DialogFooter>
                    {step === 3 && (
                        <Button onClick={handleBook} className="w-full">Confirm & Add to Cart</Button>
                    )}
                    {step < 3 && (
                        <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
