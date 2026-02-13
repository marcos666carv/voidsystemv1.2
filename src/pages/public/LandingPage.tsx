import { ServiceCard } from "@/components/cards/ServiceCard";
import { ProductCard } from "@/components/cards/ProductCard";
import { Button } from "@/components/ui/button";
import { MOCK_PRODUCTS, MOCK_SERVICES } from "@/lib/mockData";
import { ComboBookingFlow } from "@/components/booking/ComboFlow";
import { GiftCardConfig } from "@/components/products/GiftCardConfig";

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
                    {MOCK_SERVICES.map((service) => (
                        <ServiceCard
                            key={service.id}
                            title={service.name}
                            duration={`${service.duration} min`}
                            price={`$${service.price}`}
                            benefitDescription={service.description || "Experience total relaxation."}
                            onSelect={() => console.log("Selected", service.name)}
                        />
                    ))}
                </div>
            </section>

            {/* Special Offers & Gifts */}
            <section className="container px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    {/* Combo Deal */}
                    <div className="p-8 rounded-2xl bg-gradient-to-br from-violet-500/10 to-indigo-500/10 border border-violet-500/20 space-y-6">
                        <div className="space-y-2">
                            <h3 className="text-2xl font-bold">The Ultimate Reset</h3>
                            <p className="text-muted-foreground">Combine a 60min Float with a 60min Massage for the complete restoration experience.</p>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold">$140</span>
                            <span className="text-lg text-muted-foreground line-through">$160</span>
                        </div>
                        <ComboBookingFlow />
                    </div>

                    {/* Gift Cards */}
                    <GiftCardConfig />
                </div>
            </section>

            {/* Products Section */}
            <section className="container px-4 md:px-6 bg-muted/20 py-16 rounded-3xl">
                <h2 className="text-3xl font-bold tracking-tighter mb-12 text-center">Void Essentials</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {MOCK_PRODUCTS.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>
        </div>
    );
}
