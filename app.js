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
  trash: '<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v6M14 11v6"/>',
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
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
  logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1"/>',
};
const ic = (n, cls = "") => `<svg class="ic ${cls}" viewBox="0 0 24 24">${ICONS[n] || ""}</svg>`;

// ——— yardımcılar ———
const P = (sku) => PRODUCTS.find((p) => p.sku === sku);
const isActive = (p) => p.active !== false;   // pasif ürün müşteri portalında görünmez
// Açık bakiye: final onaylı (proforma kesilmiş) siparişlerde tutar − ödenen
const orderBal = (o) => (o.stage >= 2 ? Math.max(0, orderTotal(o) - (o.paid || 0)) : 0);
const custBalance = (id) => ORDERS.filter((o) => o.cust === id).reduce((s, o) => s + orderBal(o), 0);
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
const itemsTotal = (o) => o.items.reduce((s, [sku, b, pr]) => s + lineTotal(sku, b, orderLevel(o), pr), 0);
// Sipariş bazında ek bedel (+) / indirim (−) satırları, açıklamalı: [{ label, amount }]
const adjTotal = (o) => (o.adjust || []).reduce((s, a) => s + (+a.amount || 0), 0);
const orderTotal = (o) => itemsTotal(o) + adjTotal(o);
const orderBoxes = (items) => items.reduce((s, [, b]) => s + b, 0);
const targetLabel = (t) => (t === "pallet" ? "Palet" : SETTINGS.containers[t]?.label || "—");
// Sipariş miktarı: koli / adet / brüt kg (palet & konteyner hesabı kaldırıldı)
const orderQty = (items) => items.reduce((a, [sku, b]) => { const p = P(sku); a.boxes += b; a.pcs += b * p.pcsBox; a.kg += b * p.kg; return a; }, { boxes: 0, pcs: 0, kg: 0 });
const custAddress = (c) => c.address || [c.city, c.country].filter((x) => x && x !== "—").join(", ");   // fatura adresi
const custShip = (c) => c.shipAddress || custAddress(c);                                                       // teslimat adresi
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
  cart: {},
  cartTarget: "pallet",
  filter: { orders: -1, customers: "all", brand: "all", cat: "all", stock: "all", q: "" },
  pf: { brand: "all", cat: "all", stock: "all", act: "all", q: "" },
  psel: [],
  imp: null,
  of: { q: "", cust: "all", stage: "all" },
  meta: {},
  cf: { q: "", status: "all", country: "all", level: "all", bal: "all" },
  actAs: null,
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
};

const NAV = {
  admin: [
    ["Genel"],
    ["dashboard", "Gösterge", "home"],
    ["notifications", "Aksiyonlar", "bell"],
    ["Satış"],
    ["orders", "Siparişler", "cart"],
    ["customers", "Müşteriler", "users", 2],
    ["pricing", "Fiyatlandırma", "tag"],
    ["Ürün"],
    ["products", "Ürünler", "box"],
    ["Finans & Rapor"],
    ["finance", "Finans", "wallet"],
    ["reports", "Raporlar", "chart"],
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
    ["contact", "Contact", "phone"],
  ],
};

// ——— yönlendirme ———
function go(path) { location.hash = "#/" + path; }
function parse() {
  const parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean).map(decodeURIComponent);
  const mode = ["admin", "customer"].includes(parts[0]) ? parts[0] : "admin";
  const page = parts[1] || "dashboard";
  return { mode, page, arg: parts[2] };
}

function render() {
  if (!authGuard()) return;
  const { mode, page, arg } = parse();
  state.mode = mode;
  document.querySelectorAll("#modeSwitch button").forEach((b) => b.classList.toggle("on", b.dataset.mode === mode));
  let [ini, name, role] = USERS_BY_MODE[mode];
  const sess = authSession();
  if (sess && (sess.role === mode || sess.role === "admin")) { name = sess.name; role = sess.title; ini = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase(); }
  $("#modeSwitch").style.display = "none";   // admin ve müşteri panelleri ayrı
  $("#avatar").textContent = ini; $("#meName").textContent = name; $("#meRole").textContent = role;
  $("#sideTag").textContent = mode === "customer" ? "B2B CUSTOMER PORTAL" : "B2B BACK OFFICE";
  $("#notifBtn").style.display = mode === "admin" ? "" : "none";
  const un = actionUnread(); $("#notifBtn em").textContent = un; $("#notifBtn em").style.display = un ? "" : "none";

  // müşteri bildirimi olan siparişi açtıysa: okundu say (menü rozeti bu çizimde düşsün)
  if (mode === "customer" && page === "order") { const fo = O(arg); state.freshNotice = fo?.custNotice && !fo.custNotice.seen && sess?.role === "customer" ? (fo.custNotice.seen = true, arg) : state.freshNotice === arg ? arg : null; }
  const activeKey = mode === "admin" && ["neworder", "checkout"].includes(page) ? "orders" : { customer: "customers", order: "orders", application: "customers", product: "products", checkout: "products" }[page] || page;
  $("#nav").innerHTML = NAV[mode].map((n) => {
    if (n.length === 1) return `<div class="nav-group">${n[0]}</div>`;
    const [key, label, icon] = n;
    const badge = mode === "admin" && key === "customers" ? CUSTOMERS.filter((c) => c.status === "Pending").length : mode === "admin" && key === "notifications" ? actionUnread() : mode === "customer" && key === "orders" ? custNotices().length : n[3];
    return `<a class="nav-item ${key === activeKey ? "on" : ""}" href="#/${mode}/${key}" data-short="${label.split(" ")[0]}">${ic(icon)}<span>${label}</span>${badge ? `<span class="badge">${badge}</span>` : ""}</a>`;
  }).join("");
  $("#nav .nav-item.on")?.scrollIntoView({ block: "nearest" });

  const views = { admin: ADMIN, customer: CUST }[mode];
  const fn = views[page] || views[Object.keys(views)[0]];
  $("#view").innerHTML = fn(arg);
  prodFilter(); orderFilter(); custFilter();
  storeQueue();
  $("#app").classList.remove("nav-open");
  window.scrollTo(0, 0);
}
function rerender() { if (!authSession()) return; const y = window.scrollY; const { mode, page, arg } = parse(); const views = { admin: ADMIN, customer: CUST }[mode]; $("#view").innerHTML = (views[page] || views[Object.keys(views)[0]])(arg); prodFilter(); orderFilter(); custFilter(); window.scrollTo(0, y); storeQueue(); }

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
    acts: [["err", "cart", "Onay bekleyen sipariş", 2, "admin/orders"], ["err", "box", "Hazırlık problemi", 2, "admin/orders"], ["warn", "trend", "Eksik forecast", 3, "admin/forecast"], ["warn", "file", "Süresi dolan doküman", 1, "admin/documents"]] },
  sales: { label: "Satış · Ferhat", kpis: [["$214,300", "Benim satışım", "trend", "+6.1%"], ["18", "Müşterilerim", "users"], ["2", "İncelememde", "cart"], ["$142,000", "Ekim forecast", "trend"]],
    acts: [["err", "cart", "Satış incelemesi bekleyen", 1, "admin/order/SO-2026-0148"], ["gold", "users", "Yeni başvuru", 2, "admin/customers"], ["warn", "trend", "Forecast girmeyen müşterim", 3, "admin/forecast"], ["plain", "clock", "60 gündür sipariş vermeyen", 1, "admin/customer/C-1002"]] },
  approve: { label: "Onay · Gözde", kpis: [["2", "Final onay bekleyen", "shield"], ["2", "Onay bekleyen başvuru", "users"], ["3", "Yeni sipariş", "cart"], ["$428,650", "Bu ay satış", "trend", "+9.6%"]],
    acts: [["err", "shield", "Final onay bekliyor", 2, "admin/order/SO-2026-0147"], ["gold", "users", "Müşteri başvurusu", 2, "admin/customers"], ["warn", "tag", "Fiyat değişikliği onayı", 1, "admin/pricing"]] },
  ops: { label: "Operasyon", kpis: [["7", "Hazırlanıyor", "box"], ["3", "Sevke hazır", "truck"], ["2", "Hazırlık problemi", "alert"], ["4", "Bu hafta pickup", "calendar"]],
    acts: [["err", "box", "Hazırlık problemi", 2, "admin/orders"], ["ok", "truck", "Final packing bekliyor", 1, "admin/shipments"], ["info", "container", "Eksik yükleme planı", 1, "admin/loading"]] },
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
    <div class="card"><div class="card-h"><h3>Forecast</h3></div>
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

// En yeni sipariş en üstte (oluşturma zamanı, yoksa sipariş no)
const sortOrders = (list) => list.slice().sort((a, b) => (b.created || "").localeCompare(a.created || "") || b.no.localeCompare(a.no));
function ordersTable(list, en, del) {
  if (!list.length) return `<div class="empty">Bu filtrede sipariş yok.</div>`;
  return `<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Sipariş</th>${en ? "" : "<th>Ülke</th><th>Müşteri</th>"}<th>Tarih</th>${en ? "" : "<th>Müşteri PO</th>"}<th class="r">Tutar</th><th>${en ? "Payment" : "Ödeme"}</th><th>${en ? "Status" : "Durum"}</th>${del ? "<th></th>" : ""}</tr></thead><tbody>
  ${sortOrders(list).map((o) => { const c = C(o.cust), ps = payState(o); return `<tr class="click" data-oq="${pfEsc(`${o.no} ${c.name} ${c.country} ${o.po || ""}`)}" data-stage="${o.stage}" data-cust="${o.cust}" onclick="go('${en ? "customer" : "admin"}/order/${o.no}')">
    <td class="mono strong">${o.no}</td>${en ? "" : `<td>${c.flag || ""} ${c.country || "—"}</td><td>${c.name}</td>`}<td class="muted">${o.date}</td>${en ? "" : `<td class="mono muted">${o.po && o.po !== o.no ? o.po : "—"}</td>`}
    <td class="r strong">${money(orderTotal(o), o.currency)}</td><td><span class="pill ${ps[1]}">${en ? ps[0] : ps[2]}</span></td><td>${stagePill(o.stage, en)}${o.problem && !en ? ` <span class="pill err plain">Problem</span>` : ""}</td>${del ? `<td class="r" onclick="event.stopPropagation()"><button class="btn sm ghost" title="Siparişi sil" onclick="deleteOrder('${o.no}')">${ic("trash")}</button></td>` : ""}</tr>`; }).join("")}
  </tbody></table></div>`;
}

// ——— Aksiyonlar: yeni üye başvurusu + yeni sipariş (işlem yapılınca listeden düşer) ———
const seenGet = () => { try { return new Set(JSON.parse(localStorage.getItem("mbSeen") || "[]")); } catch { return new Set(); } };
const seenAdd = (keys) => { const s = seenGet(); keys.forEach((k) => s.add(k)); try { localStorage.setItem("mbSeen", JSON.stringify([...s])); } catch {} };
function actionItems() {
  const a = [], when = (x) => Date.parse(x) || 0;
  CUSTOMERS.filter((c) => c.status === "Pending").forEach((c) => a.push({ k: "c:" + c.id, t: "accent", i: "users", title: `Yeni üye başvurusu — ${c.name}`, sub: `${c.flag || ""} ${c.country} · ${c.contact || ""} · ${c.applied || ""}`, href: `admin/application/${c.id}`, at: when(c.consents?.kvkk || c.applied) }));
  ORDERS.filter((o) => o.stage === 0).forEach((o) => a.push({ k: "o:" + o.no, t: "err", i: "cart", title: `Yeni sipariş — ${o.no}`, sub: `${C(o.cust)?.flag || ""} ${C(o.cust)?.name} · ${money(orderTotal(o), o.currency)} · ${o.date}${o.by ? " · giren: " + o.by : ""}`, href: `admin/order/${o.no}`, at: when(o.created || o.date) }));
  return a.sort((x, y) => y.at - x.at);
}
const actionUnread = () => { const s = seenGet(); return actionItems().filter((x) => !s.has(x.k)).length; };
function actionOpen(k, href) { seenAdd([k]); go(href); }
ADMIN.notifications = () => {
  const items = actionItems(), seen = seenGet(), un = items.filter((x) => !seen.has(x.k)).length;
  return `${head("Aksiyonlar", "", un ? `<button class="btn" onclick="seenAdd(actionItems().map((x)=>x.k));toast('Tümü okundu olarak işaretlendi');render()">${ic("check")} Tümünü okundu yap</button>` : "")}
  <div class="card">${items.length ? `<ul class="act">
    ${items.map((x) => `<li class="${seen.has(x.k) ? "read" : ""}" onclick="actionOpen('${x.k}','${x.href}')"><span class="act-ic" style="background:var(--${x.t}-bg);color:var(--${x.t})">${ic(x.i)}</span><span class="act-t"><b style="display:block;color:var(--text)">${x.title}</b><small class="muted">${x.sub}</small></span>${seen.has(x.k) ? "" : '<span class="dot-new"></span>'}<button class="btn sm">İncele</button></li>`).join("")}
  </ul>` : `<div class="empty">Bekleyen aksiyon yok. Yeni sipariş veya üye başvurusu gelince burada görünür.</div>`}</div>
  <p class="muted mt" style="font-size:12.5px">Yeni sipariş satış incelemesinden geçince, üye başvurusu onaylanınca listeden düşer.</p>`;
};

// ——— Müşteriler ———
const custInfoDl = (c) => {
  const v = (x) => (x && x !== "—" ? pfEsc(x) : '<span class="dim">—</span>');
  const link = (u) => (u && u !== "—" ? `<a href="${/^https?:/.test(u) ? pfEsc(u) : "https://" + pfEsc(u)}" target="_blank" rel="noopener">${pfEsc(u)}</a>` : v(u));
  const ig = (x) => (x && x !== "—" ? `<a href="https://instagram.com/${pfEsc(x.replace(/^@/, ""))}" target="_blank" rel="noopener">${pfEsc(x)}</a>` : v(x));
  const rows = [["Firma", v(c.name)], ["Firma tipi", v(c.type)], ["Ülke / Şehir", `${c.flag || ""} ${v(c.country)} · ${v(c.city)}`], ["Fatura adresi", v(c.address)], ["Teslimat adresi", v(c.shipAddress || c.address)], ["VAT / Vergi no", `<span class="mono">${v(c.vat)}</span>`],
    ["Yetkili kişi", v(c.contact)], ["Pozisyon", v(c.position)], ["E-posta", c.email ? `<a href="mailto:${pfEsc(c.email)}">${pfEsc(c.email)}</a>` : v("")], ["Telefon / WhatsApp", v(c.phone)],
    ["Web sitesi", link(c.website)], ["Instagram", ig(c.instagram)], ["İlgilendiği markalar", v(c.brands)], ["Başvuru tarihi", v(c.applied)], ["Portal girişi", c.imported ? (c.pwSet ? `Şifre belirlendi · ${fmtDate(new Date(c.pwSet))}` : `<span class="warn-t">Henüz giriş yapmadı</span> <small class="muted">(ilk girişte e-postasıyla şifre belirleyecek)</small>`) + (c.account ? ` <small class="muted">· ${pfEsc(c.account)}</small>` : "") : "Üyelik başvurusuyla"],
    ["Yasal onaylar", c.consents ? `KVKK ✓ · Koşullar ✓ · Pazarlama ${c.consents.marketing ? "✓" : "✗"} <small class="muted">(v${c.consents.version})</small>` : v("")], ["Son güncelleme", v(c.updated)]];
  return `<dl class="dl info-dl">${rows.map(([k, x]) => `<dt>${k}</dt><dd class="notranslate">${x}</dd>`).join("")}</dl>`;
};
ADMIN.customers = () => {
  const f = state.cf, cur = (c) => levelCur(levelOf(c.id));
  const countries = [...new Set(CUSTOMERS.map((c) => c.country))].sort();
  const bals = CUSTOMERS.map((c) => [c, custBalance(c.id)]).filter(([, b]) => b > 0.005);
  const byCur = {}; bals.forEach(([c, b]) => (byCur[cur(c)] = (byCur[cur(c)] || 0) + b));
  const set = (k) => `state.cf.${k}=this.value;custFilter()`;
  const opt = (v, l, x) => `<option value="${pfEsc(v)}" ${x === v ? "selected" : ""}>${l}</option>`;
  return `${head("Müşteriler", "", "")}
  <div class="grid g4" style="margin-bottom:18px">${kpi(CUSTOMERS.filter((c) => c.status === "Active").length, "Aktif müşteri", "", "users")}${kpi(CUSTOMERS.filter((c) => c.status === "Pending").length, "Onay bekleyen", "", "clock")}${kpi(Object.keys(byCur).length ? Object.entries(byCur).map(([k, v]) => money(v, k)).join(" · ") : money(0), "Toplam açık bakiye", "", "wallet")}${kpi(bals.length, "Bakiyesi olan müşteri", "", "alert")}</div>
  ${bals.length ? `<div class="card" style="margin-bottom:18px"><div class="card-h"><h3>Açık Bakiyeler</h3><span class="sub">Bakiyesi sıfırlanan müşteri bu listeden kalkar</span></div><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Müşteri</th><th class="r">Açık bakiye</th><th class="r"></th></tr></thead><tbody>
    ${bals.sort((x, y) => y[1] - x[1]).map(([c, b]) => `<tr><td><a class="strong" href="#/admin/customer/${c.id}">${c.flag || ""} ${pfEsc(c.name)}</a></td><td class="r strong warn-t">${money(b, cur(c), 2)}</td><td class="r"><div class="row" style="justify-content:flex-end"><button class="btn sm gold" onclick="custPayment('${c.id}',1)">Ödeme ekle</button><button class="btn sm" onclick="custPayment('${c.id}',-1)">Ödeme çıkart</button></div></td></tr>`).join("")}
  </tbody></table></div></div>` : ""}
  <div class="filters pf" id="cf">
    <div class="search pf-q"><span>${ic("search")}</span><input type="search" value="${pfEsc(f.q)}" placeholder="Firma, kişi, e-posta veya şehir ara…" oninput="${set("q")}"></div>
    <select onchange="${set("status")}">${opt("all", "Tüm durumlar", f.status)}${opt("Pending", "Onay bekleyen", f.status)}${opt("Active", "Aktif", f.status)}${opt("Inactive", "Pasif", f.status)}</select>
    <select onchange="${set("country")}">${opt("all", "Tüm ülkeler", f.country)}${countries.map((c) => opt(c, c, f.country)).join("")}</select>
    <select onchange="${set("level")}">${opt("all", "Tüm seviyeler", f.level)}${LEVELS.map((l) => opt(String(l.id), l.name, f.level)).join("")}</select>
    <select onchange="${set("bal")}">${opt("all", "Bakiye: tümü", f.bal)}${opt("1", "Bakiyesi olanlar", f.bal)}</select>
    <span class="pf-n muted" id="cfN"></span>
  </div>
  <div class="card"><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Firma</th><th>Ülke</th><th>Satış Sorumlusu</th><th>Fiyat Seviyesi</th><th class="r">Açık Bakiye</th><th>Son Sipariş</th><th>Durum</th></tr></thead><tbody>
  ${CUSTOMERS.map((c) => { const b = custBalance(c.id), last = sortOrders(ORDERS.filter((o) => o.cust === c.id))[0];
    return `<tr class="click" data-cq="${pfEsc(`${c.name} ${c.id} ${c.contact || ""} ${c.email || ""} ${c.city || ""} ${c.country}`)}" data-status="${c.status.startsWith("Inactive") ? "Inactive" : c.status}" data-country="${pfEsc(c.country)}" data-level="${c.status === "Pending" ? "" : levelOf(c.id)}" data-bal="${b > 0.005 ? 1 : 0}" onclick="go('admin/${c.status === "Pending" ? "application" : "customer"}/${c.id}')">
    <td><b>${c.name}</b><br><small class="dim mono">${c.id}</small></td><td>${c.flag || ""} ${c.country}</td><td>${c.sales || '<span class="dim">— atanmadı</span>'}</td><td>${c.status === "Pending" ? '<span class="dim">—</span>' : `Level ${levelOf(c.id)}`}</td>
    <td class="r ${b > 0.005 ? "strong warn-t" : "dim"}">${b > 0.005 ? money(b, cur(c), 2) : "—"}</td><td class="muted">${c.status === "Pending" ? "Başvuru: " + (c.applied || "—") : last ? `${last.no} · ${last.date}` : c.lastOrder || "—"}</td>
    <td><span class="pill ${c.status === "Active" ? "ok" : c.status === "Pending" ? "gold" : "err"}">${c.status === "Pending" ? "Onay Bekliyor" : c.status === "Active" ? "Aktif" : "Pasif"}</span></td></tr>`; }).join("")}
  </tbody></table><div class="pf-empty muted" id="cfEmpty" style="display:none">Bu filtrede müşteri yok.</div></div></div>`;
};
function custFilter() {
  if (!$("#cf")) return;
  const f = state.cf, rows = [...document.querySelectorAll("#view [data-cq]")];
  let n = 0;
  rows.forEach((el) => { const d = el.dataset, hit = (f.status === "all" || d.status === f.status) && (f.country === "all" || d.country === f.country) && (f.level === "all" || d.level === f.level) && (f.bal === "all" || d.bal === "1") && (!f.q.trim() || srchHit(d.cq, f.q)); el.style.display = hit ? "" : "none"; n += hit; });
  $("#cfN").textContent = `${n} / ${rows.length} müşteri`;
  $("#cfEmpty").style.display = n ? "none" : "";
}

