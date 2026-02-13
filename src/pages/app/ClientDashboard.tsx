export function ClientDashboard() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Welcome back, Traveler.</h1>
                <p className="text-muted-foreground">Here is your float statistics and upcoming sessions.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground">Total Floats</p>
                </div>
                <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
                    <div className="text-2xl font-bold">24h</div>
                    <p className="text-xs text-muted-foreground">Time in Void</p>
                </div>
                <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
                    <div className="text-2xl font-bold">Rank 3</div>
                    <p className="text-xs text-muted-foreground">Void Voyager</p>
                </div>
                <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
                    <div className="text-2xl font-bold">Next</div>
                    <p className="text-xs text-muted-foreground">Friday, 14:00</p>
                </div>
            </div>

            <div className="min-h-[400px] rounded-xl border bg-card text-card-foreground shadow p-6 flex items-center justify-center text-muted-foreground">
                Chart Placeholder
            </div>
        </div>
    );
}
