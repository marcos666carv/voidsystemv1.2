// import { neon } from '@neondatabase/serverless';
// import { drizzle } from 'drizzle-orm/neon-http';

// Safely handle environment variables in both Node.js and Vite environments
// const getConnectionString = () => {
//     // ...
//     return undefined;
// };

// const connectionString = getConnectionString();

// if (!connectionString) {
//     console.warn('DATABASE_URL is missing. Please check your .env file.');
// }

// const sql = connectionString ? neon(connectionString) : null;
// @ts-ignore
// export const db = sql ? drizzle(sql, { schema }) : null;
export const db = null as any; // Stub for client-side demo
