import { getSupabaseAdmin } from './supabase.mjs';

export interface AuthUser {
    userId: string;
    email: string;
    role: 'client' | 'admin' | 'staff';
    fullName?: string;
}

export async function verifySupabaseToken(req: Request): Promise<AuthUser | null> {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) return null;

    const token = authHeader.substring(7);
    const supabase = getSupabaseAdmin();

    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) return null;

    const meta = user.user_metadata || {};

    return {
        userId: user.id,
        email: user.email || '',
        role: meta.role || 'client',
        fullName: meta.full_name,
    };
}

export async function requireAuth(req: Request): Promise<AuthUser> {
    const user = await verifySupabaseToken(req);
    if (!user) {
        throw new Error('UNAUTHORIZED');
    }
    return user;
}

export function jsonError(message: string, status: number) {
    return new Response(JSON.stringify({ error: message }), {
        status,
        headers: { 'Content-Type': 'application/json' },
    });
}

export function jsonOk(data: unknown, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: { 'Content-Type': 'application/json' },
    });
}
