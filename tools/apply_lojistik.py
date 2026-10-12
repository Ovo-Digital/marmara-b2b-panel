#!/usr/bin/env python3
"""tools/data/lojistik.tsv (Senso'nun gönderdiği barkod · koli içi · birim kg · GTİP listesi) → catalog.js ürün kartları.
Eşleştirme: barkod (isim aynı ürünü anlatıyorsa), yoksa normalize isim. Her ürüne gtip, unitKg, net (koli net kg) yazılır.
build_catalog.py tekrar çalıştırılırsa bu betik de ardından çalıştırılmalı."""
import csv, json, os, re, sys
sys.path.insert(0, os.path.dirname(__file__))
from build_catalog import same_product, canon, norm

ROOT = os.path.join(os.path.dirname(__file__), "..")
CAT = os.path.join(ROOT, "catalog.js")
rows = list(csv.DictReader(open(os.path.join(ROOT, "tools/data/lojistik.tsv"), encoding="utf-8"), delimiter="\t"))
src = open(CAT, encoding="utf-8").read()
head, body = src.split("const PRODUCTS = [\n", 1)
lines = body.rsplit("\n];", 1)[0].split(",\n")
prods = [json.loads(l.strip()) for l in lines]

key = lambda s: norm(canon(s)).replace("SPRAY", "").replace("PET", "")
by_bc = {}
for r in rows: by_bc.setdefault(r["barcode"], []).append(r)
by_name = {key(r["name"]): r for r in rows}
hit, miss, diff = 0, [], []
for p in prods:
    r = next((x for x in by_bc.get(p["ean"], []) if same_product(p["name"], x["name"])), None) or by_name.get(key(p["name"]))
    if not r: miss.append(f'{p["sku"]:20} {p["ean"]}  {p["name"]}'); continue
    hit += 1
    kg = float(r["kg"]); p["unitKg"] = kg; p["net"] = round(kg * p["pcsBox"], 3); p["gross"] = p["net"]; p["kg"] = p["net"]
    if r["gtip"]: p["gtip"] = r["gtip"]; p["hs"] = r["gtip"]
    if int(r["box"]) != p["pcsBox"]: diff.append(f'{p["sku"]:20} {p["name"][:45]:45} katalog {p["pcsBox"]} · liste {r["box"]}')
with open(CAT, "w", encoding="utf-8") as f:
    f.write(head + "const PRODUCTS = [\n" + ",\n".join("  " + json.dumps(p, ensure_ascii=False) for p in prods) + "\n];\n")
rep = os.path.join(ROOT, "tools/lojistik-rapor.txt")
with open(rep, "w") as f:
    f.write(f"{hit} / {len(prods)} ürüne GTİP + birim ağırlık işlendi.\n\nListede bulunamayan ürünler ({len(miss)}):\n" + "\n".join(miss))
    f.write(f"\n\nKoli içi adet farkı ({len(diff)}) — katalogdaki (fiyat Excel'i) değer korundu:\n" + "\n".join(diff) + "\n")
print(hit, "eşleşti ·", len(miss), "bulunamadı ·", len(diff), "koli içi farkı → tools/lojistik-rapor.txt")