ADMIN.application = (id) => {
  const c = C(id);
  const opt = (arr, sel) => arr.map((a) => `<option value="${a}" ${a === sel ? "selected" : ""}>${a}</option>`).join("");
  return `${head(`Başvuru — ${c.name}`, "", `<button class="btn warn" onclick="toast('Ek bilgi talebi ${c.email} adresine gönderildi','send')">Bilgi İste</button><button class="btn danger" onclick="toast('Başvuru reddedildi','x')">Reddet</button><button class="btn ok" onclick="approveCustomer('${id}')">${ic("check")} Onayla</button>`, `<a href="#/admin/customers">Müşteriler</a> / Başvuru ${c.id}`)}
  <div class="grid g2">
    <div class="card"><div class="card-h"><h3>Başvuru Bilgileri</h3><span class="pill gold">Onay Bekliyor · ${c.applied}</span></div>
      <dl class="dl"><dt>Firma</dt><dd>${c.name}</dd><dt>Ülke / Şehir</dt><dd>${c.flag} ${c.country} · ${c.city}</dd><dt>Adres</dt><dd class="notranslate">${c.address || "—"}</dd><dt>Firma tipi</dt><dd>${c.type}</dd><dt>VAT</dt><dd class="mono">${c.vat}</dd><dt>Web sitesi</dt><dd>${c.website}</dd><dt>Instagram</dt><dd>${c.instagram || "—"}</dd><dt>Yasal onaylar</dt><dd>${c.consents ? `KVKK ✓ · Koşullar ✓ · Pazarlama ${c.consents.marketing ? "✓" : "✗"} <small class="muted">(v${c.consents.version} · ${fmtDate(c.consents.kvkk)})</small>` : '<span class="muted">Demo kayıt</span>'}</dd>
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
        <div class="grid g2"><div><div class="muted">YTD Satış</div><div class="big-num">${money(c.ytd)}</div></div><div><div class="muted">Açık Bakiye</div><div class="big-num ${custBalance(c.id) > 0.005 ? "warn-t" : ""}">${money(custBalance(c.id), levelCur(levelOf(c.id)), 2)}</div></div></div>
        <div class="divider"></div>
        <div class="stat-row"><span>Son sipariş</span><b>${c.lastOrder}</b></div><div class="stat-row"><span>Aktif sipariş</span><b>${orders.filter((o) => o.stage < 5).length}</b></div><div class="stat-row"><span>Ekim forecast</span><b>${c.forecast ? money(c.forecast) : '<span class="warn-t">Girilmedi</span>'}</b></div><div class="stat-row"><span>Forecast gerçekleşme (Q3)</span><b>82%</b></div>
      </div></div>
      <div class="card mt"><div class="card-h"><h3>Kayıt Bilgileri</h3><span class="sub">Müşterinin üye olurken / hesabından girdiği bilgiler</span></div>${custInfoDl(c)}</div>
      <div class="card mt"><div class="card-h"><h3>Siparişler</h3></div>${ordersTable(orders)}</div>`;
  else if (tab === "orders") body = `<div class="card">${ordersTable(orders)}</div>`;
  else if (tab === "pricing") body = `<div class="card"><div class="card-h"><h3>Bu müşterinin fiyatları · ${LEVELS[levelOf(c.id) - 1].name}</h3></div>${pricingTable(levelOf(c.id))}</div>`;
  else if (tab === "finance") { const b = custBalance(id), cu = levelCur(levelOf(id)), billed = orders.filter((o) => o.stage >= 2);
    body = `<div class="grid g3" style="margin-bottom:18px">${kpi(money(billed.reduce((s, o) => s + orderTotal(o), 0), cu, 2), "Faturalanan (proforma)", "", "file")}${kpi(money(billed.reduce((s, o) => s + (o.paid || 0), 0), cu, 2), "Ödenen", "", "check")}${kpi(money(b, cu, 2), "Kalan bakiye", "", "wallet")}</div>
    <div class="card">${billed.length ? paymentsTable(orders) : '<div class="empty">Henüz proforma kesilmiş sipariş yok.</div>'}</div>
    <div class="row mt"><button class="btn gold" ${b > 0.005 ? "" : "disabled"} onclick="custPayment('${id}',1)">${ic("plus")} Ödeme ekle</button><button class="btn" ${billed.some((o) => o.paid > 0) ? "" : "disabled"} onclick="custPayment('${id}',-1)">Ödeme çıkart</button></div>`; }
  else if (tab === "forecast") body = `<div class="card"><div class="stat-row"><span>Ekim 2026</span><b>${c.forecast ? money(c.forecast) + " · High" : "Girilmedi"}</b></div><div class="stat-row"><span>Kasım 2026</span><b>$18,000 · Medium</b></div><div class="stat-row"><span>Aralık 2026</span><b>$30,000 · Low</b></div></div>`;
  else if (tab === "docs") body = `<div class="card">${docsTable(false, c)}</div>`;
  else body = `<div class="card"><ul class="tl"><li>Fuar görüşmesi: 2027 için 40' konteyner hedefi konuşuldu.<small>Ferhat · 14 Sep 2026</small></li><li>Almanya'da Noir EDP talebi yüksek, katalog istendi.<small>Ferhat · 02 Sep 2026</small></li><li>Hesap açıldı.<small>Sistem · 11 Jan 2025</small></li></ul><textarea class="input mt" placeholder="Not ekle…"></textarea></div>`;
  return `${head(`${c.flag} ${c.name}`, `${c.country} · ${c.type} · ${c.id}`, `${custBalance(c.id) > 0.005 ? `<span class="pill warn" style="cursor:pointer" onclick="state.tab.cust='finance';rerender()">Açık bakiye ${money(custBalance(c.id), levelCur(levelOf(c.id)), 2)}</span>` : '<span class="pill ok">Bakiye yok</span>'}<span class="pill ok">Aktif</span><button class="btn gold" onclick="newOrderFor('${c.id}')">${ic("plus")} Sipariş Oluştur</button>`, `<a href="#/admin/customers">Müşteriler</a> / ${c.id}`)}
  <div class="tabs">${tabs.map(([k, l]) => `<button class="${tab === k ? "on" : ""}" onclick="state.tab.cust='${k}';rerender()">${l}</button>`).join("")}</div>${body}`;
};

// ——— Siparişler ———
ADMIN.orders = () => {
  const f = state.of;
  const custs = [...new Set(ORDERS.map((o) => o.cust))].map(C).filter(Boolean).sort((a, b) => a.name.localeCompare(b.name));
  const set = (k) => `state.of.${k}=this.value;orderFilter()`;
  return `${head("Siparişler", "", `<button class="btn gold" onclick="newOrderFor()">${ic("plus")} Müşteri adına sipariş</button>`)}
  <div class="filters pf" id="of">
    <div class="search pf-q"><span>${ic("search")}</span><input type="search" value="${pfEsc(f.q)}" placeholder="Sipariş no, müşteri veya PO ara…" oninput="${set("q")}"></div>
    <select onchange="${set("cust")}"><option value="all">Tüm müşteriler</option>${custs.map((c) => `<option value="${c.id}" ${f.cust === c.id ? "selected" : ""}>${c.name}</option>`).join("")}</select>
    <select onchange="${set("stage")}"><option value="all">Tüm durumlar</option>${STAGES.map((x, i) => `<option value="${i}" ${f.stage === String(i) ? "selected" : ""}>${x} (${ORDERS.filter((o) => o.stage === i).length})</option>`).join("")}</select>
    <span class="pf-n muted" id="ofN"></span>
  </div>
  <div class="card">${ordersTable(ORDERS, false, true)}<div class="pf-empty muted" id="ofEmpty" style="display:none">Bu filtrede sipariş yok.</div></div>`;
};
function deleteOrder(no) {
  const o = O(no), c = C(o.cust);
  modal(`<h2>Siparişi sil</h2><p><b class="mono">${no}</b> · ${pfEsc(c?.name || "")} · ${money(orderTotal(o), o.currency, 2)} · ${STAGES[o.stage]}</p>
  <div class="notice err">${ic("alert")}<span>Sipariş, kalemleri, ödemeleri ve aktivite kaydıyla birlikte <b>kalıcı olarak</b> silinir; müşteri de göremez. Bu işlem geri alınamaz.</span></div>
  <div class="m-actions"><button class="btn" onclick="closeModal()">Vazgeç</button><button class="btn danger" onclick="confirmDeleteOrder('${no}')">${ic("trash")} Kalıcı olarak sil</button></div>`);
}
function confirmDeleteOrder(no) {
  const i = ORDERS.findIndex((x) => x.no === no); if (i < 0) return closeModal();
  ORDERS.splice(i, 1); delete state.logs[no];
  closeModal(); toast(`${no} silindi`, "trash"); if (parse().page === "order") go("admin/orders"); else rerender();
}
function orderFilter() {
  if (!$("#of")) return;
  const f = state.of, rows = [...document.querySelectorAll("#view [data-oq]")];
  let n = 0;
  rows.forEach((el) => { const hit = (f.cust === "all" || el.dataset.cust === f.cust) && (f.stage === "all" || el.dataset.stage === f.stage) && (!f.q.trim() || srchHit(el.dataset.oq, f.q)); el.style.display = hit ? "" : "none"; n += hit; });
  $("#ofN").textContent = `${n} / ${rows.length} sipariş`;
  $("#ofEmpty").style.display = n ? "none" : "";
}
// Admin: müşteri adına sipariş → müşteri seçilerek ürün ekranı açılır
function newOrderFor(id) { state.actAs = id || null; state.cart = {}; if (id) ME = id; go("admin/neworder"); }
function setActAs(id) { state.actAs = id || null; if (id) ME = id; rerender(); }
const actAsBar = () => {
  if (authSession()?.role !== "admin") return "";
  const list = CUSTOMERS.filter((c) => c.status === "Active").sort((a, b) => a.name.localeCompare(b.name));
  return `<div class="card act-as ${state.actAs ? "" : "need"}"><span>${ic("user")}</span><b>Sipariş verilen müşteri</b>
    <select class="input" onchange="setActAs(this.value)"><option value="">Müşteri seçin…</option>${list.map((c) => `<option value="${c.id}" ${state.actAs === c.id ? "selected" : ""}>${c.flag || ""} ${c.name}</option>`).join("")}</select>
    ${state.actAs ? `<small class="muted">Fiyatlar bu müşterinin seviyesinden gösterilir</small>` : `<small class="warn-t">Siparişi kime girdiğinizi seçin</small>`}</div>`;
};
const actAsMissing = () => authSession()?.role === "admin" && !state.actAs;

