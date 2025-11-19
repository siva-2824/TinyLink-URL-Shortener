import useSWR from 'swr';
import Header from '../components/Header';
import LinkTable from '../components/LinkTable';
import { useState } from 'react';
const fetcher = (url) => fetch(url).then(r => r.json());
export default function Dashboard(){
  const { data, error, mutate } = useSWR('/api/links', fetcher);
  const [url, setUrl] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  async function handleCreate(e){
    e.preventDefault(); setLoading(true); setMsg(null);
    const res = await fetch('/api/links',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({url,code})});
    if(res.status===201){ setUrl(''); setCode(''); mutate(); setMsg('Created'); }
    else{ const err=await res.json(); setMsg(err.error); }
    setLoading(false);
  }
  async function handleDelete(code){ await fetch(`/api/links/${code}`,{method:'DELETE'}); mutate(); }
  return (
    <div className="min-h-screen">
      <Header/>
      <main className="max-w-4xl mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
        <form onSubmit={handleCreate} className="mb-6 grid gap-2 grid-cols-1 sm:grid-cols-3">
          <input required value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://example.com" className="col-span-2 p-2 border rounded"/>
          <input value={code} onChange={e=>setCode(e.target.value)} placeholder="custom code (6-8 chars)" className="p-2 border rounded"/>
          <div className="col-span-3">
            <button disabled={loading} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">{loading?'Creating...':'Create'}</button>
            {msg && <span className="ml-3 text-sm">{msg}</span>}
          </div>
        </form>
        {data && <LinkTable links={data} onDelete={handleDelete}/>}
      </main>
    </div>
  );
}