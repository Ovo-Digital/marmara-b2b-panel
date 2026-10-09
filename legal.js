// Yasal metinler — KVKK (6698), GDPR (AB 2016/679), 6563 sayılı Kanun, çerez bilgilendirmesi, kullanım koşulları.
// Şirket bilgileri doldurulana kadar [KÖŞELİ PARANTEZ] alanlar sarı vurguyla görünür. Yayından önce hukukçu kontrolü önerilir.

const LEGAL_VERSION = "1.0";
const LEGAL_DATE = { tr: "9 Ekim 2026", en: "9 October 2026" };
const CO = {
  name: "[ŞİRKET TİCARET UNVANI]",
  brand: "Senso Cosmetics",
  address: "[AÇIK ADRES], Düzce / Türkiye",
  mersis: "[MERSİS NO]",
  tax: "[VERGİ DAİRESİ / VERGİ NO]",
  email: "[KVKK BAŞVURU E-POSTASI]",
  kep: "[KEP ADRESİ]",
  phone: "[TELEFON]",
  site: "marmara-b2b-panel.vercel.app",
};
const ph = (s) => (s.startsWith("[") ? `<mark class="legal-ph">${s}</mark>` : s);
const C_ = Object.fromEntries(Object.entries(CO).map(([k, v]) => [k, v.replace(/\[[^\]]+\]/g, (m) => ph(m))]));

