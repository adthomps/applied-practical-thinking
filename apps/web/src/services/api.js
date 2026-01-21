// src/services/api.js
export async function fetchInfo() {
  const res = await fetch('/api/info');
  if (!res.ok) throw new Error('Failed to fetch info');
  return res.json();
}
