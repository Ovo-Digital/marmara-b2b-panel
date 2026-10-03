// Revize Modu — müşteri ekranı gezerken öğelere tıklayıp not bırakır; notlar /api/feedback ile GitHub issue olur.

const RV_KEY = "mbRevize.v2";
const RV_ACTIONS = [["kalsin", "Kalsın"], ["kaldir", "Kaldırılsın"], ["degistir", "Değiştirilsin"], ["ekle", "Buraya eklensin"]];
const RV_PROMISE = "Volkan Koçkan ile halısaha maçı için bir daha dalga geçmeyeceğime söz veriyorum.";
const RV_QUESTIONS = [
  "20' ve 40' konteynerin gerçek yükleme kapasitesi nedir? (m³, kg, kaç palet) Konteyner kaç %'de 'tamam' sayılsın?",
  "Hangi ürünler paletsiz (loose) yüklenebilir? Dik durması, üst üste konmaması gereken ürünler hangileri?",
  "Stok bilgisi bugün nereden geliyor? (Drive dosyası / ERP) Ne sıklıkla güncelleniyor? Örnek dosya gönderebilir misiniz?",
  "Müşteri siparişi verdiği an stok geçici olarak ayrılsın mı, yoksa sadece final onayda mı?",
  "Proforma, Packing List ve Commercial Invoice için kullandığınız şablonları gönderebilir misiniz? Olmazsa olmaz alanlar neler?",
  "Yönetimin her ay / çeyrek görmek istediği rapor ve rakamlar neler?",
  "Hangi bildirim kime ve hangi kanaldan gitsin? (mail, WhatsApp, panel)",
  "Panelde kimler çalışacak? İsim ve görev olarak yazar mısınız?",
  "Panelde hiç olmayan ama olması gereken bir bölüm var mı?",
];
const RV_PICK = [".btn", ".chip", ".seg", ".qty", ".field", ".stat-row", ".tbl thead", ".tbl tbody tr", ".pcard", ".asset", ".kpi", ".pipe-col", ".act li", ".sugg", ".step", ".pv", ".container-vis", ".tabs", ".filters", ".legend", ".chart", ".notice", ".card-h", ".card", ".page-head"].join(",");
const RV_PICK_IN = "#view " + RV_PICK.split(",").join(",#view ");
const RV_MAX_IMGS = 3;
// Vercel dışında (lokal dosya vb.) açıldıysa gönderim canlı sunucuya gider
const RV_API = /vercel\.app$/.test(location.hostname) ? "" : "https://marmara-b2b-panel.vercel.app/";

let rv = rvLoad();
let rvOn = false;
let rvTab = "screen";
let rvHover = null;
let rvDraft = { imgs: [] };   // açık not penceresindeki görseller
let rvGuideStep = 0;

function rvLoad() {
  try { return JSON.parse(localStorage.getItem(RV_KEY)) || rvEmpty(); } catch { return rvEmpty(); }
}
function rvEmpty() { return { reviewer: null, items: [], screens: {}, answers: {}, sent: [] }; }
function rvSave() {
  try { localStorage.setItem(RV_KEY, JSON.stringify(rv)); return true; }
  catch { toast("Tarayıcı hafızası doldu — birkaç görseli silip tekrar deneyin", "alert"); return false; }
}
const rvEsc = (s = "") => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const rvModeName = { admin: "Admin", customer: "Müşteri", factory: "Fabrika" };

// Ekran listesi menüden gelir: mod/sayfa
function rvScreens() {
  const out = [];
  for (const [mode, list] of Object.entries(NAV)) for (const n of list) if (n.length > 1 && n[0] !== "register") out.push({ route: `${mode}/${n[0]}`, label: `${rvModeName[mode]} › ${n[1]}` });
  return out;
}
function rvRoute() {
  const { mode, page, arg } = parse();
  const base = `${mode}/${page}`;
  const known = rvScreens().find((s) => s.route === base);
  const h1 = document.querySelector("#view h1")?.textContent.trim() || page;
  return { base, full: `${base}${arg ? "/" + arg : ""}`, label: known ? known.label + (arg ? ` · ${h1}` : "") : `${rvModeName[mode]} › ${h1}` };
}
function rvPending() { return rv.items.filter((i) => !rv.sent.includes(i.id)); }
function rvScreenDone(route) { const s = rv.screens[route]; return !!(s && (s.need || s.missing || s.imgs?.length)) || rv.items.some((i) => i.route.startsWith(route)); }

