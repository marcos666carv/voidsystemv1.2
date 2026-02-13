import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function SystemMap() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">System Architecture</h1>
                <p className="text-slate-500 mt-2">Visual documentation of the Void System structure.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* 1. Database Map */}
                <Card className="rounded-xl shadow-sm border-slate-200">
                    <CardHeader>
                        <CardTitle className="text-violet-700">Database Schema (Nexus)</CardTitle>
                        <CardDescription>Core Postgres Tables & Relationships</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {/* Profiles */}
                            <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-mono font-bold text-sm text-slate-800">clients</h4>
                                    <Badge variant="outline" className="text-[10px] bg-white">Core</Badge>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-xs font-mono text-slate-600 flex justify-between"><span>id</span> <span className="text-slate-400">PK</span></div>
                                    <div className="text-xs font-mono text-slate-600 flex justify-between"><span>email</span> <span className="text-slate-400">Unique</span></div>
                                    <div className="text-xs font-mono text-slate-600 flex justify-between"><span>total_spent</span> <span className="text-violet-500">Metric</span></div>
                                    <div className="text-xs font-mono text-slate-600 flex justify-between"><span>nps_score</span> <span className="text-violet-500">Metric</span></div>
                                </div>
                            </div>

                            {/* Services Relationship */}
                            <div className="flex justify-center -my-2">
                                <div className="h-6 w-px bg-slate-300"></div>
                            </div>

                            {/* Appointments */}
                            <div className="border border-slate-200 rounded-lg p-4 bg-slate-50 relative">
                                <div className="absolute -top-3 left-1/2 -ml-3 bg-white border border-slate-200 rounded-full p-1">
                                    <div className="h-4 w-px bg-slate-300 mx-auto"></div>
                                </div>
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-mono font-bold text-sm text-slate-800">appointments</h4>
                                    <Badge variant="outline" className="text-[10px] bg-white">Transactional</Badge>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-xs font-mono text-slate-600 flex justify-between"><span>client_id</span> <span className="text-blue-500">FK -&gt; clients</span></div>
                                    <div className="text-xs font-mono text-slate-600 flex justify-between"><span>tank_id</span> <span className="text-blue-500">FK -&gt; tanks</span></div>
                                    <div className="text-xs font-mono text-slate-600 flex justify-between"><span>status</span> <span className="text-orange-500">Enum</span></div>
                                </div>
                            </div>

                            {/* Services Relationship */}
                            <div className="flex justify-center -my-2">
                                <div className="h-6 w-px bg-slate-300"></div>
                            </div>

                            {/* Tanks */}
                            <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-mono font-bold text-sm text-slate-800">tanks</h4>
                                    <Badge variant="outline" className="text-[10px] bg-white">Asset</Badge>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-xs font-mono text-slate-600 flex justify-between"><span>status</span> <span className="text-orange-500">Enum</span></div>
                                    <div className="text-xs font-mono text-slate-600 flex justify-between"><span>temp</span> <span className="text-violet-500">Telemetry</span></div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-8">
                    {/* 2. Business Flow */}
                    <Card className="rounded-xl shadow-sm border-slate-200">
                        <CardHeader>
                            <CardTitle className="text-violet-700">Business Flow: Combo</CardTitle>
                            <CardDescription>Floatation (60m) + Massage (60m)</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center space-x-2 text-sm text-slate-600 bg-slate-50 p-4 rounded-lg">
                                <div className="h-8 w-8 rounded-full bg-violet-100 flex items-center justify-center text-violet-700 font-bold">1</div>
                                <span>Client selects "Mega Sesh"</span>
                            </div>
                            <div className="ml-4 h-4 w-px bg-slate-300 my-1"></div>
                            <div className="flex items-center space-x-2 text-sm text-slate-600 bg-slate-50 p-4 rounded-lg">
                                <div className="h-8 w-8 rounded-full bg-violet-100 flex items-center justify-center text-violet-700 font-bold">2</div>
                                <span>System checks 2 consecutive slots (Tank + Room)</span>
                            </div>
                            <div className="ml-4 h-4 w-px bg-slate-300 my-1"></div>
                            <div className="flex items-center space-x-2 text-sm text-slate-600 bg-slate-50 p-4 rounded-lg border-l-4 border-l-violet-500 shadow-sm bg-white">
                                <div className="h-8 w-8 rounded-full bg-violet-600 flex items-center justify-center text-white font-bold">3</div>
                                <span className="font-medium text-slate-900">Blocks 2.5h (Includes transition buffer)</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* 3. Design Tokens */}
                    <Card className="rounded-xl shadow-sm border-slate-200">
                        <CardHeader>
                            <CardTitle className="text-violet-700">Design Tokens (Untitled UI)</CardTitle>
                            <CardDescription>Strict Palette: Slate & Violet</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <h5 className="text-xs font-semibold text-slate-500 uppercase mb-2">Primary (Violet)</h5>
                                    <div className="grid grid-cols-5 gap-2">
                                        <div className="h-8 rounded bg-violet-50"></div>
                                        <div className="h-8 rounded bg-violet-200"></div>
                                        <div className="h-8 rounded bg-violet-500"></div>
                                        <div className="h-8 rounded bg-violet-700"></div>
                                        <div className="h-8 rounded bg-violet-900"></div>
                                    </div>
                                </div>
                                <div>
                                    <h5 className="text-xs font-semibold text-slate-500 uppercase mb-2">Neutrals (Slate)</h5>
                                    <div className="grid grid-cols-5 gap-2">
                                        <div className="h-8 rounded bg-slate-50 border border-slate-100"></div>
                                        <div className="h-8 rounded bg-slate-200"></div>
                                        <div className="h-8 rounded bg-slate-400"></div>
                                        <div className="h-8 rounded bg-slate-600"></div>
                                        <div className="h-8 rounded bg-slate-900"></div>
                                    </div>
                                </div>
                                <div>
                                    <h5 className="text-xs font-semibold text-slate-500 uppercase mb-2">Radii</h5>
                                    <div className="flex gap-4 items-center">
                                        <div className="w-12 h-12 bg-slate-100 border border-slate-300 rounded-lg flex items-center justify-center text-[10px] text-slate-500">md/lg</div>
                                        <div className="w-16 h-16 bg-slate-100 border border-slate-300 rounded-xl flex items-center justify-center text-[10px] text-slate-500">xl (Cards)</div>
                                        <div className="w-16 h-16 bg-slate-100 border border-slate-300 rounded-2xl flex items-center justify-center text-[10px] text-slate-500">2xl</div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
