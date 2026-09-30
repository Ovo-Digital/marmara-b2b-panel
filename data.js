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

// price = USD / pcs (Europe listesi EUR karşılığı ayrı tutulur)
const PRODUCTS = [
  { sku: "BC-400-02", name: "No.2 Cologne 400 ml", brand: "Marmara", cat: "Cologne", img: "no-2-kolonya-pet-400-ml.jpg", price: 1.85, pcsBox: 24, dims: [40, 30, 28], kg: 11.2, cls: "Heavy", loose: false, physical: 49920, reserved: 13440, low: 2400, hs: "3303.00", origin: "TR", dg: "UN1170 · Class 3", ean: "8690605012024" },
  { sku: "BC-400-06", name: "Cologne No.6 400 ml", brand: "Marmara", cat: "Cologne", img: "marmara-barber-kolonya-no-6-400-ml.jpg", price: 2.10, pcsBox: 24, dims: [40, 30, 28], kg: 11.2, cls: "Heavy", loose: false, physical: 28800, reserved: 6720, low: 2400, hs: "3303.00", origin: "TR", dg: "UN1170 · Class 3", ean: "8690605012062" },
  { sku: "PW-20", name: "Powder Wax 20 g", brand: "Marmara Barber", cat: "Hair Styling", img: "barbertoz-wax-20-gr.jpg", price: 1.10, pcsBox: 48, dims: [30, 20, 15], kg: 2.4, cls: "Light", loose: true, physical: 86400, reserved: 19200, low: 2400, hs: "3305.90", origin: "TR", dg: "—", ean: "8690605020203" },
  { sku: "SS-200", name: "Poseidon Sea Salt Spray 200 ml", brand: "Marmara Barber", cat: "Hair Styling", img: "deniz-tuzlu-poseidon-sprey-200-ml.jpg", price: 1.95, pcsBox: 24, dims: [32, 22, 20], kg: 5.6, cls: "Medium", loose: false, physical: 7680, reserved: 5760, low: 2400, hs: "3305.90", origin: "TR", dg: "—", ean: "8690605030202" },
  { sku: "MW-150", name: "Matte Wax 150 ml", brand: "Marmara Barber", cat: "Hair Styling", img: "matte-wax-150-ml.jpg", price: 2.20, pcsBox: 24, dims: [34, 24, 12], kg: 4.8, cls: "Light", loose: true, physical: 38400, reserved: 9600, low: 2400, hs: "3305.90", origin: "TR", dg: "—", ean: "8690605040157" },
  { sku: "GAW-150", name: "Gum Aqua Wax 150 ml", brand: "Marmara Barber", cat: "Hair Styling", img: "gum-aqua-wax-150-ml.jpg", price: 1.60, pcsBox: 24, dims: [34, 24, 12], kg: 4.9, cls: "Light", loose: true, physical: 57600, reserved: 4800, low: 2400, hs: "3305.90", origin: "TR", dg: "—", ean: "8690605041154" },
  { sku: "CW-100", name: "Clay Wax 100 ml", brand: "Marmara Barber", cat: "Hair Styling", img: "clay-wax-100-ml.jpg", price: 1.90, pcsBox: 24, dims: [30, 22, 12], kg: 3.6, cls: "Light", loose: true, physical: 33600, reserved: 4800, low: 2400, hs: "3305.90", origin: "TR", dg: "—", ean: "8690605042106" },
  { sku: "HG-34", name: "No.34 Hair Gel 500 ml", brand: "Marmara Barber", cat: "Hair Styling", img: "no-34-sac-jolesi-500-ml.jpg", price: 1.45, pcsBox: 24, dims: [40, 30, 20], kg: 13.0, cls: "Heavy", loose: false, physical: 0, reserved: 0, low: 2400, hs: "3305.90", origin: "TR", dg: "—", ean: "8690605050347" },
  { sku: "MS-750", name: "Monster Hair Spray 750 ml", brand: "Marmara Barber", cat: "Hair Styling", img: "monster-sac-spreyi-750-ml.jpg", price: 2.60, pcsBox: 12, dims: [36, 27, 28], kg: 9.1, cls: "Medium", loose: false, physical: 19200, reserved: 5760, low: 1200, hs: "3305.30", origin: "TR", dg: "UN1950 · Aerosol", ean: "8690605060750" },
  { sku: "SG-77", name: "No.77 Shaving Gel 1000 ml", brand: "Marmara Barber", cat: "Shaving", img: "no-77-pompali-tiras-jeli-1000-ml.jpg", price: 2.90, pcsBox: 12, dims: [38, 28, 26], kg: 13.4, cls: "Heavy", loose: false, physical: 14400, reserved: 2400, low: 1200, hs: "3307.10", origin: "TR", dg: "—", ean: "8690605070771" },
  { sku: "KS-1150", name: "Keratin Shampoo 1150 ml", brand: "Marmara Barber", cat: "Hair Care", img: "keratin-sampuan-arindirici-besleyici-pompali-1150-ml.jpg", price: 3.40, pcsBox: 12, dims: [40, 30, 30], kg: 15.2, cls: "Heavy", loose: false, physical: 11520, reserved: 3840, low: 1200, hs: "3305.10", origin: "TR", dg: "—", ean: "8690605081150" },
  { sku: "HT-500", name: "No.1 Keratin Bi-Phase Tonic 500 ml", brand: "Marmara Barber", cat: "Hair Care", img: "no-1-keratin-cift-fazli-fon-suyu-500-ml.jpg", price: 2.35, pcsBox: 24, dims: [38, 28, 24], kg: 12.6, cls: "Heavy", loose: false, physical: 24000, reserved: 4800, low: 2400, hs: "3305.90", origin: "TR", dg: "—", ean: "8690605090500" },
  { sku: "BO-50", name: "Beard Oil Tobacco & Vanilla 50 ml", brand: "Marmara Barber", cat: "Beard", img: "sakal-bakim-yagi-tutun-ve-vanilyali-50-ml.jpg", price: 2.75, pcsBox: 36, dims: [28, 20, 16], kg: 3.8, cls: "Fragile", loose: false, physical: 21600, reserved: 2880, low: 1800, hs: "3307.90", origin: "TR", dg: "—", ean: "8690605100050" },
  { sku: "ED-50", name: "Overdose EDP 50 ml", brand: "Noir", cat: "Fragrance", img: "overdose-edp-erkek-parfum-50-ml.jpg", price: 6.80, pcsBox: 24, dims: [30, 20, 18], kg: 3.9, cls: "Fragile", loose: false, physical: 9600, reserved: 1920, low: 1200, hs: "3303.00", origin: "TR", dg: "UN1266 · Class 3", ean: "8690605110050" },
  { sku: "NS-100", name: "Neck Strip White (5×100)", brand: "Marmara Barber", cat: "Accessories", img: "beyaz-boyun-bandi-1.png", price: 0.95, pcsBox: 50, dims: [30, 25, 20], kg: 4.0, cls: "Light", loose: true, physical: 120000, reserved: 20000, low: 5000, hs: "4818.90", origin: "TR", dg: "—", ean: "8690605120100" },
  { sku: "CP-PRO", name: "Black Cape Pro", brand: "Marmara Barber", cat: "Accessories", img: "siyah-penuar-takim-pro.jpg", price: 4.50, pcsBox: 20, dims: [40, 30, 20], kg: 6.0, cls: "Light", loose: true, physical: 1000, reserved: 0, low: 1200, hs: "6211.43", origin: "TR", dg: "—", ean: "8690605130001" },
];

