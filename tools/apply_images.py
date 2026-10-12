#!/usr/bin/env python3
"""Görsel kontrol kararlarını (tools/data/gorsel-kararlari.json) catalog.js'e uygular.
Karar: candidate/photo → resmi Drive görseli img/p/d-<driveId>.jpg olarak kopyalanır; keep → dokunulmaz; none → görsel kaldırılır (yer tutucu).
build_catalog.py → apply_lojistik.py → apply_images.py sırasıyla çalıştırılır."""
import json, os, shutil, sys
ROOT = os.path.join(os.path.dirname(__file__), "..")
CAT = os.path.join(ROOT, "catalog.js")
dec = json.load(open(os.path.join(ROOT, "tools/data/gorsel-kararlari.json"), encoding="utf-8"))
src_dir = sys.argv[1] if len(sys.argv) > 1 else None   # küçültülmüş Drive görsellerinin olduğu klasör
head, body = open(CAT, encoding="utf-8").read().split("const PRODUCTS = [\n", 1)
prods = [json.loads(l) for l in body.rsplit("\n];", 1)[0].split(",\n")]
by = {d["sku"]: d for d in dec}
cnt = {"değişti": 0, "aynı": 0, "kaldırıldı": 0, "eksik dosya": 0}
for p in prods:
    d = by.get(p["sku"])
    if not d or d["decision"] == "keep": cnt["aynı"] += 1; continue
    if d["decision"] == "none": p["img"] = ""; cnt["kaldırıldı"] += 1; continue
    pid = d["drive_id"]; rel = f"img/p/d-{pid}.jpg"; dst = os.path.join(ROOT, rel)
    if not os.path.exists(dst):
        f = os.path.join(src_dir or "", f"{pid}.jpg")
        if not src_dir or not os.path.exists(f): cnt["eksik dosya"] += 1; continue
        shutil.copyfile(f, dst)
    if p["img"] != rel: p["img"] = rel; cnt["değişti"] += 1
    else: cnt["aynı"] += 1
with open(CAT, "w", encoding="utf-8") as f:
    f.write(head + "const PRODUCTS = [\n" + ",\n".join("  " + json.dumps(p, ensure_ascii=False) for p in prods) + "\n];\n")
print(cnt)
