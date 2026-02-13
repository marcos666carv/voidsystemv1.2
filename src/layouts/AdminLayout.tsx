import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/Navbar";

export function AdminLayout() {
    return (
        <div className="min-h-screen bg-neutral-950 text-neutral-50 dark">
            <Navbar variant="admin" />
            <main className="pt-16 p-6">
                <div className="border border-dashed border-neutral-800 rounded-lg p-8 min-h-[calc(100vh-8rem)]">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
