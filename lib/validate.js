export const CODE_RE = /^[A-Za-z0-9]{6,8}$/;
export function validateUrl(u){
  try{ const url = new URL(u); return url.protocol === 'http:' || url.protocol === 'https:'; }
  catch(e){ return false; }
}