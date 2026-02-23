import type { Product, Service, Profile } from "@/types/database";
import { MOCK_CLIENTS as REAL_MOCK_CLIENTS } from "./realClientsData";

export const MOCK_SERVICES: Service[] = [
    {
        id: "srv-flut",
        name: "Flutuação",
        category: "flutuacao",
        description: "Isolamento sensorial profundo em tanque de flutuação com água e sal de Epsom à temperatura corporal.",
        duration: 60,
        setupCleanupMinutes: 30,
        price: 250,
        active: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: "srv-masso",
        name: "Massoterapia",
        category: "massoterapia",
        description: "Massagem terapêutica para equilíbrio muscular e mental, com técnicas de relaxamento profundo.",
        duration: 60,
        setupCleanupMinutes: 15,
        price: 200,
        active: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: "srv-masso-pq",
        name: "Massoterapia com Pedras Quentes",
        category: "massoterapia",
        description: "Massagem com pedras vulcânicas aquecidas para alívio de tensão profunda e melhora da circulação.",
        duration: 60,
        setupCleanupMinutes: 15,
        price: 250,
        active: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: "srv-combo",
        name: "Flutuação + Massoterapia",
        category: "combo",
        description: "O reset completo. Combine flutuação e massagem para restauração total do corpo e mente.",
        duration: 120,
        setupCleanupMinutes: 30,
        price: 390,
        active: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
];

// ─── Pacotes com desconto progressivo ─────────────────────────

export interface ServicePackage {
    id: string;
    serviceId: string;
    sessionCount: number;
    totalPrice: number;
    pricePerSession: number;
    savingsPercent: number;
}

export const MOCK_PACKAGES: ServicePackage[] = [
    // Flutuação
    { id: "pkg-flut-1", serviceId: "srv-flut", sessionCount: 1, totalPrice: 250, pricePerSession: 250, savingsPercent: 0 },
    { id: "pkg-flut-3", serviceId: "srv-flut", sessionCount: 3, totalPrice: 690, pricePerSession: 230, savingsPercent: 8 },
    { id: "pkg-flut-5", serviceId: "srv-flut", sessionCount: 5, totalPrice: 1075, pricePerSession: 215, savingsPercent: 14 },
    { id: "pkg-flut-10", serviceId: "srv-flut", sessionCount: 10, totalPrice: 2000, pricePerSession: 200, savingsPercent: 20 },

    // Massoterapia
    { id: "pkg-masso-1", serviceId: "srv-masso", sessionCount: 1, totalPrice: 200, pricePerSession: 200, savingsPercent: 0 },
    { id: "pkg-masso-3", serviceId: "srv-masso", sessionCount: 3, totalPrice: 555, pricePerSession: 185, savingsPercent: 8 },
    { id: "pkg-masso-5", serviceId: "srv-masso", sessionCount: 5, totalPrice: 875, pricePerSession: 175, savingsPercent: 13 },
    { id: "pkg-masso-10", serviceId: "srv-masso", sessionCount: 10, totalPrice: 1600, pricePerSession: 160, savingsPercent: 20 },

    // Combo
    { id: "pkg-combo-1", serviceId: "srv-combo", sessionCount: 1, totalPrice: 390, pricePerSession: 390, savingsPercent: 0 },
    { id: "pkg-combo-3", serviceId: "srv-combo", sessionCount: 3, totalPrice: 1080, pricePerSession: 360, savingsPercent: 8 },
];

// ─── Categorias para a home ───────────────────────────────────

export interface ServiceCategory {
    id: string;
    title: string;
    description: string;
    icon: string;
    href: string;
    startingPrice: number;
    color: string;
    titleColor: string;
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
    {
        id: "cat-flut",
        title: "flutuação",
        description: "isolamento sensorial profundo.",
        icon: "waves",
        href: "/checkout?type=float",
        startingPrice: 250,
        color: "#B0D6CF",
        titleColor: "#0E362E",
    },
    {
        id: "cat-masso",
        title: "massoterapia",
        description: "equilíbrio muscular e mental.",
        icon: "hand",
        href: "/checkout?type=massage",
        startingPrice: 200,
        color: "#AB542B",
        titleColor: "#FFC4A9",
    },
    {
        id: "cat-combo",
        title: "combos",
        description: "o reset completo: flutuação + massagem.",
        icon: "sparkles",
        href: "/checkout?type=combo",
        startingPrice: 390,
        color: "#CCB0F0",
        titleColor: "#643D97",
    },
    {
        id: "cat-gift",
        title: "vale presente",
        description: "presenteie com uma experiência única.",
        icon: "gift",
        href: "/checkout?type=gift",
        startingPrice: 200,
        color: "#90EEFF",
        titleColor: "#1F535C",
    },
];

// ─── Produtos físicos (com foto) ──────────────────────────────

export const MOCK_PRODUCTS: Product[] = [
    {
        id: "p1",
        name: "Vela VOID",
        description: "Vela de cera de soja artesanal com fragrância exclusiva.",
        price: 45,
        current_stock: 50,
        image_url: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=600",
        sku: "VL-001",
        active: true
    },
    {
        id: "p2",
        name: "Sabonete Artesanal",
        description: "Sabonete com óleos essenciais e argila.",
        price: 35,
        current_stock: 80,
        image_url: "https://images.unsplash.com/photo-1607006344380-b6775a0824a7?auto=format&fit=crop&q=80&w=600",
        sku: "SB-001",
        active: true
    },
    {
        id: "p3",
        name: "Sais de Magnésio",
        description: "Sais de Epsom premium para banho em casa.",
        price: 55,
        current_stock: 30,
        image_url: "https://images.unsplash.com/photo-1615486511484-92e172cc416d?auto=format&fit=crop&q=80&w=600",
        sku: "SM-001",
        active: true
    },
    {
        id: "p4",
        name: "Kit Celebração",
        description: "Caixa especial com vela, sabonete e sais.",
        price: 120,
        current_stock: 20,
        image_url: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=600",
        sku: "KC-001",
        active: true
    },
    {
        id: "p5",
        name: "Camiseta Void",
        description: "Algodão Pima 100%, toque macio. Estampa minimalista.",
        price: 89,
        current_stock: 100,
        image_url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=600",
        sku: "TS-BLK-M",
        active: true,
        variants: [
            { id: "v1", product_id: "p5", name: "P", type: "size", price: 89, stock: 20, sku: "TS-BLK-P", image_url: null, active: true },
            { id: "v2", product_id: "p5", name: "M", type: "size", price: 89, stock: 50, sku: "TS-BLK-M", image_url: null, active: true },
            { id: "v3", product_id: "p5", name: "G", type: "size", price: 89, stock: 30, sku: "TS-BLK-G", image_url: null, active: true }
        ]
    }
];

// ─── Clientes (Mock com Schema Real do Banco) ───────────────

export const MOCK_CLIENTS: Profile[] = REAL_MOCK_CLIENTS;
