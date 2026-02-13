import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MOCK_SERVICES, MOCK_PRODUCTS } from "@/lib/mockData";
import { useCart } from "@/context/CartContext";
import { ComboBookingFlow } from "@/components/booking/ComboFlow";
import { ProductCard } from "@/components/cards/ProductCard";

export function StorePage() {
    const { addItem, toggleCart } = useCart();
    // Filter services by category if strictly needed, but for now assuming specific IDs or filtering logic
    const floatServices = MOCK_SERVICES.filter(s => s.category === 'flutuacao');
    const massageServices = MOCK_SERVICES.filter(s => s.category === 'massoterapia'); // Mock data might need update if no massage category

    const handleAddService = (service: any, sessions: number) => {
        addItem({
            cartId: crypto.randomUUID(),
            type: 'service',
            service,
            sessionsCount: sessions,
            quantity: 1,
            price: sessions === 1 ? service.price : (service.price * sessions * 0.9), // 10% discount logic
        });
        toggleCart();
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-24">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Store & Booking</h1>
                <p className="text-slate-500 mt-2">Purchase sessions, packages, and wellness products.</p>
            </div>

            <Tabs defaultValue="float" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-8">
                    <TabsTrigger value="float">Floatation</TabsTrigger>
                    <TabsTrigger value="massage">Massage</TabsTrigger>
                    <TabsTrigger value="combo">Combos</TabsTrigger>
                    <TabsTrigger value="products">Products</TabsTrigger>
                </TabsList>

                {/* FLOATATION TAB */}
                <TabsContent value="float" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {floatServices.map(service => (
                            <Card key={service.id} className="relative overflow-hidden border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <CardTitle className="text-xl">{service.name}</CardTitle>
                                        <Badge variant="secondary">{service.duration} mins</Badge>
                                    </div>
                                    <CardDescription>{service.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {/* Option A: Single Session */}
                                    <div className="flex items-center justify-between p-3 border rounded-lg bg-slate-50">
                                        <div className="text-sm">
                                            <span className="font-semibold block">Single Session</span>
                                            <span className="text-slate-500">Pay as you go</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="font-bold block">${service.price}</span>
                                            <Button size="sm" variant="ghost" className="h-7 px-2 text-violet-600" onClick={() => handleAddService(service, 1)}>Add</Button>
                                        </div>
                                    </div>

                                    {/* Option B: 3-Pack */}
                                    <div className="flex items-center justify-between p-3 border border-violet-200 bg-violet-50/50 rounded-lg relative overflow-hidden">
                                        <div className="absolute top-0 right-0 bg-violet-500 text-white text-[10px] px-2 py-0.5 rounded-bl-lg">
                                            Save 10%
                                        </div>
                                        <div className="text-sm">
                                            <span className="font-semibold block text-violet-900">3-Session Pack</span>
                                            <span className="text-violet-600 text-xs">Commit to wellness</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="font-bold block text-violet-900">${(service.price * 3 * 0.9).toFixed(0)}</span>
                                            <Button size="sm" className="h-7 px-2 bg-violet-600 hover:bg-violet-700" onClick={() => handleAddService(service, 3)}>Add</Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                {/* MASSAGE TAB */}
                <TabsContent value="massage" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {massageServices.map(service => (
                            <Card key={service.id} className="relative overflow-hidden border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <CardTitle className="text-xl">{service.name}</CardTitle>
                                        <Badge variant="secondary">{service.duration} mins</Badge>
                                    </div>
                                    <CardDescription>{service.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between p-3 border rounded-lg bg-slate-50">
                                        <div className="text-sm">
                                            <span className="font-semibold block">Single Session</span>
                                            <span className="text-slate-500">Therapeutic Massage</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="font-bold block">${service.price}</span>
                                            <Button size="sm" variant="ghost" className="h-7 px-2 text-violet-600" onClick={() => handleAddService(service, 1)}>Add</Button>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between p-3 border border-violet-200 bg-violet-50/50 rounded-lg relative overflow-hidden">
                                        <div className="absolute top-0 right-0 bg-violet-500 text-white text-[10px] px-2 py-0.5 rounded-bl-lg">
                                            Save 10%
                                        </div>
                                        <div className="text-sm">
                                            <span className="font-semibold block text-violet-900">3-Session Pack</span>
                                            <span className="text-violet-600 text-xs">Commit to wellness</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="font-bold block text-violet-900">${(service.price * 3 * 0.9).toFixed(0)}</span>
                                            <Button size="sm" className="h-7 px-2 bg-violet-600 hover:bg-violet-700" onClick={() => handleAddService(service, 3)}>Add</Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                {/* COMBO TAB */}
                <TabsContent value="combo">
                    <div className="max-w-2xl mx-auto">
                        <Card className="border-violet-200 shadow-md bg-gradient-to-br from-white to-violet-50/50">
                            <CardHeader className="text-center pb-2">
                                <Badge className="mx-auto mb-4 bg-violet-100 text-violet-700 hover:bg-violet-200 border-0">Best Value</Badge>
                                <CardTitle className="text-3xl text-violet-900">The Ultimate Reset</CardTitle>
                                <CardDescription className="text-lg mt-2">
                                    60min Floatation Therapy + 60min Massage
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6 text-center">
                                <p className="text-slate-600 max-w-md mx-auto">
                                    Restore your body and mind with our signature package.
                                    Float effortlessly for an hour, followed by a therapeutic massage to release deep tension.
                                </p>
                                <div className="flex items-center justify-center gap-4 text-3xl font-bold text-slate-900">
                                    <span>$140</span>
                                    <span className="text-xl text-slate-400 line-through font-normal">$170</span>
                                </div>
                            </CardContent>
                            <CardFooter className="justify-center pb-8">
                                <div className="w-full max-w-sm">
                                    <ComboBookingFlow />
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                </TabsContent>

                {/* PRODUCTS TAB */}
                <TabsContent value="products">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {MOCK_PRODUCTS.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
