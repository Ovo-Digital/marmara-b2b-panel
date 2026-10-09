// Uçtan uca test: üç ayrı tarayıcı profili (müşteri / admin / fabrika), ortak depo ns=e2e üzerinden.
// Çalıştır: tools/e2e.sh   (her adım ayrı bir Chrome oturumunda koşar; adımlar arası tek bağ ortak depodur)
(async () => {
  const step = Number(new URLSearchParams(location.search).get("step"));
  const out = [], ok = (c, m) => out.push(`${c ? "✓" : "✗"} ${m}`);
  const tick = (ms = 100) => new Promise((r) => setTimeout(r, ms));
  const settle = async () => { for (let i = 0; i < 80; i++) { await tick(250); if (!STORE.busy && !storeChanges()) return true; } return false; };
  const remote = async () => (await fetch(storeUrl(), { cache: "no-store" })).json();
  const login = async (u, p) => { authLogout(); await tick(); $("#auU").value = u; $("#auP").value = p; await authLogin(); await tick(400); };
  const EMAIL = "e2e@senso-test.com", PW = "E2e-2026!", CO_NAME = "E2E Test Barber GmbH";
  const finish = () => { const pre = document.createElement("pre"); pre.id = "o"; pre.className = "notranslate"; pre.textContent = out.join("\n"); document.body.appendChild(pre); };
  try {
    await STORE.ready; await tick(300);
    const custOf = () => CUSTOMERS.find((c) => c.email === EMAIL);
    const orderOf = () => ORDERS.find((o) => o.cust === custOf()?.id);

    if (step === 1) {                       // MÜŞTERİ cihazı — üye ol
      authLogout(); await tick(); authView = "register"; authRender(); await tick();
      const set = (id, v) => ($("#" + id).value = v);
      set("rgName", CO_NAME); set("rgVat", "DE999888777"); set("rgCity", "Hamburg"); set("rgContact", "Erika Test"); set("rgEmail", EMAIL); set("rgPhone", "+49 40 1234");
      set("rgIg", "e2ebarber"); authWeb(true); set("rgWeb", "https://e2e-barber.de"); set("rgPw", PW); set("rgPw2", PW);
      await authRegister(); ok(/onay/i.test($("#auErr")?.textContent || "") && !CUSTOMERS.some((c) => c.email === EMAIL), "onay kutuları işaretlenmeden gönderim engellendi: " + ($("#auErr")?.textContent || "—"));
      $("#cKvkk").checked = true; $("#cTerms").checked = true; await authRegister(); await settle();
      const d = await remote(), c = d.customers.find((x) => x.email === EMAIL);
      ok(document.querySelector(".auth-card h1")?.textContent.includes("alındı") || document.querySelector(".auth-card h1")?.textContent.includes("received"), "başvuru ekranı: “Başvurunuz alındı”");
      ok(c && c.status === "Pending", `depoda müşteri: ${c?.name} · ${c?.status}`);
      ok(c?.website === "https://e2e-barber.de" && c?.instagram === "@e2ebarber", `web/instagram kaydı: ${c?.website} · ${c?.instagram}`);
      ok(c?.consents?.kvkk && c?.consents?.terms && c?.consents?.marketing === null, "yasal onaylar kaydedildi (pazarlama: hayır)");
      ok(d.regs.some((r) => r.u === EMAIL && /^[0-9a-f]{64}$/.test(r.h) && !JSON.stringify(r).includes(PW)), "şifre depoda açık değil, SHA-256 özetiyle");
      $("#auU") || (authView = "login", authRender()); authView = "login"; authRender(); await tick();
      $("#auU").value = EMAIL; $("#auP").value = PW; await authLogin(); await tick(300);
      ok($("#auErr")?.textContent.includes("onay"), "onay öncesi giriş engellendi: " + $("#auErr")?.textContent);
    }

    if (step === 2) {                       // ADMIN cihazı — başvuruyu onayla, Level 4 ata
      await login("admin", "senso2026");
      const c = custOf();
      ok(c && c.status === "Pending", `admin bekleyen başvuruyu görüyor: ${c?.name}`);
      location.hash = "#/admin/application/" + c.id; await tick(400);
      ok(/e2e-barber\.de/.test($("#view").innerText) && /@e2ebarber/.test($("#view").innerText), "başvuruda web sitesi ve Instagram görünüyor");
      ok(/KVKK ✓/.test($("#view").innerText), "başvuruda yasal onaylar görünüyor");
      $("#apList").value = "4"; approveCustomer(c.id); await tick(400); await settle();
      const rc = (await remote()).customers.find((x) => x.email === EMAIL);
      ok(rc?.status === "Active" && rc?.level === 4, `depoda: ${rc?.status} · Level ${rc?.level}`);
    }

    if (step === 3) {                       // MÜŞTERİ cihazı — giriş, fiyat, sipariş
      await login(EMAIL, PW);
      ok(location.hash.startsWith("#/customer"), "onay sonrası giriş → müşteri portalı " + location.hash);
      location.hash = "#/customer/products"; await tick(500);
      const p0 = PRODUCTS.find((p) => stockState(p) !== "out" && p.img);
      const shown = document.querySelector(`#pc-${CSS.escape(p0.sku)} .pp b`)?.textContent || "";
      ok(shown.includes(p0.prices[3].toFixed(2)), `kartta Level 4 fiyatı: ${shown.trim()} (Excel L4 = ${p0.prices[3]})`);
      ok(!/Level \d|Middle East|Africa|Yusuf/.test($("#view").innerText), "müşteri ekranında seviye adı yok");
      state.cart = {}; state.cartTarget = "pallet";
      const pick = PRODUCTS.filter((p) => stockState(p) !== "out" && !p.loose && p.cls !== "Fragile").slice(0, 3);
      pick.forEach((p) => (state.cart[p.sku] = Math.min(20, availBoxes(p))));
      for (let i = 0; i < 6 && !loadCalc(cartItems(), "pallet").complete; i++) { const s = suggestions(cartItems(), "pallet")[0]; if (!s) break; state.cart[s.p.sku] = (state.cart[s.p.sku] || 0) + s.boxes; }
      const L = loadCalc(cartItems(), "pallet");
      ok(L.complete, `sepet tam palet: ${L.pallets.length} palet · son palet ${L.last?.h} cm`);
      const expected = cartItems().reduce((s, [sku, b]) => { const p = P(sku); return s + b * p.pcsBox * p.prices[3]; }, 0);
      location.hash = "#/customer/checkout"; await tick(400);
      $("#ckPo").value = "E2E-PO-1"; $("#ckNote").value = "E2E test notu: lütfen paletleri streçleyin.";
      placeOrder(); await tick(500); await settle();
      const ro = (await remote()).orders.find((o) => o.cust === custOf().id);
      ok(!!ro, `depoda sipariş: ${ro?.no} · ${ro?.items.length} kalem · ${ro?.items.reduce((s, [, b]) => s + b, 0)} koli`);
      ok(ro?.note?.includes("streç") && ro?.po === "E2E-PO-1", "not ve PO depoda");
      out.push(`  beklenen toplam (Excel L4 × koli × adet): $${expected.toFixed(2)}`);
      localStorage.setItem("e2eExpected", String(expected));
      await fetch(storeUrl(), { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ changes: { logs: { __e2e: [["", String(expected)]] } } }) });
    }

    if (step === 4) {                       // ADMIN cihazı — sipariş görünür mü, rakamlar, onay, ödeme
      await login("admin", "senso2026");
      const o = orderOf(), expected = Number((await remote()).logs.__e2e?.[0]?.[1]);
      ok(!!o, `admin yeni siparişi görüyor: ${o?.no} · ${C(o?.cust)?.name}`);
      const total = orderTotal(o);
      ok(Math.abs(total - expected) < 0.01, `admin toplamı ${money(total, o.currency, 2)} = müşteri toplamı $${expected.toFixed(2)}`);
      ok(o.currency === "USD" && orderLevel(o) === 4, `para birimi ${o.currency} · sipariş seviyesi Level ${orderLevel(o)}`);
      location.hash = "#/admin/order/" + o.no; await tick(500);
      const t = $("#view").innerText;
      ok(t.includes("streç") && t.includes("E2E-PO-1"), "sipariş detayında müşteri notu ve PO görünüyor");
      const pi = docHtml(o.no, "pi"), pl = docHtml(o.no, "pl");
      ok(pi.includes(money(total, o.currency, 2)) && pi.includes(CO_NAME), `proforma toplamı ${money(total, o.currency, 2)} ve alıcı doğru`);
      const boxes = o.items.reduce((s, [, b]) => s + b, 0);
      ok(pl.includes(`<b>${num(boxes)}</b>`), `packing list koli toplamı ${boxes}`);
      // başka cihazdan değişiklik → 15 sn yoklaması ekrana getiriyor mu
      const mod = { ...o, po: "E2E-PO-2" };
      await fetch(storeUrl(), { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ changes: { orders: [mod] } }) });
      document.activeElement?.blur(); await storePoll(); await tick(400);
      ok($("#view").innerText.includes("E2E-PO-2"), "başka cihazdaki değişiklik yoklamayla ekrana geldi (PO → E2E-PO-2)");
      const no = o.no;
      $("#resDate").value = "2026-11-15"; advance(no); await tick(300);
      ok(O(no).stage === 1, "Satış incelemesi → Final onaya gönderildi");
      advance(no); await tick(300);
      ok(O(no).stage === 2 && O(no).reserveUntil === "15 Nov 2026", `Final onay · rezervasyon ${O(no).reserveUntil}`);
      location.hash = "#/admin/finance/" + no; await tick(400);
      $("#payAmt").value = String(Math.round(total / 2)); addPayment(no); await tick(300);
      ok(O(no).stage === 2 && payState(O(no))[0] === "Partially Paid", "kısmi ödeme → durum Kısmi Ödendi, fabrikaya gitmedi");
      $("#payAmt").value = String((total - O(no).paid).toFixed(2)); addPayment(no); await tick(300);
      ok(O(no).stage === 3 && payState(O(no))[0] === "Paid", "kalan ödeme → Ödendi · fabrika kuyruğunda");
      await settle();
      const r = (await remote()).orders.find((x) => x.no === no);
      ok(r.stage === 3 && Math.abs(r.paid - total) < 0.02, `depoda: aşama ${r.stage} · ödenen ${r.paid}`);
    }

    if (step === 5) {                       // FABRİKA cihazı — hazırlık
      await login("fabrika", "fabrika2026");
      const o = orderOf();
      location.hash = "#/factory/queue"; await tick(400);
      ok($("#view").innerText.includes(o.no), `fabrika kuyruğunda ${o.no}`);
      ok(!/\$\d/.test($("#view").innerText), "fabrika ekranında fiyat görünmüyor");
      location.hash = "#/factory/prep/" + o.no; await tick(400);
      o.items.forEach(([s, b]) => prepSet(o.no, s, b)); await tick(300);
      ok(document.body.innerText.includes("Paletleri kontrol edin") || document.body.innerText.includes("Check pallets"), "paletler kontrol edilmeden buton kapalı ve nedenini yazıyor");
      state.palletCheck[o.no] = state.palletCheck[o.no].map(() => true); rerender(); await tick(300);
      finishPrep(o.no); await tick(300); await settle();
      const r = (await remote()).orders.find((x) => x.no === o.no);
      ok(r.stage === 4, `hazırlık tamamlandı → depoda aşama ${r.stage} (Sevke Hazır)`);
    }

    if (step === 6) {                       // ADMIN cihazı — final packing + sevk
      await login("admin", "senso2026");
      const o = orderOf();
      location.hash = "#/admin/shipments/" + o.no; await tick(400);
      O(o.no).packed = true; log(o.no, "Final packing onaylandı"); rerender(); await tick(300);
      $("#shFwd").value = "E2E Lojistik"; $("#shRef").value = "BK-E2E-1"; $("#shPlate").value = "TCLU 000000-0";
      markShipped(o.no); await tick(400); await settle();
      const r = (await remote()).orders.find((x) => x.no === o.no);
      ok(r.stage === 5 && r.ship?.ref === "BK-E2E-1", `sevk edildi → depoda aşama ${r.stage} · ${r.ship?.fwd} · ${r.ship?.ref}`);
      ok((await remote()).logs[o.no]?.length >= 6, `aktivite log: ${(await remote()).logs[o.no]?.length} kayıt`);
    }

    if (step === 7) {                       // MÜŞTERİ cihazı — durum ve dokümanlar
      await login(EMAIL, PW);
      const o = orderOf(), expected = Number((await remote()).logs.__e2e?.[0]?.[1]);
      location.hash = "#/customer/order/" + o.no; await tick(500);
      ok(o.stage === 5 && /Shipped|Sevk/.test($("#view").innerText), "müşteri siparişi “Sevk Edildi” görüyor");
      ok(!!document.querySelector(`[onclick="openDoc('${o.no}','ci')"]`), "Commercial Invoice indirilebilir");
      const ci = docHtml(o.no, "ci");
      ok(ci.includes(money(expected, "USD", 2)), `Commercial Invoice toplamı ${money(expected, "USD", 2)}`);
      location.hash = "#/customer/orders"; await tick(400);
      ok(ORDERS.filter((x) => x.cust === o.cust).length === 1 && !$("#view").innerText.includes("ABC Distribution"), "müşteri sadece kendi siparişini görüyor");
    }
  } catch (e) { ok(false, "HATA: " + (e.message || e)); }
  finish();
})();
