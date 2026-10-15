// Ortak veri deposu — yalnız giriş yapmış kullanıcıya açık.
// GET  /api/store?ns=…            (Authorization: Bearer <anahtar>) → admin: tüm veri · müşteri: yalnız kendi kaydı, siparişleri, ürünler
// POST /api/store?ns=…  {changes} → admin: her şey · müşteri: yalnız kendi siparişleri ve kendi hesabı
const L = require("./_lib");

// müşteriye dönen görünüm: başka firmaların verisi, şifre özetleri ve iç notlar yok
function customerView(doc, custId) {
  const orders = doc.orders.filter((o) => o.cust === custId);
  const nos = new Set(orders.map((o) => o.no));
  return { rev: doc.rev, updatedAt: doc.updatedAt, orders, customers: doc.customers.filter((c) => c.id === custId), regs: [], products: doc.products,
    logs: Object.fromEntries(Object.entries(doc.logs).filter(([k]) => nos.has(k))), prep: {}, palletCheck: {}, meta: {} };
}
// Panelden eklenen kullanıcı: yetkisine göre görebileceği / yazabileceği veri (yerleşik hesaplar tam yetkili → null)
function scopeOf(su) {
  if (!su) return null;
  const p = su.perms || [], has = (...k) => k.some((x) => p.includes(x));
  return { orders: has("orders", "finance", "dashboard", "notifications", "reports"), customers: has("customers", "orders", "pricing", "finance", "dashboard", "notifications", "reports"),
    products: has("products", "pricing"), stock: has("stock"), meta: has("settings", "reports"), staff: has("users", "customers") };
}
function scopedView(doc, sc) {
  if (!sc) return adminView(doc);
  const v = { rev: doc.rev, updatedAt: doc.updatedAt, products: doc.products, regs: [], orders: [], customers: [], logs: {}, prep: {}, palletCheck: {}, meta: {}, staff: [] };
  if (sc.orders) { v.orders = doc.orders; v.logs = doc.logs; }
  if (sc.customers) v.customers = doc.customers;
  if (sc.meta) v.meta = doc.meta;
  if (sc.staff) { v.staff = (doc.staff || []).map(({ h, ...r }) => r); v.contacts = doc.contacts || {}; }
  return v;
}
const STOCK_FIELDS = ["stock", "stockLog", "critical"];
// yetkiye göre izin verilen değişiklikler
function scopedChanges(doc, ch, sc) {
  if (!sc) return ch;
  const out = {};
  if (sc.orders) { if (ch.orders) out.orders = ch.orders; if (ch.logs) out.logs = ch.logs; if (ch.prep) out.prep = ch.prep; }
  if (sc.customers && ch.customers) out.customers = ch.customers;
  if (sc.meta && ch.meta) out.meta = ch.meta;
  if (ch.products) {
    if (sc.products) out.products = ch.products;
    else if (sc.stock) out.products = ch.products.filter((x) => x && x.sku).map((x) => {   // yalnız stok alanları, ürünün diğer kayıtlı değişiklikleri korunur
      const prev = doc.products.find((y) => y.sku === x.sku) || { sku: x.sku };
      const keep = { ...prev }; STOCK_FIELDS.forEach((f) => { if (f in x) keep[f] = x[f]; }); return keep;
    });
  }
  return out;
}
const adminView = (doc) => ({ ...doc, contacts: doc.contacts || {}, regs: doc.regs.map(({ h, ...r }) => r), staff: (doc.staff || []).map(({ h, ...r }) => r) });   // şifre özetleri admin'e de gitmez

module.exports = async (req, res) => {
  L.cors(res);
  if (req.method === "OPTIONS") return res.status(204).end();
  const who = L.bearer(req);
  if (!who) return res.status(401).json({ error: "auth" });
  const ns = L.nsOf(req), isAdmin = who.role === "admin";
  try {
    let sc = null;
    if (isAdmin && who.sid) {   // panelden eklenen kullanıcı: pasife alındıysa erişim kesilir, veri yetkisine göre
      const d0 = await L.readDoc(ns), su = (d0.staff || []).find((x) => x.id === who.sid);
      if (!su || su.active === false) return res.status(403).json({ error: "inactive" });
      sc = scopeOf(su);
    }
    if (req.method === "GET") {
      const doc = await L.readDoc(ns);
      if (!isAdmin) {
        const c = doc.customers.find((x) => x.id === who.cust);
        if (!c || c.status !== "Active") return res.status(403).json({ error: "inactive" });
        return res.status(200).json(customerView(doc, who.cust));
      }
      return res.status(200).json(scopedView(doc, sc));
    }
    if (req.method !== "POST") return res.status(405).json({ error: "GET / POST" });
    const b = await L.bodyOf(req), ch = b.changes;
    if (!ch || JSON.stringify(ch).length > 2000000) return res.status(400).json({ error: "Geçersiz veri" });
    delete ch.regs; delete ch.staff;   // şifre ve kullanıcı kayıtları yalnız /api/auth ve /api/users üzerinden
    const { doc } = await L.updateDoc(ns, (doc) => {
      if (isAdmin) return L.mergeChanges(doc, scopedChanges(doc, ch, sc));
      // müşteri: yalnız kendi siparişleri (yeni ya da mevcut) ve kendi hesabı; silme yok
      const mine = (o) => o && o.cust === who.cust && !o._deleted && (() => { const ex = doc.orders.find((x) => x.no === o.no); return !ex || ex.cust === who.cust; })();
      const own = { orders: (ch.orders || []).filter(mine), customers: (ch.customers || []).filter((c) => c && c.id === who.cust && !c._deleted).map((c) => ({ ...doc.customers.find((x) => x.id === who.cust), ...c, id: who.cust, status: doc.customers.find((x) => x.id === who.cust)?.status, level: doc.customers.find((x) => x.id === who.cust)?.level })) };
      const okNos = new Set([...own.orders.map((o) => o.no), ...doc.orders.filter((o) => o.cust === who.cust).map((o) => o.no)]);
      own.logs = Object.fromEntries(Object.entries(ch.logs || {}).filter(([k]) => okNos.has(k)));
      L.mergeChanges(doc, own);
    });
    return res.status(200).json(isAdmin ? scopedView(doc, sc) : customerView(doc, who.cust));
  } catch (e) {
    return res.status(502).json({ error: String(e.message || e) });
  }
};
