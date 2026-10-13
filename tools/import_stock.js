// Stok tablosundaki (Google Sheets dışa aktarımı) güncel stokları panel ürünlerine yükler.
// Eşleşme sırası: elle eşleme (isim) → tekil barkod → SKU. Ürünün kayıtlı diğer değişikliklerine dokunmaz.
// Kullanım: node tools/import_stock.js <stock.json> [--dry] [<base-url> <admin-kullanıcı> <şifre> [ns]]
//   STORE_DIR verilirse doğrudan yerel depo dosyasına yazar (test için).
const fs = require("fs"), path = require("path");
const args = process.argv.slice(2), dry = args.includes("--dry"), [file, base, u, p, ns = ""] = args.filter((a) => a !== "--dry");
const src = fs.readFileSync(path.join(__dirname, "..", "catalog.js"), "utf8");
const PRODUCTS = new Function(src + "; return PRODUCTS;")();
const rows = JSON.parse(fs.readFileSync(file, "utf8"));

const norm = (s) => String(s || "").replace(/\s+/g, " ").trim().toUpperCase();
// barkodu tablodakinden farklı olan katalog ürünleri → tablodaki ürün adı
const BY_NAME = {
  "BM-007065": "BARBER EAU DE PARFUME 100 ML BLACKOUT", "BM-007263": "BARBER EAU DE PARFUME 100 ML GAME CHANGER", "BM-007096": "BARBER EAU DE PARFUME 100 ML HANGOVER",
  "BM-007058": "BARBER EAU DE PARFUME 100 ML IMPOSSIBLE", "BM-007072": "BARBER EAU DE PARFUME 100 ML I WANNA THANK ME", "BM-007102": "BARBER EAU DE PARFUME 100 ML NEVER QUIT",
  "BM-007256": "BARBER EAU DE PARFUME 100 ML OBSESSED", "BM-007089": "BARBER EAU DE PARFUME 100 ML OFF THE RECORD", "BM-007034": "BARBER EAU DE PARFUME 100 ML OFFLINE",
  "BM-007041": "BARBER EAU DE PARFUME 100 ML OVERDOSE", "BM-011277": "BARBER 2 PHASE CONDITONER 400 ML KERATIN NO.1", "BM-011284": "BARBER 2 PHASE CONDITONER 400 ML COLLAGEN NO.2",
  "BM-011291": "BARBER 2 PHASE CONDITONER 400 ML ARGAN NO.3", "BM-011307": "BARBER 2 PHASE CONDITONER 400 ML BIOTIN NO.4", "BCS-50-1-S": "BARBER COLOGNE 50 ML NO.1 SPRAY",
  "BBB-07": "BARBER BEARD BRUSH 007", "BNS-B-5511": "BARBER NECK STRIP RED", "BCP-CRM": "BARBER RED MELT CAPE", "BCP-CAG": "BARBER ACID GREEN CAPE",
  "BCP-PDM": "BARBER CAPE PINKY DRIP MILT", "BM-007775": "PUSAT", "BM-000479": "BARBER BAG -BLACK", "MK-B-200-LMN": "MARMARA BEAUTY COLOGNE 200 ML LEMON",
  "MC-200-TBC": "MARMARA BEAUTY COLOGNE 200 ML TOBACCO", "MC-5L-BRB": "MARMARA KOLONYA 5LT BERBER 60 DERECE", "MR-100-PD": "MARMARA REED DIFFUSER 100 ML POWDER DAİSY",
  "NP-50-K13-B": "NOIR PARFUME 50 ML K13 BOX", "NP-50-K14-B": "NOIR PARFUME 50 ML K14 BOX",
};
const byEan = {}; rows.forEach((r) => r.barcode && (byEan[norm(r.barcode)] ||= []).push(r));
const bySku = {}; rows.forEach((r) => r.sku && (bySku[norm(r.sku)] ||= []).push(r));
const one = (a) => (a && a.length === 1 ? a[0] : null);
const map = {}, miss = [];
// önce isim/SKU (barkodlar tabloda bazen başka ürüne yazılmış), sonra başka ürünün almadığı tekil barkod
for (const pr of PRODUCTS) { const r = BY_NAME[pr.sku] ? rows.find((x) => norm(x.name) === norm(BY_NAME[pr.sku])) : one(bySku[norm(pr.sku)]); if (r) map[pr.sku] = r; }
const taken = new Set(Object.values(map));
for (const pr of PRODUCTS) { if (map[pr.sku]) continue; const r = one(byEan[norm(pr.ean)]); if (r && !taken.has(r)) { map[pr.sku] = r; taken.add(r); } else miss.push(pr); }
const used = new Set(Object.values(map));
console.log(`${Object.keys(map).length}/${PRODUCTS.length} ürün eşleşti · tabloda olup katalogda olmayan ${rows.filter((r) => !used.has(r)).length} satır`);
if (miss.length) console.log("Stoğu bulunamayan:", miss.map((x) => x.sku).join(", "));
const twice = Object.entries(map).filter(([, r], i, a) => a.findIndex(([, y]) => y === r) !== i);
if (twice.length) console.log("UYARI aynı satır iki ürüne gitti:", twice.map(([k]) => k).join(", "));

const now = new Date().toISOString();
const patch = (prev, sku) => { const r = map[sku], o = { ...(prev || { sku }) };
  o.stock = Math.max(0, Math.round(+r.stock || 0)); if (r.critical != null && r.critical !== "") o.critical = +r.critical;
  o.stockLog = [[now, o.stock - (prev && prev.stock != null ? prev.stock : 0), "Sayım düzeltmesi", "Stok tablosundan aktarım", "Sistem", o.stock], ...((prev && prev.stockLog) || [])].slice(0, 100);
  return o; };
if (dry) return;

(async () => {
  if (process.env.STORE_DIR) {   // yerel test deposu
    const f = path.join(process.env.STORE_DIR, `store${ns ? "-" + ns : ""}.json`);
    const doc = fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, "utf8")) : { rev: 0, products: [] }; doc.products ||= [];
    for (const sku of Object.keys(map)) { const i = doc.products.findIndex((x) => x.sku === sku), o = patch(doc.products[i], sku); if (i >= 0) doc.products[i] = o; else doc.products.push(o); }
    doc.rev = (doc.rev || 0) + 1; doc.updatedAt = now; fs.writeFileSync(f, JSON.stringify(doc)); return console.log("yerel depoya yazıldı:", f);
  }
  const q = ns ? `?ns=${ns}` : "", j = async (r) => { const t = await r.text(); try { return JSON.parse(t); } catch { throw new Error(r.status + " " + t.slice(0, 200)); } };
  const login = await j(await fetch(`${base}/api/auth${q}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "login", u, p }) }));
  if (!login.token || login.session.role !== "admin") throw new Error("admin girişi başarısız");
  const H = { "Content-Type": "application/json", Authorization: "Bearer " + login.token };
  const doc = await j(await fetch(`${base}/api/store${q}`, { headers: H }));
  const products = Object.keys(map).map((sku) => patch(doc.products.find((x) => x.sku === sku), sku));
  const out = await j(await fetch(`${base}/api/store${q}`, { method: "POST", headers: H, body: JSON.stringify({ changes: { products } }) }));
  console.log(`${products.length} ürünün stoğu yüklendi · rev ${out.rev}`);
})().catch((e) => { console.error("HATA:", e.message); process.exit(1); });
