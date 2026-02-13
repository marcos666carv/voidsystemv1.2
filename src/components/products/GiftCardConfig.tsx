import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import { Gift } from "lucide-react";
import { cn } from "@/lib/utils";

export function GiftCardConfig() {
    const [amount, setAmount] = useState<number>(50);
    const [customAmount, setCustomAmount] = useState("");
    const { addItem, toggleCart } = useCart();

    const PRESET_AMOUNTS = [50, 100, 200, 500];

    const handleAdd = () => {
        const value = customAmount ? parseFloat(customAmount) : amount;
        if (value > 0) {
            addItem({
                cartId: crypto.randomUUID(),
                type: 'gift_card',
                value: value,
                quantity: 1,
                price: value
            });
            toggleCart();
            setCustomAmount("");
        }
    };

    return (
        <div className="p-6 rounded-xl border border-border bg-card space-y-6">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                    <Gift className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold">Give the Void</h3>
                    <p className="text-sm text-muted-foreground">Digital Gift Cards</p>
                </div>
            </div>

            <div className="space-y-3">
                <label className="text-sm font-medium">Select Amount</label>
                <div className="grid grid-cols-4 gap-2">
                    {PRESET_AMOUNTS.map(val => (
                        <button
                            key={val}
                            onClick={() => { setAmount(val); setCustomAmount(""); }}
                            className={cn(
                                "py-2 rounded-md border text-sm font-medium transition-all",
                                amount === val && !customAmount
                                    ? "border-emerald-500 bg-emerald-500/10 text-emerald-500"
                                    : "border-border hover:border-emerald-500/50"
                            )}
                        >
                            ${val}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-3">
                <label className="text-sm font-medium">Or Custom Amount</label>
                <div className="relative">
                    <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                    <Input
                        type="number"
                        placeholder="0.00"
                        className="pl-7"
                        value={customAmount}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomAmount(e.target.value)}
                    />
                </div>
            </div>

            <Button className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={handleAdd}>
                Add Gift Card to Cart
            </Button>
        </div>
    );
}