const CUSTOMERS = [
  { id: "C-1021", name: "ABC Distribution GmbH", country: "Germany", flag: "🇩🇪", city: "Berlin", type: "Distributor", sales: "Ferhat", list: "Europe", currency: "USD", payment: "100% Advance", incoterm: "EXW Düzce", status: "Active", ytd: 148500, lastOrder: "12 Sep 2026", balance: 0, forecast: 25000, contact: "John Smith", email: "john@abc-distribution.de", vat: "DE123456789", brands: "Marmara Barber / Marmara / Noir" },
  { id: "C-1017", name: "Barber Supply Co.", country: "USA", flag: "🇺🇸", city: "Miami", type: "Distributor", sales: "Ferhat", list: "USA", currency: "USD", payment: "30% Advance / 70% before loading", incoterm: "FOB Istanbul", status: "Active", ytd: 211300, lastOrder: "20 Sep 2026", balance: 12690, forecast: 48000, contact: "Mike Alvarez", email: "mike@barbersupply.com", vat: "US-88-4412", brands: "Marmara Barber / Noir" },
  { id: "C-1009", name: "Baltic Grooming UAB", country: "Lithuania", flag: "🇱🇹", city: "Vilnius", type: "Wholesaler", sales: "Gözde", list: "Europe", currency: "EUR", payment: "100% Advance", incoterm: "EXW Düzce", status: "Active", ytd: 92400, lastOrder: "18 Sep 2026", balance: 4900, forecast: 18000, contact: "Tomas Kazlauskas", email: "tomas@balticgrooming.lt", vat: "LT100009876", brands: "Marmara Barber / Marmara" },
  { id: "C-1031", name: "Dubai Barber Trading LLC", country: "UAE", flag: "🇦🇪", city: "Dubai", type: "Distributor", sales: "Ferhat", list: "Middle East", currency: "USD", payment: "100% Advance", incoterm: "CIF Jebel Ali", status: "Active", ytd: 126800, lastOrder: "08 Sep 2026", balance: 0, forecast: 30000, contact: "Omar Haddad", email: "omar@dubaibarber.ae", vat: "AE-100234", brands: "All" },
  { id: "C-1004", name: "Salon Pro SRL", country: "Romania", flag: "🇷🇴", city: "Bucharest", type: "Retail Chain", sales: "Gözde", list: "Europe", currency: "EUR", payment: "100% Advance", incoterm: "DAP Bucharest", status: "Active", ytd: 58300, lastOrder: "02 Sep 2026", balance: 0, forecast: 12000, contact: "Andrei Popescu", email: "andrei@salonpro.ro", vat: "RO44321987", brands: "Marmara Barber" },
  { id: "C-1012", name: "Riyadh Grooming Est.", country: "Saudi Arabia", flag: "🇸🇦", city: "Riyadh", type: "Distributor", sales: "Ferhat", list: "Middle East", currency: "USD", payment: "LC at sight", incoterm: "CFR Dammam", status: "Active", ytd: 97600, lastOrder: "28 Aug 2026", balance: 0, forecast: 0, contact: "Faisal Al-Qahtani", email: "faisal@riyadhgrooming.sa", vat: "SA-3100", brands: "All" },
  { id: "C-1002", name: "Kazakh Style LLP", country: "Kazakhstan", flag: "🇰🇿", city: "Almaty", type: "Distributor", sales: "Gözde", list: "CIS", currency: "USD", payment: "100% Advance", incoterm: "EXW Düzce", status: "Inactive 90d", ytd: 22100, lastOrder: "24 Jun 2026", balance: 0, forecast: 0, contact: "Aidar Nurlan", email: "aidar@kazakhstyle.kz", vat: "KZ-771", brands: "Marmara Barber" },
  { id: "A-0042", name: "Nordic Cuts AB", country: "Sweden", flag: "🇸🇪", city: "Stockholm", type: "Barber Chain", sales: "", list: "", currency: "EUR", payment: "", incoterm: "", status: "Pending", ytd: 0, lastOrder: "—", balance: 0, forecast: 0, contact: "Erik Lindqvist", email: "erik@nordiccuts.se", vat: "SE556677889901", brands: "Marmara Barber / Noir", applied: "27 Sep 2026", phone: "+46 70 123 45 67", position: "Purchasing Manager", website: "nordiccuts.se" },
  { id: "A-0043", name: "Maison du Barbier SARL", country: "France", flag: "🇫🇷", city: "Lyon", type: "Distributor", sales: "", list: "", currency: "EUR", payment: "", incoterm: "", status: "Pending", ytd: 0, lastOrder: "—", balance: 0, forecast: 0, contact: "Claire Martin", email: "claire@maisondubarbier.fr", vat: "FR40123456789", brands: "Marmara Barber / Marmara / Noir", applied: "29 Sep 2026", phone: "+33 6 12 34 56 78", position: "CEO", website: "maisondubarbier.fr" },
];

