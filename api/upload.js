// Revize görselini özel revize reposuna uploads/ altına yükler, issue'da kullanılacak linki döner.
// Token izni: Contents Read & write (aynı repo)

const REPO = process.env.REVIZE_REPO || "volkankockan-ovo/marmara-b2b-revizeler";

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ error: "Sadece POST" });
  const token = process.env.GITHUB_TOKEN;
  if (!token) return res.status(503).json({ error: "Sunucuda GITHUB_TOKEN tanımlı değil" });

  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch { body = null; } }
  const m = /^data:image\/(jpeg|png|webp);base64,([A-Za-z0-9+/=]+)$/.exec(body?.data || "");
  if (!m) return res.status(400).json({ error: "Geçersiz görsel" });
  if (m[2].length > 3_000_000) return res.status(413).json({ error: "Görsel çok büyük" });

  const ext = m[1] === "jpeg" ? "jpg" : m[1];
  const day = new Date().toISOString().slice(0, 10);
  const path = `uploads/${day}/${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}.${ext}`;
  const r = await fetch(`https://api.github.com/repos/${REPO}/contents/${path}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json", "User-Agent": "marmara-revize", "Content-Type": "application/json" },
    body: JSON.stringify({ message: "Revize görseli", content: m[2] }),
  });
  if (!r.ok) return res.status(502).json({ error: `GitHub ${r.status}: ${(await r.text()).slice(0, 200)}` });
  return res.status(200).json({ ok: true, path, url: `https://github.com/${REPO}/raw/main/${path}` });
};
