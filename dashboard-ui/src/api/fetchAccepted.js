// Fetch accepted articles from backend output
export async function fetchAccepted() {
  const res = await fetch('http://localhost:5000/api/accepted');
  return res.json();
}
