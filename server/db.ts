import { Pool, type PoolConfig, type QueryResult } from "pg";

function getPoolConfig(): PoolConfig {
  const connectionString = process.env.DATABASE_URL;
  const sslSetting =
    process.env.PGSSLMODE?.toLowerCase() === "disable"
      ? false
      : { rejectUnauthorized: false };

  if (connectionString) {
    return {
      connectionString,
      ssl: sslSetting,
    };
  }

  const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS } = process.env;

  if (!DB_HOST || !DB_NAME || !DB_USER) {
    throw new Error(
      "Missing database configuration. Provide DATABASE_URL or DB_HOST/DB_NAME/DB_USER.",
    );
  }

  return {
    host: DB_HOST,
    port: DB_PORT ? parseInt(DB_PORT, 10) : 5432,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASS,
    ssl: sslSetting,
  };
}

export const pool = new Pool(getPoolConfig());

export async function initDb(): Promise<void> {
  // Create tables if they do not exist. Simple schema tailored to the UI needs.
  await pool.query(`
    CREATE TABLE IF NOT EXISTS projects (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      logo_url TEXT,
      link TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      event_date DATE,
      location TEXT,
      link TEXT,
      image_url TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS news (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      image_url TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS blogs (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      excerpt TEXT NOT NULL,
      author TEXT NOT NULL,
      image_url TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);
}

export async function query<T = any>(
  text: string,
  params?: any[],
): Promise<QueryResult<T>> {
  return pool.query<T>(text, params);
}
