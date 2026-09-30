# Marmara Barber — B2B Panel (Tasarım Demosu)

Marmara Barber B2B sistemi için tıklanabilir tasarım demosu. Bu sürüm sadece arayüz tasarımıdır; veriler sahtedir, backend yoktur.

**Çalıştırmak için:** `index.html` dosyasını tarayıcıda açın.

Üç görünüm içerir (üstteki anahtardan geçilir):
- **Admin Paneli** — sipariş, müşteri, fiyat, stok, palet/konteyner, fabrika, sevkiyat, finans, rapor, doküman, yetkiler
- **Müşteri Portalı** — box bazlı sipariş, palet/konteyner tamamlama, checkout, sipariş takibi, forecast, kayıt
- **Fabrika** — hazırlık kuyruğu ve hazırlık ekranı

Dosyalar: `index.html` (iskelet), `styles.css` (tema), `data.js` (demo verisi), `app.js` (ekranlar ve palet/konteyner hesabı), `img/` (ürün görselleri).

Kapsam: "Senso — Yeni B2B Sistemi Taslağı V2" sunumu.

## Revize Modu

Sağ alttaki **Revize Modu** butonu ile müşteri ekranları gezerken herhangi bir öğeye tıklayıp not bırakır (Kalsın / Kaldırılsın / Değiştirilsin / Eklensin). Ayrıca her ekran için "ihtiyaç var mı / eksik ne" ve açık sorular sekmesi var.

"Gönder" ile notlar `api/feedback.js` (Vercel fonksiyonu) üzerinden özel **Ovo-Digital/marmara-b2b-revizeler** reposuna GitHub issue olarak düşer: her aksiyon ayrı issue, gönderim başına bir özet issue.

Görseller önce `api/upload.js` ile aynı reponun `uploads/` klasörüne yüklenir, issue'da görünür.

Vercel ortam değişkeni: `GITHUB_TOKEN` — sadece revize reposunda **Issues: Read and write** ve **Contents: Read and write** izni olan fine-grained token.