const LEGAL = {
  kvkk: {
    title: { tr: "KVKK Aydınlatma Metni", en: "Personal Data Protection Notice (KVKK)" },
    tr: () => `
<p>${C_.name} (“Şirket”) olarak, ${C_.brand} B2B platformu (“Platform”) üzerinden işlenen kişisel verilerinizin güvenliğine önem veriyoruz. Bu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) md. 10 ve Aydınlatma Yükümlülüğünün Yerine Getirilmesinde Uyulacak Usul ve Esaslar Hakkında Tebliğ uyarınca, <b>veri sorumlusu</b> sıfatıyla sizi bilgilendirmek amacıyla hazırlanmıştır.</p>

<h3>1. Veri Sorumlusu</h3>
<p>${C_.name}<br>Adres: ${C_.address}<br>MERSİS: ${C_.mersis} · ${C_.tax}<br>E-posta: ${C_.email} · KEP: ${C_.kep}</p>

<h3>2. İşlenen Kişisel Veriler</h3>
<ul>
<li><b>Kimlik:</b> ad, soyad, unvan/pozisyon.</li>
<li><b>İletişim:</b> iş e-postası, telefon / WhatsApp numarası, şirket adresi, web sitesi ve Instagram hesabı.</li>
<li><b>Müşteri işlem:</b> sipariş, teklif, proforma, fatura, ödeme ve sevkiyat bilgileri, sipariş notları, ilgilenilen markalar.</li>
<li><b>İşlem güvenliği:</b> kullanıcı adı, şifre (geri döndürülemez biçimde), oturum ve işlem kayıtları, IP adresi.</li>
<li><b>Talep / şikâyet:</b> Platform üzerinden ilettiğiniz geri bildirim ve revize notları.</li>
<li><b>Pazarlama:</b> yalnızca açık rıza vermeniz hâlinde, kampanya ve ürün duyurusu tercihleriniz.</li>
</ul>
<p>Vergi numarası, ticaret unvanı gibi tüzel kişiye ait bilgiler kişisel veri değildir; ancak şirket yetkilisi olarak paylaştığınız bilgiler KVKK kapsamındadır.</p>

<h3>3. İşleme Amaçları</h3>
<ul>
<li>B2B üyelik başvurusunun değerlendirilmesi, hesabın açılması ve yönetimi,</li>
<li>siparişlerin alınması, fiyatlandırılması, onaylanması, hazırlanması ve sevk edilmesi,</li>
<li>proforma, packing list ve fatura düzenlenmesi; ödeme ve cari takibi,</li>
<li>satış, müşteri ilişkileri ve satış sonrası destek süreçlerinin yürütülmesi,</li>
<li>yasal yükümlülüklerin (vergi, ticaret, gümrük, ihracat mevzuatı) yerine getirilmesi,</li>
<li>bilgi güvenliğinin sağlanması, yetkisiz erişimin önlenmesi ve denetim kayıtlarının tutulması,</li>
<li>açık rızanız varsa kampanya, yeni ürün ve etkinlik duyurularının iletilmesi.</li>
</ul>

<h3>4. Toplama Yöntemi ve Hukuki Sebepler</h3>
<p>Kişisel verileriniz; Platform üzerindeki üyelik ve sipariş formları, e-posta, telefon ve yazışmalar aracılığıyla, kısmen otomatik yollarla elektronik ortamda toplanır. Verileriniz KVKK md. 5/2 kapsamında:</p>
<ul>
<li><b>(c)</b> bir sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması (üyelik ve satış ilişkisi),</li>
<li><b>(ç)</b> veri sorumlusunun hukuki yükümlülüğünü yerine getirebilmesi (VUK, TTK, gümrük mevzuatı),</li>
<li><b>(e)</b> bir hakkın tesisi, kullanılması veya korunması,</li>
<li><b>(f)</b> temel hak ve özgürlüklerinize zarar vermemek kaydıyla Şirketin meşru menfaati (bilgi güvenliği, platform iyileştirme)</li>
</ul>
<p>hukuki sebeplerine dayanılarak işlenir. Pazarlama iletileri ise yalnızca md. 5/1 uyarınca <b>açık rızanıza</b> dayanır ve rıza vermemeniz üyeliğinizi etkilemez.</p>

<h3>5. Aktarım</h3>
<p>Kişisel verileriniz, yukarıdaki amaçlarla sınırlı olarak; kanunen yetkili kamu kurum ve kuruluşlarına (vergi daireleri, gümrük idaresi, yargı mercileri), lojistik/kargo ve gümrük müşavirliği firmalarına, bankalara, mali müşavir ve denetim şirketlerine ve Platformun barındırma ve yazılım hizmetlerini sağlayan iş ortaklarına aktarılabilir.</p>
<p><b>Yurt dışına aktarım:</b> Platform, sunucuları yurt dışında bulunan hizmet sağlayıcılar (barındırma: Vercel Inc., kayıt yönetimi: GitHub Inc., yazı tipi: Google LLC) üzerinden çalışmaktadır. Bu aktarımlar KVKK md. 9 kapsamında, Kurul tarafından ilan edilen <b>standart sözleşmeler</b> veya diğer uygun güvenceler sağlanarak gerçekleştirilir; bu güvencelerin bulunmadığı hâllerde aktarım yalnızca arızi ve md. 9/6’da sayılan şartlarla yapılır.</p>

<h3>6. Saklama Süresi</h3>
<p>Verileriniz işleme amacının gerektirdiği süre ve ilgili mevzuatta öngörülen süreler boyunca saklanır: ticari defter ve belgeler için 10 yıl (TTK md. 82), vergi kayıtları için 5 yıl (VUK md. 253), üyelik kayıtları üyelik süresi ve sona ermesinden itibaren 10 yıl (zamanaşımı). Onaylanmayan başvurular 1 yıl sonunda silinir. Süre sonunda veriler silinir, yok edilir veya anonim hâle getirilir.</p>

<h3>7. Haklarınız (KVKK md. 11)</h3>
<p>Kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme, aktarıldığı üçüncü kişileri bilme, eksik veya yanlış işlenmişse düzeltilmesini, KVKK md. 7 şartları çerçevesinde silinmesini veya yok edilmesini ve bu işlemlerin aktarıldığı kişilere bildirilmesini isteme, münhasıran otomatik sistemlerle analiz edilmesi sonucu aleyhinize bir sonuca itiraz etme ve kanuna aykırı işleme nedeniyle zarara uğramanız hâlinde zararın giderilmesini talep etme haklarına sahipsiniz.</p>

<h3>8. Başvuru</h3>
<p>Taleplerinizi, Veri Sorumlusuna Başvuru Usul ve Esasları Hakkında Tebliğ uyarınca kimliğinizi doğrulayan bilgilerle birlikte; ${C_.address} adresine yazılı olarak, ${C_.kep} KEP adresine ya da sistemimizde kayıtlı e-posta adresinizden ${C_.email} adresine iletebilirsiniz. Başvurunuz en geç <b>30 gün</b> içinde ücretsiz olarak sonuçlandırılır.</p>
<p class="legal-meta">Sürüm ${LEGAL_VERSION} · Son güncelleme: ${LEGAL_DATE.tr}</p>`,
    en: () => `
<p>This notice is provided by ${C_.name} (“Company”), as <b>data controller</b>, under Article 10 of the Turkish Personal Data Protection Law No. 6698 (“KVKK”). Customers located in the EU/EEA should also read our <a onclick="legalOpen('privacy')">Privacy Policy (GDPR)</a>.</p>
<h3>1. Data Controller</h3><p>${C_.name}, ${C_.address} · MERSIS ${C_.mersis} · ${C_.email} · ${C_.kep}</p>
<h3>2. Data We Process</h3><p>Identity (name, title), contact (business email, phone/WhatsApp, address, website, Instagram), customer transaction data (orders, proformas, invoices, payments, shipments, notes), transaction security data (username, hashed password, session logs, IP address), feedback you submit, and — only with your consent — marketing preferences.</p>
<h3>3. Purposes</h3><p>Evaluating B2B applications and managing accounts; receiving, pricing, approving, preparing and shipping orders; issuing proformas, packing lists and invoices; payment and account tracking; customer relations and support; compliance with tax, trade, customs and export laws; information security; and, with consent, sending campaign and product announcements.</p>
<h3>4. Legal Grounds</h3><p>KVKK Art. 5/2 (c) performance of a contract, (ç) legal obligation, (e) establishment, exercise or protection of a right, (f) legitimate interest; marketing communications rely solely on your explicit consent (Art. 5/1).</p>
<h3>5. Transfers</h3><p>To authorised public authorities, logistics and customs brokers, banks, accountants/auditors and IT service providers. The Platform is hosted by providers located abroad (Vercel Inc., GitHub Inc., Google LLC); such transfers are made under KVKK Art. 9 using standard contractual clauses or other appropriate safeguards.</p>
<h3>6. Retention</h3><p>As long as required by the purpose and by law: commercial records 10 years (Turkish Commercial Code), tax records 5 years (Tax Procedure Law); unapproved applications are deleted after 1 year.</p>
<h3>7. Your Rights</h3><p>Under KVKK Art. 11 you may request information about the processing of your data, its correction or deletion, learn the recipients, object to automated decisions against you and claim compensation. Requests: ${C_.email} or ${C_.kep}. We respond free of charge within 30 days.</p>
<p class="legal-meta">Version ${LEGAL_VERSION} · Last updated: ${LEGAL_DATE.en}</p>`,
  },

  privacy: {
    title: { tr: "Gizlilik Politikası", en: "Privacy Policy (GDPR)" },
    en: () => `
<p>This Privacy Policy explains how ${C_.name} (“we”) processes personal data of business customers and their representatives on the ${C_.brand} B2B platform, in accordance with the EU General Data Protection Regulation 2016/679 (“GDPR”) and the Turkish Law No. 6698.</p>
<h3>1. Controller</h3><p>${C_.name}, ${C_.address}. Contact: ${C_.email}. Where required under Art. 27 GDPR, our EU representative is: <mark class="legal-ph">[EU REPRESENTATIVE, IF APPOINTED]</mark>.</p>
<h3>2. Categories of Data</h3><p>Contact person identity and contact details (name, position, business email, phone/WhatsApp, company website and Instagram), account credentials, order and invoicing data, payment status, shipment data, feedback and support messages, technical data (IP address, session logs).</p>
<h3>3. Purposes and Legal Bases (Art. 6 GDPR)</h3>
<ul>
<li>Account application, order handling, invoicing and delivery — <b>contract</b> (Art. 6(1)(b));</li>
<li>Tax, accounting, customs and export record keeping — <b>legal obligation</b> (Art. 6(1)(c));</li>
<li>Platform security, fraud prevention, service improvement and B2B customer relations — <b>legitimate interests</b> (Art. 6(1)(f));</li>
<li>Marketing emails and product announcements — <b>consent</b> (Art. 6(1)(a)), which you may withdraw at any time.</li>
</ul>
<h3>4. Recipients</h3><p>Logistics providers and customs brokers, banks and payment providers, accountants and auditors, public authorities where legally required, and our processors: Vercel Inc. (hosting), GitHub Inc. (feedback records), Google LLC (web fonts). Processors act under data processing agreements.</p>
<h3>5. International Transfers</h3><p>Your data is processed in Türkiye and by processors in the United States. Transfers outside the EEA rely on the European Commission’s Standard Contractual Clauses and, where applicable, the EU–U.S. Data Privacy Framework.</p>
<h3>6. Retention</h3><p>We keep data for the duration of the business relationship and thereafter as long as required by law (generally 10 years for commercial records, 5 years for tax records). Rejected applications are deleted after 1 year.</p>
<h3>7. Your Rights</h3><p>You have the right to access, rectification, erasure, restriction of processing, data portability and to object (Arts. 15–21 GDPR), and to withdraw consent at any time without affecting prior processing. You may lodge a complaint with your local supervisory authority. Contact: ${C_.email}.</p>
<h3>8. Security</h3><p>We apply appropriate technical and organisational measures, including encrypted connections (HTTPS), role-based access, and audit logs of critical actions.</p>
<p class="legal-meta">Version ${LEGAL_VERSION} · Last updated: ${LEGAL_DATE.en}</p>`,
    tr: () => `
<p>Bu Gizlilik Politikası, ${C_.brand} B2B platformunda iş müşterilerimizin ve yetkililerinin kişisel verilerinin nasıl korunduğunu özetler. KVKK kapsamındaki ayrıntılı bilgilendirme için <a onclick="legalOpen('kvkk')">KVKK Aydınlatma Metni</a>’ni inceleyiniz. AB/AEA’da bulunan müşterilerimiz için verileri ayrıca AB Genel Veri Koruma Tüzüğü (GDPR) kapsamında işlenir.</p>
<h3>Özet</h3>
<ul>
<li>Verilerinizi yalnızca üyelik, sipariş, faturalama, sevkiyat, yasal yükümlülük ve güvenlik amaçlarıyla işleriz.</li>
<li>Pazarlama iletileri yalnızca açık rızanızla gönderilir; rızanızı dilediğiniz an geri alabilirsiniz.</li>
<li>Verileriniz satılmaz; yalnızca hizmetin gerektirdiği iş ortaklarıyla (lojistik, banka, barındırma) paylaşılır.</li>
<li>Bağlantılar HTTPS ile şifrelenir, panel erişimi rol bazlı yetkilendirilir, kritik işlemler kayıt altına alınır.</li>
<li>Erişim, düzeltme, silme, itiraz ve taşınabilirlik haklarınız için: ${C_.email}</li>
</ul>
<p class="legal-meta">Sürüm ${LEGAL_VERSION} · Son güncelleme: ${LEGAL_DATE.tr}</p>`,
  },

  consent: {
    title: { tr: "Açık Rıza Metni", en: "Explicit Consent" },
    tr: () => `
<p>${C_.name} tarafından, <a onclick="legalOpen('kvkk')">KVKK Aydınlatma Metni</a> kapsamında bilgilendirildim. Bu kapsamda;</p>
<ul>
<li>ad, soyad, e-posta ve telefon bilgilerimin; kampanya, yeni ürün, fiyat listesi ve etkinlik duyurularının e-posta, SMS ve WhatsApp yoluyla tarafıma iletilmesi amacıyla işlenmesine,</li>
<li>bu amaçla, yurt dışında sunucuları bulunan e-posta ve mesajlaşma hizmet sağlayıcılarına aktarılmasına</li>
</ul>
<p>özgür irademle <b>açık rıza</b> veriyorum.</p>
<p>Bu rıza isteğe bağlıdır; vermemem üyelik başvurumu veya sipariş süreçlerimi etkilemez. Rızamı dilediğim zaman ${C_.email} adresine bildirerek veya iletilerdeki “abonelikten çık” bağlantısıyla geri alabilirim. Tacir/esnaf olarak tarafıma gönderilen ticari elektronik iletiler bakımından 6563 sayılı Kanun ve Ticari İletişim ve Ticari Elektronik İletiler Hakkında Yönetmelik hükümleri saklıdır.</p>
<p class="legal-meta">Sürüm ${LEGAL_VERSION} · Son güncelleme: ${LEGAL_DATE.tr}</p>`,
    en: () => `
<p>I have read the <a onclick="legalOpen('kvkk')">Data Protection Notice</a> of ${C_.name}. I give my <b>explicit consent</b> to the processing of my name, email and phone number for sending campaign, new product, price list and event announcements via email, SMS and WhatsApp, and to the transfer of this data to email and messaging service providers with servers abroad for this purpose.</p>
<p>This consent is optional and does not affect my application or orders. I may withdraw it at any time by writing to ${C_.email} or using the unsubscribe link in any message.</p>
<p class="legal-meta">Version ${LEGAL_VERSION} · Last updated: ${LEGAL_DATE.en}</p>`,
  },

  cookies: {
    title: { tr: "Çerez Politikası", en: "Cookie Policy" },
    tr: () => `
<p>Platform, reklam veya izleme çerezi <b>kullanmaz</b>. Yalnızca sitenin çalışması için zorunlu olan tarayıcı depolama alanları (localStorage) kullanılır. Bu depolama alanları KVKK Kurulu’nun Çerez Uygulamaları Hakkında Rehberi ve AB ePrivacy Direktifi md. 5(3) uyarınca “kesinlikle gerekli” kapsamındadır ve rızaya tabi değildir.</p>
<table class="legal-tbl"><tr><th>Ad</th><th>Amaç</th><th>Süre</th></tr>
<tr><td>mbSession</td><td>Oturumunuzu açık tutar (giriş bilgisi)</td><td>Çıkış yapana kadar</td></tr>
<tr><td>mbLang</td><td>Seçtiğiniz dili hatırlar</td><td>Siz silene kadar</td></tr>
<tr><td>mbRevize.v2</td><td>Revize Modu’ndaki notlarınızı gönderene kadar saklar</td><td>Siz silene kadar</td></tr>
<tr><td>mbCookieOk</td><td>Bu bilgilendirmeyi gördüğünüzü hatırlar</td><td>Siz silene kadar</td></tr></table>
<p>Sayfa yazı tipleri Google Fonts üzerinden yüklenir; bu sırada IP adresiniz Google LLC’ye iletilebilir. Tarayıcı ayarlarınızdan site verilerini dilediğiniz zaman silebilirsiniz; bu durumda oturumunuz kapanır.</p>
<p class="legal-meta">Sürüm ${LEGAL_VERSION} · Son güncelleme: ${LEGAL_DATE.tr}</p>`,
    en: () => `
<p>The Platform does <b>not</b> use advertising or tracking cookies. It only uses browser storage (localStorage) that is strictly necessary for the site to work, which is exempt from consent under Art. 5(3) of the ePrivacy Directive.</p>
<table class="legal-tbl"><tr><th>Name</th><th>Purpose</th><th>Duration</th></tr>
<tr><td>mbSession</td><td>Keeps you signed in</td><td>Until sign-out</td></tr>
<tr><td>mbLang</td><td>Remembers your language</td><td>Until deleted</td></tr>
<tr><td>mbRevize.v2</td><td>Stores your Review Mode notes until sent</td><td>Until deleted</td></tr>
<tr><td>mbCookieOk</td><td>Remembers that you saw this notice</td><td>Until deleted</td></tr></table>
<p>Web fonts are loaded from Google Fonts, which may receive your IP address. You can clear site data in your browser settings at any time; this will sign you out.</p>
<p class="legal-meta">Version ${LEGAL_VERSION} · Last updated: ${LEGAL_DATE.en}</p>`,
  },

  terms: {
    title: { tr: "Kullanım Koşulları", en: "Terms of Use" },
    tr: () => `
<p>Bu koşullar, ${C_.name} tarafından işletilen ${C_.brand} B2B platformunun kullanımını düzenler. Üye olarak bu koşulları kabul etmiş sayılırsınız.</p>
<h3>1. Kapsam ve Üyelik</h3><p>Platform yalnızca tacir ve esnaf niteliğindeki iş müşterilerine (distribütör, toptancı, kuaför zinciri vb.) yöneliktir; tüketici satışı yapılmaz ve 6502 sayılı Tüketicinin Korunması Hakkında Kanun uygulanmaz. Üyelik başvuruları Şirketin onayına tabidir; Şirket gerekçe göstermeksizin başvuruyu reddedebilir.</p>
<h3>2. Hesap Güvenliği</h3><p>Kullanıcı adı ve şifrenizin gizliliğinden siz sorumlusunuz. Hesabınızla yapılan işlemler size ait kabul edilir. Yetkisiz kullanımı derhal ${C_.email} adresine bildiriniz.</p>
<h3>3. Fiyatlar ve Gizlilik</h3><p>Platformda gösterilen fiyatlar size özel ticari bilgidir. Fiyatların, fiyat listelerinin ve ticari şartların üçüncü kişilerle paylaşılmaması esastır. Şirket fiyatları ve ürün yelpazesini önceden bildirmeksizin güncelleyebilir; onaylanmış siparişlere onay anındaki fiyat uygulanır.</p>
<h3>4. Siparişler</h3><p>Platform üzerinden verilen siparişler bir teklif niteliğindedir; Şirketin satış incelemesi ve final onayı ile kesinleşir ve proforma fatura ile teyit edilir. Sipariş birimi kolidir; palet/konteyner tamamlama kuralları sipariş ekranında belirtilir. Stok bilgisi bilgilendirme amaçlıdır; stok rezervasyonu final onayla yapılır.</p>
<h3>5. Ödeme, Teslim ve Belgeler</h3><p>Ödeme ve teslim şartları (Incoterms 2020) her müşteri için ayrıca belirlenir ve proformada gösterilir. Commercial Invoice ve Packing List sevkiyatın kesin miktarlarına göre düzenlenir.</p>
<h3>6. Fikri Mülkiyet</h3><p>Platformdaki marka, logo, görsel, katalog ve tüm içerikler Şirkete veya lisans verenlerine aittir. Marketing Hub’daki materyaller yalnızca Şirket ürünlerinin satışı amacıyla kullanılabilir.</p>
<h3>7. Sorumluluk</h3><p>Şirket, Platformun kesintisiz veya hatasız çalışacağını taahhüt etmez; mücbir sebep ve üçüncü taraf hizmet kesintilerinden sorumlu tutulamaz.</p>
<h3>8. Kişisel Veriler</h3><p>Kişisel verileriniz <a onclick="legalOpen('kvkk')">KVKK Aydınlatma Metni</a> ve <a onclick="legalOpen('privacy')">Gizlilik Politikası</a> kapsamında işlenir.</p>
<h3>9. Uygulanacak Hukuk</h3><p>Bu koşullar Türk hukukuna tabidir. Uyuşmazlıklarda <mark class="legal-ph">[YETKİLİ MAHKEME / İCRA DAİRELERİ, örn. Düzce]</mark> yetkilidir.</p>
<p class="legal-meta">Sürüm ${LEGAL_VERSION} · Son güncelleme: ${LEGAL_DATE.tr}</p>`,
    en: () => `
<p>These terms govern the use of the ${C_.brand} B2B platform operated by ${C_.name}. By registering you accept them.</p>
<h3>1. Scope and Membership</h3><p>The Platform is for business customers only (distributors, wholesalers, salon chains); no consumer sales. Applications are subject to our approval and may be declined without reason.</p>
<h3>2. Account Security</h3><p>You are responsible for keeping your credentials confidential; actions taken with your account are deemed yours. Report unauthorised use to ${C_.email}.</p>
<h3>3. Prices and Confidentiality</h3><p>Prices shown to you are confidential commercial information and must not be shared with third parties. We may update prices and the product range; confirmed orders are invoiced at the price valid at confirmation.</p>
<h3>4. Orders</h3><p>Orders placed on the Platform are offers that become binding after our sales review and final approval, confirmed by a proforma invoice. Orders are placed in boxes; pallet/container completion rules apply. Stock information is indicative; stock is reserved upon final approval.</p>
<h3>5. Payment, Delivery and Documents</h3><p>Payment and delivery terms (Incoterms 2020) are agreed per customer and shown on the proforma. Commercial invoices and packing lists reflect the final shipped quantities.</p>
<h3>6. Intellectual Property</h3><p>All brands, logos, images and content belong to us or our licensors. Marketing Hub materials may only be used to sell our products.</p>
<h3>7. Liability</h3><p>We do not guarantee uninterrupted or error-free operation and are not liable for force majeure or third-party service outages.</p>
<h3>8. Governing Law</h3><p>Turkish law applies. Competent courts: <mark class="legal-ph">[COMPETENT COURTS]</mark>.</p>
<p class="legal-meta">Version ${LEGAL_VERSION} · Last updated: ${LEGAL_DATE.en}</p>`,
  },
};

