import pkg from 'pg';
const { Pool } = pkg;
const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error('Missing DATABASE_URL');
let pool;
if (global.__pgPool) pool = global.__pgPool;
else { pool = new Pool({ connectionString, max: 10 }); global.__pgPool = pool; }
export default pool;