import { z } from 'zod';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';

import * as schema from './schema';

const connectionString = z
  .string({
    invalid_type_error:
      'POSTGRES_URL is not a valid postgres connection string',
    required_error: 'POSTGRES_URL is required',
  })
  .parse(process.env.POSTGRES_URL);

const pool = postgres(connectionString, { max: 1 });

export const db = drizzle(pool, { schema, logger: true });
