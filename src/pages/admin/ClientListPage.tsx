import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Search, Filter, MoreHorizontal, Mail, Phone } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MOCK_CLIENTS } from "@/lib/mockData";

export function ClientListPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedClient, setSelectedClient] = useState<any | null>(null);

    const filteredClients = MOCK_CLIENTS.filter(c =>
        c.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const getStatusBadge = (client: any) => {
        if (client.churn_risk && client.total_spend < 500) {
            return <Badge variant="destructive" className="bg-red-100 text-red-700 border-red-200 hover:bg-red-200">Lost</Badge>;
        }
        if (client.total_spend > 1500) {
            return <Badge className="bg-violet-100 text-violet-700 hover:bg-violet-200 border-violet-200">VIP</Badge>;
        }
        if (client.churn_risk) {
            return <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">At Risk</Badge>;
        }
        return <Badge variant="secondary" className="bg-slate-100 text-slate-700">Active</Badge>;
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Clients</h1>
                    <p className="text-slate-500 mt-2">Manage customer relationships and history.</p>
                </div>
                <Button>Add Client</Button>
            </div>

            {/* Filters */}
            <div className="flex gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                    <Input
                        placeholder="Search clients..."
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Filter</Button>
            </div>

            {/* Table */}
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-slate-50">
                        <TableRow>
                            <TableHead>Client</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Last Visit</TableHead>
                            <TableHead className="text-right">Total Spent</TableHead>
                            <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredClients.map((client) => (
                            <TableRow key={client.id} className="cursor-pointer hover:bg-slate-50/50" onClick={() => setSelectedClient(client)}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-9 w-9 bg-slate-100 border border-slate-200">
                                            <AvatarFallback className="text-slate-500 bg-slate-100">{client.full_name?.substring(0, 2).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="font-medium text-slate-900">{client.full_name}</div>
                                            <div className="text-xs text-slate-500">{client.email}</div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>{getStatusBadge(client)}</TableCell>
                                <TableCell className="text-slate-600 font-mono text-xs">{client.last_visit ? new Date(client.last_visit).toLocaleDateString() : '-'}</TableCell>
                                <TableCell className="text-right font-medium text-slate-900">${client.total_spend}</TableCell>
                                <TableCell>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Client Detail Drawer */}
            <Sheet open={!!selectedClient} onOpenChange={(open) => !open && setSelectedClient(null)}>
                <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
                    {selectedClient && (
                        <>
                            <SheetHeader className="mb-6">
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-16 w-16 bg-slate-100 border border-slate-200">
                                        <AvatarFallback className="text-xl text-slate-500 bg-slate-100">{selectedClient.full_name?.substring(0, 2).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <SheetTitle className="text-2xl">{selectedClient.full_name}</SheetTitle>
                                        <SheetDescription className="flex items-center gap-2 mt-1">
                                            {getStatusBadge(selectedClient)}
                                            <span className="text-xs text-slate-400">ID: {selectedClient.id}</span>
                                        </SheetDescription>
                                    </div>
                                </div>
                            </SheetHeader>

                            <div className="space-y-8">
                                {/* Contact Info */}
                                <section className="space-y-3">
                                    <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Contact Details</h4>
                                    <div className="grid gap-2 text-sm">
                                        <div className="flex items-center gap-3 text-slate-700">
                                            <Mail className="h-4 w-4 text-slate-400" />
                                            {selectedClient.email}
                                        </div>
                                        <div className="flex items-center gap-3 text-slate-700">
                                            <Phone className="h-4 w-4 text-slate-400" />
                                            {selectedClient.phone}
                                        </div>
                                    </div>
                                </section>

                                {/* Stats */}
                                <section className="grid grid-cols-2 gap-4">
                                    <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                                        <div className="text-xs text-slate-500 mb-1">Lifetime Value</div>
                                        <div className="text-xl font-bold text-slate-900">${selectedClient.total_spend}</div>
                                    </div>
                                    <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                                        <div className="text-xs text-slate-500 mb-1">NPS Score</div>
                                        <div className="text-xl font-bold text-violet-600">{selectedClient.nps_score}/10</div>
                                    </div>
                                </section>

                                {/* Activity Timeline (Mock) */}
                                <section>
                                    <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-4">Recent Activity</h4>
                                    <div className="relative border-l border-slate-200 ml-2 space-y-6 pb-4">
                                        <div className="ml-6 relative">
                                            <div className="absolute -left-[31px] top-1 h-2.5 w-2.5 rounded-full bg-violet-500 ring-4 ring-white"></div>
                                            <p className="text-sm font-medium text-slate-900">Completed 60m Float</p>
                                            <p className="text-xs text-slate-500">February 10, 2024 • 10:00 AM</p>
                                        </div>
                                        <div className="ml-6 relative">
                                            <div className="absolute -left-[31px] top-1 h-2.5 w-2.5 rounded-full bg-slate-300 ring-4 ring-white"></div>
                                            <p className="text-sm font-medium text-slate-900">Purchased 3-Pack</p>
                                            <p className="text-xs text-slate-500">January 15, 2024</p>
                                        </div>
                                    </div>
                                </section>

                                <div className="flex gap-2 pt-4">
                                    <Button className="flex-1">New Booking</Button>
                                    <Button variant="outline" className="flex-1">Send Message</Button>
                                </div>
                            </div>
                        </>
                    )}
                </SheetContent>
            </Sheet>
        </div>
    );
}
