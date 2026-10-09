// Demo verisi — gerçek sistemde bunlar veritabanından / Drive stok dosyasından gelecek.

const SETTINGS = {
  pallet: { base: [80, 120], baseHeight: 15, completeMin: 170, completeMax: 190, efficiency: 0.88 },
  containers: {
    "20": { label: "20' DC", m3: 28, kg: 21500, slots: 12, threshold: 90 },
    "40": { label: "40' HC", m3: 58, kg: 26500, slots: 24, threshold: 90 },
  },
  reservationWarnDays: [3, 1],
  defaultSales: "Ferhat",
};

// Ürünler ve fiyat seviyeleri catalog.js içinde (gerçek veri, tools/build_catalog.py).

const CUSTOMERS = [
  { id: "C-1021", name: "ABC Distribution GmbH", country: "Germany", flag: "🇩🇪", city: "Berlin", type: "Distributor", sales: "Ferhat", level: 3, currency: "USD", payment: "100% Advance", incoterm: "EXW Düzce", status: "Active", ytd: 148500, lastOrder: "12 Sep 2026", balance: 0, forecast: 25000, contact: "John Smith", email: "john@abc-distribution.de", vat: "DE123456789", brands: "Marmara Barber / Marmara / Noir" },
  { id: "C-1017", name: "Barber Supply Co.", country: "USA", flag: "🇺🇸", city: "Miami", type: "Distributor", sales: "Ferhat", level: 2, currency: "USD", payment: "30% Advance / 70% before loading", incoterm: "FOB Istanbul", status: "Active", ytd: 211300, lastOrder: "20 Sep 2026", balance: 12690, forecast: 48000, contact: "Mike Alvarez", email: "mike@barbersupply.com", vat: "US-88-4412", brands: "Marmara Barber / Noir" },
  { id: "C-1009", name: "Baltic Grooming UAB", country: "Lithuania", flag: "🇱🇹", city: "Vilnius", type: "Wholesaler", sales: "Gözde", level: 3, currency: "EUR", payment: "100% Advance", incoterm: "EXW Düzce", status: "Active", ytd: 92400, lastOrder: "18 Sep 2026", balance: 4900, forecast: 18000, contact: "Tomas Kazlauskas", email: "tomas@balticgrooming.lt", vat: "LT100009876", brands: "Marmara Barber / Marmara" },
  { id: "C-1031", name: "Dubai Barber Trading LLC", country: "UAE", flag: "🇦🇪", city: "Dubai", type: "Distributor", sales: "Ferhat", level: 4, currency: "USD", payment: "100% Advance", incoterm: "CIF Jebel Ali", status: "Active", ytd: 126800, lastOrder: "08 Sep 2026", balance: 0, forecast: 30000, contact: "Omar Haddad", email: "omar@dubaibarber.ae", vat: "AE-100234", brands: "All" },
  { id: "C-1004", name: "Salon Pro SRL", country: "Romania", flag: "🇷🇴", city: "Bucharest", type: "Retail Chain", sales: "Gözde", level: 3, currency: "EUR", payment: "100% Advance", incoterm: "DAP Bucharest", status: "Active", ytd: 58300, lastOrder: "02 Sep 2026", balance: 0, forecast: 12000, contact: "Andrei Popescu", email: "andrei@salonpro.ro", vat: "RO44321987", brands: "Marmara Barber" },
  { id: "C-1012", name: "Riyadh Grooming Est.", country: "Saudi Arabia", flag: "🇸🇦", city: "Riyadh", type: "Distributor", sales: "Ferhat", level: 4, currency: "USD", payment: "LC at sight", incoterm: "CFR Dammam", status: "Active", ytd: 97600, lastOrder: "28 Aug 2026", balance: 0, forecast: 0, contact: "Faisal Al-Qahtani", email: "faisal@riyadhgrooming.sa", vat: "SA-3100", brands: "All" },
  { id: "C-1002", name: "Kazakh Style LLP", country: "Kazakhstan", flag: "🇰🇿", city: "Almaty", type: "Distributor", sales: "Gözde", level: 4, currency: "USD", payment: "100% Advance", incoterm: "EXW Düzce", status: "Inactive 90d", ytd: 22100, lastOrder: "24 Jun 2026", balance: 0, forecast: 0, contact: "Aidar Nurlan", email: "aidar@kazakhstyle.kz", vat: "KZ-771", brands: "Marmara Barber" },
  { id: "A-0042", name: "Nordic Cuts AB", country: "Sweden", flag: "🇸🇪", city: "Stockholm", type: "Barber Chain", sales: "", level: 1, currency: "EUR", payment: "", incoterm: "", status: "Pending", ytd: 0, lastOrder: "—", balance: 0, forecast: 0, contact: "Erik Lindqvist", email: "erik@nordiccuts.se", vat: "SE556677889901", brands: "Marmara Barber / Noir", applied: "27 Sep 2026", phone: "+46 70 123 45 67", position: "Purchasing Manager", website: "nordiccuts.se" },
  { id: "A-0043", name: "Maison du Barbier SARL", country: "France", flag: "🇫🇷", city: "Lyon", type: "Distributor", sales: "", level: 1, currency: "EUR", payment: "", incoterm: "", status: "Pending", ytd: 0, lastOrder: "—", balance: 0, forecast: 0, contact: "Claire Martin", email: "claire@maisondubarbier.fr", vat: "FR40123456789", brands: "Marmara Barber / Marmara / Noir", applied: "29 Sep 2026", phone: "+33 6 12 34 56 78", position: "CEO", website: "maisondubarbier.fr" },
];

