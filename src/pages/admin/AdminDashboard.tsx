import { TransactionSimulator } from "@/components/admin/TransactionSimulator";

export function AdminDashboard() {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-6 bg-card rounded-xl border shadow-sm">
                    <h3 className="font-semibold text-lg">Quick Stats</h3>
                    <p className="text-muted-foreground">Active Sessions: 3</p>
                </div>

                <TransactionSimulator />
            </div>
        </div>
    );
}
