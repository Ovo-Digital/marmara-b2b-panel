#!/usr/bin/env python3
"""Senso müşteri listesi (Customers_2026_10_12, JSON) → panel müşteri kayıtları.
Fiyat seviyesi atanmaz: hepsi Level 1 (baz / liste fiyatı). Enabled → Aktif, Disabled → Pasif.
Şifre yok: müşteri e-postasıyla ilk girişte yeni şifre belirler (imported: true).
Kullanım: python3 tools/import_customers.py <customers.json> <çıktı.json>"""
import json, sys, collections

ISO = {"Afghanistan": "AF", "Albania": "AL", "Algeria": "DZ", "American Samoa": "AS", "Angola": "AO", "Argentina": "AR", "Australia": "AU", "Austria": "AT",
       "Azerbaijan": "AZ", "Bahrain": "BH", "Belarus": "BY", "Belgium": "BE", "Bolivia": "BO", "Bosnia and Herzegovina": "BA", "Bulgaria": "BG", "Canada": "CA",
       "Chile": "CL", "Congo, Democratic Republic of": "CD", "Costa Rica": "CR", "Croatia": "HR", "Cyprus": "CY", "Czech Republic": "CZ", "Denmark": "DK",
       "Ecuador": "EC", "Egypt": "EG", "El Salvador": "SV", "Equatorial Guinea": "GQ", "France": "FR", "Georgia": "GE", "Germany": "DE", "Ghana": "GH",
       "Greece": "GR", "Guatemala": "GT", "Honduras": "HN", "Hungary": "HU", "Indonesia": "ID", "Iran": "IR", "Iraq": "IQ", "Ireland": "IE", "Israel": "IL",
       "Italy": "IT", "Jordan": "JO", "Kazakhstan": "KZ", "Kuwait": "KW", "Latvia": "LV", "Lebanon": "LB", "Libya": "LY", "Macedonia": "MK", "Madagascar": "MG",
       "Malaysia": "MY", "Maldives": "MV", "Malta": "MT", "Mauritius": "MU", "Mexico": "MX", "Moldova": "MD", "Montenegro": "ME", "Morocco": "MA",
       "Netherlands": "NL", "New Caledonia": "NC", "Norway": "NO", "Oman": "OM", "Pakistan": "PK", "Panama": "PA", "Paraguay": "PY", "Peru": "PE",
       "Philippines": "PH", "Poland": "PL", "Portugal": "PT", "Puerto Rico": "PR", "Qatar": "QA", "Reunion": "RE", "Romania": "RO", "Russia": "RU",
       "Saudia Arabia": "SA", "Saudi Arabia": "SA", "Serbia": "RS", "Slovakia": "SK", "South Africa": "ZA", "Sweden": "SE", "Switzerland": "CH", "Turkey": "TR",
       "Turkmenistan": "TM", "Ukraine": "UA", "United Arab Emirates": "AE", "United Kingdom": "GB", "United States": "US", "Uzbekistan": "UZ", "Venezuela": "VE"}
FIX = {"Saudia Arabia": "Saudi Arabia"}
PAY = {"PPAY": "100% Advance", "NT30": "Net 30 days", "NT60": "Net 60 days"}
flag = lambda iso: "".join(chr(0x1F1E6 + ord(c) - 65) for c in iso) if iso else ""

def addr(r):
    city = " ".join(x for x in [r["Zipcode"], r["City"]] if x)
    parts = [r["Address1"], r["Address2"], city, r["State"] if r["State"] and r["State"] != r["Country"] else "", FIX.get(r["Country"], r["Country"])]
    return ", ".join(p.strip() for p in parts if p and p.strip())

def main(src, out):
    rows = json.load(open(src, encoding="utf-8"))
    custs, emails = [], collections.Counter(r["Email"].strip().lower() for r in rows)
    for r in rows:
        country = FIX.get(r["Country"], r["Country"])
        a = addr(r)
        custs.append({
            "id": "M-" + r["CustomerID"], "account": r["AccountNumber"], "name": r["Name"].strip(), "type": r["CustomerTypeName"] or "—",
            "country": country, "flag": flag(ISO.get(r["Country"], "")), "city": r["City"].strip() or "—", "address": a, "shipAddress": a,
            "contact": r["ContactName"].strip(), "email": r["Email"].strip().lower(), "phone": r["Phone"].strip() or "—", "position": "—",
            "vat": r["TaxExemptionNumber"] or r["ResaleNumber"] or "—", "level": 1, "currency": "USD",
            "payment": PAY.get(r["PaymentTerm"], r["PaymentTerm"] or "100% Advance"), "incoterm": "EXW Düzce", "sales": r["SalesRep"] or "",
            "status": "Active" if r["Status"] == "Enabled" else "Inactive", "applied": r["ActivationDate"], "since": r["ActivationDate"],
            "ytd": 0, "lastOrder": "—", "balance": 0, "forecast": 0, "website": "—", "instagram": "—", "brands": "",
            "imported": True, "dupEmail": emails[r["Email"].strip().lower()] > 1,
        })
    json.dump(custs, open(out, "w", encoding="utf-8"), ensure_ascii=False)
    st = collections.Counter(c["status"] for c in custs)
    print(f"{len(custs)} müşteri → {out} · {dict(st)} · ortak e-posta: {sum(1 for c in custs if c['dupEmail'])} kayıt · bayraksız: {[c['country'] for c in custs if not c['flag']]}")

if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