// Metin, panel diline göre TR veya EN gösterilir (ES/DE/RU için İngilizce sürüm)
function legalOpen(key) {
  const d = LEGAL[key], lang = typeof LANG === "string" && LANG === "tr" ? "tr" : "en";
  let box = document.getElementById("legalPop");
  if (!box) { document.body.insertAdjacentHTML("beforeend", `<div id="legalPop" class="legal-pop" onclick="if(event.target===this)legalClose()"></div>`); box = document.getElementById("legalPop"); }
  box.innerHTML = `<div class="legal-card notranslate"><div class="legal-head"><b>${d.title[lang]}</b><button class="icon-btn" onclick="legalClose()">${ic("x")}</button></div>
    ${lang === "en" && LANG !== "en" ? `<p class="legal-note">English version</p>` : ""}<div class="legal-body">${d[lang]()}</div>
    <div class="legal-links">${Object.keys(LEGAL).filter((k) => k !== key).map((k) => `<a onclick="legalOpen('${k}')">${LEGAL[k].title[lang]}</a>`).join("")}</div></div>`;
  box.classList.add("on");
  box.querySelector(".legal-body").scrollTop = 0;
}
function legalClose() { document.getElementById("legalPop")?.classList.remove("on"); }
const legalLinks = () => `<div class="legal-foot notranslate">${["kvkk", "privacy", "cookies", "terms"].map((k) => `<a onclick="legalOpen('${k}')">${LEGAL[k].title[typeof LANG === "string" && LANG === "tr" ? "tr" : "en"]}</a>`).join("")}</div>`;

// Çerez bilgilendirmesi (yalnızca zorunlu depolama → bilgilendirme yeterli)
function cookieNotice() {
  try { if (localStorage.getItem("mbCookieOk")) return; } catch { return; }
  document.body.insertAdjacentHTML("beforeend", `<div class="cookie-bar notranslate" id="cookieBar"><span>${LANG === "tr" ? "Bu site yalnızca çalışması için gerekli tarayıcı depolamasını kullanır; reklam veya izleme çerezi yoktur." : "This site only uses browser storage that is strictly necessary; no advertising or tracking cookies."}</span><a onclick="legalOpen('cookies')">${LANG === "tr" ? "Çerez Politikası" : "Cookie Policy"}</a><button class="btn sm primary" onclick="try{localStorage.setItem('mbCookieOk','1')}catch{};this.parentNode.remove()">${LANG === "tr" ? "Tamam" : "OK"}</button></div>`);
}
