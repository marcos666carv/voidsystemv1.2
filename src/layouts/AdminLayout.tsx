import { Outlet, NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    Activity,
    Users,
    CreditCard,
    CalendarClock,
    Map,
    LogOut,
    Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";

const ADMIN_NAV = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Mission Control', href: '/admin/mission', icon: Activity },
    { name: 'Schedule', href: '/admin/schedule', icon: CalendarClock },
    { name: 'Clients', href: '/admin/clients', icon: Users },
    { name: 'Communications', href: '/admin/crm', icon: Activity },
    { name: 'Finance', href: '/admin/finance', icon: CreditCard }, // Placeholder
    { name: 'System Map', href: '/admin/system-map', icon: Map },
];

export function AdminLayout() {
    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Admin Sidebar */}
            <aside className="fixed inset-y-0 left-0 w-72 bg-slate-900 border-r border-slate-800 text-slate-300 hidden md:flex flex-col">
                <div className="h-16 flex items-center px-6 border-b border-slate-800">
                    <div className="h-8 w-8 bg-violet-600 rounded-lg flex items-center justify-center mr-3 shadow-lg shadow-violet-900/20">
                        <span className="text-white font-bold">V</span>
                    </div>
                    <span className="font-bold text-white text-lg tracking-tight">Void Admin</span>
                </div>

                <div className="flex-1 px-4 py-6 space-y-8 overflow-y-auto">
                    <div>
                        <h3 className="px-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                            Overview
                        </h3>
                        <nav className="space-y-1">
                            {ADMIN_NAV.map((item) => (
                                <NavLink
                                    key={item.name}
                                    to={item.href}
                                    end={item.href === '/admin'}
                                    className={({ isActive }) => `
                                        flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
                                        ${isActive
                                            ? 'bg-violet-600 text-white shadow-md shadow-violet-900/20'
                                            : 'hover:bg-slate-800 hover:text-white'
                                        }
                                    `}
                                >
                                    <item.icon className="mr-3 h-5 w-5 opacity-70" />
                                    {item.name}
                                </NavLink>
                            ))}
                        </nav>
                    </div>
                </div>

                <div className="p-4 border-t border-slate-800 bg-slate-900/50">
                    <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-slate-800 cursor-pointer transition-colors">
                        <div className="h-9 w-9 rounded-full bg-violet-900/50 flex items-center justify-center border border-violet-500/20">
                            <span className="text-xs font-medium text-violet-200">AD</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">Administrator</p>
                            <p className="text-xs text-slate-500 truncate">admin@void.com</p>
                        </div>
                        <LogOut className="h-4 w-4 text-slate-500 hover:text-white transition-colors" />
                    </div>
                </div>
            </aside>

            {/* Content Area */}
            <div className="flex-1 md:ml-72 flex flex-col min-w-0 overflow-hidden">
                {/* Header */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm z-10">
                    <h1 className="text-lg font-semibold text-slate-800">
                        {/* Dynamic Title could go here */}
                        Admin Portal
                    </h1>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-700">
                            <Bell className="h-5 w-5" />
                        </Button>
                        <div className="h-8 w-px bg-slate-200 mx-2"></div>
                        <Button variant="outline" size="sm" className="hidden sm:flex">
                            View Live Site
                        </Button>
                    </div>
                </header>

                {/* Scrollable Content */}
                <main className="flex-1 overflow-y-auto p-8 bg-slate-50/50">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
