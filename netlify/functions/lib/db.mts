import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '../../../src/db/schema.js';

function getDb() {
    const url = Netlify.env.get('NETLIFY_DATABASE_URL') || Netlify.env.get('DATABASE_URL');
    if (!url) {
        throw new Error('Database URL not configured. Set NETLIFY_DATABASE_URL or DATABASE_URL.');
    }
    const sql = neon(url);
    return drizzle(sql, { schema });
}

export { getDb };
