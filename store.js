// Ortak depo istemcisi: panel verisini /api/store ile tüm cihazlar arasında eşitler.
// Açılışta depodan yükler (boşsa demo veriyle tohumlar), her ekran çiziminden sonra değişen kayıtları gönderir,
// 15 sn'de bir yeni sürüm var mı bakar. Depo yoksa (çevrimdışı) panel yerel veriyle çalışmaya devam eder.

const STORE = {
  api: (/vercel\.app$/.test(location.hostname) ? "" : "https://marmara-b2b-panel.vercel.app/") + "api/store",
  ns: (() => { const q = new URLSearchParams(location.search).get("ns"); if (q != null) { try { localStorage.setItem("mbStoreNs", q); } catch {} return q; } try { return localStorage.getItem("mbStoreNs") || ""; } catch { return ""; } })(),
  rev: 0, snap: null, regs: [], online: false, busy: false, timer: null, poll: null,
};
const storeUrl = () => STORE.api + (STORE.ns ? `?ns=${encodeURIComponent(STORE.ns)}` : "");

function storeSnapshot() {
  const s = { orders: {}, customers: {}, regs: {}, logs: {}, prep: {}, palletCheck: {} };
  ORDERS.forEach((o) => (s.orders[o.no] = JSON.stringify(o)));
  CUSTOMERS.forEach((c) => (s.customers[c.id] = JSON.stringify(c)));
  STORE.regs.forEach((r) => (s.regs[r.u] = JSON.stringify(r)));
  for (const m of ["logs", "prep", "palletCheck"]) for (const [k, v] of Object.entries(state[m] || {})) s[m][k] = JSON.stringify(v);
  return s;
}
function storeChanges() {
  if (!STORE.snap) return null;
  const now = storeSnapshot(), ch = {}, put = (k, v) => (ch[k] ||= []).push(v);
  for (const o of ORDERS) if (now.orders[o.no] !== STORE.snap.orders[o.no]) put("orders", o);
  for (const c of CUSTOMERS) if (now.customers[c.id] !== STORE.snap.customers[c.id]) put("customers", c);
  for (const r of STORE.regs) if (now.regs[r.u] !== STORE.snap.regs[r.u]) put("regs", r);
  for (const m of ["logs", "prep", "palletCheck"]) for (const [k, v] of Object.entries(now[m])) if (v !== STORE.snap[m][k]) (ch[m] ||= {})[k] = state[m][k];
  return Object.keys(ch).length ? ch : null;
}
function storeApply(doc) {
  ORDERS.splice(0, ORDERS.length, ...doc.orders);
  CUSTOMERS.splice(0, CUSTOMERS.length, ...doc.customers);
  STORE.regs = doc.regs || [];
  state.logs = doc.logs || {}; state.prep = doc.prep || {}; state.palletCheck = doc.palletCheck || {};
  STORE.rev = doc.rev; STORE.snap = storeSnapshot();
}
async function storeFetch(opts) {
  const r = await fetch(storeUrl(), { cache: "no-store", ...opts, headers: { "Content-Type": "application/json" } });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j.error || r.status);
  return j;
}

// Açılış: depo boşsa mevcut (demo) veriyi tohum olarak yazar
async function storeInit() {
  try {
    const doc = await storeFetch();
    STORE.online = true;
    if (doc.rev > 0) storeApply(doc);
    else { STORE.snap = { orders: {}, customers: {}, regs: {}, logs: {}, prep: {}, palletCheck: {} }; await storeSync(true); }
  } catch (e) {
    STORE.online = false; STORE.snap = storeSnapshot();
    console.warn("Ortak depoya ulaşılamadı, yerel veriyle devam:", e.message);
  }
  clearInterval(STORE.poll);
  STORE.poll = setInterval(storePoll, 15000);
}

// Değişiklikleri gönder (ekran çiziminden sonra kısa gecikmeyle)
function storeQueue() { clearTimeout(STORE.timer); STORE.timer = setTimeout(() => storeSync(), 400); }
async function storeSync(force) {
  if (!STORE.online && !force) return;
  if (STORE.busy) return storeQueue();
  const ch = storeChanges();
  if (!ch) return;
  STORE.busy = true;
  try {
    const doc = await storeFetch({ method: "POST", body: JSON.stringify({ changes: ch }) });
    const pending = storeChanges();   // istek sırasında yapılan değişiklikleri kaybetme
    storeApply(doc);
    STORE.online = true;
    if (pending) storeQueue();
  } catch (e) {
    toast("Kaydedilemedi — bağlantı kontrol ediliyor", "alert");
    console.warn(e);
  } finally { STORE.busy = false; }
}

// Yeni sürüm varsa ekranı güncelle (kullanıcı yazı yazarken / pencere açıkken bekler)
async function storePoll() {
  if (STORE.busy || storeChanges()) return;
  try {
    const doc = await storeFetch();
    STORE.online = true;
    if (doc.rev <= STORE.rev) return;
    const typing = document.activeElement?.matches?.("input,textarea,select");
    const modalOpen = document.querySelector("#modal.on, #rvPop.on, .legal-pop.on");
    if (typing || modalOpen) return;
    storeApply(doc);
    if (authSession()) rerender(); else if (typeof authRender === "function") authRender();
  } catch {}
}
