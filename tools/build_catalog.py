#!/usr/bin/env python3
"""~/Desktop/b2b klasöründeki gerçek verilerden catalog.js üretir.

Kaynak:  Price Level b2b.xlsx  (barkod, ad, koli içi adet, 6 fiyat seviyesi)
         ProductExport.csv     (SKU, marka, görsel — barkod / isim ile eşlenir)
         Brands.csv            (marka listesi)
Çıktı:   catalog.js + img/p/<barkod>.jpg (400px küçültülmüş görseller)

Koli ölçüsü / ağırlık / stok kaynak dosyalarda yok → tahmini üretilir (p.est = true).
Çalıştır: python3 tools/build_catalog.py [--no-images]
"""
import csv, json, os, re, subprocess, sys, urllib.parse, urllib.request
import openpyxl

SRC = os.path.expanduser("~/Desktop/b2b")
OUT = os.path.join(os.path.dirname(__file__), "..")
IMG_DIR = os.path.join(OUT, "img", "p")

LEVELS = [
    {"id": 1, "name": "Level 1 · List Price", "cur": "USD"},
    {"id": 2, "name": "Level 2 · USA", "cur": "USD"},
    {"id": 3, "name": "Level 3 · Europe", "cur": "USD"},
    {"id": 4, "name": "Level 4 · Middle East – Asia", "cur": "USD"},
    {"id": 5, "name": "Level 5 · Africa", "cur": "USD"},
    {"id": 6, "name": "Level 6 · Yusuf Akbaş – EUR", "cur": "EUR"},
]

def cat_of(n):
    u = n.upper()
    if "AFTER SHAVE" in u or "SHAVING" in u: return "Shaving"
    if "ROOM SPRAY" in u or "ROOM STICK" in u: return "Home Fragrance"
    if "BEARD" in u and "BRUSH" not in u: return "Beard"
    if re.search(r"PERFUME|PARFUME|PARFUM", u) and "STAND" not in u: return "Fragrance"
    if "COLOGNE" in u and "PUMP" not in u: return "Cologne"
    if re.search(r"SHAMPOO|CONDITIONER|TWO PHASE|ROSE WATER", u): return "Hair Care"
    if re.search(r"WAX|GEL|HAIR SPRAY|SEA SALT|COLOR SPRAY|TEMPORARY SPRAY", u): return "Hair Styling"
    return "Accessories"

def vol_of(n):
    u = n.upper()
    m = re.search(r"(\d+(?:[.,]\d+)?)\s*(LITER|LT|L)\b", u)
    if m: return float(m.group(1).replace(",", ".")) * 1000
    m = re.search(r"(\d+)\s*(ML|GR|G)\b", u)
    return float(m.group(1)) if m else 0

def title(n):
    keep = {"PET", "EDP", "XS", "XL", "L", "R", "S", "K1"}
    t = " ".join(w if (re.search(r"\d", w) or w in keep) else w.capitalize() for w in n.strip().split())
    t = re.sub(r"\b(\d+)\s*Ml\b|\b(\d+)\s*ML\b", lambda m: (m.group(1) or m.group(2)) + " ml", t)
    t = re.sub(r"\bNO\.?\s?(\d+)", r"No.\1", t, flags=re.I)
    return re.sub(r"\s+", " ", t)

def norm(s): return re.sub(r"[^A-Z0-9]", "", s.upper())

SYN = [(r"KOLONYA", "COLOGNE"), (r"L[İI]TRE|LITER|\bLT\b", "L"), (r"L[İI]MON", "LEMON"), (r"KIRAZ( CICEGI)?", "CHERRY"), (r"OKYANUS", "OCEAN"),
       (r"ROOM FRAGRANT BAMBOO", "ROOM STICK"), (r"TEMPORARY HAIR COLOR", "TEMPORARY SPRAY"), (r"POMPASIZ", "")]
