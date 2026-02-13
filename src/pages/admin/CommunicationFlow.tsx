'use client';

import { useEffect, useState } from "react";
import { getClientSegments, type ClientSegment } from "@/actions/crm";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Mail, Copy, AlertCircle, Star, UserPlus } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";

export function CommunicationFlow() {
    const [segments, setSegments] = useState<{
        vip: ClientSegment[],
        risk: ClientSegment[],
        new: ClientSegment[],
        all: ClientSegment[]
    }>({ vip: [], risk: [], new: [], all: [] });

    useEffect(() => {
        getClientSegments().then(setSegments);
    }, []);

    const templates = [
        {
            id: 'confirmation',
            name: 'Booking Confirmation',
            subject: 'Void Float - Booking Confirmed',
            body: "Hi [Name],\n\nYour float session is confirmed for [Date] at [Time].\n\nPlease arrive 10 minutes early. We look forward to seeing you!\n\n- The Void Team"
        },
        {
            id: 'reminder',
            name: 'Pre-Session Reminder',
            subject: 'Preparing for your Float',
            body: "Hi [Name],\n\nExcited for your float tomorrow? A few tips:\n- Avoid caffeine 2h before\n- Don't shave today (salt stings!)\n- Earplugs provided.\n\nSee you soon!"
        },
        {
            id: 'survey',
            name: 'Post-Session Survey',
            subject: 'How was your journey?',
            body: "Hi [Name],\n\nWe hope you enjoyed your session. on a scale of 0-10, how likely are you to recommend us?\n\n[Link to Survey]\n\nRelease into the void."
        }
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Communication Flow</h1>
                <p className="text-muted-foreground">Lifecycle Management & Automation</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* --- LEFT COL: SEGMENTS --- */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Client Lifecycle</CardTitle>
                            <CardDescription>Attention required by segment</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="risk">
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="risk" className="flex gap-2">
                                        <AlertCircle className="h-4 w-4 text-destructive" />
                                        At Risk ({segments.risk.length})
                                    </TabsTrigger>
                                    <TabsTrigger value="vip" className="flex gap-2">
                                        <Star className="h-4 w-4 text-yellow-500" />
                                        VIPs ({segments.vip.length})
                                    </TabsTrigger>
                                    <TabsTrigger value="new" className="flex gap-2">
                                        <UserPlus className="h-4 w-4 text-blue-500" />
                                        New ({segments.new.length})
                                    </TabsTrigger>
                                </TabsList>
                                <div className="mt-4">
                                    <TabListContent data={segments.risk} type="risk" />
                                    <TabListContent data={segments.vip} type="vip" />
                                    <TabListContent data={segments.new} type="new" />
                                </div>
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>

                {/* --- RIGHT COL: TEMPLATES --- */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Message Templates</CardTitle>
                            <CardDescription>Automated Triggers</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {templates.map(tpl => (
                                <div key={tpl.id} className="border rounded-lg p-4 space-y-2">
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-semibold text-sm">{tpl.name}</h4>
                                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => navigator.clipboard.writeText(tpl.body)}>
                                            <Copy className="h-3 w-3" />
                                        </Button>
                                    </div>
                                    <div className="text-xs text-muted-foreground bg-muted p-2 rounded whitespace-pre-wrap">
                                        {tpl.body}
                                    </div>
                                    <Button variant="outline" size="sm" className="w-full text-xs">
                                        <Mail className="h-3 w-3 mr-2" /> Test Send
                                    </Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

function TabListContent({ data, type }: { data: ClientSegment[], type: string }) {
    const navigate = useNavigate();
    return (
        <TabsContent value={type}>
            <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-2">
                    {data.length === 0 && <div className="text-center text-muted-foreground py-8">No clients in this segment.</div>}
                    {data.map(client => (
                        <div key={client.id} className="flex items-center justify-between p-3 border rounded-lg bg-card hover:bg-accent/50 transition-colors">
                            <div>
                                <div className="font-medium">{client.fullName}</div>
                                <div className="text-xs text-muted-foreground">{client.email}</div>
                                <div className="text-[10px] text-muted-foreground mt-1">
                                    Last visited: {client.lastVisit ? formatDistanceToNow(new Date(client.lastVisit)) + ' ago' : 'Never'}
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                {client.npsScore && client.npsScore >= 9 && <Badge variant="secondary" className="text-[10px]">NPS {client.npsScore}</Badge>}
                                <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => navigate(`/admin/clients/${client.id}`)}>
                                    View Profile
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </TabsContent>
    );
}
