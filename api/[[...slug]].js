// api/[[...slug]].js
export default async function handler(req, res) {
  // بنبني الرابط الأصلي للسيرفر
  // slug عبارة عن مصفوفة فيها أجزاء المسار، بنرجع نجمعهم
  const path = req.url.replace('/api/', ''); 
  const targetUrl = `http://3.70.131.171/${path}`;
  
  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: { 
        'Content-Type': 'application/json',
      },
      body: (req.method !== 'GET') ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: "Proxy Error", details: error.message });
  }
}