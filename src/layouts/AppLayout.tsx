import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/Navbar";

export function AppLayout() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar variant="app" />
            <div className="pt-16 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                <Outlet />
            </div>
        </div>
    );
}
