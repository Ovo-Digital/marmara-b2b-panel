// Marmara Barber B2B — demo panel. Tek sayfa, hash tabanlı yönlendirme.

const $ = (s) => document.querySelector(s);

const ICONS = {
  home: '<path d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
  bell: '<path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  users: '<circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/><path d="M21 21v-2a4 4 0 0 0-3-3.85"/>',
  cart: '<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>',
  tag: '<path d="M12.6 2.6A2 2 0 0 0 11.2 2H4a2 2 0 0 0-2 2v7.2a2 2 0 0 0 .6 1.4l8.7 8.7a2.4 2.4 0 0 0 3.4 0l6.6-6.6a2.4 2.4 0 0 0 0-3.4z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
  trend: '<path d="M22 7 13.5 15.5 8.5 10.5 2 17"/><path d="M16 7h6v6"/>',
  box: '<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>',
  layers: '<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/>',
  container: '<rect x="2" y="6" width="20" height="12" rx="1"/><path d="M6 6v12M10 6v12M14 6v12M18 6v12"/>',
  factory: '<path d="M2 20V9l6 4V9l6 4V4h8v16z"/><path d="M17 20v-3M12 20v-3M7 20v-3"/>',
  truck: '<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>',
  wallet: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/><path d="M6 15h4"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h5"/>',
  image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/>',
  chart: '<path d="M3 3v18h18"/><path d="M7 16v-5M12 16V8M17 16v-9"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68 1.65 1.65 0 0 0 10 3.17V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  alert: '<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',
  upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m17 8-5-5-5 5"/><path d="M12 3v12"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  chevL: '<path d="m15 18-6-6 6-6"/>',
  chevR: '<path d="m9 18 6-6-6-6"/>',
  copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
  send: '<path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/>',
  refresh: '<path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><path d="M21 3v5h-5"/>',
  edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
  bank: '<path d="M3 21h18M3 10h18M5 6l7-3 7 3"/><path d="M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"/>',
  logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1"/>',
};
const ic = (n, cls = "") => `<svg class="ic ${cls}" viewBox="0 0 24 24">${ICONS[n] || ""}</svg>`;

// ——— yardımcılar ———
const P = (sku) => PRODUCTS.find((p) => p.sku === sku);
const C = (id) => CUSTOMERS.find((c) => c.id === id);
const O = (no) => ORDERS.find((o) => o.no === no);
const avail = (p) => Math.max(0, p.physical - p.reserved);
const availBoxes = (p) => Math.floor(avail(p) / p.pcsBox);
const stockState = (p) => (avail(p) === 0 ? "out" : avail(p) < p.low ? "low" : "in");
const stockPill = (p, en) => {
  const s = stockState(p);
  const t = en ? { in: "In Stock", low: "Low Stock", out: "Out of Stock" } : { in: "Stokta", low: "Düşük Stok", out: "Stok Yok" };
  return `<span class="pill ${s === "in" ? "ok" : s === "low" ? "warn" : "err"}">${t[s]}</span>`;
};
const sym = (c) => (c === "EUR" ? "€" : "$");
const fx = (c) => (c === "EUR" ? 0.92 : 1);
const money = (v, c = "USD", d = 0) => sym(c) + Number(v).toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });
const num = (v) => Number(v).toLocaleString("en-US");
// Fiyat seviyesi: müşteriye admin atar (yeni kayıt → Level 1). Sipariş, müşterinin seviyesini alır; admin sipariş özelinde değiştirebilir.
const levelOf = (custId) => C(custId)?.level || 1;
const orderLevel = (o) => o.level ?? levelOf(o.cust);
const levelCur = (lvl) => LEVELS[lvl - 1]?.cur || "USD";
const priceAt = (p, lvl) => p.prices[lvl - 1] ?? p.price;
const orderPrice = (o, p) => priceAt(p, orderLevel(o));
const custPrice = (p) => priceAt(p, levelOf(ME));
const syncOrder = (o) => { o.currency = levelCur(orderLevel(o)); };
const lineTotal = (sku, boxes, lvl = levelOf(ME), price) => { const p = P(sku); return boxes * p.pcsBox * (price ?? priceAt(p, lvl)); };
const orderTotal = (o) => o.items.reduce((s, [sku, b, pr]) => s + lineTotal(sku, b, orderLevel(o), pr), 0);
const orderBoxes = (items) => items.reduce((s, [, b]) => s + b, 0);
const targetLabel = (t) => (t === "pallet" ? "Palet" : SETTINGS.containers[t].label);
const imgSrc = (x) => (!x ? "" : x.includes("/") ? x : "img/" + x);
const noImg = (p) => `<span class="no-img">${(p.brand || "?").split(" ").map((w) => w[0]).join("").slice(0, 2)}</span>`;
const thumb = (p) => `<div class="thumb">${p.img ? `<img src="${imgSrc(p.img)}" alt="" loading="lazy">` : noImg(p)}</div>`;
const stagePill = (s, en) => {
  const cls = ["gold", "warn", "info", "info", "ok", "plain"][s];
  return `<span class="pill ${cls}">${(en ? STAGES_EN : STAGES)[s]}</span>`;
};
const payState = (o) => {
  const t = orderTotal(o);
  if (o.paid <= 0) return ["Awaiting", "warn", "Bekleniyor"];
  if (o.paid + 1 < t) return ["Partially Paid", "info", "Kısmi Ödendi"];
  if (o.paid > t + 1) return ["Overpaid", "gold", "Fazla Ödeme"];
  return ["Paid", "ok", "Ödendi"];
};
const SKU_COLORS = ["#c8a46a", "#8c6b3f", "#6aa6f2", "#3fb97a", "#e0a13a", "#b07ad8", "#e5484d", "#4fc1c1", "#d9d9d9", "#9aa0a6", "#d98b5f", "#7a8f3f", "#f08bb4", "#5b6fd6", "#c2b280", "#8fb3a8"];
const skuColor = (sku) => SKU_COLORS[PRODUCTS.findIndex((p) => p.sku === sku) % SKU_COLORS.length];

const TODAY = new Date("2026-09-30T12:00:00");
const fmtDate = (d) => new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
const isoDate = (s) => { const d = new Date(s + " 12:00"); return isNaN(d) ? "" : d.toISOString().slice(0, 10); };
const daysLeft = (s) => Math.round((new Date(s + " 12:00") - TODAY) / 864e5);
const REGION = { Germany: "Avrupa", Lithuania: "Avrupa", Romania: "Avrupa", Sweden: "Avrupa", France: "Avrupa", USA: "Amerika", UAE: "Orta Doğu", "Saudi Arabia": "Orta Doğu", Kazakhstan: "BDT" };
const pxVariant = (p) => (p.name.match(/\d+\s?(ml|g)|\(.*\)/i) || ["—"])[0];
const pxFlash = (p) => (p.dg.includes("Class 3") ? (p.cat === "Fragrance" ? "24 °C" : "23 °C") : p.dg.includes("Aerosol") ? "< 0 °C" : "—");
const pxImdg = (p) => (p.dg.includes("Class 3") ? "Class 3" : p.dg.includes("Aerosol") ? "Class 2.1" : "—");
const pxOrient = (p) => (["Cologne", "Fragrance", "Shaving", "Hair Care", "Beard"].includes(p.cat) || p.sku === "BSS-200 - PS" || p.sku === "BHS-750-M" ? "Dik (↑)" : "Serbest");
const pxStack = (p) => (p.cls === "Fragile" ? "Max 3 kat" : p.cls === "Heavy" ? "Evet · altta" : "Evet");

// ——— Palet & konteyner motoru (demo sadeleştirmesi) ———
// Kutu hacmi palet tabanına (80×120) %88 verimle dizilir → yükseklik. Ağır koliler alta, fragile üste.
const CLASS_ORDER = { Heavy: 0, Medium: 1, Light: 2, Fragile: 3 };
function loadCalc(items, target) {
  const S = SETTINGS.pallet;
  const foot = (S.base[0] * S.base[1]) / 1e4; // m²
  const maxLoad = 168; // cm yük → 183 cm toplam palet
  const toCm = (m3) => (m3 / (foot * S.efficiency)) * 100;
  const rows = items.filter(([, b]) => b > 0).map(([sku, b]) => ({ p: P(sku), b }));
  const loose = target !== "pallet" ? rows.filter((r) => r.p.loose) : [];
  const pal = rows.filter((r) => !loose.includes(r)).sort((a, b) => CLASS_ORDER[a.p.cls] - CLASS_ORDER[b.p.cls]);

  const pallets = [];
  let curP = null;
  for (const r of pal) {
    let cm = toCm((r.p.dims[0] * r.p.dims[1] * r.p.dims[2]) / 1e6 * r.b);
    while (cm > 0.01) {
      if (!curP || curP.load >= maxLoad - 0.01) { curP = { load: 0, segs: [], kg: 25 }; pallets.push(curP); }
      const take = Math.min(cm, maxLoad - curP.load);
      curP.segs.push({ sku: r.p.sku, cm: take });
      curP.load += take;
      curP.kg += (take / toCm((r.p.dims[0] * r.p.dims[1] * r.p.dims[2]) / 1e6)) * r.p.kg;
      cm -= take;
    }
  }
  pallets.forEach((p) => { p.h = Math.round(p.load + S.baseHeight); p.kg = Math.round(p.kg); p.ok = p.h >= S.completeMin; });

  const looseBoxes = loose.reduce((s, r) => s + r.b, 0);
  const looseM3 = loose.reduce((s, r) => s + (r.p.dims[0] * r.p.dims[1] * r.p.dims[2]) / 1e6 * r.b, 0);
  const looseKg = loose.reduce((s, r) => s + r.p.kg * r.b, 0);
  const palM3 = pallets.reduce((s, p) => s + foot * (p.h / 100), 0);
  const kg = pallets.reduce((s, p) => s + p.kg, 0) + looseKg;
  const boxes = rows.reduce((s, r) => s + r.b, 0);
  const pcs = rows.reduce((s, r) => s + r.b * r.p.pcsBox, 0);
  const last = pallets[pallets.length - 1];

  const res = { pallets, looseBoxes, looseM3, kg: Math.round(kg), boxes, pcs, target, last };
  if (target === "pallet") {
    res.complete = pallets.length > 0 && pallets.every((p) => p.ok);
    res.status = !pallets.length ? "empty" : res.complete ? "complete" : "incomplete";
    res.gapCm = last && !last.ok ? 180 - last.h : 0;
  } else {
    const cap = SETTINGS.containers[target];
    res.cap = cap;
    res.usedM3 = palM3 + looseM3;
    res.pct = Math.round((res.usedM3 / cap.m3) * 100);
    res.remM3 = Math.max(0, cap.m3 - res.usedM3);
    res.remKg = Math.max(0, cap.kg - kg);
    res.over = res.pct > 100 || kg > cap.kg || pallets.length > cap.slots;
    res.complete = !res.over && res.pct >= cap.threshold;
    res.status = !rows.length ? "empty" : res.over ? "over" : res.complete ? "complete" : "incomplete";
  }
  return res;
}

// Tamamlama önerileri: sadece stokta olan + fiziksel sığan ürünler; müşteri onaylamadan eklenmez.
function suggestions(items, target) {
  const L = loadCalc(items, target);
  const foot = 0.96, eff = SETTINGS.pallet.efficiency;
  let needM3, pool;
  const inCart = new Set(items.filter(([, b]) => b > 0).map(([s]) => s));
  if (target === "pallet") {
    if (L.complete || !L.last) return [];
    needM3 = (L.gapCm / 100) * foot * eff;
    pool = PRODUCTS.filter((p) => stockState(p) !== "out");
  } else {
    if (L.complete || L.over) return [];
    needM3 = L.cap.m3 * 0.95 - L.usedM3;
    pool = PRODUCTS.filter((p) => p.loose && stockState(p) !== "out");
  }
  return pool
    .map((p) => {
      const bv = (p.dims[0] * p.dims[1] * p.dims[2]) / 1e6;
      const want = Math.ceil(needM3 / bv);
      const boxes = target === "pallet" ? want : Math.min(want, availBoxes(p));
      const it = items.map(([s, b]) => [s, b]); const f = it.find(([s]) => s === p.sku);
      if (f) f[1] += boxes; else it.push([p.sku, boxes]);
      const after = loadCalc(it, target);
      return { p, boxes, fits: boxes <= availBoxes(p) && !after.over, inCart: inCart.has(p.sku), after };
    })
    .filter((s) => s.fits && s.boxes > 0)
    .sort((a, b) => (b.inCart - a.inCart) || (a.boxes * a.p.pcsBox * custPrice(a.p) - b.boxes * b.p.pcsBox * custPrice(b.p)))
    .slice(0, 4);
}

// ——— durum ———
const state = {
  mode: "admin",
  cart: { "BC-400-2": 24, "BSG-1000-77": 20, "BS-1150-KRT": 16, "BW-150-MAT-1018": 30, "BW-20-SKL": 20, "BSS-200 - PS": 10 },
  cartTarget: "pallet",
  filter: { orders: -1, customers: "all", brand: "all", cat: "all", q: "" },
  loadingOrder: "SO-2026-0148",
  loadingTarget: null,
  prep: {
    "SO-2026-0145": { "BW-20-SKL": 86, "BSS-200 - PS": 64, "BC-400-2": 101, "BW-150-GUM": 342, "BSG-1000-77": 257, "BM-011277": 214 },
    "SO-2026-0141": { "BC-400-6": 241, "BW-150-MAT-1018": 321, "BW-150-GUM": 120, "BHS-750-M": 0, "BM-007058": 0 },
  },
  logs: {
    "SO-2026-0148": [["28 Sep 2026 14:12", "ABC Distribution siparişi oluşturdu (20' konteyner — COMPLETE)"], ["28 Sep 2026 14:12", "Sistem: stok, fiyat ve konteyner doğrulaması geçti"], ["28 Sep 2026 14:13", "Bildirim: Ferhat'a yeni sipariş maili gönderildi"]],
  },
  tab: {},
  dashRole: "mgmt",
  docType: "all",
  mkKind: "all",
  prodTab: "list",
  palletCheck: {},
  piRevs: [["Rev.1", "22 Sep 2026", "İlk proforma"]],
  regDone: false,
  notifsRead: false,
};

const USERS_BY_MODE = {
  admin: ["VK", "Volkan Koçkan", "Super Admin"],
  customer: ["JS", "John Smith", "ABC Distribution GmbH"],
  factory: ["DF", "Düzce Fabrika", "Factory · Hazırlık"],
};

const NAV = {
  admin: [
    ["Genel"],
    ["dashboard", "Gösterge", "home"],
    ["notifications", "Aksiyonlar", "bell", 9],
    ["Satış"],
    ["customers", "Müşteriler", "users", 2],
    ["orders", "Siparişler", "cart"],
    ["pricing", "Fiyatlandırma", "tag"],
    ["forecast", "Forecast", "trend"],
    ["Ürün & Lojistik"],
    ["products", "Ürünler", "box"],
    ["loading", "Palet", "container"],
    ["preparation", "Fabrika", "factory", 1],
    ["shipments", "Sevkiyat", "truck"],
    ["Finans & Rapor"],
    ["finance", "Finans", "wallet"],
    ["reports", "Raporlar", "chart"],
    ["İçerik"],
    ["documents", "Dokümanlar", "file", 1],
    ["marketing", "Marketing", "image"],
    ["Sistem"],
    ["users", "Yetkiler", "shield"],
    ["settings", "Ayarlar", "settings"],
  ],
  customer: [
    ["Portal"],
    ["dashboard", "Dashboard", "home"],
    ["products", "New Order", "box"],
    ["orders", "My Orders", "cart"],
    ["forecast", "Forecast", "trend"],
    ["Content"],
    ["documents", "Documents", "file"],
    ["marketing", "Marketing", "image"],
    ["Settings"],
    ["account", "Account", "user"],
  ],
  factory: [
    ["Fabrika"],
    ["queue", "Kuyruk", "factory", 2],
    ["prep", "Hazırlık", "box"],
  ],
};

// ——— yönlendirme ———
function go(path) { location.hash = "#/" + path; }
function parse() {
  const parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean).map(decodeURIComponent);
  const mode = ["admin", "customer", "factory"].includes(parts[0]) ? parts[0] : "admin";
  const page = parts[1] || (mode === "factory" ? "queue" : "dashboard");
  return { mode, page, arg: parts[2] };
}

function render() {
  if (!authGuard()) return;
  const { mode, page, arg } = parse();
  state.mode = mode;
  document.querySelectorAll("#modeSwitch button").forEach((b) => b.classList.toggle("on", b.dataset.mode === mode));
  let [ini, name, role] = USERS_BY_MODE[mode];
  const sess = authSession();
  if (sess && sess.role === mode) { name = sess.name; role = sess.title; ini = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase(); }
  $("#modeSwitch").style.display = sess?.role === "admin" ? "" : "none";
  $("#avatar").textContent = ini; $("#meName").textContent = name; $("#meRole").textContent = role;
  $("#sideTag").textContent = mode === "customer" ? "B2B CUSTOMER PORTAL" : mode === "factory" ? "FACTORY · DÜZCE" : "B2B BACK OFFICE";
  $("#notifBtn").style.display = mode === "admin" ? "" : "none";

  const activeKey = { customer: "customers", order: "orders", application: "customers", product: "products", checkout: "products" }[page] || page;
  $("#nav").innerHTML = NAV[mode].map((n) => {
    if (n.length === 1) return `<div class="nav-group">${n[0]}</div>`;
    const [key, label, icon] = n;
    const badge = mode === "admin" && key === "customers" ? CUSTOMERS.filter((c) => c.status === "Pending").length : n[3];
    return `<a class="nav-item ${key === activeKey ? "on" : ""}" href="#/${mode}/${key}" data-short="${label.split(" ")[0]}">${ic(icon)}<span>${label}</span>${badge ? `<span class="badge">${badge}</span>` : ""}</a>`;
  }).join("");
  $("#nav .nav-item.on")?.scrollIntoView({ block: "nearest" });

  const views = { admin: ADMIN, customer: CUST, factory: FACT }[mode];
  const fn = views[page] || views[Object.keys(views)[0]];
  $("#view").innerHTML = fn(arg);
  storeQueue();
  $("#app").classList.remove("nav-open");
  window.scrollTo(0, 0);
}
function rerender() { if (!authSession()) return; const y = window.scrollY; const { mode, page, arg } = parse(); const views = { admin: ADMIN, customer: CUST, factory: FACT }[mode]; $("#view").innerHTML = (views[page] || views[Object.keys(views)[0]])(arg); window.scrollTo(0, y); storeQueue(); }

// ——— modal & toast ———
function modal(html) { $("#modalBox").innerHTML = html; $("#modal").classList.add("on"); }
function closeModal() { $("#modal").classList.remove("on"); }
function toast(msg, icon = "check") {
  const t = document.createElement("div");
  t.className = "toast";
  t.innerHTML = ic(icon) + `<span>${msg}</span>`;
  $("#toasts").appendChild(t);
  setTimeout(() => t.remove(), 3200);
}
function log(no, msg) {
  (state.logs[no] ||= []).push([new Date().toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }).replace(",", ""), msg]);
}

