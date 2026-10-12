// Yerel test sunucusu: statik dosyalar + api/*.js (Vercel fonksiyonlarıyla aynı kod), depo GitHub yerine yerel dosyada.
// Çalıştır: STORE_DIR=/tmp/mbstore node tools/devserver.js [port]   → http://127.0.0.1:8787
const http = require("http");
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");
const PORT = +process.argv[2] || 8787;
process.env.STORE_DIR ||= path.join(require("os").tmpdir(), "mbstore");
fs.mkdirSync(process.env.STORE_DIR, { recursive: true });
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css", ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml", ".json": "application/json", ".woff2": "font/woff2" };

http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://x");
  const m = url.pathname.match(/^\/api\/([a-z]+)$/);
  if (m && fs.existsSync(path.join(ROOT, "api", m[1] + ".js"))) {
    req.query = Object.fromEntries(url.searchParams);
    res.status = (c) => { res.statusCode = c; return res; };
    res.json = (o) => { res.setHeader("Content-Type", "application/json"); res.end(JSON.stringify(o)); return res; };
    const h = require(path.join(ROOT, "api", m[1] + ".js"));
    try { await h(req, res); } catch (e) { res.statusCode = 500; res.end(String(e)); }
    return;
  }
  const f = path.join(ROOT, decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname));
  if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.statusCode = 404; return res.end("404"); }
  res.setHeader("Content-Type", TYPES[path.extname(f)] || "application/octet-stream");
  fs.createReadStream(f).pipe(res);
}).listen(PORT, "127.0.0.1", () => console.log(`http://127.0.0.1:${PORT}  (depo: ${process.env.STORE_DIR})`));
