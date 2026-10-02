// Çok dil — ekrandaki metinleri I18N sözlüğünden (i18n-dict.js) çevirir.
// Metin önce anahtara çevrilir: rakamlar, kodlar ve müşteri/ürün/kişi adları "#" olur, çeviride aynı sırayla geri konur.

const LANGS = [["tr", "Türkçe"], ["en", "English"], ["es", "Español"], ["de", "Deutsch"], ["ru", "Русский"]];
let LANG = (() => { try { return localStorage.getItem("mbLang") || "tr"; } catch { return "tr"; } })();

const I18N_SEP = /( · | — )/;
const I18N_SKIP = "script,style,textarea,.notranslate";
const i18nOrig = new WeakMap();   // metin düğümü → orijinal metin
const i18nLast = new WeakMap();   // metin düğümü → son yazdığımız çeviri
const i18nEsc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const I18N_RX = new RegExp([
  ...[...CUSTOMERS.map((c) => c.name), ...PRODUCTS.map((p) => p.name), "Volkan Koçkan", "Ferhat", "Gözde", "John Smith", "Lena Fischer", "Erik Lindqvist", "Tomas Kazlauskas", "Mike Alvarez", "Omar Haddad", "Andrei Popescu", "Faisal Al-Qahtani", "Aidar Nurlan", "Claire Martin"].sort((a, b) => b.length - a.length).map(i18nEsc),
  "SO-\\d{4}-\\d{4}", "PI-\\d{4}-\\d{4}", "[A-Z]{2,3}-\\d{2,4}(?:-\\d{2})?", "[A-Z]{2}-[A-Z]{3}", "[\\u{1F1E6}-\\u{1F1FF}]{2}", "\\d[\\d.,]*",
].join("|"), "gu");

function i18nKey(seg) { const vals = []; const key = seg.replace(I18N_RX, (m) => (vals.push(m), "#")); return { key, vals }; }
function i18nSeg(seg) {
  const t = seg.trim();
  if (!t) return seg;
  const { key, vals } = i18nKey(t);
  const out = I18N[key]?.[LANG];
  if (out == null) return seg;
  let i = 0;
  return seg.replace(t, out.replace(/#/g, () => vals[i++] ?? "#"));
}
function i18nText(s) { return s.split(I18N_SEP).map((p, i) => (i % 2 ? p : i18nSeg(p))).join(""); }

function i18nNode(n) {
  if (i18nLast.get(n) !== n.nodeValue) i18nOrig.set(n, n.nodeValue);   // uygulama metni değiştirdiyse yeni orijinal
  const t = i18nText(i18nOrig.get(n));
  if (t !== n.nodeValue) n.nodeValue = t;
  i18nLast.set(n, t);
}
function i18nTree(root) {
  if (root.nodeType === 3) { if (!root.parentElement?.closest(I18N_SKIP)) i18nNode(root); return; }
  if (root.nodeType !== 1 || root.closest(I18N_SKIP)) return;
  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode: (n) => (n.parentElement.closest(I18N_SKIP) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT) });
  let n; while ((n = w.nextNode())) i18nNode(n);
  const ph = root.matches("[placeholder]") ? [root, ...root.querySelectorAll("[placeholder]")] : root.querySelectorAll("[placeholder]");
  ph.forEach((el) => { el.dataset.i18nPh ??= el.placeholder; el.placeholder = i18nText(el.dataset.i18nPh); });
}

// Ekrana eklenen her şey çevrilir (render, pencere, bildirim…)
const i18nObs = new MutationObserver((muts) => {
  i18nObs.disconnect();
  for (const m of muts) {
    if (m.type === "characterData") i18nTree(m.target);
    else m.addedNodes.forEach(i18nTree);
  }
  i18nWatch();
});
function i18nWatch() { i18nObs.observe(document.body, { childList: true, subtree: true, characterData: true }); }

function setLang(l) {
  LANG = l;
  try { localStorage.setItem("mbLang", l); } catch {}
  document.documentElement.lang = l;
  i18nObs.disconnect();
  if (typeof rerender === "function" && document.querySelector("#view .notranslate")) rerender();   // dil biçimli tarihler yeniden çizilsin
  i18nTree(document.body);
  i18nMenu();
  i18nWatch();
}
function i18nMenu() {
  const box = $("#langBox");
  if (!box) return;
  box.innerHTML = `<button class="lang-btn" onclick="this.parentNode.classList.toggle('open')">${ic("globe")}<b>${LANG.toUpperCase()}</b></button>
    <div class="lang-menu">${LANGS.map(([k, l]) => `<button class="${k === LANG ? "on" : ""}" onclick="this.closest('#langBox').classList.remove('open');setLang('${k}')"><b>${k.toUpperCase()}</b>${l}</button>`).join("")}</div>`;
}
document.addEventListener("click", (e) => { if (!e.target.closest("#langBox")) $("#langBox")?.classList.remove("open"); });

i18nMenu();
setLang(LANG);