// ——— grafik ———
function barChart(data, { h = 230, prev = null, fmt = (v) => v, unit = "" } = {}) {
  const W = 680, H = h, pl = 64, pb = 28, pt = 22;
  const all = data.map((d) => d[1]).concat(prev ? prev : []);
  const max = Math.max(...all) * 1.15;
  const bw = (W - pl) / data.length;
  const y = (v) => pt + (H - pt - pb) * (1 - v / max);
  let g = "";
  for (let i = 0; i <= 4; i++) {
    const v = (max / 4) * i, yy = y(v);
    g += `<line class="gl" x1="${pl}" x2="${W}" y1="${yy}" y2="${yy}"/><text class="ax" x="${pl - 8}" y="${yy + 4}" text-anchor="end">${fmt(v)}</text>`;
  }
  data.forEach(([l, v], i) => {
    const last = i === data.length - 1;
    const x = pl + i * bw;
    if (prev) {
      const w = bw * 0.28;
      g += `<rect x="${x + bw * 0.2}" y="${y(prev[i])}" width="${w}" height="${H - pb - y(prev[i])}" rx="3" fill="#d6d4cc"/>`;
      g += `<rect x="${x + bw * 0.2 + w + 3}" y="${y(v)}" width="${w}" height="${H - pb - y(v)}" rx="3" fill="#c8a46a"/>`;
    } else {
      g += `<rect x="${x + bw * 0.22}" y="${y(v)}" width="${bw * 0.56}" height="${H - pb - y(v)}" rx="4" fill="${last ? "#c8a46a" : "#e3e1da"}"/>`;
      if (last) g += `<text x="${x + bw / 2}" y="${y(v) - 7}" text-anchor="middle" fill="#8a6a33" font-size="12" font-weight="600" font-family="Inter">${fmt(v)}${unit}</text>`;
    }
    g += `<text class="ax" x="${x + bw / 2}" y="${H - 8}" text-anchor="middle">${l}</text>`;
  });
  return `<div class="chart"><svg viewBox="0 0 ${W} ${H}">${g}</svg></div>`;
}
const hbars = (rows, fmtV, max) => {
  const m = max || Math.max(...rows.map((r) => r[1]));
  return `<div class="hbars">${rows.map(([l, v]) => `<div class="hbar"><span>${l}</span><div class="bar"><i style="width:${(v / m) * 100}%"></i></div><span class="v">${fmtV(v)}</span></div>`).join("")}</div>`;
};

// ——— ortak parçalar ———
const head = (title, sub, actions = "", crumb = "") => `
  <div class="page-head"><div>${crumb ? `<div class="crumb">${crumb}</div>` : ""}<h1>${title}</h1>${sub ? `<p>${sub}</p>` : ""}</div>
  <div class="head-actions">${actions}</div></div>`;
const kpi = (n, lbl, hint, icon, delta) => `
  <div class="card kpi"><div class="kv"><div class="num">${n}${delta ? `<span class="delta ${delta[0] === "-" ? "down" : "up"}">${delta}</span>` : ""}</div><div class="lbl">${lbl}</div></div><div class="kicon">${ic(icon)}</div></div>`;
const stepper = (stage, labels) => `<div class="stepper">${labels.map((l, i) => `<div class="step ${i < stage || stage === labels.length - 1 ? "done" : i === stage ? "cur" : ""}"><div class="dot">${i < stage || (stage === labels.length - 1) ? ic("check") : i + 1}</div>${l}</div>`).join("")}</div>`;

function palletVisual(L, compact) {
  if (!L.pallets.length) return `<div class="empty">Henüz paletlenecek ürün yok.</div>`;
  const S = SETTINGS.pallet, H = compact ? 150 : 220, scale = H / 200;
  return `<div class="pallets">${L.pallets.map((p, i) => `
    <div class="pv"><div class="stack" style="height:${H}px">
      <div class="zone" style="bottom:${(S.completeMin - S.baseHeight) * scale}px;height:${(S.completeMax - S.completeMin) * scale}px"></div>
      ${p.segs.map((s) => `<div class="layer" title="${s.sku}" style="height:${Math.max(2, s.cm * scale - 2)}px;background:${skuColor(s.sku)}"></div>`).join("")}
    </div><b>PALET ${i + 1}</b><small class="${p.ok ? "ok-t" : "warn-t"}">${p.h} cm · ${p.ok ? "Complete" : "Incomplete"}</small>${compact ? "" : `<small>${num(p.kg)} kg</small>`}</div>`).join("")}
  </div>`;
}
function skuLegend(items) {
  return `<div class="legend">${items.filter(([, b]) => b > 0).map(([s]) => `<span><i style="background:${skuColor(s)}"></i>${s}</span>`).join("")}</div>`;
}
function containerVisual(L) {
  const cap = L.cap;
  const cols = cap.slots / 2;
  const looseSlots = Math.ceil(L.looseM3 / 1.7);
  let slots = "";
  for (let i = 0; i < cap.slots; i++) {
    const p = L.pallets[i];
    if (p) slots += `<div class="slot ${p.ok ? "full" : "part"}">P${i + 1}</div>`;
    else if (i < L.pallets.length + looseSlots) slots += `<div class="slot loose">LOOSE</div>`;
    else slots += `<div class="slot"></div>`;
  }
  return `<div class="container-vis"><div class="slots" style="grid-template-columns:repeat(${cols},1fr)">${slots}</div><div class="container-door"></div></div>
    <div class="legend mt"><span><i style="background:var(--accent-2)"></i>Tam palet</span><span><i style="background:var(--warn)"></i>Eksik palet</span><span><i style="background:var(--info)"></i>Loose loading</span><span><i style="background:#fff;border:1px dashed #bbb"></i>Boş</span></div>`;
}
function containerStats(L) {
  const cls = L.over ? "err" : L.complete ? "ok" : "warn";
  return `
    <div class="between"><span class="muted">Container Load</span><b class="${cls}-t" style="font:600 22px var(--display)">${L.pct}%</b></div>
    <div class="bar thick ${cls} mt" style="margin-top:8px"><i style="width:${Math.min(100, L.pct)}%"></i><span class="mark" style="left:${L.cap.threshold}%"></span></div>
    <div class="mt">
      <div class="stat-row"><span>Paletler</span><b>${L.pallets.length} / ${L.cap.slots}</b></div>
      <div class="stat-row"><span>Loose load</span><b>${num(L.looseBoxes)} koli · ${L.looseM3.toFixed(1)} m³</b></div>
      <div class="stat-row"><span>Kalan hacim</span><b>${L.remM3.toFixed(1)} m³</b></div>
      <div class="stat-row"><span>Kalan ağırlık</span><b>${num(Math.round(L.remKg))} kg</b></div>
      <div class="stat-row"><span>Brüt ağırlık</span><b>${num(L.kg)} / ${num(L.cap.kg)} kg</b></div>
    </div>`;
}

// ═════════════════════════════ ADMIN ═════════════════════════════
const ADMIN = {};

// ——— Tarih aralığı (gösterge paneli) ———
const iso = (d) => d.toISOString().slice(0, 10);
const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
const RANGE_PRESETS = () => {
  const t = TODAY, y = t.getFullYear(), m = t.getMonth();
  return [
    ["Son 7 gün", addDays(t, -6), t], ["Son 30 gün", addDays(t, -29), t],
    ["Bu ay", new Date(y, m, 1, 12), t], ["Geçen ay", new Date(y, m - 1, 1, 12), new Date(y, m, 0, 12)],
    ["Son 3 ay", new Date(y, m - 2, 1, 12), t], ["Bu yıl", new Date(y, 0, 1, 12), t],
  ];
};
state.range ??= { from: "2026-09-01", to: "2026-09-30", preset: "Bu ay" };
function rangeLabel() {
  const f = new Date(state.range.from + "T12:00"), t = new Date(state.range.to + "T12:00");
  const loc = { tr: "tr-TR", en: "en-GB", es: "es-ES", de: "de-DE", ru: "ru-RU" }[typeof LANG === "string" ? LANG : "tr"];
  return new Intl.DateTimeFormat(loc, { day: "numeric", month: "long", year: "numeric" }).formatRange(f, t);
}
function rangePicker() {
  const r = state.range;
  return `<div class="range" id="rangeBox"><button class="btn" onclick="this.parentNode.classList.toggle('open')">${ic("calendar")} <span class="notranslate">${rangeLabel()}</span></button>
    <div class="range-pop">
      <div class="range-presets">${RANGE_PRESETS().map(([l, f, t]) => `<button class="${r.preset === l ? "on" : ""}" onclick="setRange('${iso(f)}','${iso(t)}','${l}')">${l}</button>`).join("")}</div>
      <div class="range-custom"><div class="rv-sl" style="color:var(--muted)">Özel aralık</div>
        <div class="form cols2"><div class="field"><label>Başlangıç</label><input class="input" type="date" id="rgFrom" value="${r.from}" max="${iso(TODAY)}"></div><div class="field"><label>Bitiş</label><input class="input" type="date" id="rgTo" value="${r.to}" max="${iso(TODAY)}"></div></div>
        <button class="btn primary block mt" onclick="setRange($('#rgFrom').value,$('#rgTo').value,'')">Uygula</button></div>
    </div></div>`;
}
function setRange(from, to, preset) {
  if (!from || !to || from > to) { toast("Başlangıç tarihi bitişten sonra olamaz", "alert"); return; }
  state.range = { from, to, preset };
  rerender();
  toast("Tarih aralığı uygulandı", "calendar");
}
// Aralıktaki satış: aylık satışın günlük ortalamasıyla hesaplanır (demo)
function rangeSales() {
  let s = 0;
  for (let d = new Date(state.range.from + "T12:00"); iso(d) <= state.range.to; d = addDays(d, 1)) {
    const m = MONTHLY_SALES[d.getMonth()];
    if (d.getFullYear() === 2026 && m) s += (m[1] * 1000) / new Date(2026, d.getMonth() + 1, 0).getDate();
  }
  return s;
}
function rangeKpis(r) {
  if (state.dashRole !== "mgmt") return r.kpis;
  const s = rangeSales(), isSep = state.range.from === "2026-09-01" && state.range.to === "2026-09-30";
  return [[money(Math.round(s)), "Satış", "trend", isSep ? "+9.6%" : ""], [num(Math.max(1, Math.round((s / 428650) * 31))), "Sipariş sayısı", "cart"], [money(Math.round(s * 0.901)), "Tahsilat", "wallet"], ["$510,000", "Ekim forecast", "trend"]];
}
document.addEventListener("click", (e) => { if (!e.target.closest("#rangeBox")) $("#rangeBox")?.classList.remove("open"); });

const DASH_ROLES = {
  mgmt: { label: "Yönetim", kpis: [["$428,650", "Bu ay satış", "trend", "+9.6%"], ["31", "Sipariş", "cart"], ["$386,200", "Tahsilat", "wallet"], ["$510,000", "Ekim forecast", "trend"]],
    acts: [["err", "cart", "Onay bekleyen sipariş", 2, "admin/orders"], ["warn", "clock", "Süresi dolan rezervasyon", 1, "admin/products/res"], ["err", "factory", "Hazırlık problemi", 2, "admin/preparation"], ["warn", "trend", "Eksik forecast", 3, "admin/forecast"], ["warn", "file", "Süresi dolan doküman", 1, "admin/documents"]] },
  sales: { label: "Satış · Ferhat", kpis: [["$214,300", "Benim satışım", "trend", "+6.1%"], ["18", "Müşterilerim", "users"], ["2", "İncelememde", "cart"], ["$142,000", "Ekim forecast", "trend"]],
    acts: [["err", "cart", "Satış incelemesi bekleyen", 1, "admin/order/SO-2026-0148"], ["gold", "users", "Yeni başvuru", 2, "admin/customers"], ["warn", "trend", "Forecast girmeyen müşterim", 3, "admin/forecast"], ["plain", "clock", "60 gündür sipariş vermeyen", 1, "admin/customer/C-1002"]] },
  approve: { label: "Onay · Gözde", kpis: [["2", "Final onay bekleyen", "shield"], ["2", "Onay bekleyen başvuru", "users"], ["1", "Rezervasyon doluyor", "clock"], ["$428,650", "Bu ay satış", "trend", "+9.6%"]],
    acts: [["err", "shield", "Final onay bekliyor", 2, "admin/order/SO-2026-0147"], ["warn", "clock", "Rezervasyon doluyor", 1, "admin/products/res"], ["gold", "users", "Müşteri başvurusu", 2, "admin/customers"], ["warn", "tag", "Fiyat değişikliği onayı", 1, "admin/pricing"]] },
  ops: { label: "Operasyon", kpis: [["7", "Hazırlanıyor", "factory"], ["3", "Sevke hazır", "truck"], ["2", "Hazırlık problemi", "alert"], ["4", "Bu hafta pickup", "calendar"]],
    acts: [["err", "factory", "Hazırlık problemi", 2, "admin/preparation"], ["ok", "truck", "Final packing bekliyor", 1, "admin/shipments"], ["warn", "alert", "Düşük stok SKU", 2, "admin/products"], ["info", "container", "Eksik yükleme planı", 1, "admin/loading"]] },
  fin: { label: "Finans", kpis: [["$17,590", "Açık bakiye", "wallet"], ["$386,200", "Eylül tahsilat", "check"], ["5", "Ödeme bekleyen", "clock"], ["$1,250", "Customer credit", "bank"]],
    acts: [["warn", "wallet", "Ödeme bekleyen proforma", 5, "admin/finance"], ["info", "wallet", "Kısmi ödeme", 1, "admin/finance"], ["gold", "bank", "Dağıtılmamış ödeme", 1, "admin/finance"]] },
};
ADMIN.dashboard = () => {
  const r = DASH_ROLES[state.dashRole];
  const low = PRODUCTS.filter((p) => stockState(p) !== "in").length;
  const total = r.acts.reduce((s, x) => s + x[3], 0);
  return `
  ${head("Gösterge Paneli", "", `<select class="input" style="width:190px" onchange="state.dashRole=this.value;rerender()">${Object.entries(DASH_ROLES).map(([k, v]) => `<option value="${k}" ${k === state.dashRole ? "selected" : ""}>Görünüm: ${v.label}</option>`).join("")}</select>${rangePicker()}`)}
  <div class="grid g4">${rangeKpis(r).map(([n, l, i, d]) => kpi(n, l, "", i, d)).join("")}</div>

  <div class="grid g-main mt">
    <div class="card"><div class="card-h"><h3>Aylık Satış</h3></div>
      <div class="mini-stats">
        <div><small>Ortalama aylık satış</small><b>$${(MONTHLY_SALES.reduce((s, [, v]) => s + v, 0) / MONTHLY_SALES.length).toFixed(1)}K</b></div>
        <div class="prod-cell">${thumb(P(TOP_SELLER.sku))}<div><small>En çok satan · Eylül</small><b>${P(TOP_SELLER.sku).name}</b><small>${num(TOP_SELLER.pcs)} pcs · $${num(TOP_SELLER.value)}</small></div></div>
      </div>
      ${barChart(MONTHLY_SALES, { fmt: (v) => "$" + Math.round(v) + "K" })}</div>
    <div class="card dark"><div class="card-h"><h3>Aksiyon Gerekli <span class="pill err plain" style="margin-left:6px">${total}</span></h3><a class="sub" href="#/admin/notifications">Tümü →</a></div>
      <ul class="act">${r.acts.map((x) => actRow(...x)).join("")}</ul>
    </div>
  </div>

  <div class="card mt"><div class="card-h"><h3>Sipariş Hattı</h3><a class="sub" href="#/admin/orders">Siparişlere git →</a></div>
    <div class="pipe">${[4, 2, 5, 7, 3, 18].map((n, i) => `<div class="pipe-col" onclick="state.filter.orders=${i};go('admin/orders')"><b>${n}</b><span>${STAGES[i]}</span><div class="bar ${i === 5 ? "ok" : ""}"><i style="width:${(n / 18) * 100}%"></i></div></div>`).join("")}</div>
  </div>

  <div class="grid g2 mt">
    <div class="card"><div class="card-h"><h3>En Çok Satan Ülkeler</h3><a class="sub" href="#/admin/reports">Rapor →</a></div>${hbars(COUNTRY_SALES.slice(0, 4), (v) => "$" + (v / 1000).toFixed(1) + "K")}</div>
    <div class="card"><div class="card-h"><h3>Stok / Forecast</h3></div>
      <div class="stat-row"><span>Düşük / tükenen SKU</span><b class="warn-t">${low}</b></div>
      <div class="stat-row"><span>Forecast girmeyen müşteri</span><b class="warn-t">13</b></div>
      <div class="between mt"><span class="muted">Ekim forecast tamamlanma</span><b>68%</b></div>
      <div class="bar" style="margin-top:8px"><i style="width:68%"></i></div>
    </div>
  </div>

  <div class="card mt"><div class="card-h"><h3>Son Siparişler</h3><a class="sub" href="#/admin/orders">Tümü →</a></div>${ordersTable(ORDERS.slice(0, 5))}</div>`;
};
function actRow(tone, icon, label, n, href) {
  const bg = { err: "var(--err-bg)", warn: "var(--warn-bg)", ok: "var(--ok-bg)", info: "var(--info-bg)", gold: "var(--accent-bg)", plain: "#efefec" }[tone];
  const col = { err: "var(--err)", warn: "var(--warn)", ok: "var(--ok)", info: "var(--info)", gold: "var(--accent)", plain: "#555" }[tone];
  return `<li onclick="go('${href}')"><span class="act-ic" style="background:${bg};color:${col}">${ic(icon)}</span><span class="act-t">${label}</span><span class="act-n">${n}</span></li>`;
}

function ordersTable(list, en) {
  if (!list.length) return `<div class="empty">Bu filtrede sipariş yok.</div>`;
  return `<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Sipariş</th>${en ? "" : "<th>Müşteri</th>"}<th>Tarih</th><th>Yükleme</th><th class="r">Tutar</th><th>${en ? "Payment" : "Ödeme"}</th><th>${en ? "Status" : "Durum"}</th></tr></thead><tbody>
  ${list.map((o) => { const c = C(o.cust), ps = payState(o); return `<tr class="click" onclick="go('${en ? "customer" : "admin"}/order/${o.no}')">
    <td class="mono strong">${o.no}</td>${en ? "" : `<td>${c.flag} ${c.name}</td>`}<td class="muted">${o.date}</td><td>${targetLabel(o.target)}</td>
    <td class="r strong">${money(orderTotal(o), o.currency)}</td><td><span class="pill ${ps[1]}">${en ? ps[0] : ps[2]}</span></td><td>${stagePill(o.stage, en)}${o.problem && !en ? ` <span class="pill err plain">Problem</span>` : ""}</td></tr>`; }).join("")}
  </tbody></table></div>`;
}

