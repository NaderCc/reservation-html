export default async function handler(req, res) {
  const slug = req.query.slug || [];

  const path = Array.isArray(slug)
    ? slug.join("/")
    : slug;

  const targetUrl = `http://3.70.131.171/${path}`;

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
      },
      body:
        req.method !== "GET" && req.method !== "HEAD"
          ? JSON.stringify(req.body)
          : undefined,
    });

    const text = await response.text();

    res.status(response.status).send(text);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}