// stage: 0 Sales Review · 1 Final Approval · 2 Awaiting Payment · 3 Preparing · 4 Ready for Shipment · 5 Shipped
const STAGES = ["Satış İncelemesi", "Final Onay", "Ödeme Bekliyor", "Hazırlanıyor", "Sevke Hazır", "Sevk Edildi"];
const STAGES_EN = ["Submitted", "Approved", "Payment", "Preparing", "Ready to Ship", "Shipped"];

const ORDERS = [
  { no: "SO-2026-0148", cust: "C-1021", date: "28 Sep 2026", currency: "USD", target: "20", stage: 0, paidPct: 0, reserveUntil: "", problem: false, po: "ABC-PO-7781", note: "Please send the packing list before Friday so we can get freight quotes. Powder Wax boxes on the top pallets if possible.",
    items: [["BW-20-SKL", 90], ["BSS-200 - PS", 68], ["BC-400-2", 108], ["BW-150-MAT-1018", 271], ["BW-150-GUM", 225], ["BSG-1000-77", 180], ["BS-1150-KRT", 135], ["BNS-W", 113]] },
  { no: "SO-2026-0147", cust: "C-1017", date: "26 Sep 2026", currency: "USD", target: "40", stage: 1, paidPct: 0, reserveUntil: "10 Oct 2026", problem: false,
    items: [["BC-400-2", 413], ["BC-400-6", 275], ["BW-150-MAT-1018", 413], ["BW-150-GUM", 344], ["BM-007058", 138], ["BHS-750-M", 310], ["BNS-W", 275]] },
  { no: "SO-2026-0146", cust: "C-1009", date: "22 Sep 2026", currency: "EUR", target: "pallet", stage: 2, paidPct: 0.87, reserveUntil: "02 Oct 2026", problem: false,
    items: [["BW-20-SKL", 46], ["BW-100-CLY", 57], ["BBO-50-TV", 34], ["BM-011277", 34], ["BNS-W", 46]] },
  { no: "SO-2026-0145", cust: "C-1031", date: "15 Sep 2026", currency: "USD", target: "20", stage: 3, paidPct: 1, reserveUntil: "30 Sep 2026", problem: true,
    items: [["BW-20-SKL", 86], ["BSS-200 - PS", 64], ["BC-400-2", 103], ["BW-150-GUM", 342], ["BSG-1000-77", 257], ["BM-011277", 214]] },
  { no: "SO-2026-0144", cust: "C-1004", date: "10 Sep 2026", currency: "EUR", target: "pallet", stage: 4, paidPct: 0.93, reserveUntil: "05 Oct 2026", problem: false,
    items: [["BW-150-MAT-1018", 42], ["BW-100-CLY", 31], ["BBO-50-TV", 21], ["BNS-W", 31]] },
  { no: "SO-2026-0141", cust: "C-1017", date: "04 Sep 2026", currency: "USD", target: "20", stage: 3, paidPct: 1, reserveUntil: "08 Oct 2026", problem: false,
    items: [["BC-400-6", 241], ["BW-150-MAT-1018", 321], ["BW-150-GUM", 241], ["BHS-750-M", 241], ["BM-007058", 120]] },
  { no: "SO-2026-0143", cust: "C-1012", date: "01 Sep 2026", currency: "USD", target: "pallet", stage: 5, paidPct: 1, reserveUntil: "", problem: false,
    items: [["BC-400-2", 97], ["BSG-1000-77", 76], ["BS-1150-KRT", 54], ["BM-011277", 43]] },
  { no: "SO-2026-0142", cust: "C-1021", date: "03 Sep 2026", currency: "EUR", target: "pallet", stage: 5, paidPct: 1, reserveUntil: "", problem: false,
    items: [["BC-400-2", 48], ["BW-20-SKL", 36], ["BW-150-MAT-1018", 48], ["BNS-W", 24]] },
];


