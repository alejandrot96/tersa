import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from './env';

declare global {
  var postgresClient: ReturnType<typeof postgres> | undefined;
}

let client: ReturnType<typeof postgres> | undefined;

if (process.env.NODE_ENV !== 'production') {
  if (!global.postgresClient) {
    // Disable prefetch as it is not supported for "Transaction" pool mode
    global.postgresClient = postgres(env.AUTH_DATABASE_URL || env.DATABASE_URL, { prepare: false });
  }
  client = global.postgresClient;
} else {
  // Disable prefetch as it is not supported for "Transaction" pool mode
  client = postgres(env.AUTH_DATABASE_URL || env.DATABASE_URL, { prepare: false });
}

export const database = drizzle(client);