ADMIN.order = (no) => {
  const o = O(no), c = C(o.cust), total = orderTotal(o), L = orderQty(o.items), ps = payState(o);
  const editable = o.stage < 5;
  const logs = state.logs[no] || [["" + o.date, "Sipariş oluşturuldu"]];
  let action = "";
  if (o.stage === 0) action = `<div class="card-h"><h3>Satış İncelemesi</h3><span class="pill gold">Ferhat</span></div>
    <button class="btn gold block lg" onclick="advance('${no}')">Final Onaya Gönder</button>`;
  else if (o.stage === 1) action = `<div class="card-h"><h3>Final Onay</h3><span class="pill warn">Gözde</span></div>
    <div class="stat-row"><span>Tutar</span><b>${money(total, o.currency)}</b></div><div class="stat-row"><span>Fiyat seviyesi</span><b>${LEVELS[orderLevel(o) - 1].name}</b></div>
    <button class="btn ok block lg mt" onclick="advance('${no}')">Onayla · Proforma Oluştur</button>
    <button class="btn ghost block mt" onclick="advance('${no}',-1)">Satışa geri gönder</button>`;
  else if (o.stage === 2) action = `<div class="card-h"><h3>Ödeme</h3><span class="pill ${ps[1]}">${ps[2]}</span></div>
    <div class="stat-row"><span>Proforma</span><b>PI-${no.slice(3)} / Rev.1</b></div><div class="stat-row"><span>Alınan</span><b>${money(o.paid, o.currency)}</b></div><div class="stat-row"><span>Bakiye</span><b class="warn-t">${money(total - o.paid, o.currency)}</b></div>
    <button class="btn gold block mt" onclick="go('admin/finance/${no}')">${ic("wallet")} Ödeme Ekle</button>
    <button class="btn danger block mt" onclick="advance('${no}');toast('Ödemesiz serbest bırakıldı — kritik yetki, audit log’a yazıldı','shield')">Ödemesiz Serbest Bırak</button>`;
  else if (o.stage === 3) action = `<div class="card-h"><h3>Hazırlık</h3><span class="pill info">Hazırlanıyor</span></div>
    ${o.problem ? `<div class="notice err">${ic("alert")}<span><b>Hazırlık problemi:</b> BC-400-2 için 103 koli gerekli, 101 bulundu. Müşteriye otomatik gösterilmez.</span></div>` : ""}
    <button class="btn gold block lg mt" onclick="finishPrep('${no}')">${ic("check")} Hazırlık tamamlandı · Sevke hazır</button>
    <button class="btn danger block mt" onclick="reportProblem('${no}')">${ic("alert")} Problem Bildir</button>`;
  else if (o.stage === 4) action = `<div class="card-h"><h3>Sevke Hazır</h3><span class="pill ok">Hazırlık tamam</span></div>
    <div class="notice info" style="margin-bottom:10px">${ic("info")}<span>Müşteri final proformayı ve packing list’i görebiliyor${o.custNotice ? ` · bildirim ${o.custNotice.at}${o.custNotice.seen ? " · görüldü ✓" : ""}` : ""}.</span></div>
    <div class="field"><label>Palet sayısı <small class="muted">(packing list için)</small></label><input class="input" type="number" min="0" value="${o.pallets ?? ""}" placeholder="—" onchange="O('${no}').pallets=this.value===''?null:Math.max(0,parseInt(this.value)||0);rerender()"></div>
    <div class="row mt">${plButtons(no)}</div>
    <button class="btn gold block lg mt" onclick="markShipped('${no}')">${ic("truck")} Sevk Edildi Olarak İşaretle</button>`;
  else action = `<div class="card-h"><h3>Sevk Edildi</h3><span class="pill plain">Tamamlandı</span></div><div class="stat-row"><span>Sevk tarihi</span><b>${o.ship?.date || "—"}</b></div>`;

  return `${head(`${no}`, `${c.flag} ${c.name} · ${money(total, o.currency)}`, `${stagePill(o.stage)}${docButtons(o)}`, `<a href="#/admin/orders">Siparişler</a> / ${no}`)}
  <div class="card">${stepper(o.stage, STAGES)}
    <div class="stage-edit"><span class="muted">Durumu elle değiştir</span><select class="input" id="stSel">${STAGES.map((x, i) => `<option value="${i}" ${i === o.stage ? "selected" : ""}>${i + 1}. ${x}</option>`).join("")}</select><button class="btn sm" onclick="setStageManual('${no}')">Uygula</button></div></div>
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
        ${(o.adjust || []).length ? `<tr><td colspan="4" class="r muted">Ara toplam · ${num(L.boxes)} koli · ${num(L.pcs)} adet</td><td class="r">${money(itemsTotal(o), o.currency, 2)}</td></tr>${o.adjust.map((a) => `<tr><td colspan="4" class="r">${pfEsc(a.label)}</td><td class="r ${a.amount < 0 ? "ok-t" : ""}">${a.amount < 0 ? "−" : "+"}${money(Math.abs(a.amount), o.currency, 2)}</td></tr>`).join("")}` : ""}
        <tr><td colspan="4" class="r muted">${(o.adjust || []).length ? "Genel toplam" : `Toplam · ${num(L.boxes)} koli · ${num(L.pcs)} adet`}</td><td class="r strong" style="font:600 18px var(--display)">${money(total, o.currency)}</td></tr>
        </tbody></table></div></div>

      <div class="card mt"><div class="card-h"><h3>Ek Bedel / İndirim</h3><span class="sub">Proforma ve faturada özet bölümünde açıklamasıyla görünür</span></div>
        ${(o.adjust || []).length ? (o.adjust || []).map((a, i) => `<div class="stat-row"><span style="color:var(--text)">${a.amount < 0 ? '<span class="pill ok plain">İndirim</span>' : '<span class="pill warn plain">Ek bedel</span>'} ${pfEsc(a.label)}</span><span class="row" style="gap:10px"><b>${a.amount < 0 ? "−" : "+"}${money(Math.abs(a.amount), o.currency, 2)}</b>${editable ? `<button class="btn sm ghost" title="Kaldır" onclick="removeAdj('${no}',${i})">${ic("x")}</button>` : ""}</span></div>`).join("") : '<p class="muted" style="margin:0 0 6px">Eklenmiş ek bedel veya indirim yok.</p>'}
        ${editable ? `<div class="adj-form mt"><select class="input" id="adjType"><option value="1">Ek bedel (+)</option><option value="-1">İndirim (−)</option></select><input class="input" id="adjLabel" placeholder="Açıklama — ör. İç nakliye bedeli"><input class="input" id="adjAmt" type="number" min="0" step="0.01" placeholder="Tutar (${o.currency})"><button class="btn gold" onclick="addAdj('${no}')">${ic("plus")} Ekle</button></div>` : ""}
      </div>
      <div class="card mt"><div class="card-h"><h3>Aktivite Log</h3></div><ul class="tl">${logs.slice().reverse().map(([d, m]) => `<li>${m}<small>${d}</small></li>`).join("")}</ul></div>
    </div>
    <div>
      <div class="card">${action}</div>
      <div class="card mt"><div class="card-h"><h3>Ticari Şartlar</h3></div>
        <div class="stat-row"><span>Teslim</span><b>${c.incoterm}</b></div><div class="stat-row"><span>Ödeme</span><b>${c.payment}</b></div><div class="stat-row"><span>Fiyat seviyesi</span><select class="input" style="height:32px;width:auto;max-width:210px" ${o.stage >= 5 ? "disabled" : ""} onchange="setOrderLevel('${o.no}',this.value)">${LEVELS.map((l) => `<option value="${l.id}" ${l.id === orderLevel(o) ? "selected" : ""}>${l.name}</option>`).join("")}</select></div><div class="stat-row"><span>Para birimi</span><b>${o.currency}</b></div><div class="stat-row"><span>Banka</span><b>${o.currency} Bank A</b></div><div class="stat-row"><span>Fatura adresi</span><b class="notranslate" style="text-align:right;max-width:230px">${pfEsc(o.billAddress || custAddress(c))}</b></div><div class="stat-row"><span>Teslimat adresi</span><b class="notranslate" style="text-align:right;max-width:230px">${pfEsc(o.address || custShip(c))}</b></div></div>
    </div>
  </div>`;
};
function addAdj(no) {
  const o = O(no), sign = +$("#adjType").value, label = $("#adjLabel").value.trim(), amt = Math.round((parseFloat(String($("#adjAmt").value).replace(",", ".")) || 0) * 100) / 100;
  if (!label) return toast("Açıklama girin (ne için olduğu proformada yazacak)", "alert");
  if (amt <= 0) return toast("Geçerli bir tutar girin", "alert");
  (o.adjust ||= []).push({ label, amount: sign * amt });
  log(no, `${sign > 0 ? "Ek bedel" : "İndirim"} eklendi: ${label} ${sign > 0 ? "+" : "−"}${money(amt, o.currency, 2)}${o.stage >= 2 ? " · proforma yeni revizyon" : ""}`);
  toast(`${sign > 0 ? "Ek bedel" : "İndirim"} eklendi · yeni toplam ${money(orderTotal(o), o.currency, 2)}`); rerender();
}
function removeAdj(no, i) {
  const o = O(no), a = o.adjust[i]; o.adjust.splice(i, 1);
  log(no, `${a.amount < 0 ? "İndirim" : "Ek bedel"} kaldırıldı: ${a.label}`); toast("Kaldırıldı · yeni toplam " + money(orderTotal(o), o.currency, 2)); rerender();
}
function setStageManual(no) {
  const o = O(no), to = +$("#stSel").value;
  if (to === o.stage) return toast("Sipariş zaten bu durumda", "info");
  modal(`<h2>Durumu değiştir</h2><p><b class="mono">${no}</b>: ${STAGES[o.stage]} → <b>${STAGES[to]}</b></p>
  ${to < o.stage ? `<div class="notice warn">${ic("alert")}<span>Sipariş geri alınıyor.${o.stage === 5 ? " Sevk kaydı kaldırılır." : ""}${to < 4 && o.stage >= 4 ? " Müşteri final proforma / packing list’i bu durumda göremez." : ""}</span></div>` : ""}
  <div class="field mt"><label>Not (isteğe bağlı)</label><input class="input" id="stNote" placeholder="Ör. yanlışlıkla sevk edildi işaretlendi"></div>
  <div class="m-actions"><button class="btn" onclick="closeModal()">Vazgeç</button><button class="btn gold" onclick="applyStage('${no}',${to})">Değiştir</button></div>`);
}
function applyStage(no, to) {
  const o = O(no), from = o.stage, note = $("#stNote").value.trim();
  o.stage = to;
  if (to < 5) delete o.ship;
  if (to >= 2 && !o.piDate) o.piDate = fmtDate(new Date());
  if (to === 5 && !o.ship) o.ship = { date: fmtDate(new Date()) };
  log(no, `Durum elle değiştirildi: ${STAGES[from]} → ${STAGES[to]}${note ? " · " + note : ""}`);
  closeModal(); toast(`Durum: ${STAGES[to]}`, "refresh"); rerender();
}
function advance(no, dir = 1) {
  const o = O(no);
  o.stage = Math.max(0, Math.min(5, o.stage + dir));
  if (o.stage === 2 && dir > 0 && !o.piDate) o.piDate = fmtDate(new Date());
  const msg = ["", "Final onaya gönderildi (Gözde'ye bildirim)", "Final onay verildi · PI oluşturuldu", "", "", ""][o.stage] || `Durum: ${STAGES[o.stage]}`;
  log(no, dir < 0 ? "Satışa geri gönderildi" : msg || `Durum: ${STAGES[o.stage]}`);
  toast(dir < 0 ? "Satışa geri gönderildi" : msg || STAGES[o.stage]);
  rerender();
}
function reviseItem(no, i, v) {
  const o = O(no), before = o.items[i][1];
  o.items[i][1] = Math.max(0, parseInt(v) || 0);
  log(no, `Admin revize: ${o.items[i][0]} ${before} → ${o.items[i][1]} koli ${o.stage >= 2 ? " · proforma yeni revizyon" : ""}`);
  toast(o.stage >= 2 ? "Revize kaydedildi · proforma yeni revizyona düştü" : "Revize kaydedildi", "refresh");
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
const docAvail = (o, k) => k !== "ci" || o.stage >= 5;
function docButtons(o) {
  return `<div class="doc-btns">${Object.entries(DOCS).map(([k, d]) => `<button class="btn" ${docAvail(o, k) ? `onclick="openDoc('${o.no}','${k}')"` : "disabled"}>${ic("file")} ${k === "pi" ? "Proforma" : d}</button>`).join("")}</div>`;
}
const plButtons = (no) => `<button class="btn sm" onclick="plDownload('${no}','xlsx')">${ic("download")} Packing List XLSX</button><button class="btn sm" onclick="plDownload('${no}','csv')">${ic("download")} CSV</button>`;

// Belge verisi: sipariş + müşteri + ürün kartı (birim fiyat sipariş anındaki seviye / revize fiyat)
const poOf = (o) => o.po || "PO-" + o.no.slice(3);   // eski siparişlerde PO yoksa sipariş numarasından
const docSeq = (o) => String(+o.no.slice(-4)).padStart(5, "0");
const docYear = (o) => o.no.split("-")[1] || new Date().getFullYear();
const dmy = (d) => { const x = d ? new Date(d) : new Date(); return isNaN(x) ? String(d) : `${String(x.getDate()).padStart(2, "0")}-${String(x.getMonth() + 1).padStart(2, "0")}-${x.getFullYear()}`; };
const n2 = (v) => Number(v || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const boxNet = (p) => p.net ?? +(p.kg * 0.86).toFixed(2);
const boxGross = (p) => p.gross ?? p.kg;
function docData(no) {
  const o = O(no), c = C(o.cust);
  const ord = (sku) => { const i = PRODUCTS.findIndex((x) => x.sku === sku); return i < 0 ? 1e9 : i; };
  const rows = o.items.slice().sort((a, b) => ord(a[0]) - ord(b[0])).map(([sku, b, pr]) => {
    const p = P(sku) || { sku, name: sku, pcsBox: 1, kg: 0, dims: [0, 0, 0], hs: "", ean: "" };
    const q = o.shipped?.[sku] ?? b, up = pr ?? orderPrice(o, p);
    return { p, sku, q, pcs: q * p.pcsBox, up, line: q * p.pcsBox * up, net: q * boxNet(p), gross: q * boxGross(p), cbm: (q * p.dims[0] * p.dims[1] * p.dims[2]) / 1e6 };
  });
  const sum = (f) => rows.reduce((s, r) => s + r[f], 0);
  const addr = o.address || custAddress(c);
  return { o, c, rows, sum, cur: o.currency, addr, subtotal: sum("line") };
}
const payText = (c) => c.payment ? (/advance|peşin/i.test(c.payment) ? `${c.payment.replace(/peşin/i, "advance")} payment before shipment` : c.payment) : "As agreed";
const delivText = (c) => `${c.incoterm || "EXW Düzce"}, Incoterms 2020`;
const phx = (t) => String(t).replace(/\[[^\]]+\]/g, (m) => `<span class="ph">${m}</span>`);

function docHtml(no, type) {
  if (type === "pl") return plHtml(no);
  const D = docData(no), { o, c, rows, cur } = D, isPI = type === "pi";
  const docNo = `${isPI ? "PI" : "INV"}-${docYear(o)}-${docSeq(o)}`;
  const issue = isPI ? o.piDate || fmtDate(new Date()) : o.ship?.date || fmtDate(new Date());
  const valid = (() => { const d = new Date(issue); d.setDate(d.getDate() + 15); return fmtDate(d); })();
  const draft = isPI ? o.stage < 2 : o.stage < 5;
  const bank = BANKS[cur] || BANKS.USD;
  const meta = isPI
    ? [["Document No.", docNo], ["Issue Date", issue], ["Currency", cur], ["Customer P/O", poOf(o)], ["Valid Until", valid], ["Order Reference", o.no], ["Payment Terms", payText(c)], ["Delivery Terms", delivText(c)]]
    : [["Document No.", docNo], ["Issue Date", issue], ["Currency", cur], ["Customer P/O", poOf(o)], ["Proforma Ref.", `PI-${docYear(o)}-${docSeq(o)}`], ["Order Reference", o.no], ["Payment Terms", payText(c)], ["Delivery Terms", delivText(c)]];
  const kv = (arr) => arr.map(([k, v]) => `<div class="kv"><b>${k}</b><span>${pfEsc(v)}</span></div>`).join("");
  const notes = isPI
    ? [`Payment: ${payText(c)}. Delivery: ${delivText(c)}.`, `Validity: 15 days from issue date. Lead time: ${o.leadTime || "to be confirmed on order approval"}.`, "This proforma invoice is issued for quotation / advance payment purposes."]
    : [`Payment: ${payText(c)}. Delivery: ${delivText(c)}.`, `Country of origin: Türkiye.${o.ship?.date ? ` Shipment date: ${o.ship.date}.` : ""}${o.ship?.ref ? ` Shipment reference: ${pfEsc(o.ship.ref)}.` : ""}`, "Issued quantities, prices and charges reflect the actual invoiced transaction."];
  if (o.note) notes.push(`Order notes: ${pfEsc(o.note)}`);
  const title = isPI ? "PROFORMA INVOICE" : "COMMERCIAL INVOICE";
  return `<!doctype html><html><head><meta charset=utf-8><title>${title} ${docNo}</title><style>${DOC_CSS}
    @page{size:A4;margin:14mm 14mm 16mm;@bottom-left{content:"${COMPANY.brand}  |  ${title}  ${docNo}";font:8pt Inter,Arial,sans-serif;color:#6b7a86}@bottom-right{content:"Page " counter(page) " of " counter(pages);font:8pt Inter,Arial,sans-serif;color:#6b7a86}}
    @page :not(:first){@top-left{content:"${COMPANY.brand}  ·  ${title}  ·  ${docNo}";font:600 8pt Inter,Arial,sans-serif;color:#1f3644}}
  </style></head><body><div class="tools"><button onclick="pdfDownload()">Download PDF</button><button onclick="print()">Print</button></div>${pdfScript(docNo, "portrait")}<div class="sheet">
  <header class="dh"><div class="brand"><img src="${new URL("senso-logo.png", location.href).href}" alt="Senso"><div><b>${COMPANY.brand}</b><span>${COMPANY.legal}</span><span>${COMPANY.address}</span><span>Tax Office / Tax ID: ${phx(COMPANY.tax)}</span></div></div>
    <div class="dt"><h1>${title}</h1>${draft ? `<span class="draft">DRAFT — ${isPI ? "pending final approval" : "not yet shipped"}</span>` : ""}</div></header>
  <div class="contact">${COMPANY.phone}  |  ${COMPANY.email}  |  ${COMPANY.web}</div>
  <section class="meta"><div>${kv(meta.slice(0, 4))}</div><div>${kv(meta.slice(4))}</div></section>
  <section class="parties"><div><h4>BILL TO</h4><b>${pfEsc(c.name)}</b>${o.billAddress || c.address ? `<span>${pfEsc(o.billAddress || c.address)}</span>` : ""}${(o.billAddress || c.address || "").includes(c.country || "@@") ? "" : `<span>${pfEsc([c.city, c.country].filter((x) => x && x !== "—").join(", "))}</span>`}<span>Tax / VAT ID: ${pfEsc(c.vat || "—")}</span></div>
    <div><h4>SHIP TO</h4><b>${pfEsc(c.name)}</b><span>${pfEsc(D.addr)}</span>${D.addr.includes(c.country || "@@") ? "" : `<span>${pfEsc(c.country || "")}</span>`}<span>Contact: ${pfEsc([c.contact, c.phone && c.phone !== "—" ? c.phone : ""].filter(Boolean).join(" / ") || "—")}</span></div></section>
  <table class="items"><thead><tr><th>SKU</th><th>DESCRIPTION</th><th class="r">CARTONS</th><th class="r">QTY</th><th class="r">UNIT PRICE</th><th class="r">TOTAL</th></tr></thead><tbody>
    ${rows.map((r) => `<tr><td>${pfEsc(r.sku)}</td><td>${pfEsc(r.p.name.toUpperCase())}</td><td class="r">${num(r.q)}</td><td class="r">${num(r.pcs)}</td><td class="r">${n2(r.up)}</td><td class="r">${n2(r.line)}</td></tr>`).join("")}
  </tbody></table>
  <div class="closing">
    <div class="tq"><b>TOTAL CARTONS: ${num(D.sum("q"))}</b><b>TOTAL QUANTITY: ${num(D.sum("pcs"))} PCS</b></div>
    <h4 class="bar">ORDER SUMMARY</h4>
    <div class="sum"><div><span>Subtotal</span><span>${n2(D.subtotal)}</span></div>${(o.adjust || []).length ? o.adjust.map((a) => `<div><span>${a.amount < 0 ? "Discount" : "Additional Charge"}: ${pfEsc(a.label)}</span><span>${a.amount < 0 ? "-" : ""}${n2(Math.abs(a.amount))}</span></div>`).join("") : `<div><span>Additional Charges</span><span>${n2(0)}</span></div>`}<div><span>Tax</span><span>${n2(0)}</span></div>
      <div class="gt"><span>GRAND TOTAL (${cur})</span><span>${n2(D.subtotal + adjTotal(o))}</span></div></div>
    <h4 class="bar">BANK DETAILS</h4>
    <div class="bank"><div><span>Beneficiary: ${COMPANY.legal}</span><span>IBAN: ${phx(bank.iban)}</span><span>Account Currency: ${cur}</span></div><div><span>Bank: ${phx(bank.bank)}</span><span>SWIFT / BIC: ${phx(bank.swift)}</span></div></div>
    <h4 class="bar">PAYMENT, DELIVERY &amp; NOTES</h4>
    <div class="notes">${notes.map((x) => `<p>${x}</p>`).join("")}</div>
  </div>
  <footer class="sf"><span>${COMPANY.brand}  |  ${title}  ${docNo}</span></footer>
  </div></body></html>`;
}
// Belge penceresinde doğrudan PDF indirme (html2pdf: sayfa A4, satırlar ve kapanış bloğu bölünmez)
const pdfScript = (file, orient) => `<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"><\/script><script>
function pdfDownload(){const b=document.querySelector(".tools");if(!window.html2pdf){alert("PDF aracı yüklenemedi, internet bağlantısını kontrol edin.");return;}
b.style.display="none";const el=document.querySelector(".sheet"),st=el.getAttribute("style")||"";el.style.boxShadow="none";el.style.margin="0";
html2pdf().set({margin:[8,0,10,0],filename:${JSON.stringify(String(file).replace(/[^\w.-]+/g, "_") + ".pdf")},image:{type:"jpeg",quality:0.96},html2canvas:{scale:2,useCORS:true,backgroundColor:"#ffffff"},jsPDF:{unit:"mm",format:"a4",orientation:"${orient}"},pagebreak:{mode:["css","legacy"],avoid:["tr",".closing",".parties",".meta"]}}).from(el).save().then(()=>{el.setAttribute("style",st);b.style.display="";});}
<\/script>`;
const DOC_CSS = `*{box-sizing:border-box}body{margin:0;background:#e9ecef;font:10.5pt/1.45 Inter,"Helvetica Neue",Arial,sans-serif;color:#1f2a33}
  .tools{position:fixed;right:18px;bottom:18px;display:flex;gap:8px;z-index:5}.tools button{padding:10px 16px;border:0;border-radius:8px;background:#1f3644;color:#fff;font:600 13px Inter,Arial,sans-serif;cursor:pointer}
  .sheet{width:210mm;min-height:297mm;margin:24px auto;background:#fff;padding:16mm 14mm 14mm;box-shadow:0 4px 30px rgba(0,0,0,.12)}
  .dh{display:flex;justify-content:space-between;align-items:flex-start;gap:20px}.brand{display:flex;gap:18px;align-items:flex-start}.brand img{width:92px;filter:invert(1)}
  .brand b{display:block;font-size:13pt;letter-spacing:.04em;color:#1f3644;margin:6px 0 4px}.brand span{display:block;font-size:9.5pt;color:#334}
  .dt{text-align:right;white-space:nowrap}.dt h1{margin:4px 0 4px;font-size:17pt;letter-spacing:.04em;color:#1f3644}.draft{display:inline-block;background:#fff3d6;color:#7a5200;border:1px solid #e8c26f;border-radius:99px;padding:2px 10px;font-size:8.5pt;font-weight:700}
  .contact{color:#6b7a86;font-size:9.5pt;padding:8px 0 10px;border-bottom:1px solid #d9dee3}
  .meta{display:grid;grid-template-columns:1fr 1fr;gap:6px 40px;padding:14px 0;border-bottom:1px solid #d9dee3}.kv{display:grid;grid-template-columns:120px 1fr;font-size:9.5pt;padding:2px 0}.kv b{color:#1f2a33}
  .parties{display:grid;grid-template-columns:1fr 1fr;gap:0 24px;margin-top:14px;padding-bottom:12px;border-bottom:1px solid #d9dee3}.parties h4,.bar{margin:0 0 10px;background:#edf1f4;padding:9px 14px;font-size:9.5pt;letter-spacing:.04em;color:#1f3644}
  .parties b{display:block;font-size:11pt;margin-bottom:2px}.parties span{display:block;font-size:9.5pt}
  .items{width:100%;border-collapse:collapse;margin-top:14px}.items thead{display:table-header-group}.items th{background:#1f3644;color:#fff;font-size:8.5pt;letter-spacing:.04em;text-align:left;padding:10px 10px}
  .items td{padding:12px 10px;font-size:9pt;vertical-align:top;border-bottom:1px solid #fff}.items tbody tr:nth-child(odd) td{background:#edf1f4}.items tr{break-inside:avoid}.r{text-align:right!important}
  .closing{break-inside:avoid}.tq{display:flex;gap:80px;padding:10px 0 14px;font-size:9.5pt}.bar{margin-top:6px}
  .sum{width:46%;margin:0 0 14px auto;font-size:9.5pt}.sum div{display:flex;justify-content:space-between;padding:4px 10px}.sum .gt{background:#1f3644;color:#fff;font-weight:700;font-size:11pt;padding:10px 12px;margin-top:6px}
  .bank{display:grid;grid-template-columns:1fr 1fr;gap:0 24px;font-size:9.5pt;margin-bottom:12px}.bank span{display:block}.notes p{margin:0;font-size:9pt}
  .ph{display:inline!important;background:#fff3c4;padding:0 3px;border-radius:3px}.sf{display:none}
  @media print{body{background:#fff}.tools{display:none}.sheet{width:auto;min-height:0;margin:0;padding:0;box-shadow:none}.ph{background:none}}
  @media (max-width:820px){.sheet{width:auto;margin:0;padding:18px}.meta,.parties,.bank{grid-template-columns:1fr}}`;

// ——— Packing List: gönderilen şablonun yapısı (satıcı bloğu sabit, alıcı / ürünler siparişten) ———
function plData(no) {
  const D = docData(no), { o, c } = D;
  const seller = `SELLER : ${COMPANY.legal}\nTEL:  ${COMPANY.phone}   FAX: ${COMPANY.fax}\nWEB: ${COMPANY.plWeb}\nE-MAIL: ${COMPANY.plEmail}\nHEAD OFFICE: ${COMPANY.address}`;
  const buyer = `BUYER : ${c.name}${c.contact ? " " + c.contact : ""}\n${c.country || ""}\n${D.addr}\n${c.country || ""}`;
  const head = ["Product ID", "Part Number", "UPC", "Name", "Box", "Quantity", "Net Kg", "Gtip Code"];
  const r2 = (v) => Math.round(v * 100) / 100;
  const rows = D.rows.map((r, i) => [i + 1, r.sku, r.p.ean || "", r.p.name.toUpperCase(), r.q, r.pcs, r2(r.net), r.p.gtip || String(r.p.hs || "").replace(/\D/g, "")]);
  const tot = { m3: r2(D.sum("cbm")), boxes: D.sum("q"), qty: D.sum("pcs"), net: r2(D.sum("net")), gross: r2(D.sum("gross")) };
  return { D, o, seller, buyer, head, rows, tot, invNo: poOf(o), invDate: dmy(o.ship?.date || new Date()), pallets: o.pallets };
}
function plHtml(no) {
  const X = plData(no);
  return `<!doctype html><html><head><meta charset=utf-8><title>Packing List ${X.invNo}</title><style>${DOC_CSS}
    .pl{font:10.5pt/1.35 Arial,Helvetica,sans-serif;color:#000}.pl img{width:120px;filter:invert(1);display:block;margin:0 0 14px 18px}.pl pre{font:inherit;margin:0 0 18px;white-space:pre-wrap}.pl pre b{font-weight:700}
    .inv{text-align:right;margin:-10px 0 14px}.pl table{width:100%;border-collapse:collapse}.pl th{background:#b7b7b7;border:1px solid #444;padding:6px;font-size:9.5pt}.pl td{border:1px solid #444;padding:4px 6px;font-size:9pt}
    .pl .tot td{background:#b7b7b7;font-weight:700;text-align:center}.pl tr{break-inside:avoid}.pl thead{display:table-header-group}
    @page{size:A4 landscape;margin:12mm;@bottom-right{content:"Page " counter(page) " of " counter(pages);font:8pt Arial;color:#555}}</style></head>
  <body><div class="tools"><button onclick="(window.opener||window.parent).plDownload('${no}','xlsx')">Download XLSX</button><button onclick="(window.opener||window.parent).plDownload('${no}','csv')">CSV</button><button onclick="pdfDownload()">PDF</button><button onclick="print()">Print</button></div>${pdfScript(`PackingList_${X.invNo}`, "landscape")}
  <div class="sheet pl" style="width:297mm;min-height:auto">
    <img src="${new URL("senso-logo.png", location.href).href}" alt="Senso">
    <pre>${pfEsc(X.seller).replace(/^SELLER :/, "<b>SELLER :</b>")}</pre>
    <pre>${pfEsc(X.buyer).replace(/^BUYER :/, "<b>BUYER :</b>")}</pre>
    <div class="inv"><b>INVOICE NO:</b> ${pfEsc(X.invNo)}<br><b>INVOICE DATE:</b> ${X.invDate}</div>
    <table><thead><tr>${X.head.map((h) => `<th>${h}</th>`).join("")}</tr></thead><tbody>
    ${X.rows.map((r) => `<tr>${r.map((v, i) => `<td style="text-align:${i === 3 ? "left" : "center"}">${pfEsc(i === 6 ? String(v).replace(".", ",") : v)}</td>`).join("")}</tr>`).join("")}
    <tr><td colspan="8" style="border:0;height:14px"></td></tr>
    <tr class="tot"><td style="border:0;background:none"></td><td style="border:0;background:none"></td><td>Total m3 ${String(X.tot.m3).replace(".", ",")}</td><td>Total ${X.pallets ?? "—"} Pallets</td><td>${X.tot.boxes}</td><td>${X.tot.qty}</td><td>${String(X.tot.net).replace(".", ",")}</td><td style="border:0;background:none"></td></tr>
    </tbody></table>
  </div></body></html>`;
}
// Packing list indirme — XLSX: ekrandaki / PDF'teki görünümle aynı (logo, kalın etiketler, gri başlık, kenarlıklar);
// CSV: Türkçe Excel'de doğru sütunlara açılsın diye noktalı virgül ayraç + virgüllü ondalık
const EXCELJS_URL = "https://cdnjs.cloudflare.com/ajax/libs/exceljs/4.4.0/exceljs.min.js";
let exceljsP = null;
const loadExcelJS = () => (exceljsP ||= new Promise((ok, no) => { if (window.ExcelJS) return ok(); const sc = document.createElement("script"); sc.src = EXCELJS_URL; sc.onload = ok; sc.onerror = () => { exceljsP = null; no(new Error("Excel aracı yüklenemedi")); }; document.head.appendChild(sc); }));
// Logo (beyaz PNG) → siyah PNG (Excel'de beyaz zemin üstünde görünsün)
const blackLogo = () => new Promise((ok) => { const im = new Image(); im.onload = () => { const c = document.createElement("canvas"); c.width = im.width; c.height = im.height; const x = c.getContext("2d"); x.filter = "invert(1)"; x.drawImage(im, 0, 0); ok({ data: c.toDataURL("image/png"), w: im.width, h: im.height }); }; im.onerror = () => ok(null); im.src = "senso-logo.png"; });
const saveBlob = (blob, name) => { const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000); };
async function plDownload(no, fmt) {
  const X = plData(no), file = `PackingList_${X.invNo}`.replace(/[^\w.-]+/g, "_");
  const dec = (v) => (typeof v === "number" ? String(v).replace(".", ",") : v);
  if (fmt === "csv") {
    const q = (v) => { const t = String(v ?? ""); return /[";\n]/.test(t) ? `"${t.replace(/"/g, '""')}"` : t; };
    const rows = [[""], [X.seller], [X.buyer], ["", "", "", "", "", "", `INVOICE NO: ${X.invNo}\nINVOICE DATE:  ${X.invDate}`], X.head,
      ...X.rows.map((r) => r.map((v, i) => (i === 2 && v ? "'" + v : dec(v)))), [""],
      ["", "", `Total m3 ${dec(X.tot.m3)}`, `Total ${X.pallets ?? "?"} Pallets`, X.tot.boxes, X.tot.qty, dec(X.tot.net), ""]];
    saveBlob(new Blob(["﻿" + rows.map((r) => r.map(q).join(";")).join("\r\n")], { type: "text/csv;charset=utf-8" }), file + ".csv");
    return toast("Packing list CSV indirildi", "download");
  }
  try { await loadExcelJS(); } catch (e) { return toast(e.message, "alert"); }
  const wb = new ExcelJS.Workbook(), ws = wb.addWorksheet("Packing List", { pageSetup: { paperSize: 9, orientation: "landscape", fitToPage: true, fitToWidth: 1, fitToHeight: 0, margins: { left: 0.4, right: 0.4, top: 0.5, bottom: 0.5, header: 0.2, footer: 0.2 } } });
  ws.columns = [11, 16, 17, 46, 8, 11, 11, 17].map((width) => ({ width }));
  const F = "Arial", thin = { style: "thin", color: { argb: "FF444444" } }, box = { top: thin, left: thin, bottom: thin, right: thin }, gray = { type: "pattern", pattern: "solid", fgColor: { argb: "FFB7B7B7" } };
  const logo = await blackLogo();
  if (logo) { const id = wb.addImage({ base64: logo.data, extension: "png" }); ws.addImage(id, { tl: { col: 0.3, row: 0.2 }, ext: { width: 110, height: Math.round((110 * logo.h) / logo.w) } }); }
  for (let r = 1; r <= 6; r++) ws.getRow(r).height = 18;
  const block = (r, label, text, h) => { ws.mergeCells(r, 1, r, 5); const c = ws.getCell(r, 1); const [first, ...rest] = text.split("\n");
    c.value = { richText: [{ text: label, font: { name: F, bold: true, size: 10 } }, { text: first.slice(label.length) + (rest.length ? "\n" + rest.join("\n") : ""), font: { name: F, size: 10 } }] };
    c.alignment = { wrapText: true, vertical: "top" }; ws.getRow(r).height = h; };
  block(7, "SELLER :", X.seller, 74);
  block(9, "BUYER :", X.buyer, 62);
  ws.mergeCells(11, 6, 11, 8); const inv = ws.getCell(11, 6);
  inv.value = { richText: [{ text: "INVOICE NO: ", font: { name: F, bold: true, size: 10 } }, { text: X.invNo + "\n", font: { name: F, size: 10 } }, { text: "INVOICE DATE: ", font: { name: F, bold: true, size: 10 } }, { text: X.invDate, font: { name: F, size: 10 } }] };
  inv.alignment = { horizontal: "right", vertical: "top", wrapText: true }; ws.getRow(11).height = 30;
  const hr = ws.getRow(13); hr.values = X.head; hr.height = 20;
  hr.eachCell((c) => { c.font = { name: F, bold: true, size: 10 }; c.fill = gray; c.border = box; c.alignment = { horizontal: "center", vertical: "middle" }; });
  X.rows.forEach((r, i) => {
    const row = ws.getRow(14 + i); row.values = r.map((v, k) => (k === 2 ? String(v || "") : v));
    row.eachCell({ includeEmpty: true }, (c, k) => { if (k > 8) return; c.font = { name: F, size: 10 }; c.border = box; c.alignment = { horizontal: k === 4 ? "left" : "center", vertical: "middle" }; if (k === 3) c.numFmt = "@"; if (k === 7) c.numFmt = "0.##"; });
  });
  const tr = ws.getRow(14 + X.rows.length + 1);
  tr.values = ["", "", `Total m3 ${dec(X.tot.m3)}`, `Total ${X.pallets ?? "?"} Pallets`, X.tot.boxes, X.tot.qty, X.tot.net, ""]; tr.height = 20;
  for (let k = 3; k <= 7; k++) { const c = tr.getCell(k); c.font = { name: F, bold: true, size: 10 }; c.fill = gray; c.border = box; c.alignment = { horizontal: "center", vertical: "middle" }; if (k === 7) c.numFmt = "0.##"; }
  ws.views = [{ showGridLines: false }];
  saveBlob(new Blob([await wb.xlsx.writeBuffer()], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }), file + ".xlsx");
  toast("Packing list XLSX indirildi", "download");
}
// Belgeler panel içinde tam ekran açılır (WhatsApp / Instagram içi tarayıcılar ve açılır pencere engelleyiciler yeni pencereyi engelliyor)
function openDoc(no, type) {
  closeDoc();
  const v = document.createElement("div"); v.id = "docView";
  v.innerHTML = `<div class="dv-bar"><b>${DOCS[type]} · ${pfEsc(no)}</b><span class="row" style="gap:8px"><button class="btn sm" onclick="docNewTab('${no}','${type}')">${ic("copy")} Yeni sekme</button><button class="btn sm" onclick="closeDoc()">${ic("x")} Kapat</button></span></div><iframe title="${DOCS[type]}"></iframe>`;
  document.body.appendChild(v); document.body.classList.add("dv-on");
  v.querySelector("iframe").srcdoc = docHtml(no, type);
}
function closeDoc() { $("#docView")?.remove(); document.body.classList.remove("dv-on"); }
function docNewTab(no, type) { const w = window.open("", "_blank"); if (!w) return toast("Yeni sekme engellendi — belge bu ekranda açık", "alert"); w.document.write(docHtml(no, type)); w.document.close(); }
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && $("#docView")) closeDoc(); });

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

// ——— Ürünler ———
ADMIN.products = () => {
  const act = PRODUCTS.filter(isActive).length, sel = state.psel.filter((x) => P(x));
  return `${head("Ürünler", "", `<button class="btn" onclick="exportProducts()">${ic("download")} Dışa Aktar</button><button class="btn" onclick="bulkImport()">${ic("upload")} Toplu Ürün Aç / Güncelle</button><button class="btn gold" onclick="productForm()">${ic("plus")} Yeni Ürün</button>`)}
  <div class="grid g4">${kpi(act, "Aktif ürün", "", "box")}${kpi(PRODUCTS.length - act, "Pasif ürün", "", "x")}${kpi(new Set(PRODUCTS.map((p) => p.cat)).size, "Kategori", "", "file")}${kpi(PRODUCTS.filter((p) => !p.img).length, "Görseli eksik", "", "image")}</div>
  <div class="mt">${prodFilterBar("pf")}</div>
  <div class="bulk-bar ${sel.length ? "on" : ""}" id="bulkBar"><b id="bulkN">${sel.length} ürün seçili</b><button class="btn sm danger" onclick="bulkActive(false)">Pasife al</button><button class="btn sm" onclick="bulkActive(true)">Aktif et</button><button class="btn sm ghost" onclick="state.psel=[];rerender()">Seçimi temizle</button></div>
  <div class="card"><div class="tbl-wrap"><table class="tbl"><thead><tr><th class="c" style="width:36px"><input type="checkbox" title="Görünenlerin hepsini seç" onclick="selVisible(this.checked)"></th><th>Ürün</th><th>Marka / Kategori</th><th>Barkod</th><th class="r">Koli içi</th><th class="r">Liste fiyatı</th><th>Durum</th></tr></thead><tbody>
  ${PRODUCTS.map((p) => `<tr class="click ${isActive(p) ? "" : "off"}" ${prodAttrs(p)} onclick="go('admin/product/${encodeURIComponent(p.sku)}')"><td class="c" onclick="event.stopPropagation()"><input type="checkbox" class="psel" value="${pfEsc(p.sku)}" ${sel.includes(p.sku) ? "checked" : ""} onchange="selToggle(this.value,this.checked)"></td><td><div class="prod-cell">${thumb(p)}<div><b>${p.name}</b><br><small class="mono">${p.sku}</small></div></div></td><td class="muted">${p.brand}<br><small>${p.cat}</small></td>
    <td class="mono muted">${p.ean || "—"}</td><td class="r">${p.pcsBox} adet</td><td class="r strong">${p.prices[0] != null ? money(p.prices[0], LEVELS[0].cur, 2) : "—"}</td><td>${isActive(p) ? '<span class="pill ok plain">Aktif</span>' : '<span class="pill err plain">Pasif</span>'}</td></tr>`).join("")}
  </tbody></table><div class="pf-empty muted" id="pfEmpty" style="display:none">Aramaya uyan ürün yok</div></div></div>`;
};
function selToggle(sku, on) {
  state.psel = on ? [...new Set([...state.psel, sku])] : state.psel.filter((x) => x !== sku);
  $("#bulkN").textContent = `${state.psel.length} ürün seçili`; $("#bulkBar").classList.toggle("on", state.psel.length > 0);
}
function selVisible(on) {
  [...document.querySelectorAll("#view .psel")].filter((el) => el.closest("tr").style.display !== "none").forEach((el) => { el.checked = on; selToggle(el.value, on); });
}
const prodHist = (p, msg) => (p.hist ||= []).unshift([fmtDate(new Date()), msg, authSession()?.name || ""]);
function bulkActive(on) {
  const list = state.psel.map(P).filter(Boolean);
  list.forEach((p) => { if (isActive(p) !== on) { p.active = on; prodHist(p, on ? "Aktif edildi" : "Pasife alındı"); } });
  state.psel = [];
  toast(`${list.length} ürün ${on ? "aktif edildi" : "pasife alındı"}${on ? "" : " · müşteri portalında görünmez"}`, on ? "check" : "x"); rerender();
}
function setProductActive(sku, on) { const p = P(sku); p.active = on; prodHist(p, on ? "Aktif edildi" : "Pasife alındı"); toast(on ? "Ürün aktif · müşteri portalında görünür" : "Ürün pasif · müşteri portalında görünmez", on ? "check" : "x"); rerender(); }

// Tek ürün aç / düzenle
function productForm(sku) {
  const p = sku ? P(sku) : null, brands = [...new Set(PRODUCTS.map((x) => x.brand))], cats = [...new Set(PRODUCTS.map((x) => x.cat))].sort();
  const v = (x) => (x == null ? "" : pfEsc(x));
  modal(`<h2>${p ? "Ürünü düzenle" : "Yeni ürün"}</h2>
  <div class="form cols2">
    <div class="field span2"><label>Ürün adı *</label><input class="input" id="nfName" value="${v(p?.name)}"></div>
    <div class="field"><label>SKU *</label><input class="input mono" id="nfSku" value="${v(p?.sku)}" ${p ? "disabled" : ""}></div>
    <div class="field"><label>Barkod (EAN)</label><input class="input mono" id="nfEan" value="${v(p?.ean)}"></div>
    <div class="field"><label>Marka *</label><input class="input" id="nfBrand" list="nfBrands" value="${v(p?.brand || brands[0])}"><datalist id="nfBrands">${brands.map((b) => `<option value="${pfEsc(b)}">`).join("")}</datalist></div>
    <div class="field"><label>Kategori *</label><input class="input" id="nfCat" list="nfCats" value="${v(p?.cat || cats[0])}"><datalist id="nfCats">${cats.map((c) => `<option value="${pfEsc(c)}">`).join("")}</datalist></div>
    <div class="field"><label>Koli içi adet *</label><input class="input" id="nfPcs" type="number" min="1" value="${v(p?.pcsBox)}"></div>
    <div class="field"><label>GTİP kodu</label><input class="input mono" id="nfGtip" value="${v(p?.gtip)}" placeholder="330300900011"></div>
    <div class="field"><label>Birim ağırlık (kg)</label><input class="input" id="nfKg" type="number" min="0" step="0.001" value="${v(p?.unitKg)}"></div>
    <div class="field"><label>Görsel adresi (URL)</label><input class="input" id="nfImg" placeholder="https://…" value="${v(p?.img && p.img.startsWith("http") ? p.img : "")}"></div>
    <div class="field span2"><label>Fiyatlar (birim) *</label><div class="price-grid">${LEVELS.map((l, i) => `<label><small>${l.name} · ${l.cur}</small><input class="input" type="number" min="0" step="0.0001" id="nfL${l.id}" value="${v(p?.prices[i])}"></label>`).join("")}</div></div>
  </div>
  <p class="err-t" id="nfErr" style="font-size:13px"></p>
  <div class="m-actions"><button class="btn" onclick="closeModal()">Vazgeç</button><button class="btn gold" onclick="saveProduct(${p ? `'${pfEsc(p.sku)}'` : ""})">${p ? "Kaydet" : "Ürünü aç"}</button></div>`);
}
// Yeni ürün: lojistik alanları aynı kategorideki bir üründen başlar (tahmini işaretli)
function newProduct(d) {
  const tpl = PRODUCTS.find((x) => x.cat === d.cat) || PRODUCTS[0];
  return { ...JSON.parse(JSON.stringify(tpl)), sku: d.sku, name: d.name, brand: d.brand, cat: d.cat, ean: d.ean || "", pcsBox: d.pcsBox, img: d.img || "", prices: d.prices, price: d.prices[0], est: true, active: true, hist: [] };
}
function readPrices(get) { return LEVELS.map((l) => { const x = get(l.id); return x === "" || x == null || isNaN(+x) ? null : +x; }); }
function saveProduct(sku) {
  const g = (id) => $("#" + id).value.trim(), err = (m) => ($("#nfErr").textContent = m);
  const d = { name: g("nfName"), sku: sku || g("nfSku"), ean: g("nfEan"), brand: g("nfBrand"), cat: g("nfCat"), pcsBox: parseInt(g("nfPcs")), img: g("nfImg"), prices: readPrices((i) => g("nfL" + i)), gtip: g("nfGtip").replace(/\D/g, ""), unitKg: g("nfKg") === "" ? null : +g("nfKg") };
  const logi = (p) => { if (d.gtip) p.gtip = p.hs = d.gtip; if (d.unitKg != null) { p.unitKg = d.unitKg; p.net = p.gross = p.kg = +(d.unitKg * p.pcsBox).toFixed(3); } };
  if (!d.name || !d.sku || !d.brand || !d.cat) return err("Ürün adı, SKU, marka ve kategori zorunlu.");
  if (!(d.pcsBox > 0)) return err("Koli içi adet 1 veya daha büyük olmalı.");
  if (d.prices[0] == null) return err("En az Level 1 (liste) fiyatı girilmeli.");
  if (!sku && P(d.sku)) return err("Bu SKU zaten var.");
  if (sku) {
    const p = P(sku), ch = [];
    if (p.name !== d.name) ch.push("ad"); if (p.pcsBox !== d.pcsBox) ch.push("koli içi");
    LEVELS.forEach((l, i) => { if (p.prices[i] !== d.prices[i]) ch.push(`${l.name.split(" · ")[0]} ${p.prices[i] ?? "—"} → ${d.prices[i] ?? "—"}`); });
    Object.assign(p, { name: d.name, ean: d.ean, brand: d.brand, cat: d.cat, pcsBox: d.pcsBox, prices: d.prices, price: d.prices[0] }, d.img ? { img: d.img } : {}); logi(p);
    if (ch.length) prodHist(p, "Güncellendi: " + ch.join(", "));
    closeModal(); toast("Ürün kaydedildi"); rerender();
  } else {
    const p = newProduct(d); logi(p); prodHist(p, "Ürün açıldı"); PRODUCTS.push(p);
    closeModal(); toast(`${d.sku} açıldı · müşteri portalında görünür`); go("admin/product/" + encodeURIComponent(d.sku));
  }
}
// Fiyat revizesi (ürün sayfasından)
function savePrices(sku) {
  const p = P(sku), np = readPrices((i) => $("#pr" + i).value.trim());
  if (np[0] == null) return toast("Level 1 fiyatı boş olamaz", "alert");
  const ch = LEVELS.map((l, i) => (p.prices[i] !== np[i] ? `${l.name.split(" · ")[0]} ${p.prices[i] ?? "—"} → ${np[i] ?? "—"}` : "")).filter(Boolean);
  if (!ch.length) return toast("Değişiklik yok", "info");
  p.prices = np; p.price = np[0]; prodHist(p, "Fiyat revizesi: " + ch.join(", "));
  toast("Fiyatlar güncellendi · yeni siparişlerde geçerli", "tag"); rerender();
}

// ——— Excel: şablon, içe aktarma, dışa aktarma ———
const XLSX_URL = "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js";
let xlsxP = null;
const loadXlsx = () => (xlsxP ||= new Promise((ok, no) => { if (window.XLSX) return ok(); const sc = document.createElement("script"); sc.src = XLSX_URL; sc.onload = ok; sc.onerror = () => { xlsxP = null; no(new Error("Excel kütüphanesi yüklenemedi")); }; document.head.appendChild(sc); }));
const XCOLS = () => ["SKU", "Ürün adı", "Barkod", "Marka", "Kategori", "Koli içi adet", ...LEVELS.map((l) => `Level ${l.id} fiyat (${l.cur})`), "Görsel URL", "Durum (Aktif/Pasif)", "GTİP kodu", "Koli net kg", "Koli brüt kg"];
const prodRow = (p) => [p.sku, p.name, p.ean || "", p.brand, p.cat, p.pcsBox, ...LEVELS.map((l, i) => p.prices[i] ?? ""), p.img && p.img.startsWith("http") ? p.img : "", isActive(p) ? "Aktif" : "Pasif", p.gtip || "", p.net ?? "", p.gross ?? ""];
async function xlsxDownload(rows, file, notes) {
  try { await loadXlsx(); } catch (e) { return toast(e.message, "alert"); }
  const wb = XLSX.utils.book_new(), ws = XLSX.utils.aoa_to_sheet([XCOLS(), ...rows]);
  ws["!cols"] = XCOLS().map((h, i) => ({ wch: i === 1 ? 38 : Math.max(12, h.length + 2) }));
  XLSX.utils.book_append_sheet(wb, ws, "Ürünler");
  if (notes) XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(notes), "Açıklama");
  XLSX.writeFile(wb, file);
}
function exportProducts() { xlsxDownload(PRODUCTS.map(prodRow), `senso-urunler-${new Date().toISOString().slice(0, 10)}.xlsx`); toast("Ürün listesi Excel olarak indiriliyor", "download"); }
function downloadTemplate() {
  const ex = PRODUCTS[0];
  xlsxDownload([["ORNEK-SKU-01", "Örnek Ürün 100 ml", "8690000000000", ex.brand, ex.cat, 24, ...LEVELS.map((l, i) => (ex.prices[i] != null ? +(ex.prices[i] * 1.5).toFixed(2) : "")), "", "Aktif", "330590009000", 8.64, 9.2]], "senso-urun-sablonu.xlsx", [
    ["Alan", "Açıklama"], ["SKU", "Zorunlu. Sistemde varsa o ürün güncellenir, yoksa yeni ürün açılır."], ["Ürün adı", "Zorunlu."], ["Barkod", "İsteğe bağlı (EAN-13)."],
    ["Marka", "Zorunlu. Mevcut markalar: " + [...new Set(PRODUCTS.map((p) => p.brand))].join(", ")], ["Kategori", "Zorunlu. Mevcut kategoriler: " + [...new Set(PRODUCTS.map((p) => p.cat))].sort().join(", ")],
    ["Koli içi adet", "Zorunlu, tam sayı."], ["Level fiyatları", "Birim fiyat. Level 1 (liste) zorunlu, diğerleri boş bırakılabilir. Ondalık için nokta veya virgül."],
    ["Görsel URL", "İsteğe bağlı, https:// ile başlayan görsel adresi."], ["GTİP kodu", "Packing list için 12 haneli GTİP (ör. 330590009000)."], ["Koli net / brüt kg", "Bir kolinin net ve brüt ağırlığı (packing list toplamları buradan hesaplanır)."], ["Durum", "Aktif veya Pasif. Boşsa Aktif."], ["", "Örnek satırı silip kendi ürünlerinizi yazın. 1. satırdaki başlıkları değiştirmeyin."],
  ]);
}
function bulkImport() {
  state.imp = null;
  modal(`<h2>Toplu Ürün Aç / Güncelle</h2>
  <ol class="steps-list"><li><b>Şablonu indirin.</b> Her satır bir ürün; SKU sistemde varsa güncellenir, yoksa yeni ürün açılır.<br><button class="btn sm mt" onclick="downloadTemplate()">${ic("download")} Örnek Excel şablonu</button> <button class="btn sm mt ghost" onclick="exportProducts()">${ic("download")} Mevcut ürünler (düzenlemek için)</button></li>
  <li><b>Doldurup yükleyin.</b> .xlsx, .xls veya .csv<br><input type="file" class="input mt" accept=".xlsx,.xls,.csv" onchange="readImport(this.files[0])"></li></ol>
  <div id="impPrev"></div>
  <div class="m-actions"><button class="btn" onclick="closeModal()">Vazgeç</button><button class="btn gold" id="impGo" disabled onclick="applyImport()">Aktar</button></div>`);
}
async function readImport(file) {
  if (!file) return;
  const box = $("#impPrev"); box.innerHTML = `<p class="muted">Okunuyor…</p>`;
  try {
    await loadXlsx();
    const wb = XLSX.read(await file.arrayBuffer(), { type: "array" });
    const rows = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1, defval: "", raw: true }).filter((r) => r.some((c) => String(c).trim() !== ""));
    const H = rows.shift().map((h) => String(h).trim().toLowerCase()), col = (re) => H.findIndex((h) => re.test(h));
    const ix = { sku: col(/^sku/), name: col(/ürün ad|urun ad|name/), ean: col(/barkod|ean|barcode/), brand: col(/marka|brand/), cat: col(/kategori|categ/), pcs: col(/koli|pcs|box/), img: col(/görsel|gorsel|image/), act: col(/durum|status/), gtip: col(/gtip|hs/), net: col(/net/), gross: col(/brüt|brut|gross/) };
    const lv = LEVELS.map((l) => col(new RegExp(`level ?${l.id}\\b`)));
    if (ix.sku < 0 || ix.name < 0) throw new Error("Başlık satırı tanınmadı — lütfen örnek şablonu kullanın.");
    const num_ = (x) => (x === "" || x == null ? null : +String(x).replace(/\s/g, "").replace(",", "."));
    const seen = new Set();
    state.imp = rows.map((r, n) => {
      const g = (k) => (ix[k] >= 0 ? String(r[ix[k]] ?? "").trim() : "");
      const d = { line: n + 2, sku: g("sku"), name: g("name"), ean: g("ean"), brand: g("brand"), cat: g("cat"), pcsBox: parseInt(g("pcs")), img: g("img"), active: !/pasif|passive|inactive/i.test(g("act")), prices: lv.map((c) => (c >= 0 ? num_(r[c]) : null)), gtip: g("gtip").replace(/\D/g, ""), net: ix.net >= 0 ? num_(r[ix.net]) : null, gross: ix.gross >= 0 ? num_(r[ix.gross]) : null };
      const ex = P(d.sku), errs = [];
      if (!d.sku) errs.push("SKU yok");
      if (seen.has(d.sku)) errs.push("SKU dosyada tekrar ediyor"); seen.add(d.sku);
      if (!ex) { if (!d.name) errs.push("ad yok"); if (!d.brand) errs.push("marka yok"); if (!d.cat) errs.push("kategori yok"); if (!(d.pcsBox > 0)) errs.push("koli içi adet yok"); if (d.prices[0] == null) errs.push("Level 1 fiyat yok"); }
      if (d.prices.some((x) => x != null && (isNaN(x) || x < 0))) errs.push("geçersiz fiyat");
      return { d, ex, errs };
    });
    const okRows = state.imp.filter((x) => !x.errs.length), nNew = okRows.filter((x) => !x.ex).length, nUpd = okRows.length - nNew;
    box.innerHTML = `<div class="between mt"><b>${state.imp.length} satır okundu</b><span class="muted">${nNew} yeni · ${nUpd} güncelleme · ${state.imp.length - okRows.length} hatalı</span></div>
    <div class="tbl-wrap" style="margin:8px 0 0;max-height:300px;overflow:auto"><table class="tbl"><thead><tr><th>Satır</th><th>SKU</th><th>Ürün</th><th class="r">Level 1</th><th>İşlem</th></tr></thead><tbody>
    ${state.imp.map(({ d, ex, errs }) => `<tr><td class="muted">${d.line}</td><td class="mono">${pfEsc(d.sku) || "—"}</td><td>${pfEsc(d.name || ex?.name || "—")}</td><td class="r">${d.prices[0] ?? "—"}</td><td>${errs.length ? `<span class="pill err">${errs.join(", ")}</span>` : ex ? '<span class="pill info">Güncelle</span>' : '<span class="pill ok">Yeni</span>'}</td></tr>`).join("")}
    </tbody></table></div>`;
    $("#impGo").disabled = !okRows.length; $("#impGo").textContent = okRows.length ? `${okRows.length} satırı aktar` : "Aktar";
  } catch (e) { box.innerHTML = `<div class="notice err mt">${ic("alert")}<span>${pfEsc(e.message)}</span></div>`; $("#impGo").disabled = true; }
}
function applyImport() {
  const rows = (state.imp || []).filter((x) => !x.errs.length);
  let nNew = 0, nUpd = 0;
  rows.forEach(({ d, ex }) => {
    if (ex) {
      if (d.name) ex.name = d.name; if (d.ean) ex.ean = d.ean; if (d.brand) ex.brand = d.brand; if (d.cat) ex.cat = d.cat; if (d.pcsBox > 0) ex.pcsBox = d.pcsBox; if (d.img) ex.img = d.img;
      d.prices.forEach((x, i) => { if (x != null) ex.prices[i] = x; }); ex.price = ex.prices[0]; ex.active = d.active; if (d.gtip) ex.gtip = d.gtip; if (d.net != null) ex.net = d.net; if (d.gross != null) { ex.gross = d.gross; ex.kg = d.gross; }
      prodHist(ex, "Excel ile güncellendi"); nUpd++;
    } else { const p = newProduct(d); p.active = d.active; if (d.gtip) p.gtip = d.gtip; if (d.net != null) p.net = d.net; if (d.gross != null) { p.gross = d.gross; p.kg = d.gross; } prodHist(p, "Excel ile açıldı"); PRODUCTS.push(p); nNew++; }
  });
  state.imp = null; closeModal(); toast(`${nNew} yeni ürün açıldı · ${nUpd} ürün güncellendi`, "upload"); rerender();
}
ADMIN.product = (sku) => {
  const p = P(sku);
  if (!p) return `${head("Ürün bulunamadı", "")}<div class="card"><div class="empty">${pfEsc(sku)} bulunamadı. <a href="#/admin/products">Ürünlere dön</a></div></div>`;
  const bv = (p.dims[0] * p.dims[1] * p.dims[2]) / 1e6;
  const res = ORDERS.filter((o) => o.stage >= 2 && o.stage <= 4 && o.items.some(([s]) => s === sku));
  return `${head(p.name, `${p.sku} · ${p.brand} · ${p.cat}`, `${isActive(p) ? `<span class="pill ok">Aktif</span><button class="btn danger" onclick="setProductActive('${p.sku}',false)">Pasife al</button>` : `<span class="pill err">Pasif · portalda görünmüyor</span><button class="btn" onclick="setProductActive('${p.sku}',true)">Aktif et</button>`}<button class="btn gold" onclick="productForm('${p.sku}')">${ic("edit")} Düzenle</button>`, `<a href="#/admin/products">Ürünler</a> / ${p.sku}`)}
  <div class="grid g4">
    <div class="card" style="padding:0;overflow:hidden;background:#f3f3f1;display:grid;place-items:center;min-height:240px">${p.img ? `<img src="${imgSrc(p.img)}" style="max-width:70%;max-height:220px">` : noImg(p)}</div>
    <div class="card"><div class="card-h"><h3>Genel</h3></div><dl class="dl" style="grid-template-columns:90px 1fr"><dt>SKU</dt><dd class="mono">${p.sku}</dd><dt>EAN</dt><dd class="mono">${p.ean}</dd><dt>Marka</dt><dd>${p.brand}</dd><dt>Kategori</dt><dd>${p.cat}</dd><dt>Varyant</dt><dd>${pxVariant(p)}</dd><dt>Durum</dt><dd>Aktif</dd></dl></div>
    <div class="card"><div class="card-h"><h3>Paketleme & Lojistik</h3></div><dl class="dl" style="grid-template-columns:110px 1fr"><dt>pcs / koli</dt><dd>${p.pcsBox}</dd><dt>Koli L×W×H</dt><dd>${p.dims.join(" × ")} cm</dd><dt>Koli CBM</dt><dd>${bv.toFixed(4)} m³</dd><dt>Birim ağırlık</dt><dd>${p.unitKg != null ? p.unitKg + " kg" : "—"}</dd><dt>Koli net</dt><dd>${p.net != null ? p.net + " kg" : (p.kg * 0.86).toFixed(1) + " kg (tahmini)"}</dd><dt>Sınıf</dt><dd>${p.cls}</dd><dt>İstif</dt><dd>${pxStack(p)}</dd><dt>Yön</dt><dd>${pxOrient(p)}</dd><dt>Loose loading</dt><dd class="${p.loose ? "ok-t" : "muted"}">${p.loose ? "Allowed" : "Not allowed"}</dd></dl></div>
    <div class="card"><div class="card-h"><h3>Ticaret / Uyum</h3></div><dl class="dl" style="grid-template-columns:90px 1fr"><dt>GTİP</dt><dd class="mono">${p.gtip || p.hs || "—"}</dd><dt>Menşe</dt><dd>${p.origin}</dd></dl></div>
  </div>
  <div class="card mt"><div class="card-h"><h3>Fiyatlar</h3><span class="sub">Birim fiyat · değişiklik yeni siparişlerde geçerli</span></div>
    <div class="price-grid">${LEVELS.map((l, i) => `<label><small>${l.name} · ${l.cur}</small><input class="input" type="number" min="0" step="0.0001" id="pr${l.id}" value="${p.prices[i] ?? ""}"></label>`).join("")}</div>
    <div class="row mt" style="justify-content:flex-end"><button class="btn gold" onclick="savePrices('${p.sku}')">${ic("check")} Fiyatları kaydet</button></div></div>
  <div class="grid g2 mt">
    <div class="card"><div class="card-h"><h3>Veri Tamlığı</h3>${p.est ? '<span class="pill warn">Lojistik tahmini</span>' : '<span class="pill ok">Order Ready ✓</span>'}</div>
      
      ${[["Fiyat (6 seviye)", p.prices.every((x) => x != null)], ["pcs/koli", true], ["Barkod", !!p.ean], ["Görsel", !!p.img], ["Koli ölçüsü", !p.est], ["Ağırlık", p.unitKg != null], ["GTİP kodu", !!p.gtip]].map(([x, ok]) => `<div class="stat-row"><span>${x}</span><b class="${ok ? "ok-t" : "warn-t"}">${ok ? "✓" : "tahmini / eksik"}</b></div>`).join("")}
    </div>
    <div class="card"><div class="card-h"><h3>Bağlı İçerik</h3></div>
      <div class="stat-row"><span>Dokümanlar</span><a class="strong" href="#/admin/documents">${DOCUMENTS.filter((d) => d.sku === p.sku || d.sku === "All").length} →</a></div>
      <div class="stat-row"><span>Marketing içerik</span><a class="strong" href="#/admin/marketing">${MARKETING.filter((m) => m.img === p.img).length || 1} →</a></div>
      <div class="section-title">Geçmiş</div>
      ${p.hist?.length ? `<ul class="tl">${p.hist.slice(0, 8).map(([d, m, by]) => `<li>${pfEsc(m)}<small>${by ? pfEsc(by) + " · " : ""}${d}</small></li>`).join("")}</ul>` : '<p class="muted">Henüz değişiklik yok.</p>'}
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

// ——— Sevkiyat ———
ADMIN.shipments = (arg) => {
  const ready = ORDERS.filter((x) => x.stage === 4);
  if (arg) state.shipOrder = arg;
  const o = ready.find((x) => x.no === state.shipOrder) || ready[0];
  const shipped = ORDERS.filter((x) => x.stage === 5);
  const list = `<div class="card mt"><div class="card-h"><h3>Son Sevkiyatlar</h3></div><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Sipariş</th><th>Müşteri</th><th class="r">Koli</th><th class="r">Tutar</th><th>Sevk tarihi</th></tr></thead><tbody>
    ${shipped.map((x) => `<tr class="click" onclick="go('admin/order/${x.no}')"><td class="mono">${x.no}</td><td>${C(x.cust).flag} ${C(x.cust).name}</td><td class="r">${num(orderQty(x.items).boxes)}</td><td class="r">${money(orderTotal(x), x.currency)}</td><td>${x.ship?.date || x.date}</td></tr>`).join("")}</tbody></table></div></div>`;
  if (!o) return `${head("Sevkiyat", "")}<div class="card"><div class="empty">Sevke hazır sipariş yok.</div></div>${list}`;
  const L = orderQty(o.items.map(([s, b]) => [s, o.shipped?.[s] ?? b]));
  return `${head("Sevkiyat", "", ready.length > 1 ? `<select class="input" style="width:280px" onchange="go('admin/shipments/'+this.value)">${ready.map((x) => `<option value="${x.no}" ${x.no === o.no ? "selected" : ""}>${x.no} · ${C(x.cust).name}</option>`).join("")}</select>` : "")}
  <div class="card" style="margin-bottom:18px"><div class="row wrap" style="gap:14px;font:500 13px var(--display);letter-spacing:.08em;text-transform:uppercase"><span class="ok-t">Preparation Completed</span><span class="dim">→</span><span class="${o.packed ? "ok-t" : "gold-t"}">Confirm Final Packing</span><span class="dim">→</span><span class="${o.packed ? "gold-t" : ""}">Ready for Shipment</span><span class="dim">→</span><span>Mark as Shipped</span></div></div>
  <div>
    <div class="card" style="max-width:720px"><div class="card-h"><h3>Final Packing — <a href="#/admin/order/${o.no}">${o.no}</a></h3><span class="pill ok">Hazırlık tamam</span></div>
      <div class="stat-row"><span>Müşteri</span><b>${C(o.cust).flag} ${C(o.cust).name}</b></div>
      <div class="stat-row"><span>Koli / adet</span><b>${num(L.boxes)} / ${num(L.pcs)}</b></div><div class="stat-row"><span>Toplam koli</span><b>${num(L.boxes)}</b></div>
      <div class="stat-row"><span>Net / Brüt</span><b>${num(Math.round(L.kg * 0.9))} / ${num(L.kg)} kg</b></div><div class="stat-row"><span>Packing List</span><a class="strong" onclick="openDoc('${o.no}','pl')">Aç ✓</a></div>
      <label class="checks"><label><input type="checkbox"> Kısmi sevkiyat (Shipment 1 / Shipment 2)</label></label>
      ${o.packed ? `<button class="btn gold block lg" onclick="markShipped('${o.no}')">${ic("truck")} Sevk Edildi Olarak İşaretle</button>` : `<button class="btn ok block lg" onclick="O('${o.no}').packed=true;log('${o.no}','Final packing onaylandı');toast('Final packing onaylandı');rerender()">Final Packing'i Onayla</button>`}</div>
  </div>${list}`;
};
function markShipped(no) {
  const o = O(no);
  o.ship = { date: fmtDate(new Date()) };
  o.stage = 5;
  log(no, "Sevk edildi");
  toast("Sevk edildi · müşteri sipariş durumunu ve dokümanları görebilir", "truck");
  go("admin/order/" + no);
}

// ——— Finans ———
function paymentsTable(list) {
  return `<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Sipariş</th><th>Proforma</th><th class="r">Tutar</th><th class="r">Alınan</th><th class="r">Bakiye</th><th>Durum</th></tr></thead><tbody>
  ${list.filter((o) => o.stage >= 2).map((o) => { const t = orderTotal(o), ps = payState(o); return `<tr><td class="mono">${o.no}</td><td class="mono muted">PI-${o.no.slice(3)} / Rev.1</td><td class="r">${money(t, o.currency)}</td><td class="r">${money(o.paid, o.currency)}</td><td class="r strong">${money(Math.max(0, t - o.paid), o.currency)}</td><td><span class="pill ${ps[1]}">${ps[2]}</span></td></tr>`; }).join("")}
  </tbody></table></div>`;
}
ADMIN.finance = (arg) => {
  const payable = ORDERS.filter((x) => x.stage >= 2 && x.stage < 5);
  if (arg) state.finOrder = arg;
  const o = O(state.finOrder) && O(state.finOrder).stage >= 2 ? O(state.finOrder) : payable.find((x) => x.paid + 1 < orderTotal(x)) || payable[0] || ORDERS.find((x) => x.stage >= 2);
  const t = orderTotal(o), ps = payState(o), pi = `PI-${o.no.slice(3)}`;
  const openBal = ORDERS.filter((x) => x.stage >= 2).reduce((s, x) => s + Math.max(0, orderTotal(x) - x.paid), 0);
  return `${head("Finans & Ödemeler", "", `<select class="input" style="width:280px" onchange="go('admin/finance/'+this.value)">${ORDERS.filter((x) => x.stage >= 2).map((x) => `<option value="${x.no}" ${x.no === o.no ? "selected" : ""}>${x.no} · ${C(x.cust).name} · ${payState(x)[2]}</option>`).join("")}</select>`)}
  <div class="grid g4">${kpi(money(Math.round(openBal)), "Açık Bakiye", "", "wallet")}${kpi("$386,200", "Eylül Tahsilat", "22 ödeme", "check")}${kpi(ORDERS.filter((x) => x.stage === 2).length, "Ödeme Bekleyen", "Proforma gönderildi", "clock")}${kpi("$1,250", "Customer Credit", "Fazla ödemeler", "bank")}</div>
  <div class="grid g2 mt">
    <div class="card"><div class="card-h"><h3>Proforma Invoice</h3><span class="pill plain">${pi} / Rev.1</span></div>
      <div class="stat-row"><span>Sipariş</span><a class="strong mono" href="#/admin/order/${o.no}">${o.no}</a></div><div class="stat-row"><span>Müşteri</span><b>${C(o.cust).flag} ${C(o.cust).name}</b></div><div class="stat-row"><span>Para birimi</span><b>${o.currency}</b></div><div class="stat-row"><span>Sipariş toplamı</span><b>${money(t, o.currency)}</b></div><div class="stat-row"><span>Ödeme şartı</span><b>100% Advance</b></div>
      <div class="card flat mt"><div class="between"><b style="font:500 13px var(--display);letter-spacing:.08em">BANKA — ${o.currency} VARSAYILAN</b><span class="pill ok plain">Otomatik</span></div><p class="muted mono" style="margin:8px 0 0">Bank A · ${o.currency} Account · TR12 0001 2345 6789 0000 0001 · SWIFT TGBATRIS</p></div>
      <div class="row mt"><button class="btn gold" onclick="openDoc('${o.no}','pi')">${ic("download")} PDF Oluştur</button><button class="btn warn" onclick="newRevision()">Yeni Revizyon</button></div>
      <div class="section-title">Revizyon Geçmişi</div>
      ${state.piRevs.slice().reverse().map(([r, d, n], i) => `<div class="stat-row"><span style="color:var(--text)">${ic("file")} ${pi} / ${r} <small class="muted">· ${n}</small></span><span class="row"><small class="muted">${d}</small>${i === 0 ? '<span class="pill ok plain">Güncel</span>' : ""}</span></div>`).join("")}</div>
    <div class="card flat"><div class="card-h"><h3>Ödeme</h3><span class="pill ${ps[1]}">${ps[2]}</span></div>
      <div class="grid g2"><div><div class="muted">Alınan</div><div class="big-num">${money(o.paid, o.currency)}</div></div><div><div class="muted">Bakiye</div><div class="big-num warn-t">${money(t - o.paid, o.currency)}</div></div></div>
      <div class="form cols2 mt"><div class="field"><label>Tarih</label><input class="input" type="date" value="2026-09-30"></div><div class="field"><label>Tutar</label><input class="input" id="payAmt" value="${Math.max(0, Math.round((t - o.paid) * 100) / 100)}"></div>
      <div class="field"><label>Para Birimi</label><select class="input"><option value="${o.currency}">${o.currency}</option></select></div><div class="field"><label>Banka</label><select class="input"><option>Bank A · ${o.currency}</option></select></div>
      <div class="field span2"><label>SWIFT / Referans</label><input class="input" placeholder="…"></div><div class="field span2"><label>Dekont</label><button class="btn">${ic("upload")} Dosya yükle</button></div></div>
      <div class="section-title">Siparişlere Dağıt</div>
      <div class="stat-row"><span>${o.no} · bakiye ${money(t - o.paid, o.currency)}</span><input class="input alloc" style="width:110px;height:34px" value="${Math.round(t - o.paid)}" oninput="allocCalc()"></div>
      <div class="stat-row"><span>SO-2026-0138 · bakiye €2,300</span><input class="input alloc" style="width:110px;height:34px" value="0" oninput="allocCalc()"></div>
      <div class="stat-row"><span>Customer Credit'e kalan</span><b id="allocRest">€0</b></div>
      <button class="btn ok block lg mt" ${o.stage >= 5 ? "disabled" : ""} onclick="addPayment('${o.no}')">${ic("check")} Ödeme Ekle</button></div>
  </div>
  <div class="grid g-side mt"><div><div class="card"><div class="card-h"><h3>Ödeme Durumu</h3></div>${paymentsTable(ORDERS)}</div>
  <div class="card mt"><div class="card-h"><h3>Müşteri Cari</h3></div><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Müşteri</th><th>Döviz</th><th class="r">YTD Fatura</th><th class="r">Açık Bakiye</th><th class="r">Credit</th></tr></thead><tbody>
  ${CUSTOMERS.filter((c) => c.status !== "Pending").map((c) => `<tr><td>${c.flag} ${c.name}</td><td>${c.currency}</td><td class="r">${money(c.ytd, c.currency)}</td><td class="r ${c.balance ? "warn-t strong" : ""}">${money(c.balance, c.currency)}</td><td class="r">${c.id === "C-1017" ? money(1250) : "—"}</td></tr>`).join("")}
  </tbody></table></div></div></div>
  <div class="card dark"><div class="card-h"><h3>Banka Hesabı Kuralı</h3></div><div class="stat-row"><span>USD sipariş</span><b>→ USD hesap</b></div><div class="stat-row"><span>EUR sipariş</span><b>→ EUR hesap</b></div>
  <div class="section-title">Öncelik</div><ol style="margin:0;padding-left:18px;line-height:2"><li>Müşteriye özel hesap</li><li>Para birimi varsayılanı</li><li>Yetkili manuel seçim</li></ol>
  </div></div>`;
};
function custPayment(id, sign) {
  const c = C(id), cu = levelCur(levelOf(id)), b = custBalance(id);
  modal(`<h2>${sign > 0 ? "Ödeme ekle" : "Ödeme çıkart"} — ${pfEsc(c.name)}</h2>
  <p class="muted">${sign > 0 ? `Açık bakiye ${money(b, cu, 2)}. Tutar en eski siparişten başlayarak bakiyelere dağıtılır.` : "Hatalı girilen ödemeyi geri almak için. Tutar en son ödeme alınan siparişten düşülür."}</p>
  <div class="field"><label>Tutar (${cu})</label><input class="input" id="cpAmt" type="number" min="0" step="0.01" value="${sign > 0 ? b.toFixed(2) : ""}"></div>
  <div class="field mt"><label>Not</label><input class="input" id="cpNote" placeholder="Örn. banka dekontu 12.10"></div>
  <div class="m-actions"><button class="btn" onclick="closeModal()">Vazgeç</button><button class="btn ${sign > 0 ? "gold" : "danger"}" onclick="applyCustPayment('${id}',${sign})">${sign > 0 ? "Ödemeyi ekle" : "Ödemeyi çıkart"}</button></div>`);
}
function applyCustPayment(id, sign) {
  let amt = Math.round((parseFloat(String($("#cpAmt").value).replace(",", ".")) || 0) * 100) / 100;
  if (amt <= 0) return toast("Geçerli bir tutar girin", "alert");
  const note = $("#cpNote").value.trim(), cu = levelCur(levelOf(id)), total = amt;
  const list = sortOrders(ORDERS.filter((o) => o.cust === id && o.stage >= 2));
  if (sign > 0) {
    for (const o of list.slice().reverse()) {   // en eski sipariş önce
      const open = orderBal(o); if (amt <= 0 || open <= 0) continue;
      const x = Math.min(open, amt); o.paid = Math.round(((o.paid || 0) + x) * 100) / 100; amt = Math.round((amt - x) * 100) / 100;
      const full = orderBal(o) < 0.01;
      log(o.no, `Ödeme eklendi: ${money(x, o.currency, 2)}${note ? " · " + note : ""}${full && o.stage === 2 ? " · hazırlığa alındı" : ""}`);
      if (full && o.stage === 2) o.stage = 3;
    }
    if (amt > 0) { const o = list[0]; if (o) { o.paid = Math.round((o.paid + amt) * 100) / 100; log(o.no, `Fazla ödeme: ${money(amt, o.currency, 2)}`); } }
  } else {
    for (const o of list) {                       // en yeni sipariş önce
      if (amt <= 0 || !(o.paid > 0)) continue;
      const x = Math.min(o.paid, amt); o.paid = Math.round((o.paid - x) * 100) / 100; amt = Math.round((amt - x) * 100) / 100;
      log(o.no, `Ödeme çıkartıldı: ${money(x, o.currency, 2)}${note ? " · " + note : ""}`);
    }
  }
  closeModal(); toast(`${money(total - Math.max(0, sign < 0 ? amt : 0), cu, 2)} ${sign > 0 ? "eklendi" : "çıkartıldı"} · kalan bakiye ${money(custBalance(id), cu, 2)}`, "wallet"); rerender();
}
function addPayment(no) {
  const o = O(no), amt = Math.round((parseFloat(String($("#payAmt").value).replace(",", ".")) || 0) * 100) / 100;
  if (amt <= 0) { toast("Geçerli bir tutar girin", "alert"); return; }
  o.paid = Math.round((o.paid + amt) * 100) / 100;
  const full = o.paid + 0.01 >= orderTotal(o);
  log(no, `Ödeme eklendi: ${money(amt, o.currency, 2)} · toplam alınan ${money(o.paid, o.currency, 2)}${full && o.stage === 2 ? " · hazırlığa alındı" : ""}`);
  if (full && o.stage === 2) o.stage = 3;
  toast(full ? "Ödeme tamamlandı · sipariş hazırlığa alındı" : "Kısmi ödeme eklendi");
  rerender();
}
function newRevision() { const n = "Rev." + (state.piRevs.length + 1); state.piRevs.push([n, "30 Sep 2026", "Admin revize"]); toast(`${n} oluşturuldu · önceki revizyon saklandı`); rerender(); }
function allocCalc() {
  const paid = Number(document.querySelectorAll(".form.cols2 .input")[1].value) || 0;
  const used = [...document.querySelectorAll(".alloc")].reduce((s, i) => s + (Number(i.value) || 0), 0);
  $("#allocRest").textContent = "€" + num(Math.max(0, paid - used));
}

// ——— Raporlar ———
// Toplam satış = firmanın gireceği açılış (devir) tutarı + panelden gelen onaylı siparişler (final onay ve sonrası)
function salesKpis() {
  const b = state.meta.sales || {}, done = ORDERS.filter((o) => o.stage >= 2), by = {};
  done.forEach((o) => (by[o.currency] = (by[o.currency] || 0) + orderTotal(o)));
  const tot = (cur) => (+b[cur.toLowerCase()] || 0) + (by[cur] || 0);
  const pcs = done.reduce((s, o) => s + orderQty(o.items).pcs, 0) + (+b.pcs || 0);
  const cnt = done.length + (+b.orders || 0), countries = new Set(done.map((o) => C(o.cust)?.country).filter(Boolean)).size;
  const inp = (k, ph) => `<input class="input" type="number" min="0" step="any" value="${b[k] ?? ""}" placeholder="${ph}" onchange="setSalesBase('${k}',this.value)">`;
  return `<div class="grid g4">${kpi([money(tot("USD"), "USD"), tot("EUR") ? money(tot("EUR"), "EUR") : ""].filter(Boolean).join(" · "), "Toplam Satış", "Açılış + panel siparişleri", "trend")}${kpi(num(pcs), "Adet", "pcs", "box")}${kpi(num(cnt), "Sipariş", "Onaylı", "cart")}${kpi(countries, "Ülke", "Panelden sipariş veren", "globe")}</div>
  <details class="card flat mt base-box" ${b.usd || b.eur ? "" : "open"}><summary><b>Açılış tutarları</b> <span class="muted">— site aktife alınmadan önceki toplamlar; panel siparişleri bunun üzerine eklenir</span></summary>
    <div class="form cols4 mt"><div class="field"><label>Satış (USD)</label>${inp("usd", "0")}</div><div class="field"><label>Satış (EUR)</label>${inp("eur", "0")}</div><div class="field"><label>Sipariş adedi</label>${inp("orders", "0")}</div><div class="field"><label>Ürün adedi (pcs)</label>${inp("pcs", "0")}</div></div>
    <small class="muted">Panelden: ${Object.entries(by).map(([k, v]) => money(v, k)).join(" · ") || "henüz onaylı sipariş yok"} · ${done.length} sipariş</small></details>`;
}
function setSalesBase(k, v) { state.meta.sales = { ...(state.meta.sales || {}), [k]: v === "" ? null : +v }; toast("Açılış tutarı kaydedildi"); rerender(); }
ADMIN.reports = () => {
  const top = [["BW-20-SKL", 24500], ["BSS-200 - PS", 19200], ["BC-400-2", 17400], ["BW-150-MAT-1018", 15100], ["BW-150-GUM", 12800]];
  return `${head("Raporlar & Analiz", "", `<button class="btn" onclick="toast('Excel indiriliyor','download')">${ic("download")} Excel</button><button class="btn" onclick="toast('PDF indiriliyor','download')">${ic("download")} PDF</button>`)}
  <div class="card flat" style="margin-bottom:18px"><div class="filters">
    ${[["Son 3 Ay", "Bu Yıl", "Q3 2026", "Q3 2025"], ["Tüm Bölgeler", "Avrupa", "Orta Doğu", "Amerika", "BDT"], ["Tüm Ülkeler", "Germany", "USA", "Lithuania", "UAE"], ["Tüm Markalar", "Marmara Barber", "Marmara", "Noir"], ["Tüm Kategoriler", "Cologne", "Hair Styling", "Shaving"], ["Tüm Müşteriler", ...CUSTOMERS.filter((c) => c.status !== "Pending").map((c) => c.name)], ["Tüm SKU", ...PRODUCTS.map((p) => p.sku)], ["Tüm Satışçılar", "Ferhat", "Gözde"], ["Tüm Dövizler", "USD", "EUR"], ["Değer ($)", "Adet (pcs)"]].map((o) => `<select>${o.map((x) => `<option value="${x}">${x}</option>`).join("")}</select>`).join("")}
    <button class="btn gold sm" onclick="toast('Filtre uygulandı')">Uygula</button></div></div>
  ${salesKpis()}
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
  const crit = ["Müşteri onayı", "Fiyat değişikliği", "Final sipariş onayı", "Ödemesiz serbest bırakma", "Final packing", "Sevk edildi işaretleme"];
  return `${head("Kullanıcılar & Yetkiler", "", `<button class="btn gold">${ic("plus")} Kullanıcı Davet Et</button>`)}
  <div class="card"><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Kullanıcı</th><th>E-posta</th><th>Rol</th><th>Kapsam</th><th>Son giriş</th></tr></thead><tbody>
  ${USERS.map((u, i) => `<tr><td class="strong">${u.name}</td><td class="muted">${u.email}</td><td><span class="pill ${u.role === "Super Admin" ? "gold" : "plain"}">${u.role}</span></td><td class="muted">${u.scope}</td><td class="muted">${["Şimdi", "12 dk önce", "1 sa önce", "Bugün", "Bugün", "Dün", "3 gün önce"][i]}</td></tr>`).join("")}
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

// Müşteri bildirimi: sipariş sevke hazır olunca final proforma hazır (sipariş açılınca okundu sayılır)
const custNotices = () => sortOrders(ORDERS.filter((o) => o.cust === ME && o.custNotice && !o.custNotice.seen));
const noticeCards = () => custNotices().map((o) => `<div class="notice gold" style="margin-bottom:12px">${ic("file")}<span><b>Your final proforma invoice is ready — order ${o.no}.</b> Your order is ready to ship; please review the proforma and complete any remaining payment.</span><button class="btn sm" onclick="go('customer/order/${o.no}')">View</button></div>`).join("");
// Müşteri ana sayfası: “Nasıl sipariş verilir” videosu (portal diline göre)
const howToCard = () => { const vl = ["tr", "en", "es", "de", "ru"].includes(LANG) ? LANG : "en";
  return `<div class="card mt how-card"><div><span class="how-badge">${ic("info")} Video · 0:41</span><h3>How to place an order</h3><p class="muted">Watch the step-by-step guide: find products, add boxes, check your addresses, place your order and download your documents.</p></div>
  <video class="notranslate" controls preload="none" playsinline poster="media/how-to-order-${vl}.jpg" src="media/how-to-order-${vl}.mp4"></video></div>`; };
CUST.dashboard = () => {
  const mine = ORDERS.filter((o) => o.cust === ME);
  const active = mine.find((o) => o.stage < 5);
  return `${head(`Welcome back, ${C(ME).name}`, "", `<button class="btn gold lg" onclick="go('customer/products')">${ic("plus")} CREATE NEW ORDER</button>`)}
  ${noticeCards()}
  <div class="grid g4">${kpi(mine.filter((o) => o.stage < 5).length, "Active Orders", "In progress", "cart")}${kpi(mine.filter((o) => o.stage === 4).length, "Ready for Shipment", "Awaiting pickup", "truck")}${kpi("October", "Next Forecast", "Due in 5 days", "trend")}${kpi(12, "Orders", "Last 12 months", "box")}</div>
  ${active ? `<div class="card mt"><div class="card-h"><h3>Order ${active.no}</h3>${stagePill(active.stage, true)}</div>${stepper(active.stage, STAGES_EN)}
    <div class="between mt wrap"><span class="muted">${money(orderTotal(active), active.currency)} · Payment: ${payState(active)[0]}</span><button class="btn sm" onclick="go('customer/order/${active.no}')">View order ${ic("chevR")}</button></div></div>` : ""}
  ${howToCard()}
  <div class="grid g-main mt"><div class="card"><div class="card-h"><h3>Recent Orders</h3><a class="sub" href="#/customer/orders">All →</a></div>${ordersTable(mine, true)}</div>
  <div class="card flat"><div class="card-h"><h3>Announcements</h3></div><ul class="tl"><li>New: Noir EDP 50 ml range now available to order.<small>22 Sep 2026</small></li><li>Q4 campaign on Hair Styling — see your net prices.<small>15 Sep 2026</small></li><li>Factory closed 29 Oct (national holiday).<small>10 Sep 2026</small></li></ul>
  <div class="notice gold">${ic("trend")}<span>Your October forecast is due. It helps us plan production for you.</span></div></div></div>`;
};

CUST.products = () => `${head("Products / New Order", "")}
  ${actAsBar()}${prodFilterBar("filter", true)}
  <div class="grid g-side">
    <div><div class="pgrid">${PRODUCTS.filter(isActive).map(productCard).join("")}</div><div class="pf-empty muted" id="pfEmpty" style="display:none">No products match your search</div></div>
    <div id="cartPanel">${cartPanel()}</div>
  </div>`;
function productCard(p) {
  const b = state.cart[p.sku] || 0;
  return `<div class="pcard ${b ? "in" : ""}" id="pc-${p.sku}" ${prodAttrs(p)}>
    <div class="ph">${p.img ? `<img src="${imgSrc(p.img)}" alt="" loading="lazy">` : noImg(p)}</div>
    <div class="pb"><div class="pn">${p.name}</div><div class="ps mono">${p.sku} · ${p.brand}</div>
      <div class="pp"><b>${money(custPrice(p), levelCur(levelOf(ME)), 2)}<small> / pcs</small></b><small>${p.pcsBox} pcs / box</small></div>
      <div class="qty"><button onclick="setQty('${p.sku}',${b - 1})">−</button><input value="${b}" inputmode="numeric" onchange="setQty('${p.sku}',this.value)"><span class="u">BOXES</span><button onclick="setQty('${p.sku}',${b + 1})">+</button></div>
    </div></div>`;
}
function clearCart() {
  modal(`<h2>Clear cart</h2><p class="muted">All products will be removed from your current order.</p><div class="m-actions"><button class="btn" onclick="closeModal()">Cancel</button><button class="btn danger" onclick="state.cart={};closeModal();toast('Cart cleared','trash');rerender()">${ic("trash")} Clear cart</button></div>`);
}
function setQty(sku, v) {
  const p = P(sku);
  const n = Math.max(0, parseInt(v) || 0);
  state.cart[sku] = n;
  const card = document.getElementById("pc-" + sku);
  if (card) { const hid = card.style.display; card.outerHTML = productCard(p); document.getElementById("pc-" + sku).style.display = hid; }
  const cp = document.getElementById("cartPanel");
  if (cp) cp.innerHTML = cartPanel();
}
function cartPanel() {
  const items = cartItems(), Q = orderQty(items);
  const total = items.reduce((s, [sku, b]) => s + lineTotal(sku, b), 0);
  return `<div class="card cartp"><div class="card-h"><h3>Current Order</h3><span class="row" style="gap:10px"><span class="sub">${items.length} SKUs</span>${items.length ? `<button class="btn sm ghost" onclick="clearCart()">${ic("trash")} Clear cart</button>` : ""}</span></div>
    <div class="total">${money(total, levelCur(levelOf(ME)), 2)}</div>
    <div class="mt"><div class="stat-row"><span>Boxes</span><b>${num(Q.boxes)}</b></div><div class="stat-row"><span>Pieces</span><b>${num(Q.pcs)}</b></div></div>
    ${items.length ? "" : `<div class="notice info mt">${ic("info")}<span>Add boxes to start your order.</span></div>`}
    <button class="btn primary block lg mt" ${items.length && !actAsMissing() ? "" : "disabled"} onclick="go(state.mode + '/checkout')">REVIEW ORDER ${ic("chevR")}</button>
    ${actAsMissing() ? `<small class="warn-t">Önce müşteri seçin</small>` : ""}
  </div>`;
}

CUST.checkout = () => {
  const items = cartItems(), cur = levelCur(levelOf(ME)), c = C(ME);
  const total = items.reduce((s, [sku, b]) => s + lineTotal(sku, b), 0);
  const pp = state.mode === "admin" ? "admin/neworder" : "customer/products";
  return `${head("Checkout", "", "", `<a href="#/${pp}">Products</a> / Checkout`)}
  ${actAsBar()}
  <div class="grid g-side"><div>
    <div class="card"><div class="card-h"><h3>Order Review</h3><a class="sub" href="#/${pp}">Edit</a></div>
      <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Product</th><th class="c">Boxes</th><th class="r">Pcs</th><th class="r">Unit</th><th class="r">Total</th></tr></thead><tbody>
      ${items.map(([sku, b]) => { const p = P(sku); return `<tr><td><div class="prod-cell">${thumb(p)}<div><b>${p.name}</b><br><small class="mono">${sku}</small></div></div></td><td class="c">${b}</td><td class="r muted">${num(b * p.pcsBox)}</td><td class="r muted">${money(custPrice(p), cur, 2)}</td><td class="r strong">${money(lineTotal(sku, b), cur, 2)}</td></tr>`; }).join("")}
      </tbody></table></div></div>
    <div class="card mt"><div class="form"><div class="field"><label>Billing Address</label><textarea class="input notranslate" id="ckBill" rows="2">${pfEsc(custAddress(c))}</textarea></div>
      <div class="field"><label>Delivery Address</label><textarea class="input notranslate" id="ckAddr" rows="2">${pfEsc(custShip(c))}</textarea><small class="muted">Both addresses come from your registration — edit if needed for this order.</small></div><div class="field"><label>Order Notes</label><textarea class="input" id="ckNote" placeholder="Optional…"></textarea></div></div></div>
  </div>
  <div><div class="card cartp"><div class="card-h"><h3>Order Summary</h3></div>
    <div class="stat-row"><span>Subtotal</span><b>${money(total, cur, 2)}</b></div><div class="stat-row"><span>Shipping term</span><b>EXW Düzce</b></div><div class="stat-row"><span>Payment term</span><b>100% Advance</b></div>
    <div class="between mt"><span style="font:600 16px var(--display)">TOTAL</span><span class="total">${money(total, cur, 2)}</span></div>
    <div class="notice info mt">${ic("info")}<span>A PO number is assigned automatically. You'll receive a proforma invoice after sales review & final approval.</span></div>
    <button class="btn ok block lg mt" ${items.length && !actAsMissing() ? "" : "disabled"} onclick="placeOrder()">PLACE ORDER</button>
  </div></div></div>`;
};
function placeOrder() {
  if (!cartItems().length || actAsMissing()) return;
  const seq = Math.max(148, ...ORDERS.map((o) => +o.no.slice(-4))) + 1, no = "PO-2026-" + String(seq).padStart(4, "0");
  const sess = authSession(), byAdmin = sess?.role === "admin";
  ORDERS.unshift({ no, po: no, cust: ME, date: fmtDate(new Date()), currency: levelCur(levelOf(ME)), created: new Date().toISOString(), stage: 0, paid: 0, problem: false, items: cartItems().map(([s, b]) => [s, b]), note: $("#ckNote")?.value.trim() || "", billAddress: $("#ckBill")?.value.trim() || custAddress(C(ME)), address: $("#ckAddr")?.value.trim() || custShip(C(ME)), by: byAdmin ? sess.name : "" });
  state.logs[no] = [[new Date().toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }).replace(",", ""), byAdmin ? `${sess.name} siparişi ${C(ME).name} adına oluşturdu` : `${C(ME).name} siparişi portaldan oluşturdu`]];
  state.cart = {};
  if (byAdmin) { state.actAs = null; toast(`${no} oluşturuldu · ${C(ME).name}`); go("admin/order/" + no); }
  else { toast(`Order ${no} submitted · your sales rep has been notified`); go("customer/order/" + no); }
}

CUST.orders = () => `${head("My Orders", "", `<button class="btn gold" onclick="go('customer/products')">${ic("plus")} New Order</button>`)}<div class="card">${ordersTable(ORDERS.filter((o) => o.cust === ME), true)}</div>`;
CUST.order = (no) => {
  const o = O(no), L = orderQty(o.items), ps = payState(o), t = orderTotal(o);
  const fresh = state.freshNotice === no;
  return `${head(`Order ${no}`, `${o.date} · ${money(t, o.currency)}${o.po ? ` · ${o.po}` : ""}`, `<button class="btn" onclick="reorder('${no}')">${ic("copy")} Reorder</button>`, `<a href="#/customer/orders">My Orders</a> / ${no}`)}
  ${fresh ? `<div class="notice gold" style="margin-bottom:14px">${ic("file")}<span><b>Your final proforma invoice is ready.</b> You can view and download it under Documents.</span></div>` : ""}
  <div class="card">${stepper(Math.min(o.stage, 5), STAGES_EN)}</div>
  ${o.note || o.po ? `<div class="card note-card mt"><div class="card-h"><h3>${ic("edit")} Your Note</h3>${o.po ? `<span class="pill plain">PO: ${o.po}</span>` : ""}</div>${o.note ? `<p class="notranslate">${o.note.replace(/</g, "&lt;")}</p>` : ""}</div>` : ""}
  <div class="grid g-side mt"><div class="card"><div class="card-h"><h3>Products</h3></div><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Product</th><th class="c">Boxes</th><th class="r">Pcs</th><th class="r">Total</th></tr></thead><tbody>
    ${o.items.map(([sku, b, pr]) => { const p = P(sku); return `<tr><td><div class="prod-cell">${thumb(p)}<div><b>${p.name}</b><br><small class="mono">${sku}</small></div></div></td><td class="c">${b}</td><td class="r muted">${num(b * p.pcsBox)}</td><td class="r strong">${money(lineTotal(sku, b, orderLevel(o), pr), o.currency)}</td></tr>`; }).join("")}
    </tbody></table></div></div>
  <div><div class="card"><div class="card-h"><h3>Summary</h3></div><div class="stat-row"><span>Boxes / pcs</span><b>${num(L.boxes)} / ${num(L.pcs)}</b></div>${(o.adjust || []).map((a) => `<div class="stat-row"><span>${a.amount < 0 ? "Discount" : "Additional charge"}: <span class="notranslate">${pfEsc(a.label)}</span></span><b>${a.amount < 0 ? "−" : "+"}${money(Math.abs(a.amount), o.currency, 2)}</b></div>`).join("")}<div class="stat-row"><span>Payment</span><b><span class="pill ${ps[1]}">${ps[0]}</span></b></div><div class="stat-row"><span>Paid / Balance</span><b>${money(o.paid, o.currency)} / ${money(Math.max(0, t - o.paid), o.currency)}</b></div><div class="stat-row"><span>Incoterm</span><b>EXW Düzce</b></div></div>
  <div class="card mt"><div class="card-h"><h3>Documents</h3></div>${[["pi", "Final Proforma Invoice", o.stage >= 4], ["pl", "Packing List", o.stage >= 4], ["ci", "Commercial Invoice", o.stage >= 5]].map(([k, d, ok]) => `<div class="stat-row"><span style="color:var(--text)">${ic("file")} ${d}</span>${ok ? `<span class="row" style="gap:6px"><button class="btn sm" onclick="openDoc('${o.no}','${k}')">View</button>${k === "pl" ? `<button class="btn sm" onclick="plDownload('${o.no}','xlsx')">XLSX</button><button class="btn sm" onclick="plDownload('${o.no}','csv')">CSV</button>` : ""}</span>` : `<small class="dim">${k === "ci" ? "after shipment" : "when ready to ship"}</small>`}</div>`).join("")}</div></div></div>`;
};
function reorder(no) {
  const o = O(no);
  state.cart = {};
  const missing = [];
  const off = o.items.filter(([s]) => !isActive(P(s)));
  o.items.forEach(([s, b]) => { if (isActive(P(s))) state.cart[s] = b; });
  toast(off.length ? `Copied · ${off.length} discontinued product(s) skipped` : "Order copied with current prices", off.length ? "alert" : "copy");
  go("customer/products");
}
ADMIN.neworder = () => CUST.products();
ADMIN.checkout = () => CUST.checkout();
CUST.contact = () => {
  const c = C(ME), key = (c.sales || "").split(" ")[0], rep = ACCOUNTS.find((a) => a.name.split(" ")[0] === key), r = CONTACT.reps[key] || {};
  const row = (i, l, v, href) => `<div class="stat-row"><span>${ic(i)} ${l}</span>${href ? `<a class="strong notranslate" href="${href}">${v}</a>` : `<b class="notranslate">${v}</b>`}</div>`;
  return `${head("Contact", "")}
  <div class="grid g2">
    <div class="card"><div class="card-h"><h3>Your sales representative</h3></div>
      ${c.sales ? `<div class="contact-rep"><div class="avatar">${c.sales.split(" ").map((w) => w[0]).join("").slice(0, 2)}</div><div><b>${rep?.name || c.sales}</b><small class="muted">${rep?.title || "Sales"}</small></div></div>
      ${row("mail", "E-mail", r.email || CONTACT.email, `mailto:${r.email || CONTACT.email}`)}${r.phone ? row("phone", "Phone / WhatsApp", r.phone, `https://wa.me/${r.phone.replace(/\D/g, "")}`) : ""}`
      : `<p class="muted">A sales representative will be assigned to your account shortly. Meanwhile, please use the contact details on the right.</p>`}
    </div>
    <div class="card"><div class="card-h"><h3>${CONTACT.company}</h3></div>
      ${row("mail", "E-mail", CONTACT.email, `mailto:${CONTACT.email}`)}${row("phone", "Phone", CONTACT.phone, CONTACT.phone.startsWith("[") ? "" : `tel:${CONTACT.phone.replace(/\s/g, "")}`)}${row("home", "Address", CONTACT.address)}${row("clock", "Working hours", CONTACT.hours)}
    </div>
  </div>`;
};
CUST.forecast = () => `${head("Forecast", "", `<button class="btn" onclick="toast('September forecast copied','copy')">${ic("copy")} Copy previous month</button><button class="btn" onclick="toast('Last order copied into forecast','copy')">${ic("copy")} Copy last order</button><button class="btn gold" onclick="toast('October forecast submitted · thank you!')">Submit Forecast</button>`)}
  <div class="grid g-side"><div class="card"><div class="card-h"><h3>October 2026</h3></div><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Product</th><th class="c">Boxes</th><th class="r">Pcs</th><th class="r">Est. value</th></tr></thead><tbody>
    ${[["BC-400-2", 60], ["BW-20-SKL", 40], ["BW-150-MAT-1018", 50], ["BSG-1000-77", 30], ["BNS-W", 25]].map(([s, b]) => { const p = P(s); return `<tr><td><div class="prod-cell">${thumb(p)}<div><b>${p.name}</b><br><small class="mono">${s}</small></div></div></td><td class="c"><input class="input" style="width:80px;height:34px;text-align:center" value="${b}"></td><td class="r muted">${num(b * p.pcsBox)}</td><td class="r strong">${money(lineTotal(s, b))}</td></tr>`; }).join("")}
    </tbody></table></div><button class="btn sm mt">${ic("plus")} Add product</button></div>
  <div class="card flat"><div class="form"><div class="field"><label>Month</label><select class="input"><option>October 2026</option><option>November 2026</option></select></div><div class="field"><label>Expected order date</label><input class="input" type="date" value="2026-10-20"></div><div class="field"><label>Estimated budget (USD)</label><input class="input" value="25,000"></div><div class="field"><label>Confidence</label><select class="input"><option>High</option><option>Medium</option><option>Low</option></select></div></div></div></div>`;
CUST.documents = () => `${head("Document Center", "", `<button class="btn gold" onclick="toast('All available documents are being zipped','download')">${ic("download")} Download All</button>`)}<div class="card">${docsTable(true, C(ME))}</div>`;
CUST.marketing = () => `${head("Marketing Hub", "", `<button class="btn gold" onclick="toast('Brand kit downloading','download')">${ic("download")} Brand Kit</button>`)}${mkChips(true)}${assetGrid()}`;
CUST.account = () => { const c = C(ME), v = (x) => (x && x !== "—" ? pfEsc(x) : '<span class="dim">—</span>'); return `${head("Account", c.name, `<button class="btn gold" onclick="editAccount()">${ic("edit")} Edit details</button>`)}
  <div class="grid g2"><div class="card"><div class="card-h"><h3>Company</h3></div><dl class="dl notranslate"><dt>Company</dt><dd>${v(c.name)}</dd><dt>Country / City</dt><dd>${c.flag || ""} ${v(c.country)} · ${v(c.city)}</dd><dt>Billing address</dt><dd>${v(c.address)}</dd><dt>Delivery address</dt><dd>${v(c.shipAddress || c.address)}</dd><dt>VAT</dt><dd class="mono">${v(c.vat)}</dd><dt>Website</dt><dd>${v(c.website)}</dd><dt>Instagram</dt><dd>${v(c.instagram)}</dd></dl>
    <div class="card-h mt"><h3>Contact person</h3></div><dl class="dl notranslate"><dt>Name</dt><dd>${v(c.contact)}</dd><dt>Position</dt><dd>${v(c.position)}</dd><dt>E-mail</dt><dd>${v(c.email)}</dd><dt>Phone / WhatsApp</dt><dd>${v(c.phone)}</dd></dl></div>
  <div class="card"><div class="card-h"><h3>Commercial terms</h3></div><dl class="dl"><dt>Payment term</dt><dd>${v(c.payment)}</dd><dt>Shipping term</dt><dd>${v(c.incoterm)}</dd><dt>Your sales rep</dt><dd>${v(c.sales)}</dd></dl>
  <div class="notice info mt">${ic("info")}<span>Your billing and delivery addresses are filled in automatically on your next order. You can still change them at checkout.</span></div>
  <div class="card-h mt"><h3>Legal</h3></div>${["kvkk", "privacy", "consent", "cookies", "terms"].map((k) => `<div class="stat-row notranslate"><a class="strong" onclick="legalOpen('${k}')">${LEGAL[k].title[LANG === "tr" ? "tr" : "en"]}</a><span class="muted">v${LEGAL_VERSION}</span></div>`).join("")}</div></div>`; };
const ACCT_FIELDS = [["name", "Company name", 1], ["country", "Country", 1], ["city", "City", 1], ["address", "Billing address", 1, "span2"], ["shipAddress", "Delivery address", 1, "span2"], ["vat", "Tax / VAT number", 1], ["website", "Website"], ["instagram", "Instagram"], ["contact", "Contact name", 1], ["position", "Position"], ["phone", "WhatsApp / Phone"]];
function editAccount() {
  const c = C(ME);
  modal(`<h2>Edit details</h2><div class="form cols2">${ACCT_FIELDS.map(([k, l, req, cls]) => `<div class="field ${cls || ""}"><label>${l}${req ? " *" : ""}</label>${/address/i.test(k) ? `<textarea class="input" id="ac_${k}" rows="2">${pfEsc(c[k] && c[k] !== "—" ? c[k] : "")}</textarea>` : `<input class="input" id="ac_${k}" value="${pfEsc(c[k] && c[k] !== "—" ? c[k] : "")}">`}</div>`).join("")}</div>
  <p class="muted" style="font-size:12.5px">E-mail (your login) can be changed by your sales representative.</p><p class="err-t" id="acErr" style="font-size:13px"></p>
  <div class="m-actions"><button class="btn" onclick="closeModal()">Cancel</button><button class="btn gold" onclick="saveAccount()">Save</button></div>`);
}
function saveAccount() {
  const c = C(ME), val = Object.fromEntries(ACCT_FIELDS.map(([k]) => [k, $("#ac_" + k).value.trim()]));
  const miss = ACCT_FIELDS.filter(([k, , req]) => req && !val[k]);
  if (miss.length) return ($("#acErr").textContent = "Please fill: " + miss.map(([, l]) => l).join(", "));
  const changed = ACCT_FIELDS.filter(([k]) => (c[k] || "") !== val[k]).map(([, l]) => l);
  Object.assign(c, val, { updated: fmtDate(new Date()) });
  closeModal(); toast(changed.length ? "Details saved" : "No changes"); rerender();
}

// ═════════════════════════════ FABRİKA ═════════════════════════════
// Hazırlık tamamlandı → Sevke Hazır (fabrika ekranı yok; admin sipariş detayından işaretlenir)
function finishPrep(no) {
  const o = O(no); o.stage = 4; o.problem = false; o.shipped = Object.fromEntries(o.items);
  o.custNotice = { type: "pi", at: fmtDate(new Date()), seen: false };
  log(no, "Hazırlık tamamlandı · sevke hazır · müşteriye final proforma bildirimi gönderildi");
  toast("Sevke hazır · müşteri final proformayı görebilir, bildirim gönderildi"); rerender();
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

// ——— ürün listelerinde anlık filtre: yazdıkça süzülür, ekran yeniden çizilmez (odak kaybolmaz) ———
const pfEsc = (t) => String(t).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const prodAttrs = (p) => `data-pq="${pfEsc(prodText(p))}" data-brand="${pfEsc(p.brand)}" data-cat="${pfEsc(p.cat)}" data-act="${isActive(p) ? "on" : "off"}"`;
function prodFilterBar(key, en) {
  const f = state[key], brands = [...new Set(PRODUCTS.map((p) => p.brand))], cats = [...new Set(PRODUCTS.map((p) => p.cat))].sort();
  const opt = (v, l, cur) => `<option value="${pfEsc(v)}" ${cur === v ? "selected" : ""}>${l}</option>`;
  const set = (k) => `state.${key}.${k}=this.value;prodFilter()`;
  return `<div class="filters pf" id="pf" data-key="${key}" data-en="${en ? 1 : ""}">
    <div class="search pf-q"><span>${ic("search")}</span><input type="search" value="${pfEsc(f.q)}" placeholder="${en ? "Search product name, SKU or barcode…" : "Ürün adı, SKU veya barkod ara…"}" oninput="${set("q")}"></div>
    <select onchange="${set("brand")}">${opt("all", en ? "All brands" : "Tüm markalar", f.brand)}${brands.map((b) => opt(b, b, f.brand)).join("")}</select>
    <select onchange="${set("cat")}">${opt("all", en ? "All categories" : "Tüm kategoriler", f.cat)}${cats.map((c) => opt(c, en ? c : CAT_TR[c] || c, f.cat)).join("")}</select>
    ${en ? "" : `<select onchange="${set("act")}">${opt("all", "Tüm durumlar", f.act || "all")}${opt("on", "Aktif", f.act)}${opt("off", "Pasif", f.act)}</select>`}
    <span class="pf-n muted" id="pfN"></span>
  </div>`;
}
function prodFilter() {
  const bar = $("#pf"); if (!bar) return;
  const f = state[bar.dataset.key], en = !!bar.dataset.en, items = [...document.querySelectorAll("#view [data-pq]")];
  let n = 0;
  items.forEach((el) => {
    const hit = (f.brand === "all" || el.dataset.brand === f.brand) && (f.cat === "all" || el.dataset.cat === f.cat) && (!f.act || f.act === "all" || el.dataset.act === f.act) && (!f.q.trim() || srchHit(el.dataset.pq, f.q));
    el.style.display = hit ? "" : "none"; n += hit;
  });
  $("#pfN").textContent = en ? `${n} / ${items.length} products` : `${n} / ${items.length} ürün`;
  const empty = $("#pfEmpty"); if (empty) empty.style.display = n ? "none" : "";
}
let srchIdx = 0;
function srchResults(q) {
  const mode = state.mode, out = [];
  PRODUCTS.filter((p) => (mode === "admin" || isActive(p)) && srchHit(prodText(p), q)).slice(0, 6).forEach((p) => out.push({ g: "Ürünler", html: `${thumb(p)}<div><b>${p.name}</b><small class="mono">${p.sku} · ${p.cat}</small></div>`, go: mode === "admin" ? `admin/product/${p.sku}` : mode === "customer" ? "customer/products" : null, q: p.sku }));
  if (mode === "admin") CUSTOMERS.filter((c) => srchHit(`${c.name} ${c.country} ${c.city} ${c.id} ${c.contact}`, q)).slice(0, 4).forEach((c) => out.push({ g: "Müşteriler", html: `<span class="srch-ic">${c.flag}</span><div><b>${c.name}</b><small>${c.country} · ${c.id}</small></div>`, go: `admin/${c.status === "Pending" ? "application" : "customer"}/${c.id}` }));
  ORDERS.filter((o) => (mode !== "customer" || o.cust === ME) && srchHit(`${o.no} ${C(o.cust).name} ${o.items.map(([s]) => s).join(" ")}`, q)).slice(0, 4).forEach((o) =>
    out.push({ g: "Siparişler", html: `<span class="srch-ic">${ic("cart")}</span><div><b class="mono">${o.no}</b><small>${C(o.cust).name} · ${STAGES[o.stage]}</small></div>`, go: `${mode}/order/${o.no}` }));
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
$("#logoutBtn").innerHTML = ic("logout") + "<span>Çıkış yap</span>";
$("#logoutBtn").onclick = authLogout;
STORE.ready = storeInit().then(() => { if (authSession()) rerender(); });
srchMount();
$("#collapse").onclick = () => { $("#app").classList.toggle("mini"); $("#collapse").innerHTML = ic($("#app").classList.contains("mini") ? "chevR" : "chevL"); };
$("#burger").onclick = () => $("#app").classList.toggle("nav-open");
$("#notifBtn").onclick = () => go("admin/notifications");
document.querySelectorAll("#modeSwitch button").forEach((b) => (b.onclick = () => go(b.dataset.mode + "/dashboard")));
$("#modal").onclick = (e) => { if (e.target.id === "modal") closeModal(); };
window.addEventListener("hashchange", render);
render();
setTimeout(() => { try { cookieNotice(); } catch (e) { console.warn(e); } });
