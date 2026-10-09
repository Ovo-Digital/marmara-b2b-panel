// Giriş / üye ol — demo: hesaplar tarayıcıda tutulur (gerçek sistemde sunucuda doğrulanacak).
// Rol: admin → tüm panel (görünümler arası geçiş), customer → sadece müşteri portalı, factory → sadece fabrika.

const ACCOUNTS = [
  { u: "admin", p: "senso2026", role: "admin", name: "Volkan Koçkan", title: "Super Admin" },
  { u: "ferhat", p: "senso2026", role: "admin", name: "Ferhat Şahin", title: "İhracat Bölge Müdürü", dash: "sales" },
  { u: "gozde", p: "senso2026", role: "admin", name: "Gözde", title: "Export Manager / Final Approver", dash: "approve" },
  { u: "abc", p: "abc2026", role: "customer", cust: "C-1021", name: "John Smith", title: "ABC Distribution GmbH" },
  { u: "fabrika", p: "fabrika2026", role: "factory", name: "Düzce Fabrika", title: "Fabrika · Hazırlık" },
];
const AUTH_KEY = "mbSession", REGS_KEY = "mbRegs";
const HOME = { admin: "admin/dashboard", customer: "customer/dashboard", factory: "factory/queue" };
let authView = "login";

const authGet = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
const authSet = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };
const authSession = () => authGet(AUTH_KEY, null);
const authRegs = () => authGet(REGS_KEY, []);

// Bu tarayıcıda kayıt olan müşteriler listeye eklenir (onay durumu ve seviye korunur)
authRegs().forEach((r) => { if (!CUSTOMERS.some((c) => c.id === r.cust.id)) CUSTOMERS.push(r.cust); });
function authSyncCustomer(c) {
  const regs = authRegs(), r = regs.find((x) => x.cust.id === c.id);
  if (r) { r.cust = { ...c }; authSet(REGS_KEY, regs); }
}

function authGuard() {
  const s = authSession();
  document.body.classList.toggle("auth-on", !s);
  if (!s) { authRender(); return false; }
  $("#auth").innerHTML = "";
  const { mode } = parse();
  if (s.role !== "admin" && mode !== s.role) { location.replace("#/" + HOME[s.role]); return false; }
  if (s.role === "customer") ME = s.cust;
  if (s.dash && !state.dashSet) { state.dashRole = s.dash; state.dashSet = true; }
  return true;
}

