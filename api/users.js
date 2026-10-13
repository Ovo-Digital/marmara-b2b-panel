// Admin paneli kullanıcı yönetimi — yalnız “users” yetkisi olan kullanıcı.
// GET  /api/users?ns=…                       → { users: [...] } (şifre özetleri yok)
// POST /api/users?ns=…  { action, ... }
//   create        { user: { first, last, email, title, perms }, password? } → { user, password }  (şifre verilmezse üretilir, bir kez gösterilir)
//   update        { id, user: { first, last, title, perms } }
//   setActive     { id, active }
//   resetPassword { id, password? }                                       → { password }
const L = require("./_lib");
const clean = ({ h, ...u }) => u;
const builtins = () => L.STAFF.map((s) => ({ id: "builtin:" + s.u, u: s.u, first: s.name.split(" ")[0], last: s.name.split(" ").slice(1).join(" "), title: s.title, perms: L.PERMS, active: true, builtIn: true }));

module.exports = async (req, res) => {
  L.cors(res);
  if (req.method === "OPTIONS") return res.status(204).end();
  const who = L.bearer(req);
  if (!who || who.role !== "admin" || !(who.perms || []).includes("users")) return res.status(403).json({ error: "yetki" });
  const ns = L.nsOf(req);
  try {
    if (who.sid) { const d0 = await L.readDoc(ns), me = (d0.staff || []).find((x) => x.id === who.sid); if (!me || me.active === false || !(me.perms || []).includes("users")) return res.status(403).json({ error: "yetki" }); }
    if (req.method === "GET") { const doc = await L.readDoc(ns); return res.status(200).json({ users: [...builtins(), ...(doc.staff || []).map(clean)], perms: L.PERMS }); }
    const b = await L.bodyOf(req), perms = (p) => (Array.isArray(p) ? p.filter((x) => L.PERMS.includes(x)) : []);
    let password = null;
    const { result } = await L.updateDoc(ns, (doc) => {
      doc.staff ||= [];
      const find = (id) => doc.staff.find((x) => x.id === id);
      if (b.action === "create") {
        const u = L.emailKey(b.user && b.user.email), first = String(b.user.first || "").trim(), last = String(b.user.last || "").trim();
        if (!u || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(u) || !first) return { error: "Ad ve geçerli bir e-posta gerekli" };
        if (L.STAFF.some((s) => s.u === u) || doc.staff.some((s) => s.u === u)) return { error: "Bu e-posta ile bir kullanıcı zaten var" };
        if (doc.customers.some((c) => L.emailKey(c.email) === u) || doc.regs.some((r) => r.u === u)) return { error: "Bu e-posta bir müşteri hesabında kullanılıyor" };
        password = b.password && String(b.password).length >= 8 ? String(b.password) : L.randomPassword();
        const user = { id: "U-" + Date.now().toString(36).toUpperCase(), u, h: L.hashPw(u, password), first, last, title: String(b.user.title || "").trim(), perms: perms(b.user.perms), active: true, createdAt: new Date().toISOString(), createdBy: who.u };
        doc.staff.push(user); return { user: clean(user) };
      }
      const t = find(b.id); if (!t) return { error: "Kullanıcı bulunamadı (yerleşik hesaplar buradan değiştirilemez)" };
      if (b.action === "update") { Object.assign(t, { first: String(b.user.first || t.first).trim(), last: String(b.user.last ?? t.last).trim(), title: String(b.user.title ?? t.title).trim(), perms: perms(b.user.perms) , updatedAt: new Date().toISOString() }); return { user: clean(t) }; }
      if (b.action === "setActive") { if (t.id === who.sid) return { error: "Kendinizi pasife alamazsınız" }; t.active = !!b.active; return { user: clean(t) }; }
      if (b.action === "resetPassword") { password = b.password && String(b.password).length >= 8 ? String(b.password) : L.randomPassword(); t.h = L.hashPw(t.u, password); t.pwAt = new Date().toISOString(); return { user: clean(t) }; }
      return { error: "action" };
    });
    if (result.error) return res.status(400).json({ error: result.error });
    return res.status(200).json({ ...result, ...(password ? { password } : {}) });
  } catch (e) { return res.status(502).json({ error: String(e.message || e) }); }
};