ADMIN.notifications = () => {
  const items = [
    ["err", "cart", "SO-2026-0148 satış incelemesi bekliyor", "ABC Distribution · $52,818 · 20' DC · Sorumlu: Ferhat", "admin/order/SO-2026-0148", "İncele"],
    ["err", "shield", "SO-2026-0147 final onay bekliyor", "Barber Supply Co. · 40' HC · Onaylayan: Gözde", "admin/order/SO-2026-0147", "Onayla"],
    ["warn", "clock", "Rezervasyon bugün doluyor — SO-2026-0145", "Otomatik release yok. Extend veya Release seçilmeli.", "admin/products/res", "Karar ver"],
    ["err", "factory", "Hazırlık problemi — SO-2026-0145", "BC-400-2: 103 koli gerekli, 101 bulundu (2 eksik)", "factory/prep/SO-2026-0145", "Aç"],
    ["err", "factory", "Hazırlık gecikmesi — SO-2026-0141", "BHS-750-M ve BM-007058 henüz hazırlanmadı", "factory/prep/SO-2026-0141", "Aç"],
    ["warn", "trend", "3 müşteri Ekim forecast girmedi", "Baltic Grooming, Riyadh Grooming, Kazakh Style", "admin/forecast", "Hatırlat"],
    ["warn", "file", "Free Sales Certificate 14 Ekim'de doluyor", "Tüm müşterilere görünür doküman", "admin/documents", "Güncelle"],
    ["gold", "users", "2 yeni B2B başvurusu", "Nordic Cuts AB (SE), Maison du Barbier (FR)", "admin/customers", "İncele"],
    ["info", "wallet", "Ödeme alındı — SO-2026-0146", "€10,000 · kalan bakiye var", "admin/finance", "Gör"],
  ];
  return `${head("Aksiyonlar", "", `<button class="btn" onclick="toast('Tümü okundu olarak işaretlendi')">${ic("check")} Tümünü okundu yap</button>`)}
  <div class="grid g-side"><div class="card"><ul class="act">
    ${items.map(([t, i, a, b, href, cta]) => `<li onclick="go('${href}')"><span class="act-ic" style="background:var(--${t === "gold" ? "accent" : t}-bg);color:var(--${t === "gold" ? "accent" : t})">${ic(i)}</span><span class="act-t"><b style="display:block;color:var(--text)">${a}</b><small class="muted">${b}</small></span><button class="btn sm">${cta}</button></li>`).join("")}
  </ul></div>
  <div class="card flat"><div class="card-h"><h3>Bildirim Kuralları</h3></div>
    ${["Yeni sipariş → Satış sorumlusu (mail + panel)", "Final onay → Export Manager", "Rezervasyon 3 gün / 1 gün / doldu → Satış + Final onaylayan", "Ödeme alındı / bekliyor → Finans + Satış", "Fabrika eksik / problem → Satış + Operasyon", "Forecast eksik → Müşteri (mail) + Satış", "Düşük stok → Operasyon", "Doküman süresi doluyor → Regülasyon", "Müşteri 60 gün pasif → Satış"].map((r) => `<div class="stat-row"><span style="color:var(--text)">${r}</span></div>`).join("")}
    
  </div></div>`;
};

// ——— Müşteriler ———
ADMIN.customers = () => {
  const f = state.filter.customers;
  const list = CUSTOMERS.filter((c) => f === "all" || (f === "pending" ? c.status === "Pending" : f === "active" ? c.status === "Active" : c.status.startsWith("Inactive")));
  const chip = (k, l) => `<button class="chip ${f === k ? "on" : ""}" onclick="state.filter.customers='${k}';rerender()">${l}</button>`;
  return `${head("Müşteriler", "", `<button class="btn">${ic("download")} Excel</button><button class="btn gold">${ic("plus")} Müşteri Ekle</button>`)}
  <div class="filters" style="margin-bottom:16px">${chip("all", "Tümü")}${chip("pending", `Onay Bekleyen (${CUSTOMERS.filter((c) => c.status === "Pending").length})`)}${chip("active", "Aktif")}${chip("inactive", "Pasif")}</div>
  <div class="card"><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Firma</th><th>Ülke</th><th>Tip</th><th>Satış Sorumlusu</th><th>Fiyat Seviyesi</th><th class="r">YTD Satış</th><th>Son Sipariş</th><th>Durum</th></tr></thead><tbody>
  ${list.map((c) => `<tr class="click" onclick="go('admin/${c.status === "Pending" ? "application" : "customer"}/${c.id}')">
    <td><b>${c.name}</b><br><small class="dim mono">${c.id}</small></td><td>${c.flag} ${c.country}</td><td class="muted">${c.type}</td><td>${c.sales || '<span class="dim">— atanmadı</span>'}</td><td>${c.status === "Pending" ? '<span class="dim">—</span>' : `Level ${levelOf(c.id)}`}</td>
    <td class="r strong">${c.ytd ? money(c.ytd) : "—"}</td><td class="muted">${c.applied ? "Başvuru: " + c.applied : c.lastOrder}</td>
    <td><span class="pill ${c.status === "Active" ? "ok" : c.status === "Pending" ? "gold" : "err"}">${c.status === "Pending" ? "Onay Bekliyor" : c.status === "Active" ? "Aktif" : "Pasif · 90 gün"}</span></td></tr>`).join("")}
  </tbody></table></div></div>`;
};

ADMIN.application = (id) => {
  const c = C(id);
  const opt = (arr, sel) => arr.map((a) => `<option value="${a}" ${a === sel ? "selected" : ""}>${a}</option>`).join("");
  return `${head(`Başvuru — ${c.name}`, "", `<button class="btn warn" onclick="toast('Ek bilgi talebi ${c.email} adresine gönderildi','send')">Bilgi İste</button><button class="btn danger" onclick="toast('Başvuru reddedildi','x')">Reddet</button><button class="btn ok" onclick="approveCustomer('${id}')">${ic("check")} Onayla</button>`, `<a href="#/admin/customers">Müşteriler</a> / Başvuru ${c.id}`)}
  <div class="grid g2">
    <div class="card"><div class="card-h"><h3>Başvuru Bilgileri</h3><span class="pill gold">Onay Bekliyor · ${c.applied}</span></div>
      <dl class="dl"><dt>Firma</dt><dd>${c.name}</dd><dt>Ülke / Şehir</dt><dd>${c.flag} ${c.country} · ${c.city}</dd><dt>Firma tipi</dt><dd>${c.type}</dd><dt>VAT</dt><dd class="mono">${c.vat}</dd><dt>Web sitesi</dt><dd>${c.website}</dd><dt>Instagram</dt><dd>${c.instagram || "—"}</dd><dt>Yasal onaylar</dt><dd>${c.consents ? `KVKK ✓ · Koşullar ✓ · Pazarlama ${c.consents.marketing ? "✓" : "✗"} <small class="muted">(v${c.consents.version} · ${fmtDate(c.consents.kvkk)})</small>` : '<span class="muted">Demo kayıt</span>'}</dd>
      <dt>İletişim</dt><dd>${c.contact} · ${c.position}</dd><dt>E-posta</dt><dd>${c.email}</dd><dt>WhatsApp / Tel</dt><dd>${c.phone}</dd><dt>İlgilendiği markalar</dt><dd>${c.brands}</dd></dl>
      <div class="notice info mt">${ic("info")}<span>Onaylanana kadar müşteri portalda fiyat ve stok göremez; sadece "Pending Approval" ekranını görür.</span></div>
    </div>
    <div class="card"><div class="card-h"><h3>Admin Ataması</h3></div>
      <div class="form cols2">
        <div class="field"><label>Satış Sorumlusu</label><select class="input" id="apSales"><option value="">— Seçilmezse Ferhat atanır</option>${opt(["Ferhat", "Gözde"])}</select></div>
        <div class="field"><label>Fiyat Seviyesi</label><select class="input" id="apList">${LEVELS.map((l) => `<option value="${l.id}" ${l.id === (c.level || 1) ? "selected" : ""}>${l.name}</option>`).join("")}</select></div>
        <div class="field span2"><label>İzinli Markalar</label><div class="checks">${["Marmara Barber", "Marmara", "Noir"].map((b) => `<label><input type="checkbox" ${c.brands.includes(b) ? "checked" : ""}>${b}</label>`).join("")}</div></div>
        <div class="field"><label>Ödeme Şartı</label><select class="input">${opt(["100% Advance", "30% Advance / 70% before loading", "LC at sight", "Net 30"])}</select></div>
        <div class="field"><label>Teslim Şartı (Incoterm)</label><select class="input">${opt(["EXW Düzce", "FOB Istanbul", "CIF", "DAP"])}</select></div>
        <div class="field"><label>Para Birimi</label><select class="input">${opt(["EUR", "USD"], c.currency)}</select></div>
        <div class="field"><label>Hesap Durumu</label><select class="input">${opt(["Onay sonrası aktif", "Beklemede"])}</select></div>
      </div>
    </div>
  </div>`;
};
function approveCustomer(id) {
  const c = C(id), level = Number($("#apList").value) || 1;
  Object.assign(c, { status: "Active", level, currency: levelCur(level), sales: $("#apSales").value || SETTINGS.defaultSales, payment: "100% Advance", incoterm: "EXW Düzce", lastOrder: "—" });
  authSyncCustomer(c);
  toast(`${c.name} onaylandı · ${c.sales} atandı · hoş geldin maili gönderildi`);
  go("admin/customer/" + id);
}

ADMIN.customer = (id) => {
  const c = C(id);
  const tab = state.tab.cust || "overview";
  const orders = ORDERS.filter((o) => o.cust === id);
  const tabs = [["overview", "Genel"], ["pricing", "Fiyatlar"], ["orders", "Siparişler"], ["finance", "Finans"], ["forecast", "Forecast"], ["docs", "Dokümanlar"], ["notes", "Notlar"]];
  let body = "";
  if (tab === "overview") body = `<div class="grid g2">
      <div class="card"><div class="card-h"><h3>Ticari Kurulum</h3><button class="btn sm">${ic("edit")} Düzenle</button></div>
        <dl class="dl"><dt>Satış sorumlusu</dt><dd>${c.sales}</dd><dt>Fiyat seviyesi</dt><dd><select class="input" style="height:34px" onchange="setCustLevel('${c.id}',this.value)">${LEVELS.map((l) => `<option value="${l.id}" ${l.id === levelOf(c.id) ? "selected" : ""}>${l.name}</option>`).join("")}</select></dd><dt>Para birimi</dt><dd>${levelCur(levelOf(c.id))}</dd><dt>İzinli markalar</dt><dd>${c.brands}</dd><dt>Ödeme şartı</dt><dd>${c.payment}</dd><dt>Teslim şartı</dt><dd>${c.incoterm}</dd><dt>Varsayılan banka</dt><dd>${c.currency} Bank A</dd><dt>İletişim</dt><dd>${c.contact} · ${c.email}</dd></dl></div>
      <div class="card flat"><div class="card-h"><h3>Müşteri Performansı</h3></div>
        <div class="grid g2"><div><div class="muted">YTD Satış</div><div class="big-num">${money(c.ytd)}</div></div><div><div class="muted">Açık Bakiye</div><div class="big-num ${c.balance ? "warn-t" : ""}">${money(c.balance, c.currency)}</div></div></div>
        <div class="divider"></div>
        <div class="stat-row"><span>Son sipariş</span><b>${c.lastOrder}</b></div><div class="stat-row"><span>Aktif sipariş</span><b>${orders.filter((o) => o.stage < 5).length}</b></div><div class="stat-row"><span>Ekim forecast</span><b>${c.forecast ? money(c.forecast) : '<span class="warn-t">Girilmedi</span>'}</b></div><div class="stat-row"><span>Forecast gerçekleşme (Q3)</span><b>82%</b></div>
      </div></div>
      <div class="card mt"><div class="card-h"><h3>Siparişler</h3></div>${ordersTable(orders)}</div>`;
  else if (tab === "orders") body = `<div class="card">${ordersTable(orders)}</div>`;
  else if (tab === "pricing") body = `<div class="card"><div class="card-h"><h3>Bu müşterinin fiyatları · ${LEVELS[levelOf(c.id) - 1].name}</h3></div>${pricingTable(levelOf(c.id))}</div>`;
  else if (tab === "finance") body = `<div class="card">${paymentsTable(orders)}</div>`;
  else if (tab === "forecast") body = `<div class="card"><div class="stat-row"><span>Ekim 2026</span><b>${c.forecast ? money(c.forecast) + " · High" : "Girilmedi"}</b></div><div class="stat-row"><span>Kasım 2026</span><b>$18,000 · Medium</b></div><div class="stat-row"><span>Aralık 2026</span><b>$30,000 · Low</b></div></div>`;
  else if (tab === "docs") body = `<div class="card">${docsTable(false, c)}</div>`;
  else body = `<div class="card"><ul class="tl"><li>Fuar görüşmesi: 2027 için 40' konteyner hedefi konuşuldu.<small>Ferhat · 14 Sep 2026</small></li><li>Almanya'da Noir EDP talebi yüksek, katalog istendi.<small>Ferhat · 02 Sep 2026</small></li><li>Hesap açıldı.<small>Sistem · 11 Jan 2025</small></li></ul><textarea class="input mt" placeholder="Not ekle…"></textarea></div>`;
  return `${head(`${c.flag} ${c.name}`, `${c.country} · ${c.type} · ${c.id}`, `<span class="pill ok">Aktif</span><button class="btn" onclick="go('customer/dashboard')">${ic("user")} Müşteri gözünden gör</button><button class="btn gold" onclick="go('admin/order/SO-2026-0148')">${ic("plus")} Sipariş Oluştur</button>`, `<a href="#/admin/customers">Müşteriler</a> / ${c.id}`)}
  <div class="tabs">${tabs.map(([k, l]) => `<button class="${tab === k ? "on" : ""}" onclick="state.tab.cust='${k}';rerender()">${l}</button>`).join("")}</div>${body}`;
};

// ——— Siparişler ———
ADMIN.orders = () => {
  const f = state.filter.orders;
  const list = ORDERS.filter((o) => f < 0 || o.stage === f);
  return `${head("Siparişler", "", `<button class="btn">${ic("download")} Excel</button><button class="btn gold" onclick="go('customer/products')">${ic("plus")} Müşteri adına sipariş</button>`)}
  <div class="filters" style="margin-bottom:16px"><button class="chip ${f < 0 ? "on" : ""}" onclick="state.filter.orders=-1;rerender()">Tümü (${ORDERS.length})</button>
  ${STAGES.map((s, i) => `<button class="chip ${f === i ? "on" : ""}" onclick="state.filter.orders=${i};rerender()">${s} (${ORDERS.filter((o) => o.stage === i).length})</button>`).join("")}</div>
  <div class="card">${ordersTable(list)}</div>`;
};

ADMIN.order = (no) => {
  const o = O(no), c = C(o.cust), total = orderTotal(o), L = loadCalc(o.items, o.target), ps = payState(o);
  const editable = o.stage < 5;
  const logs = state.logs[no] || [["" + o.date, "Sipariş oluşturuldu"], ["" + o.date, "Stok ve yükleme doğrulaması geçti"]];
  let action = "";
  if (o.stage === 0) action = `<div class="card-h"><h3>Satış İncelemesi</h3><span class="pill gold">Ferhat</span></div>
    <div class="field"><label>Stock Reservation Until</label><input class="input" type="date" id="resDate" value="2026-10-14"></div>
    
    <button class="btn gold block lg" onclick="advance('${no}')">Final Onaya Gönder</button>`;
  else if (o.stage === 1) action = `<div class="card-h"><h3>Final Onay</h3><span class="pill warn">Gözde</span></div>
    <div class="field"><label>Stock Reservation Until</label><input class="input" type="date" id="resDate" value="${isoDate(o.reserveUntil)}"></div><div class="stat-row mt"><span>Stok kontrolü</span><b class="ok-t">Yeterli ✓</b></div><div class="stat-row"><span>Yükleme</span><b class="${L.complete ? "ok-t" : "warn-t"}">${L.complete ? "Complete ✓" : "Incomplete"}</b></div>
    <button class="btn ok block lg mt" onclick="advance('${no}')">Onayla · Stok Rezerve Et · Proforma Oluştur</button>
    <button class="btn ghost block mt" onclick="advance('${no}',-1)">Satışa geri gönder</button>`;
  else if (o.stage === 2) action = `<div class="card-h"><h3>Ödeme</h3><span class="pill ${ps[1]}">${ps[2]}</span></div>
    <div class="stat-row"><span>Proforma</span><b>PI-${no.slice(3)} / Rev.1</b></div><div class="stat-row"><span>Alınan</span><b>${money(o.paid, o.currency)}</b></div><div class="stat-row"><span>Bakiye</span><b class="warn-t">${money(total - o.paid, o.currency)}</b></div>
    <button class="btn gold block mt" onclick="go('admin/finance')">${ic("wallet")} Ödeme Ekle</button>
    <button class="btn danger block mt" onclick="advance('${no}');toast('Ödemesiz serbest bırakıldı — kritik yetki, audit log’a yazıldı','shield')">Ödemesiz Serbest Bırak</button>`;
  else if (o.stage === 3) action = `<div class="card-h"><h3>Fabrikada</h3><span class="pill info">Hazırlanıyor</span></div>
    ${o.problem ? `<div class="notice err">${ic("alert")}<span><b>Hazırlık problemi:</b> BC-400-2 için 103 koli gerekli, 101 bulundu. Müşteriye otomatik gösterilmez.</span></div>` : ""}
    <div class="stat-row"><span>Rezervasyon bitişi</span><b class="${o.problem ? "err-t" : ""}">${o.reserveUntil}</b></div>
    <div class="row mt"><button class="btn sm" onclick="toast('Rezervasyon 7 gün uzatıldı')">Extend</button><button class="btn sm danger" onclick="toast('Rezervasyon serbest bırakıldı','alert')">Release</button></div>
    <button class="btn block mt" onclick="go('factory/prep/${no}')">${ic("factory")} Hazırlık ekranını aç</button>`;
  else if (o.stage === 4) action = `<div class="card-h"><h3>Sevke Hazır</h3><span class="pill ok">Final packing onaylı</span></div><button class="btn gold block lg" onclick="go('admin/shipments')">${ic("truck")} Sevkiyatı kapat</button>`;
  else action = `<div class="card-h"><h3>Sevk Edildi</h3><span class="pill plain">Tamamlandı</span></div><div class="stat-row"><span>Forwarder</span><b>ABC Logistics</b></div><div class="stat-row"><span>Referans</span><b class="mono">BK-12345</b></div><div class="stat-row"><span>Konteyner</span><b class="mono">TCLU 482113-7</b></div>`;

  return `${head(`${no}`, `${c.flag} ${c.name} · ${money(total, o.currency)} · ${targetLabel(o.target)}`, `${stagePill(o.stage)}${docButtons(o)}<button class="btn" onclick="go('admin/loading/${no}')">${ic("container")} Yükleme Planı</button>`, `<a href="#/admin/orders">Siparişler</a> / ${no}`)}
  <div class="card">${stepper(o.stage, STAGES)}</div>
  <div class="grid g-side mt">
    <div>
      ${o.note || o.po ? `<div class="card note-card"><div class="card-h"><h3>${ic("edit")} Müşteri Notu</h3>${o.po ? `<span class="pill plain">PO: ${o.po}</span>` : ""}</div>${o.note ? `<p class="notranslate">${o.note.replace(/</g, "&lt;")}</p>` : ""}</div>` : ""}
      <div class="card ${o.note || o.po ? "mt" : ""}"><div class="card-h"><h3>Sipariş Kalemleri</h3></div>
        <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Ürün</th><th class="c">Koli</th><th class="r">Adet</th><th class="r">Birim</th><th class="r">Toplam</th></tr></thead><tbody>
        ${o.items.map(([sku, b, pr], i) => { const p = P(sku), up = pr ?? orderPrice(o, p), sh = o.shipped?.[sku]; return `<tr><td><div class="prod-cell">${thumb(p)}<div><b>${p.name}</b><br><small class="mono">${sku}</small>${sh != null && sh < b ? ` <span class="pill warn">${sh} / ${b}</span>` : ""}</div></div></td>
          <td class="c">${editable ? `<input class="input num-in" type="number" min="0" value="${b}" onchange="reviseItem('${no}',${i},this.value)">` : b}</td>
          <td class="r muted">${num(b * p.pcsBox)}</td>
          <td class="r">${editable ? `<div class="price-in"><span>${sym(o.currency)}</span><input class="input num-in" type="number" min="0" step="0.01" value="${up.toFixed(2)}" onchange="revisePrice('${no}',${i},this.value)"></div>` : `<span class="muted">${money(up, o.currency, 2)}</span>`}${pr != null ? `<br><small class="gold-t">${money(orderPrice(o, p), o.currency, 2)} liste</small>` : ""}</td>
          <td class="r strong">${money(lineTotal(sku, b, orderLevel(o), pr), o.currency)}</td></tr>`; }).join("")}
        <tr><td colspan="4" class="r muted">Toplam · ${num(L.boxes)} koli · ${num(L.pcs)} adet</td><td class="r strong" style="font:600 18px var(--display)">${money(total, o.currency)}</td></tr>
        </tbody></table></div></div>

      <div class="card mt"><div class="card-h"><h3>Yükleme Planı</h3><span class="pill ${L.complete ? "ok" : "warn"}">${L.complete ? "COMPLETE" : "INCOMPLETE"}</span></div>
        <div class="grid g2"><div>${palletVisual(L, true)}${skuLegend(o.items)}</div><div>${o.target === "pallet" ? `<div class="stat-row"><span>Palet</span><b>${L.pallets.length}</b></div><div class="stat-row"><span>Brüt ağırlık</span><b>${num(L.kg)} kg</b></div>` : containerStats(L)}</div></div>
      </div>

      <div class="card mt"><div class="card-h"><h3>Aktivite Log</h3></div><ul class="tl">${logs.slice().reverse().map(([d, m]) => `<li>${m}<small>${d}</small></li>`).join("")}</ul></div>
    </div>
    <div>
      <div class="card">${action}</div>
      <div class="card mt"><div class="card-h"><h3>Ticari Şartlar</h3></div>
        <div class="stat-row"><span>Teslim</span><b>${c.incoterm}</b></div><div class="stat-row"><span>Ödeme</span><b>${c.payment}</b></div><div class="stat-row"><span>Fiyat seviyesi</span><select class="input" style="height:32px;width:auto;max-width:210px" ${o.stage >= 5 ? "disabled" : ""} onchange="setOrderLevel('${o.no}',this.value)">${LEVELS.map((l) => `<option value="${l.id}" ${l.id === orderLevel(o) ? "selected" : ""}>${l.name}</option>`).join("")}</select></div><div class="stat-row"><span>Para birimi</span><b>${o.currency}</b></div><div class="stat-row"><span>Banka</span><b>${o.currency} Bank A</b></div><div class="stat-row"><span>Adres</span><b>${c.city} Warehouse</b></div></div>
    </div>
  </div>`;
};
function advance(no, dir = 1) {
  const o = O(no);
  if (o.stage <= 1 && dir > 0) { const d = $("#resDate")?.value; o.reserveUntil = d ? fmtDate(d) : o.reserveUntil || "14 Oct 2026"; }
  o.stage = Math.max(0, Math.min(5, o.stage + dir));
  const msg = ["", "Final onaya gönderildi (Gözde'ye bildirim)", `Final onay verildi · stok ${o.reserveUntil} tarihine kadar rezerve · PI oluşturuldu`, "", "", ""][o.stage] || `Durum: ${STAGES[o.stage]}`;
  log(no, dir < 0 ? "Satışa geri gönderildi" : msg || `Durum: ${STAGES[o.stage]}`);
  toast(dir < 0 ? "Satışa geri gönderildi" : msg || STAGES[o.stage]);
  rerender();
}
function reviseItem(no, i, v) {
  const o = O(no), before = o.items[i][1];
  o.items[i][1] = Math.max(0, parseInt(v) || 0);
  log(no, `Admin revize: ${o.items[i][0]} ${before} → ${o.items[i][1]} koli · yükleme yeniden hesaplandı${o.stage >= 2 ? " · proforma yeni revizyon" : ""}`);
  toast(o.stage >= 2 ? "Revize kaydedildi · proforma yeni revizyona düştü" : "Revize kaydedildi · palet/konteyner yeniden hesaplandı", "refresh");
  rerender();
}
function revisePrice(no, i, v) {
  const o = O(no), it = o.items[i], p = P(it[0]), before = it[2] ?? orderPrice(o, p);
  const n = Math.max(0, Math.round((parseFloat(v) || 0) * 100) / 100);
  it[2] = Math.abs(n - orderPrice(o, p)) < 0.005 ? undefined : n;
  log(no, `Admin fiyat revizesi: ${it[0]} ${money(before, o.currency, 2)} → ${money(n, o.currency, 2)}${o.stage >= 2 ? " · proforma yeni revizyon" : ""}`);
  toast(o.stage >= 2 ? "Fiyat güncellendi · proforma yeni revizyona düştü" : "Fiyat güncellendi", "refresh");
  rerender();
}

