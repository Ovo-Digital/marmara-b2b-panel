// Ortak liste filtresi — siparişler, müşteriler, ürünler, finans ve müşteri siparişleri aynı motoru kullanır.
// Liste satırları data-* özellikleri taşır (data-lfrow + data-q, data-<alan>); filtre ekranı yeniden çizmeden satırları gizler / sıralar.
// Alan tipleri: sel (seçim), date (tarih aralığı), num (sayı aralığı). Filtreler sayfa değişse de kalır (tarayıcıda saklanır).
const LF = {};
const lfDefaults = (cfg) => {
  const d = { q: "", sort: cfg.sorts ? cfg.sorts[0][0] : "", more: false };
  cfg.fields.forEach((f) => { if (f.t === "sel") d[f.k] = "all"; else { d[f.k + "From"] = ""; d[f.k + "To"] = ""; } });
  return d;
};
function lfState(cfg) {
  const key = "lf_" + cfg.id;
  if (!state[key]) { let saved = null; try { saved = JSON.parse(localStorage.getItem("mbF_" + cfg.id)); } catch {} state[key] = { ...lfDefaults(cfg), ...(saved || {}) }; }
  return state[key];
}
const lfSave = (id) => { try { localStorage.setItem("mbF_" + id, JSON.stringify(state["lf_" + id])); } catch {} };
const lfActive = (cfg, f) => cfg.fields.reduce((n, fd) => n + (fd.t === "sel" ? (f[fd.k] !== "all" ? 1 : 0) : (f[fd.k + "From"] || f[fd.k + "To"] ? 1 : 0)), 0);

function lfBar(cfg) {
  LF[cfg.id] = cfg;
  const f = lfState(cfg), T = (tr, en) => (cfg.en ? en : tr);
  const set = (k) => `lfSet('${cfg.id}','${k}',this.value)`;
  const sel = (fd) => `<select class="lf-sel ${f[fd.k] !== "all" ? "on" : ""}" onchange="this.classList.toggle('on',this.value!=='all');${set(fd.k)}"><option value="all">${fd.label}</option>${fd.opts.map(([v, l]) => `<option value="${pfEsc(v)}" ${String(f[fd.k]) === String(v) ? "selected" : ""}>${l}</option>`).join("")}</select>`;
  const range = (fd) => { const ty = fd.t === "date" ? "date" : "number", ex = fd.t === "num" ? ' step="any" min="0"' : "";
    return `<div class="lf-range ${f[fd.k + "From"] || f[fd.k + "To"] ? "on" : ""}"><span>${fd.label}</span><input type="${ty}"${ex} value="${pfEsc(f[fd.k + "From"])}" placeholder="${T("en az", "min")}" onchange="${set(fd.k + "From")}"><em>–</em><input type="${ty}"${ex} value="${pfEsc(f[fd.k + "To"])}" placeholder="${T("en çok", "max")}" onchange="${set(fd.k + "To")}"></div>`; };
  const main = cfg.fields.filter((x) => x.t === "sel" && !x.more), more = cfg.fields.filter((x) => x.more || x.t !== "sel");
  return `<div class="lf" id="lf-${cfg.id}">
    <div class="filters pf">
      <div class="search pf-q"><span>${ic("search")}</span><input type="search" value="${pfEsc(f.q)}" placeholder="${cfg.ph}" oninput="${set("q")}"></div>
      ${main.map(sel).join("")}
      ${more.length ? `<button class="btn lf-more ${f.more ? "on" : ""}" id="lfm-${cfg.id}" onclick="lfMore('${cfg.id}')">${ic("settings")} ${T("Detaylı filtre", "More filters")}<em class="lf-badge" id="lfb-${cfg.id}"></em></button>` : ""}
      ${cfg.sorts ? `<select class="lf-sort" onchange="${set("sort")}">${cfg.sorts.map(([v, l]) => `<option value="${v}" ${f.sort === v ? "selected" : ""}>${T("Sırala: ", "Sort: ")}${l}</option>`).join("")}</select>` : ""}
      <button class="btn ghost lf-clear" id="lfc-${cfg.id}" onclick="lfClear('${cfg.id}')">${ic("x")} ${T("Temizle", "Clear")}</button>
    </div>
    ${more.length ? `<div class="lf-adv" id="lfa-${cfg.id}" style="${f.more ? "" : "display:none"}">${more.map((fd) => (fd.t === "sel" ? sel(fd) : range(fd))).join("")}</div>` : ""}
    <div class="lf-sum" id="lfs-${cfg.id}"></div>
  </div>`;
}
function lfSet(id, k, v) { const f = lfState(LF[id]); f[k] = v; lfSave(id); lfApply(id); if (k.endsWith("From") || k.endsWith("To")) document.querySelectorAll(`#lfa-${id} .lf-range`).forEach((r) => r.classList.toggle("on", [...r.querySelectorAll("input")].some((i) => i.value))); }
function lfMore(id) { const f = lfState(LF[id]); f.more = !f.more; lfSave(id); $("#lfa-" + id).style.display = f.more ? "" : "none"; $("#lfm-" + id).classList.toggle("on", f.more); }
function lfClear(id) { const cfg = LF[id], f = lfState(cfg); state["lf_" + id] = { ...lfDefaults(cfg), sort: f.sort, more: f.more }; lfSave(id); rerender(); }

