import { Outlet } from "react-router-dom";

export function AuthLayout() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4">
            <div className="w-full max-w-md space-y-8">
                <div className="flex flex-col items-center">
                    <div className="h-10 w-10 bg-violet-600 rounded-xl flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-xl">V</span>
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-slate-900">
                        Void System
                    </h2>
                </div>

                <div className="bg-white px-8 py-10 shadow-xl rounded-2xl border border-slate-100">
                    <Outlet />
                </div>

                <p className="text-center text-sm text-slate-500">
                    &copy; 2026 Void Float Center
                </p>
            </div>
        </div>
    );
}
