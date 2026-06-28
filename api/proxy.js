export default async function handler(req, res) {
  // بنبني الرابط النهائي للسيرفر (السيرفر بتاعك بيبدأ بـ http://3.70.131.171)
  const targetUrl = `http://3.70.131.171${req.url}`;
  
  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: { 
        'Content-Type': 'application/json',
        'Host': '3.70.131.171' // مهم جداً عشان السيرفر يعرف إحنا بنكلم مين
      },
      body: (req.method === 'POST' || req.method === 'PUT') ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: "Proxy Failed", details: error.message });
  }
}