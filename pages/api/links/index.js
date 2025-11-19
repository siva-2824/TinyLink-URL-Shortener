import pool from '../../../lib/db';
import { validateUrl, CODE_RE } from '../../../lib/validate';
export default async function handler(req,res){
  if(req.method==='GET'){
    const { rows } = await pool.query('SELECT code,url,clicks,last_clicked,created_at FROM links ORDER BY created_at DESC');
    return res.status(200).json(rows);
  }
  if(req.method==='POST'){
    const { url, code } = req.body;
    if(!url||!validateUrl(url)) return res.status(400).json({error:'invalid url'});
    const finalCode = code || Math.random().toString(36).slice(2,8);
    if(!CODE_RE.test(finalCode)) return res.status(400).json({error:'invalid code'});
    try{ await pool.query('INSERT INTO links(code,url) VALUES($1,$2)',[finalCode,url]); return res.status(201).json({code:finalCode,url}); }
    catch(e){ if(e.code==='23505') return res.status(409).json({error:'code exists'}); return res.status(500).json({error:'server error'}); }
  }
  res.status(405).end();
}