function authLogin() {
  const u = $("#auU").value.trim().toLocaleLowerCase("tr"), p = $("#auP").value;
  const err = (m) => { $("#auErr").textContent = m; $("#auErr").style.display = "block"; };
  const acc = ACCOUNTS.find((a) => a.u === u && a.p === p);
  const reg = authRegs().find((r) => r.u === u && r.p === p);
  if (!acc && !reg) return err("Kullanıcı adı veya şifre hatalı");
  if (reg) {
    const c = C(reg.cust.id) || reg.cust;
    if (c.status !== "Active") return err("Hesabınız onay bekliyor. Onaylanınca giriş yapabilirsiniz.");
    authSet(AUTH_KEY, { u, role: "customer", cust: c.id, name: c.contact, title: c.name });
  } else authSet(AUTH_KEY, { u: acc.u, role: acc.role, cust: acc.cust, name: acc.name, title: acc.title, dash: acc.dash });
  const s = authSession();
  state.dashSet = false;
  if (location.hash.replace(/^#\/?/, "").startsWith(s.role) || s.role === "admin") render(); else location.hash = "#/" + HOME[s.role];
  if (!location.hash) location.hash = "#/" + HOME[s.role];
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
      <details class="auth-demo"><summary>Demo hesaplar</summary>
        ${ACCOUNTS.map((a) => `<button onclick="authFill('${a.u}','${a.p}')"><b>${a.u}</b><span>${a.title}</span><code class="notranslate">${a.p}</code></button>`).join("")}
      </details>
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
        ${s("Company type", "rgType", ["Distributor", "Wholesaler", "Barber Chain", "Retail Chain"])}<div class="field"><label>Instagram</label><input class="input" id="rgIg" placeholder="@hesabiniz"></div>
        <div class="field span2"><label>Web siteniz var mı?</label><div class="seg" style="max-width:260px"><button type="button" id="rgWebY" onclick="authWeb(true)">Evet</button><button type="button" id="rgWebN" class="on" onclick="authWeb(false)">Hayır</button></div></div>
        <div class="field span2" id="rgWebBox" style="display:none"><label>Web sitesi adresi *</label><input class="input" id="rgWeb" type="url" placeholder="https://www.ornek.com"></div>
        ${f("Contact name", "rgContact", "text", 1)}${f("Position", "rgPos")}
        ${f("Business email", "rgEmail", "email", 1)}${f("WhatsApp / Phone", "rgPhone")}
        <div class="field span2"><label>Interested brands</label><div class="checks">${["Barber Marmara", "Marmara", "Noir"].map((b) => `<label><input type="checkbox" class="rgBrand" value="${b}" checked>${b}</label>`).join("")}</div></div>
        ${f("Password", "rgPw", "password", 1)}${f("Confirm password", "rgPw2", "password", 1)}
      </div>
      <div class="auth-err" id="auErr"></div>
      <button class="btn primary block lg mt" onclick="authRegister()">Başvuruyu gönder</button>
    </div>`;
  } else card = `
    <div class="auth-card">
      <div class="auth-done">${ic("check")}</div>
      <h1>Başvurunuz alındı</h1>
      ${stepper(1, ["Başvuru", "İnceleme", "Onay"])}
      <div class="notice info mt">${ic("info")}<span>Hesabınız onay bekliyor. Ekibimiz onayladığında aynı e-posta ve şifreyle giriş yapabilirsiniz.</span></div>
      <button class="btn primary block lg mt" onclick="authView='login';authRender()">Giriş ekranına dön</button>
    </div>`;
  box.innerHTML = `<div class="auth">${brand}<div class="auth-main">${authLangs()}${card}</div></div>`;
  setTimeout(() => $("#auU")?.focus(), 30);
}

function authWeb(yes) {
  $("#rgWebY").classList.toggle("on", yes); $("#rgWebN").classList.toggle("on", !yes);
  $("#rgWebBox").style.display = yes ? "" : "none"; if (yes) $("#rgWeb").focus();
}
function authRegister() {
  const v = (id) => $("#" + id).value.trim();
  const err = (m) => { $("#auErr").textContent = m; $("#auErr").style.display = "block"; };
  if (!v("rgName") || !v("rgVat") || !v("rgContact") || !v("rgEmail") || !v("rgPw")) return err("Please fill all required fields");
  if (v("rgPw") !== v("rgPw2")) return err("Passwords do not match");
  const hasWeb = $("#rgWebY").classList.contains("on");
  if (hasWeb && !/^(https?:\/\/)?[\w-]+(\.[\w-]+)+/.test(v("rgWeb"))) return err("Geçerli bir web sitesi adresi girin");
  const email = v("rgEmail").toLocaleLowerCase("tr");
  if (authRegs().some((r) => r.u === email) || ACCOUNTS.some((a) => a.u === email)) return err("Bu e-posta ile zaten bir başvuru var");
  const country = v("rgCountry");
  const flags = { Germany: "🇩🇪", France: "🇫🇷", Sweden: "🇸🇪", USA: "🇺🇸", UAE: "🇦🇪", "Saudi Arabia": "🇸🇦", Lithuania: "🇱🇹", Romania: "🇷🇴" };
  const cust = { id: "A-0" + (100 + CUSTOMERS.length), name: v("rgName"), country, flag: flags[country], city: v("rgCity") || "—", type: v("rgType"), sales: "", level: 1, currency: "USD", payment: "", incoterm: "", status: "Pending", ytd: 0, lastOrder: "—", balance: 0, forecast: 0,
    contact: v("rgContact"), email, vat: v("rgVat"), brands: [...document.querySelectorAll(".rgBrand:checked")].map((b) => b.value).join(" / "), applied: fmtDate(new Date()), phone: v("rgPhone") || "—", position: v("rgPos") || "—", website: hasWeb ? v("rgWeb") : "Yok", instagram: v("rgIg").replace(/^@?/, v("rgIg") ? "@" : "") || "—" };
  CUSTOMERS.push(cust);
  authSet(REGS_KEY, [...authRegs(), { u: email, p: v("rgPw"), cust }]);
  authView = "done"; authRender();
}