// stage: 0 Sales Review · 1 Final Approval · 2 Awaiting Payment · 3 Preparing · 4 Ready for Shipment · 5 Shipped
const STAGES = ["Satış İncelemesi", "Final Onay", "Ödeme Bekliyor", "Hazırlanıyor", "Sevke Hazır", "Sevk Edildi"];
const STAGES_EN = ["Submitted", "Approved", "Payment", "Preparing", "Ready to Ship", "Shipped"];

const ORDERS = [
  { no: "SO-2026-0148", cust: "C-1021", date: "28 Sep 2026", currency: "USD", target: "20", stage: 0, paid: 0, reserveUntil: "", problem: false,
    items: [["PW-20", 90], ["SS-200", 68], ["BC-400-02", 108], ["MW-150", 271], ["GAW-150", 225], ["SG-77", 180], ["KS-1150", 135], ["NS-100", 113]] },
  { no: "SO-2026-0147", cust: "C-1017", date: "26 Sep 2026", currency: "USD", target: "40", stage: 1, paid: 0, reserveUntil: "10 Oct 2026", problem: false,
    items: [["BC-400-02", 413], ["BC-400-06", 275], ["MW-150", 413], ["GAW-150", 344], ["ED-50", 138], ["MS-750", 310], ["NS-100", 275]] },
  { no: "SO-2026-0146", cust: "C-1009", date: "22 Sep 2026", currency: "EUR", target: "pallet", stage: 2, paid: 10000, reserveUntil: "02 Oct 2026", problem: false,
    items: [["PW-20", 46], ["CW-100", 57], ["BO-50", 34], ["HT-500", 34], ["NS-100", 46]] },
  { no: "SO-2026-0145", cust: "C-1031", date: "15 Sep 2026", currency: "USD", target: "20", stage: 3, paid: 46255, reserveUntil: "30 Sep 2026", problem: true,
    items: [["PW-20", 86], ["SS-200", 64], ["BC-400-02", 103], ["GAW-150", 342], ["SG-77", 257], ["HT-500", 214]] },
  { no: "SO-2026-0144", cust: "C-1004", date: "10 Sep 2026", currency: "EUR", target: "pallet", stage: 4, paid: 6134, reserveUntil: "05 Oct 2026", problem: false,
    items: [["MW-150", 42], ["CW-100", 31], ["BO-50", 21], ["NS-100", 31]] },
  { no: "SO-2026-0141", cust: "C-1017", date: "04 Sep 2026", currency: "USD", target: "20", stage: 3, paid: 65453, reserveUntil: "08 Oct 2026", problem: false,
    items: [["BC-400-06", 241], ["MW-150", 321], ["GAW-150", 241], ["MS-750", 241], ["ED-50", 120]] },
  { no: "SO-2026-0143", cust: "C-1012", date: "01 Sep 2026", currency: "USD", target: "pallet", stage: 5, paid: 11580, reserveUntil: "", problem: false,
    items: [["BC-400-02", 97], ["SG-77", 76], ["KS-1150", 54], ["HT-500", 43]] },
  { no: "SO-2026-0142", cust: "C-1021", date: "03 Sep 2026", currency: "EUR", target: "pallet", stage: 5, paid: 6523, reserveUntil: "", problem: false,
    items: [["BC-400-02", 48], ["PW-20", 36], ["MW-150", 48], ["NS-100", 24]] },
];

