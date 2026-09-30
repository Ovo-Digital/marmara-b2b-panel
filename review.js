// Revize Modu — müşteri ekranı gezerken öğelere tıklayıp not bırakır; notlar /api/feedback ile GitHub issue olur.

const RV_KEY = "mbRevize.v1";
const RV_DEPTS = ["Satış", "Operasyon", "Fabrika", "Finans", "Yönetim", "Diğer"];
const RV_ACTIONS = [["kalsin", "Kalsın"], ["kaldir", "Kaldırılsın"], ["degistir", "Değiştirilsin"], ["ekle", "Buraya eklensin"]];
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

let rv = rvLoad();
let rvOn = false;
let rvTab = "screen";
let rvHover = null;

function rvLoad() {
  try { return JSON.parse(localStorage.getItem(RV_KEY)) || rvEmpty(); } catch { return rvEmpty(); }
}
function rvEmpty() { return { reviewer: null, items: [], screens: {}, answers: {}, sent: [] }; }
function rvSave() { try { localStorage.setItem(RV_KEY, JSON.stringify(rv)); } catch {} }
const rvEsc = (s = "") => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

// Ekran listesi menüden gelir: mod/sayfa
function rvScreens() {
  const out = [];
  for (const [mode, list] of Object.entries(NAV)) for (const n of list) if (n.length > 1 && n[0] !== "register") out.push({ route: `${mode}/${n[0]}`, label: `${{ admin: "Admin", customer: "Müşteri", factory: "Fabrika" }[mode]} › ${n[1]}` });
  return out;
}
function rvRoute() {
  const { mode, page, arg } = parse();
  const base = `${mode}/${page}`;
  const known = rvScreens().find((s) => s.route === base);
  const h1 = document.querySelector("#view h1")?.textContent.trim() || page;
  return { base, full: `${base}${arg ? "/" + arg : ""}`, label: known ? known.label + (arg ? ` · ${h1}` : "") : `${{ admin: "Admin", customer: "Müşteri", factory: "Fabrika" }[mode]} › ${h1}` };
}
function rvPending() { return rv.items.filter((i) => !rv.sent.includes(i.id)); }
function rvScreenDone(route) { const s = rv.screens[route]; return !!(s && (s.need || s.missing)) || rv.items.some((i) => i.route.startsWith(route)); }

// ——— arayüz ———
function rvMount() {
  document.body.insertAdjacentHTML("beforeend", `
    <button id="rvFab" class="rv-fab" onclick="rvToggle()"></button>
    <aside id="rvDrawer" class="rv-drawer"></aside>
    <div id="rvPop" class="rv-pop"></div>`);
  rvFab();
  document.addEventListener("mouseover", rvOver, true);
  document.addEventListener("click", rvClick, true);
  window.addEventListener("hashchange", () => setTimeout(() => rvOn && rvDrawer(), 0));
}
function rvFab() {
  const n = rvPending().length;
  $("#rvFab").innerHTML = rvOn ? `${ic("x")} Revizeyi kapat` : `${ic("edit")} Revize Modu${n ? `<em>${n}</em>` : ""}`;
  $("#rvFab").classList.toggle("on", rvOn);
}
function rvToggle() {
  if (!rv.reviewer) return rvWho();
  rvOn = !rvOn;
  document.body.classList.toggle("rv-on", rvOn);
  if (!rvOn) rvClearHover();
  rvFab(); rvDrawer();
}
function rvWho() {
  $("#rvPop").innerHTML = `<div class="rv-card"><h2>Revize Modu</h2>
    <p class="muted" style="margin-top:0">Ekranda istediğiniz bir kutuya, butona ya da satıra tıklayın ve ne olmasını istediğinizi seçin. Bitince “Gönder”e basın.</p>
    <div class="form"><div class="field"><label>Adınız</label><input class="input" id="rvName" placeholder="Ad Soyad"></div>
    <div class="field"><label>Bölümünüz</label><div class="rv-chips">${RV_DEPTS.map((d, i) => `<button class="chip ${i === 0 ? "on" : ""}" onclick="this.parentNode.querySelectorAll('.chip').forEach(c=>c.classList.remove('on'));this.classList.add('on')">${d}</button>`).join("")}</div></div></div>
    <div class="m-actions"><button class="btn" onclick="rvClose()">Vazgeç</button><button class="btn primary" onclick="rvSetWho()">Başla</button></div></div>`;
  $("#rvPop").classList.add("on");
  setTimeout(() => $("#rvName")?.focus(), 50);
}
function rvSetWho() {
  const name = $("#rvName").value.trim();
  if (!name) { toast("Adınızı yazın", "alert"); return; }
  rv.reviewer = { name, dept: document.querySelector("#rvPop .chip.on").textContent };
  rvSave(); rvClose(); rvToggle();
}
function rvClose() { $("#rvPop").classList.remove("on"); rvClearHover(); }

