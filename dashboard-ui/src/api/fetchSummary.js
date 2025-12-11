// Fetch batch summary from backend output
export async function fetchSummary() {
  const res = await fetch('http://localhost:5000/api/summary');
  return res.json();
}
