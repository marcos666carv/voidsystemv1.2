import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { CartDrawer } from "@/components/cart/CartDrawer";

export function PublicLayout() {
    return (
        <div className="relative min-h-screen flex flex-col bg-background font-sans antialiased text-foreground">
            <Navbar variant="public" />
            <CartDrawer />
            <main className="flex-1 pt-16">
                <Outlet />
            </main>
            <footer className="border-t border-border bg-muted/30 py-6 text-center text-sm text-muted-foreground">
                © {new Date().getFullYear()} Void System. All rights reserved.
            </footer>
        </div>
    );
}