// ——— Dokümanlar: siparişin güncel hâlinden oluşur, yazdırılır / PDF kaydedilir ———
const DOCS = { pi: "Proforma Invoice", pl: "Packing List", ci: "Commercial Invoice" };
function docButtons(o) {
  return `<div class="doc-btns">${Object.entries(DOCS).map(([k, d]) => { const ok = k !== "ci" || o.stage >= 5; return `<button class="btn" ${ok ? `onclick="openDoc('${o.no}','${k}')"` : "disabled"}>${ic("file")} ${k === "pi" ? "Proforma" : d}</button>`; }).join("")}</div>`;
}
function docHtml(no, type) {
  const o = O(no), c = C(o.cust), cur = o.currency, final = type !== "pi" && o.shipped;
  const rows = o.items.map(([sku, b, pr]) => { const p = P(sku), q = final ? o.shipped[sku] ?? b : b, up = pr ?? orderPrice(o, p); return { p, q, up, pcs: q * p.pcsBox, net: q * p.kg * 0.86, gross: q * p.kg, cbm: (q * p.dims[0] * p.dims[1] * p.dims[2]) / 1e6 }; });
  const L = loadCalc(rows.map((r) => [r.p.sku, r.q]), o.target);
  const sum = (f) => rows.reduce((s, r) => s + r[f], 0);
  const total = rows.reduce((s, r) => s + r.q * r.p.pcsBox * r.up, 0);
  const draft = (type === "pi" && o.stage < 2) || (type === "pl" && o.stage < 4);
  const head = type === "pl" ? "<th>SKU</th><th>Product</th><th>HS</th><th class=r>Boxes</th><th class=r>Pcs</th><th class=r>Net kg</th><th class=r>Gross kg</th><th class=r>CBM</th>" : "<th>SKU</th><th>Product</th><th>HS</th><th class=r>Boxes</th><th class=r>Pcs</th><th class=r>Unit</th><th class=r>Amount</th>";
  const body = rows.map((r) => type === "pl"
    ? `<tr><td>${r.p.sku}</td><td>${r.p.name}</td><td>${r.p.hs}</td><td class=r>${r.q}</td><td class=r>${num(r.pcs)}</td><td class=r>${r.net.toFixed(1)}</td><td class=r>${r.gross.toFixed(1)}</td><td class=r>${r.cbm.toFixed(3)}</td></tr>`
    : `<tr><td>${r.p.sku}</td><td>${r.p.name}</td><td>${r.p.hs}</td><td class=r>${r.q}</td><td class=r>${num(r.pcs)}</td><td class=r>${money(r.up, cur, 2)}</td><td class=r>${money(r.q * r.p.pcsBox * r.up, cur, 2)}</td></tr>`).join("");
  const foot = type === "pl"
    ? `<tr><td colspan=3><b>TOTAL</b> · ${L.pallets.length} pallets${L.looseBoxes ? ` + ${L.looseBoxes} loose boxes` : ""}</td><td class=r><b>${num(sum("q"))}</b></td><td class=r><b>${num(sum("pcs"))}</b></td><td class=r><b>${sum("net").toFixed(1)}</b></td><td class=r><b>${(sum("gross") + L.pallets.length * 25).toFixed(1)}</b></td><td class=r><b>${sum("cbm").toFixed(2)}</b></td></tr>`
    : `<tr><td colspan=6 class=r><b>TOTAL ${cur}</b></td><td class=r><b>${money(total, cur, 2)}</b></td></tr>`;
  const pallets = type === "pl" ? `<h3>Pallets</h3><table><tr><th>Pallet</th><th>Contents</th><th class=r>Height</th><th class=r>Gross kg</th></tr>${L.pallets.map((p, i) => `<tr><td>${i + 1}</td><td>${[...new Set(p.segs.map((s) => s.sku))].join(", ")}</td><td class=r>${p.h} cm</td><td class=r>${num(p.kg)}</td></tr>`).join("")}</table>` : "";
  const bank = type !== "pl" ? `<div class=box><b>Bank details — ${cur}</b><br>Bank A · ${cur} Account · IBAN TR12 0001 2345 6789 0000 000${cur === "EUR" ? 2 : 1} · SWIFT TGBATRIS</div>` : "";
  return `<!doctype html><html><head><meta charset=utf-8><title>${DOCS[type]} ${no}</title><style>
    body{font:13px/1.5 Inter,Arial,sans-serif;color:#111;margin:40px}h1{font-size:22px;margin:0}h3{margin:24px 0 8px}
    .top{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:2px solid #111;padding-bottom:14px}
    .grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin:18px 0}.box{border:1px solid #ddd;border-radius:8px;padding:12px;margin-top:16px}
    table{width:100%;border-collapse:collapse}th,td{border-bottom:1px solid #e5e5e5;padding:7px 6px;text-align:left}th{font-size:11px;text-transform:uppercase;color:#666}.r{text-align:right}
    .draft{display:inline-block;background:#fff3d6;color:#7a5200;border:1px solid #e8c26f;border-radius:99px;padding:2px 10px;font-size:11px;font-weight:700;margin-top:6px}
    .print{position:fixed;bottom:20px;right:20px;padding:10px 16px;border:0;border-radius:8px;background:#000;color:#fff;font-weight:600;cursor:pointer}@media print{.print{display:none}body{margin:16mm}}
    </style></head><body><button class=print onclick="print()">Print / Save PDF</button>
    <div class=top><div><b style="font-size:16px;letter-spacing:.08em">SENSO COSMETICS</b><br><small>Düzce, Türkiye</small></div>
    <div style="text-align:right"><h1>${DOCS[type]}</h1>${type === "pi" ? `PI-${no.slice(3)}` : type === "pl" ? `PL-${no.slice(3)}` : `CI-${no.slice(3)}`} · ${no}<br>${fmtDate(TODAY)}${draft ? "<br><span class=draft>DRAFT — current order data</span>" : ""}</div></div>
    <div class=grid><div><small>BUYER</small><br><b>${c.name}</b><br>${c.city}, ${c.country}<br>VAT ${c.vat}${o.po ? `<br>PO ${o.po}` : ""}</div>
    <div><small>TERMS</small><br>Incoterm: <b>${c.incoterm}</b><br>Payment: <b>${c.payment}</b><br>Loading: <b>${targetLabel(o.target)}</b><br>Origin: Türkiye</div></div>
    <table><tr>${head}</tr>${body}${foot}</table>${pallets}${bank}</body></html>`;
}
function openDoc(no, type) {
  const w = window.open("", "_blank");
  if (!w) { toast("Açılır pencere engellendi — tarayıcıda izin verin", "alert"); return; }
  w.document.write(docHtml(no, type)); w.document.close();
}

// ——— Fiyatlandırma ———
function pricingTable(lvl) {
  const list = PRODUCTS.filter((p) => (state.filter.pcat || "all") === "all" || p.cat === state.filter.pcat).filter((p) => !state.filter.pq || srchHit(prodText(p), state.filter.pq));
  const cols = lvl ? [lvl] : LEVELS.map((l) => l.id);
  return `<div class="tbl-wrap"><table class="tbl price-tbl"><thead><tr><th>Ürün</th><th class="r">Koli</th>${cols.map((i) => `<th class="r">${LEVELS[i - 1].name.replace(" · ", "<br><small>")}</small></th>`).join("")}</tr></thead><tbody>
  ${list.map((p) => `<tr><td><div class="prod-cell">${thumb(p)}<div><b>${p.name}</b><br><small class="mono">${p.sku}</small></div></div></td><td class="r muted">${p.pcsBox}</td>${cols.map((i) => `<td class="r ${i === 1 ? "strong" : ""}">${p.prices[i - 1] != null ? money(p.prices[i - 1], levelCur(i), 2) : '<span class="dim">—</span>'}</td>`).join("")}</tr>`).join("")}
  </tbody></table></div>`;
}
ADMIN.pricing = () => {
  const cats = [...new Set(PRODUCTS.map((p) => p.cat))];
  return `${head("Fiyatlandırma", `${PRODUCTS.length} ürün · ${LEVELS.length} fiyat seviyesi`, `<button class="btn">${ic("upload")} Excel İçe Aktar</button><button class="btn">${ic("download")} Dışa Aktar</button>`)}
  <div class="level-cards">${LEVELS.map((l) => `<div class="card level-card"><small>Level ${l.id}</small><b>${l.name.split(" · ")[1]}</b><span>${CUSTOMERS.filter((c) => c.status !== "Pending" && levelOf(c.id) === l.id).length} müşteri · ${l.cur}</span></div>`).join("")}</div>
  <div class="card flat mt" style="margin-bottom:18px"><div class="filters">
    <select onchange="state.filter.pcat=this.value;rerender()"><option value="all">Tüm Kategoriler</option>${cats.map((c) => `<option value="${c}" ${state.filter.pcat === c ? "selected" : ""}>${c}</option>`).join("")}</select>
    <div class="search" style="width:280px;height:38px"><span>${ic("search")}</span><input value="${state.filter.pq || ""}" placeholder="Ürün, SKU veya kelime…" onchange="state.filter.pq=this.value;rerender()"></div></div></div>
  <div class="card">${pricingTable(0)}</div>
  <div class="notice gold mt">${ic("info")}<span>Yeni müşteri Level 1 (liste fiyatı) ile başlar. Seviyeyi admin atar; müşteri sadece kendi fiyatını görür, seviye adını görmez.</span></div>`;
};
function setCustLevel(id, v) {
  const c = C(id), l = Number(v); c.level = l; c.currency = levelCur(l); authSyncCustomer(c);
  ORDERS.filter((o) => o.cust === id && o.level == null).forEach(syncOrder);
  toast(`${c.name} → ${LEVELS[l - 1].name}`, "tag"); rerender();
}
function setOrderLevel(no, v) {
  const o = O(no), before = orderLevel(o); o.level = Number(v); syncOrder(o);
  log(no, `Fiyat seviyesi değişti: ${LEVELS[before - 1].name} → ${LEVELS[o.level - 1].name}${o.stage >= 2 ? " · proforma yeni revizyon" : ""}`);
  toast(`Sipariş ${LEVELS[o.level - 1].name} ile yeniden fiyatlandı`, "refresh"); rerender();
}

// ——— Forecast ———
ADMIN.forecast = () => {
  const fc = [["C-1021", 25000, "High", 92], ["C-1017", 48000, "High", 88], ["C-1031", 30000, "Medium", 74], ["C-1004", 12000, "High", 95], ["C-1009", 0, "", 0], ["C-1012", 0, "", 0], ["C-1002", 0, "", 0]];
  const prod = [["BW-20-SKL", 500], ["BC-400-2", 350], ["BW-150-MAT-1018", 420], ["BSS-200 - PS", 400], ["BW-150-GUM", 300], ["BSG-1000-77", 260], ["BHG-500-34", 180]];
  return `${head("Forecast", "", `<select class="input" style="width:160px"><option>Ekim 2026</option><option>Kasım 2026</option></select>`)}
  <div class="grid g4">${kpi("$520,000", "Beklenen Satış", "Ekim 2026", "trend")}${kpi("$340,000", "Yüksek Olasılık", "High probability", "check")}${kpi("28 / 41", "Forecast Giren", "13 müşteri eksik", "users")}${kpi("68%", "Tamamlanma", "Hedef: %90", "chart")}</div>
  <div class="grid g2 mt">
    <div class="card"><div class="card-h"><h3>Satış Forecast — Müşteri</h3><button class="btn sm gold" onclick="toast('13 müşteriye hatırlatma maili gönderildi','send')">${ic("send")} Eksiklere hatırlat</button></div>
      <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Müşteri</th><th>Ülke / Bölge</th><th class="r">Değer</th><th>Olasılık</th><th class="r">Gerçekleşme (Q3)</th></tr></thead><tbody>
      ${fc.map(([id, v, pr, r]) => { const c = C(id); return `<tr><td>${c.name}</td><td class="muted">${c.flag} ${c.country} · ${REGION[c.country]}</td><td class="r strong">${v ? money(v) : '<span class="warn-t">Eksik</span>'}</td><td>${pr ? `<span class="pill ${pr === "High" ? "ok" : "warn"}">${pr}</span>` : "—"}</td><td class="r">${r ? r + "%" : "—"}</td></tr>`; }).join("")}
      </tbody></table></div></div>
    <div class="card"><div class="card-h"><h3>Üretim Forecast — SKU</h3><button class="btn sm" onclick="toast('Üretim forecast Excel olarak indirildi','download')">${ic("download")} Excel</button></div>
      <div class="tbl-wrap"><table class="tbl"><thead><tr><th>SKU</th><th class="r">Forecast</th><th class="r">Müsait</th><th>Durum</th></tr></thead><tbody>
      ${prod.map(([sku, bx]) => { const p = P(sku), need = bx * p.pcsBox, a = avail(p), gap = need - a; return `<tr><td><div class="prod-cell">${thumb(p)}<div><b>${sku}</b><br><small class="muted">${p.name}</small></div></div></td><td class="r">${num(bx)} koli<br><small class="muted">${num(need)} pcs</small></td><td class="r">${num(a)} pcs</td><td>${gap > 0 ? `<span class="pill err">Üretim ihtiyacı ${num(gap)} pcs</span>` : `<span class="pill ok">Yeterli</span>`}</td></tr>`; }).join("")}
      </tbody></table></div></div>
  </div>`;
};