// ——— görseller: küçült, JPEG'e çevir ———
function rvReadImages(files, onEach) {
  [...files].filter((f) => f.type.startsWith("image/")).forEach((f) => {
    const url = URL.createObjectURL(f), img = new Image();
    img.onload = () => {
      const s = Math.min(1, 1400 / Math.max(img.width, img.height));
      const c = document.createElement("canvas");
      c.width = Math.round(img.width * s); c.height = Math.round(img.height * s);
      const g = c.getContext("2d"); g.fillStyle = "#fff"; g.fillRect(0, 0, c.width, c.height); g.drawImage(img, 0, 0, c.width, c.height);
      onEach({ data: c.toDataURL("image/jpeg", 0.8) });
      URL.revokeObjectURL(url);
    };
    img.src = url;
  });
}
const rvThumbs = (list, removeFn) => `<div class="rv-thumbs">${list.map((x, i) => `<div class="rv-thumb"><img src="${x.data || x.url}"><button onclick="${removeFn}(${i})">${ic("x")}</button></div>`).join("")}</div>`;
const rvImgPicker = (inputFn, count) => count >= RV_MAX_IMGS ? "" : `<label class="rv-addimg">${ic("image")} Görsel ekle<input type="file" accept="image/*" multiple hidden onchange="${inputFn}(this.files);this.value=''"></label><span class="rv-paste">veya ekran görüntüsünü yapıştırın (⌘V)</span>`;

// ——— arayüz ———
function rvMount() {
  document.body.insertAdjacentHTML("beforeend", `
    <button id="rvFab" class="rv-fab" onclick="rvToggle()"></button>
    <div id="rvBanner" class="rv-banner"><span class="rv-pulse"></span>Revize Modu açık — işaretlemek istediğiniz yere tıklayın</div>
    <aside id="rvDrawer" class="rv-drawer"></aside>
    <div id="rvPop" class="rv-pop"></div>`);
  rvFab();
  document.addEventListener("mouseover", rvOver, true);
  document.addEventListener("click", rvClick, true);
  document.addEventListener("paste", rvPaste);
  window.addEventListener("hashchange", () => setTimeout(() => rvOn && rvDrawer(), 0));
}
function rvFab() {
  const n = rvPending().length;
  $("#rvFab").innerHTML = rvOn ? `${ic("x")} Revizeyi kapat` : `${ic("edit")} Revize Modu${n ? `<em>${n}</em>` : ""}`;
  $("#rvFab").classList.toggle("on", rvOn);
  $("#rvFab").classList.toggle("fresh", !rv.reviewer);
}
function rvToggle() {
  if (!rv.reviewer) return rvWho();
  rvOn = !rvOn;
  document.body.classList.toggle("rv-on", rvOn);
  if (!rvOn) rvClearHover();
  rvFab(); rvDrawer();
}
function rvWho() {
  const r = rv.reviewer || {};
  $("#rvPop").innerHTML = `<div class="rv-card"><div class="rv-card-top">${ic("edit")} Revize Modu</div>
    <h2>Önce sizi tanıyalım</h2>
    <div class="form"><div class="field"><label>Ad Soyad</label><input class="input" id="rvName" value="${rvEsc(r.name || "")}" placeholder="Örn. Ayşe Yılmaz" oninput="rvWhoCheck()"></div>
    <div class="field"><label>Rolünüz</label><input class="input" id="rvRole" value="${rvEsc(r.role || "")}" placeholder="Örn. İhracat Satış Sorumlusu" oninput="rvWhoCheck()"></div>
    <label class="rv-promise"><input type="checkbox" id="rvPromise" ${r.promise ? "checked" : ""} onchange="rvWhoCheck()"><span>${RV_PROMISE}</span></label></div>
    <div class="m-actions"><button class="btn" onclick="rvClose()">Vazgeç</button><button class="btn primary" id="rvWhoBtn" onclick="rvSetWho()" disabled>Devam</button></div></div>`;
  $("#rvPop").classList.add("on");
  rvWhoCheck();
  setTimeout(() => $("#rvName")?.focus(), 50);
}
function rvWhoCheck() { $("#rvWhoBtn").disabled = !($("#rvName").value.trim() && $("#rvRole").value.trim() && $("#rvPromise").checked); }
function rvSetWho() {
  const first = !rv.reviewer;
  rv.reviewer = { name: $("#rvName").value.trim(), role: $("#rvRole").value.trim(), promise: true };
  rvSave(); rvClose(); rvFab();
  if (first) rvGuide(0); else rvDrawer();
}
function rvClose() { $("#rvPop").classList.remove("on"); $("#rvPop").innerHTML = ""; rvClearHover(); }

