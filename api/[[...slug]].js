// api/[[...slug]].js

export default async function handler(req, res) {
  const { slug = [] } = req.query;

  // مثال:
  // /api/auth/login
  // => http://3.70.131.171/auth/login
  const targetUrl = `http://3.70.131.171/${slug.join("/")}`;

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
      },
      body:
        req.method !== "GET"
          ? JSON.stringify(req.body)
          : undefined,
    });

    const text = await response.text();

    res.status(response.status);

    try {
      res.json(JSON.parse(text));
    } catch {
      res.send(text);
    }
  } catch (err) {
    res.status(500).json({
      error: "Proxy Error",
      message: err.message,
    });
  }
}