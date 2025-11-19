// pages/api/links/[code].js
import pool from '../../../lib/db';

export default async function handler(req, res) {
  const { code } = req.query;

  if (req.method === 'GET') {
    const { rows } = await pool.query(
      'SELECT code,url,clicks,last_clicked,created_at FROM links WHERE code=$1',
      [code]
    );
    if (!rows.length) return res.status(404).json({ error: 'not found' });
    return res.status(200).json(rows[0]);
  }

  if (req.method === 'DELETE') {
    const r = await pool.query('DELETE FROM links WHERE code=$1', [code]);
    return r.rowCount ? res.status(204).end() : res.status(404).json({ error: 'not found' });
  }

  res.setHeader('Allow', 'GET,DELETE');
  res.status(405).end();
}