// ——— rehber ———
const RV_GUIDE = [
  ["Bir yere tıklayın", "Revize Modu açıkken ekrandaki kutular, butonlar ve tablo satırları üzerine gelince sarı çerçeveyle işaretlenir. Hakkında konuşmak istediğiniz yere tıklayın.",
    `<div class="rv-demo"><div class="rv-demo-kpi rv-hl"><b>$428,650</b><small>Bu ay satış</small></div><div class="rv-demo-kpi"><b>31</b><small>Sipariş</small></div><span class="rv-demo-cursor">${ic("edit")}</span></div>`],
  ["Ne olmasını istediğinizi seçin", "Dört seçenekten birini seçin ve kısa bir not yazın. İsterseniz örnek bir görsel de ekleyin.",
    `<div class="rv-demo col"><div class="rv-actions">${RV_ACTIONS.map(([k, l], i) => `<button class="rv-act ${k} ${i === 2 ? "on" : ""}">${l}</button>`).join("")}</div><div class="rv-demo-note">Tahsilat yerine açık bakiye görünsün</div></div>`],
  ["Her ekranı değerlendirin", "Sağdaki panelde bu ekrana ihtiyacınız olup olmadığını ve eksik olanları yazın. Eksik kısmına görsel de ekleyebilirsiniz.",
    `<div class="rv-demo col"><div class="seg"><button class="on">Evet</button><button>Hayır</button><button>Emin değilim</button></div><div class="rv-demo-note">Siparişlerde kargo takip numarası da olsun</div><div class="rv-thumbs"><div class="rv-thumb demo">${ic("image")}</div><div class="rv-thumb demo">${ic("image")}</div></div></div>`],
  ["Soruları cevaplayıp gönderin", "Tüm ekranları gezin, Sorular sekmesini doldurun ve en altta Gönder'e basın. Yarım bırakırsanız notlarınız kaybolmaz, sonra devam edebilirsiniz.",
    `<div class="rv-demo col"><div class="between"><small class="muted">Ekranlar</small><b>8 / 25</b></div><div class="bar"><i style="width:32%"></i></div><button class="btn primary block">Gönder (6 not)</button></div>`],
];
function rvGuide(step) {
  rvGuideStep = step;
  const [t, d, demo] = RV_GUIDE[step], last = step === RV_GUIDE.length - 1;
  $("#rvPop").innerHTML = `<div class="rv-card rv-guide"><div class="rv-card-top">${ic("info")} Nasıl çalışır? · ${step + 1} / ${RV_GUIDE.length}</div>
    ${demo}<h2>${t}</h2><p class="muted">${d}</p>
    <div class="rv-dots">${RV_GUIDE.map((_, i) => `<i class="${i === step ? "on" : ""}" onclick="rvGuide(${i})"></i>`).join("")}</div>
    <div class="m-actions">${step ? `<button class="btn" onclick="rvGuide(${step - 1})">Geri</button>` : `<button class="btn" onclick="rvGuideEnd()">Atla</button>`}<button class="btn primary" onclick="${last ? "rvGuideEnd()" : `rvGuide(${step + 1})`}">${last ? "Başlayalım" : "İleri"}</button></div></div>`;
  $("#rvPop").classList.add("on");
}
function rvGuideEnd() { rvClose(); if (!rvOn) rvToggle(); }

