#!/usr/bin/env python3
"""MARMARA / NOIR INFORMATION tablolarındaki yeni ürünleri catalog.js'e ekler ve görsellerini bağlar.
Kaynak: tools/data/yeni-urunler.json (tablodan çıkarılan satırlar; sku, ad, barkod, koli içi, GTİP, Drive görsel id).
Fiyatı olmayan ürün pasif eklenir (müşteri portalında görünmez); fiyat panelden girilince aktifleştirilir.
Görsel: img/p/d-<driveId>.jpg (420px) — dosya yoksa sys.argv[1] klasöründen kopyalanır.
build_catalog.py → apply_lojistik.py → apply_images.py → apply_new_products.py sırasıyla çalıştırılır."""
import json, os, shutil, sys
ROOT = os.path.join(os.path.dirname(__file__), "..")
CAT = os.path.join(ROOT, "catalog.js")
data = json.load(open(os.path.join(ROOT, "tools/data/yeni-urunler.json"), encoding="utf-8"))
src_dir = sys.argv[1] if len(sys.argv) > 1 else None
head, body = open(CAT, encoding="utf-8").read().split("const PRODUCTS = [\n", 1)
prods = [json.loads(l) for l in body.rsplit("\n];", 1)[0].split(",\n")]

def img(pid):
    if not pid: return ""
    rel = f"img/p/d-{pid}.jpg"; dst = os.path.join(ROOT, rel)
    if not os.path.exists(dst):
        f = os.path.join(src_dir or "", f"d-{pid}.jpg")
        if not src_dir or not os.path.exists(f): return ""
        shutil.copyfile(f, dst)
    return rel

cnt = {"eklendi": 0, "güncellendi": 0, "görsel": 0}
by_sku = {p["sku"]: p for p in prods}
for d in data.get("new", []):
    p = by_sku.get(d["sku"])
    box, kg1 = d["pcsBox"], d["unitKg"]
    rec = {"sku": d["sku"], "name": d["name"], "brand": d["brand"], "cat": d["cat"], "img": img(d.get("photo")), "ean": d["ean"],
           "pcsBox": box, "prices": d.get("prices") or [None] * 6, "price": (d.get("prices") or [None])[0], "origin": "TR", "est": True,
           "dims": d["dims"], "kg": round(box * kg1, 2), "cls": d["cls"], "loose": False, "physical": 0, "reserved": 0, "low": 0,
           "hs": d["gtip"], "dg": d.get("dg", "—"), "unitKg": kg1, "net": round(box * kg1, 2), "gross": round(box * kg1, 2), "gtip": d["gtip"]}
    if not d.get("prices"): rec["active"] = False
    if p: p.update({k: v for k, v in rec.items() if k not in ("prices", "price", "active", "physical", "reserved", "low") or k not in p}); cnt["güncellendi"] += 1
    else: prods.append(rec); by_sku[d["sku"]] = rec; cnt["eklendi"] += 1
for sku, pid in data.get("photos", {}).items():   # mevcut ürünlere tablodaki görsel
    p = by_sku.get(sku); rel = img(pid)
    if p and rel and p["img"] != rel: p["img"] = rel; cnt["görsel"] += 1
with open(CAT, "w", encoding="utf-8") as f:
    f.write(head + "const PRODUCTS = [\n" + ",\n".join("  " + json.dumps(p, ensure_ascii=False) for p in prods) + "\n];\n")
print(cnt)