const PRICE_LISTS = {
  Europe: { currency: "EUR", effective: "01.09.2026", factor: 0.92 },
  USA: { currency: "USD", effective: "01.09.2026", factor: 1.05 },
  "Middle East": { currency: "USD", effective: "15.08.2026", factor: 1.0 },
  CIS: { currency: "USD", effective: "01.07.2026", factor: 1.08 },
};
const OVERRIDES = [
  { sku: "PW-20", who: "Salon Pro SRL (RO)", price: 0.95, campaign: "01–30 Sep" },
  { sku: "BC-400-02", who: "ABC Distribution (DE)", price: 1.62, campaign: "" },
  { sku: "MW-150", who: "Kategori: Hair Styling −5%", price: null, campaign: "Q4 Campaign" },
];

const MONTHLY_SALES = [
  ["Oca", 286], ["Şub", 312], ["Mar", 341], ["Nis", 298], ["May", 377], ["Haz", 402], ["Tem", 365], ["Ağu", 391], ["Eyl", 428.65],
];
const TOP_SELLER = { sku: "PW-20", pcs: 24500, value: 26950 };
const COUNTRY_SALES = [["Germany", 82400], ["USA", 61200], ["Lithuania", 42600], ["UAE", 38900], ["Saudi Arabia", 31200], ["Romania", 18300]];

const DOCUMENTS = [
  { type: "MSDS", name: "No.2 Cologne — Safety Data Sheet", sku: "BC-400-02", lang: "EN", ver: "v3", expiry: "12 Mar 2028", visible: "All customers" },
  { type: "CPNP", name: "Powder Wax — CPNP Notification", sku: "PW-20", lang: "EN", ver: "v1", expiry: "—", visible: "EU customers" },
  { type: "CPSR", name: "Sea Salt Spray — Safety Report", sku: "SS-200", lang: "EN", ver: "v2", expiry: "04 Jan 2027", visible: "EU customers" },
  { type: "INCI", name: "Matte Wax — INCI List", sku: "MW-150", lang: "EN/DE", ver: "v2", expiry: "—", visible: "All customers" },
  { type: "Free Sale", name: "Free Sales Certificate 2026", sku: "All", lang: "EN", ver: "v1", expiry: "14 Oct 2026", visible: "All customers", expiring: true },
  { type: "MSDS", name: "Monster Hair Spray — Aerosol MSDS", sku: "MS-750", lang: "EN", ver: "v4", expiry: "30 Jun 2027", visible: "All customers" },
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