function rvOver(e) {
  if (!rvOn || $("#rvPop").classList.contains("on")) return;
  const el = e.target.closest?.("#view " + RV_PICK.split(",").join(",#view "));
  if (el === rvHover) return;
  rvClearHover();
  if (el) { rvHover = el; el.classList.add("rv-hl"); }
}
function rvClearHover() { document.querySelectorAll(".rv-hl").forEach((x) => x.classList.remove("rv-hl")); rvHover = null; }

function rvClick(e) {
  if (!rvOn) return;
  if (e.target.closest("#rvDrawer,#rvPop,#rvFab,.side,.top,#modal,.toasts")) return;
  const el = e.target.closest("#view " + RV_PICK.split(",").join(",#view "));
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

function rvPick(el, editId) {
  const t = editId ? rv.items.find((i) => i.id === editId).target : rvDescribe(el);
  const cur = editId ? rv.items.find((i) => i.id === editId) : { action: "degistir", prio: "normal", note: "" };
  rvClearHover();
  if (el) el.classList.add("rv-hl");
  $("#rvPop").innerHTML = `<div class="rv-card"><div class="rv-target"><span class="pill plain">${rvEsc(t.kind)}</span><b>${rvEsc(t.card ? t.card + (t.text && t.text !== t.card ? " — " + t.text : "") : t.text)}</b></div>
    <div class="rv-actions">${RV_ACTIONS.map(([k, l]) => `<button class="rv-act ${k} ${cur.action === k ? "on" : ""}" data-k="${k}" onclick="this.parentNode.querySelectorAll('.rv-act').forEach(b=>b.classList.remove('on'));this.classList.add('on')">${l}</button>`).join("")}</div>
    <div class="field mt"><label>Not</label><textarea class="input" id="rvNote" placeholder="Örn: burada müşterinin telefonu da görünsün">${rvEsc(cur.note)}</textarea></div>
    <div class="field mt"><label>Öncelik</label><div class="seg" id="rvPrio"><button class="${cur.prio !== "high" ? "on" : ""}" data-p="normal" onclick="rvSeg(this)">Olsa iyi olur</button><button class="${cur.prio === "high" ? "on" : ""}" data-p="high" onclick="rvSeg(this)">Olmazsa olmaz</button></div></div>
    <div class="m-actions">${editId ? `<button class="btn danger" onclick="rvDelete('${editId}');rvClose()">Sil</button>` : ""}<button class="btn" onclick="rvClose()">Vazgeç</button><button class="btn primary" onclick="rvStore(${editId ? `'${editId}'` : "null"})">Kaydet</button></div></div>`;
  window.rvTarget = t;
  $("#rvPop").classList.add("on");
  setTimeout(() => $("#rvNote")?.focus(), 50);
}
function rvSeg(b) { b.parentNode.querySelectorAll("button").forEach((x) => x.classList.remove("on")); b.classList.add("on"); }
function rvStore(editId) {
  const action = document.querySelector("#rvPop .rv-act.on").dataset.k;
  const note = $("#rvNote").value.trim();
  const prio = document.querySelector("#rvPrio .on").dataset.p;
  if (action !== "kalsin" && !note) { toast("Ne olmasını istediğinizi kısaca yazın", "alert"); $("#rvNote").focus(); return; }
  if (editId) Object.assign(rv.items.find((i) => i.id === editId), { action, note, prio });
  else {
    const r = rvRoute();
    rv.items.push({ id: Date.now().toString(36), route: r.full, screenLabel: r.label, target: window.rvTarget, action, note, prio, ts: new Date().toISOString() });
  }
  rvSave(); rvClose(); rvFab(); rvDrawer();
  toast("Not kaydedildi");
}
function rvDelete(id) { rv.items = rv.items.filter((i) => i.id !== id); rvSave(); rvFab(); rvDrawer(); }

function rvDrawer() {
  const d = $("#rvDrawer");
  d.classList.toggle("on", rvOn);
  if (!rvOn) return;
  const r = rvRoute(), screens = rvScreens();
  const done = screens.filter((s) => rvScreenDone(s.route)).length;
  const sc = rv.screens[r.base] || {};
  const here = rv.items.filter((i) => i.route.startsWith(r.base));
  const actLabel = Object.fromEntries(RV_ACTIONS);
  const itemRow = (i) => `<div class="rv-item ${rv.sent.includes(i.id) ? "sent" : ""}" onclick="rvPick(null,'${i.id}')"><span class="rv-dot ${i.action}"></span><div><b>${actLabel[i.action]}${i.prio === "high" ? " · Olmazsa olmaz" : ""}</b><small>${rvEsc(i.target.card || i.target.kind)}${i.target.text ? " — " + rvEsc(i.target.text.slice(0, 40)) : ""}</small>${i.note ? `<p>${rvEsc(i.note)}</p>` : ""}</div></div>`;
  let body = "";
  if (rvTab === "screen") body = `
    <div class="rv-sec"><div class="rv-sl">Bu ekran</div><b>${rvEsc(r.label)}</b></div>
    <div class="rv-sec"><div class="rv-sl">Bu ekrana ihtiyacınız var mı?</div>
      <div class="seg">${[["evet", "Evet"], ["hayir", "Hayır"], ["emin", "Emin değilim"]].map(([k, l]) => `<button class="${sc.need === k ? "on" : ""}" onclick="rvScreenSet('need','${k}')">${l}</button>`).join("")}</div></div>
    <div class="rv-sec"><div class="rv-sl">Bu ekranda eksik olan ne?</div><textarea class="input" placeholder="Yoksa boş bırakın" onchange="rvScreenSet('missing',this.value)">${rvEsc(sc.missing || "")}</textarea></div>
    <div class="rv-sec"><div class="rv-sl">Bu ekrandaki notlarınız (${here.length})</div>${here.length ? here.map(itemRow).join("") : `<div class="rv-empty">${ic("edit")} Ekranda bir kutuya, butona veya satıra tıklayın.</div>`}</div>`;
  else if (rvTab === "all") body = `
    <div class="rv-sec"><div class="rv-sl">İlerleme · ${done} / ${screens.length} ekran</div><div class="bar"><i style="width:${(done / screens.length) * 100}%"></i></div></div>
    ${screens.map((s) => { const its = rv.items.filter((i) => i.route.startsWith(s.route)); return `<div class="rv-screen ${rvScreenDone(s.route) ? "done" : ""}" onclick="go('${s.route}')"><span>${rvScreenDone(s.route) ? ic("check") : ""}</span>${rvEsc(s.label)}${its.length ? `<em>${its.length}</em>` : ""}</div>`; }).join("")}`;
  else body = RV_QUESTIONS.map((q, i) => `<div class="rv-sec"><div class="rv-q">${i + 1}. ${rvEsc(q)}</div><textarea class="input" onchange="rvAnswer(${i},this.value)">${rvEsc(rv.answers[q] || "")}</textarea></div>`).join("");

  const pend = rvPending().length, answered = Object.values(rv.answers).filter((v) => v && v.trim()).length;
  d.innerHTML = `
    <div class="rv-head"><div><b>Revize Modu</b><small>${rvEsc(rv.reviewer?.name)} · ${rvEsc(rv.reviewer?.dept)} <a onclick="rvWho()">değiştir</a></small></div><button class="icon-btn" onclick="rvToggle()">${ic("x")}</button></div>
    <div class="tabs rv-tabs">${[["screen", "Bu ekran"], ["all", `Ekranlar ${done}/${screens.length}`], ["q", `Sorular ${answered}/${RV_QUESTIONS.length}`]].map(([k, l]) => `<button class="${rvTab === k ? "on" : ""}" onclick="rvTab='${k}';rvDrawer()">${l}</button>`).join("")}</div>
    <div class="rv-body">${body}</div>
    <div class="rv-foot"><button class="btn primary block lg" onclick="rvReview()">Gönder${pend ? ` (${pend} not)` : ""}</button></div>`;
}
function rvScreenSet(k, v) { const r = rvRoute(); (rv.screens[r.base] ||= { label: r.label.split(" · ")[0] })[k] = v; rv.screens[r.base].sentAt = null; rvSave(); rvDrawer(); }
function rvAnswer(i, v) { rv.answers[RV_QUESTIONS[i]] = v; rv.answersSent = false; rvSave(); }

function rvPayload() {
  return { reviewer: rv.reviewer, items: rvPending(), screens: Object.fromEntries(Object.entries(rv.screens).filter(([, s]) => !s.sentAt)), answers: rv.answersSent ? {} : rv.answers };
}
function rvReview() {
  const p = rvPayload(), sc = Object.keys(p.screens).length, ans = Object.values(p.answers).filter((v) => v && v.trim()).length;
  if (!p.items.length && !sc && !ans) { toast("Gönderilecek yeni not yok", "info"); return; }
  const byScreen = {};
  p.items.forEach((i) => (byScreen[i.screenLabel] ||= []).push(i));
  const actLabel = Object.fromEntries(RV_ACTIONS);
  $("#rvPop").innerHTML = `<div class="rv-card wide"><h2>Göndermeden önce</h2>
    <div class="rv-sum">${Object.entries(byScreen).map(([s, its]) => `<div class="rv-sl">${rvEsc(s)}</div>${its.map((i) => `<div class="stat-row"><span><span class="rv-dot ${i.action}"></span>${rvEsc(i.target.card || i.target.kind)}${i.target.text ? " — " + rvEsc(i.target.text.slice(0, 40)) : ""}</span><b>${actLabel[i.action]}</b></div>`).join("")}`).join("") || '<div class="muted">Öğe notu yok.</div>'}
    <div class="stat-row mt"><span>Ekran cevapları</span><b>${sc}</b></div><div class="stat-row"><span>Soru cevapları</span><b>${ans} / ${RV_QUESTIONS.length}</b></div></div>
    <div class="m-actions"><button class="btn" onclick="rvClose()">Düzenlemeye dön</button><button class="btn primary" id="rvSendBtn" onclick="rvSend()">Gönder</button></div></div>`;
  $("#rvPop").classList.add("on");
}
async function rvSend() {
  const p = rvPayload(), btn = $("#rvSendBtn");
  btn.disabled = true; btn.textContent = "Gönderiliyor…";
  try {
    const r = await fetch("api/feedback", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(p) });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(j.error || r.status);
    rv.sent.push(...p.items.map((i) => i.id));
    Object.keys(p.screens).forEach((k) => (rv.screens[k].sentAt = Date.now()));
    if (Object.keys(p.answers).length) rv.answersSent = true;
    rvSave(); rvClose(); rvFab(); rvDrawer();
    toast("Revizeleriniz iletildi, teşekkürler!");
  } catch (e) {
    $("#rvPop .m-actions").innerHTML = `<span class="err-t" style="margin-right:auto;font-size:12.5px">Gönderilemedi. Notlarınız bu tarayıcıda duruyor.</span><button class="btn" onclick="rvCopy()">${ic("copy")} Metin olarak kopyala</button><button class="btn primary" onclick="rvSend()">Tekrar dene</button>`;
  }
}
// Yedek: sunucu çalışmazsa notlar WhatsApp / mail ile gönderilebilecek metin olur
function rvCopy() {
  const p = rvPayload(), actLabel = Object.fromEntries(RV_ACTIONS);
  const lines = [`MARMARA B2B PANEL — REVİZE`, `${rv.reviewer.name} (${rv.reviewer.dept})`, ""];
  p.items.forEach((i, n) => lines.push(`${n + 1}. [${actLabel[i.action]}${i.prio === "high" ? " · Olmazsa olmaz" : ""}] ${i.screenLabel} › ${i.target.card || i.target.kind}${i.target.text ? ` "${i.target.text.slice(0, 40)}"` : ""}${i.note ? `\n   ${i.note}` : ""}`));
  Object.values(p.screens).forEach((s) => lines.push(`• ${s.label}: ihtiyaç ${s.need || "—"}${s.missing ? ` · eksik: ${s.missing}` : ""}`));
  Object.entries(p.answers).filter(([, v]) => v && v.trim()).forEach(([q, v]) => lines.push(`\nS: ${q}\nC: ${v}`));
  navigator.clipboard.writeText(lines.join("\n")).then(() => toast("Kopyalandı — WhatsApp veya mail ile gönderebilirsiniz", "copy"));
}

rvMount();
