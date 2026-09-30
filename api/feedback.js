// Revize Modu'ndan gelen notları özel revize reposuna GitHub issue olarak yazar.
// Vercel ortam değişkenleri: GITHUB_TOKEN (zorunlu, sadece Issues yazma izni), REVIZE_REPO (opsiyonel)

const REPO = process.env.REVIZE_REPO || "Ovo-Digital/marmara-b2b-revizeler";

const ACTION = {
  kalsin: { label: null, title: "Kalsın", text: "Kalsın" },
  kaldir: { label: "kaldir", title: "Kaldır", text: "Kaldırılsın" },
  degistir: { label: "degistir", title: "Değiştir", text: "Değiştirilsin" },
  ekle: { label: "ekle", title: "Ekle", text: "Buraya eklensin" },
};
const DEPT = { Satış: "satis", Operasyon: "operasyon", Fabrika: "fabrika", Finans: "finans", Yönetim: "yonetim" };

// Kullanıcı metninde @ ile birilerini etiketlemesin, markdown'ı bozmasın
const clean = (s = "", max = 2000) => String(s).replace(/@/g, "@​").replace(/\r/g, "").slice(0, max).trim();
const quote = (s) => clean(s).split("\n").map((l) => "> " + l).join("\n");

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ error: "Sadece POST" });
  const token = process.env.GITHUB_TOKEN;
  if (!token) return res.status(503).json({ error: "Sunucuda GITHUB_TOKEN tanımlı değil" });

  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch { body = null; } }
  if (!body || JSON.stringify(body).length > 300000) return res.status(400).json({ error: "Geçersiz veri" });

  const { reviewer = {}, items = [], screens = {}, answers = {} } = body;
  const who = clean(reviewer.name, 80);
  const dept = clean(reviewer.dept, 40);
  if (!who) return res.status(400).json({ error: "İsim zorunlu" });
  const deptLabel = DEPT[dept] || "diger";
  const when = new Date().toLocaleString("tr-TR", { timeZone: "Europe/Istanbul" });

  const gh = async (path, data) => {
    const r = await fetch(`https://api.github.com/repos/${REPO}${path}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json", "User-Agent": "marmara-revize", "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!r.ok) throw new Error(`GitHub ${r.status}: ${(await r.text()).slice(0, 200)}`);
    return r.json();
  };

  // Aksiyon gerektirenler ayrı issue olur; "kalsın" ve cevaplar özet issue'da kalır
  const actionable = [];
  for (const it of items) {
    const a = ACTION[it.action] || ACTION.degistir;
    if (!a.label) continue;
    actionable.push({
      title: `[${a.title}] ${clean(it.screenLabel, 60)} › ${clean(it.target?.card || it.target?.kind, 50)}${it.target?.text ? ` — "${clean(it.target.text, 40)}"` : ""}`,
      labels: [a.label, deptLabel, ...(it.prio === "high" ? ["oncelik-yuksek"] : [])],
      body: [
        `**Ekran:** ${clean(it.screenLabel, 100)} — \`${clean(it.route, 100)}\``,
        `**Öğe:** ${clean(it.target?.kind, 40)}${it.target?.card ? ` · kart: ${clean(it.target.card, 80)}` : ""}${it.target?.text ? ` · metin: "${clean(it.target.text, 120)}"` : ""}`,
        `**İstek:** ${a.text}`,
        `**Öncelik:** ${it.prio === "high" ? "Olmazsa olmaz" : "Olsa iyi olur"}`,
        it.note ? `**Not:**\n${quote(it.note)}` : "**Not:** —",
        `**Kimden:** ${who} (${dept || "—"}) · ${when}`,
        `<sub>seçici: \`${clean(it.target?.selector, 200)}\`</sub>`,
      ].join("\n\n"),
    });
  }
  for (const [route, s] of Object.entries(screens)) {
    if (s.need === "hayir") actionable.push({ title: `[Ekran gereksiz] ${clean(s.label, 80)}`, labels: ["ekran-kaldir", deptLabel], body: `**Ekran:** ${clean(s.label, 100)} — \`${clean(route, 100)}\`\n\n"Bu ekrana ihtiyacınız var mı?" → **Hayır**\n\n**Kimden:** ${who} (${dept || "—"}) · ${when}` });
    if (s.missing && s.missing.trim()) actionable.push({ title: `[Eksik] ${clean(s.label, 60)} — ${clean(s.missing, 50)}`, labels: ["eksik", deptLabel], body: `**Ekran:** ${clean(s.label, 100)} — \`${clean(route, 100)}\`\n\n**Bu ekranda eksik olan:**\n${quote(s.missing)}\n\n**Kimden:** ${who} (${dept || "—"}) · ${when}` });
  }

  const keep = items.filter((it) => it.action === "kalsin");
  const answered = Object.entries(answers).filter(([, v]) => v && String(v).trim());
  const screenRows = Object.entries(screens).filter(([, s]) => s.need || s.missing);
  const summary = [
    `**Kimden:** ${who} (${dept || "—"}) · ${when}`,
    `**Toplam:** ${items.length} not · ${actionable.length} aksiyon · ${keep.length} "kalsın" · ${answered.length} cevaplanan soru`,
    screenRows.length ? `### Ekranlar\n| Ekran | İhtiyaç var mı? | Eksik |\n|---|---|---|\n${screenRows.map(([, s]) => `| ${clean(s.label, 80)} | ${{ evet: "Evet", hayir: "Hayır", emin: "Emin değil" }[s.need] || "—"} | ${clean(s.missing, 200).replace(/\n/g, " ").replace(/\|/g, "/") || "—"} |`).join("\n")}` : "",
    keep.length ? `### Kalsın dedikleri\n${keep.map((it) => `- ${clean(it.screenLabel, 60)} › ${clean(it.target?.card || it.target?.kind, 60)}${it.target?.text ? ` — "${clean(it.target.text, 40)}"` : ""}${it.note ? ` — _${clean(it.note, 200)}_` : ""}`).join("\n")}` : "",
    answered.length ? `### Açık soruların cevapları\n${answered.map(([q, v]) => `**${clean(q, 200)}**\n${quote(v)}`).join("\n\n")}` : "",
  ].filter(Boolean).join("\n\n");

  try {
    const s = await gh("/issues", { title: `Revize gönderimi — ${who} (${dept || "—"}) — ${when}`, labels: ["ozet", deptLabel, ...(answered.length ? ["soru-cevap"] : [])], body: summary });
    const created = [];
    for (const a of actionable) {
      const i = await gh("/issues", { ...a, body: `${a.body}\n\n_Özet: #${s.number}_` });
      created.push(i.number);
    }
    return res.status(200).json({ ok: true, summary: s.number, created: created.length });
  } catch (e) {
    return res.status(502).json({ error: String(e.message || e) });
  }
};
