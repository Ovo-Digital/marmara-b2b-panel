// Ortak veri deposu: siparişler, müşteriler, başvurular, loglar, fabrika hazırlığı.
// Özel revize reposunda data/store[-<ns>].json olarak tutulur; değişen kayıtlar anahtarlarına göre birleştirilir.
// GET  /api/store?ns=…           → { rev, orders, customers, regs, logs, prep, palletCheck }
// POST /api/store?ns=…  {changes} → birleştirilmiş güncel belge

const REPO = process.env.REVIZE_REPO || "volkankockan-ovo/marmara-b2b-revizeler";
const LISTS = { orders: "no", customers: "id", regs: "u" };
const MAPS = ["logs", "prep", "palletCheck"];
const empty = () => ({ rev: 0, updatedAt: null, orders: [], customers: [], regs: [], logs: {}, prep: {}, palletCheck: {} });

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Cache-Control", "no-store");
  if (req.method === "OPTIONS") return res.status(204).end();
  const token = process.env.GITHUB_TOKEN;
  if (!token) return res.status(503).json({ error: "Sunucuda GITHUB_TOKEN tanımlı değil" });

  const ns = String(req.query?.ns || "").replace(/[^a-z0-9-]/gi, "").slice(0, 20);
  const path = `data/store${ns ? "-" + ns : ""}.json`;
  const url = `https://api.github.com/repos/${REPO}/contents/${path}`;
  const H = { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json", "User-Agent": "marmara-store", "Content-Type": "application/json" };

  const read = async () => {
    const r = await fetch(url, { headers: H });
    if (r.status === 404) return { doc: empty(), sha: null };
    if (!r.ok) throw new Error(`GitHub ${r.status}`);
    const j = await r.json();
    return { doc: { ...empty(), ...JSON.parse(Buffer.from(j.content, "base64").toString("utf8")) }, sha: j.sha };
  };

  try {
    if (req.method === "GET") return res.status(200).json((await read()).doc);
    if (req.method !== "POST") return res.status(405).json({ error: "GET / POST" });

    let body = req.body;
    if (typeof body === "string") { try { body = JSON.parse(body); } catch { body = null; } }
    const ch = body?.changes;
    if (!ch || JSON.stringify(ch).length > 800000) return res.status(400).json({ error: "Geçersiz veri" });

    // Aynı anda iki yazma olursa (sha çakışması) güncel belgeyi okuyup tekrar birleştir
    for (let attempt = 0; attempt < 4; attempt++) {
      const { doc, sha } = await read();
      for (const [k, key] of Object.entries(LISTS)) {
        for (const item of ch[k] || []) {
          if (!item || !item[key]) continue;
          const i = doc[k].findIndex((x) => x[key] === item[key]);
          if (item._deleted) { if (i >= 0) doc[k].splice(i, 1); }
          else if (i >= 0) doc[k][i] = item; else doc[k].push(item);
        }
      }
      for (const m of MAPS) Object.assign(doc[m], ch[m] || {});
      doc.rev = (doc.rev || 0) + 1;
      doc.updatedAt = new Date().toISOString();
      const put = await fetch(url, { method: "PUT", headers: H, body: JSON.stringify({ message: `store: rev ${doc.rev}`, content: Buffer.from(JSON.stringify(doc)).toString("base64"), ...(sha ? { sha } : {}) }) });
      if (put.ok) return res.status(200).json(doc);
      if (put.status !== 409 && put.status !== 422) throw new Error(`GitHub ${put.status}: ${(await put.text()).slice(0, 150)}`);
    }
    return res.status(409).json({ error: "Yoğunluk nedeniyle kaydedilemedi, tekrar deneyin" });
  } catch (e) {
    return res.status(502).json({ error: String(e.message || e) });
  }
};
