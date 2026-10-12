// Giriş / üye ol — şifreler sunucuda (/api/auth) kontrol edilir; başarılı girişte imzalı oturum anahtarı saklanır.
// Rol: admin → yalnız admin paneli, customer → yalnız müşteri portalı (paneller ayrı).
// Panele aktarılan müşteri e-postasıyla ilk kez girince yeni şifre belirleme ekranına yönlendirilir.

// Çalışan listesi (yalnız ad/unvan — şifreler bu dosyada yok)
const ACCOUNTS = [
  { u: "admin", role: "admin", name: "Volkan Koçkan", title: "Super Admin" },
  { u: "ferhat", role: "admin", name: "Ferhat Şahin", title: "İhracat Bölge Müdürü", dash: "sales" },
  { u: "gozde", role: "admin", name: "Gözde", title: "Export Manager / Final Approver", dash: "approve" },
];
const AUTH_KEY = "mbSession", REGS_KEY = "mbRegs";
const HOME = { admin: "admin/dashboard", customer: "customer/dashboard" };
let authView = "login";

const authGet = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
const authSet = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };
const authSession = () => { const s = authGet(AUTH_KEY, null); return s && HOME[s.role] && s.token ? s : null; };   // anahtarsız eski oturum / kaldırılmış rol geçersiz → yeniden giriş
let authPending = null;   // şifre belirleme ekranı için { u, company }
async function authApi(body) {
  const r = await fetch(authUrl(), { method: "POST", cache: "no-store", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const j = await r.json().catch(() => ({}));
  if (r.status >= 500) throw new Error(j.error || r.status);
  return { status: r.status, ...j };
}
// oturum açıldı: anahtarı sakla, depoyu yükle, kendi paneline git
async function authStart(r) {
  authSet(AUTH_KEY, { ...r.session, token: r.token });
  STORE.ready = storeInit(); await STORE.ready;
  const s = authSession();
  state.dashSet = false;
  if (location.hash.replace(/^#\/?/, "").startsWith(s.role)) render(); else location.hash = "#/" + HOME[s.role];
}
function authExpired(status) {
  try { localStorage.removeItem(AUTH_KEY); } catch {}
  clearInterval(STORE.poll); STORE.online = false;
  authView = "login"; render();
  setTimeout(() => toast(status === 403 ? "Hesabınız pasif durumda" : "Oturum süreniz doldu, tekrar giriş yapın", "alert"), 50);
}

function authSyncCustomer() {}   // müşteri kaydı artık ortak depoyla eşitleniyor

function authGuard() {
  const s = authSession();
  document.body.classList.toggle("auth-on", !s);
  if (!s) { authRender(); return false; }
  $("#auth").innerHTML = "";
  const { mode } = parse();
  if (mode !== s.role) { location.replace("#/" + HOME[s.role]); return false; }   // admin ve müşteri panelleri ayrı: herkes yalnız kendi paneline girer
  if (s.role === "customer") ME = s.cust;
  if (s.dash && !state.dashSet) { state.dashRole = s.dash; state.dashSet = true; }
  return true;
}

async function authLogin() {
  state.cart = {}; state.actAs = null;   // her girişte boş sepet
  const u = $("#auU").value.trim().toLocaleLowerCase("tr"), p = $("#auP").value;
  const err = (m) => { $("#auErr").className = "auth-err"; $("#auErr").textContent = m; $("#auErr").style.display = "block"; };
  if (!u) return err("Kullanıcı adı veya şifre hatalı");
  let r; try { r = await authApi({ action: "login", u, p }); } catch { return err("Bağlantı kurulamadı, lütfen tekrar deneyin"); }
  if (r.setPassword) { authPending = { u, company: r.company }; authView = "setpw"; return authRender(); }
  if (r.pending) {
    const box = $("#auErr"); box.className = "auth-err pending"; box.style.display = "flex";
    box.innerHTML = `${ic("clock")}<span><b>Bilgileriniz doğru.</b> Başvurunuz ekibimiz tarafından inceleniyor; onaylandığında bu bilgilerle giriş yapabilirsiniz.</span>`;
    return;
  }
  if (r.inactive) return err("Hesabınız pasif durumda. Lütfen satış temsilcinizle iletişime geçin.");
  if (!r.token) return err("Kullanıcı adı veya şifre hatalı");
  await authStart(r);
}
// panele aktarılmış müşteri: ilk girişte yeni şifre
async function authSetPw() {
  const p = $("#spP").value, p2 = $("#spP2").value;
  const err = (m) => { $("#auErr").textContent = m; $("#auErr").style.display = "block"; };
  if (p.length < 8) return err("Şifre en az 8 karakter olmalı");
  if (p !== p2) return err("Şifreler aynı değil");
  let r; try { r = await authApi({ action: "setPassword", u: authPending.u, p }); } catch { return err("Bağlantı kurulamadı, lütfen tekrar deneyin"); }
  if (r.status === 409) { authView = "login"; authRender(); return setTimeout(() => toast("Bu hesabın şifresi zaten belirlenmiş — giriş yapın", "info"), 50); }
  if (!r.token) return err(r.error === "inactive" ? "Hesabınız pasif durumda. Lütfen satış temsilcinizle iletişime geçin." : "Şifre kaydedilemedi");
  authPending = null; await authStart(r);
}
function authLogout() {
  try { localStorage.removeItem(AUTH_KEY); } catch {}
  authView = "login";
  if (typeof rvOn !== "undefined" && rvOn) rvToggle();
  history.replaceState(null, "", location.pathname);
  render();
}

function authLangs() {
  if (typeof LANGS === "undefined") return "";
  return `<div class="auth-langs notranslate">${LANGS.map(([k]) => `<button class="${k === LANG ? "on" : ""}" onclick="setLang('${k}');authRender()">${k.toUpperCase()}</button>`).join("")}</div>`;
}
function authFill(u, p) { $("#auU").value = u; $("#auP").value = p; $("#auErr").style.display = "none"; }

function authRender() {
  const box = $("#auth");
  const brand = `<div class="auth-brand"><img src="senso-logo.png" alt="Senso Cosmetics"><span>B2B</span></div>`;
  let card = "";
  if (authView === "login") card = `
    <div class="auth-card">
      <h1>Giriş yap</h1>
      <div class="form">
        <div class="field"><label>Kullanıcı adı veya e-posta</label><input class="input" id="auU" autocomplete="username" onkeydown="if(event.key==='Enter')$('#auP').focus()"></div>
        <div class="field"><label>Şifre</label><input class="input" id="auP" type="password" autocomplete="current-password" onkeydown="if(event.key==='Enter')authLogin()"></div>
        <div class="auth-err" id="auErr"></div>
        <button class="btn primary block lg" onclick="authLogin()">Giriş yap</button>
        <a class="auth-link" onclick="toast('Şifre sıfırlama bağlantısı e-postanıza gönderildi','send')">Şifremi unuttum</a>
      </div>
      <div class="auth-or"><span>Hesabınız yok mu?</span></div>
      <button class="btn block lg" onclick="authView='register';authRender()">Üye ol</button>
    </div>`;
  else if (authView === "register") {
    const f = (l, id, t = "text", req) => `<div class="field"><label>${l}${req ? " *" : ""}</label><input class="input" id="${id}" type="${t}"></div>`;
    const s = (l, id, opts) => `<div class="field"><label>${l}</label><select class="input" id="${id}">${opts.map((o) => `<option value="${o}">${o}</option>`).join("")}</select></div>`;
    card = `
    <div class="auth-card wide">
      <a class="auth-back" onclick="authView='login';authRender()">${ic("chevL")} Giriş</a>
      <h1>B2B hesabı oluşturun</h1>
      <div class="form cols2">
        ${f("Company name", "rgName", "text", 1)}${s("Country", "rgCountry", ["Germany", "France", "Sweden", "USA", "UAE", "Saudi Arabia", "Lithuania", "Romania"])}
        ${f("City", "rgCity")}${f("Tax / VAT number", "rgVat", "text", 1)}
        <div class="field span2"><label>Billing address *</label><textarea class="input" id="rgAddr" rows="2" placeholder="Street, no, postal code, city, country"></textarea></div>
        <div class="field span2"><label>Delivery address *</label><label class="checks" style="margin:0 0 6px"><label><input type="checkbox" id="rgSame" onchange="$('#rgShip').disabled=this.checked;if(this.checked)$('#rgShip').value=$('#rgAddr').value"> Same as billing address</label></label><textarea class="input" id="rgShip" rows="2" placeholder="Street, no, postal code, city, country"></textarea></div>
        ${s("Company type", "rgType", ["Distributor", "Wholesaler", "Barber Chain", "Retail Chain"])}<div class="field"><label>Instagram</label><input class="input" id="rgIg" placeholder="@hesabiniz"></div>
        <div class="field span2"><label>Web siteniz var mı?</label><div class="seg" style="max-width:260px"><button type="button" id="rgWebY" onclick="authWeb(true)">Evet</button><button type="button" id="rgWebN" class="on" onclick="authWeb(false)">Hayır</button></div></div>
        <div class="field span2" id="rgWebBox" style="display:none"><label>Web sitesi adresi *</label><input class="input" id="rgWeb" type="url" placeholder="https://www.ornek.com"></div>
        ${f("Contact name", "rgContact", "text", 1)}${f("Position", "rgPos")}
        ${f("Business email", "rgEmail", "email", 1)}${f("WhatsApp / Phone", "rgPhone")}
        <div class="field span2"><label>Interested brands</label><div class="checks">${["Barber Marmara", "Marmara", "Noir"].map((b) => `<label><input type="checkbox" class="rgBrand" value="${b}" checked>${b}</label>`).join("")}</div></div>
        ${f("Password", "rgPw", "password", 1)}${f("Confirm password", "rgPw2", "password", 1)}
      </div>
      <div class="consents notranslate">${(LANG === "tr" ? [
        `<a onclick="event.preventDefault();legalOpen('kvkk')">KVKK Aydınlatma Metni</a>’ni ve <a onclick="event.preventDefault();legalOpen('privacy')">Gizlilik Politikası</a>’nı okudum. *`,
        `<a onclick="event.preventDefault();legalOpen('terms')">Kullanım Koşulları</a>’nı kabul ediyorum. *`,
        `Kampanya ve ürün duyurularını almak için <a onclick="event.preventDefault();legalOpen('consent')">Açık Rıza Metni</a> kapsamında onay veriyorum. (isteğe bağlı)`] : [
        `I have read the <a onclick="event.preventDefault();legalOpen('kvkk')">Data Protection Notice</a> and the <a onclick="event.preventDefault();legalOpen('privacy')">Privacy Policy</a>. *`,
        `I accept the <a onclick="event.preventDefault();legalOpen('terms')">Terms of Use</a>. *`,
        `I agree to receive campaign and product announcements under the <a onclick="event.preventDefault();legalOpen('consent')">Explicit Consent</a> text. (optional)`]).map((t, i) => `<label><input type="checkbox" id="${["cKvkk", "cTerms", "cMkt"][i]}"><span>${t}</span></label>`).join("")}
      </div>
      <div class="auth-err" id="auErr"></div>
      <button class="btn primary block lg mt" onclick="authRegister()">Başvuruyu gönder</button>
    </div>`;
  } else if (authView === "setpw") card = `
    <div class="auth-card">
      <h1>Yeni şifre belirleyin</h1>
      <p class="muted" style="margin:-4px 0 18px;line-height:1.5"><b class="notranslate">${(authPending?.company || "").replace(/</g, "&lt;")}</b> — Hesabınız yeni B2B portalımıza taşındı. Devam etmek için kendinize bir şifre belirleyin.</p>
      <div class="form">
        <div class="field"><label>E-posta</label><input class="input notranslate" value="${(authPending?.u || "").replace(/"/g, "&quot;")}" disabled></div>
        <div class="field"><label>Yeni şifre</label><input class="input" id="spP" type="password" autocomplete="new-password" placeholder="En az 8 karakter"></div>
        <div class="field"><label>Yeni şifre (tekrar)</label><input class="input" id="spP2" type="password" autocomplete="new-password" onkeydown="if(event.key==='Enter')authSetPw()"></div>
        <div class="auth-err" id="auErr"></div>
        <button class="btn primary block lg" onclick="authSetPw()">Şifreyi kaydet ve giriş yap</button>
        <a class="auth-link" onclick="authView='login';authPending=null;authRender()">${ic("chevL")} Girişe dön</a>
      </div>
    </div>`;
  else card = `
    <div class="auth-card">
      <div class="auth-done">${ic("check")}</div>
      <h1>Başvurunuz alındı</h1>
      ${stepper(1, ["Başvuru", "İnceleme", "Onay"])}
      <div class="notice info mt">${ic("info")}<span>Hesabınız onay bekliyor. Ekibimiz onayladığında aynı e-posta ve şifreyle giriş yapabilirsiniz.</span></div>
      <button class="btn primary block lg mt" onclick="authView='login';authRender()">Giriş ekranına dön</button>
    </div>`;
  box.innerHTML = `<div class="auth">${brand}<div class="auth-main">${authLangs()}${card}${legalLinks()}</div></div>`;
  setTimeout(() => ($("#auU") || $("#spP"))?.focus(), 30);
}

function authWeb(yes) {
  $("#rgWebY").classList.toggle("on", yes); $("#rgWebN").classList.toggle("on", !yes);
  $("#rgWebBox").style.display = yes ? "" : "none"; if (yes) $("#rgWeb").focus();
}
async function authRegister() {
  const v = (id) => $("#" + id).value.trim();
  const err = (m) => { $("#auErr").textContent = m; $("#auErr").style.display = "block"; };
  const ship = $("#rgSame").checked ? v("rgAddr") : v("rgShip");
  if (!v("rgName") || !v("rgAddr") || !ship || !v("rgVat") || !v("rgContact") || !v("rgEmail") || !v("rgPw")) return err("Please fill all required fields");
  if (v("rgPw") !== v("rgPw2")) return err("Passwords do not match");
  if (!$("#cKvkk").checked || !$("#cTerms").checked) return err("Devam etmek için Aydınlatma Metni ve Kullanım Koşulları onayı gerekli");
  const hasWeb = $("#rgWebY").classList.contains("on");
  if (hasWeb && !/^(https?:\/\/)?[\w-]+(\.[\w-]+)+/.test(v("rgWeb"))) return err("Geçerli bir web sitesi adresi girin");
  const email = v("rgEmail").toLocaleLowerCase("tr");
  const country = v("rgCountry");
  const flags = { Germany: "🇩🇪", France: "🇫🇷", Sweden: "🇸🇪", USA: "🇺🇸", UAE: "🇦🇪", "Saudi Arabia": "🇸🇦", Lithuania: "🇱🇹", Romania: "🇷🇴" };
  const cust = { name: v("rgName"), country, flag: flags[country], city: v("rgCity") || "—", address: v("rgAddr"), shipAddress: ship, type: v("rgType"), sales: "", currency: "USD", payment: "", incoterm: "", ytd: 0, lastOrder: "—", balance: 0, forecast: 0,
    contact: v("rgContact"), vat: v("rgVat"), brands: [...document.querySelectorAll(".rgBrand:checked")].map((b) => b.value).join(" / "), applied: fmtDate(new Date()), phone: v("rgPhone") || "—", position: v("rgPos") || "—", website: hasWeb ? v("rgWeb") : "Yok", instagram: v("rgIg").replace(/^@?/, v("rgIg") ? "@" : "") || "—",
    consents: { version: LEGAL_VERSION, kvkk: new Date().toISOString(), terms: new Date().toISOString(), marketing: $("#cMkt").checked ? new Date().toISOString() : null } };
  let r; try { r = await authApi({ action: "register", u: email, p: v("rgPw"), cust }); } catch { return err("Bağlantı kurulamadı, lütfen tekrar deneyin"); }
  if (r.status === 409) return err("Bu e-posta ile zaten bir başvuru var");
  if (!r.ok) return err("Başvuru gönderilemedi");
  authView = "done"; authRender();
}