// ——— öğe seçme ———
function rvOver(e) {
  if (!rvOn || $("#rvPop").classList.contains("on")) return;
  const el = e.target.closest?.(RV_PICK_IN);
  if (el === rvHover) return;
  rvClearHover();
  if (el) { rvHover = el; el.classList.add("rv-hl"); }
}
function rvClearHover() { document.querySelectorAll("#view .rv-hl").forEach((x) => x.classList.remove("rv-hl")); rvHover = null; }
function rvClick(e) {
  if (!rvOn) return;
  if (e.target.closest("#rvDrawer,#rvPop,#rvFab,.side,.top,#modal,.toasts")) return;
  const el = e.target.closest(RV_PICK_IN);
  if (!el) return;
  e.preventDefault(); e.stopPropagation();
  rvPick(el);
}
function rvDescribe(el) {
  const kind = [[".btn", "Buton"], [".chip,.seg,.filters", "Filtre"], [".qty", "Adet seçici"], [".field", "Form alanı"], [".stat-row", "Bilgi satırı"], ["tr", "Tablo satırı"], ["thead", "Tablo başlığı"], [".pcard", "Ürün kartı"], [".asset", "İçerik kartı"], [".kpi", "Özet kutusu"], [".pipe-col", "Sipariş hattı"], ["li", "Liste satırı"], [".sugg", "Öneri"], [".step", "Adım"], [".pv", "Palet"], [".container-vis", "Konteyner görseli"], [".tabs", "Sekmeler"], [".legend", "Açıklama"], [".chart", "Grafik"], [".notice", "Uyarı"], [".card-h", "Kart başlığı"], [".card", "Kart"], [".page-head", "Sayfa başlığı"]].find(([s]) => el.matches(s))?.[1] || "Öğe";
  const card = el.closest(".card,.pcard,.asset");
  const cardTitle = (card?.querySelector("h3")?.textContent || card?.querySelector(".pn,.lbl,b")?.textContent || "").trim().replace(/\s+/g, " ");
  const text = (el.querySelector?.("label")?.textContent || el.innerText || "").trim().replace(/\s+/g, " ").slice(0, 90);
  const path = []; let n = el;
  while (n && n.id !== "view" && path.length < 6) { const cls = [...n.classList].filter((c) => !c.startsWith("rv-")).slice(0, 2).join("."); path.unshift(n.tagName.toLowerCase() + (cls ? "." + cls : "")); n = n.parentElement; }
  return { kind, card: el === card ? "" : cardTitle, text: el === card || el.matches(".card-h") ? cardTitle || text : text, selector: path.join(" > ") };
}

// ——— not penceresi ———
function rvPick(el, editId) {
  const cur = editId ? rv.items.find((i) => i.id === editId) : { action: "degistir", prio: "normal", note: "", imgs: [], target: rvDescribe(el) };
  rvDraft = { editId, target: cur.target, action: cur.action, prio: cur.prio, note: cur.note, imgs: [...(cur.imgs || [])] };
  rvClearHover();
  if (el) el.classList.add("rv-hl");
  rvPickRender();
  setTimeout(() => $("#rvNote")?.focus(), 50);
}
function rvPickRender() {
  const d = rvDraft, t = d.target;
  $("#rvPop").innerHTML = `<div class="rv-card"><div class="rv-card-top">${ic("edit")} ${rvEsc(t.kind)}</div>
    <div class="rv-target">${rvEsc(t.card ? t.card + (t.text && t.text !== t.card ? " — " + t.text : "") : t.text)}</div>
    <div class="rv-actions">${RV_ACTIONS.map(([k, l]) => `<button class="rv-act ${k} ${d.action === k ? "on" : ""}" onclick="rvDraft.action='${k}';rvKeepNote();rvPickRender()">${l}</button>`).join("")}</div>
    <div class="field mt"><label>Not</label><textarea class="input" id="rvNote" placeholder="Örn: burada müşterinin telefonu da görünsün">${rvEsc(d.note)}</textarea></div>
    <div class="field mt"><label>Görsel (isteğe bağlı)</label>${rvThumbs(d.imgs, "rvDraftDel")}<div class="row wrap">${rvImgPicker("rvDraftAdd", d.imgs.length)}</div></div>
    <div class="field mt"><label>Öncelik</label><div class="seg"><button class="${d.prio !== "high" ? "on" : ""}" onclick="rvDraft.prio='normal';rvKeepNote();rvPickRender()">Olsa iyi olur</button><button class="${d.prio === "high" ? "on" : ""}" onclick="rvDraft.prio='high';rvKeepNote();rvPickRender()">Olmazsa olmaz</button></div></div>
    <div class="m-actions">${d.editId ? `<button class="btn danger" onclick="rvDelete('${d.editId}');rvClose()">Sil</button>` : ""}<button class="btn" onclick="rvClose()">Vazgeç</button><button class="btn primary" onclick="rvStore()">Kaydet</button></div></div>`;
  $("#rvPop").classList.add("on");
}
function rvKeepNote() { const n = $("#rvNote"); if (n) rvDraft.note = n.value; }
function rvDraftAdd(files) { rvKeepNote(); rvReadImages([...files].slice(0, RV_MAX_IMGS - rvDraft.imgs.length), (img) => { if (rvDraft.imgs.length < RV_MAX_IMGS) { rvDraft.imgs.push(img); rvPickRender(); } }); }
function rvDraftDel(i) { rvKeepNote(); rvDraft.imgs.splice(i, 1); rvPickRender(); }
function rvStore() {
  rvKeepNote();
  const d = rvDraft, note = d.note.trim();
  if (d.action !== "kalsin" && !note && !d.imgs.length) { toast("Ne olmasını istediğinizi kısaca yazın", "alert"); $("#rvNote").focus(); return; }
  if (d.editId) Object.assign(rv.items.find((i) => i.id === d.editId), { action: d.action, note, prio: d.prio, imgs: d.imgs });
  else { const r = rvRoute(); rv.items.push({ id: Date.now().toString(36), route: r.full, screenLabel: r.label, target: d.target, action: d.action, note, prio: d.prio, imgs: d.imgs, ts: new Date().toISOString() }); }
  if (d.editId) rv.sent = rv.sent.filter((x) => x !== d.editId);
  if (!rvSave()) return;
  rvClose(); rvFab(); rvDrawer();
  toast("Not kaydedildi");
}
function rvDelete(id) { rv.items = rv.items.filter((i) => i.id !== id); rvSave(); rvFab(); rvDrawer(); }