function lfApply(id) {
  const cfg = LF[id], box = document.getElementById("lf-" + id); if (!cfg || !box) return;
  const f = lfState(cfg), rows = [...document.querySelectorAll(cfg.item)];
  const okSel = (d, fd) => f[fd.k] === "all" || String(d[fd.attr || fd.k] ?? "").split("|").includes(String(f[fd.k]));
  const okRange = (d, fd) => { const v = d[fd.attr || fd.k], a = f[fd.k + "From"], b = f[fd.k + "To"]; if (!a && !b) return true; if (v == null || v === "") return false;
    if (fd.t === "num") return (a === "" || +v >= +a) && (b === "" || +v <= +b); return (!a || v >= a) && (!b || v <= b); };
  let n = 0; const sums = {};
  rows.forEach((el) => {
    const d = el.dataset;
    const hit = (!f.q.trim() || srchHit(d.q || "", f.q)) && cfg.fields.every((fd) => (fd.t === "sel" ? okSel(d, fd) : okRange(d, fd)));
    el.style.display = hit ? "" : "none";
    if (hit) { n++; if (cfg.sum) { const c = d[cfg.sum.cur] || ""; sums[c] = (sums[c] || 0) + (+d[cfg.sum.attr] || 0); } }
  });
  // sıralama: aynı listedeki satırları yeniden diz
  const s = cfg.sorts && cfg.sorts.find((x) => x[0] === f.sort);
  if (s && rows.length) {
    const [, , attr, dir, type] = s, val = (el) => el.dataset[attr] ?? "";
    const sorted = rows.slice().sort((x, y) => { const a = val(x), b = val(y); return dir * (type === "num" ? (+a || 0) - (+b || 0) : String(a).localeCompare(String(b), "tr", { numeric: true })); });
    const parent = rows[0].parentNode; sorted.forEach((el) => el.parentNode === parent && parent.appendChild(el));
  }
  const act = lfActive(cfg, f) + (f.q.trim() ? 1 : 0), T = (tr, en) => (cfg.en ? en : tr);
  const tot = cfg.sum ? Object.entries(sums).filter(([, v]) => v > 0).map(([c, v]) => (cfg.sum.fmt ? cfg.sum.fmt(v, c) : money(v, c || "USD"))).join(" · ") : "";
  $("#lfs-" + id).innerHTML = `<b>${n}</b> / ${rows.length} ${cfg.noun}${tot ? ` · ${cfg.sum.label || T("toplam", "total")} <b>${tot}</b>` : ""}${act ? ` · <span class="gold-t">${act} ${T("filtre aktif", act > 1 ? "filters on" : "filter on")}</span>` : ""}`;
  const badge = $("#lfb-" + id); if (badge) { const advN = cfg.fields.filter((fd) => fd.more || fd.t !== "sel").reduce((k, fd) => k + (fd.t === "sel" ? (f[fd.k] !== "all" ? 1 : 0) : (f[fd.k + "From"] || f[fd.k + "To"] ? 1 : 0)), 0); badge.textContent = advN || ""; badge.style.display = advN ? "" : "none"; }
  $("#lfc-" + id).style.display = act ? "" : "none";
  const empty = cfg.empty && document.querySelector(cfg.empty); if (empty) empty.style.display = n ? "none" : "";
}
function lfApplyAll() { Object.keys(LF).forEach((id) => document.getElementById("lf-" + id) && lfApply(id)); }
// tarih → yyyy-mm-dd (ISO, "13 Oct 2026", "19-11-2020" biçimlerini anlar)
function lfDate(x) {
  if (!x || x === "—") return "";
  const m = String(x).match(/^(\d{2})[-.](\d{2})[-.](\d{4})$/); if (m) return `${m[3]}-${m[2]}-${m[1]}`;
  const d = new Date(x); if (isNaN(d)) return "";
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
