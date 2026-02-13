export function AdminDashboard() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">System Status</h1>
                <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                    <span className="text-sm font-medium text-emerald-500">Operational</span>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-6">
                    <h3 className="font-semibold mb-2">Active Sessions</h3>
                    <div className="text-4xl font-mono">3/4</div>
                    <div className="mt-4 h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
                        <div className="h-full bg-violet-500 w-3/4"></div>
                    </div>
                </div>
                <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-6">
                    <h3 className="font-semibold mb-2">Today's Revenue</h3>
                    <div className="text-4xl font-mono">$1,240</div>
                </div>
                <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-6">
                    <h3 className="font-semibold mb-2">System Load</h3>
                    <div className="text-4xl font-mono">12%</div>
                </div>
            </div>
        </div>
    );
}
