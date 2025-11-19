import React from 'react';
export default function LinkTable({ links = [], onDelete = () => {} }){
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead><tr className="text-left text-xs uppercase text-gray-500">
          <th className="px-4 py-2">Code</th>
          <th className="px-4 py-2">Target</th>
          <th className="px-4 py-2">Clicks</th>
          <th className="px-4 py-2">Last Clicked</th>
          <th className="px-4 py-2">Actions</th>
        </tr></thead>
        <tbody>
          {links.map((l) => (
            <tr key={l.code} className="border-t">
              <td className="px-4 py-3 font-mono">{l.code}</td>
              <td className="px-4 py-3 max-w-xl truncate" title={l.url}>{l.url}</td>
              <td className="px-4 py-3">{l.clicks ?? 0}</td>
              <td className="px-4 py-3">{l.last_clicked || '-'}</td>
              <td className="px-4 py-3">
                <button onClick={()=> navigator.clipboard?.writeText(window.location.origin + '/' + l.code)} className="mr-2 text-sm px-3 py-1 rounded border">Copy</button>
                <button onClick={()=> onDelete(l.code)} className="text-sm px-3 py-1 rounded bg-red-50 text-red-700 border">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}