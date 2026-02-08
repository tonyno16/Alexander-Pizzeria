/**
 * Build JS: concatena e minifica tutti gli script in un unico bundle.min.js
 * Ordine: main → analytics → cookie-consent → schema → location-tabs → form-validation → whatsapp-widget
 */
const fs = require("fs");
const path = require("path");
const { minify } = require("terser");

const ROOT = path.join(__dirname, "..");
const JS_DIR = path.join(ROOT, "assets", "js");
const OUT_FILE = path.join(JS_DIR, "bundle.min.js");

const ORDER = [
  "main.js",
  "analytics.js",
  "cookie-consent.js",
  "schema.js",
  "location-tabs.js",
  "form-validation.js",
  "whatsapp-widget.js",
];

async function build() {
  const parts = [];
  for (const name of ORDER) {
    const file = path.join(JS_DIR, name);
    if (!fs.existsSync(file)) {
      console.warn(`[build-js] Skip (not found): ${name}`);
      continue;
    }
    parts.push(fs.readFileSync(file, "utf8"));
  }
  const combined = parts.join("\n\n");
  const result = await minify(combined, {
    compress: true,
    mangle: false,
    format: { comments: false },
  });
  if (result.error) {
    console.error("[build-js] Error:", result.error);
    process.exit(1);
  }
  fs.writeFileSync(OUT_FILE, result.code, "utf8");
  console.log(
    `[build-js] Written ${OUT_FILE} (${(result.code.length / 1024).toFixed(
      1
    )} KB)`
  );
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
