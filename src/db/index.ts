import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// Safely handle environment variables in both Node.js and Vite environments
const getConnectionString = () => {
    if (typeof process !== 'undefined' && process.env?.DATABASE_URL) {
        return process.env.DATABASE_URL;
    }
    // @ts-ignore - import.meta.env is Vite specific
    if (import.meta.env?.VITE_DATABASE_URL) {
        // @ts-ignore
        return import.meta.env.VITE_DATABASE_URL;
    }
    return undefined;
};

const connectionString = getConnectionString();

if (!connectionString) {
    console.warn('DATABASE_URL is missing. Please check your .env file.');
}

const sql = neon(connectionString);
export const db = drizzle(sql, { schema });
