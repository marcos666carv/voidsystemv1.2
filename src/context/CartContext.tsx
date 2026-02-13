import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { Product, Service } from '@/types/database';

// --- Types ---

export type CartItemType = 'product' | 'service' | 'combo' | 'gift_card';

export interface BaseCartItem {
    cartId: string; // unique ID for cart instance
    type: CartItemType;
    quantity: number;
    price: number; // Unit price at time of adding
}

export interface ProductCartItem extends BaseCartItem {
    type: 'product';
    product: Product;
}

export interface ServiceCartItem extends BaseCartItem {
    type: 'service';
    service: Service;
    packageId?: string; // If part of a pre-defined package
    sessionsCount: number; // 1, 3, 5, 10
}

export interface ComboCartItem extends BaseCartItem {
    type: 'combo';
    title: string;
    slots: {
        float: { date: string; time: string }; // Simplified for now
        massage: { date: string; time: string };
    };
}

export interface GiftCardCartItem extends BaseCartItem {
    type: 'gift_card';
    recipientEmail?: string;
    message?: string;
    value: number; // Custom value
}

export type CartItem = ProductCartItem | ServiceCartItem | ComboCartItem | GiftCardCartItem;

interface CartState {
    items: CartItem[];
    isOpen: boolean;
}

type CartAction =
    | { type: 'ADD_ITEM'; payload: CartItem }
    | { type: 'REMOVE_ITEM'; payload: string } // cartId
    | { type: 'UPDATE_QUANTITY'; payload: { cartId: string; quantity: number } }
    | { type: 'TOGGLE_CART' }
    | { type: 'CLEAR_CART' }
    | { type: 'LOAD_CART'; payload: CartItem[] };

// --- Reducer ---

const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case 'ADD_ITEM':
            return { ...state, items: [...state.items, action.payload], isOpen: true };
        case 'REMOVE_ITEM':
            return { ...state, items: state.items.filter((i) => i.cartId !== action.payload) };
        case 'UPDATE_QUANTITY':
            return {
                ...state,
                items: state.items.map((item) =>
                    item.cartId === action.payload.cartId
                        ? { ...item, quantity: Math.max(1, action.payload.quantity) }
                        : item
                ),
            };
        case 'TOGGLE_CART':
            return { ...state, isOpen: !state.isOpen };
        case 'CLEAR_CART':
            return { ...state, items: [] };
        case 'LOAD_CART':
            return { ...state, items: action.payload };
        default:
            return state;
    }
};

// --- Context ---

interface CartContextType {
    state: CartState;
    addItem: (item: CartItem) => void;
    removeItem: (cartId: string) => void;
    updateQuantity: (cartId: string, quantity: number) => void;
    toggleCart: () => void;
    clearCart: () => void;
    subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false });

    // Load from LocalStorage
    useEffect(() => {
        const savedCart = localStorage.getItem('void_cart');
        if (savedCart) {
            try {
                dispatch({ type: 'LOAD_CART', payload: JSON.parse(savedCart) });
            } catch (e) {
                console.error("Failed to load cart", e);
            }
        }
    }, []);

    // Save to LocalStorage
    useEffect(() => {
        localStorage.setItem('void_cart', JSON.stringify(state.items));
    }, [state.items]);

    const addItem = (item: CartItem) => dispatch({ type: 'ADD_ITEM', payload: item });
    const removeItem = (cartId: string) => dispatch({ type: 'REMOVE_ITEM', payload: cartId });
    const updateQuantity = (cartId: string, quantity: number) =>
        dispatch({ type: 'UPDATE_QUANTITY', payload: { cartId, quantity } });
    const toggleCart = () => dispatch({ type: 'TOGGLE_CART' });
    const clearCart = () => dispatch({ type: 'CLEAR_CART' });

    const subtotal = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <CartContext.Provider
            value={{ state, addItem, removeItem, updateQuantity, toggleCart, clearCart, subtotal }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
