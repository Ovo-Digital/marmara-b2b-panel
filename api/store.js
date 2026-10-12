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
const adminView = (doc) => ({ ...doc, regs: doc.regs.map(({ h, ...r }) => r) });   // şifre özetleri admin'e de gitmez

module.exports = async (req, res) => {
  L.cors(res);
  if (req.method === "OPTIONS") return res.status(204).end();
  const who = L.bearer(req);
  if (!who) return res.status(401).json({ error: "auth" });
  const ns = L.nsOf(req), isAdmin = who.role === "admin";
  try {
    if (req.method === "GET") {
      const doc = await L.readDoc(ns);
      if (!isAdmin) {
        const c = doc.customers.find((x) => x.id === who.cust);
        if (!c || c.status !== "Active") return res.status(403).json({ error: "inactive" });
        return res.status(200).json(customerView(doc, who.cust));
      }
      return res.status(200).json(adminView(doc));
    }
    if (req.method !== "POST") return res.status(405).json({ error: "GET / POST" });
    const b = await L.bodyOf(req), ch = b.changes;
    if (!ch || JSON.stringify(ch).length > 2000000) return res.status(400).json({ error: "Geçersiz veri" });
    delete ch.regs;   // şifre kayıtları yalnız /api/auth üzerinden
    const { doc } = await L.updateDoc(ns, (doc) => {
      if (isAdmin) return L.mergeChanges(doc, ch);
      // müşteri: yalnız kendi siparişleri (yeni ya da mevcut) ve kendi hesabı; silme yok
      const mine = (o) => o && o.cust === who.cust && !o._deleted && (() => { const ex = doc.orders.find((x) => x.no === o.no); return !ex || ex.cust === who.cust; })();
      const own = { orders: (ch.orders || []).filter(mine), customers: (ch.customers || []).filter((c) => c && c.id === who.cust && !c._deleted).map((c) => ({ ...doc.customers.find((x) => x.id === who.cust), ...c, id: who.cust, status: doc.customers.find((x) => x.id === who.cust)?.status, level: doc.customers.find((x) => x.id === who.cust)?.level })) };
      const okNos = new Set([...own.orders.map((o) => o.no), ...doc.orders.filter((o) => o.cust === who.cust).map((o) => o.no)]);
      own.logs = Object.fromEntries(Object.entries(ch.logs || {}).filter(([k]) => okNos.has(k)));
      L.mergeChanges(doc, own);
    });
    return res.status(200).json(isAdmin ? adminView(doc) : customerView(doc, who.cust));
  } catch (e) {
    return res.status(502).json({ error: String(e.message || e) });
  }
};
