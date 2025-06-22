const baseURL = import.meta.env.VITE_BACKEND_API || 'http://localhost:5000';

export async function fetchMoods() {
  const res = await fetch(`${baseURL}/api/moods`);
  return res.json();
}

export async function fetchGenres() {
  const res = await fetch(`${baseURL}/api/genres`);
  return res.json();
}

export async function fetchTracks({ mood, genre }) {
  const query = new URLSearchParams({ mood, genre }).toString();
  const res = await fetch(`${baseURL}/api/tracks?${query}`);
  return res.json();
}
