// Ortak sunucu yardımcıları: depo okuma/yazma (GitHub ya da yerel dosya), imzalı oturum anahtarı, çalışan hesapları.
// "_" ile başlayan dosya Vercel'de fonksiyon olarak yayınlanmaz; yalnız api/*.js tarafından kullanılır.
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const REPO = process.env.REVIZE_REPO || "volkankockan-ovo/marmara-b2b-revizeler";
const LISTS = { orders: "no", customers: "id", regs: "u", products: "sku" };
const MAPS = ["logs", "prep", "palletCheck", "meta"];
const empty = () => ({ rev: 0, updatedAt: null, orders: [], customers: [], regs: [], products: [], staff: [], logs: {}, prep: {}, palletCheck: {}, meta: {} });
// admin paneli sayfa yetkileri (kullanıcı yönetiminde seçilir)
const PERMS = ["dashboard", "notifications", "orders", "customers", "pricing", "products", "stock", "finance", "reports", "users", "settings"];
const sha = (s) => crypto.createHash("sha256").update(s).digest("hex");
const hashPw = (u, p) => sha(String(u).toLowerCase() + ":" + p);

// Yerleşik çalışan hesapları (tam yetki) — şifre yok, yalnız SHA-256(kullanıcı:şifre) özeti. Diğer kullanıcılar depoda (doc.staff).
const STAFF = [
  { u: "admin", h: "f7909ea880b91b92e4feff9b7bd28bd0c7fec8d0d599e8f206d6bf76d6758635", role: "admin", name: "Volkan Koçkan", title: "Super Admin" },
  { u: "ferhat", h: "a3df8603cbc286258c4700f8b53678a4c80e2c1adf5875e377cbadc8619d245b", role: "admin", name: "Ferhat Şahin", title: "İhracat Bölge Müdürü", dash: "sales" },
  { u: "gozde", h: "c157d3340fe24107ff6a915bae74f822c5c0a64edb42ce2f3f50a097eed1a10d", role: "admin", name: "Gözde Yorgun", title: "Export Manager / Final Approver", dash: "approve" },
];
// Demo müşteri hesabı (ABC Distribution) — demo verisinde var, şifresi özetli
const DEMO_CUSTOMERS = [{ u: "abc", h: "3d4d0b6d58b04a1548f25a687aedfdfe91d85e66b677c12d502391e7019c297b", cust: "C-1021" }];

// ——— oturum anahtarı (HMAC imzalı, 14 gün) ———
const SECRET = process.env.AUTH_SECRET || sha("mb-auth:" + (process.env.GITHUB_TOKEN || "local-dev"));
const b64 = (s) => Buffer.from(s).toString("base64url");
function signToken(payload, days = 14) {
  const body = b64(JSON.stringify({ ...payload, exp: Date.now() + days * 864e5 }));
  return body + "." + crypto.createHmac("sha256", SECRET).update(body).digest("base64url");
}
function verifyToken(tok) {
  if (!tok || !tok.includes(".")) return null;
  const [body, sig] = tok.split(".");
  const good = crypto.createHmac("sha256", SECRET).update(body).digest("base64url");
  if (sig.length !== good.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(good))) return null;
  try { const p = JSON.parse(Buffer.from(body, "base64url").toString()); return p.exp > Date.now() ? p : null; } catch { return null; }
}
const bearer = (req) => verifyToken(String(req.headers.authorization || "").replace(/^Bearer\s+/i, ""));

// ——— HTTP ———
function cors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Cache-Control", "no-store");
}
async function bodyOf(req) {
  let b = req.body;
  if (b === undefined) b = await new Promise((ok) => { let s = ""; req.on("data", (c) => (s += c)); req.on("end", () => ok(s)); });
  if (typeof b === "string") { try { b = JSON.parse(b || "{}"); } catch { b = null; } }
  return b || {};
}
const nsOf = (req) => String((req.query && req.query.ns) || new URL(req.url, "http://x").searchParams.get("ns") || "").replace(/[^a-z0-9-]/gi, "").slice(0, 20);

// ——— depo: GitHub (canlı) ya da STORE_DIR (yerel test) ———
function storeIO(ns) {
  const file = `store${ns ? "-" + ns : ""}.json`;
  if (process.env.STORE_DIR) {
    const p = path.join(process.env.STORE_DIR, file);
    return {
      read: async () => (fs.existsSync(p) ? { doc: { ...empty(), ...JSON.parse(fs.readFileSync(p, "utf8")) }, sha: "local" } : { doc: empty(), sha: null }),
      write: async (doc) => { fs.writeFileSync(p, JSON.stringify(doc)); return true; },
    };
  }
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("Sunucuda GITHUB_TOKEN tanımlı değil");
  const url = `https://api.github.com/repos/${REPO}/contents/data/${file}`;
  const H = { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json", "User-Agent": "marmara-store", "Content-Type": "application/json" };
  return {
    read: async () => {
      const r = await fetch(url, { headers: H });
      if (r.status === 404) return { doc: empty(), sha: null };
      if (!r.ok) throw new Error(`GitHub ${r.status}`);
      const j = await r.json();
      return { doc: { ...empty(), ...JSON.parse(Buffer.from(j.content, "base64").toString("utf8")) }, sha: j.sha };
    },
    write: async (doc, sha) => {
      const put = await fetch(url, { method: "PUT", headers: H, body: JSON.stringify({ message: `store: rev ${doc.rev}`, content: Buffer.from(JSON.stringify(doc)).toString("base64"), ...(sha ? { sha } : {}) }) });
      if (put.ok) return true;
      if (put.status === 409 || put.status === 422) return false;   // çakışma → tekrar dene
      throw new Error(`GitHub ${put.status}: ${(await put.text()).slice(0, 150)}`);
    },
  };
}
const readDoc = async (ns) => (await storeIO(ns).read()).doc;
// Değişiklikleri birleştirip yaz (eşzamanlı yazmada tekrar dener). mutate(doc) → değişiklik uygular
async function updateDoc(ns, mutate) {
  const io = storeIO(ns);
  for (let attempt = 0; attempt < 4; attempt++) {
    const { doc, sha } = await io.read();
    const result = mutate(doc);
    doc.rev = (doc.rev || 0) + 1; doc.updatedAt = new Date().toISOString();
    if (await io.write(doc, sha)) return { doc, result };
  }
  throw new Error("Yoğunluk nedeniyle kaydedilemedi, tekrar deneyin");
}
function mergeChanges(doc, ch) {
  for (const [k, key] of Object.entries(LISTS)) {
    for (const item of ch[k] || []) {
      if (!item || !item[key]) continue;
      const i = doc[k].findIndex((x) => x[key] === item[key]);
      if (item._deleted) { if (i >= 0) doc[k].splice(i, 1); }
      else if (i >= 0) doc[k][i] = item; else doc[k].push(item);
    }
  }
  for (const m of MAPS) Object.assign(doc[m], ch[m] || {});
}
const emailKey = (s) => String(s || "").trim().toLowerCase();

const randomPassword = () => { const a = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789"; return Array.from(crypto.randomBytes(12), (b) => a[b % a.length]).join(""); };
module.exports = { PERMS, randomPassword, STAFF, DEMO_CUSTOMERS, hashPw, signToken, verifyToken, bearer, cors, bodyOf, nsOf, readDoc, updateDoc, mergeChanges, emailKey, empty };
