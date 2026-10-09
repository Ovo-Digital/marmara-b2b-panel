#!/bin/bash
# Uçtan uca test — her adım ayrı Chrome profili (müşteri / admin / fabrika), ortak depo ns=e2e
cd "$(dirname "$0")/.."
CH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
P=/private/tmp/claude-501/e2e-profiles; rm -rf "$P"; mkdir -p "$P"
sed 's#<script src="catalog.js"></script>#<script>try{localStorage.setItem("mbStoreNs","e2e");localStorage.setItem("mbCookieOk","1")}catch(e){}</script><script src="catalog.js"></script>#; s#<script src="i18n.js"></script>#<script src="i18n.js"></script><script src="tools/e2e.js"></script>#' index.html > _e2e.html
declare -a WHO=("" musteri admin musteri admin fabrika admin musteri)
declare -a NAME=("" "Müşteri: üye ol" "Admin: onay + Level 4" "Müşteri: giriş + sipariş" "Admin: kontrol + onay + ödeme" "Fabrika: hazırlık" "Admin: final packing + sevk" "Müşteri: durum + fatura")
for s in 1 2 3 4 5 6 7; do
  echo "── Adım $s · ${NAME[$s]}"
  perl -e 'alarm 150; exec @ARGV' "$CH" --headless=new --disable-gpu --user-data-dir="$P/${WHO[$s]}" --allow-file-access-from-files \
    --virtual-time-budget=90000 --dump-dom "file://$PWD/_e2e.html?step=$s" 2>/dev/null \
    | python3 -c "import sys,re,html; d=sys.stdin.read(); m=re.search(r'<pre id=\"o\"[^>]*>(.*?)</pre>',d,re.S); print(html.unescape(m.group(1)) if m else '✗ çıktı yok (sayfa hata verdi ya da zaman aşımı)')"
done
rm -f _e2e.html
