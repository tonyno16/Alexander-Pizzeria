const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const config = JSON.parse(fs.readFileSync(path.join(root, "vercel.json"), "utf8"));
const port = Number(process.env.PORT) || 3000;

const redirects = new Map();
for (const rule of config.redirects || []) {
  if (rule.has || rule.source.includes(":")) continue;
  redirects.set(rule.source, rule.destination);
}

const rewrites = new Map();
for (const rule of config.rewrites || []) {
  if (rule.source.includes(":")) continue;
  rewrites.set(rule.source, rule.destination);
}

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

function insideRoot(filePath) {
  const resolved = path.resolve(filePath);
  return resolved === root || resolved.startsWith(root + path.sep);
}

function sendFile(res, filePath) {
  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found");
      return;
    }
    const type = types[path.extname(filePath).toLowerCase()] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": type });
    res.end(data);
  });
}

function resolveFile(urlPath, callback) {
  const target = rewrites.get(urlPath) || urlPath;
  const filePath = path.resolve(root, "." + target);
  if (!insideRoot(filePath)) {
    callback(null);
    return;
  }
  fs.stat(filePath, (error, stat) => {
    if (error) {
      callback(null);
      return;
    }
    if (stat.isDirectory()) {
      const indexPath = path.join(filePath, "index.html");
      fs.stat(indexPath, (indexError) => callback(indexError ? null : indexPath));
      return;
    }
    callback(filePath);
  });
}

function proxyReviews(url, res) {
  const target = "https://www.alexanderpizzeria.com/api/reviews/" + url.search;
  https
    .get(target, (upstream) => {
      res.writeHead(upstream.statusCode || 502, {
        "Content-Type": upstream.headers["content-type"] || "application/json; charset=utf-8",
        "Cache-Control": "no-store",
      });
      upstream.pipe(res);
    })
    .on("error", () => {
      res.writeHead(502, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Reviews unavailable");
    });
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, "http://127.0.0.1");
  let pathname = decodeURIComponent(url.pathname);
  if (pathname === "/api/reviews" || pathname === "/api/reviews/") {
    proxyReviews(url, res);
    return;
  }
  if (!path.extname(pathname) && !pathname.endsWith("/")) {
    const withSlash = pathname + "/";
    if (redirects.has(withSlash) || rewrites.has(withSlash)) {
      res.writeHead(308, { Location: withSlash + url.search });
      res.end();
      return;
    }
  }
  const destination = redirects.get(pathname);
  if (destination) {
    res.writeHead(308, { Location: destination + url.search });
    res.end();
    return;
  }
  resolveFile(pathname, (filePath) => {
    if (!filePath) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found");
      return;
    }
    sendFile(res, filePath);
  });
});

server.listen(port, () => {
  console.log("Local server with clean URLs: http://localhost:" + port);
});
