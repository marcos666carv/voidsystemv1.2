import jwt from 'jsonwebtoken';

const JWT_SECRET = () => Netlify.env.get('JWT_SECRET') || 'void-system-dev-secret-2026';

export interface JwtPayload {
    userId: string;
    email: string;
    role: 'client' | 'admin' | 'staff';
}

export function signToken(payload: JwtPayload): string {
    return jwt.sign(payload, JWT_SECRET(), { expiresIn: '7d' });
}

export function verifyToken(token: string): JwtPayload | null {
    try {
        return jwt.verify(token, JWT_SECRET()) as JwtPayload;
    } catch {
        return null;
    }
}

export function getTokenFromRequest(req: Request): string | null {
    const authHeader = req.headers.get('Authorization');
    if (authHeader?.startsWith('Bearer ')) {
        return authHeader.substring(7);
    }
    const cookie = req.headers.get('Cookie');
    if (cookie) {
        const match = cookie.match(/void_token=([^;]+)/);
        if (match) return match[1];
    }
    return null;
}

export function requireAuth(req: Request): JwtPayload {
    const token = getTokenFromRequest(req);
    if (!token) {
        throw new Error('UNAUTHORIZED');
    }
    const payload = verifyToken(token);
    if (!payload) {
        throw new Error('UNAUTHORIZED');
    }
    return payload;
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
