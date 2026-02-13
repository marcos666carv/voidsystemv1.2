import { Outlet, NavLink } from "react-router-dom";
import { LayoutDashboard, Calendar, History, LogOut, User, ShoppingBag } from "lucide-react";
import { CartDrawer } from "@/components/shop/CartDrawer";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";

const NAVIGATION = [
    { name: 'Dashboard', href: '/app', icon: LayoutDashboard },
    { name: 'Store & Booking', href: '/app/store', icon: ShoppingBag },
    { name: 'My Schedule', href: '/app/book', icon: Calendar },
    { name: 'History', href: '/app/history', icon: History },
];

export function AppLayout() {
    const { state, toggleCart } = useCart();
    const cartItemCount = state.items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside className="fixed inset-y-0 left-0 w-64 bg-white border-r border-slate-200 hidden md:flex flex-col z-10">
                <div className="h-16 flex items-center px-6 border-b border-slate-100">
                    <div className="h-8 w-8 bg-violet-600 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white font-bold">V</span>
                    </div>
                    <span className="font-bold text-slate-900 text-lg">Void App</span>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {NAVIGATION.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.href}
                            end={item.href === '/app'}
                            className={({ isActive }) => `
                                flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors
                                ${isActive
                                    ? 'bg-violet-50 text-violet-700'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                }
                            `}
                        >
                            <item.icon className="mr-3 h-5 w-5" />
                            {item.name}
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-50 cursor-pointer">
                        <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center">
                            <User className="h-5 w-5 text-slate-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-900 truncate">Client User</p>
                            <p className="text-xs text-slate-500 truncate">client@void.com</p>
                        </div>
                        <LogOut className="h-4 w-4 text-slate-400" />
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-8 relative">
                {/* Mobile Header / Top Bar (Simplfied) */}
                <div className="absolute top-4 right-8 z-10">
                    <Button variant="outline" size="sm" className="relative" onClick={toggleCart}>
                        <ShoppingBag className="h-5 w-5 mr-2" />
                        Cart
                        {cartItemCount > 0 && (
                            <span className="absolute -top-2 -right-2 h-5 w-5 bg-violet-600 text-white text-xs flex items-center justify-center rounded-full border-2 border-slate-50">
                                {cartItemCount}
                            </span>
                        )}
                    </Button>
                </div>

                <div className="max-w-5xl mx-auto mt-12 md:mt-0">
                    <Outlet />
                </div>
            </main>

            <CartDrawer />
        </div>
    );
}
