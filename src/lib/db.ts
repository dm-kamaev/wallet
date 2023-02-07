import * as pg from 'pg';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('pg-parse-float')(pg); // ???

import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';

interface Accounts {
  account_id: string;
  balance: number;
}

// Keys of this interface are table names.
interface Database {
  accounts: Accounts;
}

const pool = new Pool({
  host: 'pg',
  database: 'wallet',
  user: 'wallet',
  password: 'example',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
// console.log(pool);
// // const result = await pool.query('SELECT $1::text as name', ['brianc']);
// // const result = await pool.query('select version()');
// const result = await pool.query('select * from accounts');
// console.log(result);

const db = new Kysely<Database>({
  dialect: new PostgresDialect({ pool }),
});
export default db;