// ——— Ürünler & Stok ———
ADMIN.products = (arg) => {
  if (arg) state.prodTab = arg;
  const low = PRODUCTS.filter((p) => stockState(p) === "low").length, out = PRODUCTS.filter((p) => stockState(p) === "out").length;
  return `${head("Ürünler & Stok", "", `<button class="btn" onclick="toast('Drive stok dosyası okundu · 16 SKU Physical Stock güncellendi · rezervasyonlar korunuyor','refresh')">${ic("refresh")} Stok Import (Drive)</button><button class="btn" onclick="bulkImport()">${ic("upload")} Toplu İçe Aktar</button><button class="btn" onclick="toast('Ürün master Excel olarak indirildi','download')">${ic("download")} Dışa Aktar</button><button class="btn gold">${ic("plus")} Yeni SKU</button>`)}
  <div class="grid g4">${kpi(PRODUCTS.length, "Aktif SKU", "3 marka · 7 kategori", "box")}${kpi(low, "Düşük Stok", "Eşik altında", "alert")}${kpi(out, "Stok Yok", "Portalda sipariş kapalı", "x")}${kpi("08:00", "Son Stok Import", "Bugün · Google Drive", "refresh")}</div>
  <div class="card mt"><div class="grid g3" style="align-items:center;text-align:center">
    <div><b>Google Drive / Excel</b><br><small class="muted">Physical Stock</small></div>
    <div><span class="gold-t">→</span> <b>B2B Stok Motoru</b> <span class="gold-t">→</span><br><small class="muted">Physical − Reserved = Available</small></div>
    <div><b>Müşteri Portalı</b><br><small class="muted">In Stock / Low / Out — adet gösterilmez</small></div></div></div>
  <div class="tabs mt" style="margin-top:22px"><button class="${state.prodTab === "list" ? "on" : ""}" onclick="state.prodTab='list';rerender()">Ürün Listesi</button><button class="${state.prodTab === "res" ? "on" : ""}" onclick="state.prodTab='res';rerender()">Rezervasyonlar</button></div>
  ${state.prodTab === "res" ? reservationsCard() : `<div class="card"><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Ürün</th><th>Marka / Kategori</th><th class="r">Physical</th><th class="r">Reserved</th><th class="r">Available</th><th class="r">Sipariş edilebilir</th><th>Stok</th><th>Veri</th></tr></thead><tbody>
  ${PRODUCTS.map((p) => `<tr class="click" onclick="go('admin/product/${p.sku}')"><td><div class="prod-cell">${thumb(p)}<div><b>${p.name}</b><br><small class="mono">${p.sku}</small></div></div></td><td class="muted">${p.brand}<br><small>${p.cat}</small></td>
    <td class="r">${num(p.physical)}</td><td class="r warn-t">${num(p.reserved)}</td><td class="r strong">${num(avail(p))}</td><td class="r">${num(availBoxes(p))} koli</td><td>${stockPill(p)}</td><td>${p.est ? '<span class="pill warn plain">Lojistik tahmini</span>' : '<span class="pill ok plain">Order Ready</span>'}</td></tr>`).join("")}
  </tbody></table></div></div>`}`;
};
function reservationsCard() {
  const list = ORDERS.filter((o) => o.stage >= 1 && o.stage <= 4 && o.reserveUntil);
  return `<div class="card"><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Sipariş</th><th>Müşteri</th><th class="r">Rezerve</th><th>Bitiş</th><th>Durum</th><th class="r"></th></tr></thead><tbody>
  ${list.map((o) => { const d = daysLeft(o.reserveUntil), pcs = o.items.reduce((s, [k, b]) => s + b * P(k).pcsBox, 0);
    const pill = d < 0 ? '<span class="pill err">Süresi doldu</span>' : d <= 3 ? `<span class="pill warn">${d === 0 ? "Bugün doluyor" : d + " gün kaldı"}</span>` : `<span class="pill ok">${d} gün</span>`;
    return `<tr><td class="mono strong">${o.no}</td><td>${C(o.cust).flag} ${C(o.cust).name}</td><td class="r">${num(pcs)} pcs</td><td>${o.reserveUntil}</td><td>${pill}</td>
    <td class="r"><div class="row" style="justify-content:flex-end"><button class="btn sm" onclick="extendRes('${o.no}')">+7 gün</button><button class="btn sm danger" onclick="releaseRes('${o.no}')">Release</button></div></td></tr>`; }).join("")}
  </tbody></table></div></div>`;
}
function extendRes(no) { const o = O(no), d = new Date(o.reserveUntil + " 12:00"); d.setDate(d.getDate() + 7); o.reserveUntil = fmtDate(d); log(no, `Rezervasyon ${o.reserveUntil} tarihine uzatıldı`); toast(`${no} rezervasyonu ${o.reserveUntil} tarihine uzatıldı`); rerender(); }
function releaseRes(no) { const o = O(no); o.reserveUntil = ""; log(no, "Rezervasyon serbest bırakıldı (yetkili)"); toast(`${no} stoğu serbest bırakıldı · audit log'a yazıldı`, "alert"); rerender(); }
function bulkImport() {
  const rows = [["BW-20-SKL", "Fiyat (Europe)", "€1.01", "€1.05", true], ["BW-150-MAT-1018", "Koli ölçüsü", "34×24×12", "34×24×13", true], ["BBO-50-TV", "pcs / koli", "36", "48", true], ["NEW-01", "Yeni SKU", "—", "Beard Balm 50 ml", false, "Ağırlık ve ölçü eksik"], ["BCP–PROB", "EAN", "—", "86906051300", false, "EAN 13 hane olmalı"]];
  modal(`<h2>Toplu İçe Aktar</h2><p class="muted">urun_master_2026-09.xlsx · önizleme</p>
  <div class="tbl-wrap" style="margin:0"><table class="tbl"><thead><tr><th>SKU</th><th>Alan</th><th>Eski</th><th>Yeni</th><th>Doğrulama</th></tr></thead><tbody>
  ${rows.map(([s, f, o, n, ok, e]) => `<tr><td class="mono">${s}</td><td>${f}</td><td class="muted">${o}</td><td class="strong">${n}</td><td>${ok ? '<span class="pill ok">Geçerli</span>' : `<span class="pill err">${e}</span>`}</td></tr>`).join("")}
  </tbody></table></div>
  <div class="m-actions"><button class="btn" onclick="closeModal()">Vazgeç</button><button class="btn gold" onclick="closeModal();toast('3 satır içe aktarıldı · 2 hatalı satır atlandı · değişiklikler history’ye yazıldı')">3 geçerli satırı aktar</button></div>`);
}
ADMIN.product = (sku) => {
  const p = P(sku), bv = (p.dims[0] * p.dims[1] * p.dims[2]) / 1e6;
  const res = ORDERS.filter((o) => o.stage >= 2 && o.stage <= 4 && o.items.some(([s]) => s === sku));
  return `${head(p.name, `${p.sku} · ${p.brand} · ${p.cat}`, `${stockPill(p)}<button class="btn gold">${ic("edit")} Düzenle</button>`, `<a href="#/admin/products">Ürünler</a> / ${p.sku}`)}
  <div class="grid g4">
    <div class="card" style="padding:0;overflow:hidden;background:#f3f3f1;display:grid;place-items:center;min-height:240px">${p.img ? `<img src="${imgSrc(p.img)}" style="max-width:70%;max-height:220px">` : noImg(p)}</div>
    <div class="card"><div class="card-h"><h3>Genel</h3></div><dl class="dl" style="grid-template-columns:90px 1fr"><dt>SKU</dt><dd class="mono">${p.sku}</dd><dt>EAN</dt><dd class="mono">${p.ean}</dd><dt>Marka</dt><dd>${p.brand}</dd><dt>Kategori</dt><dd>${p.cat}</dd><dt>Varyant</dt><dd>${pxVariant(p)}</dd><dt>Durum</dt><dd>Aktif</dd></dl></div>
    <div class="card"><div class="card-h"><h3>Paketleme & Lojistik</h3></div><dl class="dl" style="grid-template-columns:110px 1fr"><dt>pcs / koli</dt><dd>${p.pcsBox}</dd><dt>Koli L×W×H</dt><dd>${p.dims.join(" × ")} cm</dd><dt>Koli CBM</dt><dd>${bv.toFixed(4)} m³</dd><dt>Net / Brüt</dt><dd>${(p.kg * 0.86).toFixed(1)} / ${p.kg} kg</dd><dt>Sınıf</dt><dd>${p.cls}</dd><dt>İstif</dt><dd>${pxStack(p)}</dd><dt>Yön</dt><dd>${pxOrient(p)}</dd><dt>Loose loading</dt><dd class="${p.loose ? "ok-t" : "muted"}">${p.loose ? "Allowed" : "Not allowed"}</dd><dt>Düşük stok eşiği</dt><dd>${num(p.low)} pcs</dd></dl></div>
    <div class="card"><div class="card-h"><h3>Ticaret / Uyum</h3></div><dl class="dl" style="grid-template-columns:90px 1fr"><dt>HS / GTİP</dt><dd class="mono">${p.hs}</dd><dt>Menşe</dt><dd>${p.origin}</dd><dt>DG / UN</dt><dd>${p.dg}</dd><dt>IMDG</dt><dd>${pxImdg(p)}</dd><dt>Flash point</dt><dd>${pxFlash(p)}</dd><dt>Doküman</dt><dd>${DOCUMENTS.filter((d) => d.sku === p.sku || d.sku === "All").length} adet</dd></dl></div>
  </div>
  <div class="grid g3 mt">
    <div class="card"><div class="card-h"><h3>Stok</h3></div>
      <div class="grid g3"><div class="card flat"><div class="muted">Physical</div><div class="big-num">${num(p.physical)}</div></div><div class="card flat"><div class="muted">Reserved</div><div class="big-num warn-t">${num(p.reserved)}</div></div><div class="card flat"><div class="muted">Available</div><div class="big-num ok-t">${num(avail(p))}</div></div></div>
      <div class="section-title">Rezervasyonlar</div>
      ${res.length ? res.map((o) => `<div class="stat-row"><span>${o.no} · ${C(o.cust).name}</span><b>${num(o.items.find(([s]) => s === sku)[1] * p.pcsBox)} pcs · ${o.reserveUntil || "—"}'e kadar</b></div>`).join("") : '<div class="muted">Aktif rezervasyon yok.</div>'}
    </div>
    <div class="card"><div class="card-h"><h3>Veri Tamlığı</h3>${p.est ? '<span class="pill warn">Lojistik tahmini</span>' : '<span class="pill ok">Order Ready ✓</span>'}</div>
      
      ${[["Fiyat (6 seviye)", p.prices.every((x) => x != null)], ["pcs/koli", true], ["Barkod", !!p.ean], ["Görsel", !!p.img], ["Koli ölçüsü", !p.est], ["Ağırlık", !p.est], ["HS kodu", !p.est]].map(([x, ok]) => `<div class="stat-row"><span>${x}</span><b class="${ok ? "ok-t" : "warn-t"}">${ok ? "✓" : "tahmini / eksik"}</b></div>`).join("")}
    </div>
    <div class="card"><div class="card-h"><h3>Bağlı İçerik</h3></div>
      <div class="stat-row"><span>Fiyat seviyeleri</span><a class="strong" href="#/admin/pricing">${LEVELS.length} seviye →</a></div>
      <div class="stat-row"><span>Dokümanlar</span><a class="strong" href="#/admin/documents">${DOCUMENTS.filter((d) => d.sku === p.sku || d.sku === "All").length} →</a></div>
      <div class="stat-row"><span>Marketing içerik</span><a class="strong" href="#/admin/marketing">${MARKETING.filter((m) => m.img === p.img).length || 1} →</a></div>
      <div class="section-title">Geçmiş</div>
      <ul class="tl"><li>Stok import: Physical güncellendi<small>Sistem · 30 Sep 2026 08:00</small></li><li>Europe fiyatı güncellendi<small>Ferhat · 01 Sep 2026</small></li><li>Koli ölçüsü düzeltildi<small>Operasyon · 12 Aug 2026</small></li></ul>
    </div></div>`;
};

// ——— Palet & Konteyner ———
ADMIN.loading = (no) => {
  if (no) state.loadingOrder = no;
  const o = O(state.loadingOrder);
  const target = o.target;
  const L = loadCalc(o.items, target);
  const sug = suggestions(o.items, target);
  return `${head("Palet & Konteyner", "", `
    <select class="input" style="width:260px" onchange="go('admin/loading/'+this.value)">${ORDERS.filter((x) => x.stage < 5).map((x) => `<option value="${x.no}" ${x.no === o.no ? "selected" : ""}>${x.no} · ${C(x.cust).name}</option>`).join("")}</select>
    <button class="btn" onclick="toast('Yükleme yeniden hesaplandı','refresh')">${ic("refresh")} Yeniden Hesapla</button>
    <button class="btn warn" onclick="manualAdjust('${o.no}')">${ic("edit")} Manuel Düzenle</button>`)}
  <div class="grid g-main">
    <div class="card"><div class="card-h"><h3>Palet Planı — ${o.no}</h3><span class="sub">80×120 cm taban · ${SETTINGS.pallet.completeMin}–${SETTINGS.pallet.completeMax} cm = Complete</span></div>
      ${palletVisual(L)}${skuLegend(o.items)}
      <div class="tbl-wrap mt"><table class="tbl"><thead><tr><th>Palet</th><th>İçerik</th><th class="r">Yükseklik</th><th class="r">Ağırlık</th><th>Durum</th></tr></thead><tbody>
      ${L.pallets.map((p, i) => `<tr><td class="strong">Palet ${i + 1}</td><td class="muted">${[...new Set(p.segs.map((s) => s.sku))].join(", ")}</td><td class="r">${p.h} cm</td><td class="r">${num(p.kg)} kg</td><td><span class="pill ${p.ok ? "ok" : "warn"}">${p.ok ? "Complete" : "Incomplete"}</span></td></tr>`).join("")}
      </tbody></table></div>
    </div>
    <div>
      ${target === "pallet" ? `<div class="card"><div class="card-h"><h3>Palet Siparişi</h3><span class="pill ${L.complete ? "ok" : "warn"}">${L.complete ? "COMPLETE" : "INCOMPLETE"}</span></div><div class="stat-row"><span>Palet</span><b>${L.pallets.length}</b></div><div class="stat-row"><span>Koli</span><b>${num(L.boxes)}</b></div><div class="stat-row"><span>Brüt</span><b>${num(L.kg)} kg</b></div></div>`
      : `<div class="card"><div class="card-h"><h3>${L.cap.label} Konteyner</h3><span class="pill ${L.complete ? "ok" : L.over ? "err" : "warn"}">${L.complete ? "COMPLETE" : L.over ? "KAPASİTE AŞILDI" : "INCOMPLETE"}</span></div>${containerVisual(L)}<div class="divider"></div>${containerStats(L)}</div>`}
      <div class="card mt"><div class="card-h"><h3>Tamamlama Önerileri</h3></div>
        ${L.complete ? `<div class="notice ok">${ic("check")}<span>Yükleme tamamlanmış — öneri yok.</span></div>` : sug.length ? sug.map((s) => `<div class="sugg">${thumb(s.p)}<div class="t"><b>+${s.boxes} koli ${s.p.name}</b><small>${s.p.loose ? "Loose loading uygun" : "Stokta"} · ${money(s.boxes * s.p.pcsBox * orderPrice(o, s.p), o.currency)} · sonrası ${s.after.target === "pallet" ? s.after.last.h + " cm" : s.after.pct + "%"}</small></div><button class="btn sm" onclick="addToOrder('${o.no}','${s.p.sku}',${s.boxes})">Teklif et</button></div>`).join("") : `<div class="notice warn">${ic("alert")}<span>Tek üründe uygun öneri yok — miktarları revize edin.</span></div>`}
        
      </div>
    </div>
  </div>`;
};
function addToOrder(no, sku, boxes) {
  const o = O(no), it = o.items.find(([s]) => s === sku);
  if (it) it[1] += boxes; else o.items.push([sku, boxes]);
  log(no, `Tamamlama önerisi müşteriye onaya gönderildi: +${boxes} koli ${sku}`);
  toast(`+${boxes} koli ${sku} öneri olarak eklendi (demo: müşteri onayı varsayıldı)`);
  rerender();
}
function manualAdjust(no) {
  modal(`<h2>Manuel Repack</h2><p class="muted">Palet içeriğini elle değiştirin. Sistem değişikliği kullanıcı + saat ile loglar.</p>
  <div class="form"><div class="field"><label>Palet</label><select class="input"><option>Palet 1</option><option>Palet 2</option><option>Son palet</option></select></div>
  <div class="field"><label>İşlem</label><select class="input"><option>Koli taşı → başka palete</option><option>Yükseklik override (cm)</option><option>Paleti böl</option></select></div>
  <div class="field"><label>Açıklama</label><textarea class="input" placeholder="Örn. forklift limiti nedeniyle 175 cm'de kesildi"></textarea></div></div>
  <div class="m-actions"><button class="btn" onclick="closeModal()">Vazgeç</button><button class="btn gold" onclick="closeModal();log('${no}','Manuel repack yapıldı');toast('Manuel repack kaydedildi · loglandı')">Kaydet</button></div>`);
}

// ——— Hazırlık (admin görünümü) ———
ADMIN.preparation = () => `${head("Fabrika / Hazırlık", "", `<button class="btn" onclick="go('factory/queue')">${ic("factory")} Fabrika ekranına geç</button>`)}
  <div class="card">${prepTable(false)}</div>`;
function prepTable(factory) {
  const list = ORDERS.filter((o) => o.stage === 3 || o.stage === 4);
  return `<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Sipariş</th><th>Müşteri</th><th>Yükleme</th><th class="r">Koli</th><th>Hazırlık</th><th>Hedef Çıkış</th><th>Durum</th></tr></thead><tbody>
  ${list.map((o) => { const need = orderBoxes(o.items), pr = state.prep[o.no], done = o.stage === 4 ? need : pr ? Object.values(pr).reduce((a, b) => a + b, 0) : 0, pct = Math.round((done / need) * 100);
    return `<tr class="click" onclick="go('factory/prep/${o.no}')"><td class="mono strong">${o.no}</td><td>${C(o.cust).flag} ${factory ? C(o.cust).country : C(o.cust).name}</td><td>${targetLabel(o.target)} · ${loadCalc(o.items, o.target).pallets.length} palet</td><td class="r">${num(need)}</td>
    <td style="min-width:160px"><div class="between"><small>${done}/${need}</small><small>${pct}%</small></div><div class="bar ${pct === 100 ? "ok" : ""}" style="height:6px;margin-top:4px"><i style="width:${pct}%"></i></div></td><td class="muted">${o.stage === 4 ? "28 Sep 2026" : "03 Oct 2026"}</td>
    <td>${o.stage === 4 ? '<span class="pill ok">Tamamlandı</span>' : o.problem ? '<span class="pill err">Problem</span>' : '<span class="pill info">Hazırlanıyor</span>'}</td></tr>`; }).join("")}
  </tbody></table></div>`;
}

// ——— Sevkiyat ———
ADMIN.shipments = () => {
  const o = O("SO-2026-0144"), L = loadCalc(o.items, o.target);
  return `${head("Sevkiyat", "")}
  <div class="card" style="margin-bottom:18px"><div class="row wrap" style="gap:14px;font:500 13px var(--display);letter-spacing:.08em;text-transform:uppercase"><span class="ok-t">Preparation Completed</span><span class="dim">→</span><span class="gold-t">Confirm Final Packing</span><span class="dim">→</span><span>Ready for Shipment</span><span class="dim">→</span><span>Mark as Shipped</span></div></div>
  <div class="grid g2">
    <div class="card"><div class="card-h"><h3>Final Packing — ${o.no}</h3><span class="pill ok">Hazırlık tamam</span></div>
      <div class="stat-row"><span>Müşteri</span><b>${C(o.cust).flag} ${C(o.cust).name}</b></div>
      <div class="stat-row"><span>Yükleme</span><b>${targetLabel(o.target)}</b></div><div class="stat-row"><span>Final palet</span><b>${L.pallets.length}</b></div><div class="stat-row"><span>Loose koli</span><b>${num(L.looseBoxes)}</b></div><div class="stat-row"><span>Toplam koli</span><b>${num(L.boxes)}</b></div>
      <div class="stat-row"><span>Net / Brüt</span><b>${num(Math.round(L.kg * 0.9))} / ${num(L.kg)} kg</b></div><div class="stat-row"><span>Packing List</span><b class="ok-t">Oluşturuldu ✓</b></div>
      <label class="checks"><label><input type="checkbox"> Kısmi sevkiyat (Shipment 1 / Shipment 2)</label></label>
      <button class="btn ok block lg" onclick="toast('Final packing onaylandı · Sevke Hazır')">Final Packing'i Onayla</button></div>
    <div class="card flat"><div class="card-h"><h3>Sevkiyat Bilgileri</h3></div>
      <div class="form cols2">
        <div class="field"><label>Pickup Date</label><input class="input" type="date" value="2026-10-02"></div>
        <div class="field"><label>Transport Type</label><select class="input"><option>Truck</option><option>20' Container</option><option>40' Container</option><option>Air</option><option>Courier</option></select></div>
        <div class="field"><label>Forwarder</label><input class="input" value="ABC Logistics"></div>
        <div class="field"><label>Booking Reference</label><input class="input" value="BK-12345"></div>
        <div class="field span2"><label>Container / Plate</label><input class="input" placeholder="TCLU… / 81 ABC 123"></div>
        <div class="field span2"><label>Müşteriye görünür dokümanlar</label><div class="checks"><label><input type="checkbox" checked> Final Packing List</label><label><input type="checkbox" checked> Commercial Invoice</label><label><input type="checkbox"> İç not</label></div></div>
      </div>
      <button class="btn gold block lg mt" onclick="O('SO-2026-0144').stage=5;toast('Sevk edildi · müşteriye mail + dokümanlar gönderildi','truck');go('admin/orders')">${ic("truck")} Sevk Edildi Olarak İşaretle</button></div>
  </div>
  <div class="card mt"><div class="card-h"><h3>Son Sevkiyatlar</h3></div><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Sipariş</th><th>Müşteri</th><th>Tip</th><th>Forwarder</th><th>Referans</th><th>Pickup</th></tr></thead><tbody>
    <tr><td class="mono">SO-2026-0143</td><td>🇸🇦 Riyadh Grooming Est.</td><td>20' DC</td><td>Arkas</td><td class="mono">ARK-88121</td><td>12 Sep 2026</td></tr>
    <tr><td class="mono">SO-2026-0142</td><td>🇩🇪 ABC Distribution GmbH</td><td>Truck · 4 palet</td><td>Ekol</td><td class="mono">EK-20931</td><td>09 Sep 2026</td></tr></tbody></table></div></div>`;
};

// ——— Finans ———
function paymentsTable(list) {
  return `<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Sipariş</th><th>Proforma</th><th class="r">Tutar</th><th class="r">Alınan</th><th class="r">Bakiye</th><th>Durum</th></tr></thead><tbody>
  ${list.filter((o) => o.stage >= 2).map((o) => { const t = orderTotal(o), ps = payState(o); return `<tr><td class="mono">${o.no}</td><td class="mono muted">PI-${o.no.slice(3)} / Rev.1</td><td class="r">${money(t, o.currency)}</td><td class="r">${money(o.paid, o.currency)}</td><td class="r strong">${money(Math.max(0, t - o.paid), o.currency)}</td><td><span class="pill ${ps[1]}">${ps[2]}</span></td></tr>`; }).join("")}
  </tbody></table></div>`;
}
ADMIN.finance = () => {
  const o = O("SO-2026-0146"), t = orderTotal(o), ps = payState(o);
  return `${head("Finans & Ödemeler", "")}
  <div class="grid g4">${kpi("$17,590", "Açık Bakiye", "3 sipariş", "wallet")}${kpi("$386,200", "Eylül Tahsilat", "22 ödeme", "check")}${kpi("5", "Ödeme Bekleyen", "Proforma gönderildi", "clock")}${kpi("$1,250", "Customer Credit", "Fazla ödemeler", "bank")}</div>
  <div class="grid g2 mt">
    <div class="card"><div class="card-h"><h3>Proforma Invoice</h3><span class="pill plain">PI-2026-0146 / Rev.1</span></div>
      <div class="stat-row"><span>Müşteri</span><b>${C(o.cust).flag} ${C(o.cust).name}</b></div><div class="stat-row"><span>Para birimi</span><b>${o.currency}</b></div><div class="stat-row"><span>Sipariş toplamı</span><b>${money(t, o.currency)}</b></div><div class="stat-row"><span>Ödeme şartı</span><b>100% Advance</b></div>
      <div class="card flat mt"><div class="between"><b style="font:500 13px var(--display);letter-spacing:.08em">BANKA — ${o.currency} VARSAYILAN</b><span class="pill ok plain">Otomatik</span></div><p class="muted mono" style="margin:8px 0 0">Bank A · ${o.currency} Account · TR12 0001 2345 6789 0000 0001 · SWIFT TGBATRIS</p></div>
      <div class="row mt"><button class="btn gold" onclick="toast('PI PDF oluşturuldu','download')">${ic("download")} PDF Oluştur</button><button class="btn warn" onclick="newRevision()">Yeni Revizyon</button></div>
      <div class="section-title">Revizyon Geçmişi</div>
      ${state.piRevs.slice().reverse().map(([r, d, n], i) => `<div class="stat-row"><span style="color:var(--text)">${ic("file")} PI-2026-0146 / ${r} <small class="muted">· ${n}</small></span><span class="row"><small class="muted">${d}</small>${i === 0 ? '<span class="pill ok plain">Güncel</span>' : ""}</span></div>`).join("")}</div>
    <div class="card flat"><div class="card-h"><h3>Ödeme</h3><span class="pill ${ps[1]}">${ps[2]}</span></div>
      <div class="grid g2"><div><div class="muted">Alınan</div><div class="big-num">${money(o.paid, o.currency)}</div></div><div><div class="muted">Bakiye</div><div class="big-num warn-t">${money(t - o.paid, o.currency)}</div></div></div>
      <div class="form cols2 mt"><div class="field"><label>Tarih</label><input class="input" type="date" value="2026-09-30"></div><div class="field"><label>Tutar</label><input class="input" value="${Math.round(t - o.paid)}"></div>
      <div class="field"><label>Para Birimi</label><select class="input"><option value="${o.currency}">${o.currency}</option></select></div><div class="field"><label>Banka</label><select class="input"><option>Bank A · ${o.currency}</option></select></div>
      <div class="field span2"><label>SWIFT / Referans</label><input class="input" placeholder="…"></div><div class="field span2"><label>Dekont</label><button class="btn">${ic("upload")} Dosya yükle</button></div></div>
      <div class="section-title">Siparişlere Dağıt</div>
      <div class="stat-row"><span>SO-2026-0146 · bakiye ${money(t - o.paid, o.currency)}</span><input class="input alloc" style="width:110px;height:34px" value="${Math.round(t - o.paid)}" oninput="allocCalc()"></div>
      <div class="stat-row"><span>SO-2026-0138 · bakiye €2,300</span><input class="input alloc" style="width:110px;height:34px" value="0" oninput="allocCalc()"></div>
      <div class="stat-row"><span>Customer Credit'e kalan</span><b id="allocRest">€0</b></div>
      <button class="btn ok block lg mt" onclick="O('SO-2026-0146').paid=${Math.round(t)};O('SO-2026-0146').stage=3;toast('Ödeme eklendi · sipariş fabrika kuyruğuna düştü');rerender()">${ic("check")} Ödeme Ekle</button></div>
  </div>
  <div class="grid g-side mt"><div><div class="card"><div class="card-h"><h3>Ödeme Durumu</h3></div>${paymentsTable(ORDERS)}</div>
  <div class="card mt"><div class="card-h"><h3>Müşteri Cari</h3></div><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Müşteri</th><th>Döviz</th><th class="r">YTD Fatura</th><th class="r">Açık Bakiye</th><th class="r">Credit</th></tr></thead><tbody>
  ${CUSTOMERS.filter((c) => c.status !== "Pending").map((c) => `<tr><td>${c.flag} ${c.name}</td><td>${c.currency}</td><td class="r">${money(c.ytd, c.currency)}</td><td class="r ${c.balance ? "warn-t strong" : ""}">${money(c.balance, c.currency)}</td><td class="r">${c.id === "C-1017" ? money(1250) : "—"}</td></tr>`).join("")}
  </tbody></table></div></div></div>
  <div class="card dark"><div class="card-h"><h3>Banka Hesabı Kuralı</h3></div><div class="stat-row"><span>USD sipariş</span><b>→ USD hesap</b></div><div class="stat-row"><span>EUR sipariş</span><b>→ EUR hesap</b></div>
  <div class="section-title">Öncelik</div><ol style="margin:0;padding-left:18px;line-height:2"><li>Müşteriye özel hesap</li><li>Para birimi varsayılanı</li><li>Yetkili manuel seçim</li></ol>
  </div></div>`;
};
function newRevision() { const n = "Rev." + (state.piRevs.length + 1); state.piRevs.push([n, "30 Sep 2026", "Admin revize"]); toast(`${n} oluşturuldu · önceki revizyon saklandı`); rerender(); }
function allocCalc() {
  const paid = Number(document.querySelectorAll(".form.cols2 .input")[1].value) || 0;
  const used = [...document.querySelectorAll(".alloc")].reduce((s, i) => s + (Number(i.value) || 0), 0);
  $("#allocRest").textContent = "€" + num(Math.max(0, paid - used));
}

// ——— Raporlar ———
ADMIN.reports = () => {
  const top = [["BW-20-SKL", 24500], ["BSS-200 - PS", 19200], ["BC-400-2", 17400], ["BW-150-MAT-1018", 15100], ["BW-150-GUM", 12800]];
  return `${head("Raporlar & Analiz", "", `<button class="btn" onclick="toast('Excel indiriliyor','download')">${ic("download")} Excel</button><button class="btn" onclick="toast('PDF indiriliyor','download')">${ic("download")} PDF</button>`)}
  <div class="card flat" style="margin-bottom:18px"><div class="filters">
    ${[["Son 3 Ay", "Bu Yıl", "Q3 2026", "Q3 2025"], ["Tüm Bölgeler", "Avrupa", "Orta Doğu", "Amerika", "BDT"], ["Tüm Ülkeler", "Germany", "USA", "Lithuania", "UAE"], ["Tüm Markalar", "Marmara Barber", "Marmara", "Noir"], ["Tüm Kategoriler", "Cologne", "Hair Styling", "Shaving"], ["Tüm Müşteriler", ...CUSTOMERS.filter((c) => c.status !== "Pending").map((c) => c.name)], ["Tüm SKU", ...PRODUCTS.map((p) => p.sku)], ["Tüm Satışçılar", "Ferhat", "Gözde"], ["Tüm Dövizler", "USD", "EUR"], ["Değer ($)", "Adet (pcs)"]].map((o) => `<select>${o.map((x) => `<option value="${x}">${x}</option>`).join("")}</select>`).join("")}
    <button class="btn gold sm" onclick="toast('Filtre uygulandı')">Uygula</button></div></div>
  <div class="grid g4">${kpi("$1.24M", "Toplam Satış", "Son 3 ay", "trend", "+14%")}${kpi("486K", "Adet", "pcs", "box")}${kpi("92", "Sipariş", "Onaylı", "cart")}${kpi("18", "Ülke", "Aktif pazar", "globe")}</div>
  <div class="grid g-main mt">
    <div class="card"><div class="card-h"><h3>2026 vs 2025 (bin $)</h3><div class="legend"><span><i style="background:#d6d4cc"></i>2025</span><span><i style="background:#c8a46a"></i>2026</span></div></div>${barChart(MONTHLY_SALES, { prev: [240, 251, 280, 262, 301, 330, 310, 322, 354], fmt: (v) => "$" + Math.round(v) + "K" })}</div>
    <div class="card"><div class="card-h"><h3>Top Ürünler — Avrupa / 3A</h3></div>${hbars(top, (v) => num(v) + " pcs")}</div>
  </div>
  <div class="grid g3 mt">
    <div class="card"><div class="card-h"><h3>Ülke</h3></div>${hbars(COUNTRY_SALES, (v) => "$" + (v / 1000).toFixed(0) + "K")}</div>
    <div class="card"><div class="card-h"><h3>Hazır Raporlar</h3></div>${["Çeyrek (Quarter)", "Ülke", "Ürün", "Müşteri", "Marka", "Satışçı", "Forecast vs Actual", "Stok"].map((r) => `<div class="stat-row"><span style="color:var(--text)">${ic("file")} ${r}</span><button class="btn sm">Aç</button></div>`).join("")}</div>
    <div class="card flat"><div class="card-h"><h3>Sorabileceğimiz örnekler</h3></div>${["Avrupa'da son 3 ay en çok hangi SKU?", "Almanya'ya özel güçlü ürünler hangileri?", "Q3 vs Q2 / Q3 geçen yıl?", "Forecast'ı en çok sapan müşteri?"].map((q) => `<div class="sugg"><div class="t"><b>“${q}”</b></div>${ic("chevR")}</div>`).join("")}</div>
  </div>`;
};

// ——— Doküman / Marketing ———
function docsTable(en, cust) {
  const list = DOCUMENTS.filter((d) => state.docType === "all" || d.type === state.docType).filter((d) => !cust || d.visible === "All customers" || (d.visible === "EU customers" && REGION[cust.country] === "Avrupa"));
  const types = ["all", ...new Set(DOCUMENTS.map((d) => d.type))];
  return `<div class="filters" style="margin-bottom:14px">${types.map((t) => `<button class="chip ${state.docType === t ? "on" : ""}" onclick="state.docType='${t}';rerender()">${t === "all" ? (en ? "All" : "Tümü") : t}</button>`).join("")}</div>
  <div class="tbl-wrap"><table class="tbl"><thead><tr><th>${en ? "Type" : "Tip"}</th><th>${en ? "Document" : "Doküman"}</th><th>SKU</th><th>${en ? "Brand" : "Marka"}</th><th>${en ? "Lang" : "Dil"}</th><th>Ver.</th><th>${en ? "Expiry" : "Geçerlilik"}</th>${en ? "" : "<th>Görünürlük</th>"}<th></th></tr></thead><tbody>
  ${list.map((d) => `<tr><td><span class="pill gold plain">${d.type}</span></td><td class="strong">${d.name}</td><td class="mono">${d.sku}</td><td class="muted">${P(d.sku)?.brand || (en ? "All" : "Tümü")}</td><td>${d.lang}</td><td class="muted">${d.ver}</td><td class="${d.expiring ? "warn-t strong" : "muted"}">${d.expiry}${d.expiring ? " ⚠" : ""}</td>${en ? "" : `<td class="muted">${d.visible === "EU customers" ? "AB müşterileri" : "Tüm müşteriler"}</td>`}<td class="r"><button class="btn sm" onclick="toast('${d.name} indiriliyor','download')">${ic("download")}</button></td></tr>`).join("")}
  </tbody></table></div>`;
}
function uploadDoc() {
  modal(`<h2>Doküman Yükle</h2><p class="muted">SKU / marka / ülke / dil etiketleri ile müşteri görünürlüğü belirlenir.</p>
  <div class="form cols2"><div class="field"><label>Tip</label><select class="input"><option>MSDS</option><option>CPNP</option><option>CPSR</option><option>INCI</option><option>Free Sale</option><option>Certificate</option></select></div>
  <div class="field"><label>SKU</label><select class="input"><option>Tümü</option>${PRODUCTS.map((p) => `<option value="${p.sku}">${p.sku}</option>`).join("")}</select></div>
  <div class="field"><label>Marka</label><select class="input"><option>Tümü</option><option>Marmara Barber</option><option>Marmara</option><option>Noir</option></select></div><div class="field"><label>Ülke</label><select class="input"><option>Tümü</option><option>AB</option><option>Germany</option><option>USA</option></select></div><div class="field"><label>Dil</label><input class="input" value="EN"></div><div class="field"><label>Geçerlilik</label><input class="input" type="date"></div>
  <div class="field span2"><label>Görünürlük</label><select class="input"><option>Tüm müşteriler</option><option>AB müşterileri</option><option>Seçili müşteriler</option><option>Sadece iç kullanım</option></select></div>
  <div class="field span2"><label>Dosya</label><button class="btn">${ic("upload")} PDF seç</button></div></div>
  <div class="m-actions"><button class="btn" onclick="closeModal()">Vazgeç</button><button class="btn gold" onclick="closeModal();toast('Doküman yüklendi · v1')">Yükle</button></div>`);
}
const assetGrid = () => `<div class="agrid">${MARKETING.filter((m) => state.mkKind === "all" || m.kind === state.mkKind).map((a) => `<div class="asset" onclick="toast('${a.title} indiriliyor','download')"><div class="ph"><img src="${imgSrc(a.img)}"></div><div class="b"><b>${a.title}</b><small>${a.kind} · ${a.n} dosya</small></div></div>`).join("")}</div>`;
const mkChips = (en) => `<div class="filters" style="margin-bottom:16px">${["all", ...new Set(MARKETING.map((m) => m.kind))].map((k) => `<button class="chip ${state.mkKind === k ? "on" : ""}" onclick="state.mkKind='${k}';rerender()">${k === "all" ? (en ? "All" : "Tümü") : k}</button>`).join("")}</div>`;
ADMIN.marketing = () => `${head("Marketing Hub", "", `<button class="btn gold" onclick="uploadContent()">${ic("upload")} İçerik Yükle</button>`)}
  ${mkChips()}${assetGrid()}
  <div class="grid g3 mt">${kpi("1,284", "İndirme · 30 gün", "", "download")}${kpi("Germany", "En aktif ülke", "", "globe")}${kpi("Powder Wax Kit", "En popüler", "", "image")}</div>`;
function uploadContent() {
  modal(`<h2>İçerik Yükle</h2>
  <div class="form cols2"><div class="field"><label>Tür</label><select class="input">${[...new Set(MARKETING.map((m) => m.kind))].map((k) => `<option value="${k}">${k}</option>`).join("")}<option>Logos / Brand Assets</option></select></div>
  <div class="field"><label>Marka</label><select class="input"><option>Marmara Barber</option><option>Marmara</option><option>Noir</option></select></div>
  <div class="field"><label>Dil</label><select class="input"><option>EN</option><option>DE</option><option>AR</option><option>TR</option></select></div>
  <div class="field"><label>Bölge</label><select class="input"><option>Tümü</option><option>Avrupa</option><option>Orta Doğu</option><option>Amerika</option><option>BDT</option></select></div>
  <div class="field span2"><label>SKU</label><select class="input"><option>—</option>${PRODUCTS.map((p) => `<option value="${p.sku}">${p.sku}</option>`).join("")}</select></div>
  <div class="field span2"><label>Dosyalar</label><button class="btn">${ic("upload")} Seç</button></div></div>
  <div class="m-actions"><button class="btn" onclick="closeModal()">Vazgeç</button><button class="btn gold" onclick="closeModal();toast('İçerik yüklendi · seçili bölge müşterilerine görünür')">Yükle</button></div>`);
}

// ——— Kullanıcılar & Ayarlar ———
ADMIN.users = () => {
  const acts = ["Görüntüle", "Oluştur", "Düzenle", "Onayla", "Sil", "Export"];
  const roles = [["Super Admin", "111111"], ["Export Manager / Final Approver", "111110"], ["Export Sales", "111001"], ["Operations", "101100"], ["Factory", "101000"], ["Finance", "111101"], ["Marketing", "111010"], ["Regulatory", "111010"], ["Management / Viewer", "100001"]];
  const crit = ["Müşteri onayı", "Fiyat değişikliği", "Final sipariş onayı", "Ödemesiz serbest bırakma", "Stok serbest bırakma", "Final packing", "Sevk edildi işaretleme"];
  return `${head("Kullanıcılar & Yetkiler", "", `<button class="btn gold">${ic("plus")} Kullanıcı Davet Et</button>`)}
  <div class="card"><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Kullanıcı</th><th>E-posta</th><th>Rol</th><th>Kapsam</th><th>Son giriş</th></tr></thead><tbody>
  ${USERS.map((u, i) => `<tr><td class="strong">${u.name}</td><td class="muted">${u.email}</td><td><span class="pill ${i < 2 ? "gold" : "plain"}">${u.role}</span></td><td class="muted">${u.scope}</td><td class="muted">${["Şimdi", "12 dk önce", "1 sa önce", "Bugün", "Bugün", "Dün", "3 gün önce"][i]}</td></tr>`).join("")}
  </tbody></table></div></div>
  <div class="grid g-main mt"><div class="card"><div class="card-h"><h3>Yetki Matrisi</h3></div><div class="tbl-wrap"><table class="tbl perm"><thead><tr><th>Rol</th>${acts.map((a) => `<th class="c">${a}</th>`).join("")}</tr></thead><tbody>
  ${roles.map(([r, m]) => `<tr><td class="strong">${r}</td>${[...m].map((x) => `<td class="c"><span class="${x === "1" ? "y" : "n"}">${x === "1" ? "✓" : "–"}</span></td>`).join("")}</tr>`).join("")}</tbody></table></div></div>
  <div class="card dark"><div class="card-h"><h3>Kritik Yetkiler</h3></div>${crit.map((c, i) => `<div class="stat-row"><span style="color:var(--text)">${c}</span><b class="gold-t" style="font-size:12px">${["Gözde", "Gözde", "Gözde", "Super Admin", "Gözde", "Operasyon", "Operasyon"][i]}</b></div>`).join("")}</div></div>`;
};
ADMIN.settings = () => {
  const c20 = SETTINGS.containers["20"], c40 = SETTINGS.containers["40"], pl = SETTINGS.pallet;
  const f = (lbl, path, v, unit) => `<div class="field"><label>${lbl}</label><div class="row"><input class="input" type="number" value="${v}" onchange="setSetting('${path}',this.value)"><span class="muted">${unit}</span></div></div>`;
  return `${head("Ayarlar", "", `<button class="btn gold" onclick="toast('Ayarlar kaydedildi · tüm yükleme hesapları güncellendi')">${ic("check")} Kaydet</button>`)}
  <div class="grid g3">
    <div class="card"><div class="card-h"><h3>Palet</h3></div><div class="form">${f("Complete min yükseklik", "pallet.completeMin", pl.completeMin, "cm")}${f("Max yükseklik (yeni palet)", "pallet.completeMax", pl.completeMax, "cm")}${f("Palet taban yüksekliği", "pallet.baseHeight", pl.baseHeight, "cm")}<div class="field"><label>Taban</label><input class="input" value="80 × 120 cm (EUR)" disabled></div></div></div>
    <div class="card"><div class="card-h"><h3>20' Konteyner</h3></div><div class="form">${f("Kullanılabilir hacim", "containers.20.m3", c20.m3, "m³")}${f("Max yük", "containers.20.kg", c20.kg, "kg")}${f("Palet slotu", "containers.20.slots", c20.slots, "adet")}${f("Tamamlama eşiği", "containers.20.threshold", c20.threshold, "%")}</div></div>
    <div class="card"><div class="card-h"><h3>40' Konteyner</h3></div><div class="form">${f("Kullanılabilir hacim", "containers.40.m3", c40.m3, "m³")}${f("Max yük", "containers.40.kg", c40.kg, "kg")}${f("Palet slotu", "containers.40.slots", c40.slots, "adet")}${f("Tamamlama eşiği", "containers.40.threshold", c40.threshold, "%")}</div></div>
  </div>
  <div class="grid g2 mt">
    <div class="card"><div class="card-h"><h3>Banka Hesapları</h3><button class="btn sm">${ic("plus")} Ekle</button></div>
      ${[["Bank A · USD", "TR12 0001 …0001", "USD varsayılan"], ["Bank A · EUR", "TR12 0001 …0002", "EUR varsayılan"], ["Bank B · USD", "TR44 0006 …0917", "Barber Supply Co. özel"]].map(([a, b, c]) => `<div class="stat-row"><span style="color:var(--text)">${ic("bank")} ${a} <span class="mono muted">${b}</span></span><span class="pill gold plain">${c}</span></div>`).join("")}</div>
    <div class="card"><div class="card-h"><h3>Stok Kaynağı</h3></div>
      <div class="stat-row"><span>Kaynak</span><b>Google Drive · stok_guncel.xlsx</b></div><div class="stat-row"><span>Senkron</span><b>Her gün 08:00 + manuel</b></div><div class="stat-row"><span>Import kuralı</span><b>Sadece Physical Stock</b></div><div class="stat-row"><span>İleri faz</span><b class="muted">ERP entegrasyonu</b></div></div>
  </div>`;
};
function setSetting(path, v) {
  const keys = path.split("."); let o = SETTINGS;
  keys.slice(0, -1).forEach((k) => (o = o[k]));
  o[keys.at(-1)] = Number(v);
}

// ═════════════════════════════ MÜŞTERİ PORTALI ═════════════════════════════
const CUST = {};
let ME = "C-1021";   // giriş yapan müşteri (auth.js atar)
const cartItems = () => Object.entries(state.cart).filter(([, b]) => b > 0);

CUST.dashboard = () => {
  const mine = ORDERS.filter((o) => o.cust === ME);
  const active = mine.find((o) => o.stage < 5);
  return `${head(`Welcome back, ${C(ME).name}`, "", `<button class="btn gold lg" onclick="go('customer/products')">${ic("plus")} CREATE NEW ORDER</button>`)}
  <div class="grid g4">${kpi(mine.filter((o) => o.stage < 5).length, "Active Orders", "In progress", "cart")}${kpi(mine.filter((o) => o.stage === 4).length, "Ready for Shipment", "Awaiting pickup", "truck")}${kpi("October", "Next Forecast", "Due in 5 days", "trend")}${kpi(12, "Orders", "Last 12 months", "box")}</div>
  ${active ? `<div class="card mt"><div class="card-h"><h3>Order ${active.no}</h3>${stagePill(active.stage, true)}</div>${stepper(active.stage, STAGES_EN)}
    <div class="between mt wrap"><span class="muted">${money(orderTotal(active), active.currency)} · ${targetLabel(active.target)} · Payment: ${payState(active)[0]}</span><button class="btn sm" onclick="go('customer/order/${active.no}')">View order ${ic("chevR")}</button></div></div>` : ""}
  <div class="grid g-main mt"><div class="card"><div class="card-h"><h3>Recent Orders</h3><a class="sub" href="#/customer/orders">All →</a></div>${ordersTable(mine, true)}</div>
  <div class="card flat"><div class="card-h"><h3>Announcements</h3></div><ul class="tl"><li>New: Noir EDP 50 ml range now available to order.<small>22 Sep 2026</small></li><li>Q4 campaign on Hair Styling — see your net prices.<small>15 Sep 2026</small></li><li>Factory closed 29 Oct (national holiday).<small>10 Sep 2026</small></li></ul>
  <div class="notice gold">${ic("trend")}<span>Your October forecast is due. It helps us plan production for you.</span></div></div></div>`;
};

CUST.products = () => {
  const f = state.filter;
  const brands = [...new Set(PRODUCTS.map((p) => p.brand))], cats = [...new Set(PRODUCTS.map((p) => p.cat))];
  const list = PRODUCTS.filter((p) => (f.brand === "all" || p.brand === f.brand) && (f.cat === "all" || p.cat === f.cat) && (!f.q || srchHit(prodText(p), f.q)));
  return `${head("Products / New Order", "")}
  <div class="filters" style="margin-bottom:18px">
    <select onchange="state.filter.brand=this.value;rerender()"><option value="all">All brands</option>${brands.map((b) => `<option value="${b}" ${f.brand === b ? "selected" : ""}>${b}</option>`).join("")}</select>
    <select onchange="state.filter.cat=this.value;rerender()"><option value="all">All categories</option>${cats.map((b) => `<option value="${b}" ${f.cat === b ? "selected" : ""}>${b}</option>`).join("")}</select>
    <div class="search" style="width:260px;height:38px"><span>${ic("search")}</span><input value="${f.q}" placeholder="Search SKU / product…" onchange="state.filter.q=this.value;rerender()"></div>
  </div>
  <div class="grid g-side">
    <div class="pgrid">${list.map(productCard).join("")}</div>
    <div id="cartPanel">${cartPanel()}</div>
  </div>`;
};
function productCard(p) {
  const b = state.cart[p.sku] || 0, s = stockState(p);
  return `<div class="pcard ${b ? "in" : ""} ${s === "out" ? "out" : ""}" id="pc-${p.sku}">
    <div class="ph">${p.img ? `<img src="${imgSrc(p.img)}" alt="" loading="lazy">` : noImg(p)}${stockPill(p, true)}${p.loose ? '<span class="loose">LOOSE OK</span>' : ""}</div>
    <div class="pb"><div class="pn">${p.name}</div><div class="ps mono">${p.sku} · ${p.brand}</div>
      <div class="pp"><b>${money(custPrice(p), levelCur(levelOf(ME)), 2)}<small> / pcs</small></b><small>${p.pcsBox} pcs / box</small></div>
      <div class="qty">${s === "out" ? `<span class="muted" style="margin:auto;font-size:12px">Notify me when back</span>` : `<button onclick="setQty('${p.sku}',${b - 1})">−</button><input value="${b}" inputmode="numeric" onchange="setQty('${p.sku}',this.value)"><span class="u">BOXES</span><button onclick="setQty('${p.sku}',${b + 1})">+</button>`}</div>
    </div></div>`;
}
function setQty(sku, v) {
  const p = P(sku);
  let n = Math.max(0, parseInt(v) || 0);
  if (n > availBoxes(p)) { n = availBoxes(p); toast(`Only ${n} boxes available for ${p.name}`, "alert"); }
  state.cart[sku] = n;
  const card = document.getElementById("pc-" + sku);
  if (card) card.outerHTML = productCard(p);
  const cp = document.getElementById("cartPanel");
  if (cp) cp.innerHTML = cartPanel();
}
function cartPanel() {
  const items = cartItems(), t = state.cartTarget, L = loadCalc(items, t);
  const total = items.reduce((s, [sku, b]) => s + lineTotal(sku, b), 0);
  const seg = (k, l) => `<button class="${t === k ? "on" : ""}" onclick="state.cartTarget='${k}';document.getElementById('cartPanel').innerHTML=cartPanel()">${l}</button>`;
  let status = "";
  if (!items.length) status = `<div class="notice info">${ic("info")}<span>Add boxes to start your order.</span></div>`;
  else if (t === "pallet") {
    const last = L.last;
    status = `<div class="between"><span class="muted">Current pallet (P${L.pallets.length})</span><b class="${last.ok ? "ok-t" : "warn-t"}">${last.h} cm</b></div>
      <div class="bar thick ${last.ok ? "ok" : "warn"}" style="margin-top:8px"><i style="width:${Math.min(100, (last.h / 190) * 100)}%"></i><span class="mark" style="left:${(170 / 190) * 100}%"></span></div>
      <small class="muted">Pallet complete between 170–190 cm</small>
      ${L.complete ? `<div class="notice ok mt">${ic("check")}<span>All ${L.pallets.length} pallets are complete.</span></div>` : `<div class="notice warn mt">${ic("alert")}<span>Pallet ${L.pallets.length} is incomplete (${last.h} cm). Complete it to place the order.</span></div><button class="btn gold block mt" onclick="completeModal()">COMPLETE PALLET</button>`}`;
  } else {
    const cls = L.over ? "err" : L.complete ? "ok" : "warn";
    status = `<div class="between"><span class="muted">${L.cap.label} load</span><b class="${cls}-t">${L.pct}%</b></div>
      <div class="bar thick ${cls}" style="margin-top:8px"><i style="width:${Math.min(100, L.pct)}%"></i><span class="mark" style="left:${L.cap.threshold}%"></span></div>
      <small class="muted">Remaining ${L.remM3.toFixed(1)} m³ · ${num(Math.round(L.remKg))} kg · ${L.pallets.length} pallets + ${L.looseBoxes} loose boxes</small>
      ${L.over ? `<div class="notice err mt">${ic("alert")}<span>Over capacity. Switch to a larger container or reduce boxes.</span></div>` : L.complete ? `<div class="notice ok mt">${ic("check")}<span>Container is complete.</span></div>` : `<div class="notice warn mt">${ic("alert")}<span>Container needs ≥${L.cap.threshold}% load.</span></div><button class="btn gold block mt" onclick="completeModal()">COMPLETE CONTAINER</button>`}`;
  }
  return `<div class="card cartp"><div class="card-h"><h3>Current Order</h3><span class="sub">${items.length} SKUs</span></div>
    <div class="total">${money(total, levelCur(levelOf(ME)), 2)}</div>
    <div class="mt"><div class="stat-row"><span>Boxes</span><b>${num(L.boxes)}</b></div><div class="stat-row"><span>Pieces</span><b>${num(L.pcs)}</b></div><div class="stat-row"><span>Pallets</span><b>${L.pallets.length}</b></div><div class="stat-row"><span>Gross weight</span><b>${num(L.kg)} kg</b></div></div>
    <div class="section-title" style="margin-top:16px">Loading target</div>
    <div class="seg">${seg("pallet", "Pallet")}${seg("20", "20' Cont.")}${seg("40", "40' Cont.")}</div>
    <div class="mt">${status}</div>
    <button class="btn primary block lg mt" ${L.complete ? "" : "disabled"} onclick="go('customer/checkout')">REVIEW ORDER ${ic("chevR")}</button>
  </div>`;
}
function completeModal() {
  const items = cartItems(), sug = suggestions(items, state.cartTarget), L = loadCalc(items, state.cartTarget);
  const isP = state.cartTarget === "pallet";
  modal(`<h2>${isP ? "Complete Pallet " + L.pallets.length : "Complete " + L.cap.label}</h2>
  <p class="muted">${isP ? `Current height ${L.last.h} cm — about ${L.gapCm} cm more needed. ` : `Current load ${L.pct}% — ${(L.cap.m3 * 0.95 - L.usedM3).toFixed(1)} m³ more to reach 95%. `}Suggestions use only in-stock products that physically fit${isP ? "" : " as loose loading"}. Nothing is added without your approval.</p>
  ${sug.length ? sug.map((s) => `<div class="sugg">${thumb(s.p)}<div class="t"><b>+${s.boxes} boxes · ${s.p.name}</b><small>${s.inCart ? "Already in your order · " : ""}${money(s.boxes * s.p.pcsBox * custPrice(s.p), levelCur(levelOf(ME)), 2)} · after: ${s.after.target === "pallet" ? s.after.last.h + " cm" : s.after.pct + "%"}</small></div><button class="btn sm gold" onclick="acceptSugg('${s.p.sku}',${s.boxes})">Add</button></div>`).join("") : `<div class="notice warn">${ic("alert")}<span>No single product fits — please adjust quantities or talk to your sales rep.</span></div>`}
  <div class="m-actions"><button class="btn" onclick="closeModal()">Close</button></div>`);
}
function acceptSugg(sku, boxes) {
  state.cart[sku] = (state.cart[sku] || 0) + boxes;
  closeModal();
  toast(`${boxes} boxes of ${P(sku).name} added`);
  rerender();
}

CUST.checkout = () => {
  const items = cartItems(), L = loadCalc(items, state.cartTarget);
  const total = items.reduce((s, [sku, b]) => s + lineTotal(sku, b), 0);
  return `${head("Checkout", "", "", `<a href="#/customer/products">Products</a> / Checkout`)}
  <div class="grid g-side"><div>
    <div class="card"><div class="card-h"><h3>Order Review</h3><a class="sub" href="#/customer/products">Edit</a></div>
      <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Product</th><th class="c">Boxes</th><th class="r">Pcs</th><th class="r">Unit</th><th class="r">Total</th></tr></thead><tbody>
      ${items.map(([sku, b]) => { const p = P(sku); return `<tr><td><div class="prod-cell">${thumb(p)}<div><b>${p.name}</b><br><small class="mono">${sku}</small></div></div></td><td class="c">${b}</td><td class="r muted">${num(b * p.pcsBox)}</td><td class="r muted">${money(custPrice(p), levelCur(levelOf(ME)), 2)}</td><td class="r strong">${money(lineTotal(sku, b), levelCur(levelOf(ME)), 2)}</td></tr>`; }).join("")}
      </tbody></table></div></div>
    <div class="card mt"><div class="card-h"><h3>Loading</h3><span class="pill ${L.complete ? "ok" : "warn"}">${L.complete ? "COMPLETE ✓" : "INCOMPLETE"}</span></div>
      <div class="stat-row"><span>Target</span><b>${targetLabel(state.cartTarget)}</b></div><div class="stat-row"><span>Pallets</span><b>${L.pallets.length} complete</b></div>${state.cartTarget !== "pallet" ? `<div class="stat-row"><span>Loose load</span><b>${L.looseBoxes} boxes</b></div><div class="stat-row"><span>Container load</span><b>${L.pct}%</b></div>` : ""}</div>
    <div class="card mt"><div class="form cols2"><div class="field"><label>Delivery Address</label><select class="input"><option>Berlin Warehouse — Lagerstr. 12, 13407 Berlin</option><option>Hamburg Hub</option></select></div><div class="field"><label>Your PO Number</label><input class="input" id="ckPo" placeholder="Optional"></div><div class="field span2"><label>Order Notes</label><textarea class="input" id="ckNote" placeholder="Optional…"></textarea></div></div></div>
  </div>
  <div><div class="card cartp"><div class="card-h"><h3>Order Summary</h3></div>
    <div class="stat-row"><span>Subtotal</span><b>${money(total, levelCur(levelOf(ME)), 2)}</b></div><div class="stat-row"><span>Shipping term</span><b>EXW Düzce</b></div><div class="stat-row"><span>Payment term</span><b>100% Advance</b></div><div class="stat-row"><span>Boxes</span><b>${num(L.boxes)}</b></div><div class="stat-row"><span>Pallets</span><b>${L.pallets.length}</b></div>
    <div class="between mt"><span style="font:600 16px var(--display)">TOTAL</span><span class="total">${money(total, levelCur(levelOf(ME)), 2)}</span></div>
    <div class="notice info mt">${ic("info")}<span>Stock is reserved after sales review & final approval. You'll receive a proforma invoice by email.</span></div>
    <button class="btn ok block lg mt" ${L.complete ? "" : "disabled"} onclick="placeOrder()">PLACE ORDER</button>
    ${L.complete ? "" : `<p class="warn-t" style="font-size:12px">Place Order is disabled — loading is incomplete.</p>`}
  </div></div></div>`;
};
function placeOrder() {
  const no = "SO-2026-" + String(Math.max(148, ...ORDERS.map((o) => +o.no.slice(-4))) + 1).padStart(4, "0");
  ORDERS.unshift({ no, cust: ME, date: fmtDate(new Date()), currency: levelCur(levelOf(ME)), created: new Date().toISOString(), target: state.cartTarget, stage: 0, paid: 0, reserveUntil: "", problem: false, items: cartItems().map(([s, b]) => [s, b]), note: $("#ckNote")?.value.trim() || "", po: $("#ckPo")?.value.trim() || "" });
  state.logs[no] = [[new Date().toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }).replace(",", ""), `${C(ME).name} siparişi portaldan oluşturdu`]];
  state.cart = {};
  toast(`Order ${no} submitted · your sales rep Ferhat has been notified`);
  go("customer/order/" + no);
}

CUST.orders = () => `${head("My Orders", "", `<button class="btn gold" onclick="go('customer/products')">${ic("plus")} New Order</button>`)}<div class="card">${ordersTable(ORDERS.filter((o) => o.cust === ME), true)}</div>`;
CUST.order = (no) => {
  const o = O(no), L = loadCalc(o.items, o.target), ps = payState(o), t = orderTotal(o);
  return `${head(`Order ${no}`, `${o.date} · ${money(t, o.currency)} · ${targetLabel(o.target)}`, `<button class="btn" onclick="reorder('${no}')">${ic("copy")} Reorder</button>`, `<a href="#/customer/orders">My Orders</a> / ${no}`)}
  <div class="card">${stepper(Math.min(o.stage, 5), STAGES_EN)}</div>
  ${o.note || o.po ? `<div class="card note-card mt"><div class="card-h"><h3>${ic("edit")} Your Note</h3>${o.po ? `<span class="pill plain">PO: ${o.po}</span>` : ""}</div>${o.note ? `<p class="notranslate">${o.note.replace(/</g, "&lt;")}</p>` : ""}</div>` : ""}
  <div class="grid g-side mt"><div class="card"><div class="card-h"><h3>Products</h3></div><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Product</th><th class="c">Boxes</th><th class="r">Pcs</th><th class="r">Total</th></tr></thead><tbody>
    ${o.items.map(([sku, b, pr]) => { const p = P(sku); return `<tr><td><div class="prod-cell">${thumb(p)}<div><b>${p.name}</b><br><small class="mono">${sku}</small></div></div></td><td class="c">${b}</td><td class="r muted">${num(b * p.pcsBox)}</td><td class="r strong">${money(lineTotal(sku, b, orderLevel(o), pr), o.currency)}</td></tr>`; }).join("")}
    </tbody></table></div></div>
  <div><div class="card"><div class="card-h"><h3>Summary</h3></div><div class="stat-row"><span>Pallets</span><b>${L.pallets.length}</b></div><div class="stat-row"><span>Boxes / pcs</span><b>${num(L.boxes)} / ${num(L.pcs)}</b></div><div class="stat-row"><span>Payment</span><b><span class="pill ${ps[1]}">${ps[0]}</span></b></div><div class="stat-row"><span>Paid / Balance</span><b>${money(o.paid, o.currency)} / ${money(Math.max(0, t - o.paid), o.currency)}</b></div><div class="stat-row"><span>Incoterm</span><b>EXW Düzce</b></div></div>
  <div class="card mt"><div class="card-h"><h3>Documents</h3></div>${[["pi", "Proforma Invoice", true], ["pl", "Packing List", true], ["ci", "Commercial Invoice", o.stage >= 5]].map(([k, d, ok]) => `<div class="stat-row"><span style="color:var(--text)">${ic("file")} ${d}</span>${ok ? `<button class="btn sm" onclick="openDoc('${o.no}','${k}')">${ic("download")}</button>` : `<small class="dim">not yet</small>`}</div>`).join("")}</div></div></div>`;
};
function reorder(no) {
  const o = O(no);
  state.cart = {};
  const missing = [];
  o.items.forEach(([s, b]) => { const p = P(s); if (stockState(p) === "out") missing.push(p.name); else state.cart[s] = Math.min(b, availBoxes(p)); });
  state.cartTarget = o.target;
  toast(missing.length ? `Copied with current prices · out of stock: ${missing.join(", ")}` : "Order copied with current prices & stock", missing.length ? "alert" : "copy");
  go("customer/products");
}
CUST.forecast = () => `${head("Forecast", "", `<button class="btn" onclick="toast('September forecast copied','copy')">${ic("copy")} Copy previous month</button><button class="btn" onclick="toast('Last order copied into forecast','copy')">${ic("copy")} Copy last order</button><button class="btn gold" onclick="toast('October forecast submitted · thank you!')">Submit Forecast</button>`)}
  <div class="grid g-side"><div class="card"><div class="card-h"><h3>October 2026</h3></div><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Product</th><th class="c">Boxes</th><th class="r">Pcs</th><th class="r">Est. value</th></tr></thead><tbody>
    ${[["BC-400-2", 60], ["BW-20-SKL", 40], ["BW-150-MAT-1018", 50], ["BSG-1000-77", 30], ["BNS-W", 25]].map(([s, b]) => { const p = P(s); return `<tr><td><div class="prod-cell">${thumb(p)}<div><b>${p.name}</b><br><small class="mono">${s}</small></div></div></td><td class="c"><input class="input" style="width:80px;height:34px;text-align:center" value="${b}"></td><td class="r muted">${num(b * p.pcsBox)}</td><td class="r strong">${money(lineTotal(s, b))}</td></tr>`; }).join("")}
    </tbody></table></div><button class="btn sm mt">${ic("plus")} Add product</button></div>
  <div class="card flat"><div class="form"><div class="field"><label>Month</label><select class="input"><option>October 2026</option><option>November 2026</option></select></div><div class="field"><label>Expected order date</label><input class="input" type="date" value="2026-10-20"></div><div class="field"><label>Estimated budget (USD)</label><input class="input" value="25,000"></div><div class="field"><label>Confidence</label><select class="input"><option>High</option><option>Medium</option><option>Low</option></select></div></div></div></div>`;
CUST.documents = () => `${head("Document Center", "", `<button class="btn gold" onclick="toast('All available documents are being zipped','download')">${ic("download")} Download All</button>`)}<div class="card">${docsTable(true, C(ME))}</div>`;
CUST.marketing = () => `${head("Marketing Hub", "", `<button class="btn gold" onclick="toast('Brand kit downloading','download')">${ic("download")} Brand Kit</button>`)}${mkChips(true)}${assetGrid()}`;
CUST.account = () => { const c = C(ME); return `${head("Account", c.name)}
  <div class="grid g2"><div class="card"><div class="card-h"><h3>Company</h3></div><dl class="dl"><dt>Company</dt><dd>${c.name}</dd><dt>Country</dt><dd>${c.flag} ${c.country}</dd><dt>VAT</dt><dd class="mono">${c.vat}</dd><dt>Payment term</dt><dd>${c.payment}</dd><dt>Shipping term</dt><dd>${c.incoterm}</dd><dt>Your sales rep</dt><dd>${c.sales} · ferhat@marmarabarber.com</dd></dl></div>
  <div class="card"><div class="card-h"><h3>Addresses</h3><button class="btn sm">${ic("plus")} Add</button></div><div class="stat-row"><span style="color:var(--text)">Berlin Warehouse</span><small class="muted">Default</small></div><div class="stat-row"><span style="color:var(--text)">Hamburg Hub</span><small></small></div>
  <div class="card-h mt"><h3>Legal</h3></div>${["kvkk", "privacy", "consent", "cookies", "terms"].map((k) => `<div class="stat-row notranslate"><a class="strong" onclick="legalOpen('${k}')">${LEGAL[k].title[LANG === "tr" ? "tr" : "en"]}</a><span class="muted">v${LEGAL_VERSION}</span></div>`).join("")}
  <div class="card-h mt"><h3>Users</h3><button class="btn sm">${ic("plus")} Invite</button></div><div class="stat-row"><span style="color:var(--text)">John Smith</span><small class="muted">Admin</small></div><div class="stat-row"><span style="color:var(--text)">Lena Fischer</span><small class="muted">Orders</small></div></div></div>`; };

// ═════════════════════════════ FABRİKA ═════════════════════════════
const FACT = {};
FACT.queue = () => `${head("Hazırlık Kuyruğu", "")}<div class="card">${prepTable(true)}</div>`;
FACT.prep = (no) => {
  no = no || "SO-2026-0145";
  const o = O(no), L = loadCalc(o.items, o.target);
  const pr = (state.prep[no] ||= Object.fromEntries(o.items.map(([s]) => [s, 0])));
  const allDone = o.items.every(([s, b]) => (pr[s] || 0) >= b);
  const pc = (state.palletCheck[no] ||= L.pallets.map(() => o.stage === 4));
  const allChecked = pc.every(Boolean);
  return `${head(`Sipariş ${no}`, `Hazırlığa bırakıldı · ${C(o.cust).flag} ${C(o.cust).country} · ${targetLabel(o.target)} · ${L.pallets.length} palet`, `${o.stage === 4 ? '<span class="pill ok">TAMAMLANDI</span>' : '<span class="pill warn">HAZIRLANIYOR</span>'}`, `<a href="#/factory/queue">Kuyruk</a> / ${no}`)}
  <div class="card" style="margin-bottom:18px">${stepper(o.stage === 4 ? 3 : allDone ? 2 : 1, ["Kuyruk", "Koli Hazırlama", "Palet Kontrol", "Tamamlandı"])}</div>
  ${o.problem ? `<div class="notice err" style="margin-bottom:18px">${ic("alert")}<span><b>Bildirilen problem:</b> BC-400-2 — 103 koli gerekli, 101 bulundu. Satış + Operasyon'a alert düştü, müşteriye otomatik gösterilmez.</span></div>` : ""}
  <div class="grid g-main"><div class="card"><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Ürün</th><th class="r">Gerekli</th><th class="c">Hazırlanan</th><th class="c">Durum</th></tr></thead><tbody>
    ${o.items.map(([s, b]) => { const p = P(s), d = pr[s] || 0; return `<tr><td><div class="prod-cell"><div class="thumb" style="width:56px;height:56px">${p.img ? `<img src="${imgSrc(p.img)}">` : noImg(p)}</div><div><b>${p.name}</b><br><small class="mono">${s}</small> <small class="muted">· ${p.cls}</small></div></div></td>
      <td class="r"><b>${b} koli</b><br><small class="muted">${num(b * p.pcsBox)} pcs</small></td>
      <td class="c"><div class="qty" style="width:150px;margin:auto"><button onclick="prepSet('${no}','${s}',${d - 1})">−</button><input value="${d}" onchange="prepSet('${no}','${s}',this.value)"><button onclick="prepSet('${no}','${s}',${d + 1})">+</button></div></td>
      <td class="c">${d >= b ? '<span class="pill ok">✓ Tamam</span>' : d > 0 ? `<span class="pill warn">${b - d} eksik</span>` : '<span class="pill plain">Bekliyor</span>'}</td></tr>`; }).join("")}
    </tbody></table></div>
    <div class="between mt wrap"><button class="btn danger" onclick="reportProblem('${no}')">${ic("alert")} Problem Bildir</button>${o.stage === 4 ? `<span class="pill ok">${ic("check")} Hazırlık Tamamlandı</span>` : !allChecked ? `<button class="btn lg" disabled>${ic("layers")} Paletleri kontrol edin (${pc.filter(Boolean).length}/${pc.length})</button>` : allDone ? `<button class="btn ok lg" onclick="finishPrep('${no}')">${ic("check")} Hazırlık Tamamlandı</button>` : `<button class="btn warn lg" onclick="finishShort('${no}')">${ic("alert")} Eksikle Tamamla</button>`}</div></div>
  <div class="card flat"><div class="card-h"><h3>Palet Planı</h3></div>${palletVisual(L, true)}${skuLegend(o.items)}
    <div class="divider"></div>${L.pallets.map((p, i) => `<div class="stat-row"><label class="row" style="cursor:pointer"><input type="checkbox" ${pc[i] ? "checked" : ""} ${o.stage === 4 ? "disabled" : ""} onchange="state.palletCheck['${no}'][${i}]=this.checked;rerender()"><span>Palet ${i + 1} · ${[...new Set(p.segs.map((x) => x.sku))].join(", ")}</span></label><b>${p.h} cm · ${num(p.kg)} kg</b></div>`).join("")}
    </div></div>`;
};
function finishPrep(no) {
  const o = O(no); o.stage = 4; o.problem = false; o.shipped = { ...state.prep[no] };
  log(no, "Hazırlık tamamlandı · final packing kontrolüne gönderildi");
  toast("Hazırlık tamamlandı · Operasyon final packing kontrolüne düştü"); rerender();
}
function finishShort(no) {
  const o = O(no), pr = state.prep[no];
  const miss = o.items.filter(([s, b]) => (pr[s] || 0) < b);
  modal(`<h2>Eksikle Tamamla</h2>
  <div class="tbl-wrap" style="margin:0"><table class="tbl"><thead><tr><th>Ürün</th><th class="r">Gerekli</th><th class="r">Hazırlanan</th><th class="r">Eksik</th></tr></thead><tbody>
  ${miss.map(([s, b]) => `<tr><td><b>${P(s).name}</b><br><small class="mono">${s}</small></td><td class="r">${b} koli</td><td class="r">${pr[s] || 0} koli</td><td class="r err-t strong">${b - (pr[s] || 0)} koli</td></tr>`).join("")}
  </tbody></table></div>
  <div class="field mt"><label>Not</label><textarea class="input" id="shortNote" placeholder="Örn. kalan 2 koli bir sonraki sevkiyata eklenecek"></textarea></div>
  <div class="notice warn mt">${ic("info")}<span>Satış + Operasyon bilgilendirilir. Packing List ve Commercial Invoice hazırlanan miktarlarla oluşur.</span></div>
  <div class="m-actions"><button class="btn" onclick="closeModal()">Vazgeç</button><button class="btn warn" onclick="confirmShort('${no}')">Eksikle Tamamla</button></div>`);
}
function confirmShort(no) {
  const o = O(no), pr = state.prep[no], note = $("#shortNote")?.value.trim();
  o.shipped = { ...pr }; o.stage = 4; o.problem = false;
  const miss = o.items.filter(([s, b]) => (pr[s] || 0) < b).map(([s, b]) => `${s} ${pr[s] || 0}/${b}`).join(", ");
  log(no, `Hazırlık eksikle tamamlandı: ${miss}${note ? " · Not: " + note : ""}`);
  closeModal(); toast("Eksikle tamamlandı · Satış + Operasyon bilgilendirildi", "alert"); rerender();
}
function prepSet(no, sku, v) {
  const need = O(no).items.find(([s]) => s === sku)[1];
  state.prep[no][sku] = Math.max(0, Math.min(need, parseInt(v) || 0));
  rerender();
}
function reportProblem(no) {
  const o = O(no);
  modal(`<h2>Problem Bildir</h2><p class="muted">Satış ve Operasyon'a anında alert düşer. Müşteriye otomatik gösterilmez.</p>
  <div class="form cols2"><div class="field span2"><label>Ürün</label><select class="input" onchange="$('#pbReq').value=this.value;$('#pbFound').dispatchEvent(new Event('input'))">${o.items.map(([s, b]) => `<option value="${b}">${s} — ${P(s).name}</option>`).join("")}</select></div>
  <div class="field"><label>Gerekli</label><input class="input" id="pbReq" value="${o.items[0][1]}" disabled></div><div class="field"><label>Fiziksel bulunan</label><input class="input" type="number" id="pbFound" value="${o.items[0][1] - 2}" oninput="$('#pbMiss').value=Math.max(0,$('#pbReq').value-this.value)"></div><div class="field"><label>Eksik</label><input class="input" id="pbMiss" value="2" disabled></div><div class="field"><label>Problem tipi</label><select class="input"><option>Eksik stok</option><option>Hasarlı koli</option><option>Yanlış ürün</option><option>Etiket / lot</option></select></div>
  <div class="field span2"><label>Not</label><textarea class="input" placeholder="Örn. depoda 2 koli hasarlı çıktı"></textarea></div></div>
  <div class="m-actions"><button class="btn" onclick="closeModal()">Vazgeç</button><button class="btn danger" onclick="O('${no}').problem=true;closeModal();toast('Problem bildirildi · Ferhat + Operasyon bilgilendirildi','alert');rerender()">Bildir</button></div>`);
}

// ——— Üst arama: ürün / müşteri / sipariş, Türkçe kelimelerle ———
const CAT_TR = {
  Cologne: "kolonya kolonyası parfüm koku", Fragrance: "parfüm parfum edp koku", "Hair Styling": "wax vaks şekillendirici jöle sprey saç",
  "Hair Care": "şampuan sampuan saç bakım krem fön suyu", Shaving: "tıraş tiras jeli jel", Beard: "sakal yağı yag bakım",
  Accessories: "aksesuar boyun bandı penuar önlük fırça tarak çanta stand pompa",
  "Home Fragrance": "oda kokusu çubuk sprey ev",
};
const srchNorm = (s) => String(s).toLocaleLowerCase("tr").replace(/ı/g, "i").replace(/ş/g, "s").replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ö/g, "o").replace(/ç/g, "c");
const srchHit = (text, q) => srchNorm(q).split(/\s+/).filter(Boolean).every((w) => srchNorm(text).split(/[^a-z0-9]+/).some((t) => t.startsWith(w)) || srchNorm(text).includes(w));
const prodText = (p) => `${p.name} ${p.sku} ${p.brand} ${p.cat} ${CAT_TR[p.cat] || ""} ${p.ean}`;
let srchIdx = 0;
function srchResults(q) {
  const mode = state.mode, out = [];
  PRODUCTS.filter((p) => srchHit(prodText(p), q)).slice(0, 6).forEach((p) => out.push({ g: "Ürünler", html: `${thumb(p)}<div><b>${p.name}</b><small class="mono">${p.sku} · ${p.cat}</small></div>`, go: mode === "admin" ? `admin/product/${p.sku}` : mode === "customer" ? "customer/products" : null, q: p.sku }));
  if (mode === "admin") CUSTOMERS.filter((c) => srchHit(`${c.name} ${c.country} ${c.city} ${c.id} ${c.contact}`, q)).slice(0, 4).forEach((c) => out.push({ g: "Müşteriler", html: `<span class="srch-ic">${c.flag}</span><div><b>${c.name}</b><small>${c.country} · ${c.id}</small></div>`, go: `admin/${c.status === "Pending" ? "application" : "customer"}/${c.id}` }));
  ORDERS.filter((o) => (mode !== "customer" || o.cust === ME) && (mode !== "factory" || o.stage >= 3) && srchHit(`${o.no} ${C(o.cust).name} ${o.items.map(([s]) => s).join(" ")}`, q)).slice(0, 4).forEach((o) =>
    out.push({ g: "Siparişler", html: `<span class="srch-ic">${ic("cart")}</span><div><b class="mono">${o.no}</b><small>${C(o.cust).name} · ${STAGES[o.stage]}</small></div>`, go: mode === "factory" ? `factory/prep/${o.no}` : `${mode}/order/${o.no}` }));
  return out.filter((r) => r.go);
}
function srchRender() {
  const inp = $(".top .search input"), box = $("#srchBox"), q = inp.value.trim();
  if (!q) { box.classList.remove("open"); return; }
  const res = srchResults(q);
  srchIdx = Math.min(srchIdx, Math.max(0, res.length - 1));
  let g = "";
  box.innerHTML = res.length ? res.map((r, i) => `${r.g !== g ? `<div class="srch-g">${(g = r.g)}</div>` : ""}<a class="srch-row ${i === srchIdx ? "on" : ""}" data-i="${i}" onmousedown="event.preventDefault();srchGo(${i})">${r.html}</a>`).join("") : `<div class="srch-none">Sonuç yok</div>`;
  box._res = res;
  box.classList.add("open");
}
function srchGo(i) {
  const r = $("#srchBox")._res?.[i]; if (!r) return;
  if (r.q && r.go === "customer/products") state.filter.q = r.q;
  const inp = $(".top .search input"); inp.value = ""; inp.blur(); $("#srchBox").classList.remove("open");
  go(r.go);
}
function srchMount() {
  const wrap = $(".top .search"), inp = wrap.querySelector("input");
  wrap.insertAdjacentHTML("beforeend", `<div class="srch-box" id="srchBox"></div>`);
  inp.addEventListener("input", () => { srchIdx = 0; srchRender(); });
  inp.addEventListener("focus", srchRender);
  inp.addEventListener("blur", () => setTimeout(() => $("#srchBox").classList.remove("open"), 120));
  inp.addEventListener("keydown", (e) => {
    const n = $("#srchBox")._res?.length || 0;
    if (e.key === "ArrowDown") { e.preventDefault(); srchIdx = (srchIdx + 1) % Math.max(1, n); srchRender(); }
    else if (e.key === "ArrowUp") { e.preventDefault(); srchIdx = (srchIdx - 1 + n) % Math.max(1, n); srchRender(); }
    else if (e.key === "Enter") { e.preventDefault(); srchGo(srchIdx); }
    else if (e.key === "Escape") { inp.blur(); }
  });
}

// ——— başlat ———
ORDERS.forEach((o) => { syncOrder(o); if (o.paidPct != null) o.paid = Math.round(orderTotal(o) * o.paidPct); });
CUSTOMERS.forEach((c) => (c.currency = levelCur(levelOf(c.id))));
document.querySelectorAll("[data-i]").forEach((el) => (el.outerHTML = ic(el.dataset.i)));
$("#collapse").innerHTML = ic("chevL");
$("#burger").innerHTML = ic("menu");
$("#logoutBtn").innerHTML = ic("logout");
$("#logoutBtn").onclick = authLogout;
cookieNotice();
STORE.ready = storeInit().then(() => { if (authSession()) rerender(); });
srchMount();
$("#collapse").onclick = () => { $("#app").classList.toggle("mini"); $("#collapse").innerHTML = ic($("#app").classList.contains("mini") ? "chevR" : "chevL"); };
$("#burger").onclick = () => $("#app").classList.toggle("nav-open");
$("#notifBtn").onclick = () => go("admin/notifications");
document.querySelectorAll("#modeSwitch button").forEach((b) => (b.onclick = () => go(b.dataset.mode + "/" + (b.dataset.mode === "factory" ? "queue" : "dashboard"))));
$("#modal").onclick = (e) => { if (e.target.id === "modal") closeModal(); };
window.addEventListener("hashchange", render);
render();
