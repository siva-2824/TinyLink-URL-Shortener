import pool from '../lib/db';
export async function getServerSideProps({ params, res }){
  const { code } = params;
  const client = await pool.connect();
  try{
    await client.query('BEGIN');
    const { rows } = await client.query('SELECT url FROM links WHERE code=$1 FOR UPDATE',[code]);
    if(!rows.length){ await client.query('ROLLBACK'); return { notFound:true }; }
    const url = rows[0].url;
    await client.query('UPDATE links SET clicks=clicks+1,last_clicked=now() WHERE code=$1',[code]);
    await client.query('COMMIT');
    res.writeHead(302,{Location:url}); res.end();
    return { props:{} };
  }catch(e){ await client.query('ROLLBACK'); return {notFound:true}; }
  finally{ client.release(); }
}
export default function Page(){ return null; }