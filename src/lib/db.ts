import * as pg from 'pg';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('pg-parse-float')(pg); // auto apply parseFloat for decimal and numeric

import { Pool } from 'pg';
import { Kysely, PostgresDialect, Transaction } from 'kysely';

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

export type DB = Kysely<Database>;
export type TRX = Transaction<Database>;

const db = new Kysely<Database>({
  dialect: new PostgresDialect({ pool }),
});

export default db;
