// api/proxy.js
export default async function handler(req, res) {
  // هنا بنقول لـ Vercel: أي طلب يجيلك، ابعته فوراً لسيرفرك
  const targetUrl = `http://3.70.131.171${req.url.replace('/api/proxy', '')}`;
  
  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: { 'Content-Type': 'application/json' },
      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: "Proxy Error" });
  }
}