import type { Product, Service } from "@/types/database";

// Mock Services
export const MOCK_SERVICES: Service[] = [
    {
        id: "s1",
        name: "Standard Float",
        category: "flutuacao",
        description: "Perfect for first-timers. Experience deep relaxation and stress relief.",
        duration_minutes: 60,
        setup_cleanup_minutes: 15,
        base_price: 60,
        active: true
    },
    {
        id: "s2",
        name: "Deep Dive",
        category: "flutuacao",
        description: "Extended session for profound meditation and physical recovery.",
        duration_minutes: 90,
        setup_cleanup_minutes: 15,
        base_price: 85,
        active: true
    },
    {
        id: "s3",
        name: "Marathon",
        category: "flutuacao",
        description: "The ultimate disconnect. For experienced floaters seeking total reset.",
        duration_minutes: 120,
        setup_cleanup_minutes: 15,
        base_price: 110,
        active: true
    }
];

// Mock Products
export const MOCK_PRODUCTS: Product[] = [
    {
        id: "p1",
        name: "Void Candle",
        description: "Scented soy wax candle.",
        price: 25,
        current_stock: 50,
        image_url: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=1000",
        sku: "CK-001",
        active: true
    },
    {
        id: "p2",
        name: "Magnesium Salts",
        description: "Premium epsom salts for bath.",
        price: 35,
        current_stock: 30,
        image_url: "https://images.unsplash.com/photo-1615486511484-92e172cc416d?auto=format&fit=crop&q=80&w=1000",
        sku: "MS-001",
        active: true
    },
    {
        id: "p3",
        name: "Calm Tea Blend",
        description: "Herbal tea for relaxation.",
        price: 18,
        current_stock: 100,
        image_url: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=1000",
        sku: "CT-001",
        active: true
    },
    {
        id: "p4",
        name: "Essential Oil",
        description: "Lavender and Bergamot blend.",
        price: 30,
        current_stock: 40,
        image_url: "https://images.unsplash.com/photo-1608571423902-eed4a5e84e43?auto=format&fit=crop&q=80&w=1000",
        sku: "EO-001",
        active: true
    }
];