def canon(s):
    s = s.upper()
    for a, b in SYN: s = re.sub(a, b, s)
    return s

def same_product(a, b):
    """İki isim aynı ürünü mü anlatıyor: kategori aynı ve anlamlı kelimelerin yarısı ortak (TR/EN eş anlamlılar birleştirilir)."""
    a, b = canon(a), canon(b)
    wa = {w for w in re.findall(r"[A-Z0-9]+", a.upper()) if w not in {"BARBER", "ML", "NO", "THE"}}
    wb = {w for w in re.findall(r"[A-Z0-9]+", b.upper()) if w not in {"BARBER", "ML", "NO", "THE"}}
    return cat_of(a) == cat_of(b) and len(wa & wb) >= max(1, min(len(wa), len(wb)) // 2)

def logistics(n, cat, vol, pcs, bc):
    u = n.upper(); glass = cat == "Fragrance"
    if cat == "Accessories":
        unit_g, unit_cm3 = (350, 1600) if re.search(r"CAPE|PENUAR|PUSAT", u) else (900, 6000) if "BAG" in u else (2500, 20000) if "STAND" in u else (110, 500) if "STRIP" in u else (60, 300)
    else:
        unit_g = vol * 1.05 + (140 if glass else 30)
        unit_cm3 = max(vol * 1.8, 80) + (120 if glass else 0)
    box_cm3 = pcs * unit_cm3 * 1.12
    L, W = (40, 30) if box_cm3 > 14000 else (30, 20)
    H = max(8, min(45, round(box_cm3 / (L * W))))
    kg = round(pcs * unit_g / 1000 + 0.4, 1)
    cls = "Fragile" if glass else "Heavy" if kg >= 10 else "Light" if kg < 5 else "Medium"
    loose = cls == "Light" and (cat in ("Accessories",) or "WAX" in u)
    phys = 0 if bc % 23 == 0 else pcs * (bc % 170 + 6)
    res = min(phys, pcs * ((bc // 7) % 30))
    hs = {"Cologne": "3303.00", "Fragrance": "3303.00", "Home Fragrance": "3307.49", "Hair Styling": "3305.90", "Hair Care": "3305.10", "Shaving": "3307.10", "Beard": "3307.90"}.get(cat, "9603.29" if "BRUSH" in u else "6211.43")
    dg = "UN1950 · Aerosol" if re.search(r"HAIR SPRAY|COLOR SPRAY|TEMPORARY SPRAY|ROOM SPRAY", u) else "UN1170 · Class 3" if cat in ("Cologne", "Fragrance") or ("AFTER SHAVE" in u) else "—"
    return dict(dims=[L, W, H], kg=kg, cls=cls, loose=loose, physical=phys, reserved=res, low=pcs * 10, hs=hs, dg=dg)

def fetch_img(url, bc):
    url_orig = url.strip()
    dst = os.path.join(IMG_DIR, f"{bc}.jpg")
    if os.path.exists(dst) and os.path.exists(dst + ".src") and open(dst + ".src").read() == url_orig: return True
    p = urllib.parse.urlsplit(url.strip().replace("http://", "https://", 1))
    url = urllib.parse.urlunsplit((p.scheme, p.netloc, urllib.parse.quote(p.path), p.query, ""))
    tmp = dst + ".tmp"
    try:
        with urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"}), timeout=25) as r, open(tmp, "wb") as f: f.write(r.read())
        subprocess.run(["sips", "-s", "format", "jpeg", "-s", "formatOptions", "72", "-Z", "420", tmp, "--out", dst], check=True, capture_output=True)
        open(dst + ".src", "w").write(url_orig)
        return True
    except Exception as e:
        print("  görsel alınamadı:", bc, e); return False
    finally:
        if os.path.exists(tmp): os.remove(tmp)

def main():
    images = "--no-images" not in sys.argv
    os.makedirs(IMG_DIR, exist_ok=True)
    exp = list(csv.DictReader(open(os.path.join(SRC, "ProductExport.csv"), encoding="utf-8-sig")))
    by_bc = {r["Barcode"].strip(): r for r in exp if r["Barcode"].strip()}
    by_name = {norm(r["Name"]): r for r in exp}
    brands = {r["Name"].strip(): r["Code"].strip() for r in csv.DictReader(open(os.path.join(SRC, "Brands.csv"), encoding="utf-8-sig"))}
    ws = openpyxl.load_workbook(os.path.join(SRC, "Price Level b2b.xlsx"), data_only=True).active
    out, seen, conflicts, stats = [], set(), [], {"barkod": 0, "isim": 0, "yok": 0, "görsel": 0}
    for row in ws.iter_rows(min_row=3, values_only=True):
        if not row[0] or not row[1]: continue
        bc, name, pcs = str(row[0]).strip(), str(row[1]).strip(), int(row[2] or 1)
        prices = [round(float(x), 4) if x not in (None, "") else None for x in row[3:9]]
        src = by_bc.get(bc)
        if src and not same_product(name, src["Name"]):   # barkod başka ürüne tanımlıysa (veri hatası) kullanma
            conflicts.append((bc, name.strip(), src["Name"].strip(), src["SKU"].strip())); src = None
        if src: stats["barkod"] += 1
        else:
            src = by_name.get(norm(name)) or by_name.get(norm(name.replace(" SPRAY", "")))
            stats["isim" if src else "yok"] += 1
        brand = (src or {}).get("Brand") or ("NOIR" if name.upper().startswith("NOIR") else "MARMADOS" if name.upper().startswith("MARMADOS") else "MARMARA" if name.upper().startswith("MARMARA") else "BARBER MARMARA")
        sku = ((src or {}).get("SKU") or "").strip() or f"{brands.get(brand, 'XX')}-{bc[-6:]}"
        if sku in seen: sku = f"{sku}-{bc[-4:]}"
        seen.add(sku)
        cat, vol = cat_of(name), vol_of(name)
        img = ""
        if src and src.get("Image") and images and fetch_img(src["Image"], bc): img = f"img/p/{bc}.jpg"; stats["görsel"] += 1
        elif not src and os.path.exists(os.path.join(IMG_DIR, f"{bc}.jpg")): os.remove(os.path.join(IMG_DIR, f"{bc}.jpg"))
        p = dict(sku=sku, name=title(name), brand=brand.title().replace("'S", "'s"), cat=cat, img=img, ean=bc, pcsBox=pcs,
                 prices=prices, price=prices[0], origin="TR", est=True, **logistics(name, cat, vol, pcs, int(bc)))
        out.append(p)
    with open(os.path.join(OUT, "catalog.js"), "w") as f:
        f.write("// Otomatik üretildi: tools/build_catalog.py — kaynak ~/Desktop/b2b (Price Level b2b.xlsx + ProductExport.csv)\n")
        f.write("// Elle düzenlemeyin; Excel güncellenince betiği tekrar çalıştırın.\n")
        f.write("const LEVELS = " + json.dumps(LEVELS, ensure_ascii=False) + ";\n")
        f.write("const PRODUCTS = [\n" + ",\n".join("  " + json.dumps(p, ensure_ascii=False) for p in out) + "\n];\n")
    print(f"{len(out)} ürün →", stats)
    with open(os.path.join(OUT, "tools", "veri-cakismalari.txt"), "w") as f:
        f.write("Fiyat tablosundaki barkod, ürün listesinde BAŞKA bir ürüne tanımlı (kaynak verisi düzeltilmeli):\n\n")
        for bc, a, b, sku in conflicts: f.write(f"{bc}  fiyat tablosu: {a}\n{' ' * len(bc)}  ürün listesi:  {b}  [{sku}]\n\n")
    print(len(conflicts), "barkod çakışması → tools/veri-cakismalari.txt")

main()
