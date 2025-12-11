// Fetch rejected articles from backend output
export async function fetchRejected() {
  const res = await fetch('http://localhost:5000/api/rejected');
  return res.json();
}
