import { Pool, QueryResultRow } from 'pg';

const globalForPostgres = globalThis as typeof globalThis & {
  postgresPool?: Pool;
};

function createPool() {
  if (!process.env.POSTGRES_URL) {
    throw new Error('POSTGRES_URL is required');
  }

  const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    max: 5,
    connectionTimeoutMillis: 5_000,
    idleTimeoutMillis: 30_000,
  });
  pool.on('error', (error) =>
    console.error('Unexpected PostgreSQL pool error', error),
  );
  return pool;
}

const pool = globalForPostgres.postgresPool ?? createPool();
if (process.env.NODE_ENV !== 'production') {
  globalForPostgres.postgresPool = pool;
}

export function sql<Row extends QueryResultRow = QueryResultRow>(
  strings: TemplateStringsArray,
  ...values: unknown[]
) {
  const text = strings.reduce(
    (query, part, index) =>
      `${query}${part}${index < values.length ? `$${index + 1}` : ''}`,
    '',
  );

  return pool.query<Row>(text, values);
}
