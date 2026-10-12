// Giriş servisi — şifreler sunucuda kontrol edilir, başarılı girişte imzalı oturum anahtarı döner.
// POST /api/auth?ns=…  { action: "login", u, p }        → { token, session } | { pending } | { inactive } | { setPassword } | 401
//                       { action: "setPassword", u, p }  → panele aktarılan müşteri ilk girişte şifresini belirler
//                       { action: "register", cust, u, p } → yeni başvuru (onay bekler)
const L = require("./_lib");

// E-postaya bağlı müşteri: önce aktif, sonra en eski kayıt (aynı e-posta birden çok firmada olabilir)
const customerByEmail = (doc, email) => doc.customers.filter((c) => L.emailKey(c.email) === email).sort((a, b) => (a.status === "Active" ? 0 : 1) - (b.status === "Active" ? 0 : 1))[0];
const sessionOf = (c, u) => ({ u, role: "customer", cust: c.id, name: c.contact || c.name, title: c.name });

module.exports = async (req, res) => {
  L.cors(res);
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "POST" });
  try {
    const ns = L.nsOf(req), b = await L.bodyOf(req);
    const u = L.emailKey(b.u), p = String(b.p || "");
    const ok = (session) => res.status(200).json({ token: L.signToken(session), session });

    if (b.action === "login") {
      if (!u) return res.status(400).json({ error: "missing" });
      const h = L.hashPw(u, p);
      const staff = L.STAFF.find((a) => a.u === u && a.h === h);
      if (staff) return ok({ u, role: staff.role, name: staff.name, title: staff.title, dash: staff.dash });
      const doc = await L.readDoc(ns);
      const demo = L.DEMO_CUSTOMERS.find((a) => a.u === u && a.h === h);
      const reg = doc.regs.find((r) => r.u === u && r.h === h);
      const cust = demo ? doc.customers.find((c) => c.id === demo.cust) : reg ? doc.customers.find((c) => c.id === reg.cust) : null;
      if (cust) {
        if (cust.status === "Pending") return res.status(200).json({ pending: true });
        if (cust.status !== "Active") return res.status(200).json({ inactive: true });
        return ok(sessionOf(cust, u));
      }
      // panele aktarılmış, henüz şifresi olmayan müşteri → yeni şifre belirlemeye yönlendir
      const imp = !doc.regs.some((r) => r.u === u) && customerByEmail(doc, u);
      if (imp && imp.imported) return res.status(200).json(imp.status === "Active" ? { setPassword: true, company: imp.name } : { inactive: true });
      return res.status(401).json({ error: "invalid" });
    }

    if (b.action === "setPassword") {
      if (!u || p.length < 8) return res.status(400).json({ error: "weak" });
      const { result } = await L.updateDoc(ns, (doc) => {
        if (doc.regs.some((r) => r.u === u)) return { error: "exists" };
        const c = customerByEmail(doc, u);
        if (!c || !c.imported) return { error: "invalid" };
        if (c.status !== "Active") return { error: "inactive" };
        doc.regs.push({ u, h: L.hashPw(u, p), cust: c.id, at: new Date().toISOString(), first: true });
        c.pwSet = new Date().toISOString();
        return { c };
      });
      if (result.error) return res.status(result.error === "exists" ? 409 : 400).json({ error: result.error });
      return ok(sessionOf(result.c, u));
    }

    if (b.action === "register") {
      const c = b.cust || {};
      if (!u || p.length < 6 || !c.name) return res.status(400).json({ error: "missing" });
      if (L.STAFF.some((a) => a.u === u)) return res.status(409).json({ error: "exists" });
      const { result } = await L.updateDoc(ns, (doc) => {
        if (doc.regs.some((r) => r.u === u) || doc.customers.some((x) => L.emailKey(x.email) === u)) return { error: "exists" };
        const id = "A-" + Date.now().toString(36).toUpperCase();
        doc.customers.push({ ...c, id, email: u, status: "Pending", level: 1 });
        doc.regs.push({ u, h: L.hashPw(u, p), cust: id, at: new Date().toISOString() });
        return { id };
      });
      if (result.error) return res.status(409).json({ error: result.error });
      return res.status(200).json({ ok: true, id: result.id });
    }
    return res.status(400).json({ error: "action" });
  } catch (e) {
    return res.status(502).json({ error: String(e.message || e) });
  }
};