const MONTHLY_SALES = [
  ["Oca", 286], ["Şub", 312], ["Mar", 341], ["Nis", 298], ["May", 377], ["Haz", 402], ["Tem", 365], ["Ağu", 391], ["Eyl", 428.65],
];
const TOP_SELLER = { sku: "BW-20-SKL", pcs: 24500, value: 26950 };
const COUNTRY_SALES = [["Germany", 82400], ["USA", 61200], ["Lithuania", 42600], ["UAE", 38900], ["Saudi Arabia", 31200], ["Romania", 18300]];

const DOCUMENTS = [
  { type: "MSDS", name: "No.2 Cologne — Safety Data Sheet", sku: "BC-400-2", lang: "EN", ver: "v3", expiry: "12 Mar 2028", visible: "All customers" },
  { type: "CPNP", name: "Powder Wax — CPNP Notification", sku: "BW-20-SKL", lang: "EN", ver: "v1", expiry: "—", visible: "EU customers" },
  { type: "CPSR", name: "Sea Salt Spray — Safety Report", sku: "BSS-200 - PS", lang: "EN", ver: "v2", expiry: "04 Jan 2027", visible: "EU customers" },
  { type: "INCI", name: "Matte Wax — INCI List", sku: "BW-150-MAT-1018", lang: "EN/DE", ver: "v2", expiry: "—", visible: "All customers" },
  { type: "Free Sale", name: "Free Sales Certificate 2026", sku: "All", lang: "EN", ver: "v1", expiry: "14 Oct 2026", visible: "All customers", expiring: true },
  { type: "MSDS", name: "Monster Hair Spray — Aerosol MSDS", sku: "BHS-750-M", lang: "EN", ver: "v4", expiry: "30 Jun 2027", visible: "All customers" },
  { type: "Certificate", name: "ISO 22716 GMP Certificate", sku: "All", lang: "EN", ver: "v1", expiry: "18 May 2027", visible: "All customers" },
];

const MARKETING = [
  { img: "matte-wax-150-ml.jpg", title: "Matte Wax — Product Shots", kind: "Product Photos", n: 12 },
  { img: "no-2-kolonya-pet-400-ml.jpg", title: "Cologne Collection 2026", kind: "Catalogue", n: 1 },
  { img: "overdose-edp-erkek-parfum-50-ml.jpg", title: "Noir EDP — Launch Reels", kind: "Videos / Reels", n: 6 },
  { img: "barbertoz-wax-20-gr.jpg", title: "Powder Wax — Social Kit", kind: "Social Media", n: 18 },
  { img: "sakal-bakim-yagi-tutun-ve-vanilyali-50-ml.jpg", title: "Beard Care — POS Display", kind: "POS Materials", n: 4 },
  { img: "siyah-penuar-takim-pro.jpg", title: "Barber Tools — Lifestyle", kind: "Lifestyle Photos", n: 22 },
];

const USERS = [
  { name: "Volkan Koçkan", email: "volkan@ovodigi.com", role: "Super Admin", scope: "Tümü" },
  { name: "Gözde", email: "gozde@marmarabarber.com", role: "Export Manager / Final Approver", scope: "Tümü" },
  { name: "Ferhat", email: "ferhat@marmarabarber.com", role: "Export Sales", scope: "Kendi müşterileri" },
  { name: "Operasyon Ekibi", email: "ops@marmarabarber.com", role: "Operations", scope: "Tümü" },
  { name: "Düzce Fabrika", email: "fabrika@marmarabarber.com", role: "Factory", scope: "Sadece hazırlık" },
  { name: "Finans", email: "finans@marmarabarber.com", role: "Finance", scope: "Tümü" },
  { name: "Regülasyon", email: "regulatory@marmarabarber.com", role: "Regulatory", scope: "Dokümanlar" },
];
