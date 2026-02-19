import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = Netlify.env.get('NEXT_PUBLIC_SUPABASE_URL') || Netlify.env.get('SUPABASE_URL') || 'https://hnniyxmydcrzjmmbyhsj.supabase.co';
const SUPABASE_SERVICE_KEY = Netlify.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const SUPABASE_ANON_KEY = Netlify.env.get('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY') || Netlify.env.get('SUPABASE_ANON_KEY') || '';

function getSupabaseAdmin() {
    if (SUPABASE_SERVICE_KEY) {
        return createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
            auth: { autoRefreshToken: false, persistSession: false },
        });
    }
    return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        auth: { autoRefreshToken: false, persistSession: false },
    });
}

export { getSupabaseAdmin, SUPABASE_URL, SUPABASE_ANON_KEY };
