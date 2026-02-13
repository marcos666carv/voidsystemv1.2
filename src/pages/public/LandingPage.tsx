import { ServiceCard } from "@/components/cards/ServiceCard";
import { ProductCard } from "@/components/cards/ProductCard";
import { Button } from "@/components/ui/button";

export function LandingPage() {
    return (
        <div className="space-y-24 pb-24">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-16 md:pt-24 lg:pt-32">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                                Experience the Void
                            </h1>
                            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                                Disconnect to Reconnect. Premium Floatation Therapy & Sensory Deprivation.
                            </p>
                        </div>
                        <div className="space-x-4">
                            <Button size="lg" className="rounded-full">Book a Session</Button>
                            <Button variant="outline" size="lg" className="rounded-full">Learn More</Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="container px-4 md:px-6">
                <h2 className="text-3xl font-bold tracking-tighter mb-12 text-center">Our Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <ServiceCard
                        title="Standard Float"
                        duration="60 min"
                        price="$60"
                        benefitDescription="Perfect for first-timers. Experience deep relaxation and stress relief."
                        onSelect={() => console.log("Selected Standard Float")}
                    />
                    <ServiceCard
                        title="Deep Dive"
                        duration="90 min"
                        price="$85"
                        benefitDescription="Extended session for profound meditation and physical recovery."
                        onSelect={() => console.log("Selected Deep Dive")}
                    />
                    <ServiceCard
                        title="Marathon"
                        duration="120 min"
                        price="$110"
                        benefitDescription="The ultimate disconnect. For experienced floaters seeking total reset."
                        onSelect={() => console.log("Selected Marathon")}
                    />
                </div>
            </section>

            {/* Products Section */}
            <section className="container px-4 md:px-6 bg-muted/20 py-16 rounded-3xl">
                <h2 className="text-3xl font-bold tracking-tighter mb-12 text-center">Void Essentials</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <ProductCard
                        title="Void Candle"
                        price="$25"
                        imageUrl="https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=1000"
                        rating={4.8}
                    />
                    <ProductCard
                        title="Magnesium Salts"
                        price="$35"
                        imageUrl="https://images.unsplash.com/photo-1615486511484-92e172cc416d?auto=format&fit=crop&q=80&w=1000"
                        rating={5.0}
                    />
                    <ProductCard
                        title="Calm Tea Blend"
                        price="$18"
                        imageUrl="https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=1000"
                        rating={4.7}
                    />
                    <ProductCard
                        title="Essential Oil"
                        price="$30"
                        imageUrl="https://images.unsplash.com/photo-1608571423902-eed4a5e84e43?auto=format&fit=crop&q=80&w=1000"
                        rating={4.9}
                    />
                </div>
            </section>
        </div>
    );
}
