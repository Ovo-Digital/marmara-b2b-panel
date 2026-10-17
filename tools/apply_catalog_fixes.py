#!/usr/bin/env python3
"""Katalog düzeltmeleri — fiyat listesindeki (Price Level b2b.xlsx) karışık ad / eksik ürünler.
Doğruluk kaynağı: stok tablosu + MARMARA BARBER INFORMATION + firmanın packing list'leri (üçü de aynı barkod ↔ ürünü veriyor).
- 150 ml wax: SKU / barkod doğru, adlar kaymış → adlar düzeltilir; Cream ve Spider eklenir; mükerrer kayıtlar pasif.
- Fly Carpet Purple / Blue adları yer değiştirmiş.
- Packing list'lerde olup katalogda olmayan ürünler eklenir; fiyatı bilinmeyenler pasif (fiyat girilince aktif edilir).
build_catalog.py → apply_lojistik.py → apply_images.py → apply_new_products.py → apply_catalog_fixes.py"""
import json, os
ROOT = os.path.join(os.path.dirname(__file__), "..")
CAT = os.path.join(ROOT, "catalog.js")
head, body = open(CAT, encoding="utf-8").read().split("const PRODUCTS = [\n", 1)
prods = [json.loads(l) for l in body.rsplit("\n];", 1)[0].split(",\n")]
by = {p["sku"]: p for p in prods}

RENAME = {"BW-150-MAT": "Barber Wax 150 ml Matte", "BW-150-TAM": "Barber Aqua Wax 150 ml Tampa Tobacco",
          "BW-150-TRO": "Barber Aqua Wax 150 ml Tropical", "BW-150-RYL": "Barber Aqua Wax 150 ml Royal",
          "BCP-FCP": "Barber Cape Fly Carpet Purple", "BCP-FCB": "Barber Cape Fly Carpet Blue", "BCP–SSP": "Barber Cape Super Sonic Purple"}
FIX = {"BW-150-CRM": {"ean": "8691541008918"}, "BW-150-MAT-1018": {"active": False}, "BW-150-GUM-0998": {"active": False}}

def like(src, **kw):   # şablon üründen kopya (lojistik alanları), fiyat/görsel/stok sıfırdan
    base = {k: v for k, v in by[src].items() if k not in ("physical", "reserved", "low", "active")}
    base.update({"physical": 0, "reserved": 0, "low": 0, "img": ""}); base.update(kw)
    if base.get("prices") is None: base["prices"] = [None] * 6
    base["price"] = base["prices"][0]
    if base["prices"][0] is None: base["active"] = False
    box = base["pcsBox"]; base.setdefault("unitKg", by[src].get("unitKg")); base["net"] = base["gross"] = base["kg"] = round(box * (base["unitKg"] or 0), 2)
    return base

NEW = [
    like("BW-150-MAT", sku="BW-150-CRE", name="Barber Wax 150 ml Cream", ean="8691541008741"),
    like("BW-150-MAT", sku="BW-150-SPI", name="Barber Wax 150 ml Spider", ean="8691541006112"),
    like("BM-007034", sku="BP-50-OTR", name="Barber Eau de Parfume 50 ml Off The Record", ean="8691541006846", prices=None, unitKg=0.15),
    like("BM-007034", sku="BP-50-OVR", name="Barber Eau de Parfume 50 ml Overdose", ean="8691541006808", prices=None, unitKg=0.15),
    like("BCP-FCC", sku="BCP–BTW", name="Barber Cape Team White", ean="8691541006174", prices=None),
    like("BSTND - P", sku="NPSTND", name="Noir Parfume Stand", brand="Noir", ean="", prices=None, unitKg=70),
    like("BM-007034", sku="NPKT", name="Noir Parfume Women Tester Mix Set", brand="Noir", ean="", pcsBox=1, prices=None, unitKg=0.2),
    like("BM-007034", sku="NPET", name="Noir Parfume Men Tester Mix Set", brand="Noir", ean="", pcsBox=1, prices=None, unitKg=0.2),
    like("BM-000479", sku="NR-BAG", name="Noir Bag", brand="Noir", ean="", prices=None, unitKg=0.1),
    like("BM-000479", sku="BBAG-N", name="Barber Bag Nylon", ean="", prices=None, unitKg=0.1),
    like("BM-000479", sku="BBAG-N-W", name="Barber Bag Nylon Transparent", ean="", pcsBox=100, prices=None, unitKg=0.05),
] + [like("BM-007034", sku=f"BP-2-{c}-T", name=f"Barber Eau de Parfume 2 ml {n} Tester", ean="", pcsBox=100, prices=None, unitKg=0.01)
     for c, n in [("BLC", "Blackout"), ("GC", "Game Changer"), ("HNG", "Hangover"), ("IMP", "Impossible"), ("IWT", "I Wanna Thank Me"),
                  ("NQ", "Never Quit"), ("OBS", "Obsessed"), ("OFF", "Offline"), ("OTR", "Off The Record"), ("OVR", "Overdose")]]

cnt = {"ad": 0, "düzeltme": 0, "eklendi": 0}
for s, n in RENAME.items():
    if by[s]["name"] != n: by[s]["name"] = n; cnt["ad"] += 1
for s, f in FIX.items():
    if any(by[s].get(k) != v for k, v in f.items()): by[s].update(f); cnt["düzeltme"] += 1
for p in NEW:
    if p["sku"] in by: continue
    prods.append(p); by[p["sku"]] = p; cnt["eklendi"] += 1
with open(CAT, "w", encoding="utf-8") as f:
    f.write(head + "const PRODUCTS = [\n" + ",\n".join("  " + json.dumps(p, ensure_ascii=False) for p in prods) + "\n];\n")
print(cnt)
