// Aktarılmış müşterileri ortak depoya yükler (admin girişiyle). Var olan müşteri kayıtlarına dokunmaz (--update ile günceller).
// Kullanım: node tools/push_customers.js <base-url> <musteriler.json> <admin-kullanıcı> <şifre> [ns] [--update]
const fs = require("fs");
const [base, file, u, p, ns = "", flag] = process.argv.slice(2);
const q = ns && ns !== "--update" ? `?ns=${ns}` : "";
(async () => {
  const j = async (r) => { const t = await r.text(); try { return JSON.parse(t); } catch { throw new Error(r.status + " " + t.slice(0, 200)); } };
  const login = await j(await fetch(`${base}/api/auth${q}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "login", u, p }) }));
  if (!login.token || login.session.role !== "admin") throw new Error("admin girişi başarısız");
  const H = { "Content-Type": "application/json", Authorization: "Bearer " + login.token };
  const doc = await j(await fetch(`${base}/api/store${q}`, { headers: H }));
  const have = new Set(doc.customers.map((c) => c.id));
  const all = JSON.parse(fs.readFileSync(file, "utf8"));
  const send = [ns, flag].includes("--update") ? all : all.filter((c) => !have.has(c.id));
  if (!send.length) return console.log("Yüklenecek yeni müşteri yok (" + all.length + " zaten depoda)");
  const out = await j(await fetch(`${base}/api/store${q}`, { method: "POST", headers: H, body: JSON.stringify({ changes: { customers: send } }) }));
  console.log(`${send.length} müşteri yüklendi · depoda toplam ${out.customers.length} müşteri · rev ${out.rev}`);
})().catch((e) => { console.error("HATA:", e.message); process.exit(1); });