// Ekran görüntüsü yapıştırma: açık not penceresi varsa ona, yoksa "eksik" alanına
function rvPaste(e) {
  if (!rvOn) return;
  const files = [...(e.clipboardData?.files || [])].filter((f) => f.type.startsWith("image/"));
  if (!files.length) return;
  e.preventDefault();
  if ($("#rvNote")) rvDraftAdd(files); else rvScreenAdd(files);
}

// ——— sağ panel ———
function rvDrawer() {
  const d = $("#rvDrawer");
  d.classList.toggle("on", rvOn);
  $("#rvBanner").classList.toggle("on", rvOn);
  if (!rvOn) return;
  const r = rvRoute(), screens = rvScreens();
  const done = screens.filter((s) => rvScreenDone(s.route)).length;
  const sc = rv.screens[r.base] || {};
  const here = rv.items.filter((i) => i.route.startsWith(r.base));
  const actLabel = Object.fromEntries(RV_ACTIONS);
  const itemRow = (i) => `<div class="rv-item ${rv.sent.includes(i.id) ? "sent" : ""}" onclick="rvPick(null,'${i.id}')"><span class="rv-dot ${i.action}"></span><div><b>${actLabel[i.action]}${i.prio === "high" ? " · Olmazsa olmaz" : ""}${rv.sent.includes(i.id) ? " · gönderildi" : ""}</b><small>${rvEsc(i.target.card || i.target.kind)}${i.target.text ? " — " + rvEsc(i.target.text.slice(0, 40)) : ""}</small>${i.note ? `<p>${rvEsc(i.note)}</p>` : ""}${i.imgs?.length ? `<small>${ic("image")} ${i.imgs.length} görsel</small>` : ""}</div></div>`;
  let body = "";
  if (rvTab === "screen") body = `
    <div class="rv-sec"><div class="rv-sl">Bu ekran</div><b class="rv-screen-name">${rvEsc(r.label)}</b></div>
    <div class="rv-sec"><div class="rv-sl">Bu ekrana ihtiyacınız var mı?</div>
      <div class="seg">${[["evet", "Evet"], ["hayir", "Hayır"], ["emin", "Emin değilim"]].map(([k, l]) => `<button class="${sc.need === k ? "on" : ""}" onclick="rvScreenSet('need','${k}')">${l}</button>`).join("")}</div></div>
    <div class="rv-sec"><div class="rv-sl">Bu ekranda eksik olan ne?</div><textarea class="input" placeholder="Örn: siparişlerde kargo takip numarası da olsun" onchange="rvScreenSet('missing',this.value)">${rvEsc(sc.missing || "")}</textarea>
      ${rvThumbs(sc.imgs || [], "rvScreenDel")}<div class="row wrap" style="margin-top:8px">${rvImgPicker("rvScreenAdd", (sc.imgs || []).length)}</div></div>
    <div class="rv-sec"><div class="rv-sl">Bu ekrandaki notlarınız (${here.length})</div>${here.length ? here.map(itemRow).join("") : `<div class="rv-empty">${ic("edit")} Ekranda bir kutuya, butona veya satıra tıklayın.</div>`}</div>`;
  else if (rvTab === "all") body = `
    <div class="rv-sec"><div class="rv-sl">İlerleme · ${done} / ${screens.length} ekran</div><div class="bar"><i style="width:${(done / screens.length) * 100}%"></i></div></div>
    ${screens.map((s) => { const its = rv.items.filter((i) => i.route.startsWith(s.route)); return `<div class="rv-screen ${rvScreenDone(s.route) ? "done" : ""}" onclick="go('${s.route}')"><span>${rvScreenDone(s.route) ? ic("check") : ""}</span>${rvEsc(s.label)}${its.length ? `<em>${its.length}</em>` : ""}</div>`; }).join("")}`;
  else body = RV_QUESTIONS.map((q, i) => `<div class="rv-sec"><div class="rv-q">${i + 1}. ${rvEsc(q)}</div><textarea class="input" onchange="rvAnswer(${i},this.value)">${rvEsc(rv.answers[q] || "")}</textarea></div>`).join("");

  const pend = rvPending().length, answered = Object.values(rv.answers).filter((v) => v && v.trim()).length;
  d.innerHTML = `
    <div class="rv-head"><div><b>${ic("edit")} Revize Modu</b><small>${rvEsc(rv.reviewer?.name)} · ${rvEsc(rv.reviewer?.role)} · <a onclick="rvWho()">değiştir</a> · <a onclick="rvGuide(0)">nasıl çalışır?</a></small></div><button class="icon-btn" onclick="rvToggle()">${ic("x")}</button></div>
    <div class="tabs rv-tabs">${[["screen", "Bu ekran"], ["all", `Ekranlar ${done}/${screens.length}`], ["q", `Sorular ${answered}/${RV_QUESTIONS.length}`]].map(([k, l]) => `<button class="${rvTab === k ? "on" : ""}" onclick="rvTab='${k}';rvDrawer()">${l}</button>`).join("")}</div>
    <div class="rv-body">${body}</div>
    <div class="rv-foot"><button class="btn primary block lg" onclick="rvReview()">Gönder${pend ? ` (${pend} not)` : ""}</button></div>`;
}
function rvScreenObj() { const r = rvRoute(); return (rv.screens[r.base] ||= { label: r.label.split(" · ")[0] }); }
function rvScreenSet(k, v) { const s = rvScreenObj(); s[k] = v; s.sentAt = null; rvSave(); rvDrawer(); }
function rvScreenAdd(files) {
  const s = rvScreenObj(); s.imgs ||= [];
  rvReadImages([...files].slice(0, RV_MAX_IMGS - s.imgs.length), (img) => { if (s.imgs.length < RV_MAX_IMGS) { s.imgs.push(img); s.sentAt = null; if (!rvSave()) s.imgs.pop(); rvDrawer(); } });
}
function rvScreenDel(i) { const s = rvScreenObj(); s.imgs.splice(i, 1); s.sentAt = null; rvSave(); rvDrawer(); }
function rvAnswer(i, v) { rv.answers[RV_QUESTIONS[i]] = v; rv.answersSent = false; rvSave(); }

