'use client';

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getClientProfile, updateClientPreferences } from "@/actions/crm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Calendar, Mail, Save } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

export function ClientProfile() {
    const { clientId } = useParams<{ clientId: string }>();
    const navigate = useNavigate();
    const [client, setClient] = useState<any>(null);
    const [prefs, setPrefs] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!clientId) return;
        getClientProfile(clientId).then(data => {
            if (data) {
                setClient(data);
                setPrefs(JSON.stringify(data.preferences || {}, null, 2));
            }
        });
    }, [clientId]);

    const handleSavePrefs = async () => {
        if (!clientId) return;
        setLoading(true);
        try {
            // Try to parse basic JSON, or just save as string in a 'note' field if schema was flexible
            // For now, let's assume it's a JSON blob
            let parsed = {};
            try {
                parsed = JSON.parse(prefs);
            } catch (e) {
                // If not valid JSON, save as { raw: string }
                parsed = { raw: prefs };
            }

            await updateClientPreferences(clientId, parsed);
            toast.success("Preferences updated");
        } catch (e) {
            toast.error("Failed to update");
        } finally {
            setLoading(false);
        }
    };

    if (!client) return <div className="p-8">Loading profile...</div>;

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                        {client.fullName}
                        <Badge variant="outline">{client.role}</Badge>
                        {client.npsScore && client.npsScore >= 9 && <Badge className="bg-yellow-500 hover:bg-yellow-600">VIP</Badge>}
                    </h1>
                    <p className="text-muted-foreground">{client.email} • {client.phone || 'No Phone'}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left: Stats & Prefs */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Overview</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <div className="text-sm text-muted-foreground">Total Spent</div>
                                    <div className="text-xl font-bold font-mono">${client.totalSpent}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-muted-foreground">Sessions</div>
                                    <div className="text-xl font-bold font-mono">{client.totalSessions}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-muted-foreground">Last Visit</div>
                                    <div className="text-sm font-medium">
                                        {client.lastVisit ? format(new Date(client.lastVisit), 'MMM d, yyyy') : 'Never'}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm text-muted-foreground">NPS</div>
                                    <div className="text-xl font-bold">{client.npsScore || '-'}</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Preferences & Notes</CardTitle>
                            <CardDescription>Experience customization</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Textarea
                                className="min-h-[200px] font-mono text-xs"
                                value={prefs}
                                onChange={(e) => setPrefs(e.target.value)}
                                placeholder='{"temperature": "warm", "music": "silence"}'
                            />
                            <Button onClick={handleSavePrefs} disabled={loading} className="w-full">
                                <Save className="h-4 w-4 mr-2" />
                                Save Changes
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Right: Timeline */}
                <div className="md:col-span-2">
                    <Card className="h-full flex flex-col">
                        <CardHeader>
                            <CardTitle>Interaction Timeline</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 p-0">
                            <ScrollArea className="h-[600px] p-6">
                                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:-translate-x-px before:bg-gradient-to-b before:from-transparent before:via-muted-foreground/20 before:to-transparent">
                                    {client.timeline.map((item: any, i: number) => (
                                        <div key={item.id || i} className="relative flex items-start pl-12 group">
                                            {/* Icon */}
                                            <div className="absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-full border bg-background shadow-sm group-hover:border-primary/50 transition-colors">
                                                {item.type === 'appointment' ? (
                                                    <Calendar className="h-5 w-5 text-muted-foreground" />
                                                ) : (
                                                    <Mail className="h-5 w-5 text-blue-500" />
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="flex flex-col space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-semibold">{item.title}</span>
                                                    <span className="text-xs text-muted-foreground">
                                                        {format(new Date(item.date), 'MMM d, h:mm a')}
                                                    </span>
                                                </div>
                                                {item.status && (
                                                    <Badge variant="outline" className="w-fit text-[10px] uppercase">
                                                        {item.status}
                                                    </Badge>
                                                )}
                                                {item.notes && (
                                                    <p className="text-sm text-muted-foreground bg-muted/30 p-2 rounded mt-2">
                                                        {item.notes}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}

                                    {client.timeline.length === 0 && (
                                        <div className="text-center text-muted-foreground pl-12">No interactions yet.</div>
                                    )}
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