// ——— gönderim ———
function rvPayload() {
  return { reviewer: rv.reviewer, promise: !!rv.reviewer?.promise, items: rvPending(), screens: Object.fromEntries(Object.entries(rv.screens).filter(([, s]) => !s.sentAt)), answers: rv.answersSent ? {} : rv.answers };
}
function rvReview() {
  const p = rvPayload(), sc = Object.keys(p.screens).length, ans = Object.values(p.answers).filter((v) => v && v.trim()).length;
  if (!p.items.length && !sc && !ans) { toast("Gönderilecek yeni not yok", "info"); return; }
  const byScreen = {};
  p.items.forEach((i) => (byScreen[i.screenLabel] ||= []).push(i));
  const actLabel = Object.fromEntries(RV_ACTIONS);
  $("#rvPop").innerHTML = `<div class="rv-card wide"><div class="rv-card-top">${ic("send")} Göndermeden önce</div>
    <div class="rv-sum">${Object.entries(byScreen).map(([s, its]) => `<div class="rv-sl">${rvEsc(s)}</div>${its.map((i) => `<div class="stat-row"><span><span class="rv-dot ${i.action}"></span>${rvEsc(i.target.card || i.target.kind)}${i.target.text ? " — " + rvEsc(i.target.text.slice(0, 40)) : ""}${i.imgs?.length ? ` · ${i.imgs.length} görsel` : ""}</span><b>${actLabel[i.action]}</b></div>`).join("")}`).join("") || '<div class="muted">Öğe notu yok.</div>'}
    <div class="stat-row mt"><span>Ekran cevapları</span><b>${sc}</b></div><div class="stat-row"><span>Soru cevapları</span><b>${ans} / ${RV_QUESTIONS.length}</b></div></div>
    <div class="m-actions"><button class="btn" onclick="rvClose()">Düzenlemeye dön</button><button class="btn primary" id="rvSendBtn" onclick="rvSend()">Gönder</button></div></div>`;
  $("#rvPop").classList.add("on");
}
// Görseller önce tek tek yüklenir (sunucu istek sınırı için), yerel kopya linkle değişir
async function rvUploadImgs(list) {
  for (const x of list || []) {
    if (x.url) continue;
    const r = await fetch(RV_API + "api/upload", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ data: x.data }) });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(j.error || "Görsel yüklenemedi");
    x.url = j.url; delete x.data; rvSave();
  }
}
async function rvSend() {
  const btn = $("#rvSendBtn");
  btn.disabled = true; btn.textContent = "Gönderiliyor…";
  try {
    let p = rvPayload();
    for (const i of p.items) await rvUploadImgs(i.imgs);
    for (const s of Object.values(p.screens)) await rvUploadImgs(s.imgs);
    p = rvPayload();
    const r = await fetch(RV_API + "api/feedback", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(p) });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(j.error || r.status);
    rv.sent.push(...p.items.map((i) => i.id));
    Object.keys(p.screens).forEach((k) => (rv.screens[k].sentAt = Date.now()));
    if (Object.keys(p.answers).length) rv.answersSent = true;
    rvSave(); rvClose(); rvFab(); rvDrawer();
    toast("Revizeleriniz iletildi, teşekkürler!");
  } catch (e) {
    $("#rvPop .m-actions").innerHTML = `<span class="err-t" style="margin-right:auto;font-size:12.5px">Gönderilemedi. Notlarınız bu tarayıcıda duruyor.<br><small class="muted notranslate">${rvEsc(String(e.message || e))}</small></span><button class="btn" onclick="rvCopy()">${ic("copy")} Metin olarak kopyala</button><button class="btn primary" id="rvSendBtn" onclick="rvSend()">Tekrar dene</button>`;
  }
}
// Yedek: sunucu çalışmazsa notlar WhatsApp / mail ile gönderilebilecek metin olur
function rvCopy() {
  const p = rvPayload(), actLabel = Object.fromEntries(RV_ACTIONS);
  const lines = [`MARMARA B2B PANEL — REVİZE`, `${rv.reviewer.name} (${rv.reviewer.role})`, ""];
  p.items.forEach((i, n) => lines.push(`${n + 1}. [${actLabel[i.action]}${i.prio === "high" ? " · Olmazsa olmaz" : ""}] ${i.screenLabel} › ${i.target.card || i.target.kind}${i.target.text ? ` "${i.target.text.slice(0, 40)}"` : ""}${i.note ? `\n   ${i.note}` : ""}${i.imgs?.length ? `\n   (${i.imgs.length} görsel — ayrıca gönderin)` : ""}`));
  Object.values(p.screens).forEach((s) => lines.push(`• ${s.label}: ihtiyaç ${s.need || "—"}${s.missing ? ` · eksik: ${s.missing}` : ""}`));
  Object.entries(p.answers).filter(([, v]) => v && v.trim()).forEach(([q, v]) => lines.push(`\nS: ${q}\nC: ${v}`));
  navigator.clipboard.writeText(lines.join("\n")).then(() => toast("Kopyalandı — WhatsApp veya mail ile gönderebilirsiniz", "copy"));
}

rvMount